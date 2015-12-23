angular.module('jobhop.views').run(['$templateCache', function($templateCache) {
  'use strict';

  $templateCache.put('www/views/about.html',
    "<ion-view>\r" +
    "\n" +
    "    <ion-content>\r" +
    "\n" +
    "        <div class=\"bordered\">\r" +
    "\n" +
    "            <h2 style=\"padding: 0 16px;\">אודות החברה</h2>\r" +
    "\n" +
    "            <p>לורם איפסום או בקיצור ליפסום (בלטינית: lorem ipsum) הוא מלל מקובל וחסר משמעות המשמש \"ממלא מקום\" בעת עריכה, בתחום הדפוס, ההדפסה והפרסום.</p>\r" +
    "\n" +
    "            <p>הטקסט משמש כלי לייצוג דפוס שאמור להתווסף למוצר הפרסום בעתיד. המדובר במלל ארוך במיוחד שניתן לבדוק עמו גופנים, וכן התאמת המלל לעמודים המעוצבים ובדיקת סוגי וגדלי גופן והתאמתם למוצר הסופי.</p>\r" +
    "\n" +
    "            <p>בשל הדמיון של המילים בלורם איפסום ללטינית קלאסית, רבים חושבים שיש משמעות לטקסט, אולם לא נועדה להיות לו כל משמעות. המטרה היא רק \"תפיסת מקום\" על ידי מלל חסר משמעות (ראו דוגמה בהמשך).</p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </ion-content>\r" +
    "\n" +
    "</ion-view>\r" +
    "\n"
  );


  $templateCache.put('www/views/chart.html',
    "<ion-view>\r" +
    "\n" +
    "    <ion-content class=\"has-footer\">\r" +
    "\n" +
    "        <div id=\"charts-page\">\r" +
    "\n" +
    "            <div class=\"filters row\">\r" +
    "\n" +
    "                <div class=\"col\">\r" +
    "\n" +
    "                    <select ng-model=\"chartType\" ng-change=\"generateChartConfig(chartType, userType, price_avg2, priceToShow, price_avg1)\">\r" +
    "\n" +
    "                        <option value=\"line\">השוואה לאורך זמן</option>\r" +
    "\n" +
    "                        <option value=\"column\">השוואה בין מוצרים</option>\r" +
    "\n" +
    "                        <option value=\"bar\">השוואה בין מקטעים</option>\r" +
    "\n" +
    "                    </select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col\" ng-if=\"chartType == 'line' || chartType == 'column'\">\r" +
    "\n" +
    "                    <select ng-model=\"userType\" ng-change=\"generateChartConfig(chartType, userType, price_avg2, priceToShow, price_avg1)\">\r" +
    "\n" +
    "                        <option value=\"agriculturalPrice\">מחיר סיטונאי</option>\r" +
    "\n" +
    "                        <option value=\"wholesalePrice\">מחיר חקלאי</option>\r" +
    "\n" +
    "                    </select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col\" ng-if=\"chartType == 'line'\">\r" +
    "\n" +
    "                    <select ng-model=\"price_avg2\" ng-change=\"generateChartConfig(chartType, userType, price_avg2, priceToShow, price_avg1)\">\r" +
    "\n" +
    "                        <option value=\"WEEK\">שבוע</option>\r" +
    "\n" +
    "                        <option value=\"MONTH\">חודש</option>\r" +
    "\n" +
    "                        <option value=\"QUARTER\">רבעון</option>\r" +
    "\n" +
    "                        <option value=\"YEAR\">שנה</option>\r" +
    "\n" +
    "                    </select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col\" ng-if=\"chartType == 'bar'\">\r" +
    "\n" +
    "                    <select ng-model=\"price_avg1\" ng-change=\"generateChartConfig(chartType, userType, price_avg2, priceToShow, price_avg1)\">\r" +
    "\n" +
    "                        <option value=\"DAY\">ממוצע יומי</option>\r" +
    "\n" +
    "                        <option value=\"WEEK\">ממוצע שבועי</option>\r" +
    "\n" +
    "                        <option value=\"MONTH\">ממוצע חודשי</option>\r" +
    "\n" +
    "                        <option value=\"QUARTER\">ממוצע רבעוני</option>\r" +
    "\n" +
    "                        <option value=\"YEAR\">ממוצע שנתי</option>\r" +
    "\n" +
    "                    </select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "                <div class=\"col\" ng-if=\"chartType == 'column'\">\r" +
    "\n" +
    "                    <select ng-model=\"priceToShow\" ng-change=\"generateChartConfig(chartType, userType, price_avg2, priceToShow, price_avg1)\">\r" +
    "\n" +
    "                        <option value=\"DAY\">ממוצע יומי</option>\r" +
    "\n" +
    "                        <option value=\"WEEK\">ממוצע שבועי</option>\r" +
    "\n" +
    "                    </select>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "            <div class=\"chart\">\r" +
    "\n" +
    "                <highchart id=\"chart1\" config=\"chartConfig\"></highchart>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </ion-content>\r" +
    "\n" +
    "</ion-view>\r" +
    "\n"
  );


  $templateCache.put('www/views/contact.html',
    "<ion-view style=\"text-align: center\">\r" +
    "\n" +
    "    <ion-content>\r" +
    "\n" +
    "        <h2>צור קשר</h2>\r" +
    "\n" +
    "        <div class=\"bordered contact\">\r" +
    "\n" +
    "            <img src=\"img/tozeret.png\" />\r" +
    "\n" +
    "            <p style=\"font-size: 16px\">\r" +
    "\n" +
    "    חברת השוק הסיטונאי בע\"מ<br />\r" +
    "\n" +
    "                אפעל 35, פתח תקווה\r" +
    "\n" +
    "            </p>\r" +
    "\n" +
    "            <p>מייל: <span style=\"font-size:13px; white-space: nowrap\">contact@israeli-market.org.il</span>\r" +
    "\n" +
    "            <br />\r" +
    "\n" +
    "            אתר: <span style=\"font-size:13px; white-space: nowrap\">www.israeli-market.gov.il</span></p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </ion-content>\r" +
    "\n" +
    "</ion-view>\r" +
    "\n"
  );


  $templateCache.put('www/views/help.html',
    "<ion-view>\r" +
    "\n" +
    "    <ion-content>\r" +
    "\n" +
    "        <div class=\"bordered\">\r" +
    "\n" +
    "            <h2 style=\"padding: 0 16px;\">עזרה</h2>\r" +
    "\n" +
    "            <p>לורם איפסום או בקיצור ליפסום (בלטינית: lorem ipsum) הוא מלל מקובל וחסר משמעות המשמש \"ממלא מקום\" בעת עריכה, בתחום הדפוס, ההדפסה והפרסום.</p>\r" +
    "\n" +
    "            <p>הטקסט משמש כלי לייצוג דפוס שאמור להתווסף למוצר הפרסום בעתיד. המדובר במלל ארוך במיוחד שניתן לבדוק עמו גופנים, וכן התאמת המלל לעמודים המעוצבים ובדיקת סוגי וגדלי גופן והתאמתם למוצר הסופי.</p>\r" +
    "\n" +
    "            <p>בשל הדמיון של המילים בלורם איפסום ללטינית קלאסית, רבים חושבים שיש משמעות לטקסט, אולם לא נועדה להיות לו כל משמעות. המטרה היא רק \"תפיסת מקום\" על ידי מלל חסר משמעות (ראו דוגמה בהמשך).</p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </ion-content>\r" +
    "\n" +
    "</ion-view>\r" +
    "\n"
  );


  $templateCache.put('www/views/list/date-popup.html',
    "<div>\r" +
    "\n" +
    "    <img src=\"img/icon/x.png\" class=\"close\" ng-click=\"closeDatePopup()\" />\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col\">\r" +
    "\n" +
    "            <span class=\"title\">תאריך</span>\r" +
    "\n" +
    "            <input ng-model=\"dateFilter\" type=\"date\" />\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popup-buttons\">\r" +
    "\n" +
    "        <button class=\"button button-positive button-block\" ng-click=\"setDate(dateFilter)\">שמור</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('www/views/list/details-popup.html',
    "<div>\r" +
    "\n" +
    "    <img src=\"img/icon/x.png\" class=\"close\" ng-click=\"closeDetailsPopup()\" />\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col\">\r" +
    "\n" +
    "            <span class=\"title\">פרטים</span>\r" +
    "\n" +
    "            <label>\r" +
    "\n" +
    "                <input ng-model=\"listDetailsInput\" type=\"radio\" name=\"list-details\" value=\"price\" ng-checked=\"listDetails == 'price'\">\r" +
    "\n" +
    "                <span class=\"style\"></span>\r" +
    "\n" +
    "                מחיר יומי\r" +
    "\n" +
    "            </label>\r" +
    "\n" +
    "            <label>\r" +
    "\n" +
    "                <input ng-model=\"listDetailsInput\" type=\"radio\" name=\"list-details\" value=\"avgPrice\" ng-checked=\"listDetails == 'avgPrice'\">\r" +
    "\n" +
    "                <span class=\"style\"></span>\r" +
    "\n" +
    "                מחיר ממוצע\r" +
    "\n" +
    "            </label>\r" +
    "\n" +
    "            <label>\r" +
    "\n" +
    "                <input ng-model=\"listDetailsInput\" type=\"radio\" name=\"list-details\" value=\"percentChange\" ng-checked=\"listDetails == 'percentChange'\">\r" +
    "\n" +
    "                <span class=\"style\"></span>\r" +
    "\n" +
    "                אחוז שינוי במחיר\r" +
    "\n" +
    "            </label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popup-buttons\">\r" +
    "\n" +
    "        <button class=\"button button-positive button-block\" ng-click=\"setListDetails(listDetailsInput)\">שמור</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('www/views/list/filter-popup.html',
    "<div>\r" +
    "\n" +
    "    <img src=\"img/icon/x.png\" class=\"close\" ng-click=\"closeFilterPopup()\" />\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col\">\r" +
    "\n" +
    "            <span class=\"title\">סינון</span>\r" +
    "\n" +
    "            <label>\r" +
    "\n" +
    "                <input ng-model=\"typeFilter\" value=\"\" type=\"radio\" name=\"search-by-type\" checked=\"checked\">\r" +
    "\n" +
    "                <span class=\"style\"></span>\r" +
    "\n" +
    "                ירקות ופירות\r" +
    "\n" +
    "            </label>\r" +
    "\n" +
    "            <label>\r" +
    "\n" +
    "                <input ng-model=\"typeFilter\" value=\"VEG\" type=\"radio\" name=\"search-by-type\">\r" +
    "\n" +
    "                <span class=\"style\"></span>\r" +
    "\n" +
    "                ירקות בלבד\r" +
    "\n" +
    "            </label>\r" +
    "\n" +
    "            <label>\r" +
    "\n" +
    "                <input ng-model=\"typeFilter\" value=\"FRUITS\" type=\"radio\" name=\"search-by-type\">\r" +
    "\n" +
    "                <span class=\"style\"></span>\r" +
    "\n" +
    "                פירות בלבד\r" +
    "\n" +
    "            </label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <hr>\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col\">\r" +
    "\n" +
    "            <span class=\"title\">מיון</span>\r" +
    "\n" +
    "            <label>\r" +
    "\n" +
    "                <input ng-model=\"orderFilter\" value=\"DAILY_CHANGE\" type=\"radio\" name=\"order-by\" checked=\"checked\">\r" +
    "\n" +
    "                <span class=\"style\"></span>\r" +
    "\n" +
    "                אחוז שינוי יומי\r" +
    "\n" +
    "            </label>\r" +
    "\n" +
    "            <label>\r" +
    "\n" +
    "                <input ng-model=\"orderFilter\" value=\"ABC\" type=\"radio\" name=\"order-by\">\r" +
    "\n" +
    "                <span class=\"style\"></span>\r" +
    "\n" +
    "                א'-ב'\r" +
    "\n" +
    "            </label>\r" +
    "\n" +
    "            <label>\r" +
    "\n" +
    "                <input ng-model=\"orderFilter\" value=\"PRICE\" type=\"radio\" name=\"order-by\">\r" +
    "\n" +
    "                <span class=\"style\"></span>\r" +
    "\n" +
    "                מחיר\r" +
    "\n" +
    "            </label>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popup-buttons\">\r" +
    "\n" +
    "        <button class=\"button button-positive button-block\" ng-click=\"setFilters(orderFilter, typeFilter)\">שמור</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('www/views/list/push-popup.html',
    "<div>\r" +
    "\n" +
    "    <img src=\"img/icon/x.png\" class=\"close\" ng-click=\"closePushNotificationPopup()\" />\r" +
    "\n" +
    "    <div class=\"row\">\r" +
    "\n" +
    "        <div class=\"col\">\r" +
    "\n" +
    "            <span class=\"title\">הודעת פוש</span>\r" +
    "\n" +
    "            <p>\r" +
    "\n" +
    "                <label>\r" +
    "\n" +
    "                    <input ng-model=\"pushNotificationEnabled\" type=\"checkbox\" style=\"width:auto;\" />\r" +
    "\n" +
    "                    <span class=\"style\"></span>\r" +
    "\n" +
    "                    אפשר הודעות פוש עבור המוצר\r" +
    "\n" +
    "                    <b>{{itemTitleForPushNotificationPopup}}</b>\r" +
    "\n" +
    "                    <br />\r" +
    "\n" +
    "                    כאשר המחיר משתנה\r" +
    "\n" +
    "                </label> ב\r" +
    "\n" +
    "                <select ng-model=\"pushNotificationPercent\" id=\"push-notification-percent\">\r" +
    "\n" +
    "                    <option value=\"10\">10%</option>\r" +
    "\n" +
    "                    <option value=\"20\">20%</option>\r" +
    "\n" +
    "                    <option value=\"30\">30%</option>\r" +
    "\n" +
    "                    <option value=\"40\">40%</option>\r" +
    "\n" +
    "                    <option value=\"50\">50%</option>\r" +
    "\n" +
    "                    <option value=\"60\">60%</option>\r" +
    "\n" +
    "                    <option value=\"70\">70%</option>\r" +
    "\n" +
    "                    <option value=\"80\">80%</option>\r" +
    "\n" +
    "                    <option value=\"90\">90%</option>\r" +
    "\n" +
    "                </select>\r" +
    "\n" +
    "            </p>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "    <div class=\"popup-buttons\">\r" +
    "\n" +
    "        <button class=\"button button-positive button-block\" ng-click=\"setPushNotificationPercent(itemForPushNotificationPopup, pushNotificationEnabled, pushNotificationPercent)\">שמור</button>\r" +
    "\n" +
    "    </div>\r" +
    "\n" +
    "</div>\r" +
    "\n"
  );


  $templateCache.put('www/views/products.html',
    "<ion-view>\r" +
    "\n" +
    "    <ion-content scroll=\"true\" padding=\"false\" class=\"has-footer\">\r" +
    "\n" +
    "        <div class=\"row top-tabs\">\r" +
    "\n" +
    "            <div class=\"col\"><img src=\"img/icon/basket.png\"><br />סל מוצרים</div>\r" +
    "\n" +
    "            <div class=\"col\" ng-click=\"showDetailsPopup()\"><img src=\"img/icon/details.png\"><br />פרטים</div>\r" +
    "\n" +
    "            <div class=\"col\" ng-click=\"showFilterPopup()\"><img src=\"img/icon/filter.png\"><br />סינון ומיון</div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "        <div class=\"list-container\" ng-class=\"viewClassName\">\r" +
    "\n" +
    "            <div class=\"fruit-wrapper\" ng-repeat=\"item in items\">\r" +
    "\n" +
    "                <div class=\"fruit-item\">\r" +
    "\n" +
    "                    <div ng-if=\"item.checked\" ng-click=\"closeFilterPopup()\" class=\"checked\"></div>\r" +
    "\n" +
    "                    <div class=\"image\" ng-click=\"itemClicked(item)\">\r" +
    "\n" +
    "                        <img ng-src=\"http://62.219.7.38/items/{{item.PicNum}}.png\" onerror=\"this.onerror='';this.src='img/logo.png'\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <h4 ng-click=\"itemClicked(item)\">{{item.name}}</h4>\r" +
    "\n" +
    "                    <div class=\"price\">\r" +
    "\n" +
    "                        <table ng-show=\"listDetails == 'price'\">\r" +
    "\n" +
    "                            <tr><td>מחיר סוג א'</td><td>{{primeQualityPrice(item)}} ש\"ח</td></tr>\r" +
    "\n" +
    "                            <tr><td>מחיר מובחר</td><td>{{topQualityPrice(item)}} ש\"ח</td></tr>\r" +
    "\n" +
    "                        </table>\r" +
    "\n" +
    "                        <table ng-show=\"listDetails == 'avgPrice'\">\r" +
    "\n" +
    "                            <tr><td>מחיר ממוצע סוג א'</td><td>{{primeQualityAvgPrice(item)}} ש\"ח</td></tr>\r" +
    "\n" +
    "                            <tr><td>מחיר ממוצע מובחר</td><td>{{topQualityAvgPrice(item)}} ש\"ח</td></tr>\r" +
    "\n" +
    "                        </table>\r" +
    "\n" +
    "                        <table ng-show=\"listDetails == 'percentChange'\">\r" +
    "\n" +
    "                            <tr><td>אחוז שינוי סוג א'</td><td>{{primeQualityPercentChange(item)}}%</td></tr>\r" +
    "\n" +
    "                            <tr><td>אחוז שינוי מובחר</td><td>{{topQualityPercentChange(item)}}%</td></tr>\r" +
    "\n" +
    "                        </table>\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                    <div class=\"buttons\">\r" +
    "\n" +
    "                        <span class=\"push-percent\" ng-click=\"showPushNotificationPopup(item)\">{{item.percent}}<small ng-if=\"item.percent\">%</small></span>\r" +
    "\n" +
    "                        <img src=\"img/item-push.png\" style=\"float:right;\" ng-click=\"showPushNotificationPopup(item)\">\r" +
    "\n" +
    "                        <img src=\"img/item-share.png\" style=\"float:left;\" ng-click=\"shareProduct(item)\">\r" +
    "\n" +
    "                    </div>\r" +
    "\n" +
    "                </div>\r" +
    "\n" +
    "            </div>\r" +
    "\n" +
    "        </div>\r" +
    "\n" +
    "    </ion-content>\r" +
    "\n" +
    "    <ion-infinite-scroll\r" +
    "\n" +
    "            ng-if=\"moreDataCanBeLoaded()\"\r" +
    "\n" +
    "            on-infinite=\"loadMore()\"\r" +
    "\n" +
    "            distance=\"10%\">\r" +
    "\n" +
    "    </ion-infinite-scroll>\r" +
    "\n" +
    "</ion-view>\r" +
    "\n"
  );


  $templateCache.put('www/views/tabs.html',
    "<ion-view>\r" +
    "\n" +
    "    <ion-nav-view name=\"content\"></ion-nav-view>\r" +
    "\n" +
    "    <ion-tabs class=\"tabs-balanced tabs-icon-top\" ng-class=\"hideTabs\">\r" +
    "\n" +
    "        <ion-tab title=\"מחיר סיטונאי\" icon-on=\"buyer\" icon-off=\"buyer\"  ui-sref=\"withTabs.productsWholesale\" on-select=\"setUserType('wholesale')\"></ion-tab>\r" +
    "\n" +
    "        <ion-tab title=\"מחיר חקלאי\" icon-on=\"farmer\" icon-off=\"farmer\"  ui-sref=\"withTabs.productsAgriculture\" on-select=\"setUserType('agriculture')\"></ion-tab>\r" +
    "\n" +
    "        <ion-tab title=\"גרפים\" icon-on=\"graph\" icon-off=\"graph\" ui-sref=\"withTabs.chart\"></ion-tab>\r" +
    "\n" +
    "    </ion-tabs>\r" +
    "\n" +
    "</ion-view>\r" +
    "\n"
  );

}]);
