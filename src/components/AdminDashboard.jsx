//AdminDashboard.jsx
import React, { useState, useEffect } from 'react';
// Add these imports at the top of AdvisorDashboard.jsx
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
import { Notify } from 'notiflix';
import './styles/AdvisorDashboard.css';
import { IoPersonCircle, IoHomeOutline, IoSettings } from "react-icons/io5";
import AUCA from "../assets/images/AUCA.png"
import AUCALOGO from "../assets/images/AUCALOGO.png"
import { IoMdPerson } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import { FaFilePdf, FaFileExcel, FaDownload, FaChartBar } from "react-icons/fa";



// Add these constants after your imports
const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B", "#4ECDC4", "#45B7D1"];
const BAR_COLORS = ["#8884D8", "#82CA9D", "#FFC658", "#FF7C7C", "#8DD1E1", "#D084D0", "#FFB347", "#87D68D", "#FFB6C1", "#20B2AA"];
const PROGRAM_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B'];

const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  // { id: 'students', label: 'All Students', icon: '👥' },
  { id: 'users', label: 'User Management', icon: '👤' }, 
  // { id: 'roles', label: 'Role Management', icon: '🔧' }, 
  // { id: 'transfer', label: 'Transfer Students', icon: '🔄' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'activity', label: 'Activity Log', icon: '📋' }
];


// Add these helper functions before the AdvisorDashboard component

// Chart transformation functions
const transformGradeDataForPieChart = (gradeDistribution) => {
  if (!gradeDistribution || !Array.isArray(gradeDistribution)) return [];
  return gradeDistribution.map(grade => ({
    name: grade._id,
    value: grade.count,
    grade: grade._id
  }));
};

const transformFacultyDataForBarChart = (facultyDistribution) => {
  if (!facultyDistribution || !Array.isArray(facultyDistribution)) return [];
  return facultyDistribution.map(faculty => ({
    name: faculty._id.length > 20 ? faculty._id.substring(0, 20) + '...' : faculty._id,
    fullName: faculty._id,
    students: faculty.count,
    uv: faculty.count
  }));
};
// Add this after your existing transformation functions
const transformRecommendedFacultiesForBarChart = (topFaculties) => {
  if (!topFaculties || !Array.isArray(topFaculties)) return [];
  return topFaculties.map(faculty => ({
    name: faculty._id.length > 20 ? faculty._id.substring(0, 20) + '...' : faculty._id,
    fullName: faculty._id,
    students: faculty.count,
    uv: faculty.count,
    avgMatch: faculty.avgMatchPercentage || 0
  }));
};
const transformProgramDataForBarChart = (programPreferences) => {
  if (!programPreferences || !Array.isArray(programPreferences)) return [];
  return programPreferences.map((program, index) => ({
    name: program._id.length > 15 ? program._id.substring(0, 15) + '...' : program._id,
    fullName: program._id,
    uv: program.count,
    students: program.count
  }));
};



// Triangle Bar Shape Component
const getPath = (x, y, width, height) => {
  return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
  ${x + width / 2}, ${y}
  C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
  Z`;
};

const TriangleBar = (props) => {
  const { fill, x, y, width, height } = props;
  return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
};

// Pie chart label function
const RADIAN = Math.PI / 180;
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  return (
    <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const AdvisorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
   const [analytics, setAnalytics] = useState({});
  const [activeFacultyIndex, setActiveFacultyIndex] = useState(0);
const [showUserDropdown, setShowUserDropdown] = useState(false); 
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("User");
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [statistics, setStatistics] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [users, setUsers] = useState([]);
  const [reportForm, setReportForm] = useState({
  reportType: 'users',
  format: 'excel',
  dateRange: 'month',
  startDate: '',
  endDate: '',
  includeCharts: true,
  filters: {}
});
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [filterRole, setFilterRole] = useState('all');
  const [showReportModal, setShowReportModal] = useState(false);
const [reportLoading, setReportLoading] = useState(false);
// const [reportForm, setReportForm] = useState({
//   reportType: 'system',
//   format: 'excel',
//   dateRange: 'month',
//   startDate: '',
//   endDate: '',
//   includeCharts: true,
//   filters: {}
// });

  
  const navigate = useNavigate();
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  // Appointment state
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointmentFilter, setAppointmentFilter] = useState('all');
  
  const [dateFilter, setDateFilter] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const [showCreateAppointmentModal, setShowCreateAppointmentModal] = useState(false);
  const [showEditAppointmentModal, setShowEditAppointmentModal] = useState(false);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);
  
  // Form States
  const [createUserForm, setCreateUserForm] = useState({
    name: '',
    email: '',
    password: '',
    userRole: 'user',
    phone: '',
    department: ''
  });

  const [editUserForm, setEditUserForm] = useState({
    name: '',
    email: '',
    userRole: '',
    phone: '',
    department: '',
    isActive: true
  });

  const [bulkOperationForm, setBulkOperationForm] = useState({
    action: 'activate',
    role: 'student',
    department: ''
  });
  const [appointmentPagination, setAppointmentPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });


  
  // Review form state
  const [reviewForm, setReviewForm] = useState({
    advisorNotes: '',
    recommendedFaculty: '',
    recommendedDepartment: '',
    careerAdvice: '',
    nextSteps: '',
    approved: false
  });

  // Bulk review form
  const [bulkReviewForm, setBulkReviewForm] = useState({
    approved: false,
    advisorNotes: ''
  });

  // Appointment form state
  // const [appointmentForm, setAppointmentForm] = useState({
  //   date: '',
  //   startTime: '',
  //   endTime: '',
  //   duration: 30,
  //   isRecurring: false,
  //   recurringPattern: 'weekly',
  //   recurringEndDate: '',
  //   notes: '',
  //   meetingType: 'physical',
  //   meetingLink: ''
  // });

  // Appointment form state
const [appointmentForm, setAppointmentForm] = useState({
  date: '',
  startTime: '',
  endTime: '',
  duration: 30,
  isRecurring: false,
  recurringPattern: 'weekly',
  recurringEndDate: '',
  notes: '',
  meetingType: 'physical',
  meetingLink: ''
});

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchDashboardData();
    } else if (activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved') {
      fetchStudents();
    } else if (activeTab === 'transfer') {
      fetchTransferStudents();
    } else if (activeTab === 'activity') {
      fetchActivityLog();
    } else if (activeTab === 'analytics') {
      fetchAnalytics();  
    }else if (activeTab === 'users' || activeTab === 'roles') {
      fetchUsers(); 
    } else if (activeTab === 'appointments') {
      fetchAppointments();
    }
  }, [activeTab, pagination.currentPage]);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, filterStatus]);

  useEffect(() => {
    filterAppointments();
  }, [appointments, appointmentFilter, dateFilter]);

  // Add useEffect to get user name from localStorage or API
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setUserName(user.name);
    } else {
      // Fallback: try to get from token or make API call
      const token = localStorage.getItem('token');
      if (token) {
        // You can make an API call here to get user details if needed
        fetchUserDetails();
      }
    }
  }, []);

  // ADD THIS: Get user name from localStorage
useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.name) {
    setUserName(user.name);
  }
}, []);

// ADD THIS: Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest('.user-profile-dropdown')) {
      setShowUserDropdown(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);
// const fetchDashboardData = async () => {
//   try {
//     setLoading(true);
//     const token = localStorage.getItem('token');
    
//     // Fetch from both endpoints simultaneously
//     const [adminResponse, studentResponse] = await Promise.all([
//       fetch('http://localhost:5000/api/admin/dashboard', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       }).catch(() => ({ ok: false })),
      
//       fetch('http://localhost:5000/api/student/profiles/statistics', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       }).catch(() => ({ ok: false }))
//     ]);

//     let combinedData = {};

//     // Process admin dashboard data
//     if (adminResponse.ok) {
//       const adminData = await adminResponse.json();
//       console.log('Admin data:', adminData); // Debug log
//       combinedData.timeTracking = adminData.data?.timeTracking || {};
//       combinedData.userManagement = adminData.data?.userManagement || {};
//     }

//     // Process student statistics data
//     if (studentResponse.ok) {
//       const studentData = await studentResponse.json();
//       console.log('Student data:', studentData); // Debug log
//       combinedData = { ...combinedData, ...studentData.statistics };
//     }

//     console.log('Final combined data:', combinedData); // Debug log
//     setStatistics(combinedData);

//   } catch (error) {
//     console.error('Error loading dashboard:', error);
//     Notify.failure('Error loading dashboard');
//   } finally {
//     setLoading(false);
//   }
// };

const fetchDashboardData = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    const [adminResponse, studentResponse] = await Promise.all([
      fetch('http://localhost:5000/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).catch(() => ({ ok: false })),
      
      fetch('http://localhost:5000/api/student/profiles/statistics', {
        headers: { 'Authorization': `Bearer ${token}` }
      }).catch(() => ({ ok: false }))
    ]);

    let combinedData = {};

    // Process admin dashboard data
    if (adminResponse.ok) {
      const adminData = await adminResponse.json();
      console.log('Admin data:', adminData);
      
      combinedData.timeTracking = adminData.data?.timeTracking || {};
      combinedData.userManagement = adminData.data?.userManagement || {};
      
      // ADD THIS: Set analytics data including new recommendation stats
      setAnalytics(adminData.data?.analytics || {});
    }

    // Process student statistics data
    if (studentResponse.ok) {
      const studentData = await studentResponse.json();
      combinedData = { ...combinedData, ...studentData.statistics };
    }

    setStatistics(combinedData);

  } catch (error) {
    console.error('Error loading dashboard:', error);
    Notify.failure('Error loading dashboard');
  } finally {
    setLoading(false);
  }
};
    // Add function to fetch user details (optional)
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUserName(data.user?.name || 'Advisor');
        // Optionally store in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // User Management Functions - Add these after your existing fetch functions

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.itemsPerPage.toString(),
        userRole: filterRole,
        searchTerm,
        isActive: filterStatus
      });

      const response = await fetch(`http://localhost:5000/api/admin/users?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.data.users);
        setPagination(data.data.pagination);
      } else {
        Notify.failure('Failed to fetch users');
      }
    } catch (error) {
      Notify.failure('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(createUserForm)
      });

      if (response.ok) {
        Notify.success('User created successfully!');
        setShowCreateUserModal(false);
        setCreateUserForm({
          name: '',
          email: '',
          password: '',
          role: 'student',
          phone: '',
          department: ''
        });
        fetchUsers();
        fetchDashboardData();
      } else {
        const error = await response.json();
        Notify.failure(error.message || 'Failed to create user');
      }
    } catch (error) {
      Notify.failure('Error creating user');
    }
  };

  // Add these missing functions after your existing user management functions

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/delete`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        Notify.success('User deleted successfully!');
        fetchUsers();
        fetchDashboardData();
      } else {
        const error = await response.json();
        Notify.failure(error.message || 'Failed to delete user');
      }
    } catch (error) {
      Notify.failure('Error deleting user');
    }
  };

  const handleAssignAdvisor = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/assign-advisor`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ department: 'General' })
      });

      if (response.ok) {
        Notify.success('Advisor role assigned successfully!');
        fetchUsers();
        fetchDashboardData();
      } else {
        const error = await response.json();
        Notify.failure(error.message || 'Failed to assign advisor role');
      }
    } catch (error) {
      Notify.failure('Error assigning advisor role');
    }
  };

  const handleBulkOperation = async (e) => {
    e.preventDefault();
    if (selectedUsers.length === 0) {
      Notify.warning('Please select users for bulk operation');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/users/bulk-update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userIds: selectedUsers,
          action: bulkOperationForm.action,
          data: bulkOperationForm.action === 'assignRole' ? {
            userRole: bulkOperationForm.userRole,
            department: bulkOperationForm.department
          } : undefined
        })
      });

      if (response.ok) {
        const result = await response.json();
        Notify.success(`Bulk operation completed! ${result.data.usersAffected} users affected.`);
        setShowBulkModal(false);
        setSelectedUsers([]);
        fetchUsers();
        fetchDashboardData();
      } else {
        const error = await response.json();
        Notify.failure(error.message || 'Bulk operation failed');
      }
    } catch (error) {
      Notify.failure('Error performing bulk operation');
    }
  };

// Generate System Report (PDF/Excel)

const handleGenerateSystemReport = async (format = 'excel') => {
  try {
    setReportLoading(true);
    const token = localStorage.getItem('token');
    
    const params = new URLSearchParams({
      format: format,
      includeCharts: 'true',
      includeAnalytics: 'true'
    });

    const response = await fetch(`http://localhost:5000/api/admin/reports/system?${params}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const timestamp = new Date().toISOString().split('T')[0];
      a.download = `system-report-${timestamp}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      Notify.success(`${format.toUpperCase()} system report downloaded successfully!`);
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to generate system report');
    }
  } catch (error) {
    console.error('System report error:', error);
    Notify.failure('Error generating system report: ' + error.message);
  } finally {
    setReportLoading(false);
  }
};
// const handleGenerateSystemReport = async (format = 'excel') => {
//   try {
//     setReportLoading(true);
//     const token = localStorage.getItem('token');
    
//     const params = new URLSearchParams({
     
//       reportType: 'system',
//       startDate: reportForm.startDate,
//       endDate: reportForm.endDate,
//       includeCharts: reportForm.includeCharts
//     });

//     const response = await fetch(`http://localhost:5000/api/admin/reports/system/${format}?${params}`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     if (response.ok) {
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `system-report-${new Date().toISOString().split('T')[0]}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
      
//       Notify.success(`${format.toUpperCase()} report downloaded successfully!`);
//     } else {
//       throw new Error('Failed to generate report');
//     }
//   } catch (error) {
//     Notify.failure('Error generating report: ' + error.message);
//   } finally {
//     setReportLoading(false);
//   }
// };

// Generate Analytics Report

const handleGenerateAnalyticsReport = async (format = 'excel') => {
  try {
    setReportLoading(true);
    const token = localStorage.getItem('token');
    
    const params = new URLSearchParams({
      format: format,
      period: 'month', // You might want to make this configurable
      includeCharts: format === 'pdf' ? 'true' : 'false'
    });

    const response = await fetch(`http://localhost:5000/api/admin/reports/analytics?${params}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const timestamp = new Date().toISOString().split('T')[0];
      a.download = `analytics-report-month-${timestamp}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      Notify.success(`Analytics ${format.toUpperCase()} report downloaded successfully!`);
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to generate analytics report');
    }
  } catch (error) {
    console.error('Analytics report error:', error);
    Notify.failure('Error generating analytics report: ' + error.message);
  } finally {
    setReportLoading(false);
  }
};
// const handleGenerateAnalyticsReport = async (format = 'excel') => {
//   try {
//     setReportLoading(true);
//     const token = localStorage.getItem('token');
    
//     const params = new URLSearchParams({
//       format: format,
//       period: reportForm.dateRange
//     });

//     const response = await fetch(`http://localhost:5000/api/admin/reports/analytics?${params}`, {
//       headers: { 'Authorization': `Bearer ${token}` }
//     });

//     if (response.ok) {
//       const blob = await response.blob();
//       const url = window.URL.createObjectURL(blob);
//       const a = document.createElement('a');
//       a.href = url;
//       a.download = `analytics-report-${reportForm.dateRange}-${new Date().toISOString().split('T')[0]}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
//       document.body.appendChild(a);
//       a.click();
//       window.URL.revokeObjectURL(url);
//       document.body.removeChild(a);
      
//       Notify.success(`Analytics ${format.toUpperCase()} report downloaded successfully!`);
//     } else {
//       throw new Error('Failed to generate analytics report');
//     }
//   } catch (error) {
//     Notify.failure('Error generating analytics report: ' + error.message);
//   } finally {
//     setReportLoading(false);
//   }
// };


const handleGenerateCustomReport = async (e) => {
  e.preventDefault();
  
  try {
    setReportLoading(true);
    const token = localStorage.getItem('token');
    
    if (!token) {
      Notify.failure('Authentication token missing. Please log in again.');
      return;
    }

    // Validate custom date range
    if (reportForm.dateRange === 'custom') {
      if (!reportForm.startDate || !reportForm.endDate) {
        Notify.failure('Please select both start and end dates for custom range');
        return;
      }
      if (new Date(reportForm.startDate) > new Date(reportForm.endDate)) {
        Notify.failure('Start date cannot be after end date');
        return;
      }
    }

    // Build comprehensive query parameters
    const params = new URLSearchParams({
      format: reportForm.format,
      reportType: reportForm.reportType,
      dateRange: reportForm.dateRange,
      includeCharts: reportForm.includeCharts.toString()
    });

    // Add custom date range if selected
    if (reportForm.dateRange === 'custom') {
      params.append('startDate', reportForm.startDate);
      params.append('endDate', reportForm.endDate);
    }

    // Add filters if they exist
    Object.entries(reportForm.filters).forEach(([key, value]) => {
      if (value && value !== '') {
        params.append(`filter_${key}`, value);
      }
    });

    const url = `http://localhost:5000/api/admin/reports/custom?${params}`;
    
    const response = await fetch(url, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Accept': 'application/octet-stream'
      }
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `Server error: ${response.status}`);
    }

    // Handle file download
    const blob = await response.blob();
    const downloadUrl = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = downloadUrl;
    
    const timestamp = new Date().toISOString().split('T')[0];
    const dateStr = reportForm.dateRange === 'custom' 
      ? `${reportForm.startDate}-to-${reportForm.endDate}`
      : reportForm.dateRange;
    
    const filename = `${reportForm.reportType}-report-${dateStr}-${timestamp}.${reportForm.format === 'pdf' ? 'pdf' : 'xlsx'}`;
    
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    
    setTimeout(() => {
      window.URL.revokeObjectURL(downloadUrl);
      document.body.removeChild(a);
    }, 100);
    
    Notify.success(`${reportForm.format.toUpperCase()} report generated successfully!`);
    setShowReportModal(false);
    
    // Reset form
    setReportForm({
      reportType: 'users',
      format: 'excel',
      dateRange: 'month',
      startDate: '',
      endDate: '',
      includeCharts: true,
      filters: {}
    });
    
  } catch (error) {
    console.error('Custom report error:', error);
    Notify.failure('Error generating custom report: ' + error.message);
  } finally {
    setReportLoading(false);
  }
};

// Quick report generation functions
const handleGenerateQuickReport = async (reportType, dateRange = 'month', format = 'excel') => {
  try {
    setReportLoading(true);
    const token = localStorage.getItem('token');
    
    const params = new URLSearchParams({
      format,
      reportType,
      dateRange,
      includeCharts: 'true'
    });

    const response = await fetch(`http://localhost:5000/api/admin/reports/custom?${params}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `${reportType}-${dateRange}-report-${new Date().toISOString().split('T')[0]}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
      a.click();
      window.URL.revokeObjectURL(url);
      
      Notify.success(`${reportType} report downloaded!`);
    } else {
      throw new Error('Failed to generate report');
    }
  } catch (error) {
    Notify.failure('Error: ' + error.message);
  } finally {
    setReportLoading(false);
  }
};

