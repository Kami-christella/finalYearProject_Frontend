import React, { useState, useRef } from 'react';

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
      // Note: localStorage is not available in Claude artifacts
      // In a real application, you would get the token from your auth system
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
        // localStorage.setItem('profileCompleted', 'true');
        // localStorage.setItem('profileId', data.profile._id);
        
        setTimeout(() => {
          // In a real application, you would handle navigation
          // window.location.href = '/assessment';
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

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-4xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Create Your Student Profile</h1>
          <p className="text-gray-600">Complete your profile to access the career assessment</p>
          
          {/* Progress Bar */}
          <div className="mt-6">
            <div className="flex justify-center mb-2">
              <span className="text-sm text-gray-600">Step {step} of 4</span>
            </div>
            <div className="w-full bg-gray-200 rounded-full h-2 max-w-md mx-auto">
              <div 
                className="bg-blue-600 h-2 rounded-full transition-all duration-300"
                style={{ width: `${(step / 4) * 100}%` }}
              ></div>
            </div>
          </div>
        </div>

        {/* Error/Success Messages */}
        {error && (
          <div className="mb-6 bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded max-w-2xl mx-auto">
            {error}
          </div>
        )}
        
        {success && (
          <div className="mb-6 bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded max-w-2xl mx-auto">
            {success}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-8">
          
          {/* Step 1: Personal Information */}
          {step === 1 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Personal Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Nationality *
                  </label>
                  <input
                    type="text"
                    name="nationality"
                    value={formData.nationality}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Rwanda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Date of Birth *
                  </label>
                  <input
                    type="date"
                    name="dateOfBirth"
                    value={formData.dateOfBirth}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Age *
                  </label>
                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    required
                    min="16"
                    max="100"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 19"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Gender *
                  </label>
                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Country *
                  </label>
                  <input
                    type="text"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Rwanda"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phoneNumber"
                    value={formData.phoneNumber}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., +250788123456"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Marital Status *
                  </label>
                  <select
                    name="maritalStatus"
                    value={formData.maritalStatus}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Status</option>
                    <option value="Single">Single</option>
                    <option value="Married">Married</option>
                    <option value="Divorced">Divorced</option>
                    <option value="Widowed">Widowed</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Religion *
                  </label>
                  <select
                    name="yourReligion"
                    value={formData.yourReligion}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              <div className="flex justify-end mt-6">
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 2: Academic Information */}
          {step === 2 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Academic Information</h2>
              
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Current Academic Level *
                  </label>
                  <select
                    name="currentAcademicLevel"
                    value={formData.currentAcademicLevel}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Level</option>
                    <option value="O-Level">O-Level</option>
                    <option value="A-Level">A-Level</option>
                    <option value="Bachelor's Degree">Bachelor s Degree</option>
                    <option value="Master's Degree">Master s Degree</option>
                    <option value="PhD">PhD</option>
                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Student Program *
                  </label>
                  <select
                    name="studentProgram"
                    value={formData.studentProgram}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Program</option>
                    <option value="Day Program">Day Program</option>
                    <option value="Evening Program">Evening Program</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    High School Grades *
                  </label>
                  <input
                    type="number"
                    name="highSchoolGrades"
                    value={formData.highSchoolGrades}
                    onChange={handleChange}
                    required
                    min="0"
                    max="100"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., 75"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Sponsorship Details *
                  </label>
                  <select
                    name="sponsorshipDetails"
                    value={formData.sponsorshipDetails}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Courses Studied in Secondary
                  </label>
                  <input
                    type="text"
                    name="coursesStudiedInSecondary"
                    value={formData.coursesStudiedInSecondary}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Mathematics, Physics, Chemistry"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Have Two Principal Passes
                  </label>
                  <input
                    type="checkbox"
                    name="haveTwoPrincipalPasses"
                    checked={formData.haveTwoPrincipalPasses}
                    onChange={handleChange}
                    className="mr-2"
                  />
                  <span className="text-sm text-gray-600">Check if you have two principal passes</span>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Have Job *
                  </label>
                  <select
                    name="haveJob"
                    value={formData.haveJob}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Interests & Goals */}
          {step === 3 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Interests & Career Goals</h2>
              
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Hobbies *
                  </label>
                  <input
                    type="text"
                    name="hobbies"
                    value={formData.hobbies}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Reading, Sports, Music"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Interests *
                  </label>
                  <input
                    type="text"
                    name="interests"
                    value={formData.interests}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Technology, Business, Healthcare (comma-separated)"
                  />
                  <p className="text-sm text-gray-500 mt-1">Separate multiple interests with commas</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Skills
                  </label>
                  <input
                    type="text"
                    name="skills"
                    value={formData.skills}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Programming, Leadership, Communication (comma-separated)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Languages Spoken
                  </label>
                  <input
                    type="text"
                    name="languagesSpoken"
                    value={formData.languagesSpoken}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., English, French, Kinyarwanda (comma-separated)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Work Experience
                  </label>
                  <input
                    type="text"
                    name="workExperience"
                    value={formData.workExperience}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Internship at XYZ Company, Volunteer at ABC NGO (comma-separated)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Extracurricular Activities
                  </label>
                  <input
                    type="text"
                    name="extracurricularActivities"
                    value={formData.extracurricularActivities}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="e.g., Student Council, Sports Team, Drama Club (comma-separated)"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Faculty
                  </label>
                  <select
                    name="desiredFaculty"
                    value={formData.desiredFaculty}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Faculty</option>
                    {facultyOptions.map(faculty => (
                      <option key={faculty} value={faculty}>{faculty}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Desired Department
                  </label>
                  <select
                    name="desiredDepartment"
                    value={formData.desiredDepartment}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    disabled={!formData.desiredFaculty}
                  >
                    <option value="">Select Department</option>
                    {getDepartmentOptions(formData.desiredFaculty).map(dept => (
                      <option key={dept} value={dept}>{dept}</option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    Career Goals
                  </label>
                  <textarea
                    name="careerGoals"
                    value={formData.careerGoals}
                    onChange={handleChange}
                    rows="4"
                    className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Describe your career aspirations and goals..."
                  />
                </div>
              </div>

              <div className="flex justify-between mt-6">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Next Step →
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Documents & Emergency Contact */}
          {step === 4 && (
            <div className="bg-white rounded-lg shadow-md p-6">
              <h2 className="text-xl font-semibold mb-6">Documents & Emergency Contact</h2>
              
              <div className="space-y-8">
                {/* Profile Image */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Profile Image</h3>
                  <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                    {profileImage ? (
                      <div className="space-y-4">
                        <img 
                          src={URL.createObjectURL(profileImage)} 
                          alt="Profile preview" 
                          className="w-32 h-32 object-cover rounded-full mx-auto"
                        />
                        <p className="text-sm text-gray-600">{profileImage.name}</p>
                        <button
                          type="button"
                          onClick={() => setProfileImage(null)}
                          className="text-red-600 hover:text-red-800"
                        >
                          Remove Image
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        <div className="text-gray-400 text-4xl">📷</div>
                        <div className="space-y-2">
                          <button
                            type="button"
                            onClick={() => fileInputRef.current?.click()}
                            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 mr-2"
                          >
                            Upload Image
                          </button>
                          <button
                            type="button"
                            onClick={() => cameraInputRef.current?.click()}
                            className="bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700"
                          >
                            Take Photo
                          </button>
                        </div>
                        <p className="text-sm text-gray-500">JPG, PNG up to 5MB</p>
                      </div>
                    )}
                    
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="hidden"
                    />
                    <input
                      ref={cameraInputRef}
                      type="file"
                      accept="image/*"
                      capture="environment"
                      onChange={handleCameraCapture}
                      className="hidden"
                    />
                  </div>
                </div>

                {/* Document Upload */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Supporting Documents</h3>
                  <div className="space-y-4">
                    <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
                      <div className="text-gray-400 text-4xl mb-4">📄</div>
                      <button
                        type="button"
                        onClick={() => documentInputRef.current?.click()}
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
                      >
                        Upload Documents
                      </button>
                      <p className="text-sm text-gray-500 mt-2">
                        PDF, DOC, DOCX, JPG, PNG up to 5MB each (Maximum 5 files)
                      </p>
                      <input
                        ref={documentInputRef}
                        type="file"
                        multiple
                        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png"
                        onChange={handleDocumentUpload}
                        className="hidden"
                      />
                    </div>

                    {/* Display uploaded documents */}
                    {documents.length > 0 && (
                      <div className="space-y-2">
                        <h4 className="font-medium text-gray-700">Uploaded Documents:</h4>
                        {documents.map((doc, index) => (
                          <div key={index} className="flex items-center justify-between bg-gray-50 p-3 rounded-lg">
                            <div className="flex items-center space-x-3">
                              <span className="text-gray-600">📄</span>
                              <span className="text-sm text-gray-700">{doc.name}</span>
                              <span className="text-xs text-gray-500">
                                ({(doc.size / 1024 / 1024).toFixed(2)} MB)
                              </span>
                            </div>
                            <button
                              type="button"
                              onClick={() => removeDocument(index)}
                              className="text-red-600 hover:text-red-800 text-sm"
                            >
                              Remove
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Emergency Contact */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Emergency Contact Information</h3>
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Contact Name *
                      </label>
                      <input
                        type="text"
                        name="emergencyContact.name"
                        value={formData.emergencyContact.name}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="Full name of emergency contact"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Relationship *
                      </label>
                      <select
                        name="emergencyContact.relationship"
                        value={formData.emergencyContact.relationship}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        name="emergencyContact.phoneNumber"
                        value={formData.emergencyContact.phoneNumber}
                        onChange={handleChange}
                        required
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="e.g., +250788123456"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address
                      </label>
                      <input
                        type="email"
                        name="emergencyContact.email"
                        value={formData.emergencyContact.email}
                        onChange={handleChange}
                        className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                        placeholder="emergency.contact@email.com"
                      />
                    </div>
                  </div>
                </div>

                {/* Disability Information */}
                <div>
                  <h3 className="text-lg font-medium mb-4">Additional Information</h3>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Disability Status
                    </label>
                    <select
                      name="disability"
                      value={formData.disability}
                      onChange={handleChange}
                      className="w-full border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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

              <div className="flex justify-between mt-8">
                <button
                  type="button"
                  onClick={prevStep}
                  className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  ← Previous
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className={`px-8 py-2 rounded-lg transition-colors ${
                    loading
                      ? 'bg-gray-400 cursor-not-allowed'
                      : 'bg-green-600 hover:bg-green-700'
                  } text-white`}
                >
                  {loading ? (
                    <div className="flex items-center space-x-2">
                      <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                      <span>Creating Profile...</span>
                    </div>
                  ) : (
                    'Create Profile'
                  )}
                </button>
              </div>
            </div>
          )}
        </form>

        {/* Form Summary (shown on all steps except step 1) */}
        {step > 1 && (
          <div className="mt-8 bg-blue-50 rounded-lg p-4">
            <h3 className="font-medium text-blue-900 mb-2">Profile Progress</h3>
            <div className="text-sm text-blue-800 space-y-1">
              <p>✓ Personal Information: {formData.nationality && formData.age ? 'Completed' : 'Incomplete'}</p>
              {step > 2 && (
                <p>✓ Academic Information: {formData.currentAcademicLevel && formData.studentProgram ? 'Completed' : 'Incomplete'}</p>
              )}
              {step > 3 && (
                <p>✓ Interests & Goals: {formData.hobbies && formData.interests ? 'Completed' : 'Incomplete'}</p>
              )}
              {step === 4 && (
                <p>• Documents & Emergency Contact: {formData.emergencyContact.name ? 'In Progress' : 'Pending'}</p>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default StudentProfile;