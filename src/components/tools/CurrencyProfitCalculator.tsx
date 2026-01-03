'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '../ui/button';

const formatCurrency = (value: number, currency: string) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency, minimumFractionDigits: 2, maximumFractionDigits: 4 }).format(value);
};

export function CurrencyProfitCalculator() {
  const [investAmount, setInvestAmount] = useState('1000');
  const [buyRate, setBuyRate] = useState('0.92');
  const [sellRate, setSellRate] = useState('0.95');
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [quoteCurrency, setQuoteCurrency] = useState('EUR');

  const { boughtAmount, soldForAmount, profitLoss, isValid } = useMemo(() => {
    const investment = parseFloat(investAmount);
    const buy = parseFloat(buyRate);
    const sell = parseFloat(sellRate);

    if (isNaN(investment) || isNaN(buy) || isNaN(sell) || buy <= 0 || sell <= 0) {
      return { boughtAmount: 0, soldForAmount: 0, profitLoss: 0, isValid: false };
    }

    const bought = investment * buy;
    const soldFor = bought / sell;
    const profit = soldFor - investment;
    
    return {
      boughtAmount: bought,
      soldForAmount: soldFor,
      profitLoss: profit,
      isValid: true,
    };
  }, [investAmount, buyRate, sellRate]);
  
  const profitLossColor = profitLoss >= 0 ? 'text-green-600' : 'text-red-500';

  return (
    <Card>
      <CardHeader>
        <CardTitle>Enter Transaction Details</CardTitle>
      </CardHeader>
      <CardContent className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="space-y-2">
          <Label htmlFor="invest-amount">Investment Amount</Label>
          <div className="flex items-center gap-2">
            <Input id="invest-amount" type="number" value={investAmount} onChange={(e) => setInvestAmount(e.target.value)} placeholder="e.g., 1000" />
            {/* Base currency selector could be added here */}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="buy-rate">Buy Rate (Base to Quote)</Label>
          <Input id="buy-rate" type="number" value={buyRate} onChange={(e) => setBuyRate(e.target.value)} placeholder="e.g., 0.92" />
          <p className="text-xs text-muted-foreground">1 {baseCurrency} = {buyRate} {quoteCurrency}</p>
        </div>
        <div className="space-y-2">
          <Label htmlFor="sell-rate">Sell Rate (Base to Quote)</Label>
          <Input id="sell-rate" type="number" value={sellRate} onChange={(e) => setSellRate(e.target.value)} placeholder="e.g., 0.95" />
           <p className="text-xs text-muted-foreground">1 {baseCurrency} = {sellRate} {quoteCurrency}</p>
        </div>
        <div className="space-y-2 self-end">
            <Button className='w-full'>Calculate</Button>
        </div>
      </CardContent>
      <CardFooter className="bg-muted/50 p-6 rounded-b-lg grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
        <div>
          <p className="text-sm text-muted-foreground">You Bought</p>
          <p className="text-xl font-bold">{isValid ? formatCurrency(boughtAmount, quoteCurrency) : '...'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">You Sold For</p>
          <p className="text-xl font-bold">{isValid ? formatCurrency(soldForAmount, baseCurrency) : '...'}</p>
        </div>
        <div>
          <p className="text-sm text-muted-foreground">Profit / Loss</p>
          <p className={`text-2xl font-bold ${profitLossColor}`}>{isValid ? formatCurrency(profitLoss, baseCurrency) : '...'}</p>
        </div>
      </CardFooter>
    </Card>
  );
}