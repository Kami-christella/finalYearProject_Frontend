import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import './styles/ProfileDashboard.css'; 

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
    window.location.href = '/dashboard/assessment';
  };

  const goToEditProfile = () => {
    window.location.href = '/dashboard/EditProfile'; 
  };

  const goToCreateProfile = () => {
    window.location.href = '/dashboard';
  };

 
  const handleLogout = () => {
  
    if (window.confirm('Are you sure you want to logout?')) {
      // Clear all stored data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('profileCompleted');
      localStorage.removeItem('profileId');
      
    
      Notify.success('Logged out successfully!');
      
      // Redirect to landing page
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
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
       
        
        
 <button onClick={goToEditProfile} className="edit-btn">
              <span className="btn-icon">✏️</span>
              Edit Profile
            </button> <br /> <br /> 

        {/* Quick Stats */}
        <div className="stats-section">
          <div className="stat-cards">
            <div className="stat-icon">📊</div>
            <div className="stat-content">
              <div className="stat-number">{profile.completionPercentage || 100}%</div>
              <div>Profile Complete</div>
            </div>
          </div>
          <div className="stat-cards">
            <div className="stat-icon">⚡</div>
            <div className="stat-content">
              <div className="stat-number">{profile.skills?.length || 0}</div>
              <div>Skills Listed</div>
            </div>
          </div>
          <div className="stat-cards">
            <div className="stat-icon">💡</div>
            <div className="stat-content">
              <div className="stat-number">{profile.interests?.length || 0}</div>
              <div>Interests</div>
            </div>
          </div>
          <div className="stat-cards">
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
              <h2 className="cta-title"> Ready to Discover Your Career Path?</h2>
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