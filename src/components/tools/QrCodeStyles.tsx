
'use client';

import { type DotType, type CornerSquareType, type CornerDotType } from 'qr-code-styling';
import { Button } from '../ui/button';
import { cn } from '@/lib/utils';
import { ScrollArea, ScrollBar } from '../ui/scroll-area';

const bodyStyles: DotType[] = [
    'square', 'dots', 'rounded', 'extra-rounded', 'classy', 'classy-rounded'
];

const eyeFrameStyles: CornerSquareType[] = [
    'square', 'extra-rounded', 'dot'
];

const eyeBallStyles: CornerDotType[] = [
    'square', 'dot'
];

const StyleButton = ({ selected, onClick, children }: { selected: boolean; onClick: () => void; children: React.ReactNode }) => (
    <Button
        variant={selected ? 'secondary' : 'outline'}
        className={cn('h-16 w-16 p-1 flex items-center justify-center flex-shrink-0', selected && 'border-2 border-primary')}
        onClick={onClick}
    >
        {children}
    </Button>
)

export function QrCodeBodyStyle({ selected, onSelect }: { selected: DotType, onSelect: (style: DotType) => void }) {
    return (
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-2 p-1">
                {bodyStyles.map(style => (
                    <StyleButton key={style} selected={selected === style} onClick={() => onSelect(style)}>
                        <svg width="48" height="48" viewBox="0 0 100 100">
                            {/* This is a simplified representation */}
                            {style === 'square' && <rect x="10" y="10" width="80" height="80" />}
                            {style === 'dots' && <circle cx="50" cy="50" r="40" />}
                            {style === 'rounded' && <rect x="10" y="10" width="80" height="80" rx="20" />}
                            {style === 'extra-rounded' && <rect x="10" y="10" width="80" height="80" rx="40" />}
                            {style === 'classy' && <><rect x="10" y="10" width="80" height="80" rx="10" /><circle cx="50" cy="50" r="20" fill="white"/></>}
                            {style === 'classy-rounded' && <><rect x="10" y="10" width="80" height="80" rx="30" /><circle cx="50" cy="50" r="15" fill="white"/></>}
                        </svg>
                    </StyleButton>
                ))}
            </div>
             <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}

export function QrCodeEyeFrameStyle({ selected, onSelect }: { selected: CornerSquareType, onSelect: (style: CornerSquareType) => void }) {
    return (
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-2 p-1">
                {eyeFrameStyles.map(style => (
                    <StyleButton key={style} selected={selected === style} onClick={() => onSelect(style)}>
                        <svg width="48" height="48" viewBox="0 0 100 100" fill="none" stroke="black" strokeWidth="12">
                            {style === 'square' && <rect x="10" y="10" width="80" height="80" />}
                            {style === 'extra-rounded' && <rect x="10" y="10" width="80" height="80" rx="35" />}
                            {style === 'dot' && <rect x="10" y="10" width="80" height="80" rx="50" />}
                        </svg>
                    </StyleButton>
                ))}
            </div>
             <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}

export function QrCodeEyeBallStyle({ selected, onSelect }: { selected: CornerDotType, onSelect: (style: CornerDotType) => void }) {
    return (
        <ScrollArea className="w-full whitespace-nowrap rounded-md">
            <div className="flex w-max space-x-2 p-1">
                {eyeBallStyles.map(style => (
                    <StyleButton key={style} selected={selected === style} onClick={() => onSelect(style)}>
                        <svg width="48" height="48" viewBox="0 0 100 100" fill="black">
                            {style === 'square' && <rect x="25" y="25" width="50" height="50" />}
                            {style === 'dot' && <circle cx="50" cy="50" r="25" />}
                        </svg>
                    </StyleButton>
                ))}
            </div>
             <ScrollBar orientation="horizontal" />
        </ScrollArea>
    );
}
