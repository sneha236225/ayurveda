import app from './src/app.js';
import dotenv from "dotenv";
import http from 'http';
import connectDB from './src/config/db.js';

dotenv.config();

const port = process.env.PORT || 8000;
connectDB();
const server = http.createServer(app);

server.listen(port, (err) => {
    if (err) {
        console.log("Server encountered an error:", err);
        return;
    }
    console.log(`✅ Server is running on port: ${port}`);
});
