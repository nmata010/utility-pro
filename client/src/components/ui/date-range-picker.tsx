import { useState } from "react";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { BillingPeriod } from "@/types/invoice";

interface DateRangePickerProps {
  value: BillingPeriod;
  onChange: (value: BillingPeriod) => void;
  placeholder?: string;
}

export function DateRangePicker({ value, onChange, placeholder = "Select billing period" }: DateRangePickerProps) {
  const [isOpen, setIsOpen] = useState(false);

  const dateRange: DateRange | undefined = value.startDate && value.endDate 
    ? { from: value.startDate, to: value.endDate }
    : undefined;

  const handleSelect = (range: DateRange | undefined) => {
    onChange({
      startDate: range?.from || null,
      endDate: range?.to || null,
    });
    
    // Close popover if both dates are selected
    if (range?.from && range?.to) {
      setIsOpen(false);
    }
  };

  const formatDateRange = () => {
    if (value.startDate && value.endDate) {
      return `${format(value.startDate, "MMM dd, yyyy")} - ${format(value.endDate, "MMM dd, yyyy")}`;
    }
    if (value.startDate) {
      return `${format(value.startDate, "MMM dd, yyyy")} - End date`;
    }
    return placeholder;
  };

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            "w-full justify-start text-left font-normal h-12 px-4",
            !value.startDate && "text-muted-foreground"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4" />
          {formatDateRange()}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0" align="start">
        <Calendar
          initialFocus
          mode="range"
          defaultMonth={value.startDate || new Date()}
          selected={dateRange}
          onSelect={handleSelect}
          numberOfMonths={2}
        />
      </PopoverContent>
    </Popover>
  );
}