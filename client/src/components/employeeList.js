import { useCallback, useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const EmployeeList = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [employee, setEmployee] = useState([]);
  const userData = localStorage.getItem("loginData");
  const loginData = JSON.parse(userData);
  const [ userStatus, setUserStatus] = useState(false);
  useEffect(() => {
    console.log(loginData);
    setUserStatus(true);
    if (loginData?.accessToken) {
      fetchEmployeeList();
    }
  }, [userStatus]);
  const handleCreate = useCallback(() => {
    navigate("/createemployee");
  }, [navigate]);
  const handleEdit = useCallback((e) => {
    navigate("/employeeupdate", { state: { id: e } });
  },[navigate]);
  const fetchEmployeeList = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:5000/employee/getEmployees", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `${loginData.accessToken}`
        },
      });
      const result = await response.json();
      console.log(result);
      setEmployee(result);
    } catch (error) {
      console.error("Error fetching employee list:", error);
    }
  }, [userStatus]);



  const handleDelete = useCallback(async (e) => {
    try {
      console.log(e,"Handle Delete");
      setUserStatus(false);
      const response = await fetch(`http://localhost:5000/employee/employeedelete/${e}`, {
        method: "DELETE",
        headers: {
          "Authorization": `${loginData?.accessToken}`,
          "Accept": "application/json",
          "Content-Type": "application/json"
        }
      }); 
      const result = await response.json();
      setUserStatus(true);
      console.log(result);
      setEmployee(result);
    } catch (error) {
      console.error("Error deleting employee:", error);
    }
  }, [userStatus]);
  return (
    <div
      className='container-fluid'
      style={{ paddingLeft: '30px', paddingRight: '30px' }}
    >
      <div className='employeelist'>
           <h2 style={{marginTop: "30px"}}>Employee Details</h2>
           <button className="btn btn-primary" style={{ float: "right", marginBottom: "10px" }} onClick={handleCreate}>Create</button>
            <table className="table table-bordered table-striped">
              <thead>
              <tr>
            <th>SNo</th>
            <th>Image</th>
            <th>Name</th>
            <th>Email</th>
            <th>Mobile No</th>
            <th>Designation</th>
            <th>Gender</th>
            <th>Course</th>
            <th>Create Date</th>
            {loginData?.details?.Role === "Admin" && <th>Actions</th>}
          </tr>
              </thead>
              <tbody>
          {employee.map((item, i) => (
            <tr key={i}>
              <td>{i + 1}</td>
              <td>         {item?.f_Image ? (
                    <img
                      src={`data:image/jpeg;base64,${item.f_Image}`}
                      alt={item.f_Name}
                      style={{ width: '100px', height: '100px', objectFit: 'cover' }}
                    />
                  ) : (
                    <span>No Image</span>
                  )}</td>
              <td>{item?.f_Name}</td>
              <td>{item?.f_Email}</td>
              <td>{item?.f_Mobile}</td>
              <td>{item?.f_Designation}</td>
              <td>{item?.f_Gender}</td>
              <td>{item?.f_Course}</td>
              <td>{item?.f_Createdate}</td>
              {loginData?.details?.Role === "Admin" && (
                <td>
                 
                  <button className="btn btn-success" onClick={() => handleEdit(item._id)}>Edit</button>
                  <button
                    className="btn btn-danger" style={{ marginLeft: "10px" }}
                    onClick={() => {
                      const confirmBox = window.confirm("Do you really want to delete this employee?");
                      if (confirmBox === true) {
                        handleDelete(item._id);
                      }
                    }}
                  >
                    Delete
                  </button>
                </td>
              )}
            </tr> 
          ))}
        </tbody>
            </table>
      </div>
    </div>
  )
}
export default EmployeeList;
