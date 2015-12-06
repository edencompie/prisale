angular.module('jobhop.services')
.factory('JobHopAPI', JobHopAPI)
.constant('JobsPerPage', 15);

JobHopAPI.$inject = ['GApi', 'JobsPerPage', '$localStorage', '$cordovaFacebook', '$cordovaFileTransfer', '$q', '$window'];

function JobHopAPI(GApi, JobsPerPage, $localStorage, $cordovaFacebook, $cordovaFileTransfer, $q, $window) {
    var API = {};

    var getRandomString = function() {
        var LENGTH = 32;
        var CHARS = '0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
        var result = '';
        for (var i = LENGTH; i > 0; --i)
            result += CHARS[Math.round(Math.random() * (CHARS.length - 1))];
        return result;
    };

    var calculateUserAge = function() {
        var birth_date = new Date($localStorage.user.profile.birth_date);
        var ageDifMs = Date.now() - birth_date.getTime();
        var ageDate = new Date(ageDifMs);
        $localStorage.user.profile.age = Math.abs(ageDate.getUTCFullYear() - 1970);
    };

    API.uploadImage = function(imageData) {
        var deferrer = $q.defer();

        var boundary = '-------314159265358979323846', delimiter = "\r\n--" + boundary + "\r\n", close_delim = "\r\n--" + boundary + "--";
        var contentType = imageData.split(",")[0].split(":")[1].split(";")[0];
        var imageBase64 = imageData.split(",")[1];
        var PATH = 'user/images/';
        var metadata = { name: PATH + getRandomString(), mimeType: contentType };
        var multipartRequestBody = delimiter + 'Content-Type: application/json\r\n\r\n' + angular.toJson(metadata) + delimiter + 'Content-Type: ' + contentType + '\r\n' + 'Content-Transfer-Encoding: base64\r\n' + '\r\n' + imageBase64 + close_delim;
        var API_VERSION = 'v1';
        var BUCKET = 'jobhopapp.appspot.com';

        var request = $window.gapi.client.request({ 'path': '/upload/storage/' + API_VERSION + '/b/' + BUCKET + '/o', 'method': 'POST', 'params': {'uploadType': 'multipart'}, 'headers': { 'Content-Type': 'multipart/mixed; boundary="' + boundary + '"' }, 'body': multipartRequestBody });

        request.execute(function(results) {
            deferrer.resolve('https://storage.googleapis.com/jobhopapp.appspot.com/' + results.name);
        }, function() {
            deferrer.reject();
        });

        return deferrer.promise;
    }

    API.uploadVideo = function(videoData) {
        var fileName = 'user/videos/' + getRandomString();
        var ROOT_URL = 'https://www.googleapis.com/';
        var SERVICE_PATH = 'storage/v1';
        var BUCKET_NAME = 'jobhopapp.appspot.com';
        var URI_TEMPLATE = 'upload/' + SERVICE_PATH + '/b/' + BUCKET_NAME + '/o?uploadType=media&name=' + fileName;
        return $cordovaFileTransfer.upload(ROOT_URL + URI_TEMPLATE, videoData.fullPath, {
            mimeType: videoData.type,
            fileName: fileName,
            headers: {
                'Accept-Encoding': 'gzip',
                'Content-Type': videoData.type,
                'Content-Length': videoData.size
            }
        }).then(function(results) {
            var videoUri = 'https://storage.googleapis.com/jobhopapp.appspot.com/' + angular.fromJson(results.response).name;
            return videoUri;
        });
    }

    API.getCurrentUserProfile = function() {
        var message = {
            base_message: $localStorage.user.baseMessage
        };
        return GApi.execute('jobhopApi', 'user.get_current_user_profile', message).then(function(currentUserProfileData) {
            delete currentUserProfileData.result;
            return currentUserProfileData;
        });
    };

    API.getCurrentUserProfileKey = function() {
        var message = {
			base_message: $localStorage.user.baseMessage
		};
        return GApi.execute('jobhopApi', 'user.get_current_user_profile_key', message);
    };

    API.createUserProfile = function(profileData) {
        var message = {
			base_message: $localStorage.user.baseMessage
		};
        angular.extend(message, profileData);
        return GApi.execute('jobhopApi', 'user.create_user_profile', message).then(function(userProfileCreateData) {
            delete userProfileCreateData.result;
            $localStorage.user.profile = profileData;
            $localStorage.user.profile.id = userProfileCreateData.urlsafe_key
            calculateUserAge();
        });
    };

    API.editUserProfile = function(profileData) {
        var message = {
			base_message: $localStorage.user.baseMessage,
            user_message: profileData,
            user_urlsafe_key: profileData.id
		};
        return GApi.execute('jobhopApi', 'user.update_user', message).then(function() {
            $localStorage.user.profile = profileData;
            $localStorage.user.profile.id = profileData.id
            calculateUserAge();
        });
    };

    API.updateProfileVideo = function(videoUri) {
        var message = {
			base_message: $localStorage.user.baseMessage,
            user_urlsafe_key: $localStorage.user.profile.id,
            video_uri: videoUri
		};
        return GApi.execute('jobhopApi', 'user.update_user_video_profile', message).then(function() {
            $localStorage.user.profile.profile_video_uri = videoUri;
        });
    };

    API.login = function(method, loginData, isRegisterCallback) {
        var message = {
			auth_type: method,
            identifier: loginData.identifier,
			secret: loginData.secret
		};
        var loginExecute = GApi.execute('jobhopApi', 'signin.sign_in', message);
        if(!angular.isUndefined(isRegisterCallback) && isRegisterCallback) {
            return loginExecute.then(function(loginApiData) {
                $localStorage.user.baseMessage = {
                    auth_type: method,
                    auth_id: loginApiData.auth_id,
                    token: loginApiData.token
                };
            });
        } else {
            return loginExecute.then(function(loginApiData) {
                $localStorage.user.account_key = loginApiData.account_key;
                // window.plugins.appsFlyer.setAppUserId($localStorage.user.account_key);
                $localStorage.user.baseMessage = {
                    auth_type: method,
                    auth_id: loginApiData.auth_id,
                    token: loginApiData.token
                };
                if(angular.isUndefined(loginApiData.complete_user_message)) {
                    return false;
                }
                return API.getCurrentUserProfile().then(function(currentUserProfileData) {
                    return API.getCurrentUserProfileKey().then(function(currentUserProfileKey) {
                        $localStorage.user.profile = currentUserProfileData;
                        $localStorage.user.profile.id = currentUserProfileKey.urlsafe_key;
                        $localStorage.user.logged = true;
                        calculateUserAge();
                        return true;
                    }, function(error) {
                        $localStorage.user.baseMessage = {};
                        return error;
                    });
                }, function(error) {
                    $localStorage.user.baseMessage = {};
                    return error;
                });
            });
        }
    };

    API.register = function(method, registerData) {
        var message = {
			auth_type: method,
			identifier: registerData.identifier,
			secret: registerData.secret
		};
		/* return GApi.execute('jobhopApi', 'signin.sign_up', message).then(function() {
        return API.login(method, {
			identifier: registerData.identifier,
			secret: registerData.secret
		}, true).then(function() { */
            var profileData = {};
            angular.extend(profileData, registerData);
            return API.createUserProfile(profileData).then(function() {
                $localStorage.user.logged = true;
                $localStorage.user = $localStorage.user;
            });
        /* });
        }); */
    };

    API.logout = function() {
        $localStorage.user = {
            profile: {},
            baseMessage: {},
            logged: false
        };
        return $cordovaFacebook.logout();
    };

    API.getFeed = function(nextCurs, filterMessage, fetchMyJobs) {
        var message = {
            njobs: JobsPerPage,
            fetch_type: 'GENERAL',
            filter_message: {}
        };
        if(!angular.isUndefined(fetchMyJobs) && fetchMyJobs) {
            message.fetch_type = 'ACCOUNT_EMPLOYMENT';
        }
        if(!angular.isUndefined(nextCurs) && nextCurs) {
            message.curs = nextCurs;
        }
        if(!angular.isUndefined(filterMessage) && filterMessage) {
            message.filter_message = filterMessage;
        }
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'feed.fetch', message).then(function(jobsData) {
			var feed = {
				nextCurs: jobsData.next_curs,
				jobs: []
			};
			angular.forEach(jobsData.feed_entries, function(job, index) {
				var tempId = job.urlsafe_key;
				job.id = tempId;
				delete tempId;
				delete job.urlsafe_key;
                if(!angular.isUndefined(filterMessage.geo_point_lat) && !angular.isUndefined(filterMessage.geo_point_lon) && !angular.isUndefined(job.employer_address_lat) && !angular.isUndefined(job.employer_address_lon)) {
                    job.distance = API.getDistanceFromJob(filterMessage, job);
                } else {
                    job.distance = -1;
                }
				feed.jobs.push(job);
			});
			return feed;
		});
    };

    var toRad = function(number) {
        return number * Math.PI / 180;
    };

    API.getDistanceFromJob = function(myGeoPoints, jobGeoPoints) {
        var lat2 = myGeoPoints.geo_point_lat;
        var lon2 = myGeoPoints.geo_point_lon;
        var lat1 = jobGeoPoints.employer_address_lat;
        var lon1 = jobGeoPoints.employer_address_lon;

        var R = 6371;
        var x1 = lat2-lat1;
        var dLat = toRad(x1);
        var x2 = lon2-lon1;
        var dLon = toRad(x2);
        var a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                        Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
                        Math.sin(dLon/2) * Math.sin(dLon/2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
        var d = R * c;
        d = Math.round(d * 10) / 10;
        return d;
    };

    API.jobIsExist = function(jobId) {
        var message = {
            urlsafe_key: jobId
        };
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'job.get_job', message);
    };

    API.getJob = function(jobId) {
        var message = {
            urlsafe_key: jobId
        };
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'job.get_complete_job', message).then(function(jobData) {
            var completeEmployerMessage = jobData.complete_employer_message;
            var completeJobMessage = jobData;

            var employer = {};
            employer.id = completeEmployerMessage.employer_urlsafe_key;
            angular.extend(employer, completeEmployerMessage.employer_message);

            var job = {};
            job.id = completeJobMessage.job_urlsafe_key;
            angular.extend(job, completeJobMessage.job_message);
            angular.forEach([
                {
                    label: 'משמרות',
                    value: 'SHIFTS'
                },
                {
                    label: 'משרה חלקית',
                    value: 'PART_TIME'
                },
                {
                    label: 'משרה מלאה',
                    value: 'FULL_TIME'
                }
            ], function(type) {
                if(type.value == job.type) {
                    job.type = type.label;
                }
            });

            var employee = {};
            if(!angular.isUndefined(completeJobMessage.employee_message)) {
                employee.id = completeJobMessage.employee_message.employment_urlsafe_key;
                employee.status = completeJobMessage.employee_message.status;
            }

            return {
                employer: employer,
                job: job,
                employee: employee
            };
        });
    };

    API.getEmployer = function(employerId) {
        var message = {
            urlsafe_key: employerId
        };
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'employer.get_complete_employer', message).then(function(completeEmployerMessage) {
            var employer = {};
            employer.id = completeEmployerMessage.employer_urlsafe_key;
            angular.extend(employer, completeEmployerMessage.employer_message);
            return employer;
        });
    };

    API.getEmployment = function(employmentId) {
        var message = {
            urlsafe_key: employmentId
        };
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'employee.get_employee', message).then(function(completeEmploymentMessage) {
            var employment = {
                id: completeEmploymentMessage.urlsafe_key,
                statu: completeEmploymentMessage.status
            };
            return employment;
        });
    };

    API.applyJob = function(jobId) {
        var message = {
            urlsafe_key: jobId
        };
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'job.apply_to_job', message);
    };

    API.applyJobWithVideo = function(jobId, videoUri) {
        var message = {
            job_key: jobId,
            video_message: {
                type: 'PROFILE_VIDEO'
            }
        };
        if(!angular.isUndefined(videoUri)) {
            message.video_message = {
                type: 'NEW_VIDEO',
                uri: videoUri
            }
        }
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'job.apply_to_job_with_video', message);
    };

    API.finalApplyJob = function(employeeId) {
        var message = {
            urlsafe_key: employeeId
        };
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'job.final_approve_job', message);
    };

    API.resignFromJob = function(employeeId) {
        var message = {
            urlsafe_key: employeeId
        };
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'job.resign_from_job', message);
    };

    API.cancelApplicationJob = function(jobId) {
        var message = {
            urlsafe_key: jobId
        };
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'job.cancel_application', message);
    };

    API.likeJob = function(jobId) {
        var message = {
            urlsafe_key: jobId
        };
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'job.add_to_my_jobs', message);
    };

    API.dislikeJob = function(jobId) {
        var message = {
            urlsafe_key: jobId
        };
        if($localStorage.user.logged) {
            message.base_message = $localStorage.user.baseMessage;
        }
        return GApi.execute('jobhopApi', 'job.remove_from_my_jobs', message);
    };

    return API;
};
