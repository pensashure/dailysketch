var FooterBar = function(globalLogger, settings) {
    
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

        log: function(message) {
            _log(message);
        },
        setForPage: function(targetPage) {
            _log("showHideButtonsFor function for page " + targetPage);
            if (mySession.isLoggedIn()) {
                $(targetPage + ' .timelineButton').removeClass('ui-disabled');
                $(targetPage + ' .newsButton').removeClass('ui-disabled');
            } else {
                $(targetPage + ' .timelineButton').addClass('ui-disabled');
                $(targetPage + ' .newsButton').addClass('ui-disabled');
            }
        }
    }
};
// ALERT: global variable as it is in global scope
var myFooterBar = new FooterBar(myLogger, {debug:false});
