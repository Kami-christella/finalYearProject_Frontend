// // import React, { useState, useRef } from 'react';
// // import '../components/styles/studentProfile.css'
// // import { Notify } from 'notiflix';

// // const StudentProfile = () => {
// //   const [formData, setFormData] = useState({
// //     nationality: '',
// //     dateOfBirth: '',
// //     age: '',
// //     gender: '',
// //     country: '',
// //     phoneNumber: '',
// //     studentType: 'Undergraduate',
// //     currentAcademicLevel: '',
// //     studentProgram: '',
// //     maritalStatus: '',
// //     yourReligion: '',
// //     sponsorshipDetails: '',
// //     highSchoolGrades: '',
// //     coursesStudiedInSecondary: '',
// //     haveTwoPrincipalPasses: false,
// //     disability: 'None',
// //     haveJob: '',
// //     hobbies: '',
// //     interests: '',
// //     desiredFaculty: '',
// //     desiredDepartment: '',
// //     careerGoals: '',
// //     skills: '',
// //     languagesSpoken: '',
// //     workExperience: '',
// //     extracurricularActivities: '',
// //     emergencyContact: {
// //       name: '',
// //       relationship: '',
// //       phoneNumber: '',
// //       email: ''
// //     }
// //   });
  
// //   const [profileImage, setProfileImage] = useState(null);
// //   const [documents, setDocuments] = useState([]);
// //   const [loading, setLoading] = useState(false);
// //   const [error, setError] = useState('');
// //   const [success, setSuccess] = useState('');
// //   const [step, setStep] = useState(1);
  
// //   const fileInputRef = useRef(null);
// //   const cameraInputRef = useRef(null);
// //   const documentInputRef = useRef(null);

// //   // Handle form input changes
// //   const handleChange = (e) => {
// //     const { name, value, type, checked } = e.target;
    
// //     if (name.includes('.')) {
// //       // Handle nested objects like emergencyContact
// //       const [parent, child] = name.split('.');
// //       setFormData(prev => ({
// //         ...prev,
// //         [parent]: {
// //           ...prev[parent],
// //           [child]: value
// //         }
// //       }));
// //     } else {
// //       setFormData(prev => ({
// //         ...prev,
// //         [name]: type === 'checkbox' ? checked : value
// //       }));
// //     }
// //   };

// //   // Handle profile image upload
// //   const handleImageUpload = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       // Validate file type
// //       if (!file.type.startsWith('image/')) {
// //         setError('Please select a valid image file');
// //         return;
// //       }
      
// //       // Validate file size (5MB max)
// //       if (file.size > 5 * 1024 * 1024) {
// //         setError('Image size must be less than 5MB');
// //         return;
// //       }
      
// //       setProfileImage(file);
// //       setError('');
// //     }
// //   };

// //   // Handle camera capture
// //   const handleCameraCapture = (e) => {
// //     const file = e.target.files[0];
// //     if (file) {
// //       setProfileImage(file);
// //     }
// //   };

// //   // Handle document upload
// //   const handleDocumentUpload = (e) => {
// //     const files = Array.from(e.target.files);
    
// //     // Validate total files
// //     if (documents.length + files.length > 5) {
// //       setError('Maximum 5 documents allowed');
// //       return;
// //     }
    
// //     // Validate each file
// //     const validFiles = files.filter(file => {
// //       // Check file size (5MB max)
// //       if (file.size > 5 * 1024 * 1024) {
// //         setError(`${file.name} is too large. Maximum 5MB per file.`);
// //         return false;
// //       }
      
// //       // Check file type
// //       const allowedTypes = ['application/pdf', 'image/jpeg', 'image/jpg', 'image/png', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
// //       if (!allowedTypes.includes(file.type)) {
// //         setError(`${file.name} is not a supported file type.`);
// //         return false;
// //       }
      
// //       return true;
// //     });
    
// //     setDocuments(prev => [...prev, ...validFiles]);
// //     setError('');
// //   };

// //   // Remove document
// //   const removeDocument = (index) => {
// //     setDocuments(prev => prev.filter((_, i) => i !== index));
// //   };

// //   // Handle form submission
// //   const handleSubmit = async (e) => {
// //     e.preventDefault();
// //     setLoading(true);
// //     setError('');
// //     setSuccess('');

// //     try {
// //       // Note: In a real application, you would get the token from your auth system
      
// //       const token = localStorage.getItem('token')
     
// //       if (!token) {
// //         setError('Please log in to continue');
// //         return;
// //       }

// //       // Create FormData for file uploads
// //       const formDataToSend = new FormData();
      
// //       // Add all form fields
// //       Object.keys(formData).forEach(key => {
// //         if (key === 'emergencyContact') {
// //           formDataToSend.append(key, JSON.stringify(formData[key]));
// //         } else if (key === 'skills' || key === 'languagesSpoken' || key === 'workExperience' || key === 'extracurricularActivities') {
// //           // Convert comma-separated strings to JSON arrays
// //           const items = formData[key].split(',').map(item => item.trim()).filter(item => item);
// //           if (key === 'skills') {
// //             const skillsArray = items.map(skill => ({
// //               skillName: skill,
// //               proficiencyLevel: 'Intermediate'
// //             }));
// //             formDataToSend.append(key, JSON.stringify(skillsArray));
// //           } else if (key === 'languagesSpoken') {
// //             const langArray = items.map(lang => ({
// //               language: lang,
// //               proficiency: 'Conversational'
// //             }));
// //             formDataToSend.append(key, JSON.stringify(langArray));
// //           } else {
// //             formDataToSend.append(key, JSON.stringify(items));
// //           }
// //         } else if (key === 'interests') {
// //           const interestsArray = formData[key].split(',').map(item => item.trim()).filter(item => item);
// //           formDataToSend.append(key, JSON.stringify(interestsArray));
// //         } else if (key === 'coursesStudiedInSecondary') {
// //           formDataToSend.append(key, formData[key]);
// //         } else {
// //           formDataToSend.append(key, formData[key]);
// //         }
// //       });
      
// //       // Add profile image
// //       if (profileImage) {
// //         formDataToSend.append('images', profileImage);
// //       }
      
// //       // Add documents
// //       documents.forEach(doc => {
// //         formDataToSend.append('documents', doc);
// //       });

// //       const response = await fetch('http://localhost:5000/api/student/createprofile', {
// //         method: 'POST',
// //         headers: {
// //           'Authorization': `Bearer ${token}`
// //         },
// //         body: formDataToSend
// //       });

// //       const data = await response.json();

// //       if (response.ok) {
// //         setSuccess('Profile created successfully! You can now take the assessment.');
// //         Notify.success('Profile created succesffully')
// //          // Store profile completion status
// //         localStorage.setItem('profileCompleted', 'true');
// //         if (data.profile?._id) {
// //           localStorage.setItem('profileId', data.profile._id);
// //         // In a real application, you would store these values properly
// //         console.log('Profile created:', data);
        
// //         setTimeout(() => {
// //           // In a real application, you would handle navigation
// //           window.location.href = '/assessment'
// //           console.log('Redirecting to assessment page...');
// //         }, 2000);
// //       } else {
// //         setError(data.message || 'Failed to create profile');
// //         Notify.failure('Failed to create profile')
// //       }
// //     } catch (err) {
// //       setError('Network error. Please try again.');
// //        Notify.failure('Network error. Please try again.')
// //     } finally {
// //       setLoading(false);
// //     }
// //   };

// //   // Faculty options
// //   const facultyOptions = [
// //     'Faculty of Business Administration',
// //     'Faculty of Information Technology', 
// //     'Faculty of Health Sciences',
// //     'Faculty of Medicine',
// //     'Faculty in Education',
// //     'Bachelor Of Theology'
// //   ];

// //   // Department options based on faculty
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
// //       'Faculty of Medicine': [
// //         'MD Of General Medicine'
// //       ],
// //       'Faculty in Education': [
// //         'BA in Accounting and Information Technology', 'BA in English Language and Literature and French',
// //         'BA In Geography and History', 'Master of Art in Educational Administration', 'Master of Art In Curriculum, Instructions and Supervision'
// //       ],
// //       'Bachelor Of Theology': [
// //         'Bachelor of Theology'
// //       ]
// //     };
// //     return departments[faculty] || [];
// //   };

// //   const nextStep = () => {
// //     setStep(step + 1);
// //   };

// //   const prevStep = () => {
// //     setStep(step - 1);
// //   };

// //   const getStepIcon = (stepNumber) => {
// //     const icons = {
// //       1: '👤',
// //       2: '🎓',
// //       3: '🎯',
// //       4: '📄'
// //     };
// //     return icons[stepNumber];
// //   };

