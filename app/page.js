'use client';
import { useState, useEffect } from 'react';
import ProfileCard from './components/ProfileCard';
import ProfileForm from './components/ProfileForm';

export default function Home() {
  const [profiles, setProfiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showForm, setShowForm] = useState(false);
  const [editingProfile, setEditingProfile] = useState(null);

  // Fetch profiles from API
  const fetchProfiles = async () => {
    try {
      const response = await fetch('/api/profiles');
      if (response.ok) {
        const data = await response.json();
        setProfiles(data);
      } else {
        console.error('Failed to fetch profiles');
      }
    } catch (error) {
      console.error('Error fetching profiles:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfiles();
  }, []);

  // Handle profile creation/update
  const handleProfileSubmit = async (profileData) => {
    try {
      const url = editingProfile 
        ? `/api/profiles/${editingProfile.id}` 
        : '/api/profiles';
      
      const method = editingProfile ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(profileData),
      });

      if (response.ok) {
        await fetchProfiles(); // Refresh the list
        setShowForm(false);
        setEditingProfile(null);
      } else {
        const error = await response.json();
        alert(error.error || 'Failed to save profile');
      }
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile');
    }
  };

  // Handle profile deletion
  const handleDeleteProfile = async (id) => {
    if (confirm('Are you sure you want to delete this profile?')) {
      try {
        const response = await fetch(`/api/profiles/${id}`, {
          method: 'DELETE',
        });

        if (response.ok) {
          await fetchProfiles(); // Refresh the list
        } else {
          alert('Failed to delete profile');
        }
      } catch (error) {
        console.error('Error deleting profile:', error);
        alert('Failed to delete profile');
      }
    }
  };

  // Handle profile editing
  const handleEditProfile = (profile) => {
    setEditingProfile(profile);
    setShowForm(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50 flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mb-4"></div>
          <div className="text-xl font-semibold text-gray-700">Loading profiles...</div>
          <div className="text-sm text-gray-500 mt-2">Please wait while we fetch your data</div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      {/* Background Decoration */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 bg-blue-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-purple-200 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-pulse"></div>
      </div>

      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Header */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl mb-6 shadow-lg">
             
            </div>
            <h1 className="text-5xl font-bold text-gray-900 mb-4 bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
              Profile Manager
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto leading-relaxed">
              Manage user profiles with PostgreSQL integration. Create, edit, and organize your team members effortlessly.
            </p>
            
            {/* Stats */}
            <div className="flex justify-center items-center gap-8 mb-8">
              <div className="text-center">
                <div className="text-3xl font-bold text-blue-600">{profiles.length}</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Total Profiles</div>
              </div>
              <div className="w-px h-12 bg-gray-300"></div>
              <div className="text-center">
                <div className="text-3xl font-bold text-purple-600">PostgreSQL</div>
                <div className="text-sm text-gray-500 uppercase tracking-wide">Database</div>
              </div>
            </div>

            <button
              onClick={() => {
                setEditingProfile(null);
                setShowForm(true);
              }}
              className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-4 rounded-2xl font-semibold text-lg shadow-xl hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-200 inline-flex items-center gap-3"
            >
              
              Add New Profile
            </button>
          </div>

          {/* Profile Form Modal */}
          {showForm && (
            <div className="fixed inset-0 bg-black bg-opacity-60 backdrop-blur-sm flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-3xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                <div className="sticky top-0 bg-white rounded-t-3xl border-b border-gray-100 px-8 py-6 flex justify-between items-center">
                  <h2 className="text-2xl font-bold text-gray-900">
                    {editingProfile ? 'Edit Profile' : 'Create New Profile'}
                  </h2>
                  <button
                    onClick={() => {
                      setShowForm(false);
                      setEditingProfile(null);
                    }}
                    className="w-10 h-10 rounded-full bg-gray-100 hover:bg-gray-200 flex items-center justify-center transition-colors"
                  >
                    
                  </button>
                </div>
                <div className="p-8">
                  <ProfileForm
                    profile={editingProfile}
                    onSubmit={handleProfileSubmit}
                    onCancel={() => {
                      setShowForm(false);
                      setEditingProfile(null);
                    }}
                  />
                </div>
              </div>
            </div>
          )}

          {/* Profiles Grid */}
          {profiles.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
              {profiles.map((profile, index) => (
                <div
                  key={profile.id}
                  className="animate-fadeIn"
                  style={{ animationDelay: `${index * 100}ms` }}
                >
                  <ProfileCard
                    profile={profile}
                    onEdit={handleEditProfile}
                    onDelete={handleDeleteProfile}
                  />
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <div className="inline-flex items-center justify-center w-24 h-24 bg-gray-100 rounded-full mb-6">
                
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-2">No profiles found</h3>
              <p className="text-gray-500 text-lg mb-8 max-w-md mx-auto">
                Get started by creating your first profile. It's quick and easy!
              </p>
              <button
                onClick={() => {
                  setEditingProfile(null);
                  setShowForm(true);
                }}
                className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-6 py-3 rounded-xl font-semibold shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-200"
              >
                Create First Profile
              </button>
            </div>
          )}
        </div>
      </div>

      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeIn {
          animation: fadeIn 0.6s ease-out forwards;
        }
      `}</style>
    </div>
  );
}