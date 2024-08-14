const router = require('express').Router();
const employeeCtrl = require("../controller/employeeController");
const { upload } = require('../middleware/uploadMiddleware');



router.post("/createEmployee", upload.single('file'), employeeCtrl.createEmployee);
router.get("/getEmployees", employeeCtrl.getEmployees);
router.delete("/employeedelete/:id", employeeCtrl.deleteEmployee);
router.put("/employeeupdate/:id", employeeCtrl.employeeUpdate);
router.get("/getEmployeeById/:id", employeeCtrl.getEmployeeById);




module.exports = router