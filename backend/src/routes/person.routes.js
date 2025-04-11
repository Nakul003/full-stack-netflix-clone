import express from "express";
import { getPersonDetails, getPersonMovies, getPersonTv } from "../controllers/person.controller.js";

const router = express.Router();

router.get("/:id/details",getPersonDetails)
router.get("/:id/movies",getPersonMovies)
router.get("/:id/tvshows",getPersonTv)

export default router