// //   const getStepTitle = (stepNumber) => {
// //     const titles = {
// //       1: 'Personal Information',
// //       2: 'Academic Information', 
// //       3: 'Interests & Goals',
// //       4: 'Documents & Contact'
// //     };
// //     return titles[stepNumber];
// //   };

// //   return (
// //     <div className="profile-container">
// //       {/* Animated Background */}
// //       <div className="profile-bg">
// //         <div className="profile-bg-overlay"></div>
// //         <div className="floating-shapes">
// //           <div className="shape shape-1"></div>
// //           <div className="shape shape-2"></div>
// //           <div className="shape shape-3"></div>
// //           <div className="shape shape-4"></div>
// //         </div>
// //       </div>

// //       <div className="profile-content">
// //         {/* Header */}
// //         <div className="profile-header">
// //           <div className="header-content">
// //             <div className="header-icon">🌟</div>
// //             <h1 className="profile-title">Create Your Student Profile</h1>
// //             <p className="profile-subtitle">Complete your profile to access personalized career guidance</p>
// //           </div>
          
// //           {/* Progress Bar */}
// //           <div className="progress-section">
// //             <div className="progress-info">
// //               <span className="progress-text">Step {step} of 4</span>
// //               <span className="progress-percentage">{Math.round((step / 4) * 100)}%</span>
// //             </div>
// //             <div className="progress-bar">
// //               <div 
// //                 className="progress-fill"
// //                 style={{ width: `${(step / 4) * 100}%` }}
// //               ></div>
// //             </div>
// //             <div className="step-indicators">
// //               {[1, 2, 3, 4].map((stepNum) => (
// //                 <div 
// //                   key={stepNum}
// //                   className={`step-indicator ${stepNum <= step ? 'active' : ''} ${stepNum === step ? 'current' : ''}`}
// //                 >
// //                   <div className="step-icon">{getStepIcon(stepNum)}</div>
// //                   <span className="step-label">{getStepTitle(stepNum)}</span>
// //                 </div>
// //               ))}
// //             </div>
// //           </div>
// //         </div>

// //         {/* Error/Success Messages */}
// //         {error && (
// //           <div className="message-alert error-alert">
// //             <span className="alert-icon">⚠️</span>
// //             <span className="alert-text">{error}</span>
// //             <button 
// //               className="alert-close"
// //               onClick={() => setError('')}
// //             >
// //               ✕
// //             </button>
// //           </div>
// //         )}
        
// //         {success && (
// //           <div className="message-alert success-alert">
// //             <span className="alert-icon">✅</span>
// //             <span className="alert-text">{success}</span>
// //             <button 
// //               className="alert-close"
// //               onClick={() => setSuccess('')}
// //             >
// //               ✕
// //             </button>
// //           </div>
// //         )}

// //         <form onSubmit={handleSubmit} className="profile-form">
          
// //           {/* Step 1: Personal Information */}
// //           {step === 1 && (
// //             <div className="form-step active">
// //               <div className="step-card">
// //                 <div className="step-header">
// //                   <div className="step-header-icon">👤</div>
// //                   <h2 className="step-title">Personal Information</h2>
// //                   <p className="step-description">Tell us about yourself</p>
// //                 </div>
                
// //                 <div className="form-grid">
// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Nationality</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">🌍</span>
// //                       <input
// //                         type="text"
// //                         name="nationality"
// //                         value={formData.nationality}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                         placeholder="e.g., Rwanda"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Date of Birth</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">📅</span>
// //                       <input
// //                         type="date"
// //                         name="dateOfBirth"
// //                         value={formData.dateOfBirth}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Age</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">🎂</span>
// //                       <input
// //                         type="number"
// //                         name="age"
// //                         value={formData.age}
// //                         onChange={handleChange}
// //                         required
// //                         min="16"
// //                         max="100"
// //                         className="form-input"
// //                         placeholder="e.g., 19"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Gender</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">⚧️</span>
// //                       <select
// //                         name="gender"
// //                         value={formData.gender}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                       >
// //                         <option value="">Select Gender</option>
// //                         <option value="Male">Male</option>
// //                         <option value="Female">Female</option>
// //                       </select>
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Country</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">🏳️</span>
// //                       <input
// //                         type="text"
// //                         name="country"
// //                         value={formData.country}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                         placeholder="e.g., Rwanda"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Phone Number</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">📱</span>
// //                       <input
// //                         type="tel"
// //                         name="phoneNumber"
// //                         value={formData.phoneNumber}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                         placeholder="e.g., +250788123456"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Marital Status</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">💑</span>
// //                       <select
// //                         name="maritalStatus"
// //                         value={formData.maritalStatus}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                       >
// //                         <option value="">Select Status</option>
// //                         <option value="Single">Single</option>
// //                         <option value="Married">Married</option>
// //                         <option value="Divorced">Divorced</option>
// //                         <option value="Widowed">Widowed</option>
// //                         <option value="Prefer not to say">Prefer not to say</option>
// //                       </select>
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Religion</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">🙏</span>
// //                       <select
// //                         name="yourReligion"
// //                         value={formData.yourReligion}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                       >
// //                         <option value="">Select Religion</option>
// //                         <option value="Adventist">Adventist</option>
// //                         <option value="Protestant">Protestant</option>
// //                         <option value="Catholic">Catholic</option>
// //                         <option value="Islam">Islam</option>
// //                         <option value="Other">Other</option>
// //                         <option value="None">None</option>
// //                       </select>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="step-actions">
// //                   <button
// //                     type="button"
// //                     onClick={nextStep}
// //                     className="btn-next"
// //                   >
// //                     Next Step
// //                     <span className="btn-arrow">→</span>
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Step 2: Academic Information */}
// //           {step === 2 && (
// //             <div className="form-step active">
// //               <div className="step-card">
// //                 <div className="step-header">
// //                   <div className="step-header-icon">🎓</div>
// //                   <h2 className="step-title">Academic Information</h2>
// //                   <p className="step-description">Tell us about your educational background</p>
// //                 </div>
                
// //                 <div className="form-grid">
// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Current Academic Level</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">📚</span>
// //                       <select
// //                         name="currentAcademicLevel"
// //                         value={formData.currentAcademicLevel}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                       >
// //                         <option value="">Select Level</option>
// //                         <option value="O-Level">O-Level</option>
// //                         <option value="A-Level">A-Level</option>
// //                         <option value="Bachelor's Degree">Bachelor's Degree</option>
// //                         <option value="Master's Degree">Master's Degree</option>
// //                         <option value="PhD">PhD</option>
// //                         <option value="Other">Other</option>
// //                       </select>
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Student Program</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">🕐</span>
// //                       <select
// //                         name="studentProgram"
// //                         value={formData.studentProgram}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                       >
// //                         <option value="">Select Program</option>
// //                         <option value="Day Program">Day Program</option>
// //                         <option value="Evening Program">Evening Program</option>
// //                       </select>
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">High School Grades</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">📈</span>
// //                       <input
// //                         type="number"
// //                         name="highSchoolGrades"
// //                         value={formData.highSchoolGrades}
// //                         onChange={handleChange}
// //                         required
// //                         min="0"
// //                         max="100"
// //                         className="form-input"
// //                         placeholder="e.g., 75"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Sponsorship Details</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">💰</span>
// //                       <select
// //                         name="sponsorshipDetails"
// //                         value={formData.sponsorshipDetails}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                       >
// //                         <option value="">Select Sponsorship</option>
// //                         <option value="Self">Self</option>
// //                         <option value="Parents">Parents</option>
// //                         <option value="Government">Government</option>
// //                         <option value="Organization">Organization</option>
// //                         <option value="Scholarship">Scholarship</option>
// //                         <option value="Other">Other</option>
// //                       </select>
// //                     </div>
// //                   </div>

// //                   <div className="form-group full-width">
// //                     <label className="form-label">
// //                       <span className="label-text">Courses Studied in Secondary</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">📖</span>
// //                       <input
// //                         type="text"
// //                         name="coursesStudiedInSecondary"
// //                         value={formData.coursesStudiedInSecondary}
// //                         onChange={handleChange}
// //                         className="form-input"
// //                         placeholder="e.g., Mathematics, Physics, Chemistry"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Have Job</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">💼</span>
// //                       <select
// //                         name="haveJob"
// //                         value={formData.haveJob}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                       >
// //                         <option value="">Select Option</option>
// //                         <option value="Yes">Yes</option>
// //                         <option value="No">No</option>
// //                         <option value="Part-time">Part-time</option>
// //                         <option value="Internship">Internship</option>
// //                         <option value="Volunteer">Volunteer</option>
// //                       </select>
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <div className="checkbox-group">
// //                       <label className="custom-checkbox">
// //                         <input
// //                           type="checkbox"
// //                           name="haveTwoPrincipalPasses"
// //                           checked={formData.haveTwoPrincipalPasses}
// //                           onChange={handleChange}
// //                         />
// //                         <span className="checkbox-mark"></span>
// //                         <span className="checkbox-label">I have two principal passes</span>
// //                       </label>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="step-actions">
// //                   <button
// //                     type="button"
// //                     onClick={prevStep}
// //                     className="btn-prev"
// //                   >
// //                     <span className="btn-arrow">←</span>
// //                     Previous
// //                   </button>
// //                   <button
// //                     type="button"
// //                     onClick={nextStep}
// //                     className="btn-next"
// //                   >
// //                     Next Step
// //                     <span className="btn-arrow">→</span>
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Step 3: Interests & Goals */}
// //           {step === 3 && (
// //             <div className="form-step active">
// //               <div className="step-card">
// //                 <div className="step-header">
// //                   <div className="step-header-icon">🎯</div>
// //                   <h2 className="step-title">Interests & Career Goals</h2>
// //                   <p className="step-description">Share your passions and aspirations</p>
// //                 </div>
                
// //                 <div className="form-grid single-column">
// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Hobbies</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">🎨</span>
// //                       <input
// //                         type="text"
// //                         name="hobbies"
// //                         value={formData.hobbies}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                         placeholder="e.g., Reading, Sports, Music"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Interests</span>
// //                       <span className="label-required">*</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">💡</span>
// //                       <input
// //                         type="text"
// //                         name="interests"
// //                         value={formData.interests}
// //                         onChange={handleChange}
// //                         required
// //                         className="form-input"
// //                         placeholder="e.g., Technology, Business, Healthcare (comma-separated)"
// //                       />
// //                     </div>
// //                     <p className="input-help">Separate multiple interests with commas</p>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Skills</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">⚡</span>
// //                       <input
// //                         type="text"
// //                         name="skills"
// //                         value={formData.skills}
// //                         onChange={handleChange}
// //                         className="form-input"
// //                         placeholder="e.g., Programming, Leadership, Communication (comma-separated)"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Languages Spoken</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">🗣️</span>
// //                       <input
// //                         type="text"
// //                         name="languagesSpoken"
// //                         value={formData.languagesSpoken}
// //                         onChange={handleChange}
// //                         className="form-input"
// //                         placeholder="e.g., English, French, Kinyarwanda (comma-separated)"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Work Experience</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">💼</span>
// //                       <input
// //                         type="text"
// //                         name="workExperience"
// //                         value={formData.workExperience}
// //                         onChange={handleChange}
// //                         className="form-input"
// //                         placeholder="e.g., Internship at XYZ Company, Volunteer at ABC NGO (comma-separated)"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Extracurricular Activities</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">🏆</span>
// //                       <input
// //                         type="text"
// //                         name="extracurricularActivities"
// //                         value={formData.extracurricularActivities}
// //                         onChange={handleChange}
// //                         className="form-input"
// //                         placeholder="e.g., Student Council, Sports Team, Drama Club (comma-separated)"
// //                       />
// //                     </div>
// //                   </div>

// //                   <div className="form-grid">
// //                     <div className="form-group">
// //                       <label className="form-label">
// //                         <span className="label-text">Desired Faculty</span>
// //                       </label>
// //                       <div className="input-wrapper">
// //                         <span className="input-icon">🏫</span>
// //                         <select
// //                           name="desiredFaculty"
// //                           value={formData.desiredFaculty}
// //                           onChange={handleChange}
// //                           className="form-input"
// //                         >
// //                           <option value="">Select Faculty</option>
// //                           {facultyOptions.map(faculty => (
// //                             <option key={faculty} value={faculty}>{faculty}</option>
// //                           ))}
// //                         </select>
// //                       </div>
// //                     </div>

// //                     <div className="form-group">
// //                       <label className="form-label">
// //                         <span className="label-text">Desired Department</span>
// //                       </label>
// //                       <div className="input-wrapper">
// //                         <span className="input-icon">🎯</span>
// //                         <select
// //                           name="desiredDepartment"
// //                           value={formData.desiredDepartment}
// //                           onChange={handleChange}
// //                           className="form-input"
// //                           disabled={!formData.desiredFaculty}
// //                         >
// //                           <option value="">Select Department</option>
// //                           {getDepartmentOptions(formData.desiredFaculty).map(dept => (
// //                             <option key={dept} value={dept}>{dept}</option>
// //                           ))}
// //                         </select>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   <div className="form-group">
// //                     <label className="form-label">
// //                       <span className="label-text">Career Goals</span>
// //                     </label>
// //                     <div className="input-wrapper">
// //                       <span className="input-icon">🚀</span>
// //                       <textarea
// //                         name="careerGoals"
// //                         value={formData.careerGoals}
// //                         onChange={handleChange}
// //                         rows="4"
// //                         className="form-input"
// //                         placeholder="Describe your career aspirations and goals..."
// //                       />
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="step-actions">
// //                   <button
// //                     type="button"
// //                     onClick={prevStep}
// //                     className="btn-prev"
// //                   >
// //                     <span className="btn-arrow">←</span>
// //                     Previous
// //                   </button>
// //                   <button
// //                     type="button"
// //                     onClick={nextStep}
// //                     className="btn-next"
// //                   >
// //                     Next Step
// //                     <span className="btn-arrow">→</span>
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}

// //           {/* Step 4: Documents & Emergency Contact */}
// //           {step === 4 && (
// //             <div className="form-step active">
// //               <div className="step-card">
// //                 <div className="step-header">
// //                   <div className="step-header-icon">📄</div>
// //                   <h2 className="step-title">Documents & Emergency Contact</h2>
// //                   <p className="step-description">Upload documents and provide emergency contact</p>
// //                 </div>
                
// //                 <div className="form-grid single-column">
// //                   {/* Profile Image Upload */}
// //                   <div className="form-group">
// //                     <h3 className="section-title">Profile Image</h3>
// //                     <div className={`upload-area ${profileImage ? 'has-file' : ''}`}>
// //                       {profileImage ? (
// //                         <div className="image-preview">
// //                           <img 
// //                             src={URL.createObjectURL(profileImage)} 
// //                             alt="Profile preview" 
// //                             className="preview-image"
// //                           />
// //                           <p className="image-name">{profileImage.name}</p>
// //                           <button
// //                             type="button"
// //                             onClick={() => setProfileImage(null)}
// //                             className="remove-btn"
// //                           >
// //                             Remove Image
// //                           </button>
// //                         </div>
// //                       ) : (
// //                         <div>
// //                           <div className="upload-icon">📷</div>
// //                           <div className="upload-buttons">
// //                             <button
// //                               type="button"
// //                               onClick={() => fileInputRef.current?.click()}
// //                               className="upload-btn primary"
// //                             >
// //                               Upload Image
// //                             </button>
// //                             <button
// //                               type="button"
// //                               onClick={() => cameraInputRef.current?.click()}
// //                               className="upload-btn secondary"
// //                             >
// //                               Take Photo
// //                             </button>
// //                           </div>
// //                           <p className="upload-info">JPG, PNG up to 5MB</p>
// //                         </div>
// //                       )}
                      
// //                       <input
// //                         ref={fileInputRef}
// //                         type="file"
// //                         accept="image/*"
// //                         onChange={handleImageUpload}
// //                         style={{ display: 'none' }}
// //                       />
// //                       <input
// //                         ref={cameraInputRef}
// //                         type="file"
// //                         accept="image/*"
// //                         capture="environment"
// //                         onChange={handleCameraCapture}
// //                         style={{ display: 'none' }}
// //                       />
// //                     </div>
// //                   </div>

// //                   {/* Document Upload */}
// //                   <div className="form-group">
// //                     <h3 className="section-title">Supporting Documents</h3>
// //                     <div className="upload-area">
// //                       <div className="upload-icon">📄</div>
// //                       <button
// //                         type="button"
// //                         onClick={() => documentInputRef.current?.click()}
// //                         className="upload-btn primary"
// //                       >
// //                         Upload Documents
// //                       </button>
// //                       <p className="upload-info">
// //                         PDF, DOC, DOCX, JPG, PNG up to 5MB each (Maximum 5 files)
// //                       </p>
// //                       <input
// //                         ref={documentInputRef}
// //                         type="file"
// //                         multiple
// //                         accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
// //                         onChange={handleDocumentUpload}
// //                         style={{ display: 'none' }}
// //                       />
// //                     </div>

