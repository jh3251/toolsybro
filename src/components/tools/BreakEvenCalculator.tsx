'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

export function BreakEvenCalculator() {
  const [fixedCosts, setFixedCosts] = useState('5000');
  const [variableCost, setVariableCost] = useState('15');
  const [pricePerUnit, setPricePerUnit] = useState('40');

  const { breakEvenUnits, contributionMargin, isValid, errorMessage } = useMemo(() => {
    const fc = parseFloat(fixedCosts);
    const vc = parseFloat(variableCost);
    const p = parseFloat(pricePerUnit);

    if (isNaN(fc) || isNaN(vc) || isNaN(p)) {
      return { breakEvenUnits: 0, contributionMargin: 0, isValid: false, errorMessage: 'Please enter valid numbers.' };
    }
    
    const contributionMarginValue = p - vc;

    if (contributionMarginValue <= 0) {
      return { 
        breakEvenUnits: 0, 
        contributionMargin: contributionMarginValue, 
        isValid: false, 
        errorMessage: 'Selling price must be greater than the variable cost per unit.' 
      };
    }

    const breakEvenUnitsValue = fc / contributionMarginValue;

    return {
      breakEvenUnits: breakEvenUnitsValue,
      contributionMargin: contributionMarginValue,
      isValid: true,
      errorMessage: '',
    };
  }, [fixedCosts, variableCost, pricePerUnit]);

  const formatCurrency = (value: number) => {
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
  };
  
  const formatNumber = (value: number) => {
      if (value === Infinity || !Number.isFinite(value)) return 'N/A';
      return Math.ceil(value).toLocaleString();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Your Costs & Price</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="space-y-2">
          <Label htmlFor="fixed-costs">Total Fixed Costs</Label>
          <Input id="fixed-costs" type="number" value={fixedCosts} onChange={(e) => setFixedCosts(e.target.value)} placeholder="e.g., 5000" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="variable-cost">Variable Cost Per Unit</Label>
          <Input id="variable-cost" type="number" value={variableCost} onChange={(e) => setVariableCost(e.target.value)} placeholder="e.g., 15" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="price">Selling Price Per Unit</Label>
          <Input id="price" type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} placeholder="e.g., 40" />
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-6 rounded-b-lg">
          <div className="w-full text-center">
             {isValid ? (
                 <>
                    <p className="text-sm text-muted-foreground">You need to sell</p>
                    <p className="text-5xl font-bold text-primary">{formatNumber(breakEvenUnits)} units</p>
                    <p className="text-sm text-muted-foreground">to break even.</p>
                 </>
             ) : (
                <p className='text-destructive text-center font-medium'>{errorMessage}</p>
             )}
          </div>
      </CardFooter>
    </Card>
  );
}
