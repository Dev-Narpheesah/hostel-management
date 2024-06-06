const express = require("express");
const router = express.Router();
const { protect } = require("../middleware/authMiddleware");
const {
  createNewRoom,
  getAllRoom,
  updateRoom,
  deleteRoom,
  getRoom,
} = require("../controllers/roomController");

router.post("/createNewRoom", createNewRoom);
router.get("/get-all-room", getAllRoom);
router.get("/:roomId", getRoom);
router.patch("/update-room/:roomId", updateRoom);

router.delete("/delete/:roomId", deleteRoom);

module.exports = router;
