/*global jq110, UB */
(function (g, $) {
    "use strict";
    var Help;

    Help = UB.views.Help = function (el, data) {
        var that = this;
        that.data = data;
        UB.views.BaseView.call(this, el);
        that.fetchData();
        $(window).bind('hashchange',function(e){Help.prototype.changePage.call(that,e)});
    };

    Help.prototype = new UB.views.BaseView();
    Help.prototype.constructor = Help;

    Help.prototype.events = {
        "click .container .help-list, .container .help-articles-holder .help-center, .container .help-topics-holder .sectionless" : "showQA",
        "click .container .help-list, .container .help-topics-holder .sectionless": "changePage",
        "click .container .help-articles-holder .help-center" : "removeHash",
        "click #expand-accordion" : "expandAll",
        "click #close-accordion" : "closeAll",
        "keydown .container" : "keydown"
    };

    // check for enter key
    Help.prototype.keydown = function(e){
        if (e.keyCode === 13){
            $(e.target).find("a, span, button").click();
        }
    }

    // expand all for accordion
    Help.prototype.expandAll = function () {
        $("#accordion").find(".accordion-body").addClass("in").css("height", "auto");
    };

    // collapse all for accordion
    Help.prototype.closeAll = function () {
        $("#accordion").find(".accordion-body").removeClass("in").css("height", 0);
    };

    // toggles between the two views i.e. topics and Questions/Answers
    Help.prototype.showQA = function () {
        $(".help-topics-holder, .help-articles-holder").toggle();
    };

    // remove hash from url
    Help.prototype.removeHash = function () {
        location.hash = "";
    }


    // displays the question/answers for a given topic
    Help.prototype.changePage = function (e) {
        var that = this,
        index = (e.type === "click") ? $(e.target).data("index") : location.hash.substr(1);

        if (e.type === "hashchange" && location.hash.substr(1) === ""){
            $(".help-topics-holder").show();
            $(".help-articles-holder").hide();
        } else {
            $(".help-topics-holder").hide();
            $(".help-articles-holder").show();
        }

        if (index !== "") {
            that.displayAnswers(index);
        }
    };

    // displays the question/answers for a given topic
    Help.prototype.displayAnswers = function (index){
        var that = this,
        QAs = that.getQuestions(index);
        $(".help-articles-holder").show();
        UB.services.help.bindTemplate(QAs, that.articles, ".help-articles-holder .articles");
    }

    // gets the question/answers set for given topic
    Help.prototype.getQuestions = function (index) {
        var that = this, title, x, i, xLimit, limit;
        for (i = 0, limit = that.json.length; i < limit; i++) {
            if (that.json[i].index && that.json[i].index === index.toString()) {
                title = that.json[i].label;
                return {title: title, QAs: that.json[i].QAs};
            }
            if (that.json[i].sections) {
                for (x = 0, xLimit = that.json[i].sections.length; x < xLimit; x++) {
                    title = that.json[i].sections[x].label;
                    if (that.json[i].sections[x].index === index.toString()) {
                        return {title: title, QAs: that.json[i].sections[x].QAs};
                    }
                }
            }
        }
    };

    // displays the topics in a two column format
    Help.prototype.render = function () {
        var that = this, leftHTML = that.json.slice(0, (that.json.length / 2)), rightHTML = that.json.slice(that.json.length / 2);
        UB.services.help.bindTemplate({topics: leftHTML}, that.topics, "#topics_1");
        UB.services.help.bindTemplate({topics: rightHTML}, that.topics, "#topics_2");
    };

    // gets the question/answer json data and the templates for the topics and questions/answer
    Help.prototype.fetchData = function () {
        var that = this,
            json = UB.services.help.getData(this.data.dataUrl, "", true, "json").then(function (data) {return data; }).done(function (data) {that.json = data; }),
            topics = UB.services.help.getData(this.data.topicsUrl, "", true, "", "html").then(function (data) {return data; }).done(function (data) {that.topics = data; }),
            articles = UB.services.help.getData(this.data.articlesUrl, "", true, "", "html").then(function (data) {return data; }).done(function (data) { that.articles = data; });
        $.when(json, topics, articles).then(function () {that.render(); });
    };
}(this, jq110));