/*jslint browser: true, nomen: true, white: true */
(function ($, window) {
	"use strict";

	function goSSOLogin(form, url) {
		var $form = $(form),
			defaultText = $('input[title]', $form).val(),
			currentText = $('input[autocomplete="off"]', $form).val();

		// Default text (i.e. "User ID").
		if (currentText !== defaultText) {
			$('input[autocomplete="off"]', $form).val(defaultText);
		}

		// Form action & method.
		$form.attr({"action": url, "method": "post"});

		// What will be trigerred when the form is submitted.
		$form.submit(function () {
			var days = 0;
			$.cookie("UnionBankCookie", "Personalize www.unionbank.com", {path: '/', expires: days});

			if ($('input[name=tempUserId]', this).length) {
				// Populate userId field value.
				$('input[name=userId]', this).val($('input[name=tempUserId]', this).val());
				// If IE, put the default text ("User ID") as the tempUserId field value (prevent user-entered id from being displayed when browser's back button is used).
				if ($.browser.msie) {
					$('input[name=tempUserId]', this).val(defaultText);
				}
			}
			return true;
		});
	}

	window.goSSOLogin = goSSOLogin;

}(window.dom.query, window));
