// // frontend/src/utils/aiRecommendationService.js
// class AIRecommendationService {
//   constructor() {
//     this.baseURL = 'http://localhost:5000/api';
//   }

//   async generateRecommendations() {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('Authentication required');
//       }

//       const response = await fetch(`${this.baseURL}/recommendations/generate`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to generate recommendations');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error generating recommendations:', error);
//       throw error;
//     }
//   }

//   async getRecommendations() {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${this.baseURL}/recommendations`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (!response.ok) {
//         const errorData = await response.json();
//         throw new Error(errorData.message || 'Failed to fetch recommendations');
//       }

//       return await response.json();
//     } catch (error) {
//       console.error('Error fetching recommendations:', error);
//       throw error;
//     }
//   }
// }

// export default new AIRecommendationService();


// frontend/src/utils/aiRecommendationService.js
class AIRecommendationService {
  constructor() {
    // Direct URL for development - change this for production
    this.baseURL = 'http://localhost:5000/api';
    this.recommendationsEndpoint = `${this.baseURL}/recommendations`;
  }

  // Helper method to get auth headers
  getAuthHeaders() {
    const token = localStorage.getItem('token');
    if (!token) {
      throw new Error('Authentication required. Please log in first.');
    }
    return {
      'Authorization': `Bearer ${token}`,
      'Content-Type': 'application/json'
    };
  }

  // Helper method to handle API responses
  async handleResponse(response) {
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      
      // Handle specific error cases
      if (response.status === 401) {
        // Clear invalid token
        localStorage.removeItem('token');
        throw new Error('Session expired. Please log in again.');
      } else if (response.status === 429) {
        throw new Error(errorData.message || 'Too many requests. Please try again later.');
      } else if (response.status === 404) {
        throw new Error(errorData.message || 'Resource not found. Please complete your profile and assessment first.');
      }
      
      throw new Error(errorData.message || `Request failed with status ${response.status}`);
    }

