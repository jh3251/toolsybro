
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Calendar } from '@/components/ui/calendar';
import { Calendar as CalendarIcon, PartyPopper, Gift, Telescope, Users, Heart, Hourglass, Moon, Sun } from 'lucide-react';
import { cn } from '@/lib/utils';
import { format, differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, differenceInHours, differenceInMinutes, addYears, subDays, addMonths, addDays, isFuture } from 'date-fns';

const StatCard = ({ icon: Icon, title, value, unit }: { icon: React.ElementType; title: string; value: string | number; unit: string }) => (
    <div className="flex flex-col items-center justify-center space-y-2 rounded-lg bg-muted/50 p-4 text-center h-full">
        <Icon className="h-8 w-8 text-primary" />
        <div>
            <p className="text-sm font-semibold text-muted-foreground">{title}</p>
            <p className="text-2xl font-bold">{value} <span className="text-lg font-medium">{unit}</span></p>
        </div>
    </div>
);


export function AgeCalculator() {
    const [dateOfBirth, setDateOfBirth] = useState<Date | undefined>(new Date(2000, 0, 1));
    const [isCalendarOpen, setIsCalendarOpen] = useState(false);

    const ageDetails = useMemo(() => {
        if (!dateOfBirth || isFuture(dateOfBirth)) return null;

        const now = new Date();
        
        let years = differenceInYears(now, dateOfBirth);
        let months = differenceInMonths(now, addYears(dateOfBirth, years));
        let days = differenceInDays(now, addMonths(addYears(dateOfBirth, years), months));

        if (days < 0) {
            const prevMonth = subDays(addMonths(addYears(dateOfBirth, years), months), 1);
            days = differenceInDays(now, prevMonth);
            months--;
            if (months < 0) {
                months = 11;
                years--;
            }
        }
        
        const totalMonths = differenceInMonths(now, dateOfBirth);
        const totalWeeks = differenceInWeeks(now, dateOfBirth);
        const totalDays = differenceInDays(now, dateOfBirth);
        const totalHours = differenceInHours(now, dateOfBirth);
        const totalMinutes = differenceInMinutes(now, dateOfBirth);

        let nextBirthday = addYears(dateOfBirth, years);
        if (isFuture(nextBirthday)) {
            // Birthday hasn't happened this year
        } else {
            nextBirthday = addYears(nextBirthday, 1);
        }
        const daysToNextBirthday = differenceInDays(nextBirthday, now);
        
        return {
            years,
            months,
            days,
            totalMonths,
            totalWeeks,
            totalDays,
            totalHours,
            totalMinutes,
            nextBirthday: format(nextBirthday, 'EEEE, MMMM do'),
            daysToNextBirthday,
        };

    }, [dateOfBirth]);

    return (
        <Card>
            <CardContent className="pt-6 space-y-8">
                <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                     <p className="text-lg font-medium">Your Date of Birth:</p>
                     <Popover open={isCalendarOpen} onOpenChange={setIsCalendarOpen}>
                        <PopoverTrigger asChild>
                        <Button
                            variant={"outline"}
                            className={cn("w-[280px] justify-start text-left font-normal", !dateOfBirth && "text-muted-foreground")}
                        >
                            <CalendarIcon className="mr-2 h-4 w-4" />
                            {dateOfBirth ? format(dateOfBirth, "PPP") : <span>Pick a date</span>}
                        </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                        <Calendar
                            mode="single"
                            selected={dateOfBirth}
                            onSelect={setDateOfBirth}
                            initialFocus
                        />
                         <div className="p-2 border-t flex justify-between">
                            <Button variant="ghost" onClick={() => { setDateOfBirth(new Date()); setIsCalendarOpen(false); }}>Today</Button>
                            <Button variant="ghost" onClick={() => { setDateOfBirth(undefined); setIsCalendarOpen(false); }}>Clear</Button>
                        </div>
                        </PopoverContent>
                    </Popover>
                </div>
                
                {ageDetails ? (
                    <div className="space-y-6">
                        <Card className="bg-primary/10">
                            <CardHeader>
                                <CardTitle className="text-center text-primary text-2xl">You Are</CardTitle>
                            </CardHeader>
                             <CardContent className="flex justify-center items-baseline gap-4 text-center">
                                <div className="text-center">
                                    <p className="text-5xl font-extrabold">{ageDetails.years}</p>
                                    <p className="text-muted-foreground">Years</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-5xl font-extrabold">{ageDetails.months}</p>
                                    <p className="text-muted-foreground">Months</p>
                                </div>
                                <div className="text-center">
                                    <p className="text-5xl font-extrabold">{ageDetails.days}</p>
                                    <p className="text-muted-foreground">Days</p>
                                </div>
                            </CardContent>
                        </Card>
                        
                         <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
                            <StatCard icon={Gift} title="Next Birthday" value={ageDetails.daysToNextBirthday} unit="days" />
                            <StatCard icon={Moon} title="Total Months" value={ageDetails.totalMonths.toLocaleString()} unit="months" />
                            <StatCard icon={Sun} title="Total Days" value={ageDetails.totalDays.toLocaleString()} unit="days" />
                            <StatCard icon={Hourglass} title="Total Hours" value={ageDetails.totalHours.toLocaleString()} unit="hours" />
                        </div>
                    </div>
                ) : (
                    <div className="text-center text-muted-foreground py-10">
                        {dateOfBirth && isFuture(dateOfBirth) ? "Please select a date in the past." : "Select your date of birth to calculate your age."}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
