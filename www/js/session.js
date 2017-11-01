var Session = function(settings) {
    
    var sessionStorageName = 'dailySketchSession';

    // *** PRIVATE *** 
    var _log = function(data) {
        if (_config.debug) {
            console.log(data);
        }
    }
    var _saveInSession = function(dataObject) {
        // LocalStorage only supports saving strings. Serialization is an easy way to save objects.
        window.localStorage.setItem(sessionStorageName, JSON.stringify(dataObject));
        _log(_retrieveFromSession());
    }

    var _retrieveFromSession = function(storageName) {
        _log("_retrieveFromSession function");
        var retrievedObject = localStorage.getItem(storageName);
        _log(retrievedObject);
        return retrievedObject && JSON.parse(retrievedObject);
    }

    var _clearSession = function() {
        window.localStorage.removeItem(sessionStorageName);
    }

    var _config = {
            debug : false
        };
    $.extend( _config, settings );
    _log(_config);

    // *** PUBLIC ***
    return {

        setLogIn: function(sessionData) {
            _log("setLogIn function");
            sessionObject = {
                'loggedIn': 1,
                'data': sessionData
            };
            _saveInSession(sessionObject);
        },

        setLogOut: function() {
            _clearSession();
        },

        isLoggedIn: function() {
            var objectFromSession = _retrieveFromSession(sessionStorageName);
            var result = ((objectFromSession != null) && objectFromSession.loggedIn == 1);
            _log("isLoggedIn function: " + result);
            return result;
        },

        getData: function() {
            var objectFromSession = _retrieveFromSession(sessionStorageName);
            return objectFromSession && objectFromSession.data;
        },

        isDebug: function() {
            return _config.debug;
        }
    }
};
// ALERT: global variable as it is in global scope
var mySession = new Session({debug:true});

