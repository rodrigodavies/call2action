/*
 * constructor representing block
 * @id -> id of element on canvas
 * @posX,@posY -> position of block
 * @_fields -> input fields in the block
 * @type -> type of block (ie. welcome, hangup, redirect)
 */
var Block = function(id, posX, posY, args, type){
	this.id = id;
	this.name = null;
	this.type = type;
	this.position = {x: posX, y:posY};
	this.args = new Array();
	this.beforeBlock = null;
	this.afterBlock = null;
	for (var i=0; i<args.length; i++){
		this.args.push(args[i]);
	}
	console.log(JSON.stringify(this));
	blocklistener = new blockListener(this);

	//register view listener

}
Block.prototype.getId = function(){
	return this.id;
}

Block.prototype.getType = function(){
	return this.type;
}

Block.prototype.updateName = function(text){
	this.name = text;
}

Block.prototype.setBeforeBlock = function(block){
	this.beforeBlock = block;
	console.log(JSON.stringify(this));
}

Block.prototype.setAfterBlock = function(block){
	this.afterBlock = block;
	console.log(JSON.stringify(this));
}

Block.prototype.updatePosition = function(x,y){
	this.position.x = x;
	this.position.y = y;
	console.log(JSON.stringify(this));
}


// Block.prototype.setField = function(field, input){
// 	if(field in this.fields ){
// 		this.fields[field] = input;

// 	}
// 	console.log(JSON.stringify(this));
// }

var menu = function() {
    Block.apply(this, arguments);
    this.afterBlocks = {};
   
}
menu.prototype = Object.create(Block.prototype);
$.extend(menu.prototype, {
    addOption: function(number, block) {
        this.afterBlocks[number] = block;
        console.log(JSON.stringify(this));
    },
    removeOption: function(number, child) {
        this.afterBlocks[number] = null;
        console.log(JSON.stringify(this));
    }
});

var blockCollection = function(id, posX, posY, blocks, type){
	this.id = id;
	this.name = null;
	this.type = type;
	this.position = {x: posX, y:posY};
	this.blocks = blocks;

}






