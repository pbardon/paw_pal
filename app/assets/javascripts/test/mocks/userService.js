define(['mockServices'], function(services) {
   services.service('UserService', function() {
       this.createDog = function() {
            console.log('creating dog...');
       }
   });
});