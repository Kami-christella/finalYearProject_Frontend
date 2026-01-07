// //studentProfile.jsx
// import React, { useState, useRef } from "react";
// import { Notify } from "notiflix";
// import "./styles/StudentProfile.css";
// import { useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';

// const COUNTRIES = [
//   "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
//   "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
//   "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
//   "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
//   "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
//   "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
//   "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
//   "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica",
//   "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
//   "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
//   "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
//   "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
//   "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
//   "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
//   "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
//   "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
//   "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
//   "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
//   "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
//   "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
//   "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
//   "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
//   "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
//   "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
//   "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
//   "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
//   "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
//   "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
//   "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
//   "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
//   "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
//   "Yemen", "Zambia", "Zimbabwe"
// ];

// const SECONDARY_COURSES = [
//   // Core Subjects
//   "Mathematics", "Physics", "Chemistry", "Biology", "English Language",
//   "Kinyarwanda", "French", "History", "Geography", "Computer Science", "Economics",
//   "Literature","Software Engineering","Networks and Communication",
//    "Music","Entrepreneurship", "Electronics and Telecommunication",
  
// ];

// const HOBBIES_OPTIONS = [
//   // Creative Arts
//   "Reading", "Writing", "Poetry", "Drawing", "Painting", "Photography", 
//   "Graphic Design", "Digital Art", "Sculpture", "Crafts", "Jewelry Making",
  
//   // Music & Performance
//   "Playing Musical Instruments", "Singing", "Dancing", "Theater", "Acting",
//   "Stand-up Comedy", "DJ-ing", "Music Production",
  
//   // Sports & Fitness
//   "Football", "Basketball", "Tennis", "Swimming", "Running", "Cycling",
//   "Gym/Fitness", "Yoga", "Martial Arts", "Boxing", "Hiking", "Rock Climbing",
//   "Skateboarding", "Volleyball", "Baseball", "Cricket",
  
//   // Technology
//   "Programming", "Web Development", "Gaming", "Video Editing", "3D Modeling",
//   "Robotics", "Electronics", "App Development",
  
//   // Outdoor Activities
//   "Camping", "Fishing", "Gardening", "Bird Watching", "Nature Photography",
//   "Traveling", "Adventure Sports",
  
//   // Social & Community
//   "Volunteering", "Community Service", "Mentoring", "Public Speaking",
//   "Event Planning", "Networking",
  
//   // Learning & Skills
//   "Learning Languages", "Cooking", "Baking", "Fashion Design", "Interior Design",
//   "Collecting", "Board Games", "Chess", "Puzzles", "Meditation"
// ];

// const SKILLS_OPTIONS = [
//   // Programming & Technology
//   "JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Swift", "Kotlin",
//   "React", "Angular", "Vue.js", "Node.js", "Django", "Spring", "Laravel",
//   "HTML/CSS", "SQL", "MongoDB", "PostgreSQL", "MySQL", "Git", "Docker",
//   "AWS", "Azure", "Google Cloud", "Linux", "Windows Server",
  
//   // Design & Creative
//   "Adobe Photoshop", "Adobe Illustrator", "Figma", "Sketch", "InDesign",
//   "Video Editing", "3D Modeling", "Animation", "UI/UX Design", "Graphic Design",
//   "Web Design", "Logo Design", "Typography", "Color Theory",
  
//   // Business & Management
//   "Project Management", "Leadership", "Team Management", "Strategic Planning",
//   "Business Analysis", "Data Analysis", "Financial Analysis", "Marketing",
//   "Sales", "Customer Service", "Negotiation", "Presentation Skills",
//   "Microsoft Excel", "PowerBI", "Tableau", "CRM Software",
  
//   // Communication & Languages
//   "Public Speaking", "Writing", "Content Creation", "Social Media Management",
//   "SEO", "Digital Marketing", "Email Marketing", "Copywriting",
//   "Technical Writing", "Translation", "Interpretation",
  
//   // Healthcare & Sciences
//   "Patient Care", "Medical Research", "Laboratory Skills", "Data Collection",
//   "Statistical Analysis", "Research Methods", "Clinical Skills",
  
//   // Other Professional Skills
//   "Accounting", "Bookkeeping", "Legal Research", "Teaching", "Training",
//   "Event Planning", "Time Management", "Problem Solving", "Critical Thinking",
//   "Attention to Detail", "Multitasking", "Organization"
// ];

// const LANGUAGES_OPTIONS = [
//   "English", "French", "Kinyarwanda", "Swahili", "Spanish", "Portuguese",
//   "German", "Italian", "Dutch", "Russian", "Chinese (Mandarin)", "Japanese",
//   "Korean", "Arabic", "Hindi", "Urdu", "Bengali", "Tamil", "Telugu",
//   "Gujarati", "Marathi", "Punjabi", "Thai", "Vietnamese", "Indonesian",
//   "Malay", "Filipino", "Turkish", "Hebrew", "Persian", "Greek",
//   "Polish", "Czech", "Hungarian", "Romanian", "Bulgarian", "Croatian",
//   "Serbian", "Slovak", "Slovenian", "Estonian", "Latvian", "Lithuanian",
//   "Finnish", "Swedish", "Norwegian", "Danish", "Icelandic", "Irish",
//   "Welsh", "Scottish Gaelic", "Catalan", "Basque", "Galician"
// ];

// const INTERESTS_OPTIONS = [
//   // Technology & Science
//   "Artificial Intelligence", "Machine Learning", "Data Science", "Cybersecurity",
//   "Web Development", "Mobile Development", "Blockchain", "Internet of Things",
//   "Biotechnology", "Environmental Science", "Space Technology", "Renewable Energy",
  
//   // Business & Finance
//   "Entrepreneurship", "Business Management", "Marketing", "Digital Marketing",
//   "E-commerce", "Investment", "Banking", "Economics", "International Trade",
//   "Project Management", "Human Resources",
  
//   // Healthcare & Medicine
//   "Public Health", "Nursing", "Medical Research", "Mental Health", "Nutrition",
//   "Physical Therapy", "Pharmaceutical Sciences", "Healthcare Technology",
  
//   // Education & Social Sciences
//   "Education Technology", "Child Development", "Psychology", "Sociology",
//   "Political Science", "International Relations", "Social Work", "Philosophy",
  
//   // Arts & Media
//   "Journalism", "Content Creation", "Film Making", "Animation", "Game Design",
//   "Creative Writing", "Fashion", "Architecture", "Museum Studies",
  
//   // Environment & Sustainability
//   "Climate Change", "Sustainable Development", "Conservation", "Green Technology",
//   "Urban Planning", "Agriculture", "Food Security",
  
//   // Culture & Languages
//   "Cultural Studies", "Language Learning", "Translation", "Travel", "History",
//   "Anthropology", "Religious Studies"
// ];


// const StudentProfile = () => {

//   const navigate = useNavigate();

//   useEffect(() => {
//     const checkAuth = () => {
//       const token = localStorage.getItem('token');
//       const user = localStorage.getItem('user');
      
//       if (!token || !user) {
//         Notify.warning('Please log in to access this page');
//         navigate('/'); // Redirect to login page
//         return;
//       }
      
//       // Optional: Verify token is not expired
//       try {
//         const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
//         if (tokenData.exp * 1000 < Date.now()) {
//           localStorage.removeItem('token');
//           localStorage.removeItem('user');
//           Notify.failure('Session expired. Please log in again.');
//           navigate('/');
//           return;
//         }
//       } catch (error) {
//         // Invalid token format
//         localStorage.removeItem('token');
//         localStorage.removeItem('user');
//         Notify.failure('Invalid session. Please log in again.');
//         navigate('/');
//         return;
//       }
//     };

//     checkAuth();
//   }, [navigate]);
  
//   const [formData, setFormData] = useState({
//     nationality: "",
//     dateOfBirth: "",
//     age: "",
//     gender: "",
//     country: "",
//     phoneNumber: "",
//     studentType: "Undergraduate",
//     currentAcademicLevel: "",
//     studentProgram: "",
//     maritalStatus: "",
//     yourReligion: "",
//     sponsorshipDetails: "",
//     highSchoolGrades: "",
//     // coursesStudiedInSecondary: "",
//     haveTwoPrincipalPasses: false,
//     // Transfer Student Fields
//     transferStudent: false,
//     previousInstitution: "",
//     overallGradePreviousUniversity: "",
//     disability: "None",
//     haveJob: "",
//     // hobbies: "",
//     // interests: "",
//     desiredFaculty: "",
//     desiredDepartment: "",
//     careerGoals: "",
//     emergencyContact: {
//       name: "",
//       relationship: "",
//       phoneNumber: "",
//       email: "",
//     },
//   });

//   // Separate state for complex arrays
//   const [workExperience, setWorkExperience] = useState([]);
//   const [extracurricularActivities, setExtracurricularActivities] = useState(
//     []
//   );
//   const [skills, setSkills] = useState([]);
//   const [languagesSpoken, setLanguagesSpoken] = useState([]);
//   // Add these state variables with your other useState declarations
// const [selectedHobbies, setSelectedHobbies] = useState([]);
// const [selectedInterests, setSelectedInterests] = useState([]);
//   const [
//     coursesStudiedPreviousUniversity,
//     setCoursesStudiedPreviousUniversity,
//   ] = useState([]);
//   const [equivalentCourses, setEquivalentCourses] = useState([]);
// const [coursesStudiedInSecondary, setCoursesStudiedInSecondary] = useState([]);
//   const [profileImage, setProfileImage] = useState(null);
//   const [documents, setDocuments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");
//   const [success, setSuccess] = useState("");
//   const [step, setStep] = useState(1);
// const [hasCompletedMapping, setHasCompletedMapping] = useState(false);
//   // mapping

//   const [courseContentData, setCourseContentData] = useState([]);
// const [mappingResults, setMappingResults] = useState(null);
// const [mappingInProgress, setMappingInProgress] = useState(false);
// const [showMappingResults, setShowMappingResults] = useState(false);

//   const fileInputRef = useRef(null);
//   const cameraInputRef = useRef(null);
//   const documentInputRef = useRef(null);

//   // Handle form input changes
//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;

//     if (name.includes(".")) {
//       // Handle nested objects like emergencyContact
//       const [parent, child] = name.split(".");
//       setFormData((prev) => ({
//         ...prev,
//         [parent]: {
//           ...prev[parent],
//           [child]: value,
//         },
//       }));
//     } else {
//       setFormData((prev) => ({
//         ...prev,
//         [name]: type === "checkbox" ? checked : value,
//       }));
//     }
//   };

//   // Transfer Student Course Management
//   const addPreviousCourse = () => {
//     setCoursesStudiedPreviousUniversity([
//       ...coursesStudiedPreviousUniversity,
//       {
//         courseName: "",
//         courseCode: "",
//         credits: "",
//         grade: "",
//         contentStudied: [],
//          aucaCourseName: "",
//          //new fields
//       aucaCourseCode: "",
//       matchPercentage: 0,
//       creditTransferStatus: "",
//       aiReasoning: "",
//       matchingTopics: [],
//       missingTopics: [],
//       additionalTopics: []
//       },
//     ]);
//   };

 
//   const updatePreviousCourse = (index, field, value) => {
//   const updated = coursesStudiedPreviousUniversity.map((course, i) => {
//     if (i === index) {
//       if (field === 'contentStudied') {
//         // Handle content as comma-separated string, convert to array
//         const contentArray = typeof value === 'string' 
//           ? value.split(',').map(item => item.trim()).filter(item => item)
//           : value;
//         return { ...course, [field]: contentArray };
//       }
//       return { ...course, [field]: value };
//     }
//     return course;
//   });
//   setCoursesStudiedPreviousUniversity(updated);
// };

//   const removePreviousCourse = (index) => {
//     setCoursesStudiedPreviousUniversity(
//       coursesStudiedPreviousUniversity.filter((_, i) => i !== index)
//     );
//   };

//   // Add new function for AI course mapping

//   const handleAICourseMapping = async () => {
//   if (coursesStudiedPreviousUniversity.length === 0) {
//     Notify.failure('Please add at least one course before mapping');
//     return;
//   }

//   const invalidCourses = coursesStudiedPreviousUniversity.filter(course => 
//     !course.courseName || !course.contentStudied || course.contentStudied.length === 0
//   );

//   if (invalidCourses.length > 0) {
//     Notify.failure('Please provide course names and content for all courses before mapping');
//     return;
//   }

//   setMappingInProgress(true);
//   setError('');

//   try {
//     const token = localStorage.getItem("token");
    
//     const mappingData = coursesStudiedPreviousUniversity.map(course => ({
//       ...course,
//       university: formData.previousInstitution,
//       contentStudied: Array.isArray(course.contentStudied) 
//         ? course.contentStudied 
//         : course.contentStudied.split(',').map(item => item.trim()).filter(item => item)
//     }));

//     console.log('🚀 Sending course mapping request:', mappingData);

