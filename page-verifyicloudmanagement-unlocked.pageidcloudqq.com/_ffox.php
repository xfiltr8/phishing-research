<html xmlns="http://www.w3.org/1999/xhtml" hasBrowserHandlers="true">
  <head>
    <link rel="icon" type="image/png" id="favicon" href="chrome://global/skin/icons/warning-16.png" />

    <style type="text/css">
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

@import url("chrome://browser/skin/error-pages.css");

body {
  background-image: linear-gradient(-45deg, #eeeeee,     #eeeeee 33%,
                                            #fbfbfb 33%, #fbfbfb 66%,
                                            #eeeeee 66%, #eeeeee);
}

body.certerror {
  background-image: linear-gradient(-45deg, #f0d000,     #f0d000 33%,
                                            #fedc00 33%, #fedc00 66%,
                                            #f0d000 66%, #f0d000);
}

body.captiveportal .title {
  background-image: url("wifi.svg");
}

body.certerror .title {
  background-image: url("cert-error.svg");
}

#errorContainer {
  display: none;
}

/* Pressing the retry button will cause the cursor to flicker from a pointer to
 * not-allowed. Override the disabled cursor behaviour since we will never show
 * the button disabled as the initial state. */
button:disabled {
  cursor: pointer;
}

#prefChangeContainer {
  display: none;
}

#learnMoreContainer {
  display: none;
}

#certErrorAndCaptivePortalButtonContainer {
  display: none;
}

body:not(.neterror) #certErrorAndCaptivePortalButtonContainer {
  display: flex;
}

body:not(.neterror) #netErrorButtonContainer {
  display: none;
}

#errorTryAgain {
  margin-top: 1.2em;
  min-width: 150px;
}

#returnButton {
  min-width: 250px;
}

#advancedButton {
  display: none;
}

body.captiveportal #returnButton {
  display: none;
}

body:not(.captiveportal) #openPortalLoginPageButton {
  display: none;
}

#openPortalLoginPageButton {
  margin-inline-start: 0;
}

body:not(.neterror) #advancedButton {
  display: block;
}

#certificateErrorReporting {
  display: none;
}

.container {
  position: relative;
}

#advancedPanelContainer {
  position: absolute;
  padding: 24px 0;
  width: 100%;
}

.advanced-panel {
  /* Hidden until the link is clicked */
  display: none;
  background-color: white;
  border: 1px lightgray solid;
  /* Don't use top padding because the default p style has top padding, and it
   * makes the overall div look uneven */
  padding: 0 12px 12px 12px;
  box-shadow: 0 0 4px #ddd;
  font-size: 0.9em;
}

#overrideWeakCryptoPanel {
  display: none;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: space-between;
  align-content: space-between;
  align-items: flex-start;
  margin-top: 1em;
}

span#hostname {
  font-weight: bold;
}

#automaticallyReportInFuture {
  cursor: pointer;
}

#errorCode:not([href]) {
  color: var(--in-content-page-color);
  cursor: text;
  text-decoration: none;
}

#errorCode[href] {
  white-space: nowrap;
}

#badCertTechnicalInfo {
  overflow: auto;
  white-space: pre-wrap;
}

#certificateErrorReporting {
  display: none;
}

#certificateErrorDebugInformation {
  display: none;
  background-color: var(--in-content-box-background-hover) !important;
  border-top: 1px solid var(--in-content-border-color);
  position: absolute;
  left: 0%;
  top: 100%;
  width: 65%;
  padding: 1em 17.5%;
}

#certificateErrorText {
  font-family: monospace;
  white-space: pre-wrap;
  padding: 1em 0;
}
/* This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/. */

@import url("chrome://global/skin/in-content/info-pages.css");

body {
  background-size: 64px 32px;
  background-repeat: repeat-x;
  /* Top padding for when the window height is small.
     Bottom padding to keep everything centered. */
  padding: 75px 0;
  /* info-pages.css sets a minimum width of 13em to the content
   * container. If we don't set a min-width here, the content
   * gets clipped in iframes with small width. We don't accomodate
   * any padding to prioritize real estate in the small viewport. */
  min-width: 13em;
}

.button-container {
  display: flex;
  flex-flow: row wrap;
}

.button-spacer {
  flex: 1;
}

@media only screen and (max-width: 959px) {
  body {
    padding: 75px 48px;
  }

  .title {
    background-image: none !important;
    padding-inline-start: 0;
    margin-inline-start: 0;
  }

  .title-text {
    padding-top: 0;
  }
}

@media only screen and (max-width: 640px) {
  body {
    justify-content: unset;
    /* Now that everything is top-aligned, we don't need the
     * bottom padding for centering - though it's added back
     * when the viewport height is < 480px (see below). */
    padding: 75px 20px 0;
  }

  .title-text {
    padding-bottom: 0;
    border-bottom: none;
  }
}

