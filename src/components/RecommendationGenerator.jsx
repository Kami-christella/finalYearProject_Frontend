// components/RecommendationGenerator.jsx
import React, { useState } from 'react';
import { Notify } from 'notiflix';
import AIRecommendationService from '../utils/aiRecommendationService';
import './styles/RecommendationGenerator.css';

const RecommendationGenerator = ({ onRecommendationsGenerated }) => {
  const [generating, setGenerating] = useState(false);
  const [recommendations, setRecommendations] = useState([]);
  const [error, setError] = useState('');

  const handleGenerateRecommendations = async () => {
    setGenerating(true);
    setError('');

    try {
      Notify.info('🤖 AI is analyzing your profile and assessment data...');
      
      const response = await AIRecommendationService.generateRecommendations();
      
      if (response.success) {
        setRecommendations(response.recommendations);
        Notify.success('🎉 AI recommendations generated successfully!');
        
        if (onRecommendationsGenerated) {
          onRecommendationsGenerated(response.recommendations);
        }
      } else {
        throw new Error(response.message || 'Failed to generate recommendations');
      }
    } catch (err) {
      setError(err.message);
      Notify.failure('Failed to generate recommendations: ' + err.message);
    } finally {
      setGenerating(false);
    }
  };

  const getMatchColor = (percentage) => {
    if (percentage >= 90) return '#28a745';
    if (percentage >= 80) return '#17a2b8';
    if (percentage >= 70) return '#ffc107';
    return '#dc3545';
  };

  return (
    <div className="recommendation-generator">
      <div className="generator-header">
        <h2 className="generator-title">🤖 AI-Powered Career Recommendations</h2>
        <p className="generator-subtitle">
          Our AI analyzes your profile, assessment responses, and career goals to provide personalized recommendations
        </p>
      </div>

      {error && (
        <div className="error-message">
          <span className="error-icon">⚠️</span>
          <span>{error}</span>
        </div>
      )}

      <div className="generator-actions">
        <button 
          onClick={handleGenerateRecommendations}
          disabled={generating}
          className={`generate-btn ${generating ? 'generating' : ''}`}
        >
          {generating ? (
            <>
              <div className="spinner"></div>
              <span>AI is analyzing your data...</span>
            </>
          ) : (
            <>
              <span className="btn-icon">🎯</span>
              <span>Generate AI Recommendations</span>
            </>
          )}
        </button>
      </div>

      {recommendations.length > 0 && (
        <div className="recommendations-results">
          <h3 className="results-title">Your Personalized Recommendations</h3>
          <div className="recommendations-list">
            {recommendations.map((rec, index) => (
              <div key={index} className="recommendation-card">
                <div className="rec-header">
                  <div className="rec-rank">#{index + 1}</div>
                  <div className="rec-title-section">
                    <h4 className="rec-faculty">{rec.faculty}</h4>
                    <h5 className="rec-department">{rec.department}</h5>
                  </div>
                  <div 
                    className="match-percentage"
                    style={{ backgroundColor: getMatchColor(rec.matchPercentage) }}
                  >
                    {rec.matchPercentage}% Match
                  </div>
                </div>

                <div className="rec-content">
                  <div className="reasoning-section">
                    <h6>Why this is a good match for you:</h6>
                    <p className="reasoning-text">{rec.reasoning}</p>
                  </div>

                  <div className="strengths-section">
                    <h6>Your Strengths:</h6>
                    <div className="tags-list">
                      {rec.strengths?.map((strength, idx) => (
                        <span key={idx} className="strength-tag">{strength}</span>
                      ))}
                    </div>
                  </div>

                  <div className="considerations-section">
                    <h6>Things to Consider:</h6>
                    <ul className="considerations-list">
                      {rec.considerations?.map((consideration, idx) => (
                        <li key={idx}>{consideration}</li>
                      ))}
                    </ul>
                  </div>

                  <div className="career-outlook-section">
                    <h6>Career Outlook:</h6>
                    <p className="outlook-text">{rec.careerOutlook}</p>
                  </div>

                  <div className="next-steps-section">
                    <h6>Recommended Next Steps:</h6>
                    <ol className="next-steps-list">
                      {rec.nextSteps?.map((step, idx) => (
                        <li key={idx}>{step}</li>
                      ))}
                    </ol>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="ai-info">
        <div className="info-card">
          <h4>How our AI recommendations work:</h4>
          <ul>
            <li>🧠 <strong>Profile Analysis:</strong> We analyze your academic background, skills, and career goals</li>
            <li>📊 <strong>Assessment Integration:</strong> Your personality, career interests, and skills assessment responses</li>
            <li>🎯 <strong>Smart Matching:</strong> AI matches you with programs based on compatibility and success potential</li>
            <li>📈 <strong>Career Insights:</strong> Considers job market trends and salary expectations</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default RecommendationGenerator;