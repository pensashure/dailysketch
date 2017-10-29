var Logger = function(settings) {
    
    // *** PRIVATE *** 
    var _log = function(data) {
        if (_config.debugToConsole) {
            console.log(data);
        }
    }

    var _config = {
            debugToConsole : false
        };
    $.extend( _config, settings );
    _log(_config);

    // *** PUBLIC ***
    return {

        log: function(message) {
            _log(message);
        }
    }
};
// ALERT: global variable as it is in global scope
var myLogger = new Logger({debugToConsole:true});
