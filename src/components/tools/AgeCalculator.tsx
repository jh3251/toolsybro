
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Gift, Moon, Sun, Hourglass } from 'lucide-react';
import { format, differenceInYears, differenceInMonths, differenceInDays, differenceInWeeks, differenceInHours, differenceInMinutes, addYears, subDays, addMonths, isFuture } from 'date-fns';

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
    const [dateOfBirth, setDateOfBirth] = useState<string>('2000-01-01');

    const ageDetails = useMemo(() => {
        if (!dateOfBirth) return null;

        // Ensure the date string is interpreted correctly as local time, not UTC
        const dob = new Date(dateOfBirth + 'T00:00:00');
        
        if (isNaN(dob.getTime()) || isFuture(dob)) return null;

        const now = new Date();
        
        let years = differenceInYears(now, dob);
        let months = differenceInMonths(now, addYears(dob, years));
        let days = differenceInDays(now, addMonths(addYears(dob, years), months));

        if (days < 0) {
            const prevMonthDate = addMonths(addYears(dob, years), months - 1);
            days = differenceInDays(now, prevMonthDate);
            months--;
            if (months < 0) {
                months = 11;
                years--;
            }
        }
        
        const totalMonths = differenceInMonths(now, dob);
        const totalWeeks = differenceInWeeks(now, dob);
        const totalDays = differenceInDays(now, dob);
        const totalHours = differenceInHours(now, dob);
        const totalMinutes = differenceInMinutes(now, dob);

        let nextBirthday = new Date(now.getFullYear(), dob.getMonth(), dob.getDate());
        if (now > nextBirthday) {
            nextBirthday.setFullYear(now.getFullYear() + 1);
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
                     <Input
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        className="w-[280px]"
                     />
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
                        {dateOfBirth && new Date(dateOfBirth) > new Date() ? "Please select a date in the past." : "Select your date of birth to calculate your age."}
                    </div>
                )}
            </CardContent>
        </Card>
    );
}
