// import React, { useState, useEffect } from 'react';
// import { Notify } from 'notiflix';
// import aiRecommendationService from '../utils/aiRecommendationService';
// import './styles/ComprehensiveDashboard.css';

// const ComprehensiveDashboard = () => {
//   // Data states
//   const [profile, setProfile] = useState(null);
//   const [assessments, setAssessments] = useState([]);
//   const [careerQuestions, setCareerQuestions] = useState([]);
//   const [skillsQuestions, setSkillsQuestions] = useState([]);
//   const [personalityQuestions, setPersonalityQuestions] = useState([]);
//   const [recommendations, setRecommendations] = useState([]);

//   // UI states
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeSection, setActiveSection] = useState('overview');
//   const [selectedAssessmentType, setSelectedAssessmentType] = useState('career');

//   // Assessment completion status
//   const [hasProfile, setHasProfile] = useState(false);
//   const [hasAssessment, setHasAssessment] = useState(false);

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       await Promise.all([
//         fetchProfile(),
//         fetchAssessments(),
//         fetchQuestions(),
//         fetchRecommendations()
//       ]);
//     } catch (err) {
//       console.error('Error fetching dashboard data:', err);
//       setError('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/student/profile', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setProfile(data.profile);
//         setHasProfile(true);
//       } else {
//         setHasProfile(false);
//       }
//     } catch (err) {
//       console.error('Error fetching profile:', err);
//       setHasProfile(false);
//     }
//   };

//   const fetchAssessments = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/assessments/user', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAssessments(data.assessments || []);
//         setHasAssessment(data.assessments && data.assessments.length > 0);
//       } else {
//         setHasAssessment(false);
//       }
//     } catch (err) {
//       console.error('Error fetching assessments:', err);
//       setHasAssessment(false);
//     }
//   };

//    const handleLogout = () => {
//       // Show confirmation
//       if (window.confirm('Are you sure you want to logout?')) {
//         // Clear all stored data
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         localStorage.removeItem('profileCompleted');
//         localStorage.removeItem('profileId');
        
//         // Show success message
//         Notify.success('Logged out successfully!');
        
//         // Redirect to landing page
//         setTimeout(() => {
//           window.location.href = '/';
//         }, 1000);
//       }
//     };
//   const fetchQuestions = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const [careerRes, skillsRes, personalityRes] = await Promise.all([
//         fetch('http://localhost:5000/api/questions/career', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }),
//         fetch('http://localhost:5000/api/questions/skills', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }),
//         fetch('http://localhost:5000/api/questions/personality', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         })
//       ]);

//       if (careerRes.ok) {
//         const careerData = await careerRes.json();
//         setCareerQuestions(careerData || []);
//       }
//       if (skillsRes.ok) {
//         const skillsData = await skillsRes.json();
//         setSkillsQuestions(skillsData || []);
//       }
//       if (personalityRes.ok) {
//         const personalityData = await personalityRes.json();
//         setPersonalityQuestions(personalityData || []);
//       }
//     } catch (err) {
//       console.error('Error fetching questions:', err);
//     }
//   };

//   const fetchRecommendations = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/careers/recommend', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setRecommendations(data.recommendations || []);
//       }
//     } catch (err) {
//       console.log('No recommendations available yet');
//     }
//   };

//   const generateNewRecommendations = async () => {
//   try {
//     const result = await aiRecommendationService.generateRecommendations();
//     if (result.success) {
//       setRecommendations(result.recommendations || []);
//       Notify.success('New AI recommendations generated!');
//     }
//   } catch (err) {
//     Notify.failure('Failed to generate recommendations: ' + err.message);
//   }
// };

//   // const generateNewRecommendations = async () => {
//   //   if (!hasAssessment) {
//   //     Notify.warning('Please complete the assessment first');
//   //     return;
//   //   }

//   //   try {
//   //     const token = localStorage.getItem('token');
//   //     const latestAssessment = assessments[0];
      
//   //     const response = await fetch('http://localhost:5000/api/careers/recommend', {
//   //       method: 'POST',
//   //       headers: {
//   //         'Authorization': `Bearer ${token}`,
//   //         'Content-Type': 'application/json'
//   //       },
//   //       body: JSON.stringify({
//   //         careerTest: latestAssessment.careerTest,
//   //         skillsAssessment: latestAssessment.skillsAssessment,
//   //         personalityAssessment: latestAssessment.personalityAssessment
//   //       })
//   //     });

//   //     if (response.ok) {
//   //       const data = await response.json();
//   //       setRecommendations(data.recommendations || []);
//   //       Notify.success('New recommendations generated!');
//   //     } else {
//   //       throw new Error('Failed to generate recommendations');
//   //     }
//   //   } catch (err) {
//   //     console.error('Error generating recommendations:', err);
//   //     Notify.failure('Failed to generate recommendations');
//   //   }
//   // };

//   const getQuestionById = (questionId, type) => {
//     let questions = [];
//     switch (type) {
//       case 'career':
//         questions = careerQuestions;
//         break;
//       case 'skills':
//         questions = skillsQuestions;
//         break;
//       case 'personality':
//         questions = personalityQuestions;
//         break;
//     }
//     return questions.find(q => q._id === questionId);
//   };

//   const renderAssessmentAnswers = (assessmentData, type) => {
//     if (!assessmentData || Object.keys(assessmentData).length === 0) {
//       return <p className="no-data">No {type} assessment data available</p>;
//     }

//     return (
//       <div className="assessment-answers">
//         {Object.entries(assessmentData).map(([questionId, answer], index) => {
//           const question = getQuestionById(questionId, type);
//           return (
//             <div key={questionId} className="answer-item">
//               <div className="question-number">Question {index + 1}</div>
//               <div className="question-text">
//                 {question ? question.question : 'Question not found'}
//               </div>
//               <div className="answer-text">
//                 <span className="answer-label">Your Answer:</span>
//                 <span className="answer-value">{answer}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   const getCompletionStatus = () => {
//     if (hasProfile && hasAssessment) {
//       return { status: 'complete', message: 'Profile and Assessment Complete', color: '#28a745' };
//     } else if (hasProfile && !hasAssessment) {
//       return { status: 'partial', message: 'Profile Complete - Assessment Pending', color: '#ffc107' };
//     } else if (!hasProfile && hasAssessment) {
//       return { status: 'partial', message: 'Assessment Complete - Profile Pending', color: '#ffc107' };
//     } else {
//       return { status: 'incomplete', message: 'Profile and Assessment Incomplete', color: '#dc3545' };
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not provided';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   if (loading) {
//     return (
//       <div className="comprehensive-dashboard-container">
//         <div className="loading-card">
//           <div className="loading-spinner"></div>
//           <h2>Loading Your Complete Dashboard...</h2>
//           <p>Gathering your profile, assessment results, and recommendations</p>
//         </div>
//       </div>
//     );
//   }

//   const completionStatus = getCompletionStatus();

//   return (
//     <div className="comprehensive-dashboard-container">
//       <div className="dashboard-content">
//         {/* Header */}
//         <div className="dashboard-header">
//           <div className="header-main">
//             <div className="profile-avatar">
//               {profile?.images && profile.images.length > 0 ? (
//                 <img 
//                   src={`http://localhost:5000${profile.images[0].url}`} 
//                   alt="Profile" 
//                   className="avatar-image"
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                     e.target.nextSibling.style.display = 'flex';
//                   }}
//                 />
//               ) : null}
//               <div 
//                 className="avatar-placeholder"
//                 style={{ 
//                   display: profile?.images && profile.images.length > 0 ? 'none' : 'flex' 
//                 }}
//               >
//                 {profile?.userId?.name?.charAt(0) || 'U'}
//               </div>
//             </div>
//             <div className="profile-info">
//               <h1 className="profile-name">{profile?.userId?.name || 'Student'}</h1>
//               <p className="profile-email">{profile?.email || 'No email'}</p>
//               <div className="status-badge" style={{ background: completionStatus.color }}>
//                 {completionStatus.message}
//               </div>
//             </div>
//           </div>
          
//           <div className="header-actions">
//             <button 
//               onClick={() => window.location.href = '/EditProfile'} 
//               className="action-btn edit-btn"
//               disabled={!hasProfile}
//             >
//               <span className="btn-icon">✏️</span>
//               Edit Profile
//             </button>
//             <button onClick={handleLogout} className="logout-btn">
//               <span className="btn-icon">🚪</span>
//               Logout
//             </button>
//             {/* <button 
//               onClick={() => window.location.href = '/assessment'} 
//               className="action-btn assessment-btn"
//             >
//               <span className="btn-icon">📝</span>
//               {hasAssessment ? 'Retake Assessment' : 'Take Assessment'}
//             </button> */}
//             <button 
//               onClick={generateNewRecommendations}
//               className="action-btn recommend-btn"
//               disabled={!hasAssessment}
//             >
//               <span className="btn-icon">🎯</span>
//               Generate Recommendations
//             </button>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="stats-grid">
//           <div className="stat-card">
//             <div className="stat-icon">👤</div>
//             <div className="stat-content">
//               <div className="stat-value">{hasProfile ? 'Complete' : 'Incomplete'}</div>
//               <div className="stat-label">Profile Status</div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">📋</div>
//             <div className="stat-content">
//               <div className="stat-value">{assessments.length}</div>
//               <div className="stat-label">Assessments Taken</div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">⚡</div>
//             <div className="stat-content">
//               <div className="stat-value">{profile?.skills?.length || 0}</div>
//               <div className="stat-label">Skills Listed</div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">🎯</div>
//             <div className="stat-content">
//               <div className="stat-value">{recommendations.length}</div>
//               <div className="stat-label">Career Recommendations</div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="section-navigation">
//           {[
//             { id: 'overview', label: 'Overview', icon: '🏠' },
//             { id: 'profile', label: 'My Profile', icon: '👤' },
//             { id: 'assessment', label: 'Assessment Results', icon: '📊' },
//             { id: 'recommendations', label: 'Career Recommendations', icon: '🎯' }
//           ].map(section => (
//             <button
//               key={section.id}
//               onClick={() => setActiveSection(section.id)}
//               className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
//             >
//               <span className="nav-icon">{section.icon}</span>
//               <span className="nav-label">{section.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Section Content */}
//         <div className="section-content">
//           {/* Overview Section */}
//           {activeSection === 'overview' && (
//             <div className="overview-section">
//               <h2 className="section-title">Dashboard Overview</h2>
              
//               <div className="overview-grid">
//                 {/* Completion Status */}
//                 <div className="overview-card">
//                   <h3 className="card-title">Completion Status</h3>
//                   <div className="completion-status">
//                     <div className="status-item">
//                       <span className={`status-indicator ${hasProfile ? 'complete' : 'incomplete'}`}>
//                         {hasProfile ? '✅' : '❌'}
//                       </span>
//                       <span className="status-text">Profile {hasProfile ? 'Complete' : 'Incomplete'}</span>
//                     </div>
//                     <div className="status-item">
//                       <span className={`status-indicator ${hasAssessment ? 'complete' : 'incomplete'}`}>
//                         {hasAssessment ? '✅' : '❌'}
//                       </span>
//                       <span className="status-text">Assessment {hasAssessment ? 'Complete' : 'Incomplete'}</span>
//                     </div>
//                     <div className="status-item">
//                       <span className={`status-indicator ${recommendations.length > 0 ? 'complete' : 'incomplete'}`}>
//                         {recommendations.length > 0 ? '✅' : '❌'}
//                       </span>
//                       <span className="status-text">Recommendations {recommendations.length > 0 ? 'Available' : 'Pending'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Recent Activity */}
//                 <div className="overview-card">
//                   <h3 className="card-title">Recent Activity</h3>
//                   <div className="activity-list">
//                     {profile && (
//                       <div className="activity-item">
//                         <span className="activity-icon">👤</span>
//                         <span className="activity-text">Profile last updated: {formatDate(profile.lastUpdated)}</span>
//                       </div>
//                     )}
//                     {assessments.length > 0 && (
//                       <div className="activity-item">
//                         <span className="activity-icon">📋</span>
//                         <span className="activity-text">Last assessment: {formatDate(assessments[0].createdAt)}</span>
//                       </div>
//                     )}
//                     {recommendations.length > 0 && (
//                       <div className="activity-item">
//                         <span className="activity-icon">🎯</span>
//                         <span className="activity-text">{recommendations.length} career recommendations available</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Quick Actions */}
//                 <div className="overview-card">
//                   <h3 className="card-title">Quick Actions</h3>
//                   <div className="quick-actions">
//                     {!hasProfile && (
//                       <button 
//                         onClick={() => window.location.href = '/StudentProfile'}
//                         className="quick-action-btn"
//                       >
//                         <span className="btn-icon">📝</span>
//                         Create Profile
//                       </button>
//                     )}
//                     {!hasAssessment && (
//                       <button 
//                         onClick={() => window.location.href = '/assessment'}
//                         className="quick-action-btn"
//                       >
//                         <span className="btn-icon">🧠</span>
//                         Take Assessment
//                       </button>
//                     )}
//                     {hasProfile && hasAssessment && (
//                       <button 
//                         onClick={generateNewRecommendations}
//                         className="quick-action-btn"
//                       >
//                         <span className="btn-icon">🔄</span>
//                         Refresh Recommendations
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Profile Section */}
//           {activeSection === 'profile' && (
//             <div className="profile-section">
//               <h2 className="section-title">My Profile</h2>
//               {hasProfile ? (
//                 <div className="profile-content">
//                   {/* Personal Information */}
//                   <div className="info-card">
//                     <h3 className="card-title">Personal Information</h3>
//                     <div className="info-grid">
//                       <div className="info-item">
//                         <span className="info-label">Full Name:</span>
//                         <span className="info-value">{profile.userId?.name || 'N/A'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Email:</span>
//                         <span className="info-value">{profile.email}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Age:</span>
//                         <span className="info-value">{profile.age || 'N/A'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Gender:</span>
//                         <span className="info-value">{profile.gender || 'N/A'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Nationality:</span>
//                         <span className="info-value">{profile.nationality || 'N/A'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Country:</span>
//                         <span className="info-value">{profile.country || 'N/A'}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Academic Information */}
//                   <div className="info-card">
//                     <h3 className="card-title">Academic Information</h3>
//                     <div className="info-grid">
//                       <div className="info-item">
//                         <span className="info-label">Desired Faculty:</span>
//                         <span className="info-value">{profile.desiredFaculty || 'Not specified'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Desired Department:</span>
//                         <span className="info-value">{profile.desiredDepartment || 'Not specified'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Current Level:</span>
//                         <span className="info-value">{profile.currentAcademicLevel || 'N/A'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Program:</span>
//                         <span className="info-value">{profile.studentProgram || 'N/A'}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Skills */}
//                   {profile.skills && profile.skills.length > 0 && (
//                     <div className="info-card">
//                       <h3 className="card-title">Skills ({profile.skills.length})</h3>
//                       <div className="skills-grid">
//                         {profile.skills.map((skill, index) => (
//                           <div key={index} className="skill-item">
//                             <span className="skill-name">{skill.skillName}</span>
//                             <span className={`skill-level ${skill.proficiencyLevel.toLowerCase()}`}>
//                               {skill.proficiencyLevel}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Career Goals */}
//                   {profile.careerGoals && (
//                     <div className="info-card">
//                       <h3 className="card-title">Career Goals</h3>
//                       <p className="career-goals-text">{profile.careerGoals}</p>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="no-data-card">
//                   <div className="no-data-icon">📝</div>
//                   <h3>No Profile Found</h3>
//                   <p>You haven`&apos;`t created your profile yet. Create one to get started!</p>
//                   <button 
//                     onClick={() => window.location.href = '/StudentProfile'}
//                     className="create-btn"
//                   >
//                     Create Profile
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Assessment Section */}
//           {activeSection === 'assessment' && (
//             <div className="assessment-section">
//               <h2 className="section-title">Assessment Results</h2>
//               {hasAssessment ? (
//                 <div className="assessment-content">
//                   {/* Assessment Type Selector */}
//                   <div className="assessment-type-selector">
//                     {['career', 'skills', 'personality'].map(type => (
//                       <button
//                         key={type}
//                         onClick={() => setSelectedAssessmentType(type)}
//                         className={`type-btn ${selectedAssessmentType === type ? 'active' : ''}`}
//                       >
//                         <span className="type-icon">
//                           {type === 'career' ? '💼' : type === 'skills' ? '⚡' : '🧠'}
//                         </span>
//                         <span className="type-label">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
//                       </button>
//                     ))}
//                   </div>

