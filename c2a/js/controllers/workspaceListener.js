var workspaceListener = function(canvas){
	this.view = $('#'+canvas.getId());
	this.canvas = canvas;
	console.log(this.canvas);


	jsPlumb.bind("jsPlumbConnection", function(info) {
	   sourceBlock = info.sourceId;
	   targetBlock = info.targetId;
	   sourceEndpoint = info.sourceEndpoint;
	   targetEndpoint = info.targetEndpoint;
	   var details = {block1: sourceBlock, block2: targetBlock,
	   	endpoint1: sourceEndpoint, endpoint2: targetEndpoint};
	   var blockEvent = new BlockEvent("connection", details);
	   canvas.handleBlockEvent(blockEvent);
	});
	

	this.view.droppable({
		accept: ".box, .block",
		drop: function (event, ui){
			var object = ui.draggable.attr('type');
			var parentID = ui.draggable.parent().attr('id');
			if(parentID!=='canvas'){
				//add clone of element to canvas
				var _id = 'el'+canvas.getCount();
				var position = $(ui.helper).position();
				var newElement = $(ui.helper).clone()
					.addClass('added')
					.removeClass('new ui-draggable-dragging')
					.attr({'id': _id,'type': object })
					.css({'position': 'absolute','margin': '0px'});
				newElement.find('*').removeAttr('readonly');
					$(this).append(newElement);

					if(parentID=='blocks'){
					$(newElement).children().each(function () {
						var parent = $(this).parent().attr('id');
						var id = $(this).attr('id');
						id = parent + id;
						$(this).attr('id', id);
					});
				}
					addConnectorsbyObject(_id, object);
					jsPlumb.draggable(_id, {containment:'parent'});
					canvas.addBlock(_id, object, position.left, position.top);
			}
		    
		}
	});


}

function addConnectorsbyObject(_id, object){
			if(object !='welcome'){
	 			jsPlumb.addEndpoint(_id, {anchor:"TopCenter"}, topEndpoint);}
	 			if (object!='menu'&& object !='hangup'){
					jsPlumb.addEndpoint(_id, {anchor:"BottomCenter"}, bottomEndpoint);
				}
				if(object=='menu'){
					for (var i=1; i<10; i++){
						var location = i/(10);
						var endpoint = jsPlumb.addEndpoint(_id, {anchor: [location, 1, 0, 1]}, userInputEndpoint);
						endpoint.setLabel("<span class='endpointlabel'>"+i+"</span>");
					}
				} 
			}