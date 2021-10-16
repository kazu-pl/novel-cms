const { generateApi } = require("swagger-typescript-api");
const path = require("path");

generateApi({
  name: "novel-server.types.ts",
  output: path.resolve(process.cwd(), "./src/types"),
  url: "http://localhost:4000/swagger-schema.json",
  generateClient: false,
  generateRouteTypes: false,
}).catch((e) => console.error(e));
