//AdvisorDashboard.jsx
import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import './styles/AdvisorDashboard.css';
import { IoPersonCircle, IoHomeOutline, IoSettings } from "react-icons/io5";
import AUCA from "../assets/images/AUCA.png"
import AUCALOGO from "../assets/images/AUCALOGO.png"
import { IoMdPerson } from "react-icons/io";
import { IoIosLogOut } from "react-icons/io";
import { useNavigate, useLocation } from "react-router-dom";
import QuestionsManager from './QuestionsManager.jsx';

const SIDEBAR_ITEMS = [
  { id: 'overview', label: 'Overview', icon: '📊' },
  { id: 'students', label: 'All Students', icon: '👥' },
  { id: 'questionsManager', label: 'Questions Manager', icon: '📋' },
  { id: 'appointments', label: 'Appointments', icon: '📅' },
  { id: 'messages', label: 'Messages', icon: '✉️' },
  { id: 'activity', label: 'Activity Log', icon: '📋' }
];

const AdvisorDashboard = () => {

  const navigate = useNavigate();
  
   useEffect(() => {
    const checkAdvisorAccess = () => {
      const token = localStorage.getItem('token');
      const user = JSON.parse(localStorage.getItem('user') || '{}');
      
      // Check if user is logged in
      if (!token) {
        Notify.failure('Please login to access the advisor dashboard');
        navigate('/login');
        return;
      }
      
      // Check if user has advisor role
      if (user.userRole !== 'advisor' && user.role !== 'advisor') {
        Notify.failure('Access denied. Advisor privileges required.');
        navigate('/'); // Redirect to home or appropriate page
        return;
      }
      verifyAdvisorToken();
    };

    const verifyAdvisorToken = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await fetch('http://localhost:5000/api/advisor/verify', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        
        if (!response.ok) {
          throw new Error('Token verification failed');
        }
        
        const data = await response.json();
        if (data.user?.userRole !== 'advisor') {
          throw new Error('Insufficient permissions');
        }
      } catch (error) {
        console.error('Admin verification failed:', error);
        Notify.failure('Session expired or insufficient permissions');
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
      }
    };
    
    checkAdvisorAccess();
  }, []);

  const [activeTab, setActiveTab] = useState('overview');
  const [showDropdown, setShowDropdown] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [showUserDropdown, setShowUserDropdown] = useState(false); 
  const [messageFilter, setMessageFilter] = useState('all');
  const [students, setStudents] = useState([]);
  const [filteredStudents, setFilteredStudents] = useState([]);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [appointmentViewMode, setAppointmentViewMode] = useState('card');
  const [loading, setLoading] = useState(false);
  const [userName, setUserName] = useState("User");
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('all');
  const [statistics, setStatistics] = useState({});
  const [showReviewModal, setShowReviewModal] = useState(false);
  const [showBulkModal, setShowBulkModal] = useState(false);
  const [showDocumentModal, setShowDocumentModal] = useState(false);
  const [selectedStudents, setSelectedStudents] = useState([]);
  const [activityLog, setActivityLog] = useState([]);
  const [currentDocument, setCurrentDocument] = useState(null);
  const [showDocumentsModal, setShowDocumentsModal] = useState(false);
  const [selectedStudentDocuments, setSelectedStudentDocuments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]); 
  
// Message state - ADD THESE
const [messages, setMessages] = useState([]);
const [filteredMessages, setFilteredMessages] = useState([]);
const [messageSearchTerm, setMessageSearchTerm] = useState('');
const [selectedMessage, setSelectedMessage] = useState(null);
const [showMessageModal, setShowMessageModal] = useState(false);
const [showReplyModal, setShowReplyModal] = useState(false);
const [replyText, setReplyText] = useState('');
const [messagePagination, setMessagePagination] = useState({
  currentPage: 1,
  totalPages: 1,
  totalItems: 0,
  itemsPerPage: 10
});
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });

  // Appointment state
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]);
  const [appointmentFilter, setAppointmentFilter] = useState('all');
  
  const [dateFilter, setDateFilter] = useState({
    start: new Date().toISOString().split('T')[0],
    end: new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0]
  });
  const [showCreateAppointmentModal, setShowCreateAppointmentModal] = useState(false);
  const [showEditAppointmentModal, setShowEditAppointmentModal] = useState(false);
  const [showCalendarView, setShowCalendarView] = useState(false);
  const [currentCalendarDate, setCurrentCalendarDate] = useState(new Date());
  const [selectedAppointment, setSelectedAppointment] = useState(null);
  const [appointmentPagination, setAppointmentPagination] = useState({
    currentPage: 1,
    totalPages: 1,
    totalItems: 0,
    itemsPerPage: 10
  });


  
  // Review form state
  const [reviewForm, setReviewForm] = useState({
    advisorNotes: '',
    recommendedFaculty: '',
    recommendedDepartment: '',
    careerAdvice: '',
    nextSteps: '',
    approved: false
  });

  // Bulk review form
  const [bulkReviewForm, setBulkReviewForm] = useState({
    approved: false,
    advisorNotes: ''
  });

  // Appointment form state
const [appointmentForm, setAppointmentForm] = useState({
  date: '',
  startTime: '',
  endTime: '',
  duration: 30,
  isRecurring: false,
  recurringPattern: 'weekly',
  recurringEndDate: '',
  notes: '',
  meetingType: 'physical',
  meetingLink: ''
});

  useEffect(() => {
    if (activeTab === 'overview') {
      fetchDashboardData();
    } else if (activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved') {
      fetchStudents();
    } else if (activeTab === 'transfer') {
      fetchTransferStudents();
    } else if (activeTab === 'activity') {
      fetchActivityLog();
    } else if (activeTab === 'appointments') {
      fetchAppointments();
    } else if (activeTab === 'messages') {  
    fetchMessages();
  }
  }, [activeTab, pagination.currentPage]);

  useEffect(() => {
    filterStudents();
  }, [students, searchTerm, filterStatus]);

  useEffect(() => {
  filterMessages();
}, [messages, messageSearchTerm, messageFilter]);

  useEffect(() => {
    filterAppointments();
  }, [appointments, appointmentFilter, dateFilter]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'));
    if (user && user.name) {
      setUserName(user.name);
    } else {
      // Fallback: try to get from token or make API call
      const token = localStorage.getItem('token');
      if (token) {
      
        fetchUserDetails();
      }
    }
  }, []);
  // Format time for calendar display (12-hour format)
  const formatTimeForCalendar = (timeString) => {
    if (!timeString) return 'No Time';
    
    try {
      const [hours, minutes] = timeString.split(':');
      const hour24 = parseInt(hours);
      const hour12 = hour24 === 0 ? 12 : hour24 > 12 ? hour24 - 12 : hour24;
      const ampm = hour24 >= 12 ? 'PM' : 'AM';
      
      return `${hour12}:${minutes} ${ampm}`;
    } catch (error) {
      return timeString; // Return original if parsing fails
    }
  };

  const getAppointmentsForDateSorted = (date) => {
    return appointments
      .filter(appointment => {
        const appointmentDate = new Date(appointment.date);
        return appointmentDate.toDateString() === date.toDateString();
      })
      .sort((a, b) => {
        // Sort by time
        const timeA = a.startTime || a.time || '00:00';
        const timeB = b.startTime || b.time || '00:00';
        return timeA.localeCompare(timeB);
      });
  };

  // Get time range display
  const getTimeRangeDisplay = (appointment) => {
    const startTime = appointment.startTime || appointment.time;
    const endTime = appointment.endTime;
    
    if (!startTime) return 'No time set';
    
    if (endTime && endTime !== startTime) {
      return `${formatTimeForCalendar(startTime)} - ${formatTimeForCalendar(endTime)}`;
    } else {
      const duration = appointment.duration || 30;
      const [hours, minutes] = startTime.split(':');
      const startDate = new Date();
      startDate.setHours(parseInt(hours), parseInt(minutes));
      const endDate = new Date(startDate.getTime() + duration * 60000);
      const calculatedEndTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
      
      return `${formatTimeForCalendar(startTime)} - ${formatTimeForCalendar(calculatedEndTime)}`;
    }
  };

  // Get status color for appointments
  const getStatusColor = (status) => {
    switch (status) {
      case 'available':
        return '#28a745'; 
      case 'booked':
        return '#007bff'; 
      case 'completed':
        return '#6c757d'; 
      case 'cancelled':
        return '#dc3545'; 
      case 'in-progress':
        return '#fd7e14'; 
      default:
        return '#6c757d'; 
    }
  };

  // ADD THIS: Get user name from localStorage
useEffect(() => {
  const user = JSON.parse(localStorage.getItem('user'));
  if (user && user.name) {
    setUserName(user.name);
  }
}, []);

// ADD THIS: Close dropdown when clicking outside
useEffect(() => {
  const handleClickOutside = (event) => {
    if (!event.target.closest('.user-profile-dropdown')) {
      setShowUserDropdown(false);
    }
  };

  document.addEventListener('mousedown', handleClickOutside);
  return () => {
    document.removeEventListener('mousedown', handleClickOutside);
  };
}, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/student/profiles/statistics', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setStatistics(data.statistics || {});
      } else {
        console.error('Failed to fetch dashboard data:', response.status);
        Notify.failure('Failed to fetch dashboard data');
      }
    } catch (error) {
      console.error('Error loading dashboard:', error);
      Notify.failure('Error loading dashboard');
    } finally {
      setLoading(false);
    }
  };
  // Fetch messages from contacts table
const fetchMessages = async (page = 1) => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    const response = await fetch(`http://localhost:5000/api/advisor/messages?page=${page}&limit=10`, {
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('Messages data:', data);
      
      let messagesArray = [];
      let paginationData = {};
      
      // Handle different response structures
      if (data.data && Array.isArray(data.data.messages)) {
        messagesArray = data.data.messages;
        paginationData = data.data.pagination || {};
      } else if (Array.isArray(data.messages)) {
        messagesArray = data.messages;
        paginationData = data.pagination || {};
      } else if (Array.isArray(data)) {
        messagesArray = data;
      }
      
      setMessages(messagesArray);
      setMessagePagination(prev => ({
        ...prev,
        ...paginationData,
        currentPage: page
      }));
    } else {
      console.error('Failed to fetch messages:', response.status);
      Notify.failure('Failed to fetch messages');
      setMessages([]);
    }
  } catch (error) {
    console.error('Error loading messages:', error);
    Notify.failure('Error loading messages: ' + error.message);
    setMessages([]);
  } finally {
    setLoading(false);
  }
};

// // Filter messages based on search and status
// const filterMessages = () => {
//   console.log('🔍 Filtering messages...');
//   console.log('📧 Total messages:', messages.length);
//   console.log('📧 First message sample:', messages[0]); // ADD THIS to see the structure
//   console.log('🔎 Search term:', messageSearchTerm);
//   console.log('📊 Filter:', messageFilter);
  
//   let filtered = messages;
  
//   // Filter by read/unread status
//   if (messageFilter === 'unread') {
//     filtered = filtered.filter(msg => !msg.isRead);
//   } else if (messageFilter === 'read') {
//     filtered = filtered.filter(msg => msg.isRead);
//   }
  
//   // Filter by search term
//   if (messageSearchTerm) {
//     filtered = filtered.filter(msg =>
//       msg.name?.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
//       msg.names?.toLowerCase().includes(messageSearchTerm.toLowerCase()) || // ADD THIS fallback
//       msg.email?.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
//       msg.message?.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
//       msg.phone?.toLowerCase().includes(messageSearchTerm.toLowerCase())
//     );
//   }
  
//   console.log('✅ Filtered messages:', filtered.length);
//   setFilteredMessages(filtered);
// };
const filterMessages = () => {
  let filtered = messages;
  
  // Filter by read/unread status
  if (messageFilter === 'unread') {
    filtered = filtered.filter(msg => !msg.isRead);
  } else if (messageFilter === 'read') {
    filtered = filtered.filter(msg => msg.isRead);
  }
  
  // Filter by search term
  if (messageSearchTerm) {
    filtered = filtered.filter(msg =>
      msg.name?.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
      msg.email?.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
      msg.message?.toLowerCase().includes(messageSearchTerm.toLowerCase()) ||
      msg.phone?.toLowerCase().includes(messageSearchTerm.toLowerCase())
    );
  }
  
  setFilteredMessages(filtered);
};

// Mark message as read
const handleMarkAsRead = async (messageId) => {
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/advisor/messages/${messageId}/read`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      Notify.success('Message marked as read');
      fetchMessages(messagePagination.currentPage);
    } else {
      throw new Error('Failed to mark message as read');
    }
  } catch (error) {
    Notify.failure('Failed to update message: ' + error.message);
  }
};

// View message details
const handleViewMessage = async (message) => {
  setSelectedMessage(message);
  setShowMessageModal(true);
  
  // Mark as read when opened
  if (!message.isRead) {
    await handleMarkAsRead(message._id);
  }
};

// Handle reply to message
const handleReplyToMessage = (message) => {
  setSelectedMessage(message);
  setReplyText('');
  setShowReplyModal(true);
};

// Submit reply
const handleSubmitReply = async (e) => {
  e.preventDefault();
  
  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/advisor/messages/${selectedMessage._id}/reply`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        replyMessage: replyText,
        recipientEmail: selectedMessage.email
      })
    });

    if (response.ok) {
      Notify.success('Reply sent successfully');
      setShowReplyModal(false);
      setReplyText('');
      fetchMessages(messagePagination.currentPage);
    } else {
      throw new Error('Failed to send reply');
    }
  } catch (error) {
    Notify.failure('Failed to send reply: ' + error.message);
  }
};

// Delete message
const handleDeleteMessage = async (messageId) => {
  if (!window.confirm('Are you sure you want to delete this message?')) {
    return;
  }

  try {
    const token = localStorage.getItem('token');
    const response = await fetch(`http://localhost:5000/api/advisor/messages/${messageId}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`
      }
    });

    if (response.ok) {
      Notify.success('Message deleted successfully');
      fetchMessages(messagePagination.currentPage);
    } else {
      throw new Error('Failed to delete message');
    }
  } catch (error) {
    Notify.failure('Failed to delete message: ' + error.message);
  }
};
    // Add function to fetch user details (optional)
  const fetchUserDetails = async () => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/user/profile', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setUserName(data.user?.name || 'Advisor');
        // Optionally store in localStorage
        localStorage.setItem('user', JSON.stringify(data.user));
      }
    } catch (error) {
      console.error('Error fetching user details:', error);
    }
  };

  // Add function to close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.user-profile-dropdown')) {
        setShowUserDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  
  const fetchStudents = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      let endpoint = '';
      
      switch (activeTab) {
        case 'students':
          endpoint = 'http://localhost:5000/api/student/allprofiles';
          break;
        case 'pending':
          endpoint = 'http://localhost:5000/api/student/profiles/status/pending';
          break;
        case 'approved':
          endpoint = 'http://localhost:5000/api/student/profiles/status/approved';
          break;
        default:
          endpoint = 'http://localhost:5000/api/student/allprofiles';
      }
      
      console.log('Fetching from endpoint:', endpoint);
      
      const response = await fetch(`${endpoint}?page=${page}&limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Raw response data:', data);
        
        let studentsArray = [];
        let paginationData = {};
        
        
        if (data.data && Array.isArray(data.data.profiles)) {
          studentsArray = data.data.profiles;
          paginationData = data.data.pagination || {};
        } else if (Array.isArray(data.profiles)) {
          studentsArray = data.profiles;
          paginationData = data.pagination || {};
        } else if (Array.isArray(data.data)) {
          studentsArray = data.data;
        } else if (Array.isArray(data)) {
          studentsArray = data;
        } else if (data.students && Array.isArray(data.students)) {
          studentsArray = data.students;
          paginationData = data.pagination || {};
        }
        
        console.log('Processed students array:', studentsArray);
        console.log('Students count:', studentsArray.length);
        
        setStudents(studentsArray);
        setPagination(prev => ({
          ...prev,
          ...paginationData,
          currentPage: page
        }));
        
      } else {
        const errorData = await response.text();
        console.error('Error response:', errorData);
        
        if (response.status === 403) {
          Notify.failure('Access denied. Please check your permissions.');
        } else if (response.status === 404) {
          Notify.failure('Endpoint not found. Please check your backend routes.');
        } else {
          Notify.failure(`Failed to fetch students: ${response.status}`);
        }
        setStudents([]);
      }
    } catch (error) {
      console.error('Error loading students:', error);
      Notify.failure('Error loading students: ' + error.message);
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };
const fetchStudentRecommendations = async (studentUserId) => {
  try {
    console.log('📡 Fetching recommendations for student:', studentUserId);
    const token = localStorage.getItem('token');
    
    // Fetch recommendations for the specific student using their userId
    const response = await fetch(`http://localhost:5000/api/recommendations/latest?userId=${studentUserId}`, {
      method: 'GET',
      headers: { 
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'application/json'
      }
    });

    if (response.ok) {
      const data = await response.json();
      console.log('✅ Student recommendations response:', data);
      
      // Handle the expected response structure
      let recommendationsArray = [];
      
      if (data.success && data.data && data.data.recommendations) {
        recommendationsArray = data.data.recommendations;
      }

      return recommendationsArray;
    } else if (response.status === 404) {
      console.log('ℹ️ No recommendations found for student');
      return [];
    } else {
      console.warn('⚠️ Failed to fetch student recommendations:', response.status);
      return [];
    }
  } catch (err) {
    console.log('ℹ️ Error fetching student recommendations:', err.message);
    return [];
  }
};
  // Fetch transfer students
  const fetchTransferStudents = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/student/transfer-students?page=${page}&limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      
      console.log('Transfer students response status:', response.status);
      
      if (response.ok) {
        const data = await response.json();
        console.log('Transfer students data:', data);
        
        let studentsArray = [];
        let paginationData = {};
        
        if (data.data && Array.isArray(data.data.students)) {
          studentsArray = data.data.students;
          paginationData = data.data.pagination || {};
        } else if (Array.isArray(data.students)) {
          studentsArray = data.students;
          paginationData = data.pagination || {};
        } else if (Array.isArray(data)) {
          studentsArray = data;
        }
        
        setStudents(studentsArray);
        setPagination(prev => ({
          ...prev,
          ...paginationData,
          currentPage: page
        }));
      } else {
        console.error('Failed to fetch transfer students');
        Notify.failure('Failed to fetch transfer students');
        setStudents([]);
      }
    } catch (error) {
      console.error('Error loading transfer students:', error);
      Notify.failure('Error loading transfer students');
      setStudents([]);
    } finally {
      setLoading(false);
    }
  };

  const fetchActivityLog = async (page = 1) => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/advisor/activity-log?page=${page}&limit=20`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        setActivityLog(data.data.activities || []);
        setPagination(data.data.pagination || pagination);
      } else {
        setActivityLog([]);
      }
    } catch (error) {
      setActivityLog([]);
    } finally {
      setLoading(false);
    }
  };



const fetchAppointments = async (page = 1) => {
  try {
    setLoading(true);
    const token = localStorage.getItem('token');
    
    // Fetch both appointments and available slots
    const [appointmentsRes, slotsRes] = await Promise.all([
      fetch(`http://localhost:5000/api/appointments/manage?page=${page}&limit=10`, {
        headers: { 'Authorization': `Bearer ${token}` }
      }),
      fetch(`http://localhost:5000/api/appointments/slots/my-slots`, {
        headers: { 'Authorization': `Bearer ${token}` }
      })
    ]);
    
    const appointmentsData = appointmentsRes.ok ? await appointmentsRes.json() : { data: { appointments: [] } };
    const slotsData = slotsRes.ok ? await slotsRes.json() : { data: { slots: [] } };
    
    // ✅ DON'T mix appointments with slots - keep them separate!
    setAppointments(appointmentsData.data.appointments || []);
    setAvailableSlots(slotsData.data.slots || []); // Store slots separately
    setAppointmentPagination(appointmentsData.data.pagination || appointmentPagination);
    
  } catch (error) {
    setAppointments([]);
    Notify.failure('Error loading appointments');
  } finally {
    setLoading(false);
  }
};


// const filterAppointments = () => {
//   let filtered = appointments; // Only filter actual appointments, not slots
  
//   // Filter by status
//   if (appointmentFilter !== 'all') {
//     filtered = filtered.filter(appointment => appointment.status === appointmentFilter);
//   }
  
//   // Filter by date range
//   if (dateFilter.start || dateFilter.end) {
//     filtered = filtered.filter(appointment => {
//       const appointmentDate = new Date(appointment.date);
//       const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
//       const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
      
//       if (startDate && appointmentDate < startDate) return false;
//       if (endDate && appointmentDate > endDate) return false;
//       return true;
//     });
//   }
  
//   setFilteredAppointments(filtered);
// };

const filterAppointments = () => {
  let filtered = appointments; // Only filter actual appointments, not slots
  
  // Filter by status
  if (appointmentFilter !== 'all') {
    filtered = filtered.filter(appointment => appointment.status === appointmentFilter);
  }
  
  // Filter by date range
  if (dateFilter.start || dateFilter.end) {
    filtered = filtered.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
      const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
      
      if (startDate && appointmentDate < startDate) return false;
      if (endDate && appointmentDate > endDate) return false;
      return true;
    });
  }
  
  setFilteredAppointments(filtered);
};

  // const filterAppointments = () => {
  //   let filtered = appointments;
    
  //   // Filter by status
  //   if (appointmentFilter !== 'all') {
  //     filtered = filtered.filter(appointment => appointment.status === appointmentFilter);
  //   }
    
  //   // Filter by date range
  //   if (dateFilter.start || dateFilter.end) {
  //     filtered = filtered.filter(appointment => {
  //       const appointmentDate = new Date(appointment.date);
  //       const startDate = dateFilter.start ? new Date(dateFilter.start) : null;
  //       const endDate = dateFilter.end ? new Date(dateFilter.end) : null;
        
  //       if (startDate && appointmentDate < startDate) return false;
  //       if (endDate && appointmentDate > endDate) return false;
  //       return true;
  //     });
  //   }
    
  //   setFilteredAppointments(filtered);
  // };
    

  const handleCreateAppointment = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      
      // Format data to match backend expectations
      const slotData = {
        date: appointmentForm.date,
        time: appointmentForm.startTime,
        type: appointmentForm.meetingType,
        location: appointmentForm.meetingType === 'online' ? appointmentForm.meetingLink : undefined,
        duration: appointmentForm.duration,
        notes: appointmentForm.notes,
         // NEW: Add recurring fields
      isRecurring: appointmentForm.isRecurring,
      recurringPattern: appointmentForm.recurringPattern,
      recurringEndDate: appointmentForm.recurringEndDate
      };

      const response = await fetch('http://localhost:5000/api/appointments/slots/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(slotData)
      });
      
      if (response.ok) {
        Notify.success('Appointment slot created successfully');
        setShowCreateAppointmentModal(false);
        setAppointmentForm({
          date: '',
          startTime: '',
          endTime: '',
          duration: 30,
          isRecurring: false,
          recurringPattern: 'weekly',
          recurringEndDate: '',
          notes: '',
          meetingType: 'physical',
          meetingLink: ''
        });
        fetchAppointments();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to create appointment');
      }
    } catch (error) {
      Notify.failure('Failed to create appointment: ' + error.message);
    }
  };
  const handleUpdateAppointment = async (e) => {
  e.preventDefault();
  try {
    const token = localStorage.getItem('token');
    
    // Format data to match backend expectations
    const updateData = {
      // slotId: selectedAppointment._id,
      date: appointmentForm.date,
      time: appointmentForm.startTime,
      type: appointmentForm.meetingType,
      location: appointmentForm.meetingType === 'online' ? appointmentForm.meetingLink : undefined,
      duration: appointmentForm.duration,
      notes: appointmentForm.notes
    };

    const response = await fetch(`http://localhost:5000/api/appointments/slots/update/${selectedAppointment._id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify(updateData)
    });
    
    if (response.ok) {
      Notify.success('Appointment slot updated successfully');
      setShowEditAppointmentModal(false);
      setSelectedAppointment(null);
      setAppointmentForm({
        date: '',
        startTime: '',
        endTime: '',
        duration: 30,
        isRecurring: false,
        recurringPattern: 'weekly',
        recurringEndDate: '',
        notes: '',
        meetingType: 'physical',
        meetingLink: ''
      });
      fetchAppointments();
    } else {
      const error = await response.json();
      throw new Error(error.message || 'Failed to update appointment');
    }
  } catch (error) {
    Notify.failure('Failed to update appointment: ' + error.message);
  }
};
  const handleEditAppointment = (appointment) => {
  setSelectedAppointment(appointment);
  
  // Properly format the date for the input field
  const appointmentDate = new Date(appointment.date);
  const formattedDate = appointmentDate.toISOString().split('T')[0];
  
  setAppointmentForm({
    date: formattedDate,
    startTime: appointment.startTime || appointment.time || '',
    endTime: appointment.endTime || appointment.time || '',
    duration: appointment.duration || 30,
    isRecurring: false,
    recurringPattern: 'weekly',
    recurringEndDate: '',
    notes: appointment.notes || '',
    meetingType: appointment.type || appointment.meetingType || 'physical',
    meetingLink: appointment.location || appointment.meetingLink || ''
  });
  
  console.log('Editing appointment:', appointment);
  console.log('Form data set:', {
    date: formattedDate,
    startTime: appointment.startTime || appointment.time,
    meetingType: appointment.type || appointment.meetingType
  });
  
  setShowEditAppointmentModal(true);
};

  const handleDeleteAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to delete this appointment slot?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/appointments/slots/delete`, {
        method: 'DELETE',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ slotId: appointmentId })
      });
      
      if (response.ok) {
        Notify.success('Appointment deleted successfully');
        fetchAppointments();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to delete appointment');
      }
    } catch (error) {
      Notify.failure('Failed to delete appointment: ' + error.message);
    }
  };

  const handleCancelAppointment = async (appointmentId) => {
    if (!window.confirm('Are you sure you want to cancel this appointment?')) {
      return;
    }
    
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/appointments/update-status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          appointmentId: appointmentId, 
          status: 'cancelled',
          notes: 'Cancelled by advisor'
        })
      });
      
      if (response.ok) {
        Notify.success('Appointment cancelled successfully');
        fetchAppointments();
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to cancel appointment');
      }
    } catch (error) {
      Notify.failure('Failed to cancel appointment: ' + error.message);
    }
  };

  const handleStartAppointment = async (appointment) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`http://localhost:5000/api/appointments/update-status`, {
        method: 'PUT',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}` 
        },
        body: JSON.stringify({ 
          appointmentId: appointment._id, 
          status: 'in-progress',
          notes: 'Appointment started'
        })
      });
      
      if (response.ok) {
        Notify.success('Appointment started');
        fetchAppointments();
        
        // Open meeting link if available
        if (appointment.meetingLink || appointment.location) {
          window.open(appointment.meetingLink || appointment.location, '_blank');
        }
      } else {
        const error = await response.json();
        throw new Error(error.message || 'Failed to start appointment');
      }
    } catch (error) {
      Notify.failure('Failed to start appointment: ' + error.message);
    }
  };

  // Calendar helper functions
  const generateCalendarDays = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const startDate = new Date(firstDay);
    startDate.setDate(startDate.getDate() - firstDay.getDay());
    
    const days = [];
    const currentDate = new Date(startDate);
    
    for (let i = 0; i < 42; i++) {
      days.push({
        date: new Date(currentDate),
        isCurrentMonth: currentDate.getMonth() === month,
        isToday: currentDate.toDateString() === new Date().toDateString()
      });
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    return days;
  };

  const getAppointmentsForDate = (date) => {
    return appointments.filter(appointment => {
      const appointmentDate = new Date(appointment.date);
      return appointmentDate.toDateString() === date.toDateString();
    });
  };

  const handleCalendarDayClick = (date) => {
    const dayAppointments = getAppointmentsForDate(date);
    if (dayAppointments.length > 0) {
      setFilteredAppointments(dayAppointments);
      setShowCalendarView(false);
    } else {
      setAppointmentForm(prev => ({
        ...prev,
        date: date.toISOString().split('T')[0]
      }));
      setShowCreateAppointmentModal(true);
    }
  };

  const isAppointmentTime = (appointment) => {
    const now = new Date();
    const appointmentDateTime = new Date(`${appointment.date} ${appointment.startTime}`);
    const timeDiff = appointmentDateTime.getTime() - now.getTime();
    
    return timeDiff <= 15 * 60 * 1000 && timeDiff >= -appointment.duration * 60 * 1000;
  };

const handleConfirmAppointment = async (appointmentId) => {
  if (!window.confirm('Are you sure you want to confirm this appointment?')) {
    return;
  }
  
  try {
    const token = localStorage.getItem('token');
    
    if (!token) {
      Notify.failure('Please log in again');
      return;
    }
    
    // ✅ IMPORTANT: Only send what the backend expects
    const response = await fetch(`http://localhost:5000/api/appointments/confirm/${appointmentId}`, {
      method: 'PUT',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}` 
      },
      body: JSON.stringify({ 
        confirmed: true  // Backend expects this
      })
    });
    
    if (response.ok) {
      Notify.success('Appointment confirmed successfully');
      fetchAppointments(); // Refresh the list
    } else {
      const error = await response.json();
      throw new Error(error.message || 'Failed to confirm appointment');
    }
  } catch (error) {
    Notify.failure('Failed to confirm appointment: ' + error.message);
  }
};

//   const handleConfirmAppointment = async (appointmentId) => {
//   if (!window.confirm('Are you sure you want to confirm this appointment?')) {
//     return;
//   }
  
//   try {
//     const token = localStorage.getItem('token');
//     console.log('Token:', token); 
    
//     if (!token) {
//       Notify.failure('Please log in again');
//       return;
//     }
    
//     const response = await fetch(`http://localhost:5000/api/appointments/confirm/${appointmentId}`, {
//       method: 'PUT',
//       headers: { 
//         'Content-Type': 'application/json',
//         'Authorization': `Bearer ${token}` 
//       },
//       body: JSON.stringify({ 
//         appointmentId: appointmentId,
//         confirmed: true
//       })
//     });
//      console.log('Confirming appointment:', appointment); // Add this
//   console.log('Appointment ID:',appointmentId); // Add this
    
