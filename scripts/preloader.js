/**
 *  Module that preloads the images and fonts used
 */
require.config({
    // requirejs plugins needed to load the custom fonts
    paths:{
        css:'./requirePlugin/css.0.1.8',
        font:'./requirePlugin/font.0.2.0',
        propertyParser:'./requirePlugin/helper/propertyParser.0.1.0'
    }
});

define(['require','font!google,families:[Tangerine]'],function(require){
    
    return function (model){
        var gameConfig = model.getGameConfig();
        var images = {};

        /**
         * Function that preloads images and once all preloading is finished calls the callback function
         * @param callback
         */
        function preLoadImages( callback){
            var imagesLoaded=0;
            for(var i=0;i<gameConfig.sources.length;i++){
                var image = new Image();
                image.src= gameConfig.sources[i].url;
                images[gameConfig.sources[i].name]= image;
                image.onload=function(){ 
                    imagesLoaded+=1;
                    if(imagesLoaded===gameConfig.sources.length){
                        model.setPreLoadedImages(images);
                        callback();
                    }
                }
            }   
        }


        var public = {
            preLoadImages: preLoadImages
        }

        return public;
    }
});