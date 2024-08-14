
import './App.css';
import CreateEmployee from './components/createEmployee';
import EmployeeList from './components/employeeList';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './components/login';
import Navbar from './components/navbar';
import UpdateEmployee from './components/updateEmployee';
import Welcome from './components/welcome';
function App() {
  return (
    <Router>
      <div className="App">
        <Navbar/>
        <Routes>
     
        <Route path = "/" element={<Login />} />
        <Route path = "/welcome" element={<Welcome />} />
        <Route path = "/createemployee" element={<CreateEmployee />} />
        <Route path = "/employeelist" element={<EmployeeList />} />
        <Route path = "/employeeupdate" element={<UpdateEmployee />} />
        </Routes>
    </div></Router>

  );
}

export default App;
