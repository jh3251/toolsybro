'use client';

import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Download, PlusCircle, Trash2, Calendar as CalendarIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { PDFDocument, rgb, StandardFonts } from 'pdf-lib';
import { fileSave } from 'browser-fs-access';
import { format } from 'date-fns';
import { Popover, PopoverContent, PopoverTrigger } from '../ui/popover';
import { cn } from '@/lib/utils';
import { Calendar } from '../ui/calendar';

interface LineItem {
  id: number;
  description: string;
  quantity: string;
  rate: string;
}

const formatCurrency = (value: number) => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value);
};

export function InvoiceGenerator() {
  const [currency, setCurrency] = useState('USD');
  const [invoiceNumber, setInvoiceNumber] = useState('001');
  const [from, setFrom] = useState('Your Company\n123 Street\nCity, State, 12345');
  const [to, setTo] = useState('Client Company\n456 Avenue\nCity, State, 67890');
  const [date, setDate] = useState(format(new Date(), 'yyyy-MM-dd'));
  const [dueDate, setDueDate] = useState('');
  const [lineItems, setLineItems] = useState<LineItem[]>([
    { id: 1, description: 'Website Design', quantity: '1', rate: '1500' },
  ]);
  const [notes, setNotes] = useState('Thank you for your business.');
  const [taxRate, setTaxRate] = useState('6');

  const { toast } = useToast();

  const handleAddLineItem = () => {
    setLineItems([...lineItems, { id: Date.now(), description: '', quantity: '1', rate: '0' }]);
  };

  const handleRemoveLineItem = (id: number) => {
    setLineItems(lineItems.filter(item => item.id !== id));
  };

  const handleLineItemChange = (id: number, field: keyof Omit<LineItem, 'id'>, value: string) => {
    setLineItems(
      lineItems.map(item => (item.id === id ? { ...item, [field]: value } : item))
    );
  };
  
  const subtotal = lineItems.reduce((acc, item) => {
      const quantity = parseFloat(item.quantity) || 0;
      const rate = parseFloat(item.rate) || 0;
      return acc + quantity * rate;
  }, 0);

  const tax = subtotal * (parseFloat(taxRate) / 100 || 0);
  const total = subtotal + tax;

  const generatePdf = async () => {
    try {
        const pdfDoc = await PDFDocument.create();
        const page = pdfDoc.addPage();
        const { width, height } = page.getSize();
        const font = await pdfDoc.embedFont(StandardFonts.Helvetica);
        const boldFont = await pdfDoc.embedFont(StandardFonts.HelveticaBold);
        const fontSize = 10;
        let y = height - 50;

        // Header
        page.drawText('INVOICE', { x: 50, y, font: boldFont, size: 24 });
        y -= 30;

        // From and To
        page.drawText('From:', { x: 50, y, font: boldFont, size: fontSize });
        page.drawText('To:', { x: 350, y, font: boldFont, size: fontSize });
        y -= 15;
        const fromLines = from.split('\n');
        const toLines = to.split('\n');
        const maxLines = Math.max(fromLines.length, toLines.length);
        for(let i = 0; i < maxLines; i++) {
            if(fromLines[i]) page.drawText(fromLines[i], { x: 50, y, font, size: fontSize });
            if(toLines[i]) page.drawText(toLines[i], { x: 350, y, font, size: fontSize });
            y-=15;
        }

        y -= 20;
        
        // Invoice details
        page.drawText(`Invoice #: ${invoiceNumber}`, { x: 350, y, font, size: fontSize });
        y -= 15;
        if (date) {
            page.drawText(`Date: ${format(new Date(date), 'MMMM d, yyyy')}`, { x: 350, y, font, size: fontSize });
            y -= 15;
        }
        if (dueDate) {
          page.drawText(`Due Date: ${format(new Date(dueDate), 'MMMM d, yyyy')}`, { x: 350, y, font, size: fontSize });
          y -= 15;
        }

        y -= 30;
        
        // Table header
        page.drawText('Description', { x: 50, y, font: boldFont, size: fontSize });
        page.drawText('Quantity', { x: 350, y, font: boldFont, size: fontSize });
        page.drawText('Rate', { x: 420, y, font: boldFont, size: fontSize });
        page.drawText('Amount', { x: 500, y, font: boldFont, size: fontSize });
        y -= 5;
        page.drawLine({ start: { x: 50, y }, end: { x: width - 50, y: y }, thickness: 1 });
        y -= 15;

        // Line items
        lineItems.forEach(item => {
            const amount = (parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0);
            page.drawText(item.description, { x: 50, y, font, size: fontSize });
            page.drawText(item.quantity, { x: 350, y, font, size: fontSize });
            page.drawText(formatCurrency(parseFloat(item.rate)), { x: 420, y, font, size: fontSize });
            page.drawText(formatCurrency(amount), { x: 500, y, font, size: fontSize });
            y -= 20;
        });
        
        y -= 5;
        page.drawLine({ start: { x: 50, y }, end: { x: width - 50, y: y }, thickness: 0.5 });
        y -= 20;

        // Totals
        page.drawText('Subtotal:', { x: 420, y, font, size: fontSize });
        page.drawText(formatCurrency(subtotal), { x: 500, y, font, size: fontSize });
        y -= 20;
        page.drawText(`Tax (${taxRate}%):`, { x: 420, y, font, size: fontSize });
        page.drawText(formatCurrency(tax), { x: 500, y, font, size: fontSize });
        y -= 20;
        page.drawText('Total:', { x: 420, y, font: boldFont, size: 12 });
        page.drawText(formatCurrency(total), { x: 500, y, font: boldFont, size: 12 });
        y -= 40;

        // Notes
        page.drawText('Notes:', { x: 50, y, font: boldFont, size: fontSize });
        y -= 15;
        page.drawText(notes, { x: 50, y, font, size: fontSize, lineHeight: 14, maxWidth: width - 100 });


        const pdfBytes = await pdfDoc.save();
        await fileSave(new Blob([pdfBytes], { type: 'application/pdf' }), {
            fileName: `invoice-${invoiceNumber}.pdf`,
            extensions: ['.pdf'],
        });
        toast({ title: 'Invoice Downloaded!', description: 'Your PDF has been saved successfully.' });
    } catch(err) {
        console.error(err);
        toast({ title: 'Error generating PDF', description: 'There was a problem creating your invoice.', variant: 'destructive'});
    }
  }


  return (
    <Card>
      <CardContent className="p-4 sm:p-6 space-y-6">
        <div className="flex justify-end">
            <Button onClick={generatePdf}>
                <Download className="mr-2" /> Download PDF
            </Button>
        </div>
        <div className="p-8 border rounded-lg">
            <div className="grid grid-cols-2 gap-8 mb-8">
                <div className="space-y-2">
                    <Label>From</Label>
                    <Textarea value={from} onChange={e => setFrom(e.target.value)} rows={4} />
                </div>
                <div className="space-y-2">
                    <Label>To</Label>
                    <Textarea value={to} onChange={e => setTo(e.target.value)} rows={4} />
                </div>
            </div>
             <div className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-8">
                <div className="space-y-2">
                    <Label htmlFor="invoice-no">Invoice #</Label>
                    <Input id="invoice-no" value={invoiceNumber} onChange={e => setInvoiceNumber(e.target.value)} />
                </div>
                <div className="space-y-2">
                    <Label htmlFor="date">Date</Label>
                    <Input id="date" type="date" value={date} onChange={e => setDate(e.target.value)} />
                </div>
                 <div className="space-y-2">
                    <Label htmlFor="due-date">Due Date</Label>
                    <Input id="due-date" type="date" value={dueDate} onChange={e => setDueDate(e.target.value)} />
                </div>
             </div>

             {/* Line Items */}
             <div className='space-y-2'>
                <div className='hidden md:grid md:grid-cols-[1fr_100px_100px_100px_40px] gap-4 font-semibold text-sm text-muted-foreground'>
                    <span>Description</span>
                    <span className='text-right'>Quantity</span>
                    <span className='text-right'>Rate</span>
                    <span className='text-right'>Amount</span>
                    <span></span>
                </div>
                {lineItems.map((item, index) => (
                    <div key={item.id} className="grid grid-cols-1 md:grid-cols-[1fr_100px_100px_100px_40px] gap-4 items-center border-b pb-2">
                        <Input placeholder="Item description" value={item.description} onChange={e => handleLineItemChange(item.id, 'description', e.target.value)} />
                        <Input type="number" className='text-right' placeholder="Qty" value={item.quantity} onChange={e => handleLineItemChange(item.id, 'quantity', e.target.value)} />
                        <Input type="number" className='text-right' placeholder="Rate" value={item.rate} onChange={e => handleLineItemChange(item.id, 'rate', e.target.value)} />
                        <p className="text-right font-medium">{formatCurrency((parseFloat(item.quantity) || 0) * (parseFloat(item.rate) || 0))}</p>
                        <Button variant="ghost" size="icon" onClick={() => handleRemoveLineItem(item.id)}>
                            <Trash2 className="h-4 w-4 text-destructive" />
                        </Button>
                    </div>
                ))}
                 <Button variant="outline" onClick={handleAddLineItem} className="mt-2">
                    <PlusCircle className="mr-2" /> Add Item
                </Button>
             </div>

            {/* Total */}
             <div className="flex justify-end mt-8">
                <div className="w-full max-w-sm space-y-2">
                    <div className="flex justify-between">
                        <span>Subtotal</span>
                        <span>{formatCurrency(subtotal)}</span>
                    </div>
                     <div className="flex justify-between items-center">
                        <div className='flex items-center gap-1'>
                             <span>Tax</span>
                             <Input type="number" value={taxRate} onChange={e => setTaxRate(e.target.value)} className="w-16 h-8 text-right"/>
                             <span>%</span>
                        </div>
                        <span>{formatCurrency(tax)}</span>
                    </div>
                    <div className="flex justify-between font-bold text-lg border-t pt-2">
                        <span>Total</span>
                        <span>{formatCurrency(total)}</span>
                    </div>
                </div>
            </div>

            <div className="mt-8 space-y-2">
                <Label htmlFor="notes">Notes</Label>
                <Textarea id="notes" value={notes} onChange={e => setNotes(e.target.value)} />
            </div>

        </div>
      </CardContent>
    </Card>
  );
}
