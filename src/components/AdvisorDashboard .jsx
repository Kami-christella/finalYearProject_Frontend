
// import React, { useState, useEffect } from 'react';
// import { Notify } from 'notiflix';
// import './styles/AdvisorDashboard.css';

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

// const AdvisorDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [sidebarOpen, setSidebarOpen] = useState(false);

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
//     }
//   }, [activeTab, pagination.currentPage]);

//   useEffect(() => {
//     filterStudents();
//   }, [students, searchTerm, filterStatus]);

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
//       const response = await fetch(`http://localhost:5000/api/student/transfer-students?page=${page}&limit=10`, {
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

//           {/* Analytics Tab */}
//           {activeTab === 'analytics' && (
//             <div className="tab-content">
//               <div className="analytics-section">
//                 <h3>Grade Distribution</h3>
//                 <div className="chart-container">
//                   {analytics.gradeDistribution?.map((grade, index) => (
//                     <div key={index} className="grade-bar">
//                       <span className="grade-label">{grade._id}</span>
//                       <div className="grade-progress">
//                         <div
//                           className="grade-fill"
//                           style={{ width: `${(grade.count / Math.max(...analytics.gradeDistribution.map(g => g.count))) * 100}%` }}
//                         ></div>
//                       </div>
//                       <span className="grade-count">{grade.count}</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="analytics-section">
//                 <h3>Program Preferences</h3>
//                 <div className="program-stats">
//                   {analytics.programPreferences?.map((program, index) => (
//                     <div key={index} className="program-item">
//                       <span className="program-name">{program._id}</span>
//                       <span className="program-count">{program.count} students</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>

//               <div className="analytics-section">
//                 <h3>Faculty Distribution</h3>
//                 <div className="faculty-stats">
//                   {analytics.facultyDistribution?.map((faculty, index) => (
//                     <div key={index} className="faculty-item">
//                       <span className="faculty-name">{faculty._id}</span>
//                       <span className="faculty-count">{faculty.count} students</span>
//                     </div>
//                   ))}
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Activity Log Tab */}
//           {activeTab === 'activity' && (
//             <div className="tab-content">
//               <div className="activity-log">
//                 <h3>Recent Advisor Activity</h3>
//                 {activityLog.length > 0 ? (
//                   <div className="activity-list">
//                     {activityLog.map((activity, index) => (
//                       <div key={index} className="activity-item">
//                         <div className="activity-info">
//                           <span className="activity-student">{activity.student?.name || 'Unknown'}</span>
//                           <span className="activity-action">
//                             {activity.action} by {activity.reviewedBy}
//                           </span>
//                           <span className="activity-date">{formatDate(activity.reviewDate)}</span>
//                         </div>
//                         <div className="activity-details">
//                           <span className="activity-faculty">{activity.nationality} • {activity.desiredFaculty}</span>
//                         </div>
//                         {activity.advisorNotes && (
//                           <div className="activity-notes">{activity.advisorNotes}</div>
//                         )}
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="no-activity">
//                     <div className="no-activity-icon">📋</div>
//                     <h3>No recent activity found</h3>
//                     <p>Activity will appear here when advisors review student profiles</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {/* Appointments Tab (placeholder) */}
//           {activeTab === 'appointments' && (
//             <div className="tab-content">
//               <div className="no-students">
//                 <div className="no-students-icon">📅</div>
//                 <h3>Appointments</h3>
//                 <p>Hook up your appointments endpoint/UI here.</p>
//               </div>
//             </div>
//           )}

//           {/* Students Tab (All, Pending, Approved, Transfer) */}
//           {(activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved' || activeTab === 'transfer') && (
//             <div className="tab-content">
//               {/* Filters and Actions */}
//               <div className="filters-section">
//                 <div className="search-box">
//                   <span className="search-icon">🔍</span>
//                   <input
//                     type="text"
//                     placeholder="Search students by name, email, nationality..."
//                     value={searchTerm}
//                     onChange={(e) => setSearchTerm(e.target.value)}
//                     onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
//                     className="search-input"
//                   />
//                 </div>

