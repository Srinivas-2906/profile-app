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
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-xl">Loading profiles...</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">Profile Manager</h1>
          <p className="text-gray-600 mb-6">Manage user profiles with PostgreSQL integration</p>
          <button
            onClick={() => {
              setEditingProfile(null);
              setShowForm(true);
            }}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg font-medium"
          >
            Add New Profile
          </button>
        </div>

        {/* Profile Form Modal */}
        {showForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-full max-w-md mx-4">
              <h2 className="text-xl font-bold mb-4">
                {editingProfile ? 'Edit Profile' : 'Add New Profile'}
              </h2>
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
        )}

        {/* Profiles Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {profiles.map((profile) => (
            <ProfileCard
              key={profile.id}
              profile={profile}
              onEdit={handleEditProfile}
              onDelete={handleDeleteProfile}
            />
          ))}
        </div>

        {profiles.length === 0 && (
          <div className="text-center py-12">
            <p className="text-gray-500 text-lg">No profiles found. Add your first profile!</p>
          </div>
        )}
      </div>
    </div>
  );
}