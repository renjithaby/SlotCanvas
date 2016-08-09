/**
 * Module to handle the  Reel canvas
 */
define (function(require){


    return function(model,preloader,winlineManager,canvasManager,util,uiManager){

        var reelCanvas,
            drawObjects = [],
            reelObjects = [],
            gameConfig = {},
            reelSpinTimer,
            images = {};
            gameConfig = model.getGameConfig();
        /**
         * Function to add reel elements
         */
        function addReelElements(){
            var width = gameConfig.reelWidth,
                height = gameConfig.reelHeight,
                startX = gameConfig.reelStartX,
                startY = gameConfig.reelStartY,
                count = gameConfig.reelCount;
            images= model.getPreLoadedImages();
            drawObjects = model.getDrawObjects();
            for(var i=0;i<count; i++){
                reelCanvas = document.createElement("canvas");
                var ctx=reelCanvas.getContext('2d');
                ctx.clearRect(0,0, width, height);
                ctx.fillStyle='red';
                ctx.fillRect(0,0,width,height);
                ctx.strokeStyle="#FFFF00";
                ctx.strokeRect(0,0,width,height);
                reelCanvas.x=startX+i*width;
                reelCanvas.y=startY;
                reelCanvas.width=width;
                reelCanvas.height=height;
                reelCanvas.id =i;
                reelCanvas.update=true;
                drawObjects.push(reelCanvas);
                reelObjects.push(reelCanvas);
            }
            model.setDrawObjects(drawObjects);
            model.setReelObjects(reelObjects);
        }


        /**
         * Function add Symbols to Reels
         */
        function addSymbolsToReels(){
            var reelSymbolsCount = 7;
            for (var i=0;i<reelObjects.length;i++){
                addSymbolElements(reelObjects[i], reelSymbolsCount,0,-2*gameConfig.symbolHeight);
            }
            canvasManager.update();
        }

        /**
         * Funtion to add symbols to given reelObject
         * @param reelCanvas
         * @param count
         * @param startX
         * @param startY
         */
        function addSymbolElements(reelCanvas,count,startX,startY){
            var symbols=[],symbolCanvas,i;
            for(i = 0;i < count; i++){
                symbolCanvas = document.createElement("canvas");
                symbolCanvas.width = gameConfig.symbolWidth;
                symbolCanvas.height = gameConfig.symbolHeight;
                symbolCanvas.id = i;
                updateSymbolCanvas(symbolCanvas,reelCanvas.id);
                symbolCanvas.x = startX;
                symbolCanvas.y = startY + i * gameConfig.symbolHeight;
                reelCanvas.getContext('2d').drawImage(symbolCanvas, symbolCanvas.x,symbolCanvas.y);
                symbols.push(symbolCanvas);
            }
            reelCanvas.top = symbols[0];
            reelCanvas.symbols = symbols;
        }

        /**
         * Function to update Symbol canvas with symbol images
         * @param symbolCanvas
         * @param reelId
         */
        function updateSymbolCanvas(symbolCanvas,reelId){
            var imageWidth = 40,
                imageHeight = 40;
            symbolCanvas.value = model.getResults().reels[reelId][symbolCanvas.id];
            var ctx=symbolCanvas.getContext('2d');
            ctx.clearRect(0,0,symbolCanvas.width,symbolCanvas.height);
            ctx.fillStyle = 'green';
            ctx.fillRect(0,0,symbolCanvas.width,symbolCanvas.height);
            ctx.strokeStyle = "#ff0000";
            ctx.strokeRect(0,0,symbolCanvas.width,symbolCanvas.height);
            switch(symbolCanvas.value){
                case 0:
                    iconName = "appleIcon";
                break;
                case 1:
                    iconName = "bananasIcon";
                break;
                case 2:
                    iconName = "lemonIcon";
                break;
                case 3:
                    iconName = "strawberryIcon";
                break;
                case 4:
                    iconName = "cherryIcon";
                break;
                case 5:
                    iconName = "pineappleIcon";
                break;

            }
            symbolCanvas.getContext('2d').drawImage(images[iconName], gameConfig.symbolWidth/2 - imageWidth/2, gameConfig.symbolHeight/2 - imageHeight/2, imageWidth, imageHeight);
        }


        /**
         *  Spin button click handler
         */
        function spin(){
            var spinSpeed = 18;
            uiManager.disableSpinButton();
            util.getObject(drawObjects,"winLine").update=false;
            calculateNewSpinResults();
            for( var i = 0; i < reelObjects.length; i++){
                reelObjects[i].stop = false;
            }
            reelSpinTimer = setInterval(function(){

                for( var i = 0; i < reelObjects.length; i++){
                    if(!reelObjects[i].stop){
                        reelObjects[i].spinSpeed = spinSpeed;
                        moveSymbols(reelObjects[i]);
                    }
                }
            }, 10);

            var gameSpinTimer = setInterval(function(){
                clearInterval(gameSpinTimer);
                stopReels(reelObjects[0],0);
            },2000);
        }

        /**
         * Function to stop the reel spin after the given time interval.
         * Uses a series of timer intervals to simulate the reel stop.
         *
         * @param reelObject
         * @param reelNum
         */
        function stopReels(reelObject,reelNum){
            var reelBackwardSpinSpeed = -5,
                reelForwardSpinSpeed = 6;
            reelObject.stop = true;
            updateResult(reelObject);
            var reelBackwardSpinTimer = setInterval(function(){
                reelObject.spinSpeed = reelBackwardSpinSpeed;
                moveSymbols(reelObject);
                if(reelObject.symbols[2].y < -gameConfig.symbolHeight/2){
                    clearInterval(reelBackwardSpinTimer);

                    reelForwardSpinTimer = setInterval(function(){
                        reelObject.spinSpeed = reelForwardSpinSpeed;
                        if(reelObject.symbols[2].y + reelObject.spinSpeed > 0){
                            reelObject.spinSpeed = 0-reelObject.symbols[2].y;
                        }
                        moveSymbols(reelObject);
                        if(reelObject.symbols[2].y >= 0){
                            clearInterval(reelForwardSpinTimer);
                            if(typeof reelObjects[reelNum+1]!== "undefined"){
                                stopReels(reelObjects[reelNum+1],reelNum+1);
                            }else{
                                clearInterval(reelSpinTimer);
                                winlineManager.showResultWinLines();
                            }
                        }
                    },10);
                }
            }, 10);
        }

        /**
         * Function to update the reels with new results
         * @param reelObject
         */
        function updateResult(reelObject){
            var startY = -2 * gameConfig.symbolHeight;
            reelObject.getContext('2d').clearRect(0,0, reelObject.width,reelObject.height);
            for( var i = 0; i < reelObject.symbols.length; i++){
                reelObject.symbols[i].y = startY + i * reelObject.symbols[i].height;
                reelObject.getContext('2d').drawImage(reelObject.symbols[i], reelObject.symbols[i].x,reelObject.symbols[i].y);
                updateSymbolCanvas(reelObject.symbols[i], reelObject.id);
                reelObject.getContext('2d').drawImage(reelObject.symbols[i],reelObject.symbols[i].x,reelObject.symbols[i].y);
            }
            reelObject.top = reelObject.symbols[0];
            canvasManager.update();
        }

        /**
         * function to move the symbols with the reels to simulate the reel spin effect
         * @param reelObj
         */
        function moveSymbols(reelObj){
            reelObj.getContext('2d').clearRect(0,0, reelObj.width,reelObj.height);
            for(var i = 0;i < reelObj.symbols.length;i++){
                reelObj.symbols[i].y += reelObj.spinSpeed;
                if(reelObj.symbols[i].y > reelObj.height+gameConfig.symbolHeight){
                    reelObj.symbols[i].y = reelObj.top.y - gameConfig.symbolHeight + reelObj.spinSpeed;
                    reelObj.top = reelObj.symbols[i];
                }
                reelObj.getContext('2d').drawImage(reelObj.symbols[i], reelObj.symbols[i].x,reelObj.symbols[i].y);
            }
            canvasManager.update();
        }

        /**
         * Function calculates  new spin results, by taking a random mock result value.
         */
        function calculateNewSpinResults(){

            var results = model.getMockResults();
            var rand = parseInt(Math.random()* model.getMockResults().length);
            model.setResults(results[rand]);
        }


        var public = {
            addReelElements:addReelElements,
            addSymbolsToReels:addSymbolsToReels,
            spin:spin
        }


        return public;


    }

});