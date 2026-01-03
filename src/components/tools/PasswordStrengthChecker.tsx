
'use client';
import * as React from 'react';
import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Progress } from '@/components/ui/progress';
import { CheckCircle2, XCircle, Eye, EyeOff } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '../ui/button';

interface Strength {
  score: number;
  label: string;
  color: string;
}

const Requirement = ({ met, text }: { met: boolean; text: string }) => (
  <div className={cn("flex items-center gap-2 text-sm", met ? 'text-green-600' : 'text-muted-foreground')}>
    {met ? <CheckCircle2 className="h-4 w-4" /> : <XCircle className="h-4 w-4" />}
    <span>{text}</span>
  </div>
);

export function PasswordStrengthChecker() {
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const { strength, checks } = useMemo(() => {
    let score = 0;
    
    const hasLength8 = password.length >= 8;
    const hasLength12 = password.length >= 12;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumber = /[0-9]/.test(password);
    const hasSymbol = /[^A-Za-z0-9]/.test(password);
    
    if (hasLength8) score++;
    if (hasLength12) score++;
    if (hasUppercase) score++;
    if (hasLowercase) score++;
    if (hasNumber) score++;
    if (hasSymbol) score++;

    let strength: Strength;
    if (password.length === 0) {
        strength = { score: 0, label: 'Enter a password', color: 'bg-gray-400' };
    } else if (score <= 2) {
        strength = { score: (score / 6) * 100, label: 'Weak', color: 'bg-red-500' };
    } else if (score <= 4) {
        strength = { score: (score / 6) * 100, label: 'Medium', color: 'bg-yellow-500' };
    } else {
        strength = { score: (score / 6) * 100, label: 'Strong', color: 'bg-green-500' };
    }
    
    return {
      strength,
      checks: { hasLength8, hasUppercase, hasLowercase, hasNumber, hasSymbol }
    };
  }, [password]);

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div className="space-y-2">
            <Label htmlFor="password-input">Enter Password</Label>
            <div className="relative">
                <Input
                    id="password-input"
                    type={showPassword ? 'text' : 'password'}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Type to check password strength"
                    className="pr-10"
                />
                 <Button
                    size="icon"
                    variant="ghost"
                    className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                    onClick={() => setShowPassword(!showPassword)}
                 >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    <span className="sr-only">{showPassword ? 'Hide' : 'Show'} password</span>
                </Button>
            </div>
        </div>

        <div>
            <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Strength</p>
                <p className={cn("text-sm font-bold",
                    strength.label === 'Weak' && 'text-red-500',
                    strength.label === 'Medium' && 'text-yellow-500',
                    strength.label === 'Strong' && 'text-green-500'
                )}>
                    {strength.label}
                </p>
            </div>
            <Progress value={strength.score} className="h-2 [&>div]:bg-gray-400" indicatorClassName={strength.color} />
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-3 pt-4">
            <Requirement met={checks.hasLength8} text="At least 8 characters" />
            <Requirement met={checks.hasUppercase} text="Contains an uppercase letter" />
            <Requirement met={checks.hasLowercase} text="Contains a lowercase letter" />
            <Requirement met={checks.hasNumber} text="Contains a number" />
            <Requirement met={checks.hasSymbol} text="Contains a symbol" />
        </div>
      </CardContent>
    </Card>
  );
}

// Custom Progress component to allow indicator color override
const ProgressIndicator = React.forwardRef<
  React.ElementRef<typeof Progress>,
  React.ComponentPropsWithoutRef<typeof Progress> & { indicatorClassName?: string }
>(({ className, value, indicatorClassName, ...props }, ref) => (
  <ProgressPrimitive.Root
    ref={ref}
    className={cn(
      "relative h-4 w-full overflow-hidden rounded-full bg-secondary",
      className
    )}
    {...props}
  >
    <ProgressPrimitive.Indicator
      className={cn("h-full w-full flex-1 bg-primary transition-all", indicatorClassName)}
      style={{ transform: `translateX(-${100 - (value || 0)}%)` }}
    />
  </ProgressPrimitive.Root>
))
ProgressIndicator.displayName = 'ProgressIndicator'

// Redefine ProgressPrimitive locally to avoid import issues
const ProgressPrimitive = {
    Root: React.forwardRef<
        React.ElementRef<typeof Progress>,
        React.ComponentPropsWithoutRef<typeof Progress>
    >(({ className, value, ...props }, ref) => (
         // @ts-ignore
        <div ref={ref} className={cn("relative h-4 w-full overflow-hidden rounded-full bg-secondary", className)} {...props}>
             {/* @ts-ignore */}
            <div className="h-full w-full flex-1 bg-primary transition-all" style={{ transform: `translateX(-${100 - (value || 0)}%)` }} />
        </div>
    )),
    Indicator: React.forwardRef<
        HTMLDivElement,
        React.HTMLAttributes<HTMLDivElement>
    >(({ className, ...props }, ref) => (
        <div ref={ref} className={cn("h-full w-full flex-1 bg-primary transition-all", className)} {...props} />
    )),
};
