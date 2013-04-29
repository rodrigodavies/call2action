/**
 * workspace represents the state of the canvas, where users can drag and connect boxes.
 **/
var workspace = function(id){
    this.id = id;
    this.blocks = new Array();
    this.title = null;
    workspaceListener = new workspaceListener(this);
    this.allHandlers = new Array();

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
    console.log(this.blocks);
}

/*
 *Removes a block from the workspace
 */
workspace.prototype.remove = function(blockId){
    //search for and remove from list
    for(var i=0; i<this.blocks.length; i++){
        console.log(this.blocks[i].getId())
        if(blockId == this.blocks[i].getId()){
            delete this.blocks[i];
            this.blocks.splice(i,1);
            break;
        }
    }

}
/**
 * Returns the block if it is in the workspace. Returns null otherwise.
 */
workspace.prototype.getBlock = function(blockId){
    for(var i=0; i<this.blocks.length; i++){
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
    // var newBlock = new block(block_id, posX, posY, [], type);
    //TODO: something about arguments/fields
    var details = {blockId: block_id, "type": type, "posX":posX, "posY":posY};
    var blockEvent = new BlockEvent("new", details);
    this.handleBlockEvent(blockEvent);
    //this.add(newBlock);
}

/**
 * Dispatch a new event to all the event listeners of a given event type
 */
workspace.prototype.handleBlockEvent = function(blockEvent){
    var type = blockEvent.type;
    console.log(this.allHandlers);
    // var details = blockEvent.details;
    // switch(type){
    //     case "connection":
    //         var block1 = details.block1; block2 = details.block2;
            
    // }
    if (this.allHandlers[type]){
        for (var i in this.allHandlers[type]){
            this.allHandlers[type][i](blockEvent);
        }
    }
}


/**
 * Add a new event listener for a given event type
 * the parameter 'handler' has to be a function with one parameter which is an event object
 */
workspace.prototype.addEventListener = function(eventType, handler){
    console.log("got here");
    if (!this.allHandlers[eventType])
        this.allHandlers[eventType] = [];
    console.log("got here");
    this.allHandlers[eventType].push(handler);
}


/**
 *returns the workspace to JSON
 */
workspace.prototype.toScript = function(){
    
}
