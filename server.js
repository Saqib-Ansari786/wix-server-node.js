// handel uncaught exception error -- shut down the server
process.on("uncaughtException", (error) => {
  // custom print statement function
  printStatement(
    `Error: ${error.message}`,
    "Shutting down the server due to uncaught exception"
  );
  process.exit(1);
});

// all imports goes here
import app from "./app.js";
import WixToken from "./src/models/wixToken.js";
import sequelize from "./src/utils/dbConnect.js";
import printStatement from "./src/utils/printStatement.js";

// connecting to database
sequelize
  .sync()
  .then(() => {
    printStatement("Database Connected Successfully");
  })
  .catch((error) => {
    printStatement(`Error: ${error.message}`, "Database Connection Failed");
  });


// starting server
const server = app.listen(process.env.PORT, () => {
  printStatement(`Server is Running on: ${process.env.SERVER_URL}`);
});

// handel un handel rejection error -- shut down the server
process.on("unhandledRejection", (error) => {
  printStatement(
    `Error: ${error.message}`,
    "Shutting down the server due to unhandled promise rejection"
  );
  server.close(() => {
    process.exit(1);
  });
});