//                 {activeTab !== 'transfer' && (
//                   <div className="filter-dropdown">
//                     <select
//                       value={filterStatus}
//                       onChange={(e) => setFilterStatus(e.target.value)}
//                       className="filter-select"
//                     >
//                       <option value="all">All Students</option>
//                       <option value="pending">Pending Review</option>
//                       <option value="approved">Approved</option>
//                       <option value="transfer">Transfer Students</option>
//                     </select>
//                   </div>
//                 )}

//                 {filteredStudents.length > 0 && (
//                   <div className="bulk-actions">
//                     <button onClick={handleSelectAllStudents} className="select-all-btn">
//                       {selectedStudents.length === filteredStudents.length ? 'Deselect All' : 'Select All'}
//                     </button>
//                     {selectedStudents.length > 0 && (
//                       <button onClick={handleBulkReview} className="bulk-review-btn">
//                         Bulk Review ({selectedStudents.length})
//                       </button>
//                     )}
//                   </div>
//                 )}
//               </div>

//               {/* Students List */}
//               <div className="students-grid">
//                 {filteredStudents.map((student) => (
//                   <div key={student._id} className="student-card">
//                     <div className="student-header">
//                       <input
//                         type="checkbox"
//                         checked={selectedStudents.includes(student._id)}
//                         onChange={() => handleSelectStudent(student._id)}
//                         className="student-checkbox"
//                       />
//                       <div className="student-avatar">
//                         {student.images && student.images.length > 0 ? (
//                           <img
//                             src={`http://localhost:5000${student.images[0].url}`}
//                             alt="Profile"
//                             className="avatar-image"
//                           />
//                         ) : (
//                           <div className="avatar-placeholder">
//                             {student.userId?.name?.charAt(0) || 'S'}
//                           </div>
//                         )}
//                       </div>
//                       <div className="student-info">
//                         <h3 className="student-name">{student.userId?.name || 'N/A'}</h3>
//                         <p className="student-email">{student.email}</p>
//                         {getStatusBadge(student)}
//                       </div>
//                     </div>

//                     <div className="student-details">
//                       <div className="detail-row">
//                         <span className="detail-label">Nationality:</span>
//                         <span className="detail-value">{student.nationality || 'N/A'}</span>
//                       </div>
//                       <div className="detail-row">
//                         <span className="detail-label">Academic Level:</span>
//                         <span className="detail-value">{student.currentAcademicLevel || 'N/A'}</span>
//                       </div>
//                       <div className="detail-row">
//                         <span className="detail-label">Program:</span>
//                         <span className="detail-value program-badge">
//                           {student.studentProgram || 'Not specified'}
//                         </span>
//                       </div>
//                       <div className="detail-row">
//                         <span className="detail-label">Desired Faculty:</span>
//                         <span className="detail-value">{student.desiredFaculty || 'Not specified'}</span>
//                       </div>
//                       <div className="detail-row">
//                         <span className="detail-label">High School Grades:</span>
//                         <span className="detail-value">{student.highSchoolGrades || 'N/A'}%</span>
//                       </div>

//                       {student.transferStudent && (
//                         <>
//                           <div className="detail-row">
//                             <span className="detail-label">Transfer Student:</span>
//                             <span className="detail-value transfer-badge">Yes</span>
//                           </div>
//                           <div className="detail-row">
//                             <span className="detail-label">Previous Institution:</span>
//                             <span className="detail-value">{student.previousInstitution || 'N/A'}</span>
//                           </div>
//                           <div className="detail-row">
//                             <span className="detail-label">Previous Grade:</span>
//                             <span className="detail-value">{student.overallGradePreviousUniversity || 'N/A'}</span>
//                           </div>
//                         </>
//                       )}

