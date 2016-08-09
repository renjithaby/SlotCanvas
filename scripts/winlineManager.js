/**
 *  The module that manages the WinLines,
 *  the user bet Winlines and result Winlines
 */

define(function(require){

    return function (model, canvasManager, uiManager){
        var gameConfig = model.getGameConfig(),
            winLineCanvas,
            resultWinLineCanvas ;

        /**
         * Function to add the winLineCanvas on which the users bet winlines are drawn.
         */
        function addWinLineCanvas(){
            var ctx,
                reelObjects,
                drawObjects;

            reelObjects = model.getReelObjects();
            winLineCanvas = document.createElement("canvas");
            winLineCanvas.id = "winLine";
            winLineCanvas.update = true;
            winLineCanvas.x = reelObjects[0].x;
            winLineCanvas.y = reelObjects[0].y;
            winLineCanvas.width= 5 * gameConfig.reelWidth;
            winLineCanvas.height = gameConfig.reelHeight;
            ctx = winLineCanvas.getContext("2d");
            ctx.lineWidth = 4;
            addWinLine();
            drawObjects = model.getDrawObjects();
            drawObjects.push(winLineCanvas);
            model.setDrawObjects(drawObjects);
        }

        /**
         * Function to draw users selected bet winlines on the winLineCanvas.
         */
        function addWinLine(){
            var i,
                j,
                positions,
                ctx,
                reelObjects = model.getReelObjects(),
                winLines= gameConfig.initialResults.winLines;

            for( i = 0;i < winLines.length;i++) {
                positions = winLines[i].positions;
                ctx= winLineCanvas.getContext("2d");
                ctx.beginPath();
                ctx.moveTo(reelObjects[0].symbols[positions[0] + 2].x, reelObjects[0].symbols[positions[0] + 2].y - gameConfig.symbolHeight / 2);
                for (j = 0; j < winLines[i].positions.length; j++) {
                    ctx.lineTo(j * gameConfig.symbolWidth + reelObjects[j].symbols[positions[j] + 2].x + gameConfig.symbolWidth / 2, reelObjects[j].symbols[positions[j] + 2].y - gameConfig.symbolHeight / 2);
                }
                ctx.lineTo(positions.length * gameConfig.symbolWidth, reelObjects[positions.length - 1].symbols[positions[positions.length - 1] + 2].y - gameConfig.symbolHeight / 2);
                ctx.strokeStyle = winLines[i].color;
                ctx.stroke();
                ctx.closePath();
            }

        }

        /**
         * Function to add the resultWinLineCanvas on which the result winLines are drawn
         */
        function addResultWinLineCanvas(){
            var ctx,
                drawObjects,
                reelObjects = model.getReelObjects();

            resultWinLineCanvas = document.createElement("canvas");
            resultWinLineCanvas.id = "resultWinLine";
            resultWinLineCanvas.update = true;
            resultWinLineCanvas.x = reelObjects[0].x;
            resultWinLineCanvas.y = reelObjects[0].y;
            resultWinLineCanvas.width = 5 * gameConfig.reelWidth;
            resultWinLineCanvas.height = gameConfig.reelHeight;
            ctx = resultWinLineCanvas.getContext("2d");
            ctx.lineWidth = 4;
            drawObjects = model.getDrawObjects();
            drawObjects.push(resultWinLineCanvas);
            model.setDrawObjects(drawObjects);
        }

        /**
         * Function to draw the result winLines on the resultWinLineCanvas
         *
         */
        function showResultWinLines(){
            var i= -1,
                resultLines,
                ctx,
                winLineTimer,
                reelObjects = model.getReelObjects();

            resultWinLineCanvas.update = true;
            resultLines = model.getResults().resultLines;
            winLineTimer = setInterval(addResultWinLine, 1000);
            ctx = resultWinLineCanvas.getContext("2d");
            /**
             * add each winlines based on the  timer
             */
            function addResultWinLine(){
                var symbolPos,
                    prevPos,
                    reelPos,
                    prevReel,
                    j;

                if(i < resultLines.length-1) {
                    i = i + 1;
                }else{
                    clearInterval(winLineTimer);
                    uiManager.enableSpinButton();
                    resultWinLineCanvas.update = false;
                }

                ctx.clearRect(0,0,resultWinLineCanvas.width,resultWinLineCanvas.height);
                ctx.beginPath();
                ctx.strokeStyle = resultLines[i].color;
                var animations = resultLines[i].animations;
                var positions = resultLines[i].positions;
                for(j = 0; j < resultLines[i].animations.length; j++){
                    symbolPos = positions[j] + 1;
                    prevPos = positions[j-1] + 1;
                    reelPos = j;
                    prevReel = j-1;
                    if(animations[j] === 1){
                        ctx.strokeRect(reelPos * gameConfig.symbolWidth + reelObjects[reelPos].symbols[symbolPos].x,reelObjects[reelPos].symbols[symbolPos].y,gameConfig.symbolWidth,gameConfig.symbolHeight);
                        if(typeof positions[j-1] !== "undefined"){
                            ctx.moveTo(prevReel * gameConfig.symbolWidth + reelObjects[prevReel].symbols[prevPos].x + gameConfig.symbolWidth,reelObjects[prevReel].symbols[prevPos].y + gameConfig.symbolHeight/2);
                            ctx.lineTo(reelPos * gameConfig.symbolWidth + reelObjects[reelPos].symbols[symbolPos].x,reelObjects[reelPos].symbols[symbolPos].y);
                        }
                    } else if(animations[j] === 0){
                        if(typeof positions[j-1] !== "undefined" && positions[j-1] === positions[j]){

                            if(animations[j-1] === 1){
                                ctx.moveTo(prevReel * gameConfig.symbolWidth + reelObjects[prevReel].symbols[prevPos].x + gameConfig.symbolWidth,reelObjects[prevReel].symbols[prevPos].y + gameConfig.symbolHeight/2);
                            }else{
                                ctx.moveTo(prevReel * gameConfig.symbolWidth + reelObjects[prevReel].symbols[prevPos].x + gameConfig.symbolWidth/2,reelObjects[prevReel].symbols[prevPos].y + gameConfig.symbolHeight/2);
                            }
                            ctx.lineTo(reelPos * gameConfig.symbolWidth + reelObjects[reelPos].symbols[symbolPos].x + gameConfig.symbolWidth/2,reelObjects[reelPos].symbols[symbolPos].y + gameConfig.symbolHeight/2);
                        }else if(typeof positions[j-1] !== "undefined" && positions[j-1] < positions[j]){
                            if(animations[j-1] === 1){
                                ctx.moveTo(prevReel * gameConfig.symbolWidth + reelObjects[prevReel].symbols[prevPos].x + gameConfig.symbolWidth,reelObjects[prevReel].symbols[prevPos].y + gameConfig.symbolHeight);
                            }else{
                                ctx.moveTo(prevReel * gameConfig.symbolWidth + reelObjects[prevReel].symbols[prevPos].x + gameConfig.symbolWidth/2,reelObjects[prevReel].symbols[prevPos].y + gameConfig.symbolHeight/2);
                            }
                            ctx.lineTo(reelPos*gameConfig.symbolWidth + reelObjects[reelPos].symbols[symbolPos].x + gameConfig.symbolWidth/2,reelObjects[reelPos].symbols[symbolPos].y + gameConfig.symbolHeight/2);
                        }else if(typeof positions[j-1] !== "undefined" && positions[j-1] > positions[j]){
                            if(animations[j-1] === 1){
                                ctx.moveTo(prevReel * gameConfig.symbolWidth + reelObjects[prevReel].symbols[prevPos].x + gameConfig.symbolWidth,reelObjects[prevReel].symbols[prevPos].y);
                            }else{
                                ctx.moveTo(prevReel * gameConfig.symbolWidth + reelObjects[prevReel].symbols[prevPos].x + gameConfig.symbolWidth/2,reelObjects[prevReel].symbols[prevPos].y + gameConfig.symbolHeight/2);
                            }
                                ctx.lineTo(reelPos * gameConfig.symbolWidth + reelObjects[reelPos].symbols[symbolPos].x + gameConfig.symbolWidth/2,reelObjects[reelPos].symbols[symbolPos].y + gameConfig.symbolHeight/2);
                        }
                        if(reelPos === reelObjects.length-1){
                            ctx.lineTo(reelPos*gameConfig.symbolWidth + reelObjects[reelPos].symbols[symbolPos].x + gameConfig.symbolWidth,reelObjects[reelPos].symbols[symbolPos].y + gameConfig.symbolHeight/2);
                        }
                    }
                    ctx.stroke();
                }

                ctx.closePath();

                canvasManager.update(); // update the canvasManager

            }

        }
    
        var public = {
            addWinLineCanvas:addWinLineCanvas,
            addResultWinLineCanvas:addResultWinLineCanvas,
            showResultWinLines:showResultWinLines
        }

        return public;
    }
})