// import React, { useState, useEffect } from 'react';
// import { Calendar, Clock, MapPin, Monitor, User, Mail, Phone, CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2, Bell, Settings, MoreHorizontal } from 'lucide-react';
// import './styles/AdvisorAppointmentDashboard.css';

// const AdvisorAppointmentDashboard = () => {
//   const [appointments, setAppointments] = useState([]);
//   const [availableSlots, setAvailableSlots] = useState([]);
//   const [showAddSlot, setShowAddSlot] = useState(false);
//   const [selectedTab, setSelectedTab] = useState('pending'); // 'pending', 'confirmed', 'all'
//   const [loading, setLoading] = useState(false);
  
//   const [newSlot, setNewSlot] = useState({
//     date: '',
//     time: '',
//     type: 'both',
//     location: ''
//   });

//   // Sample data - will be replaced with API calls
//   const sampleAppointments = [
//     {
//       id: 1,
//       studentName: 'John Mugisha',
//       studentEmail: 'john.mugisha@student.auca.ac.rw',
//       phone: '+250 788 123 456',
//       date: '2025-08-15',
//       time: '10:00',
//       type: 'online',
//       location: 'Online - Tawk Chat',
//       reason: 'Academic guidance for Computer Science program selection. I need help choosing the right courses for my major and understanding the career prospects.',
//       status: 'pending',
//       createdAt: '2025-08-12 14:30'
//     },
//     {
//       id: 2,
//       studentName: 'Marie Uwimana',
//       studentEmail: 'marie.uwimana@student.auca.ac.rw',
//       phone: '+250 788 234 567',
//       date: '2025-08-16',
//       time: '14:00',
//       type: 'physical',
//       location: 'Office 205, Masoro Campus',
//       reason: 'Career counseling and internship opportunities in Business Administration.',
//       status: 'confirmed',
//       createdAt: '2025-08-11 09:15'
//     },
//     {
//       id: 3,
//       studentName: 'David Ntare',
//       studentEmail: 'david.ntare@student.auca.ac.rw',
//       phone: '+250 788 345 678',
//       date: '2025-08-17',
//       time: '09:00',
//       type: 'online',
//       location: 'Online - Tawk Chat',
//       reason: 'Course selection assistance and academic planning for final year.',
//       status: 'pending',
//       createdAt: '2025-08-13 16:45'
//     },
//     {
//       id: 4,
//       studentName: 'Grace Uwineza',
//       studentEmail: 'grace.uwineza@student.auca.ac.rw',
//       phone: '+250 788 456 789',
//       date: '2025-08-14',
//       time: '11:00',
//       type: 'physical',
//       location: 'Office 205, Masoro Campus',
//       reason: 'Discussion about thesis topic and research methodology.',
//       status: 'completed',
//       createdAt: '2025-08-10 13:20'
//     }
//   ];

//   const sampleSlots = [
//     {
//       id: 1,
//       date: '2025-08-15',
//       time: '09:00',
//       type: 'both',
//       location: 'Office 205, Masoro Campus / Online',
//       available: true
//     },
//     {
//       id: 2,
//       date: '2025-08-15',
//       time: '11:00',
//       type: 'online',
//       location: 'Online - Tawk Chat',
//       available: true
//     },
//     {
//       id: 3,
//       date: '2025-08-16',
//       time: '15:00',
//       type: 'both',
//       location: 'Office 205, Masoro Campus / Online',
//       available: true
//     },
//     {
//       id: 4,
//       date: '2025-08-17',
//       time: '11:00',
//       type: 'physical',
//       location: 'Office 205, Masoro Campus',
//       available: true
//     },
//     {
//       id: 5,
//       date: '2025-08-18',
//       time: '10:00',
//       type: 'online',
//       location: 'Online - Tawk Chat',
//       available: true
//     }
//   ];

//   useEffect(() => {
//     // TODO: Replace with actual API calls
//     setAppointments(sampleAppointments);
//     setAvailableSlots(sampleSlots);
//   }, []);

//   const handleStatusUpdate = async (appointmentId, newStatus) => {
//     setLoading(true);
    
//     // TODO: Replace with actual API call
//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       setAppointments(appointments.map(apt => 
//         apt.id === appointmentId ? { ...apt, status: newStatus } : apt
//       ));
      
//       // Show success message
//       const appointment = appointments.find(apt => apt.id === appointmentId);
//       alert(`Appointment with ${appointment?.studentName} has been ${newStatus}.`);
//     } catch (error) {
//       alert('Failed to update appointment status.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleAddSlot = async () => {
//     if (!newSlot.date || !newSlot.time) {
//       alert('Please fill in date and time');
//       return;
//     }

//     setLoading(true);

//     // TODO: Replace with actual API call
//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));
      
//       const slot = {
//         id: availableSlots.length + 1,
//         ...newSlot,
//         location: newSlot.location || (newSlot.type === 'online' ? 'Online - Tawk Chat' : 
//                   newSlot.type === 'physical' ? 'Office 205, Masoro Campus' :
//                   'Office 205, Masoro Campus / Online'),
//         available: true
//       };
      
//       setAvailableSlots([...availableSlots, slot]);
//       setNewSlot({ date: '', time: '', type: 'both', location: '' });
//       setShowAddSlot(false);
      
//       alert('Time slot added successfully!');
//     } catch (error) {
//       alert('Failed to add time slot.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleDeleteSlot = async (slotId) => {
//     if (!window.confirm('Are you sure you want to delete this time slot?')) return;
    
//     setLoading(true);
    
//     // TODO: Replace with actual API call
//     try {
//       await new Promise(resolve => setTimeout(resolve, 500));
//       setAvailableSlots(availableSlots.filter(slot => slot.id !== slotId));
//       alert('Time slot deleted successfully!');
//     } catch (error) {
//       alert('Failed to delete time slot.');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const getStatusBadgeClass = (status) => {
//     return `appointment-status-badge ${status}`;
//   };

//   const getStatusIcon = (status) => {
//     switch (status) {
//       case 'pending': return <AlertCircle className="h-4 w-4" />;
//       case 'confirmed': return <CheckCircle className="h-4 w-4" />;
//       case 'rejected': return <XCircle className="h-4 w-4" />;
//       case 'completed': return <CheckCircle className="h-4 w-4" />;
//       default: return <AlertCircle className="h-4 w-4" />;
//     }
//   };

//   const getFilteredAppointments = () => {
//     if (selectedTab === 'all') return appointments;
//     return appointments.filter(apt => apt.status === selectedTab);
//   };

//   const getStats = () => {
//     return {
//       pending: appointments.filter(apt => apt.status === 'pending').length,
//       confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
//       completed: appointments.filter(apt => apt.status === 'completed').length,
//       total: appointments.length,
//       availableSlots: availableSlots.filter(slot => slot.available).length
//     };
//   };

//   const stats = getStats();

//   return (
//     <div className="advisor-dashboard2">
//       {/* Header */}
//       <header className="advisor-header">
//         <div className="advisor-header-content">
//           <div className="advisor-header-flex">
//             <div className="advisor-header-left">
//               <div className="advisor-logo">
//                 <span>A</span>
//               </div>
//               <div>
//                 <h1 className="advisor-header-title">AUCA Advisor Portal</h1>
//                 <p className="advisor-header-subtitle">Manage Student Appointments</p>
//               </div>
//             </div>
//             <div className="advisor-header-right">
//               <div className="notification-bell">
//                 <Bell />
//                 {stats.pending > 0 && (
//                   <span className="notification-badge">
//                     {stats.pending}
//                   </span>
//                 )}
//               </div>
//               <div className="advisor-profile">
//                 <div className="advisor-avatar">
//                   <span>BB</span>
//                 </div>
//                 <div>
//                   <p className="advisor-name">Beatrice Bamurange</p>
//                   <p className="advisor-role">Academic Advisor</p>
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>
//       </header>

//       <div className="advisor-main">
//         {/* Stats Cards */}
//         <div className="stats-grid">
//           <div className="stat-card">
//             <div className="stat-card-content">
//               <div className="stat-icon-container pending">
//                 <AlertCircle className="stat-icon pending" />
//               </div>
//               <div>
//                 <p className="stat-number pending">{stats.pending}</p>
//                 <p className="stat-label pending">Pending</p>
//               </div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-card-content">
//               <div className="stat-icon-container confirmed">
//                 <CheckCircle className="stat-icon confirmed" />
//               </div>
//               <div>
//                 <p className="stat-number confirmed">{stats.confirmed}</p>
//                 <p className="stat-label confirmed">Confirmed</p>
//               </div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-card-content">
//               <div className="stat-icon-container completed">
//                 <CheckCircle className="stat-icon completed" />
//               </div>
//               <div>
//                 <p className="stat-number completed">{stats.completed}</p>
//                 <p className="stat-label completed">Completed</p>
//               </div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-card-content">
//               <div className="stat-icon-container total">
//                 <Calendar className="stat-icon total" />
//               </div>
//               <div>
//                 <p className="stat-number total">{stats.total}</p>
//                 <p className="stat-label total">Total</p>
//               </div>
//             </div>
//           </div>
//           <div className="stat-card">
//             <div className="stat-card-content">
//               <div className="stat-icon-container available">
//                 <Clock className="stat-icon available" />
//               </div>
//               <div>
//                 <p className="stat-number available">{stats.availableSlots}</p>
//                 <p className="stat-label available">Available</p>
//               </div>
//             </div>
//           </div>
//         </div>

//         <div className="advisor-grid">
//           {/* Main Content - Left Side (Appointments) */}
//           <div className="appointments-section">
//             {/* Appointments Header */}
//             <div className="appointments-header">
//               <div className="appointments-header-flex">
//                 <div className="appointments-header-left">
//                   <Calendar className="appointments-icon" />
//                   <div>
//                     <h2 className="appointments-title">Appointment Requests</h2>
//                     <p className="appointments-subtitle">Manage student consultation requests</p>
//                   </div>
//                 </div>
//               </div>
//             </div>

//             {/* Tabs */}
//             <div className="appointments-tabs">
//               {[
//                 { id: 'pending', label: 'Pending', count: stats.pending },
//                 { id: 'confirmed', label: 'Confirmed', count: stats.confirmed },
//                 { id: 'all', label: 'All', count: stats.total }
//               ].map((tab) => (
//                 <button
//                   key={tab.id}
//                   onClick={() => setSelectedTab(tab.id)}
//                   className={`tab-button ${selectedTab === tab.id ? 'active' : ''}`}
//                 >
//                   {tab.label}
//                   {tab.count > 0 && (
//                     <span className="tab-count">
//                       {tab.count}
//                     </span>
//                   )}
//                 </button>
//               ))}
//             </div>

//             {/* Appointments List */}
//             <div className="appointments-content">
//               {getFilteredAppointments().length > 0 ? (
//                 <div className="appointments-list">
//                   {getFilteredAppointments().map((appointment) => (
//                     <div key={appointment.id} className="appointment-item">
//                       <div className="appointment-item-content">
//                         <div className="appointment-info">
//                           <div className="appointment-student-header">
//                             <div className="student-avatar">
//                               <User />
//                             </div>
//                             <div>
//                               <h3 className="student-name">{appointment.studentName}</h3>
//                               <p className="appointment-date-requested">Requested {new Date(appointment.createdAt).toLocaleDateString()}</p>
//                             </div>
//                             <div className={getStatusBadgeClass(appointment.status)}>
//                               {getStatusIcon(appointment.status)}
//                               {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
//                             </div>
//                           </div>
                          
//                           <div className="appointment-details-grid">
//                             <div className="appointment-detail">
//                               <Mail className="appointment-detail-icon" />
//                               <span>{appointment.studentEmail}</span>
//                             </div>
//                             <div className="appointment-detail">
//                               <Phone className="appointment-detail-icon" />
//                               <span>{appointment.phone}</span>
//                             </div>
//                             <div className="appointment-detail">
//                               <Calendar className="appointment-detail-icon" />
//                               <span>{new Date(appointment.date).toLocaleDateString('en-US', {
//                                 weekday: 'long',
//                                 year: 'numeric',
//                                 month: 'long',
//                                 day: 'numeric'
//                               })} at {appointment.time}</span>
//                             </div>
//                             <div className="appointment-detail">
//                               {appointment.type === 'online' ? (
//                                 <Monitor className="appointment-detail-icon" style={{color: '#059669'}} />
//                               ) : (
//                                 <MapPin className="appointment-detail-icon" style={{color: '#ea580c'}} />
//                               )}
//                               <span>{appointment.location}</span>
//                             </div>
//                           </div>
                          
//                           <div className="appointment-reason-box">
//                             <h4 className="appointment-reason-title">Reason for Appointment:</h4>
//                             <p className="appointment-reason-text">{appointment.reason}</p>
//                           </div>
//                         </div>
                        
//                         {appointment.status === 'pending' && (
//                           <div className="appointment-actions">
//                             <button
//                               onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
//                               disabled={loading}
//                               className="action-btn confirm"
//                             >
//                               <CheckCircle />
//                               Confirm
//                             </button>
//                             <button
//                               onClick={() => handleStatusUpdate(appointment.id, 'rejected')}
//                               disabled={loading}
//                               className="action-btn reject"
//                             >
//                               <XCircle />
//                               Reject
//                             </button>
//                           </div>
//                         )}
                        
//                         {appointment.status === 'confirmed' && (
//                           <div className="appointment-actions">
//                             <button
//                               onClick={() => handleStatusUpdate(appointment.id, 'completed')}
//                               disabled={loading}
//                               className="action-btn complete"
//                             >
//                               <CheckCircle />
//                               Mark Complete
//                             </button>
//                           </div>
//                         )}
//                       </div>
//                     </div>
//                   ))}
//                 </div>
//               ) : (
//                 <div className="no-appointments-advisor">
//                   <Calendar className="no-appointments-icon-advisor" />
//                   <h3 className="no-appointments-title-advisor">No {selectedTab} appointments</h3>
//                   <p className="no-appointments-subtitle-advisor">Appointment requests will appear here when students book consultations.</p>
//                 </div>
//               )}
//             </div>
//           </div>

//           {/* Right Sidebar - Availability Management */}
//           <div className="availability-section">
//             {/* Availability Header */}
//             <div className="availability-header">
//               <div className="availability-header-flex">
//                 <h3 className="availability-title">
//                   <Clock />
//                   My Availability
//                 </h3>
//                 <button
//                   onClick={() => setShowAddSlot(true)}
//                   className="add-slot-btn"
//                 >
//                   <Plus />
//                 </button>
//               </div>
//             </div>

//             <div className="availability-content">
//               {/* Add Slot Form */}
//               {showAddSlot && (
//                 <div className="add-slot-form">
//                   <h4 className="add-slot-form-title">Add New Time Slot</h4>
//                   <div className="add-slot-form-fields">
//                     <div className="add-slot-field">
//                       <label className="add-slot-label">Date</label>
//                       <input
//                         type="date"
//                         value={newSlot.date}
//                         onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
//                         className="add-slot-input"
//                       />
//                     </div>
//                     <div className="add-slot-field">
//                       <label className="add-slot-label">Time</label>
//                       <input
//                         type="time"
//                         value={newSlot.time}
//                         onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
//                         className="add-slot-input"
//                       />
//                     </div>
//                     <div className="add-slot-field">
//                       <label className="add-slot-label">Type</label>
//                       <select
//                         value={newSlot.type}
//                         onChange={(e) => setNewSlot({...newSlot, type: e.target.value})}
//                         className="add-slot-select"
//                       >
//                         <option value="both">Both Online & Physical</option>
//                         <option value="online">Online Only</option>
//                         <option value="physical">Physical Only</option>
//                       </select>
//                     </div>
//                     <div className="add-slot-actions">
//                       <button
//                         onClick={handleAddSlot}
//                         disabled={loading}
//                         className="add-slot-submit"
//                       >
//                         Add
//                       </button>
//                       <button
//                         onClick={() => setShowAddSlot(false)}
//                         className="add-slot-cancel"
//                       >
//                         Cancel
//                       </button>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {/* Available Slots List */}
//               <div>
//                 <h4 className="slots-section-title">Available Time Slots</h4>
//                 {availableSlots.length > 0 ? (
//                   <div className="slots-list">
//                     {availableSlots.map((slot) => (
//                       <div key={slot.id} className="slot-item">
//                         <div className="slot-info">
//                           <div className="slot-date-box">
//                             <div className="slot-weekday">
//                               {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}
//                             </div>
//                             <div className="slot-day">
//                               {new Date(slot.date).getDate()}
//                             </div>
//                           </div>
//                           <div className="slot-details">
//                             <div className="slot-time">
//                               <Clock className="slot-time-icon" />
//                               <span className="slot-time-text">{slot.time}</span>
//                             </div>
//                             <div className="slot-type">
//                               {slot.type === 'online' ? (
//                                 <Monitor className="slot-type-icon" />
//                               ) : slot.type === 'physical' ? (
//                                 <MapPin className="slot-type-icon" />
//                               ) : (
//                                 <div style={{display: 'flex', gap: '0.25rem'}}>
//                                   <Monitor className="slot-type-icon" />
//                                   <MapPin className="slot-type-icon" />
//                                 </div>
//                               )}
//                               <span>{slot.type === 'both' ? 'Both' : slot.type}</span>
//                             </div>
//                           </div>
//                         </div>
//                         <div className="slot-actions">
//                           <span className={`slot-status-badge ${slot.available ? 'available' : 'booked'}`}>
//                             {slot.available ? 'Available' : 'Booked'}
//                           </span>
//                           <button
//                             onClick={() => handleDeleteSlot(slot.id)}
//                             disabled={loading}
//                             className="delete-slot-btn"
//                           >
//                             <Trash2 />
//                           </button>
//                         </div>
//                       </div>
//                     ))}
//                   </div>
//                 ) : (
//                   <div className="no-slots-advisor">
//                     <Clock className="no-slots-icon-advisor" />
//                     <p className="no-slots-title-advisor">No available time slots</p>
//                     <p className="no-slots-subtitle-advisor">Add your availability to allow students to book appointments</p>
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>

//           {/* Quick Actions Card */}
//           <div className="quick-actions-card">
//             <h4 className="quick-actions-title">Quick Actions</h4>
//             <div className="quick-actions-list">
//               <button className="quick-action-item">
//                 📧 Send email to all pending students
//               </button>
//               <button className="quick-action-item">
//                 📊 View appointment analytics
//               </button>
//               <button className="quick-action-item">
//                 ⚙️ Update availability preferences
//               </button>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default AdvisorAppointmentDashboard;
import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Monitor, User, Mail, Phone, CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2, Bell, Settings, MoreHorizontal } from 'lucide-react';
import './styles/AdvisorAppointmentDashboard.css';

const AdvisorAppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [showAddAppointment, setShowAddAppointment] = useState(false);
  const [selectedTab, setSelectedTab] = useState('pending'); // 'pending', 'confirmed', 'all'
  const [loading, setLoading] = useState(false);
  
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
    type: 'both',
    location: ''
  });

  const [newAppointment, setNewAppointment] = useState({
    studentName: '',
    studentEmail: '',
    phone: '',
    date: '',
    time: '',
    type: 'physical',
    location: 'Office 205, Masoro Campus',
    reason: ''
  });

  // Sample data - will be replaced with API calls
  const sampleAppointments = [
    {
      id: 1,
      studentName: 'John Mugisha',
      studentEmail: 'john.mugisha@student.auca.ac.rw',
      phone: '+250 788 123 456',
      date: '2025-08-15',
      time: '10:00',
      type: 'online',
      location: 'Online - Tawk Chat',
      reason: 'Academic guidance for Computer Science program selection. I need help choosing the right courses for my major and understanding the career prospects.',
      status: 'pending',
      createdAt: '2025-08-12 14:30'
    },
    {
      id: 2,
      studentName: 'Marie Uwimana',
      studentEmail: 'marie.uwimana@student.auca.ac.rw',
      phone: '+250 788 234 567',
      date: '2025-08-16',
      time: '14:00',
      type: 'physical',
      location: 'Office 205, Masoro Campus',
      reason: 'Career counseling and internship opportunities in Business Administration.',
      status: 'confirmed',
      createdAt: '2025-08-11 09:15'
    },
    {
      id: 3,
      studentName: 'David Ntare',
      studentEmail: 'david.ntare@student.auca.ac.rw',
      phone: '+250 788 345 678',
      date: '2025-08-17',
      time: '09:00',
      type: 'online',
      location: 'Online - Tawk Chat',
      reason: 'Course selection assistance and academic planning for final year.',
      status: 'pending',
      createdAt: '2025-08-13 16:45'
    },
    {
      id: 4,
      studentName: 'Grace Uwineza',
      studentEmail: 'grace.uwineza@student.auca.ac.rw',
      phone: '+250 788 456 789',
      date: '2025-08-14',
      time: '11:00',
      type: 'physical',
      location: 'Office 205, Masoro Campus',
      reason: 'Discussion about thesis topic and research methodology.',
      status: 'completed',
      createdAt: '2025-08-10 13:20'
    }
  ];

  const sampleSlots = [
    {
      id: 1,
      date: '2025-08-15',
      time: '09:00',
      type: 'both',
      location: 'Office 205, Masoro Campus / Online',
      available: true
    },
    {
      id: 2,
      date: '2025-08-15',
      time: '11:00',
      type: 'online',
      location: 'Online - Tawk Chat',
      available: true
    },
    {
      id: 3,
      date: '2025-08-16',
      time: '15:00',
      type: 'both',
      location: 'Office 205, Masoro Campus / Online',
      available: true
    },
    {
      id: 4,
      date: '2025-08-17',
      time: '11:00',
      type: 'physical',
      location: 'Office 205, Masoro Campus',
      available: true
    },
    {
      id: 5,
      date: '2025-08-18',
      time: '10:00',
      type: 'online',
      location: 'Online - Tawk Chat',
      available: true
    }
  ];

  useEffect(() => {
    // TODO: Replace with actual API calls
    setAppointments(sampleAppointments);
    setAvailableSlots(sampleSlots);
  }, []);

  const handleStatusUpdate = async (appointmentId, newStatus) => {
    setLoading(true);
    
    // TODO: Replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      ));
      
      // Show success message
      const appointment = appointments.find(apt => apt.id === appointmentId);
      alert(`Appointment with ${appointment?.studentName} has been ${newStatus}.`);
    } catch (error) {
      alert('Failed to update appointment status.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddSlot = async () => {
    if (!newSlot.date || !newSlot.time) {
      alert('Please fill in date and time');
      return;
    }

    setLoading(true);

    // TODO: Replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const slot = {
        id: availableSlots.length + 1,
        ...newSlot,
        location: newSlot.location || (newSlot.type === 'online' ? 'Online - Tawk Chat' : 
                  newSlot.type === 'physical' ? 'Office 205, Masoro Campus' :
                  'Office 205, Masoro Campus / Online'),
        available: true
      };
      
      setAvailableSlots([...availableSlots, slot]);
      setNewSlot({ date: '', time: '', type: 'both', location: '' });
      setShowAddSlot(false);
      
      alert('Time slot added successfully!');
    } catch (error) {
      alert('Failed to add time slot.');
    } finally {
      setLoading(false);
    }
  };

  const handleAddAppointment = async () => {
    if (!newAppointment.studentName || !newAppointment.studentEmail || !newAppointment.date || !newAppointment.time || !newAppointment.reason) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    // TODO: Replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      
      const appointment = {
        id: appointments.length + 1,
        ...newAppointment,
        location: newAppointment.type === 'online' ? 'Online - Tawk Chat' : 
                  newAppointment.type === 'physical' ? 'Office 205, Masoro Campus' :
                  newAppointment.location,
        status: 'confirmed', // Manually added appointments are automatically confirmed
        createdAt: new Date().toISOString()
      };
      
      setAppointments([...appointments, appointment]);
      setNewAppointment({
        studentName: '',
        studentEmail: '',
        phone: '',
        date: '',
        time: '',
        type: 'physical',
        location: 'Office 205, Masoro Campus',
        reason: ''
      });
      setShowAddAppointment(false);
      
      alert('Appointment added successfully!');
    } catch (error) {
      alert('Failed to add appointment.');
    } finally {
      setLoading(false);
    }
  };

  const handleDeleteSlot = async (slotId) => {
    if (!window.confirm('Are you sure you want to delete this time slot?')) return;
    
    setLoading(true);
    
    // TODO: Replace with actual API call
    try {
      await new Promise(resolve => setTimeout(resolve, 500));
      setAvailableSlots(availableSlots.filter(slot => slot.id !== slotId));
      alert('Time slot deleted successfully!');
    } catch (error) {
      alert('Failed to delete time slot.');
    } finally {
      setLoading(false);
    }
  };

  const getStatusBadgeClass = (status) => {
    return `appointment-status-badge ${status}`;
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <XCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  const getFilteredAppointments = () => {
    if (selectedTab === 'all') return appointments;
    return appointments.filter(apt => apt.status === selectedTab);
  };

  const getStats = () => {
    return {
      pending: appointments.filter(apt => apt.status === 'pending').length,
      confirmed: appointments.filter(apt => apt.status === 'confirmed').length,
      completed: appointments.filter(apt => apt.status === 'completed').length,
      total: appointments.length,
      availableSlots: availableSlots.filter(slot => slot.available).length
    };
  };

  const stats = getStats();

  return (
    <div className="advisor-dashboard2">
      {/* Header */}
      <header className="advisor-header">
        <div className="advisor-header-content">
          <div className="advisor-header-flex">
            <div className="advisor-header-left">
              <div className="advisor-logo">
                <span>A</span>
              </div>
              <div>
                <h1 className="advisor-header-title">AUCA Advisor Portal</h1>
                <p className="advisor-header-subtitle">Manage Student Appointments</p>
              </div>
            </div>
            <div className="advisor-header-right">
              <div className="notification-bell">
                <Bell />
                {stats.pending > 0 && (
                  <span className="notification-badge">
                    {stats.pending}
                  </span>
                )}
              </div>
              <div className="advisor-profile">
                <div className="advisor-avatar">
                  <span>SM</span>
                </div>
                <div>
                  <p className="advisor-name">Dr. Sarah Mukamana</p>
                  <p className="advisor-role">Academic Advisor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="advisor-main">
        {/* Add Appointment Modal */}
        {showAddAppointment && (
          <div className="modal-overlay" onClick={() => setShowAddAppointment(false)}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
              <div className="modal-header">
                <h3 className="modal-title">Add New Appointment</h3>
                <button 
                  onClick={() => setShowAddAppointment(false)}
                  className="modal-close-btn"
                >
                  <XCircle />
                </button>
              </div>
              
              <div className="modal-body">
                <div className="add-appointment-form">
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Student Name *</label>
                      <input
                        type="text"
                        value={newAppointment.studentName}
                        onChange={(e) => setNewAppointment({...newAppointment, studentName: e.target.value})}
                        className="form-input"
                        placeholder="Enter student's full name"
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Email Address *</label>
                      <input
                        type="email"
                        value={newAppointment.studentEmail}
                        onChange={(e) => setNewAppointment({...newAppointment, studentEmail: e.target.value})}
                        className="form-input"
                        placeholder="student@auca.ac.rw"
                      />
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Phone Number</label>
                      <input
                        type="tel"
                        value={newAppointment.phone}
                        onChange={(e) => setNewAppointment({...newAppointment, phone: e.target.value})}
                        className="form-input"
                        placeholder="+250 XXX XXX XXX"
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Meeting Type *</label>
                      <select
                        value={newAppointment.type}
                        onChange={(e) => setNewAppointment({...newAppointment, type: e.target.value})}
                        className="form-input"
                      >
                        <option value="physical">Physical Meeting</option>
                        <option value="online">Online Meeting</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="form-row">
                    <div className="form-field">
                      <label className="form-label">Date *</label>
                      <input
                        type="date"
                        value={newAppointment.date}
                        onChange={(e) => setNewAppointment({...newAppointment, date: e.target.value})}
                        className="form-input"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">Time *</label>
                      <input
                        type="time"
                        value={newAppointment.time}
                        onChange={(e) => setNewAppointment({...newAppointment, time: e.target.value})}
                        className="form-input"
                      />
                    </div>
                  </div>
                  
                  <div className="form-field">
                    <label className="form-label">Reason for Appointment *</label>
                    <textarea
                      value={newAppointment.reason}
                      onChange={(e) => setNewAppointment({...newAppointment, reason: e.target.value})}
                      className="form-textarea"
                      rows="3"
                      placeholder="Describe the purpose of this appointment..."
                    />
                  </div>
                </div>
              </div>
              
              <div className="modal-footer">
                <button
                  onClick={() => setShowAddAppointment(false)}
                  className="btn-secondary"
                >
                  Cancel
                </button>
                <button
                  onClick={handleAddAppointment}
                  disabled={loading}
                  className="btn-primary"
                >
                  {loading ? (
                    <>
                      <div className="loading-spinner-small"></div>
                      Adding...
                    </>
                  ) : (
                    <>
                      <CheckCircle />
                      Add Appointment
                    </>
                  )}
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-container pending">
                <AlertCircle className="stat-icon pending" />
              </div>
              <div>
                <p className="stat-number pending">{stats.pending}</p>
                <p className="stat-label pending">Pending</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-container confirmed">
                <CheckCircle className="stat-icon confirmed" />
              </div>
              <div>
                <p className="stat-number confirmed">{stats.confirmed}</p>
                <p className="stat-label confirmed">Confirmed</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-container completed">
                <CheckCircle className="stat-icon completed" />
              </div>
              <div>
                <p className="stat-number completed">{stats.completed}</p>
                <p className="stat-label completed">Completed</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-container total">
                <Calendar className="stat-icon total" />
              </div>
              <div>
                <p className="stat-number total">{stats.total}</p>
                <p className="stat-label total">Total</p>
              </div>
            </div>
          </div>
          <div className="stat-card">
            <div className="stat-card-content">
              <div className="stat-icon-container available">
                <Clock className="stat-icon available" />
              </div>
              <div>
                <p className="stat-number available">{stats.availableSlots}</p>
                <p className="stat-label available">Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="advisor-grid">
          {/* Main Content - Left Side (Appointments) */}
          <div className="appointments-section">
            {/* Appointments Header */}
            <div className="appointments-header">
              <div className="appointments-header-flex">
                <div className="appointments-header-left">
                  <Calendar className="appointments-icon" />
                  <div>
                    <h2 className="appointments-title">Appointment Requests</h2>
                    <p className="appointments-subtitle">Manage student consultation requests</p>
                  </div>
                </div>
                <div className="appointments-header-right">
                  <button
                    onClick={() => setShowAddAppointment(true)}
                    className="add-appointment-btn"
                  >
                    <Plus />
                    Add Appointment
                  </button>
                </div>
              </div>
            </div>

            {/* Tabs */}
            <div className="appointments-tabs">
              {[
                { id: 'pending', label: 'Pending', count: stats.pending },
                { id: 'confirmed', label: 'Confirmed', count: stats.confirmed },
                { id: 'all', label: 'All', count: stats.total }
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setSelectedTab(tab.id)}
                  className={`tab-button ${selectedTab === tab.id ? 'active' : ''}`}
                >
                  {tab.label}
                  {tab.count > 0 && (
                    <span className="tab-count">
                      {tab.count}
                    </span>
                  )}
                </button>
              ))}
            </div>

            {/* Appointments List */}
            <div className="appointments-content">
              {getFilteredAppointments().length > 0 ? (
                <div className="appointments-list">
                  {getFilteredAppointments().map((appointment) => (
                    <div key={appointment.id} className="appointment-item">
                      <div className="appointment-item-content">
                        <div className="appointment-info">
                          <div className="appointment-student-header">
                            <div className="student-avatar">
                              <User />
                            </div>
                            <div>
                              <h3 className="student-name">{appointment.studentName}</h3>
                              <p className="appointment-date-requested">Requested {new Date(appointment.createdAt).toLocaleDateString()}</p>
                            </div>
                            <div className={getStatusBadgeClass(appointment.status)}>
                              {getStatusIcon(appointment.status)}
                              {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                            </div>
                          </div>
                          
                          <div className="appointment-details-grid">
                            <div className="appointment-detail">
                              <Mail className="appointment-detail-icon" />
                              <span>{appointment.studentEmail}</span>
                            </div>
                            <div className="appointment-detail">
                              <Phone className="appointment-detail-icon" />
                              <span>{appointment.phone}</span>
                            </div>
                            <div className="appointment-detail">
                              <Calendar className="appointment-detail-icon" />
                              <span>{new Date(appointment.date).toLocaleDateString('en-US', {
                                weekday: 'long',
                                year: 'numeric',
                                month: 'long',
                                day: 'numeric'
                              })} at {appointment.time}</span>
                            </div>
                            <div className="appointment-detail">
                              {appointment.type === 'online' ? (
                                <Monitor className="appointment-detail-icon" style={{color: '#059669'}} />
                              ) : (
                                <MapPin className="appointment-detail-icon" style={{color: '#ea580c'}} />
                              )}
                              <span>{appointment.location}</span>
                            </div>
                          </div>
                          
                          <div className="appointment-reason-box">
                            <h4 className="appointment-reason-title">Reason for Appointment:</h4>
                            <p className="appointment-reason-text">{appointment.reason}</p>
                          </div>
                        </div>
                        
                        {appointment.status === 'pending' && (
                          <div className="appointment-actions">
                            <button
                              onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                              disabled={loading}
                              className="action-btn confirm"
                            >
                              <CheckCircle />
                              Confirm
                            </button>
                            <button
                              onClick={() => handleStatusUpdate(appointment.id, 'rejected')}
                              disabled={loading}
                              className="action-btn reject"
                            >
                              <XCircle />
                              Reject
                            </button>
                          </div>
                        )}
                        
                        {appointment.status === 'confirmed' && (
                          <div className="appointment-actions">
                            <button
                              onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                              disabled={loading}
                              className="action-btn complete"
                            >
                              <CheckCircle />
                              Mark Complete
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-appointments-advisor">
                  <Calendar className="no-appointments-icon-advisor" />
                  <h3 className="no-appointments-title-advisor">No {selectedTab} appointments</h3>
                  <p className="no-appointments-subtitle-advisor">Appointment requests will appear here when students book consultations.</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Sidebar - Availability Management */}
          <div className="availability-section">
            {/* Availability Header */}
            <div className="availability-header">
              <div className="availability-header-flex">
                <h3 className="availability-title">
                  <Clock />
                  My Availability
                </h3>
                <button
                  onClick={() => setShowAddSlot(true)}
                  className="add-slot-btn"
                >
                  <Plus />
                </button>
              </div>
            </div>

            <div className="availability-content">
              {/* Add Slot Form */}
              {showAddSlot && (
                <div className="add-slot-form">
                  <h4 className="add-slot-form-title">Add New Time Slot</h4>
                  <div className="add-slot-form-fields">
                    <div className="add-slot-field">
                      <label className="add-slot-label">Date</label>
                      <input
                        type="date"
                        value={newSlot.date}
                        onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                        className="add-slot-input"
                      />
                    </div>
                    <div className="add-slot-field">
                      <label className="add-slot-label">Time</label>
                      <input
                        type="time"
                        value={newSlot.time}
                        onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                        className="add-slot-input"
                      />
                    </div>
                    <div className="add-slot-field">
                      <label className="add-slot-label">Type</label>
                      <select
                        value={newSlot.type}
                        onChange={(e) => setNewSlot({...newSlot, type: e.target.value})}
                        className="add-slot-select"
                      >
                        <option value="both">Both Online & Physical</option>
                        <option value="online">Online Only</option>
                        <option value="physical">Physical Only</option>
                      </select>
                    </div>
                    <div className="add-slot-actions">
                      <button
                        onClick={handleAddSlot}
                        disabled={loading}
                        className="add-slot-submit"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddSlot(false)}
                        className="add-slot-cancel"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Available Slots List */}
              <div>
                <h4 className="slots-section-title">Available Time Slots</h4>
                {availableSlots.length > 0 ? (
                  <div className="slots-list">
                    {availableSlots.map((slot) => (
                      <div key={slot.id} className="slot-item">
                        <div className="slot-info">
                          <div className="slot-date-box">
                            <div className="slot-weekday">
                              {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className="slot-day">
                              {new Date(slot.date).getDate()}
                            </div>
                          </div>
                          <div className="slot-details">
                            <div className="slot-time">
                              <Clock className="slot-time-icon" />
                              <span className="slot-time-text">{slot.time}</span>
                            </div>
                            <div className="slot-type">
                              {slot.type === 'online' ? (
                                <Monitor className="slot-type-icon" />
                              ) : slot.type === 'physical' ? (
                                <MapPin className="slot-type-icon" />
                              ) : (
                                <div style={{display: 'flex', gap: '0.25rem'}}>
                                  <Monitor className="slot-type-icon" />
                                  <MapPin className="slot-type-icon" />
                                </div>
                              )}
                              <span>{slot.type === 'both' ? 'Both' : slot.type}</span>
                            </div>
                          </div>
                        </div>
                        <div className="slot-actions">
                          <span className={`slot-status-badge ${slot.available ? 'available' : 'booked'}`}>
                            {slot.available ? 'Available' : 'Booked'}
                          </span>
                          <button
                            onClick={() => handleDeleteSlot(slot.id)}
                            disabled={loading}
                            className="delete-slot-btn"
                          >
                            <Trash2 />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="no-slots-advisor">
                    <Clock className="no-slots-icon-advisor" />
                    <p className="no-slots-title-advisor">No available time slots</p>
                    <p className="no-slots-subtitle-advisor">Add your availability to allow students to book appointments</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Quick Actions Card */}
          <div className="quick-actions-card">
            <h4 className="quick-actions-title">Quick Actions</h4>
            <div className="quick-actions-list">
              <button className="quick-action-item">
                📧 Send email to all pending students
              </button>
              <button className="quick-action-item">
                📊 View appointment analytics
              </button>
              <button className="quick-action-item">
                ⚙️ Update availability preferences
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorAppointmentDashboard;