// import React, { useState, useEffect, useRef } from 'react';
// import { Notify } from 'notiflix';
// import './styles/EditProfile.css';

// const EditProfile = () => {
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

//   // File states
//   const [profileImage, setProfileImage] = useState(null);
//   const [existingImages, setExistingImages] = useState([]);
//   const [documents, setDocuments] = useState([]);
//   const [existingDocuments, setExistingDocuments] = useState([]);

//   // UI states
//   const [loading, setLoading] = useState(true);
//   const [saving, setSaving] = useState(false);
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');
//   const [activeTab, setActiveTab] = useState('personal');

//   // Refs
//   const fileInputRef = useRef(null);
//   const cameraInputRef = useRef(null);
//   const documentInputRef = useRef(null);

//   // Fetch existing profile data
//   useEffect(() => {
//     fetchProfile();
//   }, []);

//   const fetchProfile = async () => {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Please log in to edit your profile');
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
//         const profile = data.profile;
        
//         // Populate form data
//         setFormData({
//           nationality: profile.nationality || '',
//           dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
//           age: profile.age || '',
//           gender: profile.gender || '',
//           country: profile.country || '',
//           phoneNumber: profile.phoneNumber || '',
//           studentType: profile.studentType || 'Undergraduate',
//           currentAcademicLevel: profile.currentAcademicLevel || '',
//           studentProgram: profile.studentProgram || '',
//           maritalStatus: profile.maritalStatus || '',
//           yourReligion: profile.yourReligion || '',
//           sponsorshipDetails: profile.sponsorshipDetails || '',
//           highSchoolGrades: profile.highSchoolGrades || '',
//           coursesStudiedInSecondary: Array.isArray(profile.coursesStudiedInSecondary) 
//             ? profile.coursesStudiedInSecondary.join(', ') 
//             : profile.coursesStudiedInSecondary || '',
//           haveTwoPrincipalPasses: profile.haveTwoPrincipalPasses || false,
//           disability: profile.disability || 'None',
//           haveJob: profile.haveJob || '',
//           hobbies: profile.hobbies || '',
//           interests: Array.isArray(profile.interests) 
//             ? profile.interests.join(', ') 
//             : profile.interests || '',
//           desiredFaculty: profile.desiredFaculty || '',
//           desiredDepartment: profile.desiredDepartment || '',
//           careerGoals: profile.careerGoals || '',
//           emergencyContact: profile.emergencyContact || {
//             name: '',
//             relationship: '',
//             phoneNumber: '',
//             email: ''
//           }
//         });

//         // Populate complex arrays
//         setSkills(profile.skills || []);
//         setLanguagesSpoken(profile.languagesSpoken || []);
//         setWorkExperience(profile.workExperience || []);
//         setExtracurricularActivities(profile.extracurricularActivities || []);

//         // Set existing files
//         setExistingImages(profile.images || []);
//         setExistingDocuments(profile.documents || []);

//         console.log('✅ Profile data loaded for editing');
//       } else {
//         throw new Error('Failed to fetch profile');
//       }
//     } catch (err) {
//       console.error('Error fetching profile:', err);
//       setError('Failed to load profile data');
//       Notify.failure('Failed to load profile data');
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
    
//     if (name.includes('.')) {
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

//   // Skills management
//   const addSkill = () => {
//     setSkills([...skills, { skillName: '', proficiencyLevel: 'Beginner' }]);
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

//   // Languages management
//   const addLanguage = () => {
//     setLanguagesSpoken([...languagesSpoken, { language: '', proficiency: 'Basic' }]);
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

//   // Work experience management
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

//   // Extracurricular activities management
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

//   // File handling
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

//   const removeExistingDocument = (index) => {
//     setExistingDocuments(prev => prev.filter((_, i) => i !== index));
//   };

//   // Form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setSaving(true);
//     setError('');
//     setSuccess('');

//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         setError('Please log in to continue');
//         return;
//       }

//       const formDataToSend = new FormData();
      
//       // Add all basic form fields
//       Object.keys(formData).forEach(key => {
//         if (key === 'emergencyContact') {
//           formDataToSend.append(key, JSON.stringify(formData[key]));
//         } else if (key === 'interests') {
//           const interestsArray = formData[key].split(',').map(item => item.trim()).filter(item => item);
//           formDataToSend.append(key, JSON.stringify(interestsArray));
//         } else if (key === 'coursesStudiedInSecondary') {
//           formDataToSend.append(key, formData[key]);
//         } else {
//           formDataToSend.append(key, formData[key]);
//         }
//       });
      
//       // Add complex arrays (clean them first to remove any _id fields from existing data)
//       const cleanSkills = skills.map(skill => ({
//         skillName: skill.skillName,
//         proficiencyLevel: skill.proficiencyLevel
//       }));
      
//       const cleanLanguages = languagesSpoken.map(lang => ({
//         language: lang.language,
//         proficiency: lang.proficiency
//       }));
      
//       const cleanWorkExperience = workExperience.map(exp => ({
//         jobTitle: exp.jobTitle,
//         company: exp.company,
//         startDate: exp.startDate,
//         endDate: exp.endDate,
//         duration: exp.duration,
//         description: exp.description,
//         isCurrent: exp.isCurrent
//       }));
      
//       const cleanActivities = extracurricularActivities.map(activity => ({
//         activity: activity.activity,
//         role: activity.role,
//         organization: activity.organization,
//         startDate: activity.startDate,
//         endDate: activity.endDate,
//         description: activity.description
//       }));

//       formDataToSend.append('skills', JSON.stringify(cleanSkills));
//       formDataToSend.append('languagesSpoken', JSON.stringify(cleanLanguages));
//       formDataToSend.append('workExperience', JSON.stringify(cleanWorkExperience));
//       formDataToSend.append('extracurricularActivities', JSON.stringify(cleanActivities));
      
//       // Add new profile image
//       if (profileImage) {
//         formDataToSend.append('images', profileImage);
//       }
      
//       // Add new documents
//       documents.forEach(doc => {
//         formDataToSend.append('documents', doc);
//       });

//       // Send existing files to keep (if any removed)
//       formDataToSend.append('existingImages', JSON.stringify(existingImages));
//       formDataToSend.append('existingDocuments', JSON.stringify(existingDocuments));

//       const response = await fetch('http://localhost:5000/api/student/profile', {
//         method: 'PUT',
//         headers: {
//           'Authorization': `Bearer ${token}`
//         },
//         body: formDataToSend
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess('Profile updated successfully!');
//         Notify.success('Profile updated successfully!');
        
