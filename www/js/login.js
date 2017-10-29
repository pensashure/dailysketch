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

	function postLoginForm() {
		$('#loginEmail-error').text('');
		$('#loginPasswd-error').text('');
		$.ajax({
			type: $('#loginForm').attr('method'),
			url: window.myConfiguration.getApiServer() + $('#loginForm').attr('action'),
			data: $('#loginForm').serialize(),
			dataType: 'json',
			async: false,
			success: function(data) {
				proceedToLogin(data);
			},
			error: function (xhr, ajaxOptions, thrownError) {
				window.myLogger.log("DailySketch Error: " + xhr.status + "\n" +
					"Message: " + xhr.statusText + "\n" +
					"Response: " + xhr.responseText + "\n" + thrownError);
				/*new $.nd2Toast({
					message : "Request could not be attended. Ensure you are connected. If error persists, contact us.",
					ttl : 3000
                });*/
                proceedToLogin('');
			}
		});
    }
    
    function proceedToLogin(data) {
        var messageString = 'Login successful!';
        if (data != '' && data.result != 'OK') {
            window.myLogger.log(data);
            messageString = 'An error was occurred. Retry later and contact us if error persists.';
        } else {
            $('#loginContent').hide();
            $('#workingContent').show();
            $('#timelineButton div a').removeClass('ui-disabled');
            $('#newsButton div a').removeClass('ui-disabled');
            $('#loginButton div a img').attr('src', 'img/logout-sketch.png');
            $('#loginButton').on('click', function(e) {
                alert("Logout");
                $('#loginButton div a img').attr('src', 'img/login-sketch.png');
                $('#loginContent').show();
                $('#workingContent').hide();
                toastMessage('Logout done!');
            });
        }
        toastMessage(messageString);
    }

    function toastMessage(messageString) {
        new $.nd2Toast({
            message : messageString,
            ttl : 4000
          });
    }
});