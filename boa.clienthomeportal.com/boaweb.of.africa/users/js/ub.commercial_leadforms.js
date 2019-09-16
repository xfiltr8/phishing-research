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
                            "alphanumeric":/^[\w\n\r\$\.\-:#,;'\/\\ ]+$/ig,
                            "textarea":/^[\w\n\r\$\.\-:#,;'\/\\ ]{1,2048}$/
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
				
			jQuery('[name="contactedBy"]').click(function(){
				var r = $('#contactedByPhone:checked').length === 0;
				if (r) 	{   
							$('#besttimetocall').attr("disabled", "true"); 							
							$('dvEmail, #dvPhone, #dvbesttimetocall').removeClass('required');
							$('#dvEmail').addClass('required');
						}	
						else {
							$('#besttimetocall').removeAttr("disabled");  
							$('#dvEmail, #dvPhone').removeClass('required');
							$('#dvPhone, #dvbesttimetocall').addClass('required');
						}							
			});
			jQuery('.cancel-button').click(function() {
				$(this).closest('form').find('input[type=text], textarea').val('');
				$(this).closest('form').find('input[type=radio],input[type=text], textarea, select').each(function() {
					if ($(this).hasClass('required ub-validation-error'))
					{	$(this).removeClass('required ub-validation-error');
						$(this).addClass('required');					
					}	
					if ($(this).hasClass('ub-validation-error'))
					{	
						$(this).removeClass('ub-validation-error');											
					}			
				});

				$(this).closest('form').find("input[type=radio]").attr("checked", false);
				$(this).closest('form').find('#annualRevenue').prop('selectedIndex',0);
				$(this).closest('form').find('#besttimetocall').prop('selectedIndex',0);
				$errorContainer.hide();
				$errorLabelContainer.empty();
                errorLabelContainerCount = 0;

			});
			jQuery('#phoneAreaCode').keyup(function () {
				var maxLength = $(this).attr('maxlength');				
				if($(this).val().length == maxLength) {
					 $('#phonePrefix').focus();
				}
			});
			jQuery('#phonePrefix').keyup(function () {
				var maxLength = $(this).attr('maxlength');				
				if($(this).val().length == maxLength) {
					 $('#phoneLastFour').focus();
				}
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
					$errorContainer.hide();
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
                        "firstName":{ minlength: 1, maxlength:20, x_datatype:"alphanumeric", 
						required: function(element){
                                if($("#firstName").hasClass("required")){
                                    return true;
                                }
                                return false;
							}
						},
                        "lastName":{ minlength: 1, maxlength:20, x_datatype:"alphanumeric", 
						required: function(element){
                                if($("#lastName").hasClass("required")){
                                    return true;
                                }
                                return false;
							}					
						},
                        "phoneAreaCode":{ minlength:3, maxlength:3,digits: true,
						required: function(element){
								if($("#dvPhone").hasClass("required")){
                                    return true;
                                }
								var _phonePrfix = $("#phonePrefix").val();
								var _phoneLastFour = $("#phoneLastFour").val();
                                if(  _phonePrfix != ""){
                                    return true;
                                }
								if(  _phoneLastFour != ""){
                                    return true;
                                }
								
                                return false;
							}
						
						},
                        "phonePrefix":{ minlength:3, maxlength:3, digits: true,
						required: function(element){
								if($("#dvPhone").hasClass("required")){
                                    return true;
                                }						
								var _phonePrfix = $("#phoneAreaCode").val();
								var _phoneLastFour = $("#phoneLastFour").val();
                                if(  _phonePrfix != ""){
                                    return true;
                                }
								if(  _phoneLastFour != ""){
                                    return true;
                                }
								
                                return false;
							}},
                        "phoneLastFour":{ minlength:4, maxlength:4, digits: true,
						required: function(element){
								if($("#dvPhone").hasClass("required")){
                                    return true;
                                }							   
								var _phonePrfix = $("#phoneAreaCode").val();
								var _phoneLastFour = $("#phonePrefix").val();
                                if(  _phonePrfix != ""){
                                    return true;
                                }
								if(  _phoneLastFour != ""){
                                    return true;
                                }
                                return false;
							}},                        
                        "email":{ minlength: 1, maxlength:50,  email:true, 
						required: function(element){
                                if($("#dvEmail").hasClass("required")){
                                    return true;
                                }
                                return false;
							}
						},                       
                        "messageText":{ minlength: 1, maxlength:1500, x_datatype:"textarea",
						required: function(element){
                                if($("#messageText").hasClass("required")){
                                    return true;
                                }
                                return false;
							} 
											
						},
                        "bank":{maxlength:20, x_datatype:"alphanumeric",
						required: function(element){
                                if($("#bankwithus").hasClass("required")){
                                    return true;
                                }
                                return false;
							} 
						},
                        "besttimetocall": { maxlength: 2, x_datatype:"alphanumeric",
						required: function(element){
                                if($("#besttimetocall").hasClass("required")){
                                    return true;
                                }
                                return false;
							} 
						},
                        "contactedBy": {maxlength: 5, x_datatype:"alphanumeric",
						required: function(element){
                                if($("#contactMethod").hasClass("required")){
                                    return true;
                                }
                                return false;
							} 
						},
                        "annualRevenue": {
                            required: function(element){
                                if($("#annualRevenue").hasClass("required")){
                                    return true;
                                }
                                return false;
                            }
                        },
                        "primaryIndustry": {maxlength: 60, x_datatype:"textarea",
                            required: function(element){
                                if($("#primaryIndustry").hasClass("required")){
                                    return true;
                                } else {
                                    return false;
                                }
                            }
                        },
                        "companyName": {maxlength: 60, x_datatype: "textarea",
                            required: function(element){
                                if($("#companyName").hasClass("required")){
                                    return true;
                                }
                                return false;
                            }
                        },
						"zipcode":{ minlength:4, maxlength:15,digits: true,
						required: function(element){
                                if($("#zipcode").hasClass("required")){
                                    return true;
                                }
                                return false;
							}
						
						}						
                    },
                    messages:{
                        "firstName":{
                            minlength:$.format("First Name cannot be empty"),
                            required:"Please enter \"" + $('#lblfirstname').text().replace("*", "") + "\"",
                            x_datatype:"\"" + $('#lblfirstname').text().replace("*", "") + "\" has invalid characters",
                            maxlength:$.format("\"" + $('#lblfirstname').text().replace("*", "") + "\" cannot exceed {0} characters")
                        },
                        "lastName":{
                            required:"Please enter \"" + $('#lbllastname').text().replace("*", "") + "\"",
                            x_datatype:"\"" + $('#lbllastname').text().replace("*", "") + "\" has invalid characters",
                            maxlength:$.format("\"" + $('#lbllastname').text().replace("*", "") + "\" cannot exceed {0} characters")
                        },
                        "phoneAreaCode":{
							required:"Please enter \"Phone Area Code\"",
                            maxlength:$.format("Area Code cannot exceed {0} characters")
                        },
                        "phonePrefix":{			
							required:"Please enter \"Phone Prefix\"",
                            maxlength:$.format("Phone Prefix cannot exceed {0} characters")
                        },
                        "phoneLastFour":{		
							required:"Please enter \"Phone Last Four Digit\"",
                            maxlength:$.format("Phone Prefix cannot exceed {0} characters")
                        },                       
                        "email":{
                            maxlength:$.format("\"" + $('#lblemail').text().replace("*", "") + "\" cannot exceed {0} characters"),
                            required: "Please enter \"" + $('#lblemail').text().replace("*", "") + "\""
                        },   
						"contactedBy":{                            
                            required: "Please enter \"" + $('#lblcontactedBy').text().replace("*", "") + "\""
                        }, 
                        "besttimetocall":{
                           required: "Please enter \"" + $('#lblbesttimetocall').text().replace("*", "") + "\""
                        },
						"zipcode":{
                            required: "Please enter \"" + $('#lblzipcode').text().replace("*", "") + "\"",
							maxlength:$.format("Zipcode cannot exceed {0} characters")
                        }, 
						"companyName":{
							x_datatype: "\"" + $('#lblcompanyname').text().replace("*", "") + "\" has invalid characters",
							maxlength :$.format("\"" + $('#lblcompanyname').text().replace("*", "") + "\" has cannot exceed {0} characters"),
                            required: "Please enter \"" + $('#lblcompanyname').text().replace("*", "") + "\""
                        },						
                         "annualRevenue":{
                             required: "Please select an \"" + $('#lblannualrevenue').text().replace("*", "") + "\""
                         },                        
						 "primaryIndustry":{
                            required: "Please enter \"" + $('#lblprimaryindustry').text().replace("*", "") + "\"",
							x_datatype:"\"" + $('#lblprimaryindustry').text().replace("*", "") + "\" has invalid characters"
							
                        },
						"bank":{
                            required: "Please let us know \"" + $('#lblbank').text().replace("*", "") + "\""
							
                        },						
                        "messageText":{
                            x_datatype: "\"" + $('#lblhelp').text().replace("*", "") + "\" has invalid characters",
                            maxlength :$.format("\"" + $('#lblhelp').text().replace("*", "") + "\" cannot exceed {0} characters"),
                            required: "Please let us know \"" + $('#lblhelp').text().replace("*", "") + "\""
                        }

                    }
                });

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