    return await response.json();
  }

  // ===== MAIN RECOMMENDATION METHODS =====

  /**
   * Generate AI-powered recommendations (Main method)
   * This is the primary method that uses AI analysis
   */
  async generateRecommendations() {
    try {
      console.log('🤖 Generating AI-powered recommendations...');
      
      const response = await fetch(`${this.recommendationsEndpoint}/generate`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      const result = await this.handleResponse(response);
      
      console.log('✅ AI recommendations generated successfully:', {
        count: result.data?.recommendations?.length || 0,
        source: result.data?.metadata?.generatedBy || 'unknown',
        documentVerified: result.data?.metadata?.documentAnalysis?.documentsVerified || false
      });

      return result;
    } catch (error) {
      console.error('❌ Error generating AI recommendations:', error);
      throw error;
    }
  }

  /**
   * Get quick preview recommendations (without full AI analysis)
   * Faster but less detailed than full AI recommendations
   */
  async getPreviewRecommendations() {
    try {
      console.log('⚡ Getting preview recommendations...');
      
      const response = await fetch(`${this.recommendationsEndpoint}/preview`, {
        method: 'POST',
        headers: this.getAuthHeaders()
      });

      const result = await this.handleResponse(response);
      
      console.log('✅ Preview recommendations generated:', {
        count: result.data?.recommendations?.length || 0,
        isPreview: result.data?.isPreview
      });

      return result;
    } catch (error) {
      console.error('❌ Error getting preview recommendations:', error);
      throw error;
    }
  }

  // ===== PROGRAM INFORMATION METHODS =====

  /**
   * Get all available academic programs
   */
  async getAllPrograms() {
    try {
      const response = await fetch(`${this.recommendationsEndpoint}/programs`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('❌ Error fetching programs:', error);
      throw error;
    }
  }

  /**
   * Get specific faculty information
   * @param {string} faculty - Faculty name
   */
  async getFacultyInfo(faculty) {
    try {
      const encodedFaculty = encodeURIComponent(faculty);
      const response = await fetch(`${this.recommendationsEndpoint}/programs/${encodedFaculty}`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('❌ Error fetching faculty info:', error);
      throw error;
    }
  }

  /**
   * Get specific department information
   * @param {string} faculty - Faculty name
   * @param {string} department - Department name
   */
  async getDepartmentInfo(faculty, department) {
    try {
      const encodedFaculty = encodeURIComponent(faculty);
      const encodedDepartment = encodeURIComponent(department);
      const response = await fetch(`${this.recommendationsEndpoint}/programs/${encodedFaculty}/${encodedDepartment}`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('❌ Error fetching department info:', error);
      throw error;
    }
  }

  // ===== SYSTEM METHODS =====

  /**
   * Get recommendation system health status
   */
  async getSystemHealth() {
    try {
      const response = await fetch(`${this.recommendationsEndpoint}/health`);
      return await this.handleResponse(response);
    } catch (error) {
      console.error('❌ Error checking system health:', error);
      throw error;
    }
  }

  /**
   * Get user's recommendation history
   */
  async getRecommendationHistory() {
    try {
      const response = await fetch(`${this.recommendationsEndpoint}/history`, {
        headers: this.getAuthHeaders()
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('❌ Error fetching recommendation history:', error);
      throw error;
    }
  }

  /**
   * Submit feedback on recommendations
   * @param {Object} feedbackData - Feedback object
   */
  async submitFeedback(feedbackData) {
    try {
      const response = await fetch(`${this.recommendationsEndpoint}/feedback`, {
        method: 'POST',
        headers: this.getAuthHeaders(),
        body: JSON.stringify(feedbackData)
      });
      return await this.handleResponse(response);
    } catch (error) {
      console.error('❌ Error submitting feedback:', error);
      throw error;
    }
  }

  // ===== CONVENIENCE METHODS =====

  /**
   * Get recommendations with retry logic
   * Tries AI recommendations first, falls back to preview if needed
   */
  async getRecommendationsWithFallback() {
    try {
      // Try AI recommendations first
      return await this.generateRecommendations();
    } catch (error) {
      console.warn('⚠️ AI recommendations failed, trying preview:', error.message);
      
      // If AI fails, try preview recommendations
      try {
        const previewResult = await this.getPreviewRecommendations();
        
        // Add fallback indication to the result
        if (previewResult.data) {
          previewResult.data.isFallback = true;
          previewResult.data.fallbackReason = error.message;
        }
        
        return previewResult;
      } catch (previewError) {
        console.error('❌ Both AI and preview recommendations failed:', previewError);
        throw new Error('Unable to generate recommendations. Please try again later.');
      }
    }
  }

  /**
   * Check if user is ready for recommendations
   * Validates that profile and assessment are complete
   */
  async validateUserReadiness() {
    try {
      // This could be expanded to check profile completeness
      const health = await this.getSystemHealth();
      return {
        ready: true,
        systemStatus: health.data?.status,
        aiAvailable: health.data?.aiProvider?.available || false
      };
    } catch (error) {
      return {
        ready: false,
        error: error.message
      };
    }
  }

  /**
   * Get comprehensive recommendation data
   * Includes recommendations, programs, and system info
   */
  async getComprehensiveData() {
    try {
      const [recommendations, programs, health] = await Promise.allSettled([
        this.getRecommendationsWithFallback(),
        this.getAllPrograms(),
        this.getSystemHealth()
      ]);

      return {
        recommendations: recommendations.status === 'fulfilled' ? recommendations.value : null,
        programs: programs.status === 'fulfilled' ? programs.value : null,
        systemHealth: health.status === 'fulfilled' ? health.value : null,
        errors: {
          recommendations: recommendations.status === 'rejected' ? recommendations.reason : null,
          programs: programs.status === 'rejected' ? programs.reason : null,
          health: health.status === 'rejected' ? health.reason : null
        }
      };
    } catch (error) {
      console.error('❌ Error getting comprehensive data:', error);
      throw error;
    }
  }

  // ===== UTILITY METHODS =====

  /**
   * Format recommendations for display
   * @param {Object} recommendationsData - Raw recommendation data
   */
  formatRecommendations(recommendationsData) {
    if (!recommendationsData?.data?.recommendations) {
      return [];
    }

    return recommendationsData.data.recommendations.map(rec => ({
      ...rec,
      id: `${rec.faculty}-${rec.department}`.replace(/\s+/g, '-').toLowerCase(),
      formattedSalary: rec.averageSalary || 'Salary information not available',
      strengthsText: rec.strengths?.join(', ') || '',
      considerationsText: rec.considerations?.join(', ') || '',
      nextStepsText: rec.nextSteps?.join(', ') || ''
    }));
  }

  /**
   * Check authentication status
   */
  isAuthenticated() {
    return !!localStorage.getItem('token');
  }

  /**
   * Clear stored data (for logout)
   */
  clearCache() {
    // If you implement caching, clear it here
    console.log('🧹 Clearing recommendation service cache');
  }
}

// Create and export singleton instance
const aiRecommendationService = new AIRecommendationService();

// ===== LEGACY COMPATIBILITY =====
// Keep the old method names for backward compatibility
aiRecommendationService.getRecommendations = aiRecommendationService.getRecommendationsWithFallback;

export default aiRecommendationService;

// Also export the class for testing or multiple instances
export { AIRecommendationService };