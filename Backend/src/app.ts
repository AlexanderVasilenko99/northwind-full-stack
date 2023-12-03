import express from "express";
import appConfig from "./2-utils/app-config";
import catchAll from "./4-middleware/CatchAll";
import routeNotFound from "./4-middleware/RouteNotFound";
import productsController from "./6-controllers/products-controller"
import employeesController from "./6-controllers/employees-controller";
import { fileSaver } from "uploaded-file-saver";
import path from "path"
import authController from "./6-controllers/auth-controller";
import expressFileUpload from "express-fileupload"
import cors from "cors";
import activities from "./4-middleware/activities";
import sanitize from "./4-middleware/sanitize";


// creating the server
const server = express();
if (appConfig.isDevelopment) server.use(cors());
else server.use(cors({ origin: "" }))

// set the images folder for the fileSaver library
fileSaver.config(path.join(__dirname, "1-assets", "images"));

// creating a request body obj containing the request body data
server.use(express.json());

// log every activity
server.use(activities);

// sanitize
server.use(sanitize);

// create a request.files obj containing the request body data
server.use(expressFileUpload());

// connect our controllers
server.use("/api", productsController, employeesController, authController)

// Route not found 
server.use(routeNotFound)

// catchall middleware 
server.use(catchAll)

// running 
server.listen(appConfig.port, () => {
    console.log("listening on port " + appConfig.port);
});
