import { useState } from 'react';
import { Card } from '@/components/ui/card';
import { CalendarHeader } from './CalendarHeader';
import { CalendarGrid } from './CalendarGrid';

export function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [cellStatus, setCellStatus] = useState<Map<string, 'default' | 'checked' | 'holiday' | 'dayoff'>>(new Map());

  const handlePrevMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() - 1)
    );
  };

  const handleNextMonth = () => {
    setCurrentDate(
      new Date(currentDate.getFullYear(), currentDate.getMonth() + 1)
    );
  };

  const handleStatusChange = (dateString: string, status: 'default' | 'checked' | 'holiday' | 'dayoff') => {
    const newCellStatus = new Map(cellStatus);
    if (status === 'default') {
      newCellStatus.delete(dateString);
    } else {
      newCellStatus.set(dateString, status);
    }
    setCellStatus(newCellStatus);
  };

  return (
    <Card className="p-6 max-w-3xl mx-auto">
      <CalendarHeader
        currentDate={currentDate}
        onPrevMonth={handlePrevMonth}
        onNextMonth={handleNextMonth}
      />
      <CalendarGrid
        currentDate={currentDate}
        cellStatus={cellStatus}
        onStatusChange={handleStatusChange}
      />
    </Card>
  );
}