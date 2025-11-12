import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Clock, IndianRupee } from "lucide-react";

interface JobCardProps {
  id: string;
  title: string;
  description: string;
  category: string;
  payment: number;
  location: string;
  postedAt: string;
  distance?: string;
  onClick: () => void;
}

export const JobCard = ({
  title,
  description,
  category,
  payment,
  location,
  postedAt,
  distance,
  onClick,
}: JobCardProps) => {
  return (
    <Card 
      className="p-4 hover:shadow-lg transition-all cursor-pointer border-border bg-gradient-to-b from-card to-muted/20"
      onClick={onClick}
    >
      <div className="flex justify-between items-start mb-3">
        <div className="flex-1">
          <h3 className="font-semibold text-lg text-foreground mb-1">{title}</h3>
          <Badge variant="secondary" className="text-xs">
            {category}
          </Badge>
        </div>
        <div className="flex items-center gap-1 text-primary font-bold text-lg">
          <IndianRupee className="w-4 h-4" />
          {payment}
        </div>
      </div>
      
      <p className="text-muted-foreground text-sm mb-3 line-clamp-2">
        {description}
      </p>
      
      <div className="flex items-center gap-4 text-xs text-muted-foreground">
        <div className="flex items-center gap-1">
          <MapPin className="w-3 h-3" />
          <span>{location}</span>
          {distance && <span className="text-accent">• {distance}</span>}
        </div>
        <div className="flex items-center gap-1">
          <Clock className="w-3 h-3" />
          <span>{postedAt}</span>
        </div>
      </div>
    </Card>
  );
};
