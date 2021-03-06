var chai = require('chai')
    , expect = chai.expect;
chai.use(require('../support/document.contain.element.matcher'));

describe('index.html', function() {

    describe('serving', function() {

        var Zombie = require("zombie");
        var Server = require('../server/server');

        var port = 5000;
        var url = 'http://localhost:' + port;

        beforeEach(function(done) {
            server = new Server();
            server.start(port, done);
        });

        afterEach(function(done) {
            server.stop(done);
        });

        it('works (external resources are reachable)', function(done) {
            const browser = new Zombie();

            browser.visit(url + '/index.html')
                .then(function() {
                    browser.assert.success();
                })
                .then(done, done);
        });

        it('initializes as expected', function(done) {
            const browser = new Zombie();

            browser.visit(url + '/index.html')
                .then(function() {
                    expect(browser.query('#cell-1-1').style.width).to.equal('100px');
                })
                .then(done, done);
        });
    });

    describe('structure', function() {

        var jsdom = require('jsdom').jsdom
        var document;

        beforeEach(function() {
            document = jsdom(require('fs').readFileSync('./app/client/index.html'));
        });

        it('has the expected title', function() {
            expect(document.getElementsByTagName('title')[0].innerHTML).to.equal('Who am I?');
        });

        it('has a welcome message', function() {
            expect(document).to.containElement('#welcome');
        });
    });
});
