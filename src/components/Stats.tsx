import { Users, FolderGit2, Files, ShieldCheck } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription } from "./ui/card";
import { toolCategories } from "@/lib/data";

export function Stats() {
    const totalTools = toolCategories.reduce((acc, category) => acc + category.tools.length, 0);

    const stats = [
        {
            value: `${totalTools}+`,
            label: "Total Tools",
            icon: FolderGit2,
        },
        {
            value: "15K+",
            label: "Active Users",
            icon: Users,
        },
        {
            value: "50K+",
            label: "Files Processed",
            icon: Files,
        },
        {
            value: "100%",
            label: "Privacy Focused",
            icon: ShieldCheck,
        }
    ];

    return (
        <section className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6">
                    <h3 className="text-4xl font-bold text-primary">{stat.value}</h3>
                    <p className="text-muted-foreground mt-1">{stat.label}</p>
                </Card>
            ))}
        </section>
    );
}
