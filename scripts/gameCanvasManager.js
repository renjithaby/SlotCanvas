/**
*  Module to handle the root Canvas  - game Canvas
*  This canvas acts the  root container for all other elements
**/

define (function(require){

    return function (model,uiManager){
        var gameCanvas,
            drawObjects,
            gameConfig = model.getGameConfig(),
            UIUpdateHandler,
            ratio = gameConfig.initialCanvasWidth/gameConfig.initialCanvasHeight,
            mainContainer = document.getElementById('main-container');

        /**
         *  Initialise function, calls the function to add gameCanvas and store the uiupdatehandler on canvas resize
         * @param updateHandler
         */
        function initialise(updateHandler){
            UIUpdateHandler = updateHandler;
            createGameCanvas();
        }

        /**
         * Function to add gameCanvas, to which all the elements are drawn
         */
        function createGameCanvas(){
            gameCanvas = document.createElement("canvas");
            gameCanvas.width=gameConfig.initialCanvasWidth;
            gameCanvas.height=gameConfig.initialCanvasHeight;
            gameCanvas.style.backgroundColor="black";
            gameCanvas.setAttribute("id","gameCanvas");
            gameCanvas.id ="gameCanvas";
            mainContainer.appendChild(gameCanvas);
            addGameTitle();
            resizeCanvas();
            window.addEventListener('resize', resizeCanvas);
        }

        /**
         * Function returns the gameCanvas element
         * @returns {canvas element}
         */
        function getGameCanvas(){
            return gameCanvas;
        }

        /**
         *  Function to add the gameTitle
         */
        function addGameTitle(){
            var titleCanvas,
                ctx;
            titleCanvas = document.createElement("canvas");
            titleCanvas.width = gameConfig.initialCanvasWidth;
            titleCanvas.height = 50;
            ctx = titleCanvas.getContext('2d');
            ctx.clearRect(0,0, titleCanvas.width, titleCanvas.height);
            ctx.font = "50px   Tangerine";
            ctx.fillStyle = "red";
            ctx.textAlign = "center";
            titleCanvas.x = 0;
            titleCanvas.y = 0;
            ctx.fillText("Fruit Slot",titleCanvas.width/2,40);
            titleCanvas.id = "titleCanvas";
            titleCanvas.update = true;
            //gameCanvas.getContext('2d').drawImage(titleCanvas,titleCanvas.x,titleCanvas.y);
            drawObjects = model.getDrawObjects();
            drawObjects.push(titleCanvas);
            model.setDrawObjects(drawObjects);
            update();
        }

        /**
         * resize event handler, resize the canvas accordingly
         *  recalculates the width and height maintaining the initial canvas ratio and
         *  rescale the canvas to apply the new change.
         */
        function resizeCanvas(){
            var scaledHeight,
                scaledWidth,
                scaleX,
                scaleY,
                ctx;
            gameCanvas.width = window.innerWidth;
            gameCanvas.height = window.innerHeight;
            scaledHeight = window.innerHeight;
            scaledWidth = window.innerWidth;
            if(scaledWidth/scaledHeight !== ratio){
                if(scaledWidth > scaledHeight){
                    scaledWidth = (scaledHeight)*ratio;
                }else{
                    scaledHeight = (scaledWidth)*ratio;
                }
            }
            scaleX = scaledWidth / gameConfig.initialCanvasWidth;
            scaleY = scaledHeight /gameConfig.initialCanvasHeight;
            ctx= gameCanvas.getContext('2d');
            ctx.scale(scaleX,scaleY);
            model.setCanvasScale(scaleX,scaleY);
            UIUpdateHandler(); // notify teh UI to update itself based on the new values
            update();
        }

        /**
         * The core drawing function which re-draws each drawObjects and its childrens if any on the root game Canvas.
         */
        function update(){
            drawObjects =  model.getDrawObjects();
            gameCanvas.getContext('2d').clearRect(0,0, gameCanvas.width, gameCanvas.height);
            for(var i=0; i<drawObjects.length; i++){
                if(drawObjects[i].update){
                    if(typeof drawObjects[i].childrens !== "undefined" && drawObjects[i].childrens.length > 0){
                        for(var j= 0; j < drawObjects[i].childrens.length; j++){
                            var obj = drawObjects[i].childrens[j];
                            drawObjects[i].getContext('2d').clearRect(0,0, drawObjects[i].width, drawObjects[i].height);
                            drawObjects[i].getContext('2d').drawImage(obj, obj.x, obj.y,obj.width,obj.height);
                        }
                    }
                    gameCanvas.getContext('2d').drawImage(drawObjects[i], drawObjects[i].x, drawObjects[i].y,drawObjects[i].width,drawObjects[i].height);
                }
            }
        }


        public ={
            initialise:initialise,
            addGameTitle:addGameTitle,
            resizeCanvas:resizeCanvas,
            getGameCanvas:getGameCanvas,
            update:update

        };


        return public;
    }

});
