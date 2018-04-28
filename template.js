var vanillaGrid = vanillaGrid || {};

(function(undefined) {

	var renderGrid = function(config) {
		
		var rows = config.row;

		var freezedGridHeader = '<div id="freezedGridHeader" class="freezed-grid-header grid-header">';
		var freezedGridBody = '<div id="freezedGridBody" class="freezed-grid-body grid-body">';
		
		var unfreezedGridHeader = '<div id="unfreezedGridHeader" class="unfreezed-grid-header grid-header">';
		var unfreezedGridBody = '<div id="unfreezedGridBody" class="unfreezed-grid-body grid-body">';

		config.head.forEach(function(header) {

			//column-chooser
			var columnClass = header.isVisible ? 'grid-column ' + header.key + '-column' : 'grid-column hide ' + header.key + '-column';
			
			//pin icon
			var pinnedClass = (header.isFreeze) ? 'pinned' : 'unpinned';

			//grid head column
			var headerColumn = '<div class="' + columnClass + '"><div>' + header.displayName + '</div><div class="pin-icon ' + pinnedClass + '"></div><div data-sortkey='+ header.key +' class="sort-icon sort-desc"></div></div>';

			//grid body column
			var bodyColumn = '<div class="' + columnClass + '">';
			rows.forEach(function(row) {
				bodyColumn += '<div>' + createCell(row, header) + '</div>';
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

	var createCell = function(row, header) {
		var cell = '';
		switch(header.type) {
			case 'String':
				cell = createReadOnlyField(row, header);
				break;
			case 'SELECT_STATUS':
				cell = createSingleSelectField(row, header, 'executionSummaries');
				break;
			case 'TEXT':
				cell = createTextField(row, header);
				break;
			case 'LARGE_TEXT':
				cell = createLargeTextField(row, header);
				break;
			case 'SINGLE_SELECT':
				cell = createSingleSelectField(row, header, 'options');
				break;
			case 'MULTI_SELECT':
				cell = createSingleSelectField(row, header, 'options', true);
				break;
			case 'DATE':
				cell = createDateField(row, header);
				break;
			case 'DATE_TIME':
				cell = createDateTimeField(row, header);
				break;
			case 'RADIO_BUTTON':
				cell = createRadioField(row, header);
				break;
			case 'CHECKBOX':
				cell = createCheckboxField(row, header);
				break;
			case 'NUMBER':
				cell = createNumberField(row, header);
				break;
			case 'WIKI_LARGE_TEXT':
				cell = createWikiField(row, header);
				break;
			case 'ATTACHMENTS':
				cell = createAttachmentsField(row, header);
				break;
		}
		return cell;
	};

	var createReadOnlyField = function(row, header) {
		return row[header.key];
	};

	var createTextField = function(row, header) {
		return '<input type="text" value=' + row[header.key] + '>';
	};

	var createLargeTextField = function(row, header) {
		return '<textarea value=' + row[header.key] + '></textarea>';
	};

	var createDateField = function(row, header) {
		return row[header.key];
	};

	var createDateTimeField = function(row, header) {
		return row[header.key];
	};

	var createRadioField = function(row, header) {
		return row[header.key];
	};

	var createCheckboxField = function(row, header) {
		return row[header.key];
	};

	var createNumberField = function(row, header) {
		return '<input type="number" value=' + row[header.key] + '>';
	};

	var createWikiField = function(row, header) {
		return row[header.key];
	};

	var createAttachmentsField = function(row, header) {
		return row[header.key];
	};

	var createSingleSelectField = function(row, header, optionKey, isMultiselect) {
		var options = '';
		var statuses = header[optionKey];
		for(var key in statuses) {
			if(parseInt(row[header.key], 10) === parseInt(statuses[key].id, 10)) {
				options += '<option selected="selected" value=' + statuses[key].id + '>' + statuses[key].name + '</option>';
			} else {
				options += '<option value=' + statuses[key].id + '>' + statuses[key].name + '</option>';
			}
		}
		return isMultiselect ? '<select multiple="true">' + options + '</select>' : '<select>' + options + '</select>';
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