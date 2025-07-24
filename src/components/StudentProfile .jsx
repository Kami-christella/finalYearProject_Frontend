// import React, { useState, useRef } from 'react';
// import { Notify } from 'notiflix';
// import './styles/StudentProfile.css'; 

// const StudentProfile = () => {
//   const [formData, setFormData] = useState({
//     nationality: '',
//     dateOfBirth: '',
//     age: '',
//     gender: '',
//     country: '',
//     phoneNumber: '',
//     studentType: 'Undergraduate',
//     currentAcademicLevel: '',
//     studentProgram: '',
//     maritalStatus: '',
//     yourReligion: '',
//     sponsorshipDetails: '',
//     highSchoolGrades: '',
//     coursesStudiedInSecondary: '',
//     haveTwoPrincipalPasses: false,
//     // Transfer Student Fields
//     transferStudent: false,
//     previousInstitution: '',
//     overallGradePreviousUniversity: '',
//     disability: 'None',
//     haveJob: '',
//     hobbies: '',
//     interests: '',
//     desiredFaculty: '',
//     desiredDepartment: '',
//     careerGoals: '',
//     emergencyContact: {
//       name: '',
//       relationship: '',
//       phoneNumber: '',
//       email: ''
//     }
//   });
  
//   // Separate state for complex arrays
//   const [workExperience, setWorkExperience] = useState([]);
//   const [extracurricularActivities, setExtracurricularActivities] = useState([]);
//   const [skills, setSkills] = useState([]);
//   const [languagesSpoken, setLanguagesSpoken] = useState([]);
//   const [coursesStudiedPreviousUniversity, setCoursesStudiedPreviousUniversity] = useState([]);
//   const [equivalentCourses, setEquivalentCourses] = useState([]);
  
//   const [profileImage, setProfileImage] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [step, setStep] = useState(1);
  
//   const fileInputRef = useRef(null);
//   const cameraInputRef = useRef(null);
//   const documentInputRef = useRef(null);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name.includes('.')) {
//       // Handle nested objects like emergencyContact
//       const [parent, child] = name.split('.');
//       setFormData(prev => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value
//         }
//       }));
//     } else {
//       setFormData(prev => ({
//         ...prev,
//         [name]: type === 'checkbox' ? checked : value
//       }));
//     }
//   };

//   // Transfer Student Course Management
//   const addPreviousCourse = () => {
//     setCoursesStudiedPreviousUniversity([...coursesStudiedPreviousUniversity, {
//       courseName: '',
//       courseCode: '',
//       credits: '',
//       grade: ''
//     }]);
//   };

//   const updatePreviousCourse = (index, field, value) => {
//     const updated = coursesStudiedPreviousUniversity.map((course, i) => 
//       i === index ? { ...course, [field]: value } : course
//     );
//     setCoursesStudiedPreviousUniversity(updated);
//   };

//   const removePreviousCourse = (index) => {
//     setCoursesStudiedPreviousUniversity(coursesStudiedPreviousUniversity.filter((_, i) => i !== index));
//   };

//   // Equivalent Courses Management
//   const addEquivalentCourse = () => {
//     setEquivalentCourses([...equivalentCourses, {
//       previousCourseName: '',
//       previousCourseCode: '',
//       aucaCourseName: '',
//       aucaCourseCode: '',
//       reasonForEquivalence: ''
//     }]);
//   };

//   const updateEquivalentCourse = (index, field, value) => {
//     const updated = equivalentCourses.map((course, i) => 
//       i === index ? { ...course, [field]: value } : course
//     );
//     setEquivalentCourses(updated);
//   };

//   const removeEquivalentCourse = (index) => {
//     setEquivalentCourses(equivalentCourses.filter((_, i) => i !== index));
//   };

//   // Work experience functions
//   const addWorkExperience = () => {
//     setWorkExperience([...workExperience, {
//       jobTitle: '',
//       company: '',
//       startDate: '',
//       endDate: '',
//       duration: '',
//       description: '',
//       isCurrent: false
//     }]);
//   };

//   const updateWorkExperience = (index, field, value) => {
//     const updated = workExperience.map((exp, i) => 
//       i === index ? { ...exp, [field]: value } : exp
//     );
//     setWorkExperience(updated);
//   };

//   const removeWorkExperience = (index) => {
//     setWorkExperience(workExperience.filter((_, i) => i !== index));
//   };

//   // Extracurricular activities functions
//   const addExtracurricularActivity = () => {
//     setExtracurricularActivities([...extracurricularActivities, {
//       activity: '',
//       role: '',
//       organization: '',
//       startDate: '',
//       endDate: '',
//       description: ''
//     }]);
//   };

//   const updateExtracurricularActivity = (index, field, value) => {
//     const updated = extracurricularActivities.map((activity, i) => 
//       i === index ? { ...activity, [field]: value } : activity
//     );
//     setExtracurricularActivities(updated);
//   };

//   const removeExtracurricularActivity = (index) => {
//     setExtracurricularActivities(extracurricularActivities.filter((_, i) => i !== index));
//   };

//   // Skills functions
//   const addSkill = () => {
//     setSkills([...skills, {
//       skillName: '',
//       proficiencyLevel: 'Beginner'
//     }]);
//   };

//   const updateSkill = (index, field, value) => {
//     const updated = skills.map((skill, i) => 
//       i === index ? { ...skill, [field]: value } : skill
//     );
//     setSkills(updated);
//   };

//   const removeSkill = (index) => {
//     setSkills(skills.filter((_, i) => i !== index));
//   };

//   // Language functions
//   const addLanguage = () => {
//     setLanguagesSpoken([...languagesSpoken, {
//       language: '',
//       proficiency: 'Basic'
//     }]);
//   };

//   const updateLanguage = (index, field, value) => {
//     const updated = languagesSpoken.map((lang, i) => 
//       i === index ? { ...lang, [field]: value } : lang
//     );
//     setLanguagesSpoken(updated);
//   };

//   const removeLanguage = (index) => {
//     setLanguagesSpoken(languagesSpoken.filter((_, i) => i !== index));
//   };

//   // Handle profile image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith('image/')) {
//         setError('Please select a valid image file');
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         setError('Image size must be less than 5MB');
//         return;
//       }
//       setProfileImage(file);
//       setError('');
//     }
//   };

//   const handleCameraCapture = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(file);
//     }
//   };

//   const handleDocumentUpload = (e) => {
//     const files = Array.from(e.target.files);
    
//     if (documents.length + files.length > 5) {
//       setError('Maximum 5 documents allowed');
//       return;
//     }
    
//     const validFiles = files.filter(file => {
//       if (file.size > 5 * 1024 * 1024) {
//         setError(`${file.name} is too large. Maximum 5MB per file.`);
//         return false;
//       }
      
//       const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
//       if (!allowedTypes.includes(file.type)) {
//         setError(`${file.name} is not a supported file type.`);
//         return false;
//       }
      
//       return true;
//     });
    
//     setDocuments(prev => [...prev, ...validFiles]);
//     setError('');
//   };

//   const removeDocument = (index) => {
//     setDocuments(prev => prev.filter((_, i) => i !== index));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Please log in to continue');
//         return;
//       }

//       // Create FormData for file uploads
//       const formDataToSend = new FormData();
      
//       // Add all basic form fields
//       Object.keys(formData).forEach(key => {
//         if (key === 'emergencyContact') {
//           formDataToSend.append(key, JSON.stringify(formData[key]));
//         } else if (key === 'interests') {
//           // Convert comma-separated string to array
//           const interestsArray = formData[key].split(',').map(item => item.trim()).filter(item => item);
//           formDataToSend.append(key, JSON.stringify(interestsArray));
//         } else if (key === 'coursesStudiedInSecondary') {
//           formDataToSend.append(key, formData[key]);
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });
      
//       // Add properly structured complex arrays
//       formDataToSend.append('skills', JSON.stringify(skills));
//       formDataToSend.append('languagesSpoken', JSON.stringify(languagesSpoken));
//       formDataToSend.append('workExperience', JSON.stringify(workExperience));
//       formDataToSend.append('extracurricularActivities', JSON.stringify(extracurricularActivities));
//       formDataToSend.append('coursesStudiedPreviousUniversity', JSON.stringify(coursesStudiedPreviousUniversity));
//       formDataToSend.append('equivalentCourses', JSON.stringify(equivalentCourses));
      
//       // Add profile image
//       if (profileImage) {
//         formDataToSend.append('images', profileImage);
//       }
      
//       // Add documents
//       documents.forEach(doc => {
//         formDataToSend.append('documents', doc);
//       });

//       const response = await fetch('http://localhost:5000/api/student/createprofile', {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formDataToSend
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess('🎉 Profile created successfully! Redirecting to assessment...');
//         Notify.success('Profile created successfully! Redirecting to assessment...');
//         console.log('Profile created:', data);
        
