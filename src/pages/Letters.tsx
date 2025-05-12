import React, { useState } from 'react';
import { 
  Mail,
  Search,
  Filter,
  Plus,
  FileText,
  Send,
  Download,
  History,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
  MoreHorizontal,
  Trash2,
  Edit2,
  Eye,
  X,
  Building2,
  CalendarDays,
  Briefcase,
  GraduationCap,
  Award,
  BadgeCheck,
  Star,
  DoorOpen,
  FileWarning
} from 'lucide-react';

interface Letter {
  id: string;
  type: 'offer' | 'appointment' | 'experience' | 'relieving' | 'memo';
  status: 'draft' | 'sent' | 'viewed' | 'pending';
  createdAt: string;
  sentAt?: string;
  viewedAt?: string;
  emailTo: string;
  subject: string;
  department?: string;
  position?: string;
  content?: {
    // Appointment Letter
    appointmentDate?: string;
    joiningDate?: string;
    salary?: string;
    benefits?: string[];
    workLocation?: string;
    reportingTo?: string;
    workHours?: string;

    // Experience Letter
    dateOfJoining?: string;
    dateOfRelieving?: string;
    totalExperience?: string;
    projectsWorked?: string[];
    responsibilities?: string[];
    hrComments?: string;
    performanceRating?: number;

    // Relieving Letter
    lastWorkingDay?: string;
    clearanceDate?: string;
    noticePeriod?: string;
    exitInterviewDate?: string;
    reasonForLeaving?: string;
    rehireEligible?: boolean;

    // Memo Letter
    memoDate?: string;
    memoType?: 'warning' | 'disciplinary' | 'performance';
    incident?: string;
    incidentDate?: string;
    witnesses?: string[];
    previousWarnings?: string[];
    consequences?: string;
    improvementPlan?: string;
    followUpDate?: string;
  };
}

interface LetterTemplateProps {
  type: Letter['type'];
  data: Letter;
  onUpdate: (updates: Partial<Letter['content']>) => void;
  isEditing: boolean;
}

