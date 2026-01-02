
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { format } from 'date-fns';

export function EmiCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [rate, setRate] = useState(8.5);
  const [tenure, setTenure] = useState(5); // in years

  const { emi, totalPayable, totalInterest } = useMemo(() => {
    const p = principal;
    const r = rate / 12 / 100; // monthly rate of interest
    const n = tenure * 12; // number of months

    if (p > 0 && r > 0 && n > 0) {
      const emiValue = (p * r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1);
      const totalPayableValue = emiValue * n;
      const totalInterestValue = totalPayableValue - p;
      return {
        emi: emiValue,
        totalPayable: totalPayableValue,
        totalInterest: totalInterestValue,
      };
    }
    return { emi: 0, totalPayable: 0, totalInterest: 0 };
  }, [principal, rate, tenure]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        <div className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="principal">Loan Amount: {formatCurrency(principal)}</Label>
            <Slider
              id="principal"
              value={[principal]}
              onValueChange={(v) => setPrincipal(v[0])}
              min={1000}
              max={10000000}
              step={1000}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Interest Rate: {rate.toFixed(2)}%</Label>
            <Slider
              id="rate"
              value={[rate]}
              onValueChange={(v) => setRate(v[0])}
              min={1}
              max={20}
              step={0.05}
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="tenure">Tenure: {tenure} years</Label>
            <Slider
              id="tenure"
              value={[tenure]}
              onValueChange={(v) => setTenure(v[0])}
              min={1}
              max={30}
              step={1}
            />
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-6 rounded-b-lg grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-muted-foreground">Monthly EMI</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(emi)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Interest</p>
          <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Payable</p>
          <p className="text-2xl font-bold">{formatCurrency(totalPayable)}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
