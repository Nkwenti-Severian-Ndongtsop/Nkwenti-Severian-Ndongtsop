import { ReactNode } from "react";

interface TechStackProps {
  icon: ReactNode;
  name: string;
  description?: string;
  proficiency?: number;
}

const TechStack = ({ icon, name, description, proficiency }: TechStackProps) => {
  return (
    <div className="group glass rounded-lg p-6 hover-lift">
      <div className="flex items-center space-x-4 mb-3">
        <div className="p-2 rounded-lg bg-gradient-primary text-primary-foreground group-hover:animate-pulse-glow">
          {icon}
        </div>
        <div>
          <h3 className="font-semibold text-lg">{name}</h3>
          {description && (
            <p className="text-sm text-muted-foreground">{description}</p>
          )}
        </div>
      </div>
      
      {proficiency && (
        <div className="mt-4">
          <div className="flex justify-between text-sm mb-1">
            <span className="text-muted-foreground">Proficiency</span>
            <span className="text-primary">{proficiency}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="h-2 bg-gradient-primary rounded-full transition-all duration-1000 ease-out"
              style={{ width: `${proficiency}%` }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default TechStack;