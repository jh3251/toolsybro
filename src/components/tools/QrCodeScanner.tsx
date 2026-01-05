
'use client';

import { useState, useEffect, useRef } from 'react';
import { Html5Qrcode, type QrcodeSuccessCallback } from 'html5-qrcode';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Camera, CameraOff, Copy, ExternalLink, AlertTriangle, Link as LinkIcon, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export function QrCodeScanner() {
  const [isScanning, setIsScanning] = useState(false);
  const [scanResult, setScanResult] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const scannerRef = useRef<Html5Qrcode | null>(null);
  const scannerRegionRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const startScanner = async () => {
    if (scannerRegionRef.current && !scannerRef.current) {
      const newScanner = new Html5Qrcode(scannerRegionRef.current.id);
      scannerRef.current = newScanner;

      try {
        await newScanner.start(
          { facingMode: 'environment' },
          {
            fps: 10,
            qrbox: { width: 250, height: 250 },
          },
          (decodedText: string) => {
            setScanResult(decodedText);
            stopScanner();
            toast({ title: "QR Code Scanned!", description: "Content displayed below." });
          },
          (errorMessage) => {
            // This is the error callback, often called when no QR code is found. We can ignore it.
          }
        );
        setIsScanning(true);
        setError(null);
      } catch (err: any) {
        console.error('QR Scanner Error:', err);
        setError('Could not start the camera. Please grant camera permissions and try again.');
        scannerRef.current = null;
      }
    }
  };

  const stopScanner = () => {
    if (scannerRef.current && scannerRef.current.isScanning) {
      scannerRef.current.stop().then(() => {
        setIsScanning(false);
        scannerRef.current = null;
      }).catch(err => {
        console.error("Failed to stop scanner", err);
      });
    }
  };

  useEffect(() => {
    return () => {
      // Cleanup on component unmount
      if (scannerRef.current && scannerRef.current.isScanning) {
        stopScanner();
      }
    };
  }, []);

  const handleCopy = () => {
    if (!scanResult) return;
    navigator.clipboard.writeText(scanResult);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const isUrl = (text: string) => {
    try {
      new URL(text);
      return true;
    } catch (_) {
      return false;
    }
  }

  return (
    <Card>
      <CardContent className="pt-6 space-y-6">
        <div id="qr-reader" ref={scannerRegionRef} className="w-full h-96 rounded-lg bg-muted flex items-center justify-center text-muted-foreground overflow-hidden">
          {!isScanning && (
            <div className="text-center">
              <Camera className="mx-auto h-16 w-16 mb-4" />
              <p>Camera is off. Click below to start scanning.</p>
            </div>
          )}
        </div>
        
        {error && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Camera Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {scanResult && (
          <Alert>
             <Info className="h-4 w-4" />
            <AlertTitle>Scan Result</AlertTitle>
            <AlertDescription className="break-all">{scanResult}</AlertDescription>
          </Alert>
        )}
      </CardContent>
      <CardFooter className="flex flex-wrap gap-2">
         <Button onClick={isScanning ? stopScanner : startScanner}>
          {isScanning ? <CameraOff className="mr-2" /> : <Camera className="mr-2" />}
          {isScanning ? 'Stop Scanning' : 'Start Camera'}
        </Button>
         <Button variant="secondary" onClick={handleCopy} disabled={!scanResult}>
          <Copy className="mr-2" /> Copy Result
        </Button>
        {scanResult && isUrl(scanResult) && (
            <Button asChild variant="outline">
                <a href={scanResult} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="mr-2" /> Open Link
                </a>
            </Button>
        )}
      </CardFooter>
    </Card>
  );
}
