define(function(require) {
	'use strict';

	var utils = require('utils/utils');

	function resolveToken(localize, token) {
		var values = token.split('|');
		if (!values.length) return '';

		var output = localize.getLocalizedString(values.shift());
		return output;
		//return interpolate(output, values);
	}



	return angular.module('sui-location', [])

	.factory('localize', function($http, $rootScope, $q) {

		var dictionary = [];
		var docElement = document.documentElement;
		var language = docElement.getAttribute('lang') ||
				docElement.getAttribute('xml:lang');

		var defaultUrls = {
			globals: 'locale/lang_default.json',
			commons: 'locale/lang_commons_default.json'
		};

		function addToDictionary(value) {
			dictionary = dictionary.concat(value);
		}

		function download(url, defaults) {
			return $http({
				method: 'GET',
				url: url,
				cache: false
			}).then(addToDictionary, function(message, code) {
				if(code !== 404) return;
				return $http({
					method: 'GET',
					url: defaults,
					cache: false
				}).then(addToDictionary);
			});
		}

		function update() {
			$rootScope.$broadcast('localizeResourcesUpdates');
		}


		function loadResources() {
			var url = {
				globals: 'locale/lang_' + language + '.json',
				commons: 'locale/lang_' + language + '_commons.json'
			};

			dictionary = [{}];

			$q.all([
				download(url.globals, defaultUrls.globals),
				download(url.commons, defaultUrls.commons),
			]).then(update, update);
		}

		function setLanguage(value) {
			language = value;
			loadResources();
		}

		function interpolate(text, params) {
			if (!text || !params || !params.length) return;

			for (var i = 0, len = params.length - 1; i < len; i++) {
				text = text.replace('{' + i + '}', params[i + 1]);
			}

			return text;
		}

		function getLocalizedString(value) {
			if (!dictionary.length) return '';

			var results = dictionary.filter(function(element) {
				return element.key === value;
			});

			var entry = results[0];
			return entry ? entry.value : value;
		}

		function translate(text) {
			text = getLocalizedString(text);
			var tokens = Array.prototype.slice.call(arguments, 1);
			return interpolate(text, tokens);
		}

		return {
			addToDictionary: addToDictionary,
			setLanguage: setLanguage,
			getLocalizedString: getLocalizedString,
			translate: translate,
		};
	})

	// translation directive that can handle dynamic strings
	// updates the text value of the attached element
	// usage <span data-translate="TOKEN" ></span>
	// or
	// <span data-translate="TOKEN|VALUE1|VALUE2" ></span>
	.directive('translate', function(localize) {
		return {
			restrict: 'EAC',

			link: function(scope, iElement, iAttrs) {
				function update() {
					iElement.text(resolveToken(localize, iAttrs.translate));
				}

				scope.$on('localizeResourcesUpdates', update);
				iAttrs.$observe('translate', update);
			}
		};
	})

	// translation directive that can handle dynamic strings
	// updates the attribute value of the attached element
	// usage <span data-translate-attr="TOKEN|ATTRIBUTE" ></span>
	// or
	// <span data-translate-attr="TOKEN|ATTRIBUTE|VALUE1|VALUE2" ></span>
	.directive('translateAttr', function(localize) {

		utils.deprecated(
			'Directive "translateAttr" at module "sui-location"',
			'directive "translate" at module "sui-location"'
		);

		return {
			restrict: 'EAC',

			link: function(scope, iElement, iAttrs) {
				scope.$on('localizeResourcesUpdates', function() {
					iElement.text(resolveToken(localize, iAttrs.i18nAttr));
				});
				iAttrs.$observe('translateAttr', function (value) {
					iElement.text(resolveToken(localize, value));
				});
			}
		};
	});
});
