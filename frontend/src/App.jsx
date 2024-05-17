import './App.css'
import React from 'react'
import 'bootstrap/dist/css/bootstrap.min.css'
import Login from './Components/Login'
import {BrowserRouter, Routes, Route, useNavigate} from 'react-router-dom'
import Dashboard from './Components/Dashboard'
import Home from './Components/Home'
import Start from './Components/Start';
import EmployeeLogin from './Components/EmployeeLogin';
import Signup from './Components/Signup';
import EmployeeDetail from './Components/employees/EmployeeDetail'
import ListClasses from './Components/employees/ListClasses'
import Employee from './Components/employees/Employee'
import Classes from './Components/classes/Classes';
import AddClass from './Components/classes/AddClass';
import EditClass from './Components/classes/EditClass';
import ListOfStud from './Components/classes/ListOfStud'
import ListOfTeacher from './Components/classes/ListOfTeacher';
import Students from './Components/students/Students';
import AddStud from './Components/students/AddStud';
import EditStud from './Components/students/EditStud';
import Category from './Components/category/Category';
import Profile from './Components/Profile/Profile';
import EditProfil from './Components/Profile/EditProfil';
import AddCategory from './Components/category/AddCategory';
import AddEmployee from './Components/employees/AddEmployee';
import EditEmployee from './Components/employees/EditEmployee';
import EditCat from './Components/category/EditCat';
import PrivateRoute from './Components/PrivateRoute'


function App() {
  return (
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Start />}></Route>
      <Route path='/adminlogin' element={<Login />}></Route>
      <Route path='/employee_login' element={<EmployeeLogin />}></Route>
      <Route path='/signup' element={<Signup />}></Route>
      <Route path='/employee_detail/:id' element={<EmployeeDetail />}></Route>
      <Route path='/ListClasses/:id' element={<ListClasses />}></Route>
      {/* <Route path='/employee_detail/:id' element={<PrivateRoute ><EmployeeDetail /></PrivateRoute>}>
        <Route path='/employee_detail/employee/:id' element={<EmpHome />}></Route>
      </Route> */}
      <Route path='/dashboard' element={
        <PrivateRoute >
          <Dashboard />
        </PrivateRoute>
      }>
        <Route path='' element={<Home />}></Route>
        <Route path='/dashboard/classes' element={<Classes />}></Route>
        <Route path='/dashboard/add_class' element={<AddClass />}></Route>
        <Route path='/dashboard/edit_class/:id' element={<EditClass />}></Route>
        <Route path='/dashboard/list_class/:id' element={<ListOfStud />}></Route>
        <Route path='/dashboard/list_teachers/:id' element={<ListOfTeacher />}></Route>
        <Route path='/dashboard/students' element={<Students />}></Route>
        <Route path='/dashboard/add_student' element={<AddStud />}></Route>
        <Route path='/dashboard/edit_student/:id' element={<EditStud/>}></Route>
        <Route path='/dashboard/employee' element={<Employee />}></Route>
        <Route path='/dashboard/category' element={<Category />}></Route>
        <Route path='/dashboard/profile/:id' element={<Profile />}></Route>
        <Route path='/dashboard/profile/edit/:id' element={<EditProfil />}></Route>
        <Route path='/dashboard/add_category' element={<AddCategory />}></Route>
        <Route path='/dashboard/add_employee' element={<AddEmployee />}></Route>
        <Route path='/dashboard/edit_employee/:id' element={<EditEmployee />}></Route>
        <Route path='/dashboard/edit_category/:id' element={<EditCat />}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
  )
}

export default App
