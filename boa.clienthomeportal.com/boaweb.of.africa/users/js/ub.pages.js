/* FILE: ub.pages.js
 *
 * HISTORY
 * ==========================================================================
 * 03-Jun-2011 rwr MKS UBR-19890:1 added logic to send tab title on change\
 *                                 event
 *                 MKS UBR-19890:2 added logic to refresh/display LiveChat
 *                                 button on Overlays
 * 09-Feb-2011 rwr Merged ADA changes from RF Code drop dates 07-Feb-2011
 *                 Covers MKS UBR-18456, UBR-18457
 * 07-Feb-2011 rwr Merged ADA changes from RF code drop dated 27-Jan-2011
 *                 Covers MKS UBR-18220, UBR-18221, UBR-18224
 *
 */
(function(jQuery, win) {
	var $                = jQuery,
		window           = win,
		_components      = [],
		_componentsStack = [],
		_initializeAsap  = '.main-content-area-promo,' +
						'.home-message-area-item,'  +
						'.tabbed-content-general,'  +
						'.tabbed-menu-content-general,'  +
						'.banner,'                  +
						'.carousel,'                +
						'.main-content-right-rail,' +
						'#make-this-my-homepage,'   +
						'.sub-nav-category',
		_initializeAsapHash = {
			'.main-content-area-promo' : 'mainContentAreaPromo',
			'.tabbed-content-general'  : 'tabify',
			'.tabbed-menu-content-general'  : 'tabifyMenu',
			'.banner'                  : 'banner',
			'.carousel'                : 'carousel',
			'.main-content-right-rail' : 'mainContentRightRail',
			'#make-this-my-homepage'   : 'makeThisMyHomepage',
			'.home-message-area-item'  : 'homeMessageAreaItem',
			'.sub-nav-category'        : 'accordionList'
		};

		/////////////////////////////////////////////////////////////////////////
		// LiveChat...
		//--- ubx = ub extensions
		//--- lc  = live chat
		//--- ubx.lc ... a place to store some globals for LiveChat logic
		//--- (mks 19890:2)
		var ubx = {
			"lc" : {
				"tabName"              : "",
				"isInitialPageLoad4LP" : true
			}
		};

	/**
	* <p>UBD -- Union Bank Debugging Proxy</p>
	* <p>Proxy the console object and provide the following value:</p>
	* <ul>
	*   <li>Detects if the <code>console</code> object is supported by the
	*       execution environment and acts accordingly</li>
	*   <li>Provides standardized message format to enable easily
	*       identifying the context/source of a message</li>
	*   <li>Adds a timestamp to each message</li>
	*   <li>Provides ability to disable debugging messages</li>
	* </ul>
	*
	* @namespace
	* @static
	* @requires jQuery
	* @see The <a href="http://getfirebug.com/wiki/index.php/Console_API">Console API</a>
	*/
	var ubd = (function (jQuery) {
		/**#@+
		* @static
		* @private
		*/

		/** @type jQuery object */
		var $ = jQuery,

			/**
			* Filename or other identifier used to prefix all log messages.
			* @type String
			*/
			filename = "",

			/**
			* Flag indicating "Development Mode" or "Production Mode".
			* Defaults to "Production Mode"
			* @type boolean
			*/
			devMode = false;

		/** @returns {String} Current time as hh:mm:ss.ms */
		function tme() {
			var d = new Date(),
				c = ":",
				s = ""  + d.getHours()   +
					c   + d.getMinutes() +
					c   + d.getSeconds() +
					"." + d.getMilliseconds();
			return s;
		}
		/**#@-*/

		/**#@+
		* @static
		**/

		/** Wrapper for the console.assert method. */
		function asrt() {
			if (!devMode) {
				return;
			}
			if (typeof console !== "undefined" && console.assert) {
				var prefix = "DEBUG " + tme(),
					args = [],
					arg2 = "";
				if (arguments && arguments.length) {
					args = $.makeArray(arguments);
				}
				if (filename) {
					prefix += " " + filename;
				}
				if (args.length && args.length >= 3) {
					arg2 = args[2];
					if (arg2 && typeof arg2 === "string") {
						args[2] = prefix + arg2;
					}/* else {
						args.unshift(prefix);
					} */
				}
				console.assert.apply(console, args);
			}
		}

		/** Wrapper for the console.debug method. */
		function dbg() {
			if (!devMode) {
				return;
			}
			if (typeof console !== "undefined" && console.debug) {
				var prefix = "DEBUG " + tme(),
					args = [],
					arg0 = "";
				if (arguments && arguments.length) {
					args = $.makeArray(arguments);
				}
				if (filename) {
					prefix += " " + filename;
				}
				prefix += ": ";
				if (args.length) {
					arg0 = args[0];
					if (arg0 && typeof arg0 === "string") {
						args[0] = prefix + arg0;
					} else {
						args.unshift(prefix);
					}
				}
				console.debug.apply(console, args);
			}
		}

		/** @returns {boolean} Flag indicating if "Dev Mode" is true or false */
		function isDevMode() {
			return devMode;
		}

		/** @returns {boolean} Current state of the devMode property. */
		function getDev() {
			return devMode;
		}

		/**
		* @param   {boolean} New state of the devMode property
		* @returns {boolean} Old state of the devMode property.
		*/
		function setDev(bDevMode) {
			var bOldDevMode = devMode;
			devMode = bDevMode;
			return bOldDevMode;
		}

		/** @returns {String} Filename */
		function getFName() {
			return filename;
		}

		/**
		* @param   {boolean} New filename
		* @returns {boolean} Old filename
		*/
		function setFName(sFilename) {
			var sOldFilename = filename;
			filename = sFilename;
			return sOldFilename;
		}

		/** @returns {boolean} Current jQuery reference object */
		function getjQuery() {
			return $;
		}

		/**
		* @param   {boolean} New jQuery reference object
		* @returns {boolean} Old jQuery reference object
		*/
		function setjQuery(jQuery) {
			var old$ = $;
			$ = jQuery;
			return old$;
		}

		return {
			/**
			* @exports asrt        as assert
			* @exports dbg         as debug
			* @exports isDevMode   as isDevMode
			* @exports getDevMode  as getDevMode
			* @exports setDevMode  as setDevMode
			* @exports getFName    as getFilename
			* @exports setFName    as setFilename
			* @exports getjQuery   as getjQuery
			* @exports setjQuery   as setjQuery
			*/
			assert      : asrt,
			debug       : dbg,
			isDevMode   : isDevMode,
			getDevMode  : getDev,
			setDevMode  : setDev,
			getFilename : getFName,
			setFilename : setFName,
			getjQuery   : getjQuery,
			setjQuery   : setjQuery
		};
	}(((typeof $ !== "undefined")?($):(window.$ || window.jQuery || window.dom.query || {}))));

	ubd.setFilename("ub.pages.js");
	// ubd.setDevMode(true);
	/////////////////////////////////////////////////////////////////////////////

	function _begin(name){
		var t = $(name).hide();
		_componentsStack.push(t);
		_components.push(t);
	}

	function _end() {
		var t = _componentsStack.pop();

		if( t ) {
			if( t.is(_initializeAsap) ) {
				t.show().initializeAsap();
			}
			else {
				$(function(){ t.show(); });
			}
		}
	}
	
	//Used to close the overlay in Corporate Trust & Escrow Services 
	function _cancelRLOverlay(){
		$('#state-widget').css("display","none");
		$('#resourceCodeArea').css("display","none");
	}
	
	//Will check if the user entered access code is correct in Corporate Trust & Escrow Services
	function _checkRLAccessCode(url){
		var accessCodeVal = $("#accessCodeText").val();
		$('#errorEntryCode').css("display","none");
		$('#warmingImgSpan').css("display","none");
			$.post(url,
				{isAjaxCall:'2', accessCode:accessCodeVal },
					function(data){
						if('Ok' === $.trim(data)){			 			
                            window.location.href = url;
			 		}
						else{
							$('#errorEntryCode').css("display","block");
							$('#warmingImgSpan').css("display","inline");
							$('#accessCodeText').focus();
							if(null !== document.getElementById('sessionTimedOut')){
								$('#sessionTimedOut').css("display","none");
							}
						}
				  });
	}
	
	//Used to check if the idle time has exceeded 20 mins
	function checkIdleTime(finalCookieName, cookieExpiryTime, url) 
    {
        //check the idle time for user
        var dateVal = Number(getCookie(finalCookieName).toString());
        var date = new Date();              
        dateVal = dateVal + (cookieExpiryTime);
		if (dateVal < date.getTime()) 
		{
			url = url + '?isTimeOut=Yes';
			window.location.href = url;
		}
    }
	
	//Used to get a particular cookies
	function getCookie(requiredCookie) 
	{
		var cookieVal = "";
		var cookiesArr = new Array();
		cookiesArr = document.cookie.split('; ');
		for (var bb = 0; bb < cookiesArr.length; bb++) 
		{
			var nameVal = new Array();
			nameVal = cookiesArr[bb].split('=');
			if (nameVal[0] == requiredCookie) 
			{
			   cookieVal = unescape(nameVal[1]);
			}
		}
		return cookieVal;
	}
	
	//Used to set a cookie
	function setCookie(finalCookieName)
        {
    	    var item1 = new Date();    	  
    	    var cookieValue = item1.getTime();
    	   
            document.cookie = finalCookieName + "=" + cookieValue+ ';';
        }
	   
	//Used to capture enter button action on enter of access code
	function searchKeyPress(e) {
		// look for window.event in case event isn't passed in
		if (typeof e == 'undefined' && window.event) {
			e = window.event;
		}
		if (e.keyCode == 13) {
			$('#valAccessCodeBtn').click();
		}
	}
	
	function checkForCookies(url){
		$('#errorEntryCode').css("display","none");
		$('#warmingImgSpan').css("display","none");
	    $.post(url,
				{isAjaxCall:'1'},
				function(data){
			 		if('Ok' === $.trim(data)){			 			
						window.location.href = url;
			 		}
			 		else{
			 			$('#state-widget').css("display","block");
			 			$('#resourceCodeArea').css("display","block");
						$("#accessCodeText").val("");
						$("html, body").animate({ scrollTop: 0 }, "slow");
						$('#accessCodeText').focus();
			 		}					
				  });
	}

	var ub = {
		BeginComponent : _begin,
		EndComponent : _end,
		carousel : { interval : 5 },
		ajax : { lastRequest : '' },
		pages : { },
		using : (function(){
			var loaded = {},
				loading = {},
				scriptUrl = $('script').
								attr('src').
								replace(/(\/|^)[\w\.\-]+$/, '$1'),
				links = $('link[rel="stylesheet"]'),
				urlCss = links.attr('href').replace(/(\/|^)[\w\.\-]+$/, '$1');

			// usage using('my.css my.js', callbackWhenBothLoads )
			return function(lib, callback, scope){
				lib = lib.split(' ');
				var counter = 0,
					cb = function() {
						// caching loaded lib with the filename
						var file = this.url.replace(/^(.*\/)?(.+)$/, '$2');
						loaded[file] = true;
						counter++;
						if( (counter) === lib.length ) {
							if(loading[file] ) {
								$.each(loading[file], function(){ this.call(scope, $); });
								delete loading[file];
							}
							else {
								callback.call(scope, $);
							}
						}
					}; /* cb() */

				$.each(lib, function(k,v){
					if( loaded[this] ) {
						cb.call({ url : this } );
					}
					else if (loading[this]) {
						loading[this].push(callback);
					}
					else {
						// begin loading;
						loading[this] = [ callback ];
						if( this.match(/\.css$/) ) {
							$.get(urlCss + this, function(data){
								links.first().after('<style type="text/css">/*<![CDATA[*/'+data+'/*]]>*/</style>');
								cb.call(this);
							});
						}
						else {
							$.getScript(scriptUrl + this, cb);
						}
					}
				}); /* $.each(...) */
			};
		})(), /* using() */
		utils : { /* ub.utils namespace */
			initGlobalNavigation : function(){
				// searchs for a current link and
				$('.global-navigation a').each(function() {
					var t = $(this), text = t.html();

					if( ! $.browser.msie || $.browser.version <= 6 ) {
						if( text.match('Ab') ) {
							t.html(text.replace(/Ab/, 'A<span class="ultra-hack-letters-browser"></span>b') );
							t.find('.ultra-hack-letters-browser').css('padding-left', '1px');
						}
					}

					if (this.href === window.location.toString().replace(/#.*$/, '') ) {
						t.parent().addClass('current');
					}
					else {
						t.parent().removeClass('current');
					}
				});
			},
			initCategoryNavigation: function() {

				// searchs for a current link and
				$('.sub-nav a').each(function() {
					if (this.href === window.location.toString().replace(/#.*$/, '')) {
						$(this).parent().addClass('current');
						return false;
					}
				});
			},
			initTopNavCurrent : function () {

				if( $('.top-nav').data('initTopNavCurrent' ) ) {
					return;
				}

				$('.top-nav').data('initTopNavCurrent', true);

				var resolveCurrent = function() {
					$('.top-nav-item').removeClass('current');
					$("#personal #nav-personal, #small-business #nav-small-business,"+
					"#commercial-institutional #nav-commercial-institutional,"+
					"#the-private-bank #nav-the-private-bank").addClass("current");

					if( $.browser.msie && $.browser.version == 6 ) {
						$('.top-nav-item').removeClass('current-last current-first');
						$('.top-nav-item.last.current').addClass('current-last');
						$('.top-nav-item.first.current').addClass('current-first');
					}
				};

				resolveCurrent();

				$('.top-nav .top-nav-item').click(function(){
					var lob = this.id.replace(/^nav-/, "");

					$('html').attr('id', lob);
					$('.sub-nav:not(.global-navigation)').hide();

					$('#sub-' + lob).show();

					resolveCurrent();
				});

				if( $.browser.msie && $.browser.version == 6 ) {
					$('.top-nav-item').hover(function(){
						var t = $(this);
						t.addClass('top-nav-item-hover');
						if( t.hasClass('first') ) { t.addClass('first-hover'); }
						if( t.hasClass('last') ) { t.addClass('last-hover'); }
					}, function(){
						var t = $(this);
						t.removeClass('top-nav-item-hover');
						if( t.hasClass('first') ) { t.removeClass('first-hover'); }
						if( t.hasClass('last') ) { t.removeClass('last-hover'); }
					});
				}

			},
			/////////////////////////////////////////////////////////////
			//  Regional Rates Routines ** 2011-Oct-11, rwr
			/////////////////////////////////////////////////////////////
			/**
			 * Determines if the given DOM Element is a link to a Regional
			 * Rates page.
			 * @private
			 * @param {DOM Element} elem The DOM element to check for the
			 *                           'rates-display-link' class.
			 * @returns {boolean}
			 */
			isRegionLink : function (elem) {
				return elem && $(elem).hasClass("rates-display-link");
			},
			/**
			 * Detects the presence of the Regional Rates cookie.
			 * @private
			 * @returns {boolean}
			 */
			hasRegionCookie : function () {
				var hasCookie = false;
				try {
					hasCookie = ($.cookie('UBMarketRegion') !== null );
				} catch(e) {
					hasCookie = false;
				}
				return hasCookie;
			},
			/**
			 * Displays the Region Selection Widget so the user can select the
			 * appropriate region.
			 * @private
			 */
			showRegionSelectionWidget : function () {
				// display the state overlay widget...
				$('#state-widget').css("display", "block");
				$('#stateselection').css("display", "block");
			}
			/////////////////////////////////////////////////////////////
		},
		resLibOverLay : _cancelRLOverlay,
		validateRLCode : _checkRLAccessCode,
		setRLCookie : setCookie,
		checkRLIdelTime : checkIdleTime,
		accessCodeKeyPress : searchKeyPress,
		checkForCookie : checkForCookies
		/* ub.utils namespace */
	};

	(function() {
		var Carousel = function(element, settings){
			var $this = this,
				options = $.extend( {
					visibles : 3,
					step : 1,
					autoStep : 3,
					speed : 400,
					autoSpeed : 400,
					auto : 1000
				}, settings);

			$.extend($this,{
				options : options,
				element : element
			});

			function intval (v) {
				v = window.parseInt(v);
				return window.isNaN(v) ? 0 : v;
			}

			var t = $(this.element).show(),
				clip = t.find('.carousel-clip');

			t.prepend('<a href="#" class="carousel-prev"></a><a href="#" class="carousel-next"></a>');

			var tira  = clip.find('ul').first(),
				tiles = tira.find('li'),
				firstItem  = tiles.first().addClass('first');

			var w=0;
			tiles.each(function(ix){
				w+=$(this).outerWidth(true);
			});

			var itemWidth = tiles.outerWidth(true),
				marginRight = intval(tiles.first().css('margin-right')),
				clipWidth = tiles.outerWidth() * options.visibles + marginRight * (options.visibles - 1);

			tira.css({width:w, height:tiles.outerHeight(true), position: 'absolute'});
			clip.css({overflow:'hidden', width:clipWidth, position:'relative'});

			if( tiles.length <= options.visibles ) {
				t.find('.carousel-next,.carousel-prev').hide();
				return;
			}

			var is_moving = false,
				stopLast = true,
				stopFirst = true,
				adjustOnStop = false;

			function _speed(){
				return isAuto() ? options.autoSpeed : options.speed;
			}

			function checkArrows() {
				t.find('.carousel-next,.carousel-prev').show();
				if( ! isAuto() ) {
					if( isFirst() ) {
						t.find('.carousel-prev').hide();
					}
					if( isLast() ) {
						t.find('.carousel-next').hide();
					}
				}
			}
			function next(step, noAnimate) {
				if( ! is_moving ) {
					is_moving = true;
					if( !step ) { step = 1; }

					if( stopLast ) {
						var items = tira.children();
						var ix = items.index(tira.find('.first'));
						var despues = (ix - step + items.length) % items.length;

						if( despues >= 0 && despues < options.visibles ) {
							step = despues ;
						}
					}

					var childrens = tira.children(), clones = [],
						cb = function(){
						while( step > 0) {
							var c = clones.shift();
							c.replaceWith( tira.children().first().detach() );
							step--;
						}
						tira.css( 'width', tira.width() - itemWidth * step );
						checkArrows();
						tira.css('left',0);
						is_moving = false;
					};

					for( var i = 0; i < step; i ++) {
						var c = $(childrens.get(i)).clone();
						clones.push(c);
						tira.append(c);
					}

					tira.css( 'width', tira.width() + itemWidth * step );

					if( noAnimate ) {
						cb();
					}
					else {
						tira.animate({left: '-=' + (itemWidth * step)}, _speed(), cb);
					}
				}
			}

			function prev(step, noAnimate) {
				if( ! is_moving ) {
					is_moving = true;
					if( !step ) { step = 1; }
					if( stopFirst ) {
						var items = tira.children();
						var ix = items.index(tira.find('.first'));

						var despues = (ix + step + items.length) % items.length;
						if( despues >  0 && despues < options.visibles ) {
							step = options.visibles - despues ;
						}
					}

					var childrens = tira.children(), clones = [] ;
					for( var i = childrens.length - 1; i >= childrens.length - step; i--) {
						var c = $(childrens.get(i)).clone();
						clones.push(c);
						tira.prepend(c);
					}

					tira.css( {'width': tira.width() + itemWidth * step, left : -1 * itemWidth * step });

					var cb = function(){
						tira.css( 'width', tira.width() - itemWidth * step );
						while( step > 0) {
							clones.shift().replaceWith(tira.children().last().detach());
							step--;
						}

						tira.css('left',0);
						is_moving = false;

						checkArrows();
					};
					if( noAnimate ) {
						cb();
					}
					else {
						tira.animate({left: '0'}, _speed(), cb);
					}
				}
			}

			var autoInterval;

			function isAuto (){
				return autoInterval;
			}

			function isFirst() {
				return tira.children().index( firstItem ) === 0;
			}

			function isLast() {
				return tira.children().get(options.visibles) === firstItem.get(0);
			}

			var currentBackward = false, pauseAuto=false;

			function auto(start, backward, now){
				if( ! options.auto ) {
					return;
				}

				backward = arguments.length > 1 ? backward : false;

				if( start ) {
					if( currentBackward !== backward ) {
						auto(false);
					}

					if( ! autoInterval ) {
						currentBackward = backward || false;
						stopFirst = false;
						stopLast = false;
						var cb = function(){
							if( !pauseAuto ) {
								if( backward ) {
									prev( options.autoStep );
								}
								else {
									next( options.autoStep );
								}
							}
						};

						autoInterval = setInterval(cb, options.auto);

						if( now ) {
							cb();
						}
					}
				}
				else {
					clearInterval(autoInterval);
					autoInterval = 0;

					if( adjustOnStop ) {
						var ix = tira.children().index( firstItem );
						if( ix > 0 && ix < options.visibles ){
							next( ix );
						}
					}
					stopFirst = true;
					stopLast = true;
				}
			}

			tira.hover(function(){
				pauseAuto = true;
			}, function(){
				pauseAuto = false;
			});

			$.extend(this,{
				next : next,
				prev : prev,
				auto: auto,
				isAuto : isAuto
			});

			t.find('.carousel-next').click(function(){
				if( ! $(this).data('holding') ) {
					auto(false);
					next(options.step);
				}
				return false;
			}).mousedown(function(){ $(this).data('holding', false);
			}).mousehold(function(){
				if( ! $(this).data('holding') ) {
					$(this).data('holding', true);
					auto(true, false, true);
				}
			});

			t.find('.carousel-prev').click(function(){
				if( ! $(this).data('holding') ) {
					auto(false);
					prev(options.step);
				}
				return false;
			}).mousedown(function(){ $(this).data('holding', false);
			}).mousehold(function(){
				if( ! $(this).data('holding') ) {
					$(this).data('holding', true);
					auto(true, true, true);
				}
			});
		};

		$.fn.ukeCarousel = function(settings) {
			if( $(this).data('ukeCarousel') ) {
				return   $(this).data('ukeCarousel');
			}
			return $(this).each(function(){
				$(this).data('ukeCarousel', new Carousel( this, settings ));
			});
		};
	}());

	$.fn.homeMessageAreaItem = function(){
		return $(this).each(function(){
			var t = $(this);

			if( t.data('homeMessageAreaItem') ) {
				return;
			}

			t.data('homeMessageAreaItem', true);

			var b = t.find('.cta-button'),
				tx = t.find('.home-message-area-item-text');

			t.parents('.main-content-right-rail').show();

		// alert('homeMessageAreaItem: ' + [ tx.parent().width(), b.css('display'), b.outerWidth(true), tx.outerWidth(true), tx.width() ].join(' ; ' ) );

			tx.width( tx.parent().width() - b.outerWidth(true) - tx.outerWidth(true) + tx.width());
		});
	};
	$.fn.makeThisMyHomepage = function() {
		var t = $(this);
		function toggleHomePage() {
			if( ub.UserPreferences.get( 'MyLOB') != $('html').attr('id') ) {
				t.find('.home-page-link-a').show();
			} else {
				t.find('.home-page-link-a').hide();
			}
		}

		if( ! ub.UserPreferences.get( 'MyLOB' ) ) {
			ub.UserPreferences.set( 'MyLOB', 'personal' );
		}

		toggleHomePage();

		t.find('.home-page-link-a').click(function(){
			ub.UserPreferences.set( 'MyHomePage', window.location.pathname.toString() );
			ub.UserPreferences.set( 'MyLOB',      $('html').attr('id') );
			toggleHomePage();
			window.location.href = "/index.jsp?myhomepage=" + $("html").attr("id");
		});

		//$('.home-services-content .home-services').css(
			//'top', $('.home-page-link').position().top + $('.home-page-link').height() );

	};

	$.fn.carousel = function() {
		var interval = $('#the-private-bank').length ? 4 : 3;
		return $(this).each(function(){
			if( $(this).data('carousel') ) {
				return;
			}
			$(this).data('carousel', {});
			$(this).show();
			var carousel = $(this).ukeCarousel({
				visibles : interval,
				step :  interval,
				autoStep : interval ,
				speed : 400,
				autoSpeed : 1000,
				auto :  ub.carousel.interval * 1000
			}).show().ukeCarousel();

			carousel.auto(true);

			$(this).find('.carousel-prev').hide();

			var items = $(this).find('.carousel-item');

			items.each(function(){
				if( $(this).find('.more').length ) {
					$(this).css('cursor', 'pointer');
				}
			}).shadow();

			var liveClick = function(event){
				var more;
				if( event.target.nodeName === 'A' ) {
					// prevent direct clicks on the <a> from being called twice
					more = $(this).find('.more:not([href^="javascript:"])');
				} else {
					more = $(this).find('.more');
				}
				if( more.length ) {
					// $('.carousel .carousel-item').removeClass('highlighted');
					// $(this).addClass('highlighted');
					items.die('click', liveClick);
					more.click(); // trigger coremetrics
					if (!more.is('.js_showdialog')) {
						window.location = more.attr('href');
					}
					items.live('click', liveClick);
				}
			};

			items.live('click', liveClick);

			// ADA - Automatically stop rotating the carousel on the landing pages when the user tabs to the first carousel "learn more" link
			items.live('focus', function(){
				carousel.auto(false);
			});
		});
	};

	// fix IE indexOf
	if(!Array.indexOf) {
		Array.prototype.indexOf = function(obj){
			for(var i=0; i<this.length; i++){ if(this[i]==obj){ return i; } } return -1;
		};
	}

	// ajax global handler
	$.ajaxSetup( { beforeSend : function(a) {
		// logs the html pages
		if( this.dataType === "html" ) { ub.ajax.lastRequest = this; } }
	});

	$.extend(ub.utils, { /* augment ub.utils namespace */
		getId : function () {
			return 'rand' + Math.random().toString().replace(/_|\./g,'');
		},
		values : function (object) {
			var results = [];
			$.each(object,function(k,v){ results.push(v); });
			return results;
		},
		isControlKey : function (e) {
			for( var i in [8, 9, 13, 16, 27, 37, 38, 39, 40, 46, 36, 35, 33, 34, 45] ) {
				if ( e.which === i ) {
					return true;
				}
			}
			return false;
		},
		Url : function ( url ) {
			this._params= [];

			var paramsRaw = (url.split("?", 2)[1] || "").split("#")[0].split("&") || [];

			for(var i = 0; i< paramsRaw.length; i++){
				var single = paramsRaw[i].split("=");
				if(single[0]) {
					this._params[single[0]] = window.unescape(single[1]);
				}
			}

			this.param = function(key){
				return this._params[key];
			};
		},
		renderCtaButtons : function () {
			$('.cta-more-details,.cta-button-red,.cta-button-gray').addClass('cta-inline-button').each(function(){
					var t= $(this);
					if( t.find('.cta-button-text').length === 0 ) {
						t.prepend('<span class="cta-button-text"/>');
					}
				});
		},
		initDisclaimer : function(scope){
			if(!scope) {
				scope = $('body');
			}

			scope.find('.disclaimer-group-id').each(function(){
				var t = $(this), id = t.text();
				t.data({
					'used' : scope.find('.disclaimer-group-ref:contains("'+id+'")').parent()
				});
			});

			scope.find('.disclaimer-ref').each(function(){
				var t = $(this), id = t.text(), u = scope.find('.disclaimer-code:contains("'+id+'")');
				if( !u.next().is( '.disclaimer-number' ) ) {
					u.after('<sup class="disclaimer-number"></sup>');
				}

				t.data('used', u);
			});

			ub.utils.showDisclaimer(scope);
		},
		showDisclaimer : function(scope){
			if(!scope) {
				scope = $('body');
			}
			/*
				1. for each disclaimer-group, i'm searching some disclaimer-group-ref where is used
				2. if there is disclaimer-group-ref visible I show the disclaimer-group and start
				prossesing the rows
				3. for each row I take the disclaimer-code and search if it is used on the content
				and it is visible on the contect also
				4. I number it if true, else I dont number
			*/
			var count = 0;

			var footer = scope.find('.disclaimer-group').first().parent().parent().show();

			scope.find('.clone-generated-disclaimer').remove();
			scope.find('.show-generated-disclaimer').show();
			scope.find('.disclaimer-group-id').each(function(){
				var t = $(this), used = t.data('used');

				if( used ) {
					// don't use :visible selector safari/chrome issue.
					used = used.filter(function(){return $(this).css('display') != 'none'; });
				}
				// if there is component visible
				if( used && used.length ) {
					t.parent().show().find('.disclaimer-ref').each(function(){
						var e = $(this), u = e.data('used');
						if( u.length && used.find('.disclaimer-code:contains("'+e.text()+'")').length ) {
							count++;
							u.next().show().text(count);
							e.next().show().text('(' + count + ')');
						}
						else {
							e.next().hide();
							u.next().hide();
						}
					});
				}
				else {
					t.parent().hide();
				}

			});

			// moving non numbered disclaimner top
			var visibles = scope.find('.disclaimer-group:visible'),
				clones = visibles.find('.disclaimer-number:not(.disclaimer-number:visible)').parent().addClass('show-generated-disclaimer').hide().clone();

			visibles.first().prepend(clones.addClass('clone-generated-disclaimer').show());
			if( ! visibles.length ) {
				footer.hide();
			}
		}
	}); /* augment ub.utils namespace */

	$.extend(ub.utils, (function(){ /* augment ub.utils namespace */
		var _ubFlashListener = {};

		window.ub_notifyFlashLoaded = function(instanceId, data){
			$('#' + _ubFlashListener[instanceId].elementId).get(0).startFlashLoading();
		};

		window._ubFlashListener = _ubFlashListener;

		function _initHackFlashTabFocus() {

			window.removeFlashFocus = function() {
				var items = $('a:visible,object'),
					flash = $('object'),
					ix = items.index(flash);

				$(items.get(ix + 1)).focus();
			};

			$('a:visible').live('keydown', function(ev){
				if( ev.keyCode === 9 ) {
					var items = $('a:visible,object'),
						flash = $('object'),
						ix = items.index(flash);

					if( ( ! ev.shiftKey && items.get(ix - 1) === this) || (ev.shiftKey && items.get(ix + 1) === this) ) {
						flash.get(0).focus();
						ev.preventDefault();
						ev.stopImmediatePropagation();
					}
				}
			});
		}

		function _FlashHero(settings) {
			settings = $.extend({
				movies : [],
				alternativeContent : '',
				version : '9.0.115',
				intervalTime : 1500,
				width : 860,
				height : 260,
				versionFlashMessage : ''
			}, settings);

			var flashMovies = settings.movies,
				id = ub.utils.getId(),
				frames = [];

			window.document.write('<div id="'+id+'"></div>');

			var container = $('#' + id);

			function _loadFallbackImage(id) {
				if( settings.alternativeContent ) {
					$('#'+id).html($(settings.alternativeContent).remove().show());
				}
			}

			container.before('<a href="#non-flash-version" style="position:absolute; left: -9999px">Switch to non flash version</a>');

			container.prev().click(function(){
				container.remove();
				$(this).after( settings.alternativeContent );
				$(this).remove(); // added by zoe remove the non-flash-version text if switch to the non-flash version
			});

			if( flashMovies.length === 0 ) {
				_loadFallbackImage(id);
				return;
			}

			for( var i = 0; i < flashMovies.length; i++){
				var ide = id + '-' + i ;
				container.append('<div  class="load-hero-container" id="' + ide + '"/>');
				frames.push(ide);
			}

			$('#'+frames.join(',#')).hide();

			if( !window.swfobject.hasFlashPlayerVersion(settings.version) ) {
				_loadFallbackImage(id);
				return;
			}

			function _loadFlash ( swfUrl, _callback, id, movieId ) {
				var data = { url : '', flashvars : {} };

				if( typeof(swfUrl) === "object" ) { $.extend(data, swfUrl); }
				else { data.url = swfUrl; }

				data.flashvars.instanceId = id;
				data.elementId = 'replaceMe-'+ id;
				data.movieId = movieId;

				$('#'+id).html('<div class="load-hero-frame" id="'+data.elementId+'"></div>');

				window.swfobject.embedSWF( data.url, data.elementId, settings.width, settings.height,  settings.version,
					false,  data.flashvars, {
						salign : "lt",
						wmode : "transparent",
						bgcolor : "#999999",
						allowfullscreen : "false",
						allowscriptaccess : "always",
						allownetworking : "all",
						tabIndex : 0
					}, {
						align : "top"
						// ,id : movieId
					}, _callback);

				_ubFlashListener[id] = data;
			}

			var movieCounter = 0,
				intervalTime = settings.intervalTime,
				interval = 0,
				stopInterval = function(){
					window.clearInterval( interval );
					interval = 0;
				},
				_callback = function(state) {
					if( !state.success ) {
						stopInterval();
						_loadFallbackImage(state.id);
					}
					_initHackFlashTabFocus();

				},
				processInterval = function(){
					$('#'+frames.join(',#')).hide();
					$('#'+frames[movieCounter]).show();

					movieCounter++;

					if( movieCounter >= flashMovies.length) {
						stopInterval();
					}
				},
				startInterval = function(){
					// laod flashes asap
					for( var i = 0; i<flashMovies.length; i++) {
						_loadFlash( flashMovies[i], _callback, frames[i], "ubtest_" + i);
					}

					// added tag index to the object tag to fix safari accessibility bug
					$('object').each(function(i){
						$(this).attr("tabindex", '0');
					});

					// switching the flashes
					processInterval();

					if ( flashMovies.length > 1 ) {
						interval = window.setInterval(processInterval, intervalTime);
					}
				};

			$(startInterval);
		}

		function _PrintPreview(content) {
			var links = $('head link').clone().wrapAll('<div/>').parent();

			$('link[media="print"]', links).attr('media', 'all');

			var $html = $( '<div>' +
				'<div class="top-toolbar"><a id="MainPrintButton" class="toolbar-button" onclick="return false" style="cursor: pointer;">Print</a></div>' +
				$('body').html() + '</div>');

			$('.cta-inline-button', $html).hide();

			$('script', $html).remove();

			$('a',$html).attr('onclick', 'return false');

			var logo = $('.logo').css('background-image').replace(/(^url\(\'?\"?|\'?\"?\)$)/g, "").replace(
				/\/[\w\-\.]+$/,'') + '/' + ($('html#the-private-bank').length ? 'logo-2.png' : 'logo-1.png'),
				img = $('<img class="printable-logo"/>').attr('src', logo );

			$('.content',$html).before(img);
			var w = window.open('', '', "location=1,status=1,scrollbars=1,width=960,height=600");
			if( ! w ) { return; }

			w.document.open();
			w.document.write( '<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">'+
				"\n<html id='"+$html.attr('id')+"'><head>" +
				links.html() + '</head><body class="printable-version '+$('body').attr('class')+'"><div style="display:none" id="PrintWrapper">' +
				$html.html() + '</div></body></html>');
			w.document.close();

			// w.document.title = document.title + ' - ' + "Printable version";
			if( content ) {
				$('.content ~ *', w.document).hide();
				$('.content', w.document).html(content);
			}

			w.document.getElementById('PrintWrapper').style.display = "block";

			w.document.getElementById('MainPrintButton').onclick = function(){
				w.print();
				w.close();
			};

			w.focus();

			if( $.browser.msie && $.browser.version == 6 ) { $(w.document).pngFix(); }
		}

		return { loadHero : _FlashHero, printPreview : _PrintPreview };
	})()); /* augment ub.utils namespace */

	$.fn.mainContentRightRail = function(){
		// wrap the call-to-action component with a div element and shadow effect.
		return $(this).each(function(){
			var t = $(this);
			if(t.data( 'mainContentRightRail')) { return ; }

			t.data( 'mainContentRightRail', {} );
			var cta = t.find('.call-to-action-messaging');
			if(cta.length > 0) {
				cta.append('<div class="hr"/>').wrapAll(
					'<div class="component"/>').parent().shadow().find('.hr:last').remove();
			}
		});
	};

	$.fn.banner = function() {
		return $(this).each(function(){
			var tab = $(this).tabify({
				panelPath: '.banner-frame',
				overrideTitle : "&bull;",
				ulClass : 'banner-frames'
			});

			tab.find('.banner-frames a').switchClick();

		});
	};

	$.fn.initializeAsap = function(){
		return $(this).each(function(){
			var s = this, t = $(s);
			$.each( _initializeAsapHash, function(k,v){
				if( t.is( k ) ) {
					t[ _initializeAsapHash[k] ].call( s );
					return false;
				}
			});
		});
	};

	$.fn.rowize = function(){
		var list = $(this).css({ overflow: 'hidden', height: 100}),
			arr = list.get(), top = $(arr[0]).position().top, it = 0, sameTop;

		arr = arr.sort(function(a,b){
			return $(a).offset().top - $(b).offset().top;
		});

		while( it < arr.length ) {
			top = parseInt($(arr[it]).offset().top, 10);
			sameTop = $();

			while( it < arr.length && top == parseInt($(arr[it]).offset().top, 10) )  {
				sameTop = sameTop.add( arr[it] );
				it++;
			}
			sameTop.css({ overflow: 'visible', height: 'auto'}).sameHeight();
		}

		return list;
	};
	$.fn.mainContentAreaPromo = function(){
		return $(this).each(function(){
			var t = $(this),
				w = '<div class="main-content-area-promo-panel component"/>',
				c = 'component-body';

			t.find('.related-links').show().addClass(c).wrap(w);

			t.find('.needs-assesstment').needAssesstment().addClass( 'main-content-area-promo-panel' );

			var promos = t.find('.main-content-area-promo-panel'),
				added = [],
				messaging = t.find('.call-to-action-messaging').addClass(c);

			for( var i = promos.length; i < 3; i++ ) {
				var a = $(w);
				added.push(a);
				t.find('.main-content-area-promo-panel,.call-to-action-messaging').last().after(a);
			}

			messaging.each( function(i){
				added[ i % added.length ].append( $(this).remove() );
			});

			promos = t.find('.main-content-area-promo-panel');
			promos.last().addClass('last');

			if( $('.call-to-action-messaging').parent().length > 1  ) {
				t.find('.call-to-action-messaging .component-title').rowize();
				t.find('.call-to-action-messaging .component-content').rowize();
			}

			var height = promos.maxOuterHeight();

			$('.main-content-area-promo-panel').each(function(){
				$(this).height( height - ($(this).outerHeight(true) - $(this).height()) );
			});

			t.find('.call-to-action-messaging').each(function(){
				var t= $(this);
				t.css('height', t.height() );
			});
		});
	};
	$.fn.needAssesstment = function(settings) {
		return $(this).each(function(){
			var t = $(this).show();
			if( $(this).data('_needAssesstment') ) {
				return;
			}

			$(this).data('_needAssesstment', true);
			function parseContainer( ul, containers, deep ) {
				ul.find('>li').each(function(){
					var id = ub.utils.getId(),
						t = $(this),
						title = t.find('>.title'),
						step = t.find('>.step').remove().attr('id', id);

					title.replaceWith( $('<a/>').attr('href', '#'+id).text(title.text()) );

					$(containers.get(deep+1)).prepend( step );

					parseContainer( step.find('>.questions'), containers, deep+1 );

				});
			}

			var containers = t.find('.steps-container');

			parseContainer( containers.find( '> .step > .questions'), containers, 0 );

			var steps = t.find('.steps-container,.step').hide();

			steps.filter('#step-1, #step-1> .step').show();

			// for step 3 cta
			$('.needs-assesstment #step-3 .cta-button').click( ub.pages.NeedAssesment.onCtaButtonClick );

			// component init coremetrics
			ub.pages.NeedAssesment.onStepChanged(1);

			steps.find( 'a[href^=#]' ).add(t.find('.banner-frames .tab-face').get()).click(function(){
				if( $(this).attr('href') === "#" ) {
					return false;
				}

				var link = $($(this).attr('href'));

				if( link.length ) {
					steps.hide();
					link.show();

					var stepContainer = link.parent().show(),
						currentStep = stepContainer.attr('id');

					if(!$(this).hasClass('tab-face')){
						// call the click to track
						if( currentStep === 'step-2') {
							ub.pages.NeedAssesment.onStepChanged(2);
						}
						else if( currentStep === 'step-3' ) {
							ub.pages.NeedAssesment.onStepChanged(3);
						}

					}

					if( currentStep ) {
						t.find('.banner-frames .tab').removeClass('current').filter(
							'.' + currentStep).addClass('current').find('a').attr('href', $(this).attr('href'));

						t.removeClass('step-1 step-2 step-3');
						t.addClass(currentStep);
					}

					$('.main-content-area-promo-panel').height('auto');

					var height = $('.main-content-area-promo-panel').maxOuterHeight();

					$('.main-content-area-promo-panel').each(function(){
						$(this).height( height - ($(this).outerHeight(true) - $(this).height()) );
					});

					return false;
				}
			});
		});
	};

	$.fn.maxOuterHeight=function(f){
		var H = 0;
		$(this).each(function(){ var h = $(this).outerHeight(f); if(H < h) { H = h; } });
		return H;
	};

	$.fn.sameHeight = function(reset) {
		var mH = 0;
		if( reset ) {
			$(this).each(function(){
			});
		}
		return $(this).each(function(){
			var h = $(this).height();
			if( mH < h ) {
				mH = h;
			}
	}).height(mH);
	};

	$.fn.getDialogSize = function(settings){
		var sizes = $.extend({
				small  : [ 520 ],
				medium : [ 620 ],
				large  : [ 720 ]
			}, settings),
			params = {},
			m = $(this).attr('class') && $(this).attr('class').match(/\bsize-([\w\-]+)\b/);

		if( m && m.length > 1 ) {
			m = m[1].split('-');

			if( m.length == 1 &&  typeof(sizes[ m[0] ]) !== "undefined" ) {
				m = sizes[m[0]];
			}

			params.width = window.parseInt(m[0], 10);

			if( m.length > 1) {
				params.height = window.parseInt(m[1], 10);
			}
		}
		return params;
	};

	(function(){
		var hrefOpened = '',
			focusables = [],
			focusFirstLink = function(ev){
				if (ev.keyCode === 9) {
					// tab to first button
					var $target = $(ev.target);
					if ($target.parents('.ui-dialog').length > 0) {

						var len = focusables.length;
						// if it's the first or last tabbable element, refocus
						if ((!ev.shiftKey && ev.target === focusables[len -1]) ||
								(ev.shiftKey && ev.target === focusables[0]) ||
								focusables.length === 0) {

							ev.preventDefault();
							var pos = ev.shiftKey ? (len -1) : 0;
							setTimeout(function () {
								focusables[pos].focus();
							}, 10);
							return false;
						}
					} else {
						ev.preventDefault();
						return false;
					}
				}

			},
			defaultModalSettings = {
				modal: true,
				// 520px
				width: '47.273em',

				open : function(){

				},
				close : function(){
					/////////////////////////////////////////////////////////////
					// LiveChat...
					//--- If LiveChat is enabled on the parent page ...
					//--- 1. Send the (saved) tab name to the LivePerson server
					//--- (mks 19890:2)
					if (window.lpUnit) {
						try {
							var msg = "";
							if (ubd.isDevMode()) {
								msg = "Closing Overlay -> Re-sending '" +
									ubx.lc.tabName +
									"' in 'page' variable 'Section' to LivePerson";
								ubd.debug(msg);
							}
							lpSendData('page', 'Section', ubx.lc.tabName);
						} catch(e) {
							// ignore exceptions, just make sure they dont
							// break anything else ;-)
							if (ubd.isDevMode()) {
								ubd.debug("Exception while sending '"+ ubx.lc.tabName +"' in 'page' variable 'Section' to LivePerson");
								ubd.debug("Exception in defaultModalSettings.close() is " + e.toString());
							}
						}
					}
					/////////////////////////////////////////////////////////////
					$('#current-dialog').remove();
					$('.ui-dialog').remove();
					window.location = '#';
					$(document).unbind('keydown',focusFirstLink);
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
			onLoadCallback = function(rq) {
				var ua = "",
					ff = "",
					tabCnt = 0,
					overlayTitle = "";

				window.location = '#showdialog,' +
					hrefOpened.replace(
						window.location.protocol +
						'//' + window.location.host, ''
					);

				/////////////////////////////////////////////////////////////////
				// LiveChat...
				//--- If LiveChat is enabled on the parent page ...
				//--- 1. Tell LivePerson that dynamic button 'lpButton_1'
				//---    needs to be configured.
				//--- 2. Send the overlay title to the LivePerson server
				//--- (mks 19890:2)
				if (window.lpUnit) {
					try {
						var otExpr  = "#current-dialog h2",
							otObj   = $(otExpr),
							otCount = otObj.length,
							otText  = otObj.text();
						ubd.assert(otCount > 0, otExpr, "didn't find overlay title!");
						// replace troublesome ampersand (&) chars with a benign plus (+) char
						overlayTitle = otText.replace("&", "+");
						if (ubd.isDevMode()) {
							ubd.debug("overlayTitle='"+overlayTitle+"'");
							ubd.debug("calling 'lpMTagConfig.pluginCode.deployDynButton.deployDynamicButton()' ...");
							ubd.debug("... to config button 'lpButton_1' on the overlay");
						}
						lpMTagConfig.
							pluginCode.
							deployDynButton.
							deployDynamicButton('lpButton_1');
						if (overlayTitle) {
							if (ubd.isDevMode())
								ubd.debug("Sending '" + overlayTitle + "' in 'page' variable 'Section' to LivePerson");
							lpSendData('page', 'Section', overlayTitle + " (Overlay)");
						}
					} catch(e) {
						// ignore exceptions, just make sure they dont
						// break anything else ;-)
						ubd.debug("Exception in onLoadCallback() is " + e.toString());
					}
				}
				/////////////////////////////////////////////////////////////////

				if ($(this).find('.rate-chart-table').length) {
					ub.pages.RateChart.init();
				}
				if ($(this).find('.comparison-chart-table').length) {
					ub.pages.ComparisonChart.init();
				}

				// Enable screen-readers to detect the start and end of the overlay's visible content.
				dom.query('.ui-dialog').append('<span class="adaAccessibilityHidden">End of dialog</span>').prepend('<span class="adaAccessibilityHidden">Start of dialog</span>');

				if (!$('.ui-dialog :input').first().focus().length) {
					$('.ui-dialog a').first().focus();
					focusables = [];
					// fix tabbing issue if it is not firefox browser
					ua = navigator.userAgent;
					ff = /Firefox/.test(ua) && ua.replace(/.*?Firefox\/(.)\.(.).*/,"$1_$2");
					if (!ff) {
						tabCnt = 1000;
						$('.ui-dialog a').each(function(i, link){
							if (link.href) {
								tabCnt = tabCnt + 1;
								$(link).attr('tabindex', tabCnt);
								focusables.push(link);
							}
						});
						$(document).bind('keydown', focusFirstLink);
					}

				}
			}; /* onLoadCallback() */

		// ub.pages.ShowDialog(href, width, height, highlight);
		ub.pages.ShowDialog = function(href, width, height, highlight){
			ubd.debug("ub.pages.ShowDialog() ** FIRED!");
			/////////////////////////////////////////////////////////////
			//  Region Rates Logic ** 2011-Oct-11, rwr
			/////////////////////////////////////////////////////////////
			try {
				if (ub.utils.isRegionLink(this)) {
					ubd.debug("ub.pages.ShowDialog() ** IS a Region Link");
					if (!ub.utils.hasRegionCookie()) {
						ubd.debug("ub.pages.ShowDialog() ** HAS NO cookie");
						ubd.debug("ub.pages.ShowDialog() ** PROMPT for Region");
						ub.utils.showRegionSelectionWidget();
						return false;
					} else {
						ubd.debug("ub.pages.ShowDialog() ** HAS cookie");
						ubd.debug("ub.pages.ShowDialog() ** SKIP prompting for Region");
					}
				}
			} catch (e) {
				// IGNORE AND MOVE ALONG...
			}
			/////////////////////////////////////////////////////////////
			var params = {},
				element;
			if( width ) { params.width = width; }
			if( height ) { params.height = height; }

			if (highlight && !href.match('highlight=')) {
				href += (href.match(/\?/) ? '&' : '?') +
					'highlight=' + ( $.isArray( highlight ) ? highlight.join(',') : highlight );
			}

			hrefOpened = href;

			ub.using('overlay.css jquery.ui.js ub.forms.js', function () {
				element = $('<div id="current-dialog"/>');
				$('body').append(element);
				element.load(_href(hrefOpened), onLoadCallback).
					dialog($.extend(defaultModalSettings, params));
			}, this);

			return false;
		};  /* ub.pages.ShowDialog() */

	$.fn.initDialog = function() {
		var dialog = $(this).parent();
		// UBR-780 removing the attribute role for jquery dialogs.
		$('.ui-dialog').removeAttr('role');

		// UBR-781 fixing keyboard tab navigation
		setTimeout(function(){
			var set = dialog.find('a,button,input,select').filter(':visible');

			$(set[1]).first().focus();

			set.keydown(function(event){
				if( event.keyCode == 9 ) {
					var ix = set.index( $(this) );
					// backward
					if( ! ix && event.shiftKey ) {
						set.last().focus();
						return false;
					}

					//forward
					// alert(ix + '-' + set.length);
					if( ix == set.length - 1 && ! event.shiftKey ) {
						set.first().focus();
						return false;
					}
				}
			});
			}, 10);

	};
	$.fn.showDialog = function(settings){
		settings = $.extend({}, settings);
		// if something was found by jQuery...
		if (this.length) {
			var selector = this.selector,
				me = function () {
				return "$.fn.showDialog('" + selector + "')";
			};
			if (selector.length > 40) {
				selector = selector.substr(0,40) + "...";
			}
			ubd.debug(me() + " ** click handler registered");
		}
		return $(this).click(function(ev){
			ubd.debug(me() + ":click() ** EVENT FIRED!");
			ev.preventDefault();
			/////////////////////////////////////////////////////////////
			//  Region Rates Logic ** 2011-Oct-11, rwr
			/////////////////////////////////////////////////////////////
			try {
				if (ub.utils.isRegionLink(this)) {
					ubd.debug(me() + ":click() ** IS a Region Link");
					if (!ub.utils.hasRegionCookie()) {
						ubd.debug(me() + ":click() ** HAS NO cookie");
						ubd.debug(me() + ":click() ** PROMPT for Region");
						ub.utils.showRegionSelectionWidget();
						return false;
					} else {
						ubd.debug(me() + ":click() ** HAS cookie");
						ubd.debug(me() + ":click() ** SKIP prompting for Region");
					}
				}
			} catch (e) {
				// IGNORE AND MOVE ALONG...
			}
			/////////////////////////////////////////////////////////////
			hrefOpened = this.href;
			ub.using('overlay.css jquery.ui.js ub.forms.js', function(){
				var params = $(this).getDialogSize(),
					c = $('<div id="current-dialog"/>');
				c.attr(settings);
				$('body').append(c);
				c.load(_href(hrefOpened), onLoadCallback).
					dialog($.extend(defaultModalSettings, params ));
			}, this);

			return false;
		});
	}; /* $.fn.showDialog() */

	})();

	$.fn.productList = function() {
		return $(this).each(function(){
			var t = $(this), list =  t.find('.component').css({ overflow: 'hidden', height: 100}),
				arr = list.get(), top = $(arr[0]).position().top, it = 0, sameTop;

			while( it < arr.length ) {
				top = $(arr[it]).position().top;

				sameTop = $();

				while( it < arr.length && top === $(arr[it]).position().top )  {
					sameTop = sameTop.add( arr[it] );
					it++;
				}
				sameTop.css({ overflow: 'visible', height: 'auto'});
				sameTop.find('.component-body').find('p,.component-content').sameHeight();
				sameTop.find('.component-body').sameHeight();
				sameTop.find(':header,.component-title').sameHeight();
			}

			sameTop.addClass('last');
		});
	};

	$.fn.columnify = function(settings){
		return $(this).each(function(){
			var elementsPerRow = $(this).hasClass('cols-3') ? 3 : 2,
				arr = $(this).find('.component');
			arr.each(function(i){
				var e = $(this), r = e.find('.right'), l = e.find('.left');
				if( r.length > 0 ) {
					r.css('float', 'right').width( r.parent().innerWidth() - l.outerWidth(true) );
				}

				if( (i+1) % elementsPerRow === 0 ) {
					$(this).addClass('last-col');
					arr.slice(i-2, i+1).sameHeight();
				}
			}).last().addClass('last-col');
		}).productList();
	};

	$.fn.shadow = function(settings) {
		if( $.browser.msie && $.browser.version <= 6 ) {
			return $(this);
		}

		settings = $.extend({
			top: true,
			left: true,
			right:true,
			bottom: true
		}, settings);

		var sh = '';

		if( settings.top )   { sh += '<div class="shadow-element shadow-box-n "></div>'; }
		if( settings.top )   { sh += '<div class="shadow-element shadow-box-ne"></div>'; }
		if( settings.top )   { sh += '<div class="shadow-element shadow-box-nw"></div>'; }
		if( settings.bottom ){ sh += '<div class="shadow-element shadow-box-s "></div>'; }
		if( settings.bottom ){ sh += '<div class="shadow-element shadow-box-sw"></div>'; }
		if( settings.bottom ){ sh += '<div class="shadow-element shadow-box-se"></div>'; }
		sh += '<div class="shadow-element shadow-box-e "></div>';
		sh += '<div class="shadow-element shadow-box-w "></div>';

		return $(this).each(function(){
			$(this).addClass('shadow-box').append(sh);
			if( $.browser.msie && $.browser.version == 7 ) {
				$(this).find('.shadow-box-s,.shadow-box-n').css('width', $(this).outerWidth() + 'px' );
			}

		});
	};

	$.fn.defaultText = function(settings) {
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

	$.fn.switchClick = function(settings) {
		// Settings
		settings = $.extend({
			startStopTrigger : false,
			interval : 5000,
			// when user click it wont bet restarted if 0
			restartInterval : 0
		}, settings);

		var self = $(this),
			i = 0,
			interval = 0,
			restartInterval = 0,
			startInterval = function() {
				interval = window.setInterval( function(){
					if( i < self.length-1 ) {
						i++;
					}
					else if( i == self.length-1 ) {
						i = 0;
					}

					$(self[i]).click();
				}, settings.interval );
			};

		self.mouseup(function(){
			window.clearInterval(interval);
			window.clearInterval(restartInterval);
			for( i=0; i < self.length; i++ ) {
				if(self.get(i) === this) {
					break;
				}
			}
			if( settings.restartInterval ) {
				restartInterval = window.setTimeout(startInterval, settings.restartInterval);
			}
		});

		if( settings.startStopTrigger ) {
			settings.startStopTrigger.toggle(function(){
				window.clearInterval(interval);
				interval=0;
			}, function() {
				startInterval();
			});
		}

		startInterval();

		return $(this);
	};
	
	$.fn.tabifyMenu = function(settings) {
		$(this).tabify(settings, true);
	};

	/**
	* Dynamically builds menu tabs
	* The original implementation handles building the tab menu for specific page and use JS to 
	* only display related content to the tab pressed.
	* A new enhancement was added (SCR 28873) to handle building the menu that can be used in
	* different pages, the current page is loaded by clicking on the tab which performs a http
	* request.
	* @param {boolean} isTabMenu with a value of true allows the new implementation
	*/
	$.fn.tabify = function(settings, isTabMenu) {
		
		isTabMenu = typeof isTabMenu != 'undefined'?true:false;
	
		// Settings
		settings = $.extend({
			current: 0,
			hideIfOnlyOne: true,
			autoWidth : true,
			panelPath: '.tab-panel',
			titlePath: '.tab-title',
			overrideTitle : false,
			ulClass : 'tabs'
		}, settings);

		ub.utils.renderCtaButtons();

		return $(this).each(function(){
			var self = $(this);

			if($(this).data('tabify')){
				return;
			}

			self.data('tabify',{});
			
			// current tab
			var currentTab = self.find('input[name="currentTab"]').val();
			
			if (isTabMenu) {
				settings.panelPath = '.tab-menu-panel';
			}

			var panels = self.find( settings.panelPath );

			if(panels.length === 0) {
				return;
			}
			else if( settings.hideIfOnlyOne && panels.length == 1) {
				$(this).find( settings.titlePath ).remove();
				self.show();
				ub.utils.showDisclaimer();
				return;
			}

			panels.hide();
			self.show();

			var ul = $('<ul class="clearfix"/>');
			(function(){

				for( var i = 0; i < panels.length; i++ ) {
					var panel = $(panels[i]), title;

					var $h = '';
					var hrefCont = '';

					if (isTabMenu) {
						
						var url = panel.find('a').attr("href");
						if (typeof url === 'undefined') {
							url = '';
						}
						
						//url = url.replace(/\//g, "\\");
						currentTab = currentTab.replace(/\\/g, "/");
						var currentTabFile = currentTab.substring(currentTab.lastIndexOf('/') + 1, currentTab.length);
						var urlFile = url.substring(url.lastIndexOf('/') + 1, url.length);
						var isSameFile = currentTabFile === urlFile;
						if (currentTab === url || isSameFile) {
							settings.current = i;
						}
						hrefCont = url;
						
					} else {
						hrefCont = '#' + panel.attr('id');
					}
					
					$h = '<li class="tab' + (panels.length == (i+1) ? ' last' : '') +
						'"><div class="tab-top"><b/><i/></div>' +
						'<a href="' + hrefCont +'" class="tab-face"></a></li>';
					

					var html = $($h);

					if( ! settings.overrideTitle ) {
						// coremetrics hack on cilck
						var oldNode = panel.find( settings.titlePath ).remove();
						html.find('a').data('tabOldNode', oldNode ).text( oldNode.text() );
					}
					else {
						html.find('a').html( settings.overrideTitle );
					}

					ul.append(html);
				}
			})();

			ul.addClass(settings.ulClass);

			self.prepend( ul );

			var hideAll = function() {
					panels.show().css('height', '1%');
					panels.hide();
					ul.find('li').removeClass('current');
					ul.find('a').removeAttr('title');
					// ADA adding a span hidden as current
					ul.find('li a em').remove();
				},
				show = function(ev) {
					var top = $('html, body').scrollTop(),
						t = $(this),
						id = t.attr('href').replace(/^.*#/, '#');

					if( t.data('tabOldNode') ) {
						t.data('tabOldNode').click();
					}

					//////////////////////////////////////////////////////////////
					// LiveChat...
					//--- Following Live Chat code to communicate the tab click
					//--- event to Live Person server so tab name is communicated.
					//--- (mks 19890:1)
					if(window.lpUnit) {
						try {
							// replace troublesome ampersand (&) chars with a
							// benign plus (+) char and a regex to detect the
							// Retirement tab
							ubx.lc.tabName = t.text().replace("&", "+");
							var where = "$.fn.tabify.show(ev) ";
							if (ubd.isDevMode())
								ubd.debug(where + "ubx.lc.tabName has been set to = '" + ubx.lc.tabName + "'");
							if (ubd.isDevMode()) ubd.debug(where + "Sending '" + ubx.lc.tabName + "' in 'page' variable 'Section' to LivePerson");
							if (ubx.lc.isInitialPageLoad4LP) {
								ubx.lc.isInitialPageLoad4LP = false;
								ubd.debug("... using lpAddVars()");
								lpAddVars('page', 'Section', ubx.lc.tabName);
							} else {
								ubd.debug("... using lpSendData()");
								lpSendData('page', 'Section', ubx.lc.tabName);
							}
						} catch(e) {
							// ignore exceptions, just make sure they dont
							// break anything else )
							ubd.debug("Exception in " + where + "is " + e.toString());
						}
					}
					//////////////////////////////////////////////////////////////

					hideAll();
					t.parent().addClass('current');
					// ADA adding a span hidden as current
					t.append('<em style="position:absolute; left: -9999px"> current</em>');

					if (!isTabMenu) {
						var h = $( id );
	
						if( $.browser.msie && $.browser.version == 7 ) { h.css('height', 'auto'); }
	
						h.show();
	
						if( $.browser.msie && $.browser.version == 7 ) { h.css('height', $(h).height() + 'px'); }
					}


					ub.utils.showDisclaimer();

					return false;
				};

			var anchors = ul.find('a').click(show).click(function(){
				if (isTabMenu) {
					window.location.href=$(this).attr('href');
				} else {
					if( window.location.hash == $(this).attr('href').replace(/.*#/, '#') ) {
						return false;
					}
				}
			});

			if (isTabMenu) {
				var r = false;
				if(typeof(anchors[settings.current]) != 'undefined' ) {
					r=show.call(anchors[settings.current]);
				} else { 
					r=show.call(anchors[0]);
				}
			} else {
				var showTab = function(tab) {
					if( tab == '#' ) { return false; }
	
					var i = panels.get().indexOf( panels.parent().find( tab ).get(0) );
	
					if( i >= 0 ) {
						show.call( anchors[i] );
						return true;
					}
					return false;
				};
	
				$(window).hashchange(function(){
					if( showTab(window.location.hash) ) {
						$('html, body').scrollTop(0);
					}
				});
	
				var h = window.location.hash, r = false;
	
				if( h != '#' && panels.parent().find(h).length ) { r=showTab(h); }
				else if(typeof(anchors[settings.current]) != 'undefined' ) { r=show.call(anchors[settings.current]); }
				else { r=show.call(anchors[0]); }
			}

			if(r){
				$(function(){
					$('html, body').scrollTop(0);
				} );
			}

			if( settings.autoWidth ) {
				var w = ul.innerWidth(),
					t = ul.find('.tab'),
					mH = 0,
					rest = w % t.length;

				t.each(function(){
					var f = $(this),
						r = (rest--) > 0 ? 1 : 0,
						a = f.find('a'),
						tmh = parseInt( a.css('max-height'), 10);

					f.width( Math.floor(w / t.length) - f.outerWidth(true) + f.innerWidth() + r);

					var h = a.height();

					f.find('.tab-top').width( f.width() - 10);

					if( h > tmh ) { h = tmh; }

					if( mH < h ) { mH = h; }
				});

				var bh = t.find('a').height(mH).first().outerHeight(true);

					t.find('.tab-top,.tab-top i,.tab-top b').height(bh < 50 ? bh : 50);

				if( $.browser.msie && $.browser.version == 6 ) {
					ul.height(mH);
				}
			}

			/*** ROLLBACK MKS UBR 17608 TO ORIGINAL CODE ***/
			$(document).ready(function()
			{
				if( $.browser.msie)
				{
					$(document).scrollTop(0);
				}
				else if($.browser.safari)
				{
					$('html, body').animate({scrollTop:0}, 'slow');
				}
				return false;
			});
			/*** ROLLBACK MKS UBR 17608 [end] ***/

		});
	};


	$.fn.accordionList = function(settings) {
		return $(this).each(function(){
			var t = $(this);

			if( t.data('accordionList') ) { return; }

			t.data('accordionList', true);

			t.css('background', '#FFFFFF').css('opacity', 0.85);

			var showCurrent = function() {
				t.find('ul ul').hide();
				t.find('.current').parents('ul').show().parent('li').find('>a').addClass('expanded');
			};

			// searchs for a current link and
			t.find('a').each(function(){
				if( this.href === window.location.href || this.pathname === window.location.pathname + "index.jsp" ) {
					$(this).addClass('current-a').parent().addClass('current');
					return false;
				}
			});

			showCurrent();

			t.find('li a').click(function(){
				t.find('li.current > a').removeClass('current-a');
				t.find('li.current').removeClass('current');
				$(this).addClass('current-a').parent().addClass('current');
			});
		});
	};

	$.fn.globalNavigation = function(settings) {
		return $(this).each(function() {
			$(this).find('a[href=#]').click(function(ev){
				ev.stopImmediatePropagation();
			});

			$(this).find('a').click(function() {
				ub.utils.initGlobalNavigation();
				$(this).parent().addClass('current');
			});
		});
	};

	$.each('LeadGenerationForm Calculator ContactForm ComparisonChart'.split(' '), function(k,v){
		ub.pages[v] = {
			init : function() {
				ub.using('ub.forms.js overlay.css', function(){ ub.pages[v].init(); });
			}
		};
	});

	ub.pages.NeedAssesment = {
		onStepChanged : function(step) {},
		onCtaButtonClick : function() {}
	};

	ub.UserPreferences = (function(){
		// eval cookie in a lazy way
		var userData = function(){
			var data = {
				/// stores the saved home page url
				MyHomePage   : null,
				/// Cookie that stores the saved LOB page
				MyLOB        : null,
				MyBackground : null,
				// stores the last LOB using the <html id=??> attribute
				CurrentLOB   : null,
				CurrentTime  : null,
				BackgroundExpire : null
			};

			var json = $.cookie( 'UnionBankUserPreferences' );

			if( json ) {
				try {
					data = $.evalJSON( json );
				}
				catch(e) {
				}
			}

			userData = function() {
				return data;
			};

			return userData();
		};

		function _get (key){
			return userData()[key];
		}

		function _set(key, value) {
			var data = userData();
			data[ key ] = value;

			$.cookie( 'UnionBankUserPreferences', $.toJSON( data ), { path: '/', expires : 365 } );

			return this;
		}

		return {
			get : _get,
			set : _set
		};
	})();

	$.extend(ub.pages, {
		Factory : (function(){
			function _create (pageName) {
				ub.pages.AbstractPage.init();

				if ( typeof( ub.pages[pageName] ) != "undefined" ) {
					ub.pages[pageName].init();
				}
				return  ub.pages[pageName];
			}
			return {
				create : _create
			};
		})(),

		AbstractPage : (function(){
			var CHANGE_BACKGROUND_TIME = 2; // in minutes ~ 2 minutes.
			function _addMoreIcon() {
				var moreIconHash = {
					'pdf': new RegExp('\\.pdf$'),
					'text'         : new RegExp('\\.txt$'),
					'richtext'     : new RegExp('\\.rtf$'),
					'document'     : new RegExp('\\.(doc|docx)$'),
					'sheet'        : new RegExp('\\.(xls|xlsx)$'),
					'presentation' : new RegExp('\\.(ppt|pptx)$'),
					'flash'        : new RegExp('\\.(flv|swf)$'),
					'pod'          : new RegExp('\\.(mp3|mp4)$'),
					'video'        : new RegExp('\\.(mpg|mov)$')
				};

				$('a.more').each(function(){
					var className, href = this.href.toString();
					$.each(moreIconHash, function(k) {
						if( this.test( href ) ) {
							className = k;
							return false;
						}
					} );
					if( className ) {
						$(this).addClass( className );
					}
				});
			}

			function subNavIn (ev) {
				if($(this).find('.sub-nav-flyout').length !== 0) {
					$(this).find('input').show();
					var t = $(this), height = 0, width = 0,
						els = t.find('.sub-nav-flyout-col,.sub-nav-flyout-links');

					$(this).css('z-index', 1000);

					t.addClass('hover');
					els.each(function(){
						width += $(this).outerWidth();
					});
					t.find('.sub-nav-flyout-panel').css('width', width + 'px');
					if( $.browser.msie && $.browser.version == 7 ) {
						t.find('.sub-nav-flyout').find('.shadow-box-s,.shadow-box-n').css('width', t.find('.sub-nav-flyout-panel').outerWidth() + 'px' );
					}

					for( var i=0; i < els.length; i++) {
						var e = $(els[i]), h = e.height();
						if( h > height ) {
							height = h;
						}
					}
					if( height > 0 ) {
						els.css( 'height', height + 'px');
					}

					t.find('.close').click(function() {
						t.removeClass('hover').parents('.sub-nav-item').removeClass('hover');
						return false;
					});
				}
			}

			function subNavOut(){
				var t = $(this);
				t.css('z-index', 0);
				t.find('input').hide().focus();
				t.removeClass('hover').parents('.sub-nav-item').removeClass('hover');
			}

			function _setLogoLink() {
				// The logo will always redirect to the same item is highlighted in the LOB navigation
				// unless there is no item highlighted
				var a = $('.top-nav .current a')[0];
				if( a ) {
					if( a.href.replace(/#.*$/, '') !== window.location.toString() ) {
						$('.logo').attr('href', a.href);
					}
					else{
						$('.logo').replaceWith('<div class="logo"/>');
					}
				}

			}

			function _loadIeHack() {
				if( $.browser.msie && $.browser.version == 7 ) {
					$("body").addClass("ie7");
				}
				if( $.browser.msie && $.browser.version == 6 ) {
					$("body").addClass("ie6");
					ub.using('jquery.pngFix.js', function(){
						setTimeout(function(){
							$(window.document).pngFix();
						}, 1);
					});
				}

			}

			var backgroundAvailables;

			function _getCurrentBackground() {
				backgroundAvailables = (typeof(window.ub.backgrounds) != "undefined") ? window.ub.backgrounds : [];

				var now = (new Date()).getTime(),
					bg = ub.UserPreferences.get('MyBackground'),
					expire = ub.UserPreferences.get('BackgroundExpire'),
					CurrentLOB = ub.UserPreferences.get('CurrentLOB');

				ub.UserPreferences.set('CurrentLOB', $('html').attr('id') );

				// if the background time expieres or the user change the current LOB the background
				// should be recalculated
				if( (! expire) || (expire < now) || (! CurrentLOB) || (CurrentLOB != $('html').attr('id')) ) {
					expire = now + CHANGE_BACKGROUND_TIME * 60 * 1000;
					ub.UserPreferences.set('MyBackground', (bg = Math.random()) );
					ub.UserPreferences.set('BackgroundExpire', expire );
				}

				var index = Math.floor( bg * backgroundAvailables.length );

				if( backgroundAvailables[index] ) {
					$('html').css( 'background-image', 'url("' + backgroundAvailables[index] + '")');
				}
			}

			function _signOnBehavior() {
				/* sign-on */
				var a = function(){
					$('.sign-on').toggleClass('expanded');
					$('.sign-on-form .sign-on-user-id').focus();
					return false;
				};
				$('.sign-on-toggle').bind('click keyup',a);
				$('.sign-on a:last').focusout(a);
			}

			function _initFlyout() {
				/* sub-nav flyout*/
				// removing empty flyouts, rework IE6 low performace
				$('.sub-nav-flyout-panel').each(function(){
					var t = $(this);
					if( ! t.find('.sub-nav-flyout-links li,.sub-nav-flyout-col').length ) {
						t.parent().remove();
					}
				});

				// adding class first to handle extra left border
				$('.sub-nav-flyout-panel .sub-nav-flyout-col:first-child').addClass('first');

				var display_timeout = 0;

				$('.sub-nav-item').hover(function(){

					var element=$(this);
					$(':input').blur();

					//Top Menu Delay Changes Starts
					if(display_timeout != 0) {
						clearTimeout(display_timeout);
					}

					display_timeout = setTimeout(function(){
						subNavIn.call(element);
					},250);
					return false;
				},function(){
					if(display_timeout != 0) {
						clearTimeout(display_timeout);
					}
					subNavOut.call(this);
					return false;
				}
				//Top Menu Delay Changes Ends
				);
				// Accessibility improvement: do not open the flyout if reached by tab.
				//.focusin(subNavIn);

				// Accessibility improvement: close the flyout when user shift-tabs their way out of the menu.
				$(".sub-nav-item-face a").keydown(function(e) {
					if (e.which === 9 && e.shiftKey) {
						subNavOut.call(this);
					}
				});

				// Accessibility improvement: do not open the flyout if reached by tab.
				$(".sub-nav-item").keydown(function(e) {
					if (e.which === 13) {
						subNavIn.call(this);
					}
				});

				$(".sub-nav-item").click(function(e) {
					subNavIn.call(this);
				});

				// Accessibility improvement: notify screen-reader users that they can open a link.
				$(".sub-nav-item-face a[href='#']").append('<span class="adaAccessibilityHidden">&nbsp;menu</span>');

				if( !( $.browser.msie && $.browser.version <= 6 )) {
					$('.sub-nav-flyout-panel').shadow();
					$('div.sub-nav-item-face').shadow({ bottom: false});

					$('.sub-nav-item').each( function() {
						$(this).find('a').last().focusout(subNavOut);
					});
				}

			}

			function _initFooter() {
				// setting footer-3-cols, footer-4-cols or footer-5-cols class to the footer

				$(".footer").addClass( "footer-"+ $(".footer .footer-links").length +"-cols" );

				$('.footer-links > dt').sameHeight();

				$('.copyright-footer, .shadow').shadow({ top: false });
			}

			function _initPrintView() {
				function clickHandler(e) {
					ub.utils.printPreview();

					e.preventDefault();
				}

				$('#action-print-page').click(clickHandler);
			}

			// EMail page
			function _initEmailPage(){
				$('#action-email-page').attr('href',
					'mailto:?subject=' + window.escape( window.document.title || "Union Bank" )+
					'&body=' + window.escape(window.location));

				$('.action-email-page-subject').attr('href',
					$('.action-email-page-subject').attr('href') + '?subject=' + window.escape(window.document.title || "Union Bank"));
			}

			function _initFindBanker(){
				var t = $(this), f = t.find('form');
				f.find('.step-2 .change-location a').click(function(){
					f.find('.step-2').hide();
					f.find('.step-1').show();
					f.find('#search').val('').removeClass('default-text-active').focus();

					return false;
				});

				function _formValid() {
					var s = f.find('#search');
					return $.trim(s.val()) && ! s.hasClass('default-text-active');
				}

				f.submit(function(ev){
					ev.preventDefault();
					t.find('.error-msg').hide();

					if( _formValid() ) {
						$.getJSON( f.attr('action'), f.serialize(), function(data){
							t.find('.find-banker-data').html(data.html);
							f.find('.location').text(data.location);
							f.find('.step-1').hide();
							f.find('.step-2').show();
						});
					}
					else {
						t.find('.error-msg').show();
					}
				});
			}

			function _onLoad() {

				ub.utils.initGlobalNavigation();
				ub.utils.initCategoryNavigation();

				_getCurrentBackground();
				// disable drag&drop for top links
				if( ! $.browser.msie ) {
					$('img, .header-container a').mousedown(function(){ return false; });
				}
				_initFlyout();
				_signOnBehavior();
				_initFooter();
				_addMoreIcon();
				_setLogoLink();
				$('.main-content-right-rail').mainContentRightRail();
				$('.banner').banner();
				_initPrintView();
				_initEmailPage();

				ub.utils.renderCtaButtons();

				ub.utils.initDisclaimer();

				$('.needs-assesstment').needAssesstment();

				if( $.browser.msie && $.browser.version == 6) {
					$('.get-started-row').parents().show();
					$('.get-started-row .cta-button .text').each(function(){
						var t = $(this), w = $(this).width();
						t.css('width', 'auto');
						if( t.width() > w ) { t.width(w); }
					});
				}

				$('.top-search').each(function(){
					// lazy init for auto complete
					var t = $(this);

					// UB's google search appliance
					var gsaHost = ['search-ch-ws1.unionbank.com', 'search-mp-ws1.unionbank.com', 'search.unionbank.com'];
					var suggestService = (gsaHost.indexOf(window.location.host) != -1) ?
						'/suggest?max=10&site=ub2_collection&client=ub2_frontend&access=p&format=rich' :
						'/ubincludes/jsp/gsa_suggest_proxy.jsp';

					var txt = t.find(".top-search-text"),
						topSearchLazy = function(){
							txt.unbind('click focus', topSearchLazy );
							ub.using('jquery.ui.js overlay.css', function(){
								txt.attr("autocomplete","off").autocomplete({
									source: function(req, add) {
										$.getJSON(suggestService, {q : req.term.toLowerCase()}, function(data) {
											var suggestions = [];
											if (data !== null) {$.each(data.results, function(i, val){suggestions.push(val.name);});}
											add(suggestions);
										});
									},
									minLength: 1,
									position: ($.browser.mozilla ? { offset :  "1 0" } : {})
								});
							});
						};
					//txt.bind('click focus', topSearchLazy);
				});

				$('.find-banker').each(_initFindBanker);

				// init home-find-location

				$('form.home-find-location').each(function(){
					var f = $(this), options = f.find(':checkbox');

					options.click(function(d){
						var t = $(this);
						options.filter('[value="' + t.attr('value') + '"]').attr('checked', t.attr('checked'));
					});

					f.find('.find-flyout').each(function(){
						var t = $(this);
						t.find('.close').click(function(){
							t.removeClass('find-flyout-expanded');
							return false;
						});

						t.find( '.find-flyout-trigger' ).click(function(){
							t.toggleClass('find-flyout-expanded');

							// Accessibility improvement: toggling the text for "More" or "Fewer" options.
							var moreOrFewer = $(this);
							if (moreOrFewer.text() == 'More Options >') {
								moreOrFewer.text('Fewer Options');
							} else if (moreOrFewer.text() == 'More') {
								moreOrFewer.text('More');
							}  else if (moreOrFewer.text() == 'Fewer Options') {
								moreOrFewer.text('More Options >');
							} else if (moreOrFewer.text() == 'Fewer') {
								moreOrFewer.text('More');
							}

							return false;
						});
					});
				});

				if ( $('.two-columns').length ) {
					ub.using('jquery.autocolumn.js', function(){
						$('.two-columns').columnize({ columns: 2 });
					});
				}

				function _initJsShowDialog() {
					$('.js_showdialog,a[target=overlay]').
						not('a[href^="javascript:"]').
						append('<span class="adaAccessibilityHidden"> - Opens a simulated dialog</span>').
						showDialog();
					$('.open-contact-form').showDialog();

					// if the hash is coded as #showdialog, it is used for comparison chart
					if( !($.browser.msie && $.browser.version == 6)) {
						var m = window.location.toString().match(/#showdialog,(.+)$/);
						if( m ) {
							ub.pages.ShowDialog(m[1]);
						}
					}
				}

				_initJsShowDialog();

				$(".default-text").defaultText();

				$('.product-list').productList();

				$('.global-navigation').globalNavigation();
			}

			function _init () {
				// UBR-678Width of Commercial and Wealth Pages is Larger than Retail Pages
				if( $.browser.msie && $.browser.version <= 7 ) {
					if( $(window).width() >= 1008 ) {
						$('html').css('overflow-x', 'hidden');
						$(function(){ $('html').css('overflow-x', 'auto'); });
					}
				}

				$(_loadIeHack);
				$(_onLoad);
			}
			return { init : _init };
		})()
	});

	ub.pages.LOBLanding = (function(){
		function _onLoad() {
			//$('.home-services .sign-on-user-id').focus();
		}
		function _init() { $(_onLoad); }
		return { init : _init };
	})();

	ub.pages.ProductDetails = (function(){
		return { init : function () {} };
	})();

	ub.pages.About = (function(){
		function _init() {
			$(function(){
				$('.list-item').columnify();
				//$('.list-item').productList();
			});
		}
		return { init : _init };
	})();

	ub.pages.ProductLanding = (function(){
		return { init : function(){} };
	})();

	window.ub = $.extend(ub, window.ub);

	try {
		if (window.self !== window.top) {
			ubd.debug("running in an iframe");
			top.ub = window.ub;
		}
	} catch (e) {
		// WE ARE RUNNING IN AN IFRAME AND WE CAUGHT A SECURITY EXCEPTION
		// TRYING TO MUCK AROUND WITH A PARENT IN A DIFFERENT DOMAIN
		// BUMMER DUDE !!
		ubd.debug("caught exception fiddling around with the iframe; exception: " + e);
	}
})(window.dom.query, window);