//         setTimeout(() => {
//           window.location.href = '/ProfileDashboard';
//         }, 2000);
//       } else {
//         setError(data.message || 'Failed to update profile');
//         Notify.failure('Failed to update profile');
//       }
//     } catch (err) {
//       setError('Network error. Please try again.');
//       Notify.failure('Network error. Please try again.');
//     } finally {
//       setSaving(false);
//     }
//   };

//   // Cancel editing
//   const handleCancel = () => {
//     if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
//       window.location.href = '/ProfileDashboard';
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

//   if (loading) {
//     return (
//       <div className="edit-profile-container">
//         <div className="loading-card">
//           <div className="loading-spinner"></div>
//           <h2>Loading Profile Data...</h2>
//           <p>Please wait while we fetch your information</p>
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="edit-profile-container">
//       <div className="edit-profile-content">
//         {/* Header */}
//         <div className="edit-header">
//           <div className="header-info">
//             <h1 className="edit-title">✏️ Edit Your Profile</h1>
//             <p className="edit-subtitle">Update your information and preferences</p>
//           </div>
//           <div className="header-actions">
//             <button onClick={handleCancel} className="cancel-btn">
//               Cancel
//             </button>
//             <button 
//               onClick={handleSubmit} 
//               disabled={saving}
//               className={`save-btn ${saving ? 'saving' : ''}`}
//             >
//               {saving ? 'Saving...' : 'Save Changes'}
//             </button>
//           </div>
//         </div>

//         {/* Messages */}
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
//           </div>
//         )}

//         {/* Tab Navigation */}
//         <div className="tabs-navigation">
//           {[
//             { id: 'personal', label: 'Personal Info', icon: '👤' },
//             { id: 'academic', label: 'Academic', icon: '🎓' },
//             { id: 'experience', label: 'Experience & Skills', icon: '💼' },
//             { id: 'goals', label: 'Goals & Contact', icon: '🎯' }
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

//         {/* Form Content */}
//         <div className="edit-form-container">
          
//           {/* Personal Information Tab */}
//           {activeTab === 'personal' && (
//             <div className="form-section">
//               <h3 className="section-title">Personal Information</h3>
              
//               {/* Profile Image Section */}
//               <div className="image-upload-section">
//                 <h4 className="subsection-title">Profile Picture</h4>
//                 <div className="current-image">
//                   {existingImages && existingImages.length > 0 && (
//                     <div className="existing-image">
//                       <img 
//                         src={`http://localhost:5000/uploads/${existingImages[0].filename}`} 
//                         alt="Current profile" 
//                         className="current-profile-img"
//                         onError={(e) => {
//                           e.target.style.display = 'none';
//                         }}
//                       />
//                       <p className="image-label">Current Image</p>
//                     </div>
//                   )}
                  
//                   {profileImage && (
//                     <div className="new-image">
//                       <img 
//                         src={URL.createObjectURL(profileImage)} 
//                         alt="New profile" 
//                         className="new-profile-img"
//                       />
//                       <p className="image-label">New Image</p>
//                       <button 
//                         type="button" 
//                         onClick={() => setProfileImage(null)}
//                         className="remove-new-image"
//                       >
//                         Remove
//                       </button>
//                     </div>
//                   )}
//                 </div>
                
//                 <div className="upload-buttons">
//                   <button
//                     type="button"
//                     onClick={() => fileInputRef.current?.click()}
//                     className="upload-btn"
//                   >
//                     📷 Choose New Image
//                   </button>
//                   <input
//                     ref={fileInputRef}
//                     type="file"
//                     accept="image/*"
//                     onChange={handleImageUpload}
//                     style={{ display: 'none' }}
//                   />
//                 </div>
//               </div>

//               {/* Personal Details Form */}
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label className="form-label">
//                     Nationality <span className="required">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="nationality"
//                     value={formData.nationality}
//                     onChange={handleChange}
//                     className="form-input"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     Date of Birth <span className="required">*</span>
//                   </label>
//                   <input
//                     type="date"
//                     name="dateOfBirth"
//                     value={formData.dateOfBirth}
//                     onChange={handleChange}
//                     className="form-input"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     Age <span className="required">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="age"
//                     value={formData.age}
//                     onChange={handleChange}
//                     className="form-input"
//                     min="16"
//                     max="100"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     Gender <span className="required">*</span>
//                   </label>
//                   <select
//                     name="gender"
//                     value={formData.gender}
//                     onChange={handleChange}
//                     className="form-input"
//                     required
//                   >
//                     <option value="">Select Gender</option>
//                     <option value="Male">Male</option>
//                     <option value="Female">Female</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     Country <span className="required">*</span>
//                   </label>
//                   <input
//                     type="text"
//                     name="country"
//                     value={formData.country}
//                     onChange={handleChange}
//                     className="form-input"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     Phone Number <span className="required">*</span>
//                   </label>
//                   <input
//                     type="tel"
//                     name="phoneNumber"
//                     value={formData.phoneNumber}
//                     onChange={handleChange}
//                     className="form-input"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     Marital Status <span className="required">*</span>
//                   </label>
//                   <select
//                     name="maritalStatus"
//                     value={formData.maritalStatus}
//                     onChange={handleChange}
//                     className="form-input"
//                     required
//                   >
//                     <option value="">Select Status</option>
//                     <option value="Single">Single</option>
//                     <option value="Married">Married</option>
//                     <option value="Divorced">Divorced</option>
//                     <option value="Widowed">Widowed</option>
//                     <option value="Prefer not to say">Prefer not to say</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     Religion <span className="required">*</span>
//                   </label>
//                   <select
//                     name="yourReligion"
//                     value={formData.yourReligion}
//                     onChange={handleChange}
//                     className="form-input"
//                     required
//                   >
//                     <option value="">Select Religion</option>
//                     <option value="Adventist">Adventist</option>
//                     <option value="Protestant">Protestant</option>
//                     <option value="Catholic">Catholic</option>
//                     <option value="Islam">Islam</option>
//                     <option value="Other">Other</option>
//                     <option value="None">None</option>
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Academic Information Tab */}
//           {activeTab === 'academic' && (
//             <div className="form-section">
//               <h3 className="section-title">Academic Information</h3>
              
