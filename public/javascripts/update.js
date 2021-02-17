$(document).ready(function() {
	
	if (!person) {
		console.log("yeah");
	}

	// place current values in form
	$('#prefix').val(person[0].prefix);
	$('#firstName').val(person[0].firstName);
	$('#lastName').val(person[0].lastName);
	$('#street').val(person[0].street);
	$('#city').val(person[0].city);
	$('#city').val(person[0].city);// state?
	$('#zip').val(person[0].zip);
	$('#phone').val(person[0].phone);
	$('#email').val(person[0].email);
	$('#contactMail').prop('checked', person[0].contactMail);
	$('#contactPhone').prop('checked', person[0].contactPhone);
	$('#contactEmail').prop('checked', person[0].contactEmail);
	$('#id').val(person[0]._id);
	

});