//         // Redirect to assessment
//         setTimeout(() => {
//           window.location.href = '/assessment'; 
//         }, 2000);
//       } else {
//         setError(data.message || 'Failed to create profile');
//         Notify.failure('Failed to create profile');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//       Notify.failure('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Faculty and department options
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

//   const nextStep = () => setStep(step + 1);
//   const prevStep = () => setStep(step - 1);

//   // Handle logout
//   const handleLogout = () => {
//     if (window.confirm('Are you sure you want to logout? Your progress will be lost.')) {
//       // Clear all stored data
//       localStorage.removeItem('token');
//       localStorage.removeItem('user');
//       localStorage.removeItem('profileCompleted');
//       localStorage.removeItem('profileId');
//       localStorage.removeItem('assessmentCompleted');
//       localStorage.removeItem('hasRecommendations');
      
//       Notify.success('Logged out successfully!');
      
//       // Redirect to login page
//       setTimeout(() => {
//         window.location.href = '/';
//       }, 1000);
//     }
//   };

//   return (
//     <div className="profile-container">
//       <div className="profile-bg">
//         <div className="profile-bg-overlay"></div>
//         <div className="floating-shapes">
//           <div className="shape shape-1"></div>
//           <div className="shape shape-2"></div>
//           <div className="shape shape-3"></div>
//           <div className="shape shape-4"></div>
//         </div>
//       </div>

//       <div className="profile-content">
//         {/* Header with Progress */}
//         <div className="profile-header">
//           <div className="header-content">
//             <div className="header-icon">🌟</div>
//             <h1 className="profile-title">Create Your Student Profile</h1>
//             <p className="profile-subtitle">Complete your profile to access personalized career guidance</p>
//           </div>
          
//           {/* Logout Button */}
//           <div className="header-actions">
//             <button onClick={handleLogout} className="logout-btn">
//               <span className="logout-icon">🚪</span>
//               <span className="logout-text">Logout</span>
//             </button>
//           </div>
          
//           <div className="progress-section">
//             <div className="progress-info">
//               <span className="progress-text">Step {step} of 4</span>
//               <span className="progress-percentage">{Math.round((step / 4) * 100)}%</span>
//             </div>
//             <div className="progress-bar">
//               <div 
//                 className="progress-fill"
//                 style={{ width: `${(step / 4) * 100}%` }}
//               ></div>
//             </div>
//           </div>
//         </div>

//         {/* Error/Success Messages */}
//         {error && (
//           <div className="message-alert error-alert">
//             <span className="alert-icon">⚠️</span>
//             <span className="alert-text">{error}</span>
//             <button className="alert-close" onClick={() => setError('')}>✕</button>
//           </div>
//         )}
        
//         {success && (
//           <div className="message-alert success-alert">
//             <span className="alert-icon">✅</span>
//             <span className="alert-text">{success}</span>
//             <button className="alert-close" onClick={() => setSuccess('')}>✕</button>
//           </div>
//         )}

//         <form onSubmit={handleSubmit} className="profile-form">
          
//           {/* Step 1: Personal Information */}
//           {step === 1 && (
//             <div className="form-step active">
//               <div className="step-card">
//                 <div className="step-header">
//                   <div className="step-header-icon">👤</div>
//                   <h2 className="step-title">Personal Information</h2>
//                   <p className="step-description">Tell us about yourself</p>
//                 </div>
                
//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Nationality</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">🌍</span>
//                       <input
//                         type="text"
//                         name="nationality"
//                         value={formData.nationality}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                         placeholder="e.g., Rwanda"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Date of Birth</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">📅</span>
//                       <input
//                         type="date"
//                         name="dateOfBirth"
//                         value={formData.dateOfBirth}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Age</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">🎂</span>
//                       <input
//                         type="number"
//                         name="age"
//                         value={formData.age}
//                         onChange={handleChange}
//                         required
//                         min="16"
//                         max="100"
//                         className="form-input"
//                         placeholder="e.g., 19"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Gender</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">⚧️</span>
//                       <select
//                         name="gender"
//                         value={formData.gender}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                       >
//                         <option value="">Select Gender</option>
//                         <option value="Male">Male</option>
//                         <option value="Female">Female</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Country</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">🏳️</span>
//                       <input
//                         type="text"
//                         name="country"
//                         value={formData.country}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                         placeholder="e.g., Rwanda"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Phone Number</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">📱</span>
//                       <input
//                         type="tel"
//                         name="phoneNumber"
//                         value={formData.phoneNumber}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                         placeholder="e.g., +250788123456 or 0788123456"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Marital Status</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">💑</span>
//                       <select
//                         name="maritalStatus"
//                         value={formData.maritalStatus}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                       >
//                         <option value="">Select Status</option>
//                         <option value="Single">Single</option>
//                         <option value="Married">Married</option>
//                         <option value="Divorced">Divorced</option>
//                         <option value="Widowed">Widowed</option>
//                         <option value="Prefer not to say">Prefer not to say</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Religion</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">🙏</span>
//                       <select
//                         name="yourReligion"
//                         value={formData.yourReligion}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                       >
//                         <option value="">Select Religion</option>
//                         <option value="Adventist">Adventist</option>
//                         <option value="Protestant">Protestant</option>
//                         <option value="Catholic">Catholic</option>
//                         <option value="Islam">Islam</option>
//                         <option value="Other">Other</option>
//                         <option value="None">None</option>
//                       </select>
//                     </div>
//                   </div>
//                 </div>

//                 <div className="step-actions">
//                   <button type="button" onClick={nextStep} className="btn-next">
//                     Next Step <span className="btn-arrow">→</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Step 2: Academic Information */}
//           {step === 2 && (
//             <div className="form-step active">
//               <div className="step-card">
//                 <div className="step-header">
//                   <div className="step-header-icon">🎓</div>
//                   <h2 className="step-title">Academic Information</h2>
//                   <p className="step-description">Tell us about your educational background</p>
//                 </div>
                
//                 <div className="form-grid">
//                   {/* Transfer Student Question */}
//                   <div className="form-group full-width">
//                     <div className="checkbox-group">
//                       <label className="custom-checkbox">
//                         <input
//                           type="checkbox"
//                           name="transferStudent"
//                           checked={formData.transferStudent}
//                           onChange={handleChange}
//                         />
//                         <span className="checkbox-mark"></span>
//                         <span className="checkbox-label">I am a transfer student from another university</span>
//                       </label>
//                     </div>
//                   </div>

//                   {/* Transfer Student Fields */}
//                   {formData.transferStudent && (
//                     <>
//                       <div className="form-group full-width">
//                         <label className="form-label">
//                           <span className="label-text">Previous Institution</span>
//                           <span className="label-required">*</span>
//                         </label>
//                         <div className="input-wrapper">
//                           <span className="input-icon">🏫</span>
//                           <input
//                             type="text"
//                             name="previousInstitution"
//                             value={formData.previousInstitution}
//                             onChange={handleChange}
//                             required={formData.transferStudent}
//                             className="form-input"
//                             placeholder="e.g., University of Rwanda"
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <label className="form-label">
//                           <span className="label-text">Overall Grade at Previous University</span>
//                           <span className="label-required">*</span>
//                         </label>
//                         <div className="input-wrapper">
//                           <span className="input-icon">📊</span>
//                           <select
//                             name="overallGradePreviousUniversity"
//                             value={formData.overallGradePreviousUniversity}
//                             onChange={handleChange}
//                             required={formData.transferStudent}
//                             className="form-input"
//                           >
//                             <option value="">Select Grade Range</option>
//                             <option value="Below 50%">Below 50%</option>
//                             <option value="Satisfactory (50%-60.9%)">Satisfactory (50%-60.9%)</option>
//                             <option value="Good (61%-69.9%)">Good (61%-69.9%)</option>
//                             <option value="Lower Distinction (70%-79.9%)">Lower Distinction (70%-79.9%)</option>
//                             <option value="Higher Distinction (80%-100%)">Higher Distinction (80%-100%)</option>
//                             <option value="Not applicable">Not applicable</option>
//                           </select>
//                         </div>
//                       </div>
//                     </>
//                   )}

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Current Academic Level</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">📚</span>
//                       <select
//                         name="currentAcademicLevel"
//                         value={formData.currentAcademicLevel}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                       >
//                         <option value="">Select Level</option>
//                         <option value="O-Level">O-Level</option>
//                         <option value="A-Level">A-Level</option>
//                         <option value="Bachelor's Degree">Bachelor's Degree</option>
//                         <option value="Master's Degree">Master's Degree</option>
//                         <option value="PhD">PhD</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Student Program</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">🕐</span>
//                       <select
//                         name="studentProgram"
//                         value={formData.studentProgram}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                       >
//                         <option value="">Select Program</option>
//                         <option value="Day Program">Day Program</option>
//                         <option value="Evening Program">Evening Program</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">High School Grades</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">📈</span>
//                       <input
//                         type="number"
//                         name="highSchoolGrades"
//                         value={formData.highSchoolGrades}
//                         onChange={handleChange}
//                         required
//                         min="0"
//                         max="100"
//                         className="form-input"
//                         placeholder="e.g., 75"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Sponsorship Details</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">💰</span>
//                       <select
//                         name="sponsorshipDetails"
//                         value={formData.sponsorshipDetails}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                       >
//                         <option value="">Select Sponsorship</option>
//                         <option value="Self">Self</option>
//                         <option value="Parents">Parents</option>
//                         <option value="Government">Government</option>
//                         <option value="Organization">Organization</option>
//                         <option value="Scholarship">Scholarship</option>
//                         <option value="Other">Other</option>
//                       </select>
//                     </div>
//                   </div>

