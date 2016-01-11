Parse.Cloud.useMasterKey();
var Config = {
	'pushType': 'gcm',
	'appName': 'Pri-sale',
	'GCMSenderId': '633301545419',
	'appIdentifier': 'com.ionicframework.prisale20565',
	'parseVersion': '1.10.3',
	'appVersion': '0.0.1',
	'localeIdentifier': 'he_IL',
	'badge': 0,
	'parseAppId': 'mZDlpzWNmOc9ZWGuxWTZAgl2UcorL2JxwdB6RG48'
};

// Jobs
Parse.Cloud.job('priceStatus', function(request, response) {

	var SingleInstQuery = new Parse.Query(Parse.Installation).equalTo('objectId', 'inugDHH0Dd');
	Parse.Push.send({
		where: SingleInstQuery,
		data: {
			title: 'Prisale update:',
			alert: 'ניסוי2'
		}
	}, {
		success: function(a) {
			console.log('---');
			console.log(a);
			console.log('---');
			response.success('Success with push to:yaniv');
		},
		error: function(error) {
			response.error(error.message);
		}
	});


	return;
	var page = 0;
	var date = (new Date()).toISOString().split('T')[0];
	var ProductsRequest = new Parse.Promise;
	var Products = [];
	makeRequest(page, date);
	function makeRequest(page, date) {
		var requestURL = "http://62.219.7.38/api/Public?pwd=ck32HGDESf13ekcs&name=&item_type=&order=&date="+date+"&page="+page;
		Parse.Cloud.httpRequest({
			'url': requestURL
		}).then(function(httpResponse) {
			var jsonResponse = JSON.parse(httpResponse.text);
			if(jsonResponse.length < 50) {
				Products = Products.concat(jsonResponse);
				ProductsRequest.resolve(Products);
			} else {
				Products = Products.concat(jsonResponse);
				makeRequest(++page, date);
			}
		}, function(httpResponse) {
			ProductsRequest.reject(httpResponse.status);
		});
	}
	ProductsRequest.then(function(APIProducts) {
		// Notice that response success must emit a string(use toString) take a look here: http://stackoverflow.com/questions/32583128/parse-job-status-message-must-be-a-string
		var OrginizedAPIProducts = {};
		for(var j = 0; j<APIProducts.length;++j) {
			var percentChange = null;
			if(Products[j].primeQuality && Products[j].primeQuality.agriculture) percentChange = Products[j].primeQuality.agriculture.percentChange;
			OrginizedAPIProducts[APIProducts[j].id] = {
				'name': APIProducts[j].name,
				'percentChange': percentChange
			}
		}
		// Create query for all AllProducts
		var ProductsQuery = new Parse.Query(Parse.Object.extend("product_notify"));
		// Include InstallID pointer in query
		ProductsQuery.include("InstallID");
		ProductsQuery.find({
			success: function(products) {
				var groupedByInstIds = [];
				var insertedInstallatioIds = [];
				for (var i = 0; i<products.length; ++i) {
					// In case for some odd reason there isn't an installation reference(pointer).
					if(!products[i].get('InstallID')) continue;
					var insertedIndex = insertedInstallatioIds.indexOf(products[i].get('InstallID').id);
					if(insertedIndex > -1) {
						groupedByInstIds[insertedIndex].productsIds.push(products[i].get('productID'));
						groupedByInstIds[insertedIndex].precentagesLimit.push(products[i].get('percent'));
					} else {
						groupedByInstIds.push({
							'inst': products[i].get('InstallID'),
							'productsIds': [products[i].get('productID')],
							'precentagesLimit': [products[i].get('percent')]
						});
						insertedInstallatioIds.push(products[i].get('InstallID').id);
					}
				}
				for(var t = 0; t<groupedByInstIds.length;++t) {
					groupedByInstIds[t].items = [];
					for(var h = 0; h<groupedByInstIds[t].productsIds.length;++h) {
						var item = OrginizedAPIProducts[groupedByInstIds[t].productsIds[h]];
						var percentagesLimit = groupedByInstIds[t].precentagesLimit[h];
						if(item) {
							// Is the percentages change ok with the limit defined by the user.
							if(item.percentChange>=percentagesLimit) {
								groupedByInstIds[t].items.push(item);
							}
						}
					}
					if (groupedByInstIds[t].items.length > 0) {
						var SingleInstQuery = new Parse.Query(Parse.Installation).equalTo('objectId', groupedByInstIds[t].inst.id);
						Parse.Push.send({
							where: SingleInstQuery,
							data: {
								title: 'Prisale update:',
								alert: (function(items) {
									// The following assignment assumes the percentChange is positive/negative/neither of them(0)
									var message = '';
									for(var b = 0; b < items.length;++b) {
										var upDownSame = (function(item) {
											if(item.percentChange > 0) {
												return ' עלה ב ';
											} else if(item.percentChange < 0) {
												return ' ירד ב ';
											} else {
												return ' נשאר על ';
											}
										})(items[b]);
										message+='מחיר ' + items[b].name + upDownSame + Math.abs(items[b].percentChange) + '%';
										// Not last iteration
										if(b < (items.length-1)) {
											message+=', ';
										}
									}
									response.success(message);
									return message;
								})(groupedByInstIds[t].items)
							}
						}, {
							success: function() {
								response.success('Success with push to: ' + channels);
							},
							error: function(error) {
								response.error(error.message);
							}
						});
					} else {
						response.success('Installation wasn\'t registered with items');
					}
				}
				if(groupedByInstIds.length === 0) response.success('No push notifications required');
			},
			error: function(products, error) {
				console.error(error);
				response.error(error);
			}
		});
	}, function(error) {
		console.error(error);
		response.error(error);
	});
});


// Runables
Parse.Cloud.define("Install", function(request, response) {
	// Following are defined by: https://parse.com/docs/js/guide#push-notifications-installations
	// "ios", "android", "etc"...
	var deviceType = request.params.deviceType;
	var instId = request.params.instId;
	var deviceToken = request.params.deviceToken;
	if(!instId) {
		response.error('Missing parameter: instId');
		return;
	}
	if(!deviceType) {
		response.error("Missing parameter: deviceType")
		return;
	}
	if(!deviceToken) {
		response.error('Missing parameter: deviceToken');
		return;
	}
	var installation = new Parse.Object("_Installation");
	installation.set('localeIdentifier', Config.localeIdentifier);
	installation.set("deviceType", deviceType);
	installation.set('installationId', instId);
	if(deviceType !== 'ios') {
		installation.set('GCMSenderId', Config.GCMSenderId);
		installation.set("pushType", Config.pushType);
	}
	installation.set('appIdentifier', Config.appIdentifier);
	installation.set("deviceToken", deviceToken);
	installation.set("appName", Config.appName);
	installation.set('badge', Config.badge);
	installation.set("appVersion", Config.appVersion);
	installation.set("parseVersion", Config.parseVersion);
	installation.set("appId", Config.parseAppId);
	installation.save(null, {
		success: function(result) {
			response.success("Installation created.");
		},
		error: function(error) {
			console.error(error);
			response.error("Installation creation failed.");
		}
	});
});
