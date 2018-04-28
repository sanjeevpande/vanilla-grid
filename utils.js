var vanillaGrid = vanillaGrid || {};

(function(undefined) {

	var pinColumns = function(target, className) {
		var headerColumn = target.parentElement;
		var index = Array.prototype.slice.call(headerColumn.parentElement.children).indexOf(headerColumn);
		if(/unpinned/.test(className)) {
			//freeze column
			var classList = headerColumn.querySelector('.unpinned').classList;
			classList.add('pinned');
			classList.remove('unpinned');
			
			var bodyColumn = document.getElementById('unfreezedGridBody').children[index];
			document.getElementById('freezedGridHeader').appendChild(headerColumn);
			document.getElementById('freezedGridBody').appendChild(bodyColumn);
		} else {
			//unfreeze column
			var classList = headerColumn.querySelector('.pinned').classList;
			classList.add('unpinned');
			classList.remove('pinned');

			var bodyColumn = document.getElementById('freezedGridBody').children[index];
			document.getElementById('unfreezedGridHeader').appendChild(headerColumn);
			document.getElementById('unfreezedGridBody').appendChild(bodyColumn);
		}
	};

	vanillaGrid.utils = {
		pinColumns: pinColumns
	};

})();