//                       {(student.recommendedFaculty || student.aiRecommendations?.recommendedFaculty) && (
//                         <div className="detail-row">
//                           <span className="detail-label">AI Recommended Faculty:</span>
//                           <span className="detail-value ai-recommendation">
//                             {student.recommendedFaculty || student.aiRecommendations?.recommendedFaculty}
//                           </span>
//                         </div>
//                       )}

//                       <div className="detail-row">
//                         <span className="detail-label">Submitted:</span>
//                         <span className="detail-value">{formatDate(student.createdAt)}</span>
//                       </div>
//                     </div>

//                     <div className="student-actions">
//                       <button
//                         onClick={() => handleReviewStudent(student)}
//                         className="action-btn review-btn"
//                       >
//                         <span className="btn-icon">📝</span>
//                         Review
//                       </button>

//                       {student.documents && student.documents.length > 0 && (
//                         <div className="document-actions">
//                           {student.documents.slice(0, 2).map((doc, index) => (
//                             <div key={index} className="document-buttons">
//                               <button
//                                 onClick={() => viewDocument(student._id, 'document', doc.filename, doc.originalName)}
//                                 className="action-btn view-btn"
//                                 title={`View ${doc.originalName}`}
//                               >
//                                 👁️
//                               </button>
//                               <button
//                                 onClick={() => downloadDocument(student._id, 'document', doc.filename)}
//                                 className="action-btn download-btn"
//                                 title={`Download ${doc.originalName}`}
//                               >
//                                 📄
//                               </button>
//                             </div>
//                           ))}
//                           {student.documents.length > 2 && (
//                             <span className="more-docs">+{student.documents.length - 2} more</span>
//                           )}
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Pagination */}
//               {pagination.totalPages > 1 && (
//                 <div className="pagination">
//                   <button
//                     onClick={() => {
//                       if (activeTab === 'transfer') {
//                         fetchTransferStudents(pagination.currentPage - 1);
//                       } else {
//                         fetchStudents(pagination.currentPage - 1);
//                       }
//                     }}
//                     disabled={!pagination.hasPrevPage}
//                     className="pagination-btn"
//                   >
//                     Previous
//                   </button>
//                   <span className="pagination-info">
//                     Page {pagination.currentPage} of {pagination.totalPages}
//                   </span>
//                   <button
//                     onClick={() => {
//                       if (activeTab === 'transfer') {
//                         fetchTransferStudents(pagination.currentPage + 1);
//                       } else {
//                         fetchStudents(pagination.currentPage + 1);
//                       }
//                     }}
//                     disabled={!pagination.hasNextPage}
//                     className="pagination-btn"
//                   >
//                     Next
//                   </button>
//                 </div>
//               )}

//               {filteredStudents.length === 0 && !loading && (
//                 <div className="no-students">
//                   <div className="no-students-icon">👥</div>
//                   <h3>No students found</h3>
//                   <p>
//                     {activeTab === 'transfer'
//                       ? 'No transfer students found in the system'
//                       : 'Try adjusting your search or filter criteria'
//                     }
//                   </p>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Enhanced Review Modal */}
//           {showReviewModal && selectedStudent && (
//             <div className="modal-overlay">
//               <div className="modal-content large-modal">
//                 <div className="modal-header">
//                   <h2>Review Student: {selectedStudent.userId?.name}</h2>
//                   <button onClick={() => setShowReviewModal(false)} className="modal-close">✕</button>
//                 </div>

