import { Button } from "@/components/ui/button";
import { ArrowRight, Shield, TrendingUp, Users, Leaf, Target, Zap } from "lucide-react";
import { useNavigate } from "react-router-dom";
import heroBackground from "@/assets/hero-bg.jpg";

const HeroSection = () => {
  const navigate = useNavigate();
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat opacity-10"
        style={{ backgroundImage: `url(${heroBackground})` }}
      />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background/95 to-agriculture/5" />
      
      {/* Stochastic Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-20 left-20 w-64 h-64 bg-gradient-to-br from-primary/10 to-agriculture/10 rounded-full blur-3xl animate-stochastic" />
        <div className="absolute bottom-20 right-20 w-96 h-96 bg-gradient-to-tr from-agriculture/10 to-primary/10 rounded-full blur-3xl animate-stochastic" style={{ animationDelay: '2s' }} />
        <div className="absolute top-1/2 left-1/3 w-48 h-48 bg-gradient-to-r from-primary-glow/10 to-agriculture-light/10 rounded-full blur-2xl animate-stochastic" style={{ animationDelay: '4s' }} />
      </div>
      
      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 text-center">
        <div className="max-w-4xl mx-auto">
          {/* Logo Badge */}
          <div className="inline-flex items-center gap-2 bg-agriculture/10 border border-agriculture/20 rounded-full px-4 py-2 mb-6">
            <Leaf className="h-5 w-5 text-agriculture" />
            <span className="text-agriculture font-medium">Decentralized Agricultural Insurance</span>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-6 bg-gradient-to-r from-foreground via-primary to-agriculture bg-clip-text text-transparent animate-float">
            <span className="block">CropLex</span>
            <span className="block text-3xl md:text-4xl font-medium text-muted-foreground mt-2">
              Smart Farming Insurance
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-3xl mx-auto leading-relaxed">
            Protect your agricultural investments with blockchain-powered insurance. 
            Real-time monitoring, automated claims, and transparent coverage for modern farmers.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-agriculture to-agriculture-dark hover:shadow-[var(--shadow-agriculture)] animate-pulse-glow text-lg px-8 py-6"
              onClick={() => navigate("/dashboard")}
            >
              Start Protecting Your Crops
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-agriculture/50 hover:bg-agriculture/10 text-lg px-8 py-6"
              onClick={() => navigate("/dashboard")}
            >
              Connect Wallet
            </Button>
          </div>
          
          {/* Feature Highlights */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
            <div className="bg-card/50 backdrop-blur-sm border border-agriculture/20 rounded-2xl p-6 animate-float" style={{ animationDelay: '1s' }}>
              <Zap className="h-8 w-8 text-agriculture mx-auto mb-3" />
              <div className="text-xl font-bold text-foreground">Instant Claims</div>
              <div className="text-sm text-muted-foreground">Automated processing with smart contracts</div>
            </div>
             <div className="bg-card/50 backdrop-blur-sm border border-primary/20 rounded-2xl p-6 animate-float" style={{ animationDelay: '2s' }}>
              <Target className="h-8 w-8 text-primary mx-auto mb-3" />
              <div className="text-xl font-bold text-foreground">Real-time Monitoring</div>
              <div className="text-sm text-muted-foreground">IoT sensors and satellite data</div>
            </div>
            <div className="bg-card/50 backdrop-blur-sm border border-agriculture/20 rounded-2xl p-6 animate-float" style={{ animationDelay: '3s' }}>
              <Shield className="h-8 w-8 text-agriculture mx-auto mb-3" />
              <div className="text-xl font-bold text-foreground">Transparent Coverage</div>
              <div className="text-sm text-muted-foreground">Blockchain-verified policies</div>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            <div className="text-center animate-float" style={{ animationDelay: '1s' }}>
              <div className="text-3xl font-bold text-agriculture">$2.4M+</div>
              <div className="text-sm text-muted-foreground">Total Coverage</div>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: '2s' }}>
              <div className="text-3xl font-bold text-primary">98.7%</div>
              <div className="text-sm text-muted-foreground">Claims Approved</div>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: '3s' }}>
              <div className="text-3xl font-bold text-agriculture">1,247</div>
              <div className="text-sm text-muted-foreground">Active Farmers</div>
            </div>
            <div className="text-center animate-float" style={{ animationDelay: '4s' }}>
              <div className="text-3xl font-bold text-primary">5 Days</div>
              <div className="text-sm text-muted-foreground">Avg. Payout Time</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;