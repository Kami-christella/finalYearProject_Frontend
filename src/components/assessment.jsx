import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import './styles/Assessment.css';

const Assessment = () => {
  // Assessment sections and questions
  const [assessmentSections] = useState(['career', 'skills', 'personality']);
  const [currentSection, setCurrentSection] = useState(0);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  
  // Questions data
  const [careerQuestions, setCareerQuestions] = useState([]);
  const [skillsQuestions, setSkillsQuestions] = useState([]);
  const [personalityQuestions, setPersonalityQuestions] = useState([]);
  
  // Current questions array
  const [currentQuestions, setCurrentQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  
  // Answers storage
  const [careerAnswers, setCareerAnswers] = useState({});
  const [skillsAnswers, setSkillsAnswers] = useState({});
  const [personalityAnswers, setPersonalityAnswers] = useState({});
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState('');
  
  // Progress calculation
  const [totalQuestions, setTotalQuestions] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);
  
  // Assessment completion
  const [isCompleted, setIsCompleted] = useState(false);
  const [canGenerateRecommendations, setCanGenerateRecommendations] = useState(false);

  useEffect(() => {
    fetchAllQuestions();
    checkAssessmentStatus();
  }, []);

  useEffect(() => {
    updateCurrentQuestions();
  }, [currentSection, careerQuestions, skillsQuestions, personalityQuestions]);

  useEffect(() => {
    if (currentQuestions.length > 0 && currentQuestionIndex < currentQuestions.length) {
      setCurrentQuestion(currentQuestions[currentQuestionIndex]);
      loadSavedAnswer();
    }
  }, [currentQuestions, currentQuestionIndex]);

  const fetchAllQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to take the assessment');
        setLoading(false);
        return;
      }

      // Fetch all question types
      const [careerRes, skillsRes, personalityRes] = await Promise.all([
        fetch('http://localhost:5000/api/questions/career', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/questions/skills', {
          headers: { 'Authorization': `Bearer ${token}` }
        }),
        fetch('http://localhost:5000/api/questions/personality', {
          headers: { 'Authorization': `Bearer ${token}` }
        })
      ]);

      if (careerRes.ok && skillsRes.ok && personalityRes.ok) {
        const careerData = await careerRes.json();
        const skillsData = await skillsRes.json();
        const personalityData = await personalityRes.json();

        setCareerQuestions(careerData.questions || []);
        setSkillsQuestions(skillsData.questions || []);
        setPersonalityQuestions(personalityData.questions || []);

        const total = (careerData.questions?.length || 0) + 
                     (skillsData.questions?.length || 0) + 
                     (personalityData.questions?.length || 0);
        setTotalQuestions(total);

        console.log('✅ Questions loaded:', {
          career: careerData.questions?.length || 0,
          skills: skillsData.questions?.length || 0,
          personality: personalityData.questions?.length || 0,
          total
        });
      } else {
        throw new Error('Failed to fetch questions');
      }
    } catch (err) {
      console.error('Error fetching questions:', err);
      setError('Failed to load assessment questions');
      Notify.failure('Failed to load questions');
    } finally {
      setLoading(false);
    }
  };

  const checkAssessmentStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/assessments/user', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        if (data.assessment) {
          // Load previous answers
          setCareerAnswers(data.assessment.careerAnswers || {});
          setSkillsAnswers(data.assessment.skillsAnswers || {});
          setPersonalityAnswers(data.assessment.personalityAnswers || {});
          setIsCompleted(data.assessment.isCompleted || false);
          
          // Count answered questions
          const answered = Object.keys(data.assessment.careerAnswers || {}).length +
                          Object.keys(data.assessment.skillsAnswers || {}).length +
                          Object.keys(data.assessment.personalityAnswers || {}).length;
          setAnsweredQuestions(answered);
        }
      }
    } catch (err) {
      console.log('No previous assessment found');
    }
  };

  const updateCurrentQuestions = () => {
    const sectionName = assessmentSections[currentSection];
    switch (sectionName) {
      case 'career':
        setCurrentQuestions(careerQuestions);
        break;
      case 'skills':
        setCurrentQuestions(skillsQuestions);
        break;
      case 'personality':
        setCurrentQuestions(personalityQuestions);
        break;
      default:
        setCurrentQuestions([]);
    }
  };

  const loadSavedAnswer = () => {
    if (!currentQuestion) return;
    
    const sectionName = assessmentSections[currentSection];
    let savedAnswers = {};
    
    switch (sectionName) {
      case 'career':
        savedAnswers = careerAnswers;
        break;
      case 'skills':
        savedAnswers = skillsAnswers;
        break;
      case 'personality':
        savedAnswers = personalityAnswers;
        break;
    }
    
    setSelectedAnswer(savedAnswers[currentQuestion._id] || '');
  };

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer(answer);
  };

  const saveCurrentAnswer = () => {
    if (!currentQuestion || !selectedAnswer) return;
    
    const sectionName = assessmentSections[currentSection];
    const questionId = currentQuestion._id;
    
    switch (sectionName) {
      case 'career':
        setCareerAnswers(prev => ({ ...prev, [questionId]: selectedAnswer }));
        break;
      case 'skills':
        setSkillsAnswers(prev => ({ ...prev, [questionId]: selectedAnswer }));
        break;
      case 'personality':
        setPersonalityAnswers(prev => ({ ...prev, [questionId]: selectedAnswer }));
        break;
    }
    
    // Update answered questions count
    setAnsweredQuestions(prev => prev + 1);
  };

  const handleNext = () => {
    if (!selectedAnswer) {
      Notify.warning('Please select an answer before continuing');
      return;
    }

    saveCurrentAnswer();

    // Check if there are more questions in current section
    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      setSelectedAnswer('');
    } else {
      // Move to next section or complete assessment
      if (currentSection < assessmentSections.length - 1) {
        setCurrentSection(prev => prev + 1);
        setCurrentQuestionIndex(0);
        setSelectedAnswer('');
        Notify.success(`${assessmentSections[currentSection]} section completed!`);
      } else {
        // All sections completed
        completeAssessment();
      }
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(prev => prev - 1);
    } else if (currentSection > 0) {
      setCurrentSection(prev => prev - 1);
      const prevSectionQuestions = getPreviousSectionQuestions();
      setCurrentQuestionIndex(prevSectionQuestions.length - 1);
    }
  };

  const getPreviousSectionQuestions = () => {
    const prevSectionName = assessmentSections[currentSection - 1];
    switch (prevSectionName) {
      case 'career': return careerQuestions;
      case 'skills': return skillsQuestions;
      case 'personality': return personalityQuestions;
      default: return [];
    }
  };

  const completeAssessment = async () => {
    setSubmitting(true);
    try {
      const token = localStorage.getItem('token');
      const assessmentData = {
        careerAnswers,
        skillsAnswers,
        personalityAnswers,
        isCompleted: true,
        completedAt: new Date().toISOString()
      };

      const response = await fetch('http://localhost:5000/api/assessments', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(assessmentData)
      });

      if (response.ok) {
        setIsCompleted(true);
        setCanGenerateRecommendations(true);
        Notify.success('🎉 Assessment completed successfully!');
      } else {
        throw new Error('Failed to submit assessment');
      }
    } catch (err) {
      console.error('Error submitting assessment:', err);
      Notify.failure('Failed to submit assessment');
    } finally {
      setSubmitting(false);
    }
  };

  const generateRecommendations = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/careers/recommend', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          careerAnswers,
          skillsAnswers,
          personalityAnswers
        })
      });

      if (response.ok) {
        const data = await response.json();
        Notify.success('Recommendations generated successfully!');
        // Navigate to recommendations page or show recommendations
        window.location.href = '/recommendations';
      } else {
        throw new Error('Failed to generate recommendations');
      }
    } catch (err) {
      console.error('Error generating recommendations:', err);
      Notify.failure('Failed to generate recommendations');
    }
  };

  const getSectionProgress = () => {
    const sectionName = assessmentSections[currentSection];
    switch (sectionName) {
      case 'career':
        return Object.keys(careerAnswers).length;
      case 'skills':
        return Object.keys(skillsAnswers).length;
      case 'personality':
        return Object.keys(personalityAnswers).length;
      default:
        return 0;
    }
  };

  const getOverallProgress = () => {
    const total = Object.keys(careerAnswers).length + 
                 Object.keys(skillsAnswers).length + 
                 Object.keys(personalityAnswers).length;
    return totalQuestions > 0 ? Math.round((total / totalQuestions) * 100) : 0;
  };

  const canShowNext = () => selectedAnswer !== '';
  const canShowPrevious = () => currentQuestionIndex > 0 || currentSection > 0;

  if (loading) {
    return (
      <div className="assessment-container">
        <div className="loading-card">
          <div className="loading-spinner"></div>
          <h2>Loading Assessment...</h2>
          <p>Preparing your personalized career assessment</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="assessment-container">
        <div className="error-card">
          <div className="error-icon">⚠️</div>
          <h2>Assessment Error</h2>
          <p>{error}</p>
          <button onClick={() => window.location.reload()} className="retry-btn">
            Try Again
          </button>
        </div>
      </div>
    );
  }

  if (isCompleted) {
    return (
      <div className="assessment-container">
        <div className="completion-card">
          <div className="completion-content">
            <div className="success-icon">🎉</div>
            <h1 className="completion-title">Assessment Completed!</h1>
            <p className="completion-subtitle">
              Congratulations! You've successfully completed all sections of the career assessment.
            </p>
            
            <div className="completion-stats">
              <div className="stat-item">
                <div className="stat-number">{totalQuestions}</div>
                <div className="stat-label">Questions Answered</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">3</div>
                <div className="stat-label">Sections Completed</div>
              </div>
              <div className="stat-item">
                <div className="stat-number">100%</div>
                <div className="stat-label">Progress</div>
              </div>
            </div>

            <div className="completion-actions">
              <button 
                onClick={generateRecommendations}
                className="generate-recommendations-btn"
              >
                <span className="btn-icon">🎯</span>
                <div className="btn-content">
                  <span className="btn-title">Generate Career Recommendations</span>
                  <span className="btn-subtitle">Get personalized faculty and department suggestions</span>
                </div>
                <span className="btn-arrow">→</span>
              </button>

              <button 
                onClick={() => window.location.href = '/dashboard'}
                className="dashboard-btn"
              >
                Return to Dashboard
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="assessment-container">
      <div className="assessment-content">
        {/* Header */}
        <div className="assessment-header">
          <div className="header-info">
            <h1 className="assessment-title">Career Assessment</h1>
            <p className="assessment-subtitle">
              Section {currentSection + 1} of {assessmentSections.length}: {assessmentSections[currentSection].charAt(0).toUpperCase() + assessmentSections[currentSection].slice(1)} Questions
            </p>
          </div>
          <div className="progress-info">
            <div className="overall-progress">
              <span className="progress-text">{getOverallProgress()}% Complete</span>
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${getOverallProgress()}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        {/* Section Progress */}
        <div className="section-progress">
          {assessmentSections.map((section, index) => (
            <div 
              key={section}
              className={`section-indicator ${
                index < currentSection ? 'completed' : 
                index === currentSection ? 'active' : 'pending'
              }`}
            >
              <div className="section-icon">
                {index < currentSection ? '✓' : 
                 section === 'career' ? '💼' :
                 section === 'skills' ? '⚡' : '🧠'}
              </div>
              <span className="section-name">{section.charAt(0).toUpperCase() + section.slice(1)}</span>
            </div>
          ))}
        </div>

        {/* Question Card */}
        {currentQuestion && (
          <div className="question-card">
            <div className="question-header">
              <div className="question-number">
                Question {currentQuestionIndex + 1} of {currentQuestions.length}
              </div>
              <div className="section-progress-text">
                {getSectionProgress()} / {currentQuestions.length} answered in this section
              </div>
            </div>

            <div className="question-content">
              <h2 className="question-text">{currentQuestion.questionText}</h2>
              
              <div className="answer-options">
                {currentQuestion.options && currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`answer-option ${selectedAnswer === option ? 'selected' : ''}`}
                  >
                    <div className="option-radio">
                      {selectedAnswer === option && <div className="radio-dot"></div>}
                    </div>
                    <span className="option-text">{option}</span>
                  </button>
                ))}
              </div>
            </div>

            <div className="question-navigation">
              <button 
                onClick={handlePrevious}
                disabled={!canShowPrevious()}
                className="nav-btn prev-btn"
              >
                ← Previous
              </button>

              <div className="question-counter">
                {currentQuestionIndex + 1} / {currentQuestions.length}
              </div>

              <button 
                onClick={handleNext}
                disabled={!canShowNext() || submitting}
                className="nav-btn next-btn"
              >
                {currentSection === assessmentSections.length - 1 && 
                 currentQuestionIndex === currentQuestions.length - 1 ? (
                  submitting ? 'Submitting...' : 'Complete Assessment'
                ) : (
                  'Next →'
                )}
              </button>
            </div>
          </div>
        )}

        {/* Assessment Info */}
        <div className="assessment-info">
          <div className="info-item">
            <span className="info-icon">📊</span>
            <span className="info-text">Your answers are automatically saved</span>
          </div>
          <div className="info-item">
            <span className="info-icon">🔒</span>
            <span className="info-text">All responses are confidential</span>
          </div>
          <div className="info-item">
            <span className="info-icon">⏱️</span>
            <span className="info-text">Take your time - no time limit</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Assessment;