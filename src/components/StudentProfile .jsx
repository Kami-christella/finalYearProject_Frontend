import React, { useState, useRef } from 'react';
import '../components/styles/studentProfile.css'

const StudentProfile = () => {
  const [formData, setFormData] = useState({
    nationality: '',
    dateOfBirth: '',
    age: '',
    gender: '',
    country: '',
    phoneNumber: '',
    studentType: 'Undergraduate',
    currentAcademicLevel: '',
    studentProgram: '',
    maritalStatus: '',
    yourReligion: '',
    sponsorshipDetails: '',
    highSchoolGrades: '',
    coursesStudiedInSecondary: '',
    haveTwoPrincipalPasses: false,
    disability: 'None',
    haveJob: '',
    hobbies: '',
    interests: '',
    desiredFaculty: '',
    desiredDepartment: '',
    careerGoals: '',
    skills: '',
    languagesSpoken: '',
    workExperience: '',
    extracurricularActivities: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phoneNumber: '',
      email: ''
    }
  });
  
  const [profileImage, setProfileImage] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);
  
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
      // Handle nested objects like emergencyContact
      const [parent, child] = name.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: type === 'checkbox' ? checked : value
      }));
    }
  };

  // Handle profile image upload
  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      
      // Validate file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      
      setProfileImage(file);
      setError('');
    }
  };

  // Handle camera capture
  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  // Handle document upload
  const handleDocumentUpload = (e) => {
    const files = Array.from(e.target.files);
    
    // Validate total files
    if (documents.length + files.length > 5) {
      setError('Maximum 5 documents allowed');
      return;
    }
    
    // Validate each file
    const validFiles = files.filter(file => {
      // Check file size (5MB max)
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} is too large. Maximum 5MB per file.`);
        return false;
      }
      
      // Check file type
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError(`${file.name} is not a supported file type.`);
        return false;
      }
      
      return true;
    });
    
    setDocuments(prev => [...prev, ...validFiles]);
    setError('');
  };

  // Remove document
  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      // Note: In a real application, you would get the token from your auth system
      const token = 'your-auth-token'; // Replace with actual token retrieval
      
      if (!token) {
        setError('Please log in to continue');
        return;
      }

      // Create FormData for file uploads
      const formDataToSend = new FormData();
      
      // Add all form fields
      Object.keys(formData).forEach(key => {
        if (key === 'emergencyContact') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'skills' || key === 'languagesSpoken' || key === 'workExperience' || key === 'extracurricularActivities') {
          // Convert comma-separated strings to JSON arrays
          const items = formData[key].split(',').map(item => item.trim()).filter(item => item);
          if (key === 'skills') {
            const skillsArray = items.map(skill => ({
              skillName: skill,
              proficiencyLevel: 'Intermediate'
            }));
            formDataToSend.append(key, JSON.stringify(skillsArray));
          } else if (key === 'languagesSpoken') {
            const langArray = items.map(lang => ({
              language: lang,
              proficiency: 'Conversational'
            }));
            formDataToSend.append(key, JSON.stringify(langArray));
          } else {
            formDataToSend.append(key, JSON.stringify(items));
          }
        } else if (key === 'interests') {
          const interestsArray = formData[key].split(',').map(item => item.trim()).filter(item => item);
          formDataToSend.append(key, JSON.stringify(interestsArray));
        } else if (key === 'coursesStudiedInSecondary') {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add profile image
      if (profileImage) {
        formDataToSend.append('images', profileImage);
      }
      
      // Add documents
      documents.forEach(doc => {
        formDataToSend.append('documents', doc);
      });

      const response = await fetch('/api/student/createprofile', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Profile created successfully! You can now take the assessment.');
        
        // In a real application, you would store these values properly
        console.log('Profile created:', data);
        
        setTimeout(() => {
          // In a real application, you would handle navigation
          console.log('Redirecting to assessment page...');
        }, 2000);
      } else {
        setError(data.message || 'Failed to create profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Faculty options
  const facultyOptions = [
    'Faculty of Business Administration',
    'Faculty of Information Technology', 
    'Faculty of Health Sciences',
    'Faculty of Medicine',
    'Faculty in Education',
    'Bachelor Of Theology'
  ];

  // Department options based on faculty
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

  const nextStep = () => {
    setStep(step + 1);
  };

  const prevStep = () => {
    setStep(step - 1);
  };

  const getStepIcon = (stepNumber) => {
    const icons = {
      1: '👤',
      2: '🎓',
      3: '🎯',
      4: '📄'
    };
    return icons[stepNumber];
  };

  const getStepTitle = (stepNumber) => {
    const titles = {
      1: 'Personal Information',
      2: 'Academic Information', 
      3: 'Interests & Goals',
      4: 'Documents & Contact'
    };
    return titles[stepNumber];
  };

  return (
    <div className="profile-container">
      {/* Animated Background */}
      <div className="profile-bg">
        <div className="profile-bg-overlay"></div>
        <div className="floating-shapes">
          <div className="shape shape-1"></div>
          <div className="shape shape-2"></div>
          <div className="shape shape-3"></div>
          <div className="shape shape-4"></div>
        </div>
      </div>

      <div className="profile-content">
        {/* Header */}
        <div className="profile-header">
          <div className="header-content">
            <div className="header-icon">🌟</div>
            <h1 className="profile-title">Create Your Student Profile</h1>
            <p className="profile-subtitle">Complete your profile to access personalized career guidance</p>
          </div>
          
          {/* Progress Bar */}
          <div className="progress-section">
            <div className="progress-info">
              <span className="progress-text">Step {step} of 4</span>
              <span className="progress-percentage">{Math.round((step / 4) * 100)}%</span>
            </div>
            <div className="progress-bar">
              <div 
                className="progress-fill"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
            <div className="step-indicators">
              {[1, 2, 3, 4].map((stepNum) => (
                <div 
                  key={stepNum}
                  className={`step-indicator ${stepNum <= step ? 'active' : ''} ${stepNum === step ? 'current' : ''}`}
                >
                  <div className="step-icon">{getStepIcon(stepNum)}</div>
                  <span className="step-label">{getStepTitle(stepNum)}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="message-alert error-alert">
            <span className="alert-icon">⚠️</span>
            <span className="alert-text">{error}</span>
            <button 
              className="alert-close"
              onClick={() => setError('')}
            >
              ✕
            </button>
          </div>
        )}
        
        {success && (
          <div className="message-alert success-alert">
            <span className="alert-icon">✅</span>
            <span className="alert-text">{success}</span>
            <button 
              className="alert-close"
              onClick={() => setSuccess('')}
            >
              ✕
            </button>
          </div>
        )}

        <form onSubmit={handleSubmit} className="profile-form">
          
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="form-step active">
              <div className="step-card">
                <div className="step-header">
                  <div className="step-header-icon">👤</div>
                  <h2 className="step-title">Personal Information</h2>
                  <p className="step-description">Tell us about yourself</p>
                </div>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Nationality</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🌍</span>
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="e.g., Rwanda"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Date of Birth</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">📅</span>
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Age</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🎂</span>
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="16"
                        max="100"
                        className="form-input"
                        placeholder="e.g., 19"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Gender</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">⚧️</span>
                      <select
                        name="gender"
                        value={formData.gender}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Country</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🏳️</span>
                      <input
                        type="text"
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="e.g., Rwanda"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Phone Number</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">📱</span>
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="e.g., +250788123456"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Marital Status</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">💑</span>
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Prefer not to say">Prefer not to say</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Religion</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🙏</span>
                      <select
                        name="yourReligion"
                        value={formData.yourReligion}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select Religion</option>
                        <option value="Adventist">Adventist</option>
                        <option value="Protestant">Protestant</option>
                        <option value="Catholic">Catholic</option>
                        <option value="Islam">Islam</option>
                        <option value="Other">Other</option>
                        <option value="None">None</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="step-actions">
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-next"
                  >
                    Next Step
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Academic Information */}
          {step === 2 && (
            <div className="form-step active">
              <div className="step-card">
                <div className="step-header">
                  <div className="step-header-icon">🎓</div>
                  <h2 className="step-title">Academic Information</h2>
                  <p className="step-description">Tell us about your educational background</p>
                </div>
                
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Current Academic Level</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">📚</span>
                      <select
                        name="currentAcademicLevel"
                        value={formData.currentAcademicLevel}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select Level</option>
                        <option value="O-Level">O-Level</option>
                        <option value="A-Level">A-Level</option>
                        <option value="Bachelor's Degree">Bachelor's Degree</option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD">PhD</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Student Program</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🕐</span>
                      <select
                        name="studentProgram"
                        value={formData.studentProgram}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select Program</option>
                        <option value="Day Program">Day Program</option>
                        <option value="Evening Program">Evening Program</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">High School Grades</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">📈</span>
                      <input
                        type="number"
                        name="highSchoolGrades"
                        value={formData.highSchoolGrades}
                        onChange={handleChange}
                        required
                        min="0"
                        max="100"
                        className="form-input"
                        placeholder="e.g., 75"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Sponsorship Details</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">💰</span>
                      <select
                        name="sponsorshipDetails"
                        value={formData.sponsorshipDetails}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select Sponsorship</option>
                        <option value="Self">Self</option>
                        <option value="Parents">Parents</option>
                        <option value="Government">Government</option>
                        <option value="Organization">Organization</option>
                        <option value="Scholarship">Scholarship</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group full-width">
                    <label className="form-label">
                      <span className="label-text">Courses Studied in Secondary</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">📖</span>
                      <input
                        type="text"
                        name="coursesStudiedInSecondary"
                        value={formData.coursesStudiedInSecondary}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., Mathematics, Physics, Chemistry"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Have Job</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">💼</span>
                      <select
                        name="haveJob"
                        value={formData.haveJob}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select Option</option>
                        <option value="Yes">Yes</option>
                        <option value="No">No</option>
                        <option value="Part-time">Part-time</option>
                        <option value="Internship">Internship</option>
                        <option value="Volunteer">Volunteer</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <div className="checkbox-group">
                      <label className="custom-checkbox">
                        <input
                          type="checkbox"
                          name="haveTwoPrincipalPasses"
                          checked={formData.haveTwoPrincipalPasses}
                          onChange={handleChange}
                        />
                        <span className="checkbox-mark"></span>
                        <span className="checkbox-label">I have two principal passes</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="step-actions">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-prev"
                  >
                    <span className="btn-arrow">←</span>
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-next"
                  >
                    Next Step
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Interests & Goals */}
          {step === 3 && (
            <div className="form-step active">
              <div className="step-card">
                <div className="step-header">
                  <div className="step-header-icon">🎯</div>
                  <h2 className="step-title">Interests & Career Goals</h2>
                  <p className="step-description">Share your passions and aspirations</p>
                </div>
                
                <div className="form-grid single-column">
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Hobbies</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🎨</span>
                      <input
                        type="text"
                        name="hobbies"
                        value={formData.hobbies}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="e.g., Reading, Sports, Music"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Interests</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">💡</span>
                      <input
                        type="text"
                        name="interests"
                        value={formData.interests}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="e.g., Technology, Business, Healthcare (comma-separated)"
                      />
                    </div>
                    <p className="input-help">Separate multiple interests with commas</p>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Skills</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">⚡</span>
                      <input
                        type="text"
                        name="skills"
                        value={formData.skills}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., Programming, Leadership, Communication (comma-separated)"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Languages Spoken</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🗣️</span>
                      <input
                        type="text"
                        name="languagesSpoken"
                        value={formData.languagesSpoken}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., English, French, Kinyarwanda (comma-separated)"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Work Experience</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">💼</span>
                      <input
                        type="text"
                        name="workExperience"
                        value={formData.workExperience}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., Internship at XYZ Company, Volunteer at ABC NGO (comma-separated)"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Extracurricular Activities</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🏆</span>
                      <input
                        type="text"
                        name="extracurricularActivities"
                        value={formData.extracurricularActivities}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="e.g., Student Council, Sports Team, Drama Club (comma-separated)"
                      />
                    </div>
                  </div>

                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">
                        <span className="label-text">Desired Faculty</span>
                      </label>
                      <div className="input-wrapper">
                        <span className="input-icon">🏫</span>
                        <select
                          name="desiredFaculty"
                          value={formData.desiredFaculty}
                          onChange={handleChange}
                          className="form-input"
                        >
                          <option value="">Select Faculty</option>
                          {facultyOptions.map(faculty => (
                            <option key={faculty} value={faculty}>{faculty}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="label-text">Desired Department</span>
                      </label>
                      <div className="input-wrapper">
                        <span className="input-icon">🎯</span>
                        <select
                          name="desiredDepartment"
                          value={formData.desiredDepartment}
                          onChange={handleChange}
                          className="form-input"
                          disabled={!formData.desiredFaculty}
                        >
                          <option value="">Select Department</option>
                          {getDepartmentOptions(formData.desiredFaculty).map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Career Goals</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🚀</span>
                      <textarea
                        name="careerGoals"
                        value={formData.careerGoals}
                        onChange={handleChange}
                        rows="4"
                        className="form-input"
                        placeholder="Describe your career aspirations and goals..."
                      />
                    </div>
                  </div>
                </div>

                <div className="step-actions">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-prev"
                  >
                    <span className="btn-arrow">←</span>
                    Previous
                  </button>
                  <button
                    type="button"
                    onClick={nextStep}
                    className="btn-next"
                  >
                    Next Step
                    <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents & Emergency Contact */}
          {step === 4 && (
            <div className="form-step active">
              <div className="step-card">
                <div className="step-header">
                  <div className="step-header-icon">📄</div>
                  <h2 className="step-title">Documents & Emergency Contact</h2>
                  <p className="step-description">Upload documents and provide emergency contact</p>
                </div>
                
                <div className="form-grid single-column">
                  {/* Profile Image Upload */}
                  <div className="form-group">
                    <h3 className="section-title">Profile Image</h3>
                    <div className={`upload-area ${profileImage ? 'has-file' : ''}`}>
                      {profileImage ? (
                        <div className="image-preview">
                          <img 
                            src={URL.createObjectURL(profileImage)} 
                            alt="Profile preview" 
                            className="preview-image"
                          />
                          <p className="image-name">{profileImage.name}</p>
                          <button
                            type="button"
                            onClick={() => setProfileImage(null)}
                            className="remove-btn"
                          >
                            Remove Image
                          </button>
                        </div>
                      ) : (
                        <div>
                          <div className="upload-icon">📷</div>
                          <div className="upload-buttons">
                            <button
                              type="button"
                              onClick={() => fileInputRef.current?.click()}
                              className="upload-btn primary"
                            >
                              Upload Image
                            </button>
                            <button
                              type="button"
                              onClick={() => cameraInputRef.current?.click()}
                              className="upload-btn secondary"
                            >
                              Take Photo
                            </button>
                          </div>
                          <p className="upload-info">JPG, PNG up to 5MB</p>
                        </div>
                      )}
                      
                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: 'none' }}
                      />
                      <input
                        ref={cameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleCameraCapture}
                        style={{ display: 'none' }}
                      />
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="form-group">
                    <h3 className="section-title">Supporting Documents</h3>
                    <div className="upload-area">
                      <div className="upload-icon">📄</div>
                      <button
                        type="button"
                        onClick={() => documentInputRef.current?.click()}
                        className="upload-btn primary"
                      >
                        Upload Documents
                      </button>
                      <p className="upload-info">
                        PDF, DOC, DOCX, JPG, PNG up to 5MB each (Maximum 5 files)
                      </p>
                      <input
                        ref={documentInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleDocumentUpload}
                        style={{ display: 'none' }}
                      />
                    </div>

                    {/* Display uploaded documents */}
                    {documents.length > 0 && (
                      <div className="document-list">
                        <h4 className="document-list-title">Uploaded Documents:</h4>
                        {documents.map((doc, index) => (
                          <div key={index} className="document-item">
                            <div className="document-info">
                              <span className="document-icon">📄</span>
                              <span className="document-name">{doc.name}</span>
                              <span className="document-size">
                                ({(doc.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDocument(index)}
                              className="document-remove"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* Emergency Contact */}
                  <div className="form-group">
                    <h3 className="section-title">Emergency Contact Information</h3>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">
                          <span className="label-text">Contact Name</span>
                          <span className="label-required">*</span>
                        </label>
                        <div className="input-wrapper">
                          <span className="input-icon">👤</span>
                          <input
                            type="text"
                            name="emergencyContact.name"
                            value={formData.emergencyContact.name}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="Full name of emergency contact"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <span className="label-text">Relationship</span>
                          <span className="label-required">*</span>
                        </label>
                        <div className="input-wrapper">
                          <span className="input-icon">👥</span>
                          <select
                            name="emergencyContact.relationship"
                            value={formData.emergencyContact.relationship}
                            onChange={handleChange}
                            required
                            className="form-input"
                          >
                            <option value="">Select Relationship</option>
                            <option value="Parent">Parent</option>
                            <option value="Guardian">Guardian</option>
                            <option value="Sibling">Sibling</option>
                            <option value="Spouse">Spouse</option>
                            <option value="Relative">Relative</option>
                            <option value="Friend">Friend</option>
                            <option value="Other">Other</option>
                          </select>
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <span className="label-text">Phone Number</span>
                          <span className="label-required">*</span>
                        </label>
                        <div className="input-wrapper">
                          <span className="input-icon">📱</span>
                          <input
                            type="tel"
                            name="emergencyContact.phoneNumber"
                            value={formData.emergencyContact.phoneNumber}
                            onChange={handleChange}
                            required
                            className="form-input"
                            placeholder="e.g., +250788123456"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <span className="label-text">Email Address</span>
                        </label>
                        <div className="input-wrapper">
                          <span className="input-icon">📧</span>
                          <input
                            type="email"
                            name="emergencyContact.email"
                            value={formData.emergencyContact.email}
                            onChange={handleChange}
                            className="form-input"
                            placeholder="emergency.contact@email.com"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Additional Information */}
                  <div className="form-group">
                    <h3 className="section-title">Additional Information</h3>
                    <div className="form-group">
                      <label className="form-label">
                        <span className="label-text">Disability Status</span>
                      </label>
                      <div className="input-wrapper">
                        <span className="input-icon">♿</span>
                        <select
                          name="disability"
                          value={formData.disability}
                          onChange={handleChange}
                          className="form-input"
                        >
                          <option value="None">None</option>
                          <option value="Visual Impairment">Visual Impairment</option>
                          <option value="Hearing Impairment">Hearing Impairment</option>
                          <option value="Physical Disability">Physical Disability</option>
                          <option value="Learning Disability">Learning Disability</option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">Prefer not to say</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="step-actions">
                  <button
                    type="button"
                    onClick={prevStep}
                    className="btn-prev"
                  >
                    <span className="btn-arrow">←</span>
                    Previous
                  </button>
                  <button
                    type="submit"
                    disabled={loading}
                    className={`btn-submit ${loading ? 'loading' : ''}`}
                  >
                    {loading ? (
                      <div className="loading-content">
                        <div className="loading-spinner"></div>
                        Creating Profile...
                      </div>
                    ) : (
                      'Create Profile'
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>

        {/* Profile Progress Summary */}
        {step > 1 && (
          <div className="progress-summary">
            <h3 className="summary-title">Profile Progress</h3>
            <div className="summary-items">
              <div className={`summary-item ${formData.nationality && formData.age ? 'completed' : 'incomplete'}`}>
                <span className="summary-icon">👤</span>
                <span className="summary-text">Personal Information</span>
                <span className="summary-status">{formData.nationality && formData.age ? '✓' : '○'}</span>
              </div>
              {step > 2 && (
                <div className={`summary-item ${formData.currentAcademicLevel && formData.studentProgram ? 'completed' : 'incomplete'}`}>
                  <span className="summary-icon">🎓</span>
                  <span className="summary-text">Academic Information</span>
                  <span className="summary-status">{formData.currentAcademicLevel && formData.studentProgram ? '✓' : '○'}</span>
                </div>
              )}
              {step > 3 && (
                <div className={`summary-item ${formData.hobbies && formData.interests ? 'completed' : 'incomplete'}`}>
                  <span className="summary-icon">🎯</span>
                  <span className="summary-text">Interests & Goals</span>
                  <span className="summary-status">{formData.hobbies && formData.interests ? '✓' : '○'}</span>
                </div>
              )}
              {step === 4 && (
                <div className={`summary-item ${formData.emergencyContact.name ? 'in-progress' : 'pending'}`}>
                  <span className="summary-icon">📄</span>
                  <span className="summary-text">Documents & Contact</span>
                  <span className="summary-status">{formData.emergencyContact.name ? '◐' : '○'}</span>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;