/**
 * workspace represents the state of the screen's workspace, where users can drag and connect boxes.
 **/
var workspace = function(){
    this.blocks = [];
    this.title = null;
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
workspace.prototype.remove = function(block){
    //search for and remove from list
    for(var i=0; i<this.blocks; i++){
        if(block == this.blocks[i]){
            this.blocks.splice(i,1);
            break;
        }
    }

}
/**
 * Returns the block if it is in the workspace. Returns null otherwise.
 */
workspace.prototype.getBlock = function(block){
    for(var i=0; i<this.blocks; i++){
        if(block == this.blocks[i]){
            return this.blocks[i];
        }
    }
    return null;
}

/**
 *Saves the current workspace......some stuff here i suppose
 */
workspace.prototype.save = function(){
    
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


/**
 *returns the workspace to JSON
 */
workspace.prototype.toScript = function(){
    
}