//                   {/* Assessment Results */}
//                   <div className="assessment-results">
//                     <h3 className="results-title">
//                       {selectedAssessmentType.charAt(0).toUpperCase() + selectedAssessmentType.slice(1)} Assessment Results
//                     </h3>
//                     {assessments.length > 0 && (
//                       <div className="results-content">
//                         {selectedAssessmentType === 'career' && 
//                           renderAssessmentAnswers(assessments[0].careerTest, 'career')}
//                         {selectedAssessmentType === 'skills' && 
//                           renderAssessmentAnswers(assessments[0].skillsAssessment, 'skills')}
//                         {selectedAssessmentType === 'personality' && 
//                           renderAssessmentAnswers(assessments[0].personalityAssessment, 'personality')}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="no-data-card">
//                   <div className="no-data-icon">📊</div>
//                   <h3>No Assessment Results</h3>
//                   <p>You haven`&apos;`t taken the career assessment yet. Take it to see your results!</p>
//                   <button 
//                     onClick={() => window.location.href = '/assessment'}
//                     className="create-btn"
//                   >
//                     Take Assessment
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Recommendations Section */}
//           {activeSection === 'recommendations' && (
//             <div className="recommendations-section">
//               <h2 className="section-title">Career Recommendations</h2>
//               {recommendations.length > 0 ? (
//                 <div className="recommendations-grid">
//                   {recommendations.map((rec, index) => (
//                     <div key={index} className="recommendation-card">
//                       <div className="rec-header">
//                         <h3 className="rec-title">{rec.careerTitle}</h3>
//                         <div className="match-percentage">{rec.matchPercentage}% Match</div>
//                       </div>
//                       <p className="rec-description">{rec.description}</p>
//                       {rec.skills && rec.skills.length > 0 && (
//                         <div className="rec-skills">
//                           <h4>Required Skills:</h4>
//                           <div className="skills-tags">
//                             {rec.skills.map((skill, idx) => (
//                               <span key={idx} className="skill-tag">{skill}</span>
//                             ))}
//                           </div>
//                         </div>
//                       )}
//                       {rec.averageSalary && (
//                         <div className="rec-salary">
//                           <span className="salary-label">Average Salary:</span>
//                           <span className="salary-value">{rec.averageSalary}</span>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="no-data-card">
//                   <div className="no-data-icon">🎯</div>
//                   <h3>No Recommendations Available</h3>
//                   <p>Complete your profile and assessment to get personalized career recommendations!</p>
//                   <div className="recommendation-actions">
//                     {!hasProfile && (
//                       <button 
//                         onClick={() => window.location.href = '/StudentProfile'}
//                         className="create-btn"
//                       >
//                         Create Profile
//                       </button>
//                     )}
//                     {!hasAssessment && (
//                       <button 
//                         onClick={() => window.location.href = '/assessment'}
//                         className="create-btn"
//                       >
//                         Take Assessment
//                       </button>
//                     )}
//                     {hasProfile && hasAssessment && (
//                       <button 
//                         onClick={generateNewRecommendations}
//                         className="create-btn"
//                       >
//                         Generate Recommendations
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComprehensiveDashboard;

// import React, { useState, useEffect } from 'react';
// import { Notify } from 'notiflix';
// import aiRecommendationService from '../utils/aiRecommendationService';
// import './styles/ComprehensiveDashboard.css';

// const ComprehensiveDashboard = () => {
//   // Data states
//   const [profile, setProfile] = useState(null);
//   const [assessments, setAssessments] = useState([]);
//   const [careerQuestions, setCareerQuestions] = useState([]);
//   const [skillsQuestions, setSkillsQuestions] = useState([]);
//   const [personalityQuestions, setPersonalityQuestions] = useState([]);
//   const [recommendations, setRecommendations] = useState([]);

//   // UI states
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeSection, setActiveSection] = useState('overview');
//   const [selectedAssessmentType, setSelectedAssessmentType] = useState('career');
//   const [generatingRecommendations, setGeneratingRecommendations] = useState(false);

//   // Assessment completion status
//   const [hasProfile, setHasProfile] = useState(false);
//   const [hasAssessment, setHasAssessment] = useState(false);

//   useEffect(() => {
//     fetchAllData();
//   }, []);

//   const fetchAllData = async () => {
//     try {
//       await Promise.all([
//         fetchProfile(),
//         fetchAssessments(),
//         fetchQuestions(),
//         fetchRecommendations()
//       ]);
//     } catch (err) {
//       console.error('Error fetching dashboard data:', err);
//       setError('Failed to load dashboard data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/student/profile', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setProfile(data.profile);
//         setHasProfile(true);
//         console.log('✅ Profile loaded:', data.profile?.userId?.name);
//       } else {
//         setHasProfile(false);
//       }
//     } catch (err) {
//       console.error('Error fetching profile:', err);
//       setHasProfile(false);
//     }
//   };

//   const fetchAssessments = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch('http://localhost:5000/api/assessments/user', {
//         headers: { 'Authorization': `Bearer ${token}` }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setAssessments(data.assessments || []);
//         setHasAssessment(data.assessments && data.assessments.length > 0);
//         console.log('✅ Assessments loaded:', data.assessments?.length || 0);
//       } else {
//         setHasAssessment(false);
//       }
//     } catch (err) {
//       console.error('Error fetching assessments:', err);
//       setHasAssessment(false);
//     }
//   };

//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to logout?')) {
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       localStorage.removeItem('profileCompleted');
//       localStorage.removeItem('profileId');
//       localStorage.removeItem('assessmentCompleted');
//       localStorage.removeItem('hasRecommendations');
      
//       Notify.success('Logged out successfully!');
      
//       setTimeout(() => {
//         window.location.href = '/';
//       }, 1000);
//     }
//   };

//   const fetchQuestions = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       const [careerRes, skillsRes, personalityRes] = await Promise.all([
//         fetch('http://localhost:5000/api/questions/career', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }),
//         fetch('http://localhost:5000/api/questions/skills', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         }),
//         fetch('http://localhost:5000/api/questions/personality', {
//           headers: { 'Authorization': `Bearer ${token}` }
//         })
//       ]);

//       if (careerRes.ok) {
//         const careerData = await careerRes.json();
//         setCareerQuestions(careerData || []);
//       }
//       if (skillsRes.ok) {
//         const skillsData = await skillsRes.json();
//         setSkillsQuestions(skillsData || []);
//       }
//       if (personalityRes.ok) {
//         const personalityData = await personalityRes.json();
//         setPersonalityQuestions(personalityData || []);
//       }
//     } catch (err) {
//       console.error('Error fetching questions:', err);
//     }
//   };

//   const fetchRecommendations = async () => {
//     try {
//       console.log('📡 Fetching existing recommendations...');
//       const response = await aiRecommendationService.getRecommendations();
      
//       if (response.success && response.recommendations) {
//         console.log('✅ Existing recommendations loaded:', response.recommendations);
//         setRecommendations(response.recommendations || []);
//       }
//     } catch (err) {
//       console.log('ℹ️ No existing recommendations found:', err.message);
//       setRecommendations([]);
//     }
//   };

//   const generateNewRecommendations = async () => {
//     if (!hasAssessment) {
//       Notify.warning('Please complete the assessment first');
//       return;
//     }

//     setGeneratingRecommendations(true);
//     try {
//       console.log('🎯 Generating new recommendations...');
//       Notify.info('🤖 AI is analyzing your profile and assessment data...');
      
//       const result = await aiRecommendationService.generateRecommendations();
      
//       if (result.success && result.recommendations) {
//         console.log('✅ New recommendations received:', result.recommendations);
//         setRecommendations(result.recommendations || []);
//         Notify.success('🎉 New AI recommendations generated successfully!');
        
//         // Switch to recommendations tab to show results
//         setActiveSection('recommendations');
//       } else {
//         throw new Error('No recommendations received');
//       }
//     } catch (err) {
//       console.error('❌ Failed to generate recommendations:', err);
//       Notify.failure('Failed to generate recommendations: ' + err.message);
//     } finally {
//       setGeneratingRecommendations(false);
//     }
//   };

//   const getQuestionById = (questionId, type) => {
//     let questions = [];
//     switch (type) {
//       case 'career':
//         questions = careerQuestions;
//         break;
//       case 'skills':
//         questions = skillsQuestions;
//         break;
//       case 'personality':
//         questions = personalityQuestions;
//         break;
//     }
//     return questions.find(q => q._id === questionId);
//   };

