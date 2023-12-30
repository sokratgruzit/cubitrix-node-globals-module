const express = require("express");
const mongoose = require("mongoose");
const router = require("./routes/index");
const transactions = require("./routes/transactions");
require("dotenv").config();
const cors = require("cors");
const cors_options = require("./config/cors_options");
const app = express();
app.use(express.json({extended: true}));
app.use(cors(cors_options));
app.use("/globals", router);
app.use("/api/transactions", transactions);
const CryptoJS = require("crypto-js");

const SECRET_KEY = process.env.SECRET_KEY;
const MONGO_URL = process.env.MONGO_URL;

function decrypt(ciphertext, secretKey) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedText = bytes.toString(CryptoJS.enc.Utf8);
  return decryptedText;
}
const mongoUrl = decrypt(MONGO_URL, SECRET_KEY);
// console.log(accounts.index("jinx1"));
// app.use('/accounts', router)

// const auth = require('./modules/auth/routes/index.routes');
// const staking = require('./modules/staking/routes/index.routes');

//load modules depend env file
// if(process.env.AUTH === 'true') app.use('/api/auth', auth);
// if(process.env.STAKING === 'true') app.use('/api/staking', staking);

// //test route
// app.get("/test", (req, res) => {
//    res.send("server is working");
// });

//static path
const root = require("path").join(__dirname, "front", "build");
app.use(express.static(root));

// app.get("*", function (req, res) {
//    res.sendFile(
//       'index.html', { root }
//    );
// });

async function start() {
  const PORT = process.env.PORT || 5000;
  try {
    mongoose.set("strictQuery", false);
    await mongoose.connect(mongoUrl, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    app.listen(PORT, () =>
      console.log(`App has been started on port ${PORT}...`)
    );
  } catch (e) {
    console.log(`Server Error ${e.message}`);
    process.exit(1);
  }
}

start();
