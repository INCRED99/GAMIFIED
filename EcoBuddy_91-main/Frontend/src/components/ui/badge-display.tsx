import { cn } from "@/lib/utils";
import { Badge } from "./badge";

interface BadgeDisplayProps {
  title: string;
  description: string;
  icon: string;
  earned?: boolean;
  rarity?: "common" | "rare" | "epic" | "legendary";
  className?: string;
}

export const BadgeDisplay = ({ 
  title, 
  description, 
  icon, 
  earned = false,
  rarity = "common",
  className 
}: BadgeDisplayProps) => {
  const rarityColors = {
    common: "bg-muted text-muted-foreground",
    rare: "bg-accent text-accent-foreground",
    epic: "bg-warning text-warning-foreground",
    legendary: "bg-gradient-nature text-primary-foreground"
  };

  return (
    <div className={cn(
      "group relative p-4 rounded-lg border transition-all duration-300 hover:shadow-card",
      earned ? "bg-card border-primary/20 shadow-sm" : "bg-muted/50 border-muted opacity-60",
      className
    )}>
      <div className="flex items-center gap-3">
        <div className={cn(
          "w-12 h-12 rounded-full flex items-center justify-center text-2xl transition-all duration-300",
          earned ? rarityColors[rarity] : "bg-muted text-muted-foreground",
          earned && rarity === "legendary" && "animate-pulse-glow"
        )}>
          {icon}
        </div>
        <div className="flex-1">
          <h4 className={cn(
            "font-semibold text-sm",
            earned ? "text-foreground" : "text-muted-foreground"
          )}>
            {title}
          </h4>
          <p className="text-xs text-muted-foreground mt-1">
            {description}
          </p>
          {earned && (
            <Badge variant="secondary" className="mt-2 text-xs">
              {rarity} • Earned
            </Badge>
          )}
        </div>
      </div>
    </div>
  );
};