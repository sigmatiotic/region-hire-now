import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { MapPin, Clock, IndianRupee, User, ChevronLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

const JobDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  // Mock data - in real app, fetch by ID
  const job = {
    id: id,
    title: "Help with Diwali Decoration",
    description: "Need someone to help decorate my home for Diwali. Must be creative and experienced with traditional decorations. The work includes hanging lights, making rangoli patterns, and arranging diyas. Should have knowledge of traditional decoration styles and modern aesthetics.",
    category: "Events",
    payment: 800,
    location: "Sector 15, Noida",
    postedAt: "2 hours ago",
    distance: "1.2 km",
    poster: {
      name: "Priya Sharma",
      rating: 4.5,
      jobsPosted: 12,
    },
    requirements: [
      "Experience with traditional decorations",
      "Own transportation preferred",
      "Must bring basic decoration tools",
      "Should be available on the specified date",
    ],
    dateNeeded: "Tomorrow, 10:00 AM",
    duration: "4-5 hours",
  };

  return (
    <div className="min-h-screen bg-background pb-20">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate(-1)}
            >
              <ChevronLeft className="w-5 h-5" />
            </Button>
            <h1 className="text-xl font-bold text-foreground">Job Details</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6">
        {/* Job Header */}
        <Card className="p-5 mb-4">
          <div className="flex justify-between items-start mb-3">
            <div className="flex-1">
              <h2 className="text-2xl font-bold text-foreground mb-2">{job.title}</h2>
              <Badge variant="secondary">{job.category}</Badge>
            </div>
            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-primary font-bold text-2xl">
                <IndianRupee className="w-5 h-5" />
                {job.payment}
              </div>
              <span className="text-xs text-muted-foreground">Fixed Price</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-4 text-sm">
            <div className="flex items-center gap-2 text-muted-foreground">
              <MapPin className="w-4 h-4 text-accent" />
              <div>
                <div className="font-medium text-foreground">{job.location}</div>
                <div className="text-xs">{job.distance} away</div>
              </div>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Clock className="w-4 h-4" />
              <div>
                <div className="font-medium text-foreground">{job.dateNeeded}</div>
                <div className="text-xs">{job.duration}</div>
              </div>
            </div>
          </div>
        </Card>

        {/* Description */}
        <Card className="p-5 mb-4">
          <h3 className="font-semibold text-lg mb-3 text-foreground">Description</h3>
          <p className="text-muted-foreground leading-relaxed">{job.description}</p>
        </Card>

        {/* Requirements */}
        <Card className="p-5 mb-4">
          <h3 className="font-semibold text-lg mb-3 text-foreground">Requirements</h3>
          <ul className="space-y-2">
            {job.requirements.map((req, index) => (
              <li key={index} className="flex items-start gap-2 text-muted-foreground">
                <span className="text-accent mt-1">•</span>
                <span>{req}</span>
              </li>
            ))}
          </ul>
        </Card>

        {/* Poster Info */}
        <Card className="p-5 mb-4">
          <h3 className="font-semibold text-lg mb-3 text-foreground">Posted By</h3>
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 rounded-full bg-muted flex items-center justify-center">
              <User className="w-6 h-6 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <div className="font-medium text-foreground">{job.poster.name}</div>
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <span>⭐ {job.poster.rating}</span>
                <span>•</span>
                <span>{job.poster.jobsPosted} jobs posted</span>
              </div>
            </div>
          </div>
        </Card>
      </main>

      {/* Bottom Action Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
        <div className="container mx-auto flex gap-3">
          <Button variant="outline" className="flex-1">
            Message
          </Button>
          <Button className="flex-1 bg-gradient-to-r from-primary to-primary/90">
            Accept Job
          </Button>
        </div>
      </div>
    </div>
  );
};

export default JobDetail;
