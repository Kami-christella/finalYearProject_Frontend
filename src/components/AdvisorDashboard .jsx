// import React, { useState, useEffect } from 'react';
// import { Notify } from 'notiflix';
// import './styles/AdvisorDashboard.css';

// const AdvisorDashboard = () => {
//   const [activeTab, setActiveTab] = useState('overview');
//   const [students, setStudents] = useState([]);
//   const [filteredStudents, setFilteredStudents] = useState([]);
//   const [selectedStudent, setSelectedStudent] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [searchTerm, setSearchTerm] = useState('');
//   const [filterStatus, setFilterStatus] = useState('all');
//   const [statistics, setStatistics] = useState({});
//   const [showReviewModal, setShowReviewModal] = useState(false);

//   // Review form state
//   const [reviewForm, setReviewForm] = useState({
//     advisorNotes: '',
//     recommendedFaculty: '',
//     recommendedDepartment: '',
//     careerAdvice: '',
//     nextSteps: [{ step: '', priority: 'medium', deadline: '' }],
//     academicFit: 3,
//     careerClarity: 3,
//     overallPotential: 3,
//     approved: false
//   });

//   useEffect(() => {
//     fetchStudents();
//     fetchStatistics();
//   }, []);

//   useEffect(() => {
//     filterStudents();
//   }, [students, searchTerm, filterStatus]);

//   const fetchStudents = async () => {
//     try {
//       setLoading(true);
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/advisor/students', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setStudents(data.students || []);
//       } else {
//         Notify.failure('Failed to fetch students');
//       }
//     } catch (error) {
//       console.error('Error fetching students:', error);
//       Notify.failure('Error loading students');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchStatistics = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/advisor/statistics', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setStatistics(data.statistics || {});
//       }
//     } catch (error) {
//       console.error('Error fetching statistics:', error);
//     }
//   };

//   const filterStudents = () => {
//     let filtered = students;

//     // Search filter
//     if (searchTerm) {
//       filtered = filtered.filter(student => 
//         student.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.nationality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
//         student.desiredFaculty?.toLowerCase().includes(searchTerm.toLowerCase())
//       );
//     }

//     // Status filter
//     if (filterStatus !== 'all') {
//       filtered = filtered.filter(student => {
//         switch (filterStatus) {
//           case 'pending':
//             return !student.isStudentApproved && student.isProfileComplete;
//           case 'approved':
//             return student.isStudentApproved;
//           case 'incomplete':
//             return !student.isProfileComplete;
//           case 'transfer':
//             return student.transferStudent;
//           default:
//             return true;
//         }
//       });
//     }

//     setFilteredStudents(filtered);
//   };

//   const handleReviewStudent = (student) => {
//     setSelectedStudent(student);
//     setReviewForm({
//       advisorNotes: student.advisorNotes || '',
//       recommendedFaculty: student.recommendedFaculty || '',
//       recommendedDepartment: student.recommendedDepartment || '',
//       careerAdvice: student.careerAdvice || '',
//       nextSteps: student.nextSteps?.length > 0 ? student.nextSteps : [{ step: '', priority: 'medium', deadline: '' }],
//       academicFit: student.advisorRating?.academicFit || 3,
//       careerClarity: student.advisorRating?.careerClarity || 3,
//       overallPotential: student.advisorRating?.overallPotential || 3,
//       approved: student.isStudentApproved || false
//     });
//     setShowReviewModal(true);
//   };

//   const handleApproveStudent = async (studentId, approved) => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/advisor/students/${studentId}/approve`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({ approved })
//       });

//       if (response.ok) {
//         Notify.success(`Student ${approved ? 'approved' : 'rejected'} successfully`);
//         fetchStudents();
//         fetchStatistics();
//       } else {
//         throw new Error('Failed to update student status');
//       }
//     } catch (error) {
//       console.error('Error updating student:', error);
//       Notify.failure('Failed to update student status');
//     }
//   };

//   const handleSubmitReview = async (e) => {
//     e.preventDefault();
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`http://localhost:5000/api/advisor/students/${selectedStudent._id}/review`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           ...reviewForm,
//           reviewDate: new Date(),
//           reviewedBy: 'Current Advisor' // You can get this from user context
//         })
//       });

//       if (response.ok) {
//         Notify.success('Review submitted successfully');
//         setShowReviewModal(false);
//         fetchStudents();
//         fetchStatistics();
//       } else {
//         throw new Error('Failed to submit review');
//       }
//     } catch (error) {
//       console.error('Error submitting review:', error);
//       Notify.failure('Failed to submit review');
//     }
//   };

//   const addNextStep = () => {
//     setReviewForm(prev => ({
//       ...prev,
//       nextSteps: [...prev.nextSteps, { step: '', priority: 'medium', deadline: '' }]
//     }));
//   };

//   const updateNextStep = (index, field, value) => {
//     setReviewForm(prev => ({
//       ...prev,
//       nextSteps: prev.nextSteps.map((step, i) => 
//         i === index ? { ...step, [field]: value } : step
//       )
//     }));
//   };

//   const removeNextStep = (index) => {
//     setReviewForm(prev => ({
//       ...prev,
//       nextSteps: prev.nextSteps.filter((_, i) => i !== index)
//     }));
//   };

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to logout?')) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       Notify.success('Logged out successfully!');
//       setTimeout(() => {
//         window.location.href = '/';
//       }, 1000);
//     }
//   };

//   const getStatusBadge = (student) => {
//     if (!student.isProfileComplete) {
//       return <span className="status-badge incomplete">Incomplete</span>;
//     }
//     if (student.isStudentApproved) {
//       return <span className="status-badge approved">Approved</span>;
//     }
//     return <span className="status-badge pending">Pending Review</span>;
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not provided';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'short',
//       day: 'numeric'
//     });
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
//       'Faculty of Medicine': [
//         'MD Of General Medicine'
//       ],
//       'Faculty in Education': [
//         'BA in Accounting and Information Technology', 'BA in English Language and Literature and French',
//         'BA In Geography and History', 'Master of Art in Educational Administration', 'Master of Art In Curriculum, Instructions and Supervision'
//       ],
//       'Bachelor Of Theology': [
//         'Bachelor of Theology'
//       ]
//     };
//     return departments[faculty] || [];
//   };

//   if (loading) {
//     return (
//       <div className="advisor-dashboard">
//         <div className="loading-container">
//           <div className="loading-spinner"></div>
//           <h2>Loading Advisor Dashboard...</h2>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="advisor-dashboard">
//       {/* Header */}
//       <div className="dashboard-header">
//         <div className="header-left">
//           <h1 className="dashboard-title">
//             <span className="title-icon">👨‍🏫</span>
//             Advisor Dashboard
//           </h1>
//           <p className="dashboard-subtitle">Manage and review student applications</p>
//         </div>
//         <div className="header-actions">
//           <button onClick={handleLogout} className="logout-btn">
//             <span className="logout-icon">🚪</span>
//             Logout
//           </button>
//         </div>
//       </div>

//       {/* Navigation Tabs */}
//       <div className="nav-tabs">
//         {[
//           { id: 'overview', label: 'Overview', icon: '📊' },
//           { id: 'students', label: 'Students', icon: '👥' },
//           { id: 'pending', label: 'Pending Reviews', icon: '⏳' },
//           { id: 'approved', label: 'Approved', icon: '✅' }
//         ].map(tab => (
//           <button
//             key={tab.id}
//             onClick={() => setActiveTab(tab.id)}
//             className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
//           >
//             <span className="tab-icon">{tab.icon}</span>
//             <span className="tab-label">{tab.label}</span>
//           </button>
//         ))}
//       </div>

//       {/* Overview Tab */}
//       {activeTab === 'overview' && (
//         <div className="tab-content">
//           <div className="stats-grid">
//             <div className="stat-card">
//               <div className="stat-icon">👥</div>
//               <div className="stat-content">
//                 <div className="stat-value">{statistics.total || 0}</div>
//                 <div className="stat-label">Total Students</div>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">⏳</div>
//               <div className="stat-content">
//                 <div className="stat-value">{statistics.pendingApproval || 0}</div>
//                 <div className="stat-label">Pending Review</div>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">✅</div>
//               <div className="stat-content">
//                 <div className="stat-value">{statistics.approved || 0}</div>
//                 <div className="stat-label">Approved</div>
//               </div>
//             </div>
//             <div className="stat-card">
//               <div className="stat-icon">📋</div>
//               <div className="stat-content">
//                 <div className="stat-value">{statistics.completed || 0}</div>
//                 <div className="stat-label">Complete Profiles</div>
//               </div>
//             </div>
//           </div>

//           <div className="overview-charts">
//             <div className="chart-card">
//               <h3>Completion Rate</h3>
//               <div className="progress-circle">
//                 <div className="progress-text">{statistics.completionRate || 0}%</div>
//               </div>
//             </div>
//             <div className="chart-card">
//               <h3>Approval Rate</h3>
//               <div className="progress-circle">
//                 <div className="progress-text">{statistics.approvalRate || 0}%</div>
//               </div>
//             </div>
//           </div>
//         </div>
//       )}

