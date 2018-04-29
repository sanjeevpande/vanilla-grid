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

	var drag = {
		dragDirection: null,
		draggedRowId: null,
		dragEnteredRowId: null,
		dragStart: function(ev) {
			this.draggedRowId = ev.target.dataset.rowid;
		},
		dragEnter: function(ev) {
			if(!this.draggedRowId) {
				return;
			}
			var enteredRowId = parseInt(ev.target.dataset.rowid, 10);
			this.dragDirection =  enteredRowId < this.dragEnteredRowId ? 'up' : 'down';
			this.dragEnteredRowId = enteredRowId;
		},
		dragLeave: function(ev) {
			if(!this.draggedRowId) {
				return;
			}
			this.addEmptyRow(parseInt(ev.target.dataset.rowid, 10));
		},
		drop: function(ev) {
			if(!this.draggedRowId) {
				return;
			}
			this.dragDirection = null;
			this.draggedRowId = null;
			this.dragEnteredRowId = null;
			this.removeEmptyNode();
			document.dispatchEvent(new CustomEvent('reorder', { bubbles: true, detail: { draggedId: this.draggedRowId, droppedId: ev.target.dataset.rowid } }))
		},
		removeEmptyNode: function() {
			document.querySelectorAll('.empty-node').forEach(function(emptyNode) {
				emptyNode.parentElement.removeChild(emptyNode);
			});
		},
		addEmptyRow: function(leftRowIndex) {
			this.removeEmptyNode();
			var allColumns = document.querySelectorAll('.row-column');
			allColumns.forEach(function(rowColumn) {
				var emptyNode = document.createElement('div');
				emptyNode.className = 'empty-node';
				var index = (this.dragDirection === 'up') ? leftRowIndex - 1: leftRowIndex;
				rowColumn.insertBefore(emptyNode, rowColumn.children[index]);
			});
		}
	};

	vanillaGrid.utils = {
		pinColumns: pinColumns,
		sortRows: sortRows,
		columnChooser: columnChooser,
		drag: drag
	};

})();