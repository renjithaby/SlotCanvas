/**
 *  Module that sets up the initial game config json
 */

define(function(require){
    
    return function (){
        // initial game config
        var gameConfig = {

            "initialCanvasWidth": 320,
            "initialCanvasHeight": 300,
            "symbolWidth": 60,
            "symbolHeight": 60,
            "reelHeight": 240,
            "reelWidth": 60,
            "reelStartX": 10,
            "reelStartY": 50,
            "reelCount": 5,

            "sources": [{
                "url": "./images/spinButton.png",
                "name": "spinButton"
                }, {
                "url": "./images/apple-icon.png",
                "name": "appleIcon"
                }, {
                "url": "./images/bananas-icon.png",
                "name": "bananasIcon"
                }, {
                "url": "./images/cherry-icon.png",
                "name": "cherryIcon"
                }, {
                "url": "./images/lemon-icon.png",
                "name": "lemonIcon"
                }, {
                "url": "./images/pineapple-icon.png",
                "name": "pineappleIcon"
                }, {
                "url": "./images/strawberry-icon.png",
                "name": "strawberryIcon"
            }],

            "initialResults": {
                "reels": [
                    [1, 1, 1, 1, 1, 1, 1],
                    [2, 2, 2, 2, 2, 2, 2],
                    [3, 3, 3, 3, 3, 3, 3],
                    [4, 4, 4, 4, 4, 4, 4],
                    [5, 5, 5, 5, 5, 5, 5]
                ],

                "winLines": [{
                    "positions": [1, 1, 1, 1, 1],
                    "color": "red"
                    }, {
                    "positions": [2, 2, 2, 2, 2],
                    "color": "purple"
                    }, {
                    "positions": [3, 3, 3, 3, 3],
                    "color": "blue"
                    }, {
                    "positions": [4, 4, 4, 4, 4],
                    "color": "yellow"
                    }, {
                    "positions": [3, 4, 3, 4, 3],
                    "color": "pink"
                }],

                "resultLines": [{
                    "positions": [1, 1, 1, 1, 1],
                    "color": "red",
                    "animations": [1, 1, 1, 0, 0]
                    }, {
                    "positions": [1, 2, 3, 4, 1],
                    "color": "purple",
                    "animations": [1, 1, 0, 0, 0]
                    }, {
                    "positions": [1, 2, 3, 1, 1],
                    "color": "blue",
                    "animations": [1, 1, 1, 1, 0]
                    }, {
                    "positions": [4, 4, 4, 4, 4],
                    "color": "yellow",
                    "animations": [1, 1, 0, 0, 0]
                    }, {
                    "positions": [3, 4, 3, 4, 3],
                    "color": "pink",
                    "animations": [1, 1, 0, 0, 0]
                    }]

                }

        }

        // mock results each spin takes random results from these mockresults.
        var mockResults = [
            {
                "reels": [
                    [1, 1, 1, 2, 3, 3, 1],
                    [2, 2, 1, 2, 3, 3, 2],
                    [3, 3, 1, 2, 3, 3, 3],
                    [4, 4, 4, 4, 1, 3, 4],
                    [5, 5, 5, 5, 5, 5, 5]
                ],
                "resultLines": [{
                    "positions": [1, 1, 1, 1, 1],
                    "color": "red",
                    "animations": [1, 1, 1, 0, 0]
                }, {
                    "positions": [2, 2, 2, 2, 2],
                    "color": "purple",
                    "animations": [1, 1, 1, 0, 0]
                }, {
                    "positions": [3, 3, 3, 3, 3],
                    "color": "blue",
                    "animations": [1, 1, 1, 0, 0]
                }, {
                    "positions": [4, 4, 4, 4, 4],
                    "color": "yellow",
                    "animations": [1, 1, 1, 1, 0]
                }, {
                    "positions": [3, 4, 3, 4, 3],
                    "color": "pink",
                    "animations": [1, 1, 1, 1, 0]
                }]
            },

            {
                "reels": [
                    [1, 1, 3, 2, 5, 3, 1],
                    [2, 2, 3, 1, 4, 5, 2],
                    [3, 3, 3, 2, 5, 3, 3],
                    [4, 4, 3, 4, 1, 5, 4],
                    [5, 5, 5, 4, 1, 1, 5]
                ],
                "resultLines": [{
                    "positions": [1, 1, 1, 1, 1],
                    "color": "red",
                    "animations": [1, 1, 1, 1, 0]
                }, {
                    "positions": [3, 4, 3, 4, 3],
                    "color": "pink",
                    "animations": [1, 1, 1, 1, 0]
                }]
            },

            {
                "reels": [
                    [1, 1, 1, 2, 3, 5, 1],
                    [2, 2, 2, 2, 3, 4, 2],
                    [3, 3, 1, 2, 3, 1, 3],
                    [4, 4, 4, 4, 1, 3, 4],
                    [5, 5, 5, 5, 5, 5, 5]
                ],
                "resultLines": [{
                    "positions": [2, 2, 2, 2, 2],
                    "color": "purple",
                    "animations": [1, 1, 1, 0, 0]
                }, {
                    "positions": [3, 3, 3, 3, 3],
                    "color": "blue",
                    "animations": [1, 1, 1, 0, 0]
                }]
            },
            {
                "reels": [
                    [1, 1, 1, 3, 3, 4, 1],
                    [2, 2, 1, 5, 4, 4, 2],
                    [3, 3, 1, 2, 3, 4, 3],
                    [4, 4, 4, 4, 1, 3, 4],
                    [5, 5, 4, 1, 3, 5, 5]
                ],
                "resultLines": [{
                    "positions": [1, 1, 1, 1, 1],
                    "color": "red",
                    "animations": [1, 1, 1, 0, 0]
                }, {
                    "positions": [4, 4, 4, 4, 4],
                    "color": "yellow",
                    "animations": [1, 1, 1, 0, 0]
                }]
            },
            {
                "reels": [
                    [1, 1, 1, 2, 3, 3, 1],
                    [2, 2, 5, 4, 3, 2, 2],
                    [3, 3, 1, 2, 3, 5, 3],
                    [4, 4, 4, 2, 3, 3, 4],
                    [5, 5, 1, 5, 3, 4, 5]
                ],
                "resultLines": [{
                    "positions": [3, 3, 3, 3, 3],
                    "color": "blue",
                    "animations": [1, 1, 1, 1, 1]
                }]
            }
        ];




        function getConfig(){
            return  gameConfig;
        }

        function getMockResults() {
            return  mockResults;
        }


        var public = {
            getConfig: getConfig,
            getMockResults:getMockResults
        };
    
        return public;

    }
});