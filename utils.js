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

	var sortRows = function(target, className) {
		var sortOrder;
		var sortKey = target.dataset.sortkey;
		var headerColumn = target.parentElement;
		if(/sort-desc/.test(className)) {
			//sort ascending
			sortOrder = 'ASC';
			var classList = headerColumn.querySelector('.sort-desc').classList;
			classList.add('sort-asc');
			classList.remove('sort-desc');
		} else {
			//sort descending
			sortOrder = 'DESC';
			var classList = headerColumn.querySelector('.sort-asc').classList;
			classList.add('sort-desc');
			classList.remove('sort-asc');
		}
		document.dispatchEvent(new CustomEvent('sort', { bubbles: true, detail: { sortKey: sortKey, sortOrder: sortOrder } }))
	};

	var columnChooser = function(columnsToHide) {
		columnsToHide.forEach(function(columnKey) {
			document.querySelector('.' + columnKey + '-column').classList.add('hide');
		});
	};

	vanillaGrid.utils = {
		pinColumns: pinColumns,
		sortRows: sortRows,
		columnChooser: columnChooser
	};

})();