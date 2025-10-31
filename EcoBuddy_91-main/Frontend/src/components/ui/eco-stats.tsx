import { cn } from "@/lib/utils";
import { Card, CardContent } from "./card";

interface EcoStatsProps {
  stats: {
    label: string;
    value: string | number;
    icon: string;
    trend?: "up" | "down" | "stable";
    trendValue?: string;
  }[];
  className?: string;
}

export const EcoStats = ({ stats, className }: EcoStatsProps) => {
  const getTrendColor = (trend?: string) => {
    switch (trend) {
      case "up": return "text-success";
      case "down": return "text-destructive";
      default: return "text-muted-foreground";
    }
  };

  return (
    <div className={cn("grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4", className)}>
      {stats.map((stat, index) => (
        <Card key={index} className="hover:shadow-card transition-all duration-300">
          <CardContent className="p-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">{stat.label}</p>
                <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                {stat.trend && stat.trendValue && (
                  <p className={cn("text-xs mt-1", getTrendColor(stat.trend))}>
                    {stat.trend === "up" ? "↗" : stat.trend === "down" ? "↘" : "→"} {stat.trendValue}
                  </p>
                )}
              </div>
              <div className="text-3xl opacity-70">{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};