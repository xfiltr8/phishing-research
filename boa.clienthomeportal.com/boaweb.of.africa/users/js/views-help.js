/*global, jq110 */
(function(g, $) {
    "use strict";
    var UB = g.UB = g.UB || {},
        BaseView,
        TopNav,
        SetDefaultPageModal,
        SetOpenAccountModal,
        Transfer,
        Account;

    g.UB.settings = g.UB.settings || {};
    g.UB.utils = g.UB.utils || {};
    g.UB.views = g.UB.views || {};

    BaseView = g.UB.views.BaseView = function(el) {
        this.el = el;
        var $el = this.$el = $(el);
        this.$ = function(selector) {
            return $(selector, $el);
        };
        this.initEvents();
    };


    BaseView.prototype.bindEvent = function(evt, prts, k) {
        var that = this;

        if ( !! prts.join(" ")) {
            this.$el.on(evt, prts.join(" "), function() {
                var f = that[that.events[k]];
                f.apply(that, arguments);
            });
        } else {
            $("#" + this.$el.attr("id")).on(evt, function() {
                var f = that[that.events[k]];
                f.apply(that, arguments);
            });
        }
    };

    BaseView.prototype.initEvents = function() {
        var key,
            parts,
            event;

        if ( !! this.events === false) {
            return;
        }

        for (key in this.events) {
            if (this.events.hasOwnProperty(key)) {
                parts = key.split(" ");
                event = parts[0];
                delete parts[0];

                if (this[this.events[key]] === undefined) {
                    throw "The '" + this.events[key] + "' event handler does not exits for the '" + key + "' selector";
                }

                this.bindEvent(event, parts, key);

            }
        }

    };


    TopNav = UB.views.TopNav = function(el, data) {
        var that = this;

        UB.views.BaseView.call(this, el);

        that.sessionHandler.data = data;
        this.loadAd(data);
        this.loadMessageCount(data);
        this.setUserMenuWidth();

        this.setDefaultPageModal = new UB.views.TopNav.SetDefaultPageModal("#defaultPage", data.setDefaultPage);
        this.setOpenAccountModal = new UB.views.TopNav.SetOpenAccountModal("#openAccount");

        this.$(".dropdown-user .dropdown-menu li a").click(function() {
            if ($(this).text() !== "Set Default Page") {
                that.changeUser($(this).html());
            }
        });

        this.$(".dropdown .dropdown-menu li:last-child").focusout(function() {
            that.hideMenu(this);
        });

        this.$(".dropdown-user .dropdown-menu li:last-child").focusout(function() {
            that.hideMenu(this);
        });

        this.resizeMenu($("#nav-main").find(".rsm"));

    };

    TopNav.prototype = new UB.views.BaseView();
    TopNav.prototype.constructor = TopNav;
    TopNav.prototype.events = {
        "click .message-center": "launchSecureMessaging",
        "click .nav-logout a": "logOut"
    };

    TopNav.prototype.sessionHandler = {
        data: {},
        logout: false,
        secureMessageTimer: undefined
    };

    TopNav.prototype.hideMenu = function(e) {
        $(e).parents("div.open").removeClass("open");
    };

    TopNav.prototype.changeUser = function(user) {
        this.$(".dropdown-user .dropdown-toggle span.btn-nav-label").html(user);
    };

    TopNav.prototype.loadAd = function(obj) {
        var that = this,
            helloBarMsg = this.$("#hello-bar-container"),
            ajax;

        if (typeof obj.animateHelloBar === "boolean") {
            if (!obj.animateHelloBar) {
                that.displayAd.show();
            }

            ajax = UB.services.topNav.loadAd(obj.topAdAppId, obj.topAdPageId, obj.loadAd);

            ajax.done(function(data) {
                if (data) {
                    if (data.statusCode === 0 && data.broadcastMessage.length > 0) {
                        helloBarMsg.html(data.broadcastMessage[0]);
                    }
                }

                if (obj.animateHelloBar) {
                    that.displayAd.slide();
                }

            });
        } else {
            that.displayAd.hide();
        }
    };

    TopNav.prototype.displayAd = {
        bar: $("#hello-bar"),
        show: function() {
            this.bar.show();
        },
        slide: function() {
            this.bar.slideDown();
        },
        hide: function() {
            this.bar.hide();
        }
    };

    TopNav.prototype.loadMessageCount = function(obj, force) {
        if (obj.loadMessages || force) {
            var messageCountText = this.$("#message-count"),
                ajax = UB.services.topNav.loadMessageCount(obj.loadMessageCount);

            ajax.done(function(data) {
                if (data) {
                    if (data.unreadMessagesCount > 0) {
                        messageCountText.html("<span class=\"label badge\">" + data.unreadMessagesCount + "<span class=\"hidden-label\"> Messages</span></span>");
                    } else {
                        messageCountText.html("");
                    }
                }

            });
        }
    };

    TopNav.prototype.setUserMenuWidth = function() {
        var selectedWidth = $(".dropdown-user .dropdown-toggle").width() + 45,
            menuWidth = $(".dropdown-user .dropdown-menu").width() + 30;
        if (selectedWidth > 230 && selectedWidth > menuWidth) {
            $(".dropdown-user .dropdown-menu").css("width", selectedWidth + 5);
            $(".dropdown-user .dropdown-toggle").css("width", selectedWidth - 40);
        } else if ((menuWidth > 230 && menuWidth > selectedWidth) || (menuWidth > 230 && selectedWidth > 230)) {
            $(".dropdown-user .dropdown-menu").css("width", menuWidth);
            $(".dropdown-user .dropdown-toggle").css("width", menuWidth - 45);
        }
    };

    TopNav.prototype.launchSecureMessaging = function(e) {
        var that = this,
            url = $("#message-center").attr("href"),
            secureMessageName = "SecureMessages";
        e.preventDefault();

        if (UBPopUp) {
            UBPopUp.launch(url, secureMessageName, secureMessageName);
        }

        if (!that.secureMessageTimer) {
            that.secureMessageTimer = setInterval(function() {
                if (!UBPopUp.isExist(secureMessageName)) {
                    if (!that.sessionHandler.logout) {
                        that.loadMessageCount(that.sessionHandler.data, true);
                    }
                    setTimeout(
                        function() {
                            clearInterval(that.secureMessageTimer);
                            that.secureMessageTimer = undefined;
                        }, 500);
                }
            }, 1000);
        }
    };

    TopNav.prototype.resizeMenu = function(el) {
        var that = this,
            $header = $(".header-ub"),
            $el = el,
            h, wh, elh;

        $el.addClass("iefix");
        h = $header.outerHeight(true);
        elh = $el.outerHeight(true);
        wh = $(g).height();
        $el.removeClass("iefix");

        if ((h+elh) >= wh && !! h && !! wh) {
            $el.css({
                "height": ((wh -h) * 0.9) + "px"
            });
        } else {
            $el.css({
                "height": "auto"
            });
        }
    };

    TopNav.prototype.logOut = function(e) {
        var that = this;
        that.sessionHandler.logout = true;

        if (UBPopUp) {
            UBPopUp.closeAllWindows();
        }
    };

    SetDefaultPageModal = TopNav.SetDefaultPageModal = function(el, url) {
        UB.views.BaseView.call(this, el);
        this.url = url;
    };

    SetDefaultPageModal.prototype = new UB.views.BaseView();
    SetDefaultPageModal.prototype.constructor = SetDefaultPageModal;

    SetDefaultPageModal.prototype.events = {
        "shown": "defaultPageFocus",
        "click .btn-primary": "setDefaultPage"
    };

    SetDefaultPageModal.prototype.defaultPageFocus = function() {
        var that = this;
        that.resetDefaultPage();
        that.$("input").first().focus();
    };

    SetDefaultPageModal.prototype.setDefaultPage = function() {
        var that = this,
            data = that.$("input[name=default-page]:checked").val();

        try {
            data = UB.services.topNav.setDefaultPage(data, that.url);
            that.$("#default-form").addClass("hide");
            that.$("#default-message").html("<p>Your preference was updated successfully.</p>");
            that.$("#default-message").removeClass("hide");
            that.$(".default-form-controls").addClass("hide");
            that.$(".default-form-ok").removeClass("hide");
        } catch (ex) {
            that.$("#default-message").removeClass("hide");
            that.$("#default-message").html("<p class=\"error\">* There was a problem processing your request. Please try again.</p>");
        }
    };
    SetDefaultPageModal.prototype.resetDefaultPage = function() {
        var that = this;
        that.$("#default-form").removeClass("hide");
        that.$("#default-message").addClass("hide");
        that.$(".default-form-controls").removeClass("hide");
        that.$(".default-form-ok").addClass("hide");
    };
    SetOpenAccountModal = TopNav.SetOpenAccountModal = function(el) {
        UB.views.BaseView.call(this, el);
    };

    SetOpenAccountModal.prototype = new UB.views.BaseView();
    SetOpenAccountModal.prototype.constructor = SetOpenAccountModal;

    SetOpenAccountModal.prototype.events = {
        "shown": "openAccountFocus",
        "click .btn-primary": "setOpenAccountLink"
    };

    SetOpenAccountModal.prototype.openAccountFocus = function() {
        this.$("input").first().focus();
    };

    SetOpenAccountModal.prototype.setOpenAccountLink = function() {
        var accountType = this.$("input[name=account-type]:checked").val();
        $("form[name=\"topnavNewAccountForm\"]").find("input[name=\"methodToCall\"]").val(accountType);
        $("form[name=\"topnavNewAccountForm\"]").submit();
        $("#openAccount").modal("hide");
    };

    /* Transfer */
    // This view scaffolds the rest of Transfer
    // also this can contain global transfer scoped objects
    Transfer = UB.views.Transfer = function(el, data) {
        var that = this,
            container;

        that.events = $.extend(that.baseEvents, that.events);
        UB.views.BaseView.call(this, el);
        that.init();
    };

    Transfer.prototype = new UB.views.BaseView();
    Transfer.prototype.constructor = Transfer;
    Transfer.prototype.baseEvents = {

    };

    Transfer.prototype.init = function() {
        var that = this;

        // Place Initalization Code in Here
    };

    Transfer.prototype.expandCurrentRow = function(e) {
        var $transfer = $(e.target).closest(".transfer"),
            $expand = $transfer.find(".expand");

        $transfer.addClass("active").siblings(".transfer").removeClass("active");
        $(".expand").not($expand).slideUp();
        $expand.slideDown('slow');
    };

    Transfer.prototype.setDatepicker = function(options, dp) {
        var that = this,
            selector = dp ? dp : $(".date-picker"); // Expects Object for DP
        selector.datepicker(options);
    };

    Transfer.prototype.getOneYearInFuture = function(date) {
        if (!date instanceof Date) {
            date = new Date();
        }

        var m = date.getMonth(),
            d = date.getDate() - 1,
            y = date.getFullYear() + 1;

        return new Date(y, m, d);
    };

    Transfer.prototype.setToolTip = function(el, title, trigger, placement) {
        var that = this,
            $tooltip = $(el);

        $tooltip.off("tooltip");
        $tooltip.tooltip({
            placement: placement,
            trigger: trigger,
            title: title
        });
    };

    Transfer.prototype.setPopover = function(el, title, trigger, html, content) {
        var that = this,
            $popover = $(el);

        $popover.popover({
            title: title,
            html: html,
            trigger: trigger,
            content: function() {
                return content;
            }
        });
    };

    Transfer.prototype.closePopoverOnBlur = function(e) {
        $(".popover-link").each(function() {
            if (!$(this).is(e.target) && $(this).has(e.target).length === 0 && $('.popover').has(e.target).length === 0) {
                $(this).find(".recurring-toggle").popover('hide');
                if ($(".transfer-form").find(".repopulatedForm").val() === "false") {
                    $(this).find(".recurring-checkbox").attr("checked", false);
                }
            }
        });
    };

    Account = UB.views.Account = function(el, data) {
        var that = this,
            container;

        that.events = $.extend(that.baseEvents, that.events);
        UB.views.BaseView.call(this, el);
    };

    Account.prototype = new UB.views.BaseView();
    Account.prototype.constructor = Account;
    Account.prototype.baseEvents = {

    };
    Account.prototype.toggleDisplayAccountNumbers = function() {
        // Perhaps a link?
        location.reload();
    };
    Account.prototype.tablesorterInit = function() {
        $.tablesorter.addParser({
            id: "currencyParser",
            is: function() {
                return false;
            },
            format: function(s) {
                return parseFloat(s.replace("$", "").replace(".", "").replace(",", "").replace("/", ""));
            },
            type: "numeric"
        });

        $.tablesorter.addParser({
            id: "accountParser",
            is: function() {
                return false;
            },
            format: function(s) {
                return s.replace("$", "").replace(".", "").replace(",", "").replace("/", "").replace("-", "");
            },
            type: "text"
        });
    };

    Account.prototype.sortBegin = function(el) {
        var that = this,
            $el = $(el);
        $el.bind("sortBegin", function(e, tbl) {
            var c = tbl.config,
                list = c.sortList,
                isAccountList = false;
            //https://github.com/Mottie/tablesorter/issues/3#issuecomment-2173484

            for (var i = 0; i < list.length; i += 1) {
                if (list[i][0] == 1) {
                    isAccountList = true;
                }
            }

            if (!isAccountList) {
                list.push((list[0] && list[0][0] !== 1) ?
                    ((list[0] && list[0][1] !== 1) ? [1, 0] : [1, 1]) :
                    ((list[0] && list[0][1] !== 0) ? [1, 1] : [1, 0])
                );
            }

        });
    };

    Account.prototype.loadPopover = function(el, content, trigger, placement) {
        el.popover({
            content: content,
            trigger: trigger || "hover",
            placement: placement || "left"
        });
    };

    Account.prototype.loadTooltip = function(el) {
        el.tooltip({
            placement: "top",
            trigger: "hover"
        });
    };

    Account.prototype.toggleAccordion = function(e) {
        var target = $(e.target);
        $(".accordion-body").collapse("toggle");
        target.parents("li").toggleClass("toggle-up toggle-down");
    };

    Account.prototype.loadNestedAcccountControls = function(obj) {
        obj.on("click", ".icon-plus-sign", function() {
            $(this).closest("tr").addClass("expanded");
            var el = $(this).closest("tr").find(".loan-child"),
                curHeight = el.height(),
                autoHeight = el.css("height", "auto").height();
            el.height(curHeight).animate({
                height: autoHeight
            }, 350);
        });

        obj.on("click", ".icon-minus-sign", function() {
            $(this).closest("tr").removeClass("expanded");
            var el = $(this).closest("tr").find(".loan-child");
            el.animate({
                height: 0
            }, 350);
        });
    };

    var Accordion;

    Accordion = UB.views.Accordion = function(el, data) {
        UB.views.BaseView.call(this, el);
        this.selector = data.selector;
    };

    Accordion.prototype = new UB.views.BaseView();
    Accordion.prototype.constructor = Accordion;

    Accordion.prototype.events = {
        "click #expand-accordion": "expand",
        "click #close-accordion": "collapse"
    }

    Accordion.prototype.expand = function(e) {
        $(this.selector).find(".accordion-body").addClass("in").css("height", "auto");
    }

    Accordion.prototype.collapse = function(e) {
        $(this.selector).find(".accordion-body").removeClass("in").css("height", 0);
    }

}(this, jq110));