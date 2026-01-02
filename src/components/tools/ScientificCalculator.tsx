
'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

const CalculatorButton = ({
  onClick,
  label,
  className,
}: {
  onClick: () => void;
  label: string | React.ReactNode;
  className?: string;
}) => (
  <Button
    variant="outline"
    className={`h-16 text-xl font-bold ${className}`}
    onClick={onClick}
  >
    {label}
  </Button>
);

export function ScientificCalculator() {
  const [display, setDisplay] = useState('0');
  const [expression, setExpression] = useState('');

  const handleInput = (value: string) => {
    if (display === '0' && value !== '.') {
      setDisplay(value);
      setExpression(value);
    } else {
      setDisplay(display + value);
      setExpression(expression + value);
    }
  };
  
  const handleOperator = (operator: string) => {
    // Avoid adding multiple operators in a row
    const lastChar = expression.slice(-1);
    if (['+', '-', '*', '/'].includes(lastChar)) {
        setExpression(expression.slice(0,-1) + operator);
    } else {
        setExpression(expression + operator);
    }
    setDisplay('0');
  };

  const handleFunction = (func: string) => {
     try {
        const currentVal = parseFloat(display);
        if (isNaN(currentVal)) return;

        let result;
        switch(func) {
            case 'sqrt': result = Math.sqrt(currentVal); break;
            case 'sin': result = Math.sin(currentVal * Math.PI / 180); break;
            case 'cos': result = Math.cos(currentVal * Math.PI / 180); break;
            case 'tan': result = Math.tan(currentVal * Math.PI / 180); break;
            case 'log': result = Math.log10(currentVal); break;
            case 'ln': result = Math.log(currentVal); break;
            case 'x2': result = Math.pow(currentVal, 2); break;
            case '1/x': result = 1 / currentVal; break;
            case '+/-': result = currentVal * -1; break;
            default: return;
        }
        
        const resultString = String(result);
        setDisplay(resultString);
        
        // This part is tricky: we want to replace the last number with the result
        const lastNumRegex = /[\d.]+$/;
        setExpression(expression.replace(lastNumRegex, resultString));

     } catch (e) {
         setDisplay('Error');
         setExpression('');
     }
  }

  const handleEquals = () => {
    try {
      // Using Function constructor for safe evaluation of math expressions
      const result = new Function('return ' + expression)();
      setDisplay(String(result));
      setExpression(String(result));
    } catch (e) {
      setDisplay('Error');
      setExpression('');
    }
  };

  const handleClear = () => {
    setDisplay('0');
    setExpression('');
  };
  
  const handleBackspace = () => {
    if (display.length > 1) {
        setDisplay(display.slice(0, -1));
        setExpression(expression.slice(0, -1));
    } else {
        setDisplay('0');
        setExpression('');
    }
  }

  const buttons = [
    { label: '√', action: () => handleFunction('sqrt'), className: 'bg-muted hover:bg-muted/80' },
    { label: 'x²', action: () => handleFunction('x2'), className: 'bg-muted hover:bg-muted/80' },
    { label: 'sin', action: () => handleFunction('sin'), className: 'bg-muted hover:bg-muted/80' },
    { label: 'cos', action: () => handleFunction('cos'), className: 'bg-muted hover:bg-muted/80' },
    { label: 'tan', action: () => handleFunction('tan'), className: 'bg-muted hover:bg-muted/80' },
    
    { label: 'C', action: handleClear, className: 'bg-destructive/80 text-destructive-foreground hover:bg-destructive' },
    { label: '⌫', action: handleBackspace, className: 'bg-muted hover:bg-muted/80' },
    { label: 'log', action: () => handleFunction('log'), className: 'bg-muted hover:bg-muted/80' },
    { label: 'ln', action: () => handleFunction('ln'), className: 'bg-muted hover:bg-muted/80' },
    { label: '÷', action: () => handleOperator('/'), className: 'bg-primary/80 text-primary-foreground hover:bg-primary' },

    { label: '7', action: () => handleInput('7') },
    { label: '8', action: () => handleInput('8') },
    { label: '9', action: () => handleInput('9') },
    { label: '1/x', action: () => handleFunction('1/x'), className: 'bg-muted hover:bg-muted/80' },
    { label: '×', action: () => handleOperator('*'), className: 'bg-primary/80 text-primary-foreground hover:bg-primary' },

    { label: '4', action: () => handleInput('4') },
    { label: '5', action: () => handleInput('5') },
    { label: '6', action: () => handleInput('6') },
    { label: '( )', action: () => {}, className: 'bg-muted hover:bg-muted/80' }, // Placeholder
    { label: '−', action: () => handleOperator('-'), className: 'bg-primary/80 text-primary-foreground hover:bg-primary' },
    
    { label: '1', action: () => handleInput('1') },
    { label: '2', action: () => handleInput('2') },
    { label: '3', action: () => handleInput('3') },
    { label: '+/-', action: () => handleFunction('+/-'), className: 'bg-muted hover:bg-muted/80' },
    { label: '+', action: () => handleOperator('+'), className: 'bg-primary/80 text-primary-foreground hover:bg-primary' },

    { label: '0', action: () => handleInput('0'), className: 'col-span-2' },
    { label: '.', action: () => handleInput('.') },
    { label: '=', action: handleEquals, className: 'col-span-2 bg-accent text-accent-foreground hover:bg-accent/90' },
  ];

  return (
    <Card className="max-w-2xl mx-auto">
      <CardContent className="p-4 space-y-4">
        <div className="bg-muted rounded-lg p-4 text-right space-y-1">
            <p className="text-sm text-muted-foreground truncate h-6">{expression || ' '}</p>
            <Input
                readOnly
                value={display}
                className="h-16 text-5xl font-bold text-right border-none bg-transparent p-0 shadow-none focus-visible:ring-0"
            />
        </div>
        <div className="grid grid-cols-5 gap-2">
          {buttons.map((btn, i) => (
            <CalculatorButton
              key={i}
              onClick={btn.action}
              label={btn.label}
              className={btn.className}
            />
          ))}
        </div>
      </CardContent>
    </Card>
  );
}

