var toggle = function(element) {
    if (element.className == 'light') {
        element.className = 'dark';
    }
    else {
        element.className = 'light';
    }
};

var displayGrid = function(options) {
    var document = options.document;
    var target = document.getElementById(options.target);
    for (var row = 1; row<= options.rows; row++) {
        for(var col = 1; col<= options.columns; col++) {
            var cell = document.createElement('A');
            cell.id = 'cell-'+row+'-'+col;
            cell.style.height = options.cellSize + 'px';
            cell.style.width = options.cellSize + 'px';
            cell.className = 'dark';
            cell.onclick = function () { toggle(event.target); };

            target.appendChild(cell);
        }
        target.appendChild(document.createElement('BR'));
    }
};

var module = module || {};
module.exports = displayGrid;
