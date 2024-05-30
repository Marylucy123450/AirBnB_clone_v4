$('document').ready(function () {
	let amenities = {};
	$('input[type="checkbox"]').change(function () {
	  if ($(this).is(':checked')) {
		amenities[$(this).attr('data-id')] = $(this).attr('data-name');
	  } else {
		delete amenities[$(this).attr('data-id')];
	  }
	  $('.amenities h4').text(Object.values(amenities).join(', '));
	});
  });
