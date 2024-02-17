const mongoose = require("mongoose");
const MONGO_URI = 'mongodb+srv://salmanansari:Salman123@cluster0.t8a6cmf.mongodb.net/SocialApp'
exports.connectDatabase = () =>{
    mongoose.connect(MONGO_URI)
    .then((con) => console.log(`Database Connected: ${con.connection.host}`))
    .catch((err) => console.log(err));
}