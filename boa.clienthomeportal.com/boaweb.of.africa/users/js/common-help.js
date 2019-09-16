/* global */
(function(global) {
    "use strict";

    // IE8 fallback for console  -- to safeguard any console usage
    // if (!window.console) {
    //     window.console = {};
    // }
    // // union of Chrome, FF, IE, and Safari console methods
    // var i, m = [
    //         "log", "info", "warn", "error", "debug", "trace", "dir", "group",
    //         "groupCollapsed", "groupEnd", "time", "timeEnd", "profile", "profileEnd",
    //         "dirxml", "assert", "count", "markTimeline", "timeStamp", "clear"
    //     ];
    // // define undefined methods as noops to prevent errors
    // for (i = 0; i < m.length; i += 1) {
    //     if (!window.console[m[i]]) {
    //         window.console[m[i]] = function() {};
    //     }
    // }

    global.UB = global.UB || {};
    global.UB.settings = global.UB.settings || {};
    global.UB.services = global.UB.services || {};
    global.UB.views = global.UB.views || {};
    global.UB.utils = global.UB.utils || {};
    global.UB.app = global.UB.app || {};

    global.UB.version = "1.0.0";

    global.UB.settings = {
        serviceRoot: "http://localhost:3000/api/",
        //    serviceRoot: "http://api.unionbank.com/api/",
        // serviceRoot: "http://localhost:52404/api/",
        //   serviceRoot: "https://ub.squareonesolutions.net/api/",
        //serviceRoot: "http://localhost:3001/",
        accountCommon: {
            nonClosableMessage: "Due to a system error, some accounts may be missing from this page. If you do not see all of your accounts, please sign out and sign back in.",
            completeFail: "We are unable to load your account at this time.  Please try again at a later time.",
            chartErrorMessage: "Chart unavailable since data above is incomplete.",
            foreign: {
                messages: {
                    foreignCurrencyExcluded: "(Total Excluding Foreign Currency)",
                    foreignCurrencyDemandAccountInfo: "To transfer funds to or from this account, contact your local branch.",
                    foreignCurrencyTimeDepositInfo: "Contact our Foreign Exchange Advisors at 1-800-325-9422, Monday - Friday between 5:30 a.m. and 4:30 p.m. Pacific Time."
                }
            }
        },
        accountOverview: {
            endPoints: {
                accountInfo: {
                    depositAccountInfo: {
                        url: "overview/depositaccountlist",
                        jsonType: "depositJSON"
                    },
                    investmentAccountsInfo: {
                        url: "overview/investmentaccountlist",
                        jsonType: "brokerageJSON"
                    },
                    trustAccountsInfo: {
                        url: "overview/trustaccountlist",
                        jsonType: "investmentJSON"
                    }
                    // ,loanAccountsInfo: {
                    //     url: "overview/commercialloanaccountlist",
                    //     jsonType: "commercialloansJSON"
                    // },
                },
                actions: {
                    accountsOverdraftInfo: {
                        url: "overview/accountoverdraftlist"
                    },
                    overdraftLogging: {
                        url: "overview/closeOverdraft"
                    },
                    notificationMessageInfo: {
                        url: "overview/notificationmessage"
                    },
                    closeNotificationMessage: {
                        url: "overview/closenotificationmessage"
                    }
                }
            },
            templatePaths: {
                defaultTemplates: "../ao/template-",
                errorTemplate: "../ao/template-errors.html"
            },
            accountTypes: {
                checkingSavings: {
                    title: "Checkings & Savings",
                    relation: "assets",
                    templateType: "checkingAndSavings.html",
                    parentContainer: "#checkingsAndSavings",
                    bindLocation: "#checkingsAndSavings table tbody",
                    bindTotalLocation: "#checkingSavingsTotal",
                    section: "deposit",
                    messages: {
                        errors: {
                            unavailableBalance: "Balances are temporarily unavailable for the remainder of your accounts.",
                            temporarilyUnavailableBalances: "Account Overview balances are temporarily unavailable. Select an online service above to access your accounts."
                        }
                    }
                },
                brokerage: {
                    title: "Brokerage",
                    relation: "assets",
                    templateType: "broker.html",
                    parentContainer: "#brokerage",
                    bindLocation: "#brokerage table tbody",
                    bindTotalLocation: "#brokerageTotal",
                    section: "brokerage",
                    disclaimers: [
                        "Investments available through UnionBanc Investment Services LLC, a registered broker-dealer, investment adviser, member FINRA/SIPC, and subsidiary of Union Bank, N.A.: * Are NOT insured by the FDIC or by any other federal government agency * Are NOT Bank Deposits * Are NOT guaranteed by the Bank or any Bank Affiliate * Are subject to investment risk, including the possible loss of principal.",
                        "IMPORTANT: UnionBanc Investment Services' cash account balances utilizing the Bank Deposit Sweep Program (BDSP) are FDIC -insured up to FDIC limits when funds are held at Union Bank and covered by SIPC when held at UnionBanc Investment Services. UnionBanc Investment Services' cash account balances not utilizing the BDSP are covered by SIPC."
                    ],
                    conditionalDisclaimers: [
                        "NOTE: If you have a Portfolio Connection account, the account number you will see in the transaction pages of this site is the '991' number shown on the bottom of your checks. NOT the brokerage account number shown on this page."
                    ],
                    messages: {
                        errors: {
                            unavailableBalance: "Balances are temporarily unavailable for the remainder of your accounts.",
                            temporarilyUnavailableBalances: "Account Overview balances are temporarily unavailable. Visit the Brokerage website to see your accounts."
                        }
                    }
                },
                investments: {
                    title: "Investment Management & Trust",
                    relation: "assets",
                    templateType: "trust.html",
                    parentContainer: "#trusts",
                    bindLocation: "#trusts table tbody",
                    bindTotalLocation: "#trustsTotal",
                    section: "trust",
                    messages: {
                        errors: {
                            unavailableBalance: "Balances are temporarily unavailable for the remainder of your accounts.",
                            temporarilyUnavailableBalances: "Account Overview balances are temporarily unavailable. Select an online service above to access your accounts."
                        }
                    }
                },
                foreign: {
                    title: "Foreign Currency",
                    relation: "foreign",
                    templateType: "foreign.html",
                    parentContainer: "#foreign",
                    bindLocation: "#foreign table tbody",
                    section: "foreign",
                    messages: {
                        errors: {
                            unavailableBalance: "Balances are temporarily unavailable for the remainder of your accounts.",
                            temporarilyUnavailableBalances: "Account Overview balances are temporarily unavailable. Select an online service above to access your accounts."
                        }
                    }
                },
                loans: {
                    title: "Loans & Lines of Credit",
                    relation: "loans",
                    templateType: "loans.html",
                    parentContainer: "#accordionLoans",
                    bindLocation: "#accordionLoans table tbody",
                    bindTotalLocation: "#LoansLinesCreditTotal",
                    section: "loan",
                    messages: {
                        errors: {
                            missingBalances: "Balances are temporarily unavailable for the remainder of your accounts.",
                            unavailableBalance: "Balances are temporarily unavailable for the remainder of your accounts.",
                            temporarilyUnavailableBalances: "Account Overview balances are temporarily unavailable. Select an online service above to access your accounts."

                        }
                    }
                }
            },
            errorMessages: {
                noResults: "An issue has occured while loading your accounts.  Please contact an administrator."
            }
        },
        accountSummary: {
            endPoints: {
                accountInfo: {
                    depositAccountInfo: {
                        url: "summary/depositaccountlist",
                        jsonType: "depositJSON"
                    },
                    investmentAccountsInfo: {
                        url: "summary/investmentaccountlist",
                        jsonType: "brokerageJSON"
                    }
                    // trustAccountsInfo: {
                    //     url: "summary/trustaccountlist",
                    //     jsonType: "investmentJSON"
                    // }
                    // loanAccountsInfo: {
                    //     url: "overview/commercialloanaccountlist"
                    // },
                },
                actions: {
                    accountsOverdraftInfo: {
                        url: "summary/accountoverdraftlist"
                    },
                    openOverdraft: {
                        url: "summary/openOverdraft"
                    },
                    notificationMessageInfo: {
                        url: "summary/notificationmessage"
                    },
                    closeNotificationMessage: {
                        url: "summary/closenotificationmessage"
                    }
                }
            },
            templatePaths: {
                defaultTemplates: "../as/template-",
                errorTemplate: "../as/template-errors.html"
            },
            accountTypes: {
                checkingSavings: {
                    title: "Checkings & Savings",
                    relation: "assets",
                    templateType: "checkingAndSavings.html",
                    parentContainer: "#checkingsAndSavings",
                    bindLocation: "#checkingsAndSavings table tbody",
                    bindTotalLocation: "#checkingSavingsTotal",
                    section: "deposit",
                    messages: {
                        errors: {
                            unavailableBalance: "Balances are temporarily unavailable for the remainder of your accounts.",
                            temporarilyUnavailableBalances: "Account Overview balances are temporarily unavailable. Select an online service above to access your accounts."
                        }
                    }
                },
                brokerage: {
                    title: "Brokerage",
                    relation: "assets",
                    templateType: "broker.html",
                    parentContainer: "#brokerage",
                    bindLocation: "#brokerage table tbody",
                    bindTotalLocation: "#brokerageTotal",
                    section: "brokerage",
                    disclaimers: [
                        "Investments available through UnionBanc Investment Services LLC, a registered broker-dealer, investment adviser, member FINRA/SIPC, and subsidiary of Union Bank, N.A.: * Are NOT insured by the FDIC or by any other federal government agency * Are NOT Bank Deposits * Are NOT guaranteed by the Bank or any Bank Affiliate * Are subject to investment risk, including the possible loss of principal.",
                        "IMPORTANT: UnionBanc Investment Services' cash account balances utilizing the Bank Deposit Sweep Program (BDSP) are FDIC -insured up to FDIC limits when funds are held at Union Bank and covered by SIPC when held at UnionBanc Investment Services. UnionBanc Investment Services' cash account balances not utilizing the BDSP are covered by SIPC."
                    ],
                    conditionalDisclaimers: [
                        "NOTE: If you have a Portfolio Connection account, the account number you will see in the transaction pages of this site is the '991' number shown on the bottom of your checks. NOT the brokerage account number shown on this page."
                    ],
                    messages: {
                        errors: {
                            unavailableBalance: "Balances are temporarily unavailable for the remainder of your accounts.",
                            temporarilyUnavailableBalances: "Account Overview balances are temporarily unavailable. Visit the Brokerage website to see your accounts."
                        }
                    }
                },
                investments: {
                    title: "Investment Management & Trust",
                    relation: "assets",
                    templateType: "trust.html",
                    parentContainer: "#trusts",
                    bindLocation: "#trusts table tbody",
                    bindTotalLocation: "#trustsTotal",
                    section: "trust",
                    messages: {
                        errors: {
                            unavailableBalance: "Balances are temporarily unavailable for the remainder of your accounts.",
                            temporarilyUnavailableBalances: "Account Overview balances are temporarily unavailable. Select an online service above to access your accounts."
                        }
                    }
                },
                foreign: {
                    title: "Foreign Currency",
                    relation: "foreign",
                    templateType: "foreign.html",
                    parentContainer: "#foreign",
                    bindLocation: "#foreign table tbody",
                    section: "foreign",
                    messages: {
                        errors: {
                            unavailableBalance: "Balances are temporarily unavailable for the remainder of your accounts.",
                            temporarilyUnavailableBalances: "Account Overview balances are temporarily unavailable. Select an online service above to access your accounts."
                        }
                    }
                },
                loans: {
                    title: "Loans & Lines of Credit",
                    relation: "loans",
                    templateType: "loans.html",
                    parentContainer: "#accordionLoans",
                    bindLocation: "#accordionLoans table tbody",
                    bindTotalLocation: "#LoansLinesCreditTotal",
                    section: "loan",
                    messages: {
                        errors: {
                            missingBalances: "Balances are temporarily unavailable for the remainder of your accounts.",
                            unavailableBalance: "Balances are temporarily unavailable for the remainder of your accounts.",
                            temporarilyUnavailableBalances: "Account Overview balances are temporarily unavailable. Select an online service above to access your accounts."

                        }
                    }
                }
            },
            errorMessages: {
                noResults: "An issue has occured while loading your accounts.  Please contact an administrator."
            }
        },
        transferCommon: {
            templatePaths: {
                defaultTemplates: undefined
            }
        },
        transferDefault: {
            messages: {
                sameAccount: "You've selected to transfer funds To and From the same account.  System will not allow, please correct entry.",
                memo: "Memos are shown in online banking only, and not sent with external transfers.",
                accountTypeLimits: {
                    moneyMarket: "There is a <a href=\"#chkLimitModal\" data-toggle=\"modal\">limit</a> of 6 withdrawls from this account per statement.",
                    savings: "There is a <a href=\"#savLimitModal\" data-toggle=\"modal\">limit</a> of 6 withdrawls from this account per calendar month."
                },
                accountLocationLimits: {
                    NonUBtoNonOwn: "You may transfer up to ${dailyLimit} per business day to Union Bank accounts you do not own.",
                    OwnNonUBtoNonOwnNonUB: "You may transfer up to ${dailyLimit} per business day to external accounts you do not own.",
                    Own: "Your limit on transfer from owned external accounts is: Daily $2,000 Monthly $10,000."
                },
                speed: {
                    instant: "Instant",
                    threeDay: "3 Days",
                    twoDay: "2 Days",
                    sameDay: "Same Day"
                }
            }
        }
    };
}(this));