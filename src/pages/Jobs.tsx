import { useState, useEffect } from "react";
import { JobCard } from "@/components/JobCard";
import { CategoryFilter } from "@/components/CategoryFilter";
import { JobsMap } from "@/components/JobsMap";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

// Mock data
const mockJobs = [
  {
    id: "1",
    title: "Help with Diwali Decoration",
    description: "Need someone to help decorate my home for Diwali. Must be creative and experienced with traditional decorations.",
    category: "event",
    payment: 800,
    location: "Sector 15, Noida",
    postedAt: "2 hours ago",
    distance: "1.2 km",
  },
  {
    id: "2",
    title: "Grocery Delivery Helper",
    description: "Need help picking up groceries from the local market and delivering to my home. Should have a two-wheeler.",
    category: "delivery",
    payment: 200,
    location: "Salt Lake, Kolkata",
    postedAt: "5 hours ago",
    distance: "3.5 km",
  },
  {
    id: "3",
    title: "House Cleaning",
    description: "Looking for someone to deep clean a 2BHK apartment. Cleaning supplies will be provided.",
    category: "home",
    payment: 600,
    location: "Bandra West, Mumbai",
    postedAt: "1 day ago",
    distance: "5.0 km",
  },
  {
    id: "4",
    title: "AC Repair",
    description: "Split AC not cooling properly. Need experienced technician for diagnosis and repair.",
    category: "repair",
    payment: 500,
    location: "Indiranagar, Bangalore",
    postedAt: "3 hours ago",
    distance: "2.8 km",
  },
  {
    id: "5",
    title: "Tuition for Class 10 Maths",
    description: "Looking for tutor for my daughter's Class 10 CBSE Mathematics. Evening time preferred.",
    category: "others",
    payment: 1000,
    location: "Koramangala, Bangalore",
    postedAt: "1 day ago",
    distance: "4.2 km",
  },
];

const Jobs = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [jobs, setJobs] = useState<any[]>(mockJobs); // Initialize with mock data
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    setLoading(true);
    try {
      const { data, error } = await supabase
        .from("jobs")
        .select("*")
        .eq("status", "open")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching jobs:", error);
        // Continue with mock data if database fetch fails
      } else if (data && data.length > 0) {
        setJobs(data);
      }
    } catch (error) {
      console.error("Error:", error);
      // Continue with mock data if any error occurs
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) => {
    const matchesCategory = selectedCategory === "all" || job.category === selectedCategory;
    const matchesSearch = job.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         job.description.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-10 bg-card border-b border-border shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-2xl font-bold text-foreground">LocalLink</h1>
            <Button 
              onClick={() => navigate("/post-job")}
              className="bg-gradient-to-r from-primary to-primary/90"
            >
              <Plus className="w-4 h-4 mr-2" />
              Post Job
            </Button>
          </div>
          
          {/* Location */}
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
            <MapPin className="w-4 h-4 text-accent" />
            <span>Showing jobs near you</span>
          </div>

          {/* Search */}
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
            <Input
              placeholder="Search jobs..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10"
            />
          </div>
        </div>
      </header>

      {/* Category Filter */}
      <div className="container mx-auto px-4 py-4">
        <CategoryFilter
          selectedCategory={selectedCategory}
          onCategoryChange={setSelectedCategory}
        />
      </div>

      {/* Map Section */}
      <div className="container mx-auto px-4 pb-4">
        <JobsMap jobs={filteredJobs} />
      </div>

      {/* Jobs List */}
      <main className="container mx-auto px-4 pb-6">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-foreground">
            {filteredJobs.length} jobs available
          </h2>
        </div>
        
        <div className="space-y-3">
          {filteredJobs.map((job) => (
            <JobCard
              key={job.id}
              {...job}
              onClick={() => navigate(`/job/${job.id}`)}
            />
          ))}
        </div>

        {filteredJobs.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No jobs found matching your criteria</p>
          </div>
        )}
      </main>
    </div>
  );
};

export default Jobs;
