//App.jsx
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import './i18n';
import AdvisorDashboard from './components/AdvisorDashboard ';
import DashboardLayout from './components/DashboardLayout';
import AdminDashboardLayout from './components/AdminDashboardLayout'
import AdvisorAppointmentDashboard from './components/AdvisorAppointmentDashboard ';
import StudentAppointmentDashboard from './components/StudentAppointmentDashboard ';
import ProfileDashboard from './components/ProfileDashboard';
import EditProfile from './components/EditProfile';
import LandingPage from './components/LandingPage';
import { Signup } from './components/Signup';
import  {Login}from './components/Login'
import Layout from './components/Layout';
import StudentProfile from './components/StudentProfile ';
import Assessment from './components/assessment';
import ComprehensiveDashboard from './components/ComprehensiveDashboard '
import AdvisorDashboardLayout from './components/AdvisorDashboardLayout ';
import AdminDashboard from './components/AdminDashboard';
import Bookappointment from './components/Bookappointment';
import ProtectedRoute from './components/ProtectedRoute';


function App() {
  return (
    // <AuthProvider>
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Layout />}>
          <Route index element={<LandingPage/>} />
          <Route path='Signup' element={<Signup />} />
          <Route path='Login' element={<Login />} />
          {/* <Route path='StudentProfile' element={<StudentProfile/>} /> */}
          {/* <Route path='ProfileDashboard' element={<ProfileDashboard/>} /> */}
          {/* <Route path='EditProfile' element={<EditProfile/>} />
          <Route path='assessment' element={<Assessment/>} />
          <Route path='ComprehensiveDashboard' element={<ComprehensiveDashboard/>} /> */}
          <Route path='StudentAppointmentDashboard' element={<StudentAppointmentDashboard/>} />
          <Route path='AdvisorAppointmentDashboard' element={<AdvisorAppointmentDashboard/>} />

        </Route>

        {/* Dashboard Routes (Protected) */}

        <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<StudentProfile />} />
           <Route path='ProfileDashboard' element={<ProfileDashboard/>} />
            <Route path='EditProfile' element={<EditProfile/>} />
          <Route path='assessment' element={<Assessment/>} />
          <Route path='ComprehensiveDashboard' element={<ComprehensiveDashboard/>} />
          <Route path='appointment' element={<Bookappointment/>} />
          {/* <Route path='assessment2' element={<Assessment2 />} />
          <Route path='Assessment2/assessment3' element={<Assesment3 />} />
          <Route path='Assessment2/assessment3/Results' element={<Results />} />
          <Route path='Settings' element={<Settings />} />
          <Route path='Profile' element={<Profile />} /> */}
         
        </Route>
        <Route path='/advisordashboard' element={<AdvisorDashboardLayout />}>
          <Route index element={<AdvisorDashboard />} />
         
        </Route>
      
       <Route path='/admindashboard' element={<AdminDashboardLayout />}>
          
<Route index element={<AdminDashboard />} />
         
        </Route>
      

      </Routes>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