//                 <form onSubmit={handleSubmitReview} className="review-form">
//                   <div className="student-info-section">
//                     <h3>Student Information</h3>
//                     <div className="info-grid">
//                       <div className="info-item"><span className="info-label">Name:</span><span className="info-value">{selectedStudent.userId?.name}</span></div>
//                       <div className="info-item"><span className="info-label">Email:</span><span className="info-value">{selectedStudent.email}</span></div>
//                       <div className="info-item"><span className="info-label">Nationality:</span><span className="info-value">{selectedStudent.nationality}</span></div>
//                       <div className="info-item"><span className="info-label">Academic Level:</span><span className="info-value">{selectedStudent.currentAcademicLevel}</span></div>
//                       <div className="info-item"><span className="info-label">Program Type:</span><span className="info-value program-badge">{selectedStudent.studentProgram || 'Not specified'}</span></div>
//                       <div className="info-item"><span className="info-label">High School Grades:</span><span className="info-value">{selectedStudent.highSchoolGrades}%</span></div>
//                       <div className="info-item"><span className="info-label">Desired Faculty:</span><span className="info-value">{selectedStudent.desiredFaculty || 'Not specified'}</span></div>
//                       <div className="info-item"><span className="info-label">Career Goals:</span><span className="info-value">{selectedStudent.careerGoals || 'Not specified'}</span></div>

//                       {selectedStudent.transferStudent && (
//                         <>
//                           <div className="info-item"><span className="info-label">Transfer Student:</span><span className="info-value transfer-badge">Yes</span></div>
//                           <div className="info-item"><span className="info-label">Previous Institution:</span><span className="info-value">{selectedStudent.previousInstitution}</span></div>
//                           <div className="info-item"><span className="info-label">Previous Grade:</span><span className="info-value">{selectedStudent.overallGradePreviousUniversity}</span></div>
//                         </>
//                       )}
//                     </div>

//                     {selectedStudent.coursesStudiedInSecondary?.length > 0 && (
//                       <div className="courses-section">
//                         <h4>High School Courses</h4>
//                         <div className="courses-list">
//                           {selectedStudent.coursesStudiedInSecondary.map((course, index) => (
//                             <span key={index} className="course-tag">{course}</span>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {selectedStudent.transferStudent && selectedStudent.coursesStudiedPreviousUniversity && (
//                       <div className="courses-section">
//                         <h4>Previous University Courses</h4>
//                         <div className="transfer-courses">
//                           {selectedStudent.coursesStudiedPreviousUniversity.map((course, index) => (
//                             <div key={index} className="transfer-course">
//                               <span className="course-name">{course.courseName}</span>
//                               <span className="course-code">{course.courseCode}</span>
//                               <span className="course-grade">Grade: {course.grade}</span>
//                             </div>
//                           ))}
//                         </div>
//                       </div>
//                     )}

//                     {(selectedStudent.aiRecommendations || selectedStudent.recommendedFaculty) && (
//                       <div className="ai-recommendations-section">
//                         <h4>AI Recommendations</h4>
//                         <div className="recommendations-grid">
//                           {(selectedStudent.recommendedFaculty || selectedStudent.aiRecommendations?.recommendedFaculty) && (
//                             <div className="recommendation-item">
//                               <span className="rec-label">Recommended Faculty:</span>
//                               <span className="rec-value ai-recommendation">
//                                 {selectedStudent.recommendedFaculty || selectedStudent.aiRecommendations?.recommendedFaculty}
//                               </span>
//                             </div>
//                           )}
//                           {(selectedStudent.recommendedDepartment || selectedStudent.aiRecommendations?.recommendedDepartment) && (
//                             <div className="recommendation-item">
//                               <span className="rec-label">Recommended Department:</span>
//                               <span className="rec-value ai-recommendation">
//                                 {selectedStudent.recommendedDepartment || selectedStudent.aiRecommendations?.recommendedDepartment}
//                               </span>
//                             </div>
//                           )}
//                           {(selectedStudent.careerAdvice || selectedStudent.aiRecommendations?.careerAdvice) && (
//                             <div className="recommendation-item full-width">
//                               <span className="rec-label">AI Career Advice:</span>
//                               <span className="rec-value ai-recommendation">
//                                 {selectedStudent.careerAdvice || selectedStudent.aiRecommendations?.careerAdvice}
//                               </span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="review-section">
//                     <h3>Advisor Review</h3>

