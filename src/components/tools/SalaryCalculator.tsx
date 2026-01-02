
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';

const formatCurrency = (value: number) => {
    if (isNaN(value)) return '$0.00';
    return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

const PayPeriodCard = ({ title, value }: { title: string, value: number }) => (
    <div className="p-4 bg-muted/50 rounded-lg text-center">
        <p className="text-sm text-muted-foreground">{title}</p>
        <p className="text-2xl font-bold">{formatCurrency(value)}</p>
    </div>
);


export function SalaryCalculator() {
  const [annualSalary, setAnnualSalary] = useState('75000');
  const [deductionType, setDeductionType] = useState<'percent' | 'fixed'>('percent');
  const [deductionValue, setDeductionValue] = useState('22');

  const { gross, net, deductions, isValid } = useMemo(() => {
    const salary = parseFloat(annualSalary);
    if (isNaN(salary) || salary < 0) {
      return { gross: { annual: 0, monthly: 0, weekly: 0, daily: 0 }, net: { annual: 0, monthly: 0, weekly: 0, daily: 0 }, deductions: 0, isValid: false };
    }

    const grossPay = {
        annual: salary,
        monthly: salary / 12,
        weekly: salary / 52,
        daily: salary / 260, // Assuming 5 workdays/week
    };

    let totalDeductions = 0;
    const dedValue = parseFloat(deductionValue);
    if (!isNaN(dedValue) && dedValue >= 0) {
        if (deductionType === 'percent') {
            totalDeductions = salary * (dedValue / 100);
        } else {
            totalDeductions = dedValue;
        }
    }
    
    const netSalary = salary - totalDeductions;
    const netPay = {
        annual: netSalary,
        monthly: netSalary / 12,
        weekly: netSalary / 52,
        daily: netSalary / 260,
    };

    return { gross: grossPay, net: netPay, deductions: totalDeductions, isValid: true };
  }, [annualSalary, deductionType, deductionValue]);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Your Salary & Deductions</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
                <Label htmlFor="annual-salary">Gross Annual Salary</Label>
                <Input id="annual-salary" type="number" value={annualSalary} onChange={(e) => setAnnualSalary(e.target.value)} placeholder="e.g., 75000" />
            </div>
            <div className="space-y-2">
                <Label>Estimated Deductions (Taxes, etc.)</Label>
                <div className='flex gap-2'>
                    <Input type="number" value={deductionValue} onChange={(e) => setDeductionValue(e.target.value)} />
                    <RadioGroup value={deductionType} onValueChange={(v: any) => setDeductionType(v)} className="flex items-center gap-4">
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="percent" id="percent" />
                            <Label htmlFor="percent">%</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                            <RadioGroupItem value="fixed" id="fixed" />
                            <Label htmlFor="fixed">$</Label>
                        </div>
                    </RadioGroup>
                </div>
            </div>
        </div>

        <div className="space-y-4 pt-4">
            <h3 className="text-xl font-semibold">Gross Pay Breakdown</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <PayPeriodCard title="Annual" value={gross.annual} />
                <PayPeriodCard title="Monthly" value={gross.monthly} />
                <PayPeriodCard title="Weekly" value={gross.weekly} />
                <PayPeriodCard title="Daily" value={gross.daily} />
            </div>
        </div>
        
      </CardContent>
      <CardFooter className="bg-muted/50 p-6 rounded-b-lg flex flex-col items-center space-y-4">
         <h3 className="text-xl font-semibold text-primary">Estimated Take-Home Pay (Net)</h3>
         <div className="w-full grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
            <PayPeriodCard title="Annual" value={net.annual} />
            <PayPeriodCard title="Monthly" value={net.monthly} />
            <PayPeriodCard title="Weekly" value={net.weekly} />
            <PayPeriodCard title="Daily" value={net.daily} />
         </div>
      </CardFooter>
    </Card>
  );
}
