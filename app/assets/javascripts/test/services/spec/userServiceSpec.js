define(['angular', 'angularMocks', 'services'], function() {
    'use strict';

        describe('User Service', function() {
            var loginRequestHandler,
                logoutRequestHandler,
                userService,
                $httpBackend,
                $cookies,
                httpResponse,
                createRequestHandler;

            beforeEach(module('services'));
            beforeEach(module('ngCookies'));


            beforeEach(inject(function(_$cookies_, _UserService_, _$httpBackend_) {
                userService = _UserService_;
                $httpBackend = _$httpBackend_;
                $cookies = _$cookies_;

                httpResponse = {
                        email: 'test123@test.com',
                        token: 'AAAAAAAAAAAAAAA'
                };

                loginRequestHandler = $httpBackend.when('POST', '/session')
                    .respond(httpResponse);
                logoutRequestHandler = $httpBackend.when('DELETE', '/session')
                    .respond(httpResponse);
                createRequestHandler = $httpBackend.when('POST', '/users')
                    .respond(httpResponse);
            }));

            afterEach(function() {
                $httpBackend.verifyNoOutstandingExpectation();
                $httpBackend.verifyNoOutstandingRequest();
            });


            it('should be able to instantiate a user service', function() {
                expect(typeof userService.createUser !== 'undefined');
            });

            it('is able to login', function() {
                $httpBackend.expect('POST', '/session');
                userService.loginUser('test123@test.com', 'hello123').then(function(response) {
                    expect(response.data.email == httpResponse.email);
                    expect(userService.user.email === httpResponse.email);
                    expect($cookies.get('_dog_sitting_app_token') === httpResponse.token);
                });
                $httpBackend.flush();
            });

            it('is able to logout', function() {
                $httpBackend.expect('DELETE', '/session');
                userService.logoutCurrentUser().then(function(response) {
                    expect(response.data.email == httpResponse.email);
                    expect(userService.user.email === httpResponse.email);
                    expect(typeof $cookies._dog_sitting_app_token  === 'undefined');
                });
                $httpBackend.flush();
            });

            it('is able to enroll a user', function() {
                $httpBackend.expect('POST', '/users');
                userService.createUser('test123@test.com', 'hello123').then(function(response) {
                    expect(response.data.email == httpResponse.email);
                    expect(userService.user.email === httpResponse.email);
                    expect($cookies.get('_dog_sitting_app_token') === httpResponse.token);
                });
                $httpBackend.flush();
            });

            it('is able to determine if a user is logged in', function() {
                $cookies.remove('_dog_sitting_app_token');
                expect($cookies._dog_sitting_app_token).toBeUndefined();
                expect(!userService.isUserLoggedIn());
                $cookies.put('_dog_sitting_app_token', 'AAAAAAAAAAAA');
                expect(userService.isUserLoggedIn());
            });
    });
});
