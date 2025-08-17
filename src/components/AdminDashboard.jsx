import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { PieChart, Pie, Cell, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer, LineChart, Line } from "recharts";
// import './styles/AdvisorDashboard.css'; // Reusing the same styles

const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'analytics', label: 'Analytics', icon: '📈' },
  { id: 'tracking', label: 'Activity Tracking', icon: '⏱️' },
  { id: 'users', label: 'User Management', icon: '👥' },
  { id: 'students', label: 'All Students', icon: '🎓' },
  { id: 'advisors', label: 'Advisors', icon: '👨‍🏫' },
  { id: 'roles', label: 'Role Management', icon: '🔧' },
  { id: 'activity', label: 'Activity Log', icon: '📋' }
];

const MANAGEMENT_ITEMS = [
  { id: 'create-user', label: 'Create User', icon: '➕' },
  { id: 'bulk-operations', label: 'Bulk Operations', icon: '⚡' },
  { id: 'system-stats', label: 'System Stats', icon: '🖥️' },
  { id: 'reports', label: 'Reports', icon: '📄' }
];

const COLORS = ["#0088FE", "#00C49F", "#FFBB28", "#FF8042", "#8884D8", "#82CA9D", "#FFC658", "#FF6B6B", "#4ECDC4", "#45B7D1"];
const BAR_COLORS = ["#8884D8", "#82CA9D", "#FFC658", "#FF7C7C", "#8DD1E1", "#D084D0", "#FFB347", "#87D68D", "#FFB6C1", "#20B2AA"];
const PROGRAM_COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042', 'red', 'pink', '#8884D8', '#82CA9D', '#FFC658', '#FF6B6B'];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('overview');
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [managementSidebarOpen, setManagementSidebarOpen] = useState(false);
  const [activeFacultyIndex, setActiveFacultyIndex] = useState(0);

  // Dashboard Data
  const [dashboardData, setDashboardData] = useState({});
  const [users, setUsers] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterRole, setFilterRole] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [analytics, setAnalytics] = useState({});
  const [activityTracking, setActivityTracking] = useState({});
  const [trackingPeriod, setTrackingPeriod] = useState('week');
  const [adminInfo, setAdminInfo] = useState({});

  // Modals and Forms
  const [showCreateUserModal, setShowCreateUserModal] = useState(false);
  const [showEditUserModal, setShowEditUserModal] = useState(false);
  const [showUserDetailsModal, setShowUserDetailsModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  // Form States
  const [createUserForm, setCreateUserForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'student',
    phone: '',
    department: ''
  });

  const [editUserForm, setEditUserForm] = useState({
    name: '',
    email: '',
    role: '',
    phone: '',
    department: '',
    isActive: true
  });

  const [bulkOperationForm, setBulkOperationForm] = useState({
    action: 'activate',
    role: 'student',
    department: ''
  });

  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 15
  });

  // Chart transformation functions
  const transformGradeDataForPieChart = (gradeDistribution) => {
    if (!gradeDistribution || !Array.isArray(gradeDistribution)) return [];
    return gradeDistribution.map(grade => ({
      name: grade._id,
      value: grade.count,
      grade: grade._id
    }));
  };

  const transformFacultyDataForBarChart = (facultyDistribution) => {
    if (!facultyDistribution || !Array.isArray(facultyDistribution)) return [];
    return facultyDistribution.map(faculty => ({
      name: faculty._id.length > 20 ? faculty._id.substring(0, 20) + '...' : faculty._id,
      fullName: faculty._id,
      students: faculty.count,
      uv: faculty.count
    }));
  };

  const transformProgramDataForBarChart = (programPreferences) => {
    if (!programPreferences || !Array.isArray(programPreferences)) return [];
    return programPreferences.map((program, index) => ({
      name: program._id.length > 15 ? program._id.substring(0, 15) + '...' : program._id,
      fullName: program._id,
      uv: program.count,
      students: program.count
    }));
  };

  // Triangle Bar Shape Component (reused from advisor dashboard)
  const getPath = (x, y, width, height) => {
    return `M${x},${y + height}C${x + width / 3},${y + height} ${x + width / 2},${y + height / 3}
    ${x + width / 2}, ${y}
    C${x + width / 2},${y + height / 3} ${x + (2 * width) / 3},${y + height} ${x + width}, ${y + height}
    Z`;
  };

  const TriangleBar = (props) => {
    const { fill, x, y, width, height } = props;
    return <path d={getPath(x, y, width, height)} stroke="none" fill={fill} />;
  };

  // Pie chart label function
  const RADIAN = Math.PI / 180;
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text x={x} y={y} fill="white" textAnchor={x > cx ? "start" : "end"} dominantBaseline="central">
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  // Fetch Functions
  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/dashboard', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      if (response.ok) {
        const data = await response.json();
        setDashboardData(data.data);
        setAdminInfo(data.data.adminInfo);
        setAnalytics(data.data.analytics);
      } else {
        Notify.failure('Failed to fetch dashboard data');
      }
    } catch (error) {
      Notify.failure('Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };

  const fetchUsers = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const params = new URLSearchParams({
        page: page.toString(),
        limit: pagination.itemsPerPage.toString(),
        role: filterRole,
        searchTerm,
        isActive: filterStatus
      });

      const response = await fetch(`http://localhost:5000/api/admin/users?${params}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setUsers(data.data.users);
        setPagination(data.data.pagination);
      } else {
        Notify.failure('Failed to fetch users');
      }
    } catch (error) {
      Notify.failure('Error loading users');
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityTracking = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/activity-tracking?period=${trackingPeriod}`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setActivityTracking(data.data);
      } else {
        Notify.failure('Failed to fetch activity tracking');
      }
    } catch (error) {
      Notify.failure('Error loading activity tracking');
    }
  };

  // User Management Functions
  const handleCreateUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(createUserForm)
      });

      if (response.ok) {
        Notify.success('User created successfully!');
        setShowCreateUserModal(false);
        setCreateUserForm({
          name: '',
          email: '',
          password: '',
          role: 'student',
          phone: '',
          department: ''
        });
        fetchUsers();
        fetchDashboardData();
      } else {
        const error = await response.json();
        Notify.failure(error.message || 'Failed to create user');
      }
    } catch (error) {
      Notify.failure('Error creating user');
    }
  };

  const handleEditUser = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${selectedUser._id}/update`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(editUserForm)
      });

      if (response.ok) {
        Notify.success('User updated successfully!');
        setShowEditUserModal(false);
        fetchUsers();
      } else {
        const error = await response.json();
        Notify.failure(error.message || 'Failed to update user');
      }
    } catch (error) {
      Notify.failure('Error updating user');
    }
  };

  const handleDeleteUser = async (userId) => {
    if (!window.confirm('Are you sure you want to delete this user? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/delete`, {
        method: 'DELETE',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        Notify.success('User deleted successfully!');
        fetchUsers();
        fetchDashboardData();
      } else {
        const error = await response.json();
        Notify.failure(error.message || 'Failed to delete user');
      }
    } catch (error) {
      Notify.failure('Error deleting user');
    }
  };

  const handleAssignAdvisor = async (userId) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${userId}/assign-advisor`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ department: 'General' })
      });

      if (response.ok) {
        Notify.success('Advisor role assigned successfully!');
        fetchUsers();
        fetchDashboardData();
      } else {
        const error = await response.json();
        Notify.failure(error.message || 'Failed to assign advisor role');
      }
    } catch (error) {
      Notify.failure('Error assigning advisor role');
    }
  };

  const handleBulkOperation = async (e) => {
    e.preventDefault();
    if (selectedUsers.length === 0) {
      Notify.warning('Please select users for bulk operation');
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/users/bulk-update', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          userIds: selectedUsers,
          action: bulkOperationForm.action,
          data: bulkOperationForm.action === 'assignRole' ? {
            role: bulkOperationForm.role,
            department: bulkOperationForm.department
          } : undefined
        })
      });

      if (response.ok) {
        const result = await response.json();
        Notify.success(`Bulk operation completed! ${result.data.usersAffected} users affected.`);
        setShowBulkModal(false);
        setSelectedUsers([]);
        fetchUsers();
        fetchDashboardData();
      } else {
        const error = await response.json();
        Notify.failure(error.message || 'Bulk operation failed');
      }
    } catch (error) {
      Notify.failure('Error performing bulk operation');
    }
  };

  const openUserDetails = async (user) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/admin/users/${user._id}/details`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        const data = await response.json();
        setSelectedUser({
          ...data.data.user,
          profile: data.data.profile,
          assessment: data.data.assessment
        });
        setShowUserDetailsModal(true);
      } else {
        Notify.failure('Failed to fetch user details');
      }
    } catch (error) {
      Notify.failure('Error loading user details');
    }
  };

  const openEditUser = (user) => {
    setSelectedUser(user);
    setEditUserForm({
      name: user.name,
      email: user.email,
      role: user.role,
      phone: user.phone || '',
      department: user.department || '',
      isActive: user.isActive
    });
    setShowEditUserModal(true);
  };

  // Utility Functions
  const handleSelectUser = (userId) => {
    setSelectedUsers(prev =>
      prev.includes(userId) ? prev.filter(id => id !== userId) : [...prev, userId]
    );
  };

  const handleSelectAllUsers = () => {
    if (selectedUsers.length === users.length) {
      setSelectedUsers([]);
    } else {
      setSelectedUsers(users.map(user => user._id));
    }
  };

  const handleLogout = () => {
    if (window.confirm('Are you sure you want to logout?')) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      Notify.success('Logged out successfully!');
      setTimeout(() => { window.location.href = '/'; }, 1000);
    }
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getRoleBadge = (role) => {
    const badges = {
      admin: <span className="role-badge admin">Admin</span>,
      advisor: <span className="role-badge advisor">Advisor</span>,
      student: <span className="role-badge student">Student</span>
    };
    return badges[role] || <span className="role-badge">{role}</span>;
  };

  const getStatusBadge = (isActive) => {
    return isActive 
      ? <span className="status-badge active">Active</span>
      : <span className="status-badge inactive">Inactive</span>;
  };

  // Effects
  useEffect(() => {
    switch (activeTab) {
      case 'overview':
      case 'analytics':
        fetchDashboardData();
        break;
      case 'tracking':
        fetchActivityTracking();
        break;
      case 'users':
      case 'students':
      case 'advisors':
      case 'roles':
        fetchUsers();
        break;
      default:
        break;
    }
  }, [activeTab, pagination.currentPage, filterRole, filterStatus, searchTerm, trackingPeriod]);

  // Filter users based on active tab
  const getFilteredUsers = () => {
    let filtered = users;
    
    switch (activeTab) {
      case 'students':
        filtered = users.filter(user => user.role === 'student');
        break;
      case 'advisors':
        filtered = users.filter(user => user.role === 'advisor');
        break;
      default:
        break;
    }
    
    return filtered;
  };

  // Loading screen
  if (loading && activeTab === 'overview') {
    return (
      <div className="advisor-dashboard">
        <div className="dashboard-layout">
          <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <div className="brand">Admin</div>
            </div>
          </aside>
          <main className="main-content">
            <div className="topbar">
              <button className="sidebar-toggle" onClick={() => setSidebarOpen(prev => !prev)}>☰</button>
              <h1 className="topbar-title">Admin Dashboard</h1>
              <div className="admin-info">
                <span>Welcome, {adminInfo.name || 'Admin'}</span>
              </div>
            </div>
            <div className="loading-container">
              <div className="loading-spinner"></div>
              <h2>Loading Admin Dashboard...</h2>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="advisor-dashboard">
      <div className="dashboard-layout">
        {/* Main Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="brand">🛡️ Admin</div>
          </div>
          <nav className="sidebar-nav">
            {SIDEBAR_ITEMS.map(tab => (
              <button
                key={tab.id}
                onClick={() => { setActiveTab(tab.id); setSidebarOpen(false); }}
                className={`sidebar-item ${activeTab === tab.id ? 'active' : ''}`}
              >
                <span className="tab-icon">{tab.icon}</span>
                <span className="tab-label">{tab.label}</span>
              </button>
            ))}
          </nav>
          <div className="sidebar-footer">
            <button className="logout-btn" onClick={handleLogout}>Logout</button>
          </div>
        </aside>

        {/* Management Sidebar */}
        

        {/* Main Content */}
        <main className="main-content" style={{ marginLeft: '200px' }}>
          {/* Enhanced Topbar */}
          <div className="topbar">
            <div className="topbar-left">
              <button className="sidebar-toggle" onClick={() => setSidebarOpen(prev => !prev)}>☰</button>
              <button 
                className="sidebar-toggle" 
                onClick={() => setManagementSidebarOpen(prev => !prev)}
                style={{ marginLeft: '0.5rem', background: '#f1f5f9' }}
              >
                ⚡
              </button>
              <h1 className="topbar-title">Admin Dashboard</h1>
            </div>
            <div className="admin-info" style={{
              display: 'flex',
              alignItems: 'center',
              gap: '1rem',
              padding: '0.5rem 1rem',
              background: '#f8fafc',
              borderRadius: '8px',
              border: '1px solid #e2e8f0'
            }}>
              <span style={{ fontWeight: '600', color: '#1e293b' }}>Welcome, {adminInfo.name || 'Admin'}</span>
              <span style={{ fontSize: '0.875rem', color: '#64748b' }}>({adminInfo.role})</span>
            </div>
          </div>

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              {/* Time Tracking Stats */}
              <div className="stats-section" style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>📊 Time-Based Activity Tracking</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #059669, #065f46)' }}>👥</div>
                    <div className="stat-content">
                      <div className="stat-value">{dashboardData.timeTracking?.registrations?.thisWeek || 0}</div>
                      <div className="stat-label">New Registrations (This Week)</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                        This Month: {dashboardData.timeTracking?.registrations?.thisMonth || 0}
                      </div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>📝</div>
                    <div className="stat-content">
                      <div className="stat-value">{dashboardData.timeTracking?.profiles?.thisWeek || 0}</div>
                      <div className="stat-label">Profiles Created (This Week)</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                        This Month: {dashboardData.timeTracking?.profiles?.thisMonth || 0}
                      </div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>🤖</div>
                    <div className="stat-content">
                      <div className="stat-value">{dashboardData.timeTracking?.recommendations?.thisWeek || 0}</div>
                      <div className="stat-label">AI Recommendations (This Week)</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                        This Month: {dashboardData.timeTracking?.recommendations?.thisMonth || 0}
                      </div>
                    </div>
                  </div>
                  
                  <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}>🎯</div>
                    <div className="stat-content">
                      <div className="stat-value">{dashboardData.userManagement?.totalUsers || 0}</div>
                      <div className="stat-label">Total Users</div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                        Active System Users
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Traditional Dashboard Stats */}
              <div className="stats-section" style={{ marginBottom: '2rem' }}>
                <h3 style={{ marginBottom: '1rem', color: '#1e293b' }}>📈 System Overview</h3>
                <div className="stats-grid">
                  <div className="stat-card">
                    <div className="stat-icon">👥</div>
                    <div className="stat-content">
                      <div className="stat-value">{dashboardData.statistics?.total || 0}</div>
                      <div className="stat-label">Total Profiles</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">⏳</div>
                    <div className="stat-content">
                      <div className="stat-value">{dashboardData.statistics?.pending || 0}</div>
                      <div className="stat-label">Pending Review</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">✅</div>
                    <div className="stat-content">
                      <div className="stat-value">{dashboardData.statistics?.approved || 0}</div>
                      <div className="stat-label">Approved</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon">📊</div>
                    <div className="stat-content">
                      <div className="stat-value">{dashboardData.statistics?.approvalRate || 0}%</div>
                      <div className="stat-label">Approval Rate</div>
                    </div>
                  </div>
                </div>
              </div>

              {/* User Role Distribution */}
              <div className="overview-charts">
                <div className="chart-card">
                  <h3>User Role Distribution</h3>
                  {dashboardData.userManagement?.usersByRole && (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
                      {dashboardData.userManagement.usersByRole.map((roleData, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.75rem',
                          background: '#f8fafc',
                          borderRadius: '6px',
                          borderLeft: `4px solid ${COLORS[index % COLORS.length]}`
                        }}>
                          <span style={{ fontWeight: '500', textTransform: 'capitalize' }}>
                            {roleData._id}s
                          </span>
                          <span style={{ fontWeight: '600', color: '#1e293b' }}>
                            {roleData.count}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
                
                <div className="chart-card">
                  <h3>Recent Activity</h3>
                  <div className="activity-summary">
                    <p>New users this week</p>
                    <div className="activity-number">{dashboardData.userManagement?.newUsersThisWeek || 0}</div>
                    <p style={{ fontSize: '0.875rem', color: '#64748b', marginTop: '0.5rem' }}>
                      This month: {dashboardData.userManagement?.newUsersThisMonth || 0}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Analytics Tab - Same as Advisor but Enhanced */}
          {activeTab === 'analytics' && (
            <div className="tab-content">
              <div className="analytics-section">
                <h3>Grade Distribution</h3>
                <div className="chart-container">
                  {analytics.gradeDistribution && analytics.gradeDistribution.length > 0 ? (
                    <div className="pie-chart-container" style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
                      <div className="pie-chart-wrapper">
                        <PieChart width={400} height={400}>
                          <Pie
                            data={transformGradeDataForPieChart(analytics.gradeDistribution)}
                            cx={200}
                            cy={200}
                            labelLine={false}
                            label={renderCustomizedLabel}
                            outerRadius={80}
                            fill="#8884d8"
                            dataKey="value"
                          >
                            {transformGradeDataForPieChart(analytics.gradeDistribution).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                            ))}
                          </Pie>
                        </PieChart>
                      </div>
                      <div className="pie-chart-legend" style={{ flex: 1 }}>
                        <h4 style={{ marginBottom: '1rem', color: '#333' }}>Grade Breakdown</h4>
                        {transformGradeDataForPieChart(analytics.gradeDistribution).map((entry, index) => (
                          <div key={index} className="legend-item" style={{ 
                            display: 'flex', 
                            alignItems: 'center', 
                            marginBottom: '0.8rem',
                            padding: '0.5rem',
                            backgroundColor: '#f8f9fa',
                            borderRadius: '6px',
                            border: '1px solid #e9ecef'
                          }}>
                            <div 
                              className="legend-color" 
                              style={{ 
                                backgroundColor: COLORS[index % COLORS.length],
                                width: '16px',
                                height: '16px',
                                borderRadius: '4px',
                                marginRight: '12px',
                                flexShrink: 0
                              }}
                            ></div>
                            <span className="legend-text" style={{ 
                              fontSize: '14px',
                              fontWeight: '500',
                              color: '#495057'
                            }}>
                              {entry.name}: {entry.value} students
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ) : (
                    <div className="no-data">
                      <p>No grade distribution data available</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="analytics-section">
                <h3>Program Preferences</h3>
                <div className="program-stats">
                  {analytics.programPreferences && analytics.programPreferences.length > 0 ? (
                    <div className="triangle-bar-chart-container" style={{ width: '100%' }}>
                      <ResponsiveContainer width="100%" height={400}>
                        <BarChart
                          data={transformProgramDataForBarChart(analytics.programPreferences)}
                          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="name" 
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            fontSize={12}
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value, name, props) => [
                              `${value} students`, 
                              props.payload.fullName
                            ]}
                          />
                          <Bar 
                            dataKey="uv" 
                            fill="#8884d8" 
                            shape={<TriangleBar />} 
                            label={{ position: 'top' }}
                          >
                            {transformProgramDataForBarChart(analytics.programPreferences).map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={PROGRAM_COLORS[index % PROGRAM_COLORS.length]} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="no-data">
                      <p>No program preferences data available</p>
                    </div>
                  )}
                </div>
              </div>

              <div className="analytics-section">
                <h3>Faculty Distribution</h3>
                <div className="faculty-stats">
                  {analytics.facultyDistribution && analytics.facultyDistribution.length > 0 ? (
                    <div className="bar-chart-container" style={{ width: '100%' }}>
                      <ResponsiveContainer width="100%" height={300}>
                        <BarChart 
                          data={transformFacultyDataForBarChart(analytics.facultyDistribution)}
                          margin={{ top: 20, right: 30, left: 20, bottom: 80 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" />
                          <XAxis 
                            dataKey="name" 
                            angle={-45}
                            textAnchor="end"
                            height={100}
                            fontSize={12}
                          />
                          <YAxis />
                          <Tooltip 
                            formatter={(value, name, props) => [
                              `${value} students`, 
                              props.payload.fullName
                            ]}
                          />
                          <Bar dataKey="students">
                            {transformFacultyDataForBarChart(analytics.facultyDistribution).map((entry, index) => (
                              <Cell 
                                key={`cell-${index}`} 
                                fill={BAR_COLORS[index % BAR_COLORS.length]} 
                              />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                  ) : (
                    <div className="no-data">
                      <p>No faculty distribution data available</p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Activity Tracking Tab */}
          {activeTab === 'tracking' && (
            <div className="tab-content">
              <div className="tracking-controls" style={{
                background: 'white',
                padding: '1.5rem',
                borderRadius: '12px',
                marginBottom: '1.5rem',
                border: '1px solid #e2e8f0'
              }}>
                <h3 style={{ marginBottom: '1rem' }}>📊 Activity Tracking Controls</h3>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                  <label style={{ fontWeight: '500' }}>Time Period:</label>
                  <select 
                    value={trackingPeriod} 
                    onChange={(e) => setTrackingPeriod(e.target.value)}
                    style={{
                      padding: '0.5rem',
                      borderRadius: '6px',
                      border: '1px solid #d1d5db'
                    }}
                  >
                    <option value="week">This Week</option>
                    <option value="month">This Month</option>
                  </select>
                  <button 
                    onClick={fetchActivityTracking}
                    style={{
                      padding: '0.5rem 1rem',
                      background: '#2563eb',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer'
                    }}
                  >
                    Refresh Data
                  </button>
                </div>
              </div>

              {activityTracking.summary && (
                <div className="stats-grid" style={{ marginBottom: '2rem' }}>
                  <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #059669, #065f46)' }}>👥</div>
                    <div className="stat-content">
                      <div className="stat-value">{activityTracking.summary.totalRegistrations}</div>
                      <div className="stat-label">New Registrations</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #2563eb, #1d4ed8)' }}>📝</div>
                    <div className="stat-content">
                      <div className="stat-value">{activityTracking.summary.totalProfiles}</div>
                      <div className="stat-label">Profiles Created</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #7c3aed, #5b21b6)' }}>🤖</div>
                    <div className="stat-content">
                      <div className="stat-value">{activityTracking.summary.totalRecommendations}</div>
                      <div className="stat-label">AI Recommendations</div>
                    </div>
                  </div>
                  <div className="stat-card">
                    <div className="stat-icon" style={{ background: 'linear-gradient(135deg, #dc2626, #b91c1c)' }}>📊</div>
                    <div className="stat-content">
                      <div className="stat-value">{activityTracking.summary.totalActivity}</div>
                      <div className="stat-label">Total Activity</div>
                    </div>
                  </div>
                </div>
              )}

              {/* Recent Activity Lists */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))', gap: '1.5rem' }}>
                {/* Recent Registrations */}
                <div className="activity-section" style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>Recent Registrations</h4>
                  {activityTracking.registrations?.data?.length > 0 ? (
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {activityTracking.registrations.data.slice(0, 5).map((user, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.75rem',
                          marginBottom: '0.5rem',
                          background: '#f8fafc',
                          borderRadius: '6px',
                          borderLeft: '4px solid #059669'
                        }}>
                          <div>
                            <div style={{ fontWeight: '500' }}>{user.name}</div>
                            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{user.email}</div>
                          </div>
                          <div style={{ textAlign: 'right' }}>
                            {getRoleBadge(user.role)}
                            <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.25rem' }}>
                              {formatDate(user.createdAt)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>
                      No registrations in this period
                    </p>
                  )}
                </div>

                {/* Recent Profiles */}
                <div className="activity-section" style={{
                  background: 'white',
                  padding: '1.5rem',
                  borderRadius: '12px',
                  border: '1px solid #e2e8f0'
                }}>
                  <h4 style={{ marginBottom: '1rem', color: '#1e293b' }}>Recent Profiles</h4>
                  {activityTracking.profiles?.data?.length > 0 ? (
                    <div style={{ maxHeight: '300px', overflowY: 'auto' }}>
                      {activityTracking.profiles.data.slice(0, 5).map((profile, index) => (
                        <div key={index} style={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                          padding: '0.75rem',
                          marginBottom: '0.5rem',
                          background: '#f8fafc',
                          borderRadius: '6px',
                          borderLeft: '4px solid #2563eb'
                        }}>
                          <div>
                            <div style={{ fontWeight: '500' }}>{profile.userId?.name}</div>
                            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{profile.nationality}</div>
                          </div>
                          <div style={{ textAlign: 'right', fontSize: '0.75rem', color: '#64748b' }}>
                            {profile.desiredFaculty && (
                              <div style={{ marginBottom: '0.25rem' }}>{profile.desiredFaculty}</div>
                            )}
                            {formatDate(profile.createdAt)}
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <p style={{ color: '#64748b', textAlign: 'center', padding: '2rem' }}>
                      No profiles created in this period
                    </p>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Users Management Tab */}
          {(activeTab === 'users' || activeTab === 'students' || activeTab === 'advisors' || activeTab === 'roles') && (
            <div className="tab-content">
              {/* Enhanced Filters Section */}
              <div className="filters-section" style={{ marginBottom: '1.5rem' }}>
                <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', flexWrap: 'wrap' }}>
                  <div className="search-box" style={{ minWidth: '300px' }}>
                    <span className="search-icon">🔍</span>
                    <input
                      type="text"
                      placeholder="Search by name or email..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="search-input"
                    />
                  </div>

                  <div className="filter-dropdown">
                    <select
                      value={filterRole}
                      onChange={(e) => setFilterRole(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">All Roles</option>
                      <option value="student">Students</option>
                      <option value="advisor">Advisors</option>
                      <option value="admin">Admins</option>
                    </select>
                  </div>

                  <div className="filter-dropdown">
                    <select
                      value={filterStatus}
                      onChange={(e) => setFilterStatus(e.target.value)}
                      className="filter-select"
                    >
                      <option value="all">All Status</option>
                      <option value="true">Active</option>
                      <option value="false">Inactive</option>
                    </select>
                  </div>

                  <button
                    onClick={() => setShowCreateUserModal(true)}
                    style={{
                      padding: '0.75rem 1rem',
                      background: 'linear-gradient(135deg, #059669, #065f46)',
                      color: 'white',
                      border: 'none',
                      borderRadius: '6px',
                      cursor: 'pointer',
                      fontWeight: '500'
                    }}
                  >
                    ➕ Create User
                  </button>
                </div>

                {/* Bulk Actions */}
                {getFilteredUsers().length > 0 && (
                  <div className="bulk-actions" style={{ marginTop: '1rem' }}>
                    <button 
                      onClick={handleSelectAllUsers} 
                      className="select-all-btn"
                    >
                      {selectedUsers.length === getFilteredUsers().length ? 'Deselect All' : 'Select All'}
                    </button>
                    {selectedUsers.length > 0 && (
                      <button 
                        onClick={() => setShowBulkModal(true)} 
                        className="bulk-review-btn"
                      >
                        Bulk Operations ({selectedUsers.length})
                      </button>
                    )}
                  </div>
                )}
              </div>

              {/* Users Table */}
              <div className="users-table-container" style={{
                background: 'white',
                borderRadius: '12px',
                overflow: 'hidden',
                border: '1px solid #e2e8f0'
              }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead style={{ background: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
                    <tr>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>
                        <input
                          type="checkbox"
                          checked={selectedUsers.length === getFilteredUsers().length && getFilteredUsers().length > 0}
                          onChange={handleSelectAllUsers}
                        />
                      </th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>User</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Role</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Status</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Created</th>
                      <th style={{ padding: '1rem', textAlign: 'left', fontWeight: '600' }}>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {getFilteredUsers().map((user, index) => (
                      <tr key={user._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '1rem' }}>
                          <input
                            type="checkbox"
                            checked={selectedUsers.includes(user._id)}
                            onChange={() => handleSelectUser(user._id)}
                          />
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div>
                            <div style={{ fontWeight: '500', color: '#1e293b' }}>{user.name}</div>
                            <div style={{ fontSize: '0.875rem', color: '#64748b' }}>{user.email}</div>
                            {user.department && (
                              <div style={{ fontSize: '0.75rem', color: '#64748b' }}>{user.department}</div>
                            )}
                          </div>
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {getRoleBadge(user.role)}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          {getStatusBadge(user.isActive)}
                        </td>
                        <td style={{ padding: '1rem', fontSize: '0.875rem', color: '#64748b' }}>
                          {formatDate(user.createdAt)}
                        </td>
                        <td style={{ padding: '1rem' }}>
                          <div style={{ display: 'flex', gap: '0.5rem' }}>
                            <button
                              onClick={() => openUserDetails(user)}
                              style={{
                                padding: '0.25rem 0.5rem',
                                background: '#dbeafe',
                                color: '#1d4ed8',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.75rem'
                              }}
                            >
                              👁️ View
                            </button>
                            <button
                              onClick={() => openEditUser(user)}
                              style={{
                                padding: '0.25rem 0.5rem',
                                background: '#fbbf24',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.75rem'
                              }}
                            >
                              ✏️ Edit
                            </button>
                            {user.role === 'student' && (
                              <button
                                onClick={() => handleAssignAdvisor(user._id)}
                                style={{
                                  padding: '0.25rem 0.5rem',
                                  background: '#059669',
                                  color: 'white',
                                  border: 'none',
                                  borderRadius: '4px',
                                  cursor: 'pointer',
                                  fontSize: '0.75rem'
                                }}
                              >
                                👨‍🏫 Advisor
                              </button>
                            )}
                            <button
                              onClick={() => handleDeleteUser(user._id)}
                              style={{
                                padding: '0.25rem 0.5rem',
                                background: '#dc2626',
                                color: 'white',
                                border: 'none',
                                borderRadius: '4px',
                                cursor: 'pointer',
                                fontSize: '0.75rem'
                              }}
                            >
                              🗑️ Delete
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>

                {getFilteredUsers().length === 0 && (
                  <div style={{ padding: '3rem', textAlign: 'center', color: '#64748b' }}>
                    <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>👥</div>
                    <h3>No users found</h3>
                    <p>Try adjusting your search or filter criteria</p>
                  </div>
                )}
              </div>

              {/* Pagination */}
              {pagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => fetchUsers(pagination.currentPage - 1)}
                    disabled={!pagination.hasPrevPage}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {pagination.currentPage} of {pagination.totalPages}
                  </span>
                  <button
                    onClick={() => fetchUsers(pagination.currentPage + 1)}
                    disabled={!pagination.hasNextPage}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}

          {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div className="tab-content">
              <div className="activity-log">
                <h3>Recent Admin Activity</h3>
                {dashboardData.recentActivity && dashboardData.recentActivity.length > 0 ? (
                  <div className="activity-list">
                    {dashboardData.recentActivity.map((activity, index) => (
                      <div key={index} className="activity-item">
                        <div className="activity-info">
                          <span className="activity-student">{activity.userId?.name || 'Unknown'}</span>
                          <span className="activity-action">
                            {activity.isStudentApproved ? 'Approved' : 'Reviewed'} by {activity.reviewedBy}
                          </span>
                          <span className="activity-date">{formatDate(activity.reviewDate)}</span>
                        </div>
                        <div className="activity-details">
                          <span className="activity-faculty">{activity.email}</span>
                        </div>
                        {activity.advisorNotes && (
                          <div className="activity-notes">{activity.advisorNotes}</div>
                        )}
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-activity">
                    <div className="no-activity-icon">📋</div>
                    <h3>No recent activity found</h3>
                    <p>Activity will appear here when actions are performed</p>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Create User Modal */}
          {showCreateUserModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Create New User</h2>
                  <button onClick={() => setShowCreateUserModal(false)} className="modal-close">✕</button>
                </div>

                <form onSubmit={handleCreateUser} style={{ padding: '2rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      value={createUserForm.name}
                      onChange={(e) => setCreateUserForm({ ...createUserForm, name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      value={createUserForm.email}
                      onChange={(e) => setCreateUserForm({ ...createUserForm, email: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Password *</label>
                    <input
                      type="password"
                      value={createUserForm.password}
                      onChange={(e) => setCreateUserForm({ ...createUserForm, password: e.target.value })}
                      className="form-input"
                      required
                      minLength="6"
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Role *</label>
                      <select
                        value={createUserForm.role}
                        onChange={(e) => setCreateUserForm({ ...createUserForm, role: e.target.value })}
                        className="form-select"
                        required
                      >
                        <option value="student">Student</option>
                        <option value="advisor">Advisor</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        value={createUserForm.phone}
                        onChange={(e) => setCreateUserForm({ ...createUserForm, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  {createUserForm.role === 'advisor' && (
                    <div className="form-group">
                      <label className="form-label">Department</label>
                      <input
                        type="text"
                        value={createUserForm.department}
                        onChange={(e) => setCreateUserForm({ ...createUserForm, department: e.target.value })}
                        className="form-input"
                        placeholder="e.g., Information Technology"
                      />
                    </div>
                  )}

                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowCreateUserModal(false)} className="btn-cancel">
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      Create User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Edit User Modal */}
          {showEditUserModal && selectedUser && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Edit User: {selectedUser.name}</h2>
                  <button onClick={() => setShowEditUserModal(false)} className="modal-close">✕</button>
                </div>

                <form onSubmit={handleEditUser} style={{ padding: '2rem' }}>
                  <div className="form-group">
                    <label className="form-label">Full Name *</label>
                    <input
                      type="text"
                      value={editUserForm.name}
                      onChange={(e) => setEditUserForm({ ...editUserForm, name: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email *</label>
                    <input
                      type="email"
                      value={editUserForm.email}
                      onChange={(e) => setEditUserForm({ ...editUserForm, email: e.target.value })}
                      className="form-input"
                      required
                    />
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Role *</label>
                      <select
                        value={editUserForm.role}
                        onChange={(e) => setEditUserForm({ ...editUserForm, role: e.target.value })}
                        className="form-select"
                        required
                      >
                        <option value="student">Student</option>
                        <option value="advisor">Advisor</option>
                        <option value="admin">Admin</option>
                      </select>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Phone</label>
                      <input
                        type="tel"
                        value={editUserForm.phone}
                        onChange={(e) => setEditUserForm({ ...editUserForm, phone: e.target.value })}
                        className="form-input"
                      />
                    </div>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Department</label>
                    <input
                      type="text"
                      value={editUserForm.department}
                      onChange={(e) => setEditUserForm({ ...editUserForm, department: e.target.value })}
                      className="form-input"
                    />
                  </div>

                  <div className="form-group">
                    <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', cursor: 'pointer' }}>
                      <input
                        type="checkbox"
                        checked={editUserForm.isActive}
                        onChange={(e) => setEditUserForm({ ...editUserForm, isActive: e.target.checked })}
                      />
                      <span>Active User</span>
                    </label>
                  </div>

                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowEditUserModal(false)} className="btn-cancel">
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      Update User
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* User Details Modal */}
          {showUserDetailsModal && selectedUser && (
            <div className="modal-overlay">
              <div className="modal-content large-modal">
                <div className="modal-header">
                  <h2>User Details: {selectedUser.name}</h2>
                  <button onClick={() => setShowUserDetailsModal(false)} className="modal-close">✕</button>
                </div>

                <div style={{ padding: '2rem' }}>
                  {/* Basic User Info */}
                  <div className="student-info-section">
                    <h3>User Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Name:</span>
                        <span className="info-value">{selectedUser.name}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{selectedUser.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Role:</span>
                        <span className="info-value">{getRoleBadge(selectedUser.role)}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Status:</span>
                        <span className="info-value">{getStatusBadge(selectedUser.isActive)}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Phone:</span>
                        <span className="info-value">{selectedUser.phone || 'Not provided'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Department:</span>
                        <span className="info-value">{selectedUser.department || 'Not specified'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Created:</span>
                        <span className="info-value">{formatDate(selectedUser.createdAt)}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Last Updated:</span>
                        <span className="info-value">{formatDate(selectedUser.updatedAt)}</span>
                      </div>
                    </div>
                  </div>

                  {/* Student Profile Info */}
                  {selectedUser.role === 'student' && selectedUser.profile && (
                    <div className="student-info-section">
                      <h3>Student Profile</h3>
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Nationality:</span>
                          <span className="info-value">{selectedUser.profile.nationality || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Academic Level:</span>
                          <span className="info-value">{selectedUser.profile.currentAcademicLevel || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Desired Faculty:</span>
                          <span className="info-value">{selectedUser.profile.desiredFaculty || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">High School Grades:</span>
                          <span className="info-value">{selectedUser.profile.highSchoolGrades || 'N/A'}%</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Profile Status:</span>
                          <span className="info-value">
                            {selectedUser.profile.isStudentApproved ? 
                              <span className="status-badge approved">Approved</span> : 
                              <span className="status-badge pending">Pending</span>
                            }
                          </span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Completion:</span>
                          <span className="info-value">{selectedUser.profile.completionPercentage || 0}%</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Assessment Info */}
                  {selectedUser.role === 'student' && selectedUser.assessment && (
                    <div className="student-info-section">
                      <h3>Career Assessment</h3>
                      <div className="info-grid">
                        <div className="info-item">
                          <span className="info-label">Assessment Score:</span>
                          <span className="info-value">{selectedUser.assessment.score || 'N/A'}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Completed:</span>
                          <span className="info-value">{formatDate(selectedUser.assessment.createdAt)}</span>
                        </div>
                        <div className="info-item">
                          <span className="info-label">Response Count:</span>
                          <span className="info-value">{selectedUser.assessment.responses?.length || 0} responses</span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Bulk Operations Modal */}
          {showBulkModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Bulk Operations ({selectedUsers.length} users)</h2>
                  <button onClick={() => setShowBulkModal(false)} className="modal-close">✕</button>
                </div>

                <form onSubmit={handleBulkOperation} style={{ padding: '2rem' }}>
                  <div className="form-group">
                    <label className="form-label">Select Operation</label>
                    <select
                      value={bulkOperationForm.action}
                      onChange={(e) => setBulkOperationForm({ ...bulkOperationForm, action: e.target.value })}
                      className="form-select"
                      required
                    >
                      <option value="activate">Activate Users</option>
                      <option value="deactivate">Deactivate Users</option>
                      <option value="assignRole">Assign Role</option>
                      <option value="delete">Delete Users</option>
                    </select>
                  </div>

                  {bulkOperationForm.action === 'assignRole' && (
                    <>
                      <div className="form-group">
                        <label className="form-label">New Role</label>
                        <select
                          value={bulkOperationForm.role}
                          onChange={(e) => setBulkOperationForm({ ...bulkOperationForm, role: e.target.value })}
                          className="form-select"
                          required
                        >
                          <option value="student">Student</option>
                          <option value="advisor">Advisor</option>
                        </select>
                      </div>

                      {bulkOperationForm.role === 'advisor' && (
                        <div className="form-group">
                          <label className="form-label">Department</label>
                          <input
                            type="text"
                            value={bulkOperationForm.department}
                            onChange={(e) => setBulkOperationForm({ ...bulkOperationForm, department: e.target.value })}
                            className="form-input"
                            placeholder="e.g., Information Technology"
                          />
                        </div>
                      )}
                    </>
                  )}

                  <div className="selected-users-preview">
                    <h4>Selected Users ({selectedUsers.length}):</h4>
                    <div className="students-preview-list" style={{ maxHeight: '200px', overflowY: 'auto' }}>
                      {selectedUsers.map(userId => {
                        const user = users.find(u => u._id === userId);
                        return user ? (
                          <div key={userId} className="preview-student">
                            <span style={{ fontWeight: '500' }}>{user.name}</span>
                            <span style={{ color: '#64748b' }}>{user.email}</span>
                            {getRoleBadge(user.role)}
                          </div>
                        ) : null;
                      })}
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowBulkModal(false)} className="btn-cancel">
                      Cancel
                    </button>
                    <button 
                      type="submit" 
                      className="btn-submit"
                      style={{
                        background: bulkOperationForm.action === 'delete' ? '#dc2626' : undefined
                      }}
                    >
                      {bulkOperationForm.action === 'delete' ? 'Delete Users' : 'Apply Operation'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Custom styles for admin-specific elements */}
      <style jsx>{`
        .role-badge {
          padding: 0.25rem 0.5rem;
          border-radius: 4px;
          font-size: 0.75rem;
          font-weight: 500;
          text-transform: uppercase;
        }
        .role-badge.admin {
          background: #dc2626;
          color: white;
        }
        .role-badge.advisor {
          background: #059669;
          color: white;
        }
        .role-badge.student {
          background: #2563eb;
          color: white;
        }
        .status-badge.active {
          background: #d1fae5;
          color: #065f46;
        }
        .status-badge.inactive {
          background: #fee2e2;
          color: #b91c1c;
        }
        .management-sidebar {
          position: fixed;
          top: 0;
          height: 100vh;
          z-index: 40;
          transform: translateX(-100%);
          transition: transform 0.25s ease;
        }
        .management-sidebar.open {
          transform: translateX(0);
        }
        @media (max-width: 1024px) {
          .management-sidebar {
            display: none;
          }
          .main-content {
            margin-left: 0 !important;
          }
        }
      `}</style>
    </div>
  );
};

export default AdminDashboard;

