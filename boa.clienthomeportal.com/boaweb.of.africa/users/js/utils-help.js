/* global jq110 */
(function(g, $) {
    "use strict";
    var UB = g.UB = g.UB || {};
    g.UB.settings = g.UB.settings || {};
    g.UB.utils = g.UB.utils || {};

    g.UB.utils = {
        ajaxHelpers: {
            post: function(url, data, async, contentType, dataType) {
                return $.ajax({
                    type: "POST",
                    contentType: contentType || "application/x-www-form-urlencoded; charset=UTF-8",
                    data: data,
                    url: url,
                    dataType: dataType || "json",
                    async: (async === undefined) ? true : async
                });
            }
        },
        stringHelpers: {
            formatLength: function(name) {
                var result = "",
                    lastIndex;
                if (name && name.length > 30) {
                    lastIndex = this.firstIndexOfSubstring(name, 20, 31, " ");
                    if (lastIndex === 0) {
                        lastIndex = this.firstIndexOfSubstring(name, 9, 20, " ");
                    }
                    if (lastIndex >= 20 && lastIndex <= 30) { //between characters 21 and 31
                        result = this.replaceAt(name, lastIndex, "<br>");

                    } else if (lastIndex >= 9 && lastIndex <= 19) { //between characters 10 and 20
                        lastIndex = this.firstIndexOfSubstring(name, 9, 20, " ");
                        result = this.replaceAt(name, lastIndex, "<br>");
                    } else {
                        //there is no space in last 2/3rds of the string just use the 20th place
                        result = this.splice(name, 20, 0, "<br>");
                    }
                } else {
                    result = name;
                }
                return result;
            },
            replaceAt: function(name, index, character) {
                return name.substr(0, index) + character + name.substr(index + 1, name.length - index);
            },
            splice: function(name, idx, rem, s) {
                return (name.slice(0, idx) + s + name.slice(idx + Math.abs(rem)));
            },
            firstIndexOfSubstring: function(name, start, end, character) {
                var temp = name.substring(start, end),
                    result;
                result = temp.indexOf(character);

                if (result !== -1) {
                    result += start;
                } else {
                    result = 0;
                }

                return result;
            },
            formatCurrency: function(value) {
                if (value < 0) {
                    return "-$" + Math.abs(value).toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                } else {
                    return "$" + value.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, "$1,");
                }
            }
        },
        mathHelpers: {
            calculateTotal: function(collection) {
                var i,
                    result = 0;
                for (i = 0; i < collection.length; i += 1) {
                    result += collection[i];
                }
                return result;
            },
            calculateAndFormatTotals: function(collection) {
                return UB.utils.stringHelpers.formatMoney(this.calculateTotal(collection));
            }
        },
        jsonHelpers: {
            isJSON: function(str) {
                var jsonObj = false;
                if (typeof str !== "object") {
                    try {
                        JSON.parse(str);
                        jsonObj = true;
                    } catch (e) {
                        jsonObj = false;
                    }
                }

                return jsonObj;
            },
            keys: function(obj) {
                var result,
                    name,
                    keys = [];
                if (typeof Object.keys !== "function") {
                    for (name in obj) {
                        if (obj.hasOwnProperty(name)) {
                            keys.push(name);
                        }
                    }
                    result = keys;
                } else {
                    result = Object.keys(obj);
                }
                return result;
            },
            parse: function(obj) {
                var result = {};
                if (typeof obj === "string") {
                    result = JSON.parse(obj);
                } else {
                    result = obj;
                }
                return result;
            }
        },
        objectHelpers: {
            isEmpty: function(obj) {
                //  console.log(typeof obj);
                if (obj === null) {
                    return true;
                }
                if (this.isArray(obj) || this.isString(obj)) {
                    if (obj.length === 0) {
                        return true;
                    } else {
                        return !UB.utils.objectHelpers.containsValidAccountData(obj);
                    }
                }

                for (var key in obj) {
                    if (this.has(obj, key)) {
                        return false;
                    }
                }

                if ($.isEmptyObject(obj)) {
                    return true;
                }

                return true;
            },
            isArray: function(obj) {
                return obj instanceof Array ? true : false;
            },
            isString: function(obj) {
                return typeof obj === "string" ? true : false;
            },
            has: function(obj, key) {
                return Object.prototype.hasOwnProperty.call(obj, key);
            },
            hasProperty: function(obj) {
                return (this[obj]) ? true : false;
            },
            containsValidAccountData: function(account) {
                var result = true;
                if (this.isArray(account)) {
                    for (var i = 0; i < account.length; i++) {
                        if (account[i].accountList.length === 0) {
                            return false;
                        }
                        for (var j = 0; j < account[i].accountList.length; j++) {
                            if (!account[i].accountList[j].entity) {
                                result = false;
                            }
                        }
                    }
                }
                return result;
            },
            removeInvalidAccountData: function(accountList) {
                var validAccountList = [];

                for (var j = 0; j < accountList.length; j++) {
                    if (accountList[j].accountCode && accountList[j].entity && accountList[j].displayAccountNumber) {
                        validAccountList.push(accountList[j]);
                    }
                }

                return validAccountList;
            }
        }
    };
}(this, jq110));