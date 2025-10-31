import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface NavigationProps {
  activeSection: string;
  onSectionChange: (section: string) => void;
  userType?: "student" | "teacher" | "admin";
  onLogout?: () => void;
}

export const Navigation = ({
  activeSection,
  onSectionChange,
  userType = "student",
  onLogout,
}: NavigationProps) => {
  const getNavItems = () => {
    const commonItems = [
      { id: "home", label: "Home", icon: "🏠" },
      
    ];

    switch (userType) {
      case "student":
        return [
          ...commonItems,
          { id: "learn", label: "Learn", icon: "📚" },
          { id: "quiz", label: "Quiz", icon: "🧠" },
          { id: "games", label: "Games", icon: "🎮" },
          { id: "collection", label: "Contribute", icon: "🌍" },
        ];

      case "teacher":
        return [
          ...commonItems,
          { id: "classroom", label: "My Classes", icon: "👨‍🏫" },
          { id: "create", label: "Create Content", icon: "✏️" },
          { id: "analytics", label: "Analytics", icon: "📊" },
          { id: "students", label: "Students", icon: "👥" },
          { id: "profile", label: "Profile", icon: "👤" },
        ];

      case "admin":
        return [
          ...commonItems,
          { id: "schools", label: "Schools", icon: "🏫" },
          { id: "users", label: "Users", icon: "👥" },
          { id: "content", label: "Content", icon: "📝" },
          { id: "reports", label: "Reports", icon: "📊" },
          { id: "settings", label: "Settings", icon: "⚙️" },
        ];

      default:
        return commonItems;
    }
  };

  const navItems = getNavItems();

  return (
    <nav className="sticky top-0 bg-background/80 backdrop-blur-md border-b border-border z-50">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo + Title */}
          <div className="flex items-center gap-3">
            <div className="text-2xl">🌱</div>
            <h1 className="text-xl font-bold bg-gradient-nature bg-clip-text text-transparent">
              EcoLearn
            </h1>
            {userType !== "student" && (
              <div className="ml-4 px-3 py-1 bg-primary/10 text-primary text-xs rounded-full font-medium">
                {userType === "teacher" ? "Teacher Portal" : "Admin Portal"}
              </div>
            )}
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-2">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className={cn(
                  "flex items-center gap-2 transition-all duration-300",
                  activeSection === item.id && "shadow-nature"
                )}
              >
                <span>{item.icon}</span>
                <span>{item.label}</span>
              </Button>
            ))}
            {onLogout && (
              <Button
                variant="ghost"
                size="sm"
                onClick={onLogout}
                className="ml-2"
              >
                Logout
              </Button>
            )}
          </div>

          {/* User Avatar Placeholder */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-full bg-gradient-nature flex items-center justify-center text-white font-semibold cursor-pointer">
              DP
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div className="lg:hidden pb-4">
          <div className="flex gap-1 overflow-x-auto">
            {navItems.map((item) => (
              <Button
                key={item.id}
                variant={activeSection === item.id ? "default" : "ghost"}
                size="sm"
                onClick={() => onSectionChange(item.id)}
                className="flex items-center gap-2 whitespace-nowrap"
              >
                <span>{item.icon}</span>
                <span className="text-xs">{item.label}</span>
              </Button>
            ))}
            {onLogout && (
              <Button variant="ghost" size="sm" onClick={onLogout}>
                Logout
              </Button>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};
