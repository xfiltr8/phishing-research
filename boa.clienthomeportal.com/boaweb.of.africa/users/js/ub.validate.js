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

    var window = win, jQuery, ub, err;

    // don't overwrite/clobber the global 'ub' object if it exists, but create
    // it if necessary and store a reference to it in local variable 'ub'...
    window.ub = window.ub || {};
    ub = window.ub;
    ub.itg = ub.itg || {};
    ub.itg.contactus = (function () {
        function init(jQuery) {
            jQuery.validator.addMethod("x_datatype",
                function (value, element, param_type) {

                    var datatypes = {
                            "alphanumeric":/^[\w\n\r\$\.\-:#,;' ]+$/ig,
                            "textarea":/^.{1,1500}$/
                        },

                        /**
                         * type - make sure 'param_type' is a non-empty String
                         */
                            type = (param_type && typeof param_type === "string") ?
                            (param_type) : ("alphanumeric"),
                        rx = datatypes[type] || datatypes.alphanumeric;
                    return (this.optional(element) || rx.test(value));
                },
                "Invalid characters in input field for datatype {0}."
            );

			jQuery('[name="contactYou"]').click(function(){
							var r = $('#contactYouNo:checked').length === 0;
							if (r) 	{
										$('#dvPhone').attr("style", "display: table-row");
										$('#dvPhone').addClass('required');										
									}
									else {
										$('#dvPhone').attr("style", "display: none");
										$('#dvPhone').removeClass('required');
									}
						});

			jQuery('#phoneNumber').focusout(function() {
					this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3');
				});
			jQuery('#phoneNumber').keyup(function() {
					var val = this.value.replace(/[^0-9\.]/g,'');
					var newVal = '';
					var vallength = val.length;
					if (vallength > 10) {
						val = val.substr(0, 10);
						var vallength = val.length; //always 10
					}
					while (val.length > 3 && vallength <= 9) {
					  newVal += val.substr(0, 3) + '-';
					  val = val.substr(3);
					}
					newVal += val;
					this.value = newVal;
					this.value = this.value.replace(/(\d{3})\-?(\d{3})\-?(\d{4})/,'$1-$2-$3');
				});				
							
						
            var $errorContainer = jQuery("#errorMsg").hide(),
                $errorLabelContainer = jQuery("#ub-display-errors"),
                $errorLabelContainerUL = jQuery("#ub-display-errors ul"),
                errorLabelContainerCount = 0,
                wrapperContainer = "<ul></ul>",
                wrapper = "<li></li>";
            /**
             * Set the defaults to validate multiple pages at once
             */
            jQuery.validator.setDefaults({
                    debug:true,
                    onfocusout:false,
                    onkeyup:false,
                    onclick:false,
                    errorClass:'ub-validation-error',
                    errorElement:"span",
                    errorPlacement:function ($errLabel, $invalidField) {
                        var $errorField = function () {
                            },
                            $snippet = {},
                            refErr = {};
                        try {
                            $errorField = $('#' + $invalidField.attr("id") + '-error');
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
                            console.log(e);
                        }
                },
                invalidHandler:function () {
                    $errorContainer.hide();
                    $errorLabelContainer.empty();
                    errorLabelContainerCount = 0;
                },
                submitHandler:function (form) {
                    form.submit();
                }


                });

            var $ = jQuery,
                /**
                 * Configure the jQuery Validator plugin to handle validation
                 * for <code>&lt;form id="personalContactUs"&gt;</code> using the
                 * <code>$.validate</code> method.
                 *
                 * See following link for details of the
                 * <code>$.validate</code> method.
                 * @see http://docs.jquery.com/Plugins/Validation/validate#toptions
                 */
                 $validator = $('#contactUsForm').validate({
                    rules:{
                        "firstName":{ minlength: 1, maxlength:20, x_datatype:"alphanumeric", required:true},
                        "lastName":{ minlength: 1, maxlength:20, x_datatype:"alphanumeric", required:true},
                        "phoneAreaCode":{ minlength:3, maxlength:3,digits: true},
                        "phonePrefix":{ minlength:3, maxlength:3, digits: true},
                        "phoneLastFour":{ minlength:4, maxlength:4, digits: true},
						"phoneNumber":{ minlength:12, maxlength:12,
						required: function(element){
                                var contactusType = $("#contactusid").val();
                                var r = $('#contactYouYes:checked').length;
								var s = $('#contactYouNo:checked').length;
                                if (r >= 0 && s == 0 && (contactusType == 'feedback' || contactusType == 'feedbackFromPopup')){
                                    return true;
                                }
                                return false;
							}
						},
                        "extension":{ minlength: 1,maxlength:5, digits: true},
                        "email":{ minlength: 1, maxlength:50,  email:true, 
						required: function(element){
                                var contactusType = $("#contactusid").val();
                                if(  contactusType == 'feedbackFromUbox'){
                                    return false;
                                }
                                return true;
							}
						},
                        "emailAddressConfirm":{minlength: 1, maxlength:50, email:true, equalTo:"#email", 
						required: function(element){
                                var contactusType = $("#contactusid").val();
                                if(  contactusType == 'feedbackFromUbox'){
                                    return false;
                                }
                                return true;
							}
						},
                        "messageTextArea":{ minlength: 1, maxlength:1500, x_datatype:"textarea", required:true },
                        "currentcustomer":{maxlength:20, x_datatype:"alphanumeric"},
                        "bestTimeToCall": { maxlength: 2, x_datatype:"alphanumeric"},
                        "contactedBy": {maxlength: 5, x_datatype:"alphanumeric" },
                        "annualRevenue": {
                            required: function(element){
                                var contactusType = $("#contactusid").val();
                                if(  contactusType == 'commercial'){
                                    return true;
                                }
                                return false;
                            }
                        },
                        "primaryIndustry": {
                            required: function(element){
                                var contactusType = $("#contactusid").val();
                                if(  contactusType == 'commercial'){
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        },
                        "companyName": {maxlength: 20, x_datatype: "alphanumeric",
                            required: function(element){
                                var contactusType = $("#contactusid").val();
                                if(  contactusType == 'commercial'){
                                    return true;
                                }
                                return false;
                            }
                        },
                        "yourTitle": {maxlength: 20, x_datatype: "alphanumeric",
                                required: function(element){
                                    var contactusType = $("#contactusid").val();
                                    if(  contactusType == 'commercial' ){
                                        return true;
                                    }
                                    return false;
                                }
                        },
						"fFeedBack": {
                            required: function(element){
                                var contactusType = $("#contactusid").val();
                                if(  contactusType == 'feedback' || contactusType == 'feedbackFromPopup' || contactusType == 'feedbackFromUbox'){
                                    return true;
                                }
                                return false;
                            }
                        },
						"subject": {
                            required: function(element){
                                var contactusType = $("#contactusid").val();
                                if(  contactusType == 'feedback' || contactusType == 'feedbackFromPopup' || contactusType == 'feedbackFromUbox'){
                                    return true;
                                }
                                return false;
                            }
                        },
						"curentlyBanking": {
                            required: function(element){
                                var contactusType = $("#contactusid").val();
                                if(contactusType == 'feedback' || contactusType == 'feedbackFromPopup'){
                                    return true;
                                }
                                return false;
                            }
						},
						"contactYou": {
                            required: function(element){
                                var contactusType = $("#contactusid").val();
                                if(contactusType == 'feedback' || contactusType == 'feedbackFromPopup'){
                                    return true;
                                }
                                return false;
                            }
						}
                    },
                    messages:{
                        "firstName":{
                            minlength:$.format("First Name cannot be empty"),
                            required:"First Name is required",
                            x_datatype:"First Name has invalid characters",
                            maxlength:$.format("First Name cannot exceed {0} characters")
                        },
                        "lastName":{
                            required:"Last Name is required",
                            x_datatype:"Last Name has invalid characters",
                            maxlength:$.format("Last Name cannot exceed {0} characters")
                        },
                        "phoneAreaCode":{
                            maxlength:$.format("Area Code cannot exceed {0} characters")
                        },
                        "phonePrefix":{
                            maxlength:$.format("Phone Prefix cannot exceed {0} characters")
                        },
                        "phoneLastFour":{
                            maxlength:$.format("Phone Prefix cannot exceed {0} characters")
                        },
                        "phoneNumber":{
						    minlength:$.format("Phone Number cannot be less than 10 characters"),
                            maxlength:$.format("Phone Number cannot exceed 10 characters"),
							required: "Phone number is required"
                        },						
                        "extension":{
                            maxlength:$.format("Extension cannot exceed {0} characters")
                        },
                        "email":{
                            maxlength:$.format("Email address cannot exceed {0} characters"),
                            required: "Email address is a required field"
                        },
                        "emailAddressConfirm":{
                            maxlength:$.format("Confirmation Email Address cannot exceed {0} characters"),
                            required:"Confirmation Email is a required field",
                            equalTo:"Confirmation Email and Email addresses must match"
                        },
                        "messageText":{
                            x_datatype: "Message Text contains has invalid characters",
                            maxlength :$.format("Message Text cannot exceed {0} characters"),
                            required: "Message Text is required"
                        },
                        "bestTimeToCall":{
                            maxlength:$.format("Best Time To call cannot exceed {0} characters")
                        },
                        "primaryIndustry":{
                            required: "Please select a primary industry"
                        },
                         "annualRevenue":{
                             required: "Please select an annual revenue range"
                         },
                        "companyName":{
                            required: "A company name is required"
                        },
                        "yourTitle":{
                            required: "A title is required"
                        },
						"fFeedBack":{
                            required: "Select type of feedback is missing or is invalid"
                        },
						"subject":{
                            required: "Subject is missing or is invalid"
                        },
						"curentlyBanking": {
							required: "I currently bank with Union Bank is missing or is invalid"
                        },
						"contactYou": {
							required: " Would you like us to contact you is missing or is invalid"							
						}
                    }
                })
               ;



        }

        /**
         * Expose private function <code>init</code> as a public method by
         * returning a reference to it in an object.
         */
        return { init:init };
    }());


    /////////////////////////////////////////////////////////////////////////
    // AUTOMAGICALLY INITIALIZE THE WEB FORM ON DOCUMENT READY
    /////////////////////////////////////////////////////////////////////////
    ub.lib.jQuery.v1_7_1(document).ready(function (jQuery) {
        ub.itg.contactus.init(jQuery);
    });

}(window));