import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/use-toast";
import { supabase } from "@/integrations/supabase/client";

const PostJob = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    title: "",
    category: "",
    description: "",
    location: "",
    payment: "",
    date: "",
    duration: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (!formData.title || !formData.category || !formData.description || !formData.payment) {
      toast({
        title: "Missing Information",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // For now, create a temporary user ID until authentication is fully implemented
      const tempUserId = "00000000-0000-0000-0000-000000000000";
      
      const { error } = await supabase.from("jobs").insert({
        title: formData.title,
        category: formData.category,
        description: formData.description,
        location: formData.location,
        payment: parseFloat(formData.payment),
        date: formData.date || null,
        duration: formData.duration || null,
        poster_id: tempUserId,
        status: "open",
      });

      if (error) {
        console.error("Database error:", error);
        throw error;
      }

      toast({
        title: "Job Posted Successfully!",
        description: "Your job is now visible to workers nearby",
      });
      
      setTimeout(() => navigate("/jobs"), 1500);
    } catch (error: any) {
      console.error("Error posting job:", error);
      toast({
        title: "Error",
        description: error.message || "Failed to post job. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background">
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
            <h1 className="text-xl font-bold text-foreground">Post a Job</h1>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-6 pb-24">
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl mx-auto">
          {/* Job Title */}
          <div className="space-y-2">
            <Label htmlFor="title">Job Title *</Label>
            <Input
              id="title"
              placeholder="e.g., Help with Diwali Decoration"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            />
          </div>

          {/* Category */}
          <div className="space-y-2">
            <Label htmlFor="category">Category *</Label>
            <Select value={formData.category} onValueChange={(value) => setFormData({ ...formData, category: value })}>
              <SelectTrigger>
                <SelectValue placeholder="Select category" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="home">Home Help</SelectItem>
                <SelectItem value="event">Events</SelectItem>
                <SelectItem value="delivery">Delivery</SelectItem>
                <SelectItem value="repair">Repairs</SelectItem>
                <SelectItem value="others">Others</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Description */}
          <div className="space-y-2">
            <Label htmlFor="description">Description *</Label>
            <Textarea
              id="description"
              placeholder="Describe the job in detail. What needs to be done? Any specific requirements?"
              rows={5}
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          {/* Location */}
          <div className="space-y-2">
            <Label htmlFor="location">Location</Label>
            <Input
              id="location"
              placeholder="e.g., Sector 15, Noida"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
            />
          </div>

          {/* Payment and Date */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="payment">Payment (₹) *</Label>
              <Input
                id="payment"
                type="number"
                placeholder="500"
                value={formData.payment}
                onChange={(e) => setFormData({ ...formData, payment: e.target.value })}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="date">Date Needed</Label>
              <Input
                id="date"
                type="date"
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
              />
            </div>
          </div>

          {/* Duration */}
          <div className="space-y-2">
            <Label htmlFor="duration">Estimated Duration</Label>
            <Input
              id="duration"
              placeholder="e.g., 2-3 hours"
              value={formData.duration}
              onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
            />
          </div>

          {/* Submit Button */}
          <div className="fixed bottom-0 left-0 right-0 bg-card border-t border-border p-4 shadow-lg">
            <div className="container mx-auto max-w-2xl">
              <Button 
                type="submit" 
                disabled={loading}
                className="w-full bg-gradient-to-r from-primary to-primary/90 text-lg py-6"
              >
                {loading ? "Posting..." : "Post Job"}
              </Button>
            </div>
          </div>
        </form>
      </main>
    </div>
  );
};

export default PostJob;
