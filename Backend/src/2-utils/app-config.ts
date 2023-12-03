import env from "dotenv"
env.config();

class AppConfig {
    public readonly port = process.env.MYSQL_PORT;
    public readonly mysqlHost = process.env.MYSQL_HOST;
    public readonly mysqlUser = process.env.MYSQL_USER;
    public readonly mysqlPassword = process.env.MYSQL_PASSWORD;
    public readonly mysqlDatabase = process.env.MYSQL_DATABASE;
    public readonly appHost = process.env.MYSQL_APPHOST;
}

class DevelopmentConfig extends AppConfig {
    isDevelopment = true;
    isProduction = false;
}
class ProductionConfig extends AppConfig {
    isDevelopment = true;
    isProduction = false;
}
const appConfig = (process.env.NODE_ENV === "development") ? new DevelopmentConfig() : new ProductionConfig();
export default appConfig;
