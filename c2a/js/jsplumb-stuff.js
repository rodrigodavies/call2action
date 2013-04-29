
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


$(document).bind('drop', function(){
	$(document.activeElement).trigger('blur');
});

$(document).tooltip({tooltipClass:'tooltip'});
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


		$('.user-info').dblclick(function() {
			var info = prompt("Enter the "+$(this).attr('id'));
			if(info){
			$(this).html(info);
			}
		});


		$('#save').click(function(){
			canvas.save();
		});
		//clear canvas onclick
		$('#clear').click(function() {
			bootbox.confirm("Are you sure you want to clear the canvas?", function(result){
				if(result){
					$('#canvas').html('');
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

		 //make delete box droppable, delete objects and respective connections
		$( "#delete-container" ).droppable({
		 		accept:".added",
  				hoverClass: "ui-state-hover",
  				tolerance: "touch",
		 		drop: function (event, ui){
		 			var id = $(ui.draggable).attr('id');
		 			jsPlumb.removeAllEndpoints(id);
		 			canvas.remove(id);
		 			$(ui.draggable).remove();
		 		}
		 	});

		canvas.addEventListener('new', function(e){
			var type = e.details.type;
			var args = new Array();
			switch(type){ //add arguments to block
				case "menu":
				case "play":
				case "play-record":
				case "welcome":
					var promptArg = new Argument("prompt", "string");
					args.push(promptArg);
					break;
				case "redirect":
					var phoneArg = new Argument("number", "number");
					args.push(phoneArg);
					break;
				case "action":
					var actionArg = new Argument("action", "action");
					args.push(actionArg);
					break;
			}
			var block = new Block(e.details.blockId, e.details.posX, e.details.posY, args, type);
			canvas.add(block);
		});
		 
}    
}
  
jsPlumb.bind("ready", function() {
	// chrome fix.
	document.onselectstart = function () { return false; };
	jsPlumbinstance.init();
});
    