// //                     {/* Display uploaded documents */}
// //                     {documents.length > 0 && (
// //                       <div className="document-list">
// //                         <h4 className="document-list-title">Uploaded Documents:</h4>
// //                         {documents.map((doc, index) => (
// //                           <div key={index} className="document-item">
// //                             <div className="document-info">
// //                               <span className="document-icon">📄</span>
// //                               <span className="document-name">{doc.name}</span>
// //                               <span className="document-size">
// //                                 ({(doc.size / 1024 / 1024).toFixed(2)} MB)
// //                               </span>
// //                             </div>
// //                             <button
// //                               type="button"
// //                               onClick={() => removeDocument(index)}
// //                               className="document-remove"
// //                             >
// //                               Remove
// //                             </button>
// //                           </div>
// //                         ))}
// //                       </div>
// //                     )}
// //                   </div>

// //                   {/* Emergency Contact */}
// //                   <div className="form-group">
// //                     <h3 className="section-title">Emergency Contact Information</h3>
// //                     <div className="form-grid">
// //                       <div className="form-group">
// //                         <label className="form-label">
// //                           <span className="label-text">Contact Name</span>
// //                           <span className="label-required">*</span>
// //                         </label>
// //                         <div className="input-wrapper">
// //                           <span className="input-icon">👤</span>
// //                           <input
// //                             type="text"
// //                             name="emergencyContact.name"
// //                             value={formData.emergencyContact.name}
// //                             onChange={handleChange}
// //                             required
// //                             className="form-input"
// //                             placeholder="Full name of emergency contact"
// //                           />
// //                         </div>
// //                       </div>

// //                       <div className="form-group">
// //                         <label className="form-label">
// //                           <span className="label-text">Relationship</span>
// //                           <span className="label-required">*</span>
// //                         </label>
// //                         <div className="input-wrapper">
// //                           <span className="input-icon">👥</span>
// //                           <select
// //                             name="emergencyContact.relationship"
// //                             value={formData.emergencyContact.relationship}
// //                             onChange={handleChange}
// //                             required
// //                             className="form-input"
// //                           >
// //                             <option value="">Select Relationship</option>
// //                             <option value="Parent">Parent</option>
// //                             <option value="Guardian">Guardian</option>
// //                             <option value="Sibling">Sibling</option>
// //                             <option value="Spouse">Spouse</option>
// //                             <option value="Relative">Relative</option>
// //                             <option value="Friend">Friend</option>
// //                             <option value="Other">Other</option>
// //                           </select>
// //                         </div>
// //                       </div>

// //                       <div className="form-group">
// //                         <label className="form-label">
// //                           <span className="label-text">Phone Number</span>
// //                           <span className="label-required">*</span>
// //                         </label>
// //                         <div className="input-wrapper">
// //                           <span className="input-icon">📱</span>
// //                           <input
// //                             type="tel"
// //                             name="emergencyContact.phoneNumber"
// //                             value={formData.emergencyContact.phoneNumber}
// //                             onChange={handleChange}
// //                             required
// //                             className="form-input"
// //                             placeholder="e.g., +250788123456"
// //                           />
// //                         </div>
// //                       </div>

// //                       <div className="form-group">
// //                         <label className="form-label">
// //                           <span className="label-text">Email Address</span>
// //                         </label>
// //                         <div className="input-wrapper">
// //                           <span className="input-icon">📧</span>
// //                           <input
// //                             type="email"
// //                             name="emergencyContact.email"
// //                             value={formData.emergencyContact.email}
// //                             onChange={handleChange}
// //                             className="form-input"
// //                             placeholder="emergency.contact@email.com"
// //                           />
// //                         </div>
// //                       </div>
// //                     </div>
// //                   </div>

// //                   {/* Additional Information */}
// //                   <div className="form-group">
// //                     <h3 className="section-title">Additional Information</h3>
// //                     <div className="form-group">
// //                       <label className="form-label">
// //                         <span className="label-text">Disability Status</span>
// //                       </label>
// //                       <div className="input-wrapper">
// //                         <span className="input-icon">♿</span>
// //                         <select
// //                           name="disability"
// //                           value={formData.disability}
// //                           onChange={handleChange}
// //                           className="form-input"
// //                         >
// //                           <option value="None">None</option>
// //                           <option value="Visual Impairment">Visual Impairment</option>
// //                           <option value="Hearing Impairment">Hearing Impairment</option>
// //                           <option value="Physical Disability">Physical Disability</option>
// //                           <option value="Learning Disability">Learning Disability</option>
// //                           <option value="Other">Other</option>
// //                           <option value="Prefer not to say">Prefer not to say</option>
// //                         </select>
// //                       </div>
// //                     </div>
// //                   </div>
// //                 </div>

// //                 <div className="step-actions">
// //                   <button
// //                     type="button"
// //                     onClick={prevStep}
// //                     className="btn-prev"
// //                   >
// //                     <span className="btn-arrow">←</span>
// //                     Previous
// //                   </button>
// //                   <button
// //                     type="submit"
// //                     disabled={loading}
// //                     className={`btn-submit ${loading ? 'loading' : ''}`}
// //                   >
// //                     {loading ? (
// //                       <div className="loading-content">
// //                         <div className="loading-spinner"></div>
// //                         Creating Profile...
// //                       </div>
// //                     ) : (
// //                       'Create Profile'
// //                     )}
// //                   </button>
// //                 </div>
// //               </div>
// //             </div>
// //           )}
// //         </form>

// //         {/* Profile Progress Summary */}
// //         {step > 1 && (
// //           <div className="progress-summary">
// //             <h3 className="summary-title">Profile Progress</h3>
// //             <div className="summary-items">
// //               <div className={`summary-item ${formData.nationality && formData.age ? 'completed' : 'incomplete'}`}>
// //                 <span className="summary-icon">👤</span>
// //                 <span className="summary-text">Personal Information</span>
// //                 <span className="summary-status">{formData.nationality && formData.age ? '✓' : '○'}</span>
// //               </div>
// //               {step > 2 && (
// //                 <div className={`summary-item ${formData.currentAcademicLevel && formData.studentProgram ? 'completed' : 'incomplete'}`}>
// //                   <span className="summary-icon">🎓</span>
// //                   <span className="summary-text">Academic Information</span>
// //                   <span className="summary-status">{formData.currentAcademicLevel && formData.studentProgram ? '✓' : '○'}</span>
// //                 </div>
// //               )}
// //               {step > 3 && (
// //                 <div className={`summary-item ${formData.hobbies && formData.interests ? 'completed' : 'incomplete'}`}>
// //                   <span className="summary-icon">🎯</span>
// //                   <span className="summary-text">Interests & Goals</span>
// //                   <span className="summary-status">{formData.hobbies && formData.interests ? '✓' : '○'}</span>
// //                 </div>
// //               )}
// //               {step === 4 && (
// //                 <div className={`summary-item ${formData.emergencyContact.name ? 'in-progress' : 'pending'}`}>
// //                   <span className="summary-icon">📄</span>
// //                   <span className="summary-text">Documents & Contact</span>
// //                   <span className="summary-status">{formData.emergencyContact.name ? '◐' : '○'}</span>
// //                 </div>
// //               )}
// //             </div>
// //           </div>
// //         )}
// //       </div>
// //     </div>
// //   );
// // };

// // export default StudentProfile;


// import React, { useState, useRef, useEffect } from 'react';
// import '../components/styles/studentProfile.css'

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
//     disability: 'None',
//     haveJob: '',
//     hobbies: '',
//     interests: '',
//     desiredFaculty: '',
//     desiredDepartment: '',
//     careerGoals: '',
//     skills: '',
//     languagesSpoken: '',
//     workExperience: '',
//     extracurricularActivities: '',
//     emergencyContact: {
//       name: '',
//       relationship: '',
//       phoneNumber: '',
//       email: ''
//     }
//   });
  
//   const [profileImage, setProfileImage] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [step, setStep] = useState(1);
  
//   // User dropdown state
//   const [isDropdownOpen, setIsDropdownOpen] = useState(false);
//   const [currentUser, setCurrentUser] = useState({
//     name: 'Guest User',
//     email: 'guest@example.com',
//     role: 'Student'
//   });
  
//   const fileInputRef = useRef(null);
//   const cameraInputRef = useRef(null);
//   const documentInputRef = useRef(null);
//   const dropdownRef = useRef(null);

//   // Get current user data on component mount with better error handling
//   useEffect(() => {
//     try {
//       // First, let's check what's in localStorage
//       console.log('=== DEBUG: Checking localStorage ===');
//       console.log('All localStorage keys:', Object.keys(localStorage));
      