const handleGenerateUserReport = async (format = 'excel') => {
  try {
    if (selectedUsers.length === 0) {
      Notify.warning('Please select users to include in the report');
      return;
    }

    setReportLoading(true);
    const token = localStorage.getItem('token');
    
    const response = await fetch('http://localhost:5000/api/admin/reports/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        userIds: selectedUsers,
        format: format,
        includeProfiles: true,
        includeAssessments: true,
        includeActivity: true // Add activity data
      })
    });

    if (response.ok) {
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      
      const timestamp = new Date().toISOString().split('T')[0];
      a.download = `selected-users-report-${selectedUsers.length}-users-${timestamp}.${format === 'pdf' ? 'pdf' : 'xlsx'}`;
      
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
      
      Notify.success(`User ${format.toUpperCase()} report for ${selectedUsers.length} users downloaded successfully!`);
    } else {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || 'Failed to generate user report');
    }
  } catch (error) {
    console.error('User report error:', error);
    Notify.failure('Error generating user report: ' + error.message);
  } finally {
    setReportLoading(false);
  }
};

  const openUserDetails = async (user) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${user._id}/details`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedUser({
          ...data.data.user,
          profile: data.data.profile,
          assessment: data.data.assessment
        });
        setShowUserDetailsModal(true);
      } else {
        Notify.failure('Failed to fetch user details');
      }
    } catch (error) {
      Notify.failure('Error loading user details');
    }
  };

  const openEditUser = (user) => {
    setSelectedUser(user);
    setEditUserForm({
      name: user.name,
      email: user.email,
      userRole: user.userRole,
      // phone: user.phone || '',
      // department: user.department || '',
      isActive: user.isActive
    });
    
    setShowEditUserModal(true);
  };

  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user._id));
    }
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: <span className="role-badge admin">Admin</span>,
      advisor: <span className="role-badge advisor">Advisor</span>,
      student: <span className="role-badge student">Student</span>
    };
    
    return badges[role] || <span className="role-badge">{role}</span>;
  };

  const getUserStatusBadge = (isActive) => {
    return isActive 
      ? <span className="status-badge active">Active</span>
      : <span className="status-badge inactive">Inactive</span>;
  };

  // Filter users based on active tab
const getFilteredUsers = () => {
  let filtered = [...users];

  // Filter by active tab
  switch (activeTab) {
    case 'users':
      // Show all users
      break;
    case 'roles':
      // Only advisors and admins
      filtered = filtered.filter(
        (user) => user.userRole?.toLowerCase() === 'advisor' || user.userRole?.toLowerCase() === 'admin'
      );
      break;
    default:
      break;
  }

  // Filter by role dropdown
  if (filterRole && filterRole !== 'all') {
    filtered = filtered.filter(
      (user) => user.userRole?.toLowerCase() === filterRole.toLowerCase()
    );
  }

  // Filter by search
  if (searchTerm) {
    filtered = filtered.filter((user) =>
      [user.name, user.email]
        .filter(Boolean) // ignore nulls
        .some((field) => field.toLowerCase().includes(searchTerm.toLowerCase()))
    );
  }

  return filtered; // just return the filtered array
};


const handleEditUser = async (e) => {
  e.preventDefault();
  console.log('Submitting edit form:', editUserForm); // Debug log
  
  try {
    const token = localStorage.getItem('token');
    
    // Prepare the data to send
    const updateData = {
      name: editUserForm.name,
      email: editUserForm.email,
      userRole: editUserForm.userRole, 
      // phone: editUserForm.phone,
      // department: editUserForm.department,
      isActive: editUserForm.isActive
    };
    
    console.log('Sending update data:', updateData); // Debug log
    
    const response = await fetch(`http://localhost:5000/api/users/updateuser/${selectedUser._id}`, {
     
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });
    console.log("id",selectedUser._id)

    console.log('Response status:', response.status); // Debug log
    
    if (response.ok) {
      const result = await response.json();
      console.log('Update result:', result); // Debug log
      
      Notify.success('User updated successfully!');
      setShowEditUserModal(false);
      
      // Reset form
      setEditUserForm({
        name: '',
        email: '',
        userRole: '',
        // phone: '',
        // department: '',
        isActive: ''
      });
      
      fetchUsers(); // Refresh the users list
    } else {
      const error = await response.json();
      console.error('Update error:', error); // Debug log
      Notify.failure(error.message || 'Failed to update user');
    }
  } catch (error) {
    console.error('Request error:', error); // Debug log
    Notify.failure('Error updating user: ' + error.message);
  }
};

  // const handleEditUser = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const token = localStorage.getItem('token');
  //     const response = await fetch(`http://localhost:5000/api/admin/users/${selectedUser._id}/update`, {
  //       method: 'PUT',
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: JSON.stringify(editUserForm)
  //     });

  //     if (response.ok) {
  //       Notify.success('User updated successfully!');
  //       setShowEditUserModal(false);
  //       fetchUsers();
  //     } else {
  //       const error = await response.json();
  //       Notify.failure(error.message || 'Failed to update user');
  //     }
  //   } catch (error) {
  //     Notify.failure('Error updating user');
  //   }
  // };

  // Add function to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-profile-dropdown')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

    // Add function to close dropdown when clicking outside
  // useEffect(() => {
  //   const handleClickOutside = (event) => {
  //     if (!event.target.closest('.user-profile-dropdown')) {
  //       setShowUserDropdown(false);
  //     }
  //   };

  //   document.addEventListener('mousedown', handleClickOutside);
  //   return () => {
  //     document.removeEventListener('mousedown', handleClickOutside);
  //   };
  // }, []);
  
  const fetchStudents = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      let endpoint = '';
      
      switch (activeTab) {
        case 'students':
          endpoint = 'http://localhost:5000/api/student/allprofiles';
          break;
        case 'pending':
          endpoint = 'http://localhost:5000/api/student/profiles/status/pending';
          break;
        case 'approved':
          endpoint = 'http://localhost:5000/api/student/profiles/status/approved';
          break;
        default:
          endpoint = 'http://localhost:5000/api/student/allprofiles';
      }
      
      console.log('Fetching from endpoint:', endpoint);
      
      const response = await fetch(`${endpoint}?page=${page}&limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Raw response data:', data);
        
        let studentsArray = [];
        let paginationData = {};
        
        // Handle different response structures
        if (data.data && Array.isArray(data.data.profiles)) {
          studentsArray = data.data.profiles;
          paginationData = data.data.pagination || {};
        } else if (Array.isArray(data.profiles)) {
          studentsArray = data.profiles;
          paginationData = data.pagination || {};
        } else if (Array.isArray(data.data)) {
          studentsArray = data.data;
        } else if (Array.isArray(data)) {
          studentsArray = data;
        } else if (data.students && Array.isArray(data.students)) {
          studentsArray = data.students;
          paginationData = data.pagination || {};
        }
        
        console.log('Processed students array:', studentsArray);
        console.log('Students count:', studentsArray.length);
        
        setStudents(studentsArray);
        setPagination(prev => ({
          ...prev,
          ...paginationData,
          currentPage: page
        }));
        
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        
        if (response.status === 403) {
          Notify.failure('Access denied. Please check your permissions.');
        } else if (response.status === 404) {
          Notify.failure('Endpoint not found. Please check your backend routes.');
        } else {
          Notify.failure(`Failed to fetch students: ${response.status}`);
        }
        setStudents([]);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      Notify.failure('Error loading students: ' + error.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };


  // Add this function after your existing fetch functions
  const fetchAnalytics = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.data.analytics || {});
      } else {
        console.error('Failed to fetch analytics data:', response.status);
        Notify.failure('Failed to fetch analytics data');
      }
    } catch (error) {
      console.error('Error loading analytics:', error);
      Notify.failure('Error loading analytics');
    } finally {
      setLoading(false);
    }
  };

  // Fetch transfer students
  const fetchTransferStudents = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/student/transfer-students?page=${page}&limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Transfer students response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Transfer students data:', data);
        
        let studentsArray = [];
        let paginationData = {};
        
        if (data.data && Array.isArray(data.data.students)) {
          studentsArray = data.data.students;
          paginationData = data.data.pagination || {};
        } else if (Array.isArray(data.students)) {
          studentsArray = data.students;
          paginationData = data.pagination || {};
        } else if (Array.isArray(data)) {
          studentsArray = data;
        }
        
        setStudents(studentsArray);
        setPagination(prev => ({
          ...prev,
          ...paginationData,
          currentPage: page
        }));
      } else {
        console.error('Failed to fetch transfer students');
        Notify.failure('Failed to fetch transfer students');
        setStudents([]);
      }
    } catch (error) {
      console.error('Error loading transfer students:', error);
      Notify.failure('Error loading transfer students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityLog = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/advisor/activity-log?page=${page}&limit=20`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setActivityLog(data.data.activities || []);
        setPagination(data.data.pagination || pagination);
      } else {
        setActivityLog([]);
      }
    } catch (error) {
      setActivityLog([]);
    } finally {
      setLoading(false);
    }
  };

  // Appointment Management Functions
  const fetchAppointments = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      // Fetch both appointments and available slots
      const [appointmentsRes, slotsRes] = await Promise.all([
        fetch(`http://localhost:5000/api/appointments/manage?page=${page}&limit=10`, {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch(`http://localhost:5000/api/appointments/slots/my-slots`, {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);
      
      const appointmentsData = appointmentsRes.ok ? await appointmentsRes.json() : { data: { appointments: [] } };
      const slotsData = slotsRes.ok ? await slotsRes.json() : { data: { slots: [] } };
      
      // Combine appointments and available slots
      const allAppointments = [
        ...(appointmentsData.data.appointments || []),
        ...(slotsData.data.slots || []).map(slot => ({
          ...slot,
          status: slot.available ? 'available' : 'booked',
          _id: slot._id,
          date: slot.date,
          startTime: slot.time,
          endTime: slot.time,
          duration: 30,
          meetingType: slot.type,
          location: slot.location,
          notes: ''
        }))
      ];
      
      setAppointments(allAppointments);
      setAppointmentPagination(appointmentsData.data.pagination || appointmentPagination);
      
    } catch (error) {
      setAppointments([]);
      Notify.failure('Error loading appointments');
    } finally {
      setLoading(false);
    }
  };

  const filterAppointments = () => {
    let filtered = appointments;
    
    // Filter by status
    if (appointmentFilter !== 'all') {
      filtered = filtered.filter(appointment => appointment.status === appointmentFilter);
    }
    
    // Filter by date range
    if (dateFilter.start || dateFilter.end) {
      filtered = filtered.filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
        const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
        
        if (startDate && appointmentDate < startDate) return false;
        if (endDate && appointmentDate > endDate) return false;
        return true;
      });
    }
    
    setFilteredAppointments(filtered);
  };
    

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      // Format data to match backend expectations
      const slotData = {
        date: appointmentForm.date,
        time: appointmentForm.startTime,
        type: appointmentForm.meetingType,
        location: appointmentForm.meetingType === 'online' ? appointmentForm.meetingLink : undefined,
        duration: appointmentForm.duration,
        notes: appointmentForm.notes,
         // NEW: Add recurring fields
      isRecurring: appointmentForm.isRecurring,
      recurringPattern: appointmentForm.recurringPattern,
      recurringEndDate: appointmentForm.recurringEndDate
      };

      const response = await fetch('http://localhost:5000/api/appointments/slots/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(slotData)
      });
      
      if (response.ok) {
        Notify.success('Appointment slot created successfully');
        setShowCreateAppointmentModal(false);
        setAppointmentForm({
          date: '',
          startTime: '',
          endTime: '',
          duration: 30,
          isRecurring: false,
          recurringPattern: 'weekly',
          recurringEndDate: '',
          notes: '',
          meetingType: 'physical',
          meetingLink: ''
        });
        fetchAppointments();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create appointment');
      }
    } catch (error) {
      Notify.failure('Failed to create appointment: ' + error.message);
    }
  };

  const handleEditAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentForm({
      date: appointment.date.split('T')[0],
      startTime: appointment.startTime,
      endTime: appointment.endTime,
      duration: appointment.duration || 30,
      isRecurring: false,
      recurringPattern: 'weekly',
      recurringEndDate: '',
      notes: appointment.notes || '',
      meetingType: appointment.type || 'physical',
      meetingLink: appointment.location || ''
    });
    setShowEditAppointmentModal(true);
  };

  const handleDeleteAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to delete this appointment slot?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/appointments/slots/delete`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ slotId: appointmentId })
      });
      
      if (response.ok) {
        Notify.success('Appointment deleted successfully');
        fetchAppointments();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete appointment');
      }
    } catch (error) {
      Notify.failure('Failed to delete appointment: ' + error.message);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/appointments/update-status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          appointmentId: appointmentId, 
          status: 'cancelled',
          notes: 'Cancelled by advisor'
        })
      });
      
      if (response.ok) {
        Notify.success('Appointment cancelled successfully');
        fetchAppointments();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to cancel appointment');
      }
    } catch (error) {
      Notify.failure('Failed to cancel appointment: ' + error.message);
    }
  };

  const handleStartAppointment = async (appointment) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/appointments/update-status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          appointmentId: appointment._id, 
          status: 'in-progress',
          notes: 'Appointment started'
        })
      });
      
      if (response.ok) {
        Notify.success('Appointment started');
        fetchAppointments();
        
        // Open meeting link if available
        if (appointment.meetingLink || appointment.location) {
          window.open(appointment.meetingLink || appointment.location, '_blank');
        }
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to start appointment');
      }
    } catch (error) {
      Notify.failure('Failed to start appointment: ' + error.message);
    }
  };

  // Calendar helper functions
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push({
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === new Date().toDateString()
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const getAppointmentsForDate = (date) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toDateString() === date.toDateString();
    });
  };

  const handleCalendarDayClick = (date) => {
    const dayAppointments = getAppointmentsForDate(date);
    if (dayAppointments.length > 0) {
      setFilteredAppointments(dayAppointments);
      setShowCalendarView(false);
    } else {
      setAppointmentForm(prev => ({
        ...prev,
        date: date.toISOString().split('T')[0]
      }));
      setShowCreateAppointmentModal(true);
    }
  };

  const isAppointmentTime = (appointment) => {
    const now = new Date();
    const appointmentDateTime = new Date(`${appointment.date} ${appointment.startTime}`);
    const timeDiff = appointmentDateTime.getTime() - now.getTime();
    
    return timeDiff <= 15 * 60 * 1000 && timeDiff >= -appointment.duration * 60 * 1000;
  };

  const handleConfirmAppointment = async (appointmentId) => {
  if (!window.confirm('Are you sure you want to confirm this appointment?')) {
    return;
  }
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/appointments/confirm`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ 
        appointmentId: appointmentId,
        confirmed: true
      })
    });
    
    if (response.ok) {
      Notify.success('Appointment confirmed successfully');
      fetchAppointments(); // Refresh the appointments list
    } else {
      const error = await response.json();
      throw new Error(error.message || 'Failed to confirm appointment');
    }
  } catch (error) {
    Notify.failure('Failed to confirm appointment: ' + error.message);
  }
};

  // Review handlers
  const handleReviewStudent = async (student) => {
    try {
      const token = localStorage.getItem('token');
      try {
        const response = await fetch(`http://localhost:5000/api/advisor/profiles/${student._id}/detailed`, {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (response.ok) {
          const data = await response.json();
          setSelectedStudent(data.data.profile);
        } else {
          setSelectedStudent(student);
        }
      } catch {
        setSelectedStudent(student);
      }
      setReviewForm({
        advisorNotes: student.advisorNotes || '',
        recommendedFaculty: student.recommendedFaculty || student.aiRecommendations?.recommendedFaculty || '',
        recommendedDepartment: student.recommendedDepartment || student.aiRecommendations?.recommendedDepartment || '',
        careerAdvice: student.careerAdvice || student.aiRecommendations?.careerAdvice || '',
        nextSteps: student.nextSteps || '',
        approved: student.isStudentApproved || false
      });
      setShowReviewModal(true);
    } catch (error) {
      setSelectedStudent(student);
      setShowReviewModal(true);
    }
  };

  // Document handlers
  const viewDocument = (profileId, documentType, fileName, originalName) => {
    const token = localStorage.getItem('token');
    const viewUrl = `http://localhost:5000/api/advisor/profiles/${profileId}/view/${documentType}/${fileName}?token=${token}`;
    setCurrentDocument({
      url: viewUrl,
      name: originalName || fileName,
      type: documentType
    });
    setShowDocumentModal(true);
  };

  const downloadDocument = async (profileId, documentType, fileName) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Notify.failure('Please log in to download documents');
        return;
      }
      Notify.info('Preparing download...');
      const response = await fetch(
        `http://localhost:5000/api/profiles/${profileId}/download/${documentType}/${fileName}`,
        { headers: { 'Authorization': `Bearer ${token}`, 'Accept': '*/*' } }
      );
      if (response.ok) {
        const blob = await response.blob();
        const cd = response.headers.get('Content-Disposition');
        let downloadFileName = fileName;
        if (cd) {
          const m = cd.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (m && m[1]) downloadFileName = m[1].replace(/['"]/g, '');
        }
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadFileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 100);
        Notify.success(`Document "${downloadFileName}" downloaded successfully`);
      } else {
        let msg = 'Failed to download document';
        try {
          const err = await response.json();
          msg = err.message || msg;
          if (response.status === 404) msg = 'Document not found on server';
          else if (response.status === 403) msg = 'Access denied. Please check your permissions.';
          else if (response.status === 500) msg = 'Server error. Please try again later.';
        } catch {}
        throw new Error(msg);
      }
    } catch (error) {
      Notify.failure(error.message || 'Failed to download document');
    }
  };

  // Helpers
  const filterStudents = () => {
    let filtered = students;
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nationality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.desiredFaculty?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(student => {
        switch (filterStatus) {
          case 'pending': return !student.isStudentApproved;
          case 'approved': return student.isStudentApproved;
          case 'transfer': return student.transferStudent;
          default: return true;
        }
      });
    }
    setFilteredStudents(filtered);
  };

  const handleSearch = () => {
    if (activeTab === 'transfer') {
      fetchTransferStudents();
    } else {
      fetchStudents();
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/approve-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          profileId: selectedStudent._id,
          approved: reviewForm.approved,
          advisorNotes: reviewForm.advisorNotes
        })
      });
      if (response.ok) {
        Notify.success('Review submitted successfully');
        setShowReviewModal(false);
        if (activeTab === 'transfer') fetchTransferStudents(); else fetchStudents();
        if (activeTab === 'overview') fetchDashboardData();
      } else {
        const err = await response.json();
        throw new Error(err.message || 'Failed to submit review');
      }
    } catch (error) {
      Notify.failure('Failed to submit review: ' + error.message);
    }
  };

  const handleBulkReview = () => {
    if (selectedStudents.length === 0) {
      Notify.warning('Please select students to review');
      return;
    }
    setShowBulkModal(true);
  };

  const handleSubmitBulkReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      for (const studentId of selectedStudents) {
        await fetch('http://localhost:5000/api/admin/approve-profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({
            profileId: studentId,
            approved: bulkReviewForm.approved,
            advisorNotes: bulkReviewForm.advisorNotes
          })
        });
      }
      Notify.success(`Bulk review completed for ${selectedStudents.length} students`);
      setShowBulkModal(false);
      setSelectedStudents([]);
      setBulkReviewForm({ approved: false, advisorNotes: '' });
      if (activeTab === 'transfer') fetchTransferStudents(); else fetchStudents();
      if (activeTab === 'overview') fetchDashboardData();
    } catch (error) {
      Notify.failure('Failed to submit bulk review');
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const handleSelectAllStudents = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student._id));
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Notify.success('Logged out successfully!');
      setTimeout(() => { window.location.href = '/'; }, 1000);
    }
  };
const handleLogoutBtn = () => {
    localStorage.removeItem('token');
    navigate('/');
    Notify.success("Logout successful, Thank you for using Our System");
  };
  const getStatusBadge = (student) => {
    if (student.isStudentApproved) {
      return <span className="status-badge approved">Approved</span>;
    }
    return <span className="status-badge pending">Pending Review</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const facultyOptions = [
    'Faculty of Business Administration',
    'Faculty of Information Technology',
    'Faculty of Health Sciences',
    'Faculty of Medicine',
    'Faculty in Education',
    'Bachelor Of Theology'
  ];

  const getDepartmentOptions = (faculty) => {
    const departments = {
      'Faculty of Business Administration': [
        'BBA In Accounting', 'BBA In Management', 'BBA in Finance', 'BBA in Marketing',
        'MBA in Accounting', 'MBA In Management', 'MBA In Finance', 'MBA in Human Resource Management', 'MBA in Project Management'
      ],
      'Faculty of Information Technology': [
        'BSc in Information Management', 'BSc in Networks and Communication Systems',
        'BSc in Software Engineering', 'Master Of Science In Data Analytics'
      ],
      'Faculty of Health Sciences': [
        'Bachelor of Science in Nursing', 'Bachelor of Science in Midwifery'
      ],
      'Faculty of Medicine': ['MD Of General Medicine'],
      'Faculty in Education': [
        'BA in Accounting and Information Technology', 'BA in English Language and Literature and French',
        'BA In Geography and History', 'Master of Art in Educational Administration', 'Master of Art In Curriculum, Instructions and Supervision'
      ],
      'Bachelor Of Theology': ['Bachelor of Theology']
    };
    return departments[faculty] || [];
    

  };

  // Loading screen for overview fetch
  if (loading && activeTab === 'overview') {
    return (
      <div className="advisor-dashboard">
        <div className="dashboard-layout">
          <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <div className="brand">   <img src={AUCALOGO} alt="AUCA" className="img-fluid" /></div>
            </div>
            <nav className="sidebar-nav">
              {SIDEBAR_ITEMS.map(tab => (
                <button
                  key={tab.id}
                  onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                  className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
                >
                  <span className="tab-icon">{tab.icon}</span>
                  <span className="tab-label">{tab.label}</span>
                </button>
              ))}
            </nav>
            <div className="sidebar-footer">
              {/* {userName}  */}
              <button className="logout-btn" onClick={handleLogout}>Logout</button>
            </div>
          </aside>

          <main className="main-content">
            <div className="topbar">
              <button
                className="sidebar-toggle"
                onClick={() => setSidebarOpen(prev => !prev)}
                aria-label="Toggle sidebar"
              >
                ☰
              </button>
              
              <h1 className="topbar-title">Admin Dashboard</h1>
            </div>

            <div className="loading-container">
              <div className="loading-spinner"></div>
              <h2>Loading Admin Dashboard...</h2>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="advisor-dashboard">
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="brand">
              <img src={AUCA} alt="AUCA" className="img-fluid" />
              </div>
          </div>
          <nav className="sidebar-nav">
            {SIDEBAR_ITEMS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </nav>
         
        </aside>

        {/* Main content */}
        <main className="main-content">
          {/* Topbar for small screens */}
          <div className="topbar">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(prev => !prev)}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <h1 className="topbar-title">Admin Dashboard</h1>
            <div className="ms-auto">
            <IoPersonCircle
              style={{ color: "#2c5a99", fontSize: "3rem"}}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="profile-dropdown position-absolute bg-white shadow p-2 rounded" style={{ right: "0px", top: "40px" }}>
                <p className=""></p>
                  <b>Username:</b>  {userName} <br/><br/>
                <button className="logout-button btn btn-danger btn-sm w-100" onClick={handleLogoutBtn}><IoIosLogOut /> Logout</button>
              </div>
            )}
          </div>
          </div>

{activeTab === 'overview' && (
  <div className="tab-content">
    {/* Existing Stats Grid */}
    <div className="stats-grid">
      {/* Your existing stat cards */}
      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-value">{statistics.timeTracking?.registrations?.thisWeek || 0}</div>
          <div className="stat-label">New Registrations (This Week)</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            This Month: {statistics.timeTracking?.registrations?.thisMonth || 0}
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-value">{statistics.timeTracking?.profiles?.thisWeek || 0}</div>
          <div className="stat-label">Profiles Created (This Week)</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            This Month: {statistics.timeTracking?.profiles?.thisMonth || 0}
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-value">{statistics.userManagement?.totalUsers || 0}</div>
          <div className="stat-label">Total Users</div>
          <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
            Active System Users
          </div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-value">{statistics.total || 0}</div>
          <div className="stat-label">Total Profiles</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-value">{statistics.pending || 0}</div>
          <div className="stat-label">Pending Review</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-value">{statistics.approved || 0}</div>
          <div className="stat-label">Approved</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-value">{statistics.recent || 0}</div>
          <div className="stat-label">Recent (7 days)</div>
        </div>
      </div>

      <div className="stat-card">
        <div className="stat-content">
          <div className="stat-value">{statistics.approvalRate || 0}%</div>
          <div className="stat-label">Approval Rate</div>
        </div>
      </div>
      
    </div>

{/* generate */}

    <div className="reports-section" style={{ 
      marginTop: '2rem', 
      padding: '1.5rem', 
      background: 'white', 
      borderRadius: '12px', 
      border: '1px solid #e2e8f0' 
    }}>
      <h3 style={{ marginBottom: '1rem', color: '#1e293b', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <FaChartBar /> Generate Reports
      </h3>
      
      <div className="report-buttons-grid" style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
        gap: '1rem' 
      }}>

        <div className="report-card" style={{ 
          padding: '1rem', 
          border: '1px solid #e2e8f0', 
          borderRadius: '8px', 
          background: '#f8fafc' 
        }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>📊 System Reports</h4>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
            Comprehensive system overview with statistics and analytics
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => handleGenerateSystemReport('excel')}
              disabled={reportLoading}
              style={{
                padding: '0.5rem 1rem',
                background: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: reportLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              <FaFileExcel /> Excel
            </button>
            <button
              onClick={() => handleGenerateSystemReport('pdf')}
              disabled={reportLoading}
              style={{
                padding: '0.5rem 1rem',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: reportLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              <FaFilePdf /> PDF
            </button>
          </div>
        </div>

        {/* Analytics Reports */}
        <div className="report-card" style={{ 
          padding: '1rem', 
          border: '1px solid #e2e8f0', 
          borderRadius: '8px', 
          background: '#f8fafc' 
        }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>📈 Analytics Reports</h4>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
            Detailed analytics with charts and trend analysis
          </p>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => handleGenerateAnalyticsReport('excel')}
              disabled={reportLoading}
              style={{
                padding: '0.5rem 1rem',
                background: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: reportLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              <FaFileExcel /> Excel
            </button>
            <button
              onClick={() => handleGenerateAnalyticsReport('pdf')}
              disabled={reportLoading}
              style={{
                padding: '0.5rem 1rem',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: reportLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              <FaFilePdf /> PDF
            </button>
          </div>
        </div>

        {/* Custom Reports */}
        <div className="report-card" style={{ 
          padding: '1rem', 
          border: '1px solid #e2e8f0', 
          borderRadius: '8px', 
          background: '#f8fafc' 
        }}>
          <h4 style={{ marginBottom: '0.5rem', color: '#374151' }}>⚙️ Custom Reports</h4>
          <p style={{ fontSize: '0.875rem', color: '#6b7280', marginBottom: '1rem' }}>
            Customizable reports with filters and date ranges
          </p>
          <button
            onClick={() => setShowReportModal(true)}
            disabled={reportLoading}
            style={{
              padding: '0.5rem 1rem',
              background: '#1d4ed8',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: reportLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              fontSize: '0.875rem'
            }}
          >
            <FaDownload /> Configure Report
          </button>
        </div>
      </div>

      {reportLoading && (
        <div style={{ 
          marginTop: '1rem', 
          padding: '1rem', 
          background: '#fef3c7', 
          border: '1px solid #f59e0b', 
          borderRadius: '6px',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <div style={{ 
            width: '20px', 
            height: '20px', 
            border: '2px solid #f59e0b', 
            borderTop: '2px solid transparent', 
            borderRadius: '50%', 
            animation: 'spin 1s linear infinite' 
          }}>

          </div>
          <span style={{ color: '#92400e' }}>Generating report... Please wait.</span>
        </div>
      )}
    </div>
  </div>
)}


          

{/* Users Management Tab */}
          {(activeTab === 'users' || activeTab === 'roles') && (
            <div className="tab-content">
              {/* Enhanced Filters Section */}
              <h2 style={{textAlign:'center'}}>All Users</h2>
               <p style={{ margin: 0, color: '#64748b' }}>
                {/* Manage users, permissions, and access controls */}
              </p>
              
              <div className="filters-section" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div className="search-box" style={{ minWidth: '300px' }}>
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>
              {selectedUsers.length > 0 && (
      <div className="selected-users-reports" style={{ 
        marginBottom: '1rem', 
        padding: '1rem', 
        background: '#eff6ff', 
        border: '1px solid #3b82f6', 
        borderRadius: '8px' 
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <span style={{ color: '#1e40af', fontWeight: '500' }}>
            {selectedUsers.length} users selected
          </span>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => handleGenerateUserReport('excel')}
              disabled={reportLoading}
              style={{
                padding: '0.5rem 1rem',
                background: '#059669',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: reportLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              <FaFileExcel /> Export Excel
            </button>
            <button
              onClick={() => handleGenerateUserReport('pdf')}
              disabled={reportLoading}
              style={{
                padding: '0.5rem 1rem',
                background: '#dc2626',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: reportLoading ? 'not-allowed' : 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '0.5rem',
                fontSize: '0.875rem'
              }}
            >
              <FaFilePdf /> Export PDF
            </button>
          </div>
        </div>
      </div>
    )}
                  <div className="filter-dropdown">
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">All users</option>
                      <option value="student">Students</option>
                      <option value="advisor">Advisors</option>
                      <option value="admin">Admins</option>
                    </select>
                  </div>

                  <div className="filter-dropdown">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">All Status</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>
                  

                 <button
  onClick={() => navigate('/Signup')} // Redirect to login page
  style={{
    padding: '0.75rem 1rem',
    background: 'linear-gradient(135deg, #1e293b, #1e293b)',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    cursor: 'pointer',
    fontWeight: '500'
  }}
>
  ➕ Create User
</button>

                </div>

                {/* Bulk Actions */}
                {getFilteredUsers().length > 0 && (
                  <div className="bulk-actions" style={{ marginTop: '1rem' }}>
                    <button 
                      onClick={handleSelectAllUsers} 
                      className="select-all-btn"
                    >
                      {selectedUsers.length === getFilteredUsers().length ? 'Deselect All' : 'Select All'}
                    </button>
                    {selectedUsers.length > 0 && (
                      <button 
                        onClick={() => setShowBulkModal(true)} 
                        className="bulk-review-btn"
                      >
                        Bulk Operations ({selectedUsers.length})
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Users Table */}
              <div className="users-table-container" style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0'
              }}>
                
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
  <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
    <tr>
      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>
        <input
          type="checkbox"
          checked={selectedUsers.length === getFilteredUsers().length && getFilteredUsers().length > 0}
          onChange={handleSelectAllUsers}
        />
      </th>
      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>User</th>
      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Role</th>
      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Created</th>
      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Actions</th>
    </tr>
  </thead>
  <tbody>
    {getFilteredUsers().map((user) => (
      <tr key={user._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
        <td style={{ padding: '1rem' }}>
          <input
            type="checkbox"
            checked={selectedUsers.includes(user._id)}
            onChange={() => handleSelectUser(user._id)}
          />
        </td>
        <td style={{ padding: '1rem' }}>
          <div>
            <div style={{ fontWeight: '500', color: '#1e293b' }}>{user.name}</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{user.email}</div>
            {user.department && (
              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.department}</div>
            )}
          </div>
        </td>
        <td style={{ padding: '1rem', color: 'black', fontWeight: '500', fontSize: '0.75rem' }}>
          {user.userRole ? user.userRole.charAt(0).toUpperCase() + user.userRole.slice(1) : 'Unknown'}
        </td>
        <td style={{ padding: '1rem', color: 'black', fontWeight: '500', fontSize: '0.75rem' }}>
          {user.isActive ? 'Active' : 'Inactive'}
        </td>
        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
          {formatDate(user.createdAt)}
        </td>
        <td style={{ padding: '1rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <button
              onClick={() => openEditUser(user)}
              style={{
                padding: '0.25rem 0.5rem',
                background: '#1B3058',
                color: 'white',
                border: 'none',
                borderRadius: '4px',
                cursor: 'pointer',
                fontSize: '0.75rem'
              }}
            >
              ✏️ Edit
            </button>        
          </div>
        </td>
      </tr>
    ))}
  </tbody>
</table>
{/* Edit User Modal - Add this before the closing </div> */}
{showEditUserModal && selectedUser && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h2>Edit User: {selectedUser.name}</h2>
        <button onClick={() => setShowEditUserModal(false)} className="modal-close">✕</button>
      </div>

      <form onSubmit={handleEditUser} className="user-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Name *</label>
            <input
              type="text"
              value={editUserForm.name}
              onChange={(e) => setEditUserForm({ ...editUserForm, name: e.target.value })}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">Email *</label>
            <input
              type="email"
              value={editUserForm.email}
              onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
              className="form-input"
              required
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Role *</label>
            <select
              value={editUserForm.userRole}
              onChange={(e) => setEditUserForm({ ...editUserForm, userRole: e.target.value })}
              className="form-select"
              required
            >
              <option value="">Select Role</option>
              <option value="user">Student</option>
              <option value="advisor">Advisor</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {/* <div className="form-group">
            <label className="form-label">Department</label>
            <input
              type="text"
              value={editUserForm.department}
              onChange={(e) => setEditUserForm({ ...editUserForm, department: e.target.value })}
              className="form-input"
              placeholder="Department (optional)"
            />
          </div> */}
          <div className="form-group">
            <label className="form-label">Status</label>
            <select
              value={editUserForm.isActive}
              onChange={(e) => setEditUserForm({ ...editUserForm, isActive: e.target.value === 'true' })}
              className="form-select"
            >
              <option value="true">Active</option>
              <option value="false">Inactive</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          {/* <div className="form-group">
            <label className="form-label">Phone</label>
            <input
              type="tel"
              value={editUserForm.phone}
              onChange={(e) => setEditUserForm({ ...editUserForm, phone: e.target.value })}
              className="form-input"
              placeholder="Phone number (optional)"
            />
          </div> */}
          
        </div>

        <div className="modal-actions">
          <button 
            type="button" 
            onClick={() => setShowEditUserModal(false)} 
            className="btn-cancel"
          >
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Update User
          </button>
        </div>
      </form>
    </div>
  </div>
)}
{/* ADD THIS IN YOUR USERS TAB AFTER FILTERS */}
{selectedUsers.length > 0 && (
  <div className="selected-users-reports" style={{ 
    marginBottom: '1rem', 
    padding: '1rem', 
    background: '#eff6ff', 
    border: '1px solid #3b82f6', 
    borderRadius: '8px' 
  }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <span style={{ color: '#1e40af', fontWeight: '500' }}>
        {selectedUsers.length} users selected for reports
      </span>
      <div style={{ display: 'flex', gap: '0.5rem' }}>
        <button
          onClick={() => handleGenerateUserReport('excel')}
          disabled={reportLoading}
          style={{
            padding: '0.5rem 1rem',
            background: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: reportLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}
        >
          <FaFileExcel /> Export Excel
        </button>
        <button
          onClick={() => handleGenerateUserReport('pdf')}
          disabled={reportLoading}
          style={{
            padding: '0.5rem 1rem',
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: reportLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontSize: '0.875rem'
          }}
        >
          <FaFilePdf /> Export PDF
        </button>
      </div>
    </div>
  </div>
)}
                {getFilteredUsers().length === 0 && (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                    <h3>No users found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => fetchUsers(pagination.currentPage - 1)}
                    disabled={pagination.currentPage <= 1}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => fetchUsers(pagination.currentPage + 1)}
                    disabled={pagination.currentPage >= pagination.totalPages}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}
              
            </div>
            
          )}

          
{/* Students Tab (All, Pending, Approved, Transfer) */}
{(activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved' || activeTab === 'transfer') && (
  <div className="tab-content">

    {/* Filters and Actions */}
    <div className="filters-section">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search students by name, email, nationality..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input"
        />
      </div> 
      
      {filteredStudents.length > 0 && (
        <div className="bulk-actions">
          <button onClick={handleSelectAllStudents} className="select-all-btn">
            {selectedStudents.length === filteredStudents.length ? 'Deselect All' : 'Select All'}
          </button>
          {selectedStudents.length > 0 && (
            <button onClick={handleBulkReview} className="bulk-review-btn">
              Bulk Review ({selectedStudents.length})
            </button>
          )}
        </div>
      )}
    </div>

    {/* Status Filter Buttons - NEW ADDITION */}
    {activeTab !== 'transfer' && (
      <div className="status-filters">
        <div className="filter-buttons">
          <button
            onClick={() => {
              setActiveTab('students');
              setFilterStatus('all');
              fetchStudents(1);
            }}
            className={`filter-btn ${activeTab === 'students' ? 'active' : ''}`}
          >
            <span className="filter-icon"></span>
            All Students
          </button>
          <button
            onClick={() => {
              setActiveTab('pending');
              setFilterStatus('pending');
              fetchStudents(1);
            }}
            className={`filter-btn ${activeTab === 'pending' ? 'active' : ''}`}
          >
            <span className="filter-icon"></span>
            Pending 
          </button>
          <button
            onClick={() => {
              setActiveTab('approved');
              setFilterStatus('approved');
              fetchStudents(1);
            }}
            className={`filter-btn ${activeTab === 'approved' ? 'active' : ''}`}
          >
            <span className="filter-icon"></span>
            Approved
          </button>
        </div>
      </div>
    )}

    <div className="table_header"><th style={{textAlign:'center'}}>STUDENTS WHO CREATED PROFILE</th> <br/></div> 

   
    {/* Students Table */}
    {!loading && (
      <div className="students-table-container">
        {filteredStudents.length > 0 ? (
          <div className="table-wrapper">
            <table className="students-table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAllStudents}
                      className="table-checkbox"
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="student-row">
                    <td className="checkbox-column">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student._id)}
                        onChange={() => handleSelectStudent(student._id)}
                        className="table-checkbox"
                      />
                    </td>
                    <td className="name-column">
                      <div className="name-cell">
                        <div className="student-avatar-small">
                          {student.images && student.images.length > 0 ? (
                            <img
                              src={`http://localhost:5000${student.images[0].url}`}
                              alt="Profile"
                              className="avatar-image-small"
                            />
                          ) : (
                            <div className="avatar-placeholder-small">
                              {student.userId?.name?.charAt(0) || student.name?.charAt(0) || 'S'}
                            </div>
                          )}
                        </div>
                        <span className="student-name-text">
                          {student.userId?.name || student.name || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="email-column">
                      <span className="student-email-text">{student.email || 'N/A'}</span>
                    </td>
                  
                    <td className="actions-column">
                      <div className="table-actions">
                        {/* <button
                          onClick={() => handleReviewStudent(student)}
                          className="table-btn view-btn"
                          title="View Full Details"
                        >
                          <span className="btn-icon">👁️</span>
                          View
                        </button> */}
                        <button
                          onClick={() => handleReviewStudent(student)}
                          className="table-btn review-btn"
                          title="Review Student"
                        >
                          <span className="btn-icon">📝</span>
                          Review
                        </button>
                        {student.documents && student.documents.length > 0 && (
                          <div className="document-dropdown">
                            <button className="table-btn doc-btn" title="Documents">
                              <span className="btn-icon">📄</span>
                              <span className="doc-count">({student.documents.length})</span>
                            </button>
                            <div className="document-dropdown-content">
                              {student.documents.map((doc, index) => (
                                <div key={index} className="document-item-small">
                                  <span className="doc-name">{doc.originalName}</span>
                                  <div className="doc-actions-small">
                                    <button
                                      onClick={() => viewDocument(student._id, 'document', doc.filename, doc.originalName)}
                                      className="doc-action-btn view-doc-btn"
                                      title="View Document"
                                    >
                                      👁️
                                    </button>
                                    <button
                                      onClick={() => downloadDocument(student._id, 'document', doc.filename)}
                                      className="doc-action-btn download-doc-btn"
                                      title="Download Document"
                                    >
                                      ⬇️
                                    </button>
                                  </div>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-students">
            <div className="no-students-icon">👥</div>
            <h3>No students found</h3>
            <p>
              {activeTab === 'transfer'
                ? 'No transfer students found in the system'
                : searchTerm 
                  ? 'No students match your search criteria'
                  : 'No students found in this category'
              }
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="clear-search-btn"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    )}

    {/* Pagination */}
    {pagination.totalPages > 1 && (
      <div className="pagination">
        <button
          onClick={() => {
            const prevPage = pagination.currentPage - 1;
            if (activeTab === 'transfer') {
              fetchTransferStudents(prevPage);
            } else {
              fetchStudents(prevPage);
            }
          }}
          disabled={pagination.currentPage <= 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {pagination.currentPage} of {pagination.totalPages}
          {pagination.totalItems && ` (${pagination.totalItems} total)`}
        </span>
        <button
          onClick={() => {
            const nextPage = pagination.currentPage + 1;
            if (activeTab === 'transfer') {
              fetchTransferStudents(nextPage);
            } else {
              fetchStudents(nextPage);
            }
          }}
          disabled={pagination.currentPage >= pagination.totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    )}
  </div>
    )}

    {/* Analytics Tab - Add this section */}
    {/* ADD THIS AT THE TOP OF YOUR ANALYTICS TAB */}
    <div style={{
      display: 'flex',
      gap: '1rem',
      marginBottom: '2rem',
      padding: '1.5rem',
      background: '#1B3058',
      borderRadius: '12px',
      alignItems: 'center',
      justifyContent: 'space-between',
      flexWrap: 'wrap'
    }}>
      <div>
        <h3 style={{ color: 'white', margin: 0, fontSize: '1.2rem' }}>
          📊 Analytics & Custom Reports
        </h3>
        <p style={{ color: '#cbd5e1', margin: '0.5rem 0 0 0', fontSize: '0.875rem' }}>
          Generate detailed reports with custom filters and date ranges
        </p>
      </div>
      <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
        <button
          onClick={() => handleGenerateAnalyticsReport('excel')}
          disabled={reportLoading}
          style={{
            padding: '0.75rem 1.25rem',
            background: '#059669',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: reportLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '500',
            fontSize: '0.875rem'
          }}
        >
          <FaFileExcel /> Quick Excel
        </button>
        <button
          onClick={() => handleGenerateAnalyticsReport('pdf')}
          disabled={reportLoading}
          style={{
            padding: '0.75rem 1.25rem',
            background: '#dc2626',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: reportLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '500',
            fontSize: '0.875rem'
          }}
        >
          <FaFilePdf /> Quick PDF
        </button>
        <button
          onClick={() => setShowReportModal(true)}
          disabled={reportLoading}
          style={{
            padding: '0.75rem 1.25rem',
            background: '#7c3aed',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            cursor: reportLoading ? 'not-allowed' : 'pointer',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            fontWeight: '500',
            fontSize: '0.875rem'
          }}
        >
          <FaChartBar /> Custom Report
        </button>
      </div>
    </div>

          {activeTab === 'analytics' && (
            
            <div className="tab-content">
              <div className="analytics-section">
                <h3>Grade Distribution</h3>
                <div className="chart-container">
                  {analytics.gradeDistribution && analytics.gradeDistribution.length > 0 ? (
                    <div className="pie-chart-container" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                      <div className="pie-chart-wrapper">
                        <PieChart width={400} height={400}>
                          <Pie
                            data={transformGradeDataForPieChart(analytics.gradeDistribution)}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {transformGradeDataForPieChart(analytics.gradeDistribution).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </div>
                      <div className="pie-chart-legend" style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: '1rem', color: '#333' }}>Grade Breakdown</h4>
                        {transformGradeDataForPieChart(analytics.gradeDistribution).map((entry, index) => (
                          <div key={index} className="legend-item" style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '0.8rem',
                            padding: '0.5rem',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '6px',
                            border: '1px solid #e9ecef'
                          }}>
                            <div 
                              className="legend-color" 
                              style={{ 
                                backgroundColor: COLORS[index % COLORS.length],
                                width: '16px',
                                height: '16px',
                                borderRadius: '4px',
                                marginRight: '12px',
                                flexShrink: 0
                              }}
                            ></div>
                            <span className="legend-text" style={{ 
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#495057'
                            }}>
                              {entry.name}: {entry.value} students
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="no-data">
                      <p>No grade distribution data available</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="analytics-section">
                <h3>Program Preferences</h3>
                <div className="program-stats">
                  {analytics.programPreferences && analytics.programPreferences.length > 0 ? (
                    <div className="triangle-bar-chart-container" style={{ width: '100%' }}>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                          data={transformProgramDataForBarChart(analytics.programPreferences)}
                          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="name" 
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            fontSize={12}
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value, name, props) => [
                              `${value} students`, 
                              props.payload.fullName
                            ]}
                          />
                          <Bar 
                            dataKey="uv" 
                            fill="#8884d8" 
                            shape={<TriangleBar />} 
                            label={{ position: 'top' }}
                          >
                            {transformProgramDataForBarChart(analytics.programPreferences).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PROGRAM_COLORS[index % PROGRAM_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="no-data">
                      <p>No program preferences data available</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="analytics-section">
                <h3>Student Faculty Preferences</h3>
                <div className="faculty-stats">
                  {analytics.facultyDistribution && analytics.facultyDistribution.length > 0 ? (
                    <div className="bar-chart-container" style={{ width: '100%' }}>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart 
                          data={transformFacultyDataForBarChart(analytics.facultyDistribution)}
                          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="name" 
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            fontSize={12}
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value, name, props) => [
                              `${value} students`, 
                              props.payload.fullName
                            ]}
                          />
                          <Bar dataKey="students">
                            {transformFacultyDataForBarChart(analytics.facultyDistribution).map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={BAR_COLORS[index % BAR_COLORS.length]} 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="no-data">
                      <p>No faculty distribution data available</p>
                    </div>
                  )}
                </div>
              </div>
               <div className="analytics-section">
      <h3>Top Recommended Faculties (AI Recommendations)</h3>
      <div className="faculty-stats">
        {analytics.recommendationStats?.topFaculties && analytics.recommendationStats.topFaculties.length > 0 ? (
          <div className="bar-chart-container" style={{ width: '100%' }}>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart 
                data={transformRecommendedFacultiesForBarChart(analytics.recommendationStats.topFaculties)}
                margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="name" 
                  angle={-45}
                  textAnchor="end"
                  height={100}
                  fontSize={12}
                />
                <YAxis />
                <Tooltip 
                  formatter={(value, name, props) => [
                    `${value} students recommended (${props.payload.avgMatch.toFixed(1)}% avg match)`, 
                    props.payload.fullName
                  ]}
                />
                <Bar dataKey="students">
                  {transformRecommendedFacultiesForBarChart(analytics.recommendationStats.topFaculties).map((entry, index) => (
                    <Cell 
                      key={`cell-${index}`} 
                      fill={PROGRAM_COLORS[index % PROGRAM_COLORS.length]} // Use different colors than faculty distribution
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        ) : (
          <div className="no-data">
            <p>No AI recommendation data available</p>
          </div>
        )}
      </div>
    </div>
            </div>
          )}

          {/* Activity Log Tab */}
         {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div className="tab-content">
              <div className="activity-log">
                <h3>Recent Advisor Activity</h3>
                {activityLog.length > 0 ? (
                  <table className="activity-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Action</th>
                        <th>Date</th>
                        <th>Nationality / Faculty</th>
                        <th>Advisor Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLog.map((activity, index) => (
                        <tr key={index}>
                          <td>{activity.student?.name || 'Unknown'}</td>
                          <td>{activity.action} by {activity.reviewedBy}</td>
                          <td>{formatDate(activity.reviewDate)}</td>
                          <td>{activity.nationality} • {activity.desiredFaculty}</td>
                          <td>{activity.advisorNotes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-activity">
                    <div className="no-activity-icon">📋</div>
                    <h3>No recent activity found</h3>
                    <p>Activity will appear here when advisors review student profiles</p>
                  </div>
                )}
              </div>
            </div>
          )}


          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="tab-content">
              <div className="appointments-header">
                <h3>Appointment Management</h3>
                <div className="appointment-actions">
                  <button 
                    onClick={() => setShowCreateAppointmentModal(true)} 
                    className="create-appointment-btn"
                  >
                    <span className="btn-icon">📅</span>
                    Create Slot
                  </button>
                  <button 
                    onClick={() => setShowCalendarView(prev => !prev)} 
                    className={`calendar-toggle-btn ${showCalendarView ? 'active' : ''}`}
                  >
                    <span className="btn-icon">{showCalendarView ? '📋' : '📅'}</span>
                    {showCalendarView ? 'List View' : 'Calendar View'}
                  </button>
                </div>
              </div>

              {/* Appointment Filters */}
              <div className="appointment-filters">
                <div className="filter-group">
                  <label>Status:</label>
                  <select 
                    value={appointmentFilter} 
                    onChange={(e) => setAppointmentFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Appointments</option>
                    <option value="available">Available Slots</option>
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Date Range:</label>
                  <input 
                    type="date" 
                    value={dateFilter.start}
                    onChange={(e) => setDateFilter(prev => ({...prev, start: e.target.value}))}
                    className="date-input"
                  />
                  <span>to</span>
                  <input 
                    type="date" 
                    value={dateFilter.end}
                    onChange={(e) => setDateFilter(prev => ({...prev, end: e.target.value}))}
                    className="date-input"
                  />
                </div>
                <button onClick={fetchAppointments} className="filter-apply-btn">
                  Apply Filter
                </button>
              </div>

              {showCalendarView ? (
                /* Calendar View */
                <div className="calendar-view">
                  <div className="calendar-header">
                    <button 
                      onClick={() => setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                      className="calendar-nav-btn"
                    >
                      ‹
                    </button>
                    <h3 className="calendar-title">
                      {currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button 
                      onClick={() => setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                      className="calendar-nav-btn"
                    >
                      ›
                    </button>
                  </div>
                  <div className="calendar-grid">
                    <div className="calendar-days-header">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="calendar-day-header">{day}</div>
                      ))}
                    </div>
                    <div className="calendar-days">
                      {generateCalendarDays(currentCalendarDate).map((day, index) => (
                        <div 
                          key={index} 
                          className={`calendar-day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${day.isToday ? 'today' : ''}`}
                          onClick={() => handleCalendarDayClick(day.date)}
                        >
                          <span className="day-number">{day.date.getDate()}</span>
                        
                          <div className="day-appointments">
  {getAppointmentsForDate(day.date).slice(0, 3).map((apt, i) => (
    <div key={i} className={`mini-appointment ${apt.status}`}>
      {apt.status === 'booked' ? (
        <span className="booked-title">Booked</span>
      ) : apt.status === 'available' ? (
        <span className="available-title">Available</span>
      ) : (
        <span className="other-status">{apt.status}</span>
      )}
    </div>
  ))}
  {getAppointmentsForDate(day.date).length > 3 && (
    <div className="more-appointments">+{getAppointmentsForDate(day.date).length - 3} more</div>
  )}
</div>
                          {/* end */}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* List View */
                <div className="appointments-list">
                  {loading ? (
                    <div className="loading-appointments">
                      <div className="loading-spinner"></div>
                      <p>Loading appointments...</p>
                    </div>
                  ) : filteredAppointments.length > 0 ? (
                    <div className="appointments-grid">
                      {filteredAppointments.map((appointment) => (
                        <div key={appointment._id} className={`appointment-card ${appointment.status}`}>
                          <div className="appointment-header">
                            <div className="appointment-time">
                              <span className="appointment-date">
                                {new Date(appointment.date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="appointment-time-slot">
                                {appointment.startTime || appointment.time} - {appointment.endTime || appointment.time}
                              </span>
                            </div>
                            <div className={`appointment-status-badge ${appointment.status}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </div>
                          </div>

                          <div className="appointment-content">
                            {appointment.status === 'booked' && appointment.student ? (
                              <div className="appointment-student-info">
                                <div className="student-avatar-small">
                                  {appointment.student.name?.charAt(0) || appointment.studentName?.charAt(0) || 'S'}
                                </div>
                                <div className="student-details">
                                  <h4 className="student-name">{appointment.student.name || appointment.studentName}</h4>
                                  <p className="student-email">{appointment.student.email || appointment.studentEmail}</p>
                                  <p className="appointment-purpose">{appointment.reason || 'General consultation'}</p>
                                </div>
                              </div>
                            ) : appointment.status === 'available' ? (
                              <div className="appointment-available">
                                <div className="available-icon">📅</div>
                                <p className="available-text">Available slot</p>
                                <p className="slot-duration">{appointment.duration || 30} minutes</p>
                              </div>
                            ) : (
                              <div className="appointment-student-info">
                                <div className="student-avatar-small">
                                  {appointment.studentName?.charAt(0) || 'S'}
                                </div>
                                <div className="student-details">
                                  <h4 className="student-name">{appointment.studentName}</h4>
                                  <p className="student-email">{appointment.studentEmail}</p>
                                  <p className="appointment-purpose">{appointment.reason || 'General consultation'}</p>
                                </div>
                              </div>
                            )}

                            {appointment.notes && (
                              <div className="appointment-notes">
                                <strong>Notes:</strong> {appointment.notes}
                              </div>
                            )}

                            {appointment.meetingLink || appointment.location?.includes('http') ? (
                              <div className="meeting-link">
                                <a href={appointment.meetingLink || appointment.location} target="_blank" rel="noopener noreferrer" className="meeting-link-btn">
                                  🎥 Join Meeting
                                </a>
                              </div>
                            ) : null}
                          </div>
                             {/* start */}
                          {/* <div className="appointment-actions">
                            {appointment.status === 'available' && (
                              <>
                                <button 
                                  onClick={() => handleEditAppointment(appointment)}
                                  className="action-btn edit-btn"
                                >
                                  ✏️ Edit
                                </button>
                                <button 
                                  onClick={() => handleDeleteAppointment(appointment._id)}
                                  className="action-btn delete-btn"
                                >
                                  🗑️ Delete
                                </button>
                              </>
                            )}
                            
                            {appointment.status === 'booked' && (
                              <>
                                <button 
                                  onClick={() => handleStartAppointment(appointment)}
                                  className="action-btn start-btn"
                                  disabled={!isAppointmentTime(appointment)}
                                >
                                  🎯 Start
                                </button>
                                <button 
                                  onClick={() => handleCancelAppointment(appointment._id)}
                                  className="action-btn cancel-btn"
                                >
                                  ❌ Cancel
                                </button>
                              </>
                            )} */}

                            <div className="appointment-actions">
  {appointment.status === 'available' && (
    <>
      <button 
        onClick={() => handleEditAppointment(appointment)}
        className="action-btn edit-btn"
      >
        ✏️ Edit
      </button>
      <button 
        onClick={() => handleDeleteAppointment(appointment._id)}
        className="action-btn delete-btn"
      >
        🗑️ Delete
      </button>
    </>
  )}
  
  {appointment.status === 'booked' && (
    <>
      {/* NEW: Add confirm button for pending appointments */}
      {!appointment.confirmed && (
        <button 
          onClick={() => handleConfirmAppointment(appointment._id)}
          className="action-btn confirm-btn"
        >
          ✅ Confirm
        </button>
      )}
      
      <button 
        onClick={() => handleStartAppointment(appointment)}
        className="action-btn start-btn"
        disabled={!isAppointmentTime(appointment)}
      >
        🎯 Start
      </button>
      <button 
        onClick={() => handleCancelAppointment(appointment._id)}
        className="action-btn cancel-btn"
      >
        ❌ Cancel
      </button>
    </>
  )}
{/* end */}
                            {appointment.status === 'completed' && (
                              <button 
                                onClick={() => console.log('View details for:', appointment)}
                                className="action-btn view-btn"
                              >
                                👁️ View Details
                              </button>
                            )}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-appointments">
                      <div className="no-appointments-icon">📅</div>
                      <h3>No appointments found</h3>
                      <p>Create your first appointment slot to get started</p>
                      <button 
                        onClick={() => setShowCreateAppointmentModal(true)} 
                        className="create-first-appointment-btn"
                      >
                        Create Appointment Slot
                      </button>
                    </div>
                  )}
                </div>
              )}

              {/* Pagination for appointments */}
              {appointmentPagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => fetchAppointments(appointmentPagination.currentPage - 1)}
                    disabled={appointmentPagination.currentPage <= 1}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {appointmentPagination.currentPage} of {appointmentPagination.totalPages}
                  </span>
                  <button
                    onClick={() => fetchAppointments(appointmentPagination.currentPage + 1)}
                    disabled={appointmentPagination.currentPage >= appointmentPagination.totalPages}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Review Modal */}
          {showReviewModal && selectedStudent && (
            <div className="modal-overlay">
              <div className="modal-content large-modal">
                <div className="modal-header">
                  <h2 className="reviewstudenttitle">Review Student: {selectedStudent.userId?.name || selectedStudent.name}</h2>
                  <button onClick={() => setShowReviewModal(false)} className="modal-close">✕</button>
                </div>

                <form onSubmit={handleSubmitReview} className="review-form">
                  <div className="student-info-section">
                    <h3>Student Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Name:</span>
                        <span className="info-value">{selectedStudent.userId?.name || selectedStudent.name}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{selectedStudent.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Nationality:</span>
                        <span className="info-value">{selectedStudent.nationality}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Academic Level:</span>
                        <span className="info-value">{selectedStudent.currentAcademicLevel}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Program Type:</span>
                        <span className="info-value program-badge">{selectedStudent.studentProgram || 'Not specified'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">High School Grades:</span>
                        <span className="info-value">{selectedStudent.highSchoolGrades}%</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Desired Faculty:</span>
                        <span className="info-value">{selectedStudent.desiredFaculty || 'Not specified'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Career Goals:</span>
                        <span className="info-value">{selectedStudent.careerGoals || 'Not specified'}</span>
                      </div>

                      {selectedStudent.transferStudent && (
                        <>
                          <div className="info-item">
                            <span className="info-label">Transfer Student:</span>
                            <span className="info-value transfer-badge">Yes</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Previous Institution:</span>
                            <span className="info-value">{selectedStudent.previousInstitution}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Previous Grade:</span>
                            <span className="info-value">{selectedStudent.overallGradePreviousUniversity}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {selectedStudent.coursesStudiedInSecondary?.length > 0 && (
                      <div className="courses-section">
                        <h4>High School Courses</h4>
                        <div className="courses-list">
                          {selectedStudent.coursesStudiedInSecondary.map((course, index) => (
                            <span key={index} className="course-tag">{course}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedStudent.transferStudent && selectedStudent.coursesStudiedPreviousUniversity && (
                      <div className="courses-section">
                        <h4>Previous University Courses</h4>
                        <div className="transfer-courses">
                          {selectedStudent.coursesStudiedPreviousUniversity.map((course, index) => (
                            <div key={index} className="transfer-course">
                              <span className="course-name">{course.courseName}</span>
                              <span className="course-code">{course.courseCode}</span>
                              <span className="course-grade">Grade: {course.grade}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {(selectedStudent.aiRecommendations || selectedStudent.recommendedFaculty) && (
                      <div className="ai-recommendations-section">
                        <h4>AI Recommendations</h4>
                        <div className="recommendations-grid">
                          {(selectedStudent.recommendedFaculty || selectedStudent.aiRecommendations?.recommendedFaculty) && (
                            <div className="recommendation-item">
                              <span className="rec-label">Recommended Faculty:</span>
                              <span className="rec-value ai-recommendation">
                                {selectedStudent.recommendedFaculty || selectedStudent.aiRecommendations?.recommendedFaculty}
                              </span>
                            </div>
                          )}
                          {(selectedStudent.recommendedDepartment || selectedStudent.aiRecommendations?.recommendedDepartment) && (
                            <div className="recommendation-item">
                              <span className="rec-label">Recommended Department:</span>
                              <span className="rec-value ai-recommendation">
                                {selectedStudent.recommendedDepartment || selectedStudent.aiRecommendations?.recommendedDepartment}
                              </span>
                            </div>
                          )}
                          {(selectedStudent.careerAdvice || selectedStudent.aiRecommendations?.careerAdvice) && (
                            <div className="recommendation-item full-width">
                              <span className="rec-label">AI Career Advice:</span>
                              <span className="rec-value ai-recommendation">
                                {selectedStudent.careerAdvice || selectedStudent.aiRecommendations?.careerAdvice}
                              </span>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="review-section">
                    <h3>Advisor Review</h3>

                    <div className="form-group">
                      <label className="form-label">Advisor Notes</label>
                      <textarea
                        value={reviewForm.advisorNotes}
                        onChange={(e) => setReviewForm({ ...reviewForm, advisorNotes: e.target.value })}
                        className="form-textarea"
                        rows="4"
                        placeholder="Add your notes about this student..."
                        maxLength="1000"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Recommended Faculty</label>
                        <select
                          value={reviewForm.recommendedFaculty}
                          onChange={(e) => setReviewForm({ ...reviewForm, recommendedFaculty: e.target.value, recommendedDepartment: '' })}
                          className="form-select"
                        >
                          <option value="">Select Faculty</option>
                          {facultyOptions.map(faculty => (
                            <option key={faculty} value={faculty}>{faculty}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Recommended Department</label>
                        <select
                          value={reviewForm.recommendedDepartment}
                          onChange={(e) => setReviewForm({ ...reviewForm, recommendedDepartment: e.target.value })}
                          className="form-select"
                          disabled={!reviewForm.recommendedFaculty}
                        >
                          <option value="">Select Department</option>
                          {getDepartmentOptions(reviewForm.recommendedFaculty).map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Career Advice</label>
                      <textarea
                        value={reviewForm.careerAdvice}
                        onChange={(e) => setReviewForm({ ...reviewForm, careerAdvice: e.target.value })}
                        className="form-textarea"
                        rows="3"
                        placeholder="Provide career guidance and advice..."
                        maxLength="500"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Next Steps</label>
                      <textarea
                        value={reviewForm.nextSteps}
                        onChange={(e) => setReviewForm({ ...reviewForm, nextSteps: e.target.value })}
                        className="form-textarea"
                        rows="3"
                        placeholder="Outline the next steps for this student..."
                        maxLength="500"
                      />
                    </div>

                    <div className="approval-section">
                      <label className="approval-checkbox">
                        <input
                          type="checkbox"
                          checked={reviewForm.approved}
                          onChange={(e) => setReviewForm({ ...reviewForm, approved: e.target.checked })}
                        />
                        <span className="checkbox-mark"></span>
                        <span className="checkbox-label">Approve this student</span>
                      </label>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowReviewModal(false)} className="btn-cancel">
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Document Viewing Modal */}
          {showDocumentModal && currentDocument && (
            <div className="modal-overlay">
              <div className="modal-content document-modal">
                <div className="modal-header">
                  <h2>Document Viewer: {currentDocument.name}</h2>
                  <button onClick={() => setShowDocumentModal(false)} className="modal-close">✕</button>
                </div>

                <div className="document-viewer">
                  {currentDocument.type === 'image' ? (
                    <img src={currentDocument.url} alt={currentDocument.name} className="document-image" />
                  ) : (
                    <iframe src={currentDocument.url} title={currentDocument.name} className="document-iframe" width="100%" height="600px" />
                  )}
                </div>

                <div className="document-actions">
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = currentDocument.url;
                      link.download = currentDocument.name;
                      link.click();
                    }}
                    className="btn-download"
                  >
                    Download Document
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bulk Review Modal */}
          {showBulkModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Bulk Review ({selectedStudents.length} students)</h2>
                  <button onClick={() => setShowBulkModal(false)} className="modal-close">✕</button>
                </div>

                <form onSubmit={handleSubmitBulkReview} className="bulk-review-form">
                  <div className="form-group">
                    <label className="form-label">Action</label>
                    <div className="radio-group">
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="bulkAction"
                          checked={bulkReviewForm.approved === true}
                          onChange={() => setBulkReviewForm({ ...bulkReviewForm, approved: true })}
                        />
                        <span className="radio-mark"></span>
                        <span className="radio-label">Approve Selected Students</span>
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="bulkAction"
                          checked={bulkReviewForm.approved === false}
                          onChange={() => setBulkReviewForm({ ...bulkReviewForm, approved: false })}
                        />
                        <span className="radio-mark"></span>
                        <span className="radio-label">Mark as Reviewed (No Approval)</span>
                      </label>
                    </div>
                  </div>

                  <div className="selected-students-preview">
                    <h4>Selected Students:</h4>
                    <div className="students-preview-list">
                      {selectedStudents.map(studentId => {
                        const student = filteredStudents.find(s => s._id === studentId);
                        return (
                          <div key={studentId} className="preview-student">
                            <span>{student?.userId?.name || student?.name || 'Unknown'}</span>
                            <span>{student?.email}</span>
                            {student?.transferStudent && <span className="transfer-indicator">Transfer</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowBulkModal(false)} className="btn-cancel">
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      {bulkReviewForm.approved ? 'Approve All' : 'Review All'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Create Appointment Modal */}
          {showCreateAppointmentModal && (
            <div className="modal-overlay">
              <div className="modal-content large-modal">
                <div className="modal-header">
                  <h2>Create Appointment Slot</h2>
                  <button onClick={() => setShowCreateAppointmentModal(false)} className="modal-close">✕</button>
                </div>

                <form onSubmit={handleCreateAppointment} className="appointment-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Date *</label>
                      <input
                        type="date"
                        value={appointmentForm.date}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                        className="form-input"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Duration (minutes) *</label>
                      <select
                        value={appointmentForm.duration}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, duration: parseInt(e.target.value) })}
                        className="form-select"
                        required
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={45}>45 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>1.5 hours</option>
                        <option value={120}>2 hours</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Start Time *</label>
                      <input
                        type="time"
                        value={appointmentForm.startTime}
                        onChange={(e) => {
                          const startTime = e.target.value;
                          const [hours, minutes] = startTime.split(':');
                          const startDate = new Date();
                          startDate.setHours(parseInt(hours), parseInt(minutes));
                          const endDate = new Date(startDate.getTime() + appointmentForm.duration * 60000);
                          const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
                          
                          setAppointmentForm({ 
                            ...appointmentForm, 
                            startTime: startTime,
                            endTime: endTime
                          });
                        }}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Time</label>
                      <input
                        type="time"
                        value={appointmentForm.endTime}
                        readOnly
                        className="form-input readonly"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Meeting Type *</label>
                      <select
                        value={appointmentForm.meetingType}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, meetingType: e.target.value })}
                        className="form-select"
                        required
                      >
                        <option value="physical">In-Person</option>
                        <option value="online">Online Meeting</option>
                        <option value="both">Both (Student Choice)</option>
                      </select>
                    </div>
                    {appointmentForm.meetingType === 'online' && (
                      <div className="form-group">
                        <label className="form-label">Meeting Link</label>
                        <input
                          type="url"
                          value={appointmentForm.meetingLink}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, meetingLink: e.target.value })}
                          className="form-input"
                          placeholder="https://zoom.us/j/123456789 or Google Meet link"
                        />
                        <small className="form-help">Leave empty to auto-generate meeting link</small>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Notes</label>
                    <textarea
                      value={appointmentForm.notes}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                      className="form-textarea"
                      rows="3"
                      placeholder="Any additional notes for this appointment slot..."
                      maxLength="500"
                    />
                  </div>
<div className="recurring-section">
  <div className="recurring-checkbox">
    <input
      type="checkbox"
      id="isRecurring"
      checked={appointmentForm.isRecurring}
      onChange={(e) => setAppointmentForm({ ...appointmentForm, isRecurring: e.target.checked })}
    />
    <label htmlFor="isRecurring">Make this a recurring appointment</label>
  </div>
  
  {appointmentForm.isRecurring && (
    <div className="recurring-options">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Repeat Pattern</label>
          <select
            value={appointmentForm.recurringPattern}
            onChange={(e) => setAppointmentForm({ ...appointmentForm, recurringPattern: e.target.value })}
            className="form-select"
          >
            <option value="weekly">Weekly (same day and time)</option>
            <option value="biweekly">Bi-weekly (every 2 weeks)</option>
            <option value="monthly">Monthly (same date)</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">End Date</label>
          <input
            type="date"
            value={appointmentForm.recurringEndDate}
            onChange={(e) => setAppointmentForm({ ...appointmentForm, recurringEndDate: e.target.value })}
            className="form-input"
            min={appointmentForm.date}
            required={appointmentForm.isRecurring}
          />
        </div>
      </div>
      <div className="recurring-info">
        <p>This will create multiple appointment slots based on your pattern until the end date.</p>
        {appointmentForm.date && appointmentForm.recurringEndDate && (
          <p><strong>Preview:</strong> Slots will be created every {appointmentForm.recurringPattern === 'weekly' ? 'week' : appointmentForm.recurringPattern === 'biweekly' ? '2 weeks' : 'month'} from {new Date(appointmentForm.date).toLocaleDateString()} to {new Date(appointmentForm.recurringEndDate).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  )}
</div>
                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowCreateAppointmentModal(false)} className="btn-cancel">
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      Create Appointment Slot
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
          {/* Custom Reports Modal */}
{showReportModal && (
  <div className="modal-overlay">
    <div className="modal-content large-modal">
      <div className="modal-header">
        <h2>Generate Custom Report</h2>
        <button onClick={() => setShowReportModal(false)} className="modal-close">✕</button>
      </div>

      <form onSubmit={handleGenerateCustomReport} className="custom-report-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Report Type *</label>
            <select
              value={reportForm.reportType}
              onChange={(e) => setReportForm({ ...reportForm, reportType: e.target.value })}
              className="form-select"
              required
            >
              <option value="users">Users Report</option>
              <option value="profiles">Student Profiles Report</option>
              <option value="assessments">Assessments Report</option>
              <option value="activity">Activity Report</option>
            </select>
          </div>
          <div className="form-group">
            <label className="form-label">Format *</label>
            <select
              value={reportForm.format}
              onChange={(e) => setReportForm({ ...reportForm, format: e.target.value })}
              className="form-select"
              required
            >
              <option value="excel">Excel (.xlsx)</option>
              <option value="pdf">PDF</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date Range *</label>
            <select
              value={reportForm.dateRange}
              onChange={(e) => setReportForm({ 
                ...reportForm, 
                dateRange: e.target.value,
                startDate: e.target.value === 'custom' ? reportForm.startDate : '',
                endDate: e.target.value === 'custom' ? reportForm.endDate : ''
              })}
              className="form-select"
              required
            >
              <option value="week"> Week</option>
              <option value="month"> Month</option>
              {/* <option value="quarter">Last Quarter (3 months)</option> */}
              <option value="custom">Custom Date Range</option>
            </select>
          </div>
        </div>

        {reportForm.dateRange === 'custom' && (
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">Start Date *</label>
              <input
                type="date"
                value={reportForm.startDate}
                onChange={(e) => setReportForm({ ...reportForm, startDate: e.target.value })}
                className="form-input"
                required
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="form-group">
              <label className="form-label">End Date *</label>
              <input
                type="date"
                value={reportForm.endDate}
                onChange={(e) => setReportForm({ ...reportForm, endDate: e.target.value })}
                className="form-input"
                required
                min={reportForm.startDate}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
          </div>
        )}

        {/* Advanced Filters Section */}
        <div className="advanced-filters" style={{ 
          marginTop: '1.5rem', 
          padding: '1rem', 
          background: '#f8fafc', 
          borderRadius: '8px',
          border: '1px solid #e2e8f0'
        }}>
          <h4 style={{ marginBottom: '1rem', color: '#374151' }}>Advanced Filters (Optional)</h4>
          
          {reportForm.reportType === 'users' && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">User Role</label>
                <select
                  value={reportForm.filters.userRole || ''}
                  onChange={(e) => setReportForm({ 
                    ...reportForm, 
                    filters: { ...reportForm.filters, userRole: e.target.value }
                  })}
                  className="form-select"
                >
                  <option value="">All Roles</option>
                  <option value="student">Students</option>
                  <option value="advisor">Advisors</option>
                  <option value="admin">Admins</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Account Status</label>
                <select
                  value={reportForm.filters.isActive || ''}
                  onChange={(e) => setReportForm({ 
                    ...reportForm, 
                    filters: { ...reportForm.filters, isActive: e.target.value }
                  })}
                  className="form-select"
                >
                  <option value="">All Status</option>
                  <option value="true">Active Only</option>
                  <option value="false">Inactive Only</option>
                </select>
              </div>
            </div>
          )}

          {reportForm.reportType === 'profiles' && (
            <div className="form-row">
              <div className="form-group">
                <label className="form-label">Approval Status</label>
                <select
                  value={reportForm.filters.isStudentApproved || ''}
                  onChange={(e) => setReportForm({ 
                    ...reportForm, 
                    filters: { ...reportForm.filters, isStudentApproved: e.target.value }
                  })}
                  className="form-select"
                >
                  <option value="">All Profiles</option>
                  <option value="true">Approved Only</option>
                  <option value="false">Pending Only</option>
                </select>
              </div>
              <div className="form-group">
                <label className="form-label">Faculty</label>
                <select
                  value={reportForm.filters.desiredFaculty || ''}
                  onChange={(e) => setReportForm({ 
                    ...reportForm, 
                    filters: { ...reportForm.filters, desiredFaculty: e.target.value }
                  })}
                  className="form-select"
                >
                  <option value="">All Faculties</option>
                  <option value="Faculty of Business Administration">Business Administration</option>
                  <option value="Faculty of Information Technology">Information Technology</option>
                  <option value="Faculty of Health Sciences">Health Sciences</option>
                  <option value="Faculty of Medicine">Medicine</option>
                  <option value="Faculty in Education">Education</option>
                  <option value="Bachelor Of Theology">Theology</option>
                </select>
              </div>
            </div>
          )}

          {reportForm.reportType === 'activity' && (
            <div className="form-group">
              <label className="form-label">Activity Type</label>
              <select
                value={reportForm.filters.activityType || ''}
                onChange={(e) => setReportForm({ 
                  ...reportForm, 
                  filters: { ...reportForm.filters, activityType: e.target.value }
                })}
                className="form-select"
              >
                <option value="">All Activities</option>
                <option value="registration">New Registrations</option>
                <option value="profile">Profile Creations</option>
                <option value="assessment">Assessment Completions</option>
              </select>
            </div>
          )}
        </div>

        <div className="form-group" style={{ marginTop: '1rem' }}>
          <label className="form-label">
            <input
              type="checkbox"
              checked={reportForm.includeCharts}
              onChange={(e) => setReportForm({ ...reportForm, includeCharts: e.target.checked })}
              style={{ marginRight: '0.5rem' }}
            />
            Include charts and visualizations (PDF only)
          </label>
        </div>

        <div className="modal-actions" style={{ marginTop: '2rem' }}>
          <button 
            type="button" 
            onClick={() => setShowReportModal(false)} 
            className="btn-cancel"
            disabled={reportLoading}
          >
            Cancel
          </button>
          <button 
            type="submit" 
            className="btn-submit"
            disabled={reportLoading}
          >
            {reportLoading ? 'Generating...' : `Generate ${reportForm.format.toUpperCase()} Report`}
          </button>
        </div>
      </form>
    </div>
  </div>
)}
        </main>
      </div>
    </div>
  );
};

export default AdvisorDashboard;