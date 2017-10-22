define('mocks/uibModalInstance', ['mocks'], function(mocks) {
    'use strict';
    mocks.service('mock.uibModalInstance', ['$q', function($q) {
        var uibModalInstance = this;

        this.close = jasmine.createSpy('close');
    }]);
});
