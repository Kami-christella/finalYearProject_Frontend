import React, { useState, useEffect } from 'react';
import { Calendar, Clock, MapPin, Monitor, User, Mail, Phone, CheckCircle, XCircle, AlertCircle, Plus, Edit, Trash2, Bell, Settings, MoreHorizontal } from 'lucide-react';
//import '../components/styles/AdvisorAppointmentDashboard.css'; // Assuming you have a CSS file for styles
import './styles/AdvisorAppointmentDashboard.css';

const AdvisorAppointmentDashboard = () => {
  const [appointments, setAppointments] = useState([]);
  const [availableSlots, setAvailableSlots] = useState([]);
  const [showAddSlot, setShowAddSlot] = useState(false);
  const [selectedTab, setSelectedTab] = useState('pending'); // 'pending', 'confirmed', 'all'
  const [loading, setLoading] = useState(false);
  
  const [newSlot, setNewSlot] = useState({
    date: '',
    time: '',
    type: 'both',
    location: ''
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

  const handleDeleteSlot = async (slotId) => {
    if (!confirm('Are you sure you want to delete this time slot?')) return;
    
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
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-gradient-to-r from-blue-600 to-blue-700 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">A</span>
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-800">AUCA Advisor Portal</h1>
                <p className="text-sm text-gray-600">Manage Student Appointments</p>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <div className="relative">
                <Bell className="h-6 w-6 text-gray-600 cursor-pointer hover:text-blue-600" />
                {stats.pending > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center">
                    {stats.pending}
                  </span>
                )}
              </div>
              <div className="flex items-center gap-3 pl-4 border-l border-gray-200">
                <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">SM</span>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium text-gray-800">Dr. Sarah Mukamana</p>
                  <p className="text-xs text-gray-600">Academic Advisor</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Stats Cards */}
        <div className="grid md:grid-cols-5 gap-4 mb-8">
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-yellow-100 rounded-lg flex items-center justify-center">
                <AlertCircle className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-yellow-800">{stats.pending}</p>
                <p className="text-yellow-600 text-sm font-medium">Pending</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-green-800">{stats.confirmed}</p>
                <p className="text-green-600 text-sm font-medium">Confirmed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                <CheckCircle className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-blue-800">{stats.completed}</p>
                <p className="text-blue-600 text-sm font-medium">Completed</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-gray-100 rounded-lg flex items-center justify-center">
                <Calendar className="h-6 w-6 text-gray-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-gray-800">{stats.total}</p>
                <p className="text-gray-600 text-sm font-medium">Total</p>
              </div>
            </div>
          </div>
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <p className="text-2xl font-bold text-purple-800">{stats.availableSlots}</p>
                <p className="text-purple-600 text-sm font-medium">Available</p>
              </div>
            </div>
          </div>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Content - Left Side (Appointments) */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Appointments Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Calendar className="h-8 w-8" />
                    <div>
                      <h2 className="text-2xl font-bold">Appointment Requests</h2>
                      <p className="text-blue-100">Manage student consultation requests</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Tabs */}
              <div className="border-b border-gray-200">
                <div className="flex">
                  {[
                    { id: 'pending', label: 'Pending', count: stats.pending },
                    { id: 'confirmed', label: 'Confirmed', count: stats.confirmed },
                    { id: 'all', label: 'All', count: stats.total }
                  ].map((tab) => (
                    <button
                      key={tab.id}
                      onClick={() => setSelectedTab(tab.id)}
                      className={`px-6 py-4 text-sm font-medium border-b-2 transition-colors ${
                        selectedTab === tab.id
                          ? 'border-blue-500 text-blue-600 bg-blue-50'
                          : 'border-transparent text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                      }`}
                    >
                      {tab.label}
                      {tab.count > 0 && (
                        <span className={`ml-2 px-2 py-1 text-xs rounded-full ${
                          selectedTab === tab.id
                            ? 'bg-blue-100 text-blue-600'
                            : 'bg-gray-100 text-gray-600'
                        }`}>
                          {tab.count}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              </div>

              {/* Appointments List */}
              <div className="p-6">
                {getFilteredAppointments().length > 0 ? (
                  <div className="space-y-4">
                    {getFilteredAppointments().map((appointment) => (
                      <div key={appointment.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow">
                        <div className="flex items-start justify-between">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                <User className="h-5 w-5 text-blue-600" />
                              </div>
                              <div>
                                <h3 className="font-semibold text-gray-800 text-lg">{appointment.studentName}</h3>
                                <p className="text-sm text-gray-600">Requested {new Date(appointment.createdAt).toLocaleDateString()}</p>
                              </div>
                              <div className={`px-3 py-1 rounded-full text-xs font-medium border flex items-center gap-1 ${getStatusColor(appointment.status)}`}>
                                {getStatusIcon(appointment.status)}
                                {appointment.status.charAt(0).toUpperCase() + appointment.status.slice(1)}
                              </div>
                            </div>
                            
                            <div className="grid md:grid-cols-2 gap-4 mb-4 text-sm">
                              <div className="flex items-center gap-2 text-gray-600">
                                <Mail className="h-4 w-4" />
                                <span>{appointment.studentEmail}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Phone className="h-4 w-4" />
                                <span>{appointment.phone}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                <Calendar className="h-4 w-4" />
                                <span>{new Date(appointment.date).toLocaleDateString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric'
                                })} at {appointment.time}</span>
                              </div>
                              <div className="flex items-center gap-2 text-gray-600">
                                {appointment.type === 'online' ? (
                                  <Monitor className="h-4 w-4 text-green-600" />
                                ) : (
                                  <MapPin className="h-4 w-4 text-orange-600" />
                                )}
                                <span>{appointment.location}</span>
                              </div>
                            </div>
                            
                            <div className="bg-gray-50 rounded-lg p-4 mb-4">
                              <h4 className="font-medium text-gray-800 mb-2">Reason for Appointment:</h4>
                              <p className="text-gray-700 leading-relaxed">{appointment.reason}</p>
                            </div>
                          </div>
                          
                          {appointment.status === 'pending' && (
                            <div className="flex flex-col gap-2 ml-6">
                              <button
                                onClick={() => handleStatusUpdate(appointment.id, 'confirmed')}
                                disabled={loading}
                                className="px-4 py-2 bg-green-600 text-white rounded-lg text-sm font-medium hover:bg-green-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                              >
                                <CheckCircle className="h-4 w-4" />
                                Confirm
                              </button>
                              <button
                                onClick={() => handleStatusUpdate(appointment.id, 'rejected')}
                                disabled={loading}
                                className="px-4 py-2 bg-red-600 text-white rounded-lg text-sm font-medium hover:bg-red-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                              >
                                <XCircle className="h-4 w-4" />
                                Reject
                              </button>
                            </div>
                          )}
                          
                          {appointment.status === 'confirmed' && (
                            <div className="flex flex-col gap-2 ml-6">
                              <button
                                onClick={() => handleStatusUpdate(appointment.id, 'completed')}
                                disabled={loading}
                                className="px-4 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors flex items-center gap-2 disabled:opacity-50"
                              >
                                <CheckCircle className="h-4 w-4" />
                                Mark Complete
                              </button>
                            </div>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 text-gray-500">
                    <Calendar className="h-16 w-16 mx-auto mb-4 text-gray-300" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">No {selectedTab} appointments</h3>
                    <p>Appointment requests will appear here when students book consultations.</p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Sidebar - Availability Management */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
              {/* Availability Header */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-xl font-bold flex items-center gap-2">
                      <Clock className="h-6 w-6" />
                      My Availability
                    </h3>
                  </div>
                  <button
                    onClick={() => setShowAddSlot(true)}
                    className="bg-white bg-opacity-20 hover:bg-opacity-30 p-2 rounded-lg transition-colors"
                  >
                    <Plus className="h-5 w-5" />
                  </button>
                </div>
              </div>

              <div className="p-6">
                {/* Add Slot Form */}
                {showAddSlot && (
                  <div className="bg-gray-50 rounded-lg p-4 mb-6">
                    <h4 className="font-semibold text-gray-800 mb-4">Add New Time Slot</h4>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
                        <input
                          type="date"
                          value={newSlot.date}
                          onChange={(e) => setNewSlot({...newSlot, date: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Time</label>
                        <input
                          type="time"
                          value={newSlot.time}
                          onChange={(e) => setNewSlot({...newSlot, time: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                        <select
                          value={newSlot.type}
                          onChange={(e) => setNewSlot({...newSlot, type: e.target.value})}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg text-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                          <option value="both">Both Online & Physical</option>
                          <option value="online">Online Only</option>
                          <option value="physical">Physical Only</option>
                        </select>
                      </div>
                      <div className="flex gap-2 pt-2">
                        <button
                          onClick={handleAddSlot}
                          disabled={loading}
                          className="flex-1 px-3 py-2 bg-blue-600 text-white rounded-lg text-sm font-medium hover:bg-blue-700 transition-colors disabled:opacity-50"
                        >
                          Add
                        </button>
                        <button
                          onClick={() => setShowAddSlot(false)}
                          className="flex-1 px-3 py-2 bg-gray-600 text-white rounded-lg text-sm font-medium hover:bg-gray-700 transition-colors"
                        >
                          Cancel
                        </button>
                      </div>
                    </div>
                  </div>
                )}

                {/* Available Slots List */}
                <div className="space-y-3">
                  <h4 className="font-semibold text-gray-800">Available Time Slots</h4>
                  {availableSlots.length > 0 ? (
                    <div className="space-y-2">
                      {availableSlots.map((slot) => (
                        <div key={slot.id} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className="text-center">
                              <div className="text-xs font-medium text-gray-600">
                                {new Date(slot.date).toLocaleDateString('en-US', { weekday: 'short' })}
                              </div>
                              <div className="text-sm font-bold text-blue-600">
                                {new Date(slot.date).getDate()}
                              </div>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 text-sm text-gray-800">
                                <Clock className="h-3 w-3" />
                                <span className="font-medium">{slot.time}</span>
                              </div>
                              <div className="flex items-center gap-1 text-xs text-gray-600">
                                {slot.type === 'online' ? (
                                  <Monitor className="h-3 w-3" />
                                ) : slot.type === 'physical' ? (
                                  <MapPin className="h-3 w-3" />
                                ) : (
                                  <div className="flex gap-1">
                                    <Monitor className="h-3 w-3" />
                                    <MapPin className="h-3 w-3" />
                                  </div>
                                )}
                                <span className="truncate">{slot.type === 'both' ? 'Both' : slot.type}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2">
                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                              slot.available ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                            }`}>
                              {slot.available ? 'Available' : 'Booked'}
                            </span>
                            <button
                              onClick={() => handleDeleteSlot(slot.id)}
                              disabled={loading}
                              className="p-1 text-red-600 hover:bg-red-50 rounded disabled:opacity-50"
                            >
                              <Trash2 className="h-3 w-3" />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="text-center py-8 text-gray-500">
                      <Clock className="h-12 w-12 mx-auto mb-3 text-gray-300" />
                      <p className="text-sm">No available time slots</p>
                      <p className="text-xs">Add your availability to allow students to book appointments</p>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Quick Actions Card */}
            <div className="mt-6 bg-gradient-to-r from-blue-50 to-blue-100 rounded-2xl p-6 border border-blue-200">
              <h4 className="font-semibold text-blue-800 mb-4">Quick Actions</h4>
              <div className="space-y-3">
                <button className="w-full text-left p-3 bg-white rounded-lg text-sm text-blue-700 hover:bg-blue-50 transition-colors">
                  📧 Send email to all pending students
                </button>
                <button className="w-full text-left p-3 bg-white rounded-lg text-sm text-blue-700 hover:bg-blue-50 transition-colors">
                  📊 View appointment analytics
                </button>
                <button className="w-full text-left p-3 bg-white rounded-lg text-sm text-blue-700 hover:bg-blue-50 transition-colors">
                  ⚙️ Update availability preferences
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdvisorAppointmentDashboard;