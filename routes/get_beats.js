const express = require("express");
const Beat = require("../models/beat");

const router = express.Router();

router.get("/get_beats", async (req, res)=>{
    try {
        const beats = await Beat.find();

        res.json(beats)
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
})

router.get("/get_latest_beat", async (req, res) => {
    try {
        const latestBeat = await Beat.findOne().sort({ createdAt: -1 });
        
        if (!latestBeat) {
            res.status(404).json({ error: "No beats found" });
            return;
        }

        res.json(latestBeat);
    } catch (error) {
        res.status(500).json({ error: "Internal Server Error" });
    }
});


module.exports = router;