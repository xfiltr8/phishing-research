/*global window */
(function (win) {
	"use strict";

	var window = win, $, ub;
	ub = window.ub;
	ub.itg = ub.itg || {};

	// Find jQuery.
	if (window.dom && window.dom.query) {
		$ = window.dom.query;
	} else if (window.jQuery) {
		$ = window.jQuery;
	} else {
		throw new Error("Can't find jQuery.");
	}

	// Find a Banker
	ub.itg.FindABanker = (function () {

		// ArcGIS token.
		//var TOKEN,
		// BLW host name.
		var blwHost,
			// UB Mortgages Availability Message
			mortgageBankerAvailabilityMessage = 'Thank you for your inquiry. However, Union Bank mortgages are only available on homes located in California, Oregon, or Washington.',
			// UB Mortgages Available States
			mortgageBankerAvailabilityStates = ['CA', 'OR', 'WA', 'California', 'Oregon', 'Washington'],
			// Container of FAB CTA verbiage.
			fabCTA,
			// FAB search form container.
			fabForm,
			// FAB form error message container.
			fabFormError,
			// FAB form invalid location message container.
			fabFormInvalidLocation,
			// FAB search result container.
			fabResult,
			// FAB searched location/zip container.
			fabLocation,
			// FAB search button.
			fabSearchButton,
			// FAB zip, city or state input field.
			zipCityOrState,
			// FAB zip, city or state input field value.
			zipCityOrStateValue,
			// FAB banker type id.
			bankerTypeId,
			// Address part: postal code.
			addressZip = '',
			// Address part: zip 4 digit.
			addressZip4 = '',
			// Address part: city.
			addressCity = '',
			// Address part: state.
			addressState = '';

		// blwHost for various environments.
		if (window.location.host.toLowerCase() === 'trd-dev.uboc.com') {
			blwHost = 'blw-ch-dev-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'trd-dev1.uboc.com') {
			blwHost = 'blw-ch-dev-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'trd-tst.uboc.com') {
			blwHost = 'blw-ch-tst-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'trd-tst1.uboc.com') {
			blwHost = 'blw-ch-tst-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'trd-mp1.uboc.com') {
			blwHost = 'blw.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'www-pte-ch.uboc.com') {
			blwHost = 'blw-ch-tst-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'www-pte-ch.unionbank.com') {
			blwHost = 'blw-ch-tst-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'www-pte-stg.uboc.com') {
			blwHost = 'blw-ch-tst-web1.unionbank.com';
		// Tokens for new environments (10-11-2011): starts.
		} else if (window.location.host.toLowerCase() === 'www-dev.uboc.com') {
			blwHost = 'blw-ch-dev-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'www-tst.uboc.com') {
			blwHost = 'blw-ch-tst-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'www-dev-stg.uboc.com') {
			blwHost = 'blw-ch-dev-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'www-tst-stg.uboc.com') {
			blwHost = 'blw-ch-tst-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'www-stg-dev.uboc.com') {
			blwHost = 'blw-ch-dev-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'www-stg-tst.uboc.com') {
			blwHost = 'blw-ch-tst-web1.unionbank.com';
		// Tokens for new environments (10-11-2011): ends.
		} else if (window.location.host.toLowerCase() === 'www-ch-dev-web.unionbank.com') {
			blwHost = 'blw-ch-dev-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'www-ch-tst-web.unionbank.com') {
			blwHost = 'blw-ch-tst-web1.unionbank.com';
		} else if (window.location.host.toLowerCase() === 'www-ch-pte-web.unionbank.com') {
			blwHost = 'blw-ch-tst-web1.unionbank.com';
		} else {
			blwHost = 'blw.unionbank.com';
		}

		// Displays search form.
		function displaySearchForm() {
			$(fabFormError).hide();
			$(fabForm).show();
			$(fabLocation).hide();
			$(fabFormInvalidLocation).hide();
			$('#zipCityOrState').select();
		}

		// Displays error message.
		function displayErrorMessage() {
			// Show the form.
			$(fabForm).show();
			// Hide the other error.
			$(fabFormInvalidLocation).hide();
			// Show the error message.
			$(fabFormError).show();
			$('#zipCityOrState').select();
		}

		// Displays invalid location message.
		function displayInvalidLocationMessage() {
			// Show the form.
			$(fabForm).show();
			// Hide the other error.
			$(fabFormError).hide();
			// Show the error message.
			$(fabFormInvalidLocation).show();
			$('#zipCityOrState').select();
		}

		// Parses address fragments.
		function parseAddressParts() {
			// Reset address fragment values.
			addressZip = '';
			addressCity = '';
			addressState = '';
			// FAB zip, city or state input field.
			zipCityOrState = $(fabForm).find('#zipCityOrState');
			// FAB zip, city or state input field value.
			zipCityOrStateValue = $(zipCityOrState).val();
			// If user enters a zip code.
			if (zipCityOrStateValue.match(/^\d{5}([-]\d{4})?$/i)) {
				var zipArray = $.trim(zipCityOrStateValue).split('-');
				addressZip = zipArray[0];
				if (zipArray.length > 1) {
					addressZip4 = zipArray[1];
				}
				return true;
			// If there's a comma, assume user enters a city and state.
			} else if (zipCityOrStateValue.split(',').length == 2) {
				addressCity = zipCityOrStateValue.split(',')[0];
				addressState = $.trim(zipCityOrStateValue.split(',')[1]);
				if (!addressState.match(/[a-zA-Z\.]+/i)) {
					displayErrorMessage();
					return false;
				}
				return true;
			// User enters invalid entry.
			} else {
				// Display error message.
				displayErrorMessage();
				// Return.
				return false;
			}
		}

		// Displays result.
		function displayResult(result) {
			// Hide FAB CTA.
			$(fabCTA).hide();
			// Hide FAB form.
			$(fabForm).hide();
			// Display result.
			$(fabResult).html(result).show();
			// Display searched location.
			$(fabLocation).show();
			// Populate and display location name container.
			$('#fabLocationName').html(zipCityOrStateValue).show();
		}

		// Formats banker result.
		function formatResult(bankerData) {
			var emailSubject = '',
				emailCc = '',
				formattedResult = '',
				bankerCounter,
				banker,
				moreInfoURL;

			// Banker type: Mortgage Consultant
			if (bankerTypeId === '1') {
				emailSubject = '***Mortgage Consultant - Web Inquiry***';
			// Banker type: Private Bank Relationship Manager
			} else if (bankerTypeId === '2') {
				emailSubject = '***Private Bank Relationship Manager Locator - Web Inquiry***';
				emailCc = 'ThePrivateBank@unionbank.com';
			// Banker type: UBIS Investment Specialist
			} else if (bankerTypeId === '3') {
				emailSubject = '***UBIS Financial Advisor - Web Inquiry***';
			}

			// If JSON Bankers array is not empty.
			if ($(bankerData).find('record').length > 0) {
				var bankerRecordsCount = $(bankerData).find('record').length;
				// Iterate through Bankers array.
				for (bankerCounter = 0; bankerCounter < bankerRecordsCount; bankerCounter = bankerCounter + 1) {
					banker = $(bankerData).find('record')[bankerCounter]; //bankerData.Bankers[bankerCounter]
					// Open banker container.
					formattedResult += '<div class="banker' + (bankerCounter > 0 ? ' subsequent' : '') + '">';
					// Banker's photo.
					formattedResult += '<img src="' + $(banker).find('smallImage').text() + '" class="img-right" />';
					// Banker's name.
					formattedResult += '<span class="banker-name">' + $(banker).find('fullName').text() + '</span>';
					// Banker's job title.
					if (banker.bankerJobTitle !== '') {
						formattedResult += '<p class="banker-position">' + $(banker).find('jobTitle').text() + '</p>';
					}
					// Open banker-info container.
					formattedResult += '<div class="banker-info">';
					// Banker's street address.
					formattedResult += '<p>' + $(banker).find('addressLine1').text() + '</p>';
					// Banker's city, state, and postal code.
					formattedResult += '<p>' + $(banker).find('city').text() + ', ' + $(banker).find('state').text() + ' ' + $(banker).find('zip').text() + '</p>';
					// Banker's office phone number.
					formattedResult += '<p>' + $(banker).find('officePhone').text() + '</p>';
					// Close banker-info container.
					formattedResult += '</div>';
					// Banker's email address.
					if ($(banker).find('email').text() !== '') {
						formattedResult += '<a href="mailto:' + $(banker).find('email').text() + '&subject=' + encodeURIComponent(emailSubject) + '&cc=' + encodeURIComponent(emailCc) + '">Email Me</a> | ';
					}
					// Direction to banker's branch.
					formattedResult += '<a href="https://' + blwHost + '/blw/search_results?v=directions&blw_search_input=' + encodeURIComponent(zipCityOrStateValue) + '&blw_branch_id=' + encodeURIComponent($(banker).find('blwBranchId').text()) + '" target="_blank">Get Directions</a>';
					// Banker's description (teaser bio).
					formattedResult += '<div class="banker-description">' + $(banker).find('teaserBio').text() + '</div>';
					// Link to banker's full profile.
					var bankerMoreInfoLink = $(banker).find('moreInfoLink').text();
					if (bankerMoreInfoLink !== '') {
						moreInfoURL = bankerMoreInfoLink + '?blw-branch-id=' + encodeURIComponent($(banker).find('blwBranchId').text()) + '&blw-search-input=' + encodeURIComponent(zipCityOrStateValue) + '&bankertype=' + encodeURIComponent(bankerTypeId);
						formattedResult += '<div class="text-right"><a class="more" href="' + moreInfoURL + '">View Full Profile</a></div>';
					}
					// Close banker container.
					formattedResult += '</div>';
				}
			}

			return formattedResult;
		}

		// Restores find button's verbiage.
		function restoreFindButton() {
			$(fabSearchButton).html('');
		}

		// Displays a banker closest to a coordinate and display them.
		function displayClosestBanker(lat, lng) {
			//var closestBankerServiceURL = '/ubincludes/jsp/FindBankers.jsp?lat=' + encodeURIComponent(lat) + '&lng=' + encodeURIComponent(lng) + '&bankerType=' + encodeURIComponent(bankerTypeId);
			var closestBankerServiceURL = '/ubincludes/jsp/FindBankersThroughWebService.jsp?lat=' + encodeURIComponent(lat) + '&lng=' + encodeURIComponent(lng) + '&bankerType=' + (bankerTypeId === '3' ? '0' : '') + encodeURIComponent(bankerTypeId);
			$.get(
				closestBankerServiceURL,
				function (bankerData) {
					var isEmpty = $(bankerData).find('record').length === 0;
					if (!isEmpty) {
						displayResult(formatResult(bankerData));
					} else {
						displayResult('<p>Sorry, we are currently unable to find the closest banker to your location.</p><p>Please try again later.</p>');
					}
					restoreFindButton();
				}
			);
		}

		// Gets closest banker.
		function getClosestBanker(address, city, state, zip, bankerTypeId) {
			//$(fabSearchButton).html('Finding..');
			var esriGeocoderUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/findAddressCandidates';
			$.getJSON(
				esriGeocoderUrl + '?Address=' + address + '&City=' + encodeURIComponent(city) + '&Region=' + encodeURIComponent(state) + '&Postal=' + encodeURIComponent(zip) + '&Zip4=' + encodeURIComponent(addressZip4) + '&sourceCountry=US&f=pjson&callback=?',
				function (geoData) {
					// If there are results.
					if (geoData !== null) {
						if (geoData.candidates && geoData.candidates.length > 0 && geoData.candidates[0].address.split(',').length > 2) {
							// ArcGIS found location candidate(s): just pick the first one.
							var coordinate = [geoData.candidates[0].location.y, geoData.candidates[0].location.x],
								esriReverseGeocodePayloadLocation,
								esriReverseGeocodePayload,
								esriReverseGeocodeUrl;
							// If this is a Mortgage Consultant, check if the area is in-service.
							if (bankerTypeId === '1') {
								esriReverseGeocodePayloadLocation = '{"x":' + coordinate[1] + ',"y":' + coordinate[0] + ',"spatialReference":{"wkid":4326}}';
								esriReverseGeocodePayload = 'location=' + encodeURIComponent(esriReverseGeocodePayloadLocation) + '&distance=100&f=pjson&callback=?';
								esriReverseGeocodeUrl = 'https://geocode.arcgis.com/arcgis/rest/services/World/GeocodeServer/reverseGeocode';
								$.ajax({
									type: 'GET',
									url: esriReverseGeocodeUrl + '?' + esriReverseGeocodePayload,
									dataType: 'json',
									async: false,
									success: function (addressData) {
										var esriState = '',
											zipArray;
										// ESRI's addressData.address.Region is not null.
										if (addressData !== null && addressData.address !== null && addressData.address.Region !== null) {
											esriState = addressData.address.Region;
										// ESRI's addressData.address.State is null, Jeff S. of ESRI recommended parsing addressData.address.Zip.
										} else if (addressData !== null && addressData.address !== null && addressData.address.Zip !== null) {
											// The addressData.address.Zip value looks like this: "91911 (CHULA VISTA), CA"
											zipArray = addressData.address.Zip.split(',');
											esriState = (zipArray.length > 1) ? $.trim(zipArray[zipArray.length - 1]) : '';
										}
										// If ESRI returns an empty string for State.
										if (esriState === '') {
											displayClosestBanker(coordinate[0], coordinate[1]);
										// If ESRI returns an out of area state.
										} else if ($.inArray(esriState, mortgageBankerAvailabilityStates) < 0) {
											displayResult('<p>' + mortgageBankerAvailabilityMessage + '</p>');
											restoreFindButton();
										// In area.
										} else {
											displayClosestBanker(coordinate[0], coordinate[1]);
										}
									}
								});
							} else {
								displayClosestBanker(coordinate[0], coordinate[1]);
							}
						} else if (geoData.error && geoData.error.message) {
							throw new Error(geoData.error.message);
						} else {
							// ArcGIS did not find any location candidates. Display error message.
							displayInvalidLocationMessage();
							restoreFindButton();
						}
					} else {
						displayResult('<p>Sorry, we are currently unable to get your location info.</p><p>Please try again later.</p>');
						restoreFindButton();
					}
				}
				/*
				error: function(request, textStatus, errorThrown) {
					displayResult('<p>Sorry, we are currently unable to get your location info.</p><p>Please try again later.</p>' + '<!-- ' + request + ' | ' + textStatus + ' | ' + errorThrown + ' -->');
					restoreFindButton();
				}
				*/
			);
		}

		// Gets/parses address and search for a banker closest to it.
		function search() {
			if (parseAddressParts()) {
				getClosestBanker('', addressCity, addressState, addressZip, bankerTypeId);
			}
		}

		// Initialization method.
		function initializeFindABanker() {

			// Container of FAB CTA verbiage.
			fabCTA = $('#fabCTA');
			if (fabCTA.length < 1) {
				throw new Error('Container of FAB CTA verbiage is not found.');
			}

			// FAB search form container.
			fabForm = $('#fabForm');
			if (fabForm.length < 1) {
				throw new Error('FAB search form container is not found.');
			}

			// FAB form error message container.
			fabFormError = $('#fabFormError');
			if (fabFormError.length < 1) {
				throw new Error('FAB form error message container is not found.');
			}

			// FAB Form Invalid Location message container.
			fabFormInvalidLocation = $('#fabFormInvalidLocation');
			if (fabFormInvalidLocation.length < 1) {
				$(fabForm).prepend('<div id="fabFormInvalidLocation" style="color:#DA2128;font-weight:bold;margin-bottom:5px;display:none">Location not found. Please try again.</div>');
				fabFormInvalidLocation = $('#fabFormInvalidLocation');
			}

			// FAB search result container.
			fabResult = $('#fabResult');
			if (fabResult.length < 1) {
				throw new Error('FAB search result container is not found.');
			}

			// FAB searched location/zip container.
			fabLocation = $('#fabLocation');
			if (fabLocation.length < 1) {
				throw new Error('FAB searched location/zip container is not found.');
			}

			// FAB search button.
			fabSearchButton = $('#fabSearchButton');
			if (fabSearchButton.length < 1) {
				throw new Error('FAB search button is not found.');
			}

			// FAB banker type id
			bankerTypeId = $('#bankerTypeId').val();
			if (bankerTypeId !== '1' && bankerTypeId !== '2' && bankerTypeId !== '3') {
				throw new Error('FAB banker type id is not valid.');
			}

			// Attach onClick handler to 'Change Location' hyperlink.
			$('#fabLocationChange').find('a').click(displaySearchForm);

			// Attach onClick handler to FAB search hyperlink.
			fabSearchButton.click(function () {
				$('#formFindaBanker').submit();
			});

			// Set the form action to search.
			$('#formFindaBanker').submit(search);
		}

		// Expose initializeFindABanker.
		return { init : initializeFindABanker };
	}());

	$(window.document).ready(function () {
		ub.itg.FindABanker.init();
	});
}(window));
