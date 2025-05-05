const Employee = require('../models/Employee')

const createEmployee =  async (req,res)=>{
    //console.log("employee Data",req.body)
    try{
        const {name,email,employeeId,phoneNumber} = req.body

        const employee = new Employee({
            name,email,employeeId,phoneNumber
        })
        console.log("employee Data",employee)
        const employeeData = await employee.save()
        res.status(201).json(employeeData)
    }
    catch{
        res.status(500).json({message:'Server error'})
    }    
}

const getAllEmployee = async(req,res) => {
    try{
        const employeeData = await Employee.find()
        res.status(201).json(employeeData)
    }
    catch{
        res.status(500).json({message:'Server error'})
    } 
}

const getEmployee = async(req,res) => {
    try{
        const employeeData = await Employee.findById(req.params.id)
        res.status(201).json(employeeData)
    }
    catch{
        res.status(500).json({message:'Server error'})
    } 
}

const updateEmployeeDetails = async(req,res) => {
    try{
        const employeeData = await Employee.findByIdAndUpdate(
            req.params.id,
            {email,phoneNumber}
        )
        res.status(201).json(employeeData)
    }
    catch(error){
        res.status(500).json({message:'Server error'+error})
    }
}
const updateEmployeeDetailsbyEmail = async(req,res) => {
    try {
        const { email } = req.params;
        const { name, employeeId, phonenumber } = req.body;
        const updatedEmployee = await Employee.findOneAndUpdate(
          { email: email }, // Find by email
          {
            $set: {
              name: name,
              employeeId: employeeId,
              phonenumber: phonenumber
            }
          },
          { new: true } // return the updated document
        );
    
        if (!updatedEmployee) {
          return res.status(404).json({ message: "Employee not found with this email." });
        }
    
        res.status(200).json({ message: "Employee updated successfully!", employee: updatedEmployee });
      } catch (error) {
        console.error('Error updating employee:', error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}
const deleteEmployeeDetailsbyEmail = async(req,res) => {
    try {
        const { email } = req.params;
        const deleteEmployee = await Employee.findOneAndDelete({
            email: { $regex: new RegExp(`^${email}$`, "i") },  // 'i' flag for case-insensitivity
          });
        console.log(email,"DETTTTT",deleteEmployee)
        if (!deleteEmployee) {
          return res.status(404).json({ message: "Employee not found with this email.",employee: email });
        }
    
        res.status(200).json({ message: "Employee Deleted successfully!", employee: email });
      } catch (error) {
        console.error('Error Deleting employee:', error);
        res.status(500).json({ message: "Internal Server Error" });
      }
}
const deleteEmployee = async(req,res) => {
    try{
        const employeeData = await Employee.findByIdAndDelete(req.params.id)
        res.status(201).json(employeeData)
    }
    catch(error){
        res.status(500).json({message:'Server error'+error})
    }
}
module.exports = {createEmployee,getAllEmployee,getEmployee,updateEmployeeDetails,updateEmployeeDetailsbyEmail,deleteEmployeeDetailsbyEmail,deleteEmployee}