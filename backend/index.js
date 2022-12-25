require("dotenv").config();
const app = require("./app");
const connectWithDb = require("./config");

connectWithDb();

app.listen(process.env.PORT, () => {
  console.log(`Listening on port ${process.env.Port}`);
});
