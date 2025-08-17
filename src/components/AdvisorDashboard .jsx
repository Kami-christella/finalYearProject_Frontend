// // //advisorDahboard.jsx

// // import React, { useState, useEffect } from 'react';
// // import { Notify } from 'notiflix';
// // import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// // import './styles/AdvisorDashboard.css';
// // import './Dashboard_Styles/PieChart.css';

// // const SIDEBAR_ITEMS = [
// //   { id: 'overview', label: 'Overview', icon: '📊' },
// //   { id: 'students', label: 'All Students', icon: '👥' },
// //   { id: 'pending', label: 'Pending Reviews', icon: '⏳' },
// //   { id: 'approved', label: 'Approved', icon: '✅' },
// //   { id: 'transfer', label: 'Transfer Students', icon: '🔄' },
// //   { id: 'analytics', label: 'Analytics', icon: '📈' },
// //   { id: 'appointments', label: 'Appointments', icon: '📅' },
// //   { id: 'activity', label: 'Activity Log', icon: '📋' }
// // ];

// // const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", "#FF9FF3", "#54A0FF", "#5F27CD"];
// // const BAR_COLORS = ["#8884D8", "#82CA9D", "#FFC658", "#FF7C7C", "#8DD1E1", "#D084D0", "#FFB347", "#87D68D", "#FFB6C1", "#20B2AA", "#F0E68C", "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE"];
// // const PROGRAM_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD', '#20B2AA', '#F0E68C', '#DDA0DD'];

// // const AdvisorDashboard = () => {
// //   const [activeTab, setActiveTab] = useState('overview');
// //   const [sidebarOpen, setSidebarOpen] = useState(false);
// //   const [activeFacultyIndex, setActiveFacultyIndex] = useState(0);

// //   const [students, setStudents] = useState([]);
// //   const [filteredStudents, setFilteredStudents] = useState([]);
// //   const [selectedStudent, setSelectedStudent] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [searchTerm, setSearchTerm] = useState('');
// //   const [filterStatus, setFilterStatus] = useState('all');
// //   const [statistics, setStatistics] = useState({});
// //   const [analytics, setAnalytics] = useState({});
// //   const [showReviewModal, setShowReviewModal] = useState(false);
// //   const [showBulkModal, setShowBulkModal] = useState(false);
// //   const [showDocumentModal, setShowDocumentModal] = useState(false);
// //   const [selectedStudents, setSelectedStudents] = useState([]);
// //   const [activityLog, setActivityLog] = useState([]);
// //   const [currentDocument, setCurrentDocument] = useState(null);
// //   const [pagination, setPagination] = useState({
// //     currentPage: 1,
// //     totalPages: 1,
// //     totalItems: 0,
// //     itemsPerPage: 10
// //   });

// //   // Review form state
// //   const [reviewForm, setReviewForm] = useState({
// //     advisorNotes: '',
// //     recommendedFaculty: '',
// //     recommendedDepartment: '',
// //     careerAdvice: '',
// //     nextSteps: '',
// //     approved: false
// //   });

// //   // Bulk review form
// //   const [bulkReviewForm, setBulkReviewForm] = useState({
// //     approved: false,
// //     advisorNotes: ''
// //   });

// //   // Pie chart functions
// //   const RADIAN = Math.PI / 180;
// //   const renderCustomizedLabel = ({
// //     cx,
// //     cy,
// //     midAngle,
// //     innerRadius,
// //     outerRadius,
// //     percent
// //   }) => {
// //     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
// //     const x = cx + radius * Math.cos(-midAngle * RADIAN);
// //     const y = cy + radius * Math.sin(-midAngle * RADIAN);

// //     return (
// //       <text
// //         x={x}
// //         y={y}
// //         fill="white"
// //         textAnchor={x > cx ? "start" : "end"}
// //         dominantBaseline="central"
// //       >
// //         {`${(percent * 100).toFixed(0)}%`}
// //       </text>
// //     );
// //   };

// //   // Transform grade distribution data for pie chart
// //   const transformGradeDataForPieChart = (gradeDistribution) => {
// //     if (!gradeDistribution || !Array.isArray(gradeDistribution)) {
// //       return [];
// //     }
    
// //     return gradeDistribution.map(grade => ({
// //       name: `${grade._id}%`, // Grade percentage
// //       value: grade.count,     // Number of students
// //       grade: grade._id        // Keep original grade for reference
// //     }));
// //   };

// //   // Transform faculty distribution data for bar chart
// //   const transformFacultyDataForBarChart = (facultyDistribution) => {
// //     if (!facultyDistribution || !Array.isArray(facultyDistribution)) {
// //       return [];
// //     }
    
// //     return facultyDistribution.map(faculty => ({
// //       name: faculty._id.length > 20 ? faculty._id.substring(0, 20) + '...' : faculty._id,
// //       fullName: faculty._id,
// //       students: faculty.count,
// //       uv: faculty.count // For compatibility with bar chart
// //     }));
// //   };

// //   // Transform program preferences data for triangle bar chart
// //   const transformProgramDataForBarChart = (programPreferences) => {
// //     if (!programPreferences || !Array.isArray(programPreferences)) {
// //       return [];
// //     }
    
// //     return programPreferences.map((program, index) => ({
// //       name: program._id.length > 15 ? program._id.substring(0, 15) + '...' : program._id,
// //       fullName: program._id,
// //       uv: program.count, // For triangle bar chart
// //       students: program.count
// //     }));
// //   };

// //   // Triangle Bar Shape Component
// //   const getPath = (x, y, width, height) => {
// //     return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
// //     ${x + width / 2}, ${y}
// //     C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
// //     Z`;
// //   };

// //   const TriangleBar = (props) => {
// //     const { fill, x, y, width, height } = props;
// //     return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
// //   };

// //   // Handle faculty bar click
// //   const handleFacultyBarClick = (data, index) => {
// //     setActiveFacultyIndex(index);
// //   };

// //   useEffect(() => {
// //     if (activeTab === 'overview') {
// //       fetchDashboardData();
// //       fetchAnalytics();
// //     } else if (activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved') {
// //       fetchStudents();
// //     } else if (activeTab === 'transfer') {
// //       fetchTransferStudents();
// //     } else if (activeTab === 'activity') {
// //       fetchActivityLog();
// //     } else if (activeTab === 'analytics') {
// //       fetchAnalytics();
// //     }
// //   }, [activeTab, pagination.currentPage]);

// //   useEffect(() => {
// //     filterStudents();
// //   }, [students, searchTerm, filterStatus]);

// //   const fetchDashboardData = async () => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem('token');
// //       const response = await fetch('http://localhost:5000/api/student/profiles/statistics', {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       if (response.ok) {
// //         const data = await response.json();
// //         setStatistics(data.statistics || {});
// //       } else {
// //         Notify.failure('Failed to fetch dashboard data');
// //       }
// //     } catch (error) {
// //       Notify.failure('Error loading dashboard');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchStudents = async (page = 1) => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem('token');
// //       let endpoint = '';
// //       switch (activeTab) {
// //         case 'students':
// //           endpoint = 'http://localhost:5000/api/student/allprofiles';
// //           break;
// //         case 'pending':
// //           endpoint = 'http://localhost:5000/api/student/profiles/status/pending';
// //           break;
// //         case 'approved':
// //           endpoint = 'http://localhost:5000/api/student/profiles/status/approved';
// //           break;
// //         default:
// //           endpoint = 'http://localhost:5000/api/student/allprofiles';
// //       }
// //       const response = await fetch(endpoint, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       if (response.ok) {
// //         const data = await response.json();
// //         let studentsArray = [];
// //         if (data.data && data.data.profiles) {
// //           studentsArray = data.data.profiles;
// //           setPagination(data.data.pagination || pagination);
// //         } else if (data.profiles) {
// //           studentsArray = data.profiles;
// //         } else if (Array.isArray(data.data)) {
// //           studentsArray = data.data;
// //         } else if (Array.isArray(data)) {
// //           studentsArray = data;
// //         }
// //         setStudents(studentsArray);
// //       } else {
// //         if (response.status === 403) {
// //           Notify.failure('Access denied. Please check your permissions.');
// //         } else if (response.status === 404) {
// //           Notify.failure('Endpoint not found. Please check your backend routes.');
// //         } else {
// //           Notify.failure('Failed to fetch students');
// //         }
// //       }
// //     } catch (error) {
// //       Notify.failure('Error loading students');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Fetch transfer students
// //   const fetchTransferStudents = async (page = 1) => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem('token');
// //       const response = await fetch(`http://localhost:5000/api/student/transfer-students`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       if (response.ok) {
// //         const data = await response.json();
// //         setStudents(data.data.students || []);
// //         setPagination(data.data.pagination || pagination);
// //       } else {
// //         Notify.failure('Failed to fetch transfer students');
// //       }
// //     } catch (error) {
// //       Notify.failure('Error loading transfer students');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const fetchAnalytics = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch('http://localhost:5000/api/student/profiles/analytics', {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       if (response.ok) {
// //         const data = await response.json();
// //         setAnalytics(data.data || {});
// //       } else {
// //         setAnalytics({ gradeDistribution: [], programPreferences: [], facultyDistribution: [] });
// //       }
// //     } catch (error) {
// //       setAnalytics({ gradeDistribution: [], programPreferences: [], facultyDistribution: [] });
// //     }
// //   };

// //   const fetchActivityLog = async (page = 1) => {
// //     try {
// //       setLoading(true);
// //       const token = localStorage.getItem('token');
// //       const response = await fetch(`http://localhost:5000/api/advisor/activity-log?page=${page}&limit=20`, {
// //         headers: { 'Authorization': `Bearer ${token}` }
// //       });
// //       if (response.ok) {
// //         const data = await response.json();
// //         setActivityLog(data.data.activities || []);
// //         setPagination(data.data.pagination || pagination);
// //       } else {
// //         setActivityLog([]);
// //       }
// //     } catch (error) {
// //       setActivityLog([]);
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Review handlers
// //   const handleReviewStudent = async (student) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       try {
// //         const response = await fetch(`http://localhost:5000/api/advisor/profiles/${student._id}/detailed`, {
// //           headers: { 'Authorization': `Bearer ${token}` }
// //         });
// //         if (response.ok) {
// //           const data = await response.json();
// //           setSelectedStudent(data.data.profile);
// //         } else {
// //           setSelectedStudent(student);
// //         }
// //       } catch {
// //         setSelectedStudent(student);
// //       }
// //       setReviewForm({
// //         advisorNotes: student.advisorNotes || '',
// //         recommendedFaculty: student.recommendedFaculty || student.aiRecommendations?.recommendedFaculty || '',
// //         recommendedDepartment: student.recommendedDepartment || student.aiRecommendations?.recommendedDepartment || '',
// //         careerAdvice: student.careerAdvice || student.aiRecommendations?.careerAdvice || '',
// //         nextSteps: student.nextSteps || '',
// //         approved: student.isStudentApproved || false
// //       });
// //       setShowReviewModal(true);
// //     } catch (error) {
// //       setSelectedStudent(student);
// //       setShowReviewModal(true);
// //     }
// //   };

// //   // Document handlers
// //   const viewDocument = (profileId, documentType, fileName, originalName) => {
// //     const token = localStorage.getItem('token');
// //     const viewUrl = `http://localhost:5000/api/advisor/profiles/${profileId}/view/${documentType}/${fileName}?token=${token}`;
// //     setCurrentDocument({
// //       url: viewUrl,
// //       name: originalName || fileName,
// //       type: documentType
// //     });
// //     setShowDocumentModal(true);
// //   };

// //   const downloadDocument = async (profileId, documentType, fileName) => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         Notify.failure('Please log in to download documents');
// //         return;
// //       }
// //       Notify.info('Preparing download...');
// //       const response = await fetch(
// //         `http://localhost:5000/api/profiles/${profileId}/download/${documentType}/${fileName}`,
// //         { headers: { 'Authorization': `Bearer ${token}`, 'Accept': '*/*' } }
// //       );
// //       if (response.ok) {
// //         const blob = await response.blob();
// //         const cd = response.headers.get('Content-Disposition');
// //         let downloadFileName = fileName;
// //         if (cd) {
// //           const m = cd.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
// //           if (m && m[1]) downloadFileName = m[1].replace(/['"]/g, '');
// //         }
// //         const url = window.URL.createObjectURL(blob);
// //         const a = document.createElement('a');
// //         a.href = url;
// //         a.download = downloadFileName;
// //         a.style.display = 'none';
// //         document.body.appendChild(a);
// //         a.click();
// //         setTimeout(() => {
// //           window.URL.revokeObjectURL(url);
// //           document.body.removeChild(a);
// //         }, 100);
// //         Notify.success(`Document "${downloadFileName}" downloaded successfully`);
// //       } else {
// //         let msg = 'Failed to download document';
// //         try {
// //           const err = await response.json();
// //           msg = err.message || msg;
// //           if (response.status === 404) msg = 'Document not found on server';
// //           else if (response.status === 403) msg = 'Access denied. Please check your permissions.';
// //           else if (response.status === 500) msg = 'Server error. Please try again later.';
// //         } catch {}
// //         throw new Error(msg);
// //       }
// //     } catch (error) {
// //       Notify.failure(error.message || 'Failed to download document');
// //     }
// //   };

// //   // Helpers
// //   const filterStudents = () => {
// //     let filtered = students;
// //     if (searchTerm) {
// //       filtered = filtered.filter(student =>
// //         student.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         student.nationality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
// //         student.desiredFaculty?.toLowerCase().includes(searchTerm.toLowerCase())
// //       );
// //     }
// //     if (filterStatus !== 'all') {
// //       filtered = filtered.filter(student => {
// //         switch (filterStatus) {
// //           case 'pending': return !student.isStudentApproved;
// //           case 'approved': return student.isStudentApproved;
// //           case 'transfer': return student.transferStudent;
// //           default: return true;
// //         }
// //       });
// //     }
// //     setFilteredStudents(filtered);
// //   };

// //   const handleSearch = () => {
// //     if (activeTab === 'transfer') {
// //       fetchTransferStudents();
// //     } else {
// //       fetchStudents();
// //     }
// //   };

