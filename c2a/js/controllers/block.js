var blockListener = function(block){
	this.view = $('#'+block.getId());
	this.block = block;

	console.log(this.block);

	//view listener for drag stop events
	this.view.draggable({
		stop: function(event, ui){
			position = ui.position;
			block.updatePosition(position.left, position.top);
		}
	});
	//view listener for input fields
	this.view.find('.name').on('blur', function(e){
		block.updateName($(this).val());
	});

	this.view.find('.url').on('blur', function(e){
		block.setField('url', $(this).val());
	});

	

	

}

blockListener.prototype.updateBlock = function(event){

}