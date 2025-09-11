import { useState, useEffect, useRef } from 'react';
import axios from 'axios';
// import "./Dashboard_Styles/AdminQuestion.css";


function QuestionManager() {  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filteredQuestions, setFilteredQuestions] = useState([]);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState('');
  
  const [currentQuestion, setCurrentQuestion] = useState({
    question: '',
    options: [''],
    type: 'radio',
    category: 'career',
    order: 0,
    active: true
  });
  
  const [isEditing, setIsEditing] = useState(false);
  const [filterCategory, setFilterCategory] = useState('all');
  const [activeTab, setActiveTab] = useState('individual');
  
  // Bulk import states
  const [file, setFile] = useState(null);
  const [fileName, setFileName] = useState('');
  const [importStatus, setImportStatus] = useState('');
  const [importError, setImportError] = useState('');
  const [progress, setProgress] = useState(0);
  const [isImporting, setIsImporting] = useState(false);
  
  const fileInputRef = useRef(null);
  const formRef = useRef(null);

  // IMPROVED: Centralized token getter with better error handling
  const getToken = () => {
    try {
      // Check multiple possible token storage locations
      const possibleTokens = [
        localStorage.getItem('token'),
        localStorage.getItem('userToken'), 
        localStorage.getItem('authToken'),
        localStorage.getItem('accessToken')
      ];

      for (const token of possibleTokens) {
        if (token) {
          // Try to parse if it's JSON, otherwise return as-is
          try {
            const parsed = JSON.parse(token);
            if (parsed.token) return parsed.token;
            if (parsed.accessToken) return parsed.accessToken;
            if (parsed.authToken) return parsed.authToken;
            return token; // If parsing doesn't reveal a nested token, use the original
          } catch {
            // If parsing fails, it's probably a plain string token
            if (token.startsWith('Bearer ')) {
              return token.substring(7); // Remove 'Bearer ' prefix
            }
            return token;
          }
        }
      }
      
      return null;
    } catch (e) {
      console.error("Error getting token:", e);
      return null;
    }
  };

  // DEBUG: Add token validation
  const validateToken = () => {
    const token = getToken();
    console.log('Token found:', token ? 'Yes' : 'No');
    console.log('Token length:', token ? token.length : 0);
    console.log('Token preview:', token ? token.substring(0, 20) + '...' : 'None');
    
    // Check if token looks like a JWT
    if (token && token.includes('.')) {
      const parts = token.split('.');
      console.log('Token appears to be JWT with', parts.length, 'parts');
    }
    
    return token;
  };

  // Fetch all questions with improved error handling
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const token = validateToken(); // Use the debug function
      
      if (!token) {
        throw new Error("No authentication token found. Please login again.");
      }

      console.log('Making request to:', 'http://localhost:5000/api/questions/getAll');
      console.log('With token:', token.substring(0, 20) + '...');

      const response = await axios.get(
        `http://localhost:5000/api/questions/getAll`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      console.log('Response received:', response.status);
      setQuestions(Array.isArray(response.data) ? response.data : []);
      setError(null); // Clear any previous errors
      setLoading(false);
    } catch (err) {
      console.error("Error fetching questions:", err);
      console.error("Error response:", err.response?.data);
      console.error("Error status:", err.response?.status);
      
      if (err.response?.status === 403) {
        setError("Access denied. Please check your authentication or contact administrator.");
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to load questions. Please try again later.");
      }
      setQuestions([]);
      setLoading(false);
    }
  };

  // Initial load effect
  useEffect(() => {
    const token = getToken();
    console.log('Component mounted, token available:', !!token);
    
    if (token) {
      fetchQuestions();
    } else {
      setError("Authentication required. Please login again.");
      setLoading(false);
    }
  }, []);
  
  // Filter questions when filter category changes or questions data changes
  useEffect(() => {
    if (!Array.isArray(questions)) {
      setFilteredQuestions([]);
      return;
    }

    if (filterCategory === 'all') {
      setFilteredQuestions(questions);
    } else {
      setFilteredQuestions(questions.filter(q => q.category === filterCategory));
    }
  }, [filterCategory, questions]);
  
  // Hide success message after 3 seconds
  useEffect(() => {
    if (showSuccessMessage) {
      const timer = setTimeout(() => {
        setShowSuccessMessage(false);
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [showSuccessMessage]);
  
  // Scroll to form when editing
  useEffect(() => {
    if (isEditing && formRef.current) {
      formRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [isEditing]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentQuestion(prev => ({
      ...prev,
      [name]: value
    }));
  };

  // Handle option changes
  const handleOptionChange = (index, value) => {
    const updatedOptions = [...currentQuestion.options];
    updatedOptions[index] = value;
    setCurrentQuestion(prev => ({
      ...prev,
      options: updatedOptions
    }));
  };

  // Add new option field
  const addOption = () => {
    setCurrentQuestion(prev => ({
      ...prev,
      options: [...prev.options, '']
    }));
  };

  // Remove option field
  const removeOption = (index) => {
    if (currentQuestion.options.length > 1) {
      const updatedOptions = currentQuestion.options.filter((_, i) => i !== index);
      setCurrentQuestion(prev => ({
        ...prev,
        options: updatedOptions
      }));
    }
  };

  // Handle form submission with consistent token usage
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const token = getToken();
      
      if (!token) {
        setError("Authentication required. Please login again.");
        return;
      }

      const config = {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      };

      if (isEditing) {
        await axios.put(
          `http://localhost:5000/api/questions/update/${currentQuestion._id}`,
          currentQuestion,
          config
        );
        showPopupMessage('Question updated successfully!');
      } else {
        await axios.post(
          `http://localhost:5000/api/questions/create`,
          currentQuestion,
          config
        );
        showPopupMessage('Question created successfully!');
      }
      
      await fetchQuestions();
      resetForm();
      setError(null);
    } catch (err) {
      console.error("Error saving question:", err);
      if (err.response?.status === 403) {
        setError("Access denied. Please check your permissions.");
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError(err.response?.data?.error || "Failed to save question");
      }
    }
  };

  const showPopupMessage = (message) => {
    setSuccessMessage(message);
    setShowSuccessMessage(true);
  };

  // Edit question
  const handleEdit = (question) => {
    setCurrentQuestion({...question});
    setIsEditing(true);
    setActiveTab('individual');
  };

  // Delete question with consistent token usage
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      const token = getToken();
      
      if (!token) {
        setError("Authentication required. Please login again.");
        return;
      }

      await axios.delete(
        `http://localhost:5000/api/questions/delete/${id}`,
        {
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        }
      );
      
      setQuestions(prevQuestions => 
        Array.isArray(prevQuestions) ? prevQuestions.filter(q => q._id !== id) : []
      );
      showPopupMessage('Question deleted successfully!');
      
      if (isEditing && currentQuestion._id === id) {
        resetForm();
      }
      
      setError(null);
    } catch (err) {
      console.error("Error deleting question:", err);
      if (err.response?.status === 403) {
        setError("Access denied. Cannot delete this question.");
      } else if (err.response?.status === 401) {
        setError("Authentication failed. Please login again.");
      } else {
        setError("Failed to delete question");
      }
    }
  };

  // Reset form
  const resetForm = () => {
    setCurrentQuestion({
      question: '',
      options: [''],
      type: 'radio',
      category: 'career',
      order: 0,
      active: true
    });
    setIsEditing(false);
  };

  // File input change handler
  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
      setFileName(selectedFile.name);
      setImportError('');
      setImportStatus('');
    }
  };

  // Download template function
  const downloadTemplate = () => {
    const template = [
      ['question', 'option1', 'option2', 'option3', 'option4', 'type', 'category', 'order', 'active'],
      ['What is your preferred learning style?', 'Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic', 'radio', 'career', '1', 'TRUE'],
      ['Which subjects are you most interested in? (Select all that apply)', 'Science', 'Math', 'Languages', 'Arts', 'checkbox', 'skills', '2', 'TRUE'],
      ['', '', '', '', '', '', '', '', ''],
      ['NOTE: type must be "radio" or "checkbox". category must be "career", "skills", or "personality". active must be "TRUE" or "FALSE"']
    ];
    
    console.log("Template download would create file with this data:", template);
    alert("XLSX library not available. Please implement the download template functionality.");
  };

  // Handle bulk import submission
  const handleBulkImport = async (e) => {
    e.preventDefault();
    
    if (!file) {
      setImportError('Please select a file first.');
      return;
    }
    
    setIsImporting(true);
    setProgress(0);
    setImportStatus('Reading file...');
    
    // Temporary implementation without XLSX
    setImportError('XLSX library not available. Please implement bulk import functionality.');
    setIsImporting(false);
  };

  // Function to group questions by category with safety checks
  const getQuestionsByCategory = () => {
    const safeQuestions = Array.isArray(questions) ? questions : [];
    
    const careerQuestions = safeQuestions.filter(q => q.category === 'career');
    const skillsQuestions = safeQuestions.filter(q => q.category === 'skills');
    const personalityQuestions = safeQuestions.filter(q => q.category === 'personality');
    
    return {
      career: careerQuestions,
      skills: skillsQuestions,
      personality: personalityQuestions
    };
  };

  // Success message popup component
  const SuccessPopup = () => {
    if (!showSuccessMessage) return null;
    
    return (
      <div className="success-popup">
        <div className="success-popup-content">
          <span className="success-icon">✓</span>
          <p>{successMessage}</p>
        </div>
      </div>
    );
  };

  if (loading) return <div className="loading">Loading questions...</div>;

  const questionsByCategory = getQuestionsByCategory();

  return (
    <div className="admin-question-container">
      <h2 className="title">Assessment Question Manager</h2>
      
      {error && (
        <div className="error-message">
          {error}
          <button 
            onClick={() => window.location.reload()} 
            style={{marginLeft: '10px', padding: '5px 10px'}}
          >
            Refresh Page
          </button>
        </div>
      )}
      <SuccessPopup />
      
      <div className="tab-navigation">
        <button 
          className={`tab-button ${activeTab === 'individual' ? 'active' : ''}`}
          onClick={() => setActiveTab('individual')}
        >
          Individual Question
        </button>
        <button 
          className={`tab-button ${activeTab === 'bulk' ? 'active' : ''}`}
          onClick={() => setActiveTab('bulk')}
        >
          Bulk Import
        </button>
      </div>
      
      <div className={`tab-content ${activeTab === 'individual' ? 'active' : ''}`}>
        <div className="question-form-container" ref={formRef}>
          <h3>{isEditing ? `Edit Question: ${currentQuestion.question}` : 'Add New Question'}</h3>
          <form onSubmit={handleSubmit} className="question-form">
            <div className="form-group">
              <label>Question:</label>
              <input
                type="text"
                name="question"
                value={currentQuestion.question}
                onChange={handleInputChange}
                required
                className="form-control"
              />
            </div>
            
            <div className="form-group">
              <label>Options:</label>
              {currentQuestion.options.map((option, index) => (
                <div key={index} className="option-input">
                  <input
                    type="text"
                    value={option}
                    onChange={(e) => handleOptionChange(index, e.target.value)}
                    required
                    className="form-control"
                  />
                  <button 
                    type="button" 
                    onClick={() => removeOption(index)}
                    className="btn btn-danger btn-sm"
                    disabled={currentQuestion.options.length <= 1}
                  >
                    Remove
                  </button>
                </div>
              ))}
              <button 
                type="button" 
                onClick={addOption}
                className="btn btn-secondary btn-sm"
              >
                Add Option
              </button>
            </div>
            
            <div className="form-group">
              <label>Question Type:</label>
              <select
                name="type"
                value={currentQuestion.type}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="radio">Single Choice (Radio)</option>
                <option value="checkbox">Multiple Choice (Checkbox)</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Category:</label>
              <select
                name="category"
                value={currentQuestion.category}
                onChange={handleInputChange}
                className="form-control"
              >
                <option value="career">Career</option>
                <option value="skills">Skills</option>
                <option value="personality">Personality</option>
              </select>
            </div>
            
            <div className="form-group">
              <label>Order:</label>
              <input
                type="number"
                name="order"
                value={currentQuestion.order}
                onChange={handleInputChange}
                className="form-control"
              />
            </div>
            
            <div className="form-check">
              <input
                type="checkbox"
                name="active"
                checked={currentQuestion.active}
                onChange={(e) => setCurrentQuestion(prev => ({
                  ...prev,
                  active: e.target.checked
                }))}
                className="form-check-input"
                id="activeCheck"
              />
              <label className="form-check-label" htmlFor="activeCheck">
                Active
              </label>
            </div>
            
            <div className="button-group">
              <button type="submit" className="btn btn-primary">
                {isEditing ? 'Update Question' : 'Add Question'}
              </button>
              {isEditing && (
                <button 
                  type="button" 
                  onClick={resetForm}
                  className="btn btn-secondary"
                >
                  Cancel
                </button>
              )}
            </div>
          </form>
        </div>
      </div>
      
      <div className={`tab-content ${activeTab === 'bulk' ? 'active' : ''}`}>
        <div className="bulk-import-container">
          <h3>Bulk Import Questions</h3>
          
          <div className="template-download">
            <p>Download a template file to get started:</p>
            <button 
              onClick={downloadTemplate}
              className="btn btn-outline-primary"
            >
              Download Template
            </button>
          </div>
          
          <form onSubmit={handleBulkImport} className="import-form">
            <div className="form-group">
              <label>Select Excel File:</label>
              <div className="file-input-container">
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  accept=".xlsx,.xls"
                  className="form-control-file"
                />
                {fileName && <span className="file-name">{fileName}</span>}
              </div>
            </div>
            
            {importError && <div className="error-message">{importError}</div>}
            {importStatus && (
              <div className="import-status">
                <p>{importStatus}</p>
                {isImporting && (
                  <div className="progress">
                    <div 
                      className="progress-bar" 
                      style={{ width: `${progress}%` }}
                    ></div>
                  </div>
                )}
              </div>
            )}
            
            <button 
              type="submit" 
              className="btn btn-primary"
              disabled={!file || isImporting}
            >
              {isImporting ? 'Importing...' : 'Import Questions'}
            </button>
          </form>
        </div>
      </div>
      
      <div className="questions-list-container">
        <h3>Questions List</h3>
        
        <div className="filter-controls">
          <label>Filter by category:</label>
          <select
            value={filterCategory}
            onChange={(e) => setFilterCategory(e.target.value)}
            className="form-control"
          >
            <option value="all">All Categories</option>
            <option value="career">Career</option>
            <option value="skills">Skills</option>
            <option value="personality">Personality</option>
          </select>
        </div>
        
        {filterCategory === 'all' ? (
          <>
            {/* Career Questions */}
            <div className="category-section">
              <h4 className="category-title">Career Questions</h4>
              {questionsByCategory.career.length === 0 ? (
                <p>No career questions found.</p>
              ) : (
                <div className="questions-list">
                  {questionsByCategory.career.map((q) => (
                    <div key={q._id} className={`question-item ${q.active ? '' : 'inactive'}`}>
                      <div className="question-details">
                        <h4>{q.question}</h4>
                        <p className="question-meta">
                          Category: <span>{q.category}</span> | 
                          Type: <span>{q.type}</span> | 
                          Order: <span>{q.order}</span> | 
                          Status: <span>{q.active ? 'Active' : 'Inactive'}</span>
                        </p>
                        <div className="options-list">
                          <strong>Options:</strong>
                          <ul>
                            {q.options.map((option, i) => (
                              <li key={i}>{option}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="question-actions">
                        <button 
                          onClick={() => handleEdit(q)}
                          className="btn btn-info btn-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(q._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            
            {/* Skills Questions */}
            <div className="category-section">
              <h4 className="category-title">Skills Questions</h4>
              {questionsByCategory.skills.length === 0 ? (
                <p>No skills questions found.</p>
              ) : (
                <div className="questions-list">
                  {questionsByCategory.skills.map((q) => (
                    <div key={q._id} className={`question-item ${q.active ? '' : 'inactive'}`}>
                      <div className="question-details">
                        <h4>{q.question}</h4>
                        <p className="question-meta">
                          Category: <span>{q.category}</span> | 
                          Type: <span>{q.type}</span> | 
                          Order: <span>{q.order}</span> | 
                          Status: <span>{q.active ? 'Active' : 'Inactive'}</span>
                        </p>
                        <div className="options-list">
                          <strong>Options:</strong>
                          <ul>
                            {q.options.map((option, i) => (
                              <li key={i}>{option}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="question-actions">
                        <button 
                          onClick={() => handleEdit(q)}
                          className="btn btn-info btn-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(q._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Personality Questions */}
            <div className="category-section">
              <h4 className="category-title">Personality Questions</h4>
              {questionsByCategory.personality.length === 0 ? (
                <p>No personality questions found.</p>
              ) : (
                <div className="questions-list">
                  {questionsByCategory.personality.map((q) => (
                    <div key={q._id} className={`question-item ${q.active ? '' : 'inactive'}`}>
                      <div className="question-details">
                        <h4>{q.question}</h4>
                        <p className="question-meta">
                          Category: <span>{q.category}</span> | 
                          Type: <span>{q.type}</span> | 
                          Order: <span>{q.order}</span> | 
                          Status: <span>{q.active ? 'Active' : 'Inactive'}</span>
                        </p>
                        <div className="options-list">
                          <strong>Options:</strong>
                          <ul>
                            {q.options.map((option, i) => (
                              <li key={i}>{option}</li>
                            ))}
                          </ul>
                        </div>
                      </div>
                      <div className="question-actions">
                        <button 
                          onClick={() => handleEdit(q)}
                          className="btn btn-info btn-sm"
                        >
                          Edit
                        </button>
                        <button 
                          onClick={() => handleDelete(q._id)}
                          className="btn btn-danger btn-sm"
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </>
        ) : (
          <div className="questions-list">
            {filteredQuestions.length === 0 ? (
              <p>No questions found in this category.</p>
            ) : (
              filteredQuestions.map((q) => (
                <div key={q._id} className={`question-item ${q.active ? '' : 'inactive'}`}>
                  <div className="question-details">
                    <h4>{q.question}</h4>
                    <p className="question-meta">
                      Category: <span>{q.category}</span> | 
                      Type: <span>{q.type}</span> | 
                      Order: <span>{q.order}</span> | 
                      Status: <span>{q.active ? 'Active' : 'Inactive'}</span>
                    </p>
                    <div className="options-list">
                      <strong>Options:</strong>
                      <ul>
                        {q.options.map((option, i) => (
                          <li key={i}>{option}</li>
                        ))}
                      </ul>
                    </div>
                  </div>
                  <div className="question-actions">
                    <button 
                      onClick={() => handleEdit(q)}
                      className="btn btn-info btn-sm"
                    >
                      Edit
                    </button>
                    <button 
                      onClick={() => handleDelete(q._id)}
                      className="btn btn-danger btn-sm"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))
            )}
          </div>
        )}
      </div>
    </div>
  );
}

export default QuestionManager;