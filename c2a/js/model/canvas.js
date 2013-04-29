/**
 * workspace represents the state of the canvas, where users can drag and connect boxes.
 **/
var workspace = function(id){
    this.id = id;
    this.blocks = [];
    this.title = null;

    workspaceListener = new workspaceListener(this);
}

workspace.prototype.getId = function(){
    return this.id;
}

workspace.prototype.getCount = function(){
    return this.blocks.length;
}





/**
 *Adds a new block to the workspace
 */
workspace.prototype.add = function(block){
    this.blocks.push(block);
}

/*
 *Removes a block from the workspace
 */
workspace.prototype.remove = function(blockId){
    //search for and remove from list
    for(var i=0; i<this.blocks; i++){
        if(block == this.blocks[i].getId()){
            this.blocks.splice(i,1);
            break;
        }
    }

}
/**
 * Returns the block if it is in the workspace. Returns null otherwise.
 */
workspace.prototype.getBlock = function(blockId){
    for(var i=0; i<this.blocks; i++){
        if(block == this.blocks[i].getId()){
            return this.blocks[i];
        }
    }
    return null;
}

/**
 *Saves the current workspace......some stuff here i suppose
 */
workspace.prototype.save = function(){
    console.log(JSON.stringify(this));


      //   //create xml file
      //   $('.save').click(function(){
      //    var elements = $('.added');
      //    var file = '<?xml version="1.0"?>\n<flowchart>\n';
            // for(var i = 0; i<elements.length; i++){
            //  var block = $(elements[i]);
            //  var id=block.attr('id');
            //  var shape = block.attr('box');
            //  var left = block.css('left');
            //  var top = block.css('top');
            //  var text = block.text();
            //  var newStuff = ' <block id="'+id+'" box="'+shape+'">\n  <text>'
            //      +text+'</text>\n  <position top="'+top+'" '
            //      +'left="'+left+'">\n </block>\n';
            //  file = file.concat(newStuff);
            //  //console.log(file);
            // }
            // file = file.concat('</flowchart>');
            // $('#dialog').text(file);
            // $( '#dialog' ).dialog({modal:true, height: 'auto', minWidth: 400});
      //   });
}
/**
 *Clears the workspace and removes all blocks
 */
workspace.prototype.clear = function() {
    this.blocks = [];
    
    
}
workspace.prototype.addBlock = function(block_id, type, posX, posY){
    var newBlock = new block(block_id, posX, posY, [], type);
    //TODO: something about arguments/fields
    this.add(newBlock);
}

workspace.prototype.handleBlockEvent = function(blockEvent){
    var type = blockEvent.type;
    var details = blockEvent.details;
    switch(type){
        case "connection":
            sourceBlock = 
    }
}


/**
 *returns the workspace to JSON
 */
workspace.prototype.toScript = function(){
    
}
