const mongoose = require("mongoose");

const connectDB = async () => {
  try {
    const db = await mongoose.connect(
      `mongodb+srv://pradeepch2579:${encodeURIComponent(
        "Pchitti@2579"
      )}@cluster0.0fzgjzp.mongodb.net/registrations?retryWrites=true&w=majority`
    );
    console.log(
      "connected to Mongo DB",
      db.connection.host,
      db.connection.name
    );
  } catch (error) {
    console.log(error.message);
    console.log("REACHED HERE========");
    process.exit(1);
  }
};

module.exports = connectDB;
