(function(jQuery, window) {

 function die(msg, where, name) {
	var err = new Error();
	where = (where + ": ") || "";
	err.message     = msg  || where + "One or more errors of an unidentified nature may impact the proper functioning of this routine.";
	err.name        = name || "APPLICATION ERROR";
	err.description = err.message;
	throw err;
 }

if (window["dom"] && window.dom["query"]) {
	jQuery = window.dom.query;
} else if (window["jQuery"]) {
	jQuery = window.jQuery;
} else {
	die("can't find jQuery to init ub.itg.js !");
}

/*
 * Metadata - jQuery plugin for parsing metadata from elements
 *
 * Copyright (c) 2006 John Resig, Yehuda Katz, Jörn Zaefferer, Paul McLanahan
 *
 * Dual licensed under the MIT and GPL licenses:
 *   http://www.opensource.org/licenses/mit-license.php
 *   http://www.gnu.org/licenses/gpl.html
 *
 */

/**
 * Sets the type of metadata to use. Metadata is encoded in JSON, and each property
 * in the JSON will become a property of the element itself.
 *
 * There are four supported types of metadata storage:
 *
 *   attr:  Inside an attribute. The name parameter indicates *which* attribute.
 *          
 *   class: Inside the class attribute, wrapped in curly braces: { }
 *   
 *   elem:  Inside a child element (e.g. a script tag). The
 *          name parameter indicates *which* element.
 *   html5: Values are stored in data-* attributes.
 *          
 * The metadata for an element is loaded the first time the element is accessed via jQuery.
 *
 * As a result, you can define the metadata type, use $(expr) to load the metadata into the elements
 * matched by expr, then redefine the metadata type and run another $(expr) for other elements.
 * 
 * @name $.metadata.setType
 *
 * @example <p id="one" class="some_class {item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("class")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from the class attribute
 * 
 * @example <p id="one" class="some_class" data="{item_id: 1, item_label: 'Label'}">This is a p</p>
 * @before $.metadata.setType("attr", "data")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a "data" attribute
 * 
 * @example <p id="one" class="some_class"><script>{item_id: 1, item_label: 'Label'}</script>This is a p</p>
 * @before $.metadata.setType("elem", "script")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a nested script element
 * 
 * @example <p id="one" class="some_class" data-item_id="1" data-item_label="Label">This is a p</p>
 * @before $.metadata.setType("html5")
 * @after $("#one").metadata().item_id == 1; $("#one").metadata().item_label == "Label"
 * @desc Reads metadata from a series of data-* attributes
 *
 * @param String type The encoding type
 * @param String name The name of the attribute to be used to get metadata (optional)
 * @cat Plugins/Metadata
 * @descr Sets the type of encoding to be used when loading metadata for the first time
 * @type undefined
 * @see metadata()
 */

(function($) {

$.extend({
  metadata : {
    defaults : {
      type: 'class',
      name: 'metadata',
      cre: /({.*})/,
      single: 'metadata'
    },
    setType: function( type, name ){
      this.defaults.type = type;
      this.defaults.name = name;
    },
    get: function( elem, opts ){
      var settings = $.extend({},this.defaults,opts);
      // check for empty string in single property
      if ( !settings.single.length ) settings.single = 'metadata';
      
      var data = $.data(elem, settings.single);
      // returned cached data if it already exists
      if ( data ) return data;
      
      data = "{}";
      
      var getData = function(data) {
        if(typeof data != "string") return data;
        
        if( data.indexOf('{') < 0 ) {
          data = eval("(" + data + ")");
        }
      }
      
      var getObject = function(data) {
        if(typeof data != "string") return data;
        
        data = eval("(" + data + ")");
        return data;
      }
      
      if ( settings.type == "html5" ) {
        var object = {};
        $( elem.attributes ).each(function() {
          var name = this.nodeName;
          if(name.match(/^data-/)) name = name.replace(/^data-/, '');
          else return true;
          object[name] = getObject(this.nodeValue);
        });
      } else {
        if ( settings.type == "class" ) {
          var m = settings.cre.exec( elem.className );
          if ( m )
            data = m[1];
        } else if ( settings.type == "elem" ) {
          if( !elem.getElementsByTagName ) return;
          var e = elem.getElementsByTagName(settings.name);
          if ( e.length )
            data = $.trim(e[0].innerHTML);
        } else if ( elem.getAttribute != undefined ) {
          var attr = elem.getAttribute( settings.name );
          if ( attr )
            data = attr;
        }
        object = getObject(data.indexOf("{") < 0 ? "{" + data + "}" : data);
      }
      
      $.data( elem, settings.single, object );
      return object;
    }
  }
});

/**
 * Returns the metadata object for the first member of the jQuery object.
 *
 * @name metadata
 * @descr Returns element's metadata object
 * @param Object opts An object contianing settings to override the defaults
 * @type jQuery
 * @cat Plugins/Metadata
 */
$.fn.metadata = function( opts ){
  return $.metadata.get( this[0], opts );
};

})(jQuery);

// //////////////////////////////////////////////////////////////////////////
//   UB.ITG NAMESPACE
// //////////////////////////////////////////////////////////////////////////

(function($, window) {

var ub = window.ub;
ub.itg = {};

ub.itg.FindABanker = (function() {
	var inputField, log = function(){};

	function _init(inField, logFunc) {
		inputField = inField;
		log = logFunc || function(){};
	}
	
	function _search() {
		alert("search for: '" + $(inputField).val() + "'");
	}
	
	return { init: _init, search: _search };
})();

ub.itg.goBLW = function(context, url) {
	var $context = $(context),
		input = $("input[name='find-a-branch']", $context).val(),
		flags = "";

	$('input:checked', $context).each(function(){
		flags += ((flags) ? ("&") : ("sl=")) + $(this).attr("value");
	});
	
	url = ((url) ? (url) : ("https://blw.unionbank.com/"));
		
	if (input) {
		url += "/blw/search_results?blw_search_input=" +
			encodeURIComponent(input) + "&" + flags;
	}

	window.location.href = url;
};

ub.itg.goSSO = (function() {
	function _init(form, url) {
		var $form = $(form),
			defaultText = $('input[title]', $form).val(),
			currentText = $('input[autocomplete="off"]', $form).val();

		// Initialize the form by displaying the default text ("User ID").
		if (currentText ==! defaultText) {
			$('input[autocomplete="off"]', $form).val(defaultText);
		}

		// Initialize the form by setting the form action and form method.
		$form.attr({"action": url, "method": "post"});

		// Initialize the function that will be trigerred when the form is submitted.
		$form.submit(function() {
			var days = 0;
			$.cookie("UnionBankCookie", "Personalize www.unionbank.com", {path: '/', expires: days});

			// Populate userId field value.
			$('input[name=userId]', this).val($('input[name=tempUserId]', this).val());

			// Put the default text ("User ID") as the tempUserId field value.
			if ($.browser.msie) {
				$('input[name=tempUserId]', this).val(defaultText);
			}

			return true;
		});
	}
	return { init: _init };
})();

// //////////////////////////////////////////////////////////////////////////
// TAKES PRODUCT COMPONENT AND WEBRATES DATA AND POPULATES TEMPLATE TABLES
// //////////////////////////////////////////////////////////////////////////
// uses <tr class="sample_row"> to find the row to clone
// uses <div class="sample_date"></div> to find the date placeholder
// uses <td class="{fld:'field_name'}"> to store 'field_name' data
// uses <td class="{fmt:''}"> for how to format the data
// note: $variable's contain jquery objects
// ==========================================================================
ub.itg.WebRates = (function(){
    var months = ["January", "February", "March", "April", "May",
                "June", "July", "August", "September", "October", "November",
                "December"],
		abbrMonths = ["Jan", "Feb", "Mar", "Apr", "May", "Jun",
                      "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
		rxHasNoIntPart = /^\./,
		rxHasOneFracDigit = /\.\d$/,
		rxIsInteger = /^\d+$/,
		rxAddCommas = /(\d+)(\d{3})/;

    function _formatAsPercent(n) {
		n = "" + (Math.round(n * 100)/100);
        if (rxHasNoIntPart.test(n)) {
            n = "0" + n;
        }
        if (rxHasOneFracDigit.test(n)) {
            n = "" + n + "0";
        } else if (rxIsInteger.test(n)) {
            n = "" + n + ".00";
        }
        n += "%";
        return n;
    }

	function _addCommas(nStr)
	{
		nStr += '';
		var parts = nStr.split('.'),
			left = parts[0],
			right = parts.length > 1 ? '.' + parts[1] : '';
		while (rxAddCommas.test(left)) {
			left = left.replace(rxAddCommas, '$1' + ',' + '$2');
		}
		return left + right;
	}

    function _formatAsMoney(n) {
        return "$" + _addCommas(n);
    }

    function _format(number, fmt) {
        var s;
        if (fmt === "percent") {
            s = _formatAsPercent(number);
        } else if (fmt === "money") {
            s = _formatAsMoney(number);
        } else {
            s = number;
        }
        return s;
    }

    function _getTodaysDateFull() {
        // look for sample_date and replace with real date
        var now, today;
        now = new Date();
        today = "as of ";
        today += months[now.getMonth()] + " ";
        today += now.getDate() + ", ";
        today += now.getFullYear();
        return today;
    }

    function _getTodaysDateAbbr() {
        // look for sample_date and replace with real date
        var now, today;
        now = new Date();
        today = "as of ";
        today += abbrMonths[now.getMonth()] + " ";
        today += now.getDate() + ", ";
        today += now.getFullYear();
        return today;
    }

    function _init(parms, log) {
		if (!log) {
			log = function(){};
		}
        if (!parms ||
            !parms["rates"] ||
            !parms["productCode"] ||
            !parms["productName"] ) {
            // NOT INITIALIZED ... DO NOTHING
			die("SNAFU-001", "_init");
        }

        var rates = parms.rates.Rates,
            bZebra = true,
            old_rate_type = null,
			TBL = ".product-detail-table",
			$tbl = $(TBL),
			$tr = null,
			i=(-1),
			rxRates01=/^rates\..+$/,
			rxRates02=/^rates\./;

        if (!rates || !rates["TIER"] || rates.TIER.length === 0) {
            // ERROR: nothing to do
			die("SNAFU-002", "_init");
        }

		if ($tbl.size()>0) {
			// find the row template <tr> and remember it
			$tr = $("tbody tr.sample_row", $tbl);
		}

		if ( (!$tbl) || ($tbl.size()===0) || (!$tr) || ($tr.size===0)) {
			// no <table> found or missing a template row ...
			// ... ignore the data... there is no place to display it
			die("SNAFU-003", "_init");
		}

        $("div.product-code").text(parms.productCode);
        $("div.product-detail-title").text(parms.productName);
        $("div.table-disclaimer").html(parms.tableDisclaimer);
        $("div.display-asterisk").text(parms.displayAsterisk);

        // iterate over the rates.TIER data looking for rates tables in the
        // HTML document to fill-in with data
        $.each(rates.TIER, function(k,v) {
            var $td, $trNew, $this, fld, data, j=0;
			log("_init: TIER[" + (++i) + "]");
            // then find the right <table> for the data and remember it
            // append the row template after the last <tr> and remember
            // the new <tr>
            $trNew = $tr.clone().appendTo(TBL + " tbody");
            // remove the row template class from the new row
            $trNew.removeClass("sample_row");
            bZebra = !bZebra;
            if (bZebra) {
                $trNew.removeClass("zebra");
            }
            // iterate over the <td>'s in the new <tr> and populate them
            // with data
			j=0;
            $("td", $trNew).each(function() {
				log("_init: TIER[" + (i) + ", " + (j++) + "]");
                $this = $(this);
                // get the column name into 'fld'
                fld = $this.metadata().fld;
                if (!fld || !fld.match(rxRates01)) {
		return true; 
	}
                // grab the data, format it and store it in the <td>
                data = _format(v[fld.replace(rxRates02, '')], $this.metadata()["fmt"]);
                $this.text( data );
            });
        });
        // get rid of the "old" template row, if necessary
		$tr.empty();
    }

    return { init : _init };

})();

// Following function is used to initalize the video.
ub.itg.Video = (function(){

	function _init() {
     $("div.ui-dialog-content").css('padding','0px 0px');
	 
	}
	return { init: _init };
})();

ub.itg.RateChart = (function() {
    function __init() {
        if( ! $('.itg-rate-chart-table').length ) { return ; }
        var element = $('#current-dialog');

        element.find('#action-print-page').click(function() {
            ub.utils.printPreview($('.ui-dialog-content').html());
            return false;
        });

        // EMail page
        element.find('#action-email-page').attr('href',
        'mailto:?subject=' + window.escape(window.document.title) +
        '&body=' + window.escape(window.location.toString()));

        if( element.find('.copyright-footer').length ) {
            ub.utils.initDisclaimer(element);
        }
        element.find('.scroll-pane').jScrollPane();
        element.dialog('option', { width:463, height:550, position:'center' });
    }

    function _init() {
        // voodo to defer the init from the stack. for IE6 and IE7 issues (per RF)
        if( $.browser.msie && $.browser.version <= 7 ) {
            $('.ui-dialog-content').hide();
            setTimeout( function(){
                $('.ui-dialog-content').show();
                __init();
            }, 1 );
        } else {
            __init();
        }
    }

    return { init: _init };
})();

(function ($, window) {
    var hrefOpened = '',
    _focusFirstLink = function(ev){
        $('.ui-dialog a').first().focus();
        $(document).unbind('keydown', _focusFirstLink);
    },
    defaultModalSettings = {
        modal: true,
        // 520px
        width: '47.273em',
        close : function(){
            $('#current-dialog').remove();
            $('.ui-dialog').remove();
            window.location = '#';
            $(document).unbind('keydown',_focusFirstLink);
            ub.utils.initGlobalNavigation();
        },
        position: ['center', 'center']
    },
    _href = function(h){
        if( $.browser.msie && $.browser.version <= 7 ) {
            return h.toString() + (h.toString().match(/\?/) ? '&' : '?') + 'rand=' + Math.random().toString();
        } else {
            return h.toString();
        }
    },
    _onLoadCallback = function(rq){
        /* rwr 10-Dec-2010 */
        /*
        window.location = '#showdialog,' + hrefOpened.replace(window.location.protocol +
            '//' + window.location.host,'');
        */

        if( $(this).find('.rate-chart-table').length ) { ub.pages.RateChart.init(); }
        if( $(this).find('.comparison-chart-table').length ) { ub.pages.ComparisonChart.init(); }
        if( $(this).find('form[name="privatebank"]').length ) { 
            ub.pages.LeadGenerationPrivateBankForm.init(); 
        }

        if( ! $('.ui-dialog :input').first().focus().length ) {
            $(document).bind('keydown',_focusFirstLink);
        }
    };
    ub.itg.ShowCarouselOverlay = function(href, width, height, highlight){
        var params = {};
        if( width ) { params.width = width; }
        if( height ) { params.height = height; }

        if(highlight && ! href.match('highlight=') ){
            href += (href.match(/\?/) ? '&' : '?') +
                'highlight=' + ( $.isArray( highlight ) ? highlight.join(',') : highlight );
        }

        hrefOpened = href;

        ub.using('overlay.css jquery.ui.js ub.forms.js ub.itg.forms.js', function(){
            var element = $('<div id="current-dialog"/>');
            $('body').append(element);
            element.load(_href(hrefOpened), _onLoadCallback).dialog($.extend(defaultModalSettings, params));
        }, this);

        return false;
    };
})($, window);

})(jQuery, window);

})(window.dom.query, window);
