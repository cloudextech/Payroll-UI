import React, { useState } from 'react';
import { Edit2, Save, XCircle } from 'lucide-react';

interface EditableFieldProps {
  label: string;
  value: string;
  onSave: (value: string) => void;
}

export function EditableField({ label, value, onSave }: EditableFieldProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(value);

  const handleSave = () => {
    onSave(editValue);
    setIsEditing(false);
  };

  const handleCancel = () => {
    setEditValue(value);
    setIsEditing(false);
  };

  return (
    <div className="space-y-1">
      <label className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</label>
      <div className="relative">
        {isEditing ? (
          <div className="flex items-center space-x-2">
            <input
              type="text"
              value={editValue}
              onChange={(e) => setEditValue(e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
            <button
              onClick={handleSave}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-green-600 dark:text-green-400"
              title="Save"
            >
              <Save className="h-4 w-4" />
            </button>
            <button
              onClick={handleCancel}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-red-600 dark:text-red-400"
              title="Cancel"
            >
              <XCircle className="h-4 w-4" />
            </button>
          </div>
        ) : (
          <div className="flex items-center justify-between group bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 border border-gray-300 dark:border-gray-700 hover:border-purple-500/30 transition-all">
            <p className="text-gray-900 dark:text-white">{value}</p>
            <button
              onClick={() => setIsEditing(true)}
              className="opacity-0 group-hover:opacity-100 p-1.5 bg-gray-200 dark:bg-gray-700 rounded-lg transition-all text-purple-600 dark:text-purple-400 hover:text-purple-700 dark:hover:text-purple-300"
              title="Edit"
            >
              <Edit2 className="h-3.5 w-3.5" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
}