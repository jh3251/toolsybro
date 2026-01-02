'use client';

import { useState, useEffect, useRef } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Mic, MicOff, Copy, Trash2 } from 'lucide-react';

// Shim for webkitSpeechRecognition
const SpeechRecognition =
  (typeof window !== 'undefined' && (window.SpeechRecognition || window.webkitSpeechRecognition));


export function SpeechToText() {
  const [transcript, setTranscript] = useState('');
  const [isListening, setIsListening] = useState(false);
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const { toast } = useToast();

  useEffect(() => {
    if (!SpeechRecognition) {
      toast({
        title: 'Browser Not Supported',
        description: 'Speech recognition is not supported by your browser. Try Chrome or Edge.',
        variant: 'destructive',
      });
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.continuous = true;
    recognition.interimResults = true;
    recognition.lang = 'en-US';

    recognition.onresult = (event) => {
      let finalTranscript = '';
      let interimTranscript = '';
      for (let i = event.resultIndex; i < event.results.length; ++i) {
        if (event.results[i].isFinal) {
          finalTranscript += event.results[i][0].transcript;
        } else {
          interimTranscript += event.results[i][0].transcript;
        }
      }
      setTranscript(prev => prev + finalTranscript);
    };

    recognition.onerror = (event) => {
      toast({ title: 'Recognition Error', description: `Error: ${event.error}`, variant: 'destructive' });
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
    };
  }, [toast]);

  const toggleListening = () => {
    if (!recognitionRef.current) return;

    if (isListening) {
      recognitionRef.current.stop();
    } else {
      setTranscript(''); // Clear previous transcript
      recognitionRef.current.start();
    }
    setIsListening(!isListening);
  };

  const handleCopy = () => {
    if (!transcript) return;
    navigator.clipboard.writeText(transcript);
    toast({ title: 'Copied to clipboard!' });
  };

  const handleClear = () => {
    setTranscript('');
    if (isListening) {
        toggleListening();
    }
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={toggleListening} disabled={!SpeechRecognition}>
            {isListening ? (
              <>
                <MicOff className="mr-2 h-4 w-4" /> Stop Listening
              </>
            ) : (
              <>
                <Mic className="mr-2 h-4 w-4" /> Start Listening
              </>
            )}
          </Button>
          <Button variant="secondary" onClick={handleCopy} disabled={!transcript}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!transcript}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
        <Textarea
          value={transcript}
          readOnly
          placeholder={isListening ? 'Listening...' : 'Click "Start Listening" and speak. Your words will appear here.'}
          className="min-h-[300px] text-base bg-muted/30"
        />
        {!SpeechRecognition && <p className="text-destructive text-sm text-center">Your browser does not support the Web Speech API. Please try a different browser like Chrome.</p>}
      </CardContent>
    </Card>
  );
}