const express = require("express");
const cors = require("cors");
const contactsRouter = require("./app/routes/contact.route.js");
const ApiError = require("./app/api-error");
const app = express();

app.use(cors());
app.use(express.json());

app.get("/",(req, res) =>{
    res.json({message: "welcome to contact book application."});
});

app.use("/api/contacts", contactsRouter);
module.exports = app;

// handle 404 response
app.use((req, res, next) => {
    // Code ở đây sẽ chạy khi không có route được định nào được định nghĩa
    // Khớp với yêu cầu. Gọi next() để chuyển sang middleware xử lý looix
    return next(new ApiError(404, "Resource not found"));
});

//define error-handling middleware last, after other app.user() and recalls
app.use((err, req, res, next) => {
    // Middleware xử lý lỗi tập trung
    // trong các đoạn code xử lý ở các route, gọi next(error)
    // sẽ chuyển về middleware xử lý lỗi ngay
    return res.status(err.statusCode || 500).json({
        message: err.message || "Internal Server Error",
    });
});