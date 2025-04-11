import express from "express";
import { searchMovie, searchPerson, searchTv, getSearchHistory, removeHistory } from "../controllers/search.controller.js";

const router = express.Router();

router.get("/movies/:query",searchMovie)
router.get("/tvshows/:query",searchTv)
router.get("/persons/:query",searchPerson)
router.get("/getSearchHistory",getSearchHistory)
router.delete("/removeHistory/:id",removeHistory)

export default router;