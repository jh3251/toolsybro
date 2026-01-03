'use client';

import * as React from 'react';
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
  User,
} from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '../ui/slider';
import { Switch } from '../ui/switch';
import QRCodeStyling, { type Options as QRCodeStylingOptions, type DotType, type CornerSquareType, type CornerDotType } from 'qr-code-styling';
import { QrCodeBodyStyle, QrCodeEyeFrameStyle, QrCodeEyeBallStyle } from './QrCodeStyles';
import { Textarea } from '../ui/textarea';

type QrType = 'link' | 'text' | 'email' | 'wifi' | 'phone' | 'sms' | 'location' | 'vcard';

const qrTypes: {id: QrType, name: string, icon: LucideIcon}[] = [
  { id: 'link', name: 'Link', icon: Link },
  { id: 'text', name: 'Text', icon: Type },
  { id: 'email', name: 'E-mail', icon: Mail },
  { id: 'wifi', name: 'Wi-Fi', icon: Wifi },
  { id: 'phone', name: 'Phone', icon: Phone },
  { id: 'sms', name: 'SMS', icon: MessageSquare },
  { id: 'location', name: 'Location', icon: MapPin },
  { id: 'vcard', name: 'V-Card', icon: User },
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

  // Phone State
  const [phoneNumber, setPhoneNumber] = useState('');

  // SMS State
  const [smsTo, setSmsTo] = useState('');
  const [smsBody, setSmsBody] = useState('');

  // Location State
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');

  // V-Card State
  const [vcardFirstName, setVcardFirstName] = useState('');
  const [vcardLastName, setVcardLastName] = useState('');
  const [vcardOrg, setVcardOrg] = useState('');
  const [vcardTitle, setVcardTitle] = useState('');
  const [vcardTel, setVcardTel] = useState('');
  const [vcardEmail, setVcardEmail] = useState('');
  const [vcardWebsite, setVcardWebsite] = useState('');
  const [vcardAddress, setVcardAddress] = useState('');


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
      case 'phone': return `tel:${phoneNumber}`;
      case 'sms': return `smsto:${smsTo}:${smsBody}`;
      case 'location': return `geo:${latitude},${longitude}`;
      case 'vcard': 
        return `BEGIN:VCARD\nVERSION:3.0\nN:${vcardLastName};${vcardFirstName}\nFN:${vcardFirstName} ${vcardLastName}\nORG:${vcardOrg}\nTITLE:${vcardTitle}\nTEL;TYPE=WORK,VOICE:${vcardTel}\nEMAIL:${vcardEmail}\nURL:${vcardWebsite}\nADR;TYPE=WORK:;;${vcardAddress}\nEND:VCARD`;
      default: return '';
    }
  }, [activeTab, link, text, emailTo, emailSubject, emailBody, wifiSsid, wifiPassword, wifiEncryption, phoneNumber, smsTo, smsBody, latitude, longitude, vcardFirstName, vcardLastName, vcardOrg, vcardTitle, vcardTel, vcardEmail, vcardWebsite, vcardAddress]);

  const qrOptions: QRCodeStylingOptions = useMemo(() => {
    const options: QRCodeStylingOptions = {
        width: 300,
        height: 300,
        type: 'svg',
        data: qrCodeData || 'https://www.toolsybro.com',
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
    const size = 256;
    canvas.width = size;
    canvas.height = size;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Create a temporary element to render the SVG and get its path data
    const tempDiv = document.createElement('div');
    const iconElement = React.createElement(Icon, { size: 200 }); // Render slightly smaller
    
    // This is a simplified way to get SVG path. It might not work for complex icons.
    // For production, a library like `render-to-string` on server or a more robust client method is needed.
    // A simplified client-side approach:
    const tempIconContainer = document.createElement('div');
    tempIconContainer.innerHTML = new XMLSerializer().serializeToString(
      document.createRange().createContextualFragment(
        `<svg xmlns="http://www.w3.org/2000/svg" width="200" height="200" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">${(Icon as any)().props.children.map((child: any) => child.props.d ? `<path d="${child.props.d}" />` : '').join('')}</svg>`
      ).firstChild!
    );
    const svgElement = tempIconContainer.firstChild as SVGElement;
    
    const svgString = new XMLSerializer().serializeToString(svgElement);
    const svgBlob = new Blob([svgString], { type: 'image/svg+xml;charset=utf-8' });
    const url = URL.createObjectURL(svgBlob);

    const img = new Image();
    img.onload = () => {
      ctx.fillStyle = 'white'; // White background for the logo area
      ctx.fillRect(0, 0, size, size);
      const x = (size - img.width) / 2;
      const y = (size - img.height) / 2;
      ctx.drawImage(img, x, y);
      setLogo(canvas.toDataURL('image/png'));
      URL.revokeObjectURL(url);
    };
    img.src = url;
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
                {qrTypes.map(type => (
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
                  <Input id="qr-link" value={link} onChange={(e) => setLink(e.target.value)} placeholder="https://www.toolsybro.com" />
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
              <TabsContent value="phone" className="pt-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-phone" className="text-base">Phone Number</Label>
                  <Input id="qr-phone" type="tel" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} placeholder="+1234567890" />
                </div>
              </TabsContent>
              <TabsContent value="sms" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-sms-to" className="text-base">To Phone Number</Label>
                  <Input id="qr-sms-to" type="tel" value={smsTo} onChange={(e) => setSmsTo(e.target.value)} placeholder="+1234567890" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qr-sms-body" className="text-base">Message</Label>
                  <Input id="qr-sms-body" value={smsBody} onChange={(e) => setSmsBody(e.target.value)} placeholder="Your message here" />
                </div>
              </TabsContent>
              <TabsContent value="location" className="pt-4 space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="qr-latitude" className="text-base">Latitude</Label>
                  <Input id="qr-latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} placeholder="e.g., 40.7128" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="qr-longitude" className="text-base">Longitude</Label>
                  <Input id="qr-longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} placeholder="e.g., -74.0060" />
                </div>
              </TabsContent>
              <TabsContent value="vcard" className="pt-4 space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>First Name</Label><Input value={vcardFirstName} onChange={e => setVcardFirstName(e.target.value)} /></div>
                    <div className="space-y-2"><Label>Last Name</Label><Input value={vcardLastName} onChange={e => setVcardLastName(e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Organization</Label><Input value={vcardOrg} onChange={e => setVcardOrg(e.target.value)} /></div>
                    <div className="space-y-2"><Label>Job Title</Label><Input value={vcardTitle} onChange={e => setVcardTitle(e.target.value)} /></div>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-2"><Label>Phone</Label><Input type="tel" value={vcardTel} onChange={e => setVcardTel(e.target.value)} /></div>
                    <div className="space-y-2"><Label>Email</Label><Input type="email" value={vcardEmail} onChange={e => setVcardEmail(e.target.value)} /></div>
                </div>
                 <div className="space-y-2"><Label>Website</Label><Input type="url" value={vcardWebsite} onChange={e => setVcardWebsite(e.target.value)} /></div>
                 <div className="space-y-2"><Label>Address</Label><Textarea value={vcardAddress} onChange={e => setVcardAddress(e.target.value)} /></div>
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
