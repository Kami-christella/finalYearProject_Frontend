import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import './styles/Assessment.css';
import { useNavigate } from 'react-router-dom';
import aiRecommendationService from '../utils/aiRecommendationService';

const Assessment = () => {
    const navigate = useNavigate();

  // Add this useEffect at the very beginning of your component
  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem('token');
      const user = localStorage.getItem('user');
      
      if (!token || !user) {
        Notify.warning('Please log in to access this page');
        navigate('/'); // Redirect to login page
        return;
      }
      
      // Optional: Verify token is not expired
      try {
        const tokenData = JSON.parse(atob(token.split('.')[1])); // Decode JWT payload
        if (tokenData.exp * 1000 < Date.now()) {
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          Notify.failure('Session expired. Please log in again.');
          navigate('/');
          return;
        }
      } catch (error) {
        // Invalid token format
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        Notify.failure('Invalid session. Please log in again.');
        navigate('/');
        return;
      }
    };

    checkAuth();
  }, [navigate]);
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
  
  // Answers storage (matching your backend structure)
  const [careerTest, setCareerTest] = useState({});
  const [skillsAssessment, setSkillsAssessment] = useState({});
  const [personalityAssessment, setPersonalityAssessment] = useState({});
  
  // UI states
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState('');
  //const [selectedAnswer, setSelectedAnswer] = useState('');
  const [selectedAnswer, setSelectedAnswer] = useState(null);
