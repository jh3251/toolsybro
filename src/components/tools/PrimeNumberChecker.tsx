
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { CheckCircle2, XCircle, Calculator } from 'lucide-react';

const isPrime = (num: number): boolean => {
  if (num <= 1) return false;
  if (num <= 3) return true;
  if (num % 2 === 0 || num % 3 === 0) return false;
  for (let i = 5; i * i <= num; i = i + 6) {
    if (num % i === 0 || num % (i + 2) === 0) return false;
  }
  return true;
};

export function PrimeNumberChecker() {
  const [numberInput, setNumberInput] = useState('7');
  const [submittedNumber, setSubmittedNumber] = useState<number | null>(7);

  const result = useMemo(() => {
    if (submittedNumber === null) return null;

    const num = Math.floor(submittedNumber);
    if (isNaN(num) || num < 0) {
        return { isPrime: false, message: 'Please enter a non-negative integer.'};
    }
    
    const primeStatus = isPrime(num);

    if (primeStatus) {
        return { isPrime: true, message: `${num} is a prime number.`};
    } else {
         if (num <= 1) {
            return { isPrime: false, message: `${num} is not a prime number.`};
         }
         let smallestDivisor = 2;
         if (num % 2 === 0) {
             smallestDivisor = 2;
         } else {
            for (let i = 3; i * i <= num; i = i + 2) {
                if (num % i === 0) {
                    smallestDivisor = i;
                    break;
                }
            }
         }
        return { isPrime: false, message: `${num} is not a prime number. It is divisible by ${smallestDivisor}.`};
    }

  }, [submittedNumber]);
  
  const handleCheck = () => {
    const num = parseFloat(numberInput);
    if (!isNaN(num)) {
        setSubmittedNumber(num);
    } else {
        setSubmittedNumber(null);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Check for Primality</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="flex flex-col sm:flex-row items-end gap-4">
            <div className="space-y-2 flex-grow">
                <Label htmlFor="number-input">Enter a number</Label>
                <Input
                id="number-input"
                type="number"
                value={numberInput}
                onChange={(e) => setNumberInput(e.target.value)}
                placeholder="e.g., 29"
                />
            </div>
            <Button onClick={handleCheck} className="w-full sm:w-auto">
                <Calculator className="mr-2 h-4 w-4" /> Check
            </Button>
        </div>

        {result && (
            <Alert variant={result.isPrime ? 'default' : 'destructive'} className="mt-6">
                {result.isPrime ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
                <AlertTitle>{result.isPrime ? 'Prime!' : 'Not Prime'}</AlertTitle>
                <AlertDescription>{result.message}</AlertDescription>
            </Alert>
        )}
      </CardContent>
    </Card>
  );
}
