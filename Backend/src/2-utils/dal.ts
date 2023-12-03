import mysql, { MysqlError } from "mysql";
import appConfig from "./app-config";

// creating a connection object:
const connection = mysql.createPool({
    host: appConfig.mysqlHost,          // database computer address
    user: appConfig.mysqlUser,          // database username 
    password: appConfig.mysqlPassword,  // database password
    database: appConfig.mysqlDatabase   //database name
});
function execute(sql: string, values?: any[]): Promise<any> { //promisify
    return new Promise<any>((resolve, reject) => {
        connection.query(sql, values, (err: MysqlError, result: any) => {
            if (err) {
                reject(err);
                return;
            }
            resolve(result);
        });
    });
}
export default {
    execute
}