@media only screen and (max-width: 480px) {
  .button-container button {
    /* Force buttons to display: block here to try and enforce collapsing margins */
    display: block;
    width: 100%;
    margin: 0.66em 0 0;
  }
}

/* For small window height, shift the stripes up by 10px.
 * We could just change the background size, but that changes
 * the angle of the stripes so just shifting up is easier. */
@media only screen and (max-height: 480px) {
  body {
    background-position: 10px -10px;
    padding-top: 38px;
    /* We get rid of bottom padding for width < 640px, but
     * for height < 480px a bit of space between the content
     * and the viewport edge is nice. */
    padding-bottom: 38px;
  }
}

@import url("chrome://global/skin/in-content/common.css");
/* Body and container */
body {
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  min-height: 100vh;
  padding-top: 0;
  padding-bottom: 0;
  padding-inline-start: calc(48px + 4.6em);
  padding-inline-end: 48px;
  align-items: center;
  justify-content: center;
}

.container {
  min-width: 13em;
  max-width: 52em;
}

.container.restore-chosen {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  margin: 10vh 0;
}

/* Typography */
.title {
  background-image: url("chrome://global/skin/icons/info.svg");
  background-position: left 0;
  background-repeat: no-repeat;
  background-size: 1.6em;
  margin-inline-start: -2.3em;
  padding-inline-start: 2.3em;
  font-size: 2.5em;
}

.title:-moz-locale-dir(rtl),
.title:dir(rtl) {
  background-position: right 0;
}

.title-text {
  border-bottom: 1px solid #C1C1C1;
  font-size: inherit;
  padding-bottom: 0.4em;
}

@media (max-width: 675px) {
  body {
    padding: 0 48px;
  }

  .title {
    background-image: none !important;
    padding-inline-start: 0;
    margin-inline-start: 0;
  }

  .title-text {
    padding-top: 0;
  }
}

ul, ol {
  margin: 0;
  padding: 0;
  margin-inline-start: 1em;
}

ul > li, ol > li {
  margin-bottom: .5em;
}

ul {
  list-style: disc;
}

/* Buttons */
.button-container {
  margin-top: 1.2em;
}

.button-container > button {
  min-width: 150px;
}

.button-container > button:first-child {
  margin-inline-start: 0;
}

/* Trees */
.tree-container {
  margin-top: 1.2em;
  flex-grow: 1;
  min-height: 12em;
}

.tree-container > tree {
  height: 100%;
}

tree {
  width: 100%;
}

/* - This Source Code Form is subject to the terms of the Mozilla Public
   - License, v. 2.0. If a copy of the MPL was not distributed with this file,
   - You can obtain one at http://mozilla.org/MPL/2.0/. */

@namespace html "http://www.w3.org/1999/xhtml";
@namespace xul "http://www.mozilla.org/keymaster/gatekeeper/there.is.only.xul";

*|*:root {
  --in-content-page-color: #424e5a;
  --in-content-page-background: #fbfbfb;
  --in-content-text-color: #333;
  --in-content-selected-text: #fff;
  --in-content-header-border-color: #c8c8c8;
  --in-content-box-background: #fff;
  --in-content-box-background-odd: #f3f6fa;
  --in-content-box-background-hover: #ebebeb;
  --in-content-box-background-active: #dadada;
  --in-content-box-border-color: #c1c1c1;
  --in-content-item-hover: rgba(0,149,221,0.25);
  --in-content-item-selected: #0095dd;
  --in-content-border-highlight: #ff9500;
  --in-content-border-focus: #0095dd;
  --in-content-border-color: #c1c1c1;
  --in-content-category-text: #c1c1c1;
  --in-content-category-border-focus: 1px dotted #fff;
  --in-content-category-text-selected: #f2f2f2;
  --in-content-category-background: #424f5a;
  --in-content-category-background-hover: #5e6972;
  --in-content-category-background-active: #343f48;
  --in-content-tab-color: #424f5a;
  --in-content-link-color: #0095dd;
  --in-content-link-color-hover: #178ce5;
  --in-content-link-color-active: #ff9500;
  --in-content-link-color-visited: #551a8b;
  --in-content-primary-button-background: #0095dd;
  --in-content-primary-button-background-hover: #008acb;
  --in-content-primary-button-background-active: #006b9d;
  --in-content-table-border-dark-color: #d1d1d1;
  --in-content-table-header-background: #0095dd;
}

html|html,
xul|page,
xul|window {
  font: message-box;
  -moz-appearance: none;
  background-color: var(--in-content-page-background);
  color: var(--in-content-page-color);
}

html|body {
  font-size: 15px;
  font-weight: normal;
  margin: 0;
}

html|h1 {
  font-size: 2.5em;
  font-weight: lighter;
  line-height: 1.2;
  color: var(--in-content-text-color);
  margin: 0;
  margin-bottom: .5em;
}

