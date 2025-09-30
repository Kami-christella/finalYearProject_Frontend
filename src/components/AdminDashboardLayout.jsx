
import { Outlet } from 'react-router-dom';
//import CareerTest from './CareerTest.jsx';
import NewDash from './AdvisorNewDash.jsx';
import Footer from './Footer.jsx';

function DashboardLayout() {
  return (
    <div>
      {/* <Sidebar /> */}
      {/* <NewDash/> */}
      <div className="dashboard-content">

        <Outlet />

      </div>
      <Footer />
    </div>
  );
}

export default DashboardLayout;
