"use client";

import React, { useState } from 'react';
import { useAuthContext } from '@/context/AuthContext';
import { updateUser } from '@/services/user.service';
import { UpdateUserInput } from '@/types/api';

interface ProfileEditFormProps {
  onProfileUpdated: () => void;
}

const ProfileEditForm: React.FC<ProfileEditFormProps> = ({ onProfileUpdated }) => {
  const { user } = useAuthContext();
  const [isEditing, setIsEditing] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  const [formData, setFormData] = useState<UpdateUserInput>({
    username: user?.username || '',
    bio: user?.bio || '',
    profilePicUrl: user?.profilePicUrl || '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      setIsLoading(true);
      setError(null);
      
      const updatedUser = await updateUser(formData);
      
      if (updatedUser) {
        setIsEditing(false);
        onProfileUpdated();
      } else {
        setError('Failed to update profile');
      }
    } catch (err: any) {
      setError(err?.message || 'An error occurred');
    } finally {
      setIsLoading(false);
    }
  };

  if (!isEditing) {
    return (
      <div className="flex justify-end">
        <button
          onClick={() => setIsEditing(true)}
          className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-800 hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg"
        >
          Edit Profile
        </button>
      </div>
    );
  }

  return (
    <div className="border rounded-lg p-4 bg-white dark:bg-gray-800">
      <h2 className="text-lg font-semibold mb-4">Edit Profile</h2>
      
      <form onSubmit={handleSubmit}>
        <div className="space-y-4">
          {/* Username Field */}
          <div>
            <label htmlFor="username" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Username
            </label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              maxLength={50}
              className="w-full p-2 border dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          {/* Bio Field */}
          <div>
            <label htmlFor="bio" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Bio
            </label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              maxLength={160}
              rows={3}
              className="w-full p-2 border dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none dark:bg-gray-700 dark:text-white"
            />
          </div>
          
          {/* Profile Picture URL Field */}
          <div>
            <label htmlFor="profilePicUrl" className="block mb-1 text-sm font-medium text-gray-700 dark:text-gray-300">
              Profile Picture URL
            </label>
            <input
              type="url"
              id="profilePicUrl"
              name="profilePicUrl"
              value={formData.profilePicUrl}
              onChange={handleChange}
              className="w-full p-2 border dark:border-gray-700 rounded focus:ring-2 focus:ring-blue-500 focus:border-transparent dark:bg-gray-700 dark:text-white"
              placeholder="https://example.com/image.jpg"
            />
            {formData.profilePicUrl && (
              <div className="mt-2">
                <img 
                  src={formData.profilePicUrl} 
                  alt="Profile Preview" 
                  className="w-16 h-16 rounded-full object-cover"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = 'https://via.placeholder.com/150';
                  }}
                />
              </div>
            )}
          </div>
          
          {error && (
            <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
          )}
          
          <div className="flex justify-end space-x-3">
            <button
              type="button"
              onClick={() => setIsEditing(false)}
              className="px-4 py-2 text-sm font-medium text-gray-700 dark:text-gray-200 bg-gray-100 dark:bg-gray-700 hover:bg-gray-200 dark:hover:bg-gray-600 rounded-lg"
              disabled={isLoading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className={`px-4 py-2 text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 rounded-lg ${
                isLoading ? 'opacity-70 cursor-not-allowed' : ''
              }`}
              disabled={isLoading}
            >
              {isLoading ? 'Saving...' : 'Save Changes'}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default ProfileEditForm;
