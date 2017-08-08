define(['angular',
        'angularMocks',
        'services',
        'services/validationService',
        'services/errorService'], function() {
    describe('Starting validation service test', function() {
        beforeEach(module('services'));

        var validationService;
        beforeEach(inject(function(_ValidationService_) {
            validationService = _ValidationService_;
        }));

        it('is able to validate email address', function() {
            console.log('starting validation service test');
            expect(validationService.validateEmailAddress('test@test.com'));
            expect(validationService.validateEmailAddress('test@gmail.com'));
            expect(!validationService.validateEmailAddress('test'));
            expect(!validationService.validateEmailAddress('test@'));
        });

        it('is able to validate a password', function() {
            console.log('starting password validation test');
            expect(validationService.validatePassword('test@gmail.com'));
            expect(!validationService.validatePassword('test'));
        });
    });
});