// //   const handleSubmitReview = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = localStorage.getItem('token');
// //       const response = await fetch('http://localhost:5000/api/admin/approve-profile', {
// //         method: 'PUT',
// //         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
// //         body: JSON.stringify({
// //           profileId: selectedStudent._id,
// //           approved: reviewForm.approved,
// //           advisorNotes: reviewForm.advisorNotes
// //         })
// //       });
// //       if (response.ok) {
// //         Notify.success('Review submitted successfully');
// //         setShowReviewModal(false);
// //         if (activeTab === 'transfer') fetchTransferStudents(); else fetchStudents();
// //         if (activeTab === 'overview') fetchDashboardData();
// //       } else {
// //         const err = await response.json();
// //         throw new Error(err.message || 'Failed to submit review');
// //       }
// //     } catch (error) {
// //       Notify.failure('Failed to submit review: ' + error.message);
// //     }
// //   };

// //   const handleBulkReview = () => {
// //     if (selectedStudents.length === 0) {
// //       Notify.warning('Please select students to review');
// //       return;
// //     }
// //     setShowBulkModal(true);
// //   };

// //   const handleSubmitBulkReview = async (e) => {
// //     e.preventDefault();
// //     try {
// //       const token = localStorage.getItem('token');
// //       for (const studentId of selectedStudents) {
// //         await fetch('http://localhost:5000/api/admin/approve-profile', {
// //           method: 'PUT',
// //           headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
// //           body: JSON.stringify({
// //             profileId: studentId,
// //             approved: bulkReviewForm.approved,
// //             advisorNotes: bulkReviewForm.advisorNotes
// //           })
// //         });
// //       }
// //       Notify.success(`Bulk review completed for ${selectedStudents.length} students`);
// //       setShowBulkModal(false);
// //       setSelectedStudents([]);
// //       setBulkReviewForm({ approved: false, advisorNotes: '' });
// //       if (activeTab === 'transfer') fetchTransferStudents(); else fetchStudents();
// //       if (activeTab === 'overview') fetchDashboardData();
// //     } catch (error) {
// //       Notify.failure('Failed to submit bulk review');
// //     }
// //   };

// //   const handleSelectStudent = (studentId) => {
// //     setSelectedStudents(prev =>
// //       prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
// //     );
// //   };

// //   const handleSelectAllStudents = () => {
// //     if (selectedStudents.length === filteredStudents.length) {
// //       setSelectedStudents([]);
// //     } else {
// //       setSelectedStudents(filteredStudents.map(student => student._id));
// //     }
// //   };

// //   const handleLogout = () => {
// //     if (window.confirm('Are you sure you want to logout?')) {
// //       localStorage.removeItem('token');
// //       localStorage.removeItem('user');
// //       Notify.success('Logged out successfully!');
// //       setTimeout(() => { window.location.href = '/'; }, 1000);
// //     }
// //   };

// //   const getStatusBadge = (student) => {
// //     if (student.isStudentApproved) {
// //       return <span className="status-badge approved">Approved</span>;
// //     }
// //     return <span className="status-badge pending">Pending Review</span>;
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'Not provided';
// //     return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
// //   };

// //   const facultyOptions = [
// //     'Faculty of Business Administration',
// //     'Faculty of Information Technology',
// //     'Faculty of Health Sciences',
// //     'Faculty of Medicine',
// //     'Faculty in Education',
// //     'Bachelor Of Theology'
// //   ];

// //   const getDepartmentOptions = (faculty) => {
// //     const departments = {
// //       'Faculty of Business Administration': [
// //         'BBA In Accounting', 'BBA In Management', 'BBA in Finance', 'BBA in Marketing',
// //         'MBA in Accounting', 'MBA In Management', 'MBA In Finance', 'MBA in Human Resource Management', 'MBA in Project Management'
// //       ],
// //       'Faculty of Information Technology': [
// //         'BSc in Information Management', 'BSc in Networks and Communication Systems',
// //         'BSc in Software Engineering', 'Master Of Science In Data Analytics'
// //       ],
// //       'Faculty of Health Sciences': [
// //         'Bachelor of Science in Nursing', 'Bachelor of Science in Midwifery'
// //       ],
// //       'Faculty of Medicine': ['MD Of General Medicine'],
// //       'Faculty in Education': [
// //         'BA in Accounting and Information Technology', 'BA in English Language and Literature and French',
// //         'BA In Geography and History', 'Master of Art in Educational Administration', 'Master of Art In Curriculum, Instructions and Supervision'
// //       ],
// //       'Bachelor Of Theology': ['Bachelor of Theology']
// //     };
// //     return departments[faculty] || [];
// //   };

// //   // Loading screen for overview fetch
// //   if (loading && activeTab === 'overview') {
// //     return (
// //       <div className="advisor-dashboard">
// //         <div className="dashboard-layout">
// //           <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
// //             <div className="sidebar-header">
// //               <div className="brand">🎓 Advisor</div>
// //             </div>
// //             <nav className="sidebar-nav">
// //               {SIDEBAR_ITEMS.map(tab => (
// //                 <button
// //                   key={tab.id}
// //                   onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
// //                   className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
// //                 >
// //                   <span className="tab-icon">{tab.icon}</span>
// //                   <span className="tab-label">{tab.label}</span>
// //                 </button>
// //               ))}
// //             </nav>
// //             <div className="sidebar-footer">
// //               <button className="logout-btn" onClick={handleLogout}>Logout</button>
// //             </div>
// //           </aside>

// //           <main className="main-content">
// //             <div className="topbar">
// //               <button
// //                 className="sidebar-toggle"
// //                 onClick={() => setSidebarOpen(prev => !prev)}
// //                 aria-label="Toggle sidebar"
// //               >
// //                 ☰
// //               </button>
// //               <h1 className="topbar-title">Advisor Dashboard</h1>
// //             </div>

// //             <div className="loading-container">
// //               <div className="loading-spinner"></div>
// //               <h2>Loading Advisor Dashboard...</h2>
// //             </div>
// //           </main>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="advisor-dashboard">
// //       <div className="dashboard-layout">
// //         {/* Sidebar */}
// //         <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
// //           <div className="sidebar-header">
// //             <div className="brand">🎓 Advisor</div>
// //           </div>
// //           <nav className="sidebar-nav">
// //             {SIDEBAR_ITEMS.map(tab => (
// //               <button
// //                 key={tab.id}
// //                 onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
// //                 className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
// //               >
// //                 <span className="tab-icon">{tab.icon}</span>
// //                 <span className="tab-label">{tab.label}</span>
// //               </button>
// //             ))}
// //           </nav>
// //           <div className="sidebar-footer">
// //             <button className="logout-btn" onClick={handleLogout}>Logout</button>
// //           </div>
// //         </aside>

// //         {/* Main content */}
// //         <main className="main-content">
// //           {/* Topbar for small screens */}
// //           <div className="topbar">
// //             <button
// //               className="sidebar-toggle"
// //               onClick={() => setSidebarOpen(prev => !prev)}
// //               aria-label="Toggle sidebar"
// //             >
// //               ☰
// //             </button>
// //             <h1 className="topbar-title">Advisor Dashboard</h1>
// //           </div>

// //           {/* Overview Tab */}
// //           {activeTab === 'overview' && (
// //             <div className="tab-content">
// //               <div className="stats-grid">
// //                 <div className="stat-card">
// //                   <div className="stat-icon">👥</div>
// //                   <div className="stat-content">
// //                     <div className="stat-value">{statistics.total || 0}</div>
// //                     <div className="stat-label">Total Profiles</div>
// //                   </div>
// //                 </div>
// //                 <div className="stat-card">
// //                   <div className="stat-icon">⏳</div>
// //                   <div className="stat-content">
// //                     <div className="stat-value">{statistics.pending || 0}</div>
// //                     <div className="stat-label">Pending Review</div>
// //                   </div>
// //                 </div>
// //                 <div className="stat-card">
// //                   <div className="stat-icon">✅</div>
// //                   <div className="stat-content">
// //                     <div className="stat-value">{statistics.approved || 0}</div>
// //                     <div className="stat-label">Approved</div>
// //                   </div>
// //                 </div>
// //                 <div className="stat-card">
// //                   <div className="stat-icon">📈</div>
// //                   <div className="stat-content">
// //                     <div className="stat-value">{statistics.recent || 0}</div>
// //                     <div className="stat-label">Recent (7 days)</div>
// //                   </div>
// //                 </div>
// //               </div>

// //               <div className="overview-charts">
// //                 <div className="chart-card">
// //                   <h3>Approval Rate</h3>
// //                   <div className="progress-circle">
// //                     <div className="progress-text">{statistics.approvalRate || 0}%</div>
// //                   </div>
// //                 </div>
// //                 <div className="chart-card">
// //                   <h3>Recent Activity</h3>
// //                   <div className="activity-summary">
// //                     <p>Reviews processed this week</p>
// //                     <div className="activity-number">{statistics.recent || 0}</div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Analytics Tab */}
// //           {activeTab === 'analytics' && (
// //             <div className="tab-content">
// //               <div className="analytics-section">
// //                 <h3>Grade Distribution</h3>
// //                 <div className="chart-container">
// //                   {analytics.gradeDistribution && analytics.gradeDistribution.length > 0 ? (
// //                     <div className="pie-chart-container" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
// //                       <div className="pie-chart-wrapper">
// //                         <PieChart width={400} height={400}>
// //                           <Pie
// //                             data={transformGradeDataForPieChart(analytics.gradeDistribution)}
// //                             cx={200}
// //                             cy={200}
// //                             labelLine={false}
// //                             label={renderCustomizedLabel}
// //                             outerRadius={80}
// //                             fill="#8884d8"
// //                             dataKey="value"
// //                           >
// //                             {transformGradeDataForPieChart(analytics.gradeDistribution).map((entry, index) => (
// //                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
// //                             ))}
// //                           </Pie>
// //                         </PieChart>
// //                       </div>
// //                       <div className="pie-chart-legend" style={{ flex: 1 }}>
// //                         <h4 style={{ marginBottom: '1rem', color: '#333' }}>Grade Breakdown</h4>
// //                         {transformGradeDataForPieChart(analytics.gradeDistribution).map((entry, index) => (
// //                           <div key={index} className="legend-item" style={{ 
// //                             display: 'flex', 
// //                             alignItems: 'center', 
// //                             marginBottom: '0.8rem',
// //                             padding: '0.5rem',
// //                             backgroundColor: '#f8f9fa',
// //                             borderRadius: '6px',
// //                             border: '1px solid #e9ecef'
// //                           }}>
// //                             <div 
// //                               className="legend-color" 
// //                               style={{ 
// //                                 backgroundColor: COLORS[index % COLORS.length],
// //                                 width: '16px',
// //                                 height: '16px',
// //                                 borderRadius: '4px',
// //                                 marginRight: '12px',
// //                                 flexShrink: 0
// //                               }}
// //                             ></div>
// //                             <span className="legend-text" style={{ 
// //                               fontSize: '14px',
// //                               fontWeight: '500',
// //                               color: '#495057'
// //                             }}>
// //                               {entry.name}: {entry.value} students
// //                             </span>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <div className="no-data">
// //                       <p>No grade distribution data available</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="analytics-section">
// //                 <h3>Program Preferences</h3>
// //                 <div className="program-stats">
// //                   {analytics.programPreferences && analytics.programPreferences.length > 0 ? (
// //                     <div className="triangle-bar-chart-container" style={{ width: '100%' }}>
// //                       <ResponsiveContainer width="100%" height={400}>
// //                         <BarChart
// //                           data={transformProgramDataForBarChart(analytics.programPreferences)}
// //                           margin={{
// //                             top: 20,
// //                             right: 30,
// //                             left: 20,
// //                             bottom: 80,
// //                           }}
// //                         >
// //                           <CartesianGrid strokeDasharray="3 3" />
// //                           <XAxis 
// //                             dataKey="name" 
// //                             angle={-45}
// //                             textAnchor="end"
// //                             height={100}
// //                             fontSize={12}
// //                           />
// //                           <YAxis />
// //                           <Tooltip 
// //                             formatter={(value, name, props) => [
// //                               `${value} students`, 
// //                               props.payload.fullName
// //                             ]}
// //                           />
// //                           <Bar 
// //                             dataKey="uv" 
// //                             fill="#8884d8" 
// //                             shape={<TriangleBar />} 
// //                             label={{ position: 'top' }}
// //                           >
// //                             {transformProgramDataForBarChart(analytics.programPreferences).map((entry, index) => (
// //                               <Cell key={`cell-${index}`} fill={PROGRAM_COLORS[index % PROGRAM_COLORS.length]} />
// //                             ))}
// //                           </Bar>
// //                         </BarChart>
// //                       </ResponsiveContainer>
                      
