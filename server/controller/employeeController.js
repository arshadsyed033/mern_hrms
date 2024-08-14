    const Employee = require("../model/employeeModel");


    const createEmployee = async(req,res) => {
        try{
            console.log(req.body);
            const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } =  req.body;
            const f_Image = req.file ? req.file.buffer : null; 
            const newEmployee = new Employee({ 
                f_Image, 
                f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course});
            await newEmployee.save();
            res.status(201).json(newEmployee);
        } catch(err){
            res.status(400).json({message: err.message});
        }
    };

    const getEmployees = async(req, res) =>{
        try{    
            const employees = await Employee.find();
            const formattedEmployees = employees.map(employee => ({
                ...employee.toObject(),
                f_Image: employee.f_Image ? employee.f_Image.toString('base64') : null
            }));
            res.status(200).json(formattedEmployees);
        } catch(err){
            res.status(400).json({message: err.message});
        }
    };

    const deleteEmployee = async (req, res) => {
        const id = req.params.id;
        try {
            console.log("Received ID:", id);  
            const employee = await Employee.findOneAndDelete({ _id: id });
            if (!employee) return res.status(404).send('Employee not found');
            
            res.send(`Employee with id ${id} deleted successfully`);
        } catch (err) {
            console.error("Error:", err);  
            res.status(500).send('Server error');
        }
    };

    const employeeUpdate = async (req, res) => {
        try {
            console.log("Employee ID")
            const { f_Name, f_Email, f_Mobile, f_Designation, f_Gender, f_Course } = req.body;
            const upid = req.params.id;
            if (!f_Name || !f_Email || !f_Mobile || !f_Designation || !f_Gender || !f_Course) {
                return res.status(400).json({ msg: "Not all fields have been entered" });
            }

            const updateData = {
                f_Name,
                f_Email,
                f_Mobile,
                f_Designation,
                f_Gender,
                f_Course
            };
            const updatedEmployee = await Employee.findOneAndUpdate(
                { _id: upid },
                updateData,
                { new: true, runValidators: true } 
            );

            if (!updatedEmployee) {
                return res.status(404).json({ msg: "Employee not found" });
            }

            return res.status(200).json({ msg: "User updated successfully", data: updatedEmployee });
        } catch (err) {
            console.error("Error updating employee:", err);
            return res.status(500).json({ msg: err.message });
        }
    };

    const getEmployeeById = async (req, res) => {
        try {
            const fetchid = req.params.id;
            const employee = await Employee.findById(fetchid);
    
            if (!employee) {
                return res.status(404).json({ msg: "Employee details not found" });
            }
    
            console.log("Employee object before conversion:", employee);
    
            if (employee.f_Image) {
                if (Buffer.isBuffer(employee.f_Image)) {
                    const base64Image = employee.f_Image.toString('base64');
                    const mimeType = 'image/jpeg';
                    employee.f_Image = `data:${mimeType};base64,${base64Image}`;
                    console.log("Converted Base64 image (Buffer):", employee.f_Image);
                } else if (employee.f_Image.data && Buffer.isBuffer(employee.f_Image.data)) {
                    const base64Image = employee.f_Image.data.toString('base64');
                    const mimeType = 'image/jpeg'; 
                    employee.f_Image = `data:${mimeType};base64,${base64Image}`;
                    console.log("Converted Base64 image (Object with data):", employee.f_Image);
                } else {
                    console.log("f_Image is not a buffer or is undefined.");
                }
            } else {
                console.log("f_Image is undefined.");
            }
    
            res.status(200).json(employee);
        } catch (err) {
            return res.status(500).json({ msg: err.message });
        }
    };
    
    
    


    module.exports = {
        createEmployee,
        getEmployees,
        deleteEmployee,
        employeeUpdate,
        getEmployeeById,
    };
