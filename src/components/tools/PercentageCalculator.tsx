
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ArrowDown, ArrowUp } from 'lucide-react';

function Calculator1() {
    const [percent, setPercent] = useState('15');
    const [value, setValue] = useState('200');

    const result = useMemo(() => {
        const p = parseFloat(percent);
        const v = parseFloat(value);
        if (isNaN(p) || isNaN(v)) return '...';
        return ((p / 100) * v).toLocaleString();
    }, [percent, value]);

    return (
        <div className="space-y-4">
            <div className='flex items-center gap-4'>
                <div className='space-y-2 flex-1'>
                    <Label htmlFor="c1-percent">What is</Label>
                    <Input id="c1-percent" type="number" value={percent} onChange={(e) => setPercent(e.target.value)} placeholder="e.g., 15" />
                </div>
                 <span className='pt-8 text-lg font-bold'>%</span>
                 <div className='space-y-2 flex-1'>
                    <Label htmlFor="c1-value">of</Label>
                    <Input id="c1-value" type="number" value={value} onChange={(e) => setValue(e.target.value)} placeholder="e.g., 200" />
                </div>
            </div>
            <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-4xl font-bold">{result}</p>
            </div>
        </div>
    )
}

function Calculator2() {
    const [part, setPart] = useState('30');
    const [total, setTotal] = useState('200');

     const result = useMemo(() => {
        const p = parseFloat(part);
        const t = parseFloat(total);
        if (isNaN(p) || isNaN(t) || t === 0) return '...';
        return ((p / t) * 100).toLocaleString(undefined, { maximumFractionDigits: 2 });
    }, [part, total]);
    
    return (
         <div className="space-y-4">
            <div className='flex items-center gap-4'>
                <div className='space-y-2 flex-1'>
                    <Label htmlFor="c2-part">This value</Label>
                    <Input id="c2-part" type="number" value={part} onChange={(e) => setPart(e.target.value)} placeholder="e.g., 30" />
                </div>
                 <div className='space-y-2 flex-1'>
                    <Label htmlFor="c2-total">is what percent of</Label>
                    <Input id="c2-total" type="number" value={total} onChange={(e) => setTotal(e.target.value)} placeholder="e.g., 200" />
                </div>
            </div>
            <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Result</p>
                <p className="text-4xl font-bold">{result}%</p>
            </div>
        </div>
    )
}

function Calculator3() {
    const [from, setFrom] = useState('100');
    const [to, setTo] = useState('150');

    const { change, isIncrease } = useMemo(() => {
        const f = parseFloat(from);
        const t = parseFloat(to);
        if (isNaN(f) || isNaN(t) || f === 0) return { change: '...', isIncrease: true };
        const result = ((t - f) / f) * 100;
        return { change: result.toLocaleString(undefined, { maximumFractionDigits: 2 }), isIncrease: result >= 0 };
    }, [from, to]);

    return (
         <div className="space-y-4">
            <div className='flex items-center gap-4'>
                <div className='space-y-2 flex-1'>
                    <Label htmlFor="c3-from">From</Label>
                    <Input id="c3-from" type="number" value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Initial value" />
                </div>
                 <div className='space-y-2 flex-1'>
                    <Label htmlFor="c3-to">To</Label>
                    <Input id="c3-to" type="number" value={to} onChange={(e) => setTo(e.target.value)} placeholder="Final value" />
                </div>
            </div>
            <div className="p-6 bg-muted rounded-lg text-center">
                <p className="text-sm text-muted-foreground">Percentage Change</p>
                <p className={`text-4xl font-bold flex items-center justify-center gap-2 ${isIncrease ? 'text-green-600' : 'text-red-500'}`}>
                    {isIncrease ? <ArrowUp/> : <ArrowDown/>}
                    {change}%
                </p>
            </div>
        </div>
    )
}

export function PercentageCalculator() {
  return (
    <Card>
      <CardContent className="pt-6">
        <Tabs defaultValue="calc1" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="calc1">X% of Y</TabsTrigger>
                <TabsTrigger value="calc2">X is what % of Y</TabsTrigger>
                <TabsTrigger value="calc3">Change</TabsTrigger>
            </TabsList>
            <TabsContent value="calc1" className='pt-6'><Calculator1 /></TabsContent>
            <TabsContent value="calc2" className='pt-6'><Calculator2 /></TabsContent>
            <TabsContent value="calc3" className='pt-6'><Calculator3 /></TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
}
