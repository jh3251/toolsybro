
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
  LucideIcon,
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
  const [link, setLink] = useState('www.yoursite.com');

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

  useEffect(() => {
    if (qrRef.current) {
      qrCodeInstanceRef.current = new QRCodeStyling({
        width: 300,
        height: 300,
        type: 'svg',
        data: qrCodeData || 'https://firebasetoolbox.io',
        margin: 5,
      });
      qrCodeInstanceRef.current.append(qrRef.current);
    }
  }, []);

  useEffect(() => {
    if (qrCodeInstanceRef.current) {
        const options: QRCodeStylingOptions = {
            data: qrCodeData,
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
            },
        };
        if(logo) options.image = logo;

      qrCodeInstanceRef.current.update(options);
    }
  }, [qrCodeData, fgColor, bgColor, dotStyle, eyeFrameStyle, eyeBallStyle, logo, logoSize, removeLogoBg, useMarkerColors, eyeFrameColor, eyeBallColor]);


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
        const tempDiv = document.createElement('div');
        tempDiv.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${(Icon as any)().props.children.map((child: any) => child.props.d ? `<path d="${child.props.d}" />` : '').join('')}</svg>`;
        const svgString = tempDiv.innerHTML;
        const dataUrl = `data:image/svg+xml;base64,${btoa(svgString)}`;
        setLogo(dataUrl);
    }

  return (
    <Card>
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as QrType)} className="w-full">
              <TabsList className="grid grid-cols-2 sm:grid-cols-4 gap-2 bg-transparent p-0">
                {qrTypes.slice(0, 4).map(type => (
                  <TabsTrigger
                    key={type.id}
                    value={type.id}
                    className="flex-col h-16 gap-1 border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
                  >
                    <type.icon className="w-5 h-5" />
                    <span className="text-xs">{type.name}</span>
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
                        <Label>Body (Modello)</Label>
                        <QrCodeBodyStyle selected={dotStyle} onSelect={setDotStyle} />
                    </div>
                     <div>
                        <Label>Eye Frame (Bordo)</Label>
                        <QrCodeEyeFrameStyle selected={eyeFrameStyle} onSelect={setEyeFrameStyle} />
                    </div>
                     <div>
                        <Label>Eye Ball (Centro)</Label>
                         <QrCodeEyeBallStyle selected={eyeBallStyle} onSelect={setEyeBallStyle} />
                    </div>
                    <div className="flex items-center justify-between">
                         <Label htmlFor="marker-colors">Marker Colors (Colori)</Label>
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

                    {logo && <Button variant="link" size="sm" className="w-full text-destructive" onClick={() => setLogo(null)}>Remove Logo</Button>}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 bg-muted/50 p-4 rounded-lg sticky top-24">
              <div ref={qrRef} />
              <Button onClick={handleDownload} disabled={!qrCodeData} className="w-full">
                <Download className="mr-2 h-4 w-4" />
                Download QR Code
              </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
