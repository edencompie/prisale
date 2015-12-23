angular.module('jobhop.services', [])
.factory('Installation', function() {
  return function() {
    console.log('Enter service');
    if(!window.localStorage.getItem('device_token')) {
      console.log('Passed flag');

      window.localStorage.setItem('device_token', true);
      Push.on('registration', function(data) {
        console.log('Registered');
        var deviceToken = data.registrationId;
        var platformType = device.platform;
        var instId = device.uuid; // Using the device uuid.
        function generateParseUUID(str) {
          var gen = '', i = 0;
          while(gen.length < 32) {
              gen += str[i];
              i++;
              if(i === str.length) i = 0;
          }
          var splitedGen = gen.split('');
          splitedGen.splice(8, 0, '-');
          splitedGen.splice(13, 0, '-');
          splitedGen.splice(18, 0, '-');
          splitedGen.splice(23, 0, '-');
          return splitedGen.join('');
        }
        var finalInstId = instId;
        // iOS return the parse-valid form of uuid, maybe other such as windows phones doing the same but I don't know(for now).
        if(device.platform !== 'iOS') {
          finalInstId = generateParseUUID(instId); // The original instId is not acceptable by parse.
        }
        // I use toLowerCase() because the platformType device.platform will produce upper cased names like: "Android" while parse accepts "android".
        Parse.Cloud.run('Install', { 'deviceToken': deviceToken, 'instId': finalInstId, 'deviceType': platformType.toLowerCase() }, {
            success: function(response) {
              console.log('Finish');
            },
            error: function(error) {
                console.error(error.message);
            }
        });
      });
    }
  }
});