//               <div className="form-grid">
//                 <div className="form-group">
//                   <label className="form-label">
//                     Current Academic Level <span className="required">*</span>
//                   </label>
//                   <select
//                     name="currentAcademicLevel"
//                     value={formData.currentAcademicLevel}
//                     onChange={handleChange}
//                     className="form-input"
//                     required
//                   >
//                     <option value="">Select Level</option>
//                     <option value="O-Level">O-Level</option>
//                     <option value="A-Level">A-Level</option>
//                     <option value="Bachelor's Degree">Bachelor's Degree</option>
//                     <option value="Master's Degree">Master's Degree</option>
//                     <option value="PhD">PhD</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     Student Program <span className="required">*</span>
//                   </label>
//                   <select
//                     name="studentProgram"
//                     value={formData.studentProgram}
//                     onChange={handleChange}
//                     className="form-input"
//                     required
//                   >
//                     <option value="">Select Program</option>
//                     <option value="Day Program">Day Program</option>
//                     <option value="Evening Program">Evening Program</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     High School Grades <span className="required">*</span>
//                   </label>
//                   <input
//                     type="number"
//                     name="highSchoolGrades"
//                     value={formData.highSchoolGrades}
//                     onChange={handleChange}
//                     className="form-input"
//                     min="0"
//                     max="100"
//                     required
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     Sponsorship Details <span className="required">*</span>
//                   </label>
//                   <select
//                     name="sponsorshipDetails"
//                     value={formData.sponsorshipDetails}
//                     onChange={handleChange}
//                     className="form-input"
//                     required
//                   >
//                     <option value="">Select Sponsorship</option>
//                     <option value="Self">Self</option>
//                     <option value="Parents">Parents</option>
//                     <option value="Government">Government</option>
//                     <option value="Organization">Organization</option>
//                     <option value="Scholarship">Scholarship</option>
//                     <option value="Other">Other</option>
//                   </select>
//                 </div>

//                 <div className="form-group full-width">
//                   <label className="form-label">
//                     Courses Studied in Secondary
//                   </label>
//                   <input
//                     type="text"
//                     name="coursesStudiedInSecondary"
//                     value={formData.coursesStudiedInSecondary}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="e.g., Mathematics, Physics, Chemistry"
//                   />
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">
//                     Have Job <span className="required">*</span>
//                   </label>
//                   <select
//                     name="haveJob"
//                     value={formData.haveJob}
//                     onChange={handleChange}
//                     className="form-input"
//                     required
//                   >
//                     <option value="">Select Option</option>
//                     <option value="Yes">Yes</option>
//                     <option value="No">No</option>
//                     <option value="Part-time">Part-time</option>
//                     <option value="Internship">Internship</option>
//                     <option value="Volunteer">Volunteer</option>
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <div className="checkbox-group">
//                     <label className="custom-checkbox">
//                       <input
//                         type="checkbox"
//                         name="haveTwoPrincipalPasses"
//                         checked={formData.haveTwoPrincipalPasses}
//                         onChange={handleChange}
//                       />
//                       <span className="checkbox-mark"></span>
//                       <span className="checkbox-label">I have two principal passes</span>
//                     </label>
//                   </div>
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Desired Faculty</label>
//                   <select
//                     name="desiredFaculty"
//                     value={formData.desiredFaculty}
//                     onChange={handleChange}
//                     className="form-input"
//                   >
//                     <option value="">Select Faculty</option>
//                     {facultyOptions.map(faculty => (
//                       <option key={faculty} value={faculty}>{faculty}</option>
//                     ))}
//                   </select>
//                 </div>

//                 <div className="form-group">
//                   <label className="form-label">Desired Department</label>
//                   <select
//                     name="desiredDepartment"
//                     value={formData.desiredDepartment}
//                     onChange={handleChange}
//                     className="form-input"
//                     disabled={!formData.desiredFaculty}
//                   >
//                     <option value="">Select Department</option>
//                     {getDepartmentOptions(formData.desiredFaculty).map(dept => (
//                       <option key={dept} value={dept}>{dept}</option>
//                     ))}
//                   </select>
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Experience & Skills Tab */}
//           {activeTab === 'experience' && (
//             <div className="form-section">
//               <h3 className="section-title">Experience & Skills</h3>
              
//               {/* Skills Section */}
//               <div className="dynamic-section">
//                 <div className="section-header">
//                   <h4 className="subsection-title">Skills</h4>
//                   <button type="button" onClick={addSkill} className="add-btn">
//                     + Add Skill
//                   </button>
//                 </div>
                
//                 {skills.map((skill, index) => (
//                   <div key={index} className="dynamic-item">
//                     <div className="form-row">
//                       <input
//                         type="text"
//                         placeholder="Skill name"
//                         value={skill.skillName}
//                         onChange={(e) => updateSkill(index, 'skillName', e.target.value)}
//                         className="form-input"
//                       />
//                       <select
//                         value={skill.proficiencyLevel}
//                         onChange={(e) => updateSkill(index, 'proficiencyLevel', e.target.value)}
//                         className="form-input"
//                       >
//                         <option value="Beginner">Beginner</option>
//                         <option value="Intermediate">Intermediate</option>
//                         <option value="Advanced">Advanced</option>
//                         <option value="Expert">Expert</option>
//                       </select>
//                       <button
//                         type="button"
//                         onClick={() => removeSkill(index)}
//                         className="remove-btn"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Languages Section */}
//               <div className="dynamic-section">
//                 <div className="section-header">
//                   <h4 className="subsection-title">Languages Spoken</h4>
//                   <button type="button" onClick={addLanguage} className="add-btn">
//                     + Add Language
//                   </button>
//                 </div>
                
//                 {languagesSpoken.map((language, index) => (
//                   <div key={index} className="dynamic-item">
//                     <div className="form-row">
//                       <input
//                         type="text"
//                         placeholder="Language"
//                         value={language.language}
//                         onChange={(e) => updateLanguage(index, 'language', e.target.value)}
//                         className="form-input"
//                       />
//                       <select
//                         value={language.proficiency}
//                         onChange={(e) => updateLanguage(index, 'proficiency', e.target.value)}
//                         className="form-input"
//                       >
//                         <option value="Basic">Basic</option>
//                         <option value="Conversational">Conversational</option>
//                         <option value="Fluent">Fluent</option>
//                         <option value="Native">Native</option>
//                       </select>
//                       <button
//                         type="button"
//                         onClick={() => removeLanguage(index)}
//                         className="remove-btn"
//                       >
//                         ✕
//                       </button>
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Work Experience Section */}
//               <div className="dynamic-section">
//                 <div className="section-header">
//                   <h4 className="subsection-title">Work Experience</h4>
//                   <button type="button" onClick={addWorkExperience} className="add-btn">
//                     + Add Experience
//                   </button>
//                 </div>
                
//                 {workExperience.map((exp, index) => (
//                   <div key={index} className="dynamic-item work-experience-item">
//                     <div className="form-grid">
//                       <div className="form-group">
//                         <input
//                           type="text"
//                           placeholder="Job Title"
//                           value={exp.jobTitle}
//                           onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
//                           className="form-input"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <input
//                           type="text"
//                           placeholder="Company"
//                           value={exp.company}
//                           onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
//                           className="form-input"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <input
//                           type="date"
//                           placeholder="Start Date"
//                           value={exp.startDate}
//                           onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
//                           className="form-input"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <input
//                           type="date"
//                           placeholder="End Date"
//                           value={exp.endDate}
//                           onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
//                           className="form-input"
//                           disabled={exp.isCurrent}
//                         />
//                       </div>
//                       <div className="form-group">
//                         <input
//                           type="text"
//                           placeholder="Duration (e.g., 2 years)"
//                           value={exp.duration}
//                           onChange={(e) => updateWorkExperience(index, 'duration', e.target.value)}
//                           className="form-input"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <label className="custom-checkbox">
//                           <input
//                             type="checkbox"
//                             checked={exp.isCurrent}
//                             onChange={(e) => updateWorkExperience(index, 'isCurrent', e.target.checked)}
//                           />
//                           <span className="checkbox-mark"></span>
//                           <span className="checkbox-label">Currently working here</span>
//                         </label>
//                       </div>
//                     </div>
//                     <div className="form-group full-width">
//                       <textarea
//                         placeholder="Job description and responsibilities"
//                         value={exp.description}
//                         onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
//                         className="form-textarea"
//                         rows="3"
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeWorkExperience(index)}
//                       className="remove-item-btn"
//                     >
//                       Remove Experience
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               {/* Extracurricular Activities Section */}
//               <div className="dynamic-section">
//                 <div className="section-header">
//                   <h4 className="subsection-title">Extracurricular Activities</h4>
//                   <button type="button" onClick={addExtracurricularActivity} className="add-btn">
//                     + Add Activity
//                   </button>
//                 </div>
                
//                 {extracurricularActivities.map((activity, index) => (
//                   <div key={index} className="dynamic-item activity-item">
//                     <div className="form-grid">
//                       <div className="form-group">
//                         <input
//                           type="text"
//                           placeholder="Activity Name"
//                           value={activity.activity}
//                           onChange={(e) => updateExtracurricularActivity(index, 'activity', e.target.value)}
//                           className="form-input"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <input
//                           type="text"
//                           placeholder="Your Role"
//                           value={activity.role}
//                           onChange={(e) => updateExtracurricularActivity(index, 'role', e.target.value)}
//                           className="form-input"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <input
//                           type="text"
//                           placeholder="Organization"
//                           value={activity.organization}
//                           onChange={(e) => updateExtracurricularActivity(index, 'organization', e.target.value)}
//                           className="form-input"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <input
//                           type="date"
//                           placeholder="Start Date"
//                           value={activity.startDate}
//                           onChange={(e) => updateExtracurricularActivity(index, 'startDate', e.target.value)}
//                           className="form-input"
//                         />
//                       </div>
//                       <div className="form-group">
//                         <input
//                           type="date"
//                           placeholder="End Date"
//                           value={activity.endDate}
//                           onChange={(e) => updateExtracurricularActivity(index, 'endDate', e.target.value)}
//                           className="form-input"
//                         />
//                       </div>
//                     </div>
//                     <div className="form-group full-width">
//                       <textarea
//                         placeholder="Description of activities and achievements"
//                         value={activity.description}
//                         onChange={(e) => updateExtracurricularActivity(index, 'description', e.target.value)}
//                         className="form-textarea"
//                         rows="3"
//                       />
//                     </div>
//                     <button
//                       type="button"
//                       onClick={() => removeExtracurricularActivity(index)}
//                       className="remove-item-btn"
//                     >
//                       Remove Activity
//                     </button>
//                   </div>
//                 ))}
//               </div>

//               {/* Hobbies and Interests */}
//               <div className="form-grid">
//                 <div className="form-group full-width">
//                   <label className="form-label">Hobbies</label>
//                   <textarea
//                     name="hobbies"
//                     value={formData.hobbies}
//                     onChange={handleChange}
//                     className="form-textarea"
//                     placeholder="Tell us about your hobbies and what you enjoy doing in your free time"
//                     rows="3"
//                   />
//                 </div>

//                 <div className="form-group full-width">
//                   <label className="form-label">Interests</label>
//                   <input
//                     type="text"
//                     name="interests"
//                     value={formData.interests}
//                     onChange={handleChange}
//                     className="form-input"
//                     placeholder="e.g., Technology, Sports, Music (separate with commas)"
//                   />
//                 </div>
//               </div>
//             </div>
//           )}

//           {/* Goals & Contact Tab */}
//           {activeTab === 'goals' && (
//             <div className="form-section">
//               <h3 className="section-title">Goals & Emergency Contact</h3>
              
//               {/* Career Goals */}
//               <div className="form-group full-width">
//                 <label className="form-label">
//                   Career Goals <span className="required">*</span>
//                 </label>
//                 <textarea
//                   name="careerGoals"
//                   value={formData.careerGoals}
//                   onChange={handleChange}
//                   className="form-textarea"
//                   placeholder="Describe your career aspirations and long-term goals"
//                   rows="4"
//                   required
//                 />
//               </div>

//               {/* Disability Information */}
//               <div className="form-group">
//                 <label className="form-label">Disability Information</label>
//                 <select
//                   name="disability"
//                   value={formData.disability}
//                   onChange={handleChange}
//                   className="form-input"
//                 >
//                   <option value="None">None</option>
//                   <option value="Physical">Physical</option>
//                   <option value="Visual">Visual</option>
//                   <option value="Hearing">Hearing</option>
//                   <option value="Learning">Learning</option>
//                   <option value="Other">Other</option>
//                   <option value="Prefer not to say">Prefer not to say</option>
//                 </select>
//               </div>

//               {/* Emergency Contact */}
//               <div className="emergency-contact-section">
//                 <h4 className="subsection-title">Emergency Contact Information</h4>
//                 <div className="form-grid">
//                   <div className="form-group">
//                     <label className="form-label">
//                       Contact Name <span className="required">*</span>
//                     </label>
//                     <input
//                       type="text"
//                       name="emergencyContact.name"
//                       value={formData.emergencyContact.name}
//                       onChange={handleChange}
//                       className="form-input"
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       Relationship <span className="required">*</span>
//                     </label>
//                     <select
//                       name="emergencyContact.relationship"
//                       value={formData.emergencyContact.relationship}
//                       onChange={handleChange}
//                       className="form-input"
//                       required
//                     >
//                       <option value="">Select Relationship</option>
//                       <option value="Parent">Parent</option>
//                       <option value="Guardian">Guardian</option>
//                       <option value="Spouse">Spouse</option>
//                       <option value="Sibling">Sibling</option>
//                       <option value="Relative">Relative</option>
//                       <option value="Friend">Friend</option>
//                       <option value="Other">Other</option>
//                     </select>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       Phone Number <span className="required">*</span>
//                     </label>
//                     <input
//                       type="tel"
//                       name="emergencyContact.phoneNumber"
//                       value={formData.emergencyContact.phoneNumber}
//                       onChange={handleChange}
//                       className="form-input"
//                       required
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="emergencyContact.email"
//                       value={formData.emergencyContact.email}
//                       onChange={handleChange}
//                       className="form-input"
//                     />
//                   </div>
//                 </div>
//               </div>

