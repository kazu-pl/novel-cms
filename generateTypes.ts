const dotenv = require("dotenv");
dotenv.config();

const { generateApi } = require("swagger-typescript-api");
const path = require("path");

generateApi({
  name: "novel-server.types.ts",
  output: path.resolve(process.cwd(), "./src/types"),
  url: `${process.env.REACT_APP_API_URL}/swagger-schema.json`,
  generateClient: false,
  generateRouteTypes: false,
}).catch((e) => console.error(e));
