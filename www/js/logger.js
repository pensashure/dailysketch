var Logger = function(settings) {
    
    var START_TAG = '[';
    var END_TAG   = ']';
    var SEPARATOR_TAG = ' - ';
    var DASH = '-';

    // *** PRIVATE *** 
    var _log = function(message) {
        if (_config.debugToConsole) {
            console.log(_getLineTag() + SEPARATOR_TAG + message);
        }
    }
    var _getLineTag = function() {
        date = new Date();
        yearStr = date.getFullYear() + '';
        month = date.getMonth() + 1;
        monthStr = month + '';
        dayStr = date.getDate() + '';
        hourStr = date.getHours() + '';
        minutesStr = date.getMinutes() + '';
        secondsStr = date.getSeconds() + '';
        return START_TAG + yearStr + monthStr + dayStr + DASH + hourStr + minutesStr + secondsStr + END_TAG;
    }

    var _config = {
            debugToConsole : false
        };
    $.extend( _config, settings );

    // *** PUBLIC ***
    return {

        log: function(message) {
            _log(message);
        }
    }
};
// ALERT: global variable as it is in global scope
var myLogger = new Logger({debugToConsole:true});
