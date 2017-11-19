var Utils = function(globalLogger, settings) {
    
    // *** PRIVATE *** 
    var logger = globalLogger;

    var _log = function(data) {
        if (_config.debug) {
            logger.log(data);
        }
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
        }
    }
};
// ALERT: global variable as it is in global scope
var myUtils = new Utils({debug:false});