html|hr {
  border-style: solid none none none;
  border-color: var(--in-content-border-color);
}

xul|caption {
  -moz-appearance: none;
  margin: 0;
}

html|h2,
xul|caption > xul|checkbox,
xul|caption > xul|label {
  font-size: 1.3rem;
  font-weight: bold;
  line-height: 22px;
}

xul|caption > xul|checkbox,
xul|caption > xul|label {
  margin: 0 !important;
}

*|*.main-content {
  padding-top: 40px;
  padding-inline-end: 44px; /* compensate the 4px margin of child elements */
  padding-bottom: 48px;
  padding-inline-start: 48px;
  overflow: auto;
}

xul|prefpane > xul|*.content-box {
  overflow: visible;
}

/* groupboxes */

xul|groupbox {
  -moz-appearance: none;
  border: none;
  margin: 15px 0 0;
  padding-inline-start: 0;
  padding-inline-end: 0;
  font-size: 1.25rem;
}

xul|groupbox xul|label:not(.menu-accel):not(.menu-text):not(.indent):not(.learnMore),
xul|groupbox xul|description {
  /* !important needed to override toolkit !important rule */
  margin-inline-start: 0 !important;
  margin-inline-end: 0 !important;
}

/* tabpanels and tabs */

xul|tabpanels {
  -moz-appearance: none;
  font-size: 1.25rem;
  line-height: 22px;
  border: none;
  padding: 0;
  background-color: transparent;
  color: inherit;
}

xul|tabs {
  margin-bottom: 15px;
  border-top: 1px solid var(--in-content-box-border-color);
  border-bottom: 1px solid var(--in-content-box-border-color);
  background-color: var(--in-content-page-background);
}

xul|*.tabs-left,
xul|*.tabs-right {
  border-bottom: none;
}

xul|tab {
  -moz-appearance: none;
  margin-top: 0;
  padding: 4px 20px;
  min-height: 44px;
  color: var(--in-content-tab-color);
  background-color: var(--in-content-page-background);
  border-width: 0;
  /* !important overrides tabbox.css RTL and visuallyselected rules */
  border-radius: 0 !important;
  transition: background-color 50ms ease 0s;
}

xul|tab:hover {
  background-color: var(--in-content-box-background-hover);
}

xul|tab[selected] {
  background-color: var(--in-content-box-background-hover);
  padding-bottom: 0; /* compensate the 4px border */
  border-bottom: 4px solid var(--in-content-border-highlight);
}

xul|*.tab-text {
  font-size: 1.3rem;
  line-height: 22px;
}

/* html buttons */

html|button {
  padding: 3px;
  /* override forms.css */
  font: inherit;
}

/* xul buttons and menulists */

*|button,
html|select,
xul|colorpicker[type="button"],
xul|menulist {
  -moz-appearance: none;
  min-height: 30px;
  color: var(--in-content-text-color);
  border: 1px solid var(--in-content-box-border-color);
  -moz-border-top-colors: none !important;
  -moz-border-right-colors: none !important;
  -moz-border-bottom-colors: none !important;
  -moz-border-left-colors: none !important;
  border-radius: 2px;
  background-color: var(--in-content-page-background);
}

html|button:enabled:hover,
html|select:enabled:hover,
xul|button:not([disabled="true"]):hover,
xul|colorpicker[type="button"]:not([disabled="true"]):hover,
xul|menulist:not([disabled="true"]):hover {
  background-color: var(--in-content-box-background-hover);
}

html|button:enabled:hover:active,
html|select:enabled:hover:active,
xul|button:not([disabled="true"]):hover:active,
xul|colorpicker[type="button"]:not([disabled="true"]):hover:active,
xul|menulist[open="true"]:not([disabled="true"]) {
  background-color: var(--in-content-box-background-active);
}

html|button:disabled,
html|select:disabled,
xul|button[disabled="true"],
xul|colorpicker[type="button"][disabled="true"],
xul|menulist[disabled="true"] {
  opacity: 0.5;
}

*|button.primary {
  background-color: var(--in-content-primary-button-background);
  border-color: transparent;
  color: var(--in-content-selected-text);
}

html|button.primary:enabled:hover,
xul|button.primary:not([disabled="true"]):hover {
  background-color: var(--in-content-primary-button-background-hover);
}

html|button.primary:enabled:hover:active,
xul|button.primary:not([disabled="true"]):hover:active {
  background-color: var(--in-content-primary-button-background-active);
}

xul|colorpicker[type="button"] {
  padding: 6px;
  width: 50px;
}

xul|button > xul|*.button-box,
xul|menulist > xul|*.menulist-label-box {
  padding-right: 10px !important;
  padding-left: 10px !important;
}

xul|menulist > xul|*.menulist-label-box > xul|*.menulist-icon[src] {
  margin-inline-end: 5px;
}

