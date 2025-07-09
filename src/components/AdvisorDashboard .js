import React, { useState, useEffect } from 'react';

const AdvisorDashboard = () => {
  const [dashboardData, setDashboardData] = useState(null);
  const [pendingProfiles, setPendingProfiles] = useState([]);
  const [selectedProfile, setSelectedProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [reviewData, setReviewData] = useState({
    approved: true,
    advisorNotes: '',
    recommendedFaculty: '',
    recommendedDepartment: '',
    careerAdvice: '',
    nextSteps: ''
  });

  // Fetch dashboard data
  useEffect(() => {
    fetchDashboardData();
    fetchPendingProfiles();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/advisor/dashboard', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setDashboardData(data.data);
      }
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
    }
  };

  const fetchPendingProfiles = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('/api/advisor/profiles/pending', {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setPendingProfiles(data.data.profiles);
      }
    } catch (error) {
      console.error('Error fetching pending profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchProfileDetails = async (profileId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/advisor/profiles/${profileId}/review`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      const data = await response.json();
      if (data.success) {
        setSelectedProfile(data.data);
      }
    } catch (error) {
      console.error('Error fetching profile details:', error);
    }
  };

  const submitReview = async (profileId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`/api/advisor/profiles/${profileId}/review`, {
        method: 'PUT',
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(reviewData)
      });
      const data = await response.json();
      if (data.success) {
        alert(`Profile ${reviewData.approved ? 'approved' : 'rejected'} successfully!`);
        setSelectedProfile(null);
        fetchPendingProfiles(); // Refresh list
      }
    } catch (error) {
      console.error('Error submitting review:', error);
    }
  };

  const downloadDocument = (profileId, documentType, fileName) => {
    const token = localStorage.getItem('token');
    const url = `/api/advisor/profiles/${profileId}/download/${documentType}/${fileName}`;
    
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('authorization', `Bearer ${token}`);
    link.click();
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading dashboard...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Career Advisor Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back, {dashboardData?.advisorInfo?.name}</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Total Profiles</h3>
          <p className="text-3xl font-bold text-blue-600">{dashboardData?.statistics?.total || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Pending Review</h3>
          <p className="text-3xl font-bold text-orange-600">{dashboardData?.statistics?.pending || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Approved</h3>
          <p className="text-3xl font-bold text-green-600">{dashboardData?.statistics?.approved || 0}</p>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h3 className="text-lg font-semibold text-gray-700">Approval Rate</h3>
          <p className="text-3xl font-bold text-purple-600">{dashboardData?.statistics?.approvalRate || 0}%</p>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Pending Profiles List */}
        <div className="lg:col-span-2">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">Pending Reviews</h2>
              <p className="text-gray-600 mt-1">Students waiting for profile approval</p>
            </div>
            
            <div className="divide-y divide-gray-200">
              {pendingProfiles.map((profile) => (
                <div key={profile._id} className="p-6 hover:bg-gray-50">
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="text-lg font-medium text-gray-900">
                        {profile.userId?.name || 'Unknown Student'}
                      </h3>
                      <p className="text-sm text-gray-600">{profile.email}</p>
                      <div className="mt-2 flex flex-wrap gap-2">
                        <span className="px-2 py-1 bg-blue-100 text-blue-800 text-xs rounded">
                          {profile.nationality}
                        </span>
                        <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded">
                          {profile.desiredFaculty}
                        </span>
                        <span className="px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded">
                          {profile.completionPercentage}% Complete
                        </span>
                      </div>
                      <p className="text-xs text-gray-500 mt-1">
                        Submitted: {new Date(profile.createdAt).toLocaleDateString()}
                      </p>
                    </div>
                    <button
                      onClick={() => fetchProfileDetails(profile._id)}
                      className="ml-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
                    >
                      Review
                    </button>
                  </div>
                </div>
              ))}
              
              {pendingProfiles.length === 0 && (
                <div className="p-6 text-center text-gray-500">
                  No pending profiles to review
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Profile Details Panel */}
        <div className="lg:col-span-1">
          <div className="bg-white rounded-lg shadow-md">
            <div className="p-6 border-b border-gray-200">
              <h2 className="text-xl font-semibold text-gray-900">
                {selectedProfile ? 'Profile Review' : 'Select Profile'}
              </h2>
            </div>
            
            {selectedProfile ? (
              <div className="p-6">
                {/* Student Info */}
                <div className="mb-6">
                  <h3 className="text-lg font-medium text-gray-900 mb-3">
                    {selectedProfile.profile.userId?.name}
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p><strong>Email:</strong> {selectedProfile.profile.email}</p>
                    <p><strong>Age:</strong> {selectedProfile.profile.age}</p>
                    <p><strong>Nationality:</strong> {selectedProfile.profile.nationality}</p>
                    <p><strong>Academic Level:</strong> {selectedProfile.profile.currentAcademicLevel}</p>
                    <p><strong>High School Grade:</strong> {selectedProfile.profile.highSchoolGrades}</p>
                    <p><strong>Desired Faculty:</strong> {selectedProfile.profile.desiredFaculty}</p>
                    <p><strong>Desired Department:</strong> {selectedProfile.profile.desiredDepartment}</p>
                  </div>
                </div>

                {/* Career Goals */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Career Goals</h4>
                  <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                    {selectedProfile.profile.careerGoals}
                  </p>
                </div>

                {/* Documents */}
                <div className="mb-6">
                  <h4 className="font-medium text-gray-900 mb-2">Documents</h4>
                  <div className="space-y-2">
                    {selectedProfile.profile.documents?.map((doc, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{doc.originalName}</span>
                        <button
                          onClick={() => downloadDocument(selectedProfile.profile._id, 'document', doc.filename)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          Download
                        </button>
                      </div>
                    ))}
                    
                    {selectedProfile.profile.images?.map((img, index) => (
                      <div key={index} className="flex items-center justify-between p-2 bg-gray-50 rounded">
                        <span className="text-sm">{img.originalName}</span>
                        <button
                          onClick={() => downloadDocument(selectedProfile.profile._id, 'image', img.filename)}
                          className="text-blue-600 hover:text-blue-800 text-sm"
                        >
                          View
                        </button>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recommendations */}
                {selectedProfile.recommendations && (
                  <div className="mb-6">
                    <h4 className="font-medium text-gray-900 mb-2">AI Recommendations</h4>
                    <div className="space-y-2">
                      {selectedProfile.recommendations.map((rec, index) => (
                        <div key={index} className="p-2 bg-blue-50 rounded">
                          <p className="text-sm font-medium text-blue-900">{rec.title}</p>
                          <p className="text-xs text-blue-700">{rec.message}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Review Form */}
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Decision
                    </label>
                    <select
                      value={reviewData.approved}
                      onChange={(e) => setReviewData({...reviewData, approved: e.target.value === 'true'})}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                    >
                      <option value={true}>Approve Profile</option>
                      <option value={false}>Request Improvements</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Recommended Faculty
                    </label>
                    <input
                      type="text"
                      value={reviewData.recommendedFaculty}
                      onChange={(e) => setReviewData({...reviewData, recommendedFaculty: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2"
                      placeholder="e.g., Faculty of Information Technology"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Career Advice
                    </label>
                    <textarea
                      value={reviewData.careerAdvice}
                      onChange={(e) => setReviewData({...reviewData, careerAdvice: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 h-20"
                      placeholder="Provide career guidance and recommendations..."
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Advisor Notes
                    </label>
                    <textarea
                      value={reviewData.advisorNotes}
                      onChange={(e) => setReviewData({...reviewData, advisorNotes: e.target.value})}
                      className="w-full border border-gray-300 rounded px-3 py-2 h-20"
                      placeholder="Internal notes and feedback..."
                    />
                  </div>

                  <div className="flex space-x-2">
                    <button
                      onClick={() => submitReview(selectedProfile.profile._id)}
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700"
                    >
                      Submit Review
                    </button>
                    <button
                      onClick={() => setSelectedProfile(null)}
                      className="flex-1 bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="p-6 text-center text-gray-500">
                Select a profile from the list to begin review
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorDashboard;