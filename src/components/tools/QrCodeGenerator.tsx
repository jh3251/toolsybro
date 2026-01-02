'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Download } from 'lucide-react';

export function QrCodeGenerator() {
  const [text, setText] = useState('https://firebasetoolbox.io');
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');

  const qrCodeUrl = useMemo(() => {
    if (!text) return '';
    const encodedText = encodeURIComponent(text);
    const formattedFgColor = fgColor.substring(1); // remove #
    const formattedBgColor = bgColor.substring(1); // remove #
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedText}&size=300x300&color=${formattedFgColor}&bgcolor=${formattedBgColor}&qzone=1`;
  }, [text, fgColor, bgColor]);
  
  const handleDownload = () => {
    if (!qrCodeUrl) return;
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <div>
              <Label htmlFor="qr-text" className="text-lg">Text or URL</Label>
              <Input
                id="qr-text"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Enter text or URL to encode"
                className="mt-2"
              />
            </div>
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <Label htmlFor="fg-color">Foreground Color</Label>
                    <Input
                        id="fg-color"
                        type="color"
                        value={fgColor}
                        onChange={(e) => setFgColor(e.target.value)}
                        className="mt-2 h-12 p-1"
                    />
                </div>
                <div>
                    <Label htmlFor="bg-color">Background Color</Label>
                    <Input
                        id="bg-color"
                        type="color"
                        value={bgColor}
                        onChange={(e) => setBgColor(e.target.value)}
                        className="mt-2 h-12 p-1"
                    />
                </div>
            </div>
             <Button onClick={handleDownload} disabled={!text} className="w-full bg-accent text-accent-foreground hover:bg-accent/90">
              <Download className="mr-2 h-4 w-4" />
              Download QR Code
            </Button>
          </div>
          <div className="flex flex-col items-center justify-center bg-muted/50 p-4 rounded-lg">
            {text ? (
              <Image
                src={qrCodeUrl}
                alt="Generated QR Code"
                width={300}
                height={300}
                className="rounded-md shadow-md"
                unoptimized // External image
              />
            ) : (
              <div className="w-[300px] h-[300px] flex items-center justify-center text-muted-foreground text-center">
                Enter text to generate a QR code.
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