// //                       {/* Program Statistics Summary */}
// //                       <div style={{ 
// //                         marginTop: '1.5rem', 
// //                         padding: '1.5rem', 
// //                         backgroundColor: '#fff', 
// //                         borderRadius: '8px',
// //                         border: '1px solid #e9ecef',
// //                         boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
// //                       }}>
// //                         <h4 style={{ 
// //                           marginBottom: '1rem', 
// //                           color: '#333',
// //                           fontSize: '18px',
// //                           fontWeight: '600'
// //                         }}>
// //                           Program Enrollment Statistics
// //                         </h4>
// //                         <div style={{ 
// //                           display: 'grid', 
// //                           gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
// //                           gap: '1rem' 
// //                         }}>
// //                           {analytics.programPreferences.map((program, index) => (
// //                             <div key={index} style={{ 
// //                               padding: '1rem',
// //                               backgroundColor: '#f8f9fa',
// //                               borderRadius: '6px',
// //                               border: `3px solid ${PROGRAM_COLORS[index % PROGRAM_COLORS.length]}`,
// //                               borderLeft: `6px solid ${PROGRAM_COLORS[index % PROGRAM_COLORS.length]}`
// //                             }}>
// //                               <div style={{ 
// //                                 display: 'flex', 
// //                                 alignItems: 'center', 
// //                                 marginBottom: '0.5rem' 
// //                               }}>
// //                                 <div style={{ 
// //                                   width: '0', 
// //                                   height: '0', 
// //                                   borderLeft: '6px solid transparent',
// //                                   borderRight: '6px solid transparent',
// //                                   borderBottom: `12px solid ${PROGRAM_COLORS[index % PROGRAM_COLORS.length]}`,
// //                                   marginRight: '8px',
// //                                   flexShrink: 0
// //                                 }}></div>
// //                                 <h5 style={{ 
// //                                   margin: 0, 
// //                                   fontSize: '14px', 
// //                                   fontWeight: '600',
// //                                   color: '#333',
// //                                   lineHeight: '1.4'
// //                                 }}>
// //                                   {program._id}
// //                                 </h5>
// //                               </div>
// //                               <p style={{ 
// //                                 margin: 0, 
// //                                 fontSize: '16px', 
// //                                 fontWeight: '700',
// //                                 color: PROGRAM_COLORS[index % PROGRAM_COLORS.length]
// //                               }}>
// //                                 <strong>{program.count}</strong> {program.count === 1 ? 'student' : 'students'}
// //                               </p>
// //                               <p style={{ 
// //                                 margin: '0.25rem 0 0 0', 
// //                                 fontSize: '12px', 
// //                                 color: '#666',
// //                                 fontStyle: 'italic'
// //                               }}>
// //                                 {((program.count / analytics.programPreferences.reduce((sum, p) => sum + p.count, 0)) * 100).toFixed(1)}% of total program preferences
// //                               </p>
// //                             </div>
// //                           ))}
// //                         </div>
                        
// //                         {/* Program Summary Statistics */}
// //                         <div style={{ 
// //                           marginTop: '1.5rem', 
// //                           padding: '1rem',
// //                           backgroundColor: '#f3e5f5',
// //                           borderRadius: '6px',
// //                           border: '1px solid #ce93d8'
// //                         }}>
// //                           <h5 style={{ 
// //                             margin: '0 0 0.5rem 0', 
// //                             color: '#7b1fa2', 
// //                             fontSize: '16px',
// //                             fontWeight: '600'
// //                           }}>
// //                             Program Summary
// //                           </h5>
// //                           <div style={{ 
// //                             display: 'grid', 
// //                             gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
// //                             gap: '0.5rem',
// //                             fontSize: '14px'
// //                           }}>
// //                             <p style={{ margin: 0, color: '#7b1fa2' }}>
// //                               <strong>Total Programs:</strong> {analytics.programPreferences.length}
// //                             </p>
// //                             <p style={{ margin: 0, color: '#7b1fa2' }}>
// //                               <strong>Total Students:</strong> {analytics.programPreferences.reduce((sum, p) => sum + p.count, 0)}
// //                             </p>
// //                             <p style={{ margin: 0, color: '#7b1fa2' }}>
// //                               <strong>Average per Program:</strong> {(analytics.programPreferences.reduce((sum, p) => sum + p.count, 0) / analytics.programPreferences.length).toFixed(1)} students
// //                             </p>
// //                             <p style={{ margin: 0, color: '#7b1fa2' }}>
// //                               <strong>Most Popular:</strong> {analytics.programPreferences.reduce((max, program) => program.count > max.count ? program : max, analytics.programPreferences[0])._id}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <div className="no-data">
// //                       <p>No program preferences data available</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>

// //               <div className="analytics-section">
// //                 <h3>Faculty Distribution</h3>
// //                 <div className="faculty-stats">
// //                   {analytics.facultyDistribution && analytics.facultyDistribution.length > 0 ? (
// //                     <div className="bar-chart-container" style={{ width: '100%' }}>
// //                       <p style={{ marginBottom: '1rem', fontSize: '14px', color: '#666' }}>
// //                         Click each bar to see details
// //                       </p>
// //                       <ResponsiveContainer width="100%" height={300}>
// //                         <BarChart 
// //                           data={transformFacultyDataForBarChart(analytics.facultyDistribution)}
// //                           margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
// //                         >
// //                           <CartesianGrid strokeDasharray="3 3" />
// //                           <XAxis 
// //                             dataKey="name" 
// //                             angle={-45}
// //                             textAnchor="end"
// //                             height={100}
// //                             fontSize={12}
// //                           />
// //                           <YAxis />
// //                           <Tooltip 
// //                             formatter={(value, name, props) => [
// //                               `${value} students`, 
// //                               props.payload.fullName
// //                             ]}
// //                           />
// //                           <Bar 
// //                             dataKey="students" 
// //                             onClick={handleFacultyBarClick}
// //                             cursor="pointer"
// //                           >
// //                             {transformFacultyDataForBarChart(analytics.facultyDistribution).map((entry, index) => (
// //                               <Cell 
// //                                 key={`cell-${index}`} 
// //                                 fill={index === activeFacultyIndex ? '#82ca9d' : BAR_COLORS[index % BAR_COLORS.length]} 
// //                               />
// //                             ))}
// //                           </Bar>
// //                         </BarChart>
// //                       </ResponsiveContainer>
                     
                      
// //                       {/* Detailed Faculty Statistics */}
// //                       <div style={{ 
// //                         marginTop: '1.5rem', 
// //                         padding: '1.5rem', 
// //                         backgroundColor: '#fff', 
// //                         borderRadius: '8px',
// //                         border: '1px solid #e9ecef',
// //                         boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
// //                       }}>
// //                         <h4 style={{ 
// //                           marginBottom: '1rem', 
// //                           color: '#333',
// //                           fontSize: '18px',
// //                           fontWeight: '600'
// //                         }}>
// //                           Faculty Enrollment Statistics
// //                         </h4>
// //                         <div style={{ 
// //                           display: 'grid', 
// //                           gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
// //                           gap: '1rem' 
// //                         }}>
// //                           {analytics.facultyDistribution.map((faculty, index) => (
// //                             <div key={index} style={{ 
// //                               padding: '1rem',
// //                               backgroundColor: '#f8f9fa',
// //                               borderRadius: '6px',
// //                               border: `3px solid ${BAR_COLORS[index % BAR_COLORS.length]}`,
// //                               borderLeft: `6px solid ${BAR_COLORS[index % BAR_COLORS.length]}`
// //                             }}>
// //                               <div style={{ 
// //                                 display: 'flex', 
// //                                 alignItems: 'center', 
// //                                 marginBottom: '0.5rem' 
// //                               }}>
// //                                 <div style={{ 
// //                                   width: '12px', 
// //                                   height: '12px', 
// //                                   backgroundColor: BAR_COLORS[index % BAR_COLORS.length],
// //                                   borderRadius: '50%',
// //                                   marginRight: '8px',
// //                                   flexShrink: 0
// //                                 }}></div>
// //                                 <h5 style={{ 
// //                                   margin: 0, 
// //                                   fontSize: '14px', 
// //                                   fontWeight: '600',
// //                                   color: '#333',
// //                                   lineHeight: '1.4'
// //                                 }}>
// //                                   {faculty._id}
// //                                 </h5>
// //                               </div>
// //                               <p style={{ 
// //                                 margin: 0, 
// //                                 fontSize: '16px', 
// //                                 fontWeight: '700',
// //                                 color: BAR_COLORS[index % BAR_COLORS.length]
// //                               }}>
// //                                 <strong>{faculty.count}</strong> {faculty.count === 1 ? 'student' : 'students'}
// //                               </p>
// //                               <p style={{ 
// //                                 margin: '0.25rem 0 0 0', 
// //                                 fontSize: '12px', 
// //                                 color: '#666',
// //                                 fontStyle: 'italic'
// //                               }}>
// //                                 {((faculty.count / analytics.facultyDistribution.reduce((sum, f) => sum + f.count, 0)) * 100).toFixed(1)}% of total enrollment
// //                               </p>
// //                             </div>
// //                           ))}
// //                         </div>
                        
// //                         {/* Summary Statistics */}
// //                         <div style={{ 
// //                           marginTop: '1.5rem', 
// //                           padding: '1rem',
// //                           backgroundColor: '#e3f2fd',
// //                           borderRadius: '6px',
// //                           border: '1px solid #bbdefb'
// //                         }}>
// //                           <h5 style={{ 
// //                             margin: '0 0 0.5rem 0', 
// //                             color: '#1565c0', 
// //                             fontSize: '16px',
// //                             fontWeight: '600'
// //                           }}>
// //                             Summary
// //                           </h5>
// //                           <div style={{ 
// //                             display: 'grid', 
// //                             gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
// //                             gap: '0.5rem',
// //                             fontSize: '14px'
// //                           }}>
// //                             <p style={{ margin: 0, color: '#1565c0' }}>
// //                               <strong>Total Faculties:</strong> {analytics.facultyDistribution.length}
// //                             </p>
// //                             <p style={{ margin: 0, color: '#1565c0' }}>
// //                               <strong>Total Students:</strong> {analytics.facultyDistribution.reduce((sum, f) => sum + f.count, 0)}
// //                             </p>
// //                             <p style={{ margin: 0, color: '#1565c0' }}>
// //                               <strong>Average per Faculty:</strong> {(analytics.facultyDistribution.reduce((sum, f) => sum + f.count, 0) / analytics.facultyDistribution.length).toFixed(1)} students
// //                             </p>
// //                             <p style={{ margin: 0, color: '#1565c0' }}>
// //                               <strong>Most Popular:</strong> {analytics.facultyDistribution.reduce((max, faculty) => faculty.count > max.count ? faculty : max, analytics.facultyDistribution[0])._id}
// //                             </p>
// //                           </div>
// //                         </div>
// //                       </div>
// //                     </div>
// //                   ) : (
// //                     <div className="no-data">
// //                       <p>No faculty distribution data available</p>
// //                     </div>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Activity Log Tab */}
// //           {activeTab === 'activity' && (
// //             <div className="tab-content">
// //               <div className="activity-log">
// //                 <h3>Recent Advisor Activity</h3>
// //                 {activityLog.length > 0 ? (
// //                   <div className="activity-list">
// //                     {activityLog.map((activity, index) => (
// //                       <div key={index} className="activity-item">
// //                         <div className="activity-info">
// //                           <span className="activity-student">{activity.student?.name || 'Unknown'}</span>
// //                           <span className="activity-action">
// //                             {activity.action} by {activity.reviewedBy}
// //                           </span>
// //                           <span className="activity-date">{formatDate(activity.reviewDate)}</span>
// //                         </div>
// //                         <div className="activity-details">
// //                           <span className="activity-faculty">{activity.nationality} • {activity.desiredFaculty}</span>
// //                         </div>
// //                         {activity.advisorNotes && (
// //                           <div className="activity-notes">{activity.advisorNotes}</div>
// //                         )}
// //                       </div>
// //                     ))}
// //                   </div>
// //                 ) : (
// //                   <div className="no-activity">
// //                     <div className="no-activity-icon">📋</div>
// //                     <h3>No recent activity found</h3>
// //                     <p>Activity will appear here when advisors review student profiles</p>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           {/* Appointments Tab (placeholder) */}
// //           {activeTab === 'appointments' && (
// //             <div className="tab-content">
// //               <div className="no-students">
// //                 <div className="no-students-icon">📅</div>
// //                 <h3>Appointments</h3>
// //                 <p>Hook up your appointments endpoint/UI here.</p>
// //               </div>
// //             </div>
// //           )}

// //           {/* Students Tab (All, Pending, Approved, Transfer) */}
// //           {(activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved' || activeTab === 'transfer') && (
// //             <div className="tab-content">
// //               {/* Filters and Actions */}
// //               <div className="filters-section">
// //                 <div className="search-box">
// //                   <span className="search-icon">🔍</span>
// //                   <input
// //                     type="text"
// //                     placeholder="Search students by name, email, nationality..."
// //                     value={searchTerm}
// //                     onChange={(e) => setSearchTerm(e.target.value)}
// //                     onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
// //                     className="search-input"
// //                   />
// //                 </div>

// //                 {/* {activeTab !== 'transfer' && (
// //                   <div className="filter-dropdown">
// //                     <select
// //                       value={filterStatus}
// //                       onChange={(e) => setFilterStatus(e.target.value)}
// //                       className="filter-select"
// //                     >
// //                       <option value="all">All Students</option>
// //                       <option value="pending">Pending Review</option>
// //                       <option value="approved">Approved</option>
// //                       <option value="transfer">Transfer Students</option>
// //                     </select>
// //                   </div>
// //                 )} */}

// //                 {filteredStudents.length > 0 && (
// //                   <div className="bulk-actions">
// //                     <button onClick={handleSelectAllStudents} className="select-all-btn">
// //                       {selectedStudents.length === filteredStudents.length ? 'Deselect All' : 'Select All'}
// //                     </button>
// //                     {selectedStudents.length > 0 && (
// //                       <button onClick={handleBulkReview} className="bulk-review-btn">
// //                         Bulk Review ({selectedStudents.length})
// //                       </button>
// //                     )}
// //                   </div>
// //                 )}
// //               </div>

// //               {/* Students List */}
// //               <div className="students-grid">
// //                 {filteredStudents.map((student) => (
// //                   <div key={student._id} className="student-card">
// //                     <div className="student-header">
// //                       <input
// //                         type="checkbox"
// //                         checked={selectedStudents.includes(student._id)}
// //                         onChange={() => handleSelectStudent(student._id)}
// //                         className="student-checkbox"
// //                       />
// //                       <div className="student-avatar">
// //                         {student.images && student.images.length > 0 ? (
// //                           <img
// //                             src={`http://localhost:5000${student.images[0].url}`}
// //                             alt="Profile"
// //                             className="avatar-image"
// //                           />
// //                         ) : (
// //                           <div className="avatar-placeholder">
// //                             {student.userId?.name?.charAt(0) || 'S'}
// //                           </div>
// //                         )}
// //                       </div>
// //                       <div className="student-info">
// //                         <h3 className="student-name">{student.userId?.name || 'N/A'}</h3>
// //                         <p className="student-email">{student.email}</p>
// //                         {getStatusBadge(student)}
// //                       </div>
// //                     </div>

