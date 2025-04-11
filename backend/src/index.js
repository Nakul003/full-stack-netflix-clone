import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connectDB } from "./lib/db.js";
import authRoutes from "./routes/auth.routes.js"
import movieRoutes from "./routes/movie.routes.js"
import tvshowRoutes from "./routes/tvshow.routes.js"
import { protectRoute } from "./middelwares/protectRoute.js";
import searchRoutes from "./routes/search.routes.js"
import personRoutes from "./routes/person.routes.js"
import path from "path"

dotenv.config()

const app = express();
const port = process.env.PORT;
const __dirname = path.resolve();

app.use(express.json());
app.use(cookieParser())
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true,
}));


app.use("/api/auth", authRoutes);
app.use("/api/movies", protectRoute,movieRoutes);
app.use("/api/tvshows", protectRoute,tvshowRoutes);
app.use("/api/persons", protectRoute,personRoutes);
app.use("/api/search", protectRoute,searchRoutes);

if (process.env.NODE_ENV==="production") {
    app.use(express.static(path.join(__dirname,"../frontend/dist")));


    app.get("*", (req, res) => {
        res.sendFile(path.join(__dirname, "../frontend", "dist", "index.html"));
    })
}

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
    connectDB()
})