//               {/* Documents Upload Section */}
//               <div className="documents-upload-section">
//                 <h4 className="subsection-title">Documents</h4>
                
//                 {/* Existing Documents */}
//                 {existingDocuments && existingDocuments.length > 0 && (
//                   <div className="existing-documents">
//                     <h5>Current Documents</h5>
//                     <div className="documents-list">
//                       {existingDocuments.map((doc, index) => (
//                         <div key={index} className="document-item">
//                           <div className="document-info">
//                             <span className="document-icon">📄</span>
//                             <span className="document-name">{doc.originalName}</span>
//                             <span className="document-size">
//                               {(doc.size / 1024 / 1024).toFixed(2)} MB
//                             </span>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeExistingDocument(index)}
//                             className="remove-document-btn"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* New Documents */}
//                 {documents && documents.length > 0 && (
//                   <div className="new-documents">
//                     <h5>New Documents to Upload</h5>
//                     <div className="documents-list">
//                       {documents.map((doc, index) => (
//                         <div key={index} className="document-item new-document">
//                           <div className="document-info">
//                             <span className="document-icon">📄</span>
//                             <span className="document-name">{doc.name}</span>
//                             <span className="document-size">
//                               {(doc.size / 1024 / 1024).toFixed(2)} MB
//                             </span>
//                           </div>
//                           <button
//                             type="button"
//                             onClick={() => removeDocument(index)}
//                             className="remove-document-btn"
//                           >
//                             Remove
//                           </button>
//                         </div>
//                       ))}
//                     </div>
//                   </div>
//                 )}

//                 {/* Upload New Documents */}
//                 <div className="upload-documents">
//                   <button
//                     type="button"
//                     onClick={() => documentInputRef.current?.click()}
//                     className="upload-btn"
//                     disabled={documents.length >= 5}
//                   >
//                     📎 Upload Documents
//                   </button>
//                   <input
//                     ref={documentInputRef}
//                     type="file"
//                     multiple
//                     accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
//                     onChange={handleDocumentUpload}
//                     style={{ display: 'none' }}
//                   />
//                   <p className="upload-info">
//                     Supported formats: PDF, DOC, DOCX, JPG, PNG. Maximum 5MB per file, 5 files total.
//                   </p>
//                 </div>
//               </div>
//             </div>
//           )}
//         </div>

//         {/* Form Actions */}
//         <div className="form-actions">
//           <button onClick={handleCancel} className="cancel-btn secondary">
//             Cancel Changes
//           </button>
//           <button 
//             onClick={handleSubmit} 
//             disabled={saving}
//             className={`save-btn primary ${saving ? 'saving' : ''}`}
//           >
//             {saving ? (
//               <>
//                 <span className="spinner"></span>
//                 Saving Profile...
//               </>
//             ) : (
//               'Save All Changes'
//             )}
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default EditProfile;


import React, { useState, useEffect, useRef } from 'react';
import { Notify } from 'notiflix';
import './styles/EditProfile.css';