function LetterTemplate({ type, data, onUpdate, isEditing }: LetterTemplateProps) {
  const [editData, setEditData] = useState(data.content || {});

  const handleInputChange = (field: string, value: any) => {
    setEditData(prev => ({ ...prev, [field]: value }));
    onUpdate({ [field]: value });
  };

  const renderEditableField = (label: string, field: keyof Letter['content'], type: string = 'text') => (
    <div className="mb-4">
      <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">{label}</label>
      {isEditing ? (
        <input
          type={type}
          value={editData[field] || ''}
          onChange={(e) => handleInputChange(field, e.target.value)}
          className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
        />
      ) : (
        <p className="text-gray-900 dark:text-white">{data.content?.[field] || '-'}</p>
      )}
    </div>
  );

  const renderAppointmentTemplate = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 dark:bg-purple-500/10 rounded-lg">
          <Building2 className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Appointment Letter</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Official employment confirmation</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderEditableField('Appointment Date', 'appointmentDate', 'date')}
        {renderEditableField('Joining Date', 'joiningDate', 'date')}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderEditableField('Position', 'position')}
        {renderEditableField('Department', 'department')}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderEditableField('Salary', 'salary')}
        {renderEditableField('Work Location', 'workLocation')}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderEditableField('Reporting To', 'reportingTo')}
        {renderEditableField('Work Hours', 'workHours')}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block">Benefits</label>
        {isEditing ? (
          <textarea
            value={editData.benefits?.join('\n') || ''}
            onChange={(e) => handleInputChange('benefits', e.target.value.split('\n'))}
            placeholder="Enter benefits (one per line)"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-32"
          />
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.content?.benefits?.map((benefit, index) => (
              <li key={index} className="text-gray-900 dark:text-white">{benefit}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );

  const renderExperienceTemplate = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 dark:bg-purple-500/10 rounded-lg">
          <GraduationCap className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Experience Letter</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Employment history and performance</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderEditableField('Date of Joining', 'dateOfJoining', 'date')}
        {renderEditableField('Date of Relieving', 'dateOfRelieving', 'date')}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderEditableField('Total Experience', 'totalExperience')}
        <div className="space-y-2">
          <label className="text-sm text-gray-500 dark:text-gray-400 block">Performance Rating</label>
          {isEditing ? (
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <button
                  key={rating}
                  onClick={() => handleInputChange('performanceRating', rating)}
                  className={`p-2 rounded-lg transition-colors ${
                    editData.performanceRating >= rating
                      ? 'text-yellow-500'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                >
                  <Star className="h-5 w-5" fill={editData.performanceRating >= rating ? 'currentColor' : 'none'} />
                </button>
              ))}
            </div>
          ) : (
            <div className="flex items-center space-x-2">
              {[1, 2, 3, 4, 5].map((rating) => (
                <Star
                  key={rating}
                  className={`h-5 w-5 ${
                    (data.content?.performanceRating || 0) >= rating
                      ? 'text-yellow-500'
                      : 'text-gray-400 dark:text-gray-500'
                  }`}
                  fill={(data.content?.performanceRating || 0) >= rating ? 'currentColor' : 'none'}
                />
              ))}
            </div>
          )}
        </div>
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block">Projects Worked</label>
        {isEditing ? (
          <textarea
            value={editData.projectsWorked?.join('\n') || ''}
            onChange={(e) => handleInputChange('projectsWorked', e.target.value.split('\n'))}
            placeholder="Enter projects (one per line)"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-32"
          />
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.content?.projectsWorked?.map((project, index) => (
              <li key={index} className="text-gray-900 dark:text-white">{project}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block">Key Responsibilities</label>
        {isEditing ? (
          <textarea
            value={editData.responsibilities?.join('\n') || ''}
            onChange={(e) => handleInputChange('responsibilities', e.target.value.split('\n'))}
            placeholder="Enter responsibilities (one per line)"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-32"
          />
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.content?.responsibilities?.map((responsibility, index) => (
              <li key={index} className="text-gray-900 dark:text-white">{responsibility}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block">HR Comments</label>
        {isEditing ? (
          <textarea
            value={editData.hrComments || ''}
            onChange={(e) => handleInputChange('hrComments', e.target.value)}
            placeholder="Enter HR comments"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-32"
          />
        ) : (
          <p className="text-gray-900 dark:text-white whitespace-pre-line">{data.content?.hrComments || '-'}</p>
        )}
      </div>
    </div>
  );

  const renderRelievingTemplate = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-purple-100 dark:bg-purple-500/10 rounded-lg">
          <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Relieving Letter</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Official service termination</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderEditableField('Last Working Day', 'lastWorkingDay', 'date')}
        {renderEditableField('Clearance Date', 'clearanceDate', 'date')}
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderEditableField('Notice Period', 'noticePeriod')}
        {renderEditableField('Exit Interview Date', 'exitInterviewDate', 'date')}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block">Reason for Leaving</label>
        {isEditing ? (
          <textarea
            value={editData.reasonForLeaving || ''}
            onChange={(e) => handleInputChange('reasonForLeaving', e.target.value)}
            placeholder="Enter reason for leaving"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-32"
          />
        ) : (
          <p className="text-gray-900 dark:text-white whitespace-pre-line">{data.content?.reasonForLeaving || '-'}</p>
        )}
      </div>

      <div className="flex items-center space-x-2">
        <label className="text-sm text-gray-500 dark:text-gray-400">Eligible for Rehire</label>
        {isEditing ? (
          <button
            onClick={() => handleInputChange('rehireEligible', !editData.rehireEligible)}
            className={`p-2 rounded-lg transition-colors ${
              editData.rehireEligible
                ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500'
                : 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500'
            }`}
          >
            {editData.rehireEligible ? <CheckCircle2 className="h-5 w-5" /> : <X className="h-5 w-5" />}
          </button>
        ) : (
          <span className={`inline-flex items-center space-x-1 px-3 py-1 rounded-full text-sm ${
            data.content?.rehireEligible
              ? 'bg-green-100 dark:bg-green-500/10 text-green-600 dark:text-green-500'
              : 'bg-red-100 dark:bg-red-500/10 text-red-600 dark:text-red-500'
          }`}>
            {data.content?.rehireEligible ? (
              <>
                <CheckCircle2 className="h-4 w-4" />
                <span>Yes</span>
              </>
            ) : (
              <>
                <X className="h-4 w-4" />
                <span>No</span>
              </>
            )}
          </span>
        )}
      </div>
    </div>
  );

  const renderMemoTemplate = () => (
    <div className="space-y-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-red-100 dark:bg-red-500/10 rounded-lg">
          <FileWarning className="h-5 w-5 text-red-600 dark:text-red-400" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Memo Letter</h3>
          <p className="text-sm text-gray-500 dark:text-gray-400">Official warning or notification</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderEditableField('Memo Date', 'memoDate', 'date')}
        <div className="space-y-2">
          <label className="text-sm text-gray-500 dark:text-gray-400 block">Memo Type</label>
          {isEditing ? (
            <select
              value={editData.memoType || ''}
              onChange={(e) => handleInputChange('memoType', e.target.value)}
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            >
              <option value="">Select Type</option>
              <option value="warning">Warning</option>
              <option value="disciplinary">Disciplinary</option>
              <option value="performance">Performance</option>
            </select>
          ) : (
            <p className="text-gray-900 dark:text-white capitalize">{data.content?.memoType || '-'}</p>
          )}
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {renderEditableField('Incident Date', 'incidentDate', 'date')}
        {renderEditableField('Follow Up Date', 'followUpDate', 'date')}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block">Incident Description</label>
        {isEditing ? (
          <textarea
            value={editData.incident || ''}
            onChange={(e) => handleInputChange('incident', e.target.value)}
            placeholder="Describe the incident"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-32"
          />
        ) : (
          <p className="text-gray-900 dark:text-white whitespace-pre-line">{data.content?.incident || '-'}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block">Witnesses</label>
        {isEditing ? (
          <textarea
            value={editData.witnesses?.join('\n') || ''}
            onChange={(e) => handleInputChange('witnesses', e.target.value.split('\n'))}
            placeholder="Enter witnesses (one per line)"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-32"
          />
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.content?.witnesses?.map((witness, index) => (
              <li key={index} className="text-gray-900 dark:text-white">{witness}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block">Previous Warnings</label>
        {isEditing ? (
          <textarea
            value={editData.previousWarnings?.join('\n') || ''}
            onChange={(e) => handleInputChange('previousWarnings', e.target.value.split('\n'))}
            placeholder="Enter previous warnings (one per line)"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-32"
          />
        ) : (
          <ul className="list-disc list-inside space-y-1">
            {data.content?.previousWarnings?.map((warning, index) => (
              <li key={index} className="text-gray-900 dark:text-white">{warning}</li>
            ))}
          </ul>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block">Consequences</label>
        {isEditing ? (
          <textarea
            value={editData.consequences || ''}
            onChange={(e) => handleInputChange('consequences', e.target.value)}
            placeholder="Enter consequences"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-32"
          />
        ) : (
          <p className="text-gray-900 dark:text-white whitespace-pre-line">{data.content?.consequences || '-'}</p>
        )}
      </div>

      <div className="space-y-2">
        <label className="text-sm text-gray-500 dark:text-gray-400 block">Improvement Plan</label>
        {isEditing ? (
          <textarea
            value={editData.improvementPlan || ''}
            onChange={(e) => handleInputChange('improvementPlan', e.target.value)}
            placeholder="Enter improvement plan"
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-32"
          />
        ) : (
          <p className="text-gray-900 dark:text-white whitespace-pre-line">{data.content?.improvementPlan || '-'}</p>
        )}
      </div>
    </div>
  );

  switch (type) {
    case 'appointment':
      return renderAppointmentTemplate();
    case 'experience':
      return renderExperienceTemplate();
    case 'relieving':
      return renderRelievingTemplate();
    case 'memo':
      return renderMemoTemplate();
    default:
      return null;
  }
}

interface LetterPreviewModalProps {
  letter: Letter;
  onClose: () => void;
  onUpdate: (updates: Partial<Letter>) => void;
}

function LetterPreviewModal({ letter, onClose, onUpdate }: LetterPreviewModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedLetter, setEditedLetter] = useState(letter);

  const handleContentUpdate = (updates: Partial<Letter['content']>) => {
    setEditedLetter(prev => ({
      ...prev,
      content: { ...(prev.content || {}), ...updates }
    }));
  };

  const handleSave = () => {
    onUpdate(editedLetter);
    setIsEditing(false);
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl w-[800px] max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 flex items-center justify-between sticky top-0 bg-white/95 dark:bg-gray-800/95 backdrop-blur-sm z-10">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Letter Preview</h3>
          <div className="flex items-center space-x-3">
            {letter.status === 'draft' && (
              <button
                onClick={() => setIsEditing(!isEditing)}
                className={`px-4 py-2 rounded-lg transition-colors ${
                  isEditing
                    ? 'bg-purple-600 text-white'
                    : 'bg-purple-100 dark:bg-purple-500/20 text-purple-600 dark:text-purple-400'
                }`}
              >
                {isEditing ? 'Cancel Editing' : 'Edit Letter'}
              </button>
            )}
            {isEditing && (
              <button
                onClick={handleSave}
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                Save Changes
              </button>
            )}
            <button
              onClick={onClose}
              className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
            >
              <X className="h-5 w-5 text-gray-500 dark:text-gray-400" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-6">
          <LetterTemplate
            type={letter.type}
            data={editedLetter}
            onUpdate={handleContentUpdate}
            isEditing={isEditing}
          />
        </div>
      </div>
    </div>
  );
}

interface LetterFormModalProps {
  type: Letter['type'];
  onSubmit: (letter: Partial<Letter>) => void;
  onCancel: () => void;
}

function LetterFormModal({ type, onSubmit, onCancel }: LetterFormModalProps) {
  const [formData, setFormData] = useState({
    emailTo: '',
    subject: '',
    department: '',
    position: '',
  });

  const getDefaultSubject = () => {
    switch (type) {
      case 'offer':
        return 'Job Offer Letter - [Position]';
      case 'appointment':
        return 'Appointment Letter - [Position]';
      case 'experience':
        return 'Experience Letter';
      case 'relieving':
        return 'Relieving Letter';
      case 'memo':
        return 'Official Memo';
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-white dark:bg-gray-800 rounded-xl p-6 w-[500px] space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
          Generate {type.charAt(0).toUpperCase() + type.slice(1)} Letter
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Email To</label>
            <input
              type="email"
              value={formData.emailTo}
              onChange={(e) => setFormData({ ...formData, emailTo: e.target.value })}
              placeholder="Enter recipient email"
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Subject</label>
            <input
              type="text"
              value={formData.subject || getDefaultSubject()}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Enter email subject"
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          </div>
          {(type === 'offer' || type === 'appointment') && (
            <>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Position</label>
                <input
                  type="text"
                  value={formData.position}
                  onChange={(e) => setFormData({ ...formData, position: e.target.value })}
                  placeholder="Enter position"
                  className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Department</label>
                <input
                  type="text"
                  value={formData.department}
                  onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  placeholder="Enter department"
                  className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
                />
              </div>
            </>
          )}
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(formData)}
              className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
            >
              Generate & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function Letters() {
  const [letters, setLetters] = useState<Letter[]>([
    {
      id: '1',
      type: 'offer',
      status: 'sent',
      createdAt: '2024-03-10T10:30:00Z',
      sentAt: '2024-03-10T10:35:00Z',
      viewedAt: '2024-03-10T11:20:00Z',
      emailTo: 'arjun.sharma@company.com',
      subject: 'Job Offer Letter - Senior Software Engineer',
      department: 'Engineering',
      position: 'Senior Software Engineer'
    },
    {
      id: '2',
      type: 'appointment',
      status: 'draft',
      createdAt: '2024-03-12T14:20:00Z',
      emailTo: 'priya.patel@company.com',
      subject: 'Appointment Letter - Product Designer',
      department: 'Design',
      position: 'Product Designer'
    },
    {
      id: '3',
      type: 'experience',
      status: 'pending',
      createdAt: '2024-03-15T09:15:00Z',
      emailTo: 'rajesh.kumar@company.com',
      subject: 'Experience Letter Request - Rajesh Kumar'
    },
    {
      id: '4',
      type: 'relieving',
      status: 'draft',
      createdAt: '2024-03-16T11:30:00Z',
      emailTo: 'ananya.singh@company.com',
      subject: 'Relieving Letter - Ananya Singh',
      content: {
        lastWorkingDay: '2024-04-15',
        noticePeriod: '30 days',
        reasonForLeaving: 'Career growth opportunity'
      }
    },
    {
      id: '5',
      type: 'memo',
      status: 'sent',
      createdAt: '2024-03-17T13:45:00Z',
      emailTo: 'vikram.malhotra@company.com',
      subject: 'Performance Improvement Memo',
      content: {
        memoType: 'performance',
        memoDate: '2024-03-17',
        incidentDate: '2024-03-15',
        incident: 'Consistent delays in project deliverables',
        improvementPlan: 'Weekly progress reviews and mentoring sessions'
      }
    }
  ]);

  const [showLetterForm, setShowLetterForm] = useState<Letter['type'] | null>(null);
  const [selectedType, setSelectedType] = useState<string>('all');
  const [selectedStatus, setSelectedStatus] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [previewLetter, setPreviewLetter] = useState<Letter | null>(null);

  const handleGenerateLetter = (type: Letter['type']) => {
    setShowLetterForm(type);
  };

  const handleLetterSubmit = (letterData: Partial<Letter>) => {
    const newLetter: Letter = {
      id: Math.random().toString(36).substr(2, 9),
      type: showLetterForm!,
      status: 'draft',
      createdAt: new Date().toISOString(),
      emailTo: letterData.emailTo!,
      subject: letterData.subject!,
      department: letterData.department,
      position: letterData.position
    };

    setLetters(prev => [newLetter, ...prev]);
    setShowLetterForm(null);
  };

  const handleLetterUpdate = (updatedLetter: Partial<Letter>) => {
    setLetters(prev => prev.map(letter => 
      letter.id === updatedLetter.id ? { ...letter, ...updatedLetter } : letter
    ));
    setPreviewLetter(null);
  };

  const getLetterTypeIcon = (type: Letter['type']) => {
    switch (type) {
      case 'offer':
        return <FileText className="h-5 w-5 text-blue-500 dark:text-blue-400" />;
      case 'appointment':
        return <Calendar className="h-5 w-5 text-purple-500 dark:text-purple-400" />;
      case 'experience':
        return <History className="h-5 w-5 text-green-500 dark:text-green-400" />;
      case 'relieving':
        return <DoorOpen className="h-5 w-5 text-orange-500 dark:text-orange-400" />;
      case 'memo':
        return <FileWarning className="h-5 w-5 text-red-500 dark:text-red-400" />;
    }
  };

  const getStatusIcon = (status: Letter['status']) => {
    switch (status) {
      case 'sent':
        return <Send className="h-4 w-4 text-blue-500 dark:text-blue-400" />;
      case 'viewed':
        return <CheckCircle2 className="h-4 w-4 text-green-500 dark:text-green-400" />;
      case 'draft':
        return <Clock className="h-4 w-4 text-yellow-500 dark:text-yellow-400" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-orange-500 dark:text-orange-400" />;
    }
  };

  const letterTypes = [
    { type: 'offer', label: 'Offer Letter', description: 'Generate and send job offer letters' },
    { type: 'appointment', label: 'Appointment Letter', description: 'Create official appointment letters' },
    { type: 'experience', label: 'Experience Letter', description: 'Issue experience certificates' },
    { type: 'relieving', label: 'Relieving Letter', description: 'Generate relieving letters post final settlement' },
    { type: 'memo', label: 'Memo Letter', description: 'Issue formal memos and warnings' }
  ] as const;

  const filteredLetters = letters.filter(letter => {
    const matchesType = selectedType === 'all' || letter.type === selectedType;
    const matchesStatus = selectedStatus === 'all' || letter.status === selectedStatus;
    const matchesSearch = 
      letter.subject.toLowerCase().includes(searchQuery.toLowerCase()) ||
      letter.emailTo.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesType && matchesStatus && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6 transition-colors duration-200">
      <div className="max-w-[1600px] mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">Letters</h1>
            <p className="text-gray-500 dark:text-gray-400">Manage and generate employment letters</p>
          </div>

          <div className="relative group">
            <button className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Generate Letter</span>
              <ChevronDown className="h-4 w-4" />
            </button>
            <div className="absolute right-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all bg-white dark:bg-gray-800 rounded-xl shadow-xl border border-gray-200 dark:border-gray-700 divide-y divide-gray-200 dark:divide-gray-700">
              {letterTypes.map(({ type, label, description }) => (
                <button
                  key={type}
                  onClick={() => handleGenerateLetter(type)}
                  className="w-full p-3 text-left hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors flex items-start space-x-3"
                >
                  {getLetterTypeIcon(type)}
                  <div>
                    <div className="font-medium text-gray-900 dark:text-white">{label}</div>
                    <div className="text-sm text-gray-500 dark:text-gray-400">{description}</div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Filters */}
        <div className="glass-card rounded-xl p-4 mb-6">
          <div className="flex items-center space-x-4">
            <div className="flex-1 relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="text"
                placeholder="Search letters..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-white dark:bg-gray-800/50 rounded-lg pl-10 pr-4 py-2 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30 border border-gray-200 dark:border-gray-700"
              />
            </div>
            <div className="relative">
              <select
                value={selectedType}
                onChange={(e) => setSelectedType(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800/50 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              >
                <option value="all">All Types</option>
                <option value="offer">Offer Letters</option>
                <option value="appointment">Appointment Letters</option>
                <option value="experience">Experience Letters</option>
                <option value="relieving">Relieving Letters</option>
                <option value="memo">Memo Letters</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <div className="relative">
              <select
                value={selectedStatus}
                onChange={(e) => setSelectedStatus(e.target.value)}
                className="appearance-none bg-white dark:bg-gray-800/50 rounded-lg px-4 py-2 pr-8 text-gray-900 dark:text-white border border-gray-200 dark:border-gray-700
                         focus:outline-none focus:ring-2 focus:ring-purple-500/30"
              >
                <option value="all">All Status</option>
                <option value="draft">Drafts</option>
                <option value="pending">Pending</option>
                <option value="sent">Sent</option>
                <option value="viewed">Viewed</option>
              </select>
              <ChevronDown className="absolute right-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 pointer-events-none" />
            </div>
            <button className="flex items-center space-x-2 bg-white dark:bg-gray-800/50 hover:bg-gray-100 dark:hover:bg-gray-800 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg transition-colors border border-gray-200 dark:border-gray-700">
              <Filter className="h-4 w-4" />
              <span>More Filters</span>
            </button>
          </div>
        </div>

        {/* Letters List */}
        <div className="glass-card rounded-xl overflow-hidden">
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {filteredLetters.map(letter => (
              <div key={letter.id} className="p-4 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors">
                <div className="flex items-start justify-between">
                  <div className="flex items-start space-x-3">
                    {getLetterTypeIcon(letter.type)}
                    <div>
                      <h4 className="font-medium text-gray-900 dark:text-white">{letter.subject}</h4>
                      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">{letter.emailTo}</p>
                      {(letter.department || letter.position) && (
                        <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
                          {letter.position} {letter.department && `• ${letter.department}`}
                        </p>
                      )}
                      <div className="flex items-center space-x-4 mt-2">
                        <div className="flex items-center space-x-1 text-sm">
                          {getStatusIcon(letter.status)}
                          <span className="text-gray-500 dark:text-gray-400 capitalize">{letter.status}</span>
                        </div>
                        <div className="text-sm text-gray-500 dark:text-gray-400">
                          Created {new Date(letter.createdAt).toLocaleDateString()}
                        </div>
                        {letter.sentAt && (
                          <div className="text-sm text-gray-500 dark:text-gray-400">
                            Sent {new Date(letter.sentAt).toLocaleDateString()}
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => setPreviewLetter(letter)}
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      title="Preview"
                    >
                      <Eye className="h-4 w-4" />
                    </button>
                    <button
                      className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                      title="Download"
                    >
                      <Download className="h-4 w-4" />
                    </button>
                    {letter.status === 'draft' && (
                      <>
                        <button
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          title="Edit"
                        >
                          <Edit2 className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                          title="Send"
                        >
                          <Send className="h-4 w-4" />
                        </button>
                        <button
                          className="p-2 hover:bg-red-50 dark:hover:bg-red-500/10 rounded-lg transition-colors text-red-500"
                          title="Delete"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </>
                    )}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Letter Form Modal */}
        {showLetterForm && (
          <LetterFormModal
            type={showLetterForm}
            onSubmit={handleLetterSubmit}
            onCancel={() => setShowLetterForm(null)}
          />
        )}

        {/* Letter Preview Modal */}
        {previewLetter && (
          <LetterPreviewModal
            letter={previewLetter}
            onClose={() => setPreviewLetter(null)}
            onUpdate={handleLetterUpdate}
          />
        )}
      </div>
    </div>
  );
}