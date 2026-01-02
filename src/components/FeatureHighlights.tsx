
'use client';

import { Rocket, ShieldCheck, Crown } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { motion } from "framer-motion";

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
];

const cardVariants = {
    offscreen: {
        y: 50,
        opacity: 0
    },
    onscreen: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            bounce: 0.4,
            duration: 0.8
        }
    }
};

export function FeatureHighlights() {
    return (
        <section className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {features.map((feature, index) => (
                    <motion.div
                        key={index}
                        initial="offscreen"
                        whileInView="onscreen"
                        viewport={{ once: true, amount: 0.5 }}
                        variants={cardVariants}
                        transition={{ delay: index * 0.1 }}
                    >
                        <Card className="text-center h-full transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
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
                    </motion.div>
                ))}
            </div>
        </section>
    )
}
