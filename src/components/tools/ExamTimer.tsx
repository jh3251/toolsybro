
'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Play, Pause, RefreshCcw } from 'lucide-react';

const formatTime = (time: number) => {
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
  return `${hours}:${minutes}:${seconds}`;
};

export function ExamTimer() {
  const [hours, setHours] = useState(1);
  const [minutes, setMinutes] = useState(30);
  
  const [timeLeft, setTimeLeft] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isFinished, setIsFinished] = useState(false);

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  
  useEffect(() => {
    // Only create audio element on the client
    if (typeof window !== 'undefined') {
        audioRef.current = new Audio('/sounds/notification.mp3');
    }
  }, []);

  const startTimer = useCallback(() => {
    if (timerRef.current) clearInterval(timerRef.current);
    
    setIsRunning(true);
    setIsFinished(false);

    const endTime = Date.now() + timeLeft;

    timerRef.current = setInterval(() => {
      const newTimeLeft = endTime - Date.now();
      if (newTimeLeft <= 0) {
        if (timerRef.current) clearInterval(timerRef.current);
        setTimeLeft(0);
        setIsRunning(false);
        setIsFinished(true);
        audioRef.current?.play().catch(e => console.error("Error playing audio:", e));
      } else {
        setTimeLeft(newTimeLeft);
      }
    }, 100);
  }, [timeLeft]);

  const handleStartPause = () => {
    if (isRunning) {
      if (timerRef.current) clearInterval(timerRef.current);
      setIsRunning(false);
    } else {
      let totalTime = (hours * 3600 + minutes * 60) * 1000;
      if (timeLeft > 0) {
        // Resume
        startTimer();
      } else if (totalTime > 0) {
        // Start from beginning
        setTimeLeft(totalTime);
        // Using a timeout to ensure state updates before starting interval
        setTimeout(() => {
             const endTime = Date.now() + totalTime;
             timerRef.current = setInterval(() => {
                const newTimeLeft = endTime - Date.now();
                if (newTimeLeft <= 0) {
                    if (timerRef.current) clearInterval(timerRef.current);
                    setTimeLeft(0);
                    setIsRunning(false);
                    setIsFinished(true);
                    audioRef.current?.play().catch(e => console.error("Error playing audio:", e));
                } else {
                    setTimeLeft(newTimeLeft);
                }
            }, 100);
            setIsRunning(true);
            setIsFinished(false);
        }, 10)
      }
    }
  };

  const handleReset = () => {
    if (timerRef.current) clearInterval(timerRef.current);
    setIsRunning(false);
    setIsFinished(false);
    setTimeLeft(0);
  };
  
  useEffect(() => {
      return () => {
          if (timerRef.current) clearInterval(timerRef.current);
      }
  }, []);

  const isTimeSet = hours > 0 || minutes > 0;
  const isPristine = timeLeft === 0 && !isRunning;

  return (
    <Card>
      <CardContent className="pt-6 flex flex-col items-center justify-center space-y-8">
        {isPristine ? (
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-4xl font-mono">
                <Input value={String(hours).padStart(2, '0')} onChange={(e) => setHours(Math.max(0, parseInt(e.target.value) || 0))} type="number" className="w-28 h-20 text-center text-4xl p-0 bg-muted/50 border-none"/>
                <span className="text-4xl">:</span>
                <Input value={String(minutes).padStart(2, '0')} onChange={(e) => setMinutes(Math.max(0, parseInt(e.target.value) || 0))} type="number" className="w-28 h-20 text-center text-4xl p-0 bg-muted/50 border-none"/>
            </div>
        ) : (
            <div className={`text-7xl md:text-9xl font-mono tabular-nums tracking-tighter text-center p-4 rounded-lg w-full ${isFinished ? 'text-destructive animate-pulse' : ''}`}>
                {isFinished ? "00:00:00" : formatTime(timeLeft)}
            </div>
        )}

        <div className="flex flex-wrap items-center justify-center gap-4">
            <Button onClick={handleStartPause} className="w-32" size="lg" disabled={isPristine && !isTimeSet}>
                {isRunning ? <Pause className="mr-2"/> : <Play className="mr-2"/>}
                {isRunning ? 'Pause' : (timeLeft > 0 ? 'Resume' : 'Start')}
            </Button>
            <Button onClick={handleReset} variant="destructive" className="w-32" size="lg" disabled={isPristine}>
                <RefreshCcw className="mr-2"/>
                Reset
            </Button>
        </div>
      </CardContent>
    </Card>
  );
}
