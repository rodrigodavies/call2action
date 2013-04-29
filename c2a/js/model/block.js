/*
 * constructor representing block
 * @id -> id of element on canvas
 * @posX,@posY -> position of block
 * @_fields -> input fields in the block
 * @type -> type of block (ie. welcome, hangup, redirect)
 */
var block = function(id, posX, posY, _fields, type){
	this.id = id;
	this.name = null;
	this.type = type;
	this.position = {x: posX, y:posY};
	this.fields = {};
	this.beforeBlock = null;
	this.afterBlock = null;
	for (var i=0; i<_fields.length; i++){
		this.fields[_fields[i]] = null;
	}
	console.log(JSON.stringify(this));
	blocklistener = new blockListener(this);

	//register view listener

}
block.prototype.getId = function(){
	return this.id;
}

block.prototype.updateName = function(text){
	this.name = text;
}

block.prototype.setBeforeBlock = function(block){
	this.beforeBlock = block;
	console.log(JSON.stringify(this));
}

block.prototype.setAfterBlock = function(block){
	this.afterBlock = block;
	console.log(JSON.stringify(this));
}

block.prototype.updatePosition = function(x,y){
	this.position.x = x;
	this.position.y = y;
	console.log(JSON.stringify(this));
}


block.prototype.setField = function(field, input){
	if(field in this.fields ){
		this.fields[field] = input;

	}
	console.log(JSON.stringify(this));
}

var menu = function() {
    block.apply(this, arguments);
    this.afterBlocks = {};
   
}
menu.prototype = Object.create(block.prototype);
$.extend(menu.prototype, {
    addChild: function(number, block) {
        this.afterBlocks[number] = block;
        console.log(JSON.stringify(this));
    },
    removeChild: function(number, child) {
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




// var test = new menu(10, 10, ["inputfield"]);
// var child = new block(10, 15, ["inputfield"], 'audio');
// test.addChild(1, child);