//                     <div className="form-group">
//                       <label className="form-label">Advisor Notes</label>
//                       <textarea
//                         value={reviewForm.advisorNotes}
//                         onChange={(e) => setReviewForm({ ...reviewForm, advisorNotes: e.target.value })}
//                         className="form-textarea"
//                         rows="4"
//                         placeholder="Add your notes about this student..."
//                         maxLength="1000"
//                       />
//                     </div>

//                     <div className="form-row">
//                       <div className="form-group">
//                         <label className="form-label">Recommended Faculty</label>
//                         <select
//                           value={reviewForm.recommendedFaculty}
//                           onChange={(e) => setReviewForm({ ...reviewForm, recommendedFaculty: e.target.value, recommendedDepartment: '' })}
//                           className="form-select"
//                         >
//                           <option value="">Select Faculty</option>
//                           {facultyOptions.map(faculty => (
//                             <option key={faculty} value={faculty}>{faculty}</option>
//                           ))}
//                         </select>
//                       </div>

//                       <div className="form-group">
//                         <label className="form-label">Recommended Department</label>
//                         <select
//                           value={reviewForm.recommendedDepartment}
//                           onChange={(e) => setReviewForm({ ...reviewForm, recommendedDepartment: e.target.value })}
//                           className="form-select"
//                           disabled={!reviewForm.recommendedFaculty}
//                         >
//                           <option value="">Select Department</option>
//                           {getDepartmentOptions(reviewForm.recommendedFaculty).map(dept => (
//                             <option key={dept} value={dept}>{dept}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="form-group">
//                       <label className="form-label">Career Advice</label>
//                       <textarea
//                         value={reviewForm.careerAdvice}
//                         onChange={(e) => setReviewForm({ ...reviewForm, careerAdvice: e.target.value })}
//                         className="form-textarea"
//                         rows="3"
//                         placeholder="Provide career guidance and advice..."
//                         maxLength="500"
//                       />
//                     </div>

//                     <div className="form-group">
//                       <label className="form-label">Next Steps</label>
//                       <textarea
//                         value={reviewForm.nextSteps}
//                         onChange={(e) => setReviewForm({ ...reviewForm, nextSteps: e.target.value })}
//                         className="form-textarea"
//                         rows="3"
//                         placeholder="Outline the next steps for this student..."
//                         maxLength="500"
//                       />
//                     </div>

//                     <div className="approval-section">
//                       <label className="approval-checkbox">
//                         <input
//                           type="checkbox"
//                           checked={reviewForm.approved}
//                           onChange={(e) => setReviewForm({ ...reviewForm, approved: e.target.checked })}
//                         />
//                         <span className="checkbox-mark"></span>
//                         <span className="checkbox-label">Approve this student</span>
//                       </label>
//                     </div>
//                   </div>

//                   <div className="modal-actions">
//                     <button type="button" onClick={() => setShowReviewModal(false)} className="btn-cancel">
//                       Cancel
//                     </button>
//                     <button type="submit" className="btn-submit">
//                       Submit Review
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             </div>
//           )}

//           {/* Document Viewing Modal */}
//           {showDocumentModal && currentDocument && (
//             <div className="modal-overlay">
//               <div className="modal-content document-modal">
//                 <div className="modal-header">
//                   <h2>Document Viewer: {currentDocument.name}</h2>
//                   <button onClick={() => setShowDocumentModal(false)} className="modal-close">✕</button>
//                 </div>

//                 <div className="document-viewer">
//                   {currentDocument.type === 'image' ? (
//                     <img src={currentDocument.url} alt={currentDocument.name} className="document-image" />
//                   ) : (
//                     <iframe src={currentDocument.url} title={currentDocument.name} className="document-iframe" width="100%" height="600px" />
//                   )}
//                 </div>

//                 <div className="document-actions">
//                   <button
//                     onClick={() => {
//                       const link = document.createElement('a');
//                       link.href = currentDocument.url;
//                       link.download = currentDocument.name;
//                       link.click();
//                     }}
//                     className="btn-download"
//                   >
//                     Download Document
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Bulk Review Modal */}
//           {showBulkModal && (
//             <div className="modal-overlay">
//               <div className="modal-content">
//                 <div className="modal-header">
//                   <h2>Bulk Review ({selectedStudents.length} students)</h2>
//                   <button onClick={() => setShowBulkModal(false)} className="modal-close">✕</button>
//                 </div>

