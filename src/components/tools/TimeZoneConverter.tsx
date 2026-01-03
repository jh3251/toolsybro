
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from '@/components/ui/command';
import { format, parse } from 'date-fns';
import { toZonedTime, fromZonedTime, formatInTimeZone } from 'date-fns-tz';
import { Calendar as CalendarIcon, Clock, ChevronsUpDown, Check, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { ScrollArea } from '../ui/scroll-area';

const timezones = Intl.supportedValuesOf('timeZone');

const TimezoneSelector = ({ value, onChange }: { value: string; onChange: (value: string) => void }) => {
    const [open, setOpen] = useState(false);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    <span className='truncate'>{value || 'Select timezone...'}</span>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[300px] p-0">
                <Command>
                    <CommandInput placeholder="Search timezone..." />
                    <CommandEmpty>No timezone found.</CommandEmpty>
                    <CommandList>
                        <ScrollArea className="h-64">
                            {timezones.map((tz) => (
                                <CommandItem
                                    key={tz}
                                    value={tz}
                                    onSelect={(currentValue) => {
                                        onChange(currentValue === value ? '' : tz);
                                        setOpen(false);
                                    }}
                                >
                                    <Check className={cn('mr-2 h-4 w-4', value === tz ? 'opacity-100' : 'opacity-0')} />
                                    {tz}
                                </CommandItem>
                            ))}
                        </ScrollArea>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    );
};


export function TimeZoneConverter() {
    const [fromTimezone, setFromTimezone] = useState(Intl.DateTimeFormat().resolvedOptions().timeZone);
    const [toTimezone, setToTimezone] = useState('Europe/London');
    const [date, setDate] = useState<Date | undefined>(new Date());
    const [time, setTime] = useState(format(new Date(), 'HH:mm'));

    const { convertedTime, convertedDate, fromOffset, toOffset } = useMemo(() => {
        if (!date) return { convertedTime: '', convertedDate: 'Invalid Date', fromOffset: '', toOffset: '' };
        
        try {
            const timeParts = time.split(':');
            const hours = parseInt(timeParts[0], 10);
            const minutes = parseInt(timeParts[1], 10);

            if (isNaN(hours) || isNaN(minutes)) return { convertedTime: '', convertedDate: 'Invalid Time', fromOffset: '', toOffset: '' };

            const fromDate = new Date(date.getFullYear(), date.getMonth(), date.getDate(), hours, minutes);
            const utcDate = fromZonedTime(fromDate, fromTimezone);
            const toDate = toZonedTime(utcDate, toTimezone);
            
            const fromOffsetString = formatInTimeZone(fromDate, fromTimezone, 'xxx');
            const toOffsetString = formatInTimeZone(toDate, toTimezone, 'xxx');

            return {
                convertedDate: format(toDate, 'EEEE, MMMM d, yyyy'),
                convertedTime: format(toDate, 'HH:mm'),
                fromOffset: `(UTC${fromOffsetString})`,
                toOffset: `(UTC${toOffsetString})`,
            };

        } catch (e) {
            console.error(e);
            return { convertedTime: '', convertedDate: 'Error', fromOffset: '', toOffset: '' };
        }
    }, [date, time, fromTimezone, toTimezone]);
    
    return (
        <Card>
            <CardContent className="pt-6 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr_2fr] gap-6 items-start">
                    {/* From Timezone */}
                    <div className="space-y-4 p-4 border rounded-lg">
                         <h3 className="font-semibold text-lg">From</h3>
                         <div className="space-y-2">
                            <Label>Timezone {fromOffset}</Label>
                            <TimezoneSelector value={fromTimezone} onChange={setFromTimezone} />
                        </div>
                        <div className="space-y-2">
                             <Label>Date</Label>
                             <Popover>
                                <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn("w-full justify-start text-left font-normal", !date && "text-muted-foreground")}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                <Calendar mode="single" selected={date} onSelect={setDate} initialFocus />
                                </PopoverContent>
                            </Popover>
                        </div>
                        <div className="space-y-2">
                            <Label>Time</Label>
                            <Input type="time" value={time} onChange={e => setTime(e.target.value)} />
                        </div>
                    </div>

                    {/* Arrow */}
                    <div className="flex items-center justify-center h-full pt-10">
                        <ArrowRight className="w-8 h-8 text-muted-foreground" />
                    </div>

                    {/* To Timezone */}
                     <div className="space-y-4 bg-muted/50 p-4 rounded-lg">
                         <h3 className="font-semibold text-lg">To</h3>
                         <div className="space-y-2">
                            <Label>Timezone {toOffset}</Label>
                            <TimezoneSelector value={toTimezone} onChange={setToTimezone} />
                        </div>
                        <div className="space-y-2 pt-2">
                            <p className="text-sm font-medium text-muted-foreground">{convertedDate}</p>
                            <p className="text-4xl font-bold font-mono tracking-tight">{convertedTime}</p>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
