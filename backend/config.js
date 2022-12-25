const mongoose = require("mongoose");

mongoose.set("strictQuery", false);
const connectWithDb = () => {
  mongoose
    .connect(process.env.DB_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(console.log("DB got connected"))
    .catch((err) => {
      console.log("Error happened in DB connection");
      console.log(err);
      process.exit(1);
    });
};

module.exports = connectWithDb;
