/**
 * Module that keeps track of all data values.
 */

define (function(require){
   
   
    return function (){

        var gameConfig = {},
            drawObjects = [],
            reelObjects = [],
            preLoadImages = [],
            canvasScale = {},
            resultWinLines = {},
            results = {},
            mockResults = {}
        
        
        function setGameConfig(config){
            gameConfig = config;
        }
        
        function getGameConfig(){
           return gameConfig;
        }

        function setDrawObjects(objArray){
           drawObjects = objArray;
        }

        function getDrawObjects(){
           return drawObjects;
        }

        function setReelObjects(objArray){
            reelObjects = objArray;
        }

        function getReelObjects(){
            return reelObjects;
        }

        function setPreLoadedImages(images){
            preLoadImages = images;
        }

        function getPreLoadedImages(){
           return preLoadImages;
        }

        function setCanvasScale(scaleX, scaleY){
            canvasScale.scaleX = scaleX;
            canvasScale.scaleY = scaleY;
        }

        function getCanvasScale(){
            return canvasScale;
        }

        function setResultWinLines(resultLinesObj){
            resultWinLines = resultLinesObj;
        }

        function getResultWinLines(){
            return resultWinLines;
        }

        function setResults(resultObj){
            results = resultObj;
        }

        function getResults(){
            return results;
        }

        function setMockResults(result){
            mockResults = result;
        }
        function getMockResults(){
           return  mockResults;
        }

        public ={
            getGameConfig:getGameConfig,
            setGameConfig:setGameConfig,
            setDrawObjects:setDrawObjects,
            getDrawObjects:getDrawObjects,
            setReelObjects:setReelObjects,
            getReelObjects:getReelObjects,
            setPreLoadedImages:setPreLoadedImages,
            getPreLoadedImages:getPreLoadedImages,
            setCanvasScale:setCanvasScale,
            getCanvasScale:getCanvasScale,
            setResultWinLines:setResultWinLines,
            getResultWinLines:getResultWinLines,
            getResults:getResults,
            setResults:setResults,
            setMockResults:setMockResults,
            getMockResults:getMockResults
        };


        return public;
    }
    
});
