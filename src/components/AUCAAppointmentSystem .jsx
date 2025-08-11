import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Monitor, User, Mail, Phone, CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2 } from 'lucide-react';

const AUCAAppointmentSystem = () => {
  const [userType, setUserType] = useState('student'); // 'student' or 'advisor'
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [selectedSlot, setSelectedSlot] = useState(null);
  
  // Sample data
  const sampleAppointments = [
    {
      id: 1,
      studentName: 'John Mugisha',
      studentEmail: 'john.mugisha@student.auca.ac.rw',
      date: '2025-08-15',
      time: '10:00',
      type: 'online',
      location: 'Online - Tawk Chat',
      reason: 'Academic guidance for Computer Science program',
      status: 'pending'
    },
    {
      id: 2,
      studentName: 'Marie Uwimana',
      studentEmail: 'marie.uwimana@student.auca.ac.rw',
      date: '2025-08-16',
      time: '14:00',
      type: 'physical',
      location: 'Advisor Office, Masoro Campus',
      reason: 'Career counseling and internship opportunities',
      status: 'confirmed'
    },
    {
      id: 3,
      studentName: 'David Ntare',
      studentEmail: 'david.ntare@student.auca.ac.rw',
      date: '2025-08-17',
      time: '09:00',
      type: 'online',
      location: 'Online - Tawk Chat',
      reason: 'Course selection assistance',
      status: 'pending'
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
      time: '10:00',
      type: 'online',
      location: 'Online - Tawk Chat',
      available: false
    },
    {
      id: 3,
      date: '2025-08-16',
      time: '14:00',
      type: 'physical',
      location: 'Office 205, Masoro Campus',
      available: false
    },
    {
      id: 4,
      date: '2025-08-16',
      time: '15:00',
      type: 'both',
      location: 'Office 205, Masoro Campus / Online',
      available: true
    },
    {
      id: 5,
      date: '2025-08-17',
      time: '09:00',
      type: 'online',
      location: 'Online - Tawk Chat',
      available: false
    },
    {
      id: 6,
      date: '2025-08-17',
      time: '11:00',
      type: 'physical',
      location: 'Office 205, Masoro Campus',
      available: true
    }
  ];

  useEffect(() => {
    setAppointments(sampleAppointments);
    setAvailableSlots(sampleSlots);
  }, []);

  const StudentBookingForm = () => {
    const [formData, setFormData] = useState({
      studentName: '',
      studentEmail: '',
      phone: '',
      reason: '',
      preferredType: 'both'
    });

    const handleInputChange = (field, value) => {
      setFormData({
        ...formData,
        [field]: value
      });
    };

    const handleSlotSelect = (slot) => {
      setSelectedSlot(slot);
      setSelectedDate(slot.date);
      setSelectedTime(slot.time);
    };

    const handleSubmit = () => {
      if (!selectedSlot) {
        alert('Please select an available time slot');
        return;
      }

      if (!formData.studentName || !formData.studentEmail || !formData.reason) {
        alert('Please fill in all required fields');
        return;
      }

      const newAppointment = {
        id: appointments.length + 1,
        ...formData,
        date: selectedSlot.date,
        time: selectedSlot.time,
        type: formData.preferredType === 'both' ? selectedSlot.type : formData.preferredType,
        location: formData.preferredType === 'online' ? 'Online - Tawk Chat' : 
                 formData.preferredType === 'physical' ? 'Office 205, Masoro Campus' :
                 selectedSlot.location,
        status: 'pending'
      };

      setAppointments([...appointments, newAppointment]);
      
      // Update slot availability
      setAvailableSlots(availableSlots.map(slot => 
        slot.id === selectedSlot.id ? { ...slot, available: false } : slot
      ));

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
    };

    const getAvailableSlots = () => {
      return availableSlots.filter(slot => {
        if (!slot.available) return false;
        if (formData.preferredType === 'both') return true;
        return slot.type === formData.preferredType || slot.type === 'both';
      });
    };

    return (
      <div className="max-w-4xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8" />
              <div>
                <h1 className="text-2xl font-bold">Book Appointment with Academic Advisor</h1>
                <p className="text-blue-100">Schedule your consultation with AUCA academic advisors</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            <div className="space-y-6">
              {/* Personal Information */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <User className="h-5 w-5" />
                  Personal Information
                </h3>
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={formData.studentName}
                      onChange={(e) => handleInputChange('studentName', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="Enter your full name"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address *
                    </label>
                    <input
                      type="email"
                      value={formData.studentEmail}
                      onChange={(e) => handleInputChange('studentEmail', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="your.email@student.auca.ac.rw"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) => handleInputChange('phone', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                      placeholder="+250 XXX XXX XXX"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Preferred Meeting Type *
                    </label>
                    <select
                      value={formData.preferredType}
                      onChange={(e) => handleInputChange('preferredType', e.target.value)}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                    >
                      <option value="both">Either Online or Physical</option>
                      <option value="online">Online Only</option>
                      <option value="physical">Physical Only</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Reason for Appointment */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  Reason for Appointment *
                </h3>
                <textarea
                  value={formData.reason}
                  onChange={(e) => handleInputChange('reason', e.target.value)}
                  rows="4"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  placeholder="Please describe what you would like to discuss during the appointment..."
                />
              </div>

              {/* Available Time Slots */}
              <div className="bg-gray-50 rounded-xl p-6">
                <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                  <Clock className="h-5 w-5" />
                  Select Available Time Slot *
                </h3>
                <div className="grid gap-3">
                  {getAvailableSlots().map((slot) => (
                    <div
                      key={slot.id}
                      onClick={() => handleSlotSelect(slot)}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        selectedSlot?.id === slot.id
                          ? 'border-blue-500 bg-blue-50'
                          : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          <div className="text-center">
                            <div className="text-sm font-medium text-gray-600">
                              {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}
                            </div>
                            <div className="text-lg font-bold text-blue-600">
                              {new Date(slot.date).getDate()}
                            </div>
                            <div className="text-sm text-gray-600">
                              {new Date(slot.date).toLocaleDateString('en-US', { month: 'short' })}
                            </div>
                          </div>
                          <div>
                            <div className="flex items-center gap-2 text-gray-800">
                              <Clock className="h-4 w-4" />
                              <span className="font-medium">{slot.time}</span>
                            </div>
                            <div className="flex items-center gap-2 text-gray-600 mt-1">
                              {slot.type === 'online' ? (
                                <Monitor className="h-4 w-4" />
                              ) : slot.type === 'physical' ? (
                                <MapPin className="h-4 w-4" />
                              ) : (
                                <div className="flex gap-1">
                                  <Monitor className="h-4 w-4" />
                                  <MapPin className="h-4 w-4" />
                                </div>
                              )}
                              <span className="text-sm">{slot.location}</span>
                            </div>
                          </div>
                        </div>
                        <div className="text-green-500">
                          {selectedSlot?.id === slot.id && <CheckCircle className="h-5 w-5" />}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                {getAvailableSlots().length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <AlertCircle className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>No available slots for your preferred meeting type.</p>
                    <p className="text-sm">Try selecting "Either Online or Physical" for more options.</p>
                  </div>
                )}
              </div>

              {/* Submit Button */}
              <div className="flex justify-center">
                <button
                  onClick={handleSubmit}
                  disabled={!selectedSlot}
                  className="px-8 py-4 bg-blue-600 text-white rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
                >
                  <Calendar className="h-5 w-5" />
                  Book Appointment
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const AdvisorDashboard = () => {
    const [showAddSlot, setShowAddSlot] = useState(false);
    const [newSlot, setNewSlot] = useState({
      date: '',
      time: '',
      type: 'both',
      location: ''
    });

    const handleStatusUpdate = (appointmentId, newStatus) => {
      setAppointments(appointments.map(apt => 
        apt.id === appointmentId ? { ...apt, status: newStatus } : apt
      ));
    };

    const handleAddSlot = () => {
      if (!newSlot.date || !newSlot.time) {
        alert('Please fill in date and time');
        return;
      }

      const slot = {
        id: availableSlots.length + 1,
        ...newSlot,
        location: newSlot.location || (newSlot.type === 'online' ? 'Online - Tawk Chat' : 'Office 205, Masoro Campus'),
        available: true
      };
      setAvailableSlots([...availableSlots, slot]);
      setNewSlot({ date: '', time: '', type: 'both', location: '' });
      setShowAddSlot(false);
    };

    const handleDeleteSlot = (slotId) => {
      setAvailableSlots(availableSlots.filter(slot => slot.id !== slotId));
    };

    const getStatusColor = (status) => {
      switch (status) {
        case 'pending': return 'bg-yellow-100 text-yellow-800';
        case 'confirmed': return 'bg-green-100 text-green-800';
        case 'rejected': return 'bg-red-100 text-red-800';
        default: return 'bg-gray-100 text-gray-800';
      }
    };

    const getStatusIcon = (status) => {
      switch (status) {
        case 'pending': return <AlertCircle className="h-4 w-4" />;
        case 'confirmed': return <CheckCircle className="h-4 w-4" />;
        case 'rejected': return <XCircle className="h-4 w-4" />;
        default: return <AlertCircle className="h-4 w-4" />;
      }
    };

    return (
      <div className="max-w-6xl mx-auto p-6">
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <User className="h-8 w-8" />
                <div>
                  <h1 className="text-2xl font-bold">Advisor Dashboard</h1>
                  <p className="text-blue-100">Manage your appointments and availability</p>
                </div>
              </div>
              <div className="text-right">
                <p className="text-blue-100 text-sm">Dr. Sarah Mukamana</p>
                <p className="text-blue-200 text-xs">Academic Advisor</p>
              </div>
            </div>
          </div>

          <div className="p-6">
            {/* Stats */}
            <div className="grid md:grid-cols-3 gap-4 mb-6">
              <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <AlertCircle className="h-8 w-8 text-yellow-600" />
                  <div>
                    <p className="text-2xl font-bold text-yellow-800">
                      {appointments.filter(apt => apt.status === 'pending').length}
                    </p>
                    <p className="text-yellow-600 text-sm">Pending Appointments</p>
                  </div>
                </div>
              </div>
              <div className="bg-green-50 border border-green-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <CheckCircle className="h-8 w-8 text-green-600" />
                  <div>
                    <p className="text-2xl font-bold text-green-800">
                      {appointments.filter(apt => apt.status === 'confirmed').length}
                    </p>
                    <p className="text-green-600 text-sm">Confirmed Appointments</p>
                  </div>
                </div>
              </div>
              <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                <div className="flex items-center gap-3">
                  <Clock className="h-8 w-8 text-blue-600" />
                  <div>
                    <p className="text-2xl font-bold text-blue-800">
                      {availableSlots.filter(slot => slot.available).length}
                    </p>
                    <p className="text-blue-600 text-sm">Available Slots</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Appointment Requests */}
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Appointment Requests</h2>
              </div>
              <div className="space-y-4">
                {appointments.map((appointment) => (
                  <div key={appointment.id} className="border border-gray-200 rounded-lg p-4">
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h3 className="font-semibold text-gray-800">{appointment.studentName}</h3>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </span>
                        </div>
                        <div className="grid md:grid-cols-2 gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-2">
                            <Mail className="h-4 w-4" />
                            {appointment.studentEmail}
                          </div>
                          <div className="flex items-center gap-2">
                            <Calendar className="h-4 w-4" />
                            {new Date(appointment.date).toLocaleDateString()} at {appointment.time}
                          </div>
                          <div className="flex items-center gap-2">
                            {appointment.type === 'online' ? (
                              <Monitor className="h-4 w-4" />
                            ) : (
                              <MapPin className="h-4 w-4" />
                            )}
                            {appointment.location}
                          </div>
                        </div>
                        <p className="mt-3 text-gray-700">{appointment.reason}</p>
                      </div>
                      {appointment.status === 'pending' && (
                        <div className="flex gap-2 ml-4">
                          <button
                            onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm hover:bg-green-700 transition-colors"
                          >
                            Confirm
                          </button>
                          <button
                            onClick={() => handleStatusUpdate(appointment.id, 'rejected')}
                            className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm hover:bg-red-700 transition-colors"
                          >
                            Reject
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
                {appointments.length === 0 && (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-400" />
                    <p>No appointment requests yet.</p>
                  </div>
                )}
              </div>
            </div>

            {/* Manage Availability */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Manage Availability</h2>
                <button
                  onClick={() => setShowAddSlot(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700 transition-colors flex items-center gap-2"
                >
                  <Plus className="h-4 w-4" />
                  Add Time Slot
                </button>
              </div>

              {/* Add Slot Form */}
              {showAddSlot && (
                <div className="bg-gray-50 rounded-lg p-4 mb-4">
                  <div className="grid md:grid-cols-4 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                      <input
                        type="date"
                        value={newSlot.date}
                        onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                      <input
                        type="time"
                        value={newSlot.time}
                        onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                      <select
                        value={newSlot.type}
                        onChange={(e) => setNewSlot({...newSlot, type: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm"
                      >
                        <option value="both">Both Online & Physical</option>
                        <option value="online">Online Only</option>
                        <option value="physical">Physical Only</option>
                      </select>
                    </div>
                    <div className="flex gap-2">
                      <button
                        onClick={handleAddSlot}
                        className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm hover:bg-blue-700"
                      >
                        Add
                      </button>
                      <button
                        onClick={() => setShowAddSlot(false)}
                        className="px-4 py-2 bg-gray-600 text-white rounded-lg text-sm hover:bg-gray-700"
                      >
                        Cancel
                      </button>
                    </div>
                  </div>
                </div>
              )}

              {/* Available Slots */}
              <div className="grid gap-3">
                {availableSlots.map((slot) => (
                  <div key={slot.id} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div className="flex items-center gap-4">
                      <div className="text-center">
                        <div className="text-sm font-medium text-gray-600">
                          {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}
                        </div>
                        <div className="text-lg font-bold text-blue-600">
                          {new Date(slot.date).getDate()}
                        </div>
                        <div className="text-sm text-gray-600">
                          {new Date(slot.date).toLocaleDateString('en-US', { month: 'short' })}
                        </div>
                      </div>
                      <div>
                        <div className="flex items-center gap-2 text-gray-800">
                          <Clock className="h-4 w-4" />
                          <span className="font-medium">{slot.time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-gray-600 mt-1">
                          {slot.type === 'online' ? (
                            <Monitor className="h-4 w-4" />
                          ) : slot.type === 'physical' ? (
                            <MapPin className="h-4 w-4" />
                          ) : (
                            <div className="flex gap-1">
                              <Monitor className="h-4 w-4" />
                              <MapPin className="h-4 w-4" />
                            </div>
                          )}
                          <span className="text-sm">{slot.location || (slot.type === 'online' ? 'Online - Tawk Chat' : 'Office 205, Masoro Campus')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                        slot.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                      }`}>
                        {slot.available ? 'Available' : 'Booked'}
                      </span>
                      <button
                        onClick={() => handleDeleteSlot(slot.id)}
                        className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">AUCA Appointments</h1>
                <p className="text-sm text-gray-600">Adventist University of Central Africa</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => setUserType('student')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  userType === 'student'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Student View
              </button>
              <button
                onClick={() => setUserType('advisor')}
                className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                  userType === 'advisor'
                    ? 'bg-blue-600 text-white'
                    : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                Advisor View
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="py-6">
        {userType === 'student' ? <StudentBookingForm /> : <AdvisorDashboard />}
      </div>
    </div>
  );
};

export default AUCAAppointmentSystem;