//       {/* Students Tab */}
//       {(activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved') && (
//         <div className="tab-content">
//           {/* Filters */}
//           <div className="filters-section">
//             <div className="search-box">
//               <span className="search-icon">🔍</span>
//               <input
//                 type="text"
//                 placeholder="Search students by name, email, nationality..."
//                 value={searchTerm}
//                 onChange={(e) => setSearchTerm(e.target.value)}
//                 className="search-input"
//               />
//             </div>
//             <div className="filter-dropdown">
//               <select
//                 value={filterStatus}
//                 onChange={(e) => setFilterStatus(e.target.value)}
//                 className="filter-select"
//               >
//                 <option value="all">All Students</option>
//                 <option value="pending">Pending Review</option>
//                 <option value="approved">Approved</option>
//                 <option value="incomplete">Incomplete Profiles</option>
//                 <option value="transfer">Transfer Students</option>
//               </select>
//             </div>
//           </div>

//           {/* Students List */}
//           <div className="students-grid">
//             {filteredStudents.map((student) => (
//               <div key={student._id} className="student-card">
//                 <div className="student-header">
//                   <div className="student-avatar">
//                     {student.images && student.images.length > 0 ? (
//                       <img 
//                         src={`http://localhost:5000${student.images[0].url}`} 
//                         alt="Profile" 
//                         className="avatar-image"
//                       />
//                     ) : (
//                       <div className="avatar-placeholder">
//                         {student.userId?.name?.charAt(0) || 'S'}
//                       </div>
//                     )}
//                   </div>
//                   <div className="student-info">
//                     <h3 className="student-name">{student.userId?.name || 'N/A'}</h3>
//                     <p className="student-email">{student.email}</p>
//                     {getStatusBadge(student)}
//                   </div>
//                 </div>

//                 <div className="student-details">
//                   <div className="detail-row">
//                     <span className="detail-label">Nationality:</span>
//                     <span className="detail-value">{student.nationality || 'N/A'}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Academic Level:</span>
//                     <span className="detail-value">{student.currentAcademicLevel || 'N/A'}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">Desired Faculty:</span>
//                     <span className="detail-value">{student.desiredFaculty || 'Not specified'}</span>
//                   </div>
//                   <div className="detail-row">
//                     <span className="detail-label">High School Grades:</span>
//                     <span className="detail-value">{student.highSchoolGrades || 'N/A'}%</span>
//                   </div>
//                   {student.transferStudent && (
//                     <div className="detail-row">
//                       <span className="detail-label">Transfer Student:</span>
//                       <span className="detail-value transfer-badge">Yes</span>
//                     </div>
//                   )}
//                   <div className="detail-row">
//                     <span className="detail-label">Completion:</span>
//                     <span className="detail-value">{student.completionPercentage || 0}%</span>
//                   </div>
//                 </div>

//                 <div className="student-actions">
//                   <button
//                     onClick={() => handleReviewStudent(student)}
//                     className="action-btn review-btn"
//                   >
//                     <span className="btn-icon">📝</span>
//                     Review
//                   </button>
//                   {!student.isStudentApproved && student.isProfileComplete && (
//                     <>
//                       <button
//                         onClick={() => handleApproveStudent(student._id, true)}
//                         className="action-btn approve-btn"
//                       >
//                         <span className="btn-icon">✅</span>
//                         Approve
//                       </button>
//                       <button
//                         onClick={() => handleApproveStudent(student._id, false)}
//                         className="action-btn reject-btn"
//                       >
//                         <span className="btn-icon">❌</span>
//                         Reject
//                       </button>
//                     </>
//                   )}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {filteredStudents.length === 0 && (
//             <div className="no-students">
//               <div className="no-students-icon">👥</div>
//               <h3>No students found</h3>
//               <p>Try adjusting your search or filter criteria</p>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Review Modal */}
//       {showReviewModal && selectedStudent && (
//         <div className="modal-overlay">
//           <div className="modal-content">
//             <div className="modal-header">
//               <h2>Review Student: {selectedStudent.userId?.name}</h2>
//               <button
//                 onClick={() => setShowReviewModal(false)}
//                 className="modal-close"
//               >
//                 ✕
//               </button>
//             </div>

//             <form onSubmit={handleSubmitReview} className="review-form">
//               <div className="form-grid">
//                 {/* Student Information Display */}
//                 <div className="student-info-section">
//                   <h3>Student Information</h3>
//                   <div className="info-grid">
//                     <div className="info-item">
//                       <span className="info-label">Name:</span>
//                       <span className="info-value">{selectedStudent.userId?.name}</span>
//                     </div>
//                     <div className="info-item">
//                       <span className="info-label">Email:</span>
//                       <span className="info-value">{selectedStudent.email}</span>
//                     </div>
//                     <div className="info-item">
//                       <span className="info-label">Nationality:</span>
//                       <span className="info-value">{selectedStudent.nationality}</span>
//                     </div>
//                     <div className="info-item">
//                       <span className="info-label">Academic Level:</span>
//                       <span className="info-value">{selectedStudent.currentAcademicLevel}</span>
//                     </div>
//                     <div className="info-item">
//                       <span className="info-label">High School Grades:</span>
//                       <span className="info-value">{selectedStudent.highSchoolGrades}%</span>
//                     </div>
//                     <div className="info-item">
//                       <span className="info-label">Desired Faculty:</span>
//                       <span className="info-value">{selectedStudent.desiredFaculty || 'Not specified'}</span>
//                     </div>
//                     <div className="info-item">
//                       <span className="info-label">Career Goals:</span>
//                       <span className="info-value">{selectedStudent.careerGoals || 'Not specified'}</span>
//                     </div>
//                     {selectedStudent.transferStudent && (
//                       <>
//                         <div className="info-item">
//                           <span className="info-label">Transfer Student:</span>
//                           <span className="info-value transfer-badge">Yes</span>
//                         </div>
//                         <div className="info-item">
//                           <span className="info-label">Previous Institution:</span>
//                           <span className="info-value">{selectedStudent.previousInstitution}</span>
//                         </div>
//                       </>
//                     )}
//                   </div>
//                 </div>

//                 {/* Review Form Fields */}
//                 <div className="review-section">
//                   <h3>Advisor Review</h3>
                  
//                   <div className="form-group">
//                     <label className="form-label">Advisor Notes</label>
//                     <textarea
//                       value={reviewForm.advisorNotes}
//                       onChange={(e) => setReviewForm({...reviewForm, advisorNotes: e.target.value})}
//                       className="form-textarea"
//                       rows="4"
//                       placeholder="Add your notes about this student..."
//                       maxLength="1000"
//                     />
//                   </div>

//                   <div className="form-row">
//                     <div className="form-group">
//                       <label className="form-label">Recommended Faculty</label>
//                       <select
//                         value={reviewForm.recommendedFaculty}
//                         onChange={(e) => setReviewForm({...reviewForm, recommendedFaculty: e.target.value, recommendedDepartment: ''})}
//                         className="form-select"
//                       >
//                         <option value="">Select Faculty</option>
//                         {facultyOptions.map(faculty => (
//                           <option key={faculty} value={faculty}>{faculty}</option>
//                         ))}
//                       </select>
//                     </div>

//                     <div className="form-group">
//                       <label className="form-label">Recommended Department</label>
//                       <select
//                         value={reviewForm.recommendedDepartment}
//                         onChange={(e) => setReviewForm({...reviewForm, recommendedDepartment: e.target.value})}
//                         className="form-select"
//                         disabled={!reviewForm.recommendedFaculty}
//                       >
//                         <option value="">Select Department</option>
//                         {getDepartmentOptions(reviewForm.recommendedFaculty).map(dept => (
//                           <option key={dept} value={dept}>{dept}</option>
//                         ))}
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">Career Advice</label>
//                     <textarea
//                       value={reviewForm.careerAdvice}
//                       onChange={(e) => setReviewForm({...reviewForm, careerAdvice: e.target.value})}
//                       className="form-textarea"
//                       rows="3"
//                       placeholder="Provide career guidance and advice..."
//                       maxLength="500"
//                     />
//                   </div>

//                   {/* Next Steps */}
//                   <div className="form-group">
//                     <div className="section-header">
//                       <label className="form-label">Next Steps</label>
//                       <button type="button" onClick={addNextStep} className="add-btn">
//                         + Add Step
//                       </button>
//                     </div>
                    
//                     {reviewForm.nextSteps.map((step, index) => (
//                       <div key={index} className="next-step-item">
//                         <div className="step-content">
//                           <div className="form-row">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 placeholder="Describe the next step..."
//                                 value={step.step}
//                                 onChange={(e) => updateNextStep(index, 'step', e.target.value)}
//                                 className="form-input"
//                                 required
//                               />
//                             </div>
//                             <div className="form-group">
//                               <select
//                                 value={step.priority}
//                                 onChange={(e) => updateNextStep(index, 'priority', e.target.value)}
//                                 className="form-select"
//                               >
//                                 <option value="low">Low Priority</option>
//                                 <option value="medium">Medium Priority</option>
//                                 <option value="high">High Priority</option>
//                               </select>
//                             </div>
//                           </div>
//                           <div className="form-group">
//                             <input
//                               type="date"
//                               value={step.deadline}
//                               onChange={(e) => updateNextStep(index, 'deadline', e.target.value)}
//                               className="form-input"
//                               placeholder="Deadline (optional)"
//                             />
//                           </div>
//                         </div>
//                         {reviewForm.nextSteps.length > 1 && (
//                           <button 
//                             type="button" 
//                             onClick={() => removeNextStep(index)} 
//                             className="remove-step-btn"
//                           >
//                             Remove
//                           </button>
//                         )}
//                       </div>
//                     ))}
//                   </div>

//                   {/* Rating Section */}
//                   <div className="rating-section">
//                     <h4>Student Rating</h4>
//                     <div className="rating-grid">
//                       <div className="rating-item">
//                         <label className="rating-label">Academic Fit</label>
//                         <div className="rating-stars">
//                           {[1, 2, 3, 4, 5].map(star => (
//                             <button
//                               key={star}
//                               type="button"
//                               onClick={() => setReviewForm({...reviewForm, academicFit: star})}
//                               className={`star ${star <= reviewForm.academicFit ? 'active' : ''}`}
//                             >
//                               ⭐
//                             </button>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="rating-item">
//                         <label className="rating-label">Career Clarity</label>
//                         <div className="rating-stars">
//                           {[1, 2, 3, 4, 5].map(star => (
//                             <button
//                               key={star}
//                               type="button"
//                               onClick={() => setReviewForm({...reviewForm, careerClarity: star})}
//                               className={`star ${star <= reviewForm.careerClarity ? 'active' : ''}`}
//                             >
//                               ⭐
//                             </button>
//                           ))}
//                         </div>
//                       </div>

//                       <div className="rating-item">
//                         <label className="rating-label">Overall Potential</label>
//                         <div className="rating-stars">
//                           {[1, 2, 3, 4, 5].map(star => (
//                             <button
//                               key={star}
//                               type="button"
//                               onClick={() => setReviewForm({...reviewForm, overallPotential: star})}
//                               className={`star ${star <= reviewForm.overallPotential ? 'active' : ''}`}
//                             >
//                               ⭐
//                             </button>
//                           ))}
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Approval Section */}
//                   <div className="approval-section">
//                     <label className="approval-checkbox">
//                       <input
//                         type="checkbox"
//                         checked={reviewForm.approved}
//                         onChange={(e) => setReviewForm({...reviewForm, approved: e.target.checked})}
//                       />
//                       <span className="checkbox-mark"></span>
//                       <span className="checkbox-label">Approve this student</span>
//                     </label>
//                   </div>
//                 </div>
//               </div>

//               <div className="modal-actions">
//                 <button
//                   type="button"
//                   onClick={() => setShowReviewModal(false)}
//                   className="btn-cancel"
//                 >
//                   Cancel
//                 </button>
//                 <button
//                   type="submit"
//                   className="btn-submit"
//                 >
//                   Submit Review
//                 </button>
//               </div>
//             </form>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default AdvisorDashboard;

import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import './styles/AdvisorDashboard.css';

const AdvisorDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
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
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
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

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchDashboardData();
      fetchAnalytics();
    } else if (activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved') {
      fetchStudents();
    } else if (activeTab === 'activity') {
      fetchActivityLog();
    }
  }, [activeTab, pagination.currentPage]);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, filterStatus]);

//start
  // Fix the fetchDashboardData function
const fetchDashboardData = async () => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    // Use your existing statistics endpoint
    const response = await fetch('http://localhost:5000/api/student/profiles/statistics', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Dashboard data:', data);
      
      // Handle the response structure from getProfileStatistics
      setStatistics(data.statistics || {});
    } else {
      console.error('Failed to fetch dashboard data, status:', response.status);
      Notify.failure('Failed to fetch dashboard data');
    }
  } catch (error) {
    console.error('Error fetching dashboard data:', error);
    Notify.failure('Error loading dashboard');
  } finally {
    setLoading(false);
  }
};

 // Fix the fetchStudents function
