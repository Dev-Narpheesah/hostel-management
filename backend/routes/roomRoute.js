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

router.post("/createNewRoom", protect, createNewRoom);
router.get("/get-all-room", protect, getAllRoom);
router.get("/:roomId", protect, getRoom);
router.patch("/update-room/:roomId", protect, updateRoom);

router.delete("/delete/:roomId", protect, deleteRoom);

module.exports = router;
