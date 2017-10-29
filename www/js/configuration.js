var Configuration = function(settings) {
    
    // *** PRIVATE *** 
    var _log = function(data) {
        if (_config.debug) {
            console.log(data);
        }
    }

    var _config = {
            debug : false,
            apiServer : "http://localhost/dailysketchServer"
        };
    $.extend( _config, settings );
    _log(_config);

    // *** PUBLIC ***
    return {

        getApiServer: function() {
            
            _log("getApiServer function");
            return _config.apiServer;
        },

        isDebug: function() {
            return _config.debug;
        }
    }
};
// ALERT: global variable as it is in global scope
var myConfiguration = new Configuration({callback:'http://localhost/dailysketchServer', debug:false});