//   const renderAssessmentAnswers = (assessmentData, type) => {
//     if (!assessmentData || Object.keys(assessmentData).length === 0) {
//       return <p className="no-data">No {type} assessment data available</p>;
//     }

//     return (
//       <div className="assessment-answers">
//         {Object.entries(assessmentData).map(([questionId, answer], index) => {
//           const question = getQuestionById(questionId, type);
//           return (
//             <div key={questionId} className="answer-item">
//               <div className="question-number">Question {index + 1}</div>
//               <div className="question-text">
//                 {question ? question.question : 'Question not found'}
//               </div>
//               <div className="answer-text">
//                 <span className="answer-label">Your Answer:</span>
//                 <span className="answer-value">{answer}</span>
//               </div>
//             </div>
//           );
//         })}
//       </div>
//     );
//   };

//   const getCompletionStatus = () => {
//     if (hasProfile && hasAssessment) {
//       return { status: 'complete', message: 'Profile and Assessment Complete', color: '#28a745' };
//     } else if (hasProfile && !hasAssessment) {
//       return { status: 'partial', message: 'Profile Complete - Assessment Pending', color: '#ffc107' };
//     } else if (!hasProfile && hasAssessment) {
//       return { status: 'partial', message: 'Assessment Complete - Profile Pending', color: '#ffc107' };
//     } else {
//       return { status: 'incomplete', message: 'Profile and Assessment Incomplete', color: '#dc3545' };
//     }
//   };

//   const formatDate = (dateString) => {
//     if (!dateString) return 'Not provided';
//     return new Date(dateString).toLocaleDateString('en-US', {
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const testRecommendationGeneration = async () => {
//     try {
//       console.log('🧪 Testing recommendation generation...');
//       console.log('📊 Current state:', {
//         hasProfile,
//         hasAssessment,
//         profileExists: !!profile,
//         assessmentsCount: assessments.length,
//         token: !!localStorage.getItem('token')
//       });
      
//       const result = await aiRecommendationService.generateRecommendations();
//       console.log('🎯 Test result:', result);
//       alert('Test successful! Check console for details.');
//     } catch (error) {
//       console.error('🔥 Test error:', error);
//       alert('Test failed: ' + error.message);
//     }
//   };

//   if (loading) {
//     return (
//       <div className="comprehensive-dashboard-container">
//         <div className="loading-card">
//           <div className="loading-spinner"></div>
//           <h2>Loading Your Complete Dashboard...</h2>
//           <p>Gathering your profile, assessment results, and recommendations</p>
//         </div>
//       </div>
//     );
//   }

//   const completionStatus = getCompletionStatus();

//   return (
//     <div className="comprehensive-dashboard-container">
//       <div className="dashboard-content">
//         {/* Header */}
//         <div className="dashboard-header">
//           <div className="header-main">
//             <div className="profile-avatar">
//               {profile?.images && profile.images.length > 0 ? (
//                 <img 
//                   src={`http://localhost:5000${profile.images[0].url}`} 
//                   alt="Profile" 
//                   className="avatar-image"
//                   onError={(e) => {
//                     e.target.style.display = 'none';
//                     e.target.nextSibling.style.display = 'flex';
//                   }}
//                 />
//               ) : null}
//               <div 
//                 className="avatar-placeholder"
//                 style={{ 
//                   display: profile?.images && profile.images.length > 0 ? 'none' : 'flex' 
//                 }}
//               >
//                 {profile?.userId?.name?.charAt(0) || 'U'}
//               </div>
//             </div>
//             <div className="profile-info">
//               <h1 className="profile-name">{profile?.userId?.name || 'Student'}</h1>
//               <p className="profile-email">{profile?.email || 'No email'}</p>
//               <div className="status-badge" style={{ background: completionStatus.color }}>
//                 {completionStatus.message}
//               </div>
//             </div>
//           </div>
          
//           <div className="header-actions">
//             <button 
//               onClick={() => window.location.href = '/EditProfile'} 
//               className="action-btn edit-btn"
//               disabled={!hasProfile}
//             >
//               <span className="btn-icon">✏️</span>
//               Edit Profile
//             </button>
//             <button onClick={handleLogout} className="logout-btn">
//               <span className="btn-icon">🚪</span>
//               Logout
//             </button>
//             <button 
//               onClick={generateNewRecommendations}
//               className="action-btn recommend-btn"
//               disabled={!hasAssessment || generatingRecommendations}
//             >
//               <span className="btn-icon">🎯</span>
//               {generatingRecommendations ? 'Generating...' : 'Generate Recommendations'}
//             </button>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="stats-grid">
//           <div className="stat-card">
//             <div className="stat-icon">👤</div>
//             <div className="stat-content">
//               <div className="stat-value">{hasProfile ? 'Complete' : 'Incomplete'}</div>
//               <div className="stat-label">Profile Status</div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">📋</div>
//             <div className="stat-content">
//               <div className="stat-value">{assessments.length}</div>
//               <div className="stat-label">Assessments Taken</div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">⚡</div>
//             <div className="stat-content">
//               <div className="stat-value">{profile?.skills?.length || 0}</div>
//               <div className="stat-label">Skills Listed</div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">🎯</div>
//             <div className="stat-content">
//               <div className="stat-value">{recommendations.length}</div>
//               <div className="stat-label">Career Recommendations</div>
//             </div>
//           </div>
//         </div>

//         {/* Navigation */}
//         <div className="section-navigation">
//           {[
//             { id: 'overview', label: 'Overview', icon: '🏠' },
//             { id: 'profile', label: 'My Profile', icon: '👤' },
//             { id: 'assessment', label: 'Assessment Results', icon: '📊' },
//             { id: 'recommendations', label: 'Career Recommendations', icon: '🎯' }
//           ].map(section => (
//             <button
//               key={section.id}
//               onClick={() => setActiveSection(section.id)}
//               className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
//             >
//               <span className="nav-icon">{section.icon}</span>
//               <span className="nav-label">{section.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Section Content */}
//         <div className="section-content">
//           {/* Overview Section */}
//           {activeSection === 'overview' && (
//             <div className="overview-section">
//               <h2 className="section-title">Dashboard Overview</h2>
              
//               <div className="overview-grid">
//                 {/* Completion Status */}
//                 <div className="overview-card">
//                   <h3 className="card-title">Completion Status</h3>
//                   <div className="completion-status">
//                     <div className="status-item">
//                       <span className={`status-indicator ${hasProfile ? 'complete' : 'incomplete'}`}>
//                         {hasProfile ? '✅' : '❌'}
//                       </span>
//                       <span className="status-text">Profile {hasProfile ? 'Complete' : 'Incomplete'}</span>
//                     </div>
//                     <div className="status-item">
//                       <span className={`status-indicator ${hasAssessment ? 'complete' : 'incomplete'}`}>
//                         {hasAssessment ? '✅' : '❌'}
//                       </span>
//                       <span className="status-text">Assessment {hasAssessment ? 'Complete' : 'Incomplete'}</span>
//                     </div>
//                     <div className="status-item">
//                       <span className={`status-indicator ${recommendations.length > 0 ? 'complete' : 'incomplete'}`}>
//                         {recommendations.length > 0 ? '✅' : '❌'}
//                       </span>
//                       <span className="status-text">Recommendations {recommendations.length > 0 ? 'Available' : 'Pending'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {/* Recent Activity */}
//                 <div className="overview-card">
//                   <h3 className="card-title">Recent Activity</h3>
//                   <div className="activity-list">
//                     {profile && (
//                       <div className="activity-item">
//                         <span className="activity-icon">👤</span>
//                         <span className="activity-text">Profile last updated: {formatDate(profile.lastUpdated)}</span>
//                       </div>
//                     )}
//                     {assessments.length > 0 && (
//                       <div className="activity-item">
//                         <span className="activity-icon">📋</span>
//                         <span className="activity-text">Last assessment: {formatDate(assessments[0].createdAt)}</span>
//                       </div>
//                     )}
//                     {recommendations.length > 0 && (
//                       <div className="activity-item">
//                         <span className="activity-icon">🎯</span>
//                         <span className="activity-text">{recommendations.length} career recommendations available</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>

//                 {/* Quick Actions */}
//                 <div className="overview-card">
//                   <h3 className="card-title">Quick Actions</h3>
//                   <div className="quick-actions">
//                     {!hasProfile && (
//                       <button 
//                         onClick={() => window.location.href = '/StudentProfile'}
//                         className="quick-action-btn"
//                       >
//                         <span className="btn-icon">📝</span>
//                         Create Profile
//                       </button>
//                     )}
//                     {!hasAssessment && (
//                       <button 
//                         onClick={() => window.location.href = '/assessment'}
//                         className="quick-action-btn"
//                       >
//                         <span className="btn-icon">🧠</span>
//                         Take Assessment
//                       </button>
//                     )}
//                     {hasProfile && hasAssessment && (
//                       <button 
//                         onClick={generateNewRecommendations}
//                         className="quick-action-btn"
//                         disabled={generatingRecommendations}
//                       >
//                         <span className="btn-icon">🔄</span>
//                         {generatingRecommendations ? 'Generating...' : 'Refresh Recommendations'}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Profile Section */}
//           {activeSection === 'profile' && (
//             <div className="profile-section">
//               <h2 className="section-title">My Profile</h2>
//               {hasProfile ? (
//                 <div className="profile-content">
//                   {/* Personal Information */}
//                   <div className="info-card">
//                     <h3 className="card-title">Personal Information</h3>
//                     <div className="info-grid">
//                       <div className="info-item">
//                         <span className="info-label">Full Name:</span>
//                         <span className="info-value">{profile.userId?.name || 'N/A'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Email:</span>
//                         <span className="info-value">{profile.email}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Age:</span>
//                         <span className="info-value">{profile.age || 'N/A'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Gender:</span>
//                         <span className="info-value">{profile.gender || 'N/A'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Nationality:</span>
//                         <span className="info-value">{profile.nationality || 'N/A'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Country:</span>
//                         <span className="info-value">{profile.country || 'N/A'}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Academic Information */}
//                   <div className="info-card">
//                     <h3 className="card-title">Academic Information</h3>
//                     <div className="info-grid">
//                       <div className="info-item">
//                         <span className="info-label">Desired Faculty:</span>
//                         <span className="info-value">{profile.desiredFaculty || 'Not specified'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Desired Department:</span>
//                         <span className="info-value">{profile.desiredDepartment || 'Not specified'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Current Level:</span>
//                         <span className="info-value">{profile.currentAcademicLevel || 'N/A'}</span>
//                       </div>
//                       <div className="info-item">
//                         <span className="info-label">Program:</span>
//                         <span className="info-value">{profile.studentProgram || 'N/A'}</span>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Skills */}
//                   {profile.skills && profile.skills.length > 0 && (
//                     <div className="info-card">
//                       <h3 className="card-title">Skills ({profile.skills.length})</h3>
//                       <div className="skills-grid">
//                         {profile.skills.map((skill, index) => (
//                           <div key={index} className="skill-item">
//                             <span className="skill-name">{skill.skillName}</span>
//                             <span className={`skill-level ${skill.proficiencyLevel.toLowerCase()}`}>
//                               {skill.proficiencyLevel}
//                             </span>
//                           </div>
//                         ))}
//                       </div>
//                     </div>
//                   )}

//                   {/* Career Goals */}
//                   {profile.careerGoals && (
//                     <div className="info-card">
//                       <h3 className="card-title">Career Goals</h3>
//                       <p className="career-goals-text">{profile.careerGoals}</p>
//                     </div>
//                   )}
//                 </div>
//               ) : (
//                 <div className="no-data-card">
//                   <div className="no-data-icon">📝</div>
//                   <h3>No Profile Found</h3>
//                   <p>You haven't created your profile yet. Create one to get started!</p>
//                   <button 
//                     onClick={() => window.location.href = '/StudentProfile'}
//                     className="create-btn"
//                   >
//                     Create Profile
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Assessment Section */}
//           {activeSection === 'assessment' && (
//             <div className="assessment-section">
//               <h2 className="section-title">Assessment Results</h2>
//               {hasAssessment ? (
//                 <div className="assessment-content">
//                   {/* Assessment Type Selector */}
//                   <div className="assessment-type-selector">
//                     {['career', 'skills', 'personality'].map(type => (
//                       <button
//                         key={type}
//                         onClick={() => setSelectedAssessmentType(type)}
//                         className={`type-btn ${selectedAssessmentType === type ? 'active' : ''}`}
//                       >
//                         <span className="type-icon">
//                           {type === 'career' ? '💼' : type === 'skills' ? '⚡' : '🧠'}
//                         </span>
//                         <span className="type-label">{type.charAt(0).toUpperCase() + type.slice(1)}</span>
//                       </button>
//                     ))}
//                   </div>