//                   <div className="form-group full-width">
//                     <label className="form-label">
//                       <span className="label-text">Courses Studied in Secondary</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">📖</span>
//                       <input
//                         type="text"
//                         name="coursesStudiedInSecondary"
//                         value={formData.coursesStudiedInSecondary}
//                         onChange={handleChange}
//                         className="form-input"
//                         placeholder="e.g., Mathematics, Physics, Chemistry"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Have Job</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">💼</span>
//                      <select
//                         name="haveJob"
//                         value={formData.haveJob}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                       >
//                         <option value="">Select Option</option>
//                         <option value="Yes">Yes</option>
//                         <option value="No">No</option>
//                         <option value="Part-time">Part-time</option>
//                         <option value="Internship">Internship</option>
//                         <option value="Volunteer">Volunteer</option>
//                       </select>
//                     </div>
//                   </div>

// <div className="form-group">
//   <div className="checkbox-group">
//     <label className="custom-checkbox">
//       <input
//         type="checkbox"
//         name="haveTwoPrincipalPasses"
//         checked={formData.haveTwoPrincipalPasses}
//         onChange={handleChange}
//       />
//       <span className="checkbox-mark"></span>
//       <span className="checkbox-label">I have two principal passes</span>
//     </label>
//   </div>
// </div>

// {/* Transfer Student Course Sections */}
// {formData.transferStudent && (
//   <>
//     {/* Previous University Courses */}
//     <div className="form-group full-width">
//       <div className="section-header">
//         <h3 className="section-title">Courses Studied at Previous University</h3>
//         <button type="button" onClick={addPreviousCourse} className="add-btn">
//           + Add Course
//         </button>
//       </div>
      
//       {coursesStudiedPreviousUniversity.map((course, index) => (
//         <div key={index} className="dynamic-item">
//           <div className="dynamic-item-content">
//             <div className="form-row">
//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Course Name"
//                   value={course.courseName}
//                   onChange={(e) => updatePreviousCourse(index, 'courseName', e.target.value)}
//                   className="form-input"
//                   required
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Course Code"
//                   value={course.courseCode}
//                   onChange={(e) => updatePreviousCourse(index, 'courseCode', e.target.value)}
//                   className="form-input"
//                 />
//               </div>
//             </div>
//             <div className="form-row">
//               <div className="form-group">
//                 <input
//                   type="number"
//                   placeholder="Credits"
//                   value={course.credits}
//                   onChange={(e) => updatePreviousCourse(index, 'credits', e.target.value)}
//                   className="form-input"
//                   min="1"
//                   max="10"
//                 />
//               </div>
//               <div className="form-group">
//                 <input
//                   type="text"
//                   placeholder="Grade Obtained"
//                   value={course.grade}
//                   onChange={(e) => updatePreviousCourse(index, 'grade', e.target.value)}
//                   className="form-input"
//                 />
//               </div>
//             </div>
//           </div>
//           <button 
//             type="button" 
//             onClick={() => removePreviousCourse(index)} 
//             className="remove-btn"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//     </div>

//     {/* Course Equivalence Mapping */}
//     <div className="form-group full-width">
//       <div className="section-header">
//         <h3 className="section-title">Course Equivalence Mapping</h3>
//         <button type="button" onClick={addEquivalentCourse} className="add-btn">
//           + Add Equivalent Course
//         </button>
//       </div>
//       <p className="input-help">
//         Map your previous university courses to equivalent AUCA courses for credit transfer consideration.
//       </p>
      
//       {equivalentCourses.map((equiv, index) => (
//         <div key={index} className="dynamic-item equivalence-item">
//           <div className="dynamic-item-content">
//             <div className="equivalence-section">
//               <h4 className="equivalence-title">Previous University Course</h4>
//               <div className="form-row">
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Previous Course Name"
//                     value={equiv.previousCourseName}
//                     onChange={(e) => updateEquivalentCourse(index, 'previousCourseName', e.target.value)}
//                     className="form-input"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="Previous Course Code"
//                     value={equiv.previousCourseCode}
//                     onChange={(e) => updateEquivalentCourse(index, 'previousCourseCode', e.target.value)}
//                     className="form-input"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div className="equivalence-section">
//               <h4 className="equivalence-title">Equivalent AUCA Course</h4>
//               <div className="form-row">
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="AUCA Course Name"
//                     value={equiv.aucaCourseName}
//                     onChange={(e) => updateEquivalentCourse(index, 'aucaCourseName', e.target.value)}
//                     className="form-input"
//                     required
//                   />
//                 </div>
//                 <div className="form-group">
//                   <input
//                     type="text"
//                     placeholder="AUCA Course Code"
//                     value={equiv.aucaCourseCode}
//                     onChange={(e) => updateEquivalentCourse(index, 'aucaCourseCode', e.target.value)}
//                     className="form-input"
//                   />
//                 </div>
//               </div>
//             </div>
            
//             <div className="form-group">
//               <textarea
//                 placeholder="Explain why you believe these courses are equivalent (content, skills, learning outcomes)"
//                 value={equiv.reasonForEquivalence}
//                 onChange={(e) => updateEquivalentCourse(index, 'reasonForEquivalence', e.target.value)}
//                 className="form-input"
//                 rows="3"
//                 maxLength="300"
//               />
//             </div>
//           </div>
//           <button 
//             type="button" 
//             onClick={() => removeEquivalentCourse(index)} 
//             className="remove-btn"
//           >
//             Remove
//           </button>
//         </div>
//       ))}
//     </div>
//   </>
// )}
// </div>

// <div className="step-actions">
//   <button type="button" onClick={prevStep} className="btn-prev">
//     <span className="btn-arrow">←</span> Previous
//   </button>
//   <button type="button" onClick={nextStep} className="btn-next">
//     Next Step <span className="btn-arrow">→</span>
//   </button>
// </div>
// </div>
//             </div>
//           )}

//           {/* Step 3: Skills & Experience */}
//           {step === 3 && (
//             <div className="form-step active">
//               <div className="step-card">
//                 <div className="step-header">
//                   <div className="step-header-icon">🎯</div>
//                   <h2 className="step-title">Skills, Experience & Goals</h2>
//                   <p className="step-description">Share your skills, experience and aspirations</p>
//                 </div>
                
//                 <div className="form-grid single-column">
//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Hobbies</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">🎨</span>
//                       <input
//                         type="text"
//                         name="hobbies"
//                         value={formData.hobbies}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                         placeholder="e.g., Reading, Sports, Music"
//                       />
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Interests</span>
//                       <span className="label-required">*</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">💡</span>
//                       <input
//                         type="text"
//                         name="interests"
//                         value={formData.interests}
//                         onChange={handleChange}
//                         required
//                         className="form-input"
//                         placeholder="e.g., Technology, Business, Healthcare (comma-separated)"
//                       />
//                     </div>
//                     <p className="input-help">Separate multiple interests with commas</p>
//                   </div>

//                   {/* Skills Section */}
//                   <div className="form-group">
//                     <div className="section-header">
//                       <h3 className="section-title">Skills</h3>
//                       <button type="button" onClick={addSkill} className="add-btn">
//                         + Add Skill
//                       </button>
//                     </div>
                    
//                     {skills.map((skill, index) => (
//                       <div key={index} className="dynamic-item">
//                         <div className="dynamic-item-content">
//                           <div className="form-row">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 placeholder="Skill name (e.g., Programming)"
//                                 value={skill.skillName}
//                                 onChange={(e) => updateSkill(index, 'skillName', e.target.value)}
//                                 className="form-input"
//                                 required
//                               />
//                             </div>
//                             <div className="form-group">
//                               <select
//                                 value={skill.proficiencyLevel}
//                                 onChange={(e) => updateSkill(index, 'proficiencyLevel', e.target.value)}
//                                 className="form-input"
//                               >
//                                 <option value="Beginner">Beginner</option>
//                                 <option value="Intermediate">Intermediate</option>
//                                 <option value="Advanced">Advanced</option>
//                                 <option value="Expert">Expert</option>
//                               </select>
//                             </div>
//                           </div>
//                         </div>
//                         <button 
//                           type="button" 
//                           onClick={() => removeSkill(index)} 
//                           className="remove-btn"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Languages Section */}
//                   <div className="form-group">
//                     <div className="section-header">
//                       <h3 className="section-title">Languages Spoken</h3>
//                       <button type="button" onClick={addLanguage} className="add-btn">
//                         + Add Language
//                       </button>
//                     </div>
                    
