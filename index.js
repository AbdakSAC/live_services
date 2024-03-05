import app from "./src/app.js";

const serverInit = () => {
  app.listen(app.get("PORT"));
  console.log(`Servidor en puerto ${app.get("PORT")}`);
};

serverInit();
