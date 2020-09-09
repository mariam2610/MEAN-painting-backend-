const express = require("express");
const router = express.Router();

const { createartist, getallartists, getartist, getartistbyid, updateartist, removeartist } = require("../controllers/artist");

router.post("/artist/create", createartist);

router.get("/artists", getallartists);

router.param("artistid", getartistbyid);

router.get("/artist/:artistid", getartist);

router.put("/artist/:artistid", updateartist);

router.delete("/artist/:artistid", removeartist);

module.exports = router;
