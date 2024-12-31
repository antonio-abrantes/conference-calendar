import { Button } from '@/components/ui/button';
import { ArrowLeft } from '@/components/Icons/ArrowLeft';
import { ArrowRight } from '@/components/Icons/ArrowRight';

interface CalendarHeaderProps {
  currentDate: Date;
  onPrevMonth: () => void;
  onNextMonth: () => void;
}

export function CalendarHeader({ currentDate, onPrevMonth, onNextMonth }: CalendarHeaderProps) {
  const monthYear = currentDate.toLocaleDateString('pt-BR', {
    month: 'long',
    year: 'numeric',
  });

  return (
    <div className="flex items-center justify-between mb-6">
      <Button
        variant="ghost"
        onClick={onPrevMonth}
        className="h-10 w-10 bg-black hover:bg-black/80 text-white p-0 flex items-center justify-center transition-colors"
      >
        <ArrowLeft />
      </Button>
      <h2 className="text-2xl font-semibold capitalize">{monthYear}</h2>
      <Button
        variant="ghost"
        onClick={onNextMonth}
        className="h-10 w-10 bg-black hover:bg-black/80 text-white p-0 flex items-center justify-center transition-colors"
      >
        <ArrowRight />
      </Button>
    </div>
  );
}