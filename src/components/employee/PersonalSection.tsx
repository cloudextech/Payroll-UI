import React, { useState } from 'react';
import { User, Phone, GraduationCap, Upload, X } from 'lucide-react';
import { EditableField } from './EditableField';

interface PersonalSectionProps {
  data: {
    dateOfBirth: string;
    nationality: string;
    maritalStatus: string;
    gender: string;
    bloodGroup: string;
    avatar?: string;
    emergencyContact: {
      name: string;
      relation: string;
      phone: string;
    };
    education: Array<{
      degree: string;
      institution: string;
      year: string;
    }>;
  };
  onUpdate: (section: string, field: string, value: any) => void;
}

export function PersonalSection({ data, onUpdate }: PersonalSectionProps) {
  const [isDragging, setIsDragging] = useState(false);
  const [previewUrl, setPreviewUrl] = useState<string | null>(data.avatar || null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    const file = e.dataTransfer.files[0];
    if (file && file.type.startsWith('image/')) {
      handleImageUpload(file);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleImageUpload(file);
    }
  };

  const handleImageUpload = (file: File) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      setPreviewUrl(result);
      onUpdate('personal', 'avatar', result);
    };
    reader.readAsDataURL(file);
  };

  const removeImage = () => {
    setPreviewUrl(null);
    onUpdate('personal', 'avatar', null);
  };

  return (
    <div className="space-y-6">
      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <User className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
          Basic Information
        </h3>

        {/* Profile Picture Upload */}
        <div className="mb-6">
          <label className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-2 block">Profile Picture</label>
          <div 
            className={`relative flex flex-col items-center justify-center w-40 h-40 rounded-xl border-2 border-dashed transition-colors ${
              isDragging 
                ? 'border-purple-500 bg-purple-500/10' 
                : 'border-gray-300 dark:border-gray-700 hover:border-purple-500/50'
            }`}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
          >
            {previewUrl ? (
              <div className="relative w-full h-full">
                <img 
                  src={previewUrl} 
                  alt="Profile" 
                  className="w-full h-full object-cover rounded-lg"
                />
                <button
                  onClick={removeImage}
                  className="absolute -top-2 -right-2 p-1 bg-red-500 rounded-full text-white hover:bg-red-600 transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            ) : (
              <>
                <Upload className="h-8 w-8 text-gray-400" />
                <p className="text-sm text-gray-500 dark:text-gray-400 text-center mb-2">
                  Drag & drop or click to upload
                </p>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelect}
                  className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
              </>
            )}
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <EditableField
            label="Date of Birth"
            value={data.dateOfBirth}
            onSave={(value) => onUpdate('personal', 'dateOfBirth', value)}
          />
          <EditableField
            label="Nationality"
            value={data.nationality}
            onSave={(value) => onUpdate('personal', 'nationality', value)}
          />
          <EditableField
            label="Marital Status"
            value={data.maritalStatus}
            onSave={(value) => onUpdate('personal', 'maritalStatus', value)}
          />
          <EditableField
            label="Gender"
            value={data.gender}
            onSave={(value) => onUpdate('personal', 'gender', value)}
          />
          <EditableField
            label="Blood Group"
            value={data.bloodGroup}
            onSave={(value) => onUpdate('personal', 'bloodGroup', value)}
          />
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6 flex items-center">
          <Phone className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
          Emergency Contact
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          <EditableField
            label="Contact Name"
            value={data.emergencyContact.name}
            onSave={(value) => onUpdate('personal', 'emergencyContact', { ...data.emergencyContact, name: value })}
          />
          <EditableField
            label="Relation"
            value={data.emergencyContact.relation}
            onSave={(value) => onUpdate('personal', 'emergencyContact', { ...data.emergencyContact, relation: value })}
          />
          <EditableField
            label="Contact Number"
            value={data.emergencyContact.phone}
            onSave={(value) => onUpdate('personal', 'emergencyContact', { ...data.emergencyContact, phone: value })}
          />
        </div>
      </div>

      <div className="glass-card rounded-xl p-6">
        <div className="flex items-center justify-between mb-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white flex items-center">
            <GraduationCap className="h-5 w-5 text-purple-500 dark:text-purple-400 mr-2" />
            Education
          </h3>
          <button className="px-3 py-1.5 bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors text-sm">
            Add Education
          </button>
        </div>
        <div className="space-y-4">
          {data.education.map((edu, index) => (
            <div key={index} className="p-4 bg-gray-100 dark:bg-gray-800/50 rounded-lg">
              <EditableField
                label="Degree"
                value={edu.degree}
                onSave={(value) => {
                  const newEducation = [...data.education];
                  newEducation[index] = { ...edu, degree: value };
                  onUpdate('personal', 'education', newEducation);
                }}
              />
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mt-4">
                <EditableField
                  label="Institution"
                  value={edu.institution}
                  onSave={(value) => {
                    const newEducation = [...data.education];
                    newEducation[index] = { ...edu, institution: value };
                    onUpdate('personal', 'education', newEducation);
                  }}
                />
                <EditableField
                  label="Year"
                  value={edu.year}
                  onSave={(value) => {
                    const newEducation = [...data.education];
                    newEducation[index] = { ...edu, year: value };
                    onUpdate('personal', 'education', newEducation);
                  }}
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}