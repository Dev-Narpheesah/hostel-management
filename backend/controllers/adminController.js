const asyncHandler = require("express-async-handler");
const bcrypt = require("bcryptjs");
const Admin = require("../models/AdminModel");

const generateToken = require("../utils/index");

const register = asyncHandler(async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    !fullname ||
      !email ||
      (!password &&
        (() => {
          res.status(400);
          throw new Error("please fill all the require fields");
        })());

    password.length < 6 &&
      (() => {
        res.status(400);
        throw new Error("Password must be up to 6 character!");
      })();

    const adminExists = await Admin.findOne({ email });

    adminExists &&
      (() => {
        res.status(400);
        throw new Error("Email already exists");
      });

    const admin = await Admin.create({
      fullname,
      email,
      password,
    });

    const token = generateToken(admin._id);

    // send http-only cookie

    res.cookie("token", token, {
      path: "/",
      httpOnly: true,
      expires: new Date(Date.now() + 1000 * 86400), // 1 day
      sameSite: "none",
      secure: true,
    });

    if (admin) {
      const { _id, fullname, email, role } = admin;

      res.status(201).json({
        _id,
        fullname,
        email,
        role,
        token,
      });
    } else {
      res.status(400);
      throw new Error("Invalid Data");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("server error");
  }
});

const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email });

    if (!admin) {
      return res.status(400).json({ message: "Admin not found!" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Invalid Credentials!" });
    }

    const token = generateToken(admin._id);

    if (admin && isMatch) {
      res.cookie("token", token, {
        path: "/",
        httpOnly: true,
        expires: new Date(Date.now() + 1000 * 86400),
        sameSite: "none",
        secure: true,
      });

      const { _id, fullname, email, roles } = admin;

      res.status(201).json({
        _id,
        fullname,
        email,
        roles,
        token,
      });
    } else {
      res.status(500);
      throw new Error("Something went wrong");
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// Delete an admin

const deleteAdmin = asyncHandler(async (req, res) => {
  try {
    const { adminId } = req.params;

    const admin = Admin.findById(adminId);
    if (!admin) {
      res.status(404);
      throw new Error("Admin not found");
    }

    await admin.deleteOne();
    res.status(200).json({
      message: "Admin deleted successfully!",
    });
  } catch (error) {
    console.error(error.message);
    res.status(500).send("Server error");
  }
});

// get details of single admin

const getAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;

  const admin = await Admin.findById(adminId);

  if (admin) {
    const { id, fullname, email, role } = admin;

    res.status(200).json({ id, fullname, email, role });
  } else {
    res.status(404).json({ message: "Admin not found" });
  }
});

// get all admins details

const getAllAdmins = asyncHandler(async (req, res) => {
  const admins = await Admin.find().sort("-createdAt").select("-password");
  if (!admins) {
    res.status(500);
    throw new Error("something went wrong");
  }

  res.status(200).json(admins);
});

const updateAdmin = asyncHandler(async (req, res) => {
  const { adminId } = req.params;
  try {
    const admin = await Admin.findById(adminId).select("-password");

    if (!admin) {
      res.status(404).json({ error: "Admin not found" });
      return;
    }

    if (req.body.fullname) {
      admin.fullname = req.body.fullname;
    }
    if (req.body.role) {
      admin.role = req.body.role;
    }
    if (req.body.email) {
      admin.email = req.body.email;
    }

    const updatedAdmin = await admin.save();
    res.status(200).json(updatedAdmin);
  } catch (error) {
    console.error("Error updating admin: ", error);
    res.status(500).send({ error: " Internal Server error" });
  }
});

const logoutAdmin = asyncHandler(async (req, res) => {
  res.cookie("token", "", {
    path: "/",
    httpOnly: true,
    expires: new Date(0),
    sameSite: "none",
    secure: true,
  });
  res.status(200).json({ message: "Logged out" });
});

module.exports = {
  register,
  login,
  getAdmin,
  deleteAdmin,
  getAllAdmins,
  updateAdmin,
  logoutAdmin,
};
