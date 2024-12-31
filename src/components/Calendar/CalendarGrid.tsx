import { cn } from '@/lib/utils';
import { CalendarCell } from './CalendarCell';

interface CalendarGridProps {
  currentDate: Date;
  cellStatus: Map<string, 'default' | 'checked' | 'holiday' | 'dayoff'>;
  onStatusChange: (dateString: string, status: 'default' | 'checked' | 'holiday' | 'dayoff') => void;
}

export function CalendarGrid({ currentDate, cellStatus, onStatusChange }: CalendarGridProps) {
  const daysInMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth() + 1,
    0
  ).getDate();

  const firstDayOfMonth = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    1
  ).getDay();

  const today = new Date();
  const isCurrentMonth =
    today.getMonth() === currentDate.getMonth() &&
    today.getFullYear() === currentDate.getFullYear();

  const days = Array.from({ length: 42 }, (_, i) => {
    const dayNumber = i - firstDayOfMonth + 1;
    if (dayNumber < 1 || dayNumber > daysInMonth) return null;
    return dayNumber;
  });

  const weekDays = ['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sáb'];

  const getDateString = (day: number) => {
    return new Date(
      currentDate.getFullYear(),
      currentDate.getMonth(),
      day
    ).toISOString().split('T')[0];
  };

  const isWeekend = (index: number) => {
    return index % 7 === 0 || index % 7 === 6;
  };

  return (
    <div className="grid grid-cols-7 gap-1">
      {weekDays.map((day, index) => (
        <div
          key={day}
          className={cn(
            "h-10 flex items-center justify-center font-semibold text-sm",
            isWeekend(index) ? "text-muted-foreground bg-muted rounded-md" : "text-muted-foreground"
          )}
        >
          {day}
        </div>
      ))}
      {days.map((day, index) => {
        if (day === null) {
          return <div key={index} className="h-[60px]" />;
        }

        const dateString = getDateString(day);
        const isToday = isCurrentMonth && today.getDate() === day;
        const status = cellStatus.get(dateString) || 'default';

        return (
          <CalendarCell
            key={index}
            day={day}
            dateString={dateString}
            isToday={isToday}
            isWeekend={isWeekend(index)}
            status={status}
            onStatusChange={onStatusChange}
          />
        );
      })}
    </div>
  );
}