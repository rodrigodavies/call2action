(function() {
	var counter=0;
	var connectorStrokeColor="#918f8f";
	//var hoverPaintStyle = { strokeStyle:"#7ec3d9" };
	var inputs_block = 3;

	var bottomEndpoint = {
		endpoint:"Dot",
		paintStyle:{fillStyle:"#e3f00b", radius:7,
		outlineColor:"#b7b9bd",outlineWidth:1},
		isSource:true,
		isTarget:true,
		connectorStyle:{ strokeStyle:connectorStrokeColor, lineWidth:2 },
		maxConnections:-1
	};
	var topEndpoint = {
		endpoint:"Dot",					
		paintStyle:{ fillStyle:"#0066ff",radius:7,
		outlineColor:"#b7b9bd",outlineWidth:1 },
		maxConnections:-1,
		connectorStyle:{ strokeStyle:connectorStrokeColor, lineWidth:2 },
		dropOptions:{ hoverClass:"hover", activeClass:"active" },
		isSource:true,
		isTarget:true,
	};

	var userInputEndpoint = {
		endpoint:"Rectangle",
		paintStyle:{ fillStyle:"#CCFF00",width:14,height:14,
		outlineColor:"#b7b9bd",outlineWidth:1  },
		connectorStyle:{ strokeStyle:connectorStrokeColor, lineWidth:2 },
		isSource:true,
		isTarget:true,
		maxConnections:-1
	}
            
     
	window.jsPlumbinstance = {
			
		init : function() {
			
			jsPlumb.importDefaults({
				EndpointStyles : [{ fillStyle:'#0066ff' }, { fillStyle:'#e3f00b' }],
				Endpoints : [ [ "Dot", {radius:5} ], [ "Rectangle", { width:1,height:1 } ]],
				Connector : [ "Straight", {curviness:0}],

			});

			//jsPlumb.addEndpoint($('.box'),{anchor:"TopCenter"}, topEndpoint);
			//doesnt work for blocks for whatever the reason

    		//bind dbl click event on connectors
			jsPlumb.bind("dblclick", function(conn, originalEvent) {
				if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
				jsPlumb.detach(conn); 
			});

		    //clear canvas onclick
		    $('#clear').click(function() {
		    	$('#canvas').html('');
		    	counter=0;
		    });

		    $('.user-info').dblclick(function() {
		    	var title = prompt("Enter a title.");
		    	if(title){
		    	$(this).html(title);
		    }});

		  //   //create xml file
		  //   $('.save').click(function(){
		  //   	var elements = $('.added');
		  //   	var file = '<?xml version="1.0"?>\n<flowchart>\n';
				// for(var i = 0; i<elements.length; i++){
				// 	var block = $(elements[i]);
				// 	var id=block.attr('id');
				// 	var shape = block.attr('box');
				// 	var left = block.css('left');
				// 	var top = block.css('top');
				// 	var text = block.text();
				// 	var newStuff = ' <block id="'+id+'" box="'+shape+'">\n  <text>'
				// 		+text+'</text>\n  <position top="'+top+'" '
				// 		+'left="'+left+'">\n </block>\n';
				// 	file = file.concat(newStuff);
				// 	//console.log(file);
				// }
				// file = file.concat('</flowchart>');
				// $('#dialog').text(file);
				// $( '#dialog' ).dialog({modal:true, height: 'auto', minWidth: 400});
		  //   });

			//make objects droppable
		    $(".new" ).draggable({
		 		addClasses: false,
		 		appendTo: "#canvas",
		    	helper:"clone",
		    	revert:"invalid",	
		    });   

			//make canvas droppable, add endpoints
			 $( "#canvas" ).droppable({
			 	accept: ".box, .block",
		    	drop: function (event, ui){
		    		var object = ui.draggable.attr('type');
		    		var parentID = ui.draggable.parent().attr('id');
		    		if(parentID=='boxes' || parentID=='blocks'){
		    			//add clone of element to canvas
		    			var _id = 'el'+counter;
		    			counter++;
		    			var newElement = $(ui.helper).clone()
							.addClass('added')
							.removeClass('new ui-draggable-dragging')
							.attr('id', _id)
							.attr('type', object)
							.css('position', 'absolute')
							.css('margin', '0px')

			 			$(this).append(newElement);
			 			if(parentID=='blocks'){
							$(newElement).children().each(function () {
								var parent = $(this).parent().attr('id');
								var id = $(this).attr('id');
								id = parent + id;
								$(this).attr('id', id);
							});
						}

			 			//addConnectorsbyObject(_id, object);
			 			jsPlumb.draggable(_id, {containment:'parent'});
			 			jsPlumb.addEndpoint(_id, {anchor:"TopCenter"}, topEndpoint);
			 			if (object!='play-accept'){
							jsPlumb.addEndpoint(_id, {anchor:"BottomCenter"}, bottomEndpoint);
						}
						if(object=='play-accept'){
							for (var i=1; i<4; i++){ //add three by default
								var location = i/(4);
								jsPlumb.addEndpoint(_id, {anchor: [location, 1, 0, 1]}, userInputEndpoint);
							};
						}
		    		}
		            
	            }
		    });

			 //make delete box droppable, delete objects and respective connections
			$( "#delete" ).droppable({
			 		accept:".added",
      				hoverClass: "ui-state-hover",
			 		drop: function (event, ui){
			 			jsPlumb.removeAllEndpoints($(ui.draggable).attr('id'));
			 			$(ui.draggable).remove();
			 		}
			 	});


			//add endpoints at specific points for A, one for each other block
			function addConnectorsbyObject (_id, object){
				jsPlumb.addEndpoint(_id, {anchor:"TopCenter"}, topEndpoint);
				switch(object){
					case "A": //variable number of exit nodes
						if(!$('#'+_id).hasClass('nested')){
							var num = parseInt(prompt("Specify the number of exit nodes")); //might be a limiting factor?
							while (num>=10 || isNaN(num)){num = parseInt(prompt("Invalid Input"));}
							for (var i=1; i<num+1; i++){
								var location = i/(num+1);
								jsPlumb.addEndpoint(_id, {anchor: [location, 1, 0, 1]}, userInputEndpoint);
							};
						}
						else if ($('#'+_id).parent().attr('obj')=='stories'){
							for(var i=1; i<inputs_block+1; i++){ //add three
								var location = i/(inputs_block+1);
								jsPlumb.addEndpoint(_id, {anchor: [location, 1, 0, 1]}, userInputEndpoint);
							}; 
						}
						else if ($('#'+_id).parent().attr('obj')=='record'){
							for(var i=1; i<inputs_block+1; i++){ //add three
									var location = i/(inputs_block+1);
									jsPlumb.addEndpoint(_id, {anchor: [location, 1, 0, 1]}, userInputEndpoint);
								};
								} 					
						break;
					default: //add one exit node
						jsPlumb.addEndpoint(_id, {anchor: "BottomCenter"}, sourceEndpoint);
						break;

			 }
		};




			 
    }    
  }
  
})();
jsPlumb.bind("ready", function() {
        // chrome fix.
        document.onselectstart = function () { return false; };

        jsPlumbinstance.init();
    });
    
