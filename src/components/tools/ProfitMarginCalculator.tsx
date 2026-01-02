
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function ProfitMarginCalculator() {
  const [cost, setCost] = useState('80');
  const [revenue, setRevenue] = useState('100');

  const { profitMargin, grossProfit, isValid } = useMemo(() => {
    const c = parseFloat(cost);
    const r = parseFloat(revenue);

    if (isNaN(c) || isNaN(r) || r === 0) {
      return { profitMargin: 0, grossProfit: 0, isValid: false };
    }

    const grossProfitValue = r - c;
    const profitMarginValue = (grossProfitValue / r) * 100;

    return {
      profitMargin: profitMarginValue,
      grossProfit: grossProfitValue,
      isValid: true,
    };
  }, [cost, revenue]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Your Figures</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-2">
          <Label htmlFor="revenue">Total Revenue</Label>
          <Input id="revenue" type="number" value={revenue} onChange={(e) => setRevenue(e.target.value)} placeholder="e.g., 1000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="cost">Total Cost</Label>
          <Input id="cost" type="number" value={cost} onChange={(e) => setCost(e.target.value)} placeholder="e.g., 750" />
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-6 rounded-b-lg grid grid-cols-1 md:grid-cols-2 gap-4 text-center">
        <div>
          <p className="text-sm text-muted-foreground">Gross Profit</p>
          <p className="text-2xl font-bold">{isValid ? formatCurrency(grossProfit) : '$...'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Profit Margin</p>
          <p className="text-4xl font-bold text-primary">{isValid ? profitMargin.toFixed(2) : '...'}%</p>
        </div>
      </CardFooter>
    </Card>
  );
}
