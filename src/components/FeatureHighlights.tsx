
import { Rocket, ShieldCheck, Crown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";

const features = [
    {
        icon: ShieldCheck,
        title: "100% Private",
        description: "All processing happens locally in your browser. Your files never leave your device."
    },
    {
        icon: Rocket,
        title: "Lightning Fast",
        description: "No upload delays. Process files instantly with WebAssembly technology."
    },
    {
        icon: Crown,
        title: "Completely Free",
        description: "No subscriptions, no watermarks, no limitations. Forever free to use."
    }
]

export function FeatureHighlights() {
    return (
        <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <Card key={index} className="text-center">
                        <CardHeader>
                            <div className="flex justify-center mb-4">
                                <div className="p-4 bg-primary/10 rounded-full text-primary">
                                    <feature.icon className="h-8 w-8" />
                                </div>
                            </div>
                            <CardTitle>{feature.title}</CardTitle>
                            <CardDescription>{feature.description}</CardDescription>
                        </CardHeader>
                    </Card>
                ))}
            </div>
        </section>
    )
}
