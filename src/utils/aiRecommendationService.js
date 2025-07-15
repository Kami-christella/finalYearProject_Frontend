// // frontend/src/utils/aiRecommendationService.js
// class AIRecommendationService {
//   constructor() {
//     this.baseURL = 'http://localhost:5000/api';
//   }

//   /**
//    * Generate new AI recommendations
//    * Calls backend which processes profile + assessment data through AI
//    */
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

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error generating recommendations:', error);
//       throw error;
//     }
//   }

//   /**
//    * Get existing recommendations
//    */
//   async getRecommendations() {
//     try {
//       const token = localStorage.getItem('token');
//       if (!token) {
//         throw new Error('Authentication required');
//       }

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

//       const data = await response.json();
//       return data;
//     } catch (error) {
//       console.error('Error fetching recommendations:', error);
//       throw error;
//     }
//   }

//   /**
//    * Get recommendation status (has user generated any?)
//    */
//   async getRecommendationStatus() {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${this.baseURL}/recommendations/status`, {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });

//       if (response.ok) {
//         const data = await response.json();
//         return data;
//       }
//       return { hasRecommendations: false, count: 0 };
//     } catch (error) {
//       console.error('Error checking recommendation status:', error);
//       return { hasRecommendations: false, count: 0 };
//     }
//   }

//   /**
//    * Save user feedback on recommendations
//    */
//   async saveRecommendationFeedback(recommendationId, feedback) {
//     try {
//       const token = localStorage.getItem('token');
//       const response = await fetch(`${this.baseURL}/recommendations/feedback`, {
//         method: 'POST',
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         },
//         body: JSON.stringify({
//           recommendationId,
//           feedback,
//           timestamp: new Date().toISOString()
//         })
//       });

//       return response.ok;
//     } catch (error) {
//       console.error('Error saving feedback:', error);
//       return false;
//     }
//   }
// }

// // Create and export a singleton instance
// const aiRecommendationService = new AIRecommendationService();
// export default aiRecommendationService;


// frontend/src/utils/aiRecommendationService.js
class AIRecommendationService {
  constructor() {
    this.baseURL = 'http://localhost:5000/api';
  }

  async generateRecommendations() {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('Authentication required');
      }

      const response = await fetch(`${this.baseURL}/recommendations/generate`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to generate recommendations');
      }

      return await response.json();
    } catch (error) {
      console.error('Error generating recommendations:', error);
      throw error;
    }
  }

  async getRecommendations() {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${this.baseURL}/recommendations`, {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Failed to fetch recommendations');
      }

      return await response.json();
    } catch (error) {
      console.error('Error fetching recommendations:', error);
      throw error;
    }
  }
}

export default new AIRecommendationService();