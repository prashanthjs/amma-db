import Mongoose = require("mongoose");
import Hapi = require("hapi");

export interface IOptions {
  db: {
    uri: string,
    options?: Object
  }
}
export interface IDb {
  server: Hapi.Server;
  getOptions(): IOptions;
  connectDb(next: (err?: any, result?: any) => any): any;
  disconnectDb(next: (err?: any, result?: any) => any): any;
}

export default class Db implements IDb {
  constructor(public server: Hapi.Server) {

  }

  public getOptions(): IOptions {
    return this.server.plugins['amma-db'].config.options;
  }

  public connectDb(next: (err?: any, result?: any) => any): any {
    let options = this.getOptions();
    let db = Mongoose.connect(options.db.uri, options.db.options, (err: any) => {
      if (err) {
        this.server.log('error', 'Could not connect to MongoDB! ' + options.db.uri + '\n');
        return next(err);
      } else {
        this.server.log('success', 'Connected to MongoDB ' + options.db.uri + '\n');
        return next();
      }
    });
    this.server.expose('db', db);
  }

  public disconnectDb(next: (err?: any, result?: any) => any): any {
    Mongoose.disconnect((err) => {
      this.server.log('Disconnected from MongoDB.');
      return next();
    });
  }

}