//     // CHANGE THIS LINE - Update the endpoint
//     const response = await fetch('http://localhost:5000/api/map-courses', {
//       method: 'POST',
//       headers: {
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}`
//       },
//       body: JSON.stringify({
//         courseContentData: mappingData,
//         targetProgram: 'BSc in Software Engineering'
//       })
//     });

//     const data = await response.json();
    
//     if (response.ok) {
//       // ADD THIS SECTION - Update courses with mapping results
//       const updatedCoursesWithMapping = coursesStudiedPreviousUniversity.map((course, index) => {
//         const mappingResult = data.data.mappingResults[index];
//         if (mappingResult) {
//           return {
//             ...course,
//             aucaCourseName: mappingResult.aucaCourseName || "",
//             aucaCourseCode: mappingResult.aucaCourseCode || "",
//             matchPercentage: mappingResult.matchPercentage || 0,
//             creditTransferStatus: mappingResult.creditTransferStatus || "",
//             aiReasoning: mappingResult.aiReasoning || "",
//             matchingTopics: mappingResult.matchingTopics || [],
//             missingTopics: mappingResult.missingTopics || [],
//             additionalTopics: mappingResult.additionalTopics || []
//           };
//         }
//         return course;
//       });

//       setCoursesStudiedPreviousUniversity(updatedCoursesWithMapping);
//       setMappingResults(data.data);
//       setShowMappingResults(true);
//       setHasCompletedMapping(true); // ADD THIS LINE
//       setCourseContentData(mappingData);
      
//       Notify.success(`🎉 Course mapping completed! ${data.data.summary.coursesAccepted} courses accepted for transfer`);
      
//     } else {
//       throw new Error(data.message || 'Course mapping failed');
//     }
//   } catch (error) {
//     console.error('❌ Course mapping error:', error);
//     setError('Course mapping failed: ' + error.message);
//     Notify.failure('Course mapping failed: ' + error.message);
//   } finally {
//     setMappingInProgress(false);
//   }
// };

// // Helper function to get status color
// const getStatusColor = (status) => {
//   switch (status) {
//     case 'full_credit':
//       return '#16a34a';
//     case 'partial_credit':
//       return '#d97706';
//     case 'no_credit':
//       return '#dc2626';
//     default:
//       return '#6b7280';
//   }
// };

// // Helper function to get status text
// const getStatusText = (status) => {
//   switch (status) {
//     case 'full_credit':
//       return 'Full Credit';
//     case 'partial_credit':
//       return 'Partial Credit';
//     case 'no_credit':
//       return 'No Credit';
//     default:
//       return 'Not Mapped';
//   }
// };

// // Add function to close mapping results
// const closeMappingResults = () => {
//   setShowMappingResults(false);
// };

//   // Equivalent Courses Management
//   const addEquivalentCourse = () => {
//     setEquivalentCourses([
//       ...equivalentCourses,
//       {
//         previousCourseName: "",
//         previousCourseCode: "",
//         aucaCourseName: "",
//         aucaCourseCode: "",
//         reasonForEquivalence: "",
//       },
//     ]);
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
//     setWorkExperience([
//       ...workExperience,
//       {
//         jobTitle: "",
//         company: "",
//         startDate: "",
//         endDate: "",
//         duration: "",
//         description: "",
//         isCurrent: false,
//       },
//     ]);
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
//     setExtracurricularActivities([
//       ...extracurricularActivities,
//       {
//         activity: "",
//         role: "",
//         organization: "",
//         startDate: "",
//         endDate: "",
//         description: "",
//       },
//     ]);
//   };

//   const updateExtracurricularActivity = (index, field, value) => {
//     const updated = extracurricularActivities.map((activity, i) =>
//       i === index ? { ...activity, [field]: value } : activity
//     );
//     setExtracurricularActivities(updated);
//   };

//   const removeExtracurricularActivity = (index) => {
//     setExtracurricularActivities(
//       extracurricularActivities.filter((_, i) => i !== index)
//     );
//   };

//   // Skills functions
//   // const addSkill = () => {
//   //   setSkills([
//   //     ...skills,
//   //     {
//   //       skillName: "",
//   //       proficiencyLevel: "Beginner",
//   //     },
//   //   ]);
//   // };

//   // const updateSkill = (index, field, value) => {
//   //   const updated = skills.map((skill, i) =>
//   //     i === index ? { ...skill, [field]: value } : skill
//   //   );
//   //   setSkills(updated);
//   // };

//   // const removeSkill = (index) => {
//   //   setSkills(skills.filter((_, i) => i !== index));
//   // };

//   // // Language functions
//   // const addLanguage = () => {
//   //   setLanguagesSpoken([
//   //     ...languagesSpoken,
//   //     {
//   //       language: "",
//   //       proficiency: "Basic",
//   //     },
//   //   ]);
//   // };

//   // const updateLanguage = (index, field, value) => {
//   //   const updated = languagesSpoken.map((lang, i) =>
//   //     i === index ? { ...lang, [field]: value } : lang
//   //   );
//   //   setLanguagesSpoken(updated);
//   // };

//   // const removeLanguage = (index) => {
//   //   setLanguagesSpoken(languagesSpoken.filter((_, i) => i !== index));
//   // };

//   // Handle profile image upload
//   const handleImageUpload = (e) => {
//     const file = e.target.files[0];
//     if (file) {
//       if (!file.type.startsWith("image/")) {
//         setError("Please select a valid image file");
//         return;
//       }
//       if (file.size > 5 * 1024 * 1024) {
//         setError("Image size must be less than 5MB");
//         return;
//       }
//       setProfileImage(file);
//       setError("");
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
//       setError("Maximum 5 documents allowed");
//       return;
//     }

//     const validFiles = files.filter((file) => {
//       if (file.size > 5 * 1024 * 1024) {
//         setError(`${file.name} is too large. Maximum 5MB per file.`);
//         return false;
//       }

//       const allowedTypes = [
//         "application/pdf",
//         "image/jpeg",
//         "image/jpg",
//         "image/png",
//         "application/msword",
//         "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
//       ];
//       if (!allowedTypes.includes(file.type)) {
//         setError(`${file.name} is not a supported file type.`);
//         return false;
//       }

//       return true;
//     });

//     setDocuments((prev) => [...prev, ...validFiles]);
//     setError("");
//   };

//   const removeDocument = (index) => {
//     setDocuments((prev) => prev.filter((_, i) => i !== index));
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//   e.preventDefault();
//   setLoading(true);
//   setError("");
//   setSuccess("");

//   try {
//     const token = localStorage.getItem("token");
//     if (!token) {
//       setError("Please log in to continue");
//       setLoading(false);
//       return;
//     }

//     // Create FormData for file uploads
//     const formDataToSend = new FormData();

//     // Add all basic form fields
//     Object.keys(formData).forEach((key) => {
//       if (key === "emergencyContact") {
//         formDataToSend.append(key, JSON.stringify(formData[key]));
//       } 
//       else if (key === "interests") {
//         const interestsArray = formData[key]
//           .split(",")
//           .map((item) => item.trim())
//           .filter((item) => item);
//         formDataToSend.append(key, JSON.stringify(interestsArray));
//       } 
//       else if (key === "coursesStudiedInSecondary") {
//         formDataToSend.append(key, formData[key]);
//       } 
//       // ✅ FIX: Convert boolean fields properly - handle both checked and unchecked
//       else if (key === "transferStudent" || key === "haveTwoPrincipalPasses") {
//         // Explicitly convert to boolean, then to string
//         const boolValue = formData[key] === true || formData[key] === 'true';
//         formDataToSend.append(key, boolValue ? 'true' : 'false'); // Always send 'true' or 'false'
//         console.log(`📝 ${key}:`, boolValue ? 'true' : 'false'); // Debug log
//       } 
//       else {
//         formDataToSend.append(key, formData[key] || '');
//       }
//     });

//     // ✅ IMPORTANT: Explicitly set transferStudent if not already set
//     if (!formDataToSend.has('transferStudent')) {
//       formDataToSend.append('transferStudent', 'false');
//       console.log('📝 transferStudent (default):', 'false');
//     }

//     // ✅ IMPORTANT: Explicitly set haveTwoPrincipalPasses if not already set
//     if (!formDataToSend.has('haveTwoPrincipalPasses')) {
//       formDataToSend.append('haveTwoPrincipalPasses', 'false');
//       console.log('📝 haveTwoPrincipalPasses (default):', 'false');
//     }

//     // Add hobbies, interests, and courses
//     formDataToSend.append("hobbies", JSON.stringify(selectedHobbies));
//     formDataToSend.append("interests", JSON.stringify(selectedInterests));
//     formDataToSend.append("coursesStudiedInSecondary", JSON.stringify(coursesStudiedInSecondary));

//     // Add complex arrays
//     formDataToSend.append("skills", JSON.stringify(skills));
//     formDataToSend.append("languagesSpoken", JSON.stringify(languagesSpoken));
//     formDataToSend.append("workExperience", JSON.stringify(workExperience));
//     formDataToSend.append("extracurricularActivities", JSON.stringify(extracurricularActivities));
//     formDataToSend.append("coursesStudiedPreviousUniversity", JSON.stringify(coursesStudiedPreviousUniversity));
//     formDataToSend.append("equivalentCourses", JSON.stringify(equivalentCourses));

//     // Add profile image
//     if (profileImage) {
//       formDataToSend.append("images", profileImage);
//     }

//     // Add documents
//     documents.forEach((doc) => {
//       formDataToSend.append("documents", doc);
//     });

//     // ✅ DEBUG: Log what we're sending
//     console.log('📤 Sending FormData:');
//     for (let [key, value] of formDataToSend.entries()) {
//       if (key === 'transferStudent' || key === 'haveTwoPrincipalPasses') {
//         console.log(`  ${key}:`, value);
//       }
//     }

//     const response = await fetch(
//       "http://localhost:5000/api/student/createprofile",
//       {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//         body: formDataToSend,
//       }
//     );

//     const data = await response.json();

//     if (response.ok) {
//       setSuccess(
//         "🎉 Profile created successfully! Redirecting to assessment..."
//       );
//       Notify.success(
//         "Profile created successfully! Redirecting to assessment..."
//       );
//       console.log("Profile created:", data);

//       setTimeout(() => {
//         window.location.href = "/dashboard/assessment";
//       }, 2000);
//     } else {
//       setError(data.message || "Failed to create profile");
//       Notify.failure(data.message || "Failed to create profile");
//       console.error("Profile creation failed:", data);
//     }
//   } catch (err) {
//     console.error("Submit error:", err);
//     setError("Network error. Please try again.");
//     Notify.failure("Network error. Please try again.");
//   } finally {
//     setLoading(false);
//   }
// };

//   // Faculty and department options
//   const facultyOptions = [
//     "Faculty of Business Administration",
//     "Faculty of Information Technology",
//     "Faculty of Health Sciences",
//     "Faculty of Medicine",
//     "Faculty in Education",
//     "Bachelor Of Theology",
//   ];

//   const getDepartmentOptions = (faculty) => {
//     const departments = {
//       "Faculty of Business Administration": [
//         "BBA In Accounting",
//         "BBA In Management",
//         "BBA in Finance",
//         "BBA in Marketing",
//         "MBA in Accounting",
//         "MBA In Management",
//         "MBA In Finance",
//         "MBA in Human Resource Management",
//         "MBA in Project Management",
//       ],
//       "Faculty of Information Technology": [
//         "BSc in Information Management",
//         "BSc in Networks and Communication Systems",
//         "BSc in Software Engineering",
//         "Master Of Science In Data Analytics",
//       ],
//       "Faculty of Health Sciences": [
//         "Bachelor of Science in Nursing",
//         "Bachelor of Science in Midwifery",
//       ],
//       "Faculty of Medicine": ["MD Of General Medicine"],
//       "Faculty in Education": [
//         "BA in Accounting and Information Technology",
//         "BA in English Language and Literature and French",
//         "BA In Geography and History",
//         "Master of Art in Educational Administration",
//         "Master of Art In Curriculum, Instructions and Supervision",
//       ],
//       "Bachelor Of Theology": ["Bachelor of Theology"],
//     };
//     return departments[faculty] || [];
//   };

//   const nextStep = () => setStep(step + 1);
//    const prevStep = () => setStep(step - 1);

  //  const nextStep = () => {
  //   if (validateStep(step)) {
  //     setStep(step + 1);
  //     window.scrollTo(0, 0); // Scroll to top when moving to next step
  //   }
  // };
 
  // const prevStep = () => {
  //   setStep(step - 1);
  //   window.scrollTo(0, 0);
  // };

  //studentProfile.jsx - FIXED VERSION
import React, { useState, useRef } from "react";
import { Notify } from "notiflix";
import "./styles/StudentProfile.css";
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const COUNTRIES = [
  "Afghanistan", "Albania", "Algeria", "Andorra", "Angola", "Antigua and Barbuda",
  "Argentina", "Armenia", "Australia", "Austria", "Azerbaijan", "Bahamas", "Bahrain",
  "Bangladesh", "Barbados", "Belarus", "Belgium", "Belize", "Benin", "Bhutan",
  "Bolivia", "Bosnia and Herzegovina", "Botswana", "Brazil", "Brunei", "Bulgaria",
  "Burkina Faso", "Burundi", "Cambodia", "Cameroon", "Canada", "Cape Verde",
  "Central African Republic", "Chad", "Chile", "China", "Colombia", "Comoros",
  "Congo", "Costa Rica", "Croatia", "Cuba", "Cyprus", "Czech Republic",
  "Democratic Republic of the Congo", "Denmark", "Djibouti", "Dominica",
  "Dominican Republic", "Ecuador", "Egypt", "El Salvador", "Equatorial Guinea",
  "Eritrea", "Estonia", "Ethiopia", "Fiji", "Finland", "France", "Gabon",
  "Gambia", "Georgia", "Germany", "Ghana", "Greece", "Grenada", "Guatemala",
  "Guinea", "Guinea-Bissau", "Guyana", "Haiti", "Honduras", "Hungary", "Iceland",
  "India", "Indonesia", "Iran", "Iraq", "Ireland", "Israel", "Italy", "Jamaica",
  "Japan", "Jordan", "Kazakhstan", "Kenya", "Kiribati", "Kuwait", "Kyrgyzstan",
  "Laos", "Latvia", "Lebanon", "Lesotho", "Liberia", "Libya", "Liechtenstein",
  "Lithuania", "Luxembourg", "Madagascar", "Malawi", "Malaysia", "Maldives",
  "Mali", "Malta", "Marshall Islands", "Mauritania", "Mauritius", "Mexico",
  "Micronesia", "Moldova", "Monaco", "Mongolia", "Montenegro", "Morocco",
  "Mozambique", "Myanmar", "Namibia", "Nauru", "Nepal", "Netherlands",
  "New Zealand", "Nicaragua", "Niger", "Nigeria", "North Korea", "North Macedonia",
  "Norway", "Oman", "Pakistan", "Palau", "Palestine", "Panama", "Papua New Guinea",
  "Paraguay", "Peru", "Philippines", "Poland", "Portugal", "Qatar", "Romania",
  "Russia", "Rwanda", "Saint Kitts and Nevis", "Saint Lucia",
  "Saint Vincent and the Grenadines", "Samoa", "San Marino", "Sao Tome and Principe",
  "Saudi Arabia", "Senegal", "Serbia", "Seychelles", "Sierra Leone", "Singapore",
  "Slovakia", "Slovenia", "Solomon Islands", "Somalia", "South Africa", "South Korea",
  "South Sudan", "Spain", "Sri Lanka", "Sudan", "Suriname", "Sweden", "Switzerland",
  "Syria", "Taiwan", "Tajikistan", "Tanzania", "Thailand", "Timor-Leste", "Togo",
  "Tonga", "Trinidad and Tobago", "Tunisia", "Turkey", "Turkmenistan", "Tuvalu",
  "Uganda", "Ukraine", "United Arab Emirates", "United Kingdom", "United States",
  "Uruguay", "Uzbekistan", "Vanuatu", "Vatican City", "Venezuela", "Vietnam",
  "Yemen", "Zambia", "Zimbabwe"
];

const SECONDARY_COURSES = [
  "Mathematics", "Physics", "Chemistry", "Biology", "English Language",
  "Kinyarwanda", "French", "History", "Geography", "Computer Science", "Economics",
  "Literature","Software Engineering","Networks and Communication","Languages","Education",
   "Music","Entrepreneurship", "Electronics and Telecommunication","Accounting","Telecommunication"
];

const HOBBIES_OPTIONS = [
  "Reading", "Writing", "Poetry", "Drawing", "Painting", "Photography", 
  "Graphic Design", "Digital Art", "Sculpture", "Crafts", "Jewelry Making",
  "Playing Musical Instruments", "Singing", "Dancing", "Theater", "Acting",
  "Stand-up Comedy", "DJ-ing", "Music Production",
  "Football", "Basketball", "Tennis", "Swimming", "Running", "Cycling",
  "Gym/Fitness", "Yoga", "Martial Arts", "Boxing", "Hiking", "Rock Climbing",
  "Skateboarding", "Volleyball", "Baseball", "Cricket",
  "Programming", "Web Development", "Gaming", "Video Editing", "3D Modeling",
  "Robotics", "Electronics", "App Development",
  "Camping", "Fishing", "Gardening", "Bird Watching", "Nature Photography",
  "Traveling", "Adventure Sports",
  "Volunteering", "Community Service", "Mentoring", "Public Speaking",
  "Event Planning", "Networking",
  "Learning Languages", "Cooking", "Baking", "Fashion Design", "Interior Design",
  "Collecting", "Board Games", "Chess", "Puzzles", "Meditation","Music"
];

const SKILLS_OPTIONS = [
  "JavaScript", "Python", "Java", "C++", "C#", "PHP", "Ruby", "Swift", "Kotlin",
  "React", "Angular", "Vue.js", "Node.js", "Django", "Spring", "Laravel",
  "HTML/CSS", "SQL", "MongoDB", "PostgreSQL", "MySQL", "Git", "Docker",
  "AWS", "Azure", "Google Cloud", "Linux", "Windows Server",
  "Adobe Photoshop", "Adobe Illustrator", "Figma", "Sketch", "InDesign",
  "Video Editing", "3D Modeling", "Animation", "UI/UX Design", "Graphic Design",
  "Web Design", "Logo Design", "Typography", "Color Theory",
  "Project Management", "Leadership", "Team Management", "Strategic Planning",
  "Business Analysis", "Data Analysis", "Financial Analysis", "Marketing",
  "Sales", "Customer Service", "Negotiation", "Presentation Skills",
  "Microsoft Excel", "PowerBI", "Tableau", "CRM Software",
  "Public Speaking", "Writing", "Content Creation", "Social Media Management",
  "SEO", "Digital Marketing", "Email Marketing", "Copywriting",
  "Technical Writing", "Translation", "Interpretation",
  "Patient Care", "Medical Research", "Laboratory Skills", "Data Collection",
  "Statistical Analysis", "Research Methods", "Clinical Skills",
  "Accounting", "Bookkeeping", "Legal Research", "Teaching", "Training",
  "Event Planning", "Time Management", "Problem Solving", "Critical Thinking",
  "Attention to Detail", "Multitasking", "Organization"
];

const LANGUAGES_OPTIONS = [
  "English", "French", "Kinyarwanda", "Swahili", "Spanish", "Portuguese",
  "German", "Italian", "Dutch", "Russian", "Chinese (Mandarin)", "Japanese",
  "Korean", "Arabic", "Hindi", "Urdu", "Bengali", "Tamil", "Telugu",
  "Gujarati", "Marathi", "Punjabi", "Thai", "Vietnamese", "Indonesian",
  "Malay", "Filipino", "Turkish", "Hebrew", "Persian", "Greek",
  "Polish", "Czech", "Hungarian", "Romanian", "Bulgarian", "Croatian",
  "Serbian", "Slovak", "Slovenian", "Estonian", "Latvian", "Lithuanian",
  "Finnish", "Swedish", "Norwegian", "Danish", "Icelandic", "Irish",
  "Welsh", "Scottish Gaelic", "Catalan", "Basque", "Galician","Other African Language"
];

const INTERESTS_OPTIONS = [
  "Artificial Intelligence", "Machine Learning", "Data Science", "Cybersecurity",
  "Web Development", "Mobile Development", "Blockchain", "Internet of Things",
  "Biotechnology", "Environmental Science", "Space Technology", "Renewable Energy",
  "Entrepreneurship", "Business Management", "Marketing", "Digital Marketing",
  "E-commerce", "Investment", "Banking", "Economics", "International Trade",
  "Project Management", "Human Resources",
  "Public Health", "Nursing", "Medical Research", "Mental Health", "Nutrition",
  "Physical Therapy", "Pharmaceutical Sciences", "Healthcare Technology",
  "Education Technology", "Child Development", "Psychology", "Sociology",
  "Political Science", "International Relations", "Social Work", "Philosophy",
  "Journalism", "Content Creation", "Film Making", "Animation", "Game Design",
  "Creative Writing", "Fashion", "Architecture", "Museum Studies",
  "Climate Change", "Sustainable Development", "Conservation", "Green Technology",
  "Urban Planning", "Agriculture", "Food Security",
  "Cultural Studies", "Language Learning", "Translation", "Travel", "History",
  "Anthropology", "Religious Studies", "Accounting", "Entrepreneurship", "Arts", "Music",
  "Programming", "Marketing","Technology", "Computer Science"
];

const StudentProfile = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        Notify.warning('Please log in to access this page');
        navigate('/');
        return;
      }
      
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1]));
        if (tokenData.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          Notify.failure('Session expired. Please log in again.');
          navigate('/');
          return;
        }
      } catch (error) {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        Notify.failure('Invalid session. Please log in again.');
        navigate('/');
        return;
      }
    };

    checkAuth();
  }, [navigate]);
  
  const [formData, setFormData] = useState({
    nationality: "",
    dateOfBirth: "",
    age: "",
    gender: "",
    country: "",
    phoneNumber: "",
    studentType: "Undergraduate",
    currentAcademicLevel: "",
    studentProgram: "",
    maritalStatus: "",
    yourReligion: "",
    sponsorshipDetails: "",
    highSchoolGrades: "",
    haveTwoPrincipalPasses: false,
    transferStudent: false,
    previousInstitution: "",
    overallGradePreviousUniversity: "",
    disability: "None",
    haveJob: "",
    desiredFaculty: "",
    desiredDepartment: "",
    careerGoals: "",
    emergencyContact: {
      name: "",
      relationship: "",
      phoneNumber: "",
      email: "",
    },
  });

  // const [workExperience, setWorkExperience] = useState([]);
  const [extracurricularActivities, setExtracurricularActivities] = useState([""]);
  const [skills, setSkills] = useState([]);
  const [languagesSpoken, setLanguagesSpoken] = useState([]);
  const [selectedHobbies, setSelectedHobbies] = useState([]);
  const [selectedInterests, setSelectedInterests] = useState([]);
  const [coursesStudiedPreviousUniversity, setCoursesStudiedPreviousUniversity] = useState([]);
  const [equivalentCourses, setEquivalentCourses] = useState([]);
  const [coursesStudiedInSecondary, setCoursesStudiedInSecondary] = useState([]);
  const [profileImage, setProfileImage] = useState(null);
  const [documents, setDocuments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [step, setStep] = useState(1);
  const [hasCompletedMapping, setHasCompletedMapping] = useState(false);
  const [courseContentData, setCourseContentData] = useState([]);
  const [mappingResults, setMappingResults] = useState(null);
  const [mappingInProgress, setMappingInProgress] = useState(false);
  const [showMappingResults, setShowMappingResults] = useState(false);

  const fileInputRef = useRef(null);
  const cameraInputRef = useRef(null);
  const documentInputRef = useRef(null);

  // ✅ VALIDATION FUNCTION FOR EACH STEP
  const validateStep = (currentStep) => {
    let missingFields = [];

    switch (currentStep) {
      case 1: // Personal Information
        if (!formData.nationality) missingFields.push("Nationality");
        if (!formData.dateOfBirth) missingFields.push("Date of Birth");
        // if (!formData.age) missingFields.push("Age");
        if (!formData.gender) missingFields.push("Gender");
        if (!formData.country) missingFields.push("Country");
        if (!formData.phoneNumber) missingFields.push("Phone Number");
        if (!formData.maritalStatus) missingFields.push("Marital Status");
        if (!formData.yourReligion) missingFields.push("Religion");
        break;

      case 2: // Academic Information
        if (!formData.currentAcademicLevel) missingFields.push("Current Academic Level");
        if (!formData.studentProgram) missingFields.push("Student Program");
        if (!formData.highSchoolGrades) missingFields.push("High School Grades");
        if (!formData.sponsorshipDetails) missingFields.push("Sponsorship Details");
        if (coursesStudiedInSecondary.length === 0) missingFields.push("Courses Studied in Secondary");
        if (!formData.haveJob) missingFields.push("Have Job");
        
        // Transfer student validation
        if (formData.transferStudent) {
          if (!formData.previousInstitution) missingFields.push("Previous Institution");
          if (!formData.overallGradePreviousUniversity) missingFields.push("Overall Grade at Previous University");
        }
        break;

      case 3: // Skills & Experience
    {
        if (selectedHobbies.length === 0) missingFields.push("Hobbies");
        if (selectedInterests.length === 0) missingFields.push("Interests");
        if (skills.length === 0) missingFields.push("Skills");
        if (languagesSpoken.length === 0) missingFields.push("Languages Spoken");
        if (!formData.desiredFaculty) missingFields.push("Desired Faculty");
      if (!formData.desiredDepartment) missingFields.push("Desired Department");
      if (!formData.careerGoals || formData.careerGoals.trim() === "") missingFields.push("Career Goals");
       // Validate extracurricular activities (at least one non-empty)
      const validActivities = extracurricularActivities.filter(activity => activity.trim() !== "");
      if (validActivities.length === 0) missingFields.push("At least one Extracurricular Activity");
        break;
}
      case 4: // Documents & Emergency Contact
        if (!profileImage) missingFields.push("Profile Image");
        if (documents.length <=2) missingFields.push("Supporting Documents (at least three document required)");
        if (!formData.emergencyContact.name) missingFields.push("Emergency Contact Name");
        if (!formData.emergencyContact.relationship) missingFields.push("Emergency Contact Relationship");
        if (!formData.emergencyContact.phoneNumber) missingFields.push("Emergency Contact Phone Number");
        //  if (!formData.disability) missingFields.push("Disability Status");
        break;

      default:
        break;
    }

    if (missingFields.length > 0) {
      Notify.failure(`Please fill in the following required fields: ${missingFields.join(", ")}`);
      setError(`Missing required fields: ${missingFields.join(", ")}`);
      return false;
    }

    setError(""); // Clear error if validation passes
    return true;
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: type === "checkbox" ? checked : value,
      }));
    }
  };

  const addPreviousCourse = () => {
    setCoursesStudiedPreviousUniversity([
      ...coursesStudiedPreviousUniversity,
      {
        courseName: "",
        courseCode: "",
        credits: "",
        grade: "",
        contentStudied: [],
        aucaCourseName: "",
        aucaCourseCode: "",
        matchPercentage: 0,
        creditTransferStatus: "",
        aiReasoning: "",
        matchingTopics: [],
        missingTopics: [],
        additionalTopics: []
      },
    ]);
  };

  const updatePreviousCourse = (index, field, value) => {
    const updated = coursesStudiedPreviousUniversity.map((course, i) => {
      if (i === index) {
        if (field === 'contentStudied') {
          const contentArray = typeof value === 'string' 
            ? value.split(',').map(item => item.trim()).filter(item => item)
            : value;
          return { ...course, [field]: contentArray };
        }
        return { ...course, [field]: value };
      }
      return course;
    });
    setCoursesStudiedPreviousUniversity(updated);
  };

  const removePreviousCourse = (index) => {
    setCoursesStudiedPreviousUniversity(
      coursesStudiedPreviousUniversity.filter((_, i) => i !== index)
    );
  };

  const handleAICourseMapping = async () => {
    if (coursesStudiedPreviousUniversity.length === 0) {
      Notify.failure('Please add at least one course before mapping');
      return;
    }

    const invalidCourses = coursesStudiedPreviousUniversity.filter(course => 
      !course.courseName || !course.contentStudied || course.contentStudied.length === 0
    );

    if (invalidCourses.length > 0) {
      Notify.failure('Please provide course names and content for all courses before mapping');
      return;
    }

    setMappingInProgress(true);
    setError('');

    try {
      const token = localStorage.getItem("token");
      
      const mappingData = coursesStudiedPreviousUniversity.map(course => ({
        ...course,
        university: formData.previousInstitution,
        contentStudied: Array.isArray(course.contentStudied) 
          ? course.contentStudied 
          : course.contentStudied.split(',').map(item => item.trim()).filter(item => item)
      }));

      const response = await fetch('http://localhost:5000/api/map-courses', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          courseContentData: mappingData,
          targetProgram: 'BSc in Software Engineering'
        })
      });

      const data = await response.json();
      
      if (response.ok) {
        const updatedCoursesWithMapping = coursesStudiedPreviousUniversity.map((course, index) => {
          const mappingResult = data.data.mappingResults[index];
          if (mappingResult) {
            return {
              ...course,
              aucaCourseName: mappingResult.aucaCourseName || "",
              aucaCourseCode: mappingResult.aucaCourseCode || "",
              matchPercentage: mappingResult.matchPercentage || 0,
              creditTransferStatus: mappingResult.creditTransferStatus || "",
              aiReasoning: mappingResult.aiReasoning || "",
              matchingTopics: mappingResult.matchingTopics || [],
              missingTopics: mappingResult.missingTopics || [],
              additionalTopics: mappingResult.additionalTopics || []
            };
          }
          return course;
        });

        setCoursesStudiedPreviousUniversity(updatedCoursesWithMapping);
        setMappingResults(data.data);
        setShowMappingResults(true);
        setHasCompletedMapping(true);
        setCourseContentData(mappingData);
        
        Notify.success(`🎉 Course mapping completed! ${data.data.summary.coursesAccepted} courses accepted for transfer`);
      } else {
        throw new Error(data.message || 'Course mapping failed');
      }
    } catch (error) {
      console.error('❌ Course mapping error:', error);
      setError('Course mapping failed: ' + error.message);
      Notify.failure('Course mapping failed: ' + error.message);
    } finally {
      setMappingInProgress(false);
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'full_credit': return '#16a34a';
      case 'partial_credit': return '#d97706';
      case 'no_credit': return '#dc2626';
      default: return '#6b7280';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'full_credit': return 'Full Credit';
      case 'partial_credit': return 'Partial Credit';
      case 'no_credit': return 'No Credit';
      default: return 'Not Mapped';
    }
  };

  const closeMappingResults = () => {
    setShowMappingResults(false);
  };

  const addEquivalentCourse = () => {
    setEquivalentCourses([
      ...equivalentCourses,
      {
        previousCourseName: "",
        previousCourseCode: "",
        aucaCourseName: "",
        aucaCourseCode: "",
        reasonForEquivalence: "",
      },
    ]);
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

  // const addWorkExperience = () => {
  //   setWorkExperience([
  //     ...workExperience,
  //     {
  //       jobTitle: "",
  //       company: "",
  //       startDate: "",
  //       endDate: "",
  //       duration: "",
  //       description: "",
  //       isCurrent: false,
  //     },
  //   ]);
  // };

  // const updateWorkExperience = (index, field, value) => {
  //   const updated = workExperience.map((exp, i) =>
  //     i === index ? { ...exp, [field]: value } : exp
  //   );
  //   setWorkExperience(updated);
  // };

  // const removeWorkExperience = (index) => {
  //   setWorkExperience(workExperience.filter((_, i) => i !== index));
  // };

  // const addExtracurricularActivity = () => {
  //   setExtracurricularActivities([
  //     ...extracurricularActivities,
  //     {
  //       activity: "",
  //       role: "",
  //       organization: "",
  //       startDate: "",
  //       endDate: "",
  //       description: "",
  //     },
  //   ]);
  // };

  const addExtracurricularActivity = () => {
  if (extracurricularActivities.length < 3) {
    setExtracurricularActivities([...extracurricularActivities, ""]);
  }
};

  // const updateExtracurricularActivity = (index, field, value) => {
  //   const updated = extracurricularActivities.map((activity, i) =>
  //     i === index ? { ...activity, [field]: value } : activity
  //   );
  //   setExtracurricularActivities(updated);
  // };

  const updateExtracurricularActivity = (index, value) => {
  const updated = [...extracurricularActivities];
  updated[index] = value;
  setExtracurricularActivities(updated);
};

  // const removeExtracurricularActivity = (index) => {
  //   setExtracurricularActivities(
  //     extracurricularActivities.filter((_, i) => i !== index)
  //   );
  // };

  const removeExtracurricularActivity = (index) => {
  setExtracurricularActivities(
    extracurricularActivities.filter((_, i) => i !== index)
  );
};


  const handleImageUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.startsWith("image/")) {
        setError("Please select a valid image file");
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        setError("Image size must be less than 5MB");
        return;
      }
      setProfileImage(file);
      setError("");
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
      setError("Maximum 5 documents allowed");
      return;
    }

    const validFiles = files.filter((file) => {
      if (file.size > 5 * 1024 * 1024) {
        setError(`${file.name} is too large. Maximum 5MB per file.`);
        return false;
      }

      const allowedTypes = [
        "application/pdf",
        "image/jpeg",
        "image/jpg",
        "image/png",
        "application/msword",
        "application/vnd.openxmlformats-officedocument.wordprocessingml.document",
      ];
      if (!allowedTypes.includes(file.type)) {
        setError(`${file.name} is not a supported file type.`);
        return false;
      }

      return true;
    });

    setDocuments((prev) => [...prev, ...validFiles]);
    setError("");
  };

  const removeDocument = (index) => {
    setDocuments((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // ✅ Validate step 4 before submitting
    if (!validateStep(4)) {
      return;
    }

    setLoading(true);
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("Please log in to continue");
        setLoading(false);
        return;
      }

      const formDataToSend = new FormData();

      Object.keys(formData).forEach((key) => {
        if (key === "emergencyContact") {
          formDataToSend.append(key, JSON.stringify(formData[key]));
        } 
        else if (key === "interests") {
          const interestsArray = formData[key]
            .split(",")
            .map((item) => item.trim())
            .filter((item) => item);
          formDataToSend.append(key, JSON.stringify(interestsArray));
        } 
        else if (key === "coursesStudiedInSecondary") {
          formDataToSend.append(key, formData[key]);
        } 
        else if (key === "transferStudent" || key === "haveTwoPrincipalPasses") {
          const boolValue = formData[key] === true || formData[key] === 'true';
          formDataToSend.append(key, boolValue ? 'true' : 'false');
        } 
        else {
          formDataToSend.append(key, formData[key] || '');
        }
      });

      if (!formDataToSend.has('transferStudent')) {
        formDataToSend.append('transferStudent', 'false');
      }

      if (!formDataToSend.has('haveTwoPrincipalPasses')) {
        formDataToSend.append('haveTwoPrincipalPasses', 'false');
      }

      formDataToSend.append("hobbies", JSON.stringify(selectedHobbies));
      formDataToSend.append("interests", JSON.stringify(selectedInterests));
      formDataToSend.append("coursesStudiedInSecondary", JSON.stringify(coursesStudiedInSecondary));
      formDataToSend.append("skills", JSON.stringify(skills));
      formDataToSend.append("languagesSpoken", JSON.stringify(languagesSpoken));
      // formDataToSend.append("workExperience", JSON.stringify(workExperience));
      formDataToSend.append("extracurricularActivities", JSON.stringify(extracurricularActivities));
      formDataToSend.append("coursesStudiedPreviousUniversity", JSON.stringify(coursesStudiedPreviousUniversity));
      formDataToSend.append("equivalentCourses", JSON.stringify(equivalentCourses));

      if (profileImage) {
        formDataToSend.append("images", profileImage);
      }

      documents.forEach((doc) => {
        formDataToSend.append("documents", doc);
      });

      const response = await fetch(
        "http://localhost:5000/api/student/createprofile",
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
          },
          body: formDataToSend,
        }
      );

      const data = await response.json();

      if (response.ok) {
        setSuccess(
          "🎉 Profile created successfully! Redirecting to assessment..."
        );
        Notify.success(
          "Profile created successfully! Redirecting to assessment..."
        );

        setTimeout(() => {
          window.location.href = "/dashboard/assessment";
        }, 2000);
      } else {
        setError(data.message || "Failed to create profile");
        Notify.failure(data.message || "Failed to create profile");
      }
    } catch (err) {
      console.error("Submit error:", err);
      setError("Network error. Please try again.");
      Notify.failure("Network error. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const facultyOptions = [
    "Faculty of Business Administration",
    "Faculty of Information Technology",
    "Faculty of Health Sciences",
    "Faculty of Medicine",
    "Faculty in Education",
    "Bachelor Of Theology",
  ];

  const getDepartmentOptions = (faculty) => {
    const departments = {
      "Faculty of Business Administration": [
        "BBA In Accounting",
        "BBA In Management",
        "BBA in Finance",
        "BBA in Marketing",
        "MBA in Accounting",
        "MBA In Management",
        "MBA In Finance",
        "MBA in Human Resource Management",
        "MBA in Project Management",
      ],
      "Faculty of Information Technology": [
        "BSc in Information Management",
        "BSc in Networks and Communication Systems",
        "BSc in Software Engineering",
        "Master Of Science In Data Analytics",
      ],
      "Faculty of Health Sciences": [
        "Bachelor of Science in Nursing",
        "Bachelor of Science in Midwifery",
      ],
      "Faculty of Medicine": ["MD Of General Medicine"],
      "Faculty in Education": [
        "BA in Accounting and Information Technology",
        "BA in English Language and Literature and French",
        "BA In Geography and History",
        "Master of Art in Educational Administration",
        "Master of Art In Curriculum, Instructions and Supervision",
      ],
      "Bachelor Of Theology": ["Bachelor of Theology"],
    };
    return departments[faculty] || [];
  };

  // ✅ UPDATED NEXT STEP FUNCTION WITH VALIDATION
  const nextStep = () => {
    if (validateStep(step)) {
      setStep(step + 1);
      window.scrollTo(0, 0); // Scroll to top when moving to next step
    }
  };

  const prevStep = () => {
    setStep(step - 1);
    window.scrollTo(0, 0);
  };

  // Component imports for multi-selects

  const CoursesMultiSelect = ({ selectedCourses, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredCourses = SECONDARY_COURSES.filter(course =>
    course.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedCourses.includes(course)
  );

  const handleCourseSelect = (course) => {
    const newCourses = [...selectedCourses, course];
    onChange(newCourses);
    setSearchTerm('');
  };

  const removeCourse = (courseToRemove) => {
    const newCourses = selectedCourses.filter(course => course !== courseToRemove);
    onChange(newCourses);
  };

  return (
    <div className="courses-multi-select" style={{ position: 'relative' }}>
      <div className="selected-courses" style={{
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        padding: '8px',
        backgroundColor: disabled ? '#f9fafb' : 'white',
        minHeight: '42px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        alignItems: 'center',
        cursor: 'text'
      }}>
        {selectedCourses.map((course, index) => (
          <span key={index} style={{
            backgroundColor: '#1B3058',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {course}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeCourse(course)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                ×
              </button>
            )}
          </span>
        ))}
        
        {!disabled && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedCourses.length === 0 ? "Search and select courses..." : "Add more..."}
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              flex: 1,
              minWidth: '150px',
              fontSize: '14px'
            }}
          />
        )}
      </div>

      {isOpen && !disabled && (
        <div style={{
          position: 'absolute',
          top: '100%',
          left: 0,
          right: 0,
          maxHeight: '200px',
          overflowY: 'auto',
          backgroundColor: 'white',
          border: '1px solid #d1d5db',
          borderRadius: '6px',
          zIndex: 1000,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          marginTop: '2px'
        }}>
          {filteredCourses.length > 0 ? (
            filteredCourses.map((course) => (
              <div
                key={course}
                onClick={() => handleCourseSelect(course)}
                style={{
                  padding: '8px 12px',
                  cursor: 'pointer',
                  borderBottom: '1px solid #f3f4f6',
                  fontSize: '14px'
                }}
                onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
              >
                {course}
              </div>
            ))
          ) : (
            <div style={{ padding: '8px 12px', color: '#6b7280', fontSize: '14px' }}>
              {searchTerm ? 'No courses found' : 'All courses selected'}
            </div>
          )}
        </div>
      )}

      {isOpen && (
        <div 
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            zIndex: 999
          }}
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};
  // Add this component after your CoursesMultiSelect component
const HobbiesMultiSelect = ({ selectedHobbies, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredHobbies = HOBBIES_OPTIONS.filter(hobby =>
    hobby.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedHobbies.includes(hobby)
  );

  const handleHobbySelect = (hobby) => {
    const newHobbies = [...selectedHobbies, hobby];
    onChange(newHobbies);
    setSearchTerm('');
  };

  const removeHobby = (hobbyToRemove) => {
    const newHobbies = selectedHobbies.filter(hobby => hobby !== hobbyToRemove);
    onChange(newHobbies);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        padding: '8px',
        backgroundColor: disabled ? '#f9fafb' : 'white',
        minHeight: '42px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        alignItems: 'center',
        cursor: 'text'
      }}>
        {selectedHobbies.map((hobby, index) => (
          <span key={index} style={{
            backgroundColor: '#16a34a',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {hobby}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeHobby(hobby)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                ×
              </button>
            )}
          </span>
        ))}
        
        {!disabled && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedHobbies.length === 0 ? "Search and select hobbies..." : "Add more..."}
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              flex: 1,
              minWidth: '150px',
              fontSize: '14px'
            }}
          />
        )}
      </div>

      {isOpen && !disabled && (
        <>
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginTop: '2px'
          }}>
            {filteredHobbies.length > 0 ? (
              filteredHobbies.map((hobby) => (
                <div
                  key={hobby}
                  onClick={() => handleHobbySelect(hobby)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f3f4f6',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  {hobby}
                </div>
              ))
            ) : (
              <div style={{ padding: '8px 12px', color: '#6b7280', fontSize: '14px' }}>
                {searchTerm ? 'No hobbies found' : 'All hobbies selected'}
              </div>
            )}
          </div>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

const InterestsMultiSelect = ({ selectedInterests, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredInterests = INTERESTS_OPTIONS.filter(interest =>
    interest.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedInterests.includes(interest)
  );

  const handleInterestSelect = (interest) => {
    const newInterests = [...selectedInterests, interest];
    onChange(newInterests);
    setSearchTerm('');
  };

  const removeInterest = (interestToRemove) => {
    const newInterests = selectedInterests.filter(interest => interest !== interestToRemove);
    onChange(newInterests);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        padding: '8px',
        backgroundColor: disabled ? '#f9fafb' : 'white',
        minHeight: '42px',
        display: 'flex',
        flexWrap: 'wrap',
        gap: '4px',
        alignItems: 'center',
        cursor: 'text'
      }}>
        {selectedInterests.map((interest, index) => (
          <span key={index} style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '4px 8px',
            borderRadius: '12px',
            fontSize: '12px',
            display: 'flex',
            alignItems: 'center',
            gap: '4px'
          }}>
            {interest}
            {!disabled && (
              <button
                type="button"
                onClick={() => removeInterest(interest)}
                style={{
                  background: 'none',
                  border: 'none',
                  color: 'white',
                  cursor: 'pointer',
                  padding: '0',
                  fontSize: '14px',
                  fontWeight: 'bold'
                }}
              >
                ×
              </button>
            )}
          </span>
        ))}
        
        {!disabled && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedInterests.length === 0 ? "Search and select interests..." : "Add more..."}
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              flex: 1,
              minWidth: '150px',
              fontSize: '14px'
            }}
          />
        )}
      </div>

      {isOpen && !disabled && (
        <>
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginTop: '2px'
          }}>
            {filteredInterests.length > 0 ? (
              filteredInterests.map((interest) => (
                <div
                  key={interest}
                  onClick={() => handleInterestSelect(interest)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f3f4f6',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  {interest}
                </div>
              ))
            ) : (
              <div style={{ padding: '8px 12px', color: '#6b7280', fontSize: '14px' }}>
                {searchTerm ? 'No interests found' : 'All interests selected'}
              </div>
            )}
          </div>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

const SkillsMultiSelect = ({ selectedSkills, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredSkills = SKILLS_OPTIONS.filter(skill =>
    skill.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedSkills.some(selected => selected.skillName === skill)
  );

  const handleSkillSelect = (skill) => {
    const newSkill = {
      skillName: skill,
      proficiencyLevel: "Beginner"
    };
    const newSkills = [...selectedSkills, newSkill];
    onChange(newSkills);
    setSearchTerm('');
  };

  const removeSkill = (skillToRemove) => {
    const newSkills = selectedSkills.filter(skill => skill.skillName !== skillToRemove);
    onChange(newSkills);
  };

  const updateProficiency = (skillName, proficiency) => {
    const updatedSkills = selectedSkills.map(skill => 
      skill.skillName === skillName 
        ? { ...skill, proficiencyLevel: proficiency }
        : skill
    );
    onChange(updatedSkills);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        padding: '8px',
        backgroundColor: disabled ? '#f9fafb' : 'white',
        minHeight: '42px'
      }}>
        {/* Selected Skills */}
        {selectedSkills.map((skill, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
            padding: '6px',
            backgroundColor: '#f3f4f6',
            borderRadius: '6px'
          }}>
            <span style={{
              backgroundColor: '#3b82f6',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              flex: 1
            }}>
              {skill.skillName}
            </span>
            
            {!disabled && (
              <>
                <select
                  value={skill.proficiencyLevel}
                  onChange={(e) => updateProficiency(skill.skillName, e.target.value)}
                  style={{
                    padding: '2px 4px',
                    fontSize: '11px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px'
                  }}
                >
                  <option value="Beginner">Beginner</option>
                  <option value="Intermediate">Intermediate</option>
                  <option value="Advanced">Advanced</option>
                  <option value="Expert">Expert</option>
                </select>
                
                <button
                  type="button"
                  onClick={() => removeSkill(skill.skillName)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}
        
        {/* Search Input */}
        {!disabled && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedSkills.length === 0 ? "Search and select skills..." : "Add more skills..."}
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              width: '100%',
              fontSize: '14px'
            }}
          />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <>
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginTop: '2px'
          }}>
            {filteredSkills.length > 0 ? (
              filteredSkills.map((skill) => (
                <div
                  key={skill}
                  onClick={() => handleSkillSelect(skill)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f3f4f6',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  {skill}
                </div>
              ))
            ) : (
              <div style={{ padding: '8px 12px', color: '#6b7280', fontSize: '14px' }}>
                {searchTerm ? 'No skills found' : 'All skills selected'}
              </div>
            )}
          </div>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

const LanguagesMultiSelect = ({ selectedLanguages, onChange, disabled = false }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredLanguages = LANGUAGES_OPTIONS.filter(language =>
    language.toLowerCase().includes(searchTerm.toLowerCase()) &&
    !selectedLanguages.some(selected => selected.language === language)
  );

  const handleLanguageSelect = (language) => {
    const newLanguage = {
      language: language,
      proficiency: "Basic"
    };
    const newLanguages = [...selectedLanguages, newLanguage];
    onChange(newLanguages);
    setSearchTerm('');
  };

  const removeLanguage = (languageToRemove) => {
    const newLanguages = selectedLanguages.filter(lang => lang.language !== languageToRemove);
    onChange(newLanguages);
  };

  const updateProficiency = (languageName, proficiency) => {
    const updatedLanguages = selectedLanguages.map(lang => 
      lang.language === languageName 
        ? { ...lang, proficiency: proficiency }
        : lang
    );
    onChange(updatedLanguages);
  };

  return (
    <div style={{ position: 'relative' }}>
      <div style={{
        border: '1px solid #d1d5db',
        borderRadius: '6px',
        padding: '8px',
        backgroundColor: disabled ? '#f9fafb' : 'white',
        minHeight: '42px'
      }}>
        {/* Selected Languages */}
        {selectedLanguages.map((language, index) => (
          <div key={index} style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            marginBottom: '8px',
            padding: '6px',
            backgroundColor: '#f3f4f6',
            borderRadius: '6px'
          }}>
            <span style={{
              backgroundColor: '#8b5cf6',
              color: 'white',
              padding: '4px 8px',
              borderRadius: '12px',
              fontSize: '12px',
              flex: 1
            }}>
              {language.language}
            </span>
            
            {!disabled && (
              <>
                <select
                  value={language.proficiency}
                  onChange={(e) => updateProficiency(language.language, e.target.value)}
                  style={{
                    padding: '2px 4px',
                    fontSize: '11px',
                    border: '1px solid #d1d5db',
                    borderRadius: '4px'
                  }}
                >
                  <option value="Basic">Basic</option>
                  <option value="Conversational">Conversational</option>
                  <option value="Fluent">Fluent</option>
                  <option value="Native">Native</option>
                </select>
                
                <button
                  type="button"
                  onClick={() => removeLanguage(language.language)}
                  style={{
                    background: '#ef4444',
                    color: 'white',
                    border: 'none',
                    borderRadius: '50%',
                    width: '20px',
                    height: '20px',
                    fontSize: '12px',
                    cursor: 'pointer'
                  }}
                >
                  ×
                </button>
              </>
            )}
          </div>
        ))}
        
        {/* Search Input */}
        {!disabled && (
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              if (!isOpen) setIsOpen(true);
            }}
            onFocus={() => setIsOpen(true)}
            placeholder={selectedLanguages.length === 0 ? "Search and select languages..." : "Add more languages..."}
            style={{
              border: 'none',
              outline: 'none',
              backgroundColor: 'transparent',
              width: '100%',
              fontSize: '14px'
            }}
          />
        )}
      </div>

      {/* Dropdown */}
      {isOpen && !disabled && (
        <>
          <div style={{
            position: 'absolute',
            top: '100%',
            left: 0,
            right: 0,
            maxHeight: '200px',
            overflowY: 'auto',
            backgroundColor: 'white',
            border: '1px solid #d1d5db',
            borderRadius: '6px',
            zIndex: 1000,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginTop: '2px'
          }}>
            {filteredLanguages.length > 0 ? (
              filteredLanguages.map((language) => (
                <div
                  key={language}
                  onClick={() => handleLanguageSelect(language)}
                  style={{
                    padding: '8px 12px',
                    cursor: 'pointer',
                    borderBottom: '1px solid #f3f4f6',
                    fontSize: '14px'
                  }}
                  onMouseEnter={(e) => e.target.style.backgroundColor = '#f9fafb'}
                  onMouseLeave={(e) => e.target.style.backgroundColor = 'white'}
                >
                  {language}
                </div>
              ))
            ) : (
              <div style={{ padding: '8px 12px', color: '#6b7280', fontSize: '14px' }}>
                {searchTerm ? 'No languages found' : 'All languages selected'}
              </div>
            )}
          </div>
          <div 
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              right: 0,
              bottom: 0,
              zIndex: 999
            }}
            onClick={() => setIsOpen(false)}
          />
        </>
      )}
    </div>
  );
};

  // Handle logout
  const handleLogout = () => {
    if (
      window.confirm(
        "Are you sure you want to logout? Your progress will be lost."
      )
    ) {
      // Clear all stored data
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      localStorage.removeItem("profileCompleted");
      localStorage.removeItem("profileId");
      localStorage.removeItem("assessmentCompleted");
      localStorage.removeItem("hasRecommendations");

      Notify.success("Logged out successfully!");

      // Redirect to login page
      setTimeout(() => {
        window.location.href = "/";
      }, 1000);
    }
  };

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

      
          <div className="progress-section">
            <div className="progress-info">
              <span className="progress-text">Step {step} of 4</span>
              <span className="progress-percentage">
                {Math.round((step / 4) * 100)}%
              </span>
            </div>
            <div className="progress-bar">
              <div
                className="progress-fill"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        
       
        {/* Error/Success Messages */}
        {error && (
          <div className="message-alert error-alert">
            <span className="alert-icon">⚠️</span>
            <span className="alert-text">{error}</span>
            <button className="alert-close" onClick={() => setError("")}>
              ✕
            </button>
          </div>
        )}

        {success && (
          <div className="message-alert success-alert">
            <span className="alert-icon">✅</span>
            <span className="alert-text">{success}</span>
            <button className="alert-close" onClick={() => setSuccess("")}>
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
                  {/* <div className="step-header-icon">👤</div> */}
                  <h5 className="step-titles">Personal Information</h5>
                </div>

                <div className="form-grid">
                  <div className="form-group">
                    <label className="form-label">
                      {/* <span className="label-text">Nationality</span> */}
                      {/* <span className="label-required">*</span> */}
                    </label>
                    <div className="input-wrapper">
                      {/* <span className="input-icon">🌍</span> */}
                      <input
                        type="text"
                        name="nationality"
                        value={formData.nationality}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Nationality"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {/* <span className="label-text">Date of Birth</span>
                      <span className="label-required">*</span> */}
                    </label>
                    <div className="input-wrapper">
                      {/* <span className="input-icon">📅</span> */}
                      <input
                        type="date"
                        name="dateOfBirth"
                        value={formData.dateOfBirth}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Date of Birth"
                      />
                    </div>
                  </div>

                  {/* <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Age</span>
                      <span className="label-required">*</span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="number"
                        name="age"
                        value={formData.age}
                        onChange={handleChange}
                        required
                        min="16"
                        max="100"
                        className="form-input"
                        placeholder="Age"
                      />
                    </div>
                  </div> */}

                  <div className="form-group">
                    <label className="form-label">
                      {/* <span className="label-text">Gender</span>
                      <span className="label-required">*</span> */}
                    </label>
                    <div className="input-wrapper">
                      {/* <span className="input-icon">⚧️</span> */}
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
    {/* <span className="label-text">Country</span>
    <span className="label-required">*</span> */}
  </label>
  <div className="input-wrapper">
    {/* <span className="input-icon">🏳️</span> */}
    <select
      name="country"
      value={formData.country}
      onChange={handleChange}
      required
      className="form-input"
    >
      <option value="">Select your Country</option>
      {COUNTRIES.map((country) => (
        <option key={country} value={country}>
          {country}
        </option>
      ))}
    </select>
  </div>
</div>

                  <div className="form-group">
                    <label className="form-label">
                      {/* <span className="label-text">Phone Number</span>
                      <span className="label-required">*</span> */}
                    </label>
                    <div className="input-wrapper">
                      {/* <span className="input-icon">📱</span> */}
                      <input
                        type="tel"
                        name="phoneNumber"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        required
                        className="form-input"
                        placeholder="Phone Number"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {/* <span className="label-text">Marital Status</span>
                      <span className="label-required">*</span> */}
                    </label>
                    <div className="input-wrapper">
                      {/* <span className="input-icon">💑</span> */}
                      <select
                        name="maritalStatus"
                        value={formData.maritalStatus}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select Marital Status</option>
                        <option value="Single">Single</option>
                        <option value="Married">Married</option>
                        <option value="Divorced">Divorced</option>
                        <option value="Widowed">Widowed</option>
                        <option value="Prefer not to say">
                          Prefer not to say
                        </option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {/* <span className="label-text">Religion</span>
                      <span className="label-required">*</span> */}
                    </label>
                    <div className="input-wrapper">
                      {/* <span className="input-icon">🙏</span> */}
                     
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
                  {/* <div className="step-header-icon">🎓</div> */}
                  <h5 className="step-titles">Academic Information</h5>
                </div>

                <div className="form-grid">
                  {/* Transfer Student Question */}
                  <div className="form-group full-width">
                    <div className="checkbox-group">
                      <label className="custom-checkbox">
                        <input
                          type="checkbox"
                          name="transferStudent"
                          checked={formData.transferStudent}
                          onChange={handleChange}
                        />
                        <span className="checkbox-mark"></span>
                        <span className="checkbox-label">
                          I am a transfer student from another university
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Transfer Student Fields */}
                  {formData.transferStudent && (
                    <>
                      <div className="form-group">
                        <label className="form-label">
                          <span className="label-text">
                            {/* Previous Institution */}
                          </span>
                          {/* <span className="label-required">*</span> */}
                        </label>
                        <div className="input-wrapper">

                          {/* <span className="input-icon">🏫</span> */}
                          <input
                            type="text"
                            name="previousInstitution"
                            value={formData.previousInstitution}
                            onChange={handleChange}
                            required={formData.transferStudent}
                            className="form-input"
                            placeholder="Previous Institution"
                          />
                        </div>
                      </div>

                      <div className="form-group">
                        <label className="form-label">
                          <span className="label-text">
                            {/* Overall Grade at Previous University */}
                          </span>
                          {/* <span className="label-required">*</span> */}
                        </label>
                        <div className="input-wrapper">
                          {/* <span className="input-icon">📊</span> */}
                          <select
                            name="overallGradePreviousUniversity"
                            value={formData.overallGradePreviousUniversity}
                            onChange={handleChange}
                            required={formData.transferStudent}
                            className="form-input"
                          >
                            <option value="">Grade Range At Previous University</option>
                            <option value="Below 50%">Below 50%</option>
                            <option value="Satisfactory (50%-60.9%)">
                              Satisfactory (50%-60.9%)
                            </option>
                            <option value="Good (61%-69.9%)">
                              Good (61%-69.9%)
                            </option>
                            <option value="Lower Distinction (70%-79.9%)">
                              Lower Distinction (70%-79.9%)
                            </option>
                            <option value="Higher Distinction (80%-100%)">
                              Higher Distinction (80%-100%)
                            </option>
                            <option value="Not applicable">
                              Not applicable
                            </option>
                          </select>
                        </div>
                      </div>
                    </>
                  )}

                  <div className="form-group">
                    <label className="form-label">
                      {/* <span className="label-text">Current Academic Level</span> */}
                      {/* <span className="label-required">*</span> */}
                    </label>
                    <div className="input-wrapper">
                      {/* <span className="input-icon">📚</span> */}
                      <select
                        name="currentAcademicLevel"
                        value={formData.currentAcademicLevel}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Current Academic Level</option>
                        <option value="O-Level">O-Level</option>
                        <option value="A-Level">A-Level</option>
                        <option value="Bachelor's Degree">
                          Bachelor's Degree
                        </option>
                        <option value="Master's Degree">Master's Degree</option>
                        <option value="PhD">PhD</option>
                        <option value="Other">Other</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {/* <span className="label-text">Student Program</span> */}
                      {/* <span className="label-required">*</span> */}
                    </label>
                    <div className="input-wrapper">
                      {/* <span className="input-icon">🕐</span> */}
                      <select
                        name="studentProgram"
                        value={formData.studentProgram}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select Student Program</option>
                        <option value="Day Program">Day Program</option>
                        <option value="Evening Program">Evening Program</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {/* <span className="label-text">High School Grades</span>
                      <span className="label-required">*</span> */}
                    </label>
                    <div className="input-wrapper">
                      {/* <span className="input-icon">📈</span> */}
                      <input
                        type="number"
                        name="highSchoolGrades"
                        value={formData.highSchoolGrades}
                        onChange={handleChange}
                        required
                        min="0"
                        max="100"
                        className="form-input"
                        placeholder="NE Grades Out Of 73"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      {/* <span className="label-text">Sponsorship Details</span> */}
                      {/* <span className="label-required">*</span> */}
                    </label>
                    <div className="input-wrapper">
                      {/* <span className="input-icon">💰</span> */}
                      <select
                        name="sponsorshipDetails"
                        value={formData.sponsorshipDetails}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Select Sponsorship Details</option>
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
    <span className="label-text">Courses Studied in Secondary School</span>
    <span className="label-required">*</span>
  </label>
  <CoursesMultiSelect
    selectedCourses={coursesStudiedInSecondary}
    onChange={setCoursesStudiedInSecondary}
    disabled={loading}
  />
  <p className="input-help" style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
    Search and select all subjects you studied in secondary school. Click on a course to add it, click the × to remove it.
  </p>
</div>
                  {/* <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">
                      </span>
                    </label>
                    <div className="input-wrapper">
                      <input
                        type="text"
                        name="coursesStudiedInSecondary"
                        value={formData.coursesStudiedInSecondary}
                        onChange={handleChange}
                        className="form-input"
                        placeholder="Courses Studied in Secondary"
                      />
                    </div>
                  </div> */}

                  <div className="form-group">
                    <label className="form-label">
                      {/* <span className="label-text">Have Job</span>
                      <span className="label-required">*</span> */}
                    </label>
                    <div className="input-wrapper">
                      {/* <span className="input-icon">💼</span> */}
                      <select
                        name="haveJob"
                        value={formData.haveJob}
                        onChange={handleChange}
                        required
                        className="form-input"
                      >
                        <option value="">Have Job</option>
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
                        <span className="checkbox-label">
                          I have two principal passes
                        </span>
                      </label>
                    </div>
                  </div>

                  {/* Transfer Student Course Sections */}
                  {formData.transferStudent && (
                    <>
                      {/* Previous University Courses */}
                      <div className="form-group full-width">
                        {/* <div className="section-header">
                          <h5 className="step-titles">
                            Courses Studied at Previous University
                          </h5>
                          <button
                            type="button"
                            onClick={addPreviousCourse}
                            className="add-btn"
                          >
                            + Add Course
                          </button>
                        </div> */}

                       {coursesStudiedPreviousUniversity.map((course, index) => (
  <div key={index} style={{
    border: '1px solid #e5e7eb',
    borderRadius: '6px',
    padding: '16px',
    marginBottom: '12px',
    backgroundColor: 'white'
  }}>
    {/* Basic Course Info */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginBottom: '12px'
    }}>
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '3px'
        }}>
          Course Name <span style={{ color: '#dc2626' }}>*</span>
        </label>
        <input
          type="text"
          placeholder="e.g., Data Structures and Algorithms"
          value={course.courseName}
          onChange={(e) => updatePreviousCourse(index, "courseName", e.target.value)}
          required
          disabled={mappingInProgress}
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '13px',
            backgroundColor: mappingInProgress ? '#f9fafb' : 'white'
          }}
        />
      </div>
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '3px'
        }}>
          Course Code
        </label>
        <input
          type="text"
          placeholder="e.g., CS201"
          value={course.courseCode}
          onChange={(e) => updatePreviousCourse(index, "courseCode", e.target.value)}
          disabled={mappingInProgress}
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '13px',
            backgroundColor: mappingInProgress ? '#f9fafb' : 'white'
          }}
        />
      </div>
    </div>

    {/* Course Content */}
    <div style={{ marginBottom: '12px' }}>
      <label style={{
        display: 'block',
        fontSize: '12px',
        fontWeight: '500',
        color: '#374151',
        marginBottom: '3px'
      }}>
        📚 Detailed Course Content & Topics Studied <span style={{ color: '#dc2626' }}>*</span>
      </label>
      <textarea
        placeholder="List the specific topics, concepts, and skills you learned in this course. Be as detailed as possible!"
        value={Array.isArray(course.contentStudied) ? course.contentStudied.join(', ') : course.contentStudied || ''}
        onChange={(e) => updatePreviousCourse(index, "contentStudied", e.target.value)}
        required
        disabled={mappingInProgress}
        rows="4"
        style={{
          width: '100%',
          padding: '8px',
          border: '1px solid #d1d5db',
          borderRadius: '4px',
          fontSize: '13px',
          lineHeight: '1.4',
          backgroundColor: mappingInProgress ? '#f9fafb' : 'white',
          resize: 'vertical'
        }}
      />
    </div>

    {/* Credits and Grade */}
    <div style={{
      display: 'grid',
      gridTemplateColumns: '1fr 1fr',
      gap: '12px',
      marginBottom: '12px'
    }}>
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '3px'
        }}>
          Credits
        </label>
        <input
          type="number"
          placeholder="3"
          value={course.credits}
          onChange={(e) => updatePreviousCourse(index, "credits", e.target.value)}
          min="1"
          max="10"
          disabled={mappingInProgress}
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '13px',
            backgroundColor: mappingInProgress ? '#f9fafb' : 'white'
          }}
        />
      </div>
      <div>
        <label style={{
          display: 'block',
          fontSize: '12px',
          fontWeight: '500',
          color: '#374151',
          marginBottom: '3px'
        }}>
          Grade Obtained
        </label>
        <input
          type="text"
          placeholder="A, B+, 85%, etc."
          value={course.grade}
          onChange={(e) => updatePreviousCourse(index, "grade", e.target.value)}
          disabled={mappingInProgress}
          style={{
            width: '100%',
            padding: '6px 8px',
            border: '1px solid #d1d5db',
            borderRadius: '4px',
            fontSize: '13px',
            backgroundColor: mappingInProgress ? '#f9fafb' : 'white'
          }}
        />
      </div>
    </div>

    {/* ADD THIS SECTION - Mapping Results Display */}
    {hasCompletedMapping && course.aucaCourseName && (
      <div style={{
        marginTop: '16px',
        padding: '12px',
        backgroundColor: '#f8fafc',
        border: '1px solid #e2e8f0',
        borderRadius: '4px'
      }}>
        <div style={{ marginBottom: '8px' }}>
          <span style={{
            fontSize: '12px',
            fontWeight: '600',
            color: '#1B3058'
          }}>
            Mapping Result:
          </span>
        </div>
        
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginBottom: '8px'
        }}>
          <div>
            <div style={{
              fontSize: '13px',
              fontWeight: '500',
              color: '#374151'
            }}>
              {course.aucaCourseName}
            </div>
            <div style={{
              fontSize: '11px',
              color: '#6b7280'
            }}>
              {course.aucaCourseCode}
            </div>
          </div>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '8px'
          }}>
            <span style={{
              fontSize: '11px',
              fontWeight: '600',
              color: getStatusColor(course.creditTransferStatus),
              backgroundColor: 'white',
              padding: '2px 6px',
              borderRadius: '10px',
              border: `1px solid ${getStatusColor(course.creditTransferStatus)}`
            }}>
              {getStatusText(course.creditTransferStatus)}
            </span>
            <span style={{
              fontSize: '12px',
              fontWeight: '600',
              color: '#1B3058'
            }}>
              {course.matchPercentage}% match
            </span>
          </div>
        </div>

        {course.aiReasoning && (
          <div style={{
            fontSize: '11px',
            color: '#6b7280',
            lineHeight: '1.4',
            marginBottom: '6px'
          }}>
            <strong>System Analysis:</strong> {course.aiReasoning}
          </div>
        )}

        {course.matchingTopics && course.matchingTopics.length > 0 && (
          <div style={{
            fontSize: '11px',
            color: '#059669'
          }}>
            <strong>Matching topics:</strong> {course.matchingTopics.join(', ')}
          </div>
        )}

        {course.missingTopics && course.missingTopics.length > 0 && (
          <div style={{
            fontSize: '11px',
            color: '#dc2626',
            marginTop: '4px'
          }}>
            <strong>Missing topics:</strong> {course.missingTopics.join(', ')}
          </div>
        )}
      </div>
    )}

    {/* Remove Button */}
    <div style={{ marginTop: '12px', textAlign: 'right' }}>
      <button
        type="button"
        onClick={() => removePreviousCourse(index)}
        disabled={mappingInProgress}
        style={{
          backgroundColor: '#dc2626',
          color: 'white',
          border: 'none',
          borderRadius: '4px',
          padding: '4px 8px',
          fontSize: '11px',
          fontWeight: '500',
          cursor: 'pointer',
          opacity: mappingInProgress ? 0.6 : 1
        }}
      >
        Remove Course
      </button>
    </div>
  </div>
))}
                        {/* end */}
                      </div>

                      {/* Enhanced Previous University Courses Section with AI Mapping */}
{formData.transferStudent && (
  <div className="form-group full-width">
    <div className="section-header">
      <h5 className="step-titles">
         AUCA Course Mapping
      </h5>
    </div>
    <p className="input-help" style={{ marginBottom: '1.5rem', fontSize: '0.95rem', lineHeight: '1.5' }}>
      <strong>How it works:</strong> Describe the actual content you studied in each course. 
      Our System  will analyze your course content and automatically map it to equivalent AUCA courses, 
      showing you which courses you can skip and which ones you still need to complete.
    </p>

    <div className="section-header" style={{ marginTop: '2rem' }}>
      <h6 className="step-titles">Your Previous University Courses</h6>
      <button
        type="button"
        onClick={addPreviousCourse}
        className="add-btn"
        disabled={mappingInProgress}
      >
        + Add Course
      </button>
    </div>

    {coursesStudiedPreviousUniversity.map((course, index) => (
      <div key={index} className="dynamic-item course-mapping-item" style={{ 
        border: '2px solid #e0e7ff', 
        borderRadius: '12px', 
        padding: '1.5rem', 
        marginBottom: '1rem',
        background: 'linear-gradient(135deg, #f8fafc 0%, #f1f5f9 100%)'
      }}>
        <div className="dynamic-item-content">
          {/* Basic course info */}
          <div className="form-row">
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Course Name</span>
                <span className="label-required">*</span>
              </label>
              <input
                type="text"
                placeholder="e.g., Data Structures and Algorithms"
                value={course.courseName}
                onChange={(e) => updatePreviousCourse(index, "courseName", e.target.value)}
                className="form-input"
                required
                disabled={mappingInProgress}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Course Code</span>
              </label>
              <input
                type="text"
                placeholder="e.g., CS201"
                value={course.courseCode}
                onChange={(e) => updatePreviousCourse(index, "courseCode", e.target.value)}
                className="form-input"
                disabled={mappingInProgress}
              />
            </div>
          </div>

          {/* NEW: Detailed content section */}
          <div className="form-group" style={{ marginTop: '1rem' }}>
            <label className="form-label">
              <span className="label-text">📚 Detailed Course Content & Topics Studied</span>
              <span className="label-required">*</span>
            </label>
            <textarea
              placeholder="List the specific topics, concepts, and skills you learned in this course. Be as detailed as possible! 
The more detailed you are, the better our System can match your courses!"
              value={Array.isArray(course.contentStudied) ? course.contentStudied.join(', ') : course.contentStudied || ''}
              onChange={(e) => updatePreviousCourse(index, "contentStudied", e.target.value)}
              className="form-input content-input"
              // rows="6"
              // required
              // disabled={mappingInProgress}
              style={{ 
                lineHeight: '1.6',
                fontSize: '0.95rem'
              }}
            />
            {/* <p className="input-help" style={{ marginTop: '0.5rem' }}>
              💡 <strong>Tip:</strong> Separate topics with commas. Include specific technologies, frameworks, 
              algorithms, or methodologies you learned. The more specific you are, the more accurate the AI mapping will be!
            </p> */}
          </div>

          <div className="form-row" style={{ marginTop: '1rem' }}>
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Credits</span>
              </label>
              <input
                type="number"
                placeholder="3"
                value={course.credits}
                onChange={(e) => updatePreviousCourse(index, "credits", e.target.value)}
                className="form-input"
                min="1"
                max="10"
                disabled={mappingInProgress}
              />
            </div>
            <div className="form-group">
              <label className="form-label">
                <span className="label-text">Grade Obtained</span>
              </label>
              <input
                type="text"
                placeholder=" eg:60% "
                value={course.grade}
                onChange={(e) => updatePreviousCourse(index, "grade", e.target.value)}
                className="form-input"
                disabled={mappingInProgress}
              />
            </div>
          </div>
        </div>
        
        <button
          type="button"
          onClick={() => removePreviousCourse(index)}
          className="remove-btn"
          disabled={mappingInProgress}
          style={{ marginTop: '1rem' }}
        >
          Remove Course
        </button>
      </div>
    ))}

    {/* AI Mapping Action */}
    <div className="mapping-action" style={{ 
      textAlign: 'center', 
      marginTop: '2rem',
      padding: '2rem',
      // background: 'linear-gradient(135deg, #3b82f6 0%, #1d4ed8 100%)',
      borderRadius: '1px',
      color: 'white'
    }}>
      {/* <div style={{ marginBottom: '1.5rem' }}>
        <h4 style={{ margin: '0 0 0.5rem 0', fontSize: '1.3rem' }}>
          🤖 Ready for AI Course Mapping?
        </h4>
        <p style={{ margin: '0', opacity: '0.9', fontSize: '0.95rem' }}>
          Our AI will analyze your course content and map it to equivalent AUCA courses
        </p>
      </div> */}
      
    <button
  type="button"
  onClick={handleAICourseMapping}
  disabled={coursesStudiedPreviousUniversity.length === 0 || mappingInProgress}
  style={{
    backgroundColor: mappingInProgress ? '#6b7280' : '#1B3058',
    color: 'white',
    border: 'none',
    borderRadius: '6px',
    padding: '12px 24px',
    fontSize: '14px',
    fontWeight: '600',
    cursor: mappingInProgress ? 'not-allowed' : 'pointer',
    minWidth: '200px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    gap: '8px',
    margin: '0 auto'
  }}
>
  {mappingInProgress ? (
    <>
      <div style={{
        width: '16px',
        height: '16px',
        border: '2px solid rgba(255, 255, 255, 0.3)',
        borderTop: '2px solid white',
        borderRadius: '50%',
        animation: 'spin 1s linear infinite'
      }}></div>
      Mapping Courses...
    </>
  ) : (
    <>🤖 Map My Courses with AI</>
  )}
</button>
      
      <p style={{ 
        margin: '1rem 0 0 0', 
        fontSize: '0.85rem', 
        opacity: '0.8' 
      }}>
        {coursesStudiedPreviousUniversity.length === 0 
          ? 'Add at least one course to enable mapping'
          : `${coursesStudiedPreviousUniversity.length} course${coursesStudiedPreviousUniversity.length === 1 ? '' : 's'} ready for mapping`
        }
      </p>
    </div>
  </div>
)}

{/* Course Mapping Results Modal */}
{showMappingResults && mappingResults && (
  <div style={{
    position: 'fixed',
    top: '0',
    left: '0',
    width: '100%',
    height: '100%',
    background: 'rgba(0, 0, 0, 0.8)',
    zIndex: '1000',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '2rem'
  }}>
    <div style={{
      background: 'white',
      borderRadius: '16px',
      maxWidth: '90%',
      maxHeight: '90%',
      overflow: 'auto',
      padding: '2rem',
      position: 'relative'
    }}>
      <div style={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        marginBottom: '2rem',
        borderBottom: '2px solid #f1f5f9',
        paddingBottom: '1rem'
      }}>
        <h3 style={{ margin: '0', color: '#1B3058' }}>
           Course Mapping Results
        </h3>
        <button
          onClick={closeMappingResults}
          style={{
            background: '#ef4444',
            color: 'white',
            border: 'none',
            borderRadius: '8px',
            padding: '0.5rem 1rem',
            cursor: 'pointer'
          }}
        >
          Close
        </button>
      </div>

      {/* Summary */}
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
        gap: '1rem',
        marginBottom: '2rem'
      }}>
        <div style={{ textAlign: 'center', padding: '1rem', background: '#f0fdf4', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#16a34a' }}>
            {mappingResults.summary.coursesAccepted}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#15803d' }}>Courses Accepted</div>
        </div>
        <div style={{ textAlign: 'center', padding: '1rem', background: '#fef3c7', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#d97706' }}>
            {mappingResults.summary.partialCredits}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#b45309' }}>Partial Credit</div>
        </div>
        <div style={{ textAlign: 'center', padding: '1rem', background: '#fee2e2', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#dc2626' }}>
            {mappingResults.summary.coursesRejected}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#b91c1c' }}>Not Accepted</div>
        </div>
        <div style={{ textAlign: 'center', padding: '1rem', background: '#dbeafe', borderRadius: '8px' }}>
          <div style={{ fontSize: '2rem', fontWeight: 'bold', color: '#2563eb' }}>
            {mappingResults.academicPlan.estimatedSemesters}
          </div>
          <div style={{ fontSize: '0.9rem', color: '#1d4ed8' }}>Semesters Left</div>
        </div>
      </div>

      {/* Academic Plan */}
      <div style={{ marginBottom: '2rem' }}>
        <h4 style={{ color: '#1B3058', marginBottom: '1rem' }}>
           Your Academic Plan
        </h4>
        <div style={{ 
          background: '#f8fafc', 
          padding: '1.5rem', 
          borderRadius: '12px',
          border: '2px solid #e2e8f0'
        }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
            <div>
              <strong>Suggested Start Level:</strong><br/>
              <span style={{ color: '#1B3058' }}>{mappingResults.academicPlan.suggestedStartLevel}</span>
            </div>
            <div>
              <strong>Transfer Credits:</strong><br/>
              <span style={{ color: '#1B3058' }}>{mappingResults.academicPlan.transferCredits} credits</span>
            </div>
            <div>
              <strong>Completion:</strong><br/>
              <span style={{ color: '#1B3058' }}>{mappingResults.academicPlan.completionPercentage}% complete</span>
            </div>
          </div>
        </div>
      </div>

      {/* Detailed Mappings */}
      <div>
        <h4 style={{ color: '#1B3058', marginBottom: '1rem' }}>
           Course-by-Course Analysis
        </h4>
        <div style={{ maxHeight: '400px', overflow: 'auto' }}>
          {mappingResults.mappingResults.map((result, index) => (
            <div key={index} style={{ 
              border: '1px solid #e2e8f0',
              borderRadius: '8px',
              padding: '1rem',
              marginBottom: '1rem',
              background: result.creditTransferStatus === 'full_credit' ? '#f0fdf4' :
                          result.creditTransferStatus === 'partial_credit' ? '#fef3c7' : '#fee2e2'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '0.5rem' }}>
                <div>
                  <strong>{result.previousCourseName}</strong>
                  {result.previousCourseCode && (
                    <span style={{ color: '#6b7280', marginLeft: '0.5rem' }}>
                      ({result.previousCourseCode})
                    </span>
                  )}
                </div>
                <div style={{ 
                  padding: '0.25rem 0.75rem',
                  borderRadius: '12px',
                  fontSize: '0.8rem',
                  fontWeight: 'bold',
                  background: result.creditTransferStatus === 'full_credit' ? '#1B3058' :
                              result.creditTransferStatus === 'partial_credit' ? '#d97706' : '#dc2626',
                  color: 'white'
                }}>
                  {result.matchPercentage}% match
                </div>
              </div>
              
              {result.aucaCourseName && (
                <div style={{ marginBottom: '0.5rem' }}>
                  <strong>Maps to:</strong> {result.aucaCourseName} ({result.aucaCourseCode})
                </div>
              )}
              
              <div style={{ fontSize: '0.9rem', color: '#4b5563' }}>
                {result.aiReasoning}
              </div>
              
              {result.matchingTopics && result.matchingTopics.length > 0 && (
                <div style={{ marginTop: '0.5rem', fontSize: '0.85rem' }}>
                  <strong>Matching topics:</strong> {result.matchingTopics.join(', ')}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      <div style={{ 
        marginTop: '2rem', 
        padding: '1rem',
        background: '#dbeafe',
        borderRadius: '8px',
        textAlign: 'center'
      }}>
        <p style={{ margin: '0', color: '#1B3058' }}>
          🎓 <strong>Great news!</strong> You can skip {mappingResults.summary.coursesAccepted} courses and 
          start at {mappingResults.academicPlan.suggestedStartLevel}. 
          Complete your profile to get personalized academic recommendations!
        </p>
      </div>
    </div>
  </div>
)}

                      {/* Course Equivalence Mapping */}
                      <div className="form-group full-width">
                        <div className="section-header">
                          {/* <h5 className="step-titles">
                            Course Equivalence Mapping
                          </h5> */}
                          {/* <button
                            type="button"
                            onClick={addEquivalentCourse}
                            className="add-btn"
                          >
                            + Add Equivalent Course
                          </button> */}
                        </div>
                        <p className="input-help">
                          Map your previous university courses to equivalent
                          AUCA courses for credit transfer consideration.
                        </p>

                        {equivalentCourses.map((equiv, index) => (
                          <div
                            key={index}
                            className="dynamic-item equivalence-item"
                          >
                            <div className="dynamic-item-content">
                              <div className="equivalence-section">
                                <h4 className="equivalence-title">
                                  Previous University Course
                                </h4>
                                <div className="form-row">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      placeholder="Previous Course Name"
                                      value={equiv.previousCourseName}
                                      onChange={(e) =>
                                        updateEquivalentCourse(
                                          index,
                                          "previousCourseName",
                                          e.target.value
                                        )
                                      }
                                      className="form-input"
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      placeholder="Previous Course Code"
                                      value={equiv.previousCourseCode}
                                      onChange={(e) =>
                                        updateEquivalentCourse(
                                          index,
                                          "previousCourseCode",
                                          e.target.value
                                        )
                                      }
                                      className="form-input"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="equivalence-section">
                                <h4 className="equivalence-title">
                                  Equivalent AUCA Course
                                </h4>
                                <div className="form-row">
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      placeholder="AUCA Course Name"
                                      value={equiv.aucaCourseName}
                                      onChange={(e) =>
                                        updateEquivalentCourse(
                                          index,
                                          "aucaCourseName",
                                          e.target.value
                                        )
                                      }
                                      className="form-input"
                                      required
                                    />
                                  </div>
                                  <div className="form-group">
                                    <input
                                      type="text"
                                      placeholder="AUCA Course Code"
                                      value={equiv.aucaCourseCode}
                                      onChange={(e) =>
                                        updateEquivalentCourse(
                                          index,
                                          "aucaCourseCode",
                                          e.target.value
                                        )
                                      }
                                      className="form-input"
                                    />
                                  </div>
                                </div>
                              </div>

                              <div className="form-group">
                                <textarea
                                  placeholder="Explain why you believe these courses are equivalent (content, skills, learning outcomes)"
                                  value={equiv.reasonForEquivalence}
                                  onChange={(e) =>
                                    updateEquivalentCourse(
                                      index,
                                      "reasonForEquivalence",
                                      e.target.value
                                    )
                                  }
                                  className="form-input"
                                  rows="3"
                                  maxLength="300"
                                />
                              </div>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeEquivalentCourse(index)}
                              className="remove-btn"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
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
                 
                  <h5 className="step-titles">Skills, Experience & Goals</h5>
                </div>

                <div className="form-grid single-column">

                  {/* <div className="form-group">
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
                  </div> */}
                   
                   <div className="form-group">
  <label className="form-label">
    <span className="label-text">Hobbies</span>
    <span className="label-required">*</span>
  </label>
  <HobbiesMultiSelect
    selectedHobbies={selectedHobbies}
    onChange={setSelectedHobbies}
    disabled={loading}
  />
  <p className="input-help" style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#1B3058;' }}>
    Search and select your hobbies. You can select multiple options.
  </p>
</div>
                   
                  {/* <div className="form-group">
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
                    <p className="input-help">
                      Separate multiple interests with commas
                    </p>
                  </div> */}

                  <div className="form-group">
  <label className="form-label">
    <span className="label-text">Interests</span>
    <span className="label-required">*</span>
  </label>
  <InterestsMultiSelect
    selectedInterests={selectedInterests}
    onChange={setSelectedInterests}
    disabled={loading}
  />
  <p className="input-help" style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#1B3058;' }}>
    Search and select your areas of interest. You can select multiple options.
  </p>
</div>

                  {/* Skills Section */}

                  <div className="form-group">
  <label className="form-label">
    <span className="label-text">Skills</span>
    <span className="label-required">*</span>
  </label>
  <SkillsMultiSelect
    selectedSkills={skills}
    onChange={setSkills}
    disabled={loading}
  />
  <p className="input-help" style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
    Search and select your skills. You can set proficiency levels for each skill.
  </p>
</div>
                  {/* <div className="form-group">
                    <div className="section-header">
                      <span className="section-titles">Skills</span>
                      <button
                        type="button"
                        onClick={addSkill}
                        className="add-btn"
                      >
                        + Add Skill
                      </button>
                    </div>

                    {skills.map((skill, index) => (
                      <div key={index} className="dynamic-item">
                        <div className="form-row">
                          <div className="form-group">
                            <input
                              type="text"
                              placeholder="Skill name (e.g., Programming)"
                              value={skill.skillName}
                              onChange={(e) => updateSkill(index, "skillName", e.target.value)}
                              className="form-input"
                              required
                            />
                          </div>

                          <div className="form-group">
                            <select
                              value={skill.proficiencyLevel}
                              onChange={(e) => updateSkill(index, "proficiencyLevel", e.target.value)}
                              className="form-input"
                            >
                              <option value="Beginner">Beginner</option>
                              <option value="Intermediate">Intermediate</option>
                              <option value="Advanced">Advanced</option>
                              <option value="Expert">Expert</option>
                            </select>
                          </div>

                          <button
                            type="button"
                            onClick={() => removeSkill(index)}
                            className="remove-btn"
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    ))}

                  </div> */}

                  {/* Languages Section */}

                  <div className="form-group">
  <label className="form-label">
    <span className="label-text">Languages Spoken</span>
    <span className="label-required">*</span>
  </label>
  <LanguagesMultiSelect
    selectedLanguages={languagesSpoken}
    onChange={setLanguagesSpoken}
    disabled={loading}
  />
  <p className="input-help" style={{ marginTop: '0.5rem', fontSize: '0.85rem', color: '#6b7280' }}>
    Search and select languages you speak. You can set proficiency levels for each language.
  </p>
</div>
                  {/* <div className="form-group">
                    <div className="section-header">
                      <h3 className="section-titles">Languages Spoken</h3>
                      <button
                        type="button"
                        onClick={addLanguage}
                        className="add-btn"
                      >
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
                                onChange={(e) =>
                                  updateLanguage(
                                    index,
                                    "language",
                                    e.target.value
                                  )
                                }
                                className="form-input"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <select
                                value={language.proficiency}
                                onChange={(e) =>
                                  updateLanguage(
                                    index,
                                    "proficiency",
                                    e.target.value
                                  )
                                }
                                className="form-input"
                              >
                                <option value="Basic">Basic</option>
                                <option value="Conversational">
                                  Conversational
                                </option>
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
                  </div> */}

                  {/* Work Experience Section */}
                  {/* <div className="form-group">
                    <div className="section-header">
                      <h3 className="section-titles">Work Experience</h3>
                      <button
                        type="button"
                        onClick={addWorkExperience}
                        className="add-btn"
                      >
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
                                onChange={(e) =>
                                  updateWorkExperience(
                                    index,
                                    "jobTitle",
                                    e.target.value
                                  )
                                }
                                className="form-input"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Company"
                                value={experience.company}
                                onChange={(e) =>
                                  updateWorkExperience(
                                    index,
                                    "company",
                                    e.target.value
                                  )
                                }
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
                                onChange={(e) =>
                                  updateWorkExperience(
                                    index,
                                    "startDate",
                                    e.target.value
                                  )
                                }
                                className="form-input"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="date"
                                placeholder="End Date"
                                value={experience.endDate}
                                onChange={(e) =>
                                  updateWorkExperience(
                                    index,
                                    "endDate",
                                    e.target.value
                                  )
                                }
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
                                onChange={(e) =>
                                  updateWorkExperience(
                                    index,
                                    "duration",
                                    e.target.value
                                  )
                                }
                                className="form-input"
                              />
                            </div>
                            <div className="form-group">
                              <label className="custom-checkbox">
                                <input
                                  type="checkbox"
                                  checked={experience.isCurrent}
                                  onChange={(e) =>
                                    updateWorkExperience(
                                      index,
                                      "isCurrent",
                                      e.target.checked
                                    )
                                  }
                                />
                                <span className="checkbox-mark"></span>
                                <span className="checkbox-label">
                                  Current Job
                                </span>
                              </label>
                            </div>
                          </div>
                          <div className="form-group">
                            <textarea
                              placeholder="Job description and responsibilities"
                              value={experience.description}
                              onChange={(e) =>
                                updateWorkExperience(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
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
                  </div> */}

                  {/* Extracurricular Activities Section */}
                  {/* Extracurricular Activities Section */}
<div className="form-group">
  <div className="section-header">
    <h3 className="section-titles">Extracurricular Activities</h3>

    <button
      type="button"
      onClick={addExtracurricularActivity}
      className="add-btn"
      disabled={extracurricularActivities.length >= 3}
    >
      + Add Activity
    </button>
  </div>

  {extracurricularActivities.map((activity, index) => (
    <div key={index} className="dynamic-item">
      <input
        type="text"
        placeholder={`Activity ${index + 1} (e.g. Football)`}
        value={activity}
        onChange={(e) =>
          updateExtracurricularActivity(index, e.target.value)
        }
        className="form-input"
        required
      />

      {extracurricularActivities.length > 1 && (
        <button
          type="button"
          onClick={() => removeExtracurricularActivity(index)}
          className="remove-btn"
        >
          Remove
        </button>
      )}
    </div>
  ))}
</div>

                  {/* <div className="form-group">
                    <div className="section-header">
                      <h3 className="section-titles">
                        Extracurricular Activities
                      </h3>
                      <button
                        type="button"
                        onClick={addExtracurricularActivity}
                        className="add-btn"
                      >
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
                                onChange={(e) =>
                                  updateExtracurricularActivity(
                                    index,
                                    "activity",
                                    e.target.value
                                  )
                                }
                                className="form-input"
                                required
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="text"
                                placeholder="Your Role"
                                value={activity.role}
                                onChange={(e) =>
                                  updateExtracurricularActivity(
                                    index,
                                    "role",
                                    e.target.value
                                  )
                                }
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
                                onChange={(e) =>
                                  updateExtracurricularActivity(
                                    index,
                                    "organization",
                                    e.target.value
                                  )
                                }
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
                                onChange={(e) =>
                                  updateExtracurricularActivity(
                                    index,
                                    "startDate",
                                    e.target.value
                                  )
                                }
                                className="form-input"
                              />
                            </div>
                            <div className="form-group">
                              <input
                                type="date"
                                placeholder="End Date"
                                value={activity.endDate}
                                onChange={(e) =>
                                  updateExtracurricularActivity(
                                    index,
                                    "endDate",
                                    e.target.value
                                  )
                                }
                                className="form-input"
                              />
                            </div>
                          </div>
                          <div className="form-group">
                            <textarea
                              placeholder="Description of the activity and your contributions"
                              value={activity.description}
                              onChange={(e) =>
                                updateExtracurricularActivity(
                                  index,
                                  "description",
                                  e.target.value
                                )
                              }
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
                  </div> */}

                  {/* Faculty and Department Selection */}
                  <div className="form-grid">
                    <div className="form-group">
                      <label className="form-label">
                        <span className="label-text">Desired Faculty</span>
                      </label>
                      <div className="input-wrapper">
                        {/* <span className="input-icon">🏫</span> */}
                        <select
                          name="desiredFaculty"
                          value={formData.desiredFaculty}
                          onChange={handleChange}
                          className="form-input"
                        >
                          <option value="">Select Faculty</option>
                          {facultyOptions.map((faculty) => (
                            <option key={faculty} value={faculty}>
                              {faculty}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">
                        <span className="label-text">Desired Department</span>
                      </label>
                      <div className="input-wrapper">
                        {/* <span className="input-icon">🎯</span> */}
                        <select
                          name="desiredDepartment"
                          value={formData.desiredDepartment}
                          onChange={handleChange}
                          className="form-input"
                          disabled={!formData.desiredFaculty}
                        >
                          <option value="">Select Department</option>
                          {getDepartmentOptions(formData.desiredFaculty).map(
                            (dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            )
                          )}
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">
                      <span className="label-text">Career Goals</span>
                    </label>
                    <div className="input-wrapper">
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
                  <h5 className="step-titles">Documents & Emergency Contact</h5>
                </div>

                <div className="form-grid single-column">
                  {/* Profile Image Upload */}
                  <div className="form-group">
                    <h6 className="section-titles">Profile Image</h6>
                    <div
                      className={`upload-area ${
                        profileImage ? "has-file" : ""
                      }`}
                    >
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
                              Upload Your Image (Passport Picture)
                            </button>
                            {/* <button
                              type="button"
                              onClick={() => cameraInputRef.current?.click()}
                              className="upload-btn secondary"
                            >
                              Take Photo
                            </button> */}
                          </div>
                          <p className="upload-info">JPG, PNG up to 5MB</p>
                          
                        </div>
                      )}

                      <input
                        ref={fileInputRef}
                        type="file"
                        accept="image/*"
                        onChange={handleImageUpload}
                        style={{ display: "none" }}
                      />
                      <input
                        ref={cameraInputRef}
                        type="file"
                        accept="image/*"
                        capture="environment"
                        onChange={handleCameraCapture}
                        style={{ display: "none" }}
                      />
                    </div>
                  </div>

                  {/* Document Upload */}
                  <div className="form-group">
                    <h4 className="section-titles">Supporting Documents</h4>
                    <div className="upload-area">
                      <div className="upload-icon">📄</div>
                      <button
                        type="button"
                        onClick={() => documentInputRef.current?.click()}
                        className="upload-btn primary"
                      >
                        <p className="upload-info">Upload High School Transcripts for 3 years, University Transcript (For Transfer Students), Diploma, Other Certificates</p>
                      </button>
                      <p className="upload-info">
                        PDF, DOC, DOCX, JPG, PNG up to 5MB each (Maximum 5
                        files)
                        {formData.transferStudent && (
                          <>
                            <br />
                            <strong>
                              Transfer students: Please include official
                              transcripts from previous institution
                            </strong>
                          </>
                        )}
                      </p>
                      <input
                        ref={documentInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleDocumentUpload}
                        style={{ display: "none" }}
                      />
                    </div>

                    {/* Display uploaded documents */}
                    {documents.length > 0 && (
                      <div className="document-list">
                        <h4 className="document-list-title">
                          Uploaded Documents:
                        </h4>
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
                    <center><h4 className="step-titles">
                      Emergency Contact Information
                    </h4></center><br/>
                    <div className="form-grid">
                      <div className="form-group">
                        <label className="form-label">
                          <span className="label-text">Contact Name</span>
                          <span className="label-required">*</span>
                        </label>
                        <div className="input-wrapper">
                          {/* <span className="input-icon">👤</span> */}
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
                    <center><h4 className="step-titles">Additional Information</h4></center>
                    <div className="form-group">
                      <label className="form-label">
                        <span className="label-text">Disability Status</span>
                      </label>
                      <div className="input-wrapper">
                     
                        <select
                          name="disability"
                          value={formData.disability}
                          onChange={handleChange}
                          className="form-input"
                        >
                          <option value="None">None</option>
                          <option value="Visual Impairment">
                            Visual Impairment
                          </option>
                          <option value="Hearing Impairment">
                            Hearing Impairment
                          </option>
                          <option value="Physical Disability">
                            Physical Disability
                          </option>
                          <option value="Learning Disability">
                            Learning Disability
                          </option>
                          <option value="Other">Other</option>
                          <option value="Prefer not to say">
                            Prefer not to say
                          </option>
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
                    className={`btn-submit ${loading ? "loading" : ""}`}
                  >
                    {loading ? (
                      <div className="loading-content">
                        <div className="loading-spinner"></div>
                        Creating Profile...
                      </div>
                    ) : (
                      "Create Profile"
                    )}
                  </button>
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