// //                     <div className="student-details">
// //                       <div className="detail-row">
// //                         <span className="detail-label">Nationality:</span>
// //                         <span className="detail-value">{student.nationality || 'N/A'}</span>
// //                       </div>
// //                       <div className="detail-row">
// //                         <span className="detail-label">Academic Level:</span>
// //                         <span className="detail-value">{student.currentAcademicLevel || 'N/A'}</span>
// //                       </div>
// //                       <div className="detail-row">
// //                         <span className="detail-label">Program:</span>
// //                         <span className="detail-value program-badge">
// //                           {student.studentProgram || 'Not specified'}
// //                         </span>
// //                       </div>
// //                       <div className="detail-row">
// //                         <span className="detail-label">Desired Faculty:</span>
// //                         <span className="detail-value">{student.desiredFaculty || 'Not specified'}</span>
// //                       </div>
// //                       <div className="detail-row">
// //                         <span className="detail-label">High School Grades:</span>
// //                         <span className="detail-value">{student.highSchoolGrades || 'N/A'}%</span>
// //                       </div>

// //                       {student.transferStudent && (
// //                         <>
// //                           <div className="detail-row">
// //                             <span className="detail-label">Transfer Student:</span>
// //                             <span className="detail-value transfer-badge">Yes</span>
// //                           </div>
// //                           <div className="detail-row">
// //                             <span className="detail-label">Previous Institution:</span>
// //                             <span className="detail-value">{student.previousInstitution || 'N/A'}</span>
// //                           </div>
// //                           <div className="detail-row">
// //                             <span className="detail-label">Previous Grade:</span>
// //                             <span className="detail-value">{student.overallGradePreviousUniversity || 'N/A'}</span>
// //                           </div>
// //                         </>
// //                       )}

// //                       {(student.recommendedFaculty || student.aiRecommendations?.recommendedFaculty) && (
// //                         <div className="detail-row">
// //                           <span className="detail-label">AI Recommended Faculty:</span>
// //                           <span className="detail-value ai-recommendation">
// //                             {student.recommendedFaculty || student.aiRecommendations?.recommendedFaculty}
// //                           </span>
// //                         </div>
// //                       )}

// //                       <div className="detail-row">
// //                         <span className="detail-label">Submitted:</span>
// //                         <span className="detail-value">{formatDate(student.createdAt)}</span>
// //                       </div>
// //                     </div>

// //                     <div className="student-actions">
// //                       <button
// //                         onClick={() => handleReviewStudent(student)}
// //                         className="action-btn review-btn"
// //                       >
// //                         <span className="btn-icon">📝</span>
// //                         Review
// //                       </button>

// //                       {student.documents && student.documents.length > 0 && (
// //                         <div className="document-actions">
// //                           {student.documents.slice(0, 2).map((doc, index) => (
// //                             <div key={index} className="document-buttons">
// //                               <button
// //                                 onClick={() => viewDocument(student._id, 'document', doc.filename, doc.originalName)}
// //                                 className="action-btn view-btn"
// //                                 title={`View ${doc.originalName}`}
// //                               >
// //                                 👁️
// //                               </button>
// //                               <button
// //                                 onClick={() => downloadDocument(student._id, 'document', doc.filename)}
// //                                 className="action-btn download-btn"
// //                                 title={`Download ${doc.originalName}`}
// //                               >
// //                                 📄
// //                               </button>
// //                             </div>
// //                           ))}
// //                           {student.documents.length > 2 && (
// //                             <span className="more-docs">+{student.documents.length - 2} more</span>
// //                           )}
// //                         </div>
// //                       )}
// //                     </div>
// //                   </div>
// //                 ))}
// //               </div>

// //               {/* Pagination */}
// //               {pagination.totalPages > 1 && (
// //                 <div className="pagination">
// //                   <button
// //                     onClick={() => {
// //                       if (activeTab === 'transfer') {
// //                         fetchTransferStudents(pagination.currentPage - 1);
// //                       } else {
// //                         fetchStudents(pagination.currentPage - 1);
// //                       }
// //                     }}
// //                     disabled={!pagination.hasPrevPage}
// //                     className="pagination-btn"
// //                   >
// //                     Previous
// //                   </button>
// //                   <span className="pagination-info">
// //                     Page {pagination.currentPage} of {pagination.totalPages}
// //                   </span>
// //                   <button
// //                     onClick={() => {
// //                       if (activeTab === 'transfer') {
// //                         fetchTransferStudents(pagination.currentPage + 1);
// //                       } else {
// //                         fetchStudents(pagination.currentPage + 1);
// //                       }
// //                     }}
// //                     disabled={!pagination.hasNextPage}
// //                     className="pagination-btn"
// //                   >
// //                     Next
// //                   </button>
// //                 </div>
// //               )}

// //               {filteredStudents.length === 0 && !loading && (
// //                 <div className="no-students">
// //                   <div className="no-students-icon">👥</div>
// //                   <h3>No students found</h3>
// //                   <p>
// //                     {activeTab === 'transfer'
// //                       ? 'No transfer students found in the system'
// //                       : 'Try adjusting your search or filter criteria'
// //                     }
// //                   </p>
// //                 </div>
// //               )}
// //             </div>
// //           )}

// //           {/* Enhanced Review Modal */}
// //           {showReviewModal && selectedStudent && (
// //             <div className="modal-overlay">
// //               <div className="modal-content large-modal">
// //                 <div className="modal-header">
// //                   <h2>Review Student: {selectedStudent.userId?.name}</h2>
// //                   <button onClick={() => setShowReviewModal(false)} className="modal-close">✕</button>
// //                 </div>

// //                 <form onSubmit={handleSubmitReview} className="review-form">
// //                   <div className="student-info-section">
// //                     <h3>Student Information</h3>
// //                     <div className="info-grid">
// //                       <div className="info-item"><span className="info-label">Name:</span><span className="info-value">{selectedStudent.userId?.name}</span></div>
// //                       <div className="info-item"><span className="info-label">Email:</span><span className="info-value">{selectedStudent.email}</span></div>
// //                       <div className="info-item"><span className="info-label">Nationality:</span><span className="info-value">{selectedStudent.nationality}</span></div>
// //                       <div className="info-item"><span className="info-label">Academic Level:</span><span className="info-value">{selectedStudent.currentAcademicLevel}</span></div>
// //                       <div className="info-item"><span className="info-label">Program Type:</span><span className="info-value program-badge">{selectedStudent.studentProgram || 'Not specified'}</span></div>
// //                       <div className="info-item"><span className="info-label">High School Grades:</span><span className="info-value">{selectedStudent.highSchoolGrades}%</span></div>
// //                       <div className="info-item"><span className="info-label">Desired Faculty:</span><span className="info-value">{selectedStudent.desiredFaculty || 'Not specified'}</span></div>
// //                       <div className="info-item"><span className="info-label">Career Goals:</span><span className="info-value">{selectedStudent.careerGoals || 'Not specified'}</span></div>

// //                       {selectedStudent.transferStudent && (
// //                         <>
// //                           <div className="info-item"><span className="info-label">Transfer Student:</span><span className="info-value transfer-badge">Yes</span></div>
// //                           <div className="info-item"><span className="info-label">Previous Institution:</span><span className="info-value">{selectedStudent.previousInstitution}</span></div>
// //                           <div className="info-item"><span className="info-label">Previous Grade:</span><span className="info-value">{selectedStudent.overallGradePreviousUniversity}</span></div>
// //                         </>
// //                       )}
// //                     </div>

// //                     {selectedStudent.coursesStudiedInSecondary?.length > 0 && (
// //                       <div className="courses-section">
// //                         <h4>High School Courses</h4>
// //                         <div className="courses-list">
// //                           {selectedStudent.coursesStudiedInSecondary.map((course, index) => (
// //                             <span key={index} className="course-tag">{course}</span>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}

// //                     {selectedStudent.transferStudent && selectedStudent.coursesStudiedPreviousUniversity && (
// //                       <div className="courses-section">
// //                         <h4>Previous University Courses</h4>
// //                         <div className="transfer-courses">
// //                           {selectedStudent.coursesStudiedPreviousUniversity.map((course, index) => (
// //                             <div key={index} className="transfer-course">
// //                               <span className="course-name">{course.courseName}</span>
// //                               <span className="course-code">{course.courseCode}</span>
// //                               <span className="course-grade">Grade: {course.grade}</span>
// //                             </div>
// //                           ))}
// //                         </div>
// //                       </div>
// //                     )}

// //                     {(selectedStudent.aiRecommendations || selectedStudent.recommendedFaculty) && (
// //                       <div className="ai-recommendations-section">
// //                         <h4>AI Recommendations</h4>
// //                         <div className="recommendations-grid">
// //                           {(selectedStudent.recommendedFaculty || selectedStudent.aiRecommendations?.recommendedFaculty) && (
// //                             <div className="recommendation-item">
// //                               <span className="rec-label">Recommended Faculty:</span>
// //                               <span className="rec-value ai-recommendation">
// //                                 {selectedStudent.recommendedFaculty || selectedStudent.aiRecommendations?.recommendedFaculty}
// //                               </span>
// //                             </div>
// //                           )}
// //                           {(selectedStudent.recommendedDepartment || selectedStudent.aiRecommendations?.recommendedDepartment) && (
// //                             <div className="recommendation-item">
// //                               <span className="rec-label">Recommended Department:</span>
// //                               <span className="rec-value ai-recommendation">
// //                                 {selectedStudent.recommendedDepartment || selectedStudent.aiRecommendations?.recommendedDepartment}
// //                               </span>
// //                             </div>
// //                           )}
// //                           {(selectedStudent.careerAdvice || selectedStudent.aiRecommendations?.careerAdvice) && (
// //                             <div className="recommendation-item full-width">
// //                               <span className="rec-label">AI Career Advice:</span>
// //                               <span className="rec-value ai-recommendation">
// //                                 {selectedStudent.careerAdvice || selectedStudent.aiRecommendations?.careerAdvice}
// //                               </span>
// //                             </div>
// //                           )}
// //                         </div>
// //                       </div>
// //                     )}
// //                   </div>

// //                   <div className="review-section">
// //                     <h3>Advisor Review</h3>

// //                     <div className="form-group">
// //                       <label className="form-label">Advisor Notes</label>
// //                       <textarea
// //                         value={reviewForm.advisorNotes}
// //                         onChange={(e) => setReviewForm({ ...reviewForm, advisorNotes: e.target.value })}
// //                         className="form-textarea"
// //                         rows="4"
// //                         placeholder="Add your notes about this student..."
// //                         maxLength="1000"
// //                       />
// //                     </div>

// //                     <div className="form-row">
// //                       <div className="form-group">
// //                         <label className="form-label">Recommended Faculty</label>
// //                         <select
// //                           value={reviewForm.recommendedFaculty}
// //                           onChange={(e) => setReviewForm({ ...reviewForm, recommendedFaculty: e.target.value, recommendedDepartment: '' })}
// //                           className="form-select"
// //                         >
// //                           <option value="">Select Faculty</option>
// //                           {facultyOptions.map(faculty => (
// //                             <option key={faculty} value={faculty}>{faculty}</option>
// //                           ))}
// //                         </select>
// //                       </div>

// //                       <div className="form-group">
// //                         <label className="form-label">Recommended Department</label>
// //                         <select
// //                           value={reviewForm.recommendedDepartment}
// //                           onChange={(e) => setReviewForm({ ...reviewForm, recommendedDepartment: e.target.value })}
// //                           className="form-select"
// //                           disabled={!reviewForm.recommendedFaculty}
// //                         >
// //                           <option value="">Select Department</option>
// //                           {getDepartmentOptions(reviewForm.recommendedFaculty).map(dept => (
// //                             <option key={dept} value={dept}>{dept}</option>
// //                           ))}
// //                         </select>
// //                       </div>
// //                     </div>

// //                     <div className="form-group">
// //                       <label className="form-label">Career Advice</label>
// //                       <textarea
// //                         value={reviewForm.careerAdvice}
// //                         onChange={(e) => setReviewForm({ ...reviewForm, careerAdvice: e.target.value })}
// //                         className="form-textarea"
// //                         rows="3"
// //                         placeholder="Provide career guidance and advice..."
// //                         maxLength="500"
// //                       />
// //                     </div>

// //                     <div className="form-group">
// //                       <label className="form-label">Next Steps</label>
// //                       <textarea
// //                         value={reviewForm.nextSteps}
// //                         onChange={(e) => setReviewForm({ ...reviewForm, nextSteps: e.target.value })}
// //                         className="form-textarea"
// //                         rows="3"
// //                         placeholder="Outline the next steps for this student..."
// //                         maxLength="500"
// //                       />
// //                     </div>

// //                     <div className="approval-section">
// //                       <label className="approval-checkbox">
// //                         <input
// //                           type="checkbox"
// //                           checked={reviewForm.approved}
// //                           onChange={(e) => setReviewForm({ ...reviewForm, approved: e.target.checked })}
// //                         />
// //                         <span className="checkbox-mark"></span>
// //                         <span className="checkbox-label">Approve this student</span>
// //                       </label>
// //                     </div>
// //                   </div>

// //                   <div className="modal-actions">
// //                     <button type="button" onClick={() => setShowReviewModal(false)} className="btn-cancel">
// //                       Cancel
// //                     </button>
// //                     <button type="submit" className="btn-submit">
// //                       Submit Review
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           )}

// //           {/* Document Viewing Modal */}
// //           {showDocumentModal && currentDocument && (
// //             <div className="modal-overlay">
// //               <div className="modal-content document-modal">
// //                 <div className="modal-header">
// //                   <h2>Document Viewer: {currentDocument.name}</h2>
// //                   <button onClick={() => setShowDocumentModal(false)} className="modal-close">✕</button>
// //                 </div>

// //                 <div className="document-viewer">
// //                   {currentDocument.type === 'image' ? (
// //                     <img src={currentDocument.url} alt={currentDocument.name} className="document-image" />
// //                   ) : (
// //                     <iframe src={currentDocument.url} title={currentDocument.name} className="document-iframe" width="100%" height="600px" />
// //                   )}
// //                 </div>

