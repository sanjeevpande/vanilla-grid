(function(undefined) {

	var config = CONFIG;
	
	var templates = {
		freezedGrid: function(config) {
			
			var freezedHeaderHTML = '';
			var freezedBodyHTML = '';

			config.head.forEach(function(header) {

				freezedHeaderHTML += `<div class="column"><div>${header.displayName}</div></div>`;
				var freezedBodyColumn = '<div class="column">';
				config.row.forEach(function(row) {
					freezedBodyColumn += `<div>${row[header.key]}</div>`;
				});
				freezedBodyColumn += '</div>';
				freezedBodyHTML += freezedBodyColumn;
			});

			return `<div id="freezedGrid"><div id="freezedHeader">${freezedHeaderHTML}</div><div id="freezedBody">${freezedBodyHTML}</div></div>`;
		},
		unfreezedGrid: function() {
			return `<div id="unfreezedGrid"><div id="vanilla-unfreezed-grid">vanilla-unfreezed-grid</div></div>`;
		},
		actionGrid: function() {
			return `<div id="actionGrid"><div id="vanilla-action-grid">vanilla-action-grid</div></div>`;
		}
	};

	var renderVanillaGrid = function() {
		document.getElementById('container').innerHTML = '<div id="gridWrapper">' + templates['freezedGrid'](config) + templates['unfreezedGrid'](config) + templates['actionGrid'](config) + '</div>';
	};

	renderVanillaGrid();


})();