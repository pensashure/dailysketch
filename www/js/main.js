$(document).ready(function(){
    //prepareRestOfPages();
    prepareOnPageShow();

    // Login form validation
    $( "#loginForm" ).validate({
        rules: {
            loginEmail: {
                required: true,
                email: true
            },
            loginPasswd: {
                required: true,
                maxlength:10,
                minlength:6
            }
        },
        errorPlacement: function( error, element ) {
            error.appendTo( $('#' + element.attr('name') + '-error' ));
        }
    });

    $(document).on('submit', '#loginForm', function(e) {
        e.preventDefault();
        postLoginForm();
    });

    if (mySession.isLoggedIn()) {
        $('#loginContent').css('display', 'none');
        $('#workingContent').css('display', 'block');
    }
    myFooterBar.setForPage('#home');
    $(document).on('click', '#logoutButton', function(e){
        myLogger.log("click on logoutButton");
        mySession.logout();
        myUtils.toast('Logout done!');
        myFooterBar.setForPage('#home');
        $('#loginContent').css('display', '');
        $('#workingContent').css('display', 'none');
    });
});

/*function prepareRestOfPages() {

    $(document).delegate('#home', 'pageinit', function() {
        myLogger.log("pageinit-home");
    });
}*/


function prepareOnPageShow() {
    $( document ).delegate("#home", "pageshow", function() {
        myLogger.log("pageshow-home");
        if (mySession.isLoggedIn()) {
            $('#loginContent').css('display', 'none');
            $('#workingContent').css('display', 'block');
        } else {
            $('#loginContent').css('display', 'block');
            $('#workingContent').css('display', 'none');
        }
        myFooterBar.setForPage('#home');
    });
    $( document ).delegate("#register", "pageshow", function() {
        myLogger.log("pageshow-register");
        myFooterBar.setForPage('#register');
    });
    $( document ).delegate("#lostpwd", "pageshow", function() {
        myLogger.log("pageshow-lostpwd");
        myFooterBar.setForPage('#lostpwd');
    });
    $( document ).delegate("#about", "pageshow", function() {
        myLogger.log("pageshow-about");
        myFooterBar.setForPage('#about');
    });
}

function postLoginForm() {
    $('#loginEmail-error').text('');
    $('#loginPasswd-error').text('');
    $.ajax({
        type: $('#loginForm').attr('method'),
        url: window.myConfiguration.getApiServer() + $('#loginForm').attr('action'),
        data: $('#loginForm').serialize(),
        dataType: 'json',
        async: false,
        success: function(response) {
            proceedToLogin(response);
        },
        error: function (xhr, ajaxOptions, thrownError) {
            window.myLogger.log("DailySketch Error: " + xhr.status + "\n" +
                "Message: " + xhr.statusText + "\n" +
                "Response: " + xhr.responseText + "\n" + thrownError);
            proceedToLogin('');
        }
    });
}

function proceedToLogin(response) {
    var messageString = 'Login successful!';
    if (response != '' && response.result != 'OK') {
        myLogger.log(response);
        messageString = 'An error was occurred. Retry later and contact us if error persists.';
    } else {
        mySession.login(response.data);
        myFooterBar.setForPage('#home');
        $('#loginContent').css('display', 'none');
        $('#workingContent').css('display', 'block');
    }
    myUtils.toast(messageString);
}
