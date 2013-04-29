var sidebar = function(name){

	this.name_ = name ? name : "";
	this.blocks = new Array();

	
}

sidebar.prototype.addBlock = function(block){
	this.blocks.push(block);
}

sidebar.prototype.addBlocks = function(blocks){
	for (block in blocks){
		this.blocks.push(block);
	}
}