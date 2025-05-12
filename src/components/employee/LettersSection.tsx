import React, { useState } from 'react';
import { 
  FileText, 
  Send, 
  Download, 
  History,
  Mail,
  Calendar,
  CheckCircle2,
  Clock,
  AlertTriangle,
  ChevronDown,
  Plus
} from 'lucide-react';

interface Letter {
  id: string;
  type: 'offer' | 'appointment' | 'experience' | 'relieving';
  status: 'draft' | 'sent' | 'viewed' | 'pending';
  createdAt: string;
  sentAt?: string;
  viewedAt?: string;
  emailTo: string;
  subject: string;
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
      default:
        return '';
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-gray-800 rounded-xl p-6 w-[500px] space-y-4">
        <h3 className="text-lg font-semibold text-white">
          Generate {type.charAt(0).toUpperCase() + type.slice(1)} Letter
        </h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 block mb-2">Email To</label>
            <input
              type="email"
              value={formData.emailTo}
              onChange={(e) => setFormData({ ...formData, emailTo: e.target.value })}
              placeholder="Enter recipient email"
              className="w-full bg-gray-900 rounded-lg px-3 py-2 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 block mb-2">Subject</label>
            <input
              type="text"
              value={formData.subject || getDefaultSubject()}
              onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
              placeholder="Enter email subject"
              className="w-full bg-gray-900 rounded-lg px-3 py-2 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-400 hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSubmit(formData)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Generate & Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function LettersSection() {
  const [showLetterForm, setShowLetterForm] = useState<Letter['type'] | null>(null);
  const [letters, setLetters] = useState<Letter[]>([
    {
      id: '1',
      type: 'offer',
      status: 'sent',
      createdAt: '2024-03-10T10:30:00Z',
      sentAt: '2024-03-10T10:35:00Z',
      viewedAt: '2024-03-10T11:20:00Z',
      emailTo: 'sarah.anderson@example.com',
      subject: 'Job Offer Letter - Senior Software Engineer'
    },
    {
      id: '2',
      type: 'appointment',
      status: 'draft',
      createdAt: '2024-03-12T14:20:00Z',
      emailTo: 'sarah.anderson@example.com',
      subject: 'Appointment Letter - Senior Software Engineer'
    },
    {
      id: '3',
      type: 'experience',
      status: 'pending',
      createdAt: '2024-03-15T09:15:00Z',
      emailTo: 'hr@company.com',
      subject: 'Experience Letter Request - Sarah Anderson'
    }
  ]);

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
      subject: letterData.subject!
    };

    setLetters(prev => [newLetter, ...prev]);
    setShowLetterForm(null);
  };

  const getLetterTypeIcon = (type: Letter['type']) => {
    switch (type) {
      case 'offer':
        return <FileText className="h-5 w-5 text-blue-400" />;
      case 'appointment':
        return <Calendar className="h-5 w-5 text-purple-400" />;
      case 'experience':
        return <History className="h-5 w-5 text-green-400" />;
      case 'relieving':
        return <Send className="h-5 w-5 text-red-400" />;
    }
  };

  const getStatusIcon = (status: Letter['status']) => {
    switch (status) {
      case 'sent':
        return <Send className="h-4 w-4 text-blue-400" />;
      case 'viewed':
        return <CheckCircle2 className="h-4 w-4 text-green-400" />;
      case 'draft':
        return <Clock className="h-4 w-4 text-yellow-400" />;
      case 'pending':
        return <AlertTriangle className="h-4 w-4 text-orange-400" />;
    }
  };

  const getStatusText = (status: Letter['status']) => {
    switch (status) {
      case 'sent':
        return 'Sent';
      case 'viewed':
        return 'Viewed';
      case 'draft':
        return 'Draft';
      case 'pending':
        return 'Pending Approval';
    }
  };

  const letterTypes = [
    { type: 'offer', label: 'Offer Letter', description: 'Generate and send job offer letters' },
    { type: 'appointment', label: 'Appointment Letter', description: 'Create official appointment letters' },
    { type: 'experience', label: 'Experience Letter', description: 'Issue experience certificates' },
    { type: 'relieving', label: 'Relieving Letter', description: 'Generate relieving letters post final settlement' },
  ] as const;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/10 rounded-xl">
            <Mail className="h-6 w-6 text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-white">Employment Letters</h3>
        </div>

        <div className="relative group">
          <button className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors flex items-center space-x-2">
            <Plus className="h-4 w-4" />
            <span>Generate Letter</span>
            <ChevronDown className="h-4 w-4" />
          </button>
          <div className="absolute right-0 mt-2 w-80 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all bg-gray-800 rounded-xl shadow-xl border border-gray-700/50 divide-y divide-gray-700/50 z-50">
            {letterTypes.map(({ type, label, description }) => (
              <button
                key={type}
                onClick={() => handleGenerateLetter(type)}
                className="w-full p-3 text-left hover:bg-gray-700/50 transition-colors flex items-start space-x-3"
              >
                {getLetterTypeIcon(type)}
                <div>
                  <div className="font-medium text-white">{label}</div>
                  <div className="text-sm text-gray-400">{description}</div>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Letters List */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="divide-y divide-gray-700/50">
          {letters.map(letter => (
            <div key={letter.id} className="p-4 hover:bg-gray-800/50 transition-colors">
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3">
                  {getLetterTypeIcon(letter.type)}
                  <div>
                    <h4 className="font-medium text-white">{letter.subject}</h4>
                    <p className="text-sm text-gray-400 mt-1">{letter.emailTo}</p>
                    <div className="flex items-center space-x-4 mt-2">
                      <div className="flex items-center space-x-1 text-sm">
                        {getStatusIcon(letter.status)}
                        <span className="text-gray-400">{getStatusText(letter.status)}</span>
                      </div>
                      <div className="text-sm text-gray-500">
                        Created {new Date(letter.createdAt).toLocaleDateString()}
                      </div>
                      {letter.sentAt && (
                        <div className="text-sm text-gray-500">
                          Sent {new Date(letter.sentAt).toLocaleDateString()}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors text-gray-400 hover:text-white"
                    title="Download"
                  >
                    <Download className="h-4 w-4" />
                  </button>
                  {letter.status === 'draft' && (
                    <button
                      className="p-2 hover:bg-gray-700/50 rounded-lg transition-colors text-gray-400 hover:text-white"
                      title="Send"
                    >
                      <Send className="h-4 w-4" />
                    </button>
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
    </div>
  );
}