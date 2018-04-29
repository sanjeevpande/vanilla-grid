var vanillaGrid = vanillaGrid || {};

(function() {

	vanillaGrid.init = function(container, config) {
		vanillaGrid.templates.initialize(container, config); 
		vanillaGrid.events.initialize(config);
	}

})();