xul|button[type="menu"] > xul|*.button-box > xul|*.button-menu-dropmarker {
  -moz-appearance: none;
  margin: 1px 0;
  margin-inline-start: 10px;
  padding: 0;
  width: 10px;
  height: 16px;
  border: none;
  background-color: transparent;
  list-style-image: url("chrome://global/skin/in-content/dropdown.svg#dropdown");
}

xul|*.help-button {
  min-width: 16px;
  margin-inline-end: 0;
  border-width: 0;
  background-image: none;
  box-shadow: none;
  list-style-image: url("chrome://global/skin/in-content/help-glyph.svg#help");
}

xul|*.help-button:not([disabled="true"]):hover {
  background-image: none;
  /* Override default button background */
  background-color: transparent;
  list-style-image: url("chrome://global/skin/in-content/help-glyph.svg#help-hover");
}

xul|*.help-button:not([disabled="true"]):hover:active {
  background-image: none;
  /* Override default button background */
  background-color: transparent;
  list-style-image: url("chrome://global/skin/in-content/help-glyph.svg#help-pressed");
}

xul|*.close-icon > xul|*.button-box,
xul|*.help-button > xul|*.button-box {
  padding-top: 0;
  padding-bottom: 0;
  padding-right: 0 !important;
  padding-left: 0 !important;
}

xul|*.help-button > xul|*.button-box > xul|*.button-icon {
  width: 16px;
  height: 16px;
}

xul|*.help-button > xul|*.button-box > xul|*.button-text {
  display: none;
}

html|*.help-button {
  width: 16px;
  height: 16px;
  border: 0;
  padding: 0;
  display: inline-block;
  background-image: url("chrome://global/skin/in-content/help-glyph.svg#help");
  background-repeat: no-repeat;
  background-position: center center;
  background-size: contain;
}

html|*.help-button:hover {
  background-image: url("chrome://global/skin/in-content/help-glyph.svg#help-hover");
}

html|*.help-button:hover:active {
  background-image: url("chrome://global/skin/in-content/help-glyph.svg#help-pressed");
}

xul|*.spinbuttons-button {
  min-height: initial;
  margin-inline-start: 10px !important;
  margin-inline-end: 2px !important;
}

xul|*.spinbuttons-up {
  margin-top: 2px !important;
  border-radius: 1px 1px 0 0;
}

xul|*.spinbuttons-down  {
  margin-bottom: 2px !important;
  border-radius: 0 0 1px 1px;
}

xul|*.spinbuttons-button > xul|*.button-box {
  padding: 1px 5px 2px !important;
}

xul|*.spinbuttons-up > xul|*.button-box > xul|*.button-icon {
  list-style-image: url("chrome://global/skin/arrow/arrow-up.gif");
}

xul|*.spinbuttons-up[disabled="true"] > xul|*.button-box > xul|*.button-icon {
  list-style-image: url("chrome://global/skin/arrow/arrow-up-dis.gif");
}

xul|*.spinbuttons-down > xul|*.button-box > xul|*.button-icon {
  list-style-image: url("chrome://global/skin/arrow/arrow-dn.gif");
}

xul|*.spinbuttons-down[disabled="true"] > xul|*.button-box > xul|*.button-icon {
  list-style-image: url("chrome://global/skin/arrow/arrow-dn-dis.gif");
}

xul|menulist:not([editable="true"]) > xul|*.menulist-dropmarker {
  -moz-appearance: none;
  margin-inline-end: 4px;
  padding: 0;
  border: none;
  background-color: transparent;
  list-style-image: url("chrome://global/skin/in-content/dropdown.svg#dropdown");
}

xul|menulist:not([editable="true"]) > xul|*.menulist-dropmarker > xul|*.dropmarker-icon {
  width: 18px;
  height: 18px;
}

xul|menulist[disabled="true"]:not([editable="true"]) > xul|*.menulist-dropmarker {
  list-style-image: url("chrome://global/skin/in-content/dropdown.svg#dropdown-disabled")
}

xul|menulist > xul|menupopup,
xul|button[type="menu"] > xul|menupopup {
  -moz-appearance: none;
  border: 1px solid var(--in-content-box-border-color);
  border-radius: 2px;
  background-color: var(--in-content-box-background);
}

xul|menulist > xul|menupopup xul|menu,
xul|menulist > xul|menupopup xul|menuitem,
xul|button[type="menu"] > xul|menupopup xul|menu,
xul|button[type="menu"] > xul|menupopup xul|menuitem {
  -moz-appearance: none;
  font-size: 1em;
  color: var(--in-content-text-color);
  padding-top: 0.2em;
  padding-bottom: 0.2em;
  padding-inline-start: 10px;
  padding-inline-end: 30px;
}

