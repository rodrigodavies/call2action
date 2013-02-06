/**
TODO: 
-size limit for audio files
-merging with drupal
-update XML stuffs - does not work atm
-upload files where??


-resizability
-add different color endpoint for user input (done)
-add overlays for user input endpoint 
	--use image? or somehow add text.....
-horizontal scrolling (done)
-blocks - working on fucntionality
	--manage endpoints: connect inner boxes?
	--inner divs not draggable? or is that fine
	--if divs are dragged onto the block, they arent added to it.
		change that? ie droppable?
**/

(function() {
	var counter=0;
	var connectorStrokeColor="rgba(198,89,30,0.7)";
	var hoverPaintStyle = { strokeStyle:"#7ec3d9" };
	var inputs_block = 3;

	var sourceEndpoint = {
		endpoint:"Dot",
		paintStyle:{ fillStyle:"#225588",radius:10 },
		isSource:true,

		maxConnections:1
	};

	var userInputEndpoint = {
		endpoint:"Dot",
		paintStyle:{ fillStyle:"#CCFF00",radius:10 },
		isSource:true,

		maxConnections:1
	}

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
		    	//close blocks
		    	$('#toggle-block').hide('fast');
		    	$('#toggle-box').toggle('fast');

		    })

		    $('.toggleBlocks').click(function() {
		    	//close boxes
		    	$('#toggle-box').hide('fast');
		    	$('#toggle-block').toggle('fast');
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
			 	accept: ".box, .block",
		    	drop: function (event, ui){
		    		var object = ui.draggable.attr('obj');
		    		var parentID = ui.draggable.parent().attr('id');
		    		if(parentID=='toggle-box' || parentID=='toggle-block'){
		    			//add clone of element to canvas
		    			var _id = 'el'+counter;
		    			counter++;
		    			var newElement = $(ui.helper).clone()
							.addClass('added')
							.removeClass('new ui-draggable-dragging')
							.attr('id', _id)
							.css('position', 'absolute')
							.css('margin', '0px')

			 			$(this).append(newElement);
			 			if(parentID=='toggle-block'){
							$(newElement).children().each(function () {
								var parent = $(this).parent().attr('id');
								var id = $(this).attr('id');
								id = parent + id;
								$(this).attr('id', id);
							});
						}	
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
				jsPlumb.addEndpoint(_id, {anchor:"TopCenter"}, targetEndpoint);
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

		function updateBlock(_id, object) {
			if(object != "record" && object !="stories"){
				// var textElement = $('#'+_id+' > div');
				// textElement.css('padding-top', '15px').css('font-size', '14px');
				switch(object){
					case "A": //update top text to include file input
						var textElement = $('#'+_id+' > div');
						textElement.css('padding-top', '15px').css('font-size', '14px');
						textElement.html('Select an audio file:<input type="file" accept="audio/*"><br><br>ACCEPT USER INPUT')
						break;
					case "B": //update text to include file input
						var textElement = $('#'+_id+' > div');
						textElement.css('padding-top', '15px').css('font-size', '14px');
						textElement.html('Select an audio file:<input type="file" accept="audio/*">')
						break;
					case "C": //add list to choose type of action 
					//Play current audio file (from an array), Publish story, Delete story, Skip forward or backward in the database
						var textElement = $('#'+_id+' > div');
						textElement.css('padding-top', '15px').css('font-size', '14px');
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
						var textElement = $('#'+_id+' > div');
						textElement.css('padding-top', '15px').css('font-size', '14px');
						textElement.html('Select an audio file:<input type="file" accept="audio/*"><br><br>LISTEN FOR USER INPUT')
						break;
				}
			}else{
				//iterate through items in div
				$('#'+_id).children().each(function () {
					var id = $(this).attr('id'); var obj = $(this).attr('obj');
					updateBlock(id, obj);
					addConnectorsbyObject(id, obj);
				});

				//connect inner divs?
					
			
								
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
    