//       const token = localStorage.getItem('token');
//       const userData = localStorage.getItem('user');
      
//       console.log('Raw token:', token);
//       console.log('Raw user data:', userData);
      
//       if (userData) {
//         try {
//           const parsedUser = JSON.parse(userData);
//           console.log('Parsed user data:', parsedUser);
          
//           // Set user data with fallbacks
//           setCurrentUser({
//             name: parsedUser.name || parsedUser.fullName || parsedUser.username || 'User',
//             email: parsedUser.email || parsedUser.emailAddress || 'user@example.com',
//             role: parsedUser.role || parsedUser.userRole || parsedUser.type || 'Student',
//             id: parsedUser.id || parsedUser._id || parsedUser.userId || 'unknown'
//           });
          
//           console.log('User data set successfully');
//         } catch (parseError) {
//           console.error('Error parsing user data:', parseError);
//           setCurrentUser({
//             name: 'User',
//             email: 'user@example.com',
//             role: 'Student'
//           });
//         }
//       } else {
//         console.log('No user data found in localStorage');
//         // Check if there's any other way user data might be stored
//         const allKeys = Object.keys(localStorage);
//         console.log('Available localStorage keys:', allKeys);
        
//         // Try to find user data in different possible keys
//         const possibleUserKeys = ['currentUser', 'loggedInUser', 'authUser', 'userInfo'];
//         let foundUserData = null;
        
//         for (const key of possibleUserKeys) {
//           const data = localStorage.getItem(key);
//           if (data) {
//             console.log(`Found data in key "${key}":`, data);
//             try {
//               foundUserData = JSON.parse(data);
//               break;
//             } catch (e) {
//               console.log(`Failed to parse data from key "${key}"`);
//             }
//           }
//         }
        
//         if (foundUserData) {
//           setCurrentUser({
//             name: foundUserData.name || foundUserData.fullName || 'User',
//             email: foundUserData.email || foundUserData.emailAddress || 'user@example.com',
//             role: foundUserData.role || foundUserData.userRole || 'Student'
//           });
//         }
//       }
      
//       // If no token, might want to redirect to login
//       if (!token) {
//         console.warn('No authentication token found');
//         // Uncomment the line below if you want to redirect users without tokens
//         // window.location.href = '/login';
//       }
      
//     } catch (error) {
//       console.error('Error loading user data:', error);
//       setCurrentUser({
//         name: 'User',
//         email: 'user@example.com',
//         role: 'Student'
//       });
//     }
//   }, []);

//   // Handle click outside dropdown to close it
//   useEffect(() => {
//     const handleClickOutside = (event) => {
//       if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
//         setIsDropdownOpen(false);
//       }
//     };

//     document.addEventListener('mousedown', handleClickOutside);
//     return () => {
//       document.removeEventListener('mousedown', handleClickOutside);
//     };
//   }, []);

//   // Handle logout with confirmation
//   const handleLogout = () => {
//     const confirmLogout = window.confirm('Are you sure you want to logout?');
    
//     if (confirmLogout) {
//       try {
//         // Clear all stored data
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         localStorage.removeItem('profileCompleted');
//         localStorage.removeItem('profileId');
        
//         // Clear any other possible user data keys
//         const possibleKeys = ['currentUser', 'loggedInUser', 'authUser', 'userInfo'];
//         possibleKeys.forEach(key => {
//           localStorage.removeItem(key);
//         });
        
//         console.log('User logged out successfully');
        
//         // Redirect to login page
//         window.location.href = '/login';
//       } catch (error) {
//         console.error('Error during logout:', error);
//         // Still redirect even if there's an error
//         window.location.href = '/login';
//       }
//     }
//   };

//   // Get user initials for avatar with better fallback
//   const getUserInitials = (name) => {
//     if (!name || typeof name !== 'string') return 'U';
    
//     const cleanName = name.trim();
//     if (cleanName.length === 0) return 'U';
    
//     const words = cleanName.split(' ').filter(word => word.length > 0);
    
//     if (words.length === 0) return 'U';
//     if (words.length === 1) return words[0].charAt(0).toUpperCase();
    
//     return words[0].charAt(0).toUpperCase() + words[words.length - 1].charAt(0).toUpperCase();
//   };

//   // Toggle dropdown with debugging
//   const toggleDropdown = () => {
//     console.log('Dropdown toggled. Current user:', currentUser);
//     setIsDropdownOpen(!isDropdownOpen);
//   };

//   // Debug function to check current state
//   const debugUserState = () => {
//     console.log('=== DEBUG: Current User State ===');
//     console.log('currentUser:', currentUser);
//     console.log('isDropdownOpen:', isDropdownOpen);
//     console.log('localStorage user:', localStorage.getItem('user'));
//     console.log('localStorage token:', localStorage.getItem('token'));
//   };

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

//   // Handle profile image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       // Validate file type
//       if (!file.type.startsWith('image/')) {
//         setError('Please select a valid image file');
//         return;
//       }
      
//       // Validate file size (5MB max)
//       if (file.size > 5 * 1024 * 1024) {
//         setError('Image size must be less than 5MB');
//         return;
//       }
      
//       setProfileImage(file);
//       setError('');
//     }
//   };

//   // Handle camera capture
//   const handleCameraCapture = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       setProfileImage(file);
//     }
//   };

//   // Handle document upload
//   const handleDocumentUpload = (e) => {
//     const files = Array.from(e.target.files);
    
//     // Validate total files
//     if (documents.length + files.length > 5) {
//       setError('Maximum 5 documents allowed');
//       return;
//     }
    
//     // Validate each file
//     const validFiles = files.filter(file => {
//       // Check file size (5MB max)
//       if (file.size > 5 * 1024 * 1024) {
//         setError(`${file.name} is too large. Maximum 5MB per file.`);
//         return false;
//       }
      
//       // Check file type
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

//   // Remove document
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
//       // Get token from localStorage
//       const token = localStorage.getItem('token');
      
//       if (!token) {
//         setError('Please log in to continue');
//         return;
//       }

//       // Create FormData for file uploads
//       const formDataToSend = new FormData();
      
//       // Add all form fields
//       Object.keys(formData).forEach(key => {
//         if (key === 'emergencyContact') {
//           formDataToSend.append(key, JSON.stringify(formData[key]));
//         } else if (key === 'skills' || key === 'languagesSpoken' || key === 'workExperience' || key === 'extracurricularActivities') {
//           // Convert comma-separated strings to JSON arrays
//           const items = formData[key].split(',').map(item => item.trim()).filter(item => item);
//           if (key === 'skills') {
//             const skillsArray = items.map(skill => ({
//               skillName: skill,
//               proficiencyLevel: 'Intermediate'
//             }));
//             formDataToSend.append(key, JSON.stringify(skillsArray));
//           } else if (key === 'languagesSpoken') {
//             const langArray = items.map(lang => ({
//               language: lang,
//               proficiency: 'Conversational'
//             }));
//             formDataToSend.append(key, JSON.stringify(langArray));
//           } else {
//             formDataToSend.append(key, JSON.stringify(items));
//           }
//         } else if (key === 'interests') {
//           const interestsArray = formData[key].split(',').map(item => item.trim()).filter(item => item);
//           formDataToSend.append(key, JSON.stringify(interestsArray));
//         } else if (key === 'coursesStudiedInSecondary') {
//           formDataToSend.append(key, formData[key]);
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });
      
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
//         setSuccess('Profile created successfully! You can now take the assessment.');
        
//         // Store profile completion status
//         localStorage.setItem('profileCompleted', 'true');
//         if (data.profile?._id) {
//           localStorage.setItem('profileId', data.profile._id);
//         }
        
//         setTimeout(() => {
//           // Redirect to assessment page
//           window.location.href = '/assessment';
//         }, 2000);
//       } else {
//         setError(data.message || 'Failed to create profile');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Faculty options
//   const facultyOptions = [
//     'Faculty of Business Administration',
//     'Faculty of Information Technology', 
//     'Faculty of Health Sciences',
//     'Faculty of Medicine',
//     'Faculty in Education',
//     'Bachelor Of Theology'
//   ];

//   // Department options based on faculty
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

//   const nextStep = () => {
//     setStep(step + 1);
//   };

//   const prevStep = () => {
//     setStep(step - 1);
//   };

//   const getStepIcon = (stepNumber) => {
//     const icons = {
//       1: '👤',
//       2: '🎓',
//       3: '🎯',
//       4: '📄'
//     };
//     return icons[stepNumber];
//   };

//   const getStepTitle = (stepNumber) => {
//     const titles = {
//       1: 'Personal Information',
//       2: 'Academic Information', 
//       3: 'Interests & Goals',
//       4: 'Documents & Contact'
//     };
//     return titles[stepNumber];
//   };

