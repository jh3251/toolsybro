
'use client';

import { useState, useEffect, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { conversionData } from '@/lib/conversion-data';
import { ArrowRightLeft } from 'lucide-react';
import { Button } from '../ui/button';

export function UnitConverter() {
  const categories = Object.keys(conversionData);
  const [category, setCategory] = useState(categories[0]);
  
  const initialUnits = Object.keys(conversionData[category].units);
  const [fromUnit, setFromUnit] = useState(initialUnits[0]);
  const [toUnit, setToUnit] = useState(initialUnits.length > 1 ? initialUnits[1] : initialUnits[0]);

  const [fromValue, setFromValue] = useState('1');
  const [toValue, setToValue] = useState('');

  const units = useMemo(() => Object.values(conversionData[category].units), [category]);

  useEffect(() => {
    const categoryUnits = Object.keys(conversionData[category].units);
    setFromUnit(categoryUnits[0]);
    setToUnit(categoryUnits.length > 1 ? categoryUnits[1] : categoryUnits[0]);
    setFromValue('1');
  }, [category]);

  const convert = (value: number, from: string, to: string, cat: string) => {
    const categoryInfo = conversionData[cat];
    if (!categoryInfo) return NaN;

    const fromUnitInfo = categoryInfo.units[from];
    const toUnitInfo = categoryInfo.units[to];
    
    if (!fromUnitInfo || !toUnitInfo) return NaN;
    
    // Special handling for temperature
    if (cat === 'temperature') {
      let kelvin;
      if (from === 'celsius') kelvin = value + 273.15;
      else if (from === 'fahrenheit') kelvin = (value - 32) * 5/9 + 273.15;
      else kelvin = value; // is kelvin

      if (to === 'celsius') return kelvin - 273.15;
      if (to === 'fahrenheit') return (kelvin - 273.15) * 9/5 + 32;
      return kelvin; // is kelvin
    }
    
    // Standard conversion
    const baseValue = value * fromUnitInfo.factor;
    return baseValue / toUnitInfo.factor;
  };

  useEffect(() => {
    const val = parseFloat(fromValue);
    if (!isNaN(val)) {
      const result = convert(val, fromUnit, toUnit, category);
      setToValue(Number.isInteger(result) ? result.toString() : result.toFixed(4));
    } else {
      setToValue('');
    }
  }, [fromValue, fromUnit, toUnit, category]);

  const handleFromValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;
    setFromValue(valStr);
    const val = parseFloat(valStr);
    if (!isNaN(val)) {
      const result = convert(val, fromUnit, toUnit, category);
      setToValue(Number.isInteger(result) ? result.toString() : result.toFixed(4));
    } else {
      setToValue('');
    }
  };

  const handleToValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const valStr = e.target.value;
    setToValue(valStr);
    const val = parseFloat(valStr);
    if (!isNaN(val)) {
      const result = convert(val, toUnit, fromUnit, category);
      setFromValue(Number.isInteger(result) ? result.toString() : result.toFixed(4));
    } else {
      setFromValue('');
    }
  };
  
  const handleSwap = () => {
    setFromUnit(toUnit);
    setToUnit(fromUnit);
    setFromValue(toValue);
    setToValue(fromValue);
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
          <Label htmlFor="category">Category</Label>
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger id="category">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              {categories.map(cat => (
                <SelectItem key={cat} value={cat}>{conversionData[cat].name}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] items-center gap-4">
            <div className="space-y-2">
                <Label>From</Label>
                <div className='flex gap-2'>
                    <Input type="number" value={fromValue} onChange={handleFromValueChange} className="flex-grow"/>
                    <Select value={fromUnit} onValueChange={setFromUnit}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                            {units.map(u => <SelectItem key={u.symbol} value={u.symbol}>{u.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>

            <Button variant="ghost" size="icon" onClick={handleSwap} className="mt-6 hidden md:inline-flex">
                <ArrowRightLeft className="w-5 h-5"/>
            </Button>
            
             <div className="space-y-2">
                <Label>To</Label>
                <div className='flex gap-2'>
                    <Input type="number" value={toValue} onChange={handleToValueChange} className="flex-grow"/>
                    <Select value={toUnit} onValueChange={setToUnit}>
                        <SelectTrigger className="w-[150px]">
                            <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                           {units.map(u => <SelectItem key={u.symbol} value={u.symbol}>{u.name}</SelectItem>)}
                        </SelectContent>
                    </Select>
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
