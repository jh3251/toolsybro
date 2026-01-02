
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';

function SimpleInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [time, setTime] = useState('5');
  const [timeUnit, setTimeUnit] = useState<'years' | 'months'>('years');

  const { interest, totalAmount } = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    let t = parseFloat(time);

    if (isNaN(p) || isNaN(r) || isNaN(t)) {
      return { interest: 0, totalAmount: 0 };
    }

    if (timeUnit === 'months') {
      t = t / 12; // convert months to years
    }
    
    const interestValue = p * r * t;
    const totalAmountValue = p + interestValue;

    return { interest: interestValue, totalAmount: totalAmountValue };
  }, [principal, rate, time, timeUnit]);

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="si-principal">Principal Amount</Label>
            <Input id="si-principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </div>
         <div className="space-y-2">
            <Label htmlFor="si-rate">Annual Rate of Interest (%)</Label>
            <Input id="si-rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="si-time">Time Period</Label>
            <Input id="si-time" type="number" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="si-time-unit">Time Unit</Label>
             <Select value={timeUnit} onValueChange={(v: any) => setTimeUnit(v)}>
                <SelectTrigger id="si-time-unit"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="years">Years</SelectItem>
                    <SelectItem value="months">Months</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>
       <div className="pt-4 text-center grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-2xl font-bold">{interest.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-primary">{totalAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
            </div>
      </div>
    </div>
  )
}

function CompoundInterestCalculator() {
  const [principal, setPrincipal] = useState('10000');
  const [rate, setRate] = useState('5');
  const [time, setTime] = useState('5');
  const [compounding, setCompounding] = useState('12'); // Monthly

  const { interest, totalAmount } = useMemo(() => {
    const p = parseFloat(principal);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(time);
    const n = parseInt(compounding, 10);

    if (isNaN(p) || isNaN(r) || isNaN(t) || isNaN(n)) {
      return { interest: 0, totalAmount: 0 };
    }
    
    const amount = p * Math.pow(1 + r / n, n * t);
    const interestValue = amount - p;

    return { interest: interestValue, totalAmount: amount };
  }, [principal, rate, time, compounding]);

  return (
     <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="ci-principal">Principal Amount</Label>
            <Input id="ci-principal" type="number" value={principal} onChange={(e) => setPrincipal(e.target.value)} />
        </div>
         <div className="space-y-2">
            <Label htmlFor="ci-rate">Annual Rate of Interest (%)</Label>
            <Input id="ci-rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div className="space-y-2">
            <Label htmlFor="ci-time">Time Period (Years)</Label>
            <Input id="ci-time" type="number" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div className="space-y-2">
            <Label htmlFor="ci-compound">Compounding Frequency</Label>
             <Select value={compounding} onValueChange={(v: any) => setCompounding(v)}>
                <SelectTrigger id="ci-compound"><SelectValue /></SelectTrigger>
                <SelectContent>
                    <SelectItem value="1">Annually</SelectItem>
                    <SelectItem value="2">Semi-Annually</SelectItem>
                    <SelectItem value="4">Quarterly</SelectItem>
                    <SelectItem value="12">Monthly</SelectItem>
                    <SelectItem value="365">Daily</SelectItem>
                </SelectContent>
            </Select>
        </div>
      </div>
      <div className="pt-4 text-center grid grid-cols-2 gap-4">
            <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Interest</p>
                <p className="text-2xl font-bold">{interest.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
            </div>
            <div className="p-4 bg-muted rounded-lg">
                <p className="text-sm text-muted-foreground">Total Amount</p>
                <p className="text-2xl font-bold text-primary">{totalAmount.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}</p>
            </div>
      </div>
    </div>
  )
}

export function InterestCalculator() {
  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="simple" className="w-full">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="simple">Simple Interest</TabsTrigger>
            <TabsTrigger value="compound">Compound Interest</TabsTrigger>
          </TabsList>
          <TabsContent value="simple" className="pt-6">
            <SimpleInterestCalculator />
          </TabsContent>
          <TabsContent value="compound" className="pt-6">
            <CompoundInterestCalculator />
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
