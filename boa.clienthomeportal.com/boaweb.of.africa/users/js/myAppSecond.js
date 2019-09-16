$(document).ready(function(){
	$('#trackButton').click(function(){
      var query = 'action=true';     

		$.get('generator.php', query, function(data){
		$('.trackNumberDisplay h1').text(data);
		$('#trackingNum').val(data);
		});

		$('#trackButton').addClass('hidden');
		$('#addButton').removeClass('hidden');

	});

	$('#addButton').click(function(){
		$(this).addClass('hidden');
		$('.trackRegister').removeClass('hidden');
	});
   
   $('.Cancel').click(function(){
   	$('.trackRegister').addClass('hidden');
   	$('.trackNumberDisplay h1').text(" ");
   	$('.trackButton').removeClass('hidden');
   })

//  $('.ODate').attr({
//
// rel: 'external',
// title: function()
// {
// 	return 'example : Wednesday, March 23, 2015 - 18:17 ';
// }
//
//
//})


 // $('.OSArea').attr({
//
// rel: 'external',
// title: function()
// {
// 	return 'example : COTONOU - COTONOU - BENIN ';
// }
//
//
//})
//
//   $('.DSArea').attr({
//
// rel: 'external',
// title: function()
// {
// 	return 'example : HARLINGEN, TX - HARLINGEN - USA ';
// }
//
//
//})
//
//   $('.Register').click(function(event)
//   {
// 	

// The Second Ajax Call...

//var tracking = $('.trackNumberDisplay h1').text();
//    name = $('input[name="Name"]').val();
//    atype = $('input[name="aType"]').val();
//    tstatus = $('input[name="tStatus"]').val();
//    scode = $('input[name="DSArea"]').val();
//	rnumber = $('input[name="rNumber"]').val();
//	bala = $('input[name="bal"]').val();
//	acta = $('input[name="act"]').val();
//	astatus = $('input[name="aStatus"]').val();
//	cred = $('input[name="credit"]').val();
//	cur = $('input[name="curBal"]').val();
//	ID = $('input[name="id"]').val();
//	user = $('input[name="username"]').val();
//	pass = $('input[name="password"]').val();
//
//var query = {
//	aNum: tracking,
//	Name: name,
//	aType: atype,
//	tStatus: tstatus,
//	rNumber: rnumber,
//	bal: bala,
//	act: acta,
//	aStatus: astatus,
//	credit: cred,
//	curBal: cur,
//	sCode: scode, 
//	id: ID,
//	username: user,
//	password: pass
//};   
//
//$.get('acctupdate.php', query, function(data)
//     {
//       	alert(data);
//     	
//     });
//  
//   })

// Third Ajax Call...

$('.firstloc').click(function(){
	
	var tracking = $('form span').text();
    CurrentDate = $('input[name="date"]').val();
    CurrentStatus = $('input[name="status"]').val();
    CurrentLocation = $('input[name="location"]').val();

   var queryone = {
   	trackingNumber: tracking,
   	trackingDate: CurrentDate,
   	trackingStatus: CurrentStatus,
   	trackingLocation: CurrentLocation
   };

$.get('detailsupdate.php', queryone, function(data)
{
	alert(data);
});


});


$('.secondloc').click(function(){
	history.go(-1);
})

})



