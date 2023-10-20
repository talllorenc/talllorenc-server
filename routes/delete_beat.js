const express = require('express')
const Beat = require('../models/beat')

const router = express.Router()

router.delete("/remove_beat", async (req,res)=>{
    try {
        const beatId = req.query.beatId;
        const beat = await Beat.findOne({_id: beatId});

        if(!beat){
            return res.status(404).json({ success: false, message: "Бит не найден" });
        }

        await Beat.deleteOne({ _id: beatId });

        return res.json({ success: true });
    } catch (error) {
        console.error(error);
    }
})

module.exports = router;