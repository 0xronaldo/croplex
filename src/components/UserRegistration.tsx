import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { User, Shield, CheckCircle, Wallet, Leaf } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface UserRegistrationProps {
  walletAddress: string;
  onRegistrationComplete: () => void;
}

const UserRegistration = ({ walletAddress, onRegistrationComplete }: UserRegistrationProps) => {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    farmLocation: "",
    farmSize: "",
  });
  const [isRegistering, setIsRegistering] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    toast({
      title: "Registration Complete!",
      description: "Your agricultural profile has been created successfully.",
    });
    
    setIsRegistering(false);
    onRegistrationComplete();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Digital Identity Section */}
      <Card className="bg-gradient-to-br from-agriculture-light/20 to-agriculture/10 border-agriculture/30 shadow-[var(--shadow-card)]">
        <CardHeader>
          <div className="flex items-center gap-3">
            <div className="p-2 bg-agriculture/20 rounded-full">
              <Shield className="h-5 w-5 text-agriculture-dark" />
            </div>
            <div>
              <CardTitle className="text-lg">Digital Identity</CardTitle>
              <CardDescription>Blockchain-verified agricultural profile</CardDescription>
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="flex items-center gap-4 p-4 bg-background/50 rounded-lg border border-agriculture/20">
            <Avatar className="h-12 w-12">
              <AvatarFallback className="bg-agriculture/20 text-agriculture-dark">
                <User className="h-6 w-6" />
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <p className="font-medium text-foreground">Wallet Address</p>
              <p className="text-sm text-muted-foreground font-mono">{walletAddress}</p>
            </div>
            <Badge variant="secondary" className="bg-agriculture/20 text-agriculture-dark border-agriculture/30">
              <CheckCircle className="h-3 w-3 mr-1" />
              Verified
            </Badge>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center gap-2 p-3 bg-primary/10 rounded-lg">
              <Wallet className="h-4 w-4 text-primary" />
              <div>
                <p className="text-xs text-muted-foreground">Blockchain</p>
                <p className="text-sm font-medium">Ethereum</p>
              </div>
            </div>
            <div className="flex items-center gap-2 p-3 bg-agriculture/10 rounded-lg">
              <Leaf className="h-4 w-4 text-agriculture" />
              <div>
                <p className="text-xs text-muted-foreground">Status</p>
                <p className="text-sm font-medium">Agricultural</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Registration Form */}
      <Card className="shadow-[var(--shadow-card)]">
        <CardHeader>
          <CardTitle>Complete Your Profile</CardTitle>
          <CardDescription>
            Register your agricultural details to access insurance services
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fullName">Full Name</Label>
                <Input
                  id="fullName"
                  placeholder="Enter your full name"
                  value={formData.fullName}
                  onChange={(e) => handleInputChange("fullName", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email Address</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  value={formData.email}
                  onChange={(e) => handleInputChange("email", e.target.value)}
                  required
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="farmLocation">Farm Location</Label>
                <Input
                  id="farmLocation"
                  placeholder="City, State/Country"
                  value={formData.farmLocation}
                  onChange={(e) => handleInputChange("farmLocation", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="farmSize">Farm Size (Hectares)</Label>
                <Input
                  id="farmSize"
                  type="number"
                  placeholder="Enter farm size"
                  value={formData.farmSize}
                  onChange={(e) => handleInputChange("farmSize", e.target.value)}
                  required
                />
              </div>
            </div>

            <Button 
              type="submit" 
              className="w-full bg-gradient-to-r from-agriculture to-agriculture-dark hover:shadow-[var(--shadow-agriculture)] transition-all duration-300"
              disabled={isRegistering}
            >
              {isRegistering ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Registering...
                </div>
              ) : (
                "Complete Registration"
              )}
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default UserRegistration;