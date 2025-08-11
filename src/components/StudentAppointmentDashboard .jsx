import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Monitor, User, Mail, Phone, CheckCircle, AlertCircle, Send } from 'lucide-react';
import './styles/StudentAppointmentDashboard.css';

const StudentAppointmentDashboard = () => {
  const [availableSlots, setAvailableSlots] = useState([]);
  const [myAppointments, setMyAppointments] = useState([]);
  const [selectedSlot, setSelectedSlot] = useState(null);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    studentName: '',
    studentEmail: '',
    phone: '',
    reason: '',
    preferredType: 'both'
  });

  // Sample data - this will be replaced with API calls
  const sampleSlots = [
    {
      id: 1,
      date: '2025-08-15',
      time: '09:00',
      type: 'both',
      location: 'Office 205, Masoro Campus / Online',
      advisorName: 'Dr. Sarah Mukamana',
      available: true
    },
    {
      id: 2,
      date: '2025-08-15',
      time: '11:00',
      type: 'online',
      location: 'Online - Tawk Chat',
      advisorName: 'Dr. Sarah Mukamana',
      available: true
    },
    {
      id: 3,
      date: '2025-08-16',
      time: '14:00',
      type: 'physical',
      location: 'Office 205, Masoro Campus',
      advisorName: 'Dr. Sarah Mukamana',
      available: true
    },
    {
      id: 4,
      date: '2025-08-16',
      time: '15:00',
      type: 'both',
      location: 'Office 205, Masoro Campus / Online',
      advisorName: 'Prof. John Uwimana',
      available: true
    },
    {
      id: 5,
      date: '2025-08-17',
      time: '10:00',
      type: 'online',
      location: 'Online - Tawk Chat',
      advisorName: 'Dr. Marie Uwimana',
      available: true
    }
  ];

  const sampleMyAppointments = [
    {
      id: 1,
      date: '2025-08-14',
      time: '10:00',
      type: 'online',
      location: 'Online - Tawk Chat',
      advisorName: 'Dr. Sarah Mukamana',
      reason: 'Course selection guidance',
      status: 'confirmed'
    },
    {
      id: 2,
      date: '2025-08-13',
      time: '14:00',
      type: 'physical',
      location: 'Office 205, Masoro Campus',
      advisorName: 'Prof. John Uwimana',
      reason: 'Career counseling',
      status: 'pending'
    }
  ];

  useEffect(() => {
    // TODO: Replace with actual API calls
    setAvailableSlots(sampleSlots);
    setMyAppointments(sampleMyAppointments);
  }, []);

  const handleInputChange = (field, value) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  const handleSlotSelect = (slot) => {
    setSelectedSlot(slot);
  };

  const handleSubmit = async () => {
    if (!selectedSlot) {
      alert('Please select an available time slot');
      return;
    }

    if (!formData.studentName || !formData.studentEmail || !formData.reason) {
      alert('Please fill in all required fields');
      return;
    }

    setLoading(true);

    // TODO: Replace with actual API call
    try {
      const newAppointment = {
        id: Date.now(), // Temporary ID
        ...formData,
        date: selectedSlot.date,
        time: selectedSlot.time,
        type: formData.preferredType === 'both' ? selectedSlot.type : formData.preferredType,
        location: formData.preferredType === 'online' ? 'Online - Tawk Chat' : 
                 formData.preferredType === 'physical' ? selectedSlot.location.split(' / ')[0] :
                 selectedSlot.location,
        advisorName: selectedSlot.advisorName,
        status: 'pending'
      };

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      setMyAppointments([newAppointment, ...myAppointments]);
      setAvailableSlots(availableSlots.filter(slot => slot.id !== selectedSlot.id));

      // Reset form
      setFormData({
        studentName: '',
        studentEmail: '',
        phone: '',
        reason: '',
        preferredType: 'both'
      });
      setSelectedSlot(null);
      
      alert('Appointment booked successfully! You will receive a confirmation email.');
    } catch (error) {
      alert('Failed to book appointment. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const getAvailableSlots = () => {
    return availableSlots.filter(slot => {
      if (formData.preferredType === 'both') return true;
      return slot.type === formData.preferredType || slot.type === 'both';
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending': return 'appointment-card pending';
      case 'confirmed': return 'appointment-card confirmed';
      case 'rejected': return 'appointment-card rejected';
      case 'completed': return 'appointment-card completed';
      default: return 'appointment-card';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'pending': return <AlertCircle className="h-4 w-4" />;
      case 'confirmed': return <CheckCircle className="h-4 w-4" />;
      case 'rejected': return <AlertCircle className="h-4 w-4" />;
      case 'completed': return <CheckCircle className="h-4 w-4" />;
      default: return <AlertCircle className="h-4 w-4" />;
    }
  };

  return (
    <div className="student-dashboard">
      {/* Header */}
      <header className="student-header">
        <div className="student-header-content">
          <div className="student-header-flex">
            <div className="student-logo">
              <span>A</span>
            </div>
            <div>
              <h1 className="student-header-title">AUCA Student Portal</h1>
              <p className="student-header-subtitle">Book Appointments with Academic Advisors</p>
            </div>
          </div>
        </div>
      </header>

      <div className="student-main">
        <div className="student-grid">
          
          {/* Booking Form - Left Side */}
          <div className="booking-form-card">
            {/* Form Header */}
            <div className="booking-form-header">
              <div className="booking-form-header-flex">
                <Calendar className="booking-form-icon" />
                <div>
                  <h2 className="booking-form-title">Book New Appointment</h2>
                  <p className="booking-form-subtitle">Schedule your consultation with AUCA academic advisors</p>
                </div>
              </div>
            </div>

            <div className="booking-form-content">
              <div className="booking-form-sections">
                {/* Personal Information */}
                <div className="form-section">
                  <h3 className="form-section-title">
                    <User className="form-section-icon" />
                    Personal Information
                  </h3>
                  <div className="form-grid">
                    <div className="form-field">
                      <label className="form-label">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={formData.studentName}
                        onChange={(e) => handleInputChange('studentName', e.target.value)}
                        className="form-input"
                        placeholder="Enter your full name"
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        value={formData.studentEmail}
                        onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                        className="form-input"
                        placeholder="your.email@student.auca.ac.rw"
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => handleInputChange('phone', e.target.value)}
                        className="form-input"
                        placeholder="+250 XXX XXX XXX"
                      />
                    </div>
                    <div className="form-field">
                      <label className="form-label">
                        Preferred Meeting Type *
                      </label>
                      <select
                        value={formData.preferredType}
                        onChange={(e) => handleInputChange('preferredType', e.target.value)}
                        className="form-select"
                      >
                        <option value="both">Either Online or Physical</option>
                        <option value="online">Online Only (Tawk Chat)</option>
                        <option value="physical">Physical Only (On Campus)</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* Reason for Appointment */}
                <div className="form-section">
                  <h3 className="form-section-title">
                    Reason for Appointment *
                  </h3>
                  <textarea
                    value={formData.reason}
                    onChange={(e) => handleInputChange('reason', e.target.value)}
                    rows="4"
                    className="form-textarea"
                    placeholder="Please describe what you would like to discuss during the appointment (e.g., course selection, career guidance, academic support, etc.)"
                  />
                </div>

                {/* Available Time Slots */}
                <div className="form-section">
                  <h3 className="form-section-title">
                    <Clock className="form-section-icon" />
                    Select Available Time Slot *
                  </h3>
                  <div className="time-slots-container">
                    {getAvailableSlots().map((slot) => (
                      <div
                        key={slot.id}
                        onClick={() => handleSlotSelect(slot)}
                        className={`time-slot ${selectedSlot?.id === slot.id ? 'selected' : ''}`}
                      >
                        <div className="time-slot-content">
                          <div className="time-slot-info">
                            <div className="time-slot-date">
                              <div className="time-slot-weekday">
                                {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                              <div className="time-slot-day">
                                {new Date(slot.date).getDate()}
                              </div>
                              <div className="time-slot-month">
                                {new Date(slot.date).toLocaleDateString('en-US', { month: 'short' })}
                              </div>
                            </div>
                            <div className="time-slot-details">
                              <div className="time-slot-time">
                                <Clock className="time-slot-time-icon" />
                                <span className="time-slot-time-text">{slot.time}</span>
                                <span className="time-slot-advisor">with {slot.advisorName}</span>
                              </div>
                              <div className="time-slot-location">
                                {slot.type === 'online' ? (
                                  <Monitor className="h-4 w-4 text-green-600" />
                                ) : slot.type === 'physical' ? (
                                  <MapPin className="h-4 w-4 text-orange-600" />
                                ) : (
                                  <div style={{display: 'flex', gap: '0.25rem'}}>
                                    <Monitor className="h-4 w-4 text-green-600" />
                                    <MapPin className="h-4 w-4 text-orange-600" />
                                  </div>
                                )}
                                <span>{slot.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="time-slot-check">
                            {selectedSlot?.id === slot.id && <CheckCircle />}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  {getAvailableSlots().length === 0 && (
                    <div className="no-slots">
                      <AlertCircle className="no-slots-icon" />
                      <p>No available slots for your preferred meeting type.</p>
                      <p>Try selecting "Either Online or Physical" for more options.</p>
                    </div>
                  )}
                </div>

                {/* Submit Button */}
                <div className="submit-container">
                  <button
                    onClick={handleSubmit}
                    disabled={!selectedSlot || loading}
                    className="submit-button"
                  >
                    {loading ? (
                      <>
                        <div className="loading-spinner"></div>
                        Booking...
                      </>
                    ) : (
                      <>
                        <Send className="submit-button-icon" />
                        Book Appointment
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* My Appointments - Right Side */}
          <div className="appointments-sidebar">
            {/* Appointments Header */}
            <div className="appointments-header">
              <h3 className="appointments-title">
                <Calendar />
                My Appointments
              </h3>
            </div>

            <div className="appointments-content">
              {myAppointments.length > 0 ? (
                <div className="appointments-list">
                  {myAppointments.map((appointment) => (
                    <div key={appointment.id} className={getStatusColor(appointment.status)}>
                      <div className="appointment-header">
                        <div>
                          <div className="appointment-date">
                            {new Date(appointment.date).toLocaleDateString('en-US', { 
                              weekday: 'short', 
                              month: 'short', 
                              day: 'numeric' 
                            })} at {appointment.time}
                          </div>
                          <div className="appointment-advisor">{appointment.advisorName}</div>
                        </div>
                        <div className="appointment-status">
                          {getStatusIcon(appointment.status)}
                          {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                        </div>
                      </div>
                      
                      <div className="appointment-location">
                        {appointment.type === 'online' ? (
                          <Monitor className="h-3 w-3" />
                        ) : (
                          <MapPin className="h-3 w-3" />
                        )}
                        <span>{appointment.location}</span>
                      </div>
                      
                      <p className="appointment-reason">{appointment.reason}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="no-appointments">
                  <Calendar className="no-appointments-icon" />
                  <p className="no-appointments-title">No appointments yet</p>
                  <p className="no-appointments-subtitle">Your booked appointments will appear here</p>
                </div>
              )}
            </div>
          </div>

          {/* Quick Info Card */}
          <div className="help-card">
            <h4 className="help-title">Need Help?</h4>
            <div className="help-content">
              <p className="help-item">📞 Call: +250 788 123 456</p>
              <p className="help-item">📧 Email: advisors@auca.ac.rw</p>
              <p className="help-item">🏢 Office: Student Services, Masoro Campus</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAppointmentDashboard;