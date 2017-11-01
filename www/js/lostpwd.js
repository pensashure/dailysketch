$(document).ready(function() {
	$( "#lostpwdForm" ).validate({
		rules: {
			lostEmail: {
				required: true,
				email: true
			}
		},
		errorPlacement: function( error, element ) {
			error.appendTo( $('#' + element.attr('name') + '-error' ));
		}
	});
	
	$(document).on('submit', '#lostpwdForm', function(e) {
		e.preventDefault();
		postLostPwdForm();
	});

	function postLostPwdForm() {
		$('#lostEmail-error').text('');
		$.ajax({
			type: $('#lostpwdForm').attr('method'),
			url: window.myConfiguration.getApiServer() + $('#lostpwdForm').attr('action'),
			data: $('#lostpwdForm').serialize(),
			dataType: 'json',
			async: false,
			success: function(response) {
				var messageString = 'Credentials sent to your email!';
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
