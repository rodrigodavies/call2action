(function (){
    $('#toggleBoxes').click(function() {
		//close blocks
		$(this).addClass('open');
		$('#toggleBlocks').removeClass('open');
		$('#blocks').fadeOut();
		$('#boxes').fadeIn('fast');

	});

	$('#toggleBlocks').click(function() {
	//close boxes
	$(this).addClass('open');
	$('#toggleBoxes').removeClass('open');
	$('#boxes').fadeOut('fast');
	$('#blocks').fadeIn('fast');
	});
});