var vanillaGrid = vanillaGrid || {};

(function(undefined) {
	
	var attachEvent = function(elem, eventType, cb, isCapture) {
		if(!isCapture) {
			isCapture = false;
		}
		elem.addEventListener(eventType, cb, isCapture);
	};

	var detachEvent = function(elem, eventType) {
		elem.removeEventListener(eventType);
	};

	var onGridClick = function(ev) {
		var target = ev.target;
		var className = target.className;
		if(/pin-icon/.test(className)) {
			vanillaGrid.utils.pinColumns(target, className); 
		}
		if(/sort-icon/.test(className)) {
			vanillaGrid.utils.sortRows(target, className); 
		}
	};

	vanillaGrid.events = {
		initialize: function() {
			attachEvent(document.getElementById('gridWrapper'), 'click', onGridClick, false);
		}
	};

})();