//   return (
//     <div className="profile-container">
//       {/* Animated Background */}
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
//         {/* Header with User Dropdown */}
//         <div className="profile-header">
//           <div className="header-content">
//             <div className="header-top">
//               <div className="header-left">
//                 <div className="header-icon">🌟</div>
//                 <div className="header-text">
//                   <h1 className="profile-title">Create Your Student Profile</h1>
//                   <p className="profile-subtitle">Complete your profile to access personalized career guidance</p>
//                 </div>
//               </div>
              
//               {/* User Profile Dropdown */}
//               <div className="user-dropdown" ref={dropdownRef}>
//                 {/* Debug Button (remove in production) */}
//                 <button 
//                   onClick={debugUserState}
//                   style={{
//                     background: 'rgba(255,255,255,0.1)',
//                     border: '1px solid rgba(255,255,255,0.3)',
//                     color: 'white',
//                     padding: '0.3rem 0.6rem',
//                     borderRadius: '4px',
//                     fontSize: '0.7rem',
//                     cursor: 'pointer',
//                     marginRight: '0.5rem'
//                   }}
//                 >
//                   🔍 Debug
//                 </button>
                
//                 <button 
//                   className="user-profile-btn"
//                   onClick={toggleDropdown}
//                   aria-label="User menu"
//                   aria-expanded={isDropdownOpen}
//                 >
//                   <div className="user-avatar">
//                     {getUserInitials(currentUser?.name)}
//                   </div>
//                   <span className="dropdown-arrow">
//                     {isDropdownOpen ? '▲' : '▼'}
//                   </span>
//                 </button>
                
//                 {isDropdownOpen && (
//                   <div className="dropdown-menu">
//                     <div className="dropdown-header">
//                       <div className="user-avatar-large">
//                         {getUserInitials(currentUser?.name)}
//                       </div>
//                       <div className="user-info">
//                         <h3 className="user-name">
//                           {currentUser?.name || 'User Name'}
//                         </h3>
//                         <p className="user-email">
//                           {currentUser?.email || 'user@example.com'}
//                         </p>
//                         <span className="user-role">
//                           {currentUser?.role || 'Student'}
//                         </span>
//                       </div>
//                     </div>
                    
//                     <div className="dropdown-divider"></div>
                    
//                     <div className="dropdown-actions">
//                       <button className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
//                         <span className="item-icon">👤</span>
//                         View Profile
//                       </button>
//                       <button className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
//                         <span className="item-icon">⚙️</span>
//                         Settings
//                       </button>
//                       <button className="dropdown-item" onClick={() => setIsDropdownOpen(false)}>
//                         <span className="item-icon">❓</span>
//                         Help & Support
//                       </button>
//                     </div>
                    
//                     <div className="dropdown-divider"></div>
                    
//                     <button className="dropdown-item logout-item" onClick={handleLogout}>
//                       <span className="item-icon">🚪</span>
//                       Logout
//                     </button>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
          
//           {/* Progress Bar */}
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
//             <div className="step-indicators">
//               {[1, 2, 3, 4].map((stepNum) => (
//                 <div 
//                   key={stepNum}
//                   className={`step-indicator ${stepNum <= step ? 'active' : ''} ${stepNum === step ? 'current' : ''}`}
//                 >
//                   <div className="step-icon">{getStepIcon(stepNum)}</div>
//                   <span className="step-label">{getStepTitle(stepNum)}</span>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>

//         {/* Error/Success Messages */}
//         {error && (
//           <div className="message-alert error-alert">
//             <span className="alert-icon">⚠️</span>
//             <span className="alert-text">{error}</span>
//             <button 
//               className="alert-close"
//               onClick={() => setError('')}
//             >
//               ✕
//             </button>
//           </div>
//         )}
        
//         {success && (
//           <div className="message-alert success-alert">
//             <span className="alert-icon">✅</span>
//             <span className="alert-text">{success}</span>
//             <button 
//               className="alert-close"
//               onClick={() => setSuccess('')}
//             >
//               ✕
//             </button>
//           </div>
//         )}

//         {/* Rest of your form steps remain the same */}
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
//                         placeholder="e.g., +250788123456"
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
//                   <button
//                     type="button"
//                     onClick={nextStep}
//                     className="btn-next"
//                   >
//                     Next Step
//                     <span className="btn-arrow">→</span>
//                   </button>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Add the remaining steps here - steps 2, 3, and 4 */}
//           {/* For brevity, I'm showing just step 1, but you can add the complete steps from your original code */}
//         </form>

//         {/* Profile Progress Summary */}
//         {step > 1 && (
//           <div className="progress-summary">
//             <h3 className="summary-title">Profile Progress</h3>
//             <div className="summary-items">
//               <div className={`summary-item ${formData.nationality && formData.age ? 'completed' : 'incomplete'}`}>
//                 <span className="summary-icon">👤</span>
//                 <span className="summary-text">Personal Information</span>
//                 <span className="summary-status">{formData.nationality && formData.age ? '✓' : '○'}</span>
//               </div>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default StudentProfile;



//old codes

