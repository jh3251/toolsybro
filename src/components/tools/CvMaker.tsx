
'use client';

import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Download, PlusCircle, Trash2, Mail, Phone, MapPin, Globe } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PDFDocument, rgb, StandardFonts, PDFFont } from 'pdf-lib';
import { fileSave } from 'browser-fs-access';
import { Separator } from '../ui/separator';

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

const CvPreview = ({ data }: { data: any }) => (
    <div className="p-8 border rounded-lg bg-background text-foreground h-full aspect-[1/1.414] overflow-auto">
        <h2 className="text-3xl font-bold border-b pb-2">{data.name}</h2>
        <div className="flex flex-wrap gap-x-4 gap-y-1 text-xs text-muted-foreground pt-2">
            {data.email && <div className="flex items-center gap-1"><Mail className="w-3 h-3" />{data.email}</div>}
            {data.phone && <div className="flex items-center gap-1"><Phone className="w-3 h-3" />{data.phone}</div>}
            {data.address && <div className="flex items-center gap-1"><MapPin className="w-3 h-3" />{data.address}</div>}
            {data.website && <div className="flex items-center gap-1"><Globe className="w-3 h-3" />{data.website}</div>}
        </div>
        
        {data.summary && <div className="mt-4"><h3 className="font-bold text-lg border-b mb-2">Summary</h3><p className="text-sm">{data.summary}</p></div>}
        
        {data.experience.length > 0 && <div className="mt-4"><h3 className="font-bold text-lg border-b mb-2">Experience</h3>
            {data.experience.map((exp: any) => (<div key={exp.id} className="mb-3 text-sm">
                <p className="font-bold">{exp.title}</p>
                <p className="italic">{exp.company}</p>
                <p className="text-xs text-muted-foreground">{exp.dates}</p>
                <p className="mt-1 whitespace-pre-wrap">{exp.description}</p>
            </div>))}
        </div>}
        
        {data.education.length > 0 && <div className="mt-4"><h3 className="font-bold text-lg border-b mb-2">Education</h3>
            {data.education.map((edu: any) => (<div key={edu.id} className="mb-2 text-sm">
                <p className="font-bold">{edu.degree}</p>
                <p>{edu.school}</p>
                <p className="text-xs text-muted-foreground">{edu.dates}</p>
            </div>))}
        </div>}
        
        {data.skills && <div className="mt-4"><h3 className="font-bold text-lg border-b mb-2">Skills</h3><p className="text-sm">{data.skills}</p></div>}
    </div>
);


export function CvMaker() {
  const [data, setData] = useState({
    name: 'Your Name', email: '', phone: '', address: '', website: '',
    summary: 'A brief professional summary about yourself.',
    experience: [{ id: 1, title: 'Job Title', company: 'Company Name', dates: 'Jan 2020 - Present', description: '- Your responsibilities' }] as Experience[],
    education: [{ id: 1, school: 'University Name', degree: 'Degree', dates: '2016 - 2020' }] as Education[],
    skills: 'Skill 1, Skill 2, Skill 3'
  });
  const { toast } = useToast();

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
    const page = pdfDoc.addPage();
    const { width, height } = page.getSize();
    const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
    const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
    let y = height - 50;

    const drawText = (text: string, x: number, font: PDFFont, size: number, options: {lineHeight?: number, maxWidth?: number} = {}) => {
        const { lineHeight = size * 1.2, maxWidth } = options;
        const words = text.split(' ');
        let line = '';
        for (const word of words) {
            const testLine = line + word + ' ';
            const testWidth = font.widthOfTextAtSize(testLine, size);
            if (maxWidth && testWidth > maxWidth && line !== '') {
                page.drawText(line, { x, y, font, size });
                y -= lineHeight;
                line = word + ' ';
            } else {
                line = testLine;
            }
        }
        page.drawText(line, { x, y, font, size });
        y -= lineHeight;
    };
    
    // Name
    drawText(data.name, 50, boldFont, 24);
    y -= 10;
    
    // Contact
    let contactLine = [data.email, data.phone, data.address, data.website].filter(Boolean).join(' | ');
    drawText(contactLine, 50, font, 10);
    y -= 10;

    // Sections
    const sections = [
        { title: 'Summary', content: data.summary },
        { title: 'Experience', items: data.experience, isExp: true },
        { title: 'Education', items: data.education },
        { title: 'Skills', content: data.skills }
    ];

    for (const section of sections) {
        if ((section.content && section.content.trim()) || (section.items && section.items.length > 0)) {
            y-=10;
            page.drawLine({ start: { x: 50, y }, end: { x: width - 50, y }});
            y-=5;
            drawText(section.title, 50, boldFont, 14);
            y+=5;
             if (section.content) {
                drawText(section.content, 50, font, 10, { maxWidth: width - 100});
            } else if (section.items) {
                for (const item of section.items) {
                     y-=5;
                     if(section.isExp) {
                         // @ts-ignore
                        drawText(item.title, 50, boldFont, 10);
                        // @ts-ignore
                        drawText(`${item.company} | ${item.dates}`, 50, font, 9);
                         // @ts-ignore
                        drawText(item.description, 60, font, 9, { maxWidth: width - 120 });
                     } else {
                         // @ts-ignore
                        drawText(item.degree, 50, boldFont, 10);
                         // @ts-ignore
                        drawText(`${item.school} | ${item.dates}`, 50, font, 9);
                     }
                }
            }
        }
    }


    const pdfBytes = await pdfDoc.save();
    await fileSave(new Blob([pdfBytes]), { fileName: 'cv.pdf', extensions: ['.pdf']});
    toast({ title: 'CV Downloaded!' });
  };


  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="space-y-6">
            <Button onClick={generatePdf} className="w-full"><Download className="mr-2"/> Download as PDF</Button>
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
                {data.experience.map((exp, index) => (
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
                {data.education.map((edu, index) => (
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
            <CvPreview data={data} />
        </div>
      </CardContent>
    </Card>
  );
}
