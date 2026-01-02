
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { AlertCircle, CheckCircle2, Info } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from '../ui/alert';

export function AttendanceCalculator() {
  const [requiredPercentage, setRequiredPercentage] = useState('75');
  const [classesHeld, setClassesHeld] = useState('20');
  const [classesAttended, setClassesAttended] = useState('15');

  const {
    currentPercentage,
    neededClasses,
    canMiss,
    isSafe,
    message
  } = useMemo(() => {
    const req = parseFloat(requiredPercentage);
    const held = parseInt(classesHeld, 10);
    const attended = parseInt(classesAttended, 10);

    if (isNaN(req) || isNaN(held) || isNaN(attended) || held <= 0 || attended > held) {
      return { currentPercentage: 0, neededClasses: 0, canMiss: 0, isSafe: false, message: 'Please enter valid numbers.' };
    }

    const currentPerc = (attended / held) * 100;
    
    if (currentPerc >= req) {
      // User is safe, calculate how many more classes they can miss
      let safeToMiss = 0;
      let tempHeld = held;
      let tempAttended = attended;
      while (((tempAttended / (tempHeld + 1)) * 100) >= req) {
        safeToMiss++;
        tempHeld++;
      }
       return {
        currentPercentage: currentPerc,
        neededClasses: 0,
        canMiss: safeToMiss,
        isSafe: true,
        message: `You can miss the next ${safeToMiss} classes and still be safe.`
      };

    } else {
      // User is not safe, calculate how many classes they must attend
      let mustAttend = 0;
      let tempHeld = held;
      let tempAttended = attended;
      while (((tempAttended + mustAttend) / (tempHeld + mustAttend)) * 100 < req) {
        mustAttend++;
        if (mustAttend > held * 2) { // safety break for impossible scenarios
            return {
                currentPercentage: currentPerc,
                neededClasses: 0,
                canMiss: 0,
                isSafe: false,
                message: 'It is mathematically impossible to reach the required percentage.'
            };
        }
      }
       return {
        currentPercentage: currentPerc,
        neededClasses: mustAttend,
        canMiss: 0,
        isSafe: false,
        message: `You need to attend the next ${mustAttend} classes to be safe.`
      };
    }
  }, [requiredPercentage, classesHeld, classesAttended]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Attendance Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="space-y-2">
            <Label htmlFor="req">Required Attendance (%)</Label>
            <Input id="req" type="number" value={requiredPercentage} onChange={(e) => setRequiredPercentage(e.target.value)} placeholder="e.g., 75" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="held">Total Classes Held</Label>
            <Input id="held" type="number" value={classesHeld} onChange={(e) => setClassesHeld(e.target.value)} placeholder="e.g., 20" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="attended">Classes You Attended</Label>
            <Input id="attended" type="number" value={classesAttended} onChange={(e) => setClassesAttended(e.target.value)} placeholder="e.g., 15" />
          </div>
        </div>

        {message && (
             <Alert variant={message.startsWith('Please') || message.startsWith('It is') ? 'destructive' : (isSafe ? 'default' : 'destructive')}>
                {isSafe ? <CheckCircle2 className="h-4 w-4" /> : <AlertCircle className="h-4 w-4" />}
                <AlertTitle>{isSafe ? "You're Safe!" : "You're in the Danger Zone!"}</AlertTitle>
                <AlertDescription>
                    {message}
                </AlertDescription>
            </Alert>
        )}
      </CardContent>
      <CardFooter className='bg-muted/50 p-6 rounded-b-lg'>
          <div className="w-full text-center">
            <p className='text-sm text-muted-foreground'>Your Current Attendance</p>
            <p className={`text-5xl font-bold ${isSafe ? 'text-primary' : 'text-destructive'}`}>
                {currentPercentage.toFixed(2)}%
            </p>
          </div>
      </CardFooter>
    </Card>
  );
}
