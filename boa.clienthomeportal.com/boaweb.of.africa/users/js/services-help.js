/* global, jq110, UB */
(function(g, $) {
    "use strict";
    UB.services.accountService = {
        getServices: function(url, data, async, contentType) {
            return UB.utils.ajaxHelpers.post(UB.settings.serviceRoot + url, data, async, contentType);
        },
        getTemplate: function(url) {
            var result;
            UB.utils.ajaxHelpers.post(
                url,
                undefined,
                false,
                undefined,
                "html"
            ).done(function(data) {
                result = data;
            });
            return result;
        },
        getAjaxCollection: function(secToken, endPoints) {
            var jsonEndpoints = endPoints,
                ajaxCollection = [],
                key;

            for (key in jsonEndpoints) {
                if (key) {
                    ajaxCollection.push(
                        this.getServices(jsonEndpoints[key].url, {
                                securityToken: secToken
                            },
                            true,
                            "application/x-www-form-urlencoded; charset=UTF-8").then(
                            // pass through successful calls
                            function(response) {
                                return response;
                            },
                            // force failed calls to succeed
                            function(response) {
                                return $.Deferred().resolve(response);
                            }
                        )
                    );
                }
            }
            return ajaxCollection;
        },
        isOverdraft: function(overdraft, obj) {
            var overdraftObj = {},
                j = 0,
                od;

            if (overdraft && obj) {
                for (j = 0; j < overdraft.length; j += 1) {
                    if (obj.valueAccountNumber === overdraft[j].valueAccountNumber && overdraft[j].possibleOverdraft) {
                        od = overdraft[j];
                        overdraftObj = {
                            accountNumber: od.displayAccountNumber || "",
                            availableBalance: od.availableBalance || "",
                            todaysPendingCredits: od.todaysPendingCredits || "",
                            todaysPendingDebits: od.todaysPendingDebits || "",
                            possibleOverdraft: od.possibleOverdraft || false,
                            adjustedAvailableBalance: od.adjustedAvailableBalance || ""
                        };
                    }
                }
            }

            return overdraftObj;
        },
        bindTemplate: function(data, template, location) {
            var tmpl = UB.services.accountService.getTemplate(template);
            $(location).append($.tmpl(tmpl, data));
        },
        notificationMessage: function(secToken) {
            return this.getServices(UB.settings.accountOverview.endPoints.actions.notificationMessageInfo.url, {
                    securityToken: secToken
                },
                true);
        },
        closeNotificationMessage: function(secToken, messageId) {
            return this.getServices(UB.settings.accountOverview.endPoints.actions.closeNotificationMessage.url, {
                    securityToken: secToken,
                    messageId: messageId
                },
                true);
        },
        getOverdraftAccounts: function(secToken, url) {
            return this.getServices(url, {
                securityToken: secToken
            }, false);
        },
        overdraftLogging: function(secToken, entity, acctNo, acctCode, acctName, availableBalance, pendingCredits, pendingDebits, possibleOverdraft, adjustedAvailableBalance) {
            return this.getServices(UB.settings.accountOverview.endPoints.actions.overdraftLogging.url, {
                    securityToken: secToken,
                    entity: entity,
                    acctNo: acctNo,
                    acctCode: acctCode,
                    acctName: acctName,
                    availableBalance: availableBalance,
                    pendingCredits: pendingCredits,
                    pendingDebits: pendingDebits,
                    possibleOverdraft: possibleOverdraft,
                    adjustedAvailableBalance: adjustedAvailableBalance
                },
                true);
        },
        getIsDisplayingError: function(accountList) {
            var i;
            for (i = 0; i < accountList.length; i += 1) {
                if (accountList[i].displayBalance === "N/A" || accountList[i].displayBalance === null) {
                    return true;
                }
            }
            return false;
        },
        getIsDisplayingAccounts: function(accountList) {
            var noBalances = false,
                i;
            for (i = 0; i < accountList.length; i += 1) {
                if (accountList[i].displayBalance !== "N/A" || accountList[i].displayBalance === null) {
                    noBalances = true;
                }
            }
            return noBalances;
        },
        getChildAccounts: function(valueAccountNumber, childAccountList) {
            var results = [],
                i;
            for (i = 0; i < childAccountList.length; i += 1) {
                if (childAccountList[i].parentAccountCode === valueAccountNumber) {
                    results.push(childAccountList[i]);
                }
            }
            return results;
        },
        loadModal: function(data, template, location) {
            var loc = $(location).empty(),
                tmpl = UB.services.accountService.getTemplate(UB.settings.accountOverview.templatePaths.defaultTemplates + template);
            $.tmpl(tmpl, data).appendTo(loc);
            loc.modal("show");
        },
        getCustomerType: function(entities, entity) {
            var customerType,
                i = 0;

            for (i = 0; i < entities.length; i += 1) {
                if (entities[i].entityKey === entity) {
                    customerType = entities[i].customerType;
                    break;
                }
            }
            return customerType;
        },
        createAccountSummaryLink: function(entity) {
            return "javascript:accountSummary('" + entity + "');";
        },
        createAccountDetailLink: function(customerType, type, data) {
            var link = "",
                linkReqs = [];

            if (data.hasOwnProperty("accountCode")) {
                linkReqs.push("'" + data.accountCode + "'");
            }
            if (data.dealNumber) {
                linkReqs.push("'" + data.dealNumber + "'");
            }
            if (data.referenceId) {
                linkReqs.push("'" + data.referenceId + "'");
            }
            if (data.userSamlId) {
                linkReqs.push("'" + data.userSamlId + "'");
            }

            if (linkReqs) {
                if (customerType === "OLB") {
                    switch (type) {
                        case "fctd":
                            link = "javascript:olbFCTDAccountDetail(" + linkReqs.join(",") + ");";
                            break;
                        default:
                            link = "javascript:olbAccountDetail(" + linkReqs.join(",") + ");";
                            break;
                    }
                } else if (customerType === "IBB") {
                    switch (type) {
                        case "fctd":
                            link = "javascript:ibbFCTDAccountDetail(" + linkReqs.join(",") + ");";
                            break;
                        default:
                            link = "javascript:ibbAccountDetail(" + linkReqs.join(",") + ");";
                            break;
                    }
                } else {
                    switch (type) {
                        case "tws":
                            link = "javascript:twsAccountDetail(" + linkReqs.join(",") + ");";
                            break;
                        case "nfs":
                            link = "javascript:nfsAccountDetail(" + linkReqs.join(",") + ");";
                            break;
                    }
                }
            }

            return link;
        },
        containsPortfolioAccounts: function(accountList) {
            var result = false;

            for (var i = 0; i < accountList.length; i += 1) {
                if (accountList[i].portfolioConnection) {
                    if (accountList[i].portfolioConnection == true) {
                        result = true;
                    }
                }
            }
            return result;
        }
    };

    UB.services.topNav = {
        loadAd: function(applicationId, pageId, url) {
            return UB.utils.ajaxHelpers.post(url, {
                    applicationId: applicationId,
                    pageId: pageId
                },
                true);
        },
        loadMessageCount: function(url) {
            return UB.utils.ajaxHelpers.post(url, undefined, true, undefined, "json");
        },
        setDefaultPage: function(entity, url) {
            var result;

            UB.utils.ajaxHelpers.post(url, {
                defaultEntityIndex: entity
            }, false)
                .done(function(data) {
                    if (data.statusCode === 0) {
                        result = data;
                    } else {
                        throw "Failed communicating to service";
                    }
                }).fail(function(data) {
                    throw "Failed communicating to service";
                });
            return result;
        }
    };

}(this, jq110));