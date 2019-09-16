/*jslint browser: true, devel: false, indent: 4, maxerr: 50 */
/*properties
	addMethod, alphanumeric, append, attr, country, debug, description, dom,
	email, empty, errorClass, errorElement, errorPlacement, find, format,
	hide, init, invalidHandler, itg, jQuery, maxlength, messages, onclick,
	onfocusout, onkeyup, optional, phone, query, ready, required, rules, show,
	street, textarea, time, ub, 'ub-city', 'ub-comment', 'ub-company',
	'ub-contact-time', 'ub-country', 'ub-county', 'ub-custom-1',
	'ub-custom-2', 'ub-custom-3', 'ub-custom-4', 'ub-custom-5', 'ub-customer',
	'ub-email', 'ub-first-name', 'ub-last-name', 'ub-phone-1', 'ub-phone-2',
	'ub-state', 'ub-street', 'ub-zip', validate, validator, webform,
	x_datatype, zipcode
*/
(function (win) {
	"use strict";

	// local variables are evaluated and accessed by Javascript faster.
	var window = win, jQuery, ub, err, version="0.0.2";

	// don't overwrite/clobber the global 'ub' object if it exists, but create
	// it if necessary and store a reference to it in local variable 'ub'...
	window.ub = window.ub || {};
	ub = window.ub;

	// don't overwrite/clobber the global 'ub.itg' object if it exists, but
	// create it if necessary and store a reference to it in local variable
	// 'ub.itg'...
	ub.itg = ub.itg || {};

	/**
	 * Invoke the constructor to return the <code>ub.itg.webform</code> object.
	 */
	ub.itg.webform = (function () {

		/**
		 * Private <code>init</code> method.  Logic placed in the
		 * <code>init</code> is fired on the document.ready event.
		 */
		function init(jQuery) {

			/**
			 * Augment jQuery Validator with <code>x_datatype</code> validation
			 * method.  The x_datatype validation methods have been XSS/RXSS
			 * "hardened" to resist XSS and RXSS attacks.  An unrecognized
			 * datatype defaults to the "alphanumeric" datatype validation.
			 * (See "alphanumeric" following.)
			 *
			 * The x_datatype validation method takes the following
			 * parameter values:
			 * <dl>
			 *   <dt><code>"alphanumeric"</code></dt>
			 *   <dd>Allows the following characters: a-z, A-Z, 0-9, and
			 *       ( ) space character.
			 *       </dd>
			 *   <dt><code>"country"</code></dt>
			 *   <dd>Allows country initials to be used, with or without dot
			 *       (.) characters separating the initials.  The initials can
			 *       be all uppercase letters or all lowercase letters, but
			 *       cannot be mixed upercase and lowercase letters.
			 *
			 *       Also, allows the country name to be spelled out either
			 *       proper case or all lower case letters, but cannot be a
			 *       jumble of uppercase and lowercase letters.
			 *
			 *       Examples of valid input are:
			 *       <ul>
			 *           <li>USA</li>
			 *           <li>US</li>
			 *           <li>U.S.</li>
			 *           <li>Burma Aftershave</li>
			 *           <li>U.S.S.R.</li>
			 *           <li>u.s.a</li>
			 *           <li>usa</li>
			 *           <li>burma aftershave</li>
			 *           <li>burma</li>
			 *           <li>u.s.a.</li>
			 *           <li>United States of America</li>
			 *           <li>united states of america</li>
			 *           <li>United kingdom</li>
			 *           <li>California</li>
			 *       </ul>
			 *
			 *       Examples of invalid input are:
			 *       <ul>
			 *           <li>united states of americA</li>
			 *           <li>B..A.D.</li>
			 *           <li>X</li>
			 *           <li>us.a</li>
			 *           <li>US.Ax.</li>
			 *           <li>bUrma</li>
			 *           <li>uSa</li>
			 *           <li>usA</li>
			 *       </ul>
			 *       </dd>
			 *   <dt><code>"email"</code></dt>
			 *   <dd>Allows the following characters to the left of the
			 *       '@' at-sign: a-z, A-Z, 0-9, (_) underscore character,
			 *       ( ) space character, (+) plus sign, (-) dash character,
			 *       (&) ampersand character.  Allows the following characters
			 *       to the right of the '@' at-sign: either an ip-address or
			 *       a domain name with any number of sub-domains separated by
			 *       a single (.) dot character and ending with a TLD
			 *       (Top-Level Domain) of 2 characters or more.
			 *       </dd>
			 *   <dt><code>"phone"</code></dt>
			 *   <dd>Allows 10-digit phone numbers, the area code must be specified
			 *       without the leading (1) one.  The following formats are
			 *       all valid formats for a phone number:
			 *       <ul>
			 *           <li>9999999999</li>
			 *           <li>999 999 9999</li>
			 *           <li>999-999-9999</li>
			 *           <li>999.999.9999</li>
			 *           <li>(999)9999999</li>
			 *           <li>(999)999 9999</li>
			 *           <li>(999)999-9999</li>
			 *           <li>(999)999.9999</li>
			 *           <li>(999) 9999999</li>
			 *           <li>(999) 999 9999</li>
			 *           <li>(999) 999-9999</li>
			 *           <li>(999) 999.9999</li>
			 *       </ul>
			 *       </dd>
			 *   <dt><code>"textarea"</code></dt>
			 *   <dd>Allows the following characters: a-z, A-Z, 0-9,
			 *       ( ) space character, ($) dollar sign, (.) period
			 *       character, (-) dash character, (:) colon character,
			 *       carriage return and line feed.
			 *       </dd>
			 *   <dt><code>"time"</code></dt>
			 *   <dd>Accepts either 24 hour military style time or 12 hour
			 *       am/pm style time where the am/pm part is optional.  The
			 *       The following formats are all valid formats for a time
			 *       value:
			 *       <ul>
			 *           <li>13:00</li>
			 *           <li>23:59</li>
			 *           <li>1:00</li>
			 *           <li>01:59</li>
			 *           <li>12:59 am</li>
			 *           <li>12:59 AM</li>
			 *           <li>12:59am</li>
			 *           <li>12:59pm</li>
			 *           <li>12:59AM</li>
			 *           <li>12:59A.M.</li>
			 *           <li>1 AM</li>
			 *       </ul>
			 *       </dd>
			 *   <dt><code>"zipcode"</code></dt>
			 *   <dd>Accepts either regular 5-digit zip code or zip+4
			 *       format zip code.
			 *   </dd>
			 * </dl>
			 *
			 * See Validator.addMethod for details of the addMethod() contract.
			 * @see http://docs.jquery.com/Plugins/Validation/Validator/addMethod
			 */
			jQuery.validator.addMethod("x_datatype",
				function (value, element, param) {
					/**
					 * datatypes - Map of 'x_datatype' "types" to regex's to
					 * validate
					 *
					 * @see http://regexpal.com for help with Javascript regex's
					 */
					var datatypes = {
							"alphanumeric": /^[a-zA-Z0-9 ]+$/,
							"country"     : /^(?:[A-Z](?:(?:(?:\.[A-Z])+\.)|[A-Z]+|(?:[a-z]+)(?:\ [A-Z]*[a-z]+)*)|[a-z](?:(?:(?:\.[a-z])+\.?)|[a-z]+|(?:[a-z]+)(?:\ [a-z]+)*))$/,
							"email"       : /^(?:[\w\- +&]+)(?:\.[\w\- +&]+)*@(?:(?:\d{1,3}\.){3}\d{1,3}|(?:[\w\-]+\.)+(?:[a-zA-Z\-]{2,}))$/,
							"phone"       : /^(?:\d{3}([ -.]?)\d{3}\1?\d{4}|\(\d{3}\) ?\d{3}[ -.]?\d{4})$/,
							"street"      : /^[a-zA-Z0-9 ]+$/,
							"textarea"    : /^[a-zA-Z0-9\n\r$.\-: ]+$/,
							"time"        : /^(?:(?:[012]|0?[1-9])(?::|(?::[0-5][0-9])?)?(?:\ ?[aApP](?:[mM]|(?:\.[mM]\.)))?|(?:(?:[012]|[012][0-9])(?::|(?::[0-5][0-9])?)))$/,
							"zipcode"     : /^\d{5}(?:-\d{4})?$/,
							"numeric"     : /^[0-9]+$/
						},
						/**
						 * type - make sure 'param_type' is a non-empty String
						 */
						type = (param.type && typeof param.type === "string") ?
							(param.type) : ("alphanumeric"),
						/**
						 * rx - regex to use for validation based on
						 * 'param.type' -- if the incoming type parm isn't
						 * recognized, default to 'alphanumeric'.
						 */
						rx = datatypes[type] || datatypes.alphanumeric;
						/**
						 * if the value of the field is identical with the the
						 * title of the field and the param.watermark flag is
						 * true assume that this is because of the
						 * "watermarking" logic (aka $.fn.defaultText) and
						 * treat it as an empty field.
						 */
						if (param.watermark && param.watermark === true &&
								value === $(element)[0].title) {
							value = "";
						}
					return (this.optional(element) || rx.test(value));
				},
				"Invalid characters in input field for datatype {0}."
				);

			/**
			 * Configure the jQuery Validator plugin via the following
			 * local variables.
			 *
			 * Documentation for the jQuery Validator plugin can be found at
			 * @see http://docs.jquery.com/Plugins/Validation/Validator
			 */
			var $ = jQuery,
				$watermarkClass = ".default-text",
				$errorContainer = $("#ub-error-container").hide(),
				$errorLabelContainer = $("#ub-display-errors"),
				$errorLabelContainerUL = $("#ub-display-errors ul"),
				errorLabelContainerCount = 0,
				wrapperContainer = "<ul></ul>",
				wrapper = "<li></li>",
				/**
				 * Configure the jQuery Validator plugin to handle validation
				 * for <code>&lt;form id="ub-webform"&gt;</code> using the
				 * <code>$.validate</code> method.
				 *
				 * See following link for details of the
				 * <code>$.validate</code> method.
				 * @see http://docs.jquery.com/Plugins/Validation/validate#toptions
				 */
				$validator = $('#ub-webform').validate({
					debug : false,
					onfocusout : false,
					onkeyup : false,
					onclick : false,
					errorClass : 'error',
					errorElement: "span",
					errorPlacement: function ($errLabel, $invalidField) {
						var $errorField = function () {},
							$snippet = {},
							refErr = {};
						try {
							$errorField = $('#' + $invalidField.attr("id")  + '-error');
							if ($errorField.length === 1) {
								// display error for an individual field
								$errorField.append($errLabel);
								$errorField.show();
								return;
							} else if ($errorField.length > 1) {
								refErr = new ReferenceError();
								refErr.description = "LOGIC ERROR: $errorField.length = '" +
									$errorField.length + "'";
								throw refErr;
							}
							// display error in $errorContainer
							errorLabelContainerCount += 1;
							if (errorLabelContainerCount === 1) {
								if ($errorLabelContainerUL.length === 0) {
									$errorLabelContainer.append(wrapperContainer);
									$errorLabelContainer = $errorLabelContainer.find("ul");
									$errorLabelContainerUL = $("#ub-display-errors ul");
								}
								$errorContainer.show();
							}
							$snippet = $(wrapper);
							$snippet.append($errLabel);
							$errorField = $errorLabelContainer;
							$errorField.append($snippet);
						} catch (e) {
						}
					},
					invalidHandler: function () {
						$errorContainer.hide();
						$errorLabelContainer.empty();
						errorLabelContainerCount = 0;
					},
					rules : {
						"ub-first-name"  : { maxlength: 40,   x_datatype: {type: "alphanumeric", watermark: true }},
						"ub-last-name"   : { maxlength: 40,   x_datatype: {type: "alphanumeric", watermark: true }},
						"ub-company"     : { maxlength: 60,   x_datatype: {type: "alphanumeric", watermark: true }},
						"ub-email"       : { maxlength: 50,   x_datatype: {type: "email"       , watermark: true }},
						"ub-phone-1"     : { maxlength: 25,   x_datatype: {type: "phone"       , watermark: true }},
						"ub-phone-2"     : { maxlength: 25,   x_datatype: {type: "phone"       , watermark: true }},
						"ub-contact-time": { maxlength: 25,   x_datatype: {type: "time"        , watermark: true }},
						"ub-street"      : { maxlength: 110,  x_datatype: {type: "street"      , watermark: true }},
						"ub-city"        : { maxlength: 60,   x_datatype: {type: "alphanumeric", watermark: true }},
						"ub-state"       : { maxlength: 50,   x_datatype: {type: "country"     , watermark: true }},
						"ub-zip"         : { maxlength: 15,   x_datatype: {type: "zipcode"     , watermark: true }},
						"ub-county"      : { maxlength: 60,   x_datatype: {type: "country"     , watermark: true }},
						"ub-country"     : { maxlength: 60,   x_datatype: {type: "country"     , watermark: true }},
						"ub-customer"    : { maxlength: 4,    x_datatype: {type: "alphanumeric", watermark: true }},
						"ub-comment"     : { maxlength: 2048, x_datatype: {type: "textarea"    , watermark: true }},
						"ub-custom-1"    : { maxlength: 2048, x_datatype: {type: "textarea"    , watermark: false}},
						"ub-custom-2"    : { maxlength: 2048, x_datatype: {type: "textarea"    , watermark: false}},
						"ub-custom-3"    : { maxlength: 2048, x_datatype: {type: "textarea"    , watermark: false}},
						"ub-custom-4"    : { maxlength: 2048, x_datatype: {type: "textarea"    , watermark: false}},
						"ub-custom-5"    : { maxlength: 2048, x_datatype: {type: "textarea"    , watermark: false}},
						"ub-state-num"   : { maxlength: 3, x_datatype: {type: "numeric", watermark: true}},
						"ub-revenue-num" : { maxlength: 3, x_datatype: {type: "numeric", watermark: true}},
						"ub-reason-num"  : { maxlength: 3, x_datatype: {type: "numeric", watermark: true}}
					},
					messages : {
						"ub-first-name"  : {
							required     : "First Name is required",
							x_datatype   : "First Name has invalid characters",
							maxlength    : $.format("First Name cannot exceed {0} characters")
						},
						"ub-last-name"   : {
							required     : "Last Name is required",
							x_datatype   : "Last Name has invalid characters",
							maxlength    : $.format("Last Name cannot exceed {0} characters")
						},
						"ub-company"     : {
							required     : "Company Name is required",
							x_datatype   : "Company Name has invalid characters",
							maxlength    : $.format("Company Name cannot exceed {0} characters")
						},
						"ub-email"       : {
							required     : "E-mail Address is required",
							x_datatype   : "E-mail Address has invalid characters",
							email        : "E-mail Address has invalid characters",
							maxlength    : $.format("E-mail Address cannot exceed {0} characters")
						},
						"ub-phone-1"     : {
							required     : "Phone Number 1 is required",
							x_datatype   : "Phone Number 1 should be entered like: xxx-xxx-xxxx",
							maxlength    : $.format("Phone Number 1 cannot exceed {0} characters")
						},
						"ub-phone-2"     : {
							required     : "Phone Number 2 is required",
							x_datatype   : "Phone Number 2 should be entered like: xxx-xxx-xxxx",
							maxlength    : $.format("Phone Number 2 cannot exceed {0} characters")
						},
						"ub-contact-time": {
							required     : "Best Contact Time is required",
							x_datatype   : "Best Contact Time has invalid characters",
							maxlength    : $.format("Best Contact Time cannot exceed {0} characters")
						},
						"ub-street"      : {
							required     : "Street is required",
							x_datatype   : "Street has invalid characters",
							maxlength    : $.format("Street cannot exceed {0} characters")
						},
						"ub-city"        : {
							required     : "City is required",
							x_datatype   : "City has invalid characters",
							maxlength    : $.format("City cannot exceed {0} characters")
						},
						"ub-state"       : {
							required     : "State is required",
							x_datatype   : "State has invalid characters",
							maxlength    : $.format("State cannot exceed {0} characters")
						},
						"ub-zip"         : {
							required     : "Zip is required",
							x_datatype   : "Zip has invalid characters",
							maxlength    : $.format("Zip cannot exceed {0} characters")
						},
						"ub-county"      : {
							required     : "County is required",
							x_datatype   : "County has invalid characters",
							maxlength    : $.format("County cannot exceed {0} characters")
						},
						"ub-country"     : {
							required     : "Country is required",
							x_datatype   : "Country has invalid characters",
							maxlength    : $.format("Country cannot exceed {0} characters")
						},
						"ub-customer"    : {
							required     : "Current Customer is required",
							x_datatype   : "Current Customer has invalid characters",
							maxlength    : $.format("Current Customer cannot exceed {0} characters")
						},
						"ub-comment"      : {
							required      : "Comment is required",
							x_datatype    : "Comment has invalid characters",
							maxlength     : $.format("Comment cannot exceed {0} characters")
						},
						"ub-custom-1"     : {
							required      : "Custom Field 1 is required",
							x_datatype    : "Custom Field 1 has invalid characters",
							maxlength     : $.format("Custom Field 1 cannot exceed {0} characters")
						},
						"ub-custom-2"     : {
							required      : "Custom Field 2 is required",
							x_datatype    : "Custom Field 2 has invalid characters",
							maxlength     : $.format("Custom Field 2 cannot exceed {0} characters")
						},
						"ub-custom-3"     : {
							required      : "Custom Field 3 is required",
							x_datatype    : "Custom Field 3 has invalid characters",
							maxlength     : $.format("Custom Field 3 cannot exceed {0} characters")
						},
						"ub-custom-4"     : {
							required      : "Custom Field 4 is required",
							x_datatype    : "Custom Field 4 has invalid characters",
							maxlength     : $.format("Custom Field 4 cannot exceed {0} characters")
						},
						"ub-custom-5"     : {
							required      : "Custom Field 5 is required",
							x_datatype    : "Custom Field 5 has invalid characters",
							maxlength     : $.format("Custom Field 5 cannot exceed {0} characters")
						},
						"ub-state-num"    : {
							required      : "State is required",
							x_datatype    : "State Field has invalid characters",
							maxlength     : $.format("State Field cannot exceed {0} characters")
						},
						"ub-revenue-num"    : {
							required      : "Revenue is required",
							x_datatype    : "Revenue Field has invalid characters",
							maxlength     : $.format("Revenue Field cannot exceed {0} characters")
						},
						"ub-reason-num"    : {
							required      : "Reason is required",
							x_datatype    : "Reason Field has invalid characters",
							maxlength     : $.format("Reason Field cannot exceed {0} characters")
						}
					}
				});
		}

		/**
		 * Expose private function <code>init</code> as a public method by
		 * returning a reference to it in an object.
		 */
		return { init : init };
	}());

	/////////////////////////////////////////////////////////////////////////
	// Look for the jQuery object in the usual locations.
	// If jQuery can't be found, throw a Javascript error.
	/////////////////////////////////////////////////////////////////////////
	if (window.dom && window.dom.query) {
		jQuery = window.dom.query;
	} else if (window.jQuery) {
		jQuery = window.jQuery;
	} else {
		err = new TypeError();
		err.description = "Can't find jQuery to init ub.itg.webform !";
		throw err;
	}

	/////////////////////////////////////////////////////////////////////////
	// AUTOMAGICALLY INITIALIZE THE WEB FORM ON DOCUMENT READY
	/////////////////////////////////////////////////////////////////////////
	jQuery(document).ready(function (jQuery) {
		ub.itg.webform.init(jQuery);
	});

}(window));
