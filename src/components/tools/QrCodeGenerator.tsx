
'use client';

import { useState, useMemo, ChangeEvent, useRef, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
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
  Square,
  Image as ImageIcon,
  UploadCloud,
  X,
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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';

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
  const [link, setLink] = useState('https://firebasetoolbox.io');

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
  const [eyeColor, setEyeColor] = useState('#000000');
  const [logo, setLogo] = useState<string | null>(null);
  const [logoSize, setLogoSize] = useState(0.3); // 30% of QR code size
  const [removeLogoBg, setRemoveLogoBg] = useState(true);
  const [dotStyle, setDotStyle] = useState('square');
  const logoInputRef = useRef<HTMLInputElement>(null);

  const qrCodeData = useMemo(() => {
    switch (activeTab) {
      case 'link':
        return link;
      case 'text':
        return text;
      case 'email':
        return `mailto:${emailTo}?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
      case 'wifi':
        return `WIFI:T:${wifiEncryption};S:${wifiSsid};P:${wifiPassword};;`;
      default:
        return '';
    }
  }, [activeTab, link, text, emailTo, emailSubject, emailBody, wifiSsid, wifiPassword, wifiEncryption]);
  
   const qrCodeUrl = useMemo(() => {
    if (!qrCodeData) return '';
    
    // Using goqr.me API which is simple and doesn't require keys for basic use
    const params = new URLSearchParams({
        data: qrCodeData,
        size: '300x300',
        color: fgColor.substring(1),
        bgcolor: bgColor.substring(1),
        qzone: '1',
        format: 'png',
    });

    return `https://api.qrserver.com/v1/create-qr-code/?${params.toString()}`;
  }, [qrCodeData, fgColor, bgColor]);


  const handleDownload = () => {
    if (!qrCodeUrl) return;
    // Since we are using an external service that directly provides an image,
    // we can create a link and simulate a click to download it.
    const link = document.createElement('a');
    link.href = qrCodeUrl;
    link.download = 'qrcode.png';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
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
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${(new Icon()).props.children}</svg>`;
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
                  <div className="space-y-4 pt-2">
                    <div>
                      <Label>Dot Style (API Dependent)</Label>
                      <p className="text-xs text-muted-foreground">Note: This is a visual placeholder. The free API may not support custom dot styles.</p>
                      <div className="flex gap-2 mt-1">
                        <Button variant={dotStyle === 'square' ? 'secondary' : 'outline'} onClick={() => setDotStyle('square')}>Square</Button>
                        <Button variant={dotStyle === 'dots' ? 'secondary' : 'outline'} onClick={() => setDotStyle('dots')}>Dots</Button>
                      </div>
                    </div>
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
            {qrCodeData ? (
              <div className="relative">
                <Image
                  src={qrCodeUrl}
                  alt="Generated QR Code"
                  width={300}
                  height={300}
                  className="rounded-md shadow-md"
                  unoptimized // Needed for external dynamic images
                />
                {logo && (
                  <div
                    className="absolute inset-0 flex items-center justify-center pointer-events-none"
                    style={{
                      width: `${logoSize * 100}%`,
                      height: `${logoSize * 100}%`,
                      margin: 'auto',
                    }}
                  >
                    <div className={cn('relative w-full h-full', removeLogoBg && 'bg-white p-1 rounded-sm flex items-center justify-center')}>
                        <Image src={logo} alt="logo" layout="fill" objectFit="contain" />
                    </div>
                  </div>
                )}
              </div>
            ) : (
              <div className="w-[300px] h-[300px] flex items-center justify-center text-muted-foreground text-center border-2 border-dashed rounded-lg">
                Enter content to generate a QR code.
              </div>
            )}
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