const EditProfile = () => {
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

  // Separate state for complex arrays
  const [workExperience, setWorkExperience] = useState([]);
  const [extracurricularActivities, setExtracurricularActivities] = useState([]);
  const [skills, setSkills] = useState([]);
  const [languagesSpoken, setLanguagesSpoken] = useState([]);

  // File states
  const [profileImage, setProfileImage] = useState(null);
  const [existingImages, setExistingImages] = useState([]);
  const [documents, setDocuments] = useState([]);
  const [existingDocuments, setExistingDocuments] = useState([]);

  // UI states
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [activeTab, setActiveTab] = useState('personal');

  // Refs
  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // Fetch existing profile data
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to edit your profile');
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
        const profile = data.profile;
        
        // Populate form data
        setFormData({
          nationality: profile.nationality || '',
          dateOfBirth: profile.dateOfBirth ? profile.dateOfBirth.split('T')[0] : '',
          age: profile.age || '',
          gender: profile.gender || '',
          country: profile.country || '',
          phoneNumber: profile.phoneNumber || '',
          studentType: profile.studentType || 'Undergraduate',
          currentAcademicLevel: profile.currentAcademicLevel || '',
          studentProgram: profile.studentProgram || '',
          maritalStatus: profile.maritalStatus || '',
          yourReligion: profile.yourReligion || '',
          sponsorshipDetails: profile.sponsorshipDetails || '',
          highSchoolGrades: profile.highSchoolGrades || '',
          coursesStudiedInSecondary: Array.isArray(profile.coursesStudiedInSecondary) 
            ? profile.coursesStudiedInSecondary.join(', ') 
            : profile.coursesStudiedInSecondary || '',
          haveTwoPrincipalPasses: profile.haveTwoPrincipalPasses || false,
          disability: profile.disability || 'None',
          haveJob: profile.haveJob || '',
          hobbies: profile.hobbies || '',
          interests: Array.isArray(profile.interests) 
            ? profile.interests.join(', ') 
            : profile.interests || '',
          desiredFaculty: profile.desiredFaculty || '',
          desiredDepartment: profile.desiredDepartment || '',
          careerGoals: profile.careerGoals || '',
          emergencyContact: profile.emergencyContact || {
            name: '',
            relationship: '',
            phoneNumber: '',
            email: ''
          }
        });

        // Populate complex arrays
        setSkills(profile.skills || []);
        setLanguagesSpoken(profile.languagesSpoken || []);
        setWorkExperience(profile.workExperience || []);
        setExtracurricularActivities(profile.extracurricularActivities || []);

        // Set existing files
        setExistingImages(profile.images || []);
        setExistingDocuments(profile.documents || []);

        console.log('✅ Profile data loaded for editing');
      } else {
        throw new Error('Failed to fetch profile');
      }
    } catch (err) {
      console.error('Error fetching profile:', err);
      setError('Failed to load profile data');
      Notify.failure('Failed to load profile data');
    } finally {
      setLoading(false);
    }
  };

  // Handle form input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (name.includes('.')) {
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

  // Skills management
  const addSkill = () => {
    setSkills([...skills, { skillName: '', proficiencyLevel: 'Beginner' }]);
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

  // Languages management
  const addLanguage = () => {
    setLanguagesSpoken([...languagesSpoken, { language: '', proficiency: 'Basic' }]);
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

  // Work experience management
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

  // Extracurricular activities management
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

  // File handling
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

  const removeExistingDocument = (index) => {
    setExistingDocuments(prev => prev.filter((_, i) => i !== index));
  };

  // Form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    setError('');
    setSuccess('');

    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to continue');
        return;
      }

      const formDataToSend = new FormData();
      
      // Add all basic form fields
      Object.keys(formData).forEach(key => {
        if (key === 'emergencyContact') {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } else if (key === 'interests') {
          const interestsArray = formData[key].split(',').map(item => item.trim()).filter(item => item);
          formDataToSend.append(key, JSON.stringify(interestsArray));
        } else if (key === 'coursesStudiedInSecondary') {
          formDataToSend.append(key, formData[key]);
        } else {
          formDataToSend.append(key, formData[key]);
        }
      });
      
      // Add complex arrays (clean them first to remove any _id fields from existing data)
      const cleanSkills = skills.map(skill => ({
        skillName: skill.skillName,
        proficiencyLevel: skill.proficiencyLevel
      }));
      
      const cleanLanguages = languagesSpoken.map(lang => ({
        language: lang.language,
        proficiency: lang.proficiency
      }));
      
      const cleanWorkExperience = workExperience.map(exp => ({
        jobTitle: exp.jobTitle,
        company: exp.company,
        startDate: exp.startDate,
        endDate: exp.endDate,
        duration: exp.duration,
        description: exp.description,
        isCurrent: exp.isCurrent
      }));
      
      const cleanActivities = extracurricularActivities.map(activity => ({
        activity: activity.activity,
        role: activity.role,
        organization: activity.organization,
        startDate: activity.startDate,
        endDate: activity.endDate,
        description: activity.description
      }));

      formDataToSend.append('skills', JSON.stringify(cleanSkills));
      formDataToSend.append('languagesSpoken', JSON.stringify(cleanLanguages));
      formDataToSend.append('workExperience', JSON.stringify(cleanWorkExperience));
      formDataToSend.append('extracurricularActivities', JSON.stringify(cleanActivities));
      
      // Add new profile image
      if (profileImage) {
        formDataToSend.append('images', profileImage);
      }
      
      // Add new documents
      documents.forEach(doc => {
        formDataToSend.append('documents', doc);
      });

      // Send existing files to keep (if any removed)
      formDataToSend.append('existingImages', JSON.stringify(existingImages));
      formDataToSend.append('existingDocuments', JSON.stringify(existingDocuments));

      const response = await fetch('http://localhost:5000/api/student/profile', {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`
        },
        body: formDataToSend
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Profile updated successfully!');
        Notify.success('Profile updated successfully!');
        
        setTimeout(() => {
          window.location.href = '/ProfileDashboard';
        }, 2000);
      } else {
        setError(data.message || 'Failed to update profile');
        Notify.failure('Failed to update profile');
      }
    } catch (err) {
      setError('Network error. Please try again.');
      Notify.failure('Network error. Please try again.');
    } finally {
      setSaving(false);
    }
  };

  // Cancel editing
  const handleCancel = () => {
    if (window.confirm('Are you sure you want to cancel? All unsaved changes will be lost.')) {
      window.location.href = '/ProfileDashboard';
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

  if (loading) {
    return (
      <div className="edit-profile-container">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading Profile Data...</h2>
          <p>Please wait while we fetch your information</p>
        </div>
      </div>
    );
  }

  return (
    <div className="edit-profile-container">
      <div className="edit-profile-content">
        {/* Header */}
        <div className="edit-header">
          <div className="header-info">
            <h1 className="edit-title">✏️ Edit Your Profile</h1>
            <p className="edit-subtitle">Update your information and preferences</p>
          </div>
          <div className="header-actions">
            <button onClick={handleCancel} className="cancel-btn">
              Cancel
            </button>
            <button 
              onClick={handleSubmit} 
              disabled={saving}
              className={`save-btn ${saving ? 'saving' : ''}`}
            >
              {saving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>

        {/* Messages */}
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
          </div>
        )}

        {/* Tab Navigation */}
        <div className="tabs-navigation">
          {[
            { id: 'personal', label: 'Personal Info', icon: '👤' },
            { id: 'academic', label: 'Academic', icon: '🎓' },
            { id: 'experience', label: 'Experience & Skills', icon: '💼' },
            { id: 'goals', label: 'Goals & Contact', icon: '🎯' }
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

        {/* Form Content */}
        <div className="edit-form-container">
          
          {/* Personal Information Tab */}
          {activeTab === 'personal' && (
            <div className="form-section">
              <h3 className="section-title">Personal Information</h3>
              
              {/* Profile Image Section */}
              <div className="image-upload-section">
                <h4 className="subsection-title">Profile Picture</h4>
                <div className="current-image">
                  {existingImages && existingImages.length > 0 && !profileImage && (
                    <div className="existing-image">
                      <img 
                        src={`http://localhost:5000/uploads/${existingImages[0].filename}`} 
                        alt="Current profile" 
                        className="current-profile-img"
                        onError={(e) => {
                          e.target.style.display = 'none';
                        }}
                      />
                      <p className="image-label">Current Image</p>
                      <button 
                        type="button" 
                        onClick={() => {
                          setExistingImages([]);
                          setError('Current image will be removed when you save changes');
                        }}
                        className="remove-current-image"
                      >
                        🗑️ Remove Current Image
                      </button>
                    </div>
                  )}
                  
                  {profileImage && (
                    <div className="new-image">
                      <img 
                        src={URL.createObjectURL(profileImage)} 
                        alt="New profile" 
                        className="new-profile-img"
                      />
                      <p className="image-label">
                        {existingImages.length > 0 ? 'Replacing Current Image' : 'New Image'}
                      </p>
                      <button 
                        type="button" 
                        onClick={() => {
                          setProfileImage(null);
                          setError('');
                        }}
                        className="remove-new-image"
                      >
                        🗑️ Cancel New Image
                      </button>
                    </div>
                  )}

                  {!existingImages.length && !profileImage && (
                    <div className="no-image">
                      <div className="no-image-placeholder">
                        <span className="no-image-icon">👤</span>
                        <p>No profile image</p>
                      </div>
                    </div>
                  )}
                </div>
                
                <div className="upload-buttons">
                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="upload-btn"
                  >
                    📷 {existingImages.length > 0 || profileImage ? 'Change Image' : 'Upload Image'}
                  </button>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    style={{ display: 'none' }}
                  />
                  
                  {(existingImages.length > 0 || profileImage) && (
                    <button
                      type="button"
                      onClick={() => {
                        setProfileImage(null);
                        setExistingImages([]);
                        setError('Profile image will be removed when you save changes');
                      }}
                      className="remove-all-btn"
                    >
                      🗑️ Remove All Images
                    </button>
                  )}
                </div>
              </div>

              {/* Personal Details Form */}
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Nationality <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Date of Birth <span className="required">*</span>
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Age <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    className="form-input"
                    min="16"
                    max="100"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Gender <span className="required">*</span>
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Country <span className="required">*</span>
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Phone Number <span className="required">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    className="form-input"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Marital Status <span className="required">*</span>
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Religion <span className="required">*</span>
                  </label>
                  <select
                    name="yourReligion"
                    value={formData.yourReligion}
                    onChange={handleChange}
                    className="form-input"
                    required
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
          )}

          {/* Academic Information Tab */}
          {activeTab === 'academic' && (
            <div className="form-section">
              <h3 className="section-title">Academic Information</h3>
              
              <div className="form-grid">
                <div className="form-group">
                  <label className="form-label">
                    Current Academic Level <span className="required">*</span>
                  </label>
                  <select
                    name="currentAcademicLevel"
                    value={formData.currentAcademicLevel}
                    onChange={handleChange}
                    className="form-input"
                    required
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

                <div className="form-group">
                  <label className="form-label">
                    Student Program <span className="required">*</span>
                  </label>
                  <select
                    name="studentProgram"
                    value={formData.studentProgram}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Program</option>
                    <option value="Day Program">Day Program</option>
                    <option value="Evening Program">Evening Program</option>
                  </select>
                </div>

                <div className="form-group">
                  <label className="form-label">
                    High School Grades <span className="required">*</span>
                  </label>
                  <input
                    type="number"
                    name="highSchoolGrades"
                    value={formData.highSchoolGrades}
                    onChange={handleChange}
                    className="form-input"
                    min="0"
                    max="100"
                    required
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Sponsorship Details <span className="required">*</span>
                  </label>
                  <select
                    name="sponsorshipDetails"
                    value={formData.sponsorshipDetails}
                    onChange={handleChange}
                    className="form-input"
                    required
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

                <div className="form-group full-width">
                  <label className="form-label">
                    Courses Studied in Secondary
                  </label>
                  <input
                    type="text"
                    name="coursesStudiedInSecondary"
                    value={formData.coursesStudiedInSecondary}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                  />
                </div>

                <div className="form-group">
                  <label className="form-label">
                    Have Job <span className="required">*</span>
                  </label>
                  <select
                    name="haveJob"
                    value={formData.haveJob}
                    onChange={handleChange}
                    className="form-input"
                    required
                  >
                    <option value="">Select Option</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                    <option value="Part-time">Part-time</option>
                    <option value="Internship">Internship</option>
                    <option value="Volunteer">Volunteer</option>
                  </select>
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

                <div className="form-group">
                  <label className="form-label">Desired Faculty</label>
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

                <div className="form-group">
                  <label className="form-label">Desired Department</label>
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
          )}

          {/* Experience & Skills Tab */}
          {activeTab === 'experience' && (
            <div className="form-section">
              <h3 className="section-title">Experience & Skills</h3>
              
              {/* Skills Section */}
              <div className="dynamic-section">
                <div className="section-header">
                  <h4 className="subsection-title">Skills</h4>
                  <button type="button" onClick={addSkill} className="add-btn">
                    + Add Skill
                  </button>
                </div>
                
                {skills.map((skill, index) => (
                  <div key={index} className="dynamic-item">
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="Skill name"
                        value={skill.skillName}
                        onChange={(e) => updateSkill(index, 'skillName', e.target.value)}
                        className="form-input"
                      />
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
                      <button
                        type="button"
                        onClick={() => removeSkill(index)}
                        className="remove-btn"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Languages Section */}
              <div className="dynamic-section">
                <div className="section-header">
                  <h4 className="subsection-title">Languages Spoken</h4>
                  <button type="button" onClick={addLanguage} className="add-btn">
                    + Add Language
                  </button>
                </div>
                
                {languagesSpoken.map((language, index) => (
                  <div key={index} className="dynamic-item">
                    <div className="form-row">
                      <input
                        type="text"
                        placeholder="Language"
                        value={language.language}
                        onChange={(e) => updateLanguage(index, 'language', e.target.value)}
                        className="form-input"
                      />
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
                      <button
                        type="button"
                        onClick={() => removeLanguage(index)}
                        className="remove-btn"
                      >
                        ✕
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Work Experience Section */}
              <div className="dynamic-section">
                <div className="section-header">
                  <h4 className="subsection-title">Work Experience</h4>
                  <button type="button" onClick={addWorkExperience} className="add-btn">
                    + Add Experience
                  </button>
                </div>
                
                {workExperience.map((exp, index) => (
                  <div key={index} className="dynamic-item work-experience-item">
                    <div className="form-grid">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Job Title"
                          value={exp.jobTitle}
                          onChange={(e) => updateWorkExperience(index, 'jobTitle', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Company"
                          value={exp.company}
                          onChange={(e) => updateWorkExperience(index, 'company', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          placeholder="Start Date"
                          value={exp.startDate}
                          onChange={(e) => updateWorkExperience(index, 'startDate', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="date"
                          placeholder="End Date"
                          value={exp.endDate}
                          onChange={(e) => updateWorkExperience(index, 'endDate', e.target.value)}
                          className="form-input"
                          disabled={exp.isCurrent}
                        />
                      </div>
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Duration (e.g., 2 years)"
                          value={exp.duration}
                          onChange={(e) => updateWorkExperience(index, 'duration', e.target.value)}
                          className="form-input"
                        />
                      </div>
                      <div className="form-group">
                        <label className="custom-checkbox">
                          <input
                            type="checkbox"
                            checked={exp.isCurrent}
                            onChange={(e) => updateWorkExperience(index, 'isCurrent', e.target.checked)}
                          />
                          <span className="checkbox-mark"></span>
                          <span className="checkbox-label">Currently working here</span>
                        </label>
                      </div>
                    </div>
                    <div className="form-group full-width">
                      <textarea
                        placeholder="Job description and responsibilities"
                        value={exp.description}
                        onChange={(e) => updateWorkExperience(index, 'description', e.target.value)}
                        className="form-textarea"
                        rows="3"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeWorkExperience(index)}
                      className="remove-item-btn"
                    >
                      Remove Experience
                    </button>
                  </div>
                ))}
              </div>

              {/* Extracurricular Activities Section */}
              <div className="dynamic-section">
                <div className="section-header">
                  <h4 className="subsection-title">Extracurricular Activities</h4>
                  <button type="button" onClick={addExtracurricularActivity} className="add-btn">
                    + Add Activity
                  </button>
                </div>
                
                {extracurricularActivities.map((activity, index) => (
                  <div key={index} className="dynamic-item activity-item">
                    <div className="form-grid">
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Activity Name"
                          value={activity.activity}
                          onChange={(e) => updateExtracurricularActivity(index, 'activity', e.target.value)}
                          className="form-input"
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
                      <div className="form-group">
                        <input
                          type="text"
                          placeholder="Organization"
                          value={activity.organization}
                          onChange={(e) => updateExtracurricularActivity(index, 'organization', e.target.value)}
                          className="form-input"
                        />
                      </div>
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
                    <div className="form-group full-width">
                      <textarea
                        placeholder="Description of activities and achievements"
                        value={activity.description}
                        onChange={(e) => updateExtracurricularActivity(index, 'description', e.target.value)}
                        className="form-textarea"
                        rows="3"
                      />
                    </div>
                    <button
                      type="button"
                      onClick={() => removeExtracurricularActivity(index)}
                      className="remove-item-btn"
                    >
                      Remove Activity
                    </button>
                  </div>
                ))}
              </div>

              {/* Hobbies and Interests */}
              <div className="form-grid">
                <div className="form-group full-width">
                  <label className="form-label">Hobbies</label>
                  <textarea
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    className="form-textarea"
                    placeholder="Tell us about your hobbies and what you enjoy doing in your free time"
                    rows="3"
                  />
                </div>

                <div className="form-group full-width">
                  <label className="form-label">Interests</label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    className="form-input"
                    placeholder="e.g., Technology, Sports, Music (separate with commas)"
                  />
                </div>
              </div>
            </div>
          )}

          {/* Goals & Contact Tab */}
          {activeTab === 'goals' && (
            <div className="form-section">
              <h3 className="section-title">Goals & Emergency Contact</h3>
              
              {/* Career Goals */}
              <div className="form-group full-width">
                <label className="form-label">
                  Career Goals <span className="required">*</span>
                </label>
                <textarea
                  name="careerGoals"
                  value={formData.careerGoals}
                  onChange={handleChange}
                  className="form-textarea"
                  placeholder="Describe your career aspirations and long-term goals"
                  rows="4"
                  required
                />
              </div>

              {/* Disability Information */}
              <div className="form-group">
                <label className="form-label">Disability Information</label>
                <select
                  name="disability"
                  value={formData.disability}
                  onChange={handleChange}
                  className="form-input"
                >
                  <option value="None">None</option>
                  <option value="Physical">Physical</option>
                  <option value="Visual">Visual</option>
                  <option value="Hearing">Hearing</option>
                  <option value="Learning">Learning</option>
                  <option value="Other">Other</option>
                  <option value="Prefer not to say">Prefer not to say</option>
                </select>
              </div>

              {/* Emergency Contact */}
              <div className="emergency-contact-section">
                <h4 className="subsection-title">Emergency Contact Information</h4>
                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      Contact Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      name="emergencyContact.name"
                      value={formData.emergencyContact.name}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Relationship <span className="required">*</span>
                    </label>
                    <select
                      name="emergencyContact.relationship"
                      value={formData.emergencyContact.relationship}
                      onChange={handleChange}
                      className="form-input"
                      required
                    >
                      <option value="">Select Relationship</option>
                      <option value="Parent">Parent</option>
                      <option value="Guardian">Guardian</option>
                      <option value="Spouse">Spouse</option>
                      <option value="Sibling">Sibling</option>
                      <option value="Relative">Relative</option>
                      <option value="Friend">Friend</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Phone Number <span className="required">*</span>
                    </label>
                    <input
                      type="tel"
                      name="emergencyContact.phoneNumber"
                      value={formData.emergencyContact.phoneNumber}
                      onChange={handleChange}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="emergencyContact.email"
                      value={formData.emergencyContact.email}
                      onChange={handleChange}
                      className="form-input"
                    />
                  </div>
                </div>
              </div>

              {/* Documents Upload Section */}
              <div className="documents-upload-section">
                <h4 className="subsection-title">Documents</h4>
                
                {/* Existing Documents */}
                {existingDocuments && existingDocuments.length > 0 && (
                  <div className="existing-documents">
                    <h5>Current Documents</h5>
                    <div className="documents-list">
                      {existingDocuments.map((doc, index) => (
                        <div key={index} className="document-item">
                          <div className="document-info">
                            <span className="document-icon">📄</span>
                            <span className="document-name">{doc.originalName}</span>
                            <span className="document-size">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeExistingDocument(index)}
                            className="remove-document-btn"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* New Documents */}
                {documents && documents.length > 0 && (
                  <div className="new-documents">
                    <h5>New Documents to Upload</h5>
                    <div className="documents-list">
                      {documents.map((doc, index) => (
                        <div key={index} className="document-item new-document">
                          <div className="document-info">
                            <span className="document-icon">📄</span>
                            <span className="document-name">{doc.name}</span>
                            <span className="document-size">
                              {(doc.size / 1024 / 1024).toFixed(2)} MB
                            </span>
                          </div>
                          <button
                            type="button"
                            onClick={() => removeDocument(index)}
                            className="remove-document-btn"
                          >
                            Remove
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Upload New Documents */}
                <div className="upload-documents">
                  <button
                    type="button"
                    onClick={() => documentInputRef.current?.click()}
                    className="upload-btn"
                    disabled={documents.length >= 5}
                  >
                    📎 Upload Documents
                  </button>
                  <input
                    ref={documentInputRef}
                    type="file"
                    multiple
                    accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                    onChange={handleDocumentUpload}
                    style={{ display: 'none' }}
                  />
                  <p className="upload-info">
                    Supported formats: PDF, DOC, DOCX, JPG, PNG. Maximum 5MB per file, 5 files total.
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Form Actions */}
        <div className="form-actions">
          <button onClick={handleCancel} className="cancel-btn secondary">
            Cancel Changes
          </button>
          <button 
            onClick={handleSubmit} 
            disabled={saving}
            className={`save-btn primary ${saving ? 'saving' : ''}`}
          >
            {saving ? (
              <>
                <span className="spinner"></span>
                Saving Profile...
              </>
            ) : (
              'Save All Changes'
            )}
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;