//                     {languagesSpoken.map((language, index) => (
//                       <div key={index} className="dynamic-item">
//                         <div className="dynamic-item-content">
//                           <div className="form-row">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 placeholder="Language (e.g., English)"
//                                 value={language.language}
//                                 onChange={(e) => updateLanguage(index, 'language', e.target.value)}
//                                 className="form-input"
//                                 required
//                               />
//                             </div>
//                             <div className="form-group">
//                               <select
//                                 value={language.proficiency}
//                                 onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
//                                 className="form-input"
//                               >
//                                 <option value="Basic">Basic</option>
//                                 <option value="Conversational">Conversational</option>
//                                 <option value="Fluent">Fluent</option>
//                                 <option value="Native">Native</option>
//                               </select>
//                             </div>
//                           </div>
//                         </div>
//                         <button 
//                           type="button" 
//                           onClick={() => removeLanguage(index)} 
//                           className="remove-btn"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Work Experience Section */}
//                   <div className="form-group">
//                     <div className="section-header">
//                       <h3 className="section-title">Work Experience</h3>
//                       <button type="button" onClick={addWorkExperience} className="add-btn">
//                         + Add Experience
//                       </button>
//                     </div>
                    
//                     {workExperience.map((experience, index) => (
//                       <div key={index} className="dynamic-item">
//                         <div className="dynamic-item-content">
//                           <div className="form-row">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 placeholder="Job Title"
//                                 value={experience.jobTitle}
//                                 onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
//                                 className="form-input"
//                                 required
//                               />
//                             </div>
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 placeholder="Company"
//                                 value={experience.company}
//                                 onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
//                                 className="form-input"
//                               />
//                             </div>
//                           </div>
//                           <div className="form-row">
//                             <div className="form-group">
//                               <input
//                                 type="date"
//                                 placeholder="Start Date"
//                                 value={experience.startDate}
//                                 onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
//                                 className="form-input"
//                               />
//                             </div>
//                             <div className="form-group">
//                               <input
//                                 type="date"
//                                 placeholder="End Date"
//                                 value={experience.endDate}
//                                 onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
//                                 className="form-input"
//                                 disabled={experience.isCurrent}
//                               />
//                             </div>
//                           </div>
//                           <div className="form-row">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 placeholder="Duration (e.g., 6 months)"
//                                 value={experience.duration}
//                                 onChange={(e) => updateWorkExperience(index, 'duration', e.target.value)}
//                                 className="form-input"
//                               />
//                             </div>
//                             <div className="form-group">
//                               <label className="custom-checkbox">
//                                 <input
//                                   type="checkbox"
//                                   checked={experience.isCurrent}
//                                   onChange={(e) => updateWorkExperience(index, 'isCurrent', e.target.checked)}
//                                 />
//                                 <span className="checkbox-mark"></span>
//                                 <span className="checkbox-label">Current Job</span>
//                               </label>
//                             </div>
//                           </div>
//                           <div className="form-group">
//                             <textarea
//                               placeholder="Job description and responsibilities"
//                               value={experience.description}
//                               onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
//                               className="form-input"
//                               rows="3"
//                               maxLength="300"
//                             />
//                           </div>
//                         </div>
//                         <button 
//                           type="button" 
//                           onClick={() => removeWorkExperience(index)} 
//                           className="remove-btn"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Extracurricular Activities Section */}
//                   <div className="form-group">
//                     <div className="section-header">
//                       <h3 className="section-title">Extracurricular Activities</h3>
//                       <button type="button" onClick={addExtracurricularActivity} className="add-btn">
//                         + Add Activity
//                       </button>
//                     </div>
                    
//                     {extracurricularActivities.map((activity, index) => (
//                       <div key={index} className="dynamic-item">
//                         <div className="dynamic-item-content">
//                           <div className="form-row">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 placeholder="Activity Name"
//                                 value={activity.activity}
//                                 onChange={(e) => updateExtracurricularActivity(index, 'activity', e.target.value)}
//                                 className="form-input"
//                                 required
//                               />
//                             </div>
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 placeholder="Your Role"
//                                 value={activity.role}
//                                 onChange={(e) => updateExtracurricularActivity(index, 'role', e.target.value)}
//                                 className="form-input"
//                               />
//                             </div>
//                           </div>
//                           <div className="form-row">
//                             <div className="form-group">
//                               <input
//                                 type="text"
//                                 placeholder="Organization/Club"
//                                 value={activity.organization}
//                                 onChange={(e) => updateExtracurricularActivity(index, 'organization', e.target.value)}
//                                 className="form-input"
//                               />
//                             </div>
//                           </div>
//                           <div className="form-row">
//                             <div className="form-group">
//                               <input
//                                 type="date"
//                                 placeholder="Start Date"
//                                 value={activity.startDate}
//                                 onChange={(e) => updateExtracurricularActivity(index, 'startDate', e.target.value)}
//                                 className="form-input"
//                               />
//                             </div>
//                             <div className="form-group">
//                               <input
//                                 type="date"
//                                 placeholder="End Date"
//                                 value={activity.endDate}
//                                 onChange={(e) => updateExtracurricularActivity(index, 'endDate', e.target.value)}
//                                 className="form-input"
//                               />
//                             </div>
//                           </div>
//                           <div className="form-group">
//                             <textarea
//                               placeholder="Description of the activity and your contributions"
//                               value={activity.description}
//                               onChange={(e) => updateExtracurricularActivity(index, 'description', e.target.value)}
//                               className="form-input"
//                               rows="3"
//                               maxLength="300"
//                             />
//                           </div>
//                         </div>
//                         <button 
//                           type="button" 
//                           onClick={() => removeExtracurricularActivity(index)} 
//                           className="remove-btn"
//                         >
//                           Remove
//                         </button>
//                       </div>
//                     ))}
//                   </div>

//                   {/* Faculty and Department Selection */}
//                   <div className="form-grid">
//                     <div className="form-group">
//                       <label className="form-label">
//                         <span className="label-text">Desired Faculty</span>
//                       </label>
//                       <div className="input-wrapper">
//                         <span className="input-icon">🏫</span>
//                         <select
//                           name="desiredFaculty"
//                           value={formData.desiredFaculty}
//                           onChange={handleChange}
//                           className="form-input"
//                         >
//                           <option value="">Select Faculty</option>
//                           {facultyOptions.map(faculty => (
//                             <option key={faculty} value={faculty}>{faculty}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>

//                     <div className="form-group">
//                       <label className="form-label">
//                         <span className="label-text">Desired Department</span>
//                       </label>
//                       <div className="input-wrapper">
//                         <span className="input-icon">🎯</span>
//                         <select
//                           name="desiredDepartment"
//                           value={formData.desiredDepartment}
//                           onChange={handleChange}
//                           className="form-input"
//                           disabled={!formData.desiredFaculty}
//                         >
//                           <option value="">Select Department</option>
//                           {getDepartmentOptions(formData.desiredFaculty).map(dept => (
//                             <option key={dept} value={dept}>{dept}</option>
//                           ))}
//                         </select>
//                       </div>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <span className="label-text">Career Goals</span>
//                     </label>
//                     <div className="input-wrapper">
//                       <span className="input-icon">🚀</span>
//                       <textarea
//                         name="careerGoals"
//                         value={formData.careerGoals}
//                         onChange={handleChange}
//                         rows="4"
//                         className="form-input"
//                         placeholder="Describe your career aspirations and goals..."
//                         maxLength="500"
//                       />
//                     </div>
//                   </div>
//                 </div>

//                 <div className="step-actions">
//                   <button type="button" onClick={prevStep} className="btn-prev">
//                     <span className="btn-arrow">←</span> Previous
//                   </button>
//                   <button type="button" onClick={nextStep} className="btn-next">
//                     Next Step <span className="btn-arrow">→</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}
//           {/* Step 4: Documents & Emergency Contact */}
//           {step === 4 && (
//             <div className="form-step active">
//               <div className="step-card">
//                 <div className="step-header">
//                   <div className="step-header-icon">📄</div>
//                   <h2 className="step-title">Documents & Emergency Contact</h2>
//                   <p className="step-description">Upload documents and provide emergency contact</p>
//                 </div>
                
//                 <div className="form-grid single-column">
//                   {/* Profile Image Upload */}
//                   <div className="form-group">
//                     <h3 className="section-title">Profile Image</h3>
//                     <div className={`upload-area ${profileImage ? 'has-file' : ''}`}>
//                       {profileImage ? (
//                         <div className="image-preview">
//                           <img 
//                             src={URL.createObjectURL(profileImage)} 
//                             alt="Profile preview" 
//                             className="preview-image"
//                           />
//                           <p className="image-name">{profileImage.name}</p>
//                           <button
//                             type="button"
//                             onClick={() => setProfileImage(null)}
//                             className="remove-btn"
//                           >
//                             Remove Image
//                           </button>
//                         </div>
//                       ) : (
//                         <div>
//                           <div className="upload-icon">📷</div>
//                           <div className="upload-buttons">
//                             <button
//                               type="button"
//                               onClick={() => fileInputRef.current?.click()}
//                               className="upload-btn primary"
//                             >
//                               Upload Image
//                             </button>
//                             <button
//                               type="button"
//                               onClick={() => cameraInputRef.current?.click()}
//                               className="upload-btn secondary"
//                             >
//                               Take Photo
//                             </button>
//                           </div>
//                           <p className="upload-info">JPG, PNG up to 5MB</p>
//                         </div>
//                       )}
                      
//                       <input
//                         ref={fileInputRef}
//                         type="file"
//                         accept="image/*"
//                         onChange={handleImageUpload}
//                         style={{ display: 'none' }}
//                       />
//                       <input
//                         ref={cameraInputRef}
//                         type="file"
//                         accept="image/*"
//                         capture="environment"
//                         onChange={handleCameraCapture}
//                         style={{ display: 'none' }}
//                       />
//                     </div>
//                   </div>

//                   {/* Document Upload */}
//                   <div className="form-group">
//                     <h3 className="section-title">Supporting Documents</h3>
//                     <div className="upload-area">
//                       <div className="upload-icon">📄</div>
//                       <button
//                         type="button"
//                         onClick={() => documentInputRef.current?.click()}
//                         className="upload-btn primary"
//                       >
//                         Upload Documents
//                       </button>
//                       <p className="upload-info">
//                         PDF, DOC, DOCX, JPG, PNG up to 5MB each (Maximum 5 files)
//                         {formData.transferStudent && (
//                           <><br />
//                           <strong>Transfer students: Please include official transcripts from previous institution</strong></>
//                         )}
//                       </p>
//                       <input
//                         ref={documentInputRef}
//                         type="file"
//                         multiple
//                         accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                         onChange={handleDocumentUpload}
//                         style={{ display: 'none' }}
//                       />
//                     </div>

//                     {/* Display uploaded documents */}
//                     {documents.length > 0 && (
//                       <div className="document-list">
//                         <h4 className="document-list-title">Uploaded Documents:</h4>
//                         {documents.map((doc, index) => (
//                           <div key={index} className="document-item">
//                             <div className="document-info">
//                               <span className="document-icon">📄</span>
//                               <span className="document-name">{doc.name}</span>
//                               <span className="document-size">
//                                 ({(doc.size / 1024 / 1024).toFixed(2)} MB)
//                               </span>
//                             </div>
//                             <button
//                               type="button"
//                               onClick={() => removeDocument(index)}
//                               className="document-remove"
//                             >
//                               Remove
//                             </button>
//                           </div>
//                         ))}
//                       </div>
//                     )}
//                   </div>

//                   {/* Emergency Contact */}
//                   <div className="form-group">
//                     <h3 className="section-title">Emergency Contact Information</h3>
//                     <div className="form-grid">
//                       <div className="form-group">
//                         <label className="form-label">
//                           <span className="label-text">Contact Name</span>
//                           <span className="label-required">*</span>
//                         </label>
//                         <div className="input-wrapper">
//                           <span className="input-icon">👤</span>
//                           <input
//                             type="text"
//                             name="emergencyContact.name"
//                             value={formData.emergencyContact.name}
//                             onChange={handleChange}
//                             required
//                             className="form-input"
//                             placeholder="Full name of emergency contact"
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <label className="form-label">
//                           <span className="label-text">Relationship</span>
//                           <span className="label-required">*</span>
//                         </label>
//                         <div className="input-wrapper">
//                           <span className="input-icon">👥</span>
//                           <select
//                             name="emergencyContact.relationship"
//                             value={formData.emergencyContact.relationship}
//                             onChange={handleChange}
//                             required
//                             className="form-input"
//                           >
//                             <option value="">Select Relationship</option>
//                             <option value="Parent">Parent</option>
//                             <option value="Guardian">Guardian</option>
//                             <option value="Sibling">Sibling</option>
//                             <option value="Spouse">Spouse</option>
//                             <option value="Relative">Relative</option>
//                             <option value="Friend">Friend</option>
//                             <option value="Other">Other</option>
//                           </select>
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <label className="form-label">
//                           <span className="label-text">Phone Number</span>
//                           <span className="label-required">*</span>
//                         </label>
//                         <div className="input-wrapper">
//                           <span className="input-icon">📱</span>
//                           <input
//                             type="tel"
//                             name="emergencyContact.phoneNumber"
//                             value={formData.emergencyContact.phoneNumber}
//                             onChange={handleChange}
//                             required
//                             className="form-input"
//                             placeholder="e.g., +250788123456"
//                           />
//                         </div>
//                       </div>

//                       <div className="form-group">
//                         <label className="form-label">
//                           <span className="label-text">Email Address</span>
//                         </label>
//                         <div className="input-wrapper">
//                           <span className="input-icon">📧</span>
//                           <input
//                             type="email"
//                             name="emergencyContact.email"
//                             value={formData.emergencyContact.email}
//                             onChange={handleChange}
//                             className="form-input"
//                             placeholder="emergency.contact@email.com"
//                           />
//                         </div>
//                       </div>
//                     </div>
//                   </div>

//                   {/* Additional Information */}
//                   <div className="form-group">
//                     <h3 className="section-title">Additional Information</h3>
//                     <div className="form-group">
//                       <label className="form-label">
//                         <span className="label-text">Disability Status</span>
//                       </label>
//                       <div className="input-wrapper">
//                         <span className="input-icon">♿</span>
//                         <select
//                           name="disability"
//                           value={formData.disability}
//                           onChange={handleChange}
//                           className="form-input"
//                         >
//                           <option value="None">None</option>
//                           <option value="Visual Impairment">Visual Impairment</option>
//                           <option value="Hearing Impairment">Hearing Impairment</option>
//                           <option value="Physical Disability">Physical Disability</option>
//                           <option value="Learning Disability">Learning Disability</option>
//                           <option value="Other">Other</option>
//                           <option value="Prefer not to say">Prefer not to say</option>
//                         </select>
//                       </div>
//                     </div>
//                   </div>
//                 </div>

// <div className="step-actions">
//                   <button type="button" onClick={prevStep} className="btn-prev">
//                     <span className="btn-arrow">←</span> Previous
//                   </button>
//                   <button
//                     type="submit"
//                     disabled={loading}
//                     className={`btn-submit ${loading ? 'loading' : ''}`}
//                   >
//                     {loading ? (
//                       <div className="loading-content">
//                         <div className="loading-spinner"></div>
//                         Creating Profile...
//                       </div>
//                     ) : (
//                       'Create Profile'
//                     )}
//                   </button>
                  
//                 </div>
                
//               </div>
              
//             </div>
            
//          )}
//           </form>
//          </div>
//         </div>
//   );
// };

// export default StudentProfile;


