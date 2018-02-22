$('document').ready(function() {
	$('.remove').on('click', function(e) {
		e.preventDefault();
		var toRemove = $(this);
		var url = toRemove.attr('href');

		$.ajax({
			method: 'delete',
			url: url
		}).done(function(data) {
			console.log(data);
		});
		window.location.reload(true);
	});

	$('.delete').on('click', function(e) {
		e.preventDefault();
		var toRemove = $(this);
		var url = toRemove.attr('href');

		$.ajax({
			method: 'delete',
			url: url
		}).done(function(data) {
			console.log(data);
		});
		window.location.reload(true);
	});

	$('.unfavorite').on('click', function(e) {
		e.preventDefault();
		var toRemove = $(this);
		var url = toRemove.attr('href');

		$.ajax({
			method: 'delete',
			url: url
		}).done(function(data) {
			console.log(data);
		});
		window.location.reload(true);
	});

	$('.put').on('submit', function(e) {
    e.preventDefault();
    var element = $(this);
    var url = element.attr('action');
    var formData = element.serialize();
    $.ajax({
        method: 'put',
        url: url,
        data: formData
    }).done(function(data) {
        console.log(data);
    });
    window.location.reload(true);
	});

	function sortUL(selector) {
		var $ul = $(selector);
		$ul.find('li').sort(function (a, b) {
		    var upA = $(a).text().toUpperCase();
		    var upB = $(b).text().toUpperCase();
		    return (upA < upB) ? -1 : (upA > upB) ? 1 : 0;
		}).appendTo(selector);
	};

	sortUL("#userList");

	sortUL("#favList");

	sortUL("#browse");
})