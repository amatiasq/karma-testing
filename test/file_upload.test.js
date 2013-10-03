define(function(require) {
	'use strict';
	var assert = require('chai').assert;
	var sinon = require('sinon');

	// SUT
	require('file_upload');

	describe('File Upload module', function() {
		angular.module('sui-file-upload')
			.value('FileAPIFlashPath', '');

		beforeEach(module('sui-file-upload'));

		describe('File Upload directive', function() {

			it('should invoke onchange attr when changed', inject(function($compile, $rootScope) {
				var fakeFiles = {};
				var stub = sinon.stub(FileAPI, 'getFiles');
				var listener = sinon.spy();

				$rootScope.cosa = listener;
				stub.returns(fakeFiles);

				var link = $compile('<input type="file" sui-file-selector onfileselected="cosa(files)"></input>');
				var element = link($rootScope)[0];
				var event = document.createEvent('HTMLEvents');
    			event.initEvent('change', false, true);
				element.dispatchEvent(event);

				assert(listener.calledOnce, 'function was not invoked');
				assert(listener.calledWithExactly(fakeFiles), 'argument is not what expected');
			}));
		});

		describe('File Upload service', function() {

			it('should invoke FileAPI library with the passed configuration', inject(function(suiFileUpload) {
				var fakeConfig = {};
				var mock = sinon.mock(FileAPI);
				mock.expects('upload').once().withArgs(fakeConfig);

				suiFileUpload(fakeConfig);

				mock.verify();
			}));

			function testReturnedPromise(action) {
				inject(function($rootScope, suiFileUpload) {
					var stub = sinon.stub(FileAPI, 'upload')
					var spy = sinon.spy();
					var value = {};

					var promise = suiFileUpload({});
					action(promise, stub, spy, value);

					// This flushes promises chain so the resolved promises invokes it's callbacks
					$rootScope.$apply();

					assert(spy.called, 'promise was not resolved');
					stub.restore();
				});
			}

			it('should return a promise to be resolved when FileAPI invokes complete callback', function() {
				testReturnedPromise(function(promise, stub, spy, returnValue) {
					promise.then(spy);

					// This will invoke 'complete' callback with no errors and a empty object as return value
					stub.yieldTo('complete', null, returnValue);
				});
			});

			it('should return a promise to be rejected when FileAPI invokes complete callback with an error', function() {
				testReturnedPromise(function(promise, stub, spy, errorValue) {
					promise.then(null, spy);

					// This will invoke 'complete' callback with an error
					stub.yieldTo('complete', errorValue);
				});
			});

			it('should propagate FileAPI\'s "progress" callback', inject(function(suiFileUpload) {
				var stub = sinon.stub(FileAPI, 'upload');
				var spy = sinon.spy();

				suiFileUpload({
					progress: spy
				});

				// This will invoke 'progress' callback
				stub.yieldTo('progress');
				assert(spy.calledOnce, 'progress callback was not invoked');

				stub.yieldTo('progress');
				assert(spy.calledTwice, 'progress callback was not invoked the second time');
				stub.restore();
			}));
		});
	});
});