xul|menulist > xul|menupopup > xul|menu:not([disabled="true"])[_moz-menuactive="true"],
xul|menulist > xul|menupopup > xul|menuitem:not([disabled="true"])[_moz-menuactive="true"],
xul|button[type="menu"] > xul|menupopup > xul|menu:not([disabled="true"])[_moz-menuactive="true"],
xul|button[type="menu"] > xul|menupopup > xul|menuitem:not([disabled="true"])[_moz-menuactive="true"] {
  color: var(--in-content-text-color);
  background-color: var(--in-content-item-hover);
}

xul|menulist > xul|menupopup > xul|menu:not([disabled="true"])[selected="true"],
xul|menulist > xul|menupopup > xul|menuitem:not([disabled="true"])[selected="true"],
xul|button[type="menu"] > xul|menupopup > xul|menu:not([disabled="true"])[selected="true"],
xul|button[type="menu"] > xul|menupopup > xul|menuitem:not([disabled="true"])[selected="true"] {
  color: var(--in-content-selected-text);
  background-color: var(--in-content-item-selected);
}

xul|menulist > xul|menupopup > xul|menu[disabled="true"],
xul|menulist > xul|menupopup > xul|menuitem[disabled="true"],
xul|button[type="menu"] > xul|menupopup > xul|menu[disabled="true"],
xul|button[type="menu"] > xul|menupopup > xul|menuitem[disabled="true"] {
  color: #999;
  /* override the [_moz-menuactive="true"] background color from
     global/menu.css */
  background-color: transparent;
}

xul|menulist > xul|menupopup xul|menuseparator,
xul|button[type="menu"] > xul|menupopup xul|menuseparator {
  -moz-appearance: none;
  margin: 0;
  padding: 0;
  border-top: 1px solid var(--in-content-box-border-color);
  border-bottom: none;
}

/* textboxes */

html|input[type="text"],
html|textarea,
xul|textbox {
  -moz-appearance: none;
  color: var(--in-content-text-color);
  border: 1px solid var(--in-content-box-border-color);
  -moz-border-top-colors: none !important;
  -moz-border-right-colors: none !important;
  -moz-border-bottom-colors: none !important;
  -moz-border-left-colors: none !important;
  border-radius: 2px;
  background-color: var(--in-content-box-background);
}

xul|textbox {
  min-height: 30px;
  padding-right: 10px;
  padding-left: 10px;
}

/* Create a separate rule to unset these styles on .tree-input instead of
   using :not(.tree-input) so the selector specifity doesn't change. */
xul|textbox.tree-input {
  min-height: unset;
  padding-right: unset;
  padding-left: unset;
}

html|input[type="text"],
html|textarea {
  font-family: inherit;
  font-size: inherit;
  padding: 5px 10px;
}

html|input[type="text"]:focus,
html|textarea:focus,
xul|textbox[focused] {
  border-color: var(--in-content-border-focus);
}

html|input[type="text"]:disabled,
html|textarea:disabled,
xul|textbox[disabled="true"] {
  opacity: 0.5;
}

/* Links */

html|a,
.text-link {
  color: var(--in-content-link-color);
  text-decoration: none;
}

html|a:hover,
.text-link:hover {
  color: var(--in-content-link-color-hover);
  text-decoration: underline;
}

html|a:visited {
  color: var(--in-content-link-color-visited);
}

html|a:hover:active,
.text-link:hover:active {
  color: var(--in-content-link-color-active);
  text-decoration: none;
}

/* Checkboxes and radio buttons */

xul|checkbox {
  margin-inline-start: 0;
}

