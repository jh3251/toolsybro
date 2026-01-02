
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

export function LoanCalculator() {
  const [principal, setPrincipal] = useState('100000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');
  const [compounding, setCompounding] = useState('12'); // Monthly

  const { monthlyPayment, totalPayment, totalInterest } = useMemo(() => {
    const p = parseFloat(principal);
    const annualRate = parseFloat(rate) / 100;
    const n = parseInt(compounding, 10);
    const t = parseFloat(years);

    if (isNaN(p) || isNaN(annualRate) || isNaN(n) || isNaN(t) || p <= 0 || annualRate <= 0 || t <= 0) {
      return { monthlyPayment: 0, totalPayment: 0, totalInterest: 0 };
    }

    const ratePerPeriod = annualRate / n;
    const numberOfPayments = n * t;
    
    // Using standard loan amortization formula for periodic payment
    const payment = p * (ratePerPeriod * Math.pow(1 + ratePerPeriod, numberOfPayments)) / (Math.pow(1 + ratePerPeriod, numberOfPayments) - 1);
    
    // Assuming payments are made as frequently as compounding
    const totalPaid = payment * numberOfPayments;
    const interestPaid = totalPaid - p;

    // Monthly payment might be different if compounding is not monthly
    const monthlyPaymentValue = (totalPaid / t) / 12;

    return {
      monthlyPayment: monthlyPaymentValue,
      totalPayment: totalPaid,
      totalInterest: interestPaid,
    };
  }, [principal, rate, years, compounding]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Loan Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="principal">Loan Amount</Label>
          <Input id="principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} placeholder="e.g., 100000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rate">Annual Interest Rate (%)</Label>
          <Input id="rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 5" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="years">Loan Term (Years)</Label>
          <Input id="years" type="number" value={years} onChange={(e) => setYears(e.target.value)} placeholder="e.g., 10" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="compounding">Compounding Frequency</Label>
          <Select value={compounding} onValueChange={setCompounding}>
            <SelectTrigger id="compounding">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="1">Annually</SelectItem>
              <SelectItem value="2">Semi-Annually</SelectItem>
              <SelectItem value="4">Quarterly</SelectItem>
              <SelectItem value="12">Monthly</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-6 rounded-b-lg grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-muted-foreground">Approx. Monthly Payment</p>
          <p className="text-2xl font-bold text-primary">{formatCurrency(monthlyPayment)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Interest</p>
          <p className="text-2xl font-bold">{formatCurrency(totalInterest)}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Payment</p>
          <p className="text-2xl font-bold">{formatCurrency(totalPayment)}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
