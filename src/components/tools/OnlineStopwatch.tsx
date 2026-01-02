'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Play, Pause, RefreshCcw, Flag } from 'lucide-react';
import { ScrollArea } from '@/components/ui/scroll-area';

const formatTime = (time: number) => {
  const milliseconds = `00${time % 1000}`.slice(-3, -1);
  const seconds = `0${Math.floor(time / 1000) % 60}`.slice(-2);
  const minutes = `0${Math.floor(time / 60000) % 60}`.slice(-2);
  const hours = `0${Math.floor(time / 3600000)}`.slice(-2);
  return `${hours}:${minutes}:${seconds}.${milliseconds}`;
};

export function OnlineStopwatch() {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<number[]>([]);
  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const lastUpdateTimeRef = useRef<number>(0);

  const start = () => {
    if (isRunning) return;
    setIsRunning(true);
    lastUpdateTimeRef.current = Date.now();
    timerRef.current = setInterval(() => {
      const now = Date.now();
      const delta = now - lastUpdateTimeRef.current;
      setTime(prevTime => prevTime + delta);
      lastUpdateTimeRef.current = now;
    }, 10); // Update every 10ms for accuracy
  };

  const stop = () => {
    if (timerRef.current) {
      clearInterval(timerRef.current);
    }
    setIsRunning(false);
  };

  const reset = () => {
    stop();
    setTime(0);
    setLaps([]);
  };

  const lap = () => {
    setLaps(prevLaps => [time, ...prevLaps]);
  };
  
  const handleStartStop = () => {
    if (isRunning) {
        stop();
    } else {
        start();
    }
  }
  
  useEffect(() => {
    return () => {
        if(timerRef.current) clearInterval(timerRef.current);
    }
  }, []);

  return (
    <Card>
      <CardContent className="pt-6 flex flex-col items-center justify-center space-y-8">
        <div className="text-6xl md:text-8xl font-mono tabular-nums tracking-tighter text-center bg-muted/50 p-4 rounded-lg w-full">
            {formatTime(time)}
        </div>
        
        <div className="flex flex-wrap items-center justify-center gap-4">
            <Button onClick={handleStartStop} className="w-32">
                {isRunning ? <Pause className="mr-2"/> : <Play className="mr-2"/>}
                {isRunning ? 'Pause' : 'Start'}
            </Button>
             <Button onClick={lap} variant="secondary" className="w-32" disabled={!isRunning && time === 0}>
                <Flag className="mr-2"/>
                Lap
            </Button>
            <Button onClick={reset} variant="destructive" className="w-32" disabled={!isRunning && time === 0}>
                <RefreshCcw className="mr-2"/>
                Reset
            </Button>
        </div>
        
        {laps.length > 0 && (
            <div className="w-full max-w-md pt-4">
                <h3 className="text-lg font-semibold text-center mb-2">Laps</h3>
                <ScrollArea className="h-64 w-full rounded-md border">
                    <div className="p-4 font-mono">
                        {laps.map((lapTime, index) => {
                            const lapNumber = laps.length - index;
                            const prevLapTime = laps[index + 1] || 0;
                            const lapDuration = lapTime - prevLapTime;
                            return (
                                <div key={index} className="flex justify-between items-center py-2 border-b last:border-b-0">
                                    <span className='text-muted-foreground'>Lap {lapNumber}</span>
                                    <span className='text-sm text-primary'>+{formatTime(lapDuration)}</span>
                                    <span>{formatTime(lapTime)}</span>
                                </div>
                            );
                        })}
                    </div>
                </ScrollArea>
            </div>
        )}
      </CardContent>
    </Card>
  );
}
