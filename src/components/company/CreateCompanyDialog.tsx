import React, { useState } from 'react';
import { X } from 'lucide-react';

interface CreateCompanyDialogProps {
  onClose: () => void;
  onSave: (company: {
    name: string;
    location: string;
    employees: number;
    description: string;
    logo: string;
  }) => void;
}

export function CreateCompanyDialog({ onClose, onSave }: CreateCompanyDialogProps) {
  const [formData, setFormData] = useState({
    name: '',
    location: '',
    employees: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      ...formData,
      employees: Number(formData.employees),
      logo: 'https://images.unsplash.com/photo-1560179707-f14e90ef3623?w=300&h=300&fit=crop&crop=entropy',
    });
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-full max-w-[500px] max-h-[90vh] overflow-y-auto space-y-4">
        <div className="sticky top-0 bg-white dark:bg-gray-800 p-6 pb-4 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Create New Company</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
          >
            <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="p-6 pt-2 space-y-4">
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Company Name*</label>
            <input
              type="text"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Location*</label>
            <input
              type="text"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              required
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Total Employees*</label>
            <input
              type="number"
              value={formData.employees}
              onChange={(e) => setFormData({ ...formData, employees: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              required
              min="1"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Description*</label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-32 resize-none"
              required
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Create Company
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}