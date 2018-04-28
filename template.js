var vanillaGrid = vanillaGrid || {};

(function(undefined) {

	var renderGrid = function(config) {
		
		var rows = config.row;

		var freezedGridHeader = '<div id="freezedGridHeader" class="freezed-grid-header grid-header">';
		var freezedGridBody = '<div id="freezedGridBody" class="freezed-grid-body grid-body">';
		
		var unfreezedGridHeader = '<div id="unfreezedGridHeader" class="unfreezed-grid-header grid-header">';
		var unfreezedGridBody = '<div id="unfreezedGridBody" class="unfreezed-grid-body grid-body">';

		config.head.forEach(function(header) {

			var pinnedClass = (header.isFreeze) ? 'pinned' : 'unpinned';

			var headerColumn = '<div class="grid-column"><div>' + header.displayName + '</div><div class="pin-icon ' + pinnedClass + '"></div></div>';

			var bodyColumn = '<div class="grid-column">';
			rows.forEach(function(row) {
				bodyColumn += '<div>' + row[header.key] + '</div>';
			});
			bodyColumn += '</div>';

			if(header.isFreeze) {
				freezedGridHeader += headerColumn;
				freezedGridBody += bodyColumn;
			} else {
				unfreezedGridHeader += headerColumn;
				unfreezedGridBody += bodyColumn;
			}
		});

		var freezedGrid = '<div id="freezedGrid">' + freezedGridHeader + '</div>' + freezedGridBody + '</div></div>';
		var unfreezedGrid = '<div id="unfreezedGrid">' + unfreezedGridHeader + '</div>' + unfreezedGridBody + '</div></div>';

		return freezedGrid + unfreezedGrid;
	};

	var actionGrid = function(config) {
		return '<div id="actionGrid">' + renderGrid(config) + '</div>';
	};

	var initialize = function(elem, config) {
		elem.innerHTML = '<div id="gridWrapper" class="grid-wrapper">' + renderGrid(config) + '</div>';
	};

	vanillaGrid.templates = {
		initialize: initialize
	};

})();