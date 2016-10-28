var chai = require('chai')
    , expect = chai.expect;
chai.use(require('./support/document.contain.element.matcher'));

describe('clicking', function() {

    var Zombie = require("zombie");
    var Server = require('./server/server');

    var port = 5000;
    var url = 'http://localhost:' + port;

    beforeEach(function(done) {
        server = new Server();
        server.start(port, done);
    });

    afterEach(function(done) {
        server.stop(done);
    });

    it('toggles class', function(done) {
        const browser = new Zombie();

        browser.visit(url + '/index.html')
            .then(function() {
                expect(browser.document).to.containElement('#cell-2-3');
            })
            .then(function() {
                return browser.fire('#cell-2-3', 'click');
            })
            .then(function() {
                expect(browser.query('#cell-2-3').className).to.equal('light');
            })
            .then(function() {
                return browser.fire('#cell-2-3', 'click');
            })
            .then(function() {
                expect(browser.query('#cell-2-3').className).to.equal('dark');
            })
            .then(done, done);
    });

});
