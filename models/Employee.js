const mongoose = require("mongoose")

const employeeSchema = mongoose.Schema({
    name:{
        type: String,
        required: true
    },
    email:{
        type: String,
        required: true
    },
    employeeId:{
        type:String,
        required:true
    },
    phoneNumber:{
        type: String,
        default: false
    }
})

module.exports = mongoose.model('Employee',employeeSchema);