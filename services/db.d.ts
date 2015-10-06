import Hapi = require("hapi");
export interface IOptions {
    db: {
        uri: string;
        options?: Object;
    };
}
export interface IDb {
    server: Hapi.Server;
    getOptions(): IOptions;
    connectDb(next: (err?: any, result?: any) => any): any;
    disconnectDb(next: (err?: any, result?: any) => any): any;
}
export default class Db implements IDb {
    server: Hapi.Server;
    constructor(server: Hapi.Server);
    getOptions(): IOptions;
    connectDb(next: (err?: any, result?: any) => any): any;
    disconnectDb(next: (err?: any, result?: any) => any): any;
}
