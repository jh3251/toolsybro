
'use client';

import 'react-image-crop/dist/ReactCrop.css';
import { useState, useRef, ChangeEvent } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { UploadCloud, Download, Trash2, CropIcon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import ReactCrop, { type Crop, centerCrop, makeAspectCrop } from 'react-image-crop';
import { Label } from '../ui/label';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

const DPI = 96; // Standard DPI for screens
const CM_TO_INCH = 2.54;

export function ImageCropper() {
  const [imgSrc, setImgSrc] = useState('');
  const [crop, setCrop] = useState<Crop>();
  const [completedCrop, setCompletedCrop] = useState<Crop>();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const imgRef = useRef<HTMLImageElement>(null);
  const { toast } = useToast();

  const [aspect, setAspect] = useState<number | undefined>(16 / 9);
  const [customWidth, setCustomWidth] = useState<number | string>('');
  const [customHeight, setCustomHeight] = useState<number | string>('');
  const [unit, setUnit] = useState<'px' | 'cm'>('px');

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const file = e.target.files[0];
      setCrop(undefined); // Reset crop when new image is selected
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        setImgSrc(reader.result?.toString() || '');
      });
      reader.readAsDataURL(file);
    }
  };

  const handleReset = () => {
    setImgSrc('');
    setCrop(undefined);
    setCompletedCrop(undefined);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  function onImageLoad(e: React.SyntheticEvent<HTMLImageElement>) {
    const { width, height } = e.currentTarget;
    const initialCrop = centerCrop(
      makeAspectCrop({ unit: '%', width: 90 }, aspect || 1, width, height),
      width,
      height
    );
    setCrop(initialCrop);
    setCompletedCrop(initialCrop);
  }

  const handleDownload = () => {
    if (!completedCrop || !imgRef.current) {
      toast({ title: 'No crop selection', description: 'Please select an area to crop.', variant: 'destructive' });
      return;
    }

    const image = imgRef.current;
    const canvas = document.createElement('canvas');
    const scaleX = image.naturalWidth / image.width;
    const scaleY = image.naturalHeight / image.height;
    
    canvas.width = completedCrop.width * scaleX;
    canvas.height = completedCrop.height * scaleY;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    ctx.drawImage(
      image,
      completedCrop.x * scaleX,
      completedCrop.y * scaleY,
      completedCrop.width * scaleX,
      completedCrop.height * scaleY,
      0,
      0,
      canvas.width,
      canvas.height
    );

    const link = document.createElement('a');
    link.href = canvas.toDataURL('image/png');
    link.download = 'cropped-image.png';
    link.click();
    toast({ title: 'Image Downloaded', description: 'Your cropped image has been saved.' });
  };
  
  const handleApplyCustomSize = () => {
    if (!imgRef.current || !customWidth || !customHeight) return;

    let widthPx = Number(customWidth);
    let heightPx = Number(customHeight);

    if (unit === 'cm') {
      widthPx = (widthPx / CM_TO_INCH) * DPI;
      heightPx = (heightPx / CM_TO_INCH) * DPI;
    }
    
    const { naturalWidth, naturalHeight } = imgRef.current;

    if (widthPx > naturalWidth || heightPx > naturalHeight) {
      toast({
        title: 'Invalid Size',
        description: 'Custom size cannot be larger than the original image dimensions.',
        variant: 'destructive',
      });
      return;
    }

    setAspect(widthPx / heightPx);
    setCrop(centerCrop(
      {
        unit: 'px',
        width: widthPx,
        height: heightPx,
      },
      naturalWidth,
      naturalHeight,
    ));
  };


  return (
    <Card>
      <CardContent className="pt-6">
        {!imgSrc ? (
          <div
            className="flex flex-col items-center justify-center p-8 border-2 border-dashed rounded-lg cursor-pointer hover:border-primary transition-colors"
            onClick={() => fileInputRef.current?.click()}
          >
            <UploadCloud className="w-16 h-16 text-muted-foreground" />
            <p className="mt-4 text-lg font-semibold">Click or drag image to upload</p>
            <Input
              ref={fileInputRef}
              type="file"
              className="hidden"
              accept="image/*"
              onChange={handleFileChange}
            />
          </div>
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            <div className="lg:col-span-2 space-y-4">
                <div className="flex justify-center bg-muted/50 p-4 rounded-lg">
                    <ReactCrop
                        crop={crop}
                        onChange={c => setCrop(c)}
                        onComplete={(c) => setCompletedCrop(c)}
                        aspect={aspect}
                        className="max-h-[60vh]"
                    >
                        <img
                            ref={imgRef}
                            alt="Crop me"
                            src={imgSrc}
                            onLoad={onImageLoad}
                        />
                    </ReactCrop>
                </div>
                <div className="flex flex-wrap gap-2">
                    <Button onClick={handleDownload} disabled={!completedCrop}>
                        <Download className="mr-2 h-4 w-4" /> Download Cropped Image
                    </Button>
                    <Button variant="outline" onClick={handleReset}>
                        <Trash2 className="mr-2 h-4 w-4" /> Clear Image
                    </Button>
                </div>
            </div>
            <div className="space-y-6">
                <div>
                    <Label className="text-lg font-semibold">Aspect Ratio</Label>
                    <RadioGroup value={aspect?.toString() || 'free'} onValueChange={(val) => setAspect(val === 'free' ? undefined : Number(val))} className="mt-2">
                        <div className="flex items-center space-x-2"><RadioGroupItem value="1.7777777777777777" id="16-9" /><Label htmlFor="16-9">16:9</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="1.3333333333333333" id="4-3" /><Label htmlFor="4-3">4:3</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="1" id="1-1" /><Label htmlFor="1-1">1:1 (Square)</Label></div>
                        <div className="flex items-center space-x-2"><RadioGroupItem value="free" id="free" /><Label htmlFor="free">Free</Label></div>
                    </RadioGroup>
                </div>
                <div className="space-y-2">
                    <Label className="text-lg font-semibold">Custom Size</Label>
                    <div className="flex items-center gap-2">
                        <Input type="number" placeholder="Width" value={customWidth} onChange={e => setCustomWidth(e.target.value)} />
                        <Input type="number" placeholder="Height" value={customHeight} onChange={e => setCustomHeight(e.target.value)} />
                        <select value={unit} onChange={e => setUnit(e.target.value as 'px' | 'cm')} className="h-10 rounded-md border border-input bg-background px-3 text-sm">
                            <option value="px">px</option>
                            <option value="cm">cm</option>
                        </select>
                    </div>
                     <Button onClick={handleApplyCustomSize} disabled={!customWidth || !customHeight} className="w-full">
                        <CropIcon className="mr-2 h-4 w-4" /> Apply Custom Size
                    </Button>
                    <p className="text-xs text-muted-foreground">Note: 'cm' is based on a standard 96 DPI screen resolution.</p>
                </div>
                 {completedCrop && (
                    <div className="space-y-2 text-sm">
                        <h3 className="text-lg font-semibold">Selection Size</h3>
                        <p><strong>Width:</strong> {Math.round(completedCrop.width)}px</p>
                        <p><strong>Height:</strong> {Math.round(completedCrop.height)}px</p>
                    </div>
                )}
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
