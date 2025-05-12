import React, { useState } from 'react';
import { format, startOfWeek, addDays, subWeeks, addWeeks } from 'date-fns';
import { 
  Clock, 
  ChevronLeft, 
  ChevronRight,
  CheckCircle2,
  Clock3,
  Coffee,
  LogOut,
  AlertCircle,
  Calendar,
  ArrowRight,
  Clock4,
  Timer,
  Zap,
  Edit2,
  Save,
  XCircle,
  Plus,
  Trash2,
  PalmtreeIcon,
  Bed,
  Stethoscope,
  Briefcase
} from 'lucide-react';

interface TimeEntry {
  id: string;
  time: string;
  type: 'check-in' | 'check-out' | 'break-start' | 'break-end';
  status: 'on-time' | 'late' | 'early';
}

interface DayRecord {
  date: Date;
  entries: TimeEntry[];
  status: 'present' | 'absent' | 'half-day' | 'weekend' | 'vacation' | 'sick' | 'business';
  totalHours: number;
  overtime: number;
  note?: string;
}

interface EditTimeModalProps {
  entry: TimeEntry;
  onSave: (updatedEntry: TimeEntry) => void;
  onDelete: () => void;
  onCancel: () => void;
}

function EditTimeModal({ entry, onSave, onDelete, onCancel }: EditTimeModalProps) {
  const [editedEntry, setEditedEntry] = useState({ ...entry });

  return (
    <div className="absolute left-0 top-0 w-80 bg-white dark:bg-gray-800 rounded-lg shadow-xl p-4 z-10 border border-gray-200 dark:border-gray-700">
      <h4 className="text-gray-900 dark:text-white font-medium mb-4">Edit Entry</h4>
      <div className="space-y-4">
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Time</label>
          <input
            type="time"
            value={editedEntry.time}
            onChange={(e) => setEditedEntry({ ...editedEntry, time: e.target.value })}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          />
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Type</label>
          <select
            value={editedEntry.type}
            onChange={(e) => setEditedEntry({ ...editedEntry, type: e.target.value as TimeEntry['type'] })}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          >
            <option value="check-in">Check In</option>
            <option value="check-out">Check Out</option>
            <option value="break-start">Break Start</option>
            <option value="break-end">Break End</option>
          </select>
        </div>
        <div>
          <label className="text-sm text-gray-500 dark:text-gray-400 block mb-1">Status</label>
          <select
            value={editedEntry.status}
            onChange={(e) => setEditedEntry({ ...editedEntry, status: e.target.value as TimeEntry['status'] })}
            className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30"
          >
            <option value="on-time">On Time</option>
            <option value="late">Late</option>
            <option value="early">Early</option>
          </select>
        </div>
        <div className="flex justify-between pt-4">
          <button
            onClick={() => onDelete()}
            className="px-3 py-1.5 bg-red-500/10 text-red-600 dark:text-red-400 rounded-lg hover:bg-red-500/20 transition-colors"
          >
            <Trash2 className="h-4 w-4" />
          </button>
          <div className="space-x-2">
            <button
              onClick={onCancel}
              className="px-3 py-1.5 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(editedEntry)}
              className="px-3 py-1.5 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

interface MarkDayModalProps {
  date: Date;
  onSave: (status: DayRecord['status'], note: string) => void;
  onCancel: () => void;
}

function MarkDayModal({ date, onSave, onCancel }: MarkDayModalProps) {
  const [status, setStatus] = useState<DayRecord['status']>('vacation');
  const [note, setNote] = useState('');

  const statusOptions = [
    { value: 'vacation', label: 'Vacation Leave', icon: PalmtreeIcon },
    { value: 'sick', label: 'Sick Leave', icon: Stethoscope },
    { value: 'business', label: 'Business Trip', icon: Briefcase },
  ];

  return (
    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center rounded-xl">
      <div className="bg-white dark:bg-gray-800 p-6 rounded-xl w-96 space-y-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Mark Day as Leave</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Leave Type</label>
            <div className="space-y-2">
              {statusOptions.map(option => {
                const Icon = option.icon;
                return (
                  <button
                    key={option.value}
                    onClick={() => setStatus(option.value as DayRecord['status'])}
                    className={`w-full flex items-center space-x-3 p-3 rounded-lg transition-colors ${
                      status === option.value
                        ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400 border border-purple-500/30'
                        : 'hover:bg-gray-100 dark:hover:bg-gray-700/50 text-gray-700 dark:text-gray-300'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                    <span>{option.label}</span>
                  </button>
                );
              })}
            </div>
          </div>
          <div>
            <label className="text-sm text-gray-500 dark:text-gray-400 block mb-2">Note</label>
            <textarea
              value={note}
              onChange={(e) => setNote(e.target.value)}
              placeholder="Add a note..."
              className="w-full bg-gray-100 dark:bg-gray-800 rounded-lg px-3 py-2 text-gray-900 dark:text-white border border-gray-300 dark:border-gray-700 focus:outline-none focus:ring-2 focus:ring-purple-500/30 h-24 resize-none"
            />
          </div>
          <div className="flex justify-end space-x-3 pt-4">
            <button
              onClick={onCancel}
              className="px-4 py-2 text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={() => onSave(status, note)}
              className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600 transition-colors"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export function AttendanceSection({ employeeId }: { employeeId: string }) {
  const [selectedWeek, setSelectedWeek] = useState(new Date());
  const [selectedDay, setSelectedDay] = useState<Date | null>(null);
  const [editingEntry, setEditingEntry] = useState<TimeEntry | null>(null);
  const [showMarkDayModal, setShowMarkDayModal] = useState(false);
  const [attendance, setAttendance] = useState(() => {
    const weekDays = getWeekDays();
    return weekDays.map(day => generateDayRecord(day));
  });

  function getWeekDays() {
    const start = startOfWeek(selectedWeek, { weekStartsOn: 1 });
    return Array.from({ length: 7 }, (_, i) => addDays(start, i));
  }

  function generateTimeEntries(): TimeEntry[] {
    return [
      { id: '1', time: '08:45', type: 'check-in', status: 'early' },
      { id: '2', time: '10:30', type: 'break-start', status: 'on-time' },
      { id: '3', time: '10:45', type: 'break-end', status: 'on-time' },
      { id: '4', time: '13:00', type: 'break-start', status: 'on-time' },
      { id: '5', time: '14:00', type: 'break-end', status: 'on-time' },
      { id: '6', time: '15:30', type: 'break-start', status: 'on-time' },
      { id: '7', time: '15:45', type: 'break-end', status: 'on-time' },
      { id: '8', time: '18:30', type: 'check-out', status: 'late' },
    ];
  }

  function generateDayRecord(date: Date): DayRecord {
    const day = date.getDay();
    
    if (day === 0 || day === 6) {
      return {
        date,
        entries: [],
        status: 'weekend',
        totalHours: 0,
        overtime: 0
      };
    }

    return {
      date,
      entries: generateTimeEntries(),
      status: 'present',
      totalHours: 8.75,
      overtime: 0.75
    };
  }

  const handleAddEntry = (date: Date) => {
    const newEntry: TimeEntry = {
      id: Math.random().toString(36).substr(2, 9),
      time: format(new Date(), 'HH:mm'),
      type: 'check-in',
      status: 'on-time'
    };

    setAttendance(prev => prev.map(day => {
      if (format(day.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
        return {
          ...day,
          entries: [...day.entries, newEntry].sort((a, b) => a.time.localeCompare(b.time))
        };
      }
      return day;
    }));
  };

  const handleUpdateEntry = (date: Date, updatedEntry: TimeEntry) => {
    setAttendance(prev => prev.map(day => {
      if (format(day.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
        return {
          ...day,
          entries: day.entries.map(entry => 
            entry.id === updatedEntry.id ? updatedEntry : entry
          ).sort((a, b) => a.time.localeCompare(b.time))
        };
      }
      return day;
    }));
    setEditingEntry(null);
  };

  const handleDeleteEntry = (date: Date, entryId: string) => {
    setAttendance(prev => prev.map(day => {
      if (format(day.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
        return {
          ...day,
          entries: day.entries.filter(entry => entry.id !== entryId)
        };
      }
      return day;
    }));
    setEditingEntry(null);
  };

  const handleMarkDay = (date: Date, status: DayRecord['status'], note: string) => {
    setAttendance(prev => prev.map(day => {
      if (format(day.date, 'yyyy-MM-dd') === format(date, 'yyyy-MM-dd')) {
        return {
          ...day,
          status,
          note,
          entries: []
        };
      }
      return day;
    }));
    setShowMarkDayModal(false);
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'present': return <CheckCircle2 className="h-5 w-5 text-green-600 dark:text-green-400" />;
      case 'half-day': return <Clock3 className="h-5 w-5 text-yellow-600 dark:text-yellow-400" />;
      case 'weekend': return <Calendar className="h-5 w-5 text-gray-600 dark:text-gray-400" />;
      case 'vacation': return <PalmtreeIcon className="h-5 w-5 text-blue-600 dark:text-blue-400" />;
      case 'sick': return <Stethoscope className="h-5 w-5 text-red-600 dark:text-red-400" />;
      case 'business': return <Briefcase className="h-5 w-5 text-purple-600 dark:text-purple-400" />;
      default: return <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'early': return 'text-green-600 dark:text-green-400';
      case 'late': return 'text-red-600 dark:text-red-400';
      default: return 'text-gray-600 dark:text-gray-400';
    }
  };

  const getEntryIcon = (type: string) => {
    switch (type) {
      case 'check-in': return <Clock3 className="h-5 w-5" />;
      case 'check-out': return <LogOut className="h-5 w-5" />;
      case 'break-start': return <Coffee className="h-5 w-5" />;
      case 'break-end': return <Clock3 className="h-5 w-5" />;
      default: return null;
    }
  };

  const TimelineEntry = ({ entry, isLast, date }: { entry: TimeEntry; isLast: boolean; date: Date }) => (
    <div className="relative flex items-center group">
      <div className={`w-16 text-base font-medium ${
        entry.status === 'late' ? 'text-red-600 dark:text-red-400' : 
        entry.status === 'early' ? 'text-green-600 dark:text-green-400' : 
        'text-gray-900 dark:text-gray-300'
      }`}>
        {entry.time}
      </div>
      <div className="relative">
        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
          entry.type === 'check-in' ? 'bg-green-500/20 text-green-600 dark:text-green-400' :
          entry.type === 'check-out' ? 'bg-purple-500/20 text-purple-600 dark:text-purple-400' :
          entry.type === 'break-start' ? 'bg-yellow-500/20 text-yellow-600 dark:text-yellow-400' :
          'bg-blue-500/20 text-blue-600 dark:text-blue-400'
        }`}>
          {getEntryIcon(entry.type)}
        </div>
        {!isLast && (
          <div className="absolute top-1/2 left-full h-0.5 w-full bg-gray-200 dark:bg-gray-700" />
        )}
      </div>
      <div className="ml-4 flex-1">
        <div className="text-base font-medium text-gray-900 dark:text-white">
          {entry.type.split('-').map(word => word.charAt(0).toUpperCase() + word.slice(1)).join(' ')}
        </div>
        <div className={`text-sm ${
          entry.status === 'late' ? 'text-red-600 dark:text-red-400' :
          entry.status === 'early' ? 'text-green-600 dark:text-green-400' :
          'text-gray-600 dark:text-gray-400'
        }`}>
          {entry.status.charAt(0).toUpperCase() + entry.status.slice(1)}
        </div>
      </div>
      <button
        onClick={() => setEditingEntry(entry)}
        className="opacity-0 group-hover:opacity-100 p-2 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-all text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
      >
        <Edit2 className="h-4 w-4" />
      </button>
      {editingEntry?.id === entry.id && (
        <EditTimeModal
          entry={editingEntry}
          onSave={(updatedEntry) => handleUpdateEntry(date, updatedEntry)}
          onDelete={() => handleDeleteEntry(date, entry.id)}
          onCancel={() => setEditingEntry(null)}
        />
      )}
    </div>
  );

  const selectedDayRecord = selectedDay 
    ? attendance.find(day => format(day.date, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd'))
    : null;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-purple-500/10 rounded-xl">
            <Clock className="h-6 w-6 text-purple-500 dark:text-purple-400" />
          </div>
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Weekly Attendance</h3>
        </div>

        {/* Week Navigation */}
        <div className="flex items-center space-x-4">
          <div className="bg-gray-100 dark:bg-gray-800/50 rounded-xl p-2 flex items-center space-x-2">
            <button
              onClick={() => setSelectedWeek(subWeeks(selectedWeek, 1))}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700/50 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <span className="text-gray-700 dark:text-gray-300 font-medium px-4">
              {format(getWeekDays()[0], 'MMM dd')} - {format(getWeekDays()[6], 'MMM dd, yyyy')}
            </span>
            <button
              onClick={() => setSelectedWeek(addWeeks(selectedWeek, 1))}
              className="p-2 hover:bg-gray-200 dark:hover:bg-gray-700/50 rounded-lg transition-colors text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-green-500/10 rounded-lg">
              <CheckCircle2 className="h-5 w-5 text-green-500" />
            </div>
            <span className="text-gray-500 dark:text-gray-400">Present Days</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">5 days</div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-purple-500/10 rounded-lg">
              <Clock className="h-5 w-5 text-purple-500 dark:text-purple-400" />
            </div>
            <span className="text-gray-500 dark:text-gray-400">Total Hours</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">43.75h</div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-blue-500/10 rounded-lg">
              <Clock4 className="h-5 w-5 text-blue-500 dark:text-blue-400" />
            </div>
            <span className="text-gray-500 dark:text-gray-400">Average Hours/Day</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">8.75h</div>
        </div>

        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center space-x-3 mb-4">
            <div className="p-2 bg-yellow-500/10 rounded-lg">
              <Zap className="h-5 w-5 text-yellow-500 dark:text-yellow-400" />
            </div>
            <span className="text-gray-500 dark:text-gray-400">Overtime</span>
          </div>
          <div className="text-2xl font-bold text-gray-900 dark:text-white">3.75h</div>
        </div>
      </div>

      {/* Week Overview */}
      <div className="glass-card rounded-xl overflow-hidden">
        <div className="grid grid-cols-7 divide-x divide-gray-200 dark:divide-gray-700/50">
          {attendance.map((day, index) => (
            <button
              key={index}
              onClick={() => setSelectedDay(day.date)}
              className={`p-4 text-center transition-colors ${
                selectedDay && format(selectedDay, 'yyyy-MM-dd') === format(day.date, 'yyyy-MM-dd')
                  ? 'bg-purple-500/20'
                  : day.status === 'weekend'
                  ? 'bg-gray-100 dark:bg-gray-800/30'
                  : 'hover:bg-gray-100 dark:hover:bg-gray-800/50'
              }`}
            >
              <div className="text-sm text-gray-500 dark:text-gray-400">{format(day.date, 'EEE')}</div>
              <div className="text-2xl font-bold text-gray-900 dark:text-white my-2">{format(day.date, 'd')}</div>
              <div className="flex items-center justify-center space-x-2">
                {getStatusIcon(day.status)}
                <span className="text-sm text-gray-500 dark:text-gray-400">
                  {day.status === 'weekend' ? 'Weekend' : 
                   day.status === 'vacation' ? 'Vacation' :
                   day.status === 'sick' ? 'Sick Leave' :
                   day.status === 'business' ? 'Business' :
                   `${day.totalHours}h`}
                </span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Selected Day Details */}
      {selectedDay && selectedDayRecord && (
        <div className="glass-card rounded-xl p-6">
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-purple-500/10 rounded-lg">
                <Timer className="h-5 w-5 text-purple-500 dark:text-purple-400" />
              </div>
              <div>
                <h4 className="text-lg font-semibold text-gray-900 dark:text-white">
                  {format(selectedDay, 'EEEE, MMMM d, yyyy')}
                </h4>
                <p className="text-gray-500 dark:text-gray-400">
                  {selectedDayRecord.status === 'present' ? 'Detailed Timeline' : selectedDayRecord.status.charAt(0).toUpperCase() + selectedDayRecord.status.slice(1)}
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-4">
              {selectedDayRecord.status === 'present' ? (
                <>
                  <div className="flex items-center space-x-6">
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Total Hours</div>
                      <div className="text-xl font-bold text-gray-900 dark:text-white">8.75h</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-500 dark:text-gray-400">Overtime</div>
                      <div className="text-xl font-bold text-yellow-600 dark:text-yellow-400">+0.75h</div>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2">
                    <button
                      onClick={() => handleAddEntry(selectedDay)}
                      className="p-2 bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                      title="Add Entry"
                    >
                      <Plus className="h-4 w-4" />
                    </button>
                    <button
                      onClick={() => setShowMarkDayModal(true)}
                      className="p-2 bg-blue-500/20 text-blue-600 dark:text-blue-400 rounded-lg hover:bg-blue-500/30 transition-colors"
                      title="Mark as Leave"
                    >
                      <Bed className="h-4 w-4" />
                    </button>
                  </div>
                </>
              ) : (
                <button
                  onClick={() => {
                    setAttendance(prev => prev.map(day => {
                      if (format(day.date, 'yyyy-MM-dd') === format(selectedDay, 'yyyy-MM-dd')) {
                        return generateDayRecord(day.date);
                      }
                      return day;
                    }));
                  }}
                  className="px-4 py-2 bg-purple-500/20 text-purple-600 dark:text-purple-400 rounded-lg hover:bg-purple-500/30 transition-colors"
                >
                  Mark as Present
                </button>
              )}
            </div>
          </div>

          {selectedDayRecord.status === 'present' ? (
            <div className="space-y-6">
              {selectedDayRecord.entries.map((entry, index, arr) => (
                <TimelineEntry
                  key={entry.id}
                  entry={entry}
                  isLast={index === arr.length - 1}
                  date={selectedDay}
                />
              ))}
            </div>
          ) : (
            selectedDayRecord.note && (
              <div className="bg-gray-100 dark:bg-gray-800/50 rounded-lg p-4 mt-4">
                <p className="text-gray-700 dark:text-gray-300">{selectedDayRecord.note}</p>
              </div>
            )
          )}
        </div>
      )}

      {/* Mark Day Modal */}
      {showMarkDayModal && selectedDay && (
        <MarkDayModal
          date={selectedDay}
          onSave={(status, note) => handleMarkDay(selectedDay, status, note)}
          onCancel={() => setShowMarkDayModal(false)}
        />
      )}
    </div>
  );
}