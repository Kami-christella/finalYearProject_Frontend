// // import React, { useState, useEffect } from 'react';
// // import { Notify } from 'notiflix';

// // const ProfileDashboard = () => {
// //   const [profile, setProfile] = useState(null);
// //   const [loading, setLoading] = useState(true);
// //   const [error, setError] = useState('');
// //   const [activeTab, setActiveTab] = useState('overview');

// //   useEffect(() => {
// //     fetchProfile();
// //   }, []);

// //   const fetchProfile = async () => {
// //     try {
// //       const token = localStorage.getItem('token');
// //       if (!token) {
// //         setError('Please log in to view your profile');
// //         setLoading(false);
// //         return;
// //       }

// //       const response = await fetch('http://localhost:5000/api/student/profile', {
// //         headers: {
// //           'Authorization': `Bearer ${token}`,
// //           'Content-Type': 'application/json'
// //         }
// //       });

// //       if (response.ok) {
// //         const data = await response.json();
// //         setProfile(data.profile);
// //       } else if (response.status === 404) {
// //         setError('Profile not found. Please create your profile first.');
// //       } else {
// //         throw new Error('Failed to fetch profile');
// //       }
// //     } catch (err) {
// //       console.error('Error fetching profile:', err);
// //       setError('Failed to load profile. Please try again.');
// //       Notify.failure('Failed to load profile');
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   const goToAssessment = () => {
// //     window.location.href = '/assessment';
// //   };

// //   const goToEditProfile = () => {
// //     window.location.href = '/edit-profile'; 
// //   };

// //   const goToCreateProfile = () => {
// //     window.location.href = '/StudentProfile';
// //   };

// //   const formatDate = (dateString) => {
// //     if (!dateString) return 'Not provided';
// //     return new Date(dateString).toLocaleDateString('en-US', {
// //       year: 'numeric',
// //       month: 'long',
// //       day: 'numeric'
// //     });
// //   };

// //   if (loading) {
// //     return (
// //       <div className="dashboard-container">
// //         <div className="loading-card">
// //           <div className="loading-spinner"></div>
// //           <h2>Loading Your Profile...</h2>
// //           <p>Please wait while we fetch your information</p>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (error) {
// //     return (
// //       <div className="dashboard-container">
// //         <div className="error-card">
// //           <div className="error-icon">📝</div>
// //           <h2>No Profile Found</h2>
// //           <p>{error}</p>
// //           <button onClick={goToCreateProfile} className="create-profile-btn">
// //             <span className="btn-icon">✨</span>
// //             Create Your Profile
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   if (!profile) {
// //     return (
// //       <div className="dashboard-container">
// //         <div className="error-card">
// //           <h2>No Profile Data</h2>
// //           <p>Unable to load profile information.</p>
// //           <button onClick={fetchProfile} className="retry-btn">
// //             Retry
// //           </button>
// //         </div>
// //       </div>
// //     );
// //   }

// //   return (
// //     <div className="dashboard-container">
// //       <div className="dashboard-content">
// //         {/* Header with Profile Info */}
// //         <div className="profile-header">
// //           <div className="header-main">
// //             <div className="profile-avatar">
// //               {profile.images && profile.images.length > 0 ? (
// //                 <img src={profile.images[0].url} alt="Profile" className="avatar-image" />
// //               ) : (
// //                 <div className="avatar-placeholder">
// //                   {profile.userId?.name?.charAt(0) || 'U'}
// //                 </div>
// //               )}
// //             </div>
// //             <div className="profile-info">
// //               <h1 className="profile-name">{profile.userId?.name || 'Student'}</h1>
// //               <p className="profile-email">{profile.email}</p>
// //               <div className="profile-badges">
// //                 <span className="badge success">Profile Complete</span>
// //                 <span className="badge info">{profile.desiredFaculty || 'Faculty: Not selected'}</span>
// //               </div>
// //             </div>
// //           </div>
          
// //           <div className="header-actions">
// //             <button onClick={goToEditProfile} className="edit-btn">
// //               <span className="btn-icon">✏️</span>
// //               Edit Profile
// //             </button>
// //           </div>
// //         </div>

// //         {/* Quick Stats */}
// //         <div className="stats-section">
// //           <div className="stat-card">
// //             <div className="stat-icon">📊</div>
// //             <div className="stat-content">
// //               <span className="stat-number">{profile.completionPercentage || 100}%</span>
// //               <span className="stat-label">Profile Complete</span>
// //             </div>
// //           </div>
// //           <div className="stat-card">
// //             <div className="stat-icon">⚡</div>
// //             <div className="stat-content">
// //               <span className="stat-number">{profile.skills?.length || 0}</span>
// //               <span className="stat-label">Skills Listed</span>
// //             </div>
// //           </div>
// //           <div className="stat-card">
// //             <div className="stat-icon">💡</div>
// //             <div className="stat-content">
// //               <span className="stat-number">{profile.interests?.length || 0}</span>
// //               <span className="stat-label">Interests</span>
// //             </div>
// //           </div>
// //           <div className="stat-card">
// //             <div className="stat-icon">💼</div>
// //             <div className="stat-content">
// //               <span className="stat-number">{profile.workExperience?.length || 0}</span>
// //               <span className="stat-label">Work Experience</span>
// //             </div>
// //           </div>
// //         </div>

// //         {/* Call to Action - Assessment */}
// //         <div className="cta-section">
// //           <div className="cta-content">
// //             <div className="cta-text">
// //               <h2 className="cta-title">🎯 Ready to Discover Your Career Path?</h2>
// //               <p className="cta-subtitle">
// //                 Take our comprehensive career assessment to get personalized recommendations 
// //                 based on your profile, interests, and skills.
// //               </p>
// //               <ul className="cta-features">
// //                 <li>✨ Personality assessment</li>
// //                 <li>💼 Career interest analysis</li>
// //                 <li>⚡ Skills evaluation</li>
// //                 <li>🎯 Personalized recommendations</li>
// //               </ul>
// //             </div>
// //             <button onClick={goToAssessment} className="assessment-cta-btn">
// //               <span className="btn-icon">🚀</span>
// //               <div className="btn-content">
// //                 <span className="btn-title">Start Career Assessment</span>
// //                 <span className="btn-subtitle">~15 minutes to complete</span>
// //               </div>
// //               <span className="btn-arrow">→</span>
// //             </button>
// //           </div>
// //         </div>

// //         {/* Navigation Tabs */}
// //         <div className="tabs-navigation">
// //           {[
// //             { id: 'overview', label: 'Overview', icon: '👤' },
// //             { id: 'academic', label: 'Academic Info', icon: '🎓' },
// //             { id: 'experience', label: 'Experience & Skills', icon: '💼' },
// //             { id: 'goals', label: 'Goals & Interests', icon: '🎯' }
// //           ].map(tab => (
// //             <button
// //               key={tab.id}
// //               onClick={() => setActiveTab(tab.id)}
// //               className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
// //             >
// //               <span className="tab-icon">{tab.icon}</span>
// //               <span className="tab-label">{tab.label}</span>
// //             </button>
// //           ))}
// //         </div>

// //         {/* Tab Content */}
// //         <div className="tab-content">
// //           {activeTab === 'overview' && (
// //             <div className="tab-panel">
// //               <div className="info-grid">
// //                 <div className="info-card">
// //                   <h3 className="card-title">Personal Information</h3>
// //                   <div className="info-rows">
// //                     <div className="info-row">
// //                       <span className="info-label">Full Name:</span>
// //                       <span className="info-value">{profile.userId?.name || 'N/A'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Date of Birth:</span>
// //                       <span className="info-value">{formatDate(profile.dateOfBirth)}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Age:</span>
// //                       <span className="info-value">{profile.age || 'N/A'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Gender:</span>
// //                       <span className="info-value">{profile.gender || 'N/A'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Nationality:</span>
// //                       <span className="info-value">{profile.nationality || 'N/A'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Country:</span>
// //                       <span className="info-value">{profile.country || 'N/A'}</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="info-card">
// //                   <h3 className="card-title">Contact Information</h3>
// //                   <div className="info-rows">
// //                     <div className="info-row">
// //                       <span className="info-label">Email:</span>
// //                       <span className="info-value">{profile.email}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Phone:</span>
// //                       <span className="info-value">{profile.phoneNumber || 'N/A'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Marital Status:</span>
// //                       <span className="info-value">{profile.maritalStatus || 'N/A'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Religion:</span>
// //                       <span className="info-value">{profile.yourReligion || 'N/A'}</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 {profile.emergencyContact && (
// //                   <div className="info-card">
// //                     <h3 className="card-title">Emergency Contact</h3>
// //                     <div className="info-rows">
// //                       <div className="info-row">
// //                         <span className="info-label">Name:</span>
// //                         <span className="info-value">{profile.emergencyContact.name || 'N/A'}</span>
// //                       </div>
// //                       <div className="info-row">
// //                         <span className="info-label">Relationship:</span>
// //                         <span className="info-value">{profile.emergencyContact.relationship || 'N/A'}</span>
// //                       </div>
// //                       <div className="info-row">
// //                         <span className="info-label">Phone:</span>
// //                         <span className="info-value">{profile.emergencyContact.phoneNumber || 'N/A'}</span>
// //                       </div>
// //                       <div className="info-row">
// //                         <span className="info-label">Email:</span>
// //                         <span className="info-value">{profile.emergencyContact.email || 'N/A'}</span>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 )}
// //               </div>
// //             </div>
// //           )}

// //           {activeTab === 'academic' && (
// //             <div className="tab-panel">
// //               <div className="info-grid">
// //                 <div className="info-card">
// //                   <h3 className="card-title">Academic Background</h3>
// //                   <div className="info-rows">
// //                     <div className="info-row">
// //                       <span className="info-label">Current Academic Level:</span>
// //                       <span className="info-value">{profile.currentAcademicLevel || 'N/A'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Student Type:</span>
// //                       <span className="info-value">{profile.studentType || 'N/A'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Program:</span>
// //                       <span className="info-value">{profile.studentProgram || 'N/A'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">High School Grades:</span>
// //                       <span className="info-value">{profile.highSchoolGrades || 'N/A'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Two Principal Passes:</span>
// //                       <span className="info-value">{profile.haveTwoPrincipalPasses ? 'Yes' : 'No'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Sponsorship:</span>
// //                       <span className="info-value">{profile.sponsorshipDetails || 'N/A'}</span>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="info-card">
// //                   <h3 className="card-title">Course Preferences</h3>
// //                   <div className="info-rows">
// //                     <div className="info-row">
// //                       <span className="info-label">Desired Faculty:</span>
// //                       <span className="info-value">{profile.desiredFaculty || 'Not specified'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Desired Department:</span>
// //                       <span className="info-value">{profile.desiredDepartment || 'Not specified'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Secondary Courses:</span>
// //                       <span className="info-value">
// //                         {profile.coursesStudiedInSecondary || 'Not specified'}
// //                       </span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {activeTab === 'experience' && (
// //             <div className="tab-panel">
// //               <div className="experience-section">
// //                 {/* Skills */}
// //                 <div className="info-card">
// //                   <h3 className="card-title">Skills ({profile.skills?.length || 0})</h3>
// //                   {profile.skills && profile.skills.length > 0 ? (
// //                     <div className="skills-grid">
// //                       {profile.skills.map((skill, index) => (
// //                         <div key={index} className="skill-item">
// //                           <span className="skill-name">{skill.skillName}</span>
// //                           <span className={`skill-level ${skill.proficiencyLevel.toLowerCase()}`}>
// //                             {skill.proficiencyLevel}
// //                           </span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <p className="no-data">No skills listed</p>
// //                   )}
// //                 </div>

// //                 {/* Languages */}
// //                 <div className="info-card">
// //                   <h3 className="card-title">Languages ({profile.languagesSpoken?.length || 0})</h3>
// //                   {profile.languagesSpoken && profile.languagesSpoken.length > 0 ? (
// //                     <div className="languages-grid">
// //                       {profile.languagesSpoken.map((lang, index) => (
// //                         <div key={index} className="language-item">
// //                           <span className="language-name">{lang.language}</span>
// //                           <span className={`language-level ${lang.proficiency.toLowerCase()}`}>
// //                             {lang.proficiency}
// //                           </span>
// //                         </div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <p className="no-data">No languages listed</p>
// //                   )}
// //                 </div>

// //                 {/* Work Experience */}
// //                 <div className="info-card">
// //                   <h3 className="card-title">Work Experience ({profile.workExperience?.length || 0})</h3>
// //                   {profile.workExperience && profile.workExperience.length > 0 ? (
// //                     <div className="experience-list">
// //                       {profile.workExperience.map((exp, index) => (
// //                         <div key={index} className="experience-item">
// //                           <div className="exp-header">
// //                             <h4 className="exp-title">{exp.jobTitle}</h4>
// //                             {exp.isCurrent && <span className="current-badge">Current</span>}
// //                           </div>
// //                           <p className="exp-company">{exp.company}</p>
// //                           <p className="exp-duration">{exp.duration}</p>
// //                           {exp.description && <p className="exp-description">{exp.description}</p>}
// //                         </div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <p className="no-data">No work experience listed</p>
// //                   )}
// //                 </div>

// //                 {/* Extracurricular Activities */}
// //                 <div className="info-card">
// //                   <h3 className="card-title">Extracurricular Activities ({profile.extracurricularActivities?.length || 0})</h3>
// //                   {profile.extracurricularActivities && profile.extracurricularActivities.length > 0 ? (
// //                     <div className="activities-list">
// //                       {profile.extracurricularActivities.map((activity, index) => (
// //                         <div key={index} className="activity-item">
// //                           <h4 className="activity-name">{activity.activity}</h4>
// //                           <p className="activity-role">{activity.role} at {activity.organization}</p>
// //                           {activity.description && <p className="activity-description">{activity.description}</p>}
// //                         </div>
// //                       ))}
// //                     </div>
// //                   ) : (
// //                     <p className="no-data">No activities listed</p>
// //                   )}
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {activeTab === 'goals' && (
// //             <div className="tab-panel">
// //               <div className="info-grid">
// //                 <div className="info-card">
// //                   <h3 className="card-title">Personal Interests</h3>
// //                   <div className="info-rows">
// //                     <div className="info-row">
// //                       <span className="info-label">Hobbies:</span>
// //                       <span className="info-value">{profile.hobbies || 'Not specified'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Interests:</span>
// //                       <div className="interests-tags">
// //                         {profile.interests && profile.interests.length > 0 ? (
// //                           profile.interests.map((interest, index) => (
// //                             <span key={index} className="interest-tag">{interest}</span>
// //                           ))
// //                         ) : (
// //                           <span className="info-value">Not specified</span>
// //                         )}
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="info-card">
// //                   <h3 className="card-title">Career Goals</h3>
// //                   <div className="career-goals-content">
// //                     {profile.careerGoals ? (
// //                       <p className="goals-text">{profile.careerGoals}</p>
// //                     ) : (
// //                       <p className="no-data">No career goals specified</p>
// //                     )}
// //                   </div>
// //                 </div>

// //                 <div className="info-card">
// //                   <h3 className="card-title">Employment Status</h3>
// //                   <div className="info-rows">
// //                     <div className="info-row">
// //                       <span className="info-label">Current Employment:</span>
// //                       <span className="info-value">{profile.haveJob || 'Not specified'}</span>
// //                     </div>
// //                     <div className="info-row">
// //                       <span className="info-label">Disability Status:</span>
// //                       <span className="info-value">{profile.disability || 'None'}</span>
// //                     </div>
// //                   </div>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </div>
// //       </div>

// //       <style jsx>{`
// //         .dashboard-container {
// //           min-height: 100vh;
// //           background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
// //           padding: 2rem;
// //         }

// //         .dashboard-content {
// //           max-width: 1200px;
// //           margin: 0 auto;
// //         }

// //         .loading-card, .error-card {
// //           background: white;
// //           border-radius: 20px;
// //           padding: 3rem;
// //           text-align: center;
// //           box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
// //           max-width: 500px;
// //           margin: 0 auto;
// //         }

// //         .loading-spinner {
// //           width: 60px;
// //           height: 60px;
// //           border: 4px solid #e2e8f0;
// //           border-top: 4px solid #667eea;
// //           border-radius: 50%;
// //           animation: spin 1s linear infinite;
// //           margin: 0 auto 1rem;
// //         }

// //         @keyframes spin {
// //           0% { transform: rotate(0deg); }
// //           100% { transform: rotate(360deg); }
// //         }

// //         .error-icon {
// //           font-size: 4rem;
// //           margin-bottom: 1rem;
// //         }

// //         .create-profile-btn, .retry-btn {
// //           background: linear-gradient(135deg, #667eea, #764ba2);
// //           color: white;
// //           border: none;
// //           padding: 1rem 2rem;
// //           border-radius: 10px;
// //           font-size: 1rem;
// //           font-weight: 600;
// //           cursor: pointer;
// //           transition: all 0.2s ease;
// //           margin-top: 1rem;
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 0.5rem;
// //         }

// //         .create-profile-btn:hover, .retry-btn:hover {
// //           transform: translateY(-2px);
// //           box-shadow: 0 8px 25px rgba(102, 126, 234, 0.4);
// //         }

// //         .profile-header {
// //           background: white;
// //           border-radius: 20px;
// //           padding: 2rem;
// //           margin-bottom: 2rem;
// //           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //         }

// //         .header-main {
// //           display: flex;
// //           align-items: center;
// //           gap: 1.5rem;
// //         }

// //         .profile-avatar {
// //           flex-shrink: 0;
// //         }

// //         .avatar-image, .avatar-placeholder {
// //           width: 80px;
// //           height: 80px;
// //           border-radius: 50%;
// //           border: 3px solid #667eea;
// //         }

// //         .avatar-placeholder {
// //           background: linear-gradient(135deg, #667eea, #764ba2);
// //           color: white;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           font-size: 2rem;
// //           font-weight: 700;
// //         }

// //         .profile-name {
// //           font-size: 2rem;
// //           font-weight: 700;
// //           color: #2d3748;
// //           margin-bottom: 0.5rem;
// //         }

// //         .profile-email {
// //           color: #718096;
// //           font-size: 1.1rem;
// //           margin-bottom: 1rem;
// //         }

// //         .profile-badges {
// //           display: flex;
// //           gap: 0.75rem;
// //         }

// //         .badge {
// //           padding: 0.5rem 1rem;
// //           border-radius: 20px;
// //           font-size: 0.875rem;
// //           font-weight: 500;
// //         }

// //         .badge.success {
// //           background: #c6f6d5;
// //           color: #2f855a;
// //         }

// //         .badge.info {
// //           background: #bee3f8;
// //           color: #2b6cb0;
// //         }

// //         .edit-btn {
// //           background: #f7fafc;
// //           color: #4a5568;
// //           border: 2px solid #e2e8f0;
// //           padding: 0.75rem 1.5rem;
// //           border-radius: 10px;
// //           font-weight: 600;
// //           cursor: pointer;
// //           transition: all 0.2s ease;
// //           display: flex;
// //           align-items: center;
// //           gap: 0.5rem;
// //         }

// //         .edit-btn:hover {
// //           background: white;
// //           border-color: #667eea;
// //           color: #667eea;
// //           transform: translateY(-1px);
// //         }

// //         .stats-section {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
// //           gap: 1.5rem;
// //           margin-bottom: 2rem;
// //         }

// //         .stat-card {
// //           background: white;
// //           border-radius: 15px;
// //           padding: 1.5rem;
// //           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
// //           display: flex;
// //           align-items: center;
// //           gap: 1rem;
// //           transition: all 0.2s ease;
// //         }

// //         .stat-card:hover {
// //           transform: translateY(-2px);
// //           box-shadow: 0 10px 25px rgba(0, 0, 0, 0.15);
// //         }

// //         .stat-icon {
// //           font-size: 2rem;
// //           padding: 0.75rem;
// //           background: #f7fafc;
// //           border-radius: 10px;
// //         }

// //         .stat-number {
// //           display: block;
// //           font-size: 1.5rem;
// //           font-weight: 700;
// //           color: #2d3748;
// //         }

// //         .stat-label {
// //           font-size: 0.875rem;
// //           color: #718096;
// //         }

// //         .cta-section {
// //           background: linear-gradient(135deg, rgba(102, 126, 234, 0.1), rgba(118, 75, 162, 0.1));
// //           border: 2px solid rgba(102, 126, 234, 0.2);
// //           border-radius: 20px;
// //           padding: 2.5rem;
// //           margin-bottom: 2rem;
// //           text-align: center;
// //         }

// //         .cta-title {
// //           font-size: 2rem;
// //           font-weight: 700;
// //           color: #2d3748;
// //           margin-bottom: 1rem;
// //         }

// //         .cta-subtitle {
// //           font-size: 1.1rem;
// //           color: #4a5568;
// //           margin-bottom: 1.5rem;
// //           max-width: 600px;
// //           margin-left: auto;
// //           margin-right: auto;
// //         }

// //         .cta-features {
// //           list-style: none;
// //           padding: 0;
// //           display: flex;
// //           justify-content: center;
// //           gap: 2rem;
// //           margin-bottom: 2rem;
// //           flex-wrap: wrap;
// //         }

// //         .cta-features li {
// //           color: #4a5568;
// //           font-weight: 500;
// //         }

// //         .assessment-cta-btn {
// //           background: linear-gradient(135deg, #667eea, #764ba2);
// //           color: white;
// //           border: none;
// //           padding: 1.5rem 2.5rem;
// //           border-radius: 15px;
// //           cursor: pointer;
// //           transition: all 0.3s ease;
// //           display: inline-flex;
// //           align-items: center;
// //           gap: 1rem;
// //           font-size: 1.1rem;
// //           box-shadow: 0 10px 30px rgba(102, 126, 234, 0.3);
// //         }

// //         .assessment-cta-btn:hover {
// //           transform: translateY(-3px);
// //           box-shadow: 0 15px 40px rgba(102, 126, 234, 0.4);
// //         }

// //         .btn-content {
// //           display: flex;
// //           flex-direction: column;
// //           align-items: flex-start;
// //         }

// //         .btn-title {
// //           font-weight: 700;
// //           font-size: 1.2rem;
// //         }

// //         .btn-subtitle {
// //           font-size: 0.9rem;
// //           opacity: 0.9;
// //         }

// //         .btn-icon {
// //           font-size: 1.5rem;
// //         }

// //         .btn-arrow {
// //           font-size: 1.3rem;
// //           transition: transform 0.2s ease;
// //         }

// //         .assessment-cta-btn:hover .btn-arrow {
// //           transform: translateX(3px);
// //         }

// //         .tabs-navigation {
// //           display: flex;
// //           background: white;
// //           border-radius: 15px;
// //           padding: 0.5rem;
// //           margin-bottom: 2rem;
// //           box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
// //           gap: 0.5rem;
// //         }

// //         .tab-btn {
// //           flex: 1;
// //           display: flex;
// //           align-items: center;
// //           justify-content: center;
// //           gap: 0.5rem;
// //           padding: 1rem;
// //           border: none;
// //           border-radius: 10px;
// //           background: transparent;
// //           color: #718096;
// //           cursor: pointer;
// //           transition: all 0.2s ease;
// //           font-weight: 500;
// //         }

// //         .tab-btn.active {
// //           background: linear-gradient(135deg, #667eea, #764ba2);
// //           color: white;
// //           box-shadow: 0 4px 15px rgba(102, 126, 234, 0.3);
// //         }

// //         .tab-btn:hover:not(.active) {
// //           background: #f7fafc;
// //           color: #4a5568;
// //         }

// //         .tab-icon {
// //           font-size: 1.1rem;
// //         }

// //         .tab-content {
// //           background: white;
// //           border-radius: 20px;
// //           padding: 2.5rem;
// //           box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
// //         }

// //         .tab-panel {
// //           animation: fadeIn 0.3s ease-in-out;
// //         }

// //         @keyframes fadeIn {
// //           from { opacity: 0; transform: translateY(10px); }
// //           to { opacity: 1; transform: translateY(0); }
// //         }

// //         .info-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fit, minmax(350px, 1fr));
// //           gap: 2rem;
// //         }

// //         .info-card {
// //           background: #f8fafc;
// //           border-radius: 15px;
// //           padding: 1.5rem;
// //           border: 1px solid #e2e8f0;
// //         }

// //         .card-title {
// //           font-size: 1.2rem;
// //           font-weight: 600;
// //           color: #2d3748;
// //           margin-bottom: 1.5rem;
// //           padding-bottom: 0.75rem;
// //           border-bottom: 2px solid #e2e8f0;
// //         }

// //         .info-rows {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 1rem;
// //         }

// //         .info-row {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: flex-start;
// //           padding: 0.75rem 0;
// //           border-bottom: 1px solid #f1f5f9;
// //         }

// //         .info-row:last-child {
// //           border-bottom: none;
// //         }

// //         .info-label {
// //           font-weight: 500;
// //           color: #4a5568;
// //           min-width: 120px;
// //         }

// //         .info-value {
// //           color: #2d3748;
// //           font-weight: 600;
// //           text-align: right;
// //           flex: 1;
// //         }

// //         .no-data {
// //           color: #718096;
// //           font-style: italic;
// //           text-align: center;
// //           padding: 2rem;
// //         }

// //         .skills-grid, .languages-grid {
// //           display: grid;
// //           grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
// //           gap: 1rem;
// //         }

// //         .skill-item, .language-item {
// //           background: white;
// //           border-radius: 10px;
// //           padding: 1rem;
// //           border: 1px solid #e2e8f0;
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //         }

// //         .skill-name, .language-name {
// //           font-weight: 600;
// //           color: #2d3748;
// //         }

// //         .skill-level, .language-level {
// //           padding: 0.25rem 0.75rem;
// //           border-radius: 15px;
// //           font-size: 0.8rem;
// //           font-weight: 500;
// //         }

// //         .skill-level.beginner, .language-level.basic {
// //           background: #fed7d7;
// //           color: #c53030;
// //         }

// //         .skill-level.intermediate, .language-level.conversational {
// //           background: #fefcbf;
// //           color: #d69e2e;
// //         }

// //         .skill-level.advanced, .language-level.fluent {
// //           background: #c6f6d5;
// //           color: #2f855a;
// //         }

// //         .skill-level.expert, .language-level.native {
// //           background: #bee3f8;
// //           color: #2b6cb0;
// //         }

// //         .experience-list, .activities-list {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 1.5rem;
// //         }

// //         .experience-item, .activity-item {
// //           background: white;
// //           border-radius: 10px;
// //           padding: 1.5rem;
// //           border: 1px solid #e2e8f0;
// //           border-left: 4px solid #667eea;
// //         }

// //         .exp-header {
// //           display: flex;
// //           justify-content: space-between;
// //           align-items: center;
// //           margin-bottom: 0.5rem;
// //         }

// //         .exp-title, .activity-name {
// //           font-size: 1.1rem;
// //           font-weight: 600;
// //           color: #2d3748;
// //           margin: 0;
// //         }

// //         .current-badge {
// //           background: #c6f6d5;
// //           color: #2f855a;
// //           padding: 0.25rem 0.75rem;
// //           border-radius: 15px;
// //           font-size: 0.8rem;
// //           font-weight: 500;
// //         }

// //         .exp-company, .activity-role {
// //           color: #4a5568;
// //           font-weight: 500;
// //           margin-bottom: 0.5rem;
// //         }

// //         .exp-duration {
// //           color: #718096;
// //           font-size: 0.9rem;
// //           margin-bottom: 0.5rem;
// //         }

// //         .exp-description, .activity-description {
// //           color: #2d3748;
// //           line-height: 1.6;
// //           margin-top: 0.75rem;
// //         }

// //         .interests-tags {
// //           display: flex;
// //           flex-wrap: wrap;
// //           gap: 0.5rem;
// //         }

// //         .interest-tag {
// //           background: #667eea;
// //           color: white;
// //           padding: 0.4rem 0.8rem;
// //           border-radius: 15px;
// //           font-size: 0.85rem;
// //           font-weight: 500;
// //         }

// //         .career-goals-content {
// //           background: white;
// //           border-radius: 10px;
// //           padding: 1.5rem;
// //           border: 1px solid #e2e8f0;
// //         }

// //         .goals-text {
// //           color: #2d3748;
// //           line-height: 1.7;
// //           font-size: 1rem;
// //         }

// //         .experience-section {
// //           display: flex;
// //           flex-direction: column;
// //           gap: 2rem;
// //         }

// //         /* Responsive Design */
// //         @media (max-width: 768px) {
// //           .dashboard-container {
// //             padding: 1rem;
// //           }

// //           .profile-header {
// //             flex-direction: column;
// //             gap: 1.5rem;
// //             text-align: center;
// //           }

// //           .header-main {
// //             flex-direction: column;
// //             text-align: center;
// //           }

// //           .stats-section {
// //             grid-template-columns: repeat(2, 1fr);
// //           }

// //           .tabs-navigation {
// //             flex-direction: column;
// //             gap: 0.5rem;
// //           }

// //           .tab-btn {
// //             justify-content: flex-start;
// //           }

// //           .info-grid {
// //             grid-template-columns: 1fr;
// //           }

// //           .skills-grid, .languages-grid {
// //             grid-template-columns: 1fr;
// //           }

// //           .cta-features {
// //             flex-direction: column;
// //             gap: 0.5rem;
// //           }

// //           .assessment-cta-btn {
// //             flex-direction: column;
// //             text-align: center;
// //           }

// //           .btn-content {
// //             align-items: center;
// //           }
// //         }

// //         @media (max-width: 480px) {
// //           .stats-section {
// //             grid-template-columns: 1fr;
// //           }

// //           .profile-name {
// //             font-size: 1.5rem;
// //           }

// //           .cta-title {
// //             font-size: 1.5rem;
// //           }
// //         }
// //       `}</style>
// //     </div>
// //   );
// // };

// // export default ProfileDashboard;

// import React, { useState, useEffect } from 'react';
// import { Notify } from 'notiflix';
// import './styles/ProfileDashboard.css'; // We'll create this CSS file

// const ProfileDashboard = () => {
//   const [profile, setProfile] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState('');
//   const [activeTab, setActiveTab] = useState('overview');

//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Please log in to view your profile');
//         setLoading(false);
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/student/profile', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         setProfile(data.profile);
//       } else if (response.status === 404) {
//         setError('Profile not found. Please create your profile first.');
//       } else {
//         throw new Error('Failed to fetch profile');
//       }
//     } catch (err) {
//       console.error('Error fetching profile:', err);
//       setError('Failed to load profile. Please try again.');
//       Notify.failure('Failed to load profile');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const goToAssessment = () => {
//     window.location.href = '/assessment';
//   };

//   const goToEditProfile = () => {
//     window.location.href = '/edit-profile'; // You can create this route later
//   };

//   const goToCreateProfile = () => {
//     window.location.href = '/create-profile';
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
//       <div className="dashboard-container">
//         <div className="loading-card">
//           <div className="loading-spinner"></div>
//           <h2>Loading Your Profile...</h2>
//           <p>Please wait while we fetch your information</p>
//         </div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="dashboard-container">
//         <div className="error-card">
//           <div className="error-icon">📝</div>
//           <h2>No Profile Found</h2>
//           <p>{error}</p>
//           <button onClick={goToCreateProfile} className="create-profile-btn">
//             <span className="btn-icon">✨</span>
//             Create Your Profile
//           </button>
//         </div>
//       </div>
//     );
//   }

//   if (!profile) {
//     return (
//       <div className="dashboard-container">
//         <div className="error-card">
//           <h2>No Profile Data</h2>
//           <p>Unable to load profile information.</p>
//           <button onClick={fetchProfile} className="retry-btn">
//             Retry
//           </button>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="dashboard-container">
//       <div className="dashboard-content">
//         {/* Header with Profile Info */}
//         <div className="profile-header">
//           <div className="header-main">
//             <div className="profile-avatar">
//               {profile.images && profile.images.length > 0 ? (
//                 <img src={profile.images[0].url} alt="Profile" className="avatar-image" />
//               ) : (
//                 <div className="avatar-placeholder">
//                   {profile.userId?.name?.charAt(0) || 'U'}
//                 </div>
//               )}
//             </div>
//             <div className="profile-info">
//               <h1 className="profile-name">{profile.userId?.name || 'Student'}</h1>
//               <p className="profile-email">{profile.email}</p>
//               <div className="profile-badges">
//                 <span className="badge success">Profile Complete</span>
//                 <span className="badge info">{profile.desiredFaculty || 'Faculty: Not selected'}</span>
//               </div>
//             </div>
//           </div>
          
//           <div className="header-actions">
//             <button onClick={goToEditProfile} className="edit-btn">
//               <span className="btn-icon">✏️</span>
//               Edit Profile
//             </button>
//           </div>
//         </div>

//         {/* Quick Stats */}
//         <div className="stats-section">
//           <div className="stat-card">
//             <div className="stat-icon">📊</div>
//             <div className="stat-content">
//               <span className="stat-number">{profile.completionPercentage || 100}%</span>
//               <span className="stat-label">Profile Complete</span>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">⚡</div>
//             <div className="stat-content">
//               <span className="stat-number">{profile.skills?.length || 0}</span>
//               <span className="stat-label">Skills Listed</span>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">💡</div>
//             <div className="stat-content">
//               <span className="stat-number">{profile.interests?.length || 0}</span>
//               <span className="stat-label">Interests</span>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-icon">💼</div>
//             <div className="stat-content">
//               <span className="stat-number">{profile.workExperience?.length || 0}</span>
//               <span className="stat-label">Work Experience</span>
//             </div>
//           </div>
//         </div>

//         {/* Call to Action - Assessment */}
//         <div className="cta-section">
//           <div className="cta-content">
//             <div className="cta-text">
//               <h2 className="cta-title">🎯 Ready to Discover Your Career Path?</h2>
//               <p className="cta-subtitle">
//                 Take our comprehensive career assessment to get personalized recommendations 
//                 based on your profile, interests, and skills.
//               </p>
//               <ul className="cta-features">
//                 <li>✨ Personality assessment</li>
//                 <li>💼 Career interest analysis</li>
//                 <li>⚡ Skills evaluation</li>
//                 <li>🎯 Personalized recommendations</li>
//               </ul>
//             </div>
//             <button onClick={goToAssessment} className="assessment-cta-btn">
//               <span className="btn-icon">🚀</span>
//               <div className="btn-content">
//                 <span className="btn-title">Start Career Assessment</span>
//                 <span className="btn-subtitle">~15 minutes to complete</span>
//               </div>
//               <span className="btn-arrow">→</span>
//             </button>
//           </div>
//         </div>

//         {/* Navigation Tabs */}
//         <div className="tabs-navigation">
//           {[
//             { id: 'overview', label: 'Overview', icon: '👤' },
//             { id: 'academic', label: 'Academic Info', icon: '🎓' },
//             { id: 'experience', label: 'Experience & Skills', icon: '💼' },
//             { id: 'goals', label: 'Goals & Interests', icon: '🎯' }
//           ].map(tab => (
//             <button
//               key={tab.id}
//               onClick={() => setActiveTab(tab.id)}
//               className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
//             >
//               <span className="tab-icon">{tab.icon}</span>
//               <span className="tab-label">{tab.label}</span>
//             </button>
//           ))}
//         </div>

//         {/* Tab Content */}
//         <div className="tab-content">
//           {activeTab === 'overview' && (
//             <div className="tab-panel">
//               <div className="info-grid">
//                 <div className="info-card">
//                   <h3 className="card-title">Personal Information</h3>
//                   <div className="info-rows">
//                     <div className="info-row">
//                       <span className="info-label">Full Name:</span>
//                       <span className="info-value">{profile.userId?.name || 'N/A'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Date of Birth:</span>
//                       <span className="info-value">{formatDate(profile.dateOfBirth)}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Age:</span>
//                       <span className="info-value">{profile.age || 'N/A'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Gender:</span>
//                       <span className="info-value">{profile.gender || 'N/A'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Nationality:</span>
//                       <span className="info-value">{profile.nationality || 'N/A'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Country:</span>
//                       <span className="info-value">{profile.country || 'N/A'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="info-card">
//                   <h3 className="card-title">Contact Information</h3>
//                   <div className="info-rows">
//                     <div className="info-row">
//                       <span className="info-label">Email:</span>
//                       <span className="info-value">{profile.email}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Phone:</span>
//                       <span className="info-value">{profile.phoneNumber || 'N/A'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Marital Status:</span>
//                       <span className="info-value">{profile.maritalStatus || 'N/A'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Religion:</span>
//                       <span className="info-value">{profile.yourReligion || 'N/A'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 {profile.emergencyContact && (
//                   <div className="info-card">
//                     <h3 className="card-title">Emergency Contact</h3>
//                     <div className="info-rows">
//                       <div className="info-row">
//                         <span className="info-label">Name:</span>
//                         <span className="info-value">{profile.emergencyContact.name || 'N/A'}</span>
//                       </div>
//                       <div className="info-row">
//                         <span className="info-label">Relationship:</span>
//                         <span className="info-value">{profile.emergencyContact.relationship || 'N/A'}</span>
//                       </div>
//                       <div className="info-row">
//                         <span className="info-label">Phone:</span>
//                         <span className="info-value">{profile.emergencyContact.phoneNumber || 'N/A'}</span>
//                       </div>
//                       <div className="info-row">
//                         <span className="info-label">Email:</span>
//                         <span className="info-value">{profile.emergencyContact.email || 'N/A'}</span>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>
//           )}

//           {activeTab === 'academic' && (
//             <div className="tab-panel">
//               <div className="info-grid">
//                 <div className="info-card">
//                   <h3 className="card-title">Academic Background</h3>
//                   <div className="info-rows">
//                     <div className="info-row">
//                       <span className="info-label">Current Academic Level:</span>
//                       <span className="info-value">{profile.currentAcademicLevel || 'N/A'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Student Type:</span>
//                       <span className="info-value">{profile.studentType || 'N/A'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Program:</span>
//                       <span className="info-value">{profile.studentProgram || 'N/A'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">High School Grades:</span>
//                       <span className="info-value">{profile.highSchoolGrades || 'N/A'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Two Principal Passes:</span>
//                       <span className="info-value">{profile.haveTwoPrincipalPasses ? 'Yes' : 'No'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Sponsorship:</span>
//                       <span className="info-value">{profile.sponsorshipDetails || 'N/A'}</span>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="info-card">
//                   <h3 className="card-title">Course Preferences</h3>
//                   <div className="info-rows">
//                     <div className="info-row">
//                       <span className="info-label">Desired Faculty:</span>
//                       <span className="info-value">{profile.desiredFaculty || 'Not specified'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Desired Department:</span>
//                       <span className="info-value">{profile.desiredDepartment || 'Not specified'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Secondary Courses:</span>
//                       <span className="info-value">
//                         {profile.coursesStudiedInSecondary || 'Not specified'}
//                       </span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'experience' && (
//             <div className="tab-panel">
//               <div className="experience-section">
//                 {/* Skills */}
//                 <div className="info-card">
//                   <h3 className="card-title">Skills ({profile.skills?.length || 0})</h3>
//                   {profile.skills && profile.skills.length > 0 ? (
//                     <div className="skills-grid">
//                       {profile.skills.map((skill, index) => (
//                         <div key={index} className="skill-item">
//                           <span className="skill-name">{skill.skillName}</span>
//                           <span className={`skill-level ${skill.proficiencyLevel.toLowerCase()}`}>
//                             {skill.proficiencyLevel}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="no-data">No skills listed</p>
//                   )}
//                 </div>

//                 {/* Languages */}
//                 <div className="info-card">
//                   <h3 className="card-title">Languages ({profile.languagesSpoken?.length || 0})</h3>
//                   {profile.languagesSpoken && profile.languagesSpoken.length > 0 ? (
//                     <div className="languages-grid">
//                       {profile.languagesSpoken.map((lang, index) => (
//                         <div key={index} className="language-item">
//                           <span className="language-name">{lang.language}</span>
//                           <span className={`language-level ${lang.proficiency.toLowerCase()}`}>
//                             {lang.proficiency}
//                           </span>
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="no-data">No languages listed</p>
//                   )}
//                 </div>

//                 {/* Work Experience */}
//                 <div className="info-card">
//                   <h3 className="card-title">Work Experience ({profile.workExperience?.length || 0})</h3>
//                   {profile.workExperience && profile.workExperience.length > 0 ? (
//                     <div className="experience-list">
//                       {profile.workExperience.map((exp, index) => (
//                         <div key={index} className="experience-item">
//                           <div className="exp-header">
//                             <h4 className="exp-title">{exp.jobTitle}</h4>
//                             {exp.isCurrent && <span className="current-badge">Current</span>}
//                           </div>
//                           <p className="exp-company">{exp.company}</p>
//                           <p className="exp-duration">{exp.duration}</p>
//                           {exp.description && <p className="exp-description">{exp.description}</p>}
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="no-data">No work experience listed</p>
//                   )}
//                 </div>

//                 {/* Extracurricular Activities */}
//                 <div className="info-card">
//                   <h3 className="card-title">Extracurricular Activities ({profile.extracurricularActivities?.length || 0})</h3>
//                   {profile.extracurricularActivities && profile.extracurricularActivities.length > 0 ? (
//                     <div className="activities-list">
//                       {profile.extracurricularActivities.map((activity, index) => (
//                         <div key={index} className="activity-item">
//                           <h4 className="activity-name">{activity.activity}</h4>
//                           <p className="activity-role">{activity.role} at {activity.organization}</p>
//                           {activity.description && <p className="activity-description">{activity.description}</p>}
//                         </div>
//                       ))}
//                     </div>
//                   ) : (
//                     <p className="no-data">No activities listed</p>
//                   )}
//                 </div>
//               </div>
//             </div>
//           )}

//           {activeTab === 'goals' && (
//             <div className="tab-panel">
//               <div className="info-grid">
//                 <div className="info-card">
//                   <h3 className="card-title">Personal Interests</h3>
//                   <div className="info-rows">
//                     <div className="info-row">
//                       <span className="info-label">Hobbies:</span>
//                       <span className="info-value">{profile.hobbies || 'Not specified'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Interests:</span>
//                       <div className="interests-tags">
//                         {profile.interests && profile.interests.length > 0 ? (
//                           profile.interests.map((interest, index) => (
//                             <span key={index} className="interest-tag">{interest}</span>
//                           ))
//                         ) : (
//                           <span className="info-value">Not specified</span>
//                         )}
//                       </div>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="info-card">
//                   <h3 className="card-title">Career Goals</h3>
//                   <div className="career-goals-content">
//                     {profile.careerGoals ? (
//                       <p className="goals-text">{profile.careerGoals}</p>
//                     ) : (
//                       <p className="no-data">No career goals specified</p>
//                     )}
//                   </div>
//                 </div>

//                 <div className="info-card">
//                   <h3 className="card-title">Employment Status</h3>
//                   <div className="info-rows">
//                     <div className="info-row">
//                       <span className="info-label">Current Employment:</span>
//                       <span className="info-value">{profile.haveJob || 'Not specified'}</span>
//                     </div>
//                     <div className="info-row">
//                       <span className="info-label">Disability Status:</span>
//                       <span className="info-value">{profile.disability || 'None'}</span>
//                     </div>
//                   </div>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ProfileDashboard;

import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import './styles/ProfileDashboard.css'; // We'll create this CSS file

const ProfileDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [activeTab, setActiveTab] = useState('overview');

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to view your profile');
        setLoading(false);
        return;
      }

      const response = await fetch('http://localhost:5000/api/student/profile', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const data = await response.json();
        setProfile(data.profile);
      } else if (response.status === 404) {
        setError('Profile not found. Please create your profile first.');
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile. Please try again.');
      Notify.failure('Failed to load profile');
    } finally {
      setLoading(false);
    }
  };

  const goToAssessment = () => {
    window.location.href = '/assessment';
  };

  const goToEditProfile = () => {
    window.location.href = '/edit-profile'; // You can create this route later
  };

  const goToCreateProfile = () => {
    window.location.href = '/StudentProfile';
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
      <div className="dashboard-container">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading Your Profile...</h2>
          <p>Please wait while we fetch your information</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="dashboard-container">
        <div className="error-card">
          <div className="error-icon">📝</div>
          <h2>No Profile Found</h2>
          <p>{error}</p>
          <button onClick={goToCreateProfile} className="create-profile-btn">
            <span className="btn-icon">✨</span>
            Create Your Profile
          </button>
        </div>
      </div>
    );
  }

  if (!profile) {
    return (
      <div className="dashboard-container">
        <div className="error-card">
          <h2>No Profile Data</h2>
          <p>Unable to load profile information.</p>
          <button onClick={fetchProfile} className="retry-btn">
            Retry
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="dashboard-container">
      <div className="dashboard-content">
        {/* Header with Profile Info */}
        <div className="profile-header">
          <div className="header-main">
            <div className="profile-avatar">
              {profile.images && profile.images.length > 0 ? (
                <img 
                  src={`http://localhost:5000/${profile.images[0].url}`} 
                  alt="Profile" 
                  className="avatar-image"
                  onError={(e) => {
                    console.log('Image failed to load:', profile.images[0].url);
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
              ) : null}
              <div 
                className="avatar-placeholder"
                style={{ 
                  display: profile.images && profile.images.length > 0 ? 'none' : 'flex' 
                }}
              >
                {profile.userId?.name?.charAt(0) || 'U'}
              </div>
            </div>
            <div className="profile-info">
              <h1 className="profile-name">{profile.userId?.name || 'Student'}</h1>
              <p className="profile-email">{profile.email}</p>
              <div className="profile-badges">
                <span className="badge success">Profile Complete</span>
                <span className="badge info">{profile.desiredFaculty || 'Faculty: Not selected'}</span>
              </div>
            </div>
          </div>
          
          <div className="header-actions">
            <button onClick={goToEditProfile} className="edit-btn">
              <span className="btn-icon">✏️</span>
              Edit Profile
            </button>
          </div>
        </div>

        {/* Quick Stats */}
        <div className="stats-section">
          <div className="stat-card">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-number">{profile.completionPercentage || 100}%</div>
              <div> Profile Complete </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-number">{profile.skills?.length || 0}</div>
              <div>Skills Listed</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💡</div>
            <div className="stat-content">
              <div className="stat-number">{profile.interests?.length || 0}</div>
              <div>Interests</div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-icon">💼</div>
            <div className="stat-content">
              <div className="stat-number">{profile.workExperience?.length || 0}</div>
              <div>Work Experience</div>
            </div>
          </div>
        </div>

        {/* Call to Action - Assessment */}
        <div className="cta-section">
          <div className="cta-content">
            <div className="cta-text">
              <h2 className="cta-title">🎯 Ready to Discover Your Career Path?</h2>
              <p className="cta-subtitle">
                Take our comprehensive career assessment to get personalized recommendations 
                based on your profile, interests, and skills.
              </p>
              <ul className="cta-features">
                <li>✨ Personality assessment</li>
                <li>💼 Career interest analysis</li>
                <li>⚡ Skills evaluation</li>
                <li>🎯 Personalized recommendations</li>
              </ul>
            </div>
            <button onClick={goToAssessment} className="assessment-cta-btn">
              <span className="btn-icon">🚀</span>
              <div className="btn-content">
                <span className="btn-title">Start Career Assessment</span>
                <span className="btn-subtitle">~15 minutes to complete</span>
              </div>
              <span className="btn-arrow">→</span>
            </button>
          </div>
        </div>

        {/* Navigation Tabs */}
        <div className="tabs-navigation">
          {[
            { id: 'overview', label: 'Overview', icon: '👤' },
            { id: 'academic', label: 'Academic Info', icon: '🎓' },
            { id: 'experience', label: 'Experience & Skills', icon: '💼' },
            { id: 'goals', label: 'Goals & Interests', icon: '🎯' }
          ].map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`tab-btn ${activeTab === tab.id ? 'active' : ''}`}
            >
              <span className="tab-icon">{tab.icon}</span>
              <span className="tab-label">{tab.label}</span>
            </button>
          ))}
        </div>

        {/* Tab Content */}
        <div className="tab-content">
          {activeTab === 'overview' && (
            <div className="tab-panel">
              <div className="info-grid">
                <div className="info-card">
                  <h3 className="card-title">Personal Information</h3>
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">Full Name:</span>
                      <span className="info-value">{profile.userId?.name || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Date of Birth:</span>
                      <span className="info-value">{formatDate(profile.dateOfBirth)}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Age:</span>
                      <span className="info-value">{profile.age || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Gender:</span>
                      <span className="info-value">{profile.gender || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Nationality:</span>
                      <span className="info-value">{profile.nationality || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Country:</span>
                      <span className="info-value">{profile.country || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <h3 className="card-title">Contact Information</h3>
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">Email:</span>
                      <span className="info-value">{profile.email}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Phone:</span>
                      <span className="info-value">{profile.phoneNumber || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Marital Status:</span>
                      <span className="info-value">{profile.maritalStatus || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Religion:</span>
                      <span className="info-value">{profile.yourReligion || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                {profile.emergencyContact && (
                  <div className="info-card">
                    <h3 className="card-title">Emergency Contact</h3>
                    <div className="info-rows">
                      <div className="info-row">
                        <span className="info-label">Name:</span>
                        <span className="info-value">{profile.emergencyContact.name || 'N/A'}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Relationship:</span>
                        <span className="info-value">{profile.emergencyContact.relationship || 'N/A'}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Phone:</span>
                        <span className="info-value">{profile.emergencyContact.phoneNumber || 'N/A'}</span>
                      </div>
                      <div className="info-row">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{profile.emergencyContact.email || 'N/A'}</span>
                      </div>
                    </div>
                  </div>
                )}

                {/* Documents Section */}
                {profile.documents && profile.documents.length > 0 && (
                  <div className="info-card">
                    <h3 className="card-title">Uploaded Documents ({profile.documents.length})</h3>
                    <div className="documents-list">
                      {profile.documents.map((doc, index) => (
                        <div key={index} className="document-item">
                          <div className="document-info">
                            <span className="document-icon">
                              {doc.type === 'Transcripts' ? '📊' : 
                               doc.type === 'Diploma' ? '🎓' : 
                               doc.type === 'Certificate' ? '🏆' : 
                               doc.type === 'ID_Document' ? '🆔' : 
                               doc.type === 'Passport' ? '📘' : '📄'}
                            </span>
                            <div className="document-details">
                              <span className="document-name">{doc.originalName || doc.filename}</span>
                              <span className="document-type">{doc.type}</span>
                              <span className="document-size">
                                {doc.fileSize ? `${(doc.fileSize / 1024 / 1024).toFixed(2)} MB` : 'Unknown size'}
                              </span>
                            </div>
                          </div>
                          <div className="document-actions">
                            <a 
                              href={`http://localhost:5000/${doc.url}`} 
                              target="_blank" 
                              rel="noopener noreferrer"
                              className="view-doc-btn"
                            >
                              View
                            </a>
                            {doc.isVerified && <span className="verified-badge">✓ Verified</span>}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeTab === 'academic' && (
            <div className="tab-panel">
              <div className="info-grid">
                <div className="info-card">
                  <h3 className="card-title">Academic Background</h3>
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">Current Academic Level:</span>
                      <span className="info-value">{profile.currentAcademicLevel || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Student Type:</span>
                      <span className="info-value">{profile.studentType || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Program:</span>
                      <span className="info-value">{profile.studentProgram || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">High School Grades:</span>
                      <span className="info-value">{profile.highSchoolGrades || 'N/A'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Two Principal Passes:</span>
                      <span className="info-value">{profile.haveTwoPrincipalPasses ? 'Yes' : 'No'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Sponsorship:</span>
                      <span className="info-value">{profile.sponsorshipDetails || 'N/A'}</span>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <h3 className="card-title">Course Preferences</h3>
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">Desired Faculty:</span>
                      <span className="info-value">{profile.desiredFaculty || 'Not specified'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Desired Department:</span>
                      <span className="info-value">{profile.desiredDepartment || 'Not specified'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Secondary Courses:</span>
                      <span className="info-value">
                        {profile.coursesStudiedInSecondary || 'Not specified'}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'experience' && (
            <div className="tab-panel">
              <div className="experience-section">
                {/* Skills */}
                <div className="info-card">
                  <h3 className="card-title">Skills ({profile.skills?.length || 0})</h3>
                  {profile.skills && profile.skills.length > 0 ? (
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
                  ) : (
                    <p className="no-data">No skills listed</p>
                  )}
                </div>

                {/* Languages */}
                <div className="info-card">
                  <h3 className="card-title">Languages ({profile.languagesSpoken?.length || 0})</h3>
                  {profile.languagesSpoken && profile.languagesSpoken.length > 0 ? (
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
                  ) : (
                    <p className="no-data">No languages listed</p>
                  )}
                </div>

                {/* Work Experience */}
                <div className="info-card">
                  <h3 className="card-title">Work Experience ({profile.workExperience?.length || 0})</h3>
                  {profile.workExperience && profile.workExperience.length > 0 ? (
                    <div className="experience-list">
                      {profile.workExperience.map((exp, index) => (
                        <div key={index} className="experience-item">
                          <div className="exp-header">
                            <h4 className="exp-title">{exp.jobTitle}</h4>
                            {exp.isCurrent && <span className="current-badge">Current</span>}
                          </div>
                          <p className="exp-company">{exp.company}</p>
                          <p className="exp-duration">{exp.duration}</p>
                          {exp.description && <p className="exp-description">{exp.description}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data">No work experience listed</p>
                  )}
                </div>

                {/* Extracurricular Activities */}
                <div className="info-card">
                  <h3 className="card-title">Extracurricular Activities ({profile.extracurricularActivities?.length || 0})</h3>
                  {profile.extracurricularActivities && profile.extracurricularActivities.length > 0 ? (
                    <div className="activities-list">
                      {profile.extracurricularActivities.map((activity, index) => (
                        <div key={index} className="activity-item">
                          <h4 className="activity-name">{activity.activity}</h4>
                          <p className="activity-role">{activity.role} at {activity.organization}</p>
                          {activity.description && <p className="activity-description">{activity.description}</p>}
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p className="no-data">No activities listed</p>
                  )}
                </div>
              </div>
            </div>
          )}

          {activeTab === 'goals' && (
            <div className="tab-panel">
              <div className="info-grid">
                <div className="info-card">
                  <h3 className="card-title">Personal Interests</h3>
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">Hobbies:</span>
                      <span className="info-value">{profile.hobbies || 'Not specified'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Interests:</span>
                      <div className="interests-tags">
                        {profile.interests && profile.interests.length > 0 ? (
                          profile.interests.map((interest, index) => (
                            <span key={index} className="interest-tag">{interest}</span>
                          ))
                        ) : (
                          <span className="info-value">Not specified</span>
                        )}
                      </div>
                    </div>
                  </div>
                </div>

                <div className="info-card">
                  <h3 className="card-title">Career Goals</h3>
                  <div className="career-goals-content">
                    {profile.careerGoals ? (
                      <p className="goals-text">{profile.careerGoals}</p>
                    ) : (
                      <p className="no-data">No career goals specified</p>
                    )}
                  </div>
                </div>

                <div className="info-card">
                  <h3 className="card-title">Employment Status</h3>
                  <div className="info-rows">
                    <div className="info-row">
                      <span className="info-label">Current Employment:</span>
                      <span className="info-value">{profile.haveJob || 'Not specified'}</span>
                    </div>
                    <div className="info-row">
                      <span className="info-label">Disability Status:</span>
                      <span className="info-value">{profile.disability || 'None'}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfileDashboard;