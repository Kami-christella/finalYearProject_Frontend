import { useState, useEffect, useContext, useRef } from 'react';
import { AuthContext } from './context/AuthContext';
import axios from 'axios';
import "./Dashboard_Styles/AdminQuestion.css";
// import * as XLSX from 'xlsx';

function QuestionManager() {  
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const { authToken } = useContext(AuthContext);
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
  let tokenValue;

  try {
    const tokenFromStorage = localStorage.getItem('userToken');
    if (tokenFromStorage) {
      const parsedToken = JSON.parse(tokenFromStorage);
      tokenValue = parsedToken.token || tokenFromStorage;
    }
  } catch (e) {
    console.error("Error parsing token:", e);
    tokenValue = authToken;
  }

  // Fetch all questions
  useEffect(() => {
    if (tokenValue) {
      fetchQuestions();
    }
  }, [authToken, tokenValue]);
  
  // Filter questions when filter category changes or questions data changes
  useEffect(() => {
    // Add safety check to ensure questions is an array
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
  
  if (!tokenValue) {
    console.error("Auth token is missing!");
    return <div className="error-message">You must be logged in to access this page.</div>;
  }
  
  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const response = await axios.get(
        `http://localhost:5000/api/questions/getAll`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`
          }
        }
      );
      
      // Ensure we always set an array
      setQuestions(Array.isArray(response.data) ? response.data : []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching questions:", err);
      setError("Failed to load questions. Please try again later.");
      setQuestions([]); // Set empty array on error
      setLoading(false);
    }
  };

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

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      if (isEditing) {
        // Update existing question
        await axios.put(
          `http://localhost:5000/api/questions/update/${currentQuestion._id}`,
          currentQuestion,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`
            }
          }
        );
        showPopupMessage('Question updated successfully!');
      } else {
        // Create new question
        await axios.post(
          `http://localhost:5000/api/questions/create`,
          currentQuestion,
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`
            }
          }
        );
        showPopupMessage('Question created successfully!');
      }
      
      // Refresh questions list
      await fetchQuestions();
      resetForm();
      setError(null);
    } catch (err) {
      console.error("Error saving question:", err);
      setError(err.response?.data?.error || "Failed to save question");
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

  // Delete question
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this question?")) {
      return;
    }

    try {
      await axios.delete(
        `http://localhost:5000/api/questions/delete/${id}`,
        {
          headers: {
            Authorization: `Bearer ${tokenValue}`
          }
        }
      );
      
      // Remove question from state
      setQuestions(prevQuestions => 
        Array.isArray(prevQuestions) ? prevQuestions.filter(q => q._id !== id) : []
      );
      showPopupMessage('Question deleted successfully!');
      
      // If the deleted question was being edited, reset the form
      if (isEditing && currentQuestion._id === id) {
        resetForm();
      }
      
      setError(null);
    } catch (err) {
      console.error("Error deleting question:", err);
      setError("Failed to delete question");
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
    // Create a template worksheet
    const template = [
      ['question', 'option1', 'option2', 'option3', 'option4', 'type', 'category', 'order', 'active'],
      ['What is your preferred learning style?', 'Visual', 'Auditory', 'Reading/Writing', 'Kinesthetic', 'radio', 'career', '1', 'TRUE'],
      ['Which subjects are you most interested in? (Select all that apply)', 'Science', 'Math', 'Languages', 'Arts', 'checkbox', 'skills', '2', 'TRUE'],
      ['', '', '', '', '', '', '', '', ''],
      ['NOTE: type must be "radio" or "checkbox". category must be "career", "skills", or "personality". active must be "TRUE" or "FALSE"']
    ];
    
    // Note: XLSX functionality commented out - uncomment when XLSX is available
    /*
    const ws = XLSX.utils.aoa_to_sheet(template);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Question Template");
    XLSX.writeFile(wb, "question_import_template.xlsx");
    */
    
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
    
    // Note: File reading functionality commented out - uncomment when XLSX is available
    /*
    const reader = new FileReader();
    
    reader.onload = async (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: 'array' });
        
        // Get the first worksheet
        const worksheetName = workbook.SheetNames[0];
        const worksheet = workbook.Sheets[worksheetName];
        
        // Convert to JSON
        const jsonData = XLSX.utils.sheet_to_json(worksheet);
        
        if (jsonData.length === 0) {
          setImportError('No data found in the file.');
          setIsImporting(false);
          return;
        }
        
        setImportStatus(`Processing ${jsonData.length} questions...`);
        
        // Process and validate each question
        const processedQuestions = [];
        let hasErrors = false;
        
        for (let i = 0; i < jsonData.length; i++) {
          const row = jsonData[i];
          setProgress(Math.floor((i / jsonData.length) * 100));
          
          // Skip empty rows
          if (!row.question || row.question.trim() === '') continue;
          
          // Extract options (columns named option1, option2, etc.)
          const options = [];
          for (let j = 1; j <= 10; j++) {
            const optionKey = `option${j}`;
            if (row[optionKey] && row[optionKey].trim() !== '') {
              options.push(row[optionKey]);
            }
          }
          
          // Validate required fields
          if (options.length < 1) {
            setImportError(`Row ${i + 2}: At least one option is required.`);
            hasErrors = true;
            break;
          }
          
          if (!['radio', 'checkbox'].includes(row.type?.toLowerCase())) {
            setImportError(`Row ${i + 2}: Type must be 'radio' or 'checkbox'.`);
            hasErrors = true;
            break;
          }
          
          if (!['career', 'skills', 'personality'].includes(row.category?.toLowerCase())) {
            setImportError(`Row ${i + 2}: Category must be 'career', 'skills', or 'personality'.`);
            hasErrors = true;
            break;
          }
          
          // Create question object
          const question = {
            question: row.question,
            options: options,
            type: row.type.toLowerCase(),
            category: row.category.toLowerCase(),
            order: parseInt(row.order) || 0,
            active: row.active?.toString().toUpperCase() === 'TRUE'
          };
          
          processedQuestions.push(question);
        }
        
        if (hasErrors) {
          setIsImporting(false);
          return;
        }
        
        // Import questions to the backend
        setImportStatus(`Uploading ${processedQuestions.length} questions...`);
        
        const response = await axios.post(
          `http://localhost:5000/api/questions/batch`,
          { questions: processedQuestions },
          {
            headers: {
              Authorization: `Bearer ${tokenValue}`
            }
          }
        );
        
        setProgress(100);
        setImportStatus(`Successfully imported ${processedQuestions.length} questions.`);
        showPopupMessage(`Successfully imported ${processedQuestions.length} questions.`);
        
        // Refresh questions list
        await fetchQuestions();
        
        // Reset file input
        setFile(null);
        setFileName('');
        if (fileInputRef.current) {
          fileInputRef.current.value = '';
        }
      } catch (err) {
        console.error("Error importing questions:", err);
        setImportError(err.response?.data?.error || "Failed to import questions. Please check your file format.");
      } finally {
        setIsImporting(false);
      }
    };
    
    reader.onerror = () => {
      setImportError('Error reading file.');
      setIsImporting(false);
    };
    
    reader.readAsArrayBuffer(file);
    */
    
    // Temporary implementation without XLSX
    setImportError('XLSX library not available. Please implement bulk import functionality.');
    setIsImporting(false);
  };

  // Function to group questions by category with safety checks
  const getQuestionsByCategory = () => {
    // Ensure questions is an array before filtering
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
      
      {error && <div className="error-message">{error}</div>}
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
        
        {/* Questions grouped by category */}
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
          // Filtered questions based on selected category
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