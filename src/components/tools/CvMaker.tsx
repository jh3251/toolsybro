
'use client';

import { useState, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Download, PlusCircle, Trash2, Mail, Phone, MapPin, Globe, User as UserIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PDFDocument, rgb, StandardFonts, PDFFont, PageSizes } from 'pdf-lib';
import { fileSave } from 'browser-fs-access';
import { Separator } from '../ui/separator';
import Image from 'next/image';

interface Experience {
  id: number;
  title: string;
  company: string;
  dates: string;
  description: string;
}

interface Education {
  id: number;
  school: string;
  degree: string;
  dates: string;
}

const CvPreview = ({ data, photo }: { data: any, photo: string | null }) => (
    <div className="p-4 sm:p-6 border rounded-lg bg-background text-foreground h-full aspect-[1/1.414] overflow-auto text-xs">
        <div className="flex gap-4">
             {/* Left Column */}
            <div className="w-1/3 pr-4 border-r">
                {photo && (
                    <div className="relative w-24 h-24 mx-auto mb-4 rounded-full overflow-hidden">
                        <Image src={photo} alt="Profile" fill className="object-cover" />
                    </div>
                )}
                <h2 className="text-xl font-bold text-center">{data.name}</h2>
                <div className="mt-4 space-y-2">
                    <h3 className="font-bold border-b pb-1">Contact</h3>
                    {data.email && <div className="flex items-center gap-1"><Mail className="w-3 h-3 flex-shrink-0" /><span>{data.email}</span></div>}
                    {data.phone && <div className="flex items-center gap-1"><Phone className="w-3 h-3 flex-shrink-0" /><span>{data.phone}</span></div>}
                    {data.address && <div className="flex items-center gap-1"><MapPin className="w-3 h-3 flex-shrink-0" /><span>{data.address}</span></div>}
                    {data.website && <div className="flex items-center gap-1"><Globe className="w-3 h-3 flex-shrink-0" /><span>{data.website}</span></div>}
                </div>
                {data.skills && <div className="mt-4 space-y-2">
                    <h3 className="font-bold border-b pb-1">Skills</h3>
                    <p>{data.skills}</p>
                </div>}
            </div>

            {/* Right Column */}
            <div className="w-2/3">
                 {data.summary && <div className="mb-4">
                    <h3 className="font-bold text-base border-b mb-1">Summary</h3>
                    <p className="whitespace-pre-wrap">{data.summary}</p>
                </div>}
                
                {data.experience.length > 0 && <div>
                    <h3 className="font-bold text-base border-b mb-2">Experience</h3>
                    {data.experience.map((exp: any) => (<div key={exp.id} className="mb-3">
                        <p className="font-bold">{exp.title}</p>
                        <p className="italic text-muted-foreground">{exp.company} | {exp.dates}</p>
                        <p className="mt-1 whitespace-pre-wrap">{exp.description}</p>
                    </div>))}
                </div>}
                
                {data.education.length > 0 && <div className="mt-4">
                    <h3 className="font-bold text-base border-b mb-2">Education</h3>
                    {data.education.map((edu: any) => (<div key={edu.id} className="mb-2">
                        <p className="font-bold">{edu.degree}</p>
                        <p>{edu.school} | {edu.dates}</p>
                    </div>))}
                </div>}
            </div>
        </div>
    </div>
);


export function CvMaker() {
  const [data, setData] = useState({
    name: 'Your Name', email: 'your.email@example.com', phone: '+1 234 567 890', address: 'City, Country', website: 'yourwebsite.com',
    summary: 'A brief professional summary about yourself. Highlight your key skills and career goals.',
    experience: [{ id: 1, title: 'Job Title', company: 'Company Name', dates: 'Jan 2020 - Present', description: '- Your key responsibility or achievement.' }] as Experience[],
    education: [{ id: 1, school: 'University Name', degree: 'Your Degree', dates: '2016 - 2020' }] as Education[],
    skills: 'Skill 1, Skill 2, Skill 3'
  });
  const [photo, setPhoto] = useState<string | null>(null);
  const { toast } = useToast();

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file && file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (event) => {
            setPhoto(event.target?.result as string);
        };
        reader.readAsDataURL(file);
    }
  }

  const handleChange = (field: string, value: any) => {
    setData(prev => ({ ...prev, [field]: value }));
  };

  const handleDynamicChange = (section: 'experience' | 'education', id: number, field: string, value: any) => {
    setData(prev => ({
      ...prev,
      [section]: prev[section].map(item => item.id === id ? { ...item, [field]: value } : item)
    }));
  };

  const addDynamicItem = (section: 'experience' | 'education') => {
    const newItem = section === 'experience'
      ? { id: Date.now(), title: '', company: '', dates: '', description: '' }
      : { id: Date.now(), school: '', degree: '', dates: '' };
    // @ts-ignore
    setData(prev => ({ ...prev, [section]: [...prev[section], newItem] }));
  };
  
  const removeDynamicItem = (section: 'experience' | 'education', id: number) => {
    // @ts-ignore
    setData(prev => ({ ...prev, [section]: prev[section].filter(item => item.id !== id) }));
  };

  const generatePdf = async () => {
    const pdfDoc = await PDFDocument.create();
    const page = pdfDoc.addPage(PageSizes.A4);
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    
    // --- Define Colors ---
    const primaryColor = rgb(0.1, 0.1, 0.1); // Near black
    const secondaryColor = rgb(0.3, 0.3, 0.3); // Dark Gray
    const accentColor = rgb(34/255, 139/255, 230/255); // A nice blue
    const whiteColor = rgb(1, 1, 1);
    const lightGrayColor = rgb(0.95, 0.95, 0.95);

    // --- Layout ---
    const leftPanelWidth = width * 0.35;
    const rightPanelX = leftPanelWidth + 20;
    const margin = 30;
    let y = height - margin;

    // --- Left Panel (Colored Background) ---
    page.drawRectangle({
        x: 0,
        y: 0,
        width: leftPanelWidth,
        height: height,
        color: lightGrayColor,
    });

    // --- Draw Photo ---
    y = height - margin;
    if (photo) {
        const imageBytes = await fetch(photo).then(res => res.arrayBuffer());
        const image = await pdfDoc.embedPng(imageBytes);
        const imgSize = 100;
        page.drawImage(image, {
            x: (leftPanelWidth - imgSize) / 2,
            y: y - imgSize,
            width: imgSize,
            height: imgSize,
        });
        y -= (imgSize + 20);
    }

    // --- Contact Info (Left Panel) ---
    page.drawText('Contact', {
        x: margin, y, font: boldFont, size: 14, color: primaryColor
    });
    page.drawLine({ start: { x: margin, y: y-5 }, end: { x: leftPanelWidth - margin, y: y-5 }, thickness: 1, color: accentColor });
    y -= 30;

    const contactInfo = [
        { text: data.email, icon: 'email' },
        { text: data.phone, icon: 'phone' },
        { text: data.address, icon: 'address' },
        { text: data.website, icon: 'website' }
    ].filter(item => item.text);

    contactInfo.forEach(item => {
        page.drawText(item.text, { x: margin, y, font, size: 9, color: secondaryColor, lineHeight: 14 });
        y -= 15;
    });

    y -= 20;

    // --- Skills (Left Panel) ---
    if(data.skills) {
        page.drawText('Skills', {
            x: margin, y, font: boldFont, size: 14, color: primaryColor
        });
        page.drawLine({ start: { x: margin, y: y-5 }, end: { x: leftPanelWidth - margin, y: y-5 }, thickness: 1, color: accentColor });
        y -= 30;
        
        data.skills.split(',').forEach(skill => {
            page.drawText(`• ${skill.trim()}`, { x: margin, y, font, size: 10, color: secondaryColor });
            y -= 15;
        });
    }

    // --- Right Panel ---
    y = height - margin;

    // --- Name and Title ---
    page.drawText(data.name, { x: rightPanelX, y, font: boldFont, size: 28, color: primaryColor });
    y -= 35;
    if(data.experience[0]?.title) {
      page.drawText(data.experience[0].title, { x: rightPanelX, y, font, size: 16, color: accentColor });
      y -= 25;
    }

    const drawWrappedText = (text: string, options: any) => {
        const {font, size, lineHeight, maxWidth} = options;
        const words = text.split(' ');
        let line = '';
        for (const word of words) {
            if (y < margin) return; 
            const testLine = line + word + ' ';
            const testWidth = font.widthOfTextAtSize(testLine, size);
            if (testWidth > maxWidth && line !== '') {
                page.drawText(line, { ...options, y });
                y -= lineHeight;
                line = word + ' ';
            } else {
                line = testLine;
            }
        }
        page.drawText(line, { ...options, y });
        y -= lineHeight;
    }

    // --- Summary ---
    if(data.summary) {
        page.drawText('Summary', { x: rightPanelX, y, font: boldFont, size: 16, color: primaryColor });
        y -= 25;
        drawWrappedText(data.summary, { x: rightPanelX, y, font, size: 10, lineHeight: 14, color: secondaryColor, maxWidth: width - rightPanelX - margin });
        y -= 20;
    }
    
    // --- Experience ---
    if(data.experience.length > 0 && data.experience[0].title) {
        page.drawText('Experience', { x: rightPanelX, y, font: boldFont, size: 16, color: primaryColor });
        y -= 25;
        data.experience.forEach(exp => {
            page.drawText(exp.title, { x: rightPanelX, y, font: boldFont, size: 12, color: primaryColor });
            y -= 18;
            page.drawText(`${exp.company} | ${exp.dates}`, { x: rightPanelX, y, font, size: 10, color: accentColor });
            y -= 15;
            drawWrappedText(exp.description, { x: rightPanelX + 10, y, font, size: 10, lineHeight: 14, color: secondaryColor, maxWidth: width - rightPanelX - margin - 10 });
            y -= 20;
        });
    }

    // --- Education ---
    if(data.education.length > 0 && data.education[0].school) {
        page.drawText('Education', { x: rightPanelX, y, font: boldFont, size: 16, color: primaryColor });
        y -= 25;
        data.education.forEach(edu => {
             page.drawText(edu.degree, { x: rightPanelX, y, font: boldFont, size: 12, color: primaryColor });
             y -= 18;
             page.drawText(`${edu.school} | ${edu.dates}`, { x: rightPanelX, y, font, size: 10, color: accentColor });
             y -= 20;
        });
    }

    const pdfBytes = await pdfDoc.save();
    await fileSave(new Blob([pdfBytes]), { fileName: 'cv.pdf', extensions: ['.pdf']});
    toast({ title: 'CV Downloaded!' });
  };


  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-4">
            <Button onClick={generatePdf} className="w-full"><Download className="mr-2"/> Download as PDF</Button>
            
            <Separator />
            
            <h3 className="text-lg font-semibold">Profile Photo</h3>
            <div className='flex items-center gap-4'>
                {photo ? (
                    <div className="relative w-24 h-24 rounded-full overflow-hidden">
                        <Image src={photo} alt="Profile" layout="fill" objectFit="cover" />
                    </div>
                ) : (
                    <div className='w-24 h-24 rounded-full bg-muted flex items-center justify-center'>
                        <UserIcon className='w-12 h-12 text-muted-foreground'/>
                    </div>
                )}
                <div className='flex-grow'>
                    <Input type="file" accept="image/png, image/jpeg" onChange={handleFileChange} />
                    <p className='text-xs text-muted-foreground mt-1'>Upload a square photo for best results.</p>
                </div>
            </div>

            <Separator />
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Personal Details</h3>
                <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                    <div className="space-y-1"><Label>Full Name</Label><Input value={data.name} onChange={e => handleChange('name', e.target.value)} /></div>
                    <div className="space-y-1"><Label>Email</Label><Input type="email" value={data.email} onChange={e => handleChange('email', e.target.value)} /></div>
                    <div className="space-y-1"><Label>Phone</Label><Input type="tel" value={data.phone} onChange={e => handleChange('phone', e.target.value)} /></div>
                    <div className="space-y-1"><Label>Address</Label><Input value={data.address} onChange={e => handleChange('address', e.target.value)} /></div>
                    <div className="space-y-1 col-span-1 sm:col-span-2"><Label>Website/LinkedIn</Label><Input value={data.website} onChange={e => handleChange('website', e.target.value)} /></div>
                </div>
            </div>
            <Separator />
            <div className="space-y-2"><Label className="text-lg font-semibold">Summary</Label><Textarea value={data.summary} onChange={e => handleChange('summary', e.target.value)} rows={4} /></div>
            <Separator />
             <div className="space-y-4">
                <h3 className="text-lg font-semibold">Experience</h3>
                {data.experience.map((exp) => (
                    <div key={exp.id} className="p-4 border rounded-md space-y-2 relative">
                        <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7 text-destructive" onClick={() => removeDynamicItem('experience', exp.id)}><Trash2 className="w-4 h-4"/></Button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                             <div className="space-y-1"><Label>Job Title</Label><Input value={exp.title} onChange={e => handleDynamicChange('experience', exp.id, 'title', e.target.value)} /></div>
                            <div className="space-y-1"><Label>Company</Label><Input value={exp.company} onChange={e => handleDynamicChange('experience', exp.id, 'company', e.target.value)} /></div>
                        </div>
                        <div className="space-y-1"><Label>Dates</Label><Input value={exp.dates} onChange={e => handleDynamicChange('experience', exp.id, 'dates', e.target.value)} placeholder="e.g., Jan 2020 - Present" /></div>
                        <div className="space-y-1"><Label>Description</Label><Textarea value={exp.description} onChange={e => handleDynamicChange('experience', exp.id, 'description', e.target.value)} rows={3} placeholder="- Responsibility 1..." /></div>
                    </div>
                ))}
                <Button variant="outline" onClick={() => addDynamicItem('experience')}><PlusCircle className="mr-2"/>Add Experience</Button>
            </div>
            <Separator />
            <div className="space-y-4">
                <h3 className="text-lg font-semibold">Education</h3>
                {data.education.map((edu) => (
                    <div key={edu.id} className="p-4 border rounded-md space-y-2 relative">
                        <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7 text-destructive" onClick={() => removeDynamicItem('education', edu.id)}><Trash2 className="w-4 h-4"/></Button>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                            <div className="space-y-1"><Label>School</Label><Input value={edu.school} onChange={e => handleDynamicChange('education', edu.id, 'school', e.target.value)} /></div>
                            <div className="space-y-1"><Label>Degree</Label><Input value={edu.degree} onChange={e => handleDynamicChange('education', edu.id, 'degree', e.target.value)} /></div>
                        </div>
                        <div className="space-y-1"><Label>Dates</Label><Input value={edu.dates} onChange={e => handleDynamicChange('education', edu.id, 'dates', e.target.value)} placeholder="e.g., 2016 - 2020" /></div>
                    </div>
                ))}
                <Button variant="outline" onClick={() => addDynamicItem('education')}><PlusCircle className="mr-2"/>Add Education</Button>
            </div>
            <Separator />
            <div className="space-y-2"><Label className="text-lg font-semibold">Skills</Label><Textarea value={data.skills} onChange={e => handleChange('skills', e.target.value)} placeholder="e.g., JavaScript, React, Project Management" /></div>
        </div>
        <div className="sticky top-24">
            <h3 className="text-lg font-semibold mb-4 text-center">Live Preview</h3>
            <CvPreview data={data} photo={photo} />
        </div>
      </CardContent>
    </Card>
  );
}