//                   {/* Assessment Results */}
//                   <div className="assessment-results">
//                     <h3 className="results-title">
//                       {selectedAssessmentType.charAt(0).toUpperCase() + selectedAssessmentType.slice(1)} Assessment Results
//                     </h3>
//                     {assessments.length > 0 && (
//                       <div className="results-content">
//                         {selectedAssessmentType === 'career' && 
//                           renderAssessmentAnswers(assessments[0].careerTest, 'career')}
//                         {selectedAssessmentType === 'skills' && 
//                           renderAssessmentAnswers(assessments[0].skillsAssessment, 'skills')}
//                         {selectedAssessmentType === 'personality' && 
//                           renderAssessmentAnswers(assessments[0].personalityAssessment, 'personality')}
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               ) : (
//                 <div className="no-data-card">
//                   <div className="no-data-icon">📊</div>
//                   <h3>No Assessment Results</h3>
//                   <p>You haven't taken the career assessment yet. Take it to see your results!</p>
//                   <button 
//                     onClick={() => window.location.href = '/assessment'}
//                     className="create-btn"
//                   >
//                     Take Assessment
//                   </button>
//                 </div>
//               )}
//             </div>
//           )}

//           {/* Recommendations Section */}
//           {activeSection === 'recommendations' && (
//             <div className="recommendations-section">
//               <h2 className="section-title">Career Recommendations</h2>
//               {recommendations.length > 0 ? (
//                 <div className="recommendations-grid">
//                   {recommendations.map((rec, index) => (
//                     <div key={index} className="recommendation-card">
//                       <div className="rec-header">
//                         <h3 className="rec-title">
//                           {rec.faculty || rec.careerTitle}
//                         </h3>
//                         <div className="match-percentage">
//                           {rec.matchPercentage}% Match
//                         </div>
//                       </div>
//                       <h4 className="rec-department">
//                         {rec.department}
//                       </h4>
//                       <p className="rec-description">
//                         {rec.reasoning || rec.description}
//                       </p>
                      
//                       {/* Strengths */}
//                       {rec.strengths && rec.strengths.length > 0 && (
//                         <div className="rec-skills">
//                           <h4>Your Strengths:</h4>
//                           <div className="skills-tags">
//                             {rec.strengths.map((strength, idx) => (
//                               <span key={idx} className="skill-tag">{strength}</span>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Skills (fallback for older format) */}
//                       {rec.skills && rec.skills.length > 0 && !rec.strengths && (
//                         <div className="rec-skills">
//                           <h4>Required Skills:</h4>
//                           <div className="skills-tags">
//                             {rec.skills.map((skill, idx) => (
//                               <span key={idx} className="skill-tag">{skill}</span>
//                             ))}
//                           </div>
//                         </div>
//                       )}

//                       {/* Considerations */}
//                       {rec.considerations && rec.considerations.length > 0 && (
//                         <div className="rec-considerations">
//                           <h4>Things to Consider:</h4>
//                           <ul>
//                             {rec.considerations.map((consideration, idx) => (
//                               <li key={idx}>{consideration}</li>
//                             ))}
//                           </ul>
//                         </div>
//                       )}

//                       {/* Career Outlook */}
//                       {rec.careerOutlook && (
//                         <div className="rec-outlook">
//                           <h4>Career Outlook:</h4>
//                           <p>{rec.careerOutlook}</p>
//                         </div>
//                       )}

//                       {/* Next Steps */}
//                       {rec.nextSteps && rec.nextSteps.length > 0 && (
//                         <div className="rec-next-steps">
//                           <h4>Next Steps:</h4>
//                           <ol>
//                             {rec.nextSteps.map((step, idx) => (
//                               <li key={idx}>{step}</li>
//                             ))}
//                           </ol>
//                         </div>
//                       )}

//                       {/* Average Salary (fallback) */}
//                       {rec.averageSalary && (
//                         <div className="rec-salary">
//                           <span className="salary-label">Average Salary:</span>
//                           <span className="salary-value">{rec.averageSalary}</span>
//                         </div>
//                       )}
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="no-data-card">
//                   <div className="no-data-icon">🎯</div>
//                   <h3>No Recommendations Available</h3>
//                   <p>Complete your profile and assessment to get personalized career recommendations!</p>
//                   <div className="recommendation-actions">
//                     {!hasProfile && (
//                       <button 
//                         onClick={() => window.location.href = '/StudentProfile'}
//                         className="create-btn"
//                       >
//                         Create Profile
//                       </button>
//                     )}
//                     {!hasAssessment && (
//                       <button 
//                         onClick={() => window.location.href = '/assessment'}
//                         className="create-btn"
//                       >
//                         Take Assessment
//                       </button>
//                     )}
//                     {hasProfile && hasAssessment && (
//                       <button 
//                         onClick={generateNewRecommendations}
//                         className="create-btn"
//                         disabled={generatingRecommendations}
//                       >
//                         {generatingRecommendations ? 'Generating...' : 'Generate Recommendations'}
//                       </button>
//                     )}
//                   </div>
//                 </div>
//               )}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ComprehensiveDashboard;

import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import aiRecommendationService from '../utils/aiRecommendationService';
import './styles/ComprehensiveDashboard.css';

const ComprehensiveDashboard = () => {
  // Data states
  const [profile, setProfile] = useState(null);
  const [assessments, setAssessments] = useState([]);
  const [careerQuestions, setCareerQuestions] = useState([]);
  const [skillsQuestions, setSkillsQuestions] = useState([]);
  const [personalityQuestions, setPersonalityQuestions] = useState([]);
  const [recommendations, setRecommendations] = useState([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeSection, setActiveSection] = useState('overview');
  const [selectedAssessmentType, setSelectedAssessmentType] = useState('career');
  const [generatingRecommendations, setGeneratingRecommendations] = useState(false);

  // Assessment completion status
  const [hasProfile, setHasProfile] = useState(false);
  const [hasAssessment, setHasAssessment] = useState(false);

  useEffect(() => {
    fetchAllData();
  }, []);

  const fetchAllData = async () => {
    try {
      await Promise.all([
        fetchProfile(),
        fetchAssessments(),
        fetchQuestions(),
        fetchRecommendations()
      ]);
    } catch (err) {
      console.error('Error fetching dashboard data:', err);
      setError('Failed to load dashboard data');
    } finally {
      setLoading(false);
    }
  };

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/student/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
        setHasProfile(true);
        console.log('✅ Profile loaded:', data.profile?.userId?.name);
      } else {
        setHasProfile(false);
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setHasProfile(false);
    }
  };

  const fetchAssessments = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/assessments/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setAssessments(data.assessments || []);
        setHasAssessment(data.assessments && data.assessments.length > 0);
        console.log('✅ Assessments loaded:', data.assessments?.length || 0);
      } else {
        setHasAssessment(false);
      }
    } catch (err) {
      console.error('Error fetching assessments:', err);
      setHasAssessment(false);
    }
  };

  const fetchQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      
      // Fetch questions with proper error handling
      const fetchQuestionCategory = async (category) => {
        try {
          const response = await fetch(`http://localhost:5000/api/questions/${category}`, {
            headers: { 'Authorization': `Bearer ${token}` }
          });
          
          if (response.ok) {
            const data = await response.json();
            console.log(`✅ ${category} questions loaded:`, data.length);
            return data || [];
          } else {
            console.warn(`⚠️ Failed to fetch ${category} questions:`, response.status);
            return [];
          }
        } catch (err) {
          console.error(`Error fetching ${category} questions:`, err);
          return [];
        }
      };

      const [careerData, skillsData, personalityData] = await Promise.all([
        fetchQuestionCategory('career'),
        fetchQuestionCategory('skills'),
        fetchQuestionCategory('personality')
      ]);

      setCareerQuestions(careerData);
      setSkillsQuestions(skillsData);
      setPersonalityQuestions(personalityData);

      console.log('📊 Questions loaded:', {
        career: careerData.length,
        skills: skillsData.length,
        personality: personalityData.length
      });

    } catch (err) {
      console.error('Error fetching questions:', err);
    }
  };

  const fetchRecommendations = async () => {
    try {
      console.log('📡 Fetching existing recommendations...');
      const response = await aiRecommendationService.getRecommendations();
      
      if (response.success && response.recommendations) {
        console.log('✅ Existing recommendations loaded:', response.recommendations);
        setRecommendations(response.recommendations || []);
      }
    } catch (err) {
      console.log('ℹ️ No existing recommendations found:', err.message);
      setRecommendations([]);
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('profileCompleted');
      localStorage.removeItem('profileId');
      localStorage.removeItem('assessmentCompleted');
      localStorage.removeItem('hasRecommendations');
      
      Notify.success('Logged out successfully!');
      
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  const generateNewRecommendations = async () => {
    if (!hasAssessment) {
      Notify.warning('Please complete the assessment first');
      return;
    }

    setGeneratingRecommendations(true);
    try {
      console.log('🎯 Generating new recommendations...');
      Notify.info('🤖 AI is analyzing your profile and assessment data...');
      
      const result = await aiRecommendationService.generateRecommendations();
      
      if (result.success && result.recommendations) {
        console.log('✅ New recommendations received:', result.recommendations);
        setRecommendations(result.recommendations || []);
        Notify.success('🎉 New AI recommendations generated successfully!');
        
        // Switch to recommendations tab to show results
        setActiveSection('recommendations');
      } else {
        throw new Error('No recommendations received');
      }
    } catch (err) {
      console.error('❌ Failed to generate recommendations:', err);
      Notify.failure('Failed to generate recommendations: ' + err.message);
    } finally {
      setGeneratingRecommendations(false);
    }
  };

  const getQuestionById = (questionId, type) => {
    let questions = [];
    switch (type) {
      case 'career':
        questions = careerQuestions;
        break;
      case 'skills':
        questions = skillsQuestions;
        break;
      case 'personality':
        questions = personalityQuestions;
        break;
      default:
        return null;
    }
    
    // Handle both string and ObjectId formats
    const question = questions.find(q => {
      if (typeof q._id === 'string') {
        return q._id === questionId;
      } else if (q._id && typeof q._id === 'object') {
        return q._id.toString() === questionId;
      }
      return false;
    });
    
    return question;
  };

  const renderAssessmentAnswers = (assessmentData, type) => {
    if (!assessmentData || Object.keys(assessmentData).length === 0) {
      return (
        <div className="no-data">
          <p>No {type} assessment data available</p>
          <button 
            onClick={() => window.location.href = '/assessment'}
            className="take-assessment-btn"
          >
            Take {type.charAt(0).toUpperCase() + type.slice(1)} Assessment
          </button>
        </div>
      );
    }

    const answersArray = Object.entries(assessmentData);
    
    if (answersArray.length === 0) {
      return (
        <div className="no-data">
          <p>No answers found for {type} assessment</p>
        </div>
      );
    }

    return (
      <div className="assessment-answers">
        <div className="answers-header">
          <h4>Your {type.charAt(0).toUpperCase() + type.slice(1)} Assessment Responses</h4>
          <span className="answers-count">{answersArray.length} questions answered</span>
        </div>
        
        {answersArray.map(([questionId, answer], index) => {
          const question = getQuestionById(questionId, type);
          
          return (
            <div key={`${questionId}-${index}`} className="answer-item">
              <div className="question-number">Question {index + 1}</div>
              <div className="question-text">
                {question ? question.question : `Question ID: ${questionId} (Question not found)`}
              </div>
              <div className="answer-text">
                <span className="answer-label">Your Answer:</span>
                <span className="answer-value">{answer || 'No answer provided'}</span>
              </div>
              {question && question.options && (
                <div className="question-options">
                  <small>Available options: {question.options.join(', ')}</small>
                </div>
              )}
            </div>
          );
        })}
      </div>
    );
  };

  const getAssessmentTypeData = (assessment, type) => {
    if (!assessment) return null;
    
    switch (type) {
      case 'career':
        return assessment.careerTest || assessment.careerInterests || null;
      case 'skills':
        return assessment.skillsAssessment || assessment.skills || null;
      case 'personality':
        return assessment.personalityAssessment || assessment.personality || null;
      default:
        return null;
    }
  };

  const getCompletionStatus = () => {
    if (hasProfile && hasAssessment) {
      return { status: 'complete', message: 'Profile and Assessment Complete', color: '#28a745' };
    } else if (hasProfile && !hasAssessment) {
      return { status: 'partial', message: 'Profile Complete - Assessment Pending', color: '#ffc107' };
    } else if (!hasProfile && hasAssessment) {
      return { status: 'partial', message: 'Assessment Complete - Profile Pending', color: '#ffc107' };
    } else {
      return { status: 'incomplete', message: 'Profile and Assessment Incomplete', color: '#dc3545' };
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  if (loading) {
    return (
      <div className="comprehensive-dashboard-container">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading Your Complete Dashboard...</h2>
          <p>Gathering your profile, assessment results, and recommendations</p>
        </div>
      </div>
    );
  }

  const completionStatus = getCompletionStatus();

  return (
    <div className="comprehensive-dashboard-container">
      <div className="dashboard-content">
        {/* Header */}
        <div className="dashboard-header">
          <div className="header-main">
            <div className="profile-avatar">
              {profile?.images && profile.images.length > 0 ? (
                <img 
                  src={`http://localhost:5000${profile.images[0].url}`} 
                  alt="Profile" 
                  className="avatar-image"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="avatar-placeholder"
                style={{ 
                  display: profile?.images && profile.images.length > 0 ? 'none' : 'flex' 
                }}
              >
                {profile?.userId?.name?.charAt(0) || 'U'}
              </div>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{profile?.userId?.name || 'Student'}</h1>
              <p className="profile-email">{profile?.email || 'No email'}</p>
              <div className="status-badge" style={{ background: completionStatus.color }}>
                {completionStatus.message}
              </div>
            </div>
          </div>
          
          <div className="header-actions">
            <button 
              onClick={() => window.location.href = '/EditProfile'} 
              className="action-btn edit-btn"
              disabled={!hasProfile}
            >
              <span className="btn-icon">✏️</span>
              Edit Profile
            </button>
            <button onClick={handleLogout} className="logout-btn">
              <span className="btn-icon">🚪</span>
              Logout
            </button>
            <button 
              onClick={generateNewRecommendations}
              className="action-btn recommend-btn"
              disabled={!hasAssessment || generatingRecommendations}
            >
              <span className="btn-icon">🎯</span>
              {generatingRecommendations ? 'Generating...' : 'Generate Recommendations'}
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-icon">👤</div>
            <div className="stat-content">
              <div className="stat-value">{hasProfile ? 'Complete' : 'Incomplete'}</div>
              <div className="stat-label">Profile Status</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">📋</div>
            <div className="stat-content">
              <div className="stat-value">{assessments.length}</div>
              <div className="stat-label">Assessments Taken</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-value">{profile?.skills?.length || 0}</div>
              <div className="stat-label">Skills Listed</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">🎯</div>
            <div className="stat-content">
              <div className="stat-value">{recommendations.length}</div>
              <div className="stat-label">Career Recommendations</div>
            </div>
          </div>
        </div>

        {/* Navigation */}
        <div className="section-navigation">
          {[
            { id: 'overview', label: 'Overview', icon: '🏠' },
            { id: 'profile', label: 'My Profile', icon: '👤' },
            { id: 'assessment', label: 'Assessment Results', icon: '📊' },
            { id: 'recommendations', label: 'Career Recommendations', icon: '🎯' }
          ].map(section => (
            <button
              key={section.id}
              onClick={() => setActiveSection(section.id)}
              className={`nav-btn ${activeSection === section.id ? 'active' : ''}`}
            >
              <span className="nav-icon">{section.icon}</span>
              <span className="nav-label">{section.label}</span>
            </button>
          ))}
        </div>

        {/* Section Content */}
        <div className="section-content">
          {/* Overview Section */}
          {activeSection === 'overview' && (
            <div className="overview-section">
              <h2 className="section-title">Dashboard Overview</h2>
              
              <div className="overview-grid">
                {/* Completion Status */}
                <div className="overview-card">
                  <h3 className="card-title">Completion Status</h3>
                  <div className="completion-status">
                    <div className="status-item">
                      <span className={`status-indicator ${hasProfile ? 'complete' : 'incomplete'}`}>
                        {hasProfile ? '✅' : '❌'}
                      </span>
                      <span className="status-text">Profile {hasProfile ? 'Complete' : 'Incomplete'}</span>
                    </div>
                    <div className="status-item">
                      <span className={`status-indicator ${hasAssessment ? 'complete' : 'incomplete'}`}>
                        {hasAssessment ? '✅' : '❌'}
                      </span>
                      <span className="status-text">Assessment {hasAssessment ? 'Complete' : 'Incomplete'}</span>
                    </div>
                    <div className="status-item">
                      <span className={`status-indicator ${recommendations.length > 0 ? 'complete' : 'incomplete'}`}>
                        {recommendations.length > 0 ? '✅' : '❌'}
                      </span>
                      <span className="status-text">Recommendations {recommendations.length > 0 ? 'Available' : 'Pending'}</span>
                    </div>
                  </div>
                </div>

                {/* Recent Activity */}
                <div className="overview-card">
                  <h3 className="card-title">Recent Activity</h3>
                  <div className="activity-list">
                    {profile && (
                      <div className="activity-item">
                        <span className="activity-icon">👤</span>
                        <span className="activity-text">Profile last updated: {formatDate(profile.lastUpdated)}</span>
                      </div>
                    )}
                    {assessments.length > 0 && (
                      <div className="activity-item">
                        <span className="activity-icon">📋</span>
                        <span className="activity-text">Last assessment: {formatDate(assessments[0].createdAt)}</span>
                      </div>
                    )}
                    {recommendations.length > 0 && (
                      <div className="activity-item">
                        <span className="activity-icon">🎯</span>
                        <span className="activity-text">{recommendations.length} career recommendations available</span>
                      </div>
                    )}
                  </div>
                </div>

                {/* Quick Actions */}
                <div className="overview-card">
                  <h3 className="card-title">Quick Actions</h3>
                  <div className="quick-actions">
                    {!hasProfile && (
                      <button 
                        onClick={() => window.location.href = '/StudentProfile'}
                        className="quick-action-btn"
                      >
                        <span className="btn-icon">📝</span>
                        Create Profile
                      </button>
                    )}
                    {!hasAssessment && (
                      <button 
                        onClick={() => window.location.href = '/assessment'}
                        className="quick-action-btn"
                      >
                        <span className="btn-icon">🧠</span>
                        Take Assessment
                      </button>
                    )}
                    {hasProfile && hasAssessment && (
                      <button 
                        onClick={generateNewRecommendations}
                        className="quick-action-btn"
                        disabled={generatingRecommendations}
                      >
                        <span className="btn-icon">🔄</span>
                        {generatingRecommendations ? 'Generating...' : 'Refresh Recommendations'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Profile Section */}
          {activeSection === 'profile' && (
            <div className="profile-section">
              <h2 className="section-title">My Profile</h2>
              {hasProfile ? (
                <div className="profile-content">
                  {/* Personal Information */}
                  <div className="info-card">
                    <h3 className="card-title">Personal Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Full Name:</span>
                        <span className="info-value">{profile.userId?.name || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{profile.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Age:</span>
                        <span className="info-value">{profile.age || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Gender:</span>
                        <span className="info-value">{profile.gender || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Nationality:</span>
                        <span className="info-value">{profile.nationality || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Country:</span>
                        <span className="info-value">{profile.country || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Academic Information */}
                  <div className="info-card">
                    <h3 className="card-title">Academic Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Desired Faculty:</span>
                        <span className="info-value">{profile.desiredFaculty || 'Not specified'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Desired Department:</span>
                        <span className="info-value">{profile.desiredDepartment || 'Not specified'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Current Level:</span>
                        <span className="info-value">{profile.currentAcademicLevel || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Program:</span>
                        <span className="info-value">{profile.studentProgram || 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">High School Grades:</span>
                        <span className="info-value">{profile.highSchoolGrades ? `${profile.highSchoolGrades}%` : 'N/A'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Secondary Courses:</span>
                        <span className="info-value">{profile.coursesStudiedInSecondary || 'N/A'}</span>
                      </div>
                    </div>
                  </div>

                  {/* Skills */}
                  {profile.skills && profile.skills.length > 0 && (
                    <div className="info-card">
                      <h3 className="card-title">Skills ({profile.skills.length})</h3>
                      <div className="skills-grid">
                        {profile.skills.map((skill, index) => (
                          <div key={index} className="skill-item">
                            <span className="skill-name">{skill.skillName}</span>
                            <span className={`skill-level ${skill.proficiencyLevel.toLowerCase()}`}>
                              {skill.proficiencyLevel}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {profile.languagesSpoken && profile.languagesSpoken.length > 0 && (
                    <div className="info-card">
                      <h3 className="card-title">Languages ({profile.languagesSpoken.length})</h3>
                      <div className="languages-grid">
                        {profile.languagesSpoken.map((lang, index) => (
                          <div key={index} className="language-item">
                            <span className="language-name">{lang.language}</span>
                            <span className={`language-level ${lang.proficiency.toLowerCase()}`}>
                              {lang.proficiency}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Work Experience */}
                  {profile.workExperience && profile.workExperience.length > 0 && (
                    <div className="info-card">
                      <h3 className="card-title">Work Experience ({profile.workExperience.length})</h3>
                      <div className="work-experience-list">
                        {profile.workExperience.map((exp, index) => (
                          <div key={index} className="experience-item">
                            <h4 className="job-title">{exp.jobTitle}</h4>
                            <div className="company-duration">
                              <span className="company">{exp.company}</span>
                              {exp.duration && <span className="duration">({exp.duration})</span>}
                            </div>
                            {exp.description && (
                              <p className="job-description">{exp.description}</p>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Career Goals */}
                  {profile.careerGoals && (
                    <div className="info-card">
                      <h3 className="card-title">Career Goals</h3>
                      <p className="career-goals-text">{profile.careerGoals}</p>
                    </div>
                  )}

                  {/* Interests */}
                  {profile.interests && (
                    <div className="info-card">
                      <h3 className="card-title">Interests</h3>
                      <div className="interests-text">
                        {Array.isArray(profile.interests) 
                          ? profile.interests.join(', ') 
                          : profile.interests
                        }
                      </div>
                    </div>
                  )}
                </div>
              ) : (
                <div className="no-data-card">
                  <div className="no-data-icon">📝</div>
                  <h3>No Profile Found</h3>
                  <p>You haven't created your profile yet. Create one to get started!</p>
                  <button 
                    onClick={() => window.location.href = '/StudentProfile'}
                    className="create-btn"
                  >
                    Create Profile
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Assessment Section */}
          {activeSection === 'assessment' && (
            <div className="assessment-section">
              <h2 className="section-title">Assessment Results</h2>
              {hasAssessment && assessments.length > 0 ? (
                <div className="assessment-content">
                  {/* Debug Information */}
                  <div className="debug-info" style={{ marginBottom: '20px', padding: '10px', background: '#f8f9fa', borderRadius: '5px' }}>
                    <small>
                      <strong>Debug Info:</strong> 
                      Questions loaded - Career: {careerQuestions.length}, Skills: {skillsQuestions.length}, Personality: {personalityQuestions.length}
                      <br />
                      Assessment data keys: {assessments[0] ? Object.keys(assessments[0]).join(', ') : 'No assessment data'}
                    </small>
                  </div>

                  {/* Assessment Type Selector */}
                  <div className="assessment-type-selector">
                    {['career', 'skills', 'personality'].map(type => {
                      const assessmentData = getAssessmentTypeData(assessments[0], type);
                      const hasData = assessmentData && Object.keys(assessmentData).length > 0;
                      
                      return (
                        <button
                          key={type}
                          onClick={() => setSelectedAssessmentType(type)}
                          className={`type-btn ${selectedAssessmentType === type ? 'active' : ''} ${!hasData ? 'no-data' : ''}`}
                        >
                          <span className="type-icon">
                            {type === 'career' ? '💼' : type === 'skills' ? '⚡' : '🧠'}
                          </span>
                          <span className="type-label">
                            {type.charAt(0).toUpperCase() + type.slice(1)}
                            {hasData && (
                              <span className="data-count">
                                ({Object.keys(assessmentData).length})
                              </span>
                            )}
                          </span>
                        </button>
                      );
                    })}
                  </div>

                  {/* Assessment Results */}
                  <div className="assessment-results">
                    <h3 className="results-title">
                      {selectedAssessmentType.charAt(0).toUpperCase() + selectedAssessmentType.slice(1)} Assessment Results
                    </h3>
                    
                    {assessments.length > 0 && (
                      <div className="results-content">
                        {renderAssessmentAnswers(
                          getAssessmentTypeData(assessments[0], selectedAssessmentType), 
                          selectedAssessmentType
                        )}
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="no-data-card">
                  <div className="no-data-icon">📊</div>
                  <h3>No Assessment Results</h3>
                  <p>You haven't taken the career assessment yet. Take it to see your results!</p>
                  <button 
                    onClick={() => window.location.href = '/assessment'}
                    className="create-btn"
                  >
                    Take Assessment
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Recommendations Section */}
          {activeSection === 'recommendations' && (
            <div className="recommendations-section">
              <h2 className="section-title">Career Recommendations</h2>
              {recommendations.length > 0 ? (
                <div className="recommendations-grid">
                  {recommendations.map((rec, index) => (
                    <div key={index} className="recommendation-card">
                      <div className="rec-header">
                        <h3 className="rec-title">
                          {rec.faculty || rec.careerTitle}
                        </h3>
                        <div className="match-percentage">
                          {rec.matchPercentage}% Match
                        </div>
                      </div>
                      <h4 className="rec-department">
                        {rec.department}
                      </h4>
                      <p className="rec-description">
                        {rec.reasoning || rec.description}
                      </p>
                      
                      {/* Strengths */}
                      {rec.strengths && rec.strengths.length > 0 && (
                        <div className="rec-skills">
                          <h4>Your Strengths:</h4>
                          <div className="skills-tags">
                            {rec.strengths.map((strength, idx) => (
                              <span key={idx} className="skill-tag">{strength}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Skills (fallback for older format) */}
                      {rec.skills && rec.skills.length > 0 && !rec.strengths && (
                        <div className="rec-skills">
                          <h4>Required Skills:</h4>
                          <div className="skills-tags">
                            {rec.skills.map((skill, idx) => (
                              <span key={idx} className="skill-tag">{skill}</span>
                            ))}
                          </div>
                        </div>
                      )}

                      {/* Considerations */}
                      {rec.considerations && rec.considerations.length > 0 && (
                        <div className="rec-considerations">
                          <h4>Things to Consider:</h4>
                          <ul>
                            {rec.considerations.map((consideration, idx) => (
                              <li key={idx}>{consideration}</li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Career Outlook */}
                      {rec.careerOutlook && (
                        <div className="rec-outlook">
                          <h4>Career Outlook:</h4>
                          <p>{rec.careerOutlook}</p>
                        </div>
                      )}

                      {/* Next Steps */}
                      {rec.nextSteps && rec.nextSteps.length > 0 && (
                        <div className="rec-next-steps">
                          <h4>Next Steps:</h4>
                          <ol>
                            {rec.nextSteps.map((step, idx) => (
                              <li key={idx}>{step}</li>
                            ))}
                          </ol>
                        </div>
                      )}

                      {/* Average Salary (fallback) */}
                      {rec.averageSalary && (
                        <div className="rec-salary">
                          <span className="salary-label">Average Salary:</span>
                          <span className="salary-value">{rec.averageSalary}</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-data-card">
                  <div className="no-data-icon">🎯</div>
                  <h3>No Recommendations Available</h3>
                  <p>Complete your profile and assessment to get personalized career recommendations!</p>
                  <div className="recommendation-actions">
                    {!hasProfile && (
                      <button 
                        onClick={() => window.location.href = '/StudentProfile'}
                        className="create-btn"
                      >
                        Create Profile
                      </button>
                    )}
                    {!hasAssessment && (
                      <button 
                        onClick={() => window.location.href = '/assessment'}
                        className="create-btn"
                      >
                        Take Assessment
                      </button>
                    )}
                    {hasProfile && hasAssessment && (
                      <button 
                        onClick={generateNewRecommendations}
                        className="create-btn"
                        disabled={generatingRecommendations}
                      >
                        {generatingRecommendations ? 'Generating...' : 'Generate Recommendations'}
                      </button>
                    )}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ComprehensiveDashboard;