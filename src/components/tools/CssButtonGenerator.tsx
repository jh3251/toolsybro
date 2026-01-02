'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Input } from '@/components/ui/input';
import { useToast } from '@/hooks/use-toast';
import { Copy } from 'lucide-react';
import { Separator } from '../ui/separator';

export function CssButtonGenerator() {
  const [paddingX, setPaddingX] = useState(24);
  const [paddingY, setPaddingY] = useState(12);
  const [borderRadius, setBorderRadius] = useState(8);
  const [fontSize, setFontSize] = useState(16);
  const [fontWeight, setFontWeight] = useState(500);

  const [backgroundColor, setBackgroundColor] = useState('#6366f1');
  const [textColor, setTextColor] = useState('#ffffff');
  const [hoverBackgroundColor, setHoverBackgroundColor] = useState('#4f46e5');
  const [hoverTextColor, setHoverTextColor] = useState('#ffffff');
  
  const [shadowHOffset, setShadowHOffset] = useState(0);
  const [shadowVOffset, setShadowVOffset] = useState(4);
  const [shadowBlur, setShadowBlur] = useState(8);
  const [shadowColor, setShadowColor] = useState('#000000');
  const [shadowOpacity, setShadowOpacity] = useState(0.1);

  const { toast } = useToast();

  const hexToRgba = (hex: string, alpha: number) => {
    const r = parseInt(hex.slice(1, 3), 16);
    const g = parseInt(hex.slice(3, 5), 16);
    const b = parseInt(hex.slice(5, 7), 16);
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  };
  
  const shadowCss = `${shadowHOffset}px ${shadowVOffset}px ${shadowBlur}px ${hexToRgba(shadowColor, shadowOpacity)}`;

  const buttonStyle: React.CSSProperties = {
    padding: `${paddingY}px ${paddingX}px`,
    borderRadius: `${borderRadius}px`,
    fontSize: `${fontSize}px`,
    fontWeight: fontWeight,
    backgroundColor: backgroundColor,
    color: textColor,
    border: 'none',
    boxShadow: shadowCss,
    cursor: 'pointer',
    transition: 'background-color 0.2s, color 0.2s',
  };
  
  const cssCode = `
.custom-btn {
  padding: ${paddingY}px ${paddingX}px;
  border-radius: ${borderRadius}px;
  font-size: ${fontSize}px;
  font-weight: ${fontWeight};
  background-color: ${backgroundColor};
  color: ${textColor};
  border: none;
  box-shadow: ${shadowCss};
  cursor: pointer;
  transition: background-color 0.2s, color 0.2s;
}

.custom-btn:hover {
  background-color: ${hoverBackgroundColor};
  color: ${hoverTextColor};
}
  `.trim();

  const handleCopy = () => {
    navigator.clipboard.writeText(cssCode);
    toast({ title: 'Copied to clipboard!', description: "CSS code for the button has been copied." });
  };

  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-4">
            <div className="flex items-center justify-center bg-muted/50 p-8 rounded-lg min-h-[150px]">
                <button style={buttonStyle} onMouseOver={e => {
                    e.currentTarget.style.backgroundColor = hoverBackgroundColor;
                    e.currentTarget.style.color = hoverTextColor;
                }} onMouseOut={e => {
                    e.currentTarget.style.backgroundColor = backgroundColor;
                    e.currentTarget.style.color = textColor;
                }}>
                    Custom Button
                </button>
            </div>
            
            <div className="space-y-2">
                <Label>Generated CSS</Label>
                <div className="relative">
                    <pre className="h-48 overflow-auto rounded-md border bg-muted p-4 text-xs font-mono">
                        <code>{cssCode}</code>
                    </pre>
                    <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-8 w-8" onClick={handleCopy}>
                        <Copy className="h-4 w-4"/>
                    </Button>
                </div>
            </div>
        </div>
        <div className="space-y-4">
            <h3 className="font-semibold text-lg">Sizing & Spacing</h3>
            <div className='grid grid-cols-2 gap-4'>
                 <div className="space-y-2">
                    <Label>Padding X: {paddingX}px</Label>
                    <Slider value={[paddingX]} onValueChange={v => setPaddingX(v[0])} max={50} />
                </div>
                 <div className="space-y-2">
                    <Label>Padding Y: {paddingY}px</Label>
                    <Slider value={[paddingY]} onValueChange={v => setPaddingY(v[0])} max={30} />
                </div>
                 <div className="space-y-2">
                    <Label>Border Radius: {borderRadius}px</Label>
                    <Slider value={[borderRadius]} onValueChange={v => setBorderRadius(v[0])} max={50} />
                </div>
            </div>
            <Separator />
            <h3 className="font-semibold text-lg">Typography</h3>
            <div className='grid grid-cols-2 gap-4'>
                 <div className="space-y-2">
                    <Label>Font Size: {fontSize}px</Label>
                    <Slider value={[fontSize]} onValueChange={v => setFontSize(v[0])} min={12} max={32} />
                </div>
                 <div className="space-y-2">
                    <Label>Font Weight: {fontWeight}</Label>
                    <Slider value={[fontWeight]} onValueChange={v => setFontWeight(v[0])} min={100} max={900} step={100}/>
                </div>
            </div>
             <Separator />
            <h3 className="font-semibold text-lg">Colors</h3>
            <div className='grid grid-cols-2 gap-4'>
                 <div className="space-y-2">
                    <Label>Background</Label>
                    <Input type="color" value={backgroundColor} onChange={e => setBackgroundColor(e.target.value)} className="p-1" />
                </div>
                 <div className="space-y-2">
                    <Label>Text</Label>
                    <Input type="color" value={textColor} onChange={e => setTextColor(e.target.value)} className="p-1" />
                </div>
                  <div className="space-y-2">
                    <Label>Hover Background</Label>
                    <Input type="color" value={hoverBackgroundColor} onChange={e => setHoverBackgroundColor(e.target.value)} className="p-1" />
                </div>
                 <div className="space-y-2">
                    <Label>Hover Text</Label>
                    <Input type="color" value={hoverTextColor} onChange={e => setHoverTextColor(e.target.value)} className="p-1" />
                </div>
            </div>
             <Separator />
             <h3 className="font-semibold text-lg">Shadow</h3>
            <div className='grid grid-cols-2 gap-4'>
                <div className="space-y-2">
                    <Label>H-Offset: {shadowHOffset}px</Label>
                    <Slider value={[shadowHOffset]} onValueChange={v => setShadowHOffset(v[0])} min={-20} max={20} />
                </div>
                <div className="space-y-2">
                    <Label>V-Offset: {shadowVOffset}px</Label>
                    <Slider value={[shadowVOffset]} onValueChange={v => setShadowVOffset(v[0])} min={-20} max={20} />
                </div>
                <div className="space-y-2">
                    <Label>Blur: {shadowBlur}px</Label>
                    <Slider value={[shadowBlur]} onValueChange={v => setShadowBlur(v[0])} min={0} max={40} />
                </div>
                <div className="space-y-2">
                    <Label>Opacity: {shadowOpacity}</Label>
                    <Slider value={[shadowOpacity]} onValueChange={v => setShadowOpacity(v[0])} min={0} max={1} step={0.05} />
                </div>
                 <div className="space-y-2 col-span-2">
                    <Label>Shadow Color</Label>
                    <Input type="color" value={shadowColor} onChange={e => setShadowColor(e.target.value)} className="p-1 w-full" />
                </div>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
