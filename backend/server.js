const app = require("./app");
const { connectDatabase } = require("./config/database");
const cloudinary = require("cloudinary")
const PORT = process.env.PORT || 6010

connectDatabase();

// cloudinary.config({
//     cloud_name: process.env.CLOUDINARY_NAME,
//     api_key: process.env.CLOUDINARY_API_KEY,
//     api_secret: process.env.CLOUDINARY_API_SECRET,
// })
cloudinary.config({
    cloud_name: "dovc5xwtu",
    api_key: "644328533923261",
    api_secret: "_nFmzD4RIeUWzl-mjHilRbn7jzw",
})
app.listen(PORT, () => {
    console.log(`server is running on port ${PORT}`);
});