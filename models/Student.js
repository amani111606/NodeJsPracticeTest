const mongoose = require("mongoose")

const studentSchema = mongoose.Schema({
    studentId:{
        type:String,
        required:true
    },
    Studentname:{
        type: String,
        required: true
    },
    Studentfathername:{
        type: String,
        required: true
    },
    studentemail:{
        type: String,
        required: true
    },
    studentphoneNumber:{
        type: String,
        default: false
    }
})
//studentId,Studentname,Studentfathername,studentemail,studentphoneNumber
module.exports = mongoose.model('Student',studentSchema);