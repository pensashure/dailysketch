var Utils = function(globalLogger, settings) {
    
    // *** PRIVATE *** 
    var logger = globalLogger;
    var uuid = '';

    var _log = function(data) {
        if (_config.debug) {
            logger.log(data);
        }
    }

    var setUUID = function(id) {
        uuid = id;
        _log(uuid);
    }

    var _config = {
            debug : false
        };
    $.extend( _config, settings );

    // *** PUBLIC ***
    return {

        toast: function(messageString) {
            _log(messageString);
            new $.nd2Toast({
                message : messageString,
                ttl : 1000
            });
        },

        getUUID: function() {
            window.plugins.uniqueDeviceID.get(setUUID, _log);
        }
    }
};
// ALERT: global variable as it is in global scope
var myUtils = new Utils({debug:false});
