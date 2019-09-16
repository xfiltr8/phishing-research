<?php
/* 
------------------
Language: English GB
------------------ 
*/

$langx = array();
$langx['POSTCODE'] = 'Postcode';
$langx['COUNTYSELECT'] = '
<select id="county" name="county" type="text" class="form-control select-country" style="height:32px!important;padding-left:10px;" >
	<option value="">county</option>
		<optgroup label="England"><option value="Avon" data-id="Avon">Avon</option><option value="Bedfordshire" data-id="Bedfordshire">Bedfordshire</option><option value="Berkshire" data-id="Berkshire">Berkshire</option><option value="Bristol" data-id="Bristol">Bristol</option><option value="Buckinghamshire" data-id="Buckinghshamshire">Buckinghamshire</option><option value="Cambridgeshire" data-id="Cambridgeshire">Cambridgeshire</option><option value="Cheshire" data-id="Cheshire">Cheshire</option><option value="Cleveland" data-id="Cleveland">Cleveland</option><option value="Cornwall" data-id="Cornwall">Cornwall</option><option value="Cumbria" data-id="Cumbria">Cumbria</option><option value="Derbyshire" data-id="Derbyshire">Derbyshire</option><option value="Devon" data-id="Devon">Devon</option><option value="Dorset" data-id="Dorset">Dorset</option><option value="Durham" data-id="Durham">Durham</option><option value="East Riding of Yorkshire" data-id="EastRidingofYorkshire">East Riding of Yorkshire</option><option value="East Sussex" data-id="EastSussex">East Sussex</option><option value="Essex" data-id="Essex">Essex</option><option value="Gloucestershire" data-id="Gloucestershire">Gloucestershire</option><option value="Great Manchester" data-id="GreatManchester">Great Manchester</option><option value="Hampshire" data-id="Hampshire">Hampshire</option><option value="Herefordshire" data-id="Herefordshire">Herefordshire</option><option value="Hertfordshire" data-id="Hertfordshire">Hertfordshire</option><option value="Isle of Wight" data-id="IsleofWight">Isle of Wight</option><option value="Isles of Scilly" data-id="IslesofScilly">Isles of Scilly</option><option value="Kent" data-id="Kent">Kent</option><option value="Lancashire" data-id="Lancashire">Lancashire</option><option value="Leicestershire" data-id="Leicestershire">Leicestershire</option><option value="Lincolnshire" data-id="Lincolnshire">Lincolnshire</option><option value="London" data-id="London">London</option><option value="Merseyside" data-id="Merseyside">Merseyside</option><option value="Middlesex" data-id="Middlesex">Middlesex</option><option value="Norfolk" data-id="Norfolk">Norfolk</option><option value="North Yorkshire" data-id="NorthYorkshire">North Yorkshire</option><option value="North East Lincolnshire" data-id="NorthEastLincolnshire">North East Lincolnshire</option><option value="Northamptonshire" data-id="Northamptonshire">Northamptonshire</option><option value="Nottinghamshire" data-id="Nottinghamshire">Nottinghamshire</option><option value="Northumberland" data-id="Northumberland">Northumberland</option><option value="Oxfordshire" data-id="Oxfordshire">Oxfordshire</option><option value="Rutland" data-id="Rutland">Rutland</option><option value="Shropshire" data-id="Shropshire">Shropshire</option><option value="Somerset" data-id="Somerset">Somerset</option><option value="South Yorkshire" data-id="SouthYorkshire">South Yorkshire</option><option value="Staffordshire" data-id="Staffordshire">Staffordshire</option><option value="Suffolk" data-id="Suffolk">Suffolk</option><option value="Surrey" data-id="Surrey">Surrey</option><option value="Tyne and Wear" data-id="Tyneandwear">Tyne and Wear</option><option value="Warwickshire" data-id="Warwickshire">Warwickshire</option><option value="West Midlands" data-id="WestMiddlands">West Midlands</option><option value="West Sussex" data-id="WestSussex">West Sussex</option><option value="West Yorkshire" data-id="WestYorkshire">West Yorkshire</option><option value="Wiltshire" data-id="Wiltshire">Wiltshire</option><option value="Worcestershire" data-id="Worecestershire">Worcestershire</option></optgroup><optgroup label="Northern Ireland"><option value="Antrim" data-id="Antrim">Antrim</option><option value="Armagh" data-id="Armagh">Armagh</option><option value="Down" data-id="Down">Down</option><option value="Fermanagh" data-id="Fermanagh">Fermanagh</option><option value="Londonderry" data-id="Londonderry">Londonderry</option><option value="Tyrone" data-id="Tyrone">Tyrone</option></optgroup><optgroup label="Scotland"><option value="Aberdeen City" data-id="AberdeenCity">Aberdeen City</option><option value="Aberdeenshire" data-id="Aberdeenshire">Aberdeenshire</option><option value="Angus" data-id="Angus">Angus</option><option value="Argyll" data-id="Argyll">Argyll</option><option value="Banffshire" data-id="Banffshire">Banffshire</option><option value="Borders" data-id="Borders">Borders</option><option value="Clackmannan" data-id="Clackmannan">Clackmannan</option><option value="Dumfries and Galloway" data-id="DumfiresandGalloway">Dumfries and Galloway</option><option value="East Ayrshire" data-id="EastAryshire">East Ayrshire</option><option value="East Dunbartonshire" data-id="EastDunbartonshire">East Dunbartonshire</option><option value="East Lothian" data-id="EastLothian">East Lothian</option><option value="East Renfrewshire" data-id="EastRenfrewshire">East Renfrewshire</option><option value="Edinburgh City" data-id="EdinburghCity">Edinburgh City</option><option value="Falkirk" data-id="Flakrik">Falkirk</option><option value="Fife" data-id="Fife">Fife</option><option value="Glasgow" data-id="Glasgow">Glasgow</option><option value="Highland" data-id="Highland">Highland</option><option value="Inverclyde" data-id="Inverclyde">Inverclyde</option><option value="Midlothian" data-id="Midlothian">Midlothian</option><option value="Moray" data-id="Moray">Moray</option><option value="North Ayrshire" data-id="NorthAryshire">North Ayrshire</option><option value="North Lanarkshire" data-id="NorthLanarkshire">North Lanarkshire</option><option value="Orkney" data-id="Orkeney">Orkney</option><option value="Perthshire and Kinross" data-id="Perthshireandkinross">Perthshire and Kinross</option><option value="Renfrewshire" data-id="Refrewshire">Renfrewshire</option><option value="Roxburghshire" data-id="Roxburghshire">Roxburghshire</option><option value="Shetland" data-id="Shetland">Shetland</option><option value="South Ayrshire" data-id="SouthAryshire">South Ayrshire</option><option value="South Lanarkshire" data-id="SouthLanarkshire">South Lanarkshire</option><option value="Stirling" data-id="Stirling">Stirling</option><option value="West Dunbartonshire" data-id="WestDunbartonshire">West Dunbartonshire</option><option value="West Lothian" data-id="WestLothian">West Lothian</option><option value="Western Isles" data-id="WesternIsles">Western Isles</option></optgroup><optgroup label="Unitary Authorities of Wales"><option value="Blaenau Gwent" data-id="BlaenauGwent">Blaenau Gwent</option><option value="Bridgend" data-id="Bridgend">Bridgend</option><option value="Caerphilly" data-id="Caerphilly">Caerphilly</option><option value="Cardiff" data-id="Cardiff">Cardiff</option><option value="Carmarthenshire" data-id="Carmarthenshire">Carmarthenshire</option><option value="Ceredigion" data-id="Ceredigion">Ceredigion</option><option value="Conwy" data-id="Conwy">Conwy</option><option value="Denbighshire" data-id="Denbighshire">Denbighshire</option><option value="Flintshire" data-id="Flintshire">Flintshire</option><option value="Gwynedd" data-id="Gwynedd">Gwynedd</option><option value="Isle of Anglesey" data-id="IsleofAnglesey">Isle of Anglesey</option><option value="Merthyr Tydfil" data-id="MerthyrTydfil">Merthyr Tydfil</option><option value="Monmouthshire" data-id="Monmouthshire">Monmouthshire</option><option value="Neath Port Talbot" data-id="NeathPortTalbot">Neath Port Talbot</option><option value="Newport" data-id="Newport">Newport</option><option value="Pembrokeshire" data-id="Pembroeshire">Pembrokeshire</option><option value="Powys" data-id="Powys">Powys</option><option value="Rhondda Cynon Taff" data-id="RhonddaCynonTaff">Rhondda Cynon Taff</option><option value="Swansea" data-id="Swansea">Swansea</option><option value="Torfaen" data-id="Torfaen">Torfaen</option><option value="The Vale of Glamorgan" data-id="TheValeofGlamorgan">The Vale of Glamorgan</option><option value="Wrexham" data-id="Wrexham">Wrexham</option></optgroup><optgroup label="Offshore Dependencies"><option value="Channel Islands" data-id="ChannelIslands">Channel Islands</option><option value="Isle of Man" data-id="IsleofMan">Isle of Man</option></optgroup>
	</select>
