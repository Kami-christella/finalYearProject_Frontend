import { useState, useEffect, useContext } from 'react';
import { useParams, Link } from 'react-router-dom';
import axios from 'axios';
import './Dashboard_Styles/Results.css';
import { AuthContext } from './context/AuthContext';
import { Notify } from 'notiflix';

function Results() {
  const [recommendations, setRecommendations] = useState([]);
  const [assessment, setAssessment] = useState(null);
  const [transcriptData, setTranscriptData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [aiRecommendations, setAiRecommendations] = useState([]);
  const { authToken } = useContext(AuthContext);
  const { id } = useParams(); // Get assessment ID from URL
  
  useEffect(() => {
    const fetchResults = async () => {
      let tokenValue;
      try {
        // If authToken is already an object with a token property
        if (typeof authToken === 'object' && authToken.token) {
          tokenValue = authToken.token;
        } else {
          const tokenFromStorage = localStorage.getItem('userToken');
          if (tokenFromStorage) {
            try {
              const parsedToken = JSON.parse(tokenFromStorage);
              tokenValue = parsedToken.token || tokenFromStorage;
            } catch (e) {
              // If parsing fails, use the raw token
              tokenValue = tokenFromStorage;
            }
          }
        }
      } catch (e) {
        tokenValue = authToken || localStorage.getItem('userToken');
      }

      if (!tokenValue) {
        console.error("Auth token is missing!");
        Notify.failure("Authentication error. Please log in again.");
        setLoading(false);
        return;
      }

      try {
        // Get recommendations from localStorage
        const storedRecommendations = localStorage.getItem('assessmentRecommendations');
        const storedAIRecommendations = localStorage.getItem('AIRecommendations');
        console.log("AI Recommendations ",storedAIRecommendations);
        // If recommendations are stored, parse and set them

        
        if (storedRecommendations) {
          try {
            const parsedRecs = JSON.parse(storedRecommendations);
            setRecommendations(Array.isArray(parsedRecs) ? parsedRecs : []);
          } catch (e) {
            console.error('Error parsing stored recommendations:', e);
            setRecommendations([]);
          }
        }
        
        if (storedAIRecommendations) {
          try {
            const parsedAIRecs = JSON.parse(storedAIRecommendations);
            setAiRecommendations(Array.isArray(parsedAIRecs) ? parsedAIRecs : []);
          } catch (e) {
            console.error('Error parsing stored AI recommendations:', e);
            setAiRecommendations([]);
          }
        }
        
        // Try to fetch assessment details from your backend
        const API_BASE_URL = 'http://localhost:5000';
        
        if (id) {
          try {
            const assessmentResponse = await axios.get(
              `${API_BASE_URL}/api/assessments/${id}`,
              {
                headers: {
                  'Authorization': `Bearer ${tokenValue}`,
                  'Content-Type': 'application/json'
                }
              }
            );
            
            setAssessment(assessmentResponse.data);
            
            // Extract transcript data from the assessment response if available
            if (assessmentResponse.data.transcriptData) {
              setTranscriptData(assessmentResponse.data.transcriptData);
            }
          } catch (assessmentError) {
            console.warn('Could not fetch assessment details:', assessmentError);
            // Continue without assessment details
          }
        }
        
      } catch (error) {
        console.error('Error loading results:', error);
        Notify.failure("Error loading your assessment results. Please try again.");
      } finally {
        setLoading(false);
      }
    };
    
    fetchResults();
  }, [id, authToken]);
  
  const getPriorityClass = (priority) => {
    switch (priority) {
      case 'high':
        return 'priority-high';
      case 'medium':
        return 'priority-medium';
      case 'low':
        return 'priority-low';
      default:
        return '';
    }
  };
  
  // Function to convert numerical grade to letter grade
  const getLetterGrade = (numGrade) => {
    if (numGrade >= 90) return 'A';
    if (numGrade >= 80) return 'B';
    if (numGrade >= 70) return 'C';
    if (numGrade >= 60) return 'D';
    return 'F';
  };
  
  // Combine all recommendations
  const allRecommendations = [...recommendations, ...aiRecommendations];
  
  if (loading) {
    return <div className="loading-container">Loading your personalized recommendations...</div>;
  }
  
  return (
    <div className="assessment-results-container">
      <h2>Your Assessment Results</h2>
      
      {assessment && assessment.gpa && (
        <div className="assessment-summary">
          <h3>Academic Summary</h3>
          <p>GPA: <strong>{assessment.gpa}</strong></p>
          {assessment.isOnProbation && (
            <div className="probation-warning">
              Your GPA places you on academic probation. Please review the high-priority recommendations below.
            </div>
          )}
          {assessment.isAtRisk && (
            <div className="at-risk-warning">
              Your GPA puts you at risk of academic probation. Taking action now can help improve your standing.
            </div>
          )}
        </div>
      )}
      
      {/* Display transcript data if available */}
      {transcriptData && (
        <div className="transcript-summary">
          <h3>Transcript Analysis</h3>
          <div className="transcript-details">
            <div className="transcript-stats">
              <div className="transcript-stat">
                <span className="stat-label">GPA:</span>
                <span className="stat-value">{transcriptData.gpa}</span>
              </div>
              <div className="transcript-stat">
                <span className="stat-label">Total Credits:</span>
                <span className="stat-value">{transcriptData.totalCredits}</span>
              </div>
              <div className="transcript-stat">
                <span className="stat-label">Courses:</span>
                <span className="stat-value">{transcriptData.courses?.length || 0}</span>
              </div>
            </div>
            
            {transcriptData.courses && transcriptData.courses.length > 0 && (
              <div className="course-list">
                <h4>Course Performance</h4>
                <table className="courses-table">
                  <thead>
                    <tr>
                      <th>Course Code</th>
                      <th>Course Name</th>
                      <th>Credits</th>
                      <th>Grade</th>
                    </tr>
                  </thead>
                  <tbody>
                    {transcriptData.courses.map((course, index) => (
                      <tr key={index} className={course.grade?.startsWith('A') ? 'grade-a' : 
                                               course.grade?.startsWith('B') ? 'grade-b' : 
                                               course.grade?.startsWith('C') ? 'grade-c' : 
                                               course.grade?.startsWith('D') ? 'grade-d' : 'grade-f'}>
                        <td>{course.code}</td>
                        <td>{course.name}</td>
                        <td>{course.credits}</td>
                        <td>{course.grade}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      )}

      <div className="recommendations-container">
        <h3>Personalized Recommendations</h3>
        
        {aiRecommendations.length === 0 ? (
          <div className="no-results-container">
            <p>No recommendations available yet. Complete an assessment to see personalized recommendations.</p>
            <Link to="/dashboard" className="back-to-assessments-btn">
              Take an Assessment
            </Link>
          </div>
        ) : (
          <div>
            {/* Group recommendations by category */}
            {['academic', 'emotional', 'environment', 'general'].map(category => {
              const categoryRecs = aiRecommendations.filter(rec => 
                rec.category === category || (!rec.category && category === 'general')
              );
              
              if (categoryRecs.length === 0) return null;
              
              return (
                <div key={category} className={`recommendation-category ${category}`}>
                  <h4>{category.charAt(0).toUpperCase() + category.slice(1)} Recommendations</h4>
                  {categoryRecs.map((rec, index) => (
                    <div key={index} className={`recommendation-item ${getPriorityClass(rec.priority)}`}>
                      <div className="recommendation-content">
                        {rec.priority && (
                          <div className={`priority-badge ${getPriorityClass(rec.priority)}`}>
                            {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                          </div>
                        )}
                        {typeof rec.advice === 'string' ? (
                          rec.advice.split('\n\n').map((paragraph, pIndex) => (
                            <p key={pIndex}>{paragraph}</p>
                          ))
                        ) : (
                          <p>{JSON.stringify(rec.advice)}</p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              );
            })}
            
            {/* Display any recommendations without categories */}
            {aiRecommendations.some(rec => !rec.category) && (
              <div className="recommendation-category general">
                <h4>Additional Recommendations</h4>
                {aiRecommendations
                  .filter(rec => !rec.category)
                  .map((rec, index) => (
                    <div key={index} className={`recommendation-item ${getPriorityClass(rec.priority)}`}>
                      <div className="recommendation-content">
                        {rec.priority && (
                          <div className={`priority-badge ${getPriorityClass(rec.priority)}`}>
                            {rec.priority.charAt(0).toUpperCase() + rec.priority.slice(1)} Priority
                          </div>
                        )}
                        {typeof rec.advice === 'string' ? (
                          rec.advice.split('\n\n').map((paragraph, pIndex) => (
                            <p key={pIndex}>{paragraph}</p>
                          ))
                        ) : (
                          <p>{JSON.stringify(rec.advice)}</p>
                        )}
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        )}
      </div>
      
      <div className="actions-container">
        <Link to="/dashboard" className="back-btn">
          Back to Dashboard
        </Link>
        {id && (
          <Link to={`/assessment/${id}/print`} className="print-btn">
            Print Results
          </Link>
        )}
      </div>
    </div>
  );
}

export default Results;