// //                 <div className="document-actions">
// //                   <button
// //                     onClick={() => {
// //                       const link = document.createElement('a');
// //                       link.href = currentDocument.url;
// //                       link.download = currentDocument.name;
// //                       link.click();
// //                     }}
// //                     className="btn-download"
// //                   >
// //                     Download Document
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Bulk Review Modal */}
// //           {showBulkModal && (
// //             <div className="modal-overlay">
// //               <div className="modal-content">
// //                 <div className="modal-header">
// //                   <h2>Bulk Review ({selectedStudents.length} students)</h2>
// //                   <button onClick={() => setShowBulkModal(false)} className="modal-close">✕</button>
// //                 </div>

// //                 <form onSubmit={handleSubmitBulkReview} className="bulk-review-form">
// //                   <div className="form-group">
// //                     <label className="form-label">Action</label>
// //                     <div className="radio-group">
// //                       <label className="radio-option">
// //                         <input
// //                           type="radio"
// //                           name="bulkAction"
// //                           checked={bulkReviewForm.approved === true}
// //                           onChange={() => setBulkReviewForm({ ...bulkReviewForm, approved: true })}
// //                         />
// //                         <span className="radio-mark"></span>
// //                         <span className="radio-label">Approve Selected Students</span>
// //                       </label>
// //                       <label className="radio-option">
// //                         <input
// //                           type="radio"
// //                           name="bulkAction"
// //                           checked={bulkReviewForm.approved === false}
// //                           onChange={() => setBulkReviewForm({ ...bulkReviewForm, approved: false })}
// //                         />
// //                         <span className="radio-mark"></span>
// //                         <span className="radio-label">Mark as Reviewed (No Approval)</span>
// //                       </label>
// //                     </div>
// //                   </div>

// //                   <div className="selected-students-preview">
// //                     <h4>Selected Students:</h4>
// //                     <div className="students-preview-list">
// //                       {selectedStudents.map(studentId => {
// //                         const student = filteredStudents.find(s => s._id === studentId);
// //                         return (
// //                           <div key={studentId} className="preview-student">
// //                             <span>{student?.userId?.name || 'Unknown'}</span>
// //                             <span>{student?.email}</span>
// //                             {student?.transferStudent && <span className="transfer-indicator">Transfer</span>}
// //                           </div>
// //                         );
// //                       })}
// //                     </div>
// //                   </div>

// //                   <div className="modal-actions">
// //                     <button type="button" onClick={() => setShowBulkModal(false)} className="btn-cancel">
// //                       Cancel
// //                     </button>
// //                     <button type="submit" className="btn-submit">
// //                       {bulkReviewForm.approved ? 'Approve All' : 'Review All'}
// //                     </button>
// //                   </div>
// //                 </form>
// //               </div>
// //             </div>
// //           )}
// //         </main>
// //       </div>
// //     </div>
// //   );
// // };

// // export default AdvisorDashboard;


// //advisorDahboard.jsx

// import React, { useState, useEffect } from 'react';
// import { Notify } from 'notiflix';
// import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
// import './styles/AdvisorDashboard.css';
// import './Dashboard_Styles/PieChart.css';

// const SIDEBAR_ITEMS = [
//   { id: 'overview', label: 'Overview', icon: '📊' },
//   { id: 'students', label: 'All Students', icon: '👥' },
//   { id: 'pending', label: 'Pending Reviews', icon: '⏳' },
//   { id: 'approved', label: 'Approved', icon: '✅' },
//   { id: 'transfer', label: 'Transfer Students', icon: '🔄' },
//   { id: 'analytics', label: 'Analytics', icon: '📈' },
//   { id: 'appointments', label: 'Appointments', icon: '📅' },
//   { id: 'activity', label: 'Activity Log', icon: '📋' }
// ];

// const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", "#FF9FF3", "#54A0FF", "#5F27CD"];
// const BAR_COLORS = ["#8884D8", "#82CA9D", "#FFC658", "#FF7C7C", "#8DD1E1", "#D084D0", "#FFB347", "#87D68D", "#FFB6C1", "#20B2AA", "#F0E68C", "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE"];
// const PROGRAM_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD', '#20B2AA', '#F0E68C', '#DDA0DD'];

// const AdvisorDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [sidebarOpen, setSidebarOpen] = useState(false);
//   const [activeFacultyIndex, setActiveFacultyIndex] = useState(0);

//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [statistics, setStatistics] = useState({});
//   const [analytics, setAnalytics] = useState({});
//   const [showReviewModal, setShowReviewModal] = useState(false);
//   const [showBulkModal, setShowBulkModal] = useState(false);
//   const [showDocumentModal, setShowDocumentModal] = useState(false);
//   const [selectedStudents, setSelectedStudents] = useState([]);
//   const [activityLog, setActivityLog] = useState([]);
//   const [currentDocument, setCurrentDocument] = useState(null);
//   const [pagination, setPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     itemsPerPage: 10
//   });

//   // Appointment state
//   const [appointments, setAppointments] = useState([]);
//   const [filteredAppointments, setFilteredAppointments] = useState([]);
//   const [appointmentFilter, setAppointmentFilter] = useState('all');
//   const [dateFilter, setDateFilter] = useState({
//     start: new Date().toISOString().split('T')[0],
//     end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
//   });
//   const [showCreateAppointmentModal, setShowCreateAppointmentModal] = useState(false);
//   const [showEditAppointmentModal, setShowEditAppointmentModal] = useState(false);
//   const [showCalendarView, setShowCalendarView] = useState(false);
//   const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
//   const [selectedAppointment, setSelectedAppointment] = useState(null);
//   const [appointmentPagination, setAppointmentPagination] = useState({
//     currentPage: 1,
//     totalPages: 1,
//     totalItems: 0,
//     itemsPerPage: 10
//   });

//   // Review form state
//   const [reviewForm, setReviewForm] = useState({
//     advisorNotes: '',
//     recommendedFaculty: '',
//     recommendedDepartment: '',
//     careerAdvice: '',
//     nextSteps: '',
//     approved: false
//   });

//   // Bulk review form
//   const [bulkReviewForm, setBulkReviewForm] = useState({
//     approved: false,
//     advisorNotes: ''
//   });

//   // Appointment form state
//   const [appointmentForm, setAppointmentForm] = useState({
//     date: '',
//     startTime: '',
//     endTime: '',
//     duration: 30,
//     isRecurring: false,
//     recurringPattern: 'weekly',
//     recurringEndDate: '',
//     notes: '',
//     meetingType: 'in-person', // 'in-person', 'online'
//     meetingLink: ''
//   });

//   // Pie chart functions
//   const RADIAN = Math.PI / 180;
//   const renderCustomizedLabel = ({
//     cx,
//     cy,
//     midAngle,
//     innerRadius,
//     outerRadius,
//     percent
//   }) => {
//     const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
//     const x = cx + radius * Math.cos(-midAngle * RADIAN);
//     const y = cy + radius * Math.sin(-midAngle * RADIAN);

//     return (
//       <text
//         x={x}
//         y={y}
//         fill="white"
//         textAnchor={x > cx ? "start" : "end"}
//         dominantBaseline="central"
//       >
//         {`${(percent * 100).toFixed(0)}%`}
//       </text>
//     );
//   };

//   // Transform grade distribution data for pie chart
//   const transformGradeDataForPieChart = (gradeDistribution) => {
//     if (!gradeDistribution || !Array.isArray(gradeDistribution)) {
//       return [];
//     }
    
//     return gradeDistribution.map(grade => ({
//       name: `${grade._id}%`, // Grade percentage
//       value: grade.count,     // Number of students
//       grade: grade._id        // Keep original grade for reference
//     }));
//   };

//   // Transform faculty distribution data for bar chart
//   const transformFacultyDataForBarChart = (facultyDistribution) => {
//     if (!facultyDistribution || !Array.isArray(facultyDistribution)) {
//       return [];
//     }
    
//     return facultyDistribution.map(faculty => ({
//       name: faculty._id.length > 20 ? faculty._id.substring(0, 20) + '...' : faculty._id,
//       fullName: faculty._id,
//       students: faculty.count,
//       uv: faculty.count // For compatibility with bar chart
//     }));
//   };

//   // Transform program preferences data for triangle bar chart
//   const transformProgramDataForBarChart = (programPreferences) => {
//     if (!programPreferences || !Array.isArray(programPreferences)) {
//       return [];
//     }
    
//     return programPreferences.map((program, index) => ({
//       name: program._id.length > 15 ? program._id.substring(0, 15) + '...' : program._id,
//       fullName: program._id,
//       uv: program.count, // For triangle bar chart
//       students: program.count
//     }));
//   };

//   // Triangle Bar Shape Component
//   const getPath = (x, y, width, height) => {
//     return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
//     ${x + width / 2}, ${y}
//     C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
//     Z`;
//   };

//   const TriangleBar = (props) => {
//     const { fill, x, y, width, height } = props;
//     return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
//   };

//   // Handle faculty bar click
//   const handleFacultyBarClick = (data, index) => {
//     setActiveFacultyIndex(index);
//   };

//   useEffect(() => {
//     if (activeTab === 'overview') {
//       fetchDashboardData();
//       fetchAnalytics();
//     } else if (activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved') {
//       fetchStudents();
//     } else if (activeTab === 'transfer') {
//       fetchTransferStudents();
//     } else if (activeTab === 'activity') {
//       fetchActivityLog();
//     } else if (activeTab === 'analytics') {
//       fetchAnalytics();
//     } else if (activeTab === 'appointments') {
//       fetchAppointments();
//     }
//   }, [activeTab, pagination.currentPage]);

//   useEffect(() => {
//     filterStudents();
//   }, [students, searchTerm, filterStatus]);

//   useEffect(() => {
//     filterAppointments();
//   }, [appointments, appointmentFilter, dateFilter]);

//   const fetchDashboardData = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/student/profiles/statistics', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setStatistics(data.statistics || {});
//       } else {
//         Notify.failure('Failed to fetch dashboard data');
//       }
//     } catch (error) {
//       Notify.failure('Error loading dashboard');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStudents = async (page = 1) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       let endpoint = '';
//       switch (activeTab) {
//         case 'students':
//           endpoint = 'http://localhost:5000/api/student/allprofiles';
//           break;
//         case 'pending':
//           endpoint = 'http://localhost:5000/api/student/profiles/status/pending';
//           break;
//         case 'approved':
//           endpoint = 'http://localhost:5000/api/student/profiles/status/approved';
//           break;
//         default:
//           endpoint = 'http://localhost:5000/api/student/allprofiles';
//       }
//       const response = await fetch(endpoint, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         let studentsArray = [];
//         if (data.data && data.data.profiles) {
//           studentsArray = data.data.profiles;
//           setPagination(data.data.pagination || pagination);
//         } else if (data.profiles) {
//           studentsArray = data.profiles;
//         } else if (Array.isArray(data.data)) {
//           studentsArray = data.data;
//         } else if (Array.isArray(data)) {
//           studentsArray = data;
//         }
//         setStudents(studentsArray);
//       } else {
//         if (response.status === 403) {
//           Notify.failure('Access denied. Please check your permissions.');
//         } else if (response.status === 404) {
//           Notify.failure('Endpoint not found. Please check your backend routes.');
//         } else {
//           Notify.failure('Failed to fetch students');
//         }
//       }
//     } catch (error) {
//       Notify.failure('Error loading students');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Fetch transfer students
//   const fetchTransferStudents = async (page = 1) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/student/transfer-students`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setStudents(data.data.students || []);
//         setPagination(data.data.pagination || pagination);
//       } else {
//         Notify.failure('Failed to fetch transfer students');
//       }
//     } catch (error) {
//       Notify.failure('Error loading transfer students');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchAnalytics = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/student/profiles/analytics', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setAnalytics(data.data || {});
//       } else {
//         setAnalytics({ gradeDistribution: [], programPreferences: [], facultyDistribution: [] });
//       }
//     } catch (error) {
//       setAnalytics({ gradeDistribution: [], programPreferences: [], facultyDistribution: [] });
//     }
//   };

//   const fetchActivityLog = async (page = 1) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/advisor/activity-log?page=${page}&limit=20`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setActivityLog(data.data.activities || []);
//         setPagination(data.data.pagination || pagination);
//       } else {
//         setActivityLog([]);
//       }
//     } catch (error) {
//       setActivityLog([]);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Appointment Management Functions
//   const fetchAppointments = async (page = 1) => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/advisor/appointments?page=${page}&limit=10`, {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
//       if (response.ok) {
//         const data = await response.json();
//         setAppointments(data.data.appointments || []);
//         setAppointmentPagination(data.data.pagination || appointmentPagination);
//       } else {
//         setAppointments([]);
//         Notify.failure('Failed to fetch appointments');
//       }
//     } catch (error) {
//       setAppointments([]);
//       Notify.failure('Error loading appointments');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const filterAppointments = () => {
//     let filtered = appointments;
    
//     // Filter by status
//     if (appointmentFilter !== 'all') {
//       filtered = filtered.filter(appointment => appointment.status === appointmentFilter);
//     }
    
//     // Filter by date range
//     if (dateFilter.start || dateFilter.end) {
//       filtered = filtered.filter(appointment => {
//         const appointmentDate = new Date(appointment.date);
//         const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
//         const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
        
//         if (startDate && appointmentDate < startDate) return false;
//         if (endDate && appointmentDate > endDate) return false;
//         return true;
//       });
//     }
    
//     setFilteredAppointments(filtered);
//   };

//   const handleCreateAppointment = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/advisor/appointments', {
//         method: 'POST', 
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(appointmentForm)
//       });
      
//       if (response.ok) {
//         Notify.success('Appointment slot created successfully');
//         setShowCreateAppointmentModal(false);
//         setAppointmentForm({
//           date: '',
//           startTime: '',
//           endTime: '',
//           duration: 30,
//           isRecurring: false,
//           recurringPattern: 'weekly',
//           recurringEndDate: '',
//           notes: '',
//           meetingType: 'in-person',
//           meetingLink: ''
//         });
//         fetchAppointments();
//       } else {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to create appointment');
//       }
//     } catch (error) {
//       Notify.failure('Failed to create appointment: ' + error.message);
//     }
//   };