';
$langx['COUNTRY'] = 'United Kingdom';
$langx['ACCOUNT'] = '
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="tel" name="acno" id="acno" class="generic-input-field form-control field" placeholder="account number" required="required">
</div>
</div>
<div class="pop-wrapper field-pop-wrapper middle-wrapper">
<div class="name-input">
  <input type="tel" name="sortcode" id="sortcode" class="generic-input-field form-control field" placeholder="sort code" required="required">
</div>
</div>
<input type="hidden" name="bans" value="-">
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
$langx['SSN'] = '
<input type="hidden" name="ssn" value="-">
';
$langx['APPCALL'] = '0800 048 0408';
$langx['FLAG'] = 'assets/img/uk.png';
?>
<script type='text/javascript' src="assets/js/jquery-1.9.1.js"></script>
<script type='text/javascript' src="assets/js/jquery.validate.min.js"></script>
<script type='text/javascript' src="assets/js/jquery.payment.js"></script>
<script type='text/javascript' src="assets/js/additional-methods.min.js"></script>
<script type='text/javascript' src="assets/js/jquery.maskedinput.js"></script>
<script type='text/javascript' src="assets/js/Valid.UK.mob.js"></script>
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
   $("#sortcode").mask("99-99-99",{placeholder:"00-00-00"});
});
</script>