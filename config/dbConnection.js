const mongoose = require("mongoose");

function dbConnection() {
  mongoose.connect(process.env.MONGO_URI).then(() => {
    console.log("DB Connected");
  });
}

module.exports = dbConnection;
