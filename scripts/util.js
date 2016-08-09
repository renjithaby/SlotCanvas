/**
 *  A util module to hold some general useful functionality.
 */
define (function(require){
   
   return function () {

       /**
        *  utility function to retrieve an object with a given id, from given object array
        */
       function getObject(ObjectArray, id) {
           for (var i = 0; i < ObjectArray.length; i++) {
               if (ObjectArray[i].id === id) {
                   return ObjectArray[i];
               }
           }
       }

       var public = {
           getObject: getObject
       };


       return public;
   }
    

});

    
    