//                 <form onSubmit={handleSubmitBulkReview} className="bulk-review-form">
//                   <div className="form-group">
//                     <label className="form-label">Action</label>
//                     <div className="radio-group">
//                       <label className="radio-option">
//                         <input
//                           type="radio"
//                           name="bulkAction"
//                           checked={bulkReviewForm.approved === true}
//                           onChange={() => setBulkReviewForm({ ...bulkReviewForm, approved: true })}
//                         />
//                         <span className="radio-mark"></span>
//                         <span className="radio-label">Approve Selected Students</span>
//                       </label>
//                       <label className="radio-option">
//                         <input
//                           type="radio"
//                           name="bulkAction"
//                           checked={bulkReviewForm.approved === false}
//                           onChange={() => setBulkReviewForm({ ...bulkReviewForm, approved: false })}
//                         />
//                         <span className="radio-mark"></span>
//                         <span className="radio-label">Mark as Reviewed (No Approval)</span>
//                       </label>
//                     </div>
//                   </div>

//                   <div className="selected-students-preview">
//                     <h4>Selected Students:</h4>
//                     <div className="students-preview-list">
//                       {selectedStudents.map(studentId => {
//                         const student = filteredStudents.find(s => s._id === studentId);
//                         return (
//                           <div key={studentId} className="preview-student">
//                             <span>{student?.userId?.name || 'Unknown'}</span>
//                             <span>{student?.email}</span>
//                             {student?.transferStudent && <span className="transfer-indicator">Transfer</span>}
//                           </div>
//                         );
//                       })}
//                     </div>
//                   </div>

//                   <div className="modal-actions">
//                     <button type="button" onClick={() => setShowBulkModal(false)} className="btn-cancel">
//                       Cancel
//                     </button>
//                     <button type="submit" className="btn-submit">
//                       {bulkReviewForm.approved ? 'Approve All' : 'Review All'}
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


import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { PieChart, Pie, Cell } from "recharts";
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

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658"];

const AdvisorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
    }
  }, [activeTab, pagination.currentPage]);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, filterStatus]);

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
      const response = await fetch(`http://localhost:5000/api/student/transfer-students?page=${page}&limit=10`, {
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

          {/* Analytics Tab */}
          {activeTab === 'analytics' && (
            <div className="tab-content">
              <div className="analytics-section">
                <h3>Grade Distribution</h3>
                <div className="chart-container">
                  {analytics.gradeDistribution && analytics.gradeDistribution.length > 0 ? (
                    <div className="pie-chart-container">
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
                      <div className="pie-chart-legend">
                        {transformGradeDataForPieChart(analytics.gradeDistribution).map((entry, index) => (
                          <div key={index} className="legend-item">
                            <div 
                              className="legend-color" 
                              style={{ backgroundColor: COLORS[index % COLORS.length] }}
                            ></div>
                            <span className="legend-text">
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
                  {analytics.programPreferences?.map((program, index) => (
                    <div key={index} className="program-item">
                      <span className="program-name">{program._id}</span>
                      <span className="program-count">{program.count} students</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="analytics-section">
                <h3>Faculty Distribution</h3>
                <div className="faculty-stats">
                  {analytics.facultyDistribution?.map((faculty, index) => (
                    <div key={index} className="faculty-item">
                      <span className="faculty-name">{faculty._id}</span>
                      <span className="faculty-count">{faculty.count} students</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div className="tab-content">
              <div className="activity-log">
                <h3>Recent Advisor Activity</h3>
                {activityLog.length > 0 ? (
                  <div className="activity-list">
                    {activityLog.map((activity, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-info">
                          <span className="activity-student">{activity.student?.name || 'Unknown'}</span>
                          <span className="activity-action">
                            {activity.action} by {activity.reviewedBy}
                          </span>
                          <span className="activity-date">{formatDate(activity.reviewDate)}</span>
                        </div>
                        <div className="activity-details">
                          <span className="activity-faculty">{activity.nationality} • {activity.desiredFaculty}</span>
                        </div>
                        {activity.advisorNotes && (
                          <div className="activity-notes">{activity.advisorNotes}</div>
                        )}
                      </div>
                    ))}
                  </div>
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

          {/* Appointments Tab (placeholder) */}
          {activeTab === 'appointments' && (
            <div className="tab-content">
              <div className="no-students">
                <div className="no-students-icon">📅</div>
                <h3>Appointments</h3>
                <p>Hook up your appointments endpoint/UI here.</p>
              </div>
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

                {activeTab !== 'transfer' && (
                  <div className="filter-dropdown">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">All Students</option>
                      <option value="pending">Pending Review</option>
                      <option value="approved">Approved</option>
                      <option value="transfer">Transfer Students</option>
                    </select>
                  </div>
                )}

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

              {/* Students List */}
              <div className="students-grid">
                {filteredStudents.map((student) => (
                  <div key={student._id} className="student-card">
                    <div className="student-header">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student._id)}
                        onChange={() => handleSelectStudent(student._id)}
                        className="student-checkbox"
                      />
                      <div className="student-avatar">
                        {student.images && student.images.length > 0 ? (
                          <img
                            src={`http://localhost:5000${student.images[0].url}`}
                            alt="Profile"
                            className="avatar-image"
                          />
                        ) : (
                          <div className="avatar-placeholder">
                            {student.userId?.name?.charAt(0) || 'S'}
                          </div>
                        )}
                      </div>
                      <div className="student-info">
                        <h3 className="student-name">{student.userId?.name || 'N/A'}</h3>
                        <p className="student-email">{student.email}</p>
                        {getStatusBadge(student)}
                      </div>
                    </div>

                    <div className="student-details">
                      <div className="detail-row">
                        <span className="detail-label">Nationality:</span>
                        <span className="detail-value">{student.nationality || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Academic Level:</span>
                        <span className="detail-value">{student.currentAcademicLevel || 'N/A'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Program:</span>
                        <span className="detail-value program-badge">
                          {student.studentProgram || 'Not specified'}
                        </span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">Desired Faculty:</span>
                        <span className="detail-value">{student.desiredFaculty || 'Not specified'}</span>
                      </div>
                      <div className="detail-row">
                        <span className="detail-label">High School Grades:</span>
                        <span className="detail-value">{student.highSchoolGrades || 'N/A'}%</span>
                      </div>

                      {student.transferStudent && (
                        <>
                          <div className="detail-row">
                            <span className="detail-label">Transfer Student:</span>
                            <span className="detail-value transfer-badge">Yes</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Previous Institution:</span>
                            <span className="detail-value">{student.previousInstitution || 'N/A'}</span>
                          </div>
                          <div className="detail-row">
                            <span className="detail-label">Previous Grade:</span>
                            <span className="detail-value">{student.overallGradePreviousUniversity || 'N/A'}</span>
                          </div>
                        </>
                      )}

                      {(student.recommendedFaculty || student.aiRecommendations?.recommendedFaculty) && (
                        <div className="detail-row">
                          <span className="detail-label">AI Recommended Faculty:</span>
                          <span className="detail-value ai-recommendation">
                            {student.recommendedFaculty || student.aiRecommendations?.recommendedFaculty}
                          </span>
                        </div>
                      )}

                      <div className="detail-row">
                        <span className="detail-label">Submitted:</span>
                        <span className="detail-value">{formatDate(student.createdAt)}</span>
                      </div>
                    </div>

                    <div className="student-actions">
                      <button
                        onClick={() => handleReviewStudent(student)}
                        className="action-btn review-btn"
                      >
                        <span className="btn-icon">📝</span>
                        Review
                      </button>

                      {student.documents && student.documents.length > 0 && (
                        <div className="document-actions">
                          {student.documents.slice(0, 2).map((doc, index) => (
                            <div key={index} className="document-buttons">
                              <button
                                onClick={() => viewDocument(student._id, 'document', doc.filename, doc.originalName)}
                                className="action-btn view-btn"
                                title={`View ${doc.originalName}`}
                              >
                                👁️
                              </button>
                              <button
                                onClick={() => downloadDocument(student._id, 'document', doc.filename)}
                                className="action-btn download-btn"
                                title={`Download ${doc.originalName}`}
                              >
                                📄
                              </button>
                            </div>
                          ))}
                          {student.documents.length > 2 && (
                            <span className="more-docs">+{student.documents.length - 2} more</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => {
                      if (activeTab === 'transfer') {
                        fetchTransferStudents(pagination.currentPage - 1);
                      } else {
                        fetchStudents(pagination.currentPage - 1);
                      }
                    }}
                    disabled={!pagination.hasPrevPage}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => {
                      if (activeTab === 'transfer') {
                        fetchTransferStudents(pagination.currentPage + 1);
                      } else {
                        fetchStudents(pagination.currentPage + 1);
                      }
                    }}
                    disabled={!pagination.hasNextPage}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}

              {filteredStudents.length === 0 && !loading && (
                <div className="no-students">
                  <div className="no-students-icon">👥</div>
                  <h3>No students found</h3>
                  <p>
                    {activeTab === 'transfer'
                      ? 'No transfer students found in the system'
                      : 'Try adjusting your search or filter criteria'
                    }
                  </p>
                </div>
              )}
            </div>
          )}

          {/* Enhanced Review Modal */}
          {showReviewModal && selectedStudent && (
            <div className="modal-overlay">
              <div className="modal-content large-modal">
                <div className="modal-header">
                  <h2>Review Student: {selectedStudent.userId?.name}</h2>
                  <button onClick={() => setShowReviewModal(false)} className="modal-close">✕</button>
                </div>

                <form onSubmit={handleSubmitReview} className="review-form">
                  <div className="student-info-section">
                    <h3>Student Information</h3>
                    <div className="info-grid">
                      <div className="info-item"><span className="info-label">Name:</span><span className="info-value">{selectedStudent.userId?.name}</span></div>
                      <div className="info-item"><span className="info-label">Email:</span><span className="info-value">{selectedStudent.email}</span></div>
                      <div className="info-item"><span className="info-label">Nationality:</span><span className="info-value">{selectedStudent.nationality}</span></div>
                      <div className="info-item"><span className="info-label">Academic Level:</span><span className="info-value">{selectedStudent.currentAcademicLevel}</span></div>
                      <div className="info-item"><span className="info-label">Program Type:</span><span className="info-value program-badge">{selectedStudent.studentProgram || 'Not specified'}</span></div>
                      <div className="info-item"><span className="info-label">High School Grades:</span><span className="info-value">{selectedStudent.highSchoolGrades}%</span></div>
                      <div className="info-item"><span className="info-label">Desired Faculty:</span><span className="info-value">{selectedStudent.desiredFaculty || 'Not specified'}</span></div>
                      <div className="info-item"><span className="info-label">Career Goals:</span><span className="info-value">{selectedStudent.careerGoals || 'Not specified'}</span></div>

                      {selectedStudent.transferStudent && (
                        <>
                          <div className="info-item"><span className="info-label">Transfer Student:</span><span className="info-value transfer-badge">Yes</span></div>
                          <div className="info-item"><span className="info-label">Previous Institution:</span><span className="info-value">{selectedStudent.previousInstitution}</span></div>
                          <div className="info-item"><span className="info-label">Previous Grade:</span><span className="info-value">{selectedStudent.overallGradePreviousUniversity}</span></div>
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
                            <span>{student?.userId?.name || 'Unknown'}</span>
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
        </main>
      </div>
    </div>
  );
};

export default AdvisorDashboard;