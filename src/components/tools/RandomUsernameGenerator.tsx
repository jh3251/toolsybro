
'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { Copy, RefreshCw, Loader2 } from 'lucide-react';
import { Input } from '../ui/input';
import { Label } from '../ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../ui/select';
import { countries } from '@/lib/countries';
import { generateUserProfile } from '@/ai/flows/generate-user-profile';
import { RadioGroup, RadioGroupItem } from '../ui/radio-group';

interface UserProfile {
    username: string;
    fullName: string;
    address: string;
}

const InfoField = ({ label, value, onCopy }: { label: string, value: string, onCopy: (value: string) => void }) => (
    <div className='space-y-1'>
        <Label>{label}</Label>
        <div className="relative">
            <Input
                value={value}
                readOnly
                className="font-mono bg-muted/50 pr-10"
            />
            <Button
                size="icon"
                variant="ghost"
                className="absolute right-1 top-1/2 -translate-y-1/2 h-8 w-8"
                onClick={() => onCopy(value)}
            >
                <Copy className="h-4 w-4" />
            </Button>
        </div>
    </div>
);

export function RandomUsernameGenerator() {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [country, setCountry] = useState('United States');
  const [gender, setGender] = useState<'Any' | 'Male' | 'Female'>('Any');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();

  const generateNewProfile = async () => {
    setIsLoading(true);
    try {
        const newProfile = await generateUserProfile({ country, gender });
        setProfile(newProfile);
    } catch (e) {
        console.error(e);
        toast({
            title: "Error Generating Profile",
            description: "Could not generate a new profile. Please try again.",
            variant: 'destructive',
        });
    } finally {
        setIsLoading(false);
    }
  };

  useEffect(() => {
    generateNewProfile();
  }, []); // Generate on initial load

  const handleCopy = (value: string) => {
    if (!value) return;
    navigator.clipboard.writeText(value);
    toast({
      title: 'Copied to clipboard!',
    });
  };

  return (
    <Card>
        <CardHeader>
            <CardTitle>Random Profile Generator</CardTitle>
        </CardHeader>
      <CardContent className="space-y-6">
         <div className='grid grid-cols-1 md:grid-cols-2 gap-4'>
            <div className='space-y-2'>
                <Label htmlFor="country-select">Country</Label>
                <Select value={country} onValueChange={setCountry}>
                    <SelectTrigger id="country-select">
                        <SelectValue placeholder="Select a country" />
                    </SelectTrigger>
                    <SelectContent>
                        {countries.map(c => <SelectItem key={c} value={c}>{c}</SelectItem>)}
                    </SelectContent>
                </Select>
            </div>
             <div className='space-y-2'>
                <Label>Gender</Label>
                <RadioGroup value={gender} onValueChange={(v: any) => setGender(v)} className="flex items-center gap-4 pt-2">
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Any" id="any" />
                        <Label htmlFor="any">Any</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Male" id="male" />
                        <Label htmlFor="male">Male</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                        <RadioGroupItem value="Female" id="female" />
                        <Label htmlFor="female">Female</Label>
                    </div>
                </RadioGroup>
            </div>
        </div>
         <Button onClick={generateNewProfile} disabled={isLoading} className='w-full'>
            {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : <RefreshCw className="mr-2 h-4 w-4" />}
             {isLoading ? 'Generating...' : 'Generate New Profile'}
        </Button>

        {profile ? (
            <div className='space-y-4 pt-4 border-t'>
                <InfoField label="Username" value={profile.username} onCopy={handleCopy} />
                <InfoField label="Full Name" value={profile.fullName} onCopy={handleCopy} />
                <InfoField label="Address" value={profile.address} onCopy={handleCopy} />
            </div>
        ) : (
             <div className="flex items-center justify-center h-48">
                {isLoading ? <Loader2 className="w-8 h-8 animate-spin text-primary" /> : <p>Click "Generate" to create a profile.</p>}
            </div>
        )}
        
      </CardContent>
    </Card>
  );
}
