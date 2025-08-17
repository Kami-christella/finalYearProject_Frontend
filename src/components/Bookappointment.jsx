// // components/BookAppointment.jsx
// import React, { useState, useEffect } from 'react';
// import { Notify } from 'notiflix';
// import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
// import { MdVideoCall, MdLocationOn } from 'react-icons/md';
// import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
// import './styles/BookAppointment.css';

// const BookAppointment = () => {
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [myAppointments, setMyAppointments] = useState([]);
//   const [loading, setLoading] = useState(false);
//   const [selectedSlot, setSelectedSlot] = useState(null);
//   const [formData, setFormData] = useState({
//     studentName: '',
//     studentEmail: '',
//     phone: '',
//     reason: '',
//     preferredType: 'online'
//   });
//   const [activeTab, setActiveTab] = useState('book');
//   const [error, setError] = useState('');
//   const [success, setSuccess] = useState('');

//   // FIXED: Helper function to get token properly
//   const getAuthToken = () => {
//     const tokenFromStorage = localStorage.getItem('token');
//     if (!tokenFromStorage) return null;

//     try {
//       // Try to parse as JSON first
//       const userData = JSON.parse(tokenFromStorage);
//       return userData.token || userData; // Return nested token or the whole object
//     } catch (jsonError) {
//       // If JSON parsing fails, it's likely a plain JWT token
//       return tokenFromStorage;
//     }
//   };

//   // FIXED: Helper function to get user data from token
//   const getUserDataFromToken = () => {
//     const tokenFromStorage = localStorage.getItem('token');
//     if (!tokenFromStorage) return { name: '', email: '' };

//     try {
//       let token;
      
//       // Try to parse as JSON first
//       try {
//         const userData = JSON.parse(tokenFromStorage);
//         token = userData.token || tokenFromStorage;
        
//         // If we have direct name and email in userData, use them
//         if (userData.name && userData.email) {
//           return { name: userData.name, email: userData.email };
//         }
//       } catch (jsonError) {
//         // If JSON parsing fails, use the token directly
//         token = tokenFromStorage;
//       }

//       // Decode JWT token
//       const base64Url = token.split('.')[1];
//       const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
//       const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
//         return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
//       }).join(''));
      
//       const decodedToken = JSON.parse(jsonPayload);
      
//       return {
//         name: decodedToken.user?.name || decodedToken.name || '',
//         email: decodedToken.user?.email || decodedToken.email || ''
//       };
//     } catch (error) {
//       console.error('Error parsing user data from token:', error);
//       return { name: '', email: '' };
//     }
//   };

//   useEffect(() => {
//     // Load user data from token
//     const userData = getUserDataFromToken();
//     if (userData.name && userData.email) {
//       setFormData(prev => ({
//         ...prev,
//         studentName: userData.name,
//         studentEmail: userData.email
//       }));
//     }

//     // Load available slots and appointments
//     fetchAvailableSlots();
//     fetchMyAppointments();
//   }, []);

//   const fetchAvailableSlots = async () => {
//     try {
//       const token = getAuthToken();
//       if (!token) {
//         setError('Authentication required. Please login again.');
//         return;
//       }

//       const response = await fetch('http://localhost:5000/api/appointments/slots/available?limit=20', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setAvailableSlots(data.data.slots || []);
//       } else {
//         console.error('Failed to fetch slots:', data.message);
//       }
//     } catch (error) {
//       console.error('Error fetching slots:', error);
//       setError('Failed to load available slots. Please refresh the page.');
//     }
//   };

//   const fetchMyAppointments = async () => {
//     try {
//       const token = getAuthToken();
//       if (!token) return;

//       const response = await fetch('http://localhost:5000/api/appointments/my-appointments', {
//         headers: {
//           'Authorization': `Bearer ${token}`,
//           'Content-Type': 'application/json'
//         }
//       });
      
//       const data = await response.json();
//       if (data.success) {
//         setMyAppointments(data.data.appointments || []);
//       }
//     } catch (error) {
//       console.error('Error fetching appointments:', error);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSlotSelect = (slot) => {
//     setSelectedSlot(slot);
//     setError('');
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setLoading(true);
//     setError('');
//     setSuccess('');

//     if (!selectedSlot) {
//       setError('Please select a time slot');
//       setLoading(false);
//       return;
//     }

//     try {
//       const token = getAuthToken();
//       if (!token) {
//         setError('Authentication required. Please login again.');
//         setLoading(false);
//         return;
//       }

//       const appointmentData = {
//         ...formData,
//         timeSlotId: selectedSlot._id
//       };

//       const response = await fetch('http://localhost:5000/api/appointments/book', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify(appointmentData)
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess('Appointment booked successfully! You will receive a confirmation email.');
//         Notify.success('Appointment booked successfully!');
        
//         // Reset form
//         setFormData(prev => ({
//           ...prev,
//           reason: '',
//           phone: ''
//         }));
//         setSelectedSlot(null);
        
//         // Refresh data
//         fetchAvailableSlots();
//         fetchMyAppointments();
        
//         // Switch to appointments tab
//         setTimeout(() => {
//           setActiveTab('appointments');
//         }, 2000);
//       } else {
//         setError(data.message || 'Failed to book appointment');
//         Notify.failure(data.message || 'Failed to book appointment');
//       }
//     } catch (error) {
//       setError('Network error. Please try again.');
//       Notify.failure('Network error. Please try again.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const formatDate = (dateString) => {
//     const date = new Date(dateString);
//     return date.toLocaleDateString('en-US', {
//       weekday: 'long',
//       year: 'numeric',
//       month: 'long',
//       day: 'numeric'
//     });
//   };

//   const getStatusBadge = (status) => {
//     const statusConfig = {
//       pending: { class: 'status-pending', icon: <FaClock />, text: 'Pending' },
//       confirmed: { class: 'status-confirmed', icon: <IoCheckmarkCircle />, text: 'Confirmed' },
//       rejected: { class: 'status-rejected', icon: <IoCloseCircle />, text: 'Rejected' },
//       completed: { class: 'status-completed', icon: <IoCheckmarkCircle />, text: 'Completed' },
//       cancelled: { class: 'status-cancelled', icon: <IoCloseCircle />, text: 'Cancelled' },
//       rescheduled: { class: 'status-rescheduled', icon: <FaCalendarAlt />, text: 'Rescheduled' }
//     };

//     const config = statusConfig[status] || statusConfig.pending;
    
//     return (
//       <span className={`status-badge ${config.class}`}>
//         {config.icon}
//         {config.text}
//       </span>
//     );
//   };

//   return (
//     <div className="appointment-container">
//       {/* Header */}
//       {/* <div className="appointment-header">
//         <h2 className="page-title">
//           <FaCalendarAlt className="title-icon" />
//           Academic Advisor Appointments
//         </h2>
//         <p className="page-subtitle">
//           Book one-on-one sessions with academic advisors for career guidance and academic planning
//         </p>
//       </div> */}

//       {/* Tab Navigation */}
//       <div className="tab-navigation">
//         <button 
//           className={`tab-btn ${activeTab === 'book' ? 'active' : ''}`}
//           onClick={() => setActiveTab('book')}
//         >
//           <FaCalendarAlt /> Book Appointment
//         </button>
//         <button 
//           className={`tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
//           onClick={() => setActiveTab('appointments')}
//         >
//           <FaClock /> My Appointments ({myAppointments.length})
//         </button>
//       </div>

//       {/* Content */}
//       <div className="appointment-content">
//         {activeTab === 'book' && (
//           <div className="book-appointment-section">
//             {/* Error/Success Messages */}
//             {error && (
//               <div className="message-alert error-alert">
//                 <IoCloseCircle className="alert-icon" />
//                 <span>{error}</span>
//                 <button onClick={() => setError('')} className="close-btn">×</button>
//               </div>
//             )}

//             {success && (
//               <div className="message-alert success-alert">
//                 <IoCheckmarkCircle className="alert-icon" />
//                 <span>{success}</span>
//                 <button onClick={() => setSuccess('')} className="close-btn">×</button>
//               </div>
//             )}

//             <div className="booking-grid">
//               {/* Available Slots */}
//               <div className="slots-section">
//                 <h3 className="section-title">
//                   <FaClock className="section-icon" />
//                   Available Time Slots
//                 </h3>
                
//                 <div className="slots-container">
//                   {availableSlots.length === 0 ? (
//                     <div className="no-slots">
//                       <FaCalendarAlt className="no-slots-icon" />
//                       <p>No available slots at the moment</p>
//                       <small>Please check back later or contact the academic office</small>
//                     </div>
//                   ) : (
//                     availableSlots.map((slot) => (
//                       <div 
//                         key={slot._id}
//                         className={`slot-card ${selectedSlot?._id === slot._id ? 'selected' : ''}`}
//                         onClick={() => handleSlotSelect(slot)}
//                       >
//                         <div className="slot-header">
//                           <div className="slot-date">
//                             <FaCalendarAlt />
//                             {formatDate(slot.date)}
//                           </div>
//                           <div className="slot-time">
//                             <FaClock />
//                             {slot.time}
//                           </div>
//                         </div>
                        
//                         <div className="slot-details">
//                           <div className="advisor-info">
//                             <FaUser />
//                             <span>{slot.advisor?.name || 'Academic Advisor'}</span>
//                           </div>
                          
//                           <div className="slot-type">
//                             {slot.type === 'online' && <MdVideoCall />}
//                             {slot.type === 'physical' && <MdLocationOn />}
//                             {slot.type === 'both' && (
//                               <>
//                                 <MdVideoCall />
//                                 <MdLocationOn />
//                               </>
//                             )}
//                             <span>
//                               {slot.type === 'both' ? 'Online or Physical' : 
//                                slot.type === 'online' ? 'Online Meeting' : 'Physical Meeting'}
//                             </span>
//                           </div>
                          
//                           {slot.location && (
//                             <div className="slot-location">
//                               <FaMapMarkerAlt />
//                               <span>{slot.location}</span>
//                             </div>
//                           )}
//                         </div>
//                       </div>
//                     ))
//                   )}
//                 </div>
//               </div>

//               {/* Booking Form */}
//               <div className="form-section">
//                 <h3 className="section-title">
//                   <FaUser className="section-icon" />
//                   Appointment Details
//                 </h3>

//                 <form onSubmit={handleSubmit} className="appointment-form">
//                   <div className="form-group">
//                     <label className="form-label">
//                       <FaUser className="label-icon" />
//                       Full Name
//                     </label>
//                     <input
//                       type="text"
//                       name="studentName"
//                       value={formData.studentName}
//                       onChange={handleInputChange}
//                       required
//                       className="form-input"
//                       placeholder="Your full name"
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <FaEnvelope className="label-icon" />
//                       Email Address
//                     </label>
//                     <input
//                       type="email"
//                       name="studentEmail"
//                       value={formData.studentEmail}
//                       onChange={handleInputChange}
//                       required
//                       className="form-input"
//                       placeholder="your.email@student.auca.ac.rw"
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       <FaPhone className="label-icon" />
//                       Phone Number
//                     </label>
//                     <input
//                       type="tel"
//                       name="phone"
//                       value={formData.phone}
//                       onChange={handleInputChange}
//                       required
//                       className="form-input"
//                       placeholder="+250 788 123 456"
//                     />
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       Meeting Preference
//                     </label>
//                     <div className="radio-group">
//                       <label className="radio-option">
//                         <input
//                           type="radio"
//                           name="preferredType"
//                           value="online"
//                           checked={formData.preferredType === 'online'}
//                           onChange={handleInputChange}
//                         />
//                         <span className="radio-custom"></span>
//                         <MdVideoCall className="radio-icon" />
//                         Online Meeting
//                       </label>
//                       <label className="radio-option">
//                         <input
//                           type="radio"
//                           name="preferredType"
//                           value="physical"
//                           checked={formData.preferredType === 'physical'}
//                           onChange={handleInputChange}
//                         />
//                         <span className="radio-custom"></span>
//                         <MdLocationOn className="radio-icon" />
//                         Physical Meeting
//                       </label>
//                     </div>
//                   </div>

//                   <div className="form-group">
//                     <label className="form-label">
//                       Reason for Appointment
//                     </label>
//                     <textarea
//                       name="reason"
//                       value={formData.reason}
//                       onChange={handleInputChange}
//                       required
//                       className="form-textarea"
//                       rows="4"
//                       placeholder="Please describe the purpose of your appointment (e.g., career guidance, course selection, academic planning, etc.)"
//                     />
//                   </div>

//                   {selectedSlot && (
//                     <div className="selected-slot-summary">
//                       <h4>Selected Appointment</h4>
//                       <div className="summary-details">
//                         <p><FaCalendarAlt /> {formatDate(selectedSlot.date)}</p>
//                         <p><FaClock /> {selectedSlot.time}</p>
//                         <p><FaUser /> {selectedSlot.advisor?.name}</p>
//                       </div>
//                     </div>
//                   )}

//                   <button 
//                     type="submit" 
//                     disabled={loading || !selectedSlot}
//                     className={`submit-btn ${loading ? 'loading' : ''}`}
//                   >
//                     {loading ? (
//                       <>
//                         <div className="btn-spinner"></div>
//                         Booking Appointment...
//                       </>
//                     ) : (
//                       <>
//                         <FaCalendarAlt />
//                         Book Appointment
//                       </>
//                     )}
//                   </button>
//                 </form>
//               </div>
//             </div>
//           </div>
//         )}

//         {activeTab === 'appointments' && (
//           <div className="appointments-section">
//             <h3 className="section-title">
//               <FaClock className="section-icon" />
//               My Appointments
//             </h3>

//             {myAppointments.length === 0 ? (
//               <div className="no-appointments">
//                 <FaCalendarAlt className="no-appointments-icon" />
//                 <h4>No Appointments Yet</h4>
//                 <p>You haven't booked any appointments. Click on "Book Appointment" to schedule your first meeting with an academic advisor.</p>
//                 <button 
//                   onClick={() => setActiveTab('book')}
//                   className="book-first-btn"
//                 >
//                   <FaCalendarAlt />
//                   Book Your First Appointment
//                 </button>
//               </div>
//             ) : (
//               <div className="appointments-list">
//                 {myAppointments.map((appointment) => (
//                   <div key={appointment._id} className="appointment-card">
//                     <div className="appointment-header">
//                       <div className="appointment-date">
//                         <FaCalendarAlt />
//                         <div>
//                           <div className="date-main">{formatDate(appointment.date)}</div>
//                           <div className="time-main">{appointment.time}</div>
//                         </div>
//                       </div>
//                       {getStatusBadge(appointment.status)}
//                     </div>

//                     <div className="appointment-details">
//                       <div className="advisor-section">
//                         <FaUser className="detail-icon" />
//                         <div>
//                           <strong>{appointment.advisor?.name || 'Academic Advisor'}</strong>
//                           {appointment.advisor?.department && (
//                             <div className="advisor-dept">{appointment.advisor.department}</div>
//                           )}
//                         </div>
//                       </div>

//                       <div className="meeting-info">
//                         <div className="meeting-type">
//                           {appointment.type === 'online' && <MdVideoCall className="detail-icon" />}
//                           {appointment.type === 'physical' && <MdLocationOn className="detail-icon" />}
//                           <span>{appointment.type === 'online' ? 'Online Meeting' : 'Physical Meeting'}</span>
//                         </div>
                        
//                         <div className="meeting-location">
//                           <FaMapMarkerAlt className="detail-icon" />
//                           <span>{appointment.location}</span>
//                         </div>
//                       </div>

//                       {appointment.reason && (
//                         <div className="appointment-reason">
//                           <strong>Reason:</strong>
//                           <p>{appointment.reason}</p>
//                         </div>
//                       )}

//                       {appointment.notes && (
//                         <div className="appointment-notes">
//                           <strong>Advisor Notes:</strong>
//                           <p>{appointment.notes}</p>
//                         </div>
//                       )}

//                       {appointment.rejectionReason && (
//                         <div className="rejection-reason">
//                           <strong>Rejection Reason:</strong>
//                           <p>{appointment.rejectionReason}</p>
//                         </div>
//                       )}
//                     </div>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>
//         )}
//       </div>
//     </div>
//   );
// };

// export default BookAppointment;


// components/BookAppointment.jsx - Updated with unique class names
import React, { useState, useEffect } from 'react';
import { Notify } from 'notiflix';
import { FaCalendarAlt, FaClock, FaMapMarkerAlt, FaUser, FaPhone, FaEnvelope } from 'react-icons/fa';
import { MdVideoCall, MdLocationOn } from 'react-icons/md';
import { IoCheckmarkCircle, IoCloseCircle } from 'react-icons/io5';
import './styles/BookAppointment.css';

const BookAppointment = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    phone: '',
    reason: '',
    preferredType: 'online'
  });
  const [activeTab, setActiveTab] = useState('book');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Helper function to get token properly
  const getAuthToken = () => {
    const tokenFromStorage = localStorage.getItem('token');
    if (!tokenFromStorage) return null;

    try {
      const userData = JSON.parse(tokenFromStorage);
      return userData.token || userData;
    } catch (jsonError) {
      return tokenFromStorage;
    }
  };

  // Helper function to get user data from token
  const getUserDataFromToken = () => {
    const tokenFromStorage = localStorage.getItem('token');
    if (!tokenFromStorage) return { name: '', email: '' };

    try {
      let token;
      
      try {
        const userData = JSON.parse(tokenFromStorage);
        token = userData.token || tokenFromStorage;
        
        if (userData.name && userData.email) {
          return { name: userData.name, email: userData.email };
        }
      } catch (jsonError) {
        token = tokenFromStorage;
      }

      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      
      const decodedToken = JSON.parse(jsonPayload);
      
      return {
        name: decodedToken.user?.name || decodedToken.name || '',
        email: decodedToken.user?.email || decodedToken.email || ''
      };
    } catch (error) {
      console.error('Error parsing user data from token:', error);
      return { name: '', email: '' };
    }
  };

  useEffect(() => {
    const userData = getUserDataFromToken();
    if (userData.name && userData.email) {
      setFormData(prev => ({
        ...prev,
        studentName: userData.name,
        studentEmail: userData.email
      }));
    }

    fetchAvailableSlots();
    fetchMyAppointments();
  }, []);

  const fetchAvailableSlots = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setError('Authentication required. Please login again.');
        return;
      }

      const response = await fetch('http://localhost:5000/api/appointments/slots/available?limit=20', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setAvailableSlots(data.data.slots || []);
      } else {
        console.error('Failed to fetch slots:', data.message);
      }
    } catch (error) {
      console.error('Error fetching slots:', error);
      setError('Failed to load available slots. Please refresh the page.');
    }
  };

  const fetchMyAppointments = async () => {
    try {
      const token = getAuthToken();
      if (!token) return;

      const response = await fetch('http://localhost:5000/api/appointments/my-appointments', {
        headers: {
          'Authorization': `Bearer ${token}`,
          'Content-Type': 'application/json'
        }
      });
      
      const data = await response.json();
      if (data.success) {
        setMyAppointments(data.data.appointments || []);
      }
    } catch (error) {
      console.error('Error fetching appointments:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
    setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');

    if (!selectedSlot) {
      setError('Please select a time slot');
      setLoading(false);
      return;
    }

    try {
      const token = getAuthToken();
      if (!token) {
        setError('Authentication required. Please login again.');
        setLoading(false);
        return;
      }

      const appointmentData = {
        ...formData,
        timeSlotId: selectedSlot._id
      };

      const response = await fetch('http://localhost:5000/api/appointments/book', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(appointmentData)
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess('Appointment booked successfully! You will receive a confirmation email.');
        Notify.success('Appointment booked successfully!');
        
        setFormData(prev => ({
          ...prev,
          reason: '',
          phone: ''
        }));
        setSelectedSlot(null);
        
        fetchAvailableSlots();
        fetchMyAppointments();
        
        setTimeout(() => {
          setActiveTab('appointments');
        }, 2000);
      } else {
        setError(data.message || 'Failed to book appointment');
        Notify.failure(data.message || 'Failed to book appointment');
      }
    } catch (error) {
      setError('Network error. Please try again.');
      Notify.failure('Network error. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusBadge = (status) => {
    const statusConfig = {
      pending: { class: 'book-appointment-status-pending', icon: <FaClock />, text: 'Pending' },
      confirmed: { class: 'book-appointment-status-confirmed', icon: <IoCheckmarkCircle />, text: 'Confirmed' },
      rejected: { class: 'book-appointment-status-rejected', icon: <IoCloseCircle />, text: 'Rejected' },
      completed: { class: 'book-appointment-status-completed', icon: <IoCheckmarkCircle />, text: 'Completed' },
      cancelled: { class: 'book-appointment-status-cancelled', icon: <IoCloseCircle />, text: 'Cancelled' },
      rescheduled: { class: 'book-appointment-status-rescheduled', icon: <FaCalendarAlt />, text: 'Rescheduled' }
    };

    const config = statusConfig[status] || statusConfig.pending;
    
    return (
      <span className={`book-appointment-status-badge ${config.class}`}>
        {config.icon}
        {config.text}
      </span>
    );
  };

  return (
    <div className="book-appointment-container">
      {/* Tab Navigation */}
      <div className="book-appointment-tab-navigation">
        <button 
          className={`book-appointment-tab-btn ${activeTab === 'book' ? 'active' : ''}`}
          onClick={() => setActiveTab('book')}
        >
          <FaCalendarAlt /> Book Appointment
        </button>
        <button 
          className={`book-appointment-tab-btn ${activeTab === 'appointments' ? 'active' : ''}`}
          onClick={() => setActiveTab('appointments')}
        >
          <FaClock /> My Appointments ({myAppointments.length})
        </button>
      </div>

      {/* Content */}
      <div className="book-appointment-content">
        {activeTab === 'book' && (
          <div className="book-appointment-section">
            {/* Error/Success Messages */}
            {error && (
              <div className="book-appointment-message-alert book-appointment-error-alert">
                <IoCloseCircle className="book-appointment-alert-icon" />
                <span>{error}</span>
                <button onClick={() => setError('')} className="book-appointment-close-btn">×</button>
              </div>
            )}

            {success && (
              <div className="book-appointment-message-alert book-appointment-success-alert">
                <IoCheckmarkCircle className="book-appointment-alert-icon" />
                <span>{success}</span>
                <button onClick={() => setSuccess('')} className="book-appointment-close-btn">×</button>
              </div>
            )}

            <div className="book-appointment-booking-grid">
              {/* Available Slots */}
              <div className="book-appointment-slots-section">
                <h3 className="book-appointment-section-title">
                  <FaClock className="book-appointment-section-icon" />
                  Available Time Slots
                </h3>
                
                <div className="book-appointment-slots-container">
                  {availableSlots.length === 0 ? (
                    <div className="book-appointment-no-slots">
                      <FaCalendarAlt className="book-appointment-no-slots-icon" />
                      <p>No available slots at the moment</p>
                      <small>Please check back later or contact the academic office</small>
                    </div>
                  ) : (
                    availableSlots.map((slot) => (
                      <div 
                        key={slot._id}
                        className={`book-appointment-slot-card ${selectedSlot?._id === slot._id ? 'selected' : ''}`}
                        onClick={() => handleSlotSelect(slot)}
                      >
                        <div className="book-appointment-slot-header">
                          <div className="book-appointment-slot-date">
                            <FaCalendarAlt />
                            {formatDate(slot.date)}
                          </div>
                          <div className="book-appointment-slot-time">
                            <FaClock />
                            {slot.time}
                          </div>
                        </div>
                        
                        <div className="book-appointment-slot-details">
                          <div className="book-appointment-advisor-info">
                            <FaUser />
                            <span>{slot.advisor?.name || 'Academic Advisor'}</span>
                          </div>
                          
                          <div className="book-appointment-slot-type">
                            {slot.type === 'online' && <MdVideoCall />}
                            {slot.type === 'physical' && <MdLocationOn />}
                            {slot.type === 'both' && (
                              <>
                                <MdVideoCall />
                                <MdLocationOn />
                              </>
                            )}
                            <span>
                              {slot.type === 'both' ? 'Online or Physical' : 
                               slot.type === 'online' ? 'Online Meeting' : 'Physical Meeting'}
                            </span>
                          </div>
                          
                          {slot.location && (
                            <div className="book-appointment-slot-location">
                              <FaMapMarkerAlt />
                              <span>{slot.location}</span>
                            </div>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>

              {/* Booking Form */}
              <div className="book-appointment-form-section">
                <h3 className="book-appointment-section-title">
                  <FaUser className="book-appointment-section-icon" />
                  Appointment Details
                </h3>

                <form onSubmit={handleSubmit} className="book-appointment-form">
                  <div className="book-appointment-form-group">
                    <label className="book-appointment-form-label">
                      <FaUser className="book-appointment-label-icon" />
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleInputChange}
                      required
                      className="book-appointment-form-input"
                      placeholder="Your full name"
                    />
                  </div>

                  <div className="book-appointment-form-group">
                    <label className="book-appointment-form-label">
                      <FaEnvelope className="book-appointment-label-icon" />
                      Email Address
                    </label>
                    <input
                      type="email"
                      name="studentEmail"
                      value={formData.studentEmail}
                      onChange={handleInputChange}
                      required
                      className="book-appointment-form-input"
                      placeholder="your.email@student.auca.ac.rw"
                    />
                  </div>

                  <div className="book-appointment-form-group">
                    <label className="book-appointment-form-label">
                      <FaPhone className="book-appointment-label-icon" />
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className="book-appointment-form-input"
                      placeholder="+250 788 123 456"
                    />
                  </div>

                  <div className="book-appointment-form-group">
                    <label className="book-appointment-form-label">
                      Meeting Preference
                    </label>
                    <div className="book-appointment-radio-group">
                      <label className="book-appointment-radio-option">
                        <input
                          type="radio"
                          name="preferredType"
                          value="online"
                          checked={formData.preferredType === 'online'}
                          onChange={handleInputChange}
                        />
                        <span className="book-appointment-radio-custom"></span>
                        <MdVideoCall className="book-appointment-radio-icon" />
                        Online Meeting
                      </label>
                      <label className="book-appointment-radio-option">
                        <input
                          type="radio"
                          name="preferredType"
                          value="physical"
                          checked={formData.preferredType === 'physical'}
                          onChange={handleInputChange}
                        />
                        <span className="book-appointment-radio-custom"></span>
                        <MdLocationOn className="book-appointment-radio-icon" />
                        Physical Meeting
                      </label>
                    </div>
                  </div>

                  <div className="book-appointment-form-group">
                    <label className="book-appointment-form-label">
                      Reason for Appointment
                    </label>
                    <textarea
                      name="reason"
                      value={formData.reason}
                      onChange={handleInputChange}
                      required
                      className="book-appointment-form-textarea"
                      rows="4"
                      placeholder="Please describe the purpose of your appointment (e.g., career guidance, course selection, academic planning, etc.)"
                    />
                  </div>

                  {selectedSlot && (
                    <div className="book-appointment-selected-slot-summary">
                      <h4>Selected Appointment</h4>
                      <div className="book-appointment-summary-details">
                        <p><FaCalendarAlt /> {formatDate(selectedSlot.date)}</p>
                        <p><FaClock /> {selectedSlot.time}</p>
                        <p><FaUser /> {selectedSlot.advisor?.name}</p>
                      </div>
                    </div>
                  )}

                  <button 
                    type="submit" 
                    disabled={loading || !selectedSlot}
                    className={`book-appointment-submit-btn ${loading ? 'loading' : ''}`}
                  >
                    {loading ? (
                      <>
                        <div className="book-appointment-btn-spinner"></div>
                        Booking Appointment...
                      </>
                    ) : (
                      <>
                        <FaCalendarAlt />
                        Book Appointment
                      </>
                    )}
                  </button>
                </form>
              </div>
            </div>
          </div>
        )}

        {activeTab === 'appointments' && (
          <div className="book-appointment-appointments-section">
            <h3 className="book-appointment-section-title">
              <FaClock className="book-appointment-section-icon" />
              My Appointments
            </h3>

            {myAppointments.length === 0 ? (
              <div className="book-appointment-no-appointments">
                <FaCalendarAlt className="book-appointment-no-appointments-icon" />
                <h4>No Appointments Yet</h4>
                <p>You haven't booked any appointments. Click on "Book Appointment" to schedule your first meeting with an academic advisor.</p>
                <button 
                  onClick={() => setActiveTab('book')}
                  className="book-appointment-first-btn"
                >
                  <FaCalendarAlt />
                  Book Your First Appointment
                </button>
              </div>
            ) : (
              <div className="book-appointment-appointments-list">
                {myAppointments.map((appointment) => (
                  <div key={appointment._id} className="book-appointment-card">
                    <div className="book-appointment-card-header">
                      <div className="book-appointment-date">
                        <FaCalendarAlt />
                        <div>
                          <div className="book-appointment-date-main">{formatDate(appointment.date)}</div>
                          <div className="book-appointment-time-main">{appointment.time}</div>
                        </div>
                      </div>
                      {getStatusBadge(appointment.status)}
                    </div>

                    <div className="book-appointment-details">
                      <div className="book-appointment-advisor-section">
                        <FaUser className="book-appointment-detail-icon" />
                        <div>
                          <strong>{appointment.advisor?.name || 'Academic Advisor'}</strong>
                          {appointment.advisor?.department && (
                            <div className="book-appointment-advisor-dept">{appointment.advisor.department}</div>
                          )}
                        </div>
                      </div>

                      <div className="book-appointment-meeting-info">
                        <div className="book-appointment-meeting-type">
                          {appointment.type === 'online' && <MdVideoCall className="book-appointment-detail-icon" />}
                          {appointment.type === 'physical' && <MdLocationOn className="book-appointment-detail-icon" />}
                          <span>{appointment.type === 'online' ? 'Online Meeting' : 'Physical Meeting'}</span>
                        </div>
                        
                        <div className="book-appointment-meeting-location">
                          <FaMapMarkerAlt className="book-appointment-detail-icon" />
                          <span>{appointment.location}</span>
                        </div>
                      </div>

                      {appointment.reason && (
                        <div className="book-appointment-reason">
                          <strong>Reason:</strong>
                          <p>{appointment.reason}</p>
                        </div>
                      )}

                      {appointment.notes && (
                        <div className="book-appointment-notes">
                          <strong>Advisor Notes:</strong>
                          <p>{appointment.notes}</p>
                        </div>
                      )}

                      {appointment.rejectionReason && (
                        <div className="book-appointment-rejection-reason">
                          <strong>Rejection Reason:</strong>
                          <p>{appointment.rejectionReason}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default BookAppointment;