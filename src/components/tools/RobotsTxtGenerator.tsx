
'use client';

import { useState, useMemo } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { useToast } from '@/hooks/use-toast';
import { Copy, Download, PlusCircle, Trash2 } from 'lucide-react';

interface Rule {
  id: number;
  userAgent: string;
  disallow: string;
}

export function RobotsTxtGenerator() {
  const [defaultPolicy, setDefaultPolicy] = useState<'allow' | 'disallow'>('allow');
  const [rules, setRules] = useState<Rule[]>([]);
  const [sitemapUrl, setSitemapUrl] = useState('');
  const { toast } = useToast();

  const generatedContent = useMemo(() => {
    let content = '';
    
    if (defaultPolicy === 'allow') {
        content += 'User-agent: *\n';
        content += 'Disallow:\n\n';
    } else {
        content += 'User-agent: *\n';
        content += 'Disallow: /\n\n';
    }

    rules.forEach(rule => {
        content += `User-agent: ${rule.userAgent || '*'}\n`;
        content += `Disallow: ${rule.disallow || ''}\n\n`;
    });

    if (sitemapUrl) {
      content += `Sitemap: ${sitemapUrl}\n`;
    }

    return content.trim();
  }, [defaultPolicy, rules, sitemapUrl]);

  const addRule = () => {
    setRules([...rules, { id: Date.now(), userAgent: '', disallow: '/' }]);
  };

  const removeRule = (id: number) => {
    setRules(rules.filter(rule => rule.id !== id));
  };

  const updateRule = (id: number, field: keyof Omit<Rule, 'id'>, value: string) => {
    setRules(rules.map(rule => (rule.id === id ? { ...rule, [field]: value } : rule)));
  };
  
  const handleCopy = () => {
    navigator.clipboard.writeText(generatedContent);
    toast({ title: 'Copied to clipboard!' });
  };
  
  const handleDownload = () => {
    const blob = new Blob([generatedContent], { type: 'text/plain' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'robots.txt';
    a.click();
    URL.revokeObjectURL(url);
    toast({ title: 'robots.txt downloaded!' });
  };

  return (
    <Card>
      <CardContent className="pt-6 grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
            <div className="space-y-3">
                <Label className="font-semibold text-base">Default Policy for All Crawlers</Label>
                 <RadioGroup value={defaultPolicy} onValueChange={(v: any) => setDefaultPolicy(v)} className="flex gap-4">
                    <div className="flex items-center space-x-2"><RadioGroupItem value="allow" id="allow" /><Label htmlFor="allow">Allow All</Label></div>
                    <div className="flex items-center space-x-2"><RadioGroupItem value="disallow" id="disallow" /><Label htmlFor="disallow">Disallow All</Label></div>
                </RadioGroup>
            </div>
            
            <div className="space-y-4">
                <Label className="font-semibold text-base">Specific Rules for Crawlers</Label>
                {rules.map(rule => (
                    <div key={rule.id} className="p-4 border rounded-md space-y-3 relative">
                        <Button variant="ghost" size="icon" className="absolute top-1 right-1 h-7 w-7" onClick={() => removeRule(rule.id)}>
                            <Trash2 className="h-4 w-4 text-destructive"/>
                        </Button>
                        <div className="space-y-1">
                            <Label htmlFor={`ua-${rule.id}`}>User-agent</Label>
                            <Input id={`ua-${rule.id}`} value={rule.userAgent} onChange={e => updateRule(rule.id, 'userAgent', e.target.value)} placeholder="e.g., Googlebot" />
                        </div>
                        <div className="space-y-1">
                            <Label htmlFor={`disallow-${rule.id}`}>Disallow Path</Label>
                            <Input id={`disallow-${rule.id}`} value={rule.disallow} onChange={e => updateRule(rule.id, 'disallow', e.target.value)} placeholder="e.g., /private/" />
                        </div>
                    </div>
                ))}
                 <Button variant="outline" onClick={addRule}>
                    <PlusCircle className="mr-2"/> Add Rule
                </Button>
            </div>
            
            <div className="space-y-2">
                 <Label htmlFor="sitemap" className="font-semibold text-base">Sitemap URL (Optional)</Label>
                <Input id="sitemap" value={sitemapUrl} onChange={e => setSitemapUrl(e.target.value)} placeholder="https://your-website.com/sitemap.xml" />
            </div>
        </div>

        <div className="space-y-4">
            <Label className="font-semibold text-base">Generated robots.txt</Label>
            <Textarea
                readOnly
                value={generatedContent}
                className="min-h-[400px] font-mono text-sm bg-muted/50"
            />
            <div className="flex gap-2">
                <Button onClick={handleCopy} disabled={!generatedContent} className="w-full">
                    <Copy className="mr-2" /> Copy to Clipboard
                </Button>
                 <Button onClick={handleDownload} disabled={!generatedContent} variant="secondary" className="w-full">
                    <Download className="mr-2" /> Download File
                </Button>
            </div>
        </div>
      </CardContent>
    </Card>
  );
}
