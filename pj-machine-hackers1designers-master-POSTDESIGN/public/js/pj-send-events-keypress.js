(function init(){

	// KEY PRESS EVENTS
	$(document).on('keypress', function(e){
		var code = e.keyCode;
		console.log(code);

		// CALL FUNCTION YOU NEED HERE 
		// CHANGE THE KEYPRESS CODE IN EACH FUNCTION
		changeBlock(code);
		moveBlock(code);
		zoomBlock(code);
		wordSpacing(code);
		changeBlockSize(code);
		changeFont(code);
		//changeColor(code);
		rotateBlock(code);
		textStrokeWidth(code);
		changeOpacity(code);
		
		generatePDF(code);

		
		e.preventDefault(); // prevent the default action (scroll / move caret)
	});


})();



// PJ EVENTS FUNCTION
	function changeBlock(code){
		// press "f" to go to next block, press "o" to do to previous block
        // was 112 for p
		var nextKey = 102;            
		var prevKey = 111; 

		var direction ; 
		if(code == nextKey){
			direction = "next";
		}

		if(code == prevKey){
			direction = "prev";
		}


		sendEvent('changeBlock', direction);

	}

	function moveBlock(code){

		//press "d" to move image on the right, ASCII 100        //was q
		var right = 100;        
		//press "a" to move image on the left
		var left = 97; 
		//press "w" to move image down
		var down = 119;
		//press "s" to move image up
		var up = 115;

		var direction; 
		if(code == right){
			direction = "right";
		}
		if(code == left){
			direction = "left";
		}
		if(code == up){
			direction = "up";
		}
		if(code == down){
			direction = "down";
		}
		
		if(code == right || code == left ||code == up ||code == down ){
			sendEvent('moveBlock', direction);
		}
	}

	function zoomBlock(code){
		//zoomIn press "g", WAS "u" = ASCI 117
		var zoomInKey = 103; 
		//zoomOut press "space"
		var zoomOutKey = 32; 
		var zoom; 

		if(code == zoomInKey){
			zoom = "zoomin";
		}
		
		if(code == zoomOutKey){
			zoom = "zoomout";
		}
		if(code == zoomInKey || code == zoomOutKey){
			sendEvent('zoomBlock', zoom);
		}
	}

	function changeBlockSize(code){
		// press 'i' to make Block Size smaller
		var decreaseSize = 105;
		// press 'e' to make Block Size larger
		var increaseSize = 101;
		var direction;

		if(code == decreaseSize){
			direction = "decreaseSize";
		}
		
		if(code == increaseSize){
			direction = "increaseSize";
		}

		if(code == decreaseSize || code == increaseSize){
			sendEvent('changeBlockSize', direction);
		}
	}

	function wordSpacing(code){

		//press "y" to add space between each words
		var increaseKey = 121;
		//press "r" to decrease space between each words
		var decreaseKey = 114;
		var direction;

		if(code == decreaseKey){
			direction = "decreaseSpacing";
		}
		
		if(code == increaseKey){
			direction = "increaseSpacing";
		}

		if(code == decreaseKey || code == increaseKey){
			sendEvent('changeWordSpacing', direction);

		}
	}

	function generatePDF(code){

		// press "t" to generate pdf,  116
		var pdf = 116;
		var currentUrl = window.location.href ; 

		if(code == pdf){
			socket.emit('generate', {
				"currentUrl": currentUrl,
				"currentProject" : currentProject
			});							
		}
		
	}



// Additional functions you could use
	function changeFont(code){

		var fonts = ["blocus", "bluu", "gulax", "hyperscrypt", "resistance", "roboto", "solidemirage", "sportinggrotesque", "trickster"];
		
		// press "n" to shuffle fonts
		var shuffle = 110;
		var randomFont;

		if(code == shuffle){
			randomFont = fonts[Math.floor(Math.random() * fonts.length)];
		
			sendEvent('changeFont', randomFont);
		}
	}

	function changeColor(code){

		// press "b" to shuffle fonts
		var shuffle = 98;

		// variable for generating random colors
		var letters = '0123456789ABCDEF';
	  var color = '#';
	  

	  if(code == shuffle){
	  	for (var i = 0; i < 6; i++) {
	    	color += letters[Math.floor(Math.random() * 16)];
	  	}
	  	sendEvent('changeColor', color);

	  }

	}

	function rotateBlock(code){

		//press "m" to rotate clockwise
		var rotateRight = 109;
		//press "l" to rotate counterclockwise
		var rotateLeft = 108;
		var direction;

		if(code == rotateRight){
			direction = "clockwise";
		}
		
		if(code == rotateLeft){
			direction = "counterclockwise";
		}

		if(code == rotateLeft || code == rotateRight){
			sendEvent('rotateBlock', direction);

		}

	}

	function textStrokeWidth(code){

		//press "h" to decrease text stroke width
		var decreaseStroke = 104;
		//press "j" to increase text stroke width
		var increaseStroke = 106;
		var direction;

		if(code == decreaseStroke){
			direction = "decrease";
		}
		
		if(code == increaseStroke){
			direction = "increase";
		}

		if(code == decreaseStroke || code == increaseStroke){
			sendEvent('textStrokeWidth', direction);

		}

	}

	function changeOpacity(code){

		//press "c" to decrease opacity
		var decreaseOp = 99;
		//press "v" to increase opacity
		var increaseOp = 118;
		var direction;

		if(code == decreaseOp){
			direction = "decrease";
		}
		
		if(code == increaseOp){
			direction = "increase";
		}

		if(code == decreaseOp || code == increaseOp){
			sendEvent('changeOpacity', direction);

		}

	}


	

