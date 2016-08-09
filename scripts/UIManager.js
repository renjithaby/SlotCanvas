/**
 * Module to handle the UI elements for the games, currently there is only spin button
 */
define (function(require){

    return function(model, canvasManager, util){

        var uiCanvas,
            gameCanvas,
            gameConfig;

        /**
         * Initialise function which adds the main UICanvas and Spin Buttons
         * @param spinBtnClickHandler -  spin button click handler
         */
        function initialise(spinBtnClickHandler){
            gameCanvas = canvasManager.getGameCanvas();
            gameConfig = model.getGameConfig();
            addUICanvas();
            addSpinButton(spinBtnClickHandler);
            updateUIPositions();
            gameCanvas.addEventListener("mousedown", handleMouseDown,false); // add the mousedown handler for the mainroot container
        }

        /**
         *  Function to add the main Ui container UICanvas
         */
        function addUICanvas(){
            var drawObjects;
            uiCanvas = document.createElement("canvas");
            uiCanvas.width = gameCanvas.width;
            uiCanvas.height = gameCanvas.height;
            uiCanvas.x = 0;
            uiCanvas.y = 0;
            uiCanvas.id ="ui";
            uiCanvas.update=true;
            uiCanvas.childrens=[];
            drawObjects= model.getDrawObjects();
            drawObjects.push(uiCanvas);
            model.setDrawObjects(drawObjects);
        }

        /**
         * Function to add the Spin Button
         * @param clickHandler - spin btn click handler
         */
        function addSpinButton(clickHandler){
            var spinBtnCanvas,
                btnWidth = 60,
                btnHeight = 30;

            spinBtnCanvas = document.createElement("canvas");
            spinBtnCanvas.width = btnWidth;
            spinBtnCanvas.height = btnHeight;
            spinBtnCanvas.x= 0;
            spinBtnCanvas.y= 0;
            uiCanvas.childrens.push(spinBtnCanvas);
            uiCanvas.spinBtnCanvas = spinBtnCanvas;
            uiCanvas.getContext('2d').drawImage(spinBtnCanvas,spinBtnCanvas.x,spinBtnCanvas.y);
            spinBtnCanvas.handleMouseDown = clickHandler;
            enableSpinButton();
        }

        /**
         * Function to update Ui Positions depending on the orientation
         * In landscape UI elements will be positioned to the right of the Reel
         * In portrait UI elements will be positioned to the bottom of the Reel
         */
        function updateUIPositions(){

                 if(typeof uiCanvas !== "undefined"){
                    uiCanvas.width=gameCanvas.width;
                    uiCanvas.height=gameCanvas.height;
                    if(window.innerWidth > window.innerHeight){
                        //landscape
                        uiCanvas.childrens[0].x=5*gameConfig.reelWidth+30;
                        uiCanvas.childrens[0].y=gameConfig.reelHeight/2;
                    }else{
                        //portrait
                        uiCanvas.childrens[0].x=5*gameConfig.reelWidth/2-10;
                        uiCanvas.childrens[0].y=gameConfig.reelHeight+20+util.getObject(model.getDrawObjects(),"titleCanvas").height;
                    }
                 }
        }

        /**
         * gamecanvas mouse down handler
         * based on the mouse down position, will find the leaf child canvas element in that position, and call its handleMouseDown property
         * @param e
         */
        function handleMouseDown(e){
            if(event.target.nodeName === "CANVAS"){
                var pos = getMouse(event, event.target);
                mouseDown = true;
                var targetElm = getCanvasInPos(pos.x,pos.y);
                if(targetElm && targetElm.handleMouseDown && targetElm.mouseEnabled){
                    targetElm.handleMouseDown();
                }
            }
        }

        /**
         * function to get the mouse position, after taking account of parent offset positions also
         * @param e
         * @param canvas
         * @returns {{x: number, y: number}}
         */
        function getMouse(e, canvas) {
            var offsetX = 0, offsetY = 0, mx, my;
            if (canvas.offsetParent !== undefined) {
                do {
                    offsetX += canvas.offsetLeft;
                    offsetY += canvas.offsetTop;
                } while ((canvas = canvas.offsetParent));
            }
            mx = (e.clientX|| e.touches[0].clientX) - offsetX;
            my = (e.clientY|| e.touches[0].clientY) - offsetY;
            return {x: mx, y: my};
        }

        /**
         * Function to find the UiCanvas child element in the mousedown position
         * @param x
         * @param y
         * @returns {*}
         */
        function getCanvasInPos(x,y){
            var canvasScale = model.getCanvasScale();
            for(var i=0; i<uiCanvas.childrens.length;i++){
                if(x>uiCanvas.childrens[i].x*canvasScale.scaleX && x<uiCanvas.childrens[i].x*canvasScale.scaleX+uiCanvas.childrens[i].width*canvasScale.scaleX){
                    if(y>uiCanvas.childrens[i].y*canvasScale.scaleY && y<uiCanvas.childrens[i].y*canvasScale.scaleY+uiCanvas.childrens[i].height*canvasScale.scaleY){
                        return uiCanvas.childrens[i];
                    }
                }
            }
            return false;
        }

        /**
         * Function to disable Spin Button and re-draws the spin btn with alpha0.5
         */
        function disableSpinButton(){
            var btnWidth = uiCanvas.spinBtnCanvas.width,
                btnHeight = uiCanvas.spinBtnCanvas.height,
                ctx =  uiCanvas.spinBtnCanvas.getContext('2d');
            uiCanvas.spinBtnCanvas.mouseEnabled=false;
            ctx.globalAlpha = 0.5;
            ctx.clearRect(0,0, btnWidth,btnHeight);;
            ctx.fillStyle='red';
            ctx.fillRect(0,0,btnWidth,btnHeight);
            ctx.strokeStyle="#FFFF00";
            ctx.strokeRect(0,0,btnWidth,btnHeight);
            ctx.font ="25px Tangerine";
            ctx.fillStyle = "blue";
            ctx.textAlign="center";
            ctx.fillText("Spin", btnWidth/2,btnHeight/2+5);
        }

        /**
         * Function to enable Spin Button and re-draws the spin btn with alpha1
         */
        function enableSpinButton(){
            var btnWidth = uiCanvas.spinBtnCanvas.width,
                btnHeight = uiCanvas.spinBtnCanvas.height,
                ctx =  uiCanvas.spinBtnCanvas.getContext('2d');
            uiCanvas.spinBtnCanvas.mouseEnabled=true;
            ctx.globalAlpha = 1;
            ctx.clearRect(0,0, btnWidth,btnHeight);;
            ctx.fillStyle='red';
            ctx.fillRect(0,0,btnWidth,btnHeight);
            ctx.strokeStyle="#FFFF00";
            ctx.strokeRect(0,0,btnWidth,btnHeight);
            ctx.font ="25px Tangerine";
            ctx.fillStyle = "blue";
            ctx.textAlign="center";
            ctx.fillText("Spin", btnWidth/2,btnHeight/2+5);
        }

        var public ={
            initialise:initialise,
            updateUIPositions:updateUIPositions,
            disableSpinButton:disableSpinButton,
            enableSpinButton:enableSpinButton
        }


        return public;
}

});