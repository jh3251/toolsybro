
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { ArrowRightLeft, Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const API_URL = 'https://api.frankfurter.app';

export function CurrencyConverter() {
  const [amount1, setAmount1] = useState('1');
  const [amount2, setAmount2] = useState('');
  const [currency1, setCurrency1] = useState('USD');
  const [currency2, setCurrency2] = useState('EUR');
  const [currencies, setCurrencies] = useState<string[]>([]);
  const [rates, setRates] = useState<Record<string, number>>({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const { toast } = useToast();

  useEffect(() => {
    async function fetchData() {
      try {
        const res = await fetch(`${API_URL}/currencies`);
        const data = await res.json();
        setCurrencies(Object.keys(data));
      } catch (e) {
        setError('Failed to fetch currency list.');
        toast({ title: 'Error', description: 'Could not load currency list.', variant: 'destructive'});
      }
    }
    fetchData();
  }, [toast]);
  
  useEffect(() => {
    if (!currency1 || currencies.length === 0) return;
    
    async function fetchRates() {
        setIsLoading(true);
        try {
            const res = await fetch(`${API_URL}/latest?from=${currency1}`);
            const data = await res.json();
            setRates(data.rates);
            setError('');
        } catch(e) {
            setError(`Failed to fetch exchange rates for ${currency1}.`);
            toast({ title: 'Error', description: `Could not load rates for ${currency1}.`, variant: 'destructive'});
        } finally {
            setIsLoading(false);
        }
    }
    fetchRates();
  }, [currency1, currencies.length, toast]);

  useEffect(() => {
    if (rates[currency2]) {
        const val1 = parseFloat(amount1);
        if (!isNaN(val1)) {
            const result = val1 * rates[currency2];
            setAmount2(result.toFixed(4));
        } else {
            setAmount2('');
        }
    }
  }, [amount1, currency2, rates]);


  function handleAmount1Change(e: React.ChangeEvent<HTMLInputElement>) {
    setAmount1(e.target.value);
  }

  function handleAmount2Change(e: React.ChangeEvent<HTMLInputElement>) {
    const val2 = parseFloat(e.target.value);
    setAmount2(e.target.value);
    if (!isNaN(val2) && rates[currency2]) {
        const result = val2 / rates[currency2];
        setAmount1(result.toFixed(4));
    } else {
        setAmount1('');
    }
  }

  function handleCurrency1Change(value: string) {
    setCurrency1(value);
  }

  function handleCurrency2Change(value: string) {
    setCurrency2(value);
  }
  
  function handleSwap() {
    setCurrency1(currency2);
    setCurrency2(currency1);
  }
  
  const exchangeRate = useMemo(() => {
      if(rates[currency2]) {
          return `1 ${currency1} = ${rates[currency2].toFixed(4)} ${currency2}`;
      }
      return 'Loading rate...';
  }, [rates, currency1, currency2]);

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        {error && <p className="text-destructive text-center">{error}</p>}
        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-end gap-4">
          <div className="space-y-2">
            <Label htmlFor="amount1">From</Label>
            <div className="flex gap-2">
              <Input id="amount1" type="number" value={amount1} onChange={handleAmount1Change} disabled={isLoading} />
              <Select value={currency1} onValueChange={handleCurrency1Change} disabled={isLoading}>
                <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                <SelectContent>
                  {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                </SelectContent>
              </Select>
            </div>
          </div>
          
          <Button variant="ghost" size="icon" onClick={handleSwap} disabled={isLoading}>
            <ArrowRightLeft className="w-5 h-5" />
          </Button>

          <div className="space-y-2">
            <Label htmlFor="amount2">To</Label>
             <div className="flex gap-2">
                <Input id="amount2" type="number" value={amount2} onChange={handleAmount2Change} disabled={isLoading || !rates[currency2]} />
                 <Select value={currency2} onValueChange={handleCurrency2Change} disabled={isLoading}>
                    <SelectTrigger className="w-[120px]"><SelectValue /></SelectTrigger>
                    <SelectContent>
                    {currencies.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
          </div>
        </div>

        <div className="text-center text-muted-foreground font-medium relative h-6">
            {isLoading ? (
                <div className="flex items-center justify-center gap-2">
                    <Loader2 className="w-4 h-4 animate-spin"/>
                    <span>Fetching latest rates...</span>
                </div>
            ) : (
                <p>{exchangeRate}</p>
            )}
        </div>
      </CardContent>
    </Card>
  );
}
