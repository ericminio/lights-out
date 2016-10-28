var chai = require('chai')
    , expect = chai.expect
    , displayGrid = require('./display.grid');
chai.use(require('../../support/document.contain.element.matcher'));

describe('displayGrid', function() {

    var jsdom = require('jsdom').jsdom
    var document;

    beforeEach(function() {
        document = jsdom('<div id="this-target"></div>');
        displayGrid({
            document:document,
            target:'this-target',
            cellSize: 60,
            rows:3,
            columns:4
        });
    });

    it('creates cells', function() {
        expect(document).to.containElement('#cell-1-1');
        expect(document).to.containElement('#cell-3-4');
    });

    it('creates cells with expected size', function() {
        expect(document.getElementById('cell-1-1').style.height).to.equal('60px');
        expect(document.getElementById('cell-1-1').style.width).to.equal('60px');
    });

    it('creates lines', function() {
        expect(document.querySelectorAll('br').length).to.equal(3);
    });

    it('creates cells with expected state', function() {
        expect(document.getElementById('cell-1-1').className).to.equal('dark');
    });
});
