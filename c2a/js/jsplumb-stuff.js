
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


$('.user-info').dblclick(function() {
	var info = prompt("Enter the "+$(this).attr('id'));
	if(info){
	$(this).html(info);
	}
});
$(document).bind('drop', function(){
	$(document.activeElement).trigger('blur');
});

$(document).tooltip({tooltipClass:'tooltip'});
var counter=0;
var connectorStrokeColor="#918f8f";
var connectorLineWidth = 3;
var connectorPaintStyle = {
	lineWidth:3,
	strokeStyle:"#918f8f",
	joinstyle:"round",
	outlineColor:"white",
	outlineWidth:5
};

var bottomEndpoint = {
	endpoint:"Dot",
	paintStyle:{fillStyle:"#e3f00b", radius:7,
	outlineColor:"#b7b9bd",outlineWidth:1},
	isSource:true,
	isTarget:true,
	connectorStyle:connectorPaintStyle,
	maxConnections:-1
};

var topEndpoint = {
	endpoint:"Dot",					
	paintStyle:{ fillStyle:"#0066ff",radius:7,
	outlineColor:"#b7b9bd",outlineWidth:1 },
	maxConnections:-1,
	connectorStyle:connectorPaintStyle,
	dropOptions:{ hoverClass:"hover", activeClass:"active" },
	isSource:true,
	isTarget:true,
};

var userInputEndpoint = {
	endpoint:"Dot",
	paintStyle:{ fillStyle:"#CCFF00",radius:8,
	outlineColor:"#b7b9bd",outlineWidth:10  },
	connectorStyle:connectorPaintStyle,
	isSource:true,
	isTarget:true,
	maxConnections:-1
}
        
 
window.jsPlumbinstance = {
		
	init : function() {
		
		jsPlumb.importDefaults({
			EndpointStyles : [{ fillStyle:'#0066ff' }, { fillStyle:'#e3f00b' }],
			Endpoints : [ [ "Dot", {radius:5} ], [ "Rectangle", { width:1,height:1 } ]],
			Connector : [ "Flowchart"],
			ConnectionOverlays : [[ "Arrow", { location:0.8 } ]],
		});
		//bind dbl click event on connectors
		jsPlumb.bind("dblclick", function(conn, originalEvent) {
			if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
			jsPlumb.detach(conn); 
		});


		var canvas = new workspace('canvas');


		$('#save').click(function(){
			canvas.save();
		});
		//clear canvas onclick
		$('#clear').click(function() {
			bootbox.confirm("Are you sure you want to clear the canvas?", function(result){
				if(result){
					$('#canvas').html('');
					counter=0;
					canvas.clear();
				}
			});
		});
		//make objects droppable
	    $(".new" ).draggable({
	 		addClasses: false,
	 		appendTo: "#canvas",
	    	helper:"clone",
	    	revert:"invalid",	
	    }); 

		//make canvas droppable, add endpoints
		// $( "#canvas" ).droppable({
		//  	accept: ".box, .block",
	 //    	drop: function (event, ui){
	 //    		var object = ui.draggable.attr('type');
	 //    		var parentID = ui.draggable.parent().attr('id');
	 //    		if(parentID!=='canvas'){
	 //    			//add clone of element to canvas
	 //    			var _id = 'el'+counter;
	 //    			var position = $(ui.helper).position();
	 //    			counter++;
	 //    			var newElement = $(ui.helper).clone()
		// 				.addClass('added')
		// 				.removeClass('new ui-draggable-dragging')
		// 				.attr({'id': _id,'type': object })
		// 				.css({'position': 'absolute','margin': '0px'});
		// 			newElement.find('*').removeAttr('readonly');
		//  			$(this).append(newElement);

		//  			if(parentID=='blocks'){
		// 				$(newElement).children().each(function () {
		// 					var parent = $(this).parent().attr('id');
		// 					var id = $(this).attr('id');
		// 					id = parent + id;
		// 					$(this).attr('id', id);
		// 				});
		// 			}
		//  			addConnectorsbyObject(_id, object);
		//  			jsPlumb.draggable(_id, {containment:'parent'});

		//  			canvas.addBlock(_id, object, position.left, position.top);

	 //    		}
	            
  //           }
	 //    });


		 //make delete box droppable, delete objects and respective connections
		$( "#delete-container" ).droppable({
		 		accept:".added",
  				hoverClass: "ui-state-hover",
  				tolerance: "touch",
		 		drop: function (event, ui){
		 			jsPlumb.removeAllEndpoints($(ui.draggable).attr('id'));
		 			$(ui.draggable).remove();
		 		}
		 	});

		function addConnectorsbyObject (_id, object){
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

		 
}    
}
  
jsPlumb.bind("ready", function() {
	// chrome fix.
	document.onselectstart = function () { return false; };
	jsPlumbinstance.init();
});
    
