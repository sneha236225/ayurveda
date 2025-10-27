import express from "express";
import cors from "cors";
import indexRoutes from "../src/routes/index.route.js";
const app = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({
    extended: true,
    parameterLimit: 10000,
    limit: "10mb"
}));

app.use('/api/uploads', express.static('src/uploads'));
app.use('/api', indexRoutes);
app.get('/', (req, res) => {
    return res.status(200).json({
        status: true,
        message: "server is running"
    });
});

export default app;