//   const handleEditAppointment = (appointment) => {
//     setSelectedAppointment(appointment);
//     setAppointmentForm({
//       date: appointment.date.split('T')[0],
//       startTime: appointment.startTime,
//       endTime: appointment.endTime,
//       duration: appointment.duration || 30,
//       isRecurring: false,
//       recurringPattern: 'weekly',
//       recurringEndDate: '',
//       notes: appointment.notes || '',
//       meetingType: appointment.meetingType || 'in-person',
//       meetingLink: appointment.meetingLink || ''
//     });
//     setShowEditAppointmentModal(true);
//   };

//   const handleUpdateAppointment = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/advisor/appointments/${selectedAppointment._id}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(appointmentForm)
//       });
      
//       if (response.ok) {
//         Notify.success('Appointment updated successfully');
//         setShowEditAppointmentModal(false);
//         fetchAppointments();
//       } else {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to update appointment');
//       }
//     } catch (error) {
//       Notify.failure('Failed to update appointment: ' + error.message);
//     }
//   };

//   const handleDeleteAppointment = async (appointmentId) => {
//     if (!window.confirm('Are you sure you want to delete this appointment slot?')) {
//       return;
//     }
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/advisor/appointments/${appointmentId}`, {
//         method: 'DELETE',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       if (response.ok) {
//         Notify.success('Appointment deleted successfully');
//         fetchAppointments();
//       } else {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to delete appointment');
//       }
//     } catch (error) {
//       Notify.failure('Failed to delete appointment: ' + error.message);
//     }
//   };

//   const handleCancelAppointment = async (appointmentId) => {
//     if (!window.confirm('Are you sure you want to cancel this appointment?')) {
//       return;
//     }
    
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/advisor/appointments/${appointmentId}/cancel`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       if (response.ok) {
//         Notify.success('Appointment cancelled successfully');
//         fetchAppointments();
//       } else {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to cancel appointment');
//       }
//     } catch (error) {
//       Notify.failure('Failed to cancel appointment: ' + error.message);
//     }
//   };

//   const handleStartAppointment = async (appointment) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/advisor/appointments/${appointment._id}/start`, {
//         method: 'PUT',
//         headers: { 'Authorization': `Bearer ${token}` }
//       });
      
//       if (response.ok) {
//         Notify.success('Appointment started');
//         fetchAppointments();
        
//         // Open meeting link if available
//         if (appointment.meetingLink) {
//           window.open(appointment.meetingLink, '_blank');
//         }
//       } else {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to start appointment');
//       }
//     } catch (error) {
//       Notify.failure('Failed to start appointment: ' + error.message);
//     }
//   };

//   const handleCompleteAppointment = async (appointmentId, notes = '') => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/advisor/appointments/${appointmentId}/complete`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ notes })
//       });
      
//       if (response.ok) {
//         Notify.success('Appointment marked as completed');
//         fetchAppointments();
//       } else {
//         const error = await response.json();
//         throw new Error(error.message || 'Failed to complete appointment');
//       }
//     } catch (error) {
//       Notify.failure('Failed to complete appointment: ' + error.message);
//     }
//   };

//   const handleRescheduleAppointment = (appointment) => {
//     setSelectedAppointment(appointment);
//     setAppointmentForm({
//       date: '',
//       startTime: '',
//       endTime: '',
//       duration: appointment.duration || 30,
//       isRecurring: false,
//       recurringPattern: 'weekly',
//       recurringEndDate: '',
//       notes: appointment.notes || '',
//       meetingType: appointment.meetingType || 'in-person',
//       meetingLink: appointment.meetingLink || ''
//     });
//     setShowEditAppointmentModal(true);
//   };

//   const handleViewAppointmentDetails = (appointment) => {
//     setSelectedAppointment(appointment);
//     // You can create a detail modal here if needed
//     Notify.info(`Appointment details for ${appointment.student?.name || 'Available slot'}`);
//   };

//   // Calendar helper functions
//   const generateCalendarDays = (date) => {
//     const year = date.getFullYear();
//     const month = date.getMonth();
//     const firstDay = new Date(year, month, 1);
//     const lastDay = new Date(year, month + 1, 0);
//     const startDate = new Date(firstDay);
//     startDate.setDate(startDate.getDate() - firstDay.getDay());
    
//     const days = [];
//     const currentDate = new Date(startDate);
    
//     for (let i = 0; i < 42; i++) {
//       days.push({
//         date: new Date(currentDate),
//         isCurrentMonth: currentDate.getMonth() === month,
//         isToday: currentDate.toDateString() === new Date().toDateString()
//       });
//       currentDate.setDate(currentDate.getDate() + 1);
//     }
    
//     return days;
//   };

//   const getAppointmentsForDate = (date) => {
//     return appointments.filter(appointment => {
//       const appointmentDate = new Date(appointment.date);
//       return appointmentDate.toDateString() === date.toDateString();
//     });
//   };

//   const handleCalendarDayClick = (date) => {
//     const dayAppointments = getAppointmentsForDate(date);
//     if (dayAppointments.length > 0) {
//       // Show appointments for this day
//       setFilteredAppointments(dayAppointments);
//       setShowCalendarView(false);
//     } else {
//       // Create new appointment for this date
//       setAppointmentForm(prev => ({
//         ...prev,
//         date: date.toISOString().split('T')[0]
//       }));
//       setShowCreateAppointmentModal(true);
//     }
//   };

//   const isAppointmentTime = (appointment) => {
//     const now = new Date();
//     const appointmentDateTime = new Date(`${appointment.date} ${appointment.startTime}`);
//     const timeDiff = appointmentDateTime.getTime() - now.getTime();
    
//     // Allow starting 15 minutes before and up to the end time
//     return timeDiff <= 15 * 60 * 1000 && timeDiff >= -appointment.duration * 60 * 1000;
//   };

//   // Review handlers
//   const handleReviewStudent = async (student) => {
//     try {
//       const token = localStorage.getItem('token');
//       try {
//         const response = await fetch(`http://localhost:5000/api/advisor/profiles/${student._id}/detailed`, {
//           headers: { 'Authorization': `Bearer ${token}` }
//         });
//         if (response.ok) {
//           const data = await response.json();
//           setSelectedStudent(data.data.profile);
//         } else {
//           setSelectedStudent(student);
//         }
//       } catch {
//         setSelectedStudent(student);
//       }
//       setReviewForm({
//         advisorNotes: student.advisorNotes || '',
//         recommendedFaculty: student.recommendedFaculty || student.aiRecommendations?.recommendedFaculty || '',
//         recommendedDepartment: student.recommendedDepartment || student.aiRecommendations?.recommendedDepartment || '',
//         careerAdvice: student.careerAdvice || student.aiRecommendations?.careerAdvice || '',
//         nextSteps: student.nextSteps || '',
//         approved: student.isStudentApproved || false
//       });
//       setShowReviewModal(true);
//     } catch (error) {
//       setSelectedStudent(student);
//       setShowReviewModal(true);
//     }
//   };

//   // Document handlers
//   const viewDocument = (profileId, documentType, fileName, originalName) => {
//     const token = localStorage.getItem('token');
//     const viewUrl = `http://localhost:5000/api/advisor/profiles/${profileId}/view/${documentType}/${fileName}?token=${token}`;
//     setCurrentDocument({
//       url: viewUrl,
//       name: originalName || fileName,
//       type: documentType
//     });
//     setShowDocumentModal(true);
//   };

//   const downloadDocument = async (profileId, documentType, fileName) => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         Notify.failure('Please log in to download documents');
//         return;
//       }
//       Notify.info('Preparing download...');
//       const response = await fetch(
//         `http://localhost:5000/api/profiles/${profileId}/download/${documentType}/${fileName}`,
//         { headers: { 'Authorization': `Bearer ${token}`, 'Accept': '*/*' } }
//       );
//       if (response.ok) {
//         const blob = await response.blob();
//         const cd = response.headers.get('Content-Disposition');
//         let downloadFileName = fileName;
//         if (cd) {
//           const m = cd.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
//           if (m && m[1]) downloadFileName = m[1].replace(/['"]/g, '');
//         }
//         const url = window.URL.createObjectURL(blob);
//         const a = document.createElement('a');
//         a.href = url;
//         a.download = downloadFileName;
//         a.style.display = 'none';
//         document.body.appendChild(a);
//         a.click();
//         setTimeout(() => {
//           window.URL.revokeObjectURL(url);
//           document.body.removeChild(a);
//         }, 100);
//         Notify.success(`Document "${downloadFileName}" downloaded successfully`);
//       } else {
//         let msg = 'Failed to download document';
//         try {
//           const err = await response.json();
//           msg = err.message || msg;
//           if (response.status === 404) msg = 'Document not found on server';
//           else if (response.status === 403) msg = 'Access denied. Please check your permissions.';
//           else if (response.status === 500) msg = 'Server error. Please try again later.';
//         } catch {}
//         throw new Error(msg);
//       }
//     } catch (error) {
//       Notify.failure(error.message || 'Failed to download document');
//     }
//   };

//   // Helpers
//   const filterStudents = () => {
//     let filtered = students;
//     if (searchTerm) {
//       filtered = filtered.filter(student =>
//         student.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.nationality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.desiredFaculty?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }
//     if (filterStatus !== 'all') {
//       filtered = filtered.filter(student => {
//         switch (filterStatus) {
//           case 'pending': return !student.isStudentApproved;
//           case 'approved': return student.isStudentApproved;
//           case 'transfer': return student.transferStudent;
//           default: return true;
//         }
//       });
//     }
//     setFilteredStudents(filtered);
//   };

//   const handleSearch = () => {
//     if (activeTab === 'transfer') {
//       fetchTransferStudents();
//     } else {
//       fetchStudents();
//     }
//   };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/admin/approve-profile', {
//         method: 'PUT',
//         headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//         body: JSON.stringify({
//           profileId: selectedStudent._id,
//           approved: reviewForm.approved,
//           advisorNotes: reviewForm.advisorNotes
//         })
//       });
//       if (response.ok) {
//         Notify.success('Review submitted successfully');
//         setShowReviewModal(false);
//         if (activeTab === 'transfer') fetchTransferStudents(); else fetchStudents();
//         if (activeTab === 'overview') fetchDashboardData();
//       } else {
//         const err = await response.json();
//         throw new Error(err.message || 'Failed to submit review');
//       }
//     } catch (error) {
//       Notify.failure('Failed to submit review: ' + error.message);
//     }
//   };

//   const handleBulkReview = () => {
//     if (selectedStudents.length === 0) {
//       Notify.warning('Please select students to review');
//       return;
//     }
//     setShowBulkModal(true);
//   };

//   const handleSubmitBulkReview = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       for (const studentId of selectedStudents) {
//         await fetch('http://localhost:5000/api/admin/approve-profile', {
//           method: 'PUT',
//           headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
//           body: JSON.stringify({
//             profileId: studentId,
//             approved: bulkReviewForm.approved,
//             advisorNotes: bulkReviewForm.advisorNotes
//           })
//         });
//       }
//       Notify.success(`Bulk review completed for ${selectedStudents.length} students`);
//       setShowBulkModal(false);
//       setSelectedStudents([]);
//       setBulkReviewForm({ approved: false, advisorNotes: '' });
//       if (activeTab === 'transfer') fetchTransferStudents(); else fetchStudents();
//       if (activeTab === 'overview') fetchDashboardData();
//     } catch (error) {
//       Notify.failure('Failed to submit bulk review');
//     }
//   };

//   const handleSelectStudent = (studentId) => {
//     setSelectedStudents(prev =>
//       prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
//     );
//   };

//   const handleSelectAllStudents = () => {
//     if (selectedStudents.length === filteredStudents.length) {
//       setSelectedStudents([]);
//     } else {
//       setSelectedStudents(filteredStudents.map(student => student._id));
//     }
//   };

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to logout?')) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       Notify.success('Logged out successfully!');
//       setTimeout(() => { window.location.href = '/'; }, 1000);
//     }
//   };

//   const getStatusBadge = (student) => {
//     if (student.isStudentApproved) {
//       return <span className="status-badge approved">Approved</span>;
//     }
//     return <span className="status-badge pending">Pending Review</span>;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not provided';
//     return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
//   };

//   const facultyOptions = [
//     'Faculty of Business Administration',
//     'Faculty of Information Technology',
//     'Faculty of Health Sciences',
//     'Faculty of Medicine',
//     'Faculty in Education',
//     'Bachelor Of Theology'
//   ];

//   const getDepartmentOptions = (faculty) => {
//     const departments = {
//       'Faculty of Business Administration': [
//         'BBA In Accounting', 'BBA In Management', 'BBA in Finance', 'BBA in Marketing',
//         'MBA in Accounting', 'MBA In Management', 'MBA In Finance', 'MBA in Human Resource Management', 'MBA in Project Management'
//       ],
//       'Faculty of Information Technology': [
//         'BSc in Information Management', 'BSc in Networks and Communication Systems',
//         'BSc in Software Engineering', 'Master Of Science In Data Analytics'
//       ],
//       'Faculty of Health Sciences': [
//         'Bachelor of Science in Nursing', 'Bachelor of Science in Midwifery'
//       ],
//       'Faculty of Medicine': ['MD Of General Medicine'],
//       'Faculty in Education': [
//         'BA in Accounting and Information Technology', 'BA in English Language and Literature and French',
//         'BA In Geography and History', 'Master of Art in Educational Administration', 'Master of Art In Curriculum, Instructions and Supervision'
//       ],
//       'Bachelor Of Theology': ['Bachelor of Theology']
//     };
//     return departments[faculty] || [];
//   };

//   // Loading screen for overview fetch
//   if (loading && activeTab === 'overview') {
//     return (
//       <div className="advisor-dashboard">
//         <div className="dashboard-layout">
//           <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
//             <div className="sidebar-header">
//               <div className="brand">🎓 Advisor</div>
//             </div>
//             <nav className="sidebar-nav">
//               {SIDEBAR_ITEMS.map(tab => (
//                 <button
//                   key={tab.id}
//                   onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
//                   className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
//                 >
//                   <span className="tab-icon">{tab.icon}</span>
//                   <span className="tab-label">{tab.label}</span>
//                 </button>
//               ))}
//             </nav>
//             <div className="sidebar-footer">
//               <button className="logout-btn" onClick={handleLogout}>Logout</button>
//             </div>
//           </aside>

//           <main className="main-content">
//             <div className="topbar">
//               <button
//                 className="sidebar-toggle"
//                 onClick={() => setSidebarOpen(prev => !prev)}
//                 aria-label="Toggle sidebar"
//               >
//                 ☰
//               </button>
//               <h1 className="topbar-title">Advisor Dashboard</h1>
//             </div>

//             <div className="loading-container">
//               <div className="loading-spinner"></div>
//               <h2>Loading Advisor Dashboard...</h2>
//             </div>
//           </main>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="advisor-dashboard">
//       <div className="dashboard-layout">
//         {/* Sidebar */}
//         <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
//           <div className="sidebar-header">
//             <div className="brand">🎓 Advisor</div>
//           </div>
//           <nav className="sidebar-nav">
//             {SIDEBAR_ITEMS.map(tab => (
//               <button
//                 key={tab.id}
//                 onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
//                 className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
//               >
//                 <span className="tab-icon">{tab.icon}</span>
//                 <span className="tab-label">{tab.label}</span>
//               </button>
//             ))}
//           </nav>
//           <div className="sidebar-footer">
//             <button className="logout-btn" onClick={handleLogout}>Logout</button>
//           </div>
//         </aside>

//         {/* Main content */}
//         <main className="main-content">
//           {/* Topbar for small screens */}
//           <div className="topbar">
//             <button
//               className="sidebar-toggle"
//               onClick={() => setSidebarOpen(prev => !prev)}
//               aria-label="Toggle sidebar"
//             >
//               ☰
//             </button>
//             <h1 className="topbar-title">Advisor Dashboard</h1>
//           </div>

//           {/* Overview Tab */}
//           {activeTab === 'overview' && (
//             <div className="tab-content">
//               <div className="stats-grid">
//                 <div className="stat-card">
//                   <div className="stat-icon">👥</div>
//                   <div className="stat-content">
//                     <div className="stat-value">{statistics.total || 0}</div>
//                     <div className="stat-label">Total Profiles</div>
//                   </div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-icon">⏳</div>
//                   <div className="stat-content">
//                     <div className="stat-value">{statistics.pending || 0}</div>
//                     <div className="stat-label">Pending Review</div>
//                   </div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-icon">✅</div>
//                   <div className="stat-content">
//                     <div className="stat-value">{statistics.approved || 0}</div>
//                     <div className="stat-label">Approved</div>
//                   </div>
//                 </div>
//                 <div className="stat-card">
//                   <div className="stat-icon">📈</div>
//                   <div className="stat-content">
//                     <div className="stat-value">{statistics.recent || 0}</div>
//                     <div className="stat-label">Recent (7 days)</div>
//                   </div>
//                 </div>
//               </div>

//               <div className="overview-charts">
//                 <div className="chart-card">
//                   <h3>Approval Rate</h3>
//                   <div className="progress-circle">
//                     <div className="progress-text">{statistics.approvalRate || 0}%</div>
//                   </div>
//                 </div>
//                 <div className="chart-card">
//                   <h3>Recent Activity</h3>
//                   <div className="activity-summary">
//                     <p>Reviews processed this week</p>
//                     <div className="activity-number">{statistics.recent || 0}</div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Appointments Tab */}
//           {activeTab === 'appointments' && (
//             <div className="tab-content">
//               <div className="appointments-header">
//                 <h3>Appointment Management</h3>
//                 <div className="appointment-actions">
//                   <button 
//                     onClick={() => setShowCreateAppointmentModal(true)} 
//                     className="create-appointment-btn"
//                   >
//                     <span className="btn-icon">📅</span>
//                     Create Slot
//                   </button>
//                   <button 
//                     onClick={() => setShowCalendarView(prev => !prev)} 
//                     className={`calendar-toggle-btn ${showCalendarView ? 'active' : ''}`}
//                   >
//                     <span className="btn-icon">{showCalendarView ? '📋' : '📅'}</span>
//                     {showCalendarView ? 'List View' : 'Calendar View'}
//                   </button>
//                 </div>
//               </div>

//               {/* Appointment Filters */}
//               <div className="appointment-filters">
//                 <div className="filter-group">
//                   <label>Status:</label>
//                   <select 
//                     value={appointmentFilter} 
//                     onChange={(e) => setAppointmentFilter(e.target.value)}
//                     className="filter-select"
//                   >
//                     <option value="all">All Appointments</option>
//                     <option value="available">Available Slots</option>
//                     <option value="booked">Booked</option>
//                     <option value="completed">Completed</option>
//                     <option value="cancelled">Cancelled</option>
//                   </select>
//                 </div>
//                 <div className="filter-group">
//                   <label>Date Range:</label>
//                   <input 
//                     type="date" 
//                     value={dateFilter.start}
//                     onChange={(e) => setDateFilter(prev => ({...prev, start: e.target.value}))}
//                     className="date-input"
//                   />
//                   <span>to</span>
//                   <input 
//                     type="date" 
//                     value={dateFilter.end}
//                     onChange={(e) => setDateFilter(prev => ({...prev, end: e.target.value}))}
//                     className="date-input"
//                   />
//                 </div>
//                 <button onClick={fetchAppointments} className="filter-apply-btn">
//                   Apply Filter
//                 </button>
//               </div>

//               {showCalendarView ? (
//                 /* Calendar View */
//                 <div className="calendar-view">
//                   <div className="calendar-header">
//                     <button 
//                       onClick={() => setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
//                       className="calendar-nav-btn"
//                     >
//                       ‹
//                     </button>
//                     <h3 className="calendar-title">
//                       {currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
//                     </h3>
//                     <button 
//                       onClick={() => setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
//                       className="calendar-nav-btn"
//                     >
//                       ›
//                     </button>
//                   </div>
//                   <div className="calendar-grid">
//                     <div className="calendar-days-header">
//                       {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
//                         <div key={day} className="calendar-day-header">{day}</div>
//                       ))}
//                     </div>
//                     <div className="calendar-days">
//                       {generateCalendarDays(currentCalendarDate).map((day, index) => (
//                         <div 
//                           key={index} 
//                           className={`calendar-day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${day.isToday ? 'today' : ''}`}
//                           onClick={() => handleCalendarDayClick(day.date)}
//                         >
//                           <span className="day-number">{day.date.getDate()}</span>
//                           <div className="day-appointments">
//                             {getAppointmentsForDate(day.date).slice(0, 3).map((apt, i) => (
//                               <div key={i} className={`mini-appointment ${apt.status}`}>
//                                 {apt.time} - {apt.status === 'booked' ? apt.studentName : 'Available'}
//                               </div>
//                             ))}
//                             {getAppointmentsForDate(day.date).length > 3 && (
//                               <div className="more-appointments">+{getAppointmentsForDate(day.date).length - 3} more</div>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 </div>
//               ) : (
//                 /* List View */
//                 <div className="appointments-list">
//                   {loading ? (
//                     <div className="loading-appointments">
//                       <div className="loading-spinner"></div>
//                       <p>Loading appointments...</p>
//                     </div>
//                   ) : filteredAppointments.length > 0 ? (
//                     <div className="appointments-grid">
//                       {filteredAppointments.map((appointment) => (
//                         <div key={appointment._id} className={`appointment-card ${appointment.status}`}>
//                           <div className="appointment-header">
//                             <div className="appointment-time">
//                               <span className="appointment-date">
//                                 {new Date(appointment.date).toLocaleDateString('en-US', {
//                                   weekday: 'short',
//                                   month: 'short',
//                                   day: 'numeric'
//                                 })}
//                               </span>
//                               <span className="appointment-time-slot">
//                                 {appointment.startTime} - {appointment.endTime}
//                               </span>
//                             </div>
//                             <div className={`appointment-status-badge ${appointment.status}`}>
//                               {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
//                             </div>
//                           </div>

//                           <div className="appointment-content">
//                             {appointment.status === 'booked' && appointment.student ? (
//                               <div className="appointment-student-info">
//                                 <div className="student-avatar-small">
//                                   {appointment.student.name?.charAt(0) || 'S'}
//                                 </div>
//                                 <div className="student-details">
//                                   <h4 className="student-name">{appointment.student.name}</h4>
//                                   <p className="student-email">{appointment.student.email}</p>
//                                   <p className="appointment-purpose">{appointment.purpose || 'General consultation'}</p>
//                                 </div>
//                               </div>
//                             ) : (
//                               <div className="appointment-available">
//                                 <div className="available-icon">📅</div>
//                                 <p className="available-text">Available slot</p>
//                                 <p className="slot-duration">{appointment.duration} minutes</p>
//                               </div>
//                             )}

//                             {appointment.notes && (
//                               <div className="appointment-notes">
//                                 <strong>Notes:</strong> {appointment.notes}
//                               </div>
//                             )}

//                             {appointment.meetingLink && (
//                               <div className="meeting-link">
//                                 <a href={appointment.meetingLink} target="_blank" rel="noopener noreferrer" className="meeting-link-btn">
//                                   🎥 Join Meeting
//                                 </a>
//                               </div>
//                             )}
//                           </div>

//                           <div className="appointment-actions">
//                             {appointment.status === 'available' && (
//                               <>
//                                 <button 
//                                   onClick={() => handleEditAppointment(appointment)}
//                                   className="action-btn edit-btn"
//                                 >
//                                   ✏️ Edit
//                                 </button>
//                                 <button 
//                                   onClick={() => handleDeleteAppointment(appointment._id)}
//                                   className="action-btn delete-btn"
//                                 >
//                                   🗑️ Delete
//                                 </button>
//                               </>
//                             )}
                            
//                             {appointment.status === 'booked' && (
//                               <>
//                                 <button 
//                                   onClick={() => handleStartAppointment(appointment)}
//                                   className="action-btn start-btn"
//                                   disabled={!isAppointmentTime(appointment)}
//                                 >
//                                   🎯 Start
//                                 </button>
//                                 <button 
//                                   onClick={() => handleRescheduleAppointment(appointment)}
//                                   className="action-btn reschedule-btn"
//                                 >
//                                   🔄 Reschedule
//                                 </button>
//                                 <button 
//                                   onClick={() => handleCancelAppointment(appointment._id)}
//                                   className="action-btn cancel-btn"
//                                 >
//                                   ❌ Cancel
//                                 </button>
//                               </>
//                             )}

//                             {appointment.status === 'completed' && (
//                               <button 
//                                 onClick={() => handleViewAppointmentDetails(appointment)}
//                                 className="action-btn view-btn"
//                               >
//                                 👁️ View Details
//                               </button>
//                             )}
//                           </div>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <div className="no-appointments">
//                       <div className="no-appointments-icon">📅</div>
//                       <h3>No appointments found</h3>
//                       <p>Create your first appointment slot to get started</p>
//                       <button 
//                         onClick={() => setShowCreateAppointmentModal(true)} 
//                         className="create-first-appointment-btn"
//                       >
//                         Create Appointment Slot
//                       </button>
//                     </div>
//                   )}
//                 </div>
//               )}

//               {/* Pagination for appointments */}
//               {appointmentPagination.totalPages > 1 && (
//                 <div className="pagination">
//                   <button
//                     onClick={() => fetchAppointments(appointmentPagination.currentPage - 1)}
//                     disabled={!appointmentPagination.hasPrevPage}
//                     className="pagination-btn"
//                   >
//                     Previous
//                   </button>
//                   <span className="pagination-info">
//                     Page {appointmentPagination.currentPage} of {appointmentPagination.totalPages}
//                   </span>
//                   <button
//                     onClick={() => fetchAppointments(appointmentPagination.currentPage + 1)}
//                     disabled={!appointmentPagination.hasNextPage}
//                     className="pagination-btn"
//                   >
//                     Next
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Rest of your existing tabs... */}
//           {/* Analytics Tab */}
//           {activeTab === 'analytics' && (
//             <div className="tab-content">
//               <div className="analytics-section">
//                 <h3>Grade Distribution</h3>
//                 <div className="chart-container">
//                   {analytics.gradeDistribution && analytics.gradeDistribution.length > 0 ? (
//                     <div className="pie-chart-container" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
//                       <div className="pie-chart-wrapper">
//                         <PieChart width={400} height={400}>
//                           <Pie
//                             data={transformGradeDataForPieChart(analytics.gradeDistribution)}
//                             cx={200}
//                             cy={200}
//                             labelLine={false}
//                             label={renderCustomizedLabel}
//                             outerRadius={80}
//                             fill="#8884d8"
//                             dataKey="value"
//                           >
//                             {transformGradeDataForPieChart(analytics.gradeDistribution).map((entry, index) => (
//                               <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
//                             ))}
//                           </Pie>
//                         </PieChart>
//                       </div>
//                       <div className="pie-chart-legend" style={{ flex: 1 }}>
//                         <h4 style={{ marginBottom: '1rem', color: '#333' }}>Grade Breakdown</h4>
//                         {transformGradeDataForPieChart(analytics.gradeDistribution).map((entry, index) => (
//                           <div key={index} className="legend-item" style={{ 
//                             display: 'flex', 
//                             alignItems: 'center', 
//                             marginBottom: '0.8rem',
//                             padding: '0.5rem',
//                             backgroundColor: '#f8f9fa',
//                             borderRadius: '6px',
//                             border: '1px solid #e9ecef'
//                           }}>
//                             <div 
//                               className="legend-color" 
//                               style={{ 
//                                 backgroundColor: COLORS[index % COLORS.length],
//                                 width: '16px',
//                                 height: '16px',
//                                 borderRadius: '4px',
//                                 marginRight: '12px',
//                                 flexShrink: 0
//                               }}
//                             ></div>
//                             <span className="legend-text" style={{ 
//                               fontSize: '14px',
//                               fontWeight: '500',
//                               color: '#495057'
//                             }}>
//                               {entry.name}: {entry.value} students
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   ) : (
//                     <div className="no-data">
//                       <p>No grade distribution data available</p>
//                     </div>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Add all your existing modals here... */}

//           {/* Create Appointment Modal */}
//           {showCreateAppointmentModal && (
//             <div className="modal-overlay">
//               <div className="modal-content large-modal">
//                 <div className="modal-header">
//                   <h2>Create Appointment Slot</h2>
//                   <button onClick={() => setShowCreateAppointmentModal(false)} className="modal-close">✕</button>
//                 </div>

//                 <form onSubmit={handleCreateAppointment} className="appointment-form">
//                   <div className="form-row">
//                     <div className="form-group">
//                       <label className="form-label">Date *</label>
//                       <input
//                         type="date"
//                         value={appointmentForm.date}
//                         onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
//                         className="form-input"
//                         required
//                         min={new Date().toISOString().split('T')[0]}
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label className="form-label">Duration (minutes) *</label>
//                       <select
//                         value={appointmentForm.duration}
//                         onChange={(e) => setAppointmentForm({ ...appointmentForm, duration: parseInt(e.target.value) })}
//                         className="form-select"
//                         required
//                       >
//                         <option value={15}>15 minutes</option>
//                         <option value={30}>30 minutes</option>
//                         <option value={45}>45 minutes</option>
//                         <option value={60}>1 hour</option>
//                         <option value={90}>1.5 hours</option>
//                         <option value={120}>2 hours</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-row">
//                     <div className="form-group">
//                       <label className="form-label">Start Time *</label>
//                       <input
//                         type="time"
//                         value={appointmentForm.startTime}
//                         onChange={(e) => {
//                           const startTime = e.target.value;
//                           const [hours, minutes] = startTime.split(':');
//                           const startDate = new Date();
//                           startDate.setHours(parseInt(hours), parseInt(minutes));
//                           const endDate = new Date(startDate.getTime() + appointmentForm.duration * 60000);
//                           const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
                          
//                           setAppointmentForm({ 
//                             ...appointmentForm, 
//                             startTime: startTime,
//                             endTime: endTime
//                           });
//                         }}
//                         className="form-input"
//                         required
//                       />
//                     </div>
//                     <div className="form-group">
//                       <label className="form-label">End Time</label>
//                       <input
//                         type="time"
//                         value={appointmentForm.endTime}
//                         readOnly
//                         className="form-input readonly"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-row">
//                     <div className="form-group">
//                       <label className="form-label">Meeting Type *</label>
//                       <select
//                         value={appointmentForm.meetingType}
//                         onChange={(e) => setAppointmentForm({ ...appointmentForm, meetingType: e.target.value })}
//                         className="form-select"
//                         required
//                       >
//                         <option value="in-person">In-Person</option>
//                         <option value="online">Online Meeting</option>
//                         <option value="phone">Phone Call</option>
//                       </select>
//                     </div>
//                     {appointmentForm.meetingType === 'online' && (
//                       <div className="form-group">
//                         <label className="form-label">Meeting Link</label>
//                         <input
//                           type="url"
//                           value={appointmentForm.meetingLink}
//                           onChange={(e) => setAppointmentForm({ ...appointmentForm, meetingLink: e.target.value })}
//                           className="form-input"
//                           placeholder="https://zoom.us/j/123456789 or Google Meet link"
//                         />
//                         <small className="form-help">Leave empty to auto-generate meeting link</small>
//                       </div>
//                     )}
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">Notes</label>
//                     <textarea
//                       value={appointmentForm.notes}
//                       onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
//                       className="form-textarea"
//                       rows="3"
//                       placeholder="Any additional notes for this appointment slot..."
//                       maxLength="500"
//                     />
//                   </div>

//                   <div className="modal-actions">
//                     <button type="button" onClick={() => setShowCreateAppointmentModal(false)} className="btn-cancel">
//                       Cancel
//                     </button>
//                     <button type="submit" className="btn-submit">
//                       Create Appointment Slot
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}

