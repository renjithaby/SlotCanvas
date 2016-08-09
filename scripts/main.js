/**
 *  Main Module, the starting point, which connects all the individual modules.
 */
define(function(require){

    var preloader = require('./preloader');
    var uiManager = require('./UIManager');
    var winlineManager = require('./winlineManager');
    var reelManager = require('./reelManager');
    var config = require('./config');
    var util = require('./util');
    var model = require('./model');
    var gameCanvasManager = require('./gameCanvasManager');

    config = new config();
    model = new model();
    config.getConfig();
    model.setGameConfig(config.getConfig());
    model.setMockResults(config.getMockResults());
    util = new util();
    preloader= new preloader(model);
    gameCanvasManager = new gameCanvasManager(model);
    uiManager = new uiManager(model,gameCanvasManager,util);
    winlineManager= new winlineManager(model,gameCanvasManager,uiManager,util);
    reelManager = new reelManager(model,preloader,winlineManager,gameCanvasManager,util,uiManager);

    // call the preloader to preload the images
    preloader.preLoadImages(initialise);

    /**
     * the initialise function which is called once the preloading is complete, as a callback
     */
    function initialise(){
        var gameConfig = model.getGameConfig();
        model.setResults(gameConfig.initialResults);
        gameCanvasManager.initialise(uiManager.updateUIPositions);
        reelManager.addReelElements();
        reelManager.addSymbolsToReels();
        uiManager.initialise(reelManager.spin);
        winlineManager.addWinLineCanvas();
        winlineManager.addResultWinLineCanvas();
        gameCanvasManager.update();
    }


    function updateUIPosition(){

    }


});




