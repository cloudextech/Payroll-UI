import React, { useState, useEffect, useRef } from 'react';
import { format, addMonths, subMonths } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight, X } from 'lucide-react';

interface MonthlyCalendarProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectDate: (date: Date) => void;
  selectedDate?: Date;
}

export function MonthlyCalendar({ isOpen, onClose, onSelectDate, selectedDate = new Date() }: MonthlyCalendarProps) {
  const [currentDate, setCurrentDate] = useState(selectedDate);
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        onClose();
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const prevMonth = () => {
    setCurrentDate(subMonths(currentDate, 1));
  };

  const nextMonth = () => {
    setCurrentDate(addMonths(currentDate, 1));
  };

  const handleSelectMonth = () => {
    onSelectDate(currentDate);
    onClose();
  };

  // Generate array of months for the current year
  const generateMonthsGrid = () => {
    const months = [];
    const currentYear = currentDate.getFullYear();
    
    for (let i = 0; i < 12; i++) {
      const date = new Date(currentYear, i, 1);
      months.push(date);
    }
    
    return months;
  };

  const months = generateMonthsGrid();
  const currentMonth = currentDate.getMonth();

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center">
      <div className="fixed inset-0 bg-black/20 backdrop-blur-sm" onClick={onClose}></div>
      <div 
        ref={calendarRef}
        className="mt-20 bg-card rounded-xl shadow-xl border border-border p-4 w-80 z-50"
      >
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center space-x-2">
            <Calendar className="h-5 w-5 text-primary" />
            <h3 className="text-lg font-semibold text-foreground">Select Month</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        
        <div className="flex items-center justify-between mb-4">
          <button
            onClick={prevMonth}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <h4 className="text-foreground font-medium">
            {format(currentDate, 'yyyy')}
          </h4>
          <button
            onClick={nextMonth}
            className="p-1.5 hover:bg-muted rounded-lg transition-colors text-muted-foreground hover:text-foreground"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
        
        <div className="grid grid-cols-3 gap-2 mb-4">
          {months.map((month, index) => (
            <button
              key={index}
              onClick={() => setCurrentDate(new Date(currentDate.getFullYear(), index, 1))}
              className={`
                py-2 px-1 rounded-lg text-sm font-medium
                hover:bg-muted transition-colors
                ${index === currentMonth ? 'bg-primary text-primary-foreground' : 'text-foreground'}
              `}
            >
              {format(month, 'MMM')}
            </button>
          ))}
        </div>
        
        <div className="mt-4 pt-4 border-t border-border flex space-x-2">
          <button
            onClick={() => setCurrentDate(new Date())}
            className="flex-1 py-2 bg-muted text-foreground rounded-lg hover:bg-muted/80 transition-colors text-sm font-medium"
          >
            Current
          </button>
          <button
            onClick={handleSelectMonth}
            className="flex-1 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors text-sm font-medium"
          >
            Select
          </button>
        </div>
      </div>
    </div>
  );
}