import { BrowserRouter, Route, Routes, Navigate } from 'react-router-dom';
import Home from './pages/Home';

import Registration from './pages/Registration';
import Login from './pages/login';
import Admin from './pages/Admin';
import AdminPanal from './pages/AdminPanal';
import UserTable from './pages/UserTable';
import Task from './pages/AsignTask';
import DisplayData from './pages/Display';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Navigate to="/home" />} /> 
      <Route path="/home" element={<Home />} />
      <Route path="/Admin" element={<Admin />} />
      <Route path="/adminpanal" element={<AdminPanal />} />
      <Route path="/usertable" element={<UserTable />} />
      <Route path="/task" element={<Task />} />
      <Route path="/displaydata" element={<DisplayData />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registration" element={<Registration />} />
     
    </Routes>
  </BrowserRouter>
);

export default App;
