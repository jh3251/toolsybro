
'use client';

import { useEffect, useRef } from "react";
import { useInView, useMotionValue, useSpring } from "framer-motion";
import { Users, FolderGit2, Files, ShieldCheck } from "lucide-react";
import { Card } from "./ui/card";
import { toolCategories } from "@/lib/data";

const AnimatedNumber = ({ value, isInt = true }: { value: number, isInt?: boolean }) => {
  const ref = useRef<HTMLSpanElement>(null);
  const motionValue = useMotionValue(0);
  const springValue = useSpring(motionValue, {
    damping: 60,
    stiffness: 100,
  });
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      motionValue.set(value);
    }
  }, [motionValue, isInView, value]);

  useEffect(() => {
    const unsubscribe = springValue.on("change", (latest) => {
        if (ref.current) {
            if (isInt) {
                ref.current.textContent = Intl.NumberFormat("en-US").format(Math.round(latest));
            } else {
                ref.current.textContent = Intl.NumberFormat("en-US", { maximumFractionDigits: 1 }).format(latest);
            }
        }
    });
    return unsubscribe;
  }, [springValue, isInt]);

  return <span ref={ref}>0</span>;
};


export function Stats() {
    const totalTools = toolCategories.reduce((acc, category) => acc + category.tools.length, 0);

    const stats = [
        {
            value: totalTools,
            suffix: '+',
            label: "Total Tools",
            icon: FolderGit2,
        },
        {
            value: 15,
            suffix: 'K+',
            label: "Active Users",
            icon: Users,
        },
        {
            value: 50,
            suffix: 'K+',
            label: "Files Processed",
            icon: Files,
        },
        {
            value: 100,
            suffix: '%',
            label: "Privacy Focused",
            icon: ShieldCheck,
        }
    ];

    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6">
                    <h3 className="text-4xl font-bold text-primary">
                        <AnimatedNumber value={stat.value} isInt={stat.suffix !== '%'} />{stat.suffix}
                    </h3>
                    <p className="text-muted-foreground mt-1">{stat.label}</p>
                </Card>
            ))}
        </section>
    );
}
