'use client';

import { useState, useEffect } from 'react';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Play, Pause, StopCircle, Trash2, Copy, Volume2 } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Slider } from '@/components/ui/slider';
import { Label } from '@/components/ui/label';

export function TextToSpeech() {
  const [text, setText] = useState('Hello, welcome to MultiToolSuite. You can convert any text into speech here.');
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [voices, setVoices] = useState<SpeechSynthesisVoice[]>([]);
  const [selectedVoice, setSelectedVoice] = useState<SpeechSynthesisVoice | null>(null);
  const [rate, setRate] = useState(1);
  const [pitch, setPitch] = useState(1);

  const { toast } = useToast();

  useEffect(() => {
    const handleVoicesChanged = () => {
      const availableVoices = window.speechSynthesis.getVoices();
      setVoices(availableVoices);
      // Set a default voice
      const defaultVoice = availableVoices.find(voice => voice.lang.startsWith('en')) || availableVoices[0];
      setSelectedVoice(defaultVoice);
    };
    
    window.speechSynthesis.onvoiceschanged = handleVoicesChanged;
    handleVoicesChanged(); // Initial call
    
    return () => {
        window.speechSynthesis.onvoiceschanged = null;
        window.speechSynthesis.cancel();
    }
  }, []);

  const handlePlay = () => {
    if (isSpeaking && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
      return;
    }

    if (!text.trim()) {
      toast({ title: 'No text to speak', description: 'Please enter some text in the textarea.', variant: 'destructive' });
      return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    if(selectedVoice) utterance.voice = selectedVoice;
    utterance.rate = rate;
    utterance.pitch = pitch;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
    };
    
    utterance.onerror = (event) => {
        toast({ title: 'Speech Error', description: event.error, variant: 'destructive'});
        setIsSpeaking(false);
        setIsPaused(false);
    }

    window.speechSynthesis.speak(utterance);
  };

  const handlePause = () => {
    window.speechSynthesis.pause();
    setIsPaused(true);
  };

  const handleStop = () => {
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    setIsPaused(false);
  };

  const handleCopy = () => {
    if (!text) return;
    navigator.clipboard.writeText(text);
    toast({ title: 'Copied to clipboard!' });
  };

  const handleClear = () => {
    setText('');
    handleStop();
  };
  
  const handleVoiceChange = (value: string) => {
    const voice = voices.find(v => v.name === value);
    if (voice) setSelectedVoice(voice);
  };

  return (
    <Card>
      <CardContent className="pt-6 space-y-4">
        <Textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here..."
          className="min-h-[300px] text-base"
          disabled={isSpeaking}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className='space-y-2'>
                <Label>Voice</Label>
                <Select onValueChange={handleVoiceChange} value={selectedVoice?.name}>
                    <SelectTrigger>
                        <SelectValue placeholder="Select a voice" />
                    </SelectTrigger>
                    <SelectContent>
                        {voices.map(voice => (
                            <SelectItem key={voice.name} value={voice.name}>
                                {voice.name} ({voice.lang})
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
            <div className='space-y-2'>
                <Label>Speed: {rate.toFixed(1)}x</Label>
                <Slider defaultValue={[1]} min={0.5} max={2} step={0.1} onValueChange={(value) => setRate(value[0])} />
            </div>
             <div className='space-y-2'>
                <Label>Pitch: {pitch.toFixed(1)}</Label>
                <Slider defaultValue={[1]} min={0} max={2} step={0.1} onValueChange={(value) => setPitch(value[0])} />
            </div>
        </div>
        <div className="flex flex-wrap gap-2">
          {!isSpeaking || isPaused ? (
            <Button onClick={handlePlay} disabled={!text}>
              <Play className="mr-2 h-4 w-4" /> {isPaused ? 'Resume' : 'Play'}
            </Button>
          ) : (
            <Button onClick={handlePause}>
              <Pause className="mr-2 h-4 w-4" /> Pause
            </Button>
          )}
          <Button variant="destructive" onClick={handleStop} disabled={!isSpeaking}>
            <StopCircle className="mr-2 h-4 w-4" /> Stop
          </Button>
          <Button variant="secondary" onClick={handleCopy} disabled={!text}>
            <Copy className="mr-2 h-4 w-4" /> Copy
          </Button>
          <Button variant="outline" onClick={handleClear} disabled={!text}>
            <Trash2 className="mr-2 h-4 w-4" /> Clear
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}