const mongoose = require('mongoose');
const Room = require('./roomModel');

const guardianSchema = new mongoose.Schema({
    guardianName: {
        type: String,
        required: true
    },
    guardianEmail: {
        type: String,
        required: true,
        trim: true,
        
    },
});
const studentSchema = new mongoose.Schema({
    _id:{
        type:String,
        unique: true,
        required: true,
    },
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true

    },
    age: {
        type: Number,
        required: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female', "Others"]
    },
    nationality:{
        type: String,
        required: true,
    },
    guardian: guardianSchema,
    room:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Room",
        default:null,
    },
    role:{
        type: String,
        enum: ["student"],
        default: "student"

    },
    checkedIn:{
        type: Boolean,
        default: false,
    },
    checkInTime:{
        type: Date,
        default: null
    },
   

   checkedOutTime:{
        type: Date,
        default: null
    },

},
{
    timestamps: true,
    minimize: false,
    toJSON: {getters:false},
}

);

// studentSchema.methods.checkIn = function(){
//     this.checkedIn = true;
//     this.checkInTime = new Date();
//     this.checkOutTime = null;
   
// }
// studentSchema.methods.checkOut = function(){
//     this.checkedIn = false;
//     this.checkOutTime = new Date();
//     this.checkInTime = null;
// };
const Student = mongoose.model("Student", studentSchema);
module.exports = Student;