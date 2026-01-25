// ============================================
// SETTINGS PAGE COMPONENT
// ============================================
// Settings page for user profile management
// - Change profile picture (upload or use Auth0 picture)
// - Update name and email
// - Account preferences
// ============================================

import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Settings as SettingsIcon, User, Mail, Camera, Upload, X, Save } from 'lucide-react';
import Navbar from '../components/Navbar';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:3000/api';

export default function Settings() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [profilePicture, setProfilePicture] = useState(null);
  const [previewPicture, setPreviewPicture] = useState(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [isSaving, setIsSaving] = useState(false);

  useEffect(() => {
    // Check if user is authenticated
    const checkAuth = async () => {
      try {
        const response = await fetch(`${API_URL}/auth/user`, {
          credentials: 'include'
        });
        const data = await response.json();
        if (data.authenticated && data.user) {
          setUser(data.user);
          setName(data.user.name || '');
          setEmail(data.user.email || '');
          setProfilePicture(data.user.picture || null);
          setPreviewPicture(data.user.picture || null);
        } else {
          navigate('/login');
        }
      } catch (error) {
        console.error('Auth check failed:', error);
        navigate('/login');
      } finally {
        setIsLoading(false);
      }
    };
    checkAuth();
  }, [navigate]);

  const handlePictureChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith('image/')) {
        alert('Please select an image file');
        return;
      }
      
      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        alert('Image size must be less than 5MB');
        return;
      }

      // Create preview
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviewPicture(reader.result);
      };
      reader.readAsDataURL(file);
      setProfilePicture(file);
    }
  };

  const handleRemovePicture = () => {
    setProfilePicture(null);
    setPreviewPicture(user?.picture || null); // Reset to Auth0 picture
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // TODO: Implement backend endpoint for updating profile
      // For now, we'll just update the local state
      // In a real app, you'd upload the picture and save to backend
      
      const formData = new FormData();
      if (profilePicture && profilePicture instanceof File) {
        formData.append('picture', profilePicture);
      }
      formData.append('name', name);
      formData.append('email', email);

      // Simulate save (replace with actual API call)
      await new Promise(resolve => setTimeout(resolve, 500));
      
      // Update user state
      setUser({
        ...user,
        name: name,
        email: email,
        picture: previewPicture || user.picture
      });

      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Failed to save profile:', error);
      alert('Failed to save profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return (
      <div className="page-bg">
        <Navbar />
        <div className="page-container">
          <div className="content-center">
            <p className="text-gray-400">Loading...</p>
          </div>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="page-bg">
      <Navbar />
      
      <div className="page-container">
        <div className="max-w-4xl mx-auto py-8">
          {/* Header */}
          <div className="mb-8">
            <h1 className="title-page flex items-center gap-3">
              <SettingsIcon className="w-8 h-8 text-lime-400" />
              Settings
            </h1>
            <p className="text-gray-400 mt-2">Manage your account settings and preferences</p>
          </div>

          {/* Profile Picture Section */}
          <div className="card mb-6">
            <h2 className="font-semibold text-xl text-gray-200 mb-6 flex items-center gap-2">
              <Camera className="w-5 h-5 text-lime-400" />
              Profile Picture
            </h2>
            
            <div className="flex flex-col md:flex-row items-start md:items-center gap-6">
              {/* Current Picture */}
              <div className="relative">
                {previewPicture ? (
                  <img 
                    src={previewPicture} 
                    alt="Profile" 
                    className="w-32 h-32 rounded-full border-4 border-lime-400/50 object-cover shadow-xl"
                  />
                ) : (
                  <div className="w-32 h-32 rounded-full bg-lime-400/20 flex items-center justify-center text-lime-400 font-bold text-4xl border-4 border-lime-400/50 shadow-xl">
                    {(name || email || 'U')[0].toUpperCase()}
                  </div>
                )}
                {/* Online indicator */}
                <div className="absolute bottom-2 right-2 w-4 h-4 bg-lime-400 rounded-full border-4 border-gray-900"></div>
              </div>

              {/* Upload Controls */}
              <div className="flex-1 space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">
                    Change Profile Picture
                  </label>
                  <div className="flex gap-3">
                    <label className="btn-primary cursor-pointer flex items-center gap-2">
                      <Upload className="w-4 h-4" />
                      Upload Photo
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handlePictureChange}
                        className="hidden"
                      />
                    </label>
                    {previewPicture && previewPicture !== user.picture && (
                      <button
                        onClick={handleRemovePicture}
                        className="btn-secondary flex items-center gap-2"
                      >
                        <X className="w-4 h-4" />
                        Remove
                      </button>
                    )}
                  </div>
                  <p className="text-xs text-gray-500 mt-2">
                    JPG, PNG or GIF. Max size 5MB.
                  </p>
                </div>

                {/* Auth0 Picture Info */}
                {user.picture && (
                  <div className="p-3 bg-gray-800/50 rounded-lg border border-gray-700">
                    <p className="text-xs text-gray-400">
                      Current picture from {user.picture.includes('googleusercontent') ? 'Google' : 'Auth0'}
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Profile Information */}
          <div className="card mb-6">
            <h2 className="font-semibold text-xl text-gray-200 mb-6 flex items-center gap-2">
              <User className="w-5 h-5 text-lime-400" />
              Profile Information
            </h2>
            
            <div className="space-y-4">
              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2">
                  Full Name
                </label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 bg-gray-800 border border-gray-700 rounded-lg text-gray-200 focus:outline-none focus:border-lime-400 focus:ring-2 focus:ring-lime-400/20"
                  placeholder="Enter your name"
                />
              </div>

              {/* Email */}
              <div>
                <label className="block text-sm font-medium text-gray-300 mb-2 flex items-center gap-2">
                  <Mail className="w-4 h-4" />
                  Email Address
                </label>
                <input
                  type="email"
                  value={email}
                  disabled
                  className="w-full px-4 py-3 bg-gray-800/50 border border-gray-700 rounded-lg text-gray-400 cursor-not-allowed"
                  placeholder="Email (from Auth0)"
                />
                <p className="text-xs text-gray-500 mt-1">
                  Email is managed by Auth0 and cannot be changed here
                </p>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end gap-4">
            <Link to="/dashboard" className="btn-secondary">
              Cancel
            </Link>
            <button
              onClick={handleSave}
              disabled={isSaving}
              className="btn-primary flex items-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <Save className="w-4 h-4" />
              {isSaving ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