import React, { useState, useRef, useEffect } from 'react';
import { Notify } from 'notiflix';
import './styles/StudentProfile.css'; 

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
    // Transfer Student Fields
    transferStudent: false,
    previousInstitution: '',
    overallGradePreviousUniversity: '',
    disability: 'None',
    haveJob: '',
    hobbies: '',
    interests: '',
    desiredFaculty: '',
    desiredDepartment: '',
    careerGoals: '',
    emergencyContact: {
      name: '',
      relationship: '',
      phoneNumber: '',
      email: ''
    }
  });
  
  // Separate state for complex arrays
  const [workExperience, setWorkExperience] = useState([]);
  const [extracurricularActivities, setExtracurricularActivities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [coursesStudiedPreviousUniversity, setCoursesStudiedPreviousUniversity] = useState([]);
  const [equivalentCourses, setEquivalentCourses] = useState([]);
  
  const [profileImage, setProfileImage] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [step, setStep] = useState(1);

  // NEW: Enhanced states for document analysis and grade normalization
  const [gradeNormalization, setGradeNormalization] = useState({
    normalized: null,
    percentile: null,
    international: null,
    isValid: false
  });
  const [documentAnalysis, setDocumentAnalysis] = useState({});
  const [analysisProgress, setAnalysisProgress] = useState({});
  const [securitySummary, setSecuritySummary] = useState({
    totalDocuments: 0,
    verifiedDocuments: 0,
    securityRisk: 'LOW',
    nameVerificationPassed: false
  });

  // NEW: Country grade systems for normalization
  const countryGradeSystems = {
    'Rwanda': { max: 73, scale: '0-73 points', system: 'Rwanda National Examination' },
    'Uganda': { max: 100, scale: '0-100%', system: 'Uganda Certificate of Education' },
    'Kenya': { max: 12, scale: 'A-E grades', system: 'Kenya Certificate of Secondary Education' },
    'Tanzania': { max: 100, scale: '0-100%', system: 'Certificate of Secondary Education' },
    'Burundi': { max: 20, scale: '0-20 points', system: 'Baccalauréat' },
    'Ethiopia': { max: 100, scale: '0-100%', system: 'Ethiopian University Entrance Examination' },
    'Somalia': { max: 100, scale: '0-100%', system: 'Secondary School Certificate' },
    'South Sudan': { max: 100, scale: '0-100%', system: 'South Sudan Certificate of Secondary Education' },
    'Chad': { max: 20, scale: '0-20 points', system: 'Baccalauréat' },
    'Cameroon': { max: 20, scale: '0-20 points', system: 'Baccalauréat' },
    'Central African Republic': { max: 20, scale: '0-20 points', system: 'Baccalauréat' },
    'Mali': { max: 20, scale: '0-20 points', system: 'Baccalauréat' },
    'Burkina Faso': { max: 20, scale: '0-20 points', system: 'Baccalauréat' },
    'Niger': { max: 20, scale: '0-20 points', system: 'Baccalauréat' },
    'Senegal': { max: 20, scale: '0-20 points', system: 'Baccalauréat' },
    'Ghana': { max: 36, scale: '6-36 aggregate', system: 'West African Senior School Certificate' },
    'Nigeria': { max: 9, scale: 'A1-F9 grades', system: 'West African Senior School Certificate' },
    'Togo': { max: 20, scale: '0-20 points', system: 'Baccalauréat' },
    'Benin': { max: 20, scale: '0-20 points', system: 'Baccalauréat' },
    'Ivory Coast': { max: 20, scale: '0-20 points', system: 'Baccalauréat' },
    'Guinea': { max: 20, scale: '0-20 points', system: 'Baccalauréat' }
  };

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // NEW: Grade normalization effect
  useEffect(() => {
    if (formData.highSchoolGrades && formData.country) {
      normalizeGrade(formData.highSchoolGrades, formData.country);
    }
  }, [formData.highSchoolGrades, formData.country]);

  // NEW: Grade normalization function
  const normalizeGrade = (grade, country) => {
    const gradeNum = parseFloat(grade);
    const countrySystem = countryGradeSystems[country];
    
    if (!countrySystem || !gradeNum) {
      setGradeNormalization({
        normalized: null,
        percentile: null,
        international: null,
        isValid: false
      });
      return;
    }

    // Calculate normalized score (0-100 international scale)
    let normalizedScore;
    let percentile;

    switch (country) {
      case 'Rwanda':
        normalizedScore = (gradeNum / 73) * 100;
        percentile = gradeNum >= 60 ? 95 : gradeNum >= 50 ? 78 : gradeNum >= 40 ? 60 : gradeNum >= 30 ? 40 : 20;
        break;
      case 'Ghana':
        // Ghana uses aggregate system (6-36, lower is better)
        normalizedScore = Math.max(0, ((36 - gradeNum) / 30) * 100);
        percentile = gradeNum <= 12 ? 90 : gradeNum <= 18 ? 75 : gradeNum <= 24 ? 50 : gradeNum <= 30 ? 25 : 10;
        break;
      case 'Mali':
      case 'Chad':
      case 'Burundi':
      case 'Senegal':
      case 'Burkina Faso':
      case 'Niger':
      case 'Cameroon':
      case 'Togo':
      case 'Benin':
      case 'Ivory Coast':
      case 'Guinea':
        normalizedScore = (gradeNum / 20) * 100;
        percentile = gradeNum >= 16 ? 95 : gradeNum >= 14 ? 85 : gradeNum >= 12 ? 70 : gradeNum >= 10 ? 50 : 25;
        break;
      default:
        normalizedScore = gradeNum; // Assume already percentage
        percentile = gradeNum >= 85 ? 95 : gradeNum >= 75 ? 85 : gradeNum >= 65 ? 70 : gradeNum >= 55 ? 50 : 25;
    }

    const performanceLevel = 
      normalizedScore >= 85 ? 'Excellent' :
      normalizedScore >= 75 ? 'Very Good' :
      normalizedScore >= 65 ? 'Good' :
      normalizedScore >= 55 ? 'Fair' :
      'Needs Improvement';

    setGradeNormalization({
      normalized: Math.round(normalizedScore * 10) / 10,
      percentile,
      international: performanceLevel,
      isValid: true
    });
  };

  // NEW: Document analysis function
  const analyzeDocument = async (file, index) => {
    setAnalysisProgress(prev => ({
      ...prev,
      [index]: { status: 'analyzing', progress: 0 }
    }));

    try {
      const token = localStorage.getItem('token');
      const formData = new FormData();
      formData.append('documents', file);

      const response = await fetch('http://localhost:5000/api/test/analyze-document', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formData
      });

      const data = await response.json();

      if (response.ok && data.success) {
        const analysis = data.analysis;
        
        setDocumentAnalysis(prev => ({
          ...prev,
          [index]: {
            fileName: file.name,
            success: analysis.success,
            textContent: analysis.textContent?.substring(0, 200) + '...',
            extractedNames: analysis.extractedNames,
            nameVerification: analysis.nameVerification,
            fraudDetection: analysis.fraudDetection,
            academicData: analysis.academicData,
            securityRisk: analysis.fraudDetection?.riskScore || 0
          }
        }));

        setAnalysisProgress(prev => ({
          ...prev,
          [index]: { 
            status: 'completed', 
            progress: 100,
            verified: analysis.nameVerification?.isVerified || false,
            riskScore: analysis.fraudDetection?.riskScore || 0
          }
        }));

        // Update security summary
        setSecuritySummary(prev => ({
          ...prev,
          totalDocuments: prev.totalDocuments + 1,
          verifiedDocuments: analysis.nameVerification?.isVerified ? prev.verifiedDocuments + 1 : prev.verifiedDocuments,
          nameVerificationPassed: analysis.nameVerification?.isVerified || prev.nameVerificationPassed
        }));

        // Show notification
        if (analysis.nameVerification?.isVerified) {
          Notify.success(`✅ ${file.name}: Name verified successfully!`);
        } else {
          Notify.warning(`⚠️ ${file.name}: Name verification failed`);
        }

      } else {
        throw new Error(data.message || 'Analysis failed');
      }
    } catch (error) {
      console.error('Document analysis error:', error);
      setAnalysisProgress(prev => ({
        ...prev,
        [index]: { status: 'failed', progress: 0, error: error.message }
      }));
      
      setDocumentAnalysis(prev => ({
        ...prev,
        [index]: {
          fileName: file.name,
          success: false,
          error: error.message
        }
      }));
    }
  };

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

  // All your existing functions (keeping them as they are)
  const addPreviousCourse = () => {
    setCoursesStudiedPreviousUniversity([...coursesStudiedPreviousUniversity, {
      courseName: '',
      courseCode: '',
      credits: '',
      grade: ''
    }]);
  };

  const updatePreviousCourse = (index, field, value) => {
    const updated = coursesStudiedPreviousUniversity.map((course, i) => 
      i === index ? { ...course, [field]: value } : course
    );
    setCoursesStudiedPreviousUniversity(updated);
  };

  const removePreviousCourse = (index) => {
    setCoursesStudiedPreviousUniversity(coursesStudiedPreviousUniversity.filter((_, i) => i !== index));
  };

  const addEquivalentCourse = () => {
    setEquivalentCourses([...equivalentCourses, {
      previousCourseName: '',
      previousCourseCode: '',
      aucaCourseName: '',
      aucaCourseCode: '',
      reasonForEquivalence: ''
    }]);
  };

  const updateEquivalentCourse = (index, field, value) => {
    const updated = equivalentCourses.map((course, i) => 
      i === index ? { ...course, [field]: value } : course
    );
    setEquivalentCourses(updated);
  };

  const removeEquivalentCourse = (index) => {
    setEquivalentCourses(equivalentCourses.filter((_, i) => i !== index));
  };

  const addWorkExperience = () => {
    setWorkExperience([...workExperience, {
      jobTitle: '',
      company: '',
      startDate: '',
      endDate: '',
      duration: '',
      description: '',
      isCurrent: false
    }]);
  };

  const updateWorkExperience = (index, field, value) => {
    const updated = workExperience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    setWorkExperience(updated);
  };

  const removeWorkExperience = (index) => {
    setWorkExperience(workExperience.filter((_, i) => i !== index));
  };

  const addExtracurricularActivity = () => {
    setExtracurricularActivities([...extracurricularActivities, {
      activity: '',
      role: '',
      organization: '',
      startDate: '',
      endDate: '',
      description: ''
    }]);
  };

  const updateExtracurricularActivity = (index, field, value) => {
    const updated = extracurricularActivities.map((activity, i) => 
      i === index ? { ...activity, [field]: value } : activity
    );
    setExtracurricularActivities(updated);
  };

  const removeExtracurricularActivity = (index) => {
    setExtracurricularActivities(extracurricularActivities.filter((_, i) => i !== index));
  };

  const addSkill = () => {
    setSkills([...skills, {
      skillName: '',
      proficiencyLevel: 'Beginner'
    }]);
  };

  const updateSkill = (index, field, value) => {
    const updated = skills.map((skill, i) => 
      i === index ? { ...skill, [field]: value } : skill
    );
    setSkills(updated);
  };

  const removeSkill = (index) => {
    setSkills(skills.filter((_, i) => i !== index));
  };

  const addLanguage = () => {
    setLanguagesSpoken([...languagesSpoken, {
      language: '',
      proficiency: 'Basic'
    }]);
  };

  const updateLanguage = (index, field, value) => {
    const updated = languagesSpoken.map((lang, i) => 
      i === index ? { ...lang, [field]: value } : lang
    );
    setLanguagesSpoken(updated);
  };

  const removeLanguage = (index) => {
    setLanguagesSpoken(languagesSpoken.filter((_, i) => i !== index));
  };

  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith('image/')) {
        setError('Please select a valid image file');
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError('Image size must be less than 5MB');
        return;
      }
      setProfileImage(file);
      setError('');
    }
  };

  const handleCameraCapture = (e) => {
    const file = e.target.files[0];
    if (file) {
      setProfileImage(file);
    }
  };

  // ENHANCED: Document upload with analysis
  const handleDocumentUpload = async (e) => {
    const files = Array.from(e.target.files);
    
    if (documents.length + files.length > 5) {
      setError('Maximum 5 documents allowed');
      return;
    }
    
    const validFiles = files.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} is too large. Maximum 5MB per file.`);
        return false;
      }
      
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
      if (!allowedTypes.includes(file.type)) {
        setError(`${file.name} is not a supported file type.`);
        return false;
      }
      
      return true;
    });
    
    // Add files to state
    const newDocuments = [...documents, ...validFiles];
    setDocuments(newDocuments);
    setError('');

    // Analyze each new document
    validFiles.forEach((file, fileIndex) => {
      const documentIndex = documents.length + fileIndex;
      analyzeDocument(file, documentIndex);
    });
  };

  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
    setDocumentAnalysis(prev => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
    setAnalysisProgress(prev => {
      const updated = { ...prev };
      delete updated[index];
      return updated;
    });
  };

  // Handle form submission - ENHANCED
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to continue');
        return;
      }

      // Create FormData for file uploads
      const formDataToSend = new FormData();
      
      // Add all basic form fields
      Object.keys(formData).forEach(key => {
        if (key === 'emergencyContact') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'interests') {
          // Convert comma-separated string to array
          const interestsArray = formData[key].split(',').map(item => item.trim()).filter(item => item);
          formDataToSend.append(key, JSON.stringify(interestsArray));
        } else if (key === 'coursesStudiedInSecondary') {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add properly structured complex arrays
      formDataToSend.append('skills', JSON.stringify(skills));
      formDataToSend.append('languagesSpoken', JSON.stringify(languagesSpoken));
      formDataToSend.append('workExperience', JSON.stringify(workExperience));
      formDataToSend.append('extracurricularActivities', JSON.stringify(extracurricularActivities));
      formDataToSend.append('coursesStudiedPreviousUniversity', JSON.stringify(coursesStudiedPreviousUniversity));
      formDataToSend.append('equivalentCourses', JSON.stringify(equivalentCourses));
      
      // Add profile image
      if (profileImage) {
        formDataToSend.append('images', profileImage);
      }
      
      // Add documents
      documents.forEach(doc => {
        formDataToSend.append('documents', doc);
      });

      // ENHANCED: Use secure endpoint with document analysis
      const response = await fetch('http://localhost:5000/api/student/profile-secure', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('🎉 Profile created successfully with document verification! Redirecting to assessment...');
        Notify.success('Profile created successfully with document verification!');
        console.log('Profile created:', data);
        
        // Show security summary
        if (data.securitySummary) {
          console.log('Security Summary:', data.securitySummary);
          if (data.securitySummary.documentsVerified > 0) {
            Notify.success(`✅ ${data.securitySummary.documentsVerified} documents verified successfully!`);
          }
        }
        
        // Redirect to assessment
        setTimeout(() => {
          window.location.href = '/assessment'; 
        }, 3000);
      } else {
        if (data.securityIssues) {
          setError(`Security issues detected: ${data.message}`);
          console.error('Security Issues:', data.securityIssues);
        } else {
          setError(data.message || 'Failed to create profile');
        }
        Notify.failure(data.message || 'Failed to create profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      Notify.failure('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  // Faculty and department options
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

  const nextStep = () => setStep(step + 1);
  const prevStep = () => setStep(step - 1);

  // Handle logout
  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout? Your progress will be lost.')) {
      // Clear all stored data
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      localStorage.removeItem('profileCompleted');
      localStorage.removeItem('profileId');
      localStorage.removeItem('assessmentCompleted');
      localStorage.removeItem('hasRecommendations');
      
      Notify.success('Logged out successfully!');
      
      // Redirect to login page
      setTimeout(() => {
        window.location.href = '/';
      }, 1000);
    }
  };

  // JSX RETURN - THIS WAS MISSING!
  return (
    <div className="profile-container">
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
        {/* Header with Progress */}
        <div className="profile-header">
          <div className="header-content">
            <div className="header-icon">🌟</div>
            <h1 className="profile-title">Create Your Enhanced Student Profile</h1>
            <p className="profile-subtitle">Complete your profile with AI-powered document analysis and grade normalization</p>
          </div>
          
          {/* Logout Button */}
          <div className="header-actions">
            <button onClick={handleLogout} className="logout-btn">
              <span className="logout-icon">🚪</span>
              <span className="logout-text">Logout</span>
            </button>
          </div>
          
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
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="message-alert error-alert">
            <span className="alert-icon">⚠️</span>
            <span className="alert-text">{error}</span>
            <button className="alert-close" onClick={() => setError('')}>✕</button>
          </div>
        )}
        
        {success && (
          <div className="message-alert success-alert">
            <span className="alert-icon">✅</span>
            <span className="alert-text">{success}</span>
            <button className="alert-close" onClick={() => setSuccess('')}>✕</button>
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

                  {/* ENHANCED: Country dropdown with grade systems */}
                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Country</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <span className="input-icon">🏳️</span>
                      <select
                        name="country"
                        value={formData.country}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select Country</option>
                        {Object.keys(countryGradeSystems).map(country => (
                          <option key={country} value={country}>{country}</option>
                        ))}
                      </select>
                    </div>
                    {formData.country && countryGradeSystems[formData.country] && (
                      <p className="input-help grade-system-info">
                        📊 {countryGradeSystems[formData.country].system} 
                        ({countryGradeSystems[formData.country].scale})
                      </p>
                    )}
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
                  <button type="button" onClick={nextStep} className="btn-next">
                    Next Step <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 2: Academic Information with Grade Normalization */}
          {step === 2 && (
            <div className="form-step active">
              <div className="step-card">
                <div className="step-header">
                  <div className="step-header-icon">🎓</div>
                  <h2 className="step-title">Academic Information</h2>
                  <p className="step-description">Tell us about your educational background with AI-powered grade analysis</p>
                </div>
                
                <div className="form-grid">
                  {/* ENHANCED: High School Grades with Real-time Normalization */}
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
                        max={formData.country ? countryGradeSystems[formData.country]?.max : 100}
                        className="form-input"
                        placeholder={formData.country ? `Max: ${countryGradeSystems[formData.country]?.max}` : "Enter your grade"}
                      />
                    </div>
                    {formData.country && countryGradeSystems[formData.country] && (
                      <p className="input-help">
                        Scale: {countryGradeSystems[formData.country].scale}
                      </p>
                    )}
                    
                    {/* Grade Normalization Display */}
                    {gradeNormalization.isValid && (
                      <div className="grade-normalization-card">
                        <div className="normalization-header">
                          <span className="normalization-icon">🌍</span>
                          <h4 className="normalization-title">International Grade Analysis</h4>
                        </div>
                        
                        <div className="normalization-content">
                          <div className="norm-stat">
                            <span className="norm-label">International Equivalent:</span>
                            <span className="norm-value primary">{gradeNormalization.normalized}%</span>
                          </div>
                          
                          <div className="norm-stat">
                            <span className="norm-label">Performance Level:</span>
                            <span className={`norm-value level ${gradeNormalization.international.toLowerCase().replace(' ', '-')}`}>
                              {gradeNormalization.international}
                            </span>
                          </div>
                          
                          <div className="norm-stat">
                            <span className="norm-label">Country Percentile:</span>
                            <span className="norm-value">{gradeNormalization.percentile}th percentile</span>
                          </div>
                        </div>
                        
                        <div className="normalization-progress">
                          <div className="progress-bar-norm">
                            <div 
                              className="progress-fill-norm"
                              style={{ width: `${gradeNormalization.normalized}%` }}
                            ></div>
                          </div>
                          <p className="progress-text-norm">
                            {gradeNormalization.normalized >= 85 ? '🌟 Excellent - Competitive for top programs' :
                             gradeNormalization.normalized >= 75 ? '🎯 Very Good - Strong candidate' :
                             gradeNormalization.normalized >= 65 ? '✅ Good - Solid foundation' :
                             gradeNormalization.normalized >= 55 ? '📈 Fair - Room for improvement' :
                             '💪 Keep working - Consider foundation programs'}
                          </p>
                        </div>
                      </div>
                    )}
                  </div>

                  {/* Simple form continue with basic academic fields */}
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

                <div className="step-actions">
                  <button type="button" onClick={prevStep} className="btn-prev">
                    <span className="btn-arrow">←</span> Previous
                  </button>
                  <button type="button" onClick={nextStep} className="btn-next">
                    Next Step <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 3: Skills & Experience */}
          {step === 3 && (
            <div className="form-step active">
              <div className="step-card">
                <div className="step-header">
                  <div className="step-header-icon">🎯</div>
                  <h2 className="step-title">Skills & Experience</h2>
                  <p className="step-description">Share your skills and experience</p>
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
                        placeholder="e.g., Technology, Business, Healthcare"
                      />
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
                        maxLength="500"
                      />
                    </div>
                  </div>
                </div>

                <div className="step-actions">
                  <button type="button" onClick={prevStep} className="btn-prev">
                    <span className="btn-arrow">←</span> Previous
                  </button>
                  <button type="button" onClick={nextStep} className="btn-next">
                    Next Step <span className="btn-arrow">→</span>
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Step 4: Documents with AI Analysis */}
          {step === 4 && (
            <div className="form-step active">
              <div className="step-card">
                <div className="step-header">
                  <div className="step-header-icon">📄</div>
                  <h2 className="step-title">Document Analysis & Contact</h2>
                  <p className="step-description">Upload documents for AI-powered verification and provide emergency contact</p>
                </div>
                
                <div className="form-grid single-column">
                  {/* ENHANCED: Document Upload with AI Analysis */}
                  <div className="form-group">
                    <div className="section-header">
                      <h3 className="section-title">Supporting Documents</h3>
                      <div className="security-badge">
                        <span className="security-icon">🛡️</span>
                        <span className="security-text">AI-Powered Analysis</span>
                      </div>
                    </div>
                    
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
                        <br />
                        <strong>🔍 Documents will be analyzed for:</strong>
                        <br />• Name verification • Academic data extraction • Fraud detection
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

                    {/* Security Summary */}
                    {documents.length > 0 && (
                      <div className="security-summary">
                        <div className="security-summary-header">
                          <span className="security-summary-icon">📊</span>
                          <h4 className="security-summary-title">Document Analysis Summary</h4>
                        </div>
                        
                        <div className="security-stats">
                          <div className="security-stat">
                            <span className="stat-number">{securitySummary.totalDocuments}</span>
                            <span className="stat-label">Total</span>
                          </div>
                          <div className="security-stat">
                            <span className="stat-number verified">{securitySummary.verifiedDocuments}</span>
                            <span className="stat-label">Verified</span>
                          </div>
                          <div className="security-stat">
                            <span className={`stat-badge ${securitySummary.securityRisk.toLowerCase()}`}>
                              {securitySummary.securityRisk}
                            </span>
                            <span className="stat-label">Risk Level</span>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Enhanced Document List */}
                    {documents.length > 0 && (
                      <div className="document-list enhanced">
                        <h4 className="document-list-title">Uploaded Documents:</h4>
                        {documents.map((doc, index) => (
                          <div key={index} className="document-item enhanced">
                            <div className="document-main">
                              <div className="document-info">
                                <span className="document-icon">📄</span>
                                <div className="document-details">
                                  <span className="document-name">{doc.name}</span>
                                  <span className="document-size">
                                    ({(doc.size / 1024 / 1024).toFixed(2)} MB)
                                  </span>
                                </div>
                              </div>
                              
                              {/* Analysis Progress */}
                              {analysisProgress[index] && (
                                <div className="analysis-status">
                                  {analysisProgress[index].status === 'analyzing' && (
                                    <div className="analysis-analyzing">
                                      <div className="analysis-spinner"></div>
                                      <span>Analyzing...</span>
                                    </div>
                                  )}
                                  
                                  {analysisProgress[index].status === 'completed' && (
                                    <div className="analysis-completed">
                                      <div className="verification-badges">
                                        {analysisProgress[index].verified ? (
                                          <span className="badge verified">✅ Name Verified</span>
                                        ) : (
                                          <span className="badge failed">❌ Name Failed</span>
                                        )}
                                        
                                        <span className={`badge security ${
                                          analysisProgress[index].riskScore <= 20 ? 'low' :
                                          analysisProgress[index].riskScore <= 40 ? 'medium' : 'high'
                                        }`}>
                                          🛡️ {analysisProgress[index].riskScore <= 20 ? 'Low Risk' :
                                              analysisProgress[index].riskScore <= 40 ? 'Medium Risk' : 'High Risk'}
                                        </span>
                                      </div>
                                    </div>
                                  )}
                                  
                                  {analysisProgress[index].status === 'failed' && (
                                    <div className="analysis-failed">
                                      <span className="badge error">❌ Analysis Failed</span>
                                      <span className="error-text">{analysisProgress[index].error}</span>
                                    </div>
                                  )}
                                </div>
                              )}
                              
                              <button
                                type="button"
                                onClick={() => removeDocument(index)}
                                className="document-remove"
                              >
                                Remove
                              </button>
                            </div>
                            
                            {/* Detailed Analysis Results */}
                            {documentAnalysis[index] && documentAnalysis[index].success && (
                              <div className="analysis-details">
                                <div className="analysis-section">
                                  <h5 className="analysis-section-title">📋 Extracted Information</h5>
                                  
                                  {documentAnalysis[index].extractedNames?.length > 0 && (
                                    <div className="analysis-item">
                                      <span className="analysis-label">Names Found:</span>
                                      <span className="analysis-value">
                                        {documentAnalysis[index].extractedNames.join(', ')}
                                      </span>
                                    </div>
                                  )}
                                  
                                  {documentAnalysis[index].academicData?.grades?.length > 0 && (
                                    <div className="analysis-item">
                                      <span className="analysis-label">Academic Data:</span>
                                      <span className="analysis-value">
                                        {documentAnalysis[index].academicData.grades.length} grades found
                                      </span>
                                    </div>
                                  )}
                                  
                                  {documentAnalysis[index].academicData?.institution && (
                                    <div className="analysis-item">
                                      <span className="analysis-label">Institution:</span>
                                      <span className="analysis-value">
                                        {documentAnalysis[index].academicData.institution}
                                      </span>
                                    </div>
                                  )}
                                </div>
                              </div>
                            )}
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
                    </div>
                  </div>
                </div>

                <div className="step-actions">
                  <button type="button" onClick={prevStep} className="btn-prev">
                    <span className="btn-arrow">←</span> Previous
                  </button>
                  
                  {/* ENHANCED: Submit button with security validation */}
                  <button
                    type="submit"
                    disabled={loading || (documents.length > 0 && securitySummary.verifiedDocuments === 0)}
                    className={`btn-submit ${loading ? 'loading' : ''} ${
                      documents.length > 0 && securitySummary.verifiedDocuments === 0 ? 'disabled' : ''
                    }`}
                  >
                    {loading ? (
                      <div className="loading-content">
                        <div className="loading-spinner"></div>
                        Creating Enhanced Profile...
                      </div>
                    ) : (
                      <div className="submit-content">
                        <span className="submit-text">Create Enhanced Profile</span>
                        {documents.length > 0 && (
                          <div className="submit-badges">
                            {securitySummary.verifiedDocuments > 0 && (
                              <span className="submit-badge verified">🛡️ {securitySummary.verifiedDocuments} Verified</span>
                            )}
                            {gradeNormalization.isValid && (
                              <span className="submit-badge normalized">🌍 Grade Normalized</span>
                            )}
                          </div>
                        )}
                      </div>
                    )}
                  </button>
                  
                  {/* Security Warning */}
                  {documents.length > 0 && securitySummary.verifiedDocuments === 0 && (
                    <div className="security-warning">
                      <span className="warning-icon">⚠️</span>
                      <span className="warning-text">
                        Please wait for document verification to complete before submitting
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default StudentProfile;