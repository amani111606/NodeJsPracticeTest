const express = require('express')
const routes = express.Router()
const employeeController = require('../controllers/employeeController')
//const employeemodel = require('../models/Employee')

routes.post('/add-emp',employeeController.createEmployee)
routes.get('/getAllEmployees',employeeController.getAllEmployee)
routes.get('/getEmployee/:id',employeeController.getEmployee)
routes.put('/updateEmployee/:id',employeeController.updateEmployeeDetails)
routes.delete('/delete/:id',employeeController.deleteEmployee)
routes.put('/updateEmployeebyEmail/:email',employeeController.updateEmployeeDetailsbyEmail)
routes.delete('/deleteByEmail/:email',employeeController.deleteEmployeeDetailsbyEmail)




module.exports = routes