xul|*.checkbox-check,
html|input[type="checkbox"] {
  -moz-appearance: none;
  width: 23px;
  height: 23px;
  border-radius: 2px;
  border: 1px solid var(--in-content-box-border-color);
  margin-inline-end: 10px;
  background-color: #f1f1f1;
  /* !important needed to override toolkit checked !important rule */
  background-image: linear-gradient(#fff, rgba(255,255,255,0.8)) !important;
  background-position: center center;
  background-repeat: no-repeat;
  box-shadow: 0 1px 1px 0 #fff, inset 0 2px 0 0 rgba(0,0,0,0.03);
}

xul|checkbox:not([disabled="true"]):hover > xul|*.checkbox-check,
html|input[type="checkbox"]:not(:disabled):hover {
  border-color: var(--in-content-border-focus);
}

xul|*.checkbox-check[checked] {
  list-style-image: url("chrome://global/skin/in-content/check.svg#check");
}

html|input[type="checkbox"]:checked {
  background-image: url("chrome://global/skin/in-content/check.svg#check"), linear-gradient(#fff, rgba(255,255,255,0.8)) !important;
}

xul|checkbox[disabled="true"] > xul|*.checkbox-check,
html|input[type="checkbox"]:disabled {
  opacity: 0.5;
}

xul|*.checkbox-label-box {
  margin-inline-start: -1px; /* negative margin for the transparent border */
  padding-inline-start: 0;
}

xul|richlistitem > xul|*.checkbox-check {
  margin: 3px 6px;
}

html|*.toggle-container-with-text {
  display: flex;
  align-items: center;
}

xul|radio {
  margin-inline-start: 0;
}

xul|*.radio-check {
  -moz-appearance: none;
  width: 23px;
  height: 23px;
  border: 1px solid var(--in-content-box-border-color);
  border-radius: 50%;
  margin-inline-end: 10px;
  background-color: #f1f1f1;
  background-image: linear-gradient(#fff, rgba(255,255,255,0.80));
  box-shadow: 0 1px 1px 0 #fff, inset 0 2px 0 0 rgba(0,0,0,0.03);
}

xul|radio:not([disabled="true"]):hover > xul|*.radio-check {
  border-color: var(--in-content-border-focus);
}

xul|*.radio-check[selected] {
  list-style-image: url("chrome://global/skin/in-content/radio.svg#radio");
}

xul|radio[disabled="true"] > xul|*.radio-check {
  opacity: 0.5;
}

xul|*.radio-label-box {
  margin-inline-start: -1px; /* negative margin for the transparent border */
  margin-inline-end: 10px;
  padding-inline-start: 0;
}

/* Category List */

*|*#categories {
  -moz-appearance: none;
  background-color: var(--in-content-category-background);
  padding-top: 39px;
  margin: 0;
  border-width: 0;
}

*|*.category {
  -moz-appearance: none;
  color: var(--in-content-category-text);
  border-inline-end-width: 0;
  padding-inline-start: 15px;
  padding-inline-end: 21px;
  min-height: 40px;
  transition: background-color 150ms;
}

*|*.category:hover {
  background-color: var(--in-content-category-background-hover);
}

*|*.category[selected],
*|*.category.selected {
  background-color: var(--in-content-category-background-active);
  color: var(--in-content-category-text-selected);
  padding-inline-start: 11px; /* compensate the 4px border */
  border-inline-start: solid 4px var(--in-content-border-highlight);
}

*|*#categories[keyboard-navigation="true"]:-moz-focusring > *|*.category[current] {
  border-top: var(--in-content-category-border-focus);
  border-bottom: var(--in-content-category-border-focus);
}

*|*.category-name {
  line-height: 22px;
  font-size: 1.25rem;
  padding-bottom: 2px;
  padding-inline-start: 9px;
  margin: 0;
  -moz-user-select: none;
}

*|*.category-icon {
  width: 24px;
  height: 24px;
}

/* header */

*|*.header {
  border-bottom: 1px solid var(--in-content-header-border-color);
  margin-inline-end: 4px; /* add the 4px end-margin of other elements */
  margin-bottom: 15px;
  padding-bottom: 15px;
  -moz-box-align: baseline;
}

*|*.header-name {
  font-size: 2.5rem;
  font-weight: normal;
  line-height: 40px;
  margin: 0;
  -moz-user-select: none;
}

/* File fields */

xul|filefield {
  -moz-appearance: none;
  background-color: transparent;
  border: none;
  padding: 0;
}

xul|*.fileFieldContentBox {
  background-color: transparent;
}

xul|*.fileFieldIcon {
  margin-inline-start: 10px;
  margin-inline-end: 0;
}

xul|*.fileFieldLabel {
  margin-inline-start: -26px;
  padding-inline-start: 36px;
}

xul|textbox:-moz-locale-dir(rtl),
xul|*.fileFieldLabel:-moz-locale-dir(rtl),
xul|textbox + xul|button:-moz-locale-dir(ltr),
xul|filefield + xul|button:-moz-locale-dir(ltr) {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

xul|textbox:-moz-locale-dir(ltr),
xul|*.fileFieldLabel:-moz-locale-dir(ltr),
xul|textbox + xul|button:-moz-locale-dir(rtl),
xul|filefield + xul|button:-moz-locale-dir(rtl) {
  border-top-right-radius: 0;
  border-bottom-right-radius: 0;
}

xul|textbox + xul|button,
xul|filefield + xul|button {
  border-inline-start: none;
}

/* List boxes */

xul|richlistbox,
xul|listbox {
  -moz-appearance: none;
  margin-inline-start: 0;
  background-color: var(--in-content-box-background);
  border: 1px solid var(--in-content-box-border-color);
  color: var(--in-content-text-color);
}

xul|treechildren::-moz-tree-row,
xul|listbox xul|listitem {
  padding: 0.3em;
  margin: 0;
  border: none;
  border-radius: 0;
  background-image: none;
}

xul|treechildren::-moz-tree-row(hover),
xul|listbox xul|listitem:hover {
  background-color: var(--in-content-item-hover);
}

xul|treechildren::-moz-tree-row(selected),
xul|listbox xul|listitem[selected="true"] {
  background-color: var(--in-content-item-selected);
  color: var(--in-content-selected-text);
}

/* Trees */

xul|tree {
  -moz-appearance: none;
  font-size: 1em;
  border: 1px solid var(--in-content-box-border-color);
  background-color: var(--in-content-box-background);
  margin: 0;
}

xul|tree:-moz-focusring,
xul|richlistbox:-moz-focusring {
  border: 1px dotted var(--in-content-border-focus);
}

xul|listheader,
xul|treecols {
  -moz-appearance: none;
  border: none;
  border-bottom: 1px solid var(--in-content-border-color);
  padding: 0;
}

.autocomplete-tree > xul|treecols {
  border-bottom: none !important;
}

xul|treecol:not([hideheader="true"]),
xul|treecolpicker {
  -moz-appearance: none;
  border: none;
  background-color: var(--in-content-box-background-hover);
  color: #808080;
  padding: 5px 10px;
}

xul|treecol:not([hideheader="true"]):not([sortable="false"]):hover,
xul|treecolpicker:hover {
  background-color: var(--in-content-box-background-active);
  color: var(--in-content-text-color);
}

xul|treecol:not([hideheader="true"]):not(:first-child),
xul|treecolpicker {
  border-inline-start-width: 1px;
  border-inline-start-style: solid;
  border-image: linear-gradient(transparent 0%, transparent 20%, #c1c1c1 20%, #c1c1c1 80%, transparent 80%, transparent 100%) 1 1;
}

xul|treecol:not([hideheader="true"]) > xul|*.treecol-sortdirection[sortDirection] {
  list-style-image: url("chrome://global/skin/in-content/dropdown.svg#dropdown");
  width: 18px;
  height: 18px;
}

xul|treecol:not([hideheader="true"]) > xul|*.treecol-sortdirection[sortDirection="ascending"] {
  transform: scaleY(-1);
}

/* This is the only way to increase the height of a tree row unfortunately */
xul|treechildren::-moz-tree-row {
  min-height: 2em;
}

/* Color needs to be set on tree cell in order to be applied */
xul|treechildren::-moz-tree-cell-text {
  color: var(--in-content-text-color);
}

xul|treechildren::-moz-tree-cell-text(selected) {
  color: var(--in-content-selected-text);
}

xul|caption {
  background-color: transparent;
}

xul|button,
html|button,
xul|colorpicker[type="button"],
xul|menulist {
  margin: 2px 4px;
}

xul|menulist:not([editable="true"]) > xul|*.menulist-dropmarker {
  margin-top: 1px;
  margin-bottom: 1px;
}

xul|checkbox {
  padding-inline-start: 0;
}

@media (-moz-windows-default-theme: 0) {
  xul|*.checkbox-check {
    background-image: none !important;
  }

  xul|*.checkbox-check[checked] {
    list-style-image: url("chrome://global/skin/in-content/check.svg#check-native");
    background-color: -moz-dialog;
  }
}

xul|radio {
  -moz-binding: url("chrome://global/content/bindings/radio.xml#radio");
  padding-inline-start: 0;
}

@media (-moz-windows-default-theme: 0) {
  xul|*.radio-check {
    background-image: none;
  }

  xul|*.radio-check[selected] {
    list-style-image: url("chrome://global/skin/in-content/radio.svg#radio-native");
    background-color: -moz-dialog;
  }
}

xul|*.radio-icon,
xul|*.checkbox-icon {
  margin-inline-end: 0;
}

/* Never draw a border for the focusring, use outline instead */
xul|*.button-box,
xul|*.menulist-label-box,
xul|*.radio-label-box,
xul|*.checkbox-label-box {
  border-style: none;
}

xul|button:-moz-focusring > xul|*.button-box,
xul|menulist:-moz-focusring > xul|*.menulist-label-box,
xul|radio[focused="true"] > xul|*.radio-label-box,
html|input[type="checkbox"]:-moz-focusring + html|label:before,
xul|checkbox:-moz-focusring > xul|*.checkbox-label-box {
  outline: 1px dotted;
}

/* Use a 2px border so that selected row highlight is still visible behind
    an existing high-contrast border that uses the background color */
@media (-moz-windows-default-theme: 0) {
  xul|treechildren::-moz-tree-row(selected),
  xul|listbox xul|listitem[selected="true"] {
     border: 2px dotted Highlight;
  }
}

    </style>
  </head>

  <body dir="ltr" class="neterror">
    <!-- Contains an alternate page title set on page init for cert errors. -->
    <div id="certErrorPageTitle" style="display: none;">Insecure Connection</div>
    <div id="captivePortalPageTitle" style="display: none;">Log in to network</div>

    <!-- ERROR ITEM CONTAINER (removed during loading to avoid bug 39098) -->
    

    <!-- PAGE CONTAINER (for styling purposes only) -->
    <div id="errorPageContainer" class="container">

      <!-- Error Title -->
      <div class="title">
        <h1 class="title-text">
Server not found</h1>
      </div>

      <!-- LONG CONTENT (the section most likely to require scrolling) -->
      <div id="errorLongContent">

        <!-- Short Description -->
        <div id="errorShortDesc">
          <p id="errorShortDescText">Firefox can’t find the server at www.kontol.kontol.</p>
        </div>
        <p id="badStsCertExplanation" hidden="true">This site uses HTTP
Strict Transport Security (HSTS) to specify that Firefox may only connect
to it securely. As a result, it is not possible to add an exception for this
certificate.</p>

        <div id="wrongSystemTimePanel" style="display: none;">
          <p> Firefox did not connect to <span id="wrongSystemTime_URL"></span> because your computer’s clock appears to show the wrong time and this is preventing a secure connection.</p> <p>Your computer is set to <span id="wrongSystemTime_systemDate"></span>, when it should be <span id="wrongSystemTime_actualDate"></span>. To fix this problem, change your date and time settings to match the correct time.</p>
        </div>

        <div id="wrongSystemTimeWithoutReferencePanel" style="display: none;">
          <p>Firefox did not connect to <span id="wrongSystemTimeWithoutReference_URL"></span> because your computer’s clock appears to show the wrong time and this is preventing a secure connection.</p> <p>Your computer is set to <span id="wrongSystemTimeWithoutReference_systemDate"></span>. To fix this problem, change your date and time settings to match the correct time.</p>
        </div>

        <!-- Long Description (Note: See netError.dtd for used XHTML tags) -->
        <div id="errorLongDesc">
<ul xmlns="http://www.w3.org/1999/xhtml">
  <li>Check the address for typing errors such as
    <strong>ww</strong>.example.com instead of
    <strong>www</strong>.example.com</li>
  <li>If you are unable to load any pages, check your computer’s network
    connection.</li>
  <li>If your computer or network is protected by a firewall or proxy, make sure
    that Firefox is permitted to access the Web.</li>
</ul>
</div>

        <div id="learnMoreContainer">
          <p><a href="https://support.mozilla.org/kb/what-does-your-connection-is-not-secure-mean" id="learnMoreLink" target="new">Learn more…</a></p>
        </div>

        <div id="prefChangeContainer" class="button-container">
          <p>It looks like your network security settings might be causing this. Do you want the default settings to be restored?</p>
          <button id="prefResetButton" class="primary" autocomplete="off">Restore default settings</button>
        </div>

        <div id="certErrorAndCaptivePortalButtonContainer" class="button-container">
          <button id="returnButton" class="primary" autocomplete="off">Go Back</button>
          <button id="openPortalLoginPageButton" class="primary" autocomplete="off">Open Login Page</button>
          <div class="button-spacer"></div>
          <button id="advancedButton" autocomplete="off">Advanced</button>
        </div>
      </div>

      <div id="netErrorButtonContainer" class="button-container"><button id="errorTryAgain" class="primary" autocomplete="off" onclick="retryThis(this);" autofocus="true">Try Again</button>
        
      </div>

      <!-- UI for option to report certificate errors to Mozilla. Removed on
           init for other error types .-->
      <div id="certificateErrorReporting">
        <p class="toggle-container-with-text">
          <input id="automaticallyReportInFuture" type="checkbox" />
          <label for="automaticallyReportInFuture" id="automaticallyReportInFuture">Report errors like this to help Mozilla identify and block malicious sites</label>
        </p>
      </div>

      <div id="advancedPanelContainer">
        <div id="weakCryptoAdvancedPanel" class="advanced-panel">
          <div id="weakCryptoAdvancedDescription">
            <p><span class="hostname"></span> uses security technology that is outdated and vulnerable to attack. An attacker could easily reveal information which you thought to be safe.</p>
          </div>
          <div id="advancedLongDesc"></div>
          <div id="overrideWeakCryptoPanel">
            <a id="overrideWeakCrypto" href="#">(Not secure) Try loading <span class="hostname"></span> using outdated security</a>
          </div>
        </div>

        <div id="badCertAdvancedPanel" class="advanced-panel">
          <p id="badCertTechnicalInfo"></p>
          <button id="exceptionDialogButton">Add Exception…</button>
        </div>
      </div>

    </div>

    <div id="certificateErrorDebugInformation">
      <button id="copyToClipboard">Copy text to clipboard</button>
      <div id="certificateErrorText"></div>
      <button id="copyToClipboard">Copy text to clipboard</button>
    </div>

    <!--
    - Note: It is important to run the script this way, instead of using
    - an onload handler. This is because error pages are loaded as
    - LOAD_BACKGROUND, which means that onload handlers will not be executed.
    -->
    <script type="application/javascript">
      initPage();
    </script>

  </body>
</html>