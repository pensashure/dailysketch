$(document).ready(function() {
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
        switchMainScreen();
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
            window.myLogger.log(response);
            messageString = 'An error was occurred. Retry later and contact us if error persists.';
        } else {
            mySession.setLogIn(response.data);
            switchMainScreen();
        }
        toastMessage(messageString);
    }

    function switchMainScreen() {
        $('#loginContent').hide();
        $('#workingContent').css('display', 'block');
        $('#timelineButton div a').removeClass('ui-disabled');
        $('#newsButton div a').removeClass('ui-disabled');
        $('#loginButton').hide();
        $('#logoutButton').show();
    }

    function toastMessage(messageString) {
        new $.nd2Toast({
            message : messageString,
            ttl : 4000
          });
    }
});