import './App.css';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import PrivateRoute from './PrivateRoute/PrivateRoute';
import Home from './Pages/Home/Home/Home';
import Login from './Pages/Login/Login';
import AuthProvider from './contexts/AuthProvider/AuthProvider';
import RegisterAsaRider from './Pages/Register/RegisterAsaRider/RegisterAsaRider';
import RegisterasaLearner from './Pages/Register/RegisterasaLearner/RegisterasaLearner';
import Dashboard from './Pages/Dashboard/Dashboard/Dashboard';
import DashboardHome from './Pages/Dashboard/DashboardHome/DashboardHome';
import ManageAllusers from './Pages/Dashboard/ManageAllusers/ManageAllusers';
import TestManageAllusers from './Pages/Dashboard/ManageAllusers/TestManageAllusers';
import Profile from './Pages/Profile/Profile/Profile';
import AddServices from './Pages/Dashboard/AddServices/AddServices';
import ServiceDetails from './Pages/ServiceDetails/ServiceDetails';
import Payment from './Pages/Dashboard/Payment/Payment';
import AdminRoute from './AdminRoute/AdminRoute';
function App() {
  return (
    <div>
      <AuthProvider>
      
        <Router>
          <Routes>
            <Route path="/home" element={<Home />}>
            </Route>
            <Route path="/login" element={<Login />}>
            </Route>
            <Route path="/profile" element={<Profile />}>
            </Route>
            <Route path="/payment/:serviceID" element={<Payment />}>
            </Route>
            <Route path="/services/:serviceID" element={<ServiceDetails />}>
            </Route>
            <Route path="/registerasarider" element={<RegisterAsaRider />}>
            </Route>
            <Route path="/registerasalearner" element={<RegisterasaLearner />}>
            </Route>
            <Route path="/dashboard" element={<PrivateRoute>
              <Dashboard />
            </PrivateRoute>}>
            <Route exact path="/dashboard/manageallusers" element={
                <ManageAllusers></ManageAllusers>
              }>
              </Route>
            <Route exact path="/dashboard/TestManageAllusers" element={<TestManageAllusers></TestManageAllusers>}>
              </Route>
            <Route exact path="/dashboard" element={<DashboardHome></DashboardHome>}>
              </Route>
            <Route exact path="/dashboard/AddServices" element={<AddServices></AddServices>}>
              </Route>
            </Route>
            <Route exact path="/" element={<Home />}>
            </Route>
          </Routes>
        </Router>
      </AuthProvider>
    </div>
  );
}

export default App;
