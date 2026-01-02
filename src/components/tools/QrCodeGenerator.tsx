
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Download, Link, Type, Mail, Wifi, Palette, Brush, Square, Image as ImageIcon, Briefcase, Phone, MessageSquare, Calendar, Video, FileText, Music, Star, MapPin, ZoomIn, Bitcoin, Facebook, Youtube } from 'lucide-react';
import { cn } from "@/lib/utils";

type QrType = 'link' | 'text' | 'email' | 'wifi';

const qrTypes = [
    { id: 'link', name: 'Link', icon: Link },
    { id: 'text', name: 'Text', icon: Type },
    { id: 'email', name: 'E-mail', icon: Mail },
    { id: 'wifi', name: 'Wi-Fi', icon: Wifi },
    { id: 'phone', name: 'Phone', icon: Phone },
    { id: 'sms', name: 'SMS', icon: MessageSquare },
    { id: 'vcard', name: 'V-Card', icon: Briefcase },
    { id: 'event', name: 'Event', icon: Calendar },
    { id: 'zoom', name: 'Zoom', icon: ZoomIn },
    { id: 'paypal', name: 'PayPal', icon: 'currency' },
    { id: 'bitcoin', name: 'Bitcoin', icon: Bitcoin },
    { id: 'video', name: 'Video', icon: Video },
    { id: 'pdf', name: 'PDF', icon: FileText },
    { id: 'mp3', name: 'MP3', icon: Music },
    { id: 'app', name: 'App Stores', icon: 'app' },
    { id: 'facebook', name: 'Facebook', icon: Facebook },
    { id: 'youtube', name: 'YouTube', icon: Youtube },
    { id: 'rating', name: 'Rating', icon: Star },
    { id: 'location', name: 'Location', icon: MapPin },
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
  
  const qrCodeData = useMemo(() => {
    switch(activeTab) {
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
    const encodedText = encodeURIComponent(qrCodeData);
    const formattedFgColor = fgColor.substring(1); // remove #
    const formattedBgColor = bgColor.substring(1); // remove #
    return `https://api.qrserver.com/v1/create-qr-code/?data=${encodedText}&size=300x300&color=${formattedFgColor}&bgcolor=${formattedBgColor}&qzone=1`;
  }, [qrCodeData, fgColor, bgColor]);
  
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
        <div className="grid grid-cols-1 md:grid-cols-[2fr_1fr] gap-8">
          <div className="space-y-6">
            <Tabs value={activeTab} onValueChange={(v) => setActiveTab(v as QrType)} className="w-full">
                <TabsList className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 gap-2 bg-transparent p-0">
                    {qrTypes.slice(0, 4).map(type => (
                        <TabsTrigger 
                            key={type.id} 
                            value={type.id} 
                            className="flex-col h-16 gap-1 border data-[state=active]:bg-primary data-[state=active]:text-primary-foreground data-[state=active]:border-primary"
                        >
                            <type.icon className="w-5 h-5"/>
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

            <Accordion type="multiple" className="w-full" defaultValue={['colors']}>
              <AccordionItem value="colors">
                <AccordionTrigger className='font-semibold'><Palette className="mr-2"/>Colors</AccordionTrigger>
                <AccordionContent>
                   <div className="grid grid-cols-2 gap-4 pt-2">
                        <div>
                            <Label htmlFor="fg-color">Foreground Color</Label>
                            <Input id="fg-color" type="color" value={fgColor} onChange={(e) => setFgColor(e.target.value)} className="mt-1 h-10 p-1"/>
                        </div>
                        <div>
                            <Label htmlFor="bg-color">Background Color</Label>
                            <Input id="bg-color" type="color" value={bgColor} onChange={(e) => setBgColor(e.target.value)} className="mt-1 h-10 p-1"/>
                        </div>
                    </div>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="design">
                <AccordionTrigger className='font-semibold'><Brush className="mr-2"/>Design</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground p-4 text-center">Advanced design options are coming soon!</p>
                </AccordionContent>
              </AccordionItem>
              <AccordionItem value="logo">
                <AccordionTrigger className='font-semibold'><ImageIcon className="mr-2"/>Logo</AccordionTrigger>
                <AccordionContent>
                  <p className="text-muted-foreground p-4 text-center">Adding a custom logo is coming soon!</p>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
          <div className="flex flex-col items-center justify-center space-y-4 bg-muted/50 p-4 rounded-lg sticky top-24">
            {qrCodeData ? (
              <Image
                src={qrCodeUrl}
                alt="Generated QR Code"
                width={300}
                height={300}
                className="rounded-md shadow-md"
                unoptimized
              />
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
