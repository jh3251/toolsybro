'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

export function GstVatCalculator() {
  const [amount, setAmount] = useState('1000');
  const [rate, setRate] = useState('18');
  const [calculationType, setCalculationType] = useState<'add' | 'remove'>('add');

  const { baseAmount, taxAmount, totalAmount, isValid } = useMemo(() => {
    const initialAmount = parseFloat(amount);
    const taxRate = parseFloat(rate) / 100;

    if (isNaN(initialAmount) || isNaN(taxRate)) {
      return { baseAmount: 0, taxAmount: 0, totalAmount: 0, isValid: false };
    }

    if (calculationType === 'add') {
      const base = initialAmount;
      const tax = initialAmount * taxRate;
      const total = base + tax;
      return { baseAmount: base, taxAmount: tax, totalAmount: total, isValid: true };
    } else { // 'remove'
      const total = initialAmount;
      const base = initialAmount / (1 + taxRate);
      const tax = total - base;
      return { baseAmount: base, taxAmount: tax, totalAmount: total, isValid: true };
    }
  }, [amount, rate, calculationType]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>GST / VAT Details</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <Label htmlFor="amount">Amount</Label>
            <Input id="amount" type="number" value={amount} onChange={(e) => setAmount(e.target.value)} placeholder="e.g., 1000" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="rate">Tax Rate (%)</Label>
            <Input id="rate" type="number" value={rate} onChange={(e) => setRate(e.target.value)} placeholder="e.g., 18" />
          </div>
        </div>
        <RadioGroup value={calculationType} onValueChange={(v: any) => setCalculationType(v)} className="flex gap-4">
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="add" id="add" />
                <Label htmlFor="add">Add GST/VAT</Label>
            </div>
            <div className="flex items-center space-x-2">
                <RadioGroupItem value="remove" id="remove" />
                <Label htmlFor="remove">Remove GST/VAT</Label>
            </div>
        </RadioGroup>
      </CardContent>
      <CardFooter className="bg-muted/50 p-6 rounded-b-lg grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-muted-foreground">Base Amount</p>
          <p className="text-xl font-bold">{isValid ? formatCurrency(baseAmount) : '...'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">GST/VAT Amount</p>
          <p className="text-xl font-bold">{isValid ? formatCurrency(taxAmount) : '...'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Total Amount</p>
          <p className="text-2xl font-bold text-primary">{isValid ? formatCurrency(totalAmount) : '...'}</p>
        </div>
      </CardFooter>
    </Card>
  );
}
