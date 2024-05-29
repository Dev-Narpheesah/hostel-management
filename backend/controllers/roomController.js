const asyncHandler = require("express-async-handler");
const Room = require("../models/roomModel");

const createNewRoom = asyncHandler(async (req, res) => {
  const { roomNumber, roomCapacity, roomOccupancy, roomLocation, roomStatus } =
    req.body;

  if (!roomNumber || !roomCapacity || !roomLocation) {
    res.status(400);
    throw new Error("All the fields are require ");
  }

  const roomExist = await Room.findOne({ roomNumber });

  roomExist &&
    (() => {
      res.status(400);
      throw new Error("Room already exist");
    });

  const room = Room.create({
    roomNumber,
    roomCapacity,
    roomOccupancy,
    roomLocation,
    roomStatus,
  });
  if (room) {
    const { _id, roomNumber, roomCapacity, roomLocation, roomStatus } = room;

    res.status(201).json({
      _id,
      roomNumber,
      roomCapacity,
      roomLocation,
      roomStatus,
    });
  } else {
    res.status(400);
    throw new Error("Invalid Data");
  }
});

const getAllRoom = asyncHandler(async (req, res) => {
  const rooms = await Room.find().sort("-createdAt").select("");

  if (!rooms) {
    res.status(500);
    throw new Error("something went wrong");
  }
  res.status(200).json(rooms);
});

const getRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;

  try {
    const room = await Room.findById(roomId);

    if (room) {
      const {
        _id,
        roomNumber,
        roomLocation,
        roomStatus,
        roomCapacity,
        roomOccupancy,
      } = room;
      res
        .status(200)
        .json({
          _id,
          roomNumber,
          roomLocation,
          roomStatus,
          roomCapacity,
          roomOccupancy,
        });
    } else {
      res.status(404).json({ message: "Room not found" });
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }
});

const updateRoom = asyncHandler(async (req, res) => {
  const roomId = req.params.roomId;

  try {
    const room = await Room.findById(roomId);
    if (room) {
      const {
        _id,
        roomCapacity,
        roomOccupancy,
        roomNumber,
        roomLocation,
        roomStatus,
      } = room;
      room.roomNumber = req.body.roomNumber || room.roomNumber;
      room.roomCapacity = req.body.roomCapacity || roomCapacity;
      room.roomOccupancy = req.body.roomOccupancy || roomOccupancy;
      room.roomLocation = req.body.roomLocation || roomLocation;
      room.roomStatus = req.body.roomStatus || roomStatus;

      const updatedRoom = await room.save();
      res.status(200).json({
        _id: updatedRoom._id,
        roomNumber: updatedRoom.roomNumber,
        roomCapacity: updatedRoom.roomCapacity,
        roomOccupancy: updatedRoom.roomOccupancy,
        roomLocation: updatedRoom.roomLocation,
        roomStatus: updatedRoom.roomStatus,
      });
    } else {
      res.status(404);
      throw new Error("Room not found");
    }
  } catch (error) {
    res.status(500).json({ message: "Internal server error" });
  }

  const room = await Room.findById(req.params.id);

  await room.save();
  res.status(200).json(room);
});

const deleteRoom = asyncHandler(async (req, res) => {
  const { roomId } = req.params;
  try {
    const room = Room.findById(roomId);

    if (!room) {
      res.status(404);
      throw new Error("Room not found");
    }

    await room.deleteOne();
    res.status(200).json({
      Message: "Room deleted successfully",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

module.exports = {
  createNewRoom,
  getRoom,
  updateRoom,
  getAllRoom,
  deleteRoom,
};
