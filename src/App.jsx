//import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
// import Home from './components/Home';
import AdvisorDashboard from './components/AdvisorDashboard ';
import ProfileDashboard from './components/ProfileDashboard';
import EditProfile from './components/EditProfile';
import LandingPage from './components/LandingPage';
import { Signup } from './components/Signup';
import  {Login}from './components/Login'
import Layout from './components/Layout';
import StudentProfile from './components/StudentProfile ';
import Assessment from './components/assessment';
import ComprehensiveDashboard from './components/ComprehensiveDashboard '



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
          <Route path='StudentProfile' element={<StudentProfile/>} />
          <Route path='ProfileDashboard' element={<ProfileDashboard/>} />
          <Route path='EditProfile' element={<EditProfile/>} />
          <Route path='assessment' element={<Assessment/>} />
          <Route path='advisorDashboard' element={<AdvisorDashboard/>} />
          <Route path='ComprehensiveDashboard' element={<ComprehensiveDashboard/>} />
          AdvisorDashboard
          
          {/* <Route path='Signup' element={<Signup />} />
          <Route path='Login' element={<Login />} />
          <Route path='About' element={<About />} />
          <Route path='Contact' element={<Contact />} />
          <Route path='Services' element={<Services />} /> */}
        </Route>

        {/* Dashboard Routes (Protected) */}

        {/* <Route path='/dashboard' element={<DashboardLayout />}>
          <Route index element={<CareerTest />} />
          <Route path='assessment2' element={<Assessment2 />} />
          <Route path='Assessment2/assessment3' element={<Assesment3 />} />
          <Route path='Assessment2/assessment3/Results' element={<Results />} />
          <Route path='Settings' element={<Settings />} />
          <Route path='Profile' element={<Profile />} />
         
        </Route> */}

       {/* <Route path='/admindashboard' element={<AdminDashboardLayout/>}>
       <Route index element={<AdminPage />} />
       <Route path='adminSettings' element={<AdminSettings />} />
       
       </Route> */}

      </Routes>
    </BrowserRouter>
    // </AuthProvider>
  );
}

export default App;
