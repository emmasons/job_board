"use client";
import React, { useState } from 'react';
import { Pencil, X } from 'lucide-react';
import { Icon } from '@iconify/react';

interface ProfileHeaderProps {
  user: {
    id: string;
    firstName: string;
    lastName: string;
    city: string;
    email: string;
    phoneNumber: string;
    role: string;
  };
}

const ProfileHeader: React.FC<ProfileHeaderProps> = ({ user }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    fullName: `${user.firstName} ${user.lastName}`,
    city: user.city,
    email: user.email,
    phoneNumber: user.phoneNumber,
    jobTitle: user.role,
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSave = () => {
    // save changes
    setIsEditing(false);
  };

  const handleEditClick = () => {
    setIsEditing(true);
  };

  const handleCancelClick = () => {
    setIsEditing(false);
  };

  return (
    <div className="relative">
      {isEditing && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-md shadow-md border w-1/3 z-60">
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold">Edit Profile</h2>
                <button onClick={handleCancelClick} className='text-red-500'>
                  <X className="h-6 w-6"/>
                </button>
              </div>
              <input 
                type="text"
                name='fullName'
                value={formData.fullName}
                onChange={handleChange}
                placeholder='Full Name'
                className='border p-2 w-full rounded-md'
              />
              <input 
                type="text"
                name='city'
                value={formData.city}
                onChange={handleChange}
                placeholder='Current City'
                className='border p-2 w-full rounded-md'
              />
              <input 
                type="email"
                name='email'
                value={formData.email}
                onChange={handleChange}
                placeholder='Email ID'
                className='border p-2 w-full rounded-md'
              />
              <input 
                type="text"
                name='phoneNumber'
                value={formData.phoneNumber}
                onChange={handleChange}
                placeholder='Phone Number'
                className='border p-2 w-full rounded-md'
              />
              <input 
                type="text"
                name='jobTitle'
                value={formData.jobTitle}
                onChange={handleChange}
                placeholder='Job Title'
                className='border p-2 w-full rounded-md'
              />
              <button
                onClick={handleSave}
                className="bg-primary text-white p-2 rounded-md w-full"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}
      <div className="bg-white p-6 rounded-md shadow-md border flex items-center space-y-2 relative">
        <div className="w-40 h-40 border flex items-center justify-center">
          <Icon icon="mdi:account-circle" className="w-40 h-40 text-gray-200" />
        </div>
        <div className='p-2'>
          <div className="flex justify-between items-center w-full">
            <div className="flex items-center space-x-4">
              <div>
                <h2 className="text-2xl font-semibold">{formData.fullName}</h2>
                <p className='capitalize'>{formData.jobTitle || "Add a job role"}</p>
              </div>
            </div>
            <button
              onClick={handleEditClick}
              className='text-primary flex space-x-2'
            >
              <Pencil className="h-4 w-4"/>
              <span>Edit</span>
            </button>
          </div>
          <div className="mt-4 text-sm flex space-x-4">
            <button className='text-gray-500 text-start w-full'>{formData.city || 'Add Current Location'}</button>
            <button className='text-primary text-start w-full'>
              <p className='text-gray-500'>{formData.email}</p>
            </button>
            <button className='text-primary w-full'>{formData.phoneNumber || 'Add Mobile Number'}</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileHeader;
