(function($, window){

$.fn.nextOnFilled = function(){
	return $(this).each(function(){
		var t = $(this);
		t.bind('keyup paste change', function(e){
			if( ub.utils.isControlKey( e) ) { return; }
			var v = t.val();
			if( t.attr('maxlength') == v.length ) {
				var a = t.parents('form').find(':input').get(),
					i = a.indexOf( t[0] );
				if( i + 1 < a.length ) {
					$(a[i + 1]).select();
				}
			}
		});
	});
};

// Add validate method/rule to protect against "dangerous" XSS characters  Janki, 25-Jan-2011
$.validator.addMethod("noxss", function(value, element) {
	var bool = false;
	try {
		bool = /^[^<|>|;|:|%|\\\"|\\{|\\}|\\\\|\n|\r]+$/.test(value);
	}
	catch( e ) {}
	return this.optional(element) || bool;
}, "Please remove the invalid characters.");
// }, "Please remove the invalid characters: '<', '>', ';', ':', '%', '"', '{', '}', '\\'");

// in a <textarea> cr's & lf's are perfectly acceptable...
// ... also, simplified the regex a little
$.validator.addMethod("noxss_textarea", function(value, element) {
	var bool = false;
	try {
		bool = /^[^<>;:%\\\"\\{\\}\\\\]+$/.test(value);
	}
	catch( e ) {}
	return this.optional(element) || bool;
}, "Please remove the invalid characters: '<', '>', ';', ':', '%', '\"', '{', '}', '\\'");

function _initForm(f) {
	f.find('.validation-errors').hide();
	f.find('.cancel-button').click(function(){
		$('#current-dialog').dialog('close');
		return false;
	});
}function _formShowErrors(errorMap, errorList){

	var f = $(this.currentForm),
		validationErrors = f.find('.validation-errors');

	if( ! errorList.length ) { validationErrors.empty().hide(); }
	else { validationErrors.empty().show(); }

	var added = {};

	$.each( errorList, function(pair) {
		var id = this.element.id,
			t =$(this.element), txt = f.find('label[for="'+ this.element.id +'"]').text();

		t.addClass('invalid');

		if( this.element.type == 'radio') {
			txt = t.parent().find('label').first().text();
		} else if( ! txt ) {
			txt = t.prevAll('label:first').text();
		}

		if( id && id.match(/^(annual\-income|purchace\-price|total\-montly\-payment)$/) ) {
			if(!added[ "extra-1" ]) {
				added[ "extra-1" ] = true;
				validationErrors.append( $('<p/>').text('Please enter one of "Annual Income", "Purchace Price" or "Total Montly Payment"') );
			}
		}
		else if( ! added[txt] ) {
			added[ txt ] = true;
			//validationErrors.append( $('<p/>').text('Please enter "' + txt.replace('*','') + '"') );

			if ( this.element.name == "email" && this.element.value.length >0 ) {
				validationErrors.append( $('<p/>').text('"Email" is invalid') );
			} else {
				if ( (this.element.name == "phonenumber1" && this.element.value.length >0 ) ||
					(this.element.name == "phonenumber2" ) || (this.element.name == "phonenumber3")) {
					validationErrors.append( $('<p/>').text('"Phone" is invalid') );
				} else if ( this.element.name == "bank" ) {
					validationErrors.append( $('<p/>').text('Please make a choice for "'+txt.replace('*','')+'"') );
				} else if ( this.element.name == "help" ) {
					validationErrors.append( $('<p/>').text('Please let us know "'+txt.replace('*','')+'"') );
				} else {
				// validationErrors.append( $('<p/>').text('"'+txt.replace('*','') +'" is required') );
				validationErrors.append( $('<p/>').text('Please enter "' + txt.replace('*','') + '"') );
				}
			}

		}
	} );

	if (this.settings.unhighlight) {
		for ( var i = 0, elements = this.validElements(); elements[i]; i++ ) {
			this.settings.unhighlight.call( this, elements[i], this.settings.errorClass, this.settings.validClass );
		}
	}

	return false;
}var ub = window.ub;

$.extend(ub.pages, {
	LeadGenerationForm : (function(){
		function _init() {
			var f = $('.contact-form');
			var formSteps = f.find('.step');

			_initForm.call(this, f);

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

			f.find('#lead-gen-go-back').click(function(){
				f.find('.step').hide();
				f.find('.step-1').show();
				return false;
			});

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			}).first().click();

			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3' },
				rules : {
					firstname : { required : true , noxss : true },
					lastname  : { required : true , noxss : true },
					youare  : { required : true },
					help :{ required : true },
					phonenumber1 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber2 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber3 : { required: phoneRule, number : true, minlength : 4, maxlength : 4 },
					companyname  : { required : true , noxss : true },
					annualrevenue : { required : true },
					city : { required : true },
					state : { required : true },
					email : { required : true, email : true , noxss : true },
					zipcode : {required: '#field-state #zipcode', maxlength:5, number:true}
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					var f = $(form),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						data = {
							bank : 'No'
						};

					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v); });

					if ( prev.hasClass('step-2') ) {
						$.post( f.attr('action'), f.serialize(), function(data){
							$('#current-dialog').dialog('close');
						});
					}

					prev.hide();
					current.show();

					return false;
				}
			});
		}

		return { init : _init };
	})(),

	LeadGenerationSmallBusinessForm : (function(){
		function _init() {
			var f = $('.contact-form');
			var formSteps = f.find('.step');

			_initForm.call(this, f);

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";
			

			f.find('#lead-gen-go-back').click(function(){
				f.find('.step').hide();
				f.find('.step-1').show();
				return false;
			});

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			}).first().click();
			// mks ubr-18200 ----------------------------------------
		try {
		if (cmCreateConversionEventTag) {
			cmCreateConversionEventTag("Small Business: Business Focus email newsletter", "1", "Download");
		}
		} catch (e) {
		// ignore exceptions... just make sure that when
		// Coremetrics fails it doesn't break anything else :-)
		}
		// mks ubr-18200 [end] ----------------------------------
			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3' },
				rules : {
					prefix : { required : true},
					firstname : { required : true , noxss : true },
					lastname  : { required : true , noxss : true },
					youare  : { required : false },
					yourtitle : { required : true, noxss : true  },
					help :{ required : true },
					phonenumber1 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber2 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber3 : { required: phoneRule, number : true, minlength : 4, maxlength : 4 },
					companyname  : { required : true , noxss : true },
					primaryindustry : { required : false , noxss : true },
					annualrevenue : { required : false },
					city : { required : true },
					state : { required : true },
					email : { required : true, email : true , noxss : true },
					zipcode : {required: '#field-state #zipcode', maxlength:5, number:true}
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					var f = $(form),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						data = {
							bank : 'No'
						};
			// mks ubr-18200 ----------------------------------------
		try {
			if (cmCreateConversionEventTag) {
			cmCreateConversionEventTag("Small Business: Business Focus email newsletter", "2", "Download");
			}
		} catch (e) {
			// ignore exceptions... just make sure that when
			// Coremetrics fails it doesn't break anything else :-)
		}
		// mks ubr-18200 [end] ----------------------------------
		
					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v); });

					if ( prev.hasClass('step-2') ) {
						var f = $(form);
						$.post( f.attr('action'), f.serialize(), function(data){
						// $('#current-dialog').dialog('close');
						});
					}

					prev.hide();
					current.show();

					return false;
				}
			});
		}

		return { init : _init };
	})(),

	LeadGenerationCommercialForm : (function(){
		function _init() {
			var f = $('.contact-form');
			var formSteps = f.find('.step');

			_initForm.call(this, f);

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

			f.find('#lead-gen-go-back').click(function(){
				f.find('.step').hide();
				f.find('.step-1').show();
				return false;
			});

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			}).first().click();
	// mks ubr-18200 ----------------------------------------
	try {
		if (cmCreateConversionEventTag) {
		cmCreateConversionEventTag("Commercial Bank", "1", "Download");
		}
	} catch (e) {
		// ignore exceptions... just make sure that when
		// Coremetrics fails it doesn't break anything else :-)
	}
	// mks ubr-18200 [end] ----------------------------------	
			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3' },
				rules : {
					prefix : { required : true},
					firstname : { required : true , noxss : true },
					lastname  : { required : true , noxss : true },
					youare  : { required : false },
					yourtitle : { required : true , noxss : true },
					help :{ required : true },
					phonenumber1 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber2 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber3 : { required: phoneRule, number : true, minlength : 4, maxlength : 4 },
					companyname  : { required : true, noxss : true  },
					primaryindustry : { required : false , noxss : true },
					annualrevenue : { required : true },
					city : { required : true },
					state : { required : true },
					email : { required : true, email : true , noxss : true },
					zipcode : {required: '#field-state #zipcode', maxlength:5, number:true}
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					var f = $(form),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						data = {
							bank : 'No'
						};
		// mks ubr-18200 ----------------------------------------
		try {
			if (cmCreateConversionEventTag) {
			cmCreateConversionEventTag("Commercial Bank", "2", "Download");
			}
		} catch (e) {
			// ignore exceptions... just make sure that when
			// Coremetrics fails it doesn't break anything else :-)
		}
		// mks ubr-18200 [end] ----------------------------------	
					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v); });

					if ( prev.hasClass('step-2') ) {
						var f = $(form);
						$.post( f.attr('action'), f.serialize(), function(data){
						// $('#current-dialog').dialog('close');
						});
					}

					prev.hide();
					current.show();

					return false;
				}
			});
		}

		return { init : _init };
	})(),

	LeadGenerationPersonalForm : (function(){
		function _init() {
			var f = $('.contact-form');
			var formSteps = f.find('.step');

			_initForm.call(this, f);

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

			f.find('#lead-gen-go-back').click(function(){
				f.find('.step').hide();
				f.find('.step-1').show();
				return false;
			});

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			}).first().click();
	// mks ubr-18200 ----------------------------------------
	try {
		if (cmCreateConversionEventTag) {
		cmCreateConversionEventTag("Personal", "1", "Download");
		}
	} catch (e) {
		// ignore exceptions... just make sure that when
		// Coremetrics fails it doesn't break anything else :-)
	}
	// mks ubr-18200 [end] ----------------------------------	
			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3' },
				rules : {
					prefix : { required : true},
					firstname : { required : true , noxss : true },
					lastname  : { required : true , noxss : true },
					youare  : { required : false },
					yourtitle : { required : true , noxss : true },
					help :{ required : true },
					phonenumber1 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber2 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber3 : { required: phoneRule, number : true, minlength : 4, maxlength : 4 },
					companyname  : { required : true , noxss : true },
					annualrevenue : { required : true },
					city : { required : true },
					state : { required : true },
					email : { required : true, email : true , noxss : true },
					zipcode : {required: '#field-state #zipcode', maxlength:5, number:true}
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					var f = $(form),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						data = {
							bank : 'No'
						};
		// mks ubr-18200 ----------------------------------------
		try {
			if (cmCreateConversionEventTag) {
			cmCreateConversionEventTag("Personal", "2", "Download");
			}
		} catch (e) {
			// ignore exceptions... just make sure that when
			// Coremetrics fails it doesn't break anything else :-)
		}
		// mks ubr-18200 [end] ----------------------------------	
					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v); });

					if ( prev.hasClass('step-2') ) {
						var f = $(form);
						$.post( f.attr('action'), f.serialize(), function(data){
						//  $('#current-dialog').dialog('close');
						});
					}

					prev.hide();
					current.show();

					return false;
				}
			});
		}

		return { init : _init };
	})(),

	LeadGenerationPrivateBankForm : (function(){
		function _init() {
			var f = $('.contact-form');
			var formSteps = f.find('.step');

			_initForm.call(this, f);

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

			f.find('#lead-gen-go-back').click(function(){
				f.find('.step').hide();
				f.find('.step-1').show();
				return false;
			});

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			}).first().click();
	// mks ubr-18200 ----------------------------------------
	try {
		if (cmCreateConversionEventTag) {
		cmCreateConversionEventTag("Private Bank: Financial Focus", "1", "Download");
		}
	} catch (e) {
		// ignore exceptions... just make sure that when
		// Coremetrics fails it doesn't break anything else :-)
	}
	// mks ubr-18200 [end] ----------------------------------	
			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3' },
				rules : {
					prefix : { required : true},
					firstname : { required : true, noxss : true },
					lastname  : { required : true, noxss : true },
					youare  : { required : false },
					yourtitle : { required : true, noxss : true },
					help :{ required : true },
					phonenumber1 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber2 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber3 : { required: phoneRule, number : true, minlength : 4, maxlength : 4 },
					companyname  : { required : true, noxss : true  },
					annualrevenue : { required : true },
					city : { required : true },
					state : { required : true },
					email : { required : true, email : true, noxss : true },
					zipcode : {required: true, maxlength:5, number:true}
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					var f = $(form),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						data = {
							bank : 'No'
						};
		// mks ubr-18200 ----------------------------------------
		try {
			if (cmCreateConversionEventTag) {
			cmCreateConversionEventTag("Private Bank: Financial Focus", "2", "Download");
			}
		} catch (e) {
			// ignore exceptions... just make sure that when
			// Coremetrics fails it doesn't break anything else :-)
		}
		// mks ubr-18200 [end] ----------------------------------	
					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v); });

					if ( prev.hasClass('step-2') ) {
						var f = $(form);
						$.post( f.attr('action'), f.serialize(), function(data){
						//  $('#current-dialog').dialog('close');
						});
					}

					prev.hide();
					current.show();

					return false;
				}
			});
		}

		return { init : _init };
	})(),

	LeadGenerationUBISForm : (function(){
		function _init() {
			var f = $('.contact-form');
			var formSteps = f.find('.step');

			_initForm.call(this, f);

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

			f.find('#lead-gen-go-back').click(function(){
				f.find('.step').hide();
				f.find('.step-1').show();
				return false;
			});

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			}).first().click();
	// mks ubr-18200 ----------------------------------------
	try {
		if (cmCreateConversionEventTag) {
		cmCreateConversionEventTag("UBIS", "1", "Download");
		}
	} catch (e) {
		// ignore exceptions... just make sure that when
		// Coremetrics fails it doesn't break anything else :-)
	}
	// mks ubr-18200 [end] ----------------------------------	
			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3' },
				rules : {
					prefix : { required : true},
					firstname : { required : true, noxss : true  },
					lastname  : { required : true , noxss : true },
					youare  : { required : false },
					yourtitle : { required : true, noxss : true  },
					help :{ required : true },
					phonenumber1 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber2 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber3 : { required: phoneRule, number : true, minlength : 4, maxlength : 4 },
					companyname  : { required : true , noxss : true },
					annualrevenue : { required : true },
					city : { required : true },
					state : { required : true },
					email : { required : true, email : true , noxss : true },
					zipcode : {required: true, maxlength:5, number:true}
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					var f = $(form),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						data = {
							bank : 'No'
						};
		// mks ubr-18200 ----------------------------------------
		try {
			if (cmCreateConversionEventTag) {
			cmCreateConversionEventTag("UBIS", "2", "Download");
			}
		} catch (e) {
			// ignore exceptions... just make sure that when
			// Coremetrics fails it doesn't break anything else :-)
		}
		// mks ubr-18200 [end] ----------------------------------	
					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v); });

					if ( prev.hasClass('step-2') ) {
						var f = $(form);
						$.post( f.attr('action'), f.serialize(), function(data){
						//  $('#current-dialog').dialog('close');
						});
					}

					prev.hide();
					current.show();

					return false;
				}
			});
		}

		return { init : _init };
	})(),

	Calculator : (function(){
		function _init() {
			var f = $('.calculator-content form');

			_initForm.call(this, f);

			var r1= function(){return $('.field-5-inline input:blank').length == 3;};

			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { },
				rules : {
					'annual-income' : {required : r1 },
					'purchace-price' : {required : r1 },
					'total-montly-payment' : {required : r1 },
					'interestrate' : {required : true },
					'downpayment': {required : true },
					'propertytax': {required : true },
					'term': {required : true },
					'homeinsurance': {required : true },
					'loanorigination': {required : true },
					'pointspaid': {required : true },
					'otherclosingcosts': {required : true }
				},
				showErrors : _formShowErrors
			});
		}

		return { init : function(){ $(_init); } };
	})(),

	ContactForm : (function(){
		function _init() {
			var f = $('.contact-form');

			_initForm.call(this, f);

			var extraFields = {
				'personal' : '#field-best-time-to-reach-you',
				'small-business' : '#field-best-time-to-reach-you,fieldset#company-data',
				'commercial-institutional' : '#field-best-time-to-call,fieldset#company-data',
				'the-private-bank' : '#field-best-time-to-call, #datepicker'
			};
			// remove all extra fields but the current lob
			f.find( ub.utils.values( extraFields ).join(',') ).not( extraFields[ $('html').attr('id') ] ).remove();

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

			$("#datepicker").attr("autocomplete","off").datepicker({
				minDate : new Date(),
				beforeShowDay: $.datepicker.noWeekends,
				dateFormat:'mm/dd/y',
				closeText : 'Close',
				dayNamesMin : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
				showButtonPanel:true
			});

			$('#zipcode').parent().find('em').hide();

			$('#the-private-bank #zipcode').parent().find('em').show();

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			}).first().click();

			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3' },
				rules : {
					firstname : { required : true , noxss : true },
					lastname  : { required : true , noxss : true },
					email:{ required: "#contactmethodmail:checked", email: true , noxss : true },
					bank :{ required : true },
					help :{ required : true , noxss : true },
					phonenumber1 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber2 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber3 : { required: phoneRule, number : true, minlength : 4, maxlength : 4 },
					companyname  : { required : true , noxss : true },
					annualrevenue : { required : true },
					city : { required : true },
					state : { required : true },
					zipcode : {
						required: function(){
							return $('#the-private-bank #zipcode').length > 0;
						},
						minlength:5, maxlength:5, number:true
					}
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					var f = $(form),
						formSteps = f.find('.step'),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						data = { bank : 'No' };

					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v); });

					$.post( f.attr('action'), f.serialize(), function(data){
						$('.contact-form-content').parent().html(data);
					});

					prev.hide();
					current.show();

					return false;
				}
			});
		}

		return { init : _init };
	})(),

	ContactPriorityForm : (function(){
		function _init() {
			var f = $('.contact-form');

			_initForm.call(this, f);

		// var extraFields = {
		//     'personal' : '#field-best-time-to-reach-you',
		//     'small-business' : '#field-best-time-to-reach-you,fieldset#company-data',
		//     'commercial-institutional' : '#field-best-time-to-call,fieldset#company-data',
		//     'the-private-bank' : '#field-best-time-to-call, #datepicker'
		// };
			// remove all extra fields but the current lob
		// f.find( ub.utils.values( extraFields ).join(',') ).not( extraFields[ $('html').attr('id') ] ).remove();

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

				$("#datepicker").attr("autocomplete","off").datepicker({
					minDate : new Date(new Date().getTime() + 86400000),
					beforeShowDay: $.datepicker.noWeekends,
					dateFormat:'mm/dd/y',
					closeText : 'Close',
					dayNamesMin : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					showButtonPanel:true
				});
		// mks ubr-18200 ----------------------------------------
		try {
		if (cmCreateConversionEventTag) {
			cmCreateConversionEventTag("Contact Priority", "1", "ContactMe");
		}
		} catch (e) {
		// ignore exceptions... just make sure that when
		// Coremetrics fails it doesn't break anything else :-)
		}
		// mks ubr-18200 [end] ----------------------------------

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#datepicker').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
			if( r ) { $('#contact-method-mail').addClass('required'); }
			else    { $('#contact-method-phone').addClass('required'); }
			});
			//}).first().click();

			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3',
			contactmethod: 'contactmethodmail contactmethodphone'
				},
				rules : {
					firstname : { required : true , noxss : true },
					lastname  : { required : true , noxss : true },
					email:{ required: "#contactmethodmail:checked", email: true , noxss : true },
					contactmethod:{ required: true },
					bank :{ required : true },
					help :{ required : true , noxss : true },
					contactmethodmail: {
							required: function() {
								return ($('#contactmethodphone:checked').length === 0);
							}
						},
					contactmethodphone: {
							required: function() {
								return ($('#contactmethodmail:checked').length === 0);
							}
						},
					phonenumber1 : { required: phoneRule, number : true, minlength : 3, maxlength : 3},
					phonenumber2 : { required: phoneRule, number : true, minlength : 3, maxlength : 3},
					phonenumber3 : { required: phoneRule, number : true, minlength : 4, maxlength : 4},
					companyname  : { required : true , noxss : true  },
					annualrevenue : { required : true },
					city : { required : true },
					state : { required : true },
					zipcode : {required: false, maxlength:5, number:true}
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					var f = $(form),
						formSteps = f.find('.step'),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						currentnext = current.next();
						data = { bank : 'No' };
		// mks ubr-18200 ----------------------------------------
		try {
			if (cmCreateConversionEventTag) {
			cmCreateConversionEventTag("Contact Priority", "2", "ContactMe");
			}
		} catch (e) {
			// ignore exceptions... just make sure that when
			// Coremetrics fails it doesn't break anything else :-)
		}
		// mks ubr-18200 [end] ----------------------------------
					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v);});
					$.each( data, function(k, v){ currentnext.find('.field.' + k).text( v);});

					$.post( f.attr('action'), f.serialize(), function(data){
						$('.contact-form-content').parent().html(data);
					});

					prev.hide();

					if ( $('#contactmethodmail').is(':checked') ) {
						currentnext.show();
					} else {
						current.show();
					}

					return false;
				}
			});
		}
		return { init : _init };
	})(),

	ContactPriority1Form: (function() {
			function _init() {
				var f = $('.contact-form');

				_initForm.call(this, f);

//                var extraFields = {
//                   'personal': '#form-title, #field-best-time-to-reach-you, #bank-with-union-bank, #disclosure',
//                    'small-business': '#form-title, #field-best-time-to-reach-you,fieldset#company-data, #bank-with-union-bank, #disclosure',
//                   'commercial-institutional': '#form-title, #field-best-time-to-call,#bank-with-union-bank, fieldset#company-data',
//                    'the-private-bank': '#form-title-private-bank, #field-best-time-to-call-private, #datepicker, #bank-with-union-bank '
//                };

				// remove all extra fields but the current lob
//                f.find(ub.utils.values(extraFields).join(',')).not(extraFields[$('html').attr('id')]).remove();

				f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
				var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

				$("#datepicker").attr("autocomplete", "off").datepicker({
					minDate: _getTomorrowDate(),
					beforeShowDay: $.datepicker.noWeekends,
					dateFormat: 'mm/dd/y',
					closeText: 'Close',
					dayNamesMin: ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					showButtonPanel: true
				});
		

				$('#zipcode').parent().find('em').hide();

				$('#the-private-bank #zipcode').parent().find('em').show();
				$('#the-private-bank').parent().find('#field-zipcode').addClass('required');

				$('#bank').parent().find('em').hide();

				$('#personal #bank').parent().find('em').show();
				$('#personal').parent().find('#field-bank').addClass('required');
				$('#small-business #bank').parent().find('em').show();
				$('#small-business').parent().find('#field-bank').addClass('required');

				f.find('[name="contactmethodphone"]').click(function() {
					$('#besttimetocall').attr('disabled', false);
					$('#besttimetocallprivate').attr('disabled', false);
					$('#besttimetocall').attr('disabled', false);
					$('#datepicker').attr('disabled', false);
					$('#contact-method-mail,#contact-method-phone').removeClass('required');
					$('#contact-method-phone').addClass('required');
					$('#contactmethodmail:checked', false);
					$('#contactmethodmail')[0].checked = !$('#contactmethodphone')[0].checked;
				});

				f.find('[name="contactmethodmail"]').click(function() {
					$('#besttimetocall').attr('disabled', true);
					$('#besttimetocallprivate').attr('disabled', true);
					$('#besttimetoreach').attr('disabled', true);
					$('#datepicker').attr('disabled', true);
					$('#contact-method-mail,#contact-method-phone').removeClass('required');
					$('#contact-method-mail').addClass('required');
					$('#contactmethodphone')[0].checked = !$('#contactmethodmail')[0].checked;
				});

				f.find('[name="bankyes"]').click(function() {
					$('#bankno')[0].checked = !$('#bankyes')[0].checked;
				});

				f.find('[name="bankno"]').click(function() {
					$('#bankyes')[0].checked = !$('#bankno')[0].checked;
				});

				f.validate({
					onfocusout: false, onkeyup: false, onclick: false,
					errorClass: 'invalid',
					groups: {
						phone: 'phonenumber1 phonenumber2 phonenumber3',
						contactmethod: 'contactmethodmail contactmethodphone',
						bank: 'bankyes bankno'
					},
					rules: {
						firstname: { required: true, maxlength: 32 , noxss : true },
						lastname: { required: true, maxlength: 32 , noxss : true },
						contactmethod:{ required: true },
						bank :{ required : true },
						email: { required: "#contactmethodmail:checked", email: true , noxss : true },
						contactmethodmail: {
							required: function() {
								return ($('#contactmethodphone:checked').length === 0);
							}
						},
						contactmethodphone: {
							required: function() {
								return ($('#contactmethodmail:checked').length === 0);
							}
						},
						bankyes: {
							required: function() {
								return (($('#personal').length > 0 || $('#small-business').length > 0) &&
										$('#bankno:checked').length === 0);
							}
						},
						bankno: {
							required: function() {
								return (($('#personal').length > 0 || $('#small-business').length > 0) &&
										$('#bankyes:checked').length === 0);
							}
						},
						help: { required: true , noxss : true },
						phonenumber1: { required: phoneRule, number: true, minlength: 3, maxlength: 3 },
						phonenumber2: { required: phoneRule, number: true, minlength: 3, maxlength: 3 },
						phonenumber3: { required: phoneRule, number: true, minlength: 4, maxlength: 4 },
						companyname: { required: true , noxss : true },
						annualrevenue: { required: true },
						city: { required: true },
						state: { required: true },
						zipcode: {
							required: function() {
								return $('#the-private-bank #zipcode').length > 0;
							},
							minlength: 5, maxlength: 5, number: true
						}
					},
					showErrors: _formShowErrors,
					submitHandler: function(form) {
		var f = $(form),
						formSteps = f.find('.step'),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
												currentnext = current.next();
						data = { bank : 'No' };
				
					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v);});
										$.each( data, function(k, v){ currentnext.find('.field.' + k).text( v);});

					$.post( f.attr('action'), f.serialize(), function(data){
						$('.contact-form-content').parent().html(data);
					});

					prev.hide();

										if ( $('#contactmethodmail').is(':checked') ) {
												currentnext.show();
										} else {
												current.show();
										}

					return false;

					}
				});
			}

			return { init: _init };
		})(),

	ContactSmallBusinessForm : (function(){
		function _init() {
			var f = $('.contact-form');

			_initForm.call(this, f);

		// var extraFields = {
		//     'personal' : '#field-best-time-to-reach-you',
		//     'small-business' : '#field-best-time-to-reach-you,fieldset#company-data',
		//     'commercial-institutional' : '#field-best-time-to-call,fieldset#company-data',
		//     'the-private-bank' : '#field-best-time-to-call, #datepicker'
		// };
			// remove all extra fields but the current lob
		// f.find( ub.utils.values( extraFields ).join(',') ).not( extraFields[ $('html').attr('id') ] ).remove();

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

				$("#datepicker").attr("autocomplete","off").datepicker({
					minDate : new Date(new Date().getTime() + 86400000),
					beforeShowDay: $.datepicker.noWeekends,
					dateFormat:'mm/dd/y',
					closeText : 'Close',
					dayNamesMin : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					showButtonPanel:true
				});

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#datepicker').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			});
			//}).first().click();

			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3',
			contactmethod: 'contactmethodmail contactmethodphone'
		},
				rules : {
					firstname : { required : true , noxss : true },
					lastname  : { required : true , noxss : true },
					email:{ required: "#contactmethodmail:checked", email: true , noxss : true },
					contactmethod:{ required: true },
					bank :{ required : true },
					help :{ required : true , noxss : true },
					contactmethodmail: {
							required: function() {
								return ($('#contactmethodphone:checked').length === 0);
							}
						},
					contactmethodphone: {
							required: function() {
								return ($('#contactmethodmail:checked').length === 0);
							}
						},
					phonenumber1 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber2 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber3 : { required: phoneRule, number : true, minlength : 4, maxlength : 4 },
					companyname  : { required : true , noxss : true },
					primaryindustry : { required : false , noxss : true },
					zipcode : {required: false, maxlength:5, number:true}
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					var f = $(form),
						formSteps = f.find('.step'),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						currentnext = current.next();
						data = { bank : 'No' };

					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v);});
					$.each( data, function(k, v){ currentnext.find('.field.' + k).text( v);});

					$.post( f.attr('action'), f.serialize(), function(data){
						$('.contact-form-content').parent().html(data);
					});

					prev.hide();

					if ( $('#contactmethodmail').is(':checked') ) {
						currentnext.show();
					} else {
						current.show();
					}

					return false;
				}
			});
		}

		return { init : _init };
	})(),

	ContactCommercialForm : (function(){
		function _init() {
			var f = $('.contact-form');

			_initForm.call(this, f);

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

				$("#datepicker").attr("autocomplete","off").datepicker({
					minDate        : new Date(new Date().getTime() + 86400000),
					beforeShowDay  : $.datepicker.noWeekends,
					dateFormat     : 'mm/dd/y',
					closeText      : 'Close',
					dayNamesMin    : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					showButtonPanel: true
				});
		
		// mks ubr-18200 ----------------------------------------
		try {
		if (cmCreateConversionEventTag) {
			cmCreateConversionEventTag("Contact Commercial", "1", "ContactMe");
		}
		} catch (e) {
		// ignore exceptions... just make sure that when
		// Coremetrics fails it doesn't break anything else :-)
		}
		// mks ubr-18200 [end] ----------------------------------

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#datepicker').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			});

			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3',
						contactmethod: 'contactmethodmail contactmethodphone'
						},
				rules : {
					firstname        : { required : true , noxss : true },
					lastname         : { required : true , noxss : true },
					email            : { required : "#contactmethodmail:checked", email: true , noxss : true },
					contactmethod    : { required : true },
					help             : { required : true , noxss_textarea : true },
					contactmethodmail: { required : function() {
								return ($('#contactmethodphone:checked').length === 0);
							}
						},
					contactmethodphone: { required : function() {
								return ($('#contactmethodmail:checked').length === 0);
							}
						},
					phonenumber1    : { required : phoneRule, digits : true, minlength : 3, maxlength : 3 },
					phonenumber2    : { required : phoneRule, digits : true, minlength : 3, maxlength : 3 },
					phonenumber3    : { required : phoneRule, digits : true, minlength : 4, maxlength : 4 },
					companyname     : { required : true,  noxss : true },
					primaryindustry : { required : false, noxss : true },
					annualrevenue   : { required : true },
					zipcode         : { required : false, digits : true, minlength : 5, maxlength:5}
				},  // rules
				showErrors : _formShowErrors,
				submitHandler :function(form){
					// mks ubr-18200 ----------------------------------------
					try {
						if (cmCreateConversionEventTag) {
							cmCreateConversionEventTag("Contact Commercial", "2", "ContactMe");
						}
					} catch (e) {
						// ignore exceptions... just make sure that when
						// Coremetrics fails it doesn't break anything else :-)
					}
					// mks ubr-18200 [end] ----------------------------------
					var f = $(form),
						formSteps = f.find('.step'),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						currentnext = current.next();
						data = { bank : 'No' };

					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v);});
					$.each( data, function(k, v){ currentnext.find('.field.' + k).text( v);});

					$.post( f.attr('action'), f.serialize(), function(data){
						$('.contact-form-content').parent().html(data);
					});

					prev.hide();

					if ( $('#contactmethodmail').is(':checked') ) {
						currentnext.show();
					} else {
						current.show();
					}

					return false;
				} // submitHandler()
			});
		}

		return { init : _init };
	})(),

	ContactFinancialInstitutionForm : (function(){
		function _init() {
			var f = $('.contact-form');

			_initForm.call(this, f);

		// var extraFields = {
		//     'personal' : '#field-best-time-to-reach-you',
		//     'small-business' : '#field-best-time-to-reach-you,fieldset#company-data',
		//     'commercial-institutional' : '#field-best-time-to-call,fieldset#company-data',
		//     'the-private-bank' : '#field-best-time-to-call, #datepicker'
		// };
			// remove all extra fields but the current lob
		// f.find( ub.utils.values( extraFields ).join(',') ).not( extraFields[ $('html').attr('id') ] ).remove();

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

				$("#datepicker").attr("autocomplete","off").datepicker({
					minDate : new Date(new Date().getTime() + 86400000),
					beforeShowDay: $.datepicker.noWeekends,
					dateFormat:'mm/dd/y',
					closeText : 'Close',
					dayNamesMin : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					showButtonPanel:true
				});
		// mks ubr-18200 ----------------------------------------
		try {
		if (cmCreateConversionEventTag) {
			cmCreateConversionEventTag("Find An Expert", "1", "ContactMe");
		}
		} catch (e) {
		// ignore exceptions... just make sure that when
		// Coremetrics fails it doesn't break anything else :-)
		}
		// mks ubr-18200 [end] ----------------------------------
			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#timezone').attr('disabled', r);
				$('#datepicker').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			});
			//}).first().click();

			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3',
						contactmethod: 'contactmethodmail contactmethodphone'
		},
				rules : {
					firstname : { required : true , noxss : true },
					lastname  : { required : true , noxss : true },
					email:{ required: "#contactmethodmail:checked", email: true , noxss : true },
					contactmethod:{ required: true },
					//bank :{ required : true },
					help :{ required : true , noxss : true },
					contactmethodmail: {
							required: function() {
								return ($('#contactmethodphone:checked').length === 0);
							}
						},
					contactmethodphone: {
							required: function() {
								return ($('#contactmethodmail:checked').length === 0);
							}
						},
					phonenumber1 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber2 : { required: phoneRule, number : true, minlength : 3, maxlength : 3 },
					phonenumber3 : { required: phoneRule, number : true, minlength : 4, maxlength : 4 },
					companyname  : { required : true , noxss : true },
					totalassets : { required : true },
					zipcode : {required: false, maxlength:5, number:true}
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					var f = $(form),
						formSteps = f.find('.step'),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						currentnext = current.next();
						data = { bank : 'No' };
		// mks ubr-18200 ----------------------------------------
		try {
			if (cmCreateConversionEventTag) {
			cmCreateConversionEventTag("Find An Expert", "2", "ContactMe");
			}
		} catch (e) {
			// ignore exceptions... just make sure that when
			// Coremetrics fails it doesn't break anything else :-)
		}
		// mks ubr-18200 [end] ----------------------------------
					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v);});
					$.each( data, function(k, v){ currentnext.find('.field.' + k).text( v);});

					$.post( f.attr('action'), f.serialize(), function(data){
						$('.contact-form-content').parent().html(data);
					});

					prev.hide();

					if ( $('#contactmethodmail').is(':checked') ) {
						currentnext.show();
					} else {
						current.show();
					}

					return false;
				}
			});
		}

		return { init : _init };
	})(),

	ContactPrivateBankForm : (function(){
		function _init() {
			var f = $('.contact-form');

			_initForm.call(this, f);

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

			$("#datepicker").attr("autocomplete","off").datepicker({
				minDate        : new Date(new Date().getTime() + 86400000),
				beforeShowDay  : $.datepicker.noWeekends,
				dateFormat     : 'mm/dd/y',
				closeText      : 'Close',
				dayNamesMin    : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
				showButtonPanel: true
			});
	// mks ubr-18200 ----------------------------------------
	try {
		if (cmCreateConversionEventTag) {
		cmCreateConversionEventTag("Contact Private Bank", "1", "ContactMe");
		}
	} catch (e) {
		// ignore exceptions... just make sure that when
		// Coremetrics fails it doesn't break anything else :-)
	}
	// mks ubr-18200 [end] ----------------------------------

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#datepicker').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			});

			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3',
						contactmethod: 'contactmethodmail contactmethodphone'
						},
				rules : {
					firstname : { required : true , noxss : true },
					lastname  : { required : true , noxss : true },
					//email:{ required: true, email: true },
					email:{ required: "#contactmethodmail:checked", email : true , noxss : true },
					contactmethod:{ required: true },
					bank :{ required : false },
					help :{ required : true, noxss_textarea : true },
					contactmethodmail: {
							required: function() {
								return ($('#contactmethodphone:checked').length === 0);
							}
						},
					contactmethodphone: {
							required: function() {
								return ($('#contactmethodmail:checked').length === 0);
							}
						},
					phonenumber1 : { required: phoneRule, digits : true, minlength : 3, maxlength : 3},
					phonenumber2 : { required: phoneRule, digits : true, minlength : 3, maxlength : 3},
					phonenumber3 : { required: phoneRule, digits : true, minlength : 4, maxlength : 4},
					zipcode      : { required: true,      digits : true, minlength : 5, maxlength : 5}
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					// mks ubr-18200 ----------------------------------------
					try {
						if (cmCreateConversionEventTag) {
							cmCreateConversionEventTag("Contact Private Bank", "2", "ContactMe");
						}
					} catch (e) {
						// ignore exceptions... just make sure that when
						// Coremetrics fails it doesn't break anything else :-)
					}
					// mks ubr-18200 [end] ----------------------------------

					var f = $(form),
						formSteps = f.find('.step'),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						currentnext = current.next();
						data = { bank : 'No' };

					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v);});
					$.each( data, function(k, v){ currentnext.find('.field.' + k).text( v);});

					$.post( f.attr('action'), f.serialize(), function(data){
						$('.contact-form-content').parent().html(data);
					});

					prev.hide();

					if ( $('#contactmethodmail').is(':checked') ) {
						currentnext.show();
					} else {
						current.show();
					}

					return false;
				}
			});
		}

		return { init : _init };
	})(),

	ContactUBISForm : (function(){
		function _init() {
			var f = $('.contact-form');

			_initForm.call(this, f);

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

			$("#datepicker").attr("autocomplete","off").datepicker({
				minDate        : new Date(new Date().getTime() + 86400000),
				beforeShowDay  : $.datepicker.noWeekends,
				dateFormat     : 'mm/dd/y',
				closeText      : 'Close',
				dayNamesMin    : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
				showButtonPanel: true
			});
			// mks ubr-18200 ----------------------------------------
	try {
		if (cmCreateConversionEventTag) {
		cmCreateConversionEventTag("Contact UBIS", "1", "ContactMe");
		}
	} catch (e){
		// ignore exceptions... just make sure that when
		// Coremetrics fails it doesn't break anything else :-)
	}
	// mks ubr-18200 [end] ----------------------------------
		
			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#datepicker').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			});

			f.validate({
				onfocusout : false,
				onkeyup    : false,
				onclick    : false,
				errorClass : 'invalid',
				groups     : { phone        : 'phonenumber1 phonenumber2 phonenumber3',
							contactmethod: 'contactmethodmail contactmethodphone'
							},
				rules : {
					firstname        : { required : true , noxss : true },
					lastname         : { required : true , noxss : true },
					email            : { required : "#contactmethodmail:checked", email: true , noxss : true },
					contactmethod    : { required : true },
					bank             : { required : false },
					help             : { required : true, noxss_textarea : true },
					contactmethodmail: { required: function() {
								return ($('#contactmethodphone:checked').length === 0);
							}
						},
					contactmethodphone: { required: function() {
								return ($('#contactmethodmail:checked').length === 0);
							}
						},
					phonenumber1 : { required: phoneRule, digits : true, minlength : 3, maxlength : 3},
					phonenumber2 : { required: phoneRule, digits : true, minlength : 3, maxlength : 3},
					phonenumber3 : { required: phoneRule, digits : true, minlength : 4, maxlength : 4},
					zipcode      : { required: true,      digits : true, minlength : 5, maxlength : 5}
				}, // rules
				showErrors    : _formShowErrors,
				submitHandler : function(form){
					// mks ubr-18200 ----------------------------------------
					try {
						if (cmCreateConversionEventTag) {
							cmCreateConversionEventTag("Contact UBIS", "2", "ContactMe");
						}
					} catch (e){
						// ignore exceptions... just make sure that when
						// Coremetrics fails it doesn't break anything else :-)
					}
					// mks ubr-18200 [end] ----------------------------------

					var f = $(form),
						formSteps = f.find('.step'),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						currentnext = current.next();
						data = { bank : 'No' };

					$.each( f.serializeArray(), function(){ data[this.name] = this.value; });
					$.each( data, function(k, v){ current.find('.field.' + k).text( v);});
					$.each( data, function(k, v){ currentnext.find('.field.' + k).text( v);});

					$.post( f.attr('action'), f.serialize(), function(data){
						$('.contact-form-content').parent().html(data);
					});

					prev.hide();

					if ( $('#contactmethodmail').is(':checked') ) {
						currentnext.show();
					} else {
						current.show();
					}

					return false;
				} // submitHandler()
			}); // f.validate();
		}

		return { init : _init };
	})(),

	ContactPersonalHomeForm : (function(){
		function _init() {
			var f = $('.contact-form');

			_initForm.call(this, f);

		// var extraFields = {
		//     'personal' : '#field-best-time-to-reach-you',
		//     'small-business' : '#field-best-time-to-reach-you,fieldset#company-data',
		//     'commercial-institutional' : '#field-best-time-to-call,fieldset#company-data',
		//     'the-private-bank' : '#field-best-time-to-call, #datepicker'
		// };
			// remove all extra fields but the current lob
		// f.find( ub.utils.values( extraFields ).join(',') ).not( extraFields[ $('html').attr('id') ] ).remove();

			f.find('#phonenumber1, #phonenumber2, #phonenumber3').nextOnFilled();
			var phoneRule = "#contactmethodphone:checked,#phonenumber1[value!=''],#phonenumber2[value!=''],#phonenumber3[value!='']";

				$("#datepicker").attr("autocomplete","off").datepicker({
					minDate : new Date(new Date().getTime() + 86400000),
					beforeShowDay: $.datepicker.noWeekends,
					dateFormat:'mm/dd/y',
					closeText : 'Close',
					dayNamesMin : ['S', 'M', 'T', 'W', 'T', 'F', 'S'],
					showButtonPanel:true
				});

			f.find('[name="contactmethod"]').click(function(){
				var r = $('#contactmethodphone:checked').length === 0;
				$('#besttimetocall').attr('disabled', r);
				$('#datepicker').attr('disabled', r);
				$('#contact-method-mail,#contact-method-phone').removeClass('required');
				if( r ) { $('#contact-method-mail').addClass('required'); }
				else    { $('#contact-method-phone').addClass('required'); }
			});
			//}).first().click();

			f.validate({
				onfocusout:false, onkeyup:false, onclick : false,
				errorClass : 'invalid',
				groups : { phone : 'phonenumber1 phonenumber2 phonenumber3',
						contactmethod: 'contactmethodmail contactmethodphone'
				},
				rules : {
					firstname : { required : true , noxss : true },
					lastname  : { required : true , noxss : true },
					//email:{ required: true , email: true },
					email:{ required: "#contactmethodmail:checked", email: true , noxss : true },
					contactmethod:{ required: true },
					bank :{ required : true },
					help :{ required : true , noxss : true },
					contactmethodmail: {
							required: function() {
								return ($('#contactmethodphone:checked').length === 0);
							}
						},
					contactmethodphone: {
							required: function() {
								return ($('#contactmethodmail:checked').length === 0);
							}
						},
					phonenumber1 : { required: phoneRule, number : true, minlength : 3, maxlength : 3},
					phonenumber2 : { required: phoneRule, number : true, minlength : 3, maxlength : 3},
					phonenumber3 : { required: phoneRule, number : true, minlength : 4, maxlength : 4},
					zipcode : {required: false, maxlength:5, number:true},
					regarding : { required : true }
				},
				showErrors : _formShowErrors,
				submitHandler :function(form){
					var f = $(form),
						formSteps = f.find('.step'),
						prev = formSteps.filter(':visible'),
						current = prev.next(),
						currentnext = current.next();
						data = { bank : 'No' };

					$.each(f.serializeArray(), function(){ data[this.name] = this.value; });

					$.each( data, function(k, v){ current.find('.field.' + k).text( v);});
					$.each( data, function(k, v){ currentnext.find('.field.' + k).text( v);});

					$.post( f.attr('action'), f.serialize(), function(data){
						$('.contact-form-content').parent().html(data);
					});

					prev.hide();

					if ( $('#contactmethodmail').is(':checked') ) {
						currentnext.show();
					} else {
						current.show();
					}

					return false;
				}
			});
		}

		return { init : _init };
	})(),

	ComparisonChart : (function(){
		function _init() {
			var element = $('.comparison-chart-content'),
				table = element.find('.comparison-chart-table'),
				tr = table.find('tbody tr');

			tr.not(tr.first()).each(function(i){
				$(this).addClass( i % 2 ? 'even' : 'odd' );
			});

			table.find('td:nth-child(1),th:nth-child(1)').addClass('first');

			var tr1 = table.find('thead td,thead th'),
				l = tr1.length,
				p = l > 0 ? 100 / l : 0,
				cels = table.find('td,th');

			cels.css('width', p + '%');

			// read the url parameter highlight=1,2,3
			if(ub.ajax.lastRequest && ub.ajax.lastRequest.url) {
				var url = new ub.utils.Url( ub.ajax.lastRequest.url ),
					cols = (url.param('highlight') || "").split(',');

				$.each(cols, function() {
					if( parseInt(this, 10) > 0 ) {
						cels.filter(':nth-child(' + (parseInt(this, 10) + 1) + ')').addClass('selected');
					}
				});
			}

			// clone is for ie7 bug
			var tfoot = $('<table class="comparison-chart-tfoot"/>').append(
							$('<tbody/>').append( table.find('tfoot').remove().find('td,th') ) ).clone(true),
				tr2 = tfoot.find('td,th');

			$('.comparison-chart-content').append( tfoot );

			for( var i=0; i<tr1.length; i++) {
				//$(tr2[i]).width($(tr1[i]).outerWidth());
				$(tr2[i]).width(p + '%');
			}

			ub.utils.renderCtaButtons();

			$(this).find('.comparison-chart-content').find('#action-print-page').click(function(){
				ub.utils.printPreview($('.ui-dialog-content').html());
				return false;
			});

			// EMail page
			$(this).find('#action-email-page').attr('href',
				'mailto:?subject=' + window.escape( window.document.title ) +
				'&body=' + window.escape( window.location.toString() ) );

			$('.ui-dialog .comparison-chart').append( $('.ui-dialog .copyright-footer').remove() );

			element.parent().dialog('option', {width: 860, height: 506, position: 'center' });

			ub.utils.initDisclaimer( $('.ui-dialog') );

		}
		return { init: function(){ $( _init ); } };
	})()
});

})(window.dom.query, window);

function _getTomorrowDate() {
	var _date = new Date();
	_date.setDate(_date.getDate() + 1);
	return _date;
}