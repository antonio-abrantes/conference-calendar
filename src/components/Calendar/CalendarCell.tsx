import { Check } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { useHoverDelay } from '@/hooks/useHoverDelay';

interface CalendarCellProps {
  day: number;
  dateString: string;
  isToday: boolean;
  isWeekend: boolean;
  status: 'default' | 'checked' | 'holiday' | 'dayoff';
  onStatusChange: (dateString: string, status: 'default' | 'checked' | 'holiday' | 'dayoff') => void;
}

export function CalendarCell({
  day,
  dateString,
  isToday,
  isWeekend,
  status,
  onStatusChange,
}: CalendarCellProps) {
  const { shouldShow, handlers } = useHoverDelay(2000);

  const getStyles = () => {
    if (isToday) return 'bg-primary text-primary-foreground';
    switch (status) {
      case 'checked':
        return 'bg-green-500 text-white';
      case 'holiday':
        return 'bg-red-500 text-white';
      case 'dayoff':
        return 'bg-yellow-400 text-black';
      default:
        return isWeekend 
          ? 'bg-muted' 
          : 'bg-card border border-gray-200';
    }
  };

  const handleClick = () => {
    onStatusChange(dateString, status === 'default' ? 'checked' : 'default');
  };

  return (
    <div className="h-[60px] w-full" {...handlers}>
      <HoverCard open={shouldShow}>
        <HoverCardTrigger asChild>
          <button
            onClick={handleClick}
            className={cn(
              'w-full h-full relative flex items-center justify-center text-sm font-medium transition-colors',
              'hover:bg-accent rounded-lg',
              getStyles()
            )}
          >
            <span>{day}</span>
            {status !== 'default' && (
              <Check className="absolute bottom-1 right-1 h-4 w-4" />
            )}
          </button>
        </HoverCardTrigger>
        <HoverCardContent side="top" align="center" className="w-40 p-2">
          <div className="space-y-2">
            <h4 className="text-sm font-semibold">Configurações</h4>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(dateString, 'holiday');
              }}
              className="w-full text-left text-sm px-2 py-1 hover:bg-red-600 bg-red-500 text-white rounded-md"
            >
              Feriado
            </button>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onStatusChange(dateString, 'dayoff');
              }}
              className="w-full text-left text-sm px-2 py-1 hover:bg-yellow-500 bg-yellow-400 text-black rounded-md"
            >
              Folga
            </button>
          </div>
        </HoverCardContent>
      </HoverCard>
    </div>
  );
}