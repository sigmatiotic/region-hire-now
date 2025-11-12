import { Button } from "@/components/ui/button";
import { ArrowRight, MapPin, Shield, Zap, Users } from "lucide-react";
import { useNavigate } from "react-router-dom";

const Index = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-primary via-primary/90 to-secondary py-20 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-primary-foreground mb-6">
            Find Local Help,
            <br />
            Build Your Community
          </h1>
          <p className="text-lg md:text-xl text-primary-foreground/90 mb-8 max-w-2xl mx-auto">
            Connect with trusted workers nearby for quick jobs. From home help to event support, find the perfect match in your neighborhood.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              size="lg" 
              onClick={() => navigate("/jobs")}
              className="bg-background text-primary hover:bg-background/90 text-lg px-8 py-6"
            >
              Browse Jobs
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              onClick={() => navigate("/post-job")}
              className="border-primary-foreground text-primary-foreground hover:bg-primary-foreground/10 text-lg px-8 py-6"
            >
              Post a Job
            </Button>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-6xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            Why Choose LocalLink?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Hyper-Local</h3>
              <p className="text-muted-foreground">
                Find workers in your neighborhood. See distance and location for every job posting.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-accent/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Secure Payments</h3>
              <p className="text-muted-foreground">
                Protected bounty system ensures fair payment. Money held safely until work is done.
              </p>
            </div>
            
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-secondary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-xl font-semibold mb-3 text-foreground">Quick & Easy</h3>
              <p className="text-muted-foreground">
                Post a job in minutes. Get responses fast from available workers nearby.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto max-w-4xl">
          <h2 className="text-3xl font-bold text-center mb-12 text-foreground">
            How It Works
          </h2>
          <div className="space-y-8">
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                1
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Post Your Job</h3>
                <p className="text-muted-foreground">
                  Describe what you need done, set your budget, and choose your preferred time.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                2
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Get Applications</h3>
                <p className="text-muted-foreground">
                  Nearby workers see your job and apply. Review profiles and choose the best fit.
                </p>
              </div>
            </div>
            
            <div className="flex gap-4 items-start">
              <div className="w-10 h-10 rounded-full bg-primary text-primary-foreground flex items-center justify-center font-bold flex-shrink-0">
                3
              </div>
              <div>
                <h3 className="text-xl font-semibold mb-2 text-foreground">Get It Done</h3>
                <p className="text-muted-foreground">
                  Work gets completed. Release payment and rate your experience. Build community trust.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 px-4">
        <div className="container mx-auto max-w-4xl text-center">
          <Users className="w-16 h-16 text-primary mx-auto mb-6" />
          <h2 className="text-3xl font-bold mb-4 text-foreground">
            Join Thousands in Your Community
          </h2>
          <p className="text-lg text-muted-foreground mb-8">
            Whether you're looking for work or need help, LocalLink connects you with your neighbors.
          </p>
          <Button 
            size="lg"
            onClick={() => navigate("/jobs")}
            className="bg-gradient-to-r from-primary to-primary/90 text-lg px-8 py-6"
          >
            Get Started Now
            <ArrowRight className="ml-2 w-5 h-5" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default Index;
