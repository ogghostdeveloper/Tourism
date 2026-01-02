import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";

interface StatCardProps {
    title: string;
    value: string;
    change?: string;
    trend?: "up" | "down" | "neutral";
    icon: LucideIcon;
}

export function StatCard({ title, value, change, trend, icon: Icon }: StatCardProps) {
    return (
        <Card className="shadow-sm hover:shadow-md transition-shadow">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wider">
                        {title}
                    </span>
                    <div className="w-10 h-10 bg-gray-100 flex items-center justify-center rounded-lg">
                        <Icon className="w-5 h-5 text-gray-700" />
                    </div>
                </div>
                <div className="flex items-end justify-between">
                    <h3 className="text-3xl font-semibold text-black">{value}</h3>
                    {change && (
                        <span className={cn(
                            "text-xs font-medium px-2 py-1",
                            trend === "up" ? "bg-green-50 text-green-700" :
                                trend === "down" ? "bg-red-50 text-red-700" :
                                    "bg-gray-100 text-gray-700"
                        )}>
                            {change}
                        </span>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}