// radio → string
// checkbox → array of strings

  // Progress calculation
  const [totalQuestions, setTotalQuestions] = useState(0);
  
  // Assessment completion
  const [isCompleted, setIsCompleted] = useState(false);
  const [hasProfile, setHasProfile] = useState(false);

  useEffect(() => {
    checkProfileStatus();
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

  const checkProfileStatus = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/student/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setHasProfile(true);
        console.log('✅ Profile found - user can take assessment');
      } else {
        setHasProfile(false);
        setError('Please complete your profile before taking the assessment');
      }
    } catch (err) {
      console.error('Error checking profile:', err);
      setHasProfile(false);
      setError('Please complete your profile before taking the assessment');
    }
  };

  const fetchAllQuestions = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('Please log in to take the assessment');
        setLoading(false);
        return;
      }

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

        setCareerQuestions(careerData || []);
        setSkillsQuestions(skillsData || []);
        setPersonalityQuestions(personalityData || []);

        const total = (careerData?.length || 0) + 
                     (skillsData?.length || 0) + 
                     (personalityData?.length || 0);
        setTotalQuestions(total);

        console.log('✅ Questions loaded:', {
          career: careerData?.length || 0,
          skills: skillsData?.length || 0,
          personality: personalityData?.length || 0,
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
        if (data.assessments && data.assessments.length > 0) {
          const latestAssessment = data.assessments[0];
          setCareerTest(latestAssessment.careerTest || {});
          setSkillsAssessment(latestAssessment.skillsAssessment || {});
          setPersonalityAssessment(latestAssessment.personalityAssessment || {});
          
          const hasCareer = Object.keys(latestAssessment.careerTest || {}).length > 0;
          const hasSkills = Object.keys(latestAssessment.skillsAssessment || {}).length > 0;
          const hasPersonality = Object.keys(latestAssessment.personalityAssessment || {}).length > 0;
          
          if (hasCareer && hasSkills && hasPersonality) {
            setIsCompleted(true);
          }
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

//   const loadSavedAnswer = () => {
//     if (!currentQuestion) return;
    
//     const sectionName = assessmentSections[currentSection];
//     let savedAnswers = {};
    
//     switch (sectionName) {
//       case 'career':
//         savedAnswers = careerTest;
//         break;
//       case 'skills':
//         savedAnswers = skillsAssessment;
//         break;
//       case 'personality':
//         savedAnswers = personalityAssessment;
//         break;
//     }
    
//     //setSelectedAnswer(savedAnswers[currentQuestion._id] || '');
//     const saved = savedAnswers[currentQuestion._id];

// if (currentQuestion.type === 'checkbox') {
//   setSelectedAnswer(saved || []);
// } else {
//   setSelectedAnswer(saved || '');
// }

//   };

const loadSavedAnswer = () => {
  if (!currentQuestion) return;

  const sectionName = assessmentSections[currentSection];
  const answersMap =
    sectionName === 'career'
      ? careerTest
      : sectionName === 'skills'
      ? skillsAssessment
      : personalityAssessment;

  const saved = answersMap[currentQuestion._id];

  if (currentQuestion.type === 'checkbox') {
    setSelectedAnswer(Array.isArray(saved) ? saved : []);
  } else {
    setSelectedAnswer(saved || '');
  }
};


  // const handleAnswerSelect = (answer) => {
  //   setSelectedAnswer(answer);
  // };

  const handleAnswerSelect = (option) => {
  if (currentQuestion.type === 'checkbox') {
    setSelectedAnswer(prev => {
      if (!Array.isArray(prev)) return [option];
      return prev.includes(option)
        ? prev.filter(o => o !== option)
        : [...prev, option];
    });
  } else {
    setSelectedAnswer(option);
  }
};

  const saveCurrentAnswer = () => {
    // if (!currentQuestion || !selectedAnswer) return;
    if (
  !currentQuestion ||
  (currentQuestion.type === 'radio' && !selectedAnswer) ||
  (currentQuestion.type === 'checkbox' && selectedAnswer.length === 0)
) return;

    
    const sectionName = assessmentSections[currentSection];
    const questionId = currentQuestion._id;
    
    switch (sectionName) {
      case 'career':
        setCareerTest(prev => ({ ...prev, [questionId]: selectedAnswer }));
        break;
      case 'skills':
        setSkillsAssessment(prev => ({ ...prev, [questionId]: selectedAnswer }));
        break;
      case 'personality':
        setPersonalityAssessment(prev => ({ ...prev, [questionId]: selectedAnswer }));
        break;
    }
  };

  const handleNext = () => {
    // if (!selectedAnswer) {
    //   Notify.warning('Please select an answer before continuing');
    //   return;
    // }

    if (
  (currentQuestion.type === 'radio' && !selectedAnswer) ||
  (currentQuestion.type === 'checkbox' && selectedAnswer.length === 0)
) {
  Notify.warning('Please select at least one answer before continuing');
  return;
}


    saveCurrentAnswer();

    if (currentQuestionIndex < currentQuestions.length - 1) {
      setCurrentQuestionIndex(prev => prev + 1);
      // setSelectedAnswer('');
      setSelectedAnswer(
  currentQuestion?.type === 'checkbox' ? [] : ''
);

    } else {
      if (currentSection < assessmentSections.length - 1) {
        setCurrentSection(prev => prev + 1);
        setCurrentQuestionIndex(0);
        // setSelectedAnswer('');
        setSelectedAnswer(
  currentQuestion?.type === 'checkbox' ? [] : ''
);

        Notify.success(`${assessmentSections[currentSection]} section completed!`);
      } else {
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
      careerTest,
      skillsAssessment,
      personalityAssessment
    };

    // Submit assessment first
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
      localStorage.setItem('assessmentCompleted', 'true');
      
      // Try to auto-generate recommendations
      try {
        Notify.info('🤖 Generating AI recommendations...');
        const recommendationResult = await aiRecommendationService.generateRecommendations();
        
        if (recommendationResult.success) {
          localStorage.setItem('hasRecommendations', 'true');
          Notify.success('🎉 Assessment completed with AI recommendations!');
        }
      } catch (recError) {
        console.log('Recommendations will be generated later:', recError.message);
        Notify.success('✅ Assessment completed! Generate recommendations from your dashboard.');
      }
    } else {
      const errorData = await response.json();
      throw new Error(errorData.message || 'Failed to submit assessment');
    }
  } catch (err) {
    console.error('Error submitting assessment:', err);
    Notify.failure('Failed to submit assessment: ' + err.message);
  } finally {
    setSubmitting(false);
  }
};
  const goToComprehensiveDashboard = () => {
    window.location.href = '/dashboard/ComprehensiveDashboard';
  };

  const getSectionProgress = () => {
    const sectionName = assessmentSections[currentSection];
    switch (sectionName) {
      case 'career':
        return Object.keys(careerTest).length;
      case 'skills':
        return Object.keys(skillsAssessment).length;
      case 'personality':
        return Object.keys(personalityAssessment).length;
      default:
        return 0;
    }
  };

  const getOverallProgress = () => {
    const total = Object.keys(careerTest).length + 
                 Object.keys(skillsAssessment).length + 
                 Object.keys(personalityAssessment).length;
    return totalQuestions > 0 ? Math.round((total / totalQuestions) * 100) : 0;
  };

  // const canShowNext = () => selectedAnswer !== '';
  const canShowNext = () => {
  if (!currentQuestion) return false;

  if (currentQuestion.type === 'checkbox') {
    return Array.isArray(selectedAnswer) && selectedAnswer.length > 0;
  }

  return !!selectedAnswer;
};

  const canShowPrevious = () => currentQuestionIndex > 0 || currentSection > 0;

  if (!hasProfile && !loading) {
    return (
      <div className="assessment-container">
        <div className="error-card">
          <div className="error-icon">👤</div>
          <h2>Profile Required</h2>
          <p>You need to complete your profile before taking the assessment.</p>
          <button 
            onClick={() => window.location.href = '/dashboard'} 
            className="create-profile-btn"
          >
            <span className="btn-icon">✨</span>
            Complete Your Profile
          </button>
        </div>
      </div>
    );
  }

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
              Your profile and assessment data are now linked together.
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
                onClick={goToComprehensiveDashboard}
                className="generate-recommendations-btn"
              >
                <span className="btn-icon">📊</span>
                <div className="btn-content">
                  <span className="btn-title">View Complete Dashboard</span>
                  <span className="btn-subtitle">See your profile, assessment results, and recommendations</span>
                </div>
                <span className="btn-arrow">→</span>
              </button>

              <button 
                onClick={() => window.location.href = '/dashboard/ComprehensiveDashboard'}
                className="secondary-btn"
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
              <h2 className="question-text">{currentQuestion.question}</h2>
              
              <div className="answer-options">
                {/* {currentQuestion.options && currentQuestion.options.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerSelect(option)}
                    className={`answer-option ${selectedAnswer === option ? 'selected' : ''}`}
                  >
                 

                    <div className="answer-options">
  {currentQuestion.options.map((option, index) => {
    const isChecked =
      currentQuestion.type === 'checkbox'
        ? selectedAnswer?.includes(option)
        : selectedAnswer === option;

    return (
      <button
        key={index}
        onClick={() => handleAnswerSelect(option)}
        className={`answer-option ${isChecked ? 'selected' : ''}`}
      >
        <div className={currentQuestion.type === 'checkbox' ? 'option-checkbox' : 'option-radio'}>
          {isChecked && <div className="check-dot"></div>}
        </div>

        <span className="option-text">{option}</span>
      </button>
    );
  })}
</div>

                    <span className="option-text">{option}</span>
                  </button>
                ))} */}

                <div className="answer-options">
  {currentQuestion.options.map((option, index) => {
    const isChecked =
      currentQuestion.type === 'checkbox'
        ? Array.isArray(selectedAnswer) && selectedAnswer.includes(option)
        : selectedAnswer === option;

    return (
      <button
        key={index}
        onClick={() => handleAnswerSelect(option)}
        className={`answer-option ${isChecked ? 'selected' : ''}`}
      >
        <div
          className={
            currentQuestion.type === 'checkbox'
              ? 'option-checkbox'
              : 'option-radio'
          }
        >
          {isChecked && <div className="check-dot" />}
        </div>

        <span className="option-text">{option}</span>
      </button>
    );
  })}
</div>

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