//     if (response.ok) {
//       Notify.success('Appointment confirmed successfully');
//       fetchAppointments();
//     } else {
//       const error = await response.json();
//       throw new Error(error.message || 'Failed to confirm appointment');
//     }
//   } catch (error) {
//     Notify.failure('Failed to confirm appointment: ' + error.message);
//   }
// };

  

const handleReviewStudent = async (student) => {
  try {
    const token = localStorage.getItem('token');
    
    // Debug token
    console.log('Token check:', {
      hasToken: !!token,
      tokenStart: token ? token.substring(0, 20) : 'No token',
      tokenLength: token ? token.length : 0
    });

    if (!token) {
      console.error('No token found');
      return;
    }

    let studentData = student;
    
    // Try to get detailed profile first
    try {
      const response = await fetch(`http://localhost:5000/api/advisor/profiles/${student._id}/detailed`, {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      if (response.ok) {
        const data = await response.json();
        studentData = data.data.profile;
      }
    } catch {
      studentData = student;
    }

    // Fetch recommendations for this student
    const studentUserId = studentData.userId?._id || studentData.userId;
    if (studentUserId) {
      console.log('📡 Fetching recommendations for student userId:', studentUserId);
      
      try {
        // FIXED: Remove the colon from the URL
        const recResponse = await fetch(`http://localhost:5000/api/recommendation/student/latest/${studentUserId}`, {
          method: 'GET',
          headers: { 
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json'
          }
        });

        console.log('Response status:', recResponse.status);

        if (recResponse.ok) {
          const recData = await recResponse.json();
          console.log('✅ Recommendations response:', recData);
          
          if (recData.success && recData.data.recommendations && recData.data.recommendations.length > 0) {
            const latestRecommendation = recData.data.recommendations[0];
            studentData.aiRecommendations = {
              recommendedFaculty: latestRecommendation.faculty,
              recommendedDepartment: latestRecommendation.department, 
              careerAdvice: latestRecommendation.reasoning || latestRecommendation.description,
              recommendations: recData.data.recommendations,
              generatedAt: recData.data.generatedAt,
              verificationStatus: recData.data.overallVerificationStatus,
              matchPercentage: latestRecommendation.matchPercentage
            };
            console.log('✅ Added recommendations to student data');
          } else {
            console.log('ℹ️ No recommendations found for student');
            studentData.aiRecommendations = 'This student has not generated AI career recommendations yet.';
          }
        } else {
          const errorText = await recResponse.text();
          console.log('❌ Request failed:', recResponse.status, errorText);
          studentData.aiRecommendations = 'This student has not generated AI career recommendations yet.';
        }
      } catch (recError) {
        console.log('ℹ️ Error fetching recommendations:', recError.message);
        studentData.aiRecommendations = null;
      }
    }

    setSelectedStudent(studentData);
    setReviewForm({
      advisorNotes: studentData.advisorNotes || '',
      recommendedFaculty: studentData.recommendedFaculty || studentData.aiRecommendations?.recommendedFaculty || '',
      recommendedDepartment: studentData.recommendedDepartment || studentData.aiRecommendations?.recommendedDepartment || '',
      careerAdvice: studentData.careerAdvice || studentData.aiRecommendations?.careerAdvice || '',
      nextSteps: studentData.nextSteps || '',
      approved: studentData.isStudentApproved || false
    });
    setShowReviewModal(true);

  } catch (error) {
    console.error('Error in handleReviewStudent:', error);
    setSelectedStudent(student);
    setShowReviewModal(true);
  }
};

  
const viewDocument = (profileId, documentType, fileName, originalName) => {
  // Construct the direct file URL (not a route)
  const viewUrl = `http://localhost:5000/uploads/${fileName}`;
  
  console.log('📄 Opening document:', {
    profileId,
    documentType,
    fileName,
    originalName,
    viewUrl
  });
  
  setCurrentDocument({
    url: viewUrl,
    name: originalName || fileName,
    type: documentType
  });
  setShowDocumentModal(true);
};

// const viewDocument = (profileId, documentType, fileName, originalName) => {
//   const token = localStorage.getItem('token');
//   const viewUrl = `http://localhost:5000/api/advisor/profiles/${profileId}/view/${documentType}/${fileName}?token=${token}`;
  
//   // Debug logging
//   console.log('📄 Opening document:', {
//     profileId,
//     documentType, 
//     fileName,
//     originalName,
//     viewUrl
//   });
  
//   setCurrentDocument({
//     url: viewUrl,
//     name: originalName || fileName,
//     type: documentType
//   });
//   setShowDocumentModal(true);
// };

  // Add this function to handle document modal opening
const handleShowDocuments = (student) => {
  setSelectedStudentDocuments({
    studentId: student._id,
    studentName: student.userId?.name || student.name || 'Unknown Student',
    documents: student.documents || []
  });
  setShowDocumentsModal(true);
};

  const downloadDocument = async (profileId, documentType, fileName) => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        Notify.failure('Please log in to download documents');
        return;
      }
      Notify.info('Preparing download...');
      const response = await fetch(
        `http://localhost:5000/api/profiles/${profileId}/download/${documentType}/${fileName}`,
        { headers: { 'Authorization': `Bearer ${token}`, 'Accept': '*/*' } }
      );
      if (response.ok) {
        const blob = await response.blob();
        const cd = response.headers.get('Content-Disposition');
        let downloadFileName = fileName;
        if (cd) {
          const m = cd.match(/filename[^;=\n]*=((['"]).*?\2|[^;\n]*)/);
          if (m && m[1]) downloadFileName = m[1].replace(/['"]/g, '');
        }
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = downloadFileName;
        a.style.display = 'none';
        document.body.appendChild(a);
        a.click();
        setTimeout(() => {
          window.URL.revokeObjectURL(url);
          document.body.removeChild(a);
        }, 100);
        Notify.success(`Document "${downloadFileName}" downloaded successfully`);
      } else {
        let msg = 'Failed to download document';
        try {
          const err = await response.json();
          msg = err.message || msg;
          if (response.status === 404) msg = 'Document not found on server';
          else if (response.status === 403) msg = 'Access denied. Please check your permissions.';
          else if (response.status === 500) msg = 'Server error. Please try again later.';
        } catch {}
        throw new Error(msg);
      }
    } catch (error) {
      Notify.failure(error.message || 'Failed to download document');
    }
  };

  
  const filterStudents = () => {
    let filtered = students;
    if (searchTerm) {
      filtered = filtered.filter(student =>
        student.userId?.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.email?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.nationality?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        student.desiredFaculty?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterStatus !== 'all') {
      filtered = filtered.filter(student => {
        switch (filterStatus) {
          case 'pending': return !student.isStudentApproved;
          case 'approved': return student.isStudentApproved;
          case 'transfer': return student.transferStudent;
          default: return true;
        }
      });
    }
    setFilteredStudents(filtered);
  };

  const handleSearch = () => {
    if (activeTab === 'transfer') {
      fetchTransferStudents();
    } else {
      fetchStudents();
    }
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      const response = await fetch('http://localhost:5000/api/admin/approve-profile', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
        body: JSON.stringify({
          profileId: selectedStudent._id,
          approved: reviewForm.approved,
          advisorNotes: reviewForm.advisorNotes
        })
      });
      if (response.ok) {
        Notify.success('Review submitted successfully');
        setShowReviewModal(false);
        if (activeTab === 'transfer') fetchTransferStudents(); else fetchStudents();
        if (activeTab === 'overview') fetchDashboardData();
      } else {
        const err = await response.json();
        throw new Error(err.message || 'Failed to submit review');
      }
    } catch (error) {
      Notify.failure('Failed to submit review: ' + error.message);
    }
  };

  const handleBulkReview = () => {
    if (selectedStudents.length === 0) {
      Notify.warning('Please select students to review');
      return;
    }
    setShowBulkModal(true);
  };

  const handleSubmitBulkReview = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem('token');
      for (const studentId of selectedStudents) {
        await fetch('http://localhost:5000/api/admin/approve-profile', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json', 'Authorization': `Bearer ${token}` },
          body: JSON.stringify({
            profileId: studentId,
            approved: bulkReviewForm.approved,
            advisorNotes: bulkReviewForm.advisorNotes
          })
        });
      }
      Notify.success(`Bulk review completed for ${selectedStudents.length} students`);
      setShowBulkModal(false);
      setSelectedStudents([]);
      setBulkReviewForm({ approved: false, advisorNotes: '' });
      if (activeTab === 'transfer') fetchTransferStudents(); else fetchStudents();
      if (activeTab === 'overview') fetchDashboardData();
    } catch (error) {
      Notify.failure('Failed to submit bulk review');
    }
  };

  const handleSelectStudent = (studentId) => {
    setSelectedStudents(prev =>
      prev.includes(studentId) ? prev.filter(id => id !== studentId) : [...prev, studentId]
    );
  };

  const handleSelectAllStudents = () => {
    if (selectedStudents.length === filteredStudents.length) {
      setSelectedStudents([]);
    } else {
      setSelectedStudents(filteredStudents.map(student => student._id));
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
const handleLogoutBtn = () => {
    localStorage.removeItem('token');
    navigate('/');
    Notify.success("Logout successful, Thank you for using Our System");
  };
  const getStatusBadge = (student) => {
    if (student.isStudentApproved) {
      return <span className="status-badge approved">Approved</span>;
    }
    return <span className="status-badge pending">Pending Review</span>;
  };

  const formatDate = (dateString) => {
    if (!dateString) return 'Not provided';
    return new Date(dateString).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' });
  };

  const facultyOptions = [
    'Faculty of Business Administration',
    'Faculty of Information Technology',
    'Faculty of Health Sciences',
    'Faculty of Medicine',
    'Faculty in Education',
    'Bachelor Of Theology'
  ];

  const getDepartmentOptions = (faculty) => {
    const departments = {
      'Faculty of Business Administration': [
        'BBA In Accounting', 'BBA In Management', 'BBA in Finance', 'BBA in Marketing',
        'MBA in Accounting', 'MBA In Management', 'MBA In Finance', 'MBA in Human Resource Management', 'MBA in Project Management'
      ],
      'Faculty of Information Technology': [
        'BSc in Information Management', 'BSc in Networks and Communication Systems',
        'BSc in Software Engineering', 'Master Of Science In Data Analytics'
      ],
      'Faculty of Health Sciences': [
        'Bachelor of Science in Nursing', 'Bachelor of Science in Midwifery'
      ],
      'Faculty of Medicine': ['MD Of General Medicine'],
      'Faculty in Education': [
        'BA in Accounting and Information Technology', 'BA in English Language and Literature and French',
        'BA In Geography and History', 'Master of Art in Educational Administration', 'Master of Art In Curriculum, Instructions and Supervision'
      ],
      'Bachelor Of Theology': ['Bachelor of Theology']
    };
    return departments[faculty] || [];
  };

  // Loading screen for overview fetch
  if (loading && activeTab === 'overview') {
    return (
      <div className="advisor-dashboard">
        <div className="dashboard-layout">
          <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
            <div className="sidebar-header">
              <div className="brand">   <img src={AUCALOGO} alt="AUCA" className="img-fluid" /></div>
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

          <main className="main-content">
            <div className="topbar">
              <button
                className="sidebar-toggle"
                onClick={() => setSidebarOpen(prev => !prev)}
                aria-label="Toggle sidebar"
              >
                ☰
              </button>
              
              <h1 className="topbar-title">Advisor Dashboard</h1>
            </div>

            <div className="loading-container">
              <div className="loading-spinner"></div>
              <h2>Loading Advisor Dashboard...</h2>
            </div>
          </main>

        </div>
      </div>
    );
  }

  return (
    <div className="advisor-dashboard">
      <div className="dashboard-layout">
        {/* Sidebar */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
          <div className="sidebar-header">
            <div className="brand">
              <img src={AUCA} alt="AUCA" className="img-fluid" />
              </div>
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
         
        </aside>

        {/* Main content */}
        <main className="main-content">
          {/* Topbar for small screens */}
          <div className="topbar">
            <button
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(prev => !prev)}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <h1 className="topbar-title">Advisor Dashboard</h1>
            <div className="ms-auto">
            <IoPersonCircle
              style={{ color: "#2c5a99", fontSize: "3rem"}}
              onClick={() => setShowDropdown(!showDropdown)}
            />
            {showDropdown && (
              <div className="profile-dropdown position-absolute bg-white shadow p-2 rounded" style={{ right: "0px", top: "40px" }}>
                <p className=""></p>
               <b>Username:</b>  {userName} <br/><br/>
                <button className="logout-button btn btn-danger btn-sm w-100" onClick={handleLogoutBtn}><IoIosLogOut /> Logout</button>
              </div>
            )}
          </div>
          </div>

          {/* Questions Manager Tab */}
 {activeTab === 'questionsManager' && (
  <div className="tab-content">
    <div className="questions-manager-wrapper">
      <QuestionsManager />
    </div>
  </div>
)}  

          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div className="tab-content">
              <div className="stats-grid">

                <div className="stat-card">
                  {/* <div className="stat-icon">👥</div> */}
                  <div className="stat-content">
                    <div className="stat-value">{statistics.total || 0}</div>
                    <div className="stat-label">Total Profiles</div>
                  </div>
                </div>
                {/* end of stat-card */}
                <div className="stat-card">
               
                  <div className="stat-content">
                    <div className="stat-value">{statistics.pending || 0}</div>
                    <div className="stat-label">Pending Review</div>
                  </div>
                </div>
                <div className="stat-card">
                  {/* <div className="stat-icon">✅</div> */}
                  <div className="stat-content">
                    <div className="stat-value">{statistics.approved || 0}</div>
                    <div className="stat-label">Approved</div>
                  </div>
                </div>
                <div className="stat-card">
                  {/* <div className="stat-icon">📈</div> */}
                  <div className="stat-content">
                    <div className="stat-value">{statistics.recent || 0}</div>
                    <div className="stat-label">Recent (7 days)</div>
                  </div>
                </div>
                <div className="stat-card">
                  {/* <div className="stat-icon">📈</div> */}
                  <div className="stat-content">
                    <div className="stat-value">{statistics.approvalRate || 0}%</div>
                    <div className="stat-label">Approval Rate</div>
                  </div>
                </div>
              </div>

            
            </div>
          )}


{/* Students Tab (All, Pending, Approved, Transfer) */}
{(activeTab === 'students' || activeTab === 'pending' || activeTab === 'approved' || activeTab === 'transfer') && (
  <div className="tab-content">
    <div className="table_header">
  <h3 style={{textAlign:'center', margin: 0}}>STUDENTS WHO CREATED PROFILE</h3>
</div>
{/* <div className="table_header"><th style={{textAlign:'center'}}>STUDENTS WHO CREATED PROFILE</th> </div>  */}
    {/* Filters and Actions */}
    <div className="filters-section">
      <div className="search-box">
        <span className="search-icon">🔍</span>
        <input
          type="text"
          placeholder="Search students by name, email, nationality..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          onKeyPress={(e) => e.key === 'Enter' && handleSearch()}
          className="search-input"
        />
      </div> 
      
      {filteredStudents.length > 0 && (
        <div className="bulk-actions">
          <button onClick={handleSelectAllStudents} className="select-all-btn">
            {selectedStudents.length === filteredStudents.length ? 'Deselect All' : 'Select All'}
          </button>
          {selectedStudents.length > 0 && (
            <button onClick={handleBulkReview} className="bulk-review-btn">
              Bulk Review ({selectedStudents.length})
            </button>
          )}
        </div>
      )}
    </div>

    {/* Status Filter Buttons - NEW ADDITION */}
    {activeTab !== 'transfer' && (
      <div className="status-filters">
        <div className="filter-buttons">
          <button
            onClick={() => {
              setActiveTab('students');
              setFilterStatus('all');
              fetchStudents(1);
            }}
            className={`filter-btn ${activeTab === 'students' ? 'active' : ''}`}
          >
            <span className="filter-icon"></span>
            All Students
          </button>
          <button
            onClick={() => {
              setActiveTab('pending');
              setFilterStatus('pending');
              fetchStudents(1);
            }}
            className={`filter-btn ${activeTab === 'pending' ? 'active' : ''}`}
          >
            <span className="filter-icon"></span>
            Pending 
          </button>
          <button
            onClick={() => {
              setActiveTab('approved');
              setFilterStatus('approved');
              fetchStudents(1);
            }}
            className={`filter-btn ${activeTab === 'approved' ? 'active' : ''}`}
          >
            <span className="filter-icon"></span>
            Approved
          </button>
        </div>
      </div>
    )}


    {/* Students Table */}
    {!loading && (
      <div className="students-table-container">
        {filteredStudents.length > 0 ? (
          <div className="table-wrapper">
            <table className="students-table">
              <thead>
                <tr>
                  <th className="checkbox-column">
                    <input
                      type="checkbox"
                      checked={selectedStudents.length === filteredStudents.length && filteredStudents.length > 0}
                      onChange={handleSelectAllStudents}
                      className="table-checkbox"
                    />
                  </th>
                  <th>Name</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredStudents.map((student) => (
                  <tr key={student._id} className="student-row">
                    <td className="checkbox-column">
                      <input
                        type="checkbox"
                        checked={selectedStudents.includes(student._id)}
                        onChange={() => handleSelectStudent(student._id)}
                        className="table-checkbox"
                      />
                    </td>
                    <td className="name-column">
                      <div className="name-cell">
                        <div className="student-avatar-small">
                          {student.images && student.images.length > 0 ? (
                            <img
                              src={`http://localhost:5000${student.images[0].url}`}
                              alt="Profile"
                              className="avatar-image-small"
                            />
                          ) : (
                            <div className="avatar-placeholder-small">
                              {student.userId?.name?.charAt(0) || student.name?.charAt(0) || 'S'}
                            </div>
                          )}
                        </div>
                        <span className="student-name-text">
                          {student.userId?.name || student.name || 'N/A'}
                        </span>
                      </div>
                    </td>
                    <td className="email-column">
                      <span className="student-email-text">{student.email || 'N/A'}</span>
                    </td>
                  
                    {/* <td className="actions-column">
                      <div className="table-actions">
                      
                        <button
                          onClick={() => handleReviewStudent(student)}
                          className="table-btn review-btn"
                          title="Review Student"
                        >
                          <span className="btn-icon">📝</span>
                          Review
                        </button>
                        {student.documents && student.documents.length > 0 && (
                          <div className="document-dropdown">
                            <button className="table-btn doc-btn" title="Documents">
                              <span className="btn-icon">📄</span>
                              <span className="doc-count">({student.documents.length})</span>
                            </button>
                            <div className="document-dropdown-content">
                            {student.documents && student.documents.length > 0 && (
  <button 
    onClick={() => handleShowDocuments(student)}
    className="table-btn doc-btn" 
    title={`View ${student.documents.length} document(s)`}
  >
    <span className="btn-icon">📄</span>
    <span className="doc-count">({student.documents.length})</span>
  </button>
)}

                            </div>
                          </div>
                        )}
                      </div>
                    </td> */}

                   
<td className="actions-column">
  <div className="table-actions">
    <button
      onClick={() => handleReviewStudent(student)}
      className="table-btn review-btn"
      title="Review Student"
    >
      <span className="btn-icon">📝</span>
      Review
    </button>
    {student.documents && student.documents.length > 0 && (
      <button 
        onClick={() => handleShowDocuments(student)}
        className="table-btn doc-btn" 
        title={`View ${student.documents.length} document(s)`}
      >
        <span className="btn-icon">📄</span>
        <span className="doc-count">({student.documents.length})</span>
      </button>
    )}
  </div>
</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="no-students">
            <div className="no-students-icon">👥</div>
            <h3>No students found</h3>
            <p>
              {activeTab === 'transfer'
                ? 'No transfer students found in the system'
                : searchTerm 
                  ? 'No students match your search criteria'
                  : 'No students found in this category'
              }
            </p>
            {searchTerm && (
              <button 
                onClick={() => setSearchTerm('')} 
                className="clear-search-btn"
              >
                Clear Search
              </button>
            )}
          </div>
        )}
      </div>
    )}

    {/* Pagination */}
    {pagination.totalPages > 1 && (
      <div className="pagination">
        <button
          onClick={() => {
            const prevPage = pagination.currentPage - 1;
            if (activeTab === 'transfer') {
              fetchTransferStudents(prevPage);
            } else {
              fetchStudents(prevPage);
            }
          }}
          disabled={pagination.currentPage <= 1}
          className="pagination-btn"
        >
          Previous
        </button>
        <span className="pagination-info">
          Page {pagination.currentPage} of {pagination.totalPages}
          {pagination.totalItems && ` (${pagination.totalItems} total)`}
        </span>
        <button
          onClick={() => {
            const nextPage = pagination.currentPage + 1;
            if (activeTab === 'transfer') {
              fetchTransferStudents(nextPage);
            } else {
              fetchStudents(nextPage);
            }
          }}
          disabled={pagination.currentPage >= pagination.totalPages}
          className="pagination-btn"
        >
          Next
        </button>
      </div>
    )}
 
{/* Documents List Modal */}
{showDocumentsModal && selectedStudentDocuments && (
  <div className="modal-overlay">
    <div className="modal-content large-modal">
      <div className="modal-header">
        <h2>Documents - {selectedStudentDocuments.studentName}</h2>
        <button 
          onClick={() => setShowDocumentsModal(false)} 
          className="modal-close"
        >
          ✕
        </button>
      </div>

      <div className="documents-modal-content">
        {selectedStudentDocuments.documents.length > 0 ? (
          <div className="documents-grid">
            {selectedStudentDocuments.documents.map((doc, index) => (
              <div key={index} className="document-card">
                <div className="document-header">
                  <div className="document-icon">
                    {doc.mimeType?.includes('pdf') ? '📄' : 
                     doc.mimeType?.includes('image') ? '🖼️' : 
                     doc.mimeType?.includes('word') ? '📝' : '📎'}
                  </div>
                  <div className="document-info">
                    <h4 className="document-name" title={doc.originalName}>
                      {doc.originalName || doc.filename}
                    </h4>
                    <p className="document-details">
                      {doc.mimeType} • {doc.size ? (doc.size / 1024).toFixed(1) + ' KB' : 'Size unknown'}
                    </p>
                    <p className="document-upload-date">
                      Uploaded: {doc.uploadedAt ? new Date(doc.uploadedAt).toLocaleDateString() : 'Date unknown'}
                    </p>
                  </div>
                </div>
                
                <div className="document-actions">
                  <button
                    onClick={() => {
                      viewDocument(
                        selectedStudentDocuments.studentId, 
                        'document', 
                        doc.filename, 
                        doc.originalName
                      );
                    }}
                    className="doc-action-btn primary-btn"
                    title="View Document"
                  >
                    <span className="btn-icon">👁️</span>
                    View
                  </button>
                  <button
                    onClick={() => {
                      downloadDocument(
                        selectedStudentDocuments.studentId, 
                        'document', 
                        doc.filename
                      );
                    }}
                    className="doc-action-btn secondary-btn"
                    title="Download Document"
                  >
                    <span className="btn-icon">⬇️</span>
                    Download
                  </button>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="no-documents">
            <div className="no-documents-icon">📄</div>
            <p>No documents found for this student.</p>
          </div>
        )}
      </div>

      <div className="modal-actions">
        <button 
          onClick={() => setShowDocumentsModal(false)} 
          className="btn-cancel"
        >
          Close
        </button>
      </div>
    </div>
  </div>
)}

  </div>
    )}

        
         {/* Activity Log Tab */}
          {activeTab === 'activity' && (
            <div className="tab-content">
              <div className="activity-log">
                <h3>Recent Advisor Activity</h3>
                {activityLog.length > 0 ? (
                  <table className="activity-table">
                    <thead>
                      <tr>
                        <th>Student</th>
                        <th>Action</th>
                        <th>Date</th>
                        <th>Nationality / Faculty</th>
                        <th>Advisor Notes</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activityLog.map((activity, index) => (
                        <tr key={index}>
                          <td>{activity.student?.name || 'Unknown'}</td>
                          <td>{activity.action} by {activity.reviewedBy}</td>
                          <td>{formatDate(activity.reviewDate)}</td>
                          <td>{activity.nationality} • {activity.desiredFaculty}</td>
                          <td>{activity.advisorNotes || '-'}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <div className="no-activity">
                    <div className="no-activity-icon">📋</div>
                    <h3>No recent activity found</h3>
                    <p>Activity will appear here when advisors review student profiles</p>
                  </div>
                )}
              </div>
            </div>
          )}


          {/* Appointments Tab */}
          {activeTab === 'appointments' && (
            <div className="tab-content">
              <div className="appointments-header">
                <h3>Appointment Management</h3>
                <div className="appointment-actions">
                  <button 
                    onClick={() => setShowCreateAppointmentModal(true)} 
                    className="create-appointment-btn"
                  >
                    <span className="btn-icon">📅</span>
                    Create Slot
                  </button>
                  <button 
                    onClick={() => setShowCalendarView(prev => !prev)} 
                    className={`calendar-toggle-btn ${showCalendarView ? 'active' : ''}`}
                  >
                    <span className="btn-icon">{showCalendarView ? '📋' : '📅'}</span>
                    {showCalendarView ? 'List View' : 'Calendar View'}
                  </button>
                </div>
              </div>

              {/* Appointment Filters */}
              <div className="appointment-filters">
                <div className="filter-group">
                  <label>Status:</label>
                  <select 
                    value={appointmentFilter} 
                    onChange={(e) => setAppointmentFilter(e.target.value)}
                    className="filter-select"
                  >
                    <option value="all">All Appointments</option>
                    <option value="available">Available Slots</option>
                    <option value="booked">Booked</option>
                    <option value="completed">Completed</option>
                    <option value="cancelled">Cancelled</option>
                  </select>
                </div>
                <div className="filter-group">
                  <label>Date Range:</label>
                  <input 
                    type="date" 
                    value={dateFilter.start}
                    onChange={(e) => setDateFilter(prev => ({...prev, start: e.target.value}))}
                    className="date-input"
                  />
                  <span>to</span>
                  <input 
                    type="date" 
                    value={dateFilter.end}
                    onChange={(e) => setDateFilter(prev => ({...prev, end: e.target.value}))}
                    className="date-input"
                  />
                </div>
                <button onClick={fetchAppointments} className="filter-apply-btn">
                  Apply Filter
                </button>
              </div>

              {showCalendarView ? (
                /* Calendar View */
                <div className="calendar-view">
                  <div className="calendar-header">
                    <button 
                      onClick={() => setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}
                      className="calendar-nav-btn"
                    >
                      ‹
                    </button>
                    <h3 className="calendar-title">
                      {currentCalendarDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </h3>
                    <button 
                      onClick={() => setCurrentCalendarDate(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}
                      className="calendar-nav-btn"
                    >
                      ›
                    </button>
                  </div>
                  <div className="calendar-grid">
                    <div className="calendar-days-header">
                      {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                        <div key={day} className="calendar-day-header">{day}</div>
                      ))}
                    </div>
                    
                    <div className="calendar-days">
                      {generateCalendarDays(currentCalendarDate).map((day, index) => (
                        <div 
                          key={index} 
                          className={`calendar-day ${day.isCurrentMonth ? 'current-month' : 'other-month'} ${day.isToday ? 'today' : ''}`}
                          onClick={() => handleCalendarDayClick(day.date)}
                        >
                          <span className="day-number">{day.date.getDate()}</span>
                

<div className="day-appointments">
  {getAppointmentsForDate(day.date).slice(0, 3).map((apt, i) => (
    <div key={i} className={`mini-appointment ${apt.status}`} title={`${apt.startTime || apt.time} - ${apt.status} ${apt.student?.name || apt.studentName || ''}`}>
      <div className="appointment-time-display">
        {formatTimeForCalendar(apt.startTime || apt.time)}
      </div>
      <div className="appointment-status-display">
        {apt.status === 'booked' ? (
          <span className="booked-label">
            {apt.student?.name?.split(' ')[0] || apt.studentName?.split(' ')[0] || 'Booked'}
          </span>
        ) : apt.status === 'available' ? (
          <span className="available-label">Available</span>
        ) : (
          <span className="other-status-label">{apt.status}</span>
        )}
      </div>
    </div>
  ))}
  {getAppointmentsForDate(day.date).length > 3 && (
    <div className="more-appointments" title={`${getAppointmentsForDate(day.date).length - 3} more appointments on this day`}>
      +{getAppointmentsForDate(day.date).length - 3} more
    </div>
  )}
</div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              ) : (
                /* List View */
                <div className="appointments-list">
                  {loading ? (
                    <div className="loading-appointments">
                      <div className="loading-spinner"></div>
                      <p>Loading appointments...</p>
                    </div>
                  ) : filteredAppointments.length > 0 ? (
                    <div className="appointments-grid">
                      {filteredAppointments.map((appointment) => (
                        <div key={appointment._id} className={`appointment-card ${appointment.status}`}>
                          <div className="appointment-header">
                            <div className="appointment-time">
                              <span className="appointment-date">
                                {new Date(appointment.date).toLocaleDateString('en-US', {
                                  weekday: 'short',
                                  month: 'short',
                                  day: 'numeric'
                                })}
                              </span>
                              <span className="appointment-time-slot">
                                {appointment.startTime || appointment.time} - {appointment.endTime || appointment.time}
                              </span>
                            </div>
                            <div className={`appointment-status-badge ${appointment.status}`}>
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </div>
                          </div>

                          <div className="appointment-content">
                            {appointment.status === 'booked' && appointment.student ? (
                              <div className="appointment-student-info">
                                <div className="student-avatar-small">
                                  {appointment.student.name?.charAt(0) || appointment.studentName?.charAt(0) || 'S'}
                                </div>
                                <div className="student-details">
                                  <h4 className="student-name">{appointment.student.name || appointment.studentName}</h4>
                                  <p className="student-email">{appointment.student.email || appointment.studentEmail}</p>
                                  <p className="appointment-purpose">{appointment.reason || 'General consultation'}</p>
                                </div>
                              </div>
                            ) : appointment.status === 'available' ? (
                              <div className="appointment-available">
                                <div className="available-icon">📅</div>
                                <p className="available-text">Available slot</p>
                                <p className="slot-duration">{appointment.duration || 30} minutes</p>
                              </div>
                            ) : (
                              <div className="appointment-student-info">
                                <div className="student-avatar-small">
                                  {appointment.studentName?.charAt(0) || 'S'}
                                </div>
                                <div className="student-details">
                                  <h4 className="student-name">{appointment.studentName}</h4>
                                  <p className="student-email">{appointment.studentEmail}</p>
                                  <p className="appointment-purpose">{appointment.reason || 'General consultation'}</p>
                                </div>
                              </div>
                            )}

                            {appointment.notes && (
                              <div className="appointment-notes">
                                <strong>Notes:</strong> {appointment.notes}
                              </div>
                            )}

                            {appointment.meetingLink || appointment.location?.includes('http') ? (
                              <div className="meeting-link">
                                <a href={appointment.meetingLink || appointment.location} target="_blank" rel="noopener noreferrer" className="meeting-link-btn">
                                  🎥 Join Meeting
                                </a>
                              </div>
                            ) : null}
                          </div>
                             {/* start */}
                          {/* <div className="appointment-actions">
                            {appointment.status === 'available' && (
                              <>
                                <button 
                                  onClick={() => handleEditAppointment(appointment)}
                                  className="action-btn edit-btn"
                                >
                                  ✏️ Edit
                                </button>
                                <button 
                                  onClick={() => handleDeleteAppointment(appointment._id)}
                                  className="action-btn delete-btn"
                                >
                                  🗑️ Delete
                                </button>
                              </>
                            )}
                            
                            {appointment.status === 'booked' && (
                              <>
                                <button 
                                  onClick={() => handleStartAppointment(appointment)}
                                  className="action-btn start-btn"
                                  disabled={!isAppointmentTime(appointment)}
                                >
                                  🎯 Start
                                </button>
                                <button 
                                  onClick={() => handleCancelAppointment(appointment._id)}
                                  className="action-btn cancel-btn"
                                >
                                  ❌ Cancel
                                </button>
                              </>
                            )} */}

                            {/* <div className="appointment-actions">
  {appointment.status === 'available' && (
    <>
      <button 
        onClick={() => handleEditAppointment(appointment)}
        className="action-btn edit-btn"
      >
        ✏️ Edit
      </button>
      <button 
        onClick={() => handleDeleteAppointment(appointment._id)}
        className="action-btn delete-btn"
      >
        🗑️ Delete
      </button>
    </>
  )}
  
  {appointment.status === 'booked' && (
    <>
      {!appointment.confirmed && (
        <button 
          onClick={() => handleConfirmAppointment(appointment._id)}
          className="action-btn confirm-btn"
        >
          ✅ Confirm
        </button>
      )}
      
      <button 
        onClick={() => handleStartAppointment(appointment)}
        className="action-btn start-btn"
        disabled={!isAppointmentTime(appointment)}
      >
        🎯 Start
      </button>
      <button 
        onClick={() => handleCancelAppointment(appointment._id)}
        className="action-btn cancel-btn"
      >
        ❌ Cancel
      </button>
    </>
  )}
                            {appointment.status === 'completed' && (
                              <button 
                                onClick={() => console.log('View details for:', appointment)}
                                className="action-btn view-btn"
                              >
                                👁️ View Details
                              </button>
                            )}
                          </div> */}

                          <div className="appointment-actions">
  {appointment.status === 'available' && (
    <>
      <button 
        onClick={() => handleEditAppointment(appointment)}
        className="action-btn edit-btn"
      >
        ✏️ Edit
      </button>
      <button 
        onClick={() => handleDeleteAppointment(appointment._id)}
        className="action-btn delete-btn"
      >
        🗑️ Delete
      </button>
    </>
  )}
  
  {/* ✅ FIXED: Only show confirm for PENDING appointments */}
  {(appointment.status === 'pending' || appointment.status === 'booked') && (
    <>
      {appointment.status === 'pending' && (
        <button 
          onClick={() => handleConfirmAppointment(appointment._id)}
          className="action-btn confirm-btn"
        >
          ✅ Confirm
        </button>
      )}
      
      <button 
        onClick={() => handleStartAppointment(appointment)}
        className="action-btn start-btn"
        disabled={!isAppointmentTime(appointment)}
      >
        🎯 Start
      </button>
      <button 
        onClick={() => handleCancelAppointment(appointment._id)}
        className="action-btn cancel-btn"
      >
        ❌ Cancel
      </button>
    </>
  )}
  
  {appointment.status === 'confirmed' && (
    <>
      <button 
        onClick={() => handleStartAppointment(appointment)}
        className="action-btn start-btn"
        disabled={!isAppointmentTime(appointment)}
      >
        🎯 Start
      </button>
      <button 
        onClick={() => handleCancelAppointment(appointment._id)}
        className="action-btn cancel-btn"
      >
        ❌ Cancel
      </button>
    </>
  )}
  
  {appointment.status === 'completed' && (
    <button 
      onClick={() => console.log('View details for:', appointment)}
      className="action-btn view-btn"
    >
      👁️ View Details
    </button>
  )}
</div>


                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="no-appointments">
                      <div className="no-appointments-icon">📅</div>
                      <h3>No appointments found</h3>
                      <p>Create your first appointment slot to get started</p>
                      <button 
                        onClick={() => setShowCreateAppointmentModal(true)} 
                        className="create-first-appointment-btn"
                      >
                        Create Appointment Slot
                      </button>
                    </div>
                  )}
                </div>
              )}

              {appointmentPagination.totalPages > 1 && (
                <div className="pagination">
                  <button
                    onClick={() => fetchAppointments(appointmentPagination.currentPage - 1)}
                    disabled={appointmentPagination.currentPage <= 1}
                    className="pagination-btn"
                  >
                    Previous
                  </button>
                  <span className="pagination-info">
                    Page {appointmentPagination.currentPage} of {appointmentPagination.totalPages}
                  </span>
                  <button
                    onClick={() => fetchAppointments(appointmentPagination.currentPage + 1)}
                    disabled={appointmentPagination.currentPage >= appointmentPagination.totalPages}
                    className="pagination-btn"
                  >
                    Next
                  </button>
                </div>
              )}
            </div>
          )}
          {/* start */}
{/* Messages Tab - REPLACE YOUR EXISTING MESSAGES TAB WITH THIS */}
{activeTab === 'messages' && (
  <div className="tab-content">
    <div style={{padding: '20px'}}>
      {/* Header */}
      <div style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '2px solid #e0e0e0'
      }}>
        <h2 style={{margin: 0, color: '#333'}}>Student Messages</h2>
        <div style={{display: 'flex', gap: '10px'}}>
          <span style={{
            padding: '6px 12px',
            // background: '#e3f2fd',
            color: '#1976d2',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '500'
          }}>
            Total: {messages.length}
          </span>
          <span style={{
            padding: '6px 12px',
            background: '#fff3e0',
            color: '#f57c00',
            borderRadius: '20px',
            fontSize: '0.85rem',
            fontWeight: '500'
          }}>
            Unread: {messages.filter(m => !m.isRead).length}
          </span>
        </div>
      </div>

      {/* Filters */}
      <div style={{
        display: 'flex',
        gap: '15px',
        marginBottom: '20px',
        flexWrap: 'wrap'
      }}>
        {/* Search Box */}
        <div style={{flex: '1', minWidth: '300px'}}>
          <div className="search-box">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search by name, email, or message..."
              value={messageSearchTerm}
              onChange={(e) => setMessageSearchTerm(e.target.value)}
              className="search-input"
              style={{
                width: '100%',
                padding: '10px 10px 10px 35px',
                border: '1px solid #ddd',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
          </div>
        </div>

        {/* Filter Buttons */}
        <div style={{display: 'flex', gap: '8px'}}>
          <button
            onClick={() => setMessageFilter('all')}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              background: messageFilter === 'all' ? '#1976d2' : '#f5f5f5',
              color: messageFilter === 'all' ? 'white' : '#333',
              transition: 'all 0.2s'
            }}
          >
            All Messages
          </button>
          <button
            onClick={() => setMessageFilter('unread')}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              background: messageFilter === 'unread' ? '#ff9800' : '#f5f5f5',
              color: messageFilter === 'unread' ? 'white' : '#333',
              transition: 'all 0.2s'
            }}
          >
            Unread ({messages.filter(m => !m.isRead).length})
          </button>
          <button
            onClick={() => setMessageFilter('read')}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: 'pointer',
              fontWeight: '500',
              // background: messageFilter === 'read' ? '#4caf50' : '#f5f5f5',
              color: messageFilter === 'read' ? 'white' : '#333',
              transition: 'all 0.2s'
            }}
          >
            Read
          </button>
        </div>
      </div>

      {/* Messages Table */}
      {loading ? (
        <div style={{textAlign: 'center', padding: '60px 20px'}}>
          <div className="loading-spinner"></div>
          <p>Loading messages...</p>
        </div>
      ) : messages.length === 0 ? (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{fontSize: '4rem', marginBottom: '20px'}}>📭</div>
          <h3>No messages yet</h3>
          <p style={{color: '#666'}}>Messages from the contact form will appear here</p>
        </div>
      ) : filteredMessages.length > 0 ? (
        <div style={{
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
          overflow: 'hidden'
        }}>
          <table style={{
            width: '100%',
            borderCollapse: 'collapse'
          }}>
            <thead>
              <tr style={{background: '#f5f5f5'}}>
                {/* <th style={{padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.9rem'}}>Status</th> */}
                <th style={{padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.9rem'}}>Name</th>
                <th style={{padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.9rem'}}>Email</th>
                <th style={{padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.9rem'}}>Phone</th>
                <th style={{padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.9rem'}}>Message</th>
                {/* <th style={{padding: '12px', textAlign: 'left', fontWeight: '600', fontSize: '0.9rem'}}>Date</th> */}
                <th style={{padding: '12px', textAlign: 'center', fontWeight: '600', fontSize: '0.9rem'}}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMessages.map((message, index) => (
                <tr 
                  key={message._id || index}
                  style={{
                    borderTop: '1px solid #e0e0e0',
                    background: !message.isRead ? 'white' : 'white',
                    transition: 'background 0.2s'
                  }}
                  onMouseEnter={(e) => e.currentTarget.style.background = !message.isRead ? '#white' : 'white'}
                  onMouseLeave={(e) => e.currentTarget.style.background = !message.isRead ? 'white' : 'white'}
                >
                  {/* Status */}
                  {/* <td style={{padding: '12px'}}>
                    <span style={{
                      fontSize: '1.2rem',
                      color: !message.isRead ? '#ff9800' : '#9e9e9e'
                    }}>
                      {!message.isRead ? '●' : '○'}
                    </span>
                  </td> */}

                  {/* Name */}
                  <td style={{padding: '12px'}}>
                    <div style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
                      <div style={{
                        width: '36px',
                        height: '36px',
                        borderRadius: '50%',
                        background: 'white',
                        color: 'white',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        fontWeight: '600',
                        fontSize: '0.9rem'
                      }}>
                        {(message.name || message.names)?.charAt(0).toUpperCase() || '?'}
                      </div>
                      <span style={{fontWeight: '500'}}>
                        {message.name || message.names || 'Unknown'}
                      </span>
                    </div>
                  </td>

                  {/* Email */}
                  <td style={{padding: '12px'}}>
                    <a 
                      href={`mailto:${message.email}`}
                      style={{color: '#666', textDecoration: 'none'}}
                      onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                      onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                    >
                      {message.email || 'No email'}
                    </a>
                  </td>

                  {/* Phone */}
                  <td style={{padding: '12px'}}>
                    {message.phone ? (
                      <a 
                        href={`tel:${message.phone}`}
                        style={{color: '#666', textDecoration: 'none'}}
                        onMouseEnter={(e) => e.currentTarget.style.textDecoration = 'underline'}
                        onMouseLeave={(e) => e.currentTarget.style.textDecoration = 'none'}
                      >
                        {message.phone}
                      </a>
                    ) : (
                      <span style={{color: '#999', fontStyle: 'italic', fontSize: '0.85rem'}}>
                        Not provided
                      </span>
                    )}
                  </td>

                  {/* Message Preview */}
                  <td style={{padding: '12px'}}>
                    <div style={{
                      maxWidth: '300px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis',
                      whiteSpace: 'nowrap',
                      color: '#666',
                      fontSize: '0.9rem'
                    }}>
                      {message.message 
                        ? message.message.substring(0, 60) + (message.message.length > 60 ? '...' : '')
                        : 'No message content'
                      }
                    </div>
                  </td>

                  {/* Date */}
                  {/* <td style={{padding: '12px'}}>
                    <div>
                      <div style={{fontSize: '0.9rem'}}>
                        {message.createdAt 
                          ? new Date(message.createdAt).toLocaleDateString('en-US', {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric'
                            })
                          : 'Unknown'
                        }
                      </div>
                      <div style={{fontSize: '0.75rem', color: '#999', marginTop: '2px'}}>
                        {message.createdAt 
                          ? new Date(message.createdAt).toLocaleTimeString('en-US', {
                              hour: '2-digit',
                              minute: '2-digit'
                            })
                          : ''
                        }
                      </div>
                    </div>
                  </td> */}

                  {/* Actions */}
                  <td style={{padding: '12px'}}>
                    <div style={{display: 'flex', gap: '6px', justifyContent: 'center'}}>
                      <button
                        onClick={() => handleViewMessage(message)}
                        style={{
                          padding: '6px 10px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          background: '#e3f2fd',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#2196f3';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#e3f2fd';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        title="View message"
                      >
                        👁️
                      </button>
                      <button
                        onClick={() => handleReplyToMessage(message)}
                        style={{
                          padding: '6px 10px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          background: '#e8f5e9',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#4caf50';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#e8f5e9';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        title="Reply"
                      >
                        ↩️
                      </button>
                      {!message.isRead && (
                        <button
                          onClick={() => handleMarkAsRead(message._id)}
                          style={{
                            padding: '6px 10px',
                            border: 'none',
                            borderRadius: '4px',
                            cursor: 'pointer',
                            fontSize: '1rem',
                            background: '#fff3e0',
                            transition: 'all 0.2s'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.background = '#ff9800';
                            e.currentTarget.style.transform = 'translateY(-2px)';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.background = '#fff3e0';
                            e.currentTarget.style.transform = 'translateY(0)';
                          }}
                          title="Mark as read"
                        >
                          ✓
                        </button>
                      )}
                      <button
                        onClick={() => handleDeleteMessage(message._id)}
                        style={{
                          padding: '6px 10px',
                          border: 'none',
                          borderRadius: '4px',
                          cursor: 'pointer',
                          fontSize: '1rem',
                          background: '#ffebee',
                          transition: 'all 0.2s'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#f44336';
                          e.currentTarget.style.transform = 'translateY(-2px)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#ffebee';
                          e.currentTarget.style.transform = 'translateY(0)';
                        }}
                        title="Delete"
                      >
                        🗑️
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div style={{
          textAlign: 'center',
          padding: '60px 20px',
          background: 'white',
          borderRadius: '8px',
          boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
        }}>
          <div style={{fontSize: '3rem', marginBottom: '20px'}}>🔍</div>
          <h3>No messages found</h3>
          <p style={{color: '#666', marginBottom: '20px'}}>
            {messageSearchTerm 
              ? `No messages match "${messageSearchTerm}"`
              : messageFilter === 'unread'
              ? 'You have no unread messages'
              : 'You have no read messages'
            }
          </p>
          {messageSearchTerm && (
            <button
              onClick={() => setMessageSearchTerm('')}
              style={{
                padding: '10px 20px',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                background: '#1976d2',
                color: 'white',
                fontWeight: '500'
              }}
            >
              Clear Search
            </button>
          )}
        </div>
      )}

      {/* Pagination */}
      {messagePagination.totalPages > 1 && (
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          gap: '15px',
          marginTop: '20px',
          padding: '20px'
        }}>
          <button
            onClick={() => fetchMessages(messagePagination.currentPage - 1)}
            disabled={messagePagination.currentPage <= 1}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: messagePagination.currentPage <= 1 ? 'not-allowed' : 'pointer',
              background: messagePagination.currentPage <= 1 ? '#f5f5f5' : '#1976d2',
              color: messagePagination.currentPage <= 1 ? '#999' : 'white',
              fontWeight: '500'
            }}
          >
            ← Previous
          </button>
          <span style={{fontSize: '0.9rem', color: '#666'}}>
            Page {messagePagination.currentPage} of {messagePagination.totalPages}
            {messagePagination.totalItems && ` (${messagePagination.totalItems} total)`}
          </span>
          <button
            onClick={() => fetchMessages(messagePagination.currentPage + 1)}
            disabled={messagePagination.currentPage >= messagePagination.totalPages}
            style={{
              padding: '10px 20px',
              border: 'none',
              borderRadius: '8px',
              cursor: messagePagination.currentPage >= messagePagination.totalPages ? 'not-allowed' : 'pointer',
              background: messagePagination.currentPage >= messagePagination.totalPages ? '#f5f5f5' : '#1976d2',
              color: messagePagination.currentPage >= messagePagination.totalPages ? '#999' : 'white',
              fontWeight: '500'
            }}
          >
            Next →
          </button>
        </div>
      )}
    </div>
  </div>
)}

{/* View Message Modal */}
{showMessageModal && selectedMessage && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h2>📧 Message Details</h2>
        <button onClick={() => setShowMessageModal(false)} className="modal-close">✕</button>
      </div>
      
      <div style={{padding: '20px'}}>
        <div style={{
          display: 'flex',
          gap: '15px',
          marginBottom: '20px',
          paddingBottom: '20px',
          borderBottom: '2px solid #f0f0f0'
        }}>
          <div style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: '600',
            fontSize: '1.5rem',
            flexShrink: 0
          }}>
            {(selectedMessage.name || selectedMessage.names)?.charAt(0).toUpperCase() || '?'}
          </div>
          <div>
            <h3 style={{margin: '0 0 5px 0', color: '#333'}}>
              {selectedMessage.name || selectedMessage.names || 'Unknown Sender'}
            </h3>
            <p style={{margin: '5px 0', color: '#666'}}>
              <a href={`mailto:${selectedMessage.email}`} style={{color: '#1976d2', textDecoration: 'none'}}>
                {selectedMessage.email}
              </a>
            </p>
            {selectedMessage.phone && (
              <p style={{margin: '5px 0', color: '#666'}}>
                <a href={`tel:${selectedMessage.phone}`} style={{color: '#1976d2', textDecoration: 'none'}}>
                  📞 {selectedMessage.phone}
                </a>
              </p>
            )}
          </div>
        </div>

        <div style={{
          display: 'flex',
          flexWrap: 'wrap',
          gap: '15px',
          marginBottom: '20px',
          padding: '12px',
          background: '#f9f9f9',
          borderRadius: '6px',
          fontSize: '0.85rem'
        }}>
          <span style={{color: '#666'}}>
            📅 {new Date(selectedMessage.createdAt).toLocaleDateString('en-US', {
              weekday: 'long',
              year: 'numeric',
              month: 'long',
              day: 'numeric'
            })}
          </span>
          <span style={{color: '#666'}}>
            🕐 {new Date(selectedMessage.createdAt).toLocaleTimeString('en-US', {
              hour: '2-digit',
              minute: '2-digit'
            })}
          </span>
          <span style={{
            marginLeft: 'auto',
            padding: '4px 12px',
            borderRadius: '20px',
            fontWeight: '500',
            background: !selectedMessage.isRead ? '#fff3e0' : '#e8f5e9',
            color: !selectedMessage.isRead ? '#f57c00' : '#4caf50'
          }}>
            {!selectedMessage.isRead ? '● Unread' : '✓ Read'}
          </span>
        </div>

        <div style={{marginTop: '20px'}}>
          <h4 style={{
            margin: '0 0 10px 0',
            color: '#333',
            fontSize: '0.95rem',
            textTransform: 'uppercase',
            letterSpacing: '0.5px'
          }}>
            Message:
          </h4>
          <div style={{
            background: '#f9f9f9',
            padding: '15px',
            borderRadius: '8px',
            borderLeft: '4px solid #1976d2',
            whiteSpace: 'pre-wrap',
            wordWrap: 'break-word',
            color: '#333',
            lineHeight: '1.6'
          }}>
            {selectedMessage.message || 'No message content available'}
          </div>
        </div>
      </div>

      <div className="modal-actions">
        <button
          onClick={() => {
            setShowMessageModal(false);
            handleReplyToMessage(selectedMessage);
          }}
          className="btn-submit"
        >
          ↩️ Reply
        </button>
        <button onClick={() => setShowMessageModal(false)} className="btn-cancel">
          Close
        </button>
      </div>
    </div>
  </div>
)}

{/* Reply Modal */}
{showReplyModal && selectedMessage && (
  <div className="modal-overlay">
    <div className="modal-content">
      <div className="modal-header">
        <h2>↩️ Reply to Message</h2>
        <button onClick={() => setShowReplyModal(false)} className="modal-close">✕</button>
      </div>

      <form onSubmit={handleSubmitReply}>
        <div style={{
          background: '#f5f5f5',
          padding: '15px',
          borderRadius: '8px',
          marginBottom: '20px'
        }}>
          <h4 style={{margin: '0 0 10px 0', color: '#333', fontSize: '0.9rem'}}>
            Replying to:
          </h4>
          <p style={{margin: '5px 0', color: '#666'}}>
            <strong>{selectedMessage.name || selectedMessage.names}</strong> ({selectedMessage.email})
          </p>
          <div style={{
            marginTop: '15px',
            padding: '10px',
            background: 'white',
            borderRadius: '6px',
            borderLeft: '3px solid #1976d2'
          }}>
            <small style={{color: '#999', fontSize: '0.8rem'}}>Original message:</small>
            <p style={{
              margin: '5px 0 0 0',
              color: '#666',
              fontStyle: 'italic'
            }}>
              {selectedMessage.message}
            </p>
          </div>
        </div>

        <div className="form-group">
          <label className="form-label">Your Reply:</label>
          <textarea
            value={replyText}
            onChange={(e) => setReplyText(e.target.value)}
            className="form-textarea"
            rows="6"
            placeholder="Type your reply here..."
            required
            maxLength="2000"
            style={{
              width: '100%',
              padding: '10px',
              border: '1px solid #ddd',
              borderRadius: '8px',
              fontSize: '14px',
              fontFamily: 'inherit',
              resize: 'vertical'
            }}
          />
          <small style={{
            display: 'block',
            textAlign: 'right',
            color: '#999',
            fontSize: '0.8rem',
            marginTop: '5px'
          }}>
            {replyText.length} / 2000 characters
          </small>
        </div>

        <div className="modal-actions">
          <button
            type="button"
            onClick={() => setShowReplyModal(false)}
            className="btn-cancel"
          >
            Cancel
          </button>
          <button
            type="submit"
            className="btn-submit"
            disabled={!replyText.trim()}
            style={{
              opacity: !replyText.trim() ? 0.5 : 1,
              cursor: !replyText.trim() ? 'not-allowed' : 'pointer'
            }}
          >
            📤 Send Reply
          </button>
        </div>
      </form>
    </div>
  </div>
)}
{/* end */}
          {showReviewModal && selectedStudent && (
            <div className="modal-overlay">
              <div className="modal-content large-modal">
                <div className="modal-header">
                  <h2 className="reviewstudenttitle">Review Student: {selectedStudent.userId?.name || selectedStudent.name}</h2>
                  <button onClick={() => setShowReviewModal(false)} className="modal-close">✕</button>
                </div>

                <form onSubmit={handleSubmitReview} className="review-form">
                  <div className="student-info-section">
                    <h3>Student Information</h3>
                    <div className="info-grid">
                      <div className="info-item">
                        <span className="info-label">Name:</span>
                        <span className="info-value">{selectedStudent.userId?.name || selectedStudent.name}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Email:</span>
                        <span className="info-value">{selectedStudent.email}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Nationality:</span>
                        <span className="info-value">{selectedStudent.nationality}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Academic Level:</span>
                        <span className="info-value">{selectedStudent.currentAcademicLevel}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Program Type:</span>
                        <span className="info-value program-badge">{selectedStudent.studentProgram || 'Not specified'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">High School Grades:</span>
                        <span className="info-value">{selectedStudent.highSchoolGrades}%</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Desired Faculty:</span>
                        <span className="info-value">{selectedStudent.desiredFaculty || 'Not specified'}</span>
                      </div>
                      <div className="info-item">
                        <span className="info-label">Career Goals:</span>
                        <span className="info-value">{selectedStudent.careerGoals || 'Not specified'}</span>
                      </div>

                      {selectedStudent.transferStudent && (
                        <>
                          <div className="info-item">
                            <span className="info-label">Transfer Student:</span>
                            <span className="info-value transfer-badge">Yes</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Previous Institution:</span>
                            <span className="info-value">{selectedStudent.previousInstitution}</span>
                          </div>
                          <div className="info-item">
                            <span className="info-label">Previous Grade:</span>
                            <span className="info-value">{selectedStudent.overallGradePreviousUniversity}</span>
                          </div>
                        </>
                      )}
                    </div>

                    {selectedStudent.coursesStudiedInSecondary?.length > 0 && (
                      <div className="courses-section">
                        <h4>High School Courses</h4>
                        <div className="courses-list">
                          {selectedStudent.coursesStudiedInSecondary.map((course, index) => (
                            <span key={index} className="course-tag">{course}</span>
                          ))}
                        </div>
                      </div>
                    )}

                    {selectedStudent.transferStudent && selectedStudent.coursesStudiedPreviousUniversity && (
                      <div className="courses-section">
                        <h4>Previous University Courses</h4>
                        <div className="transfer-courses">
                          {selectedStudent.coursesStudiedPreviousUniversity.map((course, index) => (
                            <div key={index} className="transfer-course">
                              <span className="course-name">{course.courseName}</span>
                              <span className="course-code">{course.courseCode}</span>
                              <span className="course-grade">Grade: {course.grade}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Always show AI Recommendations section */}
<div className="ai-recommendations-section">
  <h4>AI Recommendations</h4>
  
  {/* Show recommendations if they exist */}
  {(selectedStudent.aiRecommendations || selectedStudent.recommendedFaculty) ? (
    <div className="recommendations-grid">
      {(selectedStudent.recommendedFaculty || selectedStudent.aiRecommendations?.recommendedFaculty) && (
        <div className="recommendation-item">
          <span className="rec-label">Recommended Faculty:</span>
          <span className="rec-value ai-recommendation">
            {selectedStudent.recommendedFaculty || selectedStudent.aiRecommendations?.recommendedFaculty}
          </span>
        </div>
      )}
      {(selectedStudent.recommendedDepartment || selectedStudent.aiRecommendations?.recommendedDepartment) && (
        <div className="recommendation-item">
          <span className="rec-label">Recommended Department:</span>
          <span className="rec-value ai-recommendation">
            {selectedStudent.recommendedDepartment || selectedStudent.aiRecommendations?.recommendedDepartment}
          </span>
        </div>
      )}
      {(selectedStudent.careerAdvice || selectedStudent.aiRecommendations?.careerAdvice) && (
        <div className="recommendation-item full-width">
          <span className="rec-label">AI Career Advice:</span>
          <span className="rec-value ai-recommendation">
            {selectedStudent.careerAdvice || selectedStudent.aiRecommendations?.careerAdvice}
          </span>
        </div>
      )}
    </div>
  ) : (
    /* Show No Recommendations message */
    <div className="no-recommendations-message">
      <div className="no-data-icon">🎯</div>
      <p className="no-recommendations-text">No Recommendations</p>
      <small className="no-recommendations-subtitle">
        This student has not generated AI career recommendations yet.
      </small>
    </div>
  )}
</div>
                  </div>

                  <div className="review-section">
                    <h3>Advisor Review</h3>

                    <div className="form-group">
                      <label className="form-label">Advisor Notes</label>
                      <textarea
                        value={reviewForm.advisorNotes}
                        onChange={(e) => setReviewForm({ ...reviewForm, advisorNotes: e.target.value })}
                        className="form-textarea"
                        rows="4"
                        placeholder="Add your notes about this student..."
                        maxLength="1000"
                      />
                    </div>

                    <div className="form-row">
                      <div className="form-group">
                        <label className="form-label">Recommended Faculty</label>
                        <select
                          value={reviewForm.recommendedFaculty}
                          onChange={(e) => setReviewForm({ ...reviewForm, recommendedFaculty: e.target.value, recommendedDepartment: '' })}
                          className="form-select"
                        >
                          <option value="">Select Faculty</option>
                          {facultyOptions.map(faculty => (
                            <option key={faculty} value={faculty}>{faculty}</option>
                          ))}
                        </select>
                      </div>

                      <div className="form-group">
                        <label className="form-label">Recommended Department</label>
                        <select
                          value={reviewForm.recommendedDepartment}
                          onChange={(e) => setReviewForm({ ...reviewForm, recommendedDepartment: e.target.value })}
                          className="form-select"
                          disabled={!reviewForm.recommendedFaculty}
                        >
                          <option value="">Select Department</option>
                          {getDepartmentOptions(reviewForm.recommendedFaculty).map(dept => (
                            <option key={dept} value={dept}>{dept}</option>
                          ))}
                        </select>
                      </div>
                    </div>

                    <div className="form-group">
                      <label className="form-label">Career Advice</label>
                      <textarea
                        value={reviewForm.careerAdvice}
                        onChange={(e) => setReviewForm({ ...reviewForm, careerAdvice: e.target.value })}
                        className="form-textarea"
                        rows="3"
                        placeholder="Provide career guidance and advice..."
                        maxLength="500"
                      />
                    </div>

                    <div className="form-group">
                      <label className="form-label">Next Steps</label>
                      <textarea
                        value={reviewForm.nextSteps}
                        onChange={(e) => setReviewForm({ ...reviewForm, nextSteps: e.target.value })}
                        className="form-textarea"
                        rows="3"
                        placeholder="Outline the next steps for this student..."
                        maxLength="500"
                      />
                    </div>

                    <div className="approval-section">
                      <label className="approval-checkbox">
                        <input
                          type="checkbox"
                          checked={reviewForm.approved}
                          onChange={(e) => setReviewForm({ ...reviewForm, approved: e.target.checked })}
                        />
                        <span className="checkbox-mark"></span>
                        <span className="checkbox-label">Approve this student</span>
                      </label>
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowReviewModal(false)} className="btn-cancel">
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      Submit Review
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {showDocumentModal && currentDocument && (
            <div className="modal-overlay">
              <div className="modal-content document-modal">
                <div className="modal-header">
                  <h2>Document Viewer: {currentDocument.name}</h2>
                  <button onClick={() => setShowDocumentModal(false)} className="modal-close">✕</button>
                </div>

                <div className="document-viewer">
                  {currentDocument.type === 'image' ? (
                    <img src={currentDocument.url} alt={currentDocument.name} className="document-image" />
                  ) : (
                    <iframe src={currentDocument.url} title={currentDocument.name} className="document-iframe" width="100%" height="600px" />
                  )}
                </div>

                <div className="document-actions">
                  <button
                    onClick={() => {
                      const link = document.createElement('a');
                      link.href = currentDocument.url;
                      link.download = currentDocument.name;
                      link.click();
                    }}
                    className="btn-download"
                  >
                    Download Document
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* Bulk Review Modal */}
          {showBulkModal && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h2>Bulk Review ({selectedStudents.length} students)</h2>
                  <button onClick={() => setShowBulkModal(false)} className="modal-close">✕</button>
                </div>

                <form onSubmit={handleSubmitBulkReview} className="bulk-review-form">
                  <div className="form-group">
                    <label className="form-label">Action</label>
                    <div className="radio-group">
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="bulkAction"
                          checked={bulkReviewForm.approved === true}
                          onChange={() => setBulkReviewForm({ ...bulkReviewForm, approved: true })}
                        />
                        <span className="radio-mark"></span>
                        <span className="radio-label">Approve Selected Students</span>
                      </label>
                      <label className="radio-option">
                        <input
                          type="radio"
                          name="bulkAction"
                          checked={bulkReviewForm.approved === false}
                          onChange={() => setBulkReviewForm({ ...bulkReviewForm, approved: false })}
                        />
                        <span className="radio-mark"></span>
                        <span className="radio-label">Mark as Reviewed (No Approval)</span>
                      </label>
                    </div>
                  </div>

                  <div className="selected-students-preview">
                    <h4>Selected Students:</h4>
                    <div className="students-preview-list">
                      {selectedStudents.map(studentId => {
                        const student = filteredStudents.find(s => s._id === studentId);
                        return (
                          <div key={studentId} className="preview-student">
                            <span>{student?.userId?.name || student?.name || 'Unknown'}</span>
                            <span>{student?.email}</span>
                            {student?.transferStudent && <span className="transfer-indicator">Transfer</span>}
                          </div>
                        );
                      })}
                    </div>
                  </div>

                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowBulkModal(false)} className="btn-cancel">
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      {bulkReviewForm.approved ? 'Approve All' : 'Review All'}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Create Appointment Modal */}
          {showCreateAppointmentModal && (
            <div className="modal-overlay">
              <div className="modal-content large-modal">
                <div className="modal-header">
                  <h2>Create Appointment Slot</h2>
                  <button onClick={() => setShowCreateAppointmentModal(false)} className="modal-close">✕</button>
                </div>

                <form onSubmit={handleCreateAppointment} className="appointment-form">
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Date *</label>
                      <input
                        type="date"
                        value={appointmentForm.date}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
                        className="form-input"
                        required
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Duration (minutes) *</label>
                      <select
                        value={appointmentForm.duration}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, duration: parseInt(e.target.value) })}
                        className="form-select"
                        required
                      >
                        <option value={15}>15 minutes</option>
                        <option value={30}>30 minutes</option>
                        <option value={45}>45 minutes</option>
                        <option value={60}>1 hour</option>
                        <option value={90}>1.5 hours</option>
                        <option value={120}>2 hours</option>
                      </select>
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Start Time *</label>
                      <input
                        type="time"
                        value={appointmentForm.startTime}
                        onChange={(e) => {
                          const startTime = e.target.value;
                          const [hours, minutes] = startTime.split(':');
                          const startDate = new Date();
                          startDate.setHours(parseInt(hours), parseInt(minutes));
                          const endDate = new Date(startDate.getTime() + appointmentForm.duration * 60000);
                          const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
                          
                          setAppointmentForm({ 
                            ...appointmentForm, 
                            startTime: startTime,
                            endTime: endTime
                          });
                        }}
                        className="form-input"
                        required
                      />
                    </div>
                    <div className="form-group">
                      <label className="form-label">End Time</label>
                      <input
                        type="time"
                        value={appointmentForm.endTime}
                        readOnly
                        className="form-input readonly"
                      />
                    </div>
                  </div>

                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">Meeting Type *</label>
                      <select
                        value={appointmentForm.meetingType}
                        onChange={(e) => setAppointmentForm({ ...appointmentForm, meetingType: e.target.value })}
                        className="form-select"
                        required
                      >
                        <option value="physical">In-Person</option>
                        <option value="online">Online Meeting</option>
                        <option value="both">Both (Student Choice)</option>
                      </select>
                    </div>
                    {appointmentForm.meetingType === 'online' && (
                      <div className="form-group">
                        <label className="form-label">Meeting Link</label>
                        <input
                          type="url"
                          value={appointmentForm.meetingLink}
                          onChange={(e) => setAppointmentForm({ ...appointmentForm, meetingLink: e.target.value })}
                          className="form-input"
                          placeholder="https://zoom.us/j/123456789 or Google Meet link"
                        />
                        <small className="form-help">Leave empty to auto-generate meeting link</small>
                      </div>
                    )}
                  </div>

                  <div className="form-group">
                    <label className="form-label">Notes</label>
                    <textarea
                      value={appointmentForm.notes}
                      onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
                      className="form-textarea"
                      rows="3"
                      placeholder="Any additional notes for this appointment slot..."
                      maxLength="500"
                    />
                  </div>
                    {/* recurring section */}
<div className="recurring-section">
  <div className="recurring-checkbox">
    <input
      type="checkbox"
      id="isRecurring"
      checked={appointmentForm.isRecurring}
      onChange={(e) => setAppointmentForm({ ...appointmentForm, isRecurring: e.target.checked })}
    />
    <label htmlFor="isRecurring">Make this a recurring appointment</label>
  </div>
  
  {appointmentForm.isRecurring && (
    <div className="recurring-options">
      <div className="form-row">
        <div className="form-group">
          <label className="form-label">Repeat Pattern</label>
          <select
            value={appointmentForm.recurringPattern}
            onChange={(e) => setAppointmentForm({ ...appointmentForm, recurringPattern: e.target.value })}
            className="form-select"
          >
            <option value="weekly">Weekly (same day and time)</option>
            <option value="biweekly">Bi-weekly (every 2 weeks)</option>
            <option value="monthly">Monthly (same date)</option>
          </select>
        </div>
        <div className="form-group">
          <label className="form-label">End Date</label>
          <input
            type="date"
            value={appointmentForm.recurringEndDate}
            onChange={(e) => setAppointmentForm({ ...appointmentForm, recurringEndDate: e.target.value })}
            className="form-input"
            min={appointmentForm.date}
            required={appointmentForm.isRecurring}
          />
        </div>
      </div>
      <div className="recurring-info">
        <p>This will create multiple appointment slots based on your pattern until the end date.</p>
        {appointmentForm.date && appointmentForm.recurringEndDate && (
          <p><strong>Preview:</strong> Slots will be created every {appointmentForm.recurringPattern === 'weekly' ? 'week' : appointmentForm.recurringPattern === 'biweekly' ? '2 weeks' : 'month'} from {new Date(appointmentForm.date).toLocaleDateString()} to {new Date(appointmentForm.recurringEndDate).toLocaleDateString()}</p>
        )}
      </div>
    </div>
  )}
  
</div>
                  <div className="modal-actions">
                    <button type="button" onClick={() => setShowCreateAppointmentModal(false)} className="btn-cancel">
                      Cancel
                    </button>
                    <button type="submit" className="btn-submit">
                      Create Appointment Slot
                    </button>
                  </div>
                </form>
              </div>
            </div>
            
          )}

          {/* Edit Appointment Modal */}
{showEditAppointmentModal && selectedAppointment && (
  <div className="modal-overlay">
    <div className="modal-content large-modal">
      <div className="modal-header">
        <h2>Edit Appointment Slot</h2>
        <button onClick={() => setShowEditAppointmentModal(false)} className="modal-close">✕</button>
      </div>

      <form onSubmit={handleUpdateAppointment} className="appointment-form">
        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Date *</label>
            <input
              type="date"
              value={appointmentForm.date}
              onChange={(e) => setAppointmentForm({ ...appointmentForm, date: e.target.value })}
              className="form-input"
              required
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <div className="form-group">
            <label className="form-label">Duration (minutes) *</label>
            <select
              value={appointmentForm.duration}
              onChange={(e) => setAppointmentForm({ ...appointmentForm, duration: parseInt(e.target.value) })}
              className="form-select"
              required
            >
              <option value={15}>15 minutes</option>
              <option value={30}>30 minutes</option>
              <option value={45}>45 minutes</option>
              <option value={60}>1 hour</option>
              <option value={90}>1.5 hours</option>
              <option value={120}>2 hours</option>
            </select>
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Start Time *</label>
            <input
              type="time"
              value={appointmentForm.startTime}
              onChange={(e) => {
                const startTime = e.target.value;
                const [hours, minutes] = startTime.split(':');
                const startDate = new Date();
                startDate.setHours(parseInt(hours), parseInt(minutes));
                const endDate = new Date(startDate.getTime() + appointmentForm.duration * 60000);
                const endTime = `${endDate.getHours().toString().padStart(2, '0')}:${endDate.getMinutes().toString().padStart(2, '0')}`;
                
                setAppointmentForm({ 
                  ...appointmentForm, 
                  startTime: startTime,
                  endTime: endTime
                });
              }}
              className="form-input"
              required
            />
          </div>
          <div className="form-group">
            <label className="form-label">End Time</label>
            <input
              type="time"
              value={appointmentForm.endTime}
              readOnly
              className="form-input readonly"
            />
          </div>
        </div>

        <div className="form-row">
          <div className="form-group">
            <label className="form-label">Meeting Type *</label>
            <select
              value={appointmentForm.meetingType}
              onChange={(e) => setAppointmentForm({ ...appointmentForm, meetingType: e.target.value })}
              className="form-select"
              required
            >
              <option value="physical">In-Person</option>
              <option value="online">Online Meeting</option>
              <option value="both">Both (Student Choice)</option>
            </select>
          </div>
          {appointmentForm.meetingType === 'online' && (
            <div className="form-group">
              <label className="form-label">Meeting Link</label>
              <input
                type="url"
                value={appointmentForm.meetingLink}
                onChange={(e) => setAppointmentForm({ ...appointmentForm, meetingLink: e.target.value })}
                className="form-input"
                placeholder="https://zoom.us/j/123456789 or Google Meet link"
              />
              <small className="form-help">Leave empty to auto-generate meeting link</small>
            </div>
          )}
        </div>

        <div className="form-group">
          <label className="form-label">Notes</label>
          <textarea
            value={appointmentForm.notes}
            onChange={(e) => setAppointmentForm({ ...appointmentForm, notes: e.target.value })}
            className="form-textarea"
            rows="3"
            placeholder="Any additional notes for this appointment slot..."
            maxLength="500"
          />
        </div>

        <div className="modal-actions">
          <button type="button" onClick={() => setShowEditAppointmentModal(false)} className="btn-cancel">
            Cancel
          </button>
          <button type="submit" className="btn-submit">
            Update Appointment Slot
          </button>
        </div>
      </form>
    </div>
  </div>
)}
          
        </main>
      </div>
    </div>
    
  );
  
};



export default AdvisorDashboard;