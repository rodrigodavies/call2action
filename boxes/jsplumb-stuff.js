/**
TODO: 
-size limit for audio files
-merging with drupal
-update XML stuffs - does not work atm
-upload files where??
-add dbl click handler for block A - change endpoints?
-prompt user for number of options in block a?
-resizability
**/

(function() {
	var counter=0;
	var connectorStrokeColor="rgba(198,89,30,0.7)";
	var hoverPaintStyle = { strokeStyle:"#7ec3d9" };
	// var endpoint = {
 //       paintStyle:{ fillStyle:'#6c8dc4' },
 //       isSource:true,
 //       connectorStyle:{ strokeStyle:connectorStrokeColor, lineWidth:8 },
 //       maxConnections:1000,
 //       isTarget:true,
 //       dropOptions : { tolerance:"touch",hoverClass:"dropHover" }
 //     };

	var sourceEndpoint = {
		endpoint:"Dot",
		paintStyle:{ fillStyle:"#225588",radius:10 },
		isSource:true,
		maxConnections:1
	};

	var targetEndpoint = {
		endpoint:"Dot",					
		paintStyle:{ fillStyle:"#558822",radius:10 },
		maxConnections:-1,
		dropOptions:{ hoverClass:"hover", activeClass:"active" },
		isTarget:true
	};
            
     
	window.jsPlumbDemo = {
			
		init : function() {
			
			jsPlumb.importDefaults({
				// default to blue at one end and green at the other
				EndpointStyles : [{ fillStyle:'#225588' }, { fillStyle:'#558822' }],
				// blue endpoints 7 px; green endpoints 11.
				Endpoints : [ [ "Dot", {radius:7} ], [ "Dot", { radius:11 } ]],
				Connector : [ "Bezier", { curviness: 50 } ],
				ConnectionOverlays : [
					[ "Arrow", { location:0.5 } ],
				],
			});

			

			//bind connections
    		jsPlumb.bind("jsPlumbConnection", function (e) {
        		e.connection.setHoverPaintStyle(hoverPaintStyle);
    		});

    		//bind dbl click event on connectors
			jsPlumb.bind("dblclick", function(conn, originalEvent) {
				if (confirm("Delete connection from " + conn.sourceId + " to " + conn.targetId + "?"))
				jsPlumb.detach(conn); 
			});

			/** Add handlers for links **/
		    //remove connections onclick
		    $('.detach').click(function (){
		    	jsPlumb.detachEveryConnection();
		    })
		    //clear canvas onclick
		    $('.clear').click(function() {
		    	$('#holder').html('');
		    	counter=0;
		    })

		    $('.toggleBoxes').click(function() {
		    	$('#toggle').toggle();
		    })
		    //create xml file
		    $('.save').click(function(){
		    	var elements = $('.added');
		    	var file = '<?xml version="1.0"?>\n<flowchart>\n';
				for(var i = 0; i<elements.length; i++){
					var block = $(elements[i]);
					var id=block.attr('id');
					var shape = block.attr('box');
					var left = block.css('left');
					var top = block.css('top');
					var text = block.text();
					var newStuff = ' <block id="'+id+'" box="'+shape+'">\n  <text>'
						+text+'</text>\n  <position top="'+top+'" '
						+'left="'+left+'">\n </block>\n';
					file = file.concat(newStuff);
					//console.log(file);
				}
				file = file.concat('</flowchart>');
				$('#dialog').text(file);
				$( '#dialog' ).dialog({modal:true, height: 'auto', minWidth: 400});
		    });

			//make objects droppable
		    $(".new" ).draggable({
		 		addClasses: false,
		 		appendTo: "#holder",
		    	helper:"clone",
		    	revert:"invalid",	
		    });
		    

			//make canvas droppable, add endpoints
			 $( "#holder" ).droppable({
			 	accept: ".box",
		    	drop: function (event, ui){
		    		var object = ui.draggable.attr('box');
		    		var parentID = ui.draggable.parent().attr('id');
		    		if(parentID=='toggle'){
		    			//add clone of element to canvas
		    			var _id = 'el'+counter;
		    			counter++;
		    			var newElement = $(ui.helper).clone()
							.addClass('added')
							.removeClass('new ui-draggable-dragging')
							.attr('id', _id)
							.css('position', 'absolute')
							.css('margin', '0px')
							.css('padding', '0px')
							// .dblclick(function (){
							// 	var newText = prompt("Enter text to display in element:");
							// 	if(newText != null){$(this).text(newText);}
							// 	});
			 			$(this).append(newElement);
			 			
			 			jsPlumb.addEndpoint(_id, {anchor:"TopCenter"}, targetEndpoint);
			 			addConnectorsbyObject(_id, object);
			 			jsPlumb.draggable(_id, {containment:'parent'});
			 			updateBlock(_id, object);

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
				switch(object){
					case "A": //variable number of exit nodes
						//do stuff here
						var num = parseInt(prompt("Specify the number of exit nodes")); //might be a limiting factor?
						while (num>=10 || isNaN(num)){num = parseInt(prompt("Invalid Input"));}
						for (var i=1; i<num+1; i++){
							var location = i/(num+1);
							jsPlumb.addEndpoint(_id, {anchor: [location, 1, 0, 1]}, sourceEndpoint);
						};

						
						break;
					default: //add one exit node
						jsPlumb.addEndpoint(_id, {anchor: "BottomCenter"}, sourceEndpoint);
						break;

			 }
		};

		function updateBlock(_id, object) {
			var textElement = $('#'+_id+' > div');
			textElement.css('padding-top', '15px').css('font-size', '14px');
			switch(object){
				case "A": //update top text to include file input
					textElement.html('Select an audio file:<input type="file" accept="audio/*"><br><br>ACCEPT USER INPUT')
					break;
				case "B": //update text to include file input
					textElement.html('Select an audio file:<input type="file" accept="audio/*">')
					break;
				case "C": //add list to choose type of action 
				//Play current audio file (from an array), Publish story, Delete story, Skip forward or backward in the database
					$('#'+_id+' > img').remove(); //remove image
					textElement.html('Select an action:&nbsp;<select name="action">'
						+'<option value="default">Select</option>'
						+'<option value="play">Play audio file</option>'
					+'<option value="publish">Publish story</option>'
					+'<option value="delete">Delete story</option>'
					+'<option value="skipForward">Skip Forward</option>'
					+'<option value="skipBackward">Skip Backward</option></select>');

					break;
				case "D": //update top text to include file input
					textElement.html('Select an audio file:<input type="file" accept="audio/*"><br><br>LISTEN FOR USER INPUT')
					break;
			}
		}




			 
    }    
  }
  
})();
jsPlumb.bind("ready", function() {
        // chrome fix.
        document.onselectstart = function () { return false; };

        jsPlumbDemo.init();
    });
    
