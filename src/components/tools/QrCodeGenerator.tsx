
'use client';

import { useState, useMemo, ChangeEvent, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  Download,
  Link,
  Type,
  Mail,
  Wifi,
  Palette,
  Brush,
  Image as ImageIcon,
  UploadCloud,
  type LucideIcon,
  Globe,
  Phone,
  MessageSquare,
  Calendar,
  Video,
  FileText,
  Music,
  Star,
  MapPin,
  Bitcoin,
  Facebook,
  Youtube,
  Instagram,
  Linkedin,
  Github,
  Twitter,
  Twitch,
  Slack,
  Figma,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import QRCodeStyling, { type Options as QRCodeStylingOptions, type DotType, type CornerSquareType, type CornerDotType } from 'qr-code-styling';
import { QrCodeBodyStyle, QrCodeEyeFrameStyle, QrCodeEyeBallStyle } from './QrCodeStyles';
import { renderToString } from 'react-dom/server';

type QrType = 'link' | 'text' | 'email' | 'wifi';

const qrTypes = [
  { id: 'link', name: 'Link', icon: Link },
  { id: 'text', name: 'Text', icon: Type },
  { id: 'email', name: 'E-mail', icon: Mail },
  { id: 'wifi', name: 'Wi-Fi', icon: Wifi },
];

const predefinedLogos = [
  Globe, Phone, Mail, MessageSquare, Calendar, Video, FileText, Music, Star, MapPin,
  Bitcoin, Facebook, Youtube, Instagram, Linkedin, Github, Twitter, Twitch, Slack, Figma, Wifi
];

export function QrCodeGenerator() {
  const [activeTab, setActiveTab] = useState<QrType>('link');

  // Link State
  const [link, setLink] = useState('www.toolsybro.com');

  // Text State
  const [text, setText] = useState('Hello world!');

  // Email State
  const [emailTo, setEmailTo] = useState('');
  const [emailSubject, setEmailSubject] = useState('');
  const [emailBody, setEmailBody] = useState('');

  // Wi-Fi State
  const [wifiSsid, setWifiSsid] = useState('');
  const [wifiPassword, setWifiPassword] = useState('');
  const [wifiEncryption, setWifiEncryption] = useState('WPA');

  // Design State
  const [fgColor, setFgColor] = useState('#000000');
  const [bgColor, setBgColor] = useState('#ffffff');
  const [eyeFrameColor, setEyeFrameColor] = useState('');
  const [eyeBallColor, setEyeBallColor] = useState('');
  const [useMarkerColors, setUseMarkerColors] = useState(false);
  
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(0.3);
  const [removeLogoBg, setRemoveLogoBg] = useState(true);
  
  const [dotStyle, setDotStyle] = useState<DotType>('square');
  const [eyeFrameStyle, setEyeFrameStyle] = useState<CornerSquareType>('square');
  const [eyeBallStyle, setEyeBallStyle] = useState<CornerDotType>('square');
  
  const logoInputRef = useRef<HTMLInputElement>(null);
  const qrRef = useRef<HTMLDivElement>(null);
  const qrCodeInstanceRef = useRef<QRCodeStyling | null>(null);


  const qrCodeData = useMemo(() => {
    switch (activeTab) {
      case 'link': return link;
      case 'text': return text;
      case 'email': return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'wifi': return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
      default: return '';
    }
  }, [activeTab, link, text, emailTo, emailSubject, emailBody, wifiSsid, wifiPassword, wifiEncryption]);

  const qrOptions: QRCodeStylingOptions = useMemo(() => {
    const options: QRCodeStylingOptions = {
        width: 300,
        height: 300,
        type: 'svg',
        data: qrCodeData || 'https://firebasetoolbox.io',
        margin: 5,
        dotsOptions: {
            color: fgColor,
            type: dotStyle,
        },
        backgroundOptions: {
            color: bgColor,
        },
        cornersSquareOptions: {
            type: eyeFrameStyle,
            color: useMarkerColors ? eyeFrameColor || fgColor : fgColor,
        },
        cornersDotOptions: {
            type: eyeBallStyle,
            color: useMarkerColors ? eyeBallColor || fgColor : fgColor,
        },
        imageOptions: {
            hideBackgroundDots: removeLogoBg,
            imageSize: logoSize,
            margin: 4,
            crossOrigin: 'anonymous',
        },
    };
    if(logo) {
        options.image = logo;
    } else {
        // @ts-ignore
        options.image = null;
    }
    return options;
  }, [qrCodeData, fgColor, bgColor, dotStyle, eyeFrameStyle, eyeBallStyle, logo, logoSize, removeLogoBg, useMarkerColors, eyeFrameColor, eyeBallColor]);

  useEffect(() => {
    if (qrRef.current) {
        if (!qrCodeInstanceRef.current) {
            qrCodeInstanceRef.current = new QRCodeStyling(qrOptions);
            qrCodeInstanceRef.current.append(qrRef.current);
        } else {
            qrCodeInstanceRef.current.update(qrOptions);
        }
    }
  }, [qrOptions]);


  const handleDownload = () => {
    qrCodeInstanceRef.current?.download({ name: "qrcode", extension: "png"});
  };

  const handleLogoUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setLogo(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePredefinedLogoSelect = (Icon: LucideIcon) => {
    const canvas = document.createElement('canvas');
    canvas.width = 256;
    canvas.height = 256;
    const ctx = canvas.getContext('2d');
    
    if (ctx) {
        // Create an SVG string from the icon component
        // This is a simplified example. A robust solution might need a library
        // to render React components to string on the client if not using this canvas method.
        const iconElement = React.createElement(Icon, { size: 200, color: 'black' });
        const svgString = renderToString(iconElement);

        const img = new Image();
        img.onload = () => {
            // Draw a white background (or any color) if needed
            ctx.fillStyle = "white";
            ctx.fillRect(0, 0, canvas.width, canvas.height);
            // Center the image
            const x = (canvas.width - img.width) / 2;
            const y = (canvas.height - img.height) / 2;
            ctx.drawImage(img, x, y);
            setLogo(canvas.toDataURL('image/png'));
        };

        img.src = 'data:image/svg+xml;base64,' + btoa(svgString);
    }
  };
    
    const handleRemoveLogo = () => {
        setLogo(null);
        if (logoInputRef.current) {
            logoInputRef.current.value = '';
        }
    }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_400px] gap-8">
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as QrType)} className="w-full">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-transparent p-0">
                {qrTypes.slice(0, 4).map(type => (
                  <TabsTrigger
                    key={type.id}
                    value={type.id}
                    className="flex-col h-20 gap-2 border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
                  >
                    <type.icon className="w-6 h-6" />
                    <span className="text-sm font-semibold">{type.name}</span>
                  </TabsTrigger>
                ))}
              </TabsList>

              <TabsContent value="link" className="pt-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-link" className="text-base">Your URL</Label>
                  <Input id="qr-link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://example.com" />
                </div>
              </TabsContent>
              <TabsContent value="text" className="pt-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-text" className="text-base">Your Text</Label>
                  <Input id="qr-text" value={text} onChange={(e) => setText(e.target.value)} placeholder="Enter your text" />
                </div>
              </TabsContent>
              <TabsContent value="email" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-email-to" className="text-base">To Email</Label>
                  <Input id="qr-email-to" type="email" value={emailTo} onChange={(e) => setEmailTo(e.target.value)} placeholder="recipient@example.com" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qr-email-subject" className="text-base">Subject</Label>
                  <Input id="qr-email-subject" value={emailSubject} onChange={(e) => setEmailSubject(e.target.value)} placeholder="Email subject" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qr-email-body" className="text-base">Body</Label>
                  <Input id="qr-email-body" value={emailBody} onChange={(e) => setEmailBody(e.target.value)} placeholder="Email body text" />
                </div>
              </TabsContent>
              <TabsContent value="wifi" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-wifi-ssid" className="text-base">Network Name (SSID)</Label>
                  <Input id="qr-wifi-ssid" value={wifiSsid} onChange={(e) => setWifiSsid(e.target.value)} placeholder="Your Wi-Fi Name" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qr-wifi-password" className="text-base">Password</Label>
                  <Input id="qr-wifi-password" value={wifiPassword} onChange={(e) => setWifiPassword(e.target.value)} placeholder="Your Wi-Fi Password" />
                </div>
              </TabsContent>
            </Tabs>

            
          </div>
          <div className="flex flex-col items-center justify-start space-y-4">
              <div className='p-4 bg-muted/50 rounded-lg'>
                 <div ref={qrRef} />
              </div>
              <Button onClick={handleDownload} disabled={!qrCodeData} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>
               <Accordion type="multiple" className="w-full">
              <AccordionItem value="colors">
                <AccordionTrigger className='font-semibold'><Palette className="mr-2" />Colors</AccordionTrigger>
                <AccordionContent>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div>
                      <Label htmlFor="fg-color">Foreground</Label>
                      <Input id="fg-color" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="mt-1 h-10 p-1" />
                    </div>
                    <div>
                      <Label htmlFor="bg-color">Background</Label>
                      <Input id="bg-color" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="mt-1 h-10 p-1" />
                    </div>
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="design">
                <AccordionTrigger className='font-semibold'><Brush className="mr-2" />Design</AccordionTrigger>
                <AccordionContent>
                   <div className="pt-2 space-y-4">
                    <div>
                        <Label>Body Style</Label>
                        <QrCodeBodyStyle selected={dotStyle} onSelect={setDotStyle} />
                    </div>
                     <div>
                        <Label>Eye Frame Style</Label>
                        <QrCodeEyeFrameStyle selected={eyeFrameStyle} onSelect={setEyeFrameStyle} />
                    </div>
                     <div>
                        <Label>Eye Ball Style</Label>
                         <QrCodeEyeBallStyle selected={eyeBallStyle} onSelect={setEyeBallStyle} />
                    </div>
                    <div className="flex items-center justify-between">
                         <Label htmlFor="marker-colors">Separate Eye Colors</Label>
                        <Switch id="marker-colors" checked={useMarkerColors} onCheckedChange={setUseMarkerColors} />
                    </div>
                    {useMarkerColors && (
                        <div className="grid grid-cols-2 gap-4">
                            <div>
                                <Label htmlFor="eyef-color">Eye Frame</Label>
                                <Input id="eyef-color" type="color" value={eyeFrameColor} onChange={(e) => setEyeFrameColor(e.target.value)} className="mt-1 h-10 p-1" />
                            </div>
                            <div>
                                <Label htmlFor="eyeb-color">Eye Ball</Label>
                                <Input id="eyeb-color" type="color" value={eyeBallColor} onChange={(e) => setEyeBallColor(e.target.value)} className="mt-1 h-10 p-1" />
                            </div>
                        </div>
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="logo">
                <AccordionTrigger className='font-semibold'><ImageIcon className="mr-2" />Logo</AccordionTrigger>
                <AccordionContent>
                  <div className="pt-2 space-y-4">
                    <Label>Upload your image or choose from below</Label>
                    <div
                      className="flex flex-col items-center justify-center p-4 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
                      onClick={() => logoInputRef.current?.click()}
                    >
                      <UploadCloud className="w-8 h-8 text-muted-foreground" />
                      <Input
                        ref={logoInputRef}
                        type="file"
                        className="hidden"
                        accept="image/png, image/jpeg, image/svg+xml"
                        onChange={handleLogoUpload}
                      />
                    </div>
                    
                    <div className="grid grid-cols-6 sm:grid-cols-8 gap-2">
                        {predefinedLogos.map((Icon, index) => (
                            <Button key={index} variant="outline" size="icon" onClick={() => handlePredefinedLogoSelect(Icon)} className="h-12 w-12">
                                <Icon className="w-6 h-6"/>
                            </Button>
                        ))}
                    </div>

                    <div className="flex items-center justify-between">
                         <Label htmlFor="remove-logo-bg">Remove logo background</Label>
                        <Switch id="remove-logo-bg" checked={removeLogoBg} onCheckedChange={setRemoveLogoBg} />
                    </div>

                     <div className="space-y-2">
                        <Label>Logo Size</Label>
                        <Slider value={[logoSize]} onValueChange={(v) => setLogoSize(v[0])} min={0.1} max={0.5} step={0.05} />
                    </div>

                    {logo && <Button variant="link" size="sm" className="w-full text-destructive" onClick={handleRemoveLogo}>Remove Logo</Button>}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
