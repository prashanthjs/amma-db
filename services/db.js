var Mongoose = require("mongoose");
var Db = (function () {
    function Db(server) {
        this.server = server;
    }
    Db.prototype.getOptions = function () {
        return this.server.plugins['amma-db'].config.options;
    };
    Db.prototype.connectDb = function (next) {
        var _this = this;
        var options = this.getOptions();
        var db = Mongoose.connect(options.db.uri, options.db.options, function (err) {
            if (err) {
                _this.server.log('error', 'Could not connect to MongoDB! ' + options.db.uri + '\n');
                return next(err);
            }
            else {
                _this.server.log('success', 'Connected to MongoDB ' + options.db.uri + '\n');
                return next();
            }
        });
        this.server.expose('db', db);
    };
    Db.prototype.disconnectDb = function (next) {
        var _this = this;
        Mongoose.disconnect(function (err) {
            _this.server.log('Disconnected from MongoDB.');
            return next();
        });
    };
    return Db;
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Db;
