/*global UB, jq110 */
(function (g, $) {
    "use strict";

    g.UB.services = g.UB.services || {};
    g.UB.services.help = g.UB.services.help || {};

    UB.services.help = {
        bindTemplate: function (data, template, location) {
            $(location).html($.tmpl(template, data));
        },
        getData: function (url, data, async, contentType, type) {
            return UB.utils.ajaxHelpers.post(url, data, async, contentType, type);
        }
    };
}(this, jq110));