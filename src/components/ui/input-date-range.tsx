import React from "react";
import { Button } from "@/components/ui/button";
import { CalendarIcon } from "lucide-react";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { DateRange, SelectRangeEventHandler } from "react-day-picker";

interface InputDateRangeProps {
    value: DateRange | undefined;
    onSelect: SelectRangeEventHandler | undefined;
}

const InputDateRange: React.FC<InputDateRangeProps> = ({ value, onSelect }) => {
    return (
        <Popover>
            <PopoverTrigger asChild>
                <Button
                    variant={"outline"}
                    className={cn(
                        "pl-3 text-left font-normal w-full",
                        !value && "text-muted-foreground"
                    )}
                >
                    {value?.from ? (
                        value.to ? (
                            <>
                                {format(value.from, "dd-LL-yyyy")} -{" "}
                                {format(value.to, "dd-LL-yyyy")}
                            </>
                        ) : (
                            format(value.from, "dd-LL-yyyy")
                        )
                    ) : (
                        <span>Pilih Tanggal</span>
                    )}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={value?.from}
                    selected={value}
                    onSelect={onSelect}
                    numberOfMonths={2}
                />
            </PopoverContent>
        </Popover>
    );
};

export default InputDateRange;
