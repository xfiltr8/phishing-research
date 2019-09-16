/* file: ub.wcm.field.js */
/*global dom, window */
/*properties
    append, appendChild, color, createElement, createTextNode, css, document,
    elements, field, focus, getElementById, jump, length, limitTextArea,
    maxLength, query, remove, setAttribute, style, substring, tabIndex, ub, wcm,
    val
*/
(function (win, doc, jQuery) {
	"use strict";
	// LOCAL VARIABLES
	var window = win,
		document = doc,
		$ = jQuery,
		// don't step on a pre-existing global 'ub' object
		ub = window.ub || {};

	// create the rest of the namespace
	ub.wcm = ub.wcm || {};
	ub.wcm.field = {
		// and add the members...
		/////////////////////////////////////////////////////////////////////
		jump : function (element, content, myform) {
		/////////////////////////////////////////////////////////////////////
			var next = 0;
			if (content.length === element.maxLength) {
				next = element.tabIndex;
				if (next < document.getElementById(myform).elements.length) {
					// ASSUMES INPUT FIELD #1 IS TABINDEX='1' !!!!!!!!!!!!
					document.getElementById(myform).elements[next+1].focus();
				}
			}
			return undefined;
		},
		/////////////////////////////////////////////////////////////////////
		limitTextArea : function (limitField, limitFieldLabel, limitCount,
		/////////////////////////////////////////////////////////////////////
				limitCap, errorDiv, errspanId) {
			var truncated = "",
				errspan = {},
				errspanlinebreak = {},
				txt = "",
				newcnt = 0,
				errselector = "";

			if (limitField.val().length > limitCap) {
				truncated = limitField.val().substring(0, limitCap);
				limitField.val(truncated);
				limitFieldLabel.css('color', 'red');
				/* Add error message to <DIV ID = "errorMsg/gerrorMsg/....">
				Check for existing message to prevent duplicates. */
				if (document.getElementById(errspanId)) {
					txt = ""; // DO NOTHING STMT TO SUPPRESS JSLINT ERROR MSG
				} else {
					errspan = document.createElement("span");
					errspanlinebreak = document.createElement("br");
					//errspan.setAttribute("style", "color:red");
					errspan.setAttribute("id", errspanId);
					errspan.style.color = "red";
					txt = document.createTextNode('Your message has reached 1500 characters.');
					errspan.appendChild(txt);
					errspan.appendChild(errspanlinebreak);
					errorDiv.append(errspan);
				}
			} else {
				newcnt = limitCap - limitField.val().length;
				limitCount.val(newcnt);
				/* If user reduces characters count to less than 1500, remove the error message. */
				if (limitCount.val() > 0 && document.getElementById(errspanId)) {   //Do nothing if value is 0
					errselector = "#" + errspanId;
					//alert(errselector);
					$(errselector).remove();
					limitFieldLabel.css('color', 'black');
				}
			}
		}

	};
	// EXPOSE the local 'ub' object to the global namespace
	window.ub = ub;
}(window,
		window.document, 
		window.jQuery ||
		((window.dom && window.dom.query) ?
		 (window.dom.query) :
		 ("ERROR: CAN'T FIND JQUERY"))
		));
