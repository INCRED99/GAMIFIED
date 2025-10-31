import { cn } from "@/lib/utils";
import { Card, CardContent, CardHeader, CardTitle } from "./card";
import { Button } from "./button";
import { Badge } from "./badge";
import { ProgressRing } from "./progress-ring";

interface ChallengeCardProps {
  title: string;
  description: string;
  category: string;
  difficulty: "beginner" | "intermediate" | "advanced";
  points: number;
  progress?: number;
  completed?: boolean;
  dueDate?: string;
  participants?: number;
  className?: string;
  onStart?: () => void;
}

export const ChallengeCard = ({
  title,
  description,
  category,
  difficulty,
  points,
  progress = 0,
  completed = false,
  dueDate,
  participants,
  className,
  onStart
}: ChallengeCardProps) => {
  const difficultyColors = {
    beginner: "bg-success text-success-foreground",
    intermediate: "bg-warning text-warning-foreground", 
    advanced: "bg-destructive text-destructive-foreground"
  };

  return (
    <Card className={cn(
      "group hover:shadow-nature transition-all duration-300 hover:-translate-y-1",
      completed && "bg-success/5 border-success/20",
      className
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-2">
              <Badge variant="secondary" className="text-xs">
                {category}
              </Badge>
              <Badge className={cn("text-xs", difficultyColors[difficulty])}>
                {difficulty}
              </Badge>
            </div>
            <CardTitle className="text-lg leading-tight">{title}</CardTitle>
          </div>
          {progress > 0 && !completed && (
            <ProgressRing progress={progress} size="sm" />
          )}
          {completed && (
            <div className="text-2xl text-success">✅</div>
          )}
        </div>
      </CardHeader>
      <CardContent className="pt-0">
        <p className="text-sm text-muted-foreground mb-4">{description}</p>
        
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <span className="flex items-center gap-1">
              🏆 {points} points
            </span>
            {participants && (
              <span className="flex items-center gap-1">
                👥 {participants} joined
              </span>
            )}
            {dueDate && (
              <span className="flex items-center gap-1">
                📅 Due {dueDate}
              </span>
            )}
          </div>
        </div>

        <Button 
          onClick={onStart}
          className="w-full"
          variant={completed ? "secondary" : "default"}
          disabled={completed}
        >
          {completed ? "Completed" : progress > 0 ? "Continue" : "Start Challenge"}
        </Button>
      </CardContent>
    </Card>
  );
};