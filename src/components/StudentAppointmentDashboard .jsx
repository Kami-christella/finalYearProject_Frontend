import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Monitor, User, Mail, Phone, CheckCircle, AlertCircle, Send } from 'lucide-react';

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
      case 'pending': return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'confirmed': return 'bg-green-100 text-green-800 border-green-300';
      case 'rejected': return 'bg-red-100 text-red-800 border-red-300';
      case 'completed': return 'bg-blue-100 text-blue-800 border-blue-300';
      default: return 'bg-gray-100 text-gray-800 border-gray-300';
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">A</span>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-800">AUCA Student Portal</h1>
              <p className="text-sm text-gray-600">Book Appointments with Academic Advisors</p>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid lg:grid-cols-3 gap-8">
          
          {/* Booking Form - Left Side */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Form Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center gap-3">
                  <Calendar className="h-8 w-8" />
                  <div>
                    <h2 className="text-2xl font-bold">Book New Appointment</h2>
                    <p className="text-blue-100">Schedule your consultation with AUCA academic advisors</p>
                  </div>
                </div>
              </div>

              <div className="p-6 space-y-6">
                {/* Personal Information */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <User className="h-5 w-5 text-blue-600" />
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
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
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                      >
                        <option value="both">Either Online or Physical</option>
                        <option value="online">Online Only (Tawk Chat)</option>
                        <option value="physical">Physical Only (On Campus)</option>
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
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-colors"
                    placeholder="Please describe what you would like to discuss during the appointment (e.g., course selection, career guidance, academic support, etc.)"
                  />
                </div>

                {/* Available Time Slots */}
                <div className="bg-gray-50 rounded-xl p-6">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4 flex items-center gap-2">
                    <Clock className="h-5 w-5 text-blue-600" />
                    Select Available Time Slot *
                  </h3>
                  <div className="space-y-3">
                    {getAvailableSlots().map((slot) => (
                      <div
                        key={slot.id}
                        onClick={() => handleSlotSelect(slot)}
                        className={`p-4 border-2 rounded-lg cursor-pointer transition-all hover:shadow-md ${
                          selectedSlot?.id === slot.id
                            ? 'border-blue-500 bg-blue-50 shadow-md'
                            : 'border-gray-200 hover:border-blue-300 hover:bg-blue-50'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <div className="text-center bg-white rounded-lg p-3 shadow-sm">
                              <div className="text-xs font-medium text-gray-600 uppercase">
                                {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                              <div className="text-xl font-bold text-blue-600">
                                {new Date(slot.date).getDate()}
                              </div>
                              <div className="text-xs text-gray-600">
                                {new Date(slot.date).toLocaleDateString('en-US', { month: 'short' })}
                              </div>
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center gap-2 text-gray-800 mb-1">
                                <Clock className="h-4 w-4 text-blue-600" />
                                <span className="font-semibold">{slot.time}</span>
                                <span className="text-sm text-gray-600">with {slot.advisorName}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                {slot.type === 'online' ? (
                                  <Monitor className="h-4 w-4 text-green-600" />
                                ) : slot.type === 'physical' ? (
                                  <MapPin className="h-4 w-4 text-orange-600" />
                                ) : (
                                  <div className="flex gap-1">
                                    <Monitor className="h-4 w-4 text-green-600" />
                                    <MapPin className="h-4 w-4 text-orange-600" />
                                  </div>
                                )}
                                <span className="text-sm">{slot.location}</span>
                              </div>
                            </div>
                          </div>
                          <div className="text-green-500">
                            {selectedSlot?.id === slot.id && <CheckCircle className="h-6 w-6" />}
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
                    disabled={!selectedSlot || loading}
                    className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 disabled:from-gray-400 disabled:to-gray-500 disabled:cursor-not-allowed transition-all flex items-center gap-3 shadow-lg hover:shadow-xl"
                  >
                    {loading ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
                        Booking...
                      </>
                    ) : (
                      <>
                        <Send className="h-5 w-5" />
                        Book Appointment
                      </>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* My Appointments - Right Side */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Appointments Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <Calendar className="h-6 w-6" />
                  My Appointments
                </h3>
              </div>

              <div className="p-6">
                {myAppointments.length > 0 ? (
                  <div className="space-y-4">
                    {myAppointments.map((appointment) => (
                      <div key={appointment.id} className={`border-2 rounded-lg p-4 ${getStatusColor(appointment.status)}`}>
                        <div className="flex items-start justify-between mb-3">
                          <div>
                            <div className="font-semibold text-sm text-gray-800">
                              {new Date(appointment.date).toLocaleDateString('en-US', { 
                                weekday: 'short', 
                                month: 'short', 
                                day: 'numeric' 
                              })} at {appointment.time}
                            </div>
                            <div className="text-xs text-gray-600">{appointment.advisorName}</div>
                          </div>
                          <div className={`px-2 py-1 rounded-full text-xs font-medium flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
                            {getStatusIcon(appointment.status)}
                            {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2 text-xs text-gray-600 mb-2">
                          {appointment.type === 'online' ? (
                            <Monitor className="h-3 w-3" />
                          ) : (
                            <MapPin className="h-3 w-3" />
                          )}
                          <span>{appointment.location}</span>
                        </div>
                        
                        <p className="text-xs text-gray-700 line-clamp-2">{appointment.reason}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8 text-gray-500">
                    <Calendar className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                    <p className="text-sm">No appointments yet</p>
                    <p className="text-xs">Your booked appointments will appear here</p>
                  </div>
                )}
              </div>
            </div>

            {/* Quick Info Card */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-3">Need Help?</h4>
              <div className="space-y-2 text-sm text-blue-700">
                <p>📞 Call: +250 788 123 456</p>
                <p>📧 Email: advisors@auca.ac.rw</p>
                <p>🏢 Office: Student Services, Masoro Campus</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAppointmentDashboard;