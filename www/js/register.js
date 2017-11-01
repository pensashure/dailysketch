$(document).ready(function() {
	$( "#registerForm" ).validate({
		rules: {
			registerEmail: {
				required: true,
				email: true
			},
			registerPasswd: {
				required: true,
				maxlength:10,
				minlength:6
			},
			registerRepasswd: {
				required: true,
				equalTo: '#registerPasswd'
			}
		},
		errorPlacement: function( error, element ) {
			error.appendTo( $('#' + element.attr('name') + '-error' ));
		}
	});
	
	$(document).on('submit', '#registerForm', function(e) {
		e.preventDefault();
		postRegisterForm();
	});

	function postRegisterForm() {
		$('#registerEmail-error').text('');
		$('#registerPasswd-error').text('');
		$('#registerRepasswd-error').text('');
		$.ajax({
			type: $('#registerForm').attr('method'),
			url: window.myConfiguration.getApiServer() + $('#registerForm').attr('action'),
			data: $('#registerForm').serialize(),
			dataType: 'json',
			async: false,
			success: function(response) {
				var messageString = 'We sent you an email. Check it to confirm registration!';
				if (response.result != 'OK') {
					window.myLogger.log(response);
					messageString = 'An error was occurred. Retry later and contact us if error persists.';
				}
				new $.nd2Toast({
					message : messageString,
					ttl : 3000
			  	});
			},
			error: function (xhr, ajaxOptions, thrownError) {
				window.myLogger.log("DailySketch Error: " + xhr.status + "\n" +
					"Message: " + xhr.statusText + "\n" +
					"Response: " + xhr.responseText + "\n" + thrownError);
				new $.nd2Toast({
					message : "Request could not be attended. Ensure you are connected. If error persists, contact us.",
					ttl : 3000
				});
			}
		});
	}
});
