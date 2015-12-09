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


  $templateCache.put('www/views/auth/login.html',
    "<ion-view title=\"התחברות\">\n" +
    "    <ion-content padding=\"true\">\n" +
    "        <!--\n" +
    "        <form name=\"login.form\" ng-submit=\"login()\" novalidate>\n" +
    "            <ion-list>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': login.form.identifier.$invalid && login.form.identifier.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">אימייל</span>\n" +
    "                        <input type=\"email\" ng-model=\"login.data.identifier\" name=\"identifier\" placeholder=\"example@site.com\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': login.form.secret.$invalid && login.form.secret.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">סיסמא</span>\n" +
    "                        <input type=\"password\" ng-model=\"login.data.secret\" name=\"secret\" placeholder=\"Gf/vj[5w\" ng-minlength=\"6\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "            </ion-list>\n" +
    "            <button class=\"button button-balanced button-block icon-left ion-chevron-left\" ng-disabled=\"login.form.$invalid\">\n" +
    "                התחבר\n" +
    "            </button>\n" +
    "            <div class=\"text-center\">\n" +
    "                או\n" +
    "            </div>\n" +
    "        </form>\n" +
    "        -->\n" +
    "        <button class=\"button button-positive button-block icon-right ion-social-facebook\" ng-click=\"login()\">\n" +
    "            התחבר באמצעות פייסבוק\n" +
    "        </button>\n" +
    "    </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('www/views/auth/register.html',
    "<ion-view title=\"הרשמה\">\n" +
    "    <ion-content padding=\"true\">\n" +
    "        <form name=\"register.form\" ng-submit=\"submit()\" novalidate>\n" +
    "            <div id=\"register-upload-image\" class=\"text-center\">\n" +
    "                <label>\n" +
    "                    <img ng-src=\"{{ profileImage.data }}\" on-tap=\"chooseImage()\">\n" +
    "                </label>\n" +
    "            </div>\n" +
    "            <ion-list>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': register.form.first_name.$invalid && register.form.first_name.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">\n" +
    "                            שם פרטי\n" +
    "                        </span>\n" +
    "                        <input type=\"text\" ng-model=\"register.data.first_name\" name=\"first_name\" placeholder=\"ישראל\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': register.form.last_name.$invalid && register.form.last_name.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">\n" +
    "                            שם משפחה\n" +
    "                        </span>\n" +
    "                        <input type=\"text\" ng-model=\"register.data.last_name\" name=\"last_name\" placeholder=\"ישראלי\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': register.form.description.$invalid && register.form.description.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">תיאור</span>\n" +
    "                        <textarea ng-model=\"register.data.description\" name=\"description\"\n" +
    " placeholder=\"פה זה המקום לרשום כמה שורות על עצמך.\n" +
    "מעסיקים רוצים לדעת איזה מן בנאדם אתה, איפה יצא לך לעבוד כבר, איך אתה מתנייד, ומה היתרונות שלך.\" style=\"height:60px\" required></textarea>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': register.form.phone_number.$invalid && register.form.phone_number.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">מספר פלאפון</span>\n" +
    "                        <input type=\"text\" ng-model=\"register.data.phone_number\" name=\"phone_number\" placeholder=\"050-1234567\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': register.form.address.$invalid && register.form.address.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">עיר מגורים</span>\n" +
    "                        <input type=\"text\" ng-model=\"register.data.address\" name=\"address\" placeholder=\"תל אביב\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-select item-select-rtl\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': register.form.gender.$invalid && register.form.gender.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">\n" +
    "                            מין\n" +
    "                        </span>\n" +
    "                        <select ng-model=\"register.data.gender\" name=\"gender\" ng-options=\"gender.value as gender.label for gender in enums.genders\" required></select>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': register.form.birth_date.$invalid && register.form.birth_date.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">תאריך לידה</span>\n" +
    "                        <input type=\"date\" ng-model=\"register.data.birth_date\" name=\"birth_date\" min=\"{{ minDate }}\" max=\"{{ maxDate }}\" placeholder=\"תאריך לידה\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "            </ion-list>\n" +
    "            <small class=\"assertive\">* כל השדות חובה. אין הרבה גם ככה :)</small>\n" +
    "            <button class=\"button button-positive button-block icon-right ion-social-facebook\" ng-disabled=\"register.form.$invalid\">\n" +
    "                התחבר באמצעות פייסבוק\n" +
    "            </button>\n" +
    "        </form>\n" +
    "    </ion-content>\n" +
    "</ion-view>\n"
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
    "            <img src=\"/img/tozeret.png\" />\r" +
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
    "</ion-view>"
  );


  $templateCache.put('www/views/employees/job-employer.html',
    "<ion-view ng-attr-title=\"{{ employer.title || 'סניף' }}\">\n" +
    "    <ion-nav-title><span ng-if=\"loaded\" ng-bind=\"employer.title\"></span></ion-nav-title>\n" +
    "    <ion-content padding=\"false\">\n" +
    "      <div ng-if=\"loaded && !error\">\n" +
    "        <div class=\"job\" ng-style=\"{ 'background-color': employer.backgroundColor }\">\n" +
    "            <div class=\"job-profile-image\">\n" +
    "                <img ng-src=\"{{ employer.profile_image_uri }}\">\n" +
    "            </div>\n" +
    "            <div class=\"job-data\">\n" +
    "                <div class=\"job-employer-name\" ng-bind=\"employer.title\"></div>\n" +
    "                <div class=\"job-position\" ng-bind=\"employer.address\"></div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "\n" +
    "        <div id=\"job\" class=\"padding\">\n" +
    "            <p id=\"employer-description\" ng-bind=\"employer.description\" style=\"margin-top: 10px;\"></p>\n" +
    "            <hr>\n" +
    "            <div id=\"job-more-details\">\n" +
    "                <div id=\"job-more-details-header\">מידע נוסף על הסניף</div>\n" +
    "                <hr>\n" +
    "                <div>\n" +
    "                  <div class=\"icon\">\n" +
    "                      <i class=\"icon ion-ios-location-outline\"></i>\n" +
    "                  </div>\n" +
    "                  <div>\n" +
    "                      <strong>מיקום:</strong>\n" +
    "                      <span ng-bind=\"employer.address\"></span>\n" +
    "                  </div>\n" +
    "                  <div class=\"clearfix\"></div>\n" +
    "                </div>\n" +
    "                <div ng-show=\"employment && employment.status == 'EMPLOYEE' && employment.status == 'AWAITING_FINAL_APPROVAL'\">\n" +
    "                    <div class=\"icon\">\n" +
    "                        <i class=\"icon ion-ios-telephone-outline\"></i>\n" +
    "                    </div>\n" +
    "                    <div>\n" +
    "                        <strong>מספר פלאפון:</strong>\n" +
    "                        <span ng-bind=\"employer.phone_number\"></span>\n" +
    "                    </div>\n" +
    "                    <div class=\"clearfix\"></div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div id=\"job-location\" ng-if=\"map.center.latitude && map.center.longitude\">\n" +
    "              <hr>\n" +
    "              <div id=\"job-location-header\">מיקום הסניף</div>\n" +
    "              <hr>\n" +
    "              <div>\n" +
    "                  <ui-gmap-google-map center='map.center' zoom='map.zoom'>\n" +
    "                      <ui-gmap-marker coords=\"marker.cords\" options=\"marker.options\" idKey=\"marker.id\"></ui-gmap-marker>\n" +
    "                  </ui-gmap-google-map>\n" +
    "              </div>\n" +
    "            </div>\n" +
    "            <div class=\"text-center\">\n" +
    "                <button class=\"button button-balanced icon ion-android-navigate\" on-tap=\"openNavigator()\">\n" +
    "                    נווט למקום\n" +
    "                </button>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "\n" +
    "        <div class=\"clearfix\"></div>\n" +
    "      </div>\n" +
    "      <div ng-show=\"error\" class=\"padding\">\n" +
    "          קיימת תקלה טכנית, אנא נסה שנית\n" +
    "      </div>\n" +
    "    </ion-cotent>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('www/views/employees/job-template.html',
    "<a ui-sref=\"employees.job({ jobId: job.id })\" class=\"job\" ng-class=\"'job-background-' + job.index % 4\" ng-if=\"link\">\n" +
    "    <div class=\"job-employment-status\" ng-if=\"job.employment_status\">\n" +
    "        <strong ng-if=\"job.employment_status == 'APPLICANT'\">הינך מועמד למשרה</strong>\n" +
    "        <strong ng-if=\"job.employment_status == 'AWAITING_FINAL_APPROVAL'\">המעסיק אישר את מועמדותך, היכנס כדי לאשר</strong>\n" +
    "        <strong ng-if=\"job.employment_status == 'EMPLOYEE'\">הינך מועסק במשרה זו</strong>\n" +
    "        <strong ng-if=\"job.employment_status == 'FINISHED_JOB'\">סיימת את עבודתך במשרה זו</strong>\n" +
    "        <strong ng-if=\"job.employment_status == 'FIRED'\">פוטרת ממשרה זו</strong>\n" +
    "        <strong ng-if=\"job.employment_status == 'CANCELED'\">ביטלת את המועמדות למשרה</strong>\n" +
    "        <strong ng-if=\"job.employment_status == 'LIKED'\">עשית לייק למשרה זו</strong>\n" +
    "    </div>\n" +
    "    <div class=\"job-profile-image\">\n" +
    "        <img image-lazy-src=\"{{ job.logo_url }}\">\n" +
    "    </div>\n" +
    "    <div class=\"job-data\">\n" +
    "        <p class=\"job-employer-name\" ng-bind=\"job.employer_name\"></p>\n" +
    "        <p class=\"job-position\" ng-bind=\"job.position\"></p>\n" +
    "        <p class=\"job-description\" ng-bind=\"job.description | cut: true: 100\"></p>\n" +
    "    </div>\n" +
    "    <div class=\"job-address\">\n" +
    "        <i class=\"icon ion-ios-location-outline\"></i>\n" +
    "        <address ng-bind=\"job.employer_address\" ng-class=\"{ 'full-width': job.distance == -1 }\"></address>\n" +
    "        <i class=\"icon ion-ios-navigate-outline\" ng-if=\"job.distance != -1\"></i>\n" +
    "        <span ng-bind-template='{{ job.distance }} ק\"מ ממך' ng-if=\"job.distance != -1\"></span>\n" +
    "    </div>\n" +
    "</a>\n" +
    "\n" +
    "<div class=\"job\" ng-if=\"!link\">\n" +
    "    <div class=\"job-profile-image\">\n" +
    "        <a ui-sref=\"employees.jobEmployer({ jobId: job.id, employerId: employer.id, employmentId: employee.id || '' })\" ng-if=\"job\">\n" +
    "            <img ng-src=\"{{ employer.profile_image_uri }}\">\n" +
    "        </a>\n" +
    "    </div>\n" +
    "    <div class=\"job-data\">\n" +
    "        <div class=\"job-employer-name\" ng-bind=\"employer.title\"></div>\n" +
    "        <div class=\"job-position\" ng-bind=\"job.position\"></div>\n" +
    "    </div>\n" +
    "</div>\n" +
    "\n" +
    "<div class=\"clearfix\"></div>\n"
  );


  $templateCache.put('www/views/employees/job.html',
    "<ion-view ng-attr-title=\"{{ job.position || 'משרה' }}\">\n" +
    "    <ion-nav-title><span ng-if=\"loaded\" ng-bind=\"job.position\"></span></ion-nav-title>\n" +
    "    <ion-content padding=\"false\">\n" +
    "        <div ng-if=\"loaded && !error\">\n" +
    "          <job-block employer=\"employer\" job=\"job\" employee=\"employee\" link=\"false\"></job-block>\n" +
    "          <div id=\"job\" class=\"padding\">\n" +
    "              <p id=\"job-description\" ng-bind=\"job.description\"></p>\n" +
    "              <div id=\"employment-status\" class=\"balanced\">\n" +
    "                  <p ng-if=\"employee.status == 'APPLICANT'\">\n" +
    "                      הינך מועמד למשרה\n" +
    "                  </p>\n" +
    "                  <p ng-if=\"employee.status == 'AWAITING_FINAL_APPROVAL'\">\n" +
    "                      המעסיק אישר את מועמדותך, כעת הינך יכול לאשר התחלת עבודה\n" +
    "                  </p>\n" +
    "                  <p ng-if=\"employee.status == 'EMPLOYEE'\">\n" +
    "                      הינך מועסק במשרה זו\n" +
    "                  </p>\n" +
    "                  <p ng-if=\"employee.status == 'FINISHED_JOB'\">\n" +
    "                      סיימת את עבודתך במשרה זו\n" +
    "                  </p>\n" +
    "                  <p ng-if=\"employee.status == 'FIRED'\">\n" +
    "                      פוטרת ממשרה זו\n" +
    "                  </p>\n" +
    "                  <p ng-if=\"employee.status == 'CANCELED'\">\n" +
    "                      ביטלת את המועמדות למשרה\n" +
    "                  </p>\n" +
    "              </div>\n" +
    "              <div id=\"job-buttons\">\n" +
    "                  <button class=\"button button-balanced\" ng-click=\"applyJob()\"\n" +
    "                        ng-if=\"!employee.status || (employee.status != 'APPLICANT' && employee.status != 'AWAITING_FINAL_APPROVAL' && employee.status != 'EMPLOYEE')\">\n" +
    "                      <i class=\"icon ion-paper-airplane\"></i>\n" +
    "                      הגש בקשה\n" +
    "                  </button>\n" +
    "                  <button class=\"button button-balanced\" ng-click=\"finalApplyJob()\"\n" +
    "                        ng-if=\"employee.status == 'AWAITING_FINAL_APPROVAL'\">\n" +
    "                      <i class=\"icon ion-ios-checkmark\"></i>\n" +
    "                      התחלת עבודה\n" +
    "                  </button>\n" +
    "                  <button class=\"button button-balanced\" ng-click=\"resignFromJob()\"\n" +
    "                        ng-if=\"employee.status == 'EMPLOYEE'\">\n" +
    "                      <i class=\"icon ion-ios-close\"></i>\n" +
    "                      התפטר\n" +
    "                  </button>\n" +
    "                  <button class=\"button button-balanced\" ng-click=\"cancelApplicationJob()\"\n" +
    "                        ng-if=\"employee.status == 'APPLICANT'\">\n" +
    "                      <i class=\"icon ion-ios-close\"></i>\n" +
    "                      בטל מועמדות\n" +
    "                  </button>\n" +
    "                  <button class=\"button button-assertive\" ng-click=\"cancelApplicationJob()\"\n" +
    "                        ng-if=\"employee.status == 'AWAITING_FINAL_APPROVAL'\">\n" +
    "                      <i class=\"icon ion-ios-close\"></i>\n" +
    "                      ביטול\n" +
    "                  </button>\n" +
    "                  <button id=\"job-share\" class=\"button button-icon button-clear\" on-tap=\"shareJob()\">\n" +
    "                      <i class=\"icon ion-android-share-alt balanced\"></i>\n" +
    "                  </button>\n" +
    "                  <button id=\"job-like\" class=\"button button-icon button-clear\" ng-click=\"likeButtonClick()\"\n" +
    "                        ng-if=\"!employee.status || employee.status == 'LIKED' || employee.status == 'UNLIKED'\">\n" +
    "                      <i class=\"icon balanced\" ng-class=\"{\n" +
    "                          'ion-android-favorite': employee.status == 'LIKED',\n" +
    "                          'ion-android-favorite-outline': !employee.status || employee.status == 'UNLIKED' }\"></i>\n" +
    "                  </button>\n" +
    "              </div>\n" +
    "              <hr>\n" +
    "              <p id=\"employer-description\" ng-bind=\"employer.description\"></p>\n" +
    "              <hr>\n" +
    "              <div id=\"job-more-details\">\n" +
    "                  <div id=\"job-more-details-header\">מידע נוסף על המשרה</div>\n" +
    "                  <hr>\n" +
    "                  <div>\n" +
    "                      <div class=\"icon\">\n" +
    "                          <i class=\"icon ion-ios-location-outline\"></i>\n" +
    "                      </div>\n" +
    "                      <div>\n" +
    "                          <strong>מיקום:</strong>\n" +
    "                          <span ng-bind=\"employer.address\"></span>\n" +
    "                      </div>\n" +
    "                      <div class=\"clearfix\"></div>\n" +
    "                  </div>\n" +
    "                  <div>\n" +
    "                      <div class=\"icon\">\n" +
    "                          <i class=\"icon ion-ios-clock-outline\"></i>\n" +
    "                      </div>\n" +
    "                      <div>\n" +
    "                          <strong>\n" +
    "                            עבודה ב<span ng-bind=\"job.type\"></span>\n" +
    "                          </strong>\n" +
    "                      </div>\n" +
    "                      <div class=\"clearfix\"></div>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div id=\"job-requirements\" ng-if=\"job.requirements_general || (job.requirements_age_min || job.requirements_age_max)\">\n" +
    "                  <hr>\n" +
    "                  <div id=\"job-requirements-header\">דרישות המשרה</div>\n" +
    "                  <div>\n" +
    "                    <hr>\n" +
    "                    <div ng-if=\"job.requirements_general\">\n" +
    "                        <div class=\"icon\">\n" +
    "                            <i class=\"icon ion-ios-list-outline\"></i>\n" +
    "                        </div>\n" +
    "                        <div>\n" +
    "                            <strong>ניסיון:</strong>\n" +
    "                            <span ng-bind=\"job.requirements_general\"></span>\n" +
    "                        </div>\n" +
    "                        <div class=\"clearfix\"></div>\n" +
    "                    </div>\n" +
    "                    <div ng-if=\"job.requirements_age_min || job.requirements_age_max\">\n" +
    "                        <div class=\"icon\">\n" +
    "                            <i class=\"icon ion-ios-calendar-outline\"></i>\n" +
    "                        </div>\n" +
    "                        <div>\n" +
    "                            <strong>גיל:</strong>\n" +
    "                            <span ng-bind-template=\"{{ job.requirements_age_min }} - {{ job.requirements_age_max }}\" ng-if=\"job.requirements_age_min && job.requirements_age_max\"></span>\n" +
    "                            <span ng-bind-template=\"מ-{{ job.requirements_age_min }}\" ng-if=\"job.requirements_age_min && !job.requirements_age_max\"></span>\n" +
    "                            <span ng-bind-template=\"עד {{ job.requirements_age_max }}\" ng-if=\"job.requirements_age_max && !job.requirements_age_min\"></span>\n" +
    "                        </div>\n" +
    "                        <div class=\"clearfix\"></div>\n" +
    "                    </div>\n" +
    "                  </div>\n" +
    "              </div>\n" +
    "              <div id=\"job-location\" ng-if=\"map.center.latitude && map.center.longitude\">\n" +
    "                <hr>\n" +
    "                <div id=\"job-location-header\">מיקום הסניף</div>\n" +
    "                <hr>\n" +
    "                <div>\n" +
    "                    <ui-gmap-google-map center='map.center' zoom='map.zoom'>\n" +
    "                        <ui-gmap-marker coords=\"marker.cords\" options=\"marker.options\" idKey=\"marker.id\"></ui-gmap-marker>\n" +
    "                    </ui-gmap-google-map>\n" +
    "                </div>\n" +
    "              </div>\n" +
    "              <div class=\"text-center\">\n" +
    "                  <button class=\"button button-balanced icon ion-android-navigate\" on-tap=\"openNavigator()\">\n" +
    "                      נווט למקום\n" +
    "                  </button>\n" +
    "              </div>\n" +
    "          </div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"error\" class=\"padding\">\n" +
    "            קיימת תקלה טכנית, אנא נסה שנית\n" +
    "        </div>\n" +
    "    </ion-cotent>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('www/views/employees/jobs-feed.html',
    "<ion-view>\n" +
    "    <ion-content scroll=\"true\" padding=\"false\" class=\"has-footer\">\n" +
    "        <div class=\"list-container\">\n" +
    "            <div class=\"fruit-item\">\n" +
    "                <div class=\"image\">\n" +
    "                    <img src=\"\" alt=\"\">\n" +
    "                </div>\n" +
    "                <h4>תפוז</h4>\n" +
    "                <div class=\"price\">\n" +
    "                    <span>מחיר סוג א'</span>3.00 ש\"ח<br />\n" +
    "                    <span>מחיר מובחר</span>3.00 ש\"ח<br />\n" +
    "                </div>\n" +
    "                <div class=\"buttons\">\n" +
    "                    כפתורים\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"fruit-item\">\n" +
    "                <div class=\"image\">\n" +
    "                    <img src=\"\" alt=\"\">\n" +
    "                </div>\n" +
    "                <h4>תפוז</h4>\n" +
    "                <div class=\"price\">\n" +
    "                    <span>מחיר סוג א'</span>3.00 ש\"ח<br />\n" +
    "                    <span>מחיר מובחר</span>3.00 ש\"ח<br />\n" +
    "                </div>\n" +
    "                <div class=\"buttons\">\n" +
    "                    כפתורים\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"fruit-item\">\n" +
    "                <div class=\"image\">\n" +
    "                    <img src=\"\" alt=\"\">\n" +
    "                </div>\n" +
    "                <h4>תפוז</h4>\n" +
    "                <div class=\"price\">\n" +
    "                    <span>מחיר סוג א'</span>3.00 ש\"ח<br />\n" +
    "                    <span>מחיר מובחר</span>3.00 ש\"ח<br />\n" +
    "                </div>\n" +
    "                <div class=\"buttons\">\n" +
    "                    כפתורים\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"fruit-item\">\n" +
    "                <div class=\"image\">\n" +
    "                    <img src=\"\" alt=\"\">\n" +
    "                </div>\n" +
    "                <h4>תפוז</h4>\n" +
    "                <div class=\"price\">\n" +
    "                    <span>מחיר סוג א'</span>3.00 ש\"ח<br />\n" +
    "                    <span>מחיר מובחר</span>3.00 ש\"ח<br />\n" +
    "                </div>\n" +
    "                <div class=\"buttons\">\n" +
    "                    כפתורים\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"fruit-item\">\n" +
    "                <div class=\"image\">\n" +
    "                    <img src=\"\" alt=\"\">\n" +
    "                </div>\n" +
    "                <h4>תפוז</h4>\n" +
    "                <div class=\"price\">\n" +
    "                    <span>מחיר סוג א'</span>3.00 ש\"ח<br />\n" +
    "                    <span>מחיר מובחר</span>3.00 ש\"ח<br />\n" +
    "                </div>\n" +
    "                <div class=\"buttons\">\n" +
    "                    כפתורים\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"fruit-item\">\n" +
    "                <div class=\"image\">\n" +
    "                    <img src=\"\" alt=\"\">\n" +
    "                </div>\n" +
    "                <h4>תפוז</h4>\n" +
    "                <div class=\"price\">\n" +
    "                    <span>מחיר סוג א'</span>3.00 ש\"ח<br />\n" +
    "                    <span>מחיר מובחר</span>3.00 ש\"ח<br />\n" +
    "                </div>\n" +
    "                <div class=\"buttons\">\n" +
    "                    כפתורים\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"fruit-item\">\n" +
    "                <div class=\"image\">\n" +
    "                    <img src=\"\" alt=\"\">\n" +
    "                </div>\n" +
    "                <h4>תפוז</h4>\n" +
    "                <div class=\"price\">\n" +
    "                    <span>מחיר סוג א'</span>3.00 ש\"ח<br />\n" +
    "                    <span>מחיר מובחר</span>3.00 ש\"ח<br />\n" +
    "                </div>\n" +
    "                <div class=\"buttons\">\n" +
    "                    כפתורים\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"fruit-item\">\n" +
    "                <div class=\"image\">\n" +
    "                    <img src=\"\" alt=\"\">\n" +
    "                </div>\n" +
    "                <h4>תפוז</h4>\n" +
    "                <div class=\"price\">\n" +
    "                    <span>מחיר סוג א'</span>3.00 ש\"ח<br />\n" +
    "                    <span>מחיר מובחר</span>3.00 ש\"ח<br />\n" +
    "                </div>\n" +
    "                <div class=\"buttons\">\n" +
    "                    כפתורים\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <div class=\"fruit-item\">\n" +
    "                <div class=\"image\">\n" +
    "                    <img src=\"\" alt=\"\">\n" +
    "                </div>\n" +
    "                <h4>תפוז</h4>\n" +
    "                <div class=\"price\">\n" +
    "                    <span>מחיר סוג א'</span>3.00 ש\"ח<br />\n" +
    "                    <span>מחיר מובחר</span>3.00 ש\"ח<br />\n" +
    "                </div>\n" +
    "                <div class=\"buttons\">\n" +
    "                    כפתורים\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('www/views/employees/jobs-search.html',
    "<ion-view title=\"חיפוש משרות\">\n" +
    "    <ion-content lazy-scroll>\n" +
    "        <div id=\"search-list\" class=\"list\">\n" +
    "            <label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">שם בית העסק</span>\n" +
    "                <input type=\"text\" ng-model=\"searchData.employer_title\">\n" +
    "            </label>\n" +
    "            <label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">תפקיד</span>\n" +
    "                <input type=\"text\" ng-model=\"searchData.position\">\n" +
    "            </label>\n" +
    "            <label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">כתובת</span>\n" +
    "                <input type=\"text\" ng-model=\"searchData.address\">\n" +
    "            </label>\n" +
    "            <label class=\"item item-input\">\n" +
    "                <span class=\"input-label\">טקסט חופשי</span>\n" +
    "                <input type=\"text\" ng-model=\"searchData.open_query\">\n" +
    "            </label>\n" +
    "        </div>\n" +
    "        <div id=\"feed\">\n" +
    "            <div class=\"padding text-center\" ng-if=\"!loaded && isSearching && !error\">\n" +
    "              <ion-spinner></ion-spinner>\n" +
    "            </div>\n" +
    "            <ion-list class=\"jobs-list\" ng-if=\"loaded && !error\">\n" +
    "                <ion-item ng-repeat=\"job in jobs\" ng-init=\"job.index = $index\">\n" +
    "                    <job-block job=\"job\" link=\"true\" on-tap=\"goToJob(job.id, $event)\"></job-block>\n" +
    "                </ion-item>\n" +
    "            </ion-list>\n" +
    "            <ion-infinite-scroll ng-if=\"!noMoreJobsAvailable && loaded && !error\" on-infinite=\"getFeed(true)\" distance=\"10%\"></ion-infinite-scroll>\n" +
    "            <div ng-show=\"loaded && !jobs.length && !error\" class=\"padding\">\n" +
    "                לא נמצאו משרות\n" +
    "            </div>\n" +
    "            <div ng-show=\"error\" class=\"padding\">\n" +
    "                קיימת תקלה טכנית, אנא נסה שנית\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </ion-cotent>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('www/views/employees/jobs-user.html',
    "<ion-view title=\"המשרות שלי\">\n" +
    "    <ion-content padding=\"false\" lazy-scroll>\n" +
    "        <div id=\"feed\" ng-if=\"user.logged\">\n" +
    "            <ion-refresher\n" +
    "              on-refresh=\"refreshMyJobs()\">\n" +
    "            </ion-refresher>\n" +
    "            <ion-list class=\"jobs-list\" ng-if=\"loaded && jobs.length && !error\">\n" +
    "                <ion-item ng-repeat=\"job in jobs\" ng-init=\"job.index = $index\">\n" +
    "                    <job-block job=\"job\" link=\"true\" on-tap=\"goToJob(job.id, $event)\"></job-block>\n" +
    "                </ion-item>\n" +
    "            </ion-list>\n" +
    "            <ion-infinite-scroll ng-if=\"loaded && !noMoreJobsAvailable && !error\" on-infinite=\"getMyJobs(true)\" distance=\"10%\"></ion-infinite-scroll>\n" +
    "            <div ng-show=\"loaded && !jobs.length && !error\" class=\"padding\">\n" +
    "                לא נמצאו משרות\n" +
    "            </div>\n" +
    "            <div ng-show=\"error\" class=\"padding\">\n" +
    "                קיימת תקלה טכנית, אנא נסה שנית\n" +
    "            </div>\n" +
    "        </div>\n" +
    "        <div ng-show=\"!user.logged\" class=\"padding\">\n" +
    "            <p>\n" +
    "                אינך משתמש רשום ולכן אין לך משרות\n" +
    "            </p>\n" +
    "            <p>\n" +
    "                <div class='divs-middle'>\n" +
    "                    <button class=\"button button-balanced icon-right ion-log-in\" on-tap=\"loginAndRefresh()\">התחבר למערכת</button>\n" +
    "                </div>\n" +
    "            </p>\n" +
    "        </div>\n" +
    "    </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('www/views/employees/notifications-modal.html',
    "<ion-modal-view>\n" +
    "    <ion-header-bar class=\"bar-balanced\" align-title=\"{{ android ? 'right' : 'center' }}\">\n" +
    "        <h1 class=\"title\">התראות</h1>\n" +
    "        <div class=\"buttons\">\n" +
    "            <button class=\"button button-icon button-clear ion-close-circled\" ng-click=\"closeNotifications()\"></button>\n" +
    "        </div>\n" +
    "    </ion-header-bar>\n" +
    "    <ion-content class=\"padding\">\n" +
    "        אהלן\n" +
    "    </ion-content>\n" +
    "</ion-modal-view>\n"
  );


  $templateCache.put('www/views/employees/tabs.html',
    "<ion-view>\r" +
    "\n" +
    "    <ion-nav-view name=\"jobs-feed-tab\"></ion-nav-view>\r" +
    "\n" +
    "    <ion-tabs class=\"tabs-balanced tabs-icon-top\" ng-class=\"hideTabs\">\r" +
    "\n" +
    "        <ion-tab title=\"מחיר סיטונאי\" icon-on=\"buyer\" icon-off=\"buyer\" href=\"#/employees/jobs-feed\"></ion-tab>\r" +
    "\n" +
    "        <ion-tab title=\"מחיר חקלאי\" icon-on=\"farmer\" icon-off=\"farmer\" href=\"#/employees/jobs-user\"></ion-tab>\r" +
    "\n" +
    "        <ion-tab title=\"גרפים\" icon-on=\"graph\" icon-off=\"graph\" href=\"#/employees/jobs-search\"></ion-tab>\r" +
    "\n" +
    "    </ion-tabs>\r" +
    "\n" +
    "</ion-view>\r" +
    "\n"
  );


  $templateCache.put('www/views/employees/user-profile-edit.html',
    "<ion-view title=\"עריכת פרופיל\">\n" +
    "    <ion-content padding=\"true\">\n" +
    "        <form name=\"profileEdit.form\" ng-submit=\"submit()\" novalidate>\n" +
    "            <div id=\"register-upload-image\">\n" +
    "                <img ng-src=\"{{ profileImage.data }}\" on-tap=\"chooseImage()\">\n" +
    "            </div>\n" +
    "            <ion-list>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': profileEdit.form.first_name.$invalid && profileEdit.form.first_name.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">\n" +
    "                            שם פרטי\n" +
    "                        </span>\n" +
    "                        <input type=\"text\" ng-model=\"profileEdit.data.first_name\" name=\"first_name\" placeholder=\"ישראל\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': profileEdit.form.last_name.$invalid && profileEdit.form.last_name.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">\n" +
    "                            שם משפחה\n" +
    "                        </span>\n" +
    "                        <input type=\"text\" ng-model=\"profileEdit.data.last_name\" name=\"last_name\" placeholder=\"ישראלי\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': profileEdit.form.description.$invalid && profileEdit.form.description.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">תיאור</span>\n" +
    "                        <textarea ng-model=\"profileEdit.data.description\" name=\"description\"\n" +
    " placeholder=\"פה זה המקום לרשום כמה שורות על עצמך.\n" +
    "מעסיקים רוצים לדעת איזה מן בנאדם אתה, איפה יצא לך לעבוד כבר, איך אתה מתנייד, ומה היתרונות שלך.\" style=\"height:60px\" required></textarea>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': profileEdit.form.phone_number.$invalid && profileEdit.form.phone_number.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">מספר פלאפון</span>\n" +
    "                        <input type=\"text\" ng-model=\"profileEdit.data.phone_number\" name=\"phone_number\" placeholder=\"050-1234567\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': profileEdit.form.address.$invalid && profileEdit.form.address.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">עיר מגורים</span>\n" +
    "                        <input type=\"text\" ng-model=\"profileEdit.data.address\" name=\"address\" placeholder=\"תל אביב\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-select item-select-rtl\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': profileEdit.form.gender.$invalid && profileEdit.form.gender.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">\n" +
    "                            מין\n" +
    "                        </span>\n" +
    "                        <select ng-model=\"profileEdit.data.gender\" name=\"gender\" ng-options=\"gender.value as gender.label for gender in enums.genders\" required></select>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "                <ion-item class=\"item-input item-stacked-label\"\n" +
    "                    ng-class=\"{ 'form-input-invalid': profileEdit.form.birth_date.$invalid && profileEdit.form.birth_date.$dirty }\">\n" +
    "                    <label>\n" +
    "                        <span class=\"input-label\">תאריך לידה</span>\n" +
    "                        <input type=\"date\" ng-model=\"profileEdit.data.birth_date\" name=\"birth_date\" min=\"{{ minDate }}\" max=\"{{ maxDate }}\" placeholder=\"תאריך לידה\" required>\n" +
    "                    </label>\n" +
    "                </ion-item>\n" +
    "            </ion-list>\n" +
    "            <small class=\"assertive\">* כל השדות חובה. אין הרבה גם ככה :)</small>\n" +
    "            <button class=\"button button-balanced button-block icon-left ion-chevron-left\" ng-disabled=\"profileEdit.form.$invalid\">\n" +
    "                עדכן\n" +
    "            </button>\n" +
    "        </form>\n" +
    "    </ion-content>\n" +
    "</ion-view>\n"
  );


  $templateCache.put('www/views/employees/user-profile.html',
    "<ion-view title=\"פרופיל\" hide-tabs>\n" +
    "    <ion-content padding=\"true\" overflow-scroll=\"true\">\n" +
    "        <div id=\"profile\">\n" +
    "            <div id=\"profile-image\">\n" +
    "                <img ng-src=\"{{ user.profile.profile_image_uri }}\" ng-if=\"user.profile.profile_image_uri\">\n" +
    "                <img src=\"img/jobhop-icon.png\" class=\"image-not-rounded\" ng-if=\"!user.profile.profile_image_uri\">\n" +
    "            </div>\n" +
    "            <div id=\"profile-name\" ng-bind-template=\"{{ user.profile.first_name }} {{ user.profile.last_name }}\"></div>\n" +
    "            <div id=\"profile-details\">\n" +
    "                <span ng-if=\"user.profile.birth_date\">\n" +
    "                    <span ng-bind=\"user.profile.gender == 'MALE' ? 'בן' : 'בת'\"></span>\n" +
    "                    <span ng-bind=\"user.profile.age\"></span>\n" +
    "                </span\n" +
    "                ><span ng-if=\"user.profile.address\">,\n" +
    "                    <span ng-bind=\"user.profile.address\"></span>\n" +
    "                </span>\n" +
    "            </div>\n" +
    "            <hr>\n" +
    "            <div>\n" +
    "                <div class=\"profile-header\">קצת על עצמי</div>\n" +
    "                <hr>\n" +
    "                <p id=\"profile-about-me\" ng-bind-html=\"user.profile.description | nl2br\" ng-if=\"user.profile.description\"></p>\n" +
    "                <strong ng-if=\"!user.profile.description\">לא צוין מידע</strong>\n" +
    "            </div>\n" +
    "            <hr>\n" +
    "            <div>\n" +
    "                <div class=\"profile-header\">סרטון פרופיל</div>\n" +
    "                <hr>\n" +
    "                <div data-tap-disable=\"true\" ng-if=\"profile_video_uri\">\n" +
    "                    <video ng-src=\"{{ profile_video_uri }}\" poster=\"img/no-profile-video.jpg\" controls></video>\n" +
    "                </div>\n" +
    "                <div ng-if=\"!profile_video_uri\">\n" +
    "                    <div id=\"no-profile-video\" on-tap=\"uploadProfileVideo()\">\n" +
    "                        <img src=\"img/no-profile-video.jpg\" id=\"visible\">\n" +
    "                        <img src=\"img/no-profile-video.jpg\" id=\"invisible\">\n" +
    "                        <div>\n" +
    "                            <i class=\"icon ion-videocamera\"></i><br>\n" +
    "                        </div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "            <hr ng-hide=\"true\">\n" +
    "            <div ng-hide=\"true\">\n" +
    "                <div class=\"profile-header\">ניסיון תעסוקתי</div>\n" +
    "                <hr>\n" +
    "                <div id=\"profile-experience\">\n" +
    "                    <div>\n" +
    "                        <div class=\"profile-experience-timeline\">2015</div>\n" +
    "                        <div class=\"profile-experience-description\">ראש ממשלת ישראל</div>\n" +
    "                    </div>\n" +
    "                    <div>\n" +
    "                        <div class=\"profile-experience-timeline\">2010-2014</div>\n" +
    "                        <div class=\"profile-experience-description\">נשיא בית המשפט העליון</div>\n" +
    "                    </div>\n" +
    "                    <div>\n" +
    "                        <div class=\"profile-experience-timeline\">2005-2009</div>\n" +
    "                        <div class=\"profile-experience-description\">מנכ\"ל בנק הפועלים</div>\n" +
    "                    </div>\n" +
    "                    <div>\n" +
    "                        <div class=\"profile-experience-timeline\">2003</div>\n" +
    "                        <div class=\"profile-experience-description\">צייר</div>\n" +
    "                    </div>\n" +
    "                </div>\n" +
    "            </div>\n" +
    "        </div>\n" +
    "    </ion-content>\n" +
    "</ion-view>\n"
  );

}]);
