(function (window, jQuery) {
	var $ = jQuery;
	$.fn.watermark = function(settings) {
		settings = $.extend({
			defaultTextActive : 'default-text-active'
		}, settings );
		return $(this).focus(function() {
			if ($(this).val() == $(this)[0].title) {
				$(this).removeClass(settings.defaultTextActive);
				$(this).val("");
			}
		}).blur(function() {
			if (! $(this).val() ) {
				$(this).addClass(settings.defaultTextActive);
				$(this).val($(this)[0].title);
			}
		}).blur();
	};
}(window, jQuery));