const fetchStudents = async (page = 1) => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    let endpoint = '';

    // Use your existing backend routes
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
    const response = await fetch(endpoint, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Students data:', data);
      
      // Handle different response structures
      let studentsArray = [];
      
      if (data.data && data.data.profiles) {
        // From getAllStudentProfiles
        studentsArray = data.data.profiles;
        setPagination(data.data.pagination || pagination);
      } else if (data.profiles) {
        // From getProfilesByApprovalStatus
        studentsArray = data.profiles;
      } else if (Array.isArray(data.data)) {
        studentsArray = data.data;
      } else if (Array.isArray(data)) {
        studentsArray = data;
      }

      setStudents(studentsArray);
    } else {
      console.error('Failed to fetch students, status:', response.status);
      if (response.status === 403) {
        Notify.failure('Access denied. Please check your permissions.');
      } else if (response.status === 404) {
        Notify.failure('Endpoint not found. Please check your backend routes.');
      } else {
        Notify.failure('Failed to fetch students');
      }
    }
  } catch (error) {
    console.error('Error fetching students:', error);
    Notify.failure('Error loading students');
  } finally {
    setLoading(false);
  }
};

// Fix the fetchAnalytics function to use a working endpoint
const fetchAnalytics = async () => {
  try {
    const token = localStorage.getItem('token');
    
    // Use the statistics endpoint for analytics data
    const response = await fetch('http://localhost:5000/api/student/profiles/analytics', {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Analytics data:', data);
      setAnalytics(data.data || {});
    } else {
      console.log('Analytics endpoint not available yet, using empty data');
      setAnalytics({
        gradeDistribution: [],
        programPreferences: [],
        facultyDistribution: []
      });
    }
  } catch (error) {
    console.error('Error fetching analytics:', error);
    // Set empty analytics data instead of failing
    setAnalytics({
      gradeDistribution: [],
      programPreferences: [],
      facultyDistribution: []
    });
  }
};

  const fetchActivityLog = async (page = 1) => {
  try {
    console.log('Activity log endpoint not implemented yet');
    setActivityLog([]);
  } catch (error) {
    console.error('Error fetching activity log:', error);
  } finally {
    setLoading(false);
  }
};

 // Fix the searchStudents function
const searchStudents = async (searchTerm) => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    // Use the getAllStudentProfiles endpoint with search parameter
    const response = await fetch(`http://localhost:5000/api/student/allprofiles?search=${encodeURIComponent(searchTerm)}&approval=${filterStatus}`, {
      headers: { 'Authorization': `Bearer ${token}` }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Search results:', data);
      
      // Handle the response structure
      let studentsArray = [];
      if (data.data && data.data.profiles) {
        studentsArray = data.data.profiles;
        setPagination(data.data.pagination || pagination);
      }

      setStudents(studentsArray);
    } else {
      console.error('Search failed, status:', response.status);
      Notify.failure('Search failed');
    }
  } catch (error) {
    console.error('Error searching students:', error);
    Notify.failure('Error searching students');
  } finally {
    setLoading(false);
  }
};

  const filterStudents = () => {
    let filtered = students;

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(student => 
        student.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nationality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.desiredFaculty?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Status filter
    if (filterStatus !== 'all') {
      filtered = filtered.filter(student => {
        switch (filterStatus) {
          case 'pending':
            return !student.isStudentApproved;
          case 'approved':
            return student.isStudentApproved;
          case 'transfer':
            return student.transferStudent;
          default:
            return true;
        }
      });
    }

    setFilteredStudents(filtered);
  };

  const handleSearch = () => {
    if (searchTerm.trim()) {
      searchStudents(searchTerm);
    } else {
      fetchStudents();
    }
  };

 // Fix the handleReviewStudent function
const handleReviewStudent = async (student) => {
  // Just set the student data directly since we don't have the detailed review endpoint
  setSelectedStudent(student);
  setReviewForm({
    advisorNotes: student.advisorNotes || '',
    recommendedFaculty: student.recommendedFaculty || '',
    recommendedDepartment: student.recommendedDepartment || '',
    careerAdvice: student.careerAdvice || '',
    nextSteps: student.nextSteps || '',
    approved: student.isStudentApproved || false
  });
  setShowReviewModal(true);
};

 // Fix the handleSubmitReview function
const handleSubmitReview = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    
    // Use your existing approval endpoint
    const response = await fetch('http://localhost:5000/api/admin/approve-profile', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({
        profileId: selectedStudent._id,
        approved: reviewForm.approved,
        advisorNotes: reviewForm.advisorNotes
      })
    });

    if (response.ok) {
      Notify.success('Review submitted successfully');
      setShowReviewModal(false);
      fetchStudents();
      if (activeTab === 'overview') fetchDashboardData();
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit review');
    }
  } catch (error) {
    console.error('Error submitting review:', error);
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
    
    // Process each student individually since we don't have bulk endpoint yet
    for (const studentId of selectedStudents) {
      await fetch('http://localhost:5000/api/admin/approve-profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
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
    fetchStudents();
    if (activeTab === 'overview') fetchDashboardData();
  } catch (error) {
    console.error('Error submitting bulk review:', error);
    Notify.failure('Failed to submit bulk review');
  }
};


  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev => 
      prev.includes(studentId) 
        ? prev.filter(id => id !== studentId)
        : [...prev, studentId]
    );
  };

  const handleSelectAllStudents = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student._id));
    }
  };

  const downloadDocument = async (profileId, documentType, fileName) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(
        `http://localhost:5000/api/profiles/${profileId}/download/${documentType}/${fileName}`,
        {
          headers: { 'Authorization': `Bearer ${token}` }
        }
      );

      if (response.ok) {
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = fileName;
        document.body.appendChild(a);
        a.click();
        window.URL.revokeObjectURL(url);
        document.body.removeChild(a);
        Notify.success('Document downloaded successfully');
      } else {
        throw new Error('Failed to download document');
      }
    } catch (error) {
      console.error('Error downloading document:', error);
      Notify.failure('Failed to download document');
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Notify.success('Logged out successfully!');
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
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
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
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
      'Faculty of Medicine': [
        'MD Of General Medicine'
      ],
      'Faculty in Education': [
        'BA in Accounting and Information Technology', 'BA in English Language and Literature and French',
        'BA In Geography and History', 'Master of Art in Educational Administration', 'Master of Art In Curriculum, Instructions and Supervision'
      ],
      'Bachelor Of Theology': [
        'Bachelor of Theology'
      ]
    };
    return departments[faculty] || [];
  };

  if (loading && activeTab === 'overview') {
    return (
      <div className="advisor-dashboard">
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <h2>Loading Advisor Dashboard...</h2>
        </div>
      </div>
    );
  }

  return (
    <div className="advisor-dashboard">
      {/* Header */}
      <div className="dashboard-header">
        <div className="header-left">
          <h1 className="dashboard-title">
            <span className="title-icon">👨‍🏫</span>
            Advisor Dashboard
          </h1>
          <p className="dashboard-subtitle">Manage and review student applications</p>
        </div>
        <div className="header-actions">
          <button onClick={handleLogout} className="logout-btn">
            <span className="logout-icon">🚪</span>
            Logout
          </button>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="nav-tabs">
        {[
          { id: 'overview', label: 'Overview', icon: '📊' },
          { id: 'students', label: 'All Students', icon: '👥' },
          { id: 'pending', label: 'Pending Reviews', icon: '⏳' },
          { id: 'approved', label: 'Approved', icon: '✅' },
          { id: 'analytics', label: 'Analytics', icon: '📈' },
          { id: 'activity', label: 'Activity Log', icon: '📋' }
        ].map(tab => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`nav-tab ${activeTab === tab.id ? 'active' : ''}`}
          >
            <span className="tab-icon">{tab.icon}</span>
            <span className="tab-label">{tab.label}</span>
          </button>
        ))}
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
              {analytics.gradeDistribution?.map((grade, index) => (
                <div key={index} className="grade-bar">
                  <span className="grade-label">{grade._id}</span>
                  <div className="grade-progress">
                    <div 
                      className="grade-fill" 
                      style={{ width: `${(grade.count / Math.max(...analytics.gradeDistribution.map(g => g.count))) * 100}%` }}
                    ></div>
                  </div>
                  <span className="grade-count">{grade.count}</span>
                </div>
              ))}
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
                      <span className="activity-student">{activity.userId?.name}</span>
                      <span className="activity-action">
                        {activity.isStudentApproved ? 'Approved' : 'Reviewed'} by {activity.reviewedBy}
                      </span>
                      <span className="activity-date">{formatDate(activity.reviewDate)}</span>
                    </div>
                    {activity.advisorNotes && (
                      <div className="activity-notes">{activity.advisorNotes}</div>
                    )}
                  </div>
                ))}
              </div>
            ) : (
              <div className="no-activity">
                <p>No recent activity found</p>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Students Tab */}
      {(activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved') && (
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
              {/* <button onClick={handleSearch} className="search-btn">Search</button> */}
            </div>
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
                    <span className="detail-label">Desired Faculty:</span>
                    <span className="detail-value">{student.desiredFaculty || 'Not specified'}</span>
                  </div>
                  <div className="detail-row">
                    <span className="detail-label">High School Grades:</span>
                    <span className="detail-value">{student.highSchoolGrades || 'N/A'}%</span>
                  </div>
                  {student.transferStudent && (
                    <div className="detail-row">
                      <span className="detail-label">Transfer Student:</span>
                      <span className="detail-value transfer-badge">Yes</span>
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
                        <button
                          key={index}
                          onClick={() => downloadDocument(student._id, 'document', doc.filename)}
                          className="action-btn download-btn"
                          title={`Download ${doc.originalName}`}
                        >
                          📄
                        </button>
                      ))}
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
                onClick={() => fetchStudents(pagination.currentPage - 1)}
                disabled={!pagination.hasPrevPage}
                className="pagination-btn"
              >
                Previous
              </button>
              <span className="pagination-info">
                Page {pagination.currentPage} of {pagination.totalPages}
              </span>
              <button
                onClick={() => fetchStudents(pagination.currentPage + 1)}
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
              <p>Try adjusting your search or filter criteria</p>
            </div>
          )}
        </div>
      )}

      {/* Review Modal */}
      {showReviewModal && selectedStudent && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Review Student: {selectedStudent.userId?.name}</h2>
              <button
                onClick={() => setShowReviewModal(false)}
                className="modal-close"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleSubmitReview} className="review-form">
              {/* Student Information Display */}
              <div className="student-info-section">
                <h3>Student Information</h3>
                <div className="info-grid">
                  <div className="info-item">
                    <span className="info-label">Name:</span>
                    <span className="info-value">{selectedStudent.userId?.name}</span>
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
                    </>
                  )}
                </div>
              </div>

              {/* Review Form Fields */}
              <div className="review-section">
                <h3>Advisor Review</h3>
                
                <div className="form-group">
                  <label className="form-label">Advisor Notes</label>
                  <textarea
                    value={reviewForm.advisorNotes}
                    onChange={(e) => setReviewForm({...reviewForm, advisorNotes: e.target.value})}
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
                      onChange={(e) => setReviewForm({...reviewForm, recommendedFaculty: e.target.value, recommendedDepartment: ''})}
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
                      onChange={(e) => setReviewForm({...reviewForm, recommendedDepartment: e.target.value})}
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
                    onChange={(e) => setReviewForm({...reviewForm, careerAdvice: e.target.value})}
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
                    onChange={(e) => setReviewForm({...reviewForm, nextSteps: e.target.value})}
                    className="form-textarea"
                    rows="3"
                    placeholder="Outline the next steps for this student..."
                    maxLength="500"
                  />
                </div>

                {/* Approval Section */}
                <div className="approval-section">
                  <label className="approval-checkbox">
                    <input
                      type="checkbox"
                      checked={reviewForm.approved}
                      onChange={(e) => setReviewForm({...reviewForm, approved: e.target.checked})}
                    />
                    <span className="checkbox-mark"></span>
                    <span className="checkbox-label">Approve this student</span>
                  </label>
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowReviewModal(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Review Modal */}
      {showBulkModal && (
        <div className="modal-overlay">
          <div className="modal-content">
            <div className="modal-header">
              <h2>Bulk Review ({selectedStudents.length} students)</h2>
              <button
                onClick={() => setShowBulkModal(false)}
                className="modal-close"
              >
                ✕
              </button>
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
                      onChange={() => setBulkReviewForm({...bulkReviewForm, approved: true})}
                    />
                    <span className="radio-mark"></span>
                    <span className="radio-label">Approve Selected Students</span>
                  </label>
                  <label className="radio-option">
                    <input
                      type="radio"
                      name="bulkAction"
                      checked={bulkReviewForm.approved === false}
                      onChange={() => setBulkReviewForm({...bulkReviewForm, approved: false})}
                    />
                    <span className="radio-mark"></span>
                    <span className="radio-label">Mark as Reviewed (No Approval)</span>
                  </label>
                </div>
              </div>

              <div className="form-group">
                <label className="form-label">Advisor Notes (Optional)</label>
                <textarea
                  value={bulkReviewForm.advisorNotes}
                  onChange={(e) => setBulkReviewForm({...bulkReviewForm, advisorNotes: e.target.value})}
                  className="form-textarea"
                  rows="4"
                  placeholder="Add notes that will apply to all selected students..."
                  maxLength="500"
                />
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
                      </div>
                    );
                  })}
                </div>
              </div>

              <div className="modal-actions">
                <button
                  type="button"
                  onClick={() => setShowBulkModal(false)}
                  className="btn-cancel"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn-submit"
                >
                  {bulkReviewForm.approved ? 'Approve All' : 'Review All'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default AdvisorDashboard;