import React, { useState, useRef } from 'react';
import { Notify } from 'notiflix';

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
    emergencyContact: {
      name: '',
      relationship: '',
      phoneNumber: '',
      email: ''
    }
  });
  
  // FIXED: Separate state for complex arrays
  const [workExperience, setWorkExperience] = useState([]);
  const [extracurricularActivities, setExtracurricularActivities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  
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

  // FIXED: Add work experience functions
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

  // FIXED: Add extracurricular activities functions
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

  // FIXED: Add skills functions
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

  // FIXED: Add language functions
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

  // Handle profile image upload
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

  const handleDocumentUpload = (e) => {
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
    
    setDocuments(prev => [...prev, ...validFiles]);
    setError('');
  };

  const removeDocument = (index) => {
    setDocuments(prev => prev.filter((_, i) => i !== index));
  };

  // FIXED: Handle form submission with proper data formatting
  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   setLoading(true);
  //   setError('');
  //   setSuccess('');

  //   try {
  //     const token = localStorage.getItem('token');
  //     if (!token) {
  //       setError('Please log in to continue');
  //       return;
  //     }

  //     // Create FormData for file uploads
  //     const formDataToSend = new FormData();
      
  //     // Add all basic form fields
  //     Object.keys(formData).forEach(key => {
  //       if (key === 'emergencyContact') {
  //         formDataToSend.append(key, JSON.stringify(formData[key]));
  //       } else if (key === 'interests') {
  //         // Convert comma-separated string to array
  //         const interestsArray = formData[key].split(',').map(item => item.trim()).filter(item => item);
  //         formDataToSend.append(key, JSON.stringify(interestsArray));
  //       } else if (key === 'coursesStudiedInSecondary') {
  //         formDataToSend.append(key, formData[key]);
  //       } else {
  //         formDataToSend.append(key, formData[key]);
  //       }
  //     });
      
  //     // FIXED: Add properly structured complex arrays
  //     formDataToSend.append('skills', JSON.stringify(skills));
  //     formDataToSend.append('languagesSpoken', JSON.stringify(languagesSpoken));
  //     formDataToSend.append('workExperience', JSON.stringify(workExperience));
  //     formDataToSend.append('extracurricularActivities', JSON.stringify(extracurricularActivities));
      
  //     // Add profile image
  //     if (profileImage) {
  //       formDataToSend.append('images', profileImage);
  //     }
      
  //     // Add documents
  //     documents.forEach(doc => {
  //       formDataToSend.append('documents', doc);
  //     });

  //     const response = await fetch('http://localhost:5000/api/student/createprofile', {
  //       method: 'POST',
  //       headers: {
  //         'Authorization': `Bearer ${token}`
  //       },
  //       body: formDataToSend
  //     });

  //     const data = await response.json();

  //     if (response.ok) {
  //       setSuccess('Profile created successfully! You can now take the assessment.');
  //       Notify.success('Profile created successfully');
  //       console.log('Profile created:', data);
        
  //       setTimeout(() => {
  //         console.log('Redirecting to assessment page...');
  //       }, 2000);
  //     } else {
  //       setError(data.message || 'Failed to create profile');
  //       Notify.failure('Failed to create profile');
  //     }
  //   } catch (err) {
  //     setError('Network error. Please try again.');
  //     Notify.failure('Network error. Please try again.');
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  // UPDATED handleSubmit function for StudentProfile.jsx
// Replace your existing handleSubmit function with this one:

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
    
    // Add profile image
    if (profileImage) {
      formDataToSend.append('images', profileImage);
    }
    
    // Add documents
    documents.forEach(doc => {
      formDataToSend.append('documents', doc);
    });

    const response = await fetch('http://localhost:5000/api/student/createprofile', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`
      },
      body: formDataToSend
    });

    const data = await response.json();

    if (response.ok) {
      setSuccess('🎉 Profile created successfully! Redirecting to your dashboard...');
      Notify.success('Profile created successfully! Redirecting to dashboard...');
      console.log('Profile created:', data);
      
      // UPDATED: Redirect to profile dashboard
      setTimeout(() => {
        window.location.href = '/StudentProfile'; 
        // If using React Router: navigate('/dashboard');
      }, 2000);
    } else {
      setError(data.message || 'Failed to create profile');
      Notify.failure('Failed to create profile');
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
            <h1 className="profile-title">Create Your Student Profile</h1>
            <p className="profile-subtitle">Complete your profile to access personalized career guidance</p>
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
                        placeholder="e.g., +250788123456 or 0788123456"
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

          {/* Step 3: Skills & Experience - COMPLETELY RESTRUCTURED */}
          {step === 3 && (
            <div className="form-step active">
              <div className="step-card">
                <div className="step-header">
                  <div className="step-header-icon">🎯</div>
                  <h2 className="step-title">Skills, Experience & Goals</h2>
                  <p className="step-description">Share your skills, experience and aspirations</p>
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

                  {/* FIXED: Skills Section with proper object structure */}
                  <div className="form-group">
                    <div className="section-header">
                      <h3 className="section-title">Skills</h3>
                      <button type="button" onClick={addSkill} className="add-btn">
                        + Add Skill
                      </button>
                    </div>
                    
                    {skills.map((skill, index) => (
                      <div key={index} className="dynamic-item">
                        <div className="dynamic-item-content">
                          <div className="form-row">
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Skill name (e.g., Programming)"
                                value={skill.skillName}
                                onChange={(e) => updateSkill(index, 'skillName', e.target.value)}
                                className="form-input"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <select
                                value={skill.proficiencyLevel}
                                onChange={(e) => updateSkill(index, 'proficiencyLevel', e.target.value)}
                                className="form-input"
                              >
                                <option value="Beginner">Beginner</option>
                                <option value="Intermediate">Intermediate</option>
                                <option value="Advanced">Advanced</option>
                                <option value="Expert">Expert</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeSkill(index)} 
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* FIXED: Languages Section with proper object structure */}
                  <div className="form-group">
                    <div className="section-header">
                      <h3 className="section-title">Languages Spoken</h3>
                      <button type="button" onClick={addLanguage} className="add-btn">
                        + Add Language
                      </button>
                    </div>
                    
                    {languagesSpoken.map((language, index) => (
                      <div key={index} className="dynamic-item">
                        <div className="dynamic-item-content">
                          <div className="form-row">
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Language (e.g., English)"
                                value={language.language}
                                onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                                className="form-input"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <select
                                value={language.proficiency}
                                onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
                                className="form-input"
                              >
                                <option value="Basic">Basic</option>
                                <option value="Conversational">Conversational</option>
                                <option value="Fluent">Fluent</option>
                                <option value="Native">Native</option>
                              </select>
                            </div>
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeLanguage(index)} 
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* FIXED: Work Experience Section with proper object structure */}
                  <div className="form-group">
                    <div className="section-header">
                      <h3 className="section-title">Work Experience</h3>
                      <button type="button" onClick={addWorkExperience} className="add-btn">
                        + Add Experience
                      </button>
                    </div>
                    
                    {workExperience.map((experience, index) => (
                      <div key={index} className="dynamic-item">
                        <div className="dynamic-item-content">
                          <div className="form-row">
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Job Title"
                                value={experience.jobTitle}
                                onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
                                className="form-input"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Company"
                                value={experience.company}
                                onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                                className="form-input"
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <input
                                type="date"
                                placeholder="Start Date"
                                value={experience.startDate}
                                onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                                className="form-input"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="date"
                                placeholder="End Date"
                                value={experience.endDate}
                                onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                                className="form-input"
                                disabled={experience.isCurrent}
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Duration (e.g., 6 months)"
                                value={experience.duration}
                                onChange={(e) => updateWorkExperience(index, 'duration', e.target.value)}
                                className="form-input"
                              />
                            </div>
                            <div className="form-group">
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  checked={experience.isCurrent}
                                  onChange={(e) => updateWorkExperience(index, 'isCurrent', e.target.checked)}
                                />
                                <span className="checkbox-mark"></span>
                                <span className="checkbox-label">Current Job</span>
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <textarea
                              placeholder="Job description and responsibilities"
                              value={experience.description}
                              onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                              className="form-input"
                              rows="3"
                              maxLength="300"
                            />
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeWorkExperience(index)} 
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* FIXED: Extracurricular Activities Section with proper object structure */}
                  <div className="form-group">
                    <div className="section-header">
                      <h3 className="section-title">Extracurricular Activities</h3>
                      <button type="button" onClick={addExtracurricularActivity} className="add-btn">
                        + Add Activity
                      </button>
                    </div>
                    
                    {extracurricularActivities.map((activity, index) => (
                      <div key={index} className="dynamic-item">
                        <div className="dynamic-item-content">
                          <div className="form-row">
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Activity Name"
                                value={activity.activity}
                                onChange={(e) => updateExtracurricularActivity(index, 'activity', e.target.value)}
                                className="form-input"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Your Role"
                                value={activity.role}
                                onChange={(e) => updateExtracurricularActivity(index, 'role', e.target.value)}
                                className="form-input"
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Organization/Club"
                                value={activity.organization}
                                onChange={(e) => updateExtracurricularActivity(index, 'organization', e.target.value)}
                                className="form-input"
                              />
                            </div>
                          </div>
                          <div className="form-row">
                            <div className="form-group">
                              <input
                                type="date"
                                placeholder="Start Date"
                                value={activity.startDate}
                                onChange={(e) => updateExtracurricularActivity(index, 'startDate', e.target.value)}
                                className="form-input"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="date"
                                placeholder="End Date"
                                value={activity.endDate}
                                onChange={(e) => updateExtracurricularActivity(index, 'endDate', e.target.value)}
                                className="form-input"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <textarea
                              placeholder="Description of the activity and your contributions"
                              value={activity.description}
                              onChange={(e) => updateExtracurricularActivity(index, 'description', e.target.value)}
                              className="form-input"
                              rows="3"
                              maxLength="300"
                            />
                          </div>
                        </div>
                        <button 
                          type="button" 
                          onClick={() => removeExtracurricularActivity(index)} 
                          className="remove-btn"
                        >
                          Remove
                        </button>
                      </div>
                    ))}
                  </div>

                  {/* Faculty and Department Selection */}
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
                  <button type="button" onClick={prevStep} className="btn-prev">
                    <span className="btn-arrow">←</span> Previous
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
      </div>

      <style jsx>{`
        .profile-container {
          min-height: 100vh;
          position: relative;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          overflow-x: hidden;
        }

        .profile-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 0;
        }

        .profile-bg-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.1);
        }

        .floating-shapes {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          overflow: hidden;
        }

        .shape {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.1);
          animation: float 6s ease-in-out infinite;
        }

        .shape-1 {
          width: 60px;
          height: 60px;
          top: 20%;
          left: 10%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 80px;
          height: 80px;
          top: 60%;
          right: 10%;
          animation-delay: 2s;
        }

        .shape-3 {
          width: 40px;
          height: 40px;
          top: 80%;
          left: 20%;
          animation-delay: 4s;
        }

        .shape-4 {
          width: 100px;
          height: 100px;
          top: 10%;
          right: 30%;
          animation-delay: 1s;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-20px); }
        }

        .profile-content {
          position: relative;
          z-index: 1;
          padding: 2rem;
          max-width: 1200px;
          margin: 0 auto;
        }

        .profile-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .header-content {
          margin-bottom: 2rem;
        }

        .header-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .profile-title {
          font-size: 2.5rem;
          font-weight: 700;
          color: black;
          margin-bottom: 0.5rem;
        }

        .profile-subtitle {
          font-size: 1.1rem;
          color: black;
          // color: rgba(255, 255, 255, 0.9);
        }

        .progress-section {
          background: rgba(255, 255, 255, 0.95);
          border-radius: 15px;
          padding: 1.5rem;
          box-shadow: 0 10px 30px rgba(0, 0, 0, 0.1);
        }

        .progress-info {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .progress-text {
          font-weight: 600;
          color: #4a5568;
        }

        .progress-percentage {
          font-weight: 700;
          color: #667eea;
        }

        .progress-bar {
          width: 100%;
          height: 8px;
          background: #e2e8f0;
          border-radius: 4px;
          overflow: hidden;
          margin-bottom: 1rem;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #667eea, #764ba2);
          border-radius: 4px;
          transition: width 0.3s ease;
        }
     
        .message-alert {
          margin-bottom: 2rem;
          padding: 1rem 1.5rem;
          border-radius: 10px;
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .error-alert {
          background: #fed7d7;
          color: #c53030;
          border: 1px solid #feb2b2;
        }

        .success-alert {
          background: #c6f6d5;
          color: #2f855a;
          border: 1px solid #9ae6b4;
        }

        .alert-close {
          margin-left: auto;
          background: none;
          border: none;
          font-size: 1.2rem;
          cursor: pointer;
          color: inherit;
        }

        .profile-form {
          background: rgba(255, 255, 255, 0.98);
          border-radius: 20px;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
          overflow: hidden;
        }

        .step-card {
          padding: 3rem;
        }

        .step-header {
          text-align: center;
          margin-bottom: 3rem;
        }

        .step-header-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .step-title {
          font-size: 2rem;
          font-weight: 700;
          color: #2d3748;
          margin-bottom: 0.5rem;
        }

        .step-description {
          color: #718096;
          font-size: 1.1rem;
        }

        .form-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
          gap: 1.5rem;
          margin-bottom: 2rem;
        }

        .form-grid.single-column {
          grid-template-columns: 1fr;
        }

        .form-group {
          display: flex;
          flex-direction: column;
        }

        .form-group.full-width {
          grid-column: 1 / -1;
        }

        .form-label {
          display: flex;
          align-items: center;
          gap: 0.25rem;
          margin-bottom: 0.5rem;
          font-weight: 600;
          color: #4a5568;
        }

        .label-required {
          color: #e53e3e;
        }

        .input-wrapper {
          position: relative;
          display: flex;
          align-items: center;
        }

        .input-icon {
          position: absolute;
          left: 1rem;
          z-index: 2;
          font-size: 1.1rem;
        }

        .form-input {
          width: 100%;
          padding: 0.875rem 1rem 0.875rem 3rem;
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          font-size: 1rem;
          transition: all 0.2s ease;
          background: white;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
        }

        .input-help {
          font-size: 0.875rem;
          color: #718096;
          margin-top: 0.25rem;
        }

        .section-header {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-bottom: 1rem;
        }

        .section-title {
          font-size: 1.25rem;
          font-weight: 600;
          color: #4a5568;
          margin: 0;
        }

        .add-btn {
          background: #667eea;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 8px;
          font-size: 0.875rem;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .add-btn:hover {
          background: #5a67d8;
          transform: translateY(-1px);
        }

        .dynamic-item {
          border: 2px solid #e2e8f0;
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 1rem;
          position: relative;
        }

        .dynamic-item-content {
          margin-bottom: 1rem;
        }

        .form-row {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1rem;
          margin-bottom: 1rem;
        }

        .remove-btn {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 0.5rem 1rem;
          border-radius: 6px;
          font-size: 0.875rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .remove-btn:hover {
          background: #c53030;
        }

        .custom-checkbox {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          cursor: pointer;
        }

        .checkbox-mark {
          width: 20px;
          height: 20px;
          border: 2px solid #e2e8f0;
          border-radius: 4px;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.2s ease;
        }

        .custom-checkbox input {
          display: none;
        }

        .custom-checkbox input:checked + .checkbox-mark {
          background: #667eea;
          border-color: #667eea;
        }

        .custom-checkbox input:checked + .checkbox-mark::after {
          content: "✓";
          color: white;
          font-size: 12px;
        }

        .checkbox-label {
          font-size: 0.9rem;
          color: #4a5568;
        }

        .upload-area {
          border: 2px dashed #cbd5e0;
          border-radius: 10px;
          padding: 2rem;
          text-align: center;
          transition: all 0.2s ease;
          margin-bottom: 1rem;
        }

        .upload-area:hover {
          border-color: #667eea;
          background: #f7fafc;
        }

        .upload-area.has-file {
          border-color: #48bb78;
          background: #f0fff4;
        }

        .upload-icon {
          font-size: 3rem;
          margin-bottom: 1rem;
        }

        .upload-buttons {
          display: flex;
          gap: 1rem;
          justify-content: center;
          margin-bottom: 1rem;
        }

        .upload-btn {
          padding: 0.75rem 1.5rem;
          border: none;
          border-radius: 8px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .upload-btn.primary {
          background: #667eea;
          color: white;
        }

        .upload-btn.primary:hover {
          background: #5a67d8;
          transform: translateY(-1px);
        }

        .upload-btn.secondary {
          background: #e2e8f0;
          color: #4a5568;
        }

        .upload-btn.secondary:hover {
          background: #cbd5e0;
        }

        .upload-info {
          font-size: 0.875rem;
          color: #718096;
        }

        .image-preview {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 1rem;
        }

        .preview-image {
          width: 150px;
          height: 150px;
          object-fit: cover;
          border-radius: 10px;
          border: 2px solid #e2e8f0;
        }

        .image-name {
          font-size: 0.9rem;
          color: #4a5568;
          margin: 0;
        }

        .document-list {
          margin-top: 1rem;
          padding: 1rem;
          background: #f7fafc;
          border-radius: 8px;
        }

        .document-list-title {
          font-size: 1rem;
          font-weight: 600;
          color: #4a5568;
          margin-bottom: 0.75rem;
        }

        .document-item {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 0.75rem;
          background: white;
          border-radius: 6px;
          margin-bottom: 0.5rem;
          border: 1px solid #e2e8f0;
        }

        .document-info {
          display: flex;
          align-items: center;
          gap: 0.5rem;
        }

        .document-icon {
          font-size: 1.1rem;
        }

        .document-name {
          font-weight: 500;
          color: #4a5568;
        }

        .document-size {
          font-size: 0.875rem;
          color: #718096;
        }

        .document-remove {
          background: #e53e3e;
          color: white;
          border: none;
          padding: 0.375rem 0.75rem;
          border-radius: 4px;
          font-size: 0.75rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .document-remove:hover {
          background: #c53030;
        }

        .step-actions {
          display: flex;
          justify-content: space-between;
          align-items: center;
          margin-top: 3rem;
          padding-top: 2rem;
          border-top: 1px solid #e2e8f0;
        }

        .btn-prev,
        .btn-next,
        .btn-submit {
          display: flex;
          align-items: center;
          gap: 0.5rem;
          padding: 1rem 2rem;
          border: none;
          border-radius: 10px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .btn-prev {
          background: #e2e8f0;
          color: #4a5568;
        }

        .btn-prev:hover {
          background: #cbd5e0;
          transform: translateX(-2px);
        }

        .btn-next,
        .btn-submit {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
        }

        .btn-next:hover,
        .btn-submit:hover:not(:disabled) {
          transform: translateX(2px);
          box-shadow: 0 5px 15px rgba(102, 126, 234, 0.4);
        }

        .btn-submit:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .btn-submit.loading {
          padding: 1rem 3rem;
        }

        .loading-content {
          display: flex;
          align-items: center;
          gap: 0.75rem;
        }

        .loading-spinner {
          width: 20px;
          height: 20px;
          border: 2px solid rgba(255, 255, 255, 0.3);
          border-top: 2px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        .btn-arrow {
          font-size: 1.1rem;
          transition: transform 0.2s ease;
        }

        .btn-next:hover .btn-arrow {
          transform: translateX(2px);
        }

        .btn-prev:hover .btn-arrow {
          transform: translateX(-2px);
        }

        /* Responsive Design */
        @media (max-width: 768px) {
          .profile-content {
            padding: 1rem;
          }

          .profile-title {
            font-size: 2rem;
            color:black;
          }

          .step-card {
            padding: 2rem 1.5rem;
          }

          .form-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }

          .form-row {
            grid-template-columns: 1fr;
          }

          .step-actions {
            flex-direction: column;
            gap: 1rem;
          }

          .step-actions .btn-prev {
            order: 2;
            width: 100%;
            justify-content: center;
          }

          .step-actions .btn-next,
          .step-actions .btn-submit {
            order: 1;
            width: 100%;
            justify-content: center;
          }

          .upload-buttons {
            flex-direction: column;
            align-items: center;
          }

          .upload-btn {
            width: 200px;
          }
        }

        @media (max-width: 480px) {
          .profile-title {
            font-size: 1.5rem;
          }

          .step-card {
            padding: 1.5rem 1rem;
          }

          .dynamic-item {
            padding: 1rem;
          }
        }
      `}</style>
    </div>
  );
};

export default StudentProfile;