//         </main>
//       </div>
//     </div>
//   );
// };

// export default AdvisorDashboard;

//advisorDahboard.jsx

//advisorDahboard.jsx

import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";
import './styles/AdvisorDashboard.css';
import './Dashboard_Styles/PieChart.css';

const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'students', label: 'All Students', icon: '👥' },
  { id: 'pending', label: 'Pending Reviews', icon: '⏳' },
  { id: 'approved', label: 'Approved', icon: '✅' },
  { id: 'transfer', label: 'Transfer Students', icon: '🔄' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'appointments', label: 'Appointments', icon: '📅' },
  { id: 'activity', label: 'Activity Log', icon: '📋' }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B", "#4ECDC4", "#45B7D1", "#96CEB4", "#FECA57", "#FF9FF3", "#54A0FF", "#5F27CD"];
const BAR_COLORS = ["#8884D8", "#82CA9D", "#FFC658", "#FF7C7C", "#8DD1E1", "#D084D0", "#FFB347", "#87D68D", "#FFB6C1", "#20B2AA", "#F0E68C", "#DDA0DD", "#98D8C8", "#F7DC6F", "#BB8FCE"];
const PROGRAM_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B', '#4ECDC4', '#45B7D1', '#96CEB4', '#FECA57', '#FF9FF3', '#54A0FF', '#5F27CD', '#20B2AA', '#F0E68C', '#DDA0DD'];

const AdvisorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeFacultyIndex, setActiveFacultyIndex] = useState(0);

  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [statistics, setStatistics] = useState({});
  const [analytics, setAnalytics] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
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
  const [appointmentForm, setAppointmentForm] = useState({
    date: '',
    startTime: '',
    endTime: '',
    duration: 30,
    isRecurring: false,
    recurringPattern: 'weekly',
    recurringEndDate: '',
    notes: '',
    meetingType: 'physical', // Changed from 'in-person' to 'physical'
    meetingLink: ''
  });

  // Pie chart functions
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    percent
  }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text
        x={x}
        y={y}
        fill="white"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Transform grade distribution data for pie chart
  const transformGradeDataForPieChart = (gradeDistribution) => {
    if (!gradeDistribution || !Array.isArray(gradeDistribution)) {
      return [];
    }
    
    return gradeDistribution.map(grade => ({
      name: `${grade._id}%`, // Grade percentage
      value: grade.count,     // Number of students
      grade: grade._id        // Keep original grade for reference
    }));
  };

  // Transform faculty distribution data for bar chart
  const transformFacultyDataForBarChart = (facultyDistribution) => {
    if (!facultyDistribution || !Array.isArray(facultyDistribution)) {
      return [];
    }
    
    return facultyDistribution.map(faculty => ({
      name: faculty._id.length > 20 ? faculty._id.substring(0, 20) + '...' : faculty._id,
      fullName: faculty._id,
      students: faculty.count,
      uv: faculty.count // For compatibility with bar chart
    }));
  };

  // Transform program preferences data for triangle bar chart
  const transformProgramDataForBarChart = (programPreferences) => {
    if (!programPreferences || !Array.isArray(programPreferences)) {
      return [];
    }
    
    return programPreferences.map((program, index) => ({
      name: program._id.length > 15 ? program._id.substring(0, 15) + '...' : program._id,
      fullName: program._id,
      uv: program.count, // For triangle bar chart
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

  // Handle faculty bar click
  const handleFacultyBarClick = (data, index) => {
    setActiveFacultyIndex(index);
  };

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchDashboardData();
      fetchAnalytics();
    } else if (activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved') {
      fetchStudents();
    } else if (activeTab === 'transfer') {
      fetchTransferStudents();
    } else if (activeTab === 'activity') {
      fetchActivityLog();
    } else if (activeTab === 'analytics') {
      fetchAnalytics();
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

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/student/profiles/statistics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStatistics(data.statistics || {});
      } else {
        Notify.failure('Failed to fetch dashboard data');
      }
    } catch (error) {
      Notify.failure('Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

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
      const response = await fetch(endpoint, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        let studentsArray = [];
        if (data.data && data.data.profiles) {
          studentsArray = data.data.profiles;
          setPagination(data.data.pagination || pagination);
        } else if (data.profiles) {
          studentsArray = data.profiles;
        } else if (Array.isArray(data.data)) {
          studentsArray = data.data;
        } else if (Array.isArray(data)) {
          studentsArray = data;
        }
        setStudents(studentsArray);
      } else {
        if (response.status === 403) {
          Notify.failure('Access denied. Please check your permissions.');
        } else if (response.status === 404) {
          Notify.failure('Endpoint not found. Please check your backend routes.');
        } else {
          Notify.failure('Failed to fetch students');
        }
      }
    } catch (error) {
      Notify.failure('Error loading students');
    } finally {
      setLoading(false);
    }
  };

  // Fetch transfer students
  const fetchTransferStudents = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/student/transfer-students`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStudents(data.data.students || []);
        setPagination(data.data.pagination || pagination);
      } else {
        Notify.failure('Failed to fetch transfer students');
      }
    } catch (error) {
      Notify.failure('Error loading transfer students');
    } finally {
      setLoading(false);
    }
  };

  const fetchAnalytics = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/student/profiles/analytics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setAnalytics(data.data || {});
      } else {
        setAnalytics({ gradeDistribution: [], programPreferences: [], facultyDistribution: [] });
      }
    } catch (error) {
      setAnalytics({ gradeDistribution: [], programPreferences: [], facultyDistribution: [] });
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

  // Also need to fetch available slots, not appointments initially
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
          endTime: slot.time, // You might want to calculate this based on duration
          duration: 30, // Default duration
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
        notes: appointmentForm.notes
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

  const handleUpdateAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      // For updating appointment status
      const updateData = {
        appointmentId: selectedAppointment._id,
        status: 'updated',
        notes: appointmentForm.notes
      };

      const response = await fetch(`http://localhost:5000/api/appointments/update-status`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(updateData)
      });
      
      if (response.ok) {
        Notify.success('Appointment updated successfully');
        setShowEditAppointmentModal(false);
        fetchAppointments();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to update appointment');
      }
    } catch (error) {
      Notify.failure('Failed to update appointment: ' + error.message);
    }
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

  const handleCompleteAppointment = async (appointmentId, notes = '') => {
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
          status: 'completed',
          notes: notes || 'Appointment completed'
        })
      });
      
      if (response.ok) {
        Notify.success('Appointment marked as completed');
        fetchAppointments();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to complete appointment');
      }
    } catch (error) {
      Notify.failure('Failed to complete appointment: ' + error.message);
    }
  };

  const handleRescheduleAppointment = (appointment) => {
    setSelectedAppointment(appointment);
    setAppointmentForm({
      date: '',
      startTime: '',
      endTime: '',
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

  const handleViewAppointmentDetails = (appointment) => {
    setSelectedAppointment(appointment);
    // You can create a detail modal here if needed
    Notify.info(`Appointment details for ${appointment.student?.name || 'Available slot'}`);
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
      // Show appointments for this day
      setFilteredAppointments(dayAppointments);
      setShowCalendarView(false);
    } else {
      // Create new appointment for this date
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
    
    // Allow starting 15 minutes before and up to the end time
    return timeDiff <= 15 * 60 * 1000 && timeDiff >= -appointment.duration * 60 * 1000;
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
              <div className="brand">🎓 Advisor</div>
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
              <h1 className="topbar-title">Advisor Dashboard</h1>
            </div>

            <div className="loading-container">
              <div className="loading-spinner"></div>
              <h2>Loading Advisor Dashboard...</h2>
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
            <div className="brand">🎓 Advisor</div>
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
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
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
            <h1 className="topbar-title">Advisor Dashboard</h1>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <div className="stats-grid">
                <div className="stat-card">
                  <div className="stat-icon">👥</div>
                  <div className="stat-content">
                    <div className="stat-value">{statistics.total || 0}</div>
                    <div className="stat-label">Total Profiles</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">⏳</div>
                  <div className="stat-content">
                    <div className="stat-value">{statistics.pending || 0}</div>
                    <div className="stat-label">Pending Review</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">✅</div>
                  <div className="stat-content">
                    <div className="stat-value">{statistics.approved || 0}</div>
                    <div className="stat-label">Approved</div>
                  </div>
                </div>
                <div className="stat-card">
                  <div className="stat-icon">📈</div>
                  <div className="stat-content">
                    <div className="stat-value">{statistics.recent || 0}</div>
                    <div className="stat-label">Recent (7 days)</div>
                  </div>
                </div>
              </div>

              <div className="overview-charts">
                <div className="chart-card">
                  <h3>Approval Rate</h3>
                  <div className="progress-circle">
                    <div className="progress-text">{statistics.approvalRate || 0}%</div>
                  </div>
                </div>
                <div className="chart-card">
                  <h3>Recent Activity</h3>
                  <div className="activity-summary">
                    <p>Reviews processed this week</p>
                    <div className="activity-number">{statistics.recent || 0}</div>
                  </div>
                </div>
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
                                {apt.time} - {apt.status === 'booked' ? apt.studentName : 'Available'}
                              </div>
                            ))}
                            {getAppointmentsForDate(day.date).length > 3 && (
                              <div className="more-appointments">+{getAppointmentsForDate(day.date).length - 3} more</div>
                            )}
                          </div>
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
                                <button 
                                  onClick={() => handleStartAppointment(appointment)}
                                  className="action-btn start-btn"
                                  disabled={!isAppointmentTime(appointment)}
                                >
                                  🎯 Start
                                </button>
                                <button 
                                  onClick={() => handleRescheduleAppointment(appointment)}
                                  className="action-btn reschedule-btn"
                                >
                                  🔄 Reschedule
                                </button>
                                <button 
                                  onClick={() => handleCancelAppointment(appointment._id)}
                                  className="action-btn cancel-btn"
                                >
                                  ❌ Cancel
                                </button>
                              </>
                            )}

                            {appointment.status === 'completed' && (
                              <button 
                                onClick={() => handleViewAppointmentDetails(appointment)}
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
                    disabled={!appointmentPagination.hasPrevPage}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {appointmentPagination.currentPage} of {appointmentPagination.totalPages}
                  </span>
                  <button
                    onClick={() => fetchAppointments(appointmentPagination.currentPage + 1)}
                    disabled={!appointmentPagination.hasNextPage}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Rest of your existing tabs... */}
          {/* Analytics Tab */}
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
            </div>
          )}

          {/* Add all your existing modals here... */}

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

        </main>
      </div>
    </div>
  );
};

export default AdvisorDashboard;