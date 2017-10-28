$(document).ready(function() {
	alert("dins");
	$('form').on('submit', function(e) {
		
		//alert($(this).parent().attr('name'));
		/*var name = $("#name").val();
		var email = $("#email").val();
		if (name == '' || email == '') {*/
		e.preventDefault();
		alert("hola");
		//alert("Please Fill Required Fields");
		//}
	});

});