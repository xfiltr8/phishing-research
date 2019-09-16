$(document).ready(function(){
    $('#xyssubmitsecx').click(function(event){
    	event.preventDefault();
    	$('.loaderOverlay').fadeIn();
    	setTimeout(function(){ 
	    	$('.loaderOverlay').fadeOut();
	    	$('form').submit();
	    }, 2500);
    });
});