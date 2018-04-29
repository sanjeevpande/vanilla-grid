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

	var onGridDragStart = function(ev) {
		var className = ev.target.className;
		if(/draggable-icon/.test(className)) {
			vanillaGrid.utils.drag.dragStart(ev);
		}
	};

	var onGridDragEnter = function(ev) {
		var className = ev.target.className;
		vanillaGrid.utils.drag.dragEnter(ev);
	};

	var onGridDragLeave = function(ev) {
		vanillaGrid.utils.drag.dragLeave(ev);
	};

	var onGridDragEnd = function(ev) {
		vanillaGrid.utils.drag.dragEnd(ev);
	};

	var onGridDrop = function(ev) {
		var className = ev.target.className;
		vanillaGrid.utils.drag.drop(ev);
	};

	vanillaGrid.events = {
		initialize: function(config) {
			attachEvent(document.getElementById('gridWrapper'), 'click', onGridClick, false);
			if(config.draggableRows) {
				attachEvent(document.getElementById('gridWrapper'), 'click', onGridClick, false);
				attachEvent(document.getElementById('gridWrapper'), 'dragstart', onGridDragStart, false);
				attachEvent(document.getElementById('gridWrapper'), 'dragenter', onGridDragEnter, false);
				attachEvent(document.getElementById('gridWrapper'), 'dragleave', onGridDragLeave, false);
				attachEvent(document.getElementById('gridWrapper'), 'dragend', onGridDragEnd, false);
				attachEvent(document.getElementById('gridWrapper'), 'drop', onGridDrop, false);
			}
		}
	};

})();