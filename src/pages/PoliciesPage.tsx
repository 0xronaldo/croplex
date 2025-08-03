import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Shield, 
  Calendar, 
  MapPin, 
  DollarSign, 
  TrendingUp, 
  AlertTriangle,
  CheckCircle,
  Clock,
  Leaf,
  Droplets,
  Sun,
  CloudRain,
  Plus
} from "lucide-react";

const PoliciesPage = () => {
  const [activeTab, setActiveTab] = useState("active");

  const activePolicies = [
    {
      id: "POL-001",
      cropType: "Wheat",
      coverage: "$50,000",
      premium: "$2,500",
      area: "100 hectares",
      location: "Kansas, USA",
      startDate: "2024-03-01",
      endDate: "2024-10-31",
      status: "active",
      riskLevel: "Low",
      weatherConditions: {
        temperature: 22,
        humidity: 65,
        rainfall: 45,
        forecast: "Favorable"
      },
      claims: []
    },
    {
      id: "POL-002",
      cropType: "Corn",
      coverage: "$75,000",
      premium: "$3,200",
      area: "150 hectares",
      location: "Iowa, USA",
      startDate: "2024-04-15",
      endDate: "2024-11-15",
      status: "active",
      riskLevel: "Medium",
      weatherConditions: {
        temperature: 25,
        humidity: 72,
        rainfall: 38,
        forecast: "Watch"
      },
      claims: [
        { id: "CLM-001", amount: "$5,000", status: "approved", date: "2024-06-15" }
      ]
    },
    {
      id: "POL-003",
      cropType: "Soybeans",
      coverage: "$35,000",
      premium: "$1,800",
      area: "75 hectares",
      location: "Illinois, USA",
      startDate: "2024-05-01",
      endDate: "2024-12-01",
      status: "pending",
      riskLevel: "High",
      weatherConditions: {
        temperature: 28,
        humidity: 85,
        rainfall: 15,
        forecast: "Risk"
      },
      claims: []
    }
  ];

  const expiredPolicies = [
    {
      id: "POL-004",
      cropType: "Cotton",
      coverage: "$40,000",
      premium: "$2,100",
      area: "90 hectares",
      location: "Texas, USA",
      startDate: "2023-03-01",
      endDate: "2023-10-31",
      status: "expired",
      riskLevel: "Low",
      claims: []
    }
  ];

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "text-green-600 bg-green-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "high": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "active": return "text-green-600 bg-green-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "expired": return "text-gray-600 bg-gray-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getWeatherIcon = (forecast: string) => {
    switch (forecast.toLowerCase()) {
      case "favorable": return <Sun className="h-4 w-4 text-yellow-500" />;
      case "watch": return <CloudRain className="h-4 w-4 text-blue-500" />;
      case "risk": return <AlertTriangle className="h-4 w-4 text-red-500" />;
      default: return <Sun className="h-4 w-4 text-gray-500" />;
    }
  };

  const PolicyCard = ({ policy }: { policy: any }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-agriculture">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <Leaf className="h-5 w-5 text-agriculture" />
              {policy.cropType} Insurance
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {policy.location}
            </CardDescription>
          </div>
          <div className="flex flex-col gap-2">
            <Badge className={getStatusColor(policy.status)}>
              {policy.status === "active" && <CheckCircle className="h-3 w-3 mr-1" />}
              {policy.status === "pending" && <Clock className="h-3 w-3 mr-1" />}
              {policy.status.charAt(0).toUpperCase() + policy.status.slice(1)}
            </Badge>
            <Badge variant="outline" className={getRiskColor(policy.riskLevel)}>
              {policy.riskLevel} Risk
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Coverage Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Coverage</p>
            <p className="font-semibold text-foreground">{policy.coverage}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Premium</p>
            <p className="font-semibold text-foreground">{policy.premium}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Area</p>
            <p className="font-semibold text-foreground">{policy.area}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Policy ID</p>
            <p className="font-semibold text-foreground font-mono text-sm">{policy.id}</p>
          </div>
        </div>

        {/* Weather Conditions (for active policies) */}
        {policy.status === "active" && (
          <div className="bg-muted/30 rounded-lg p-3">
            <div className="flex items-center gap-2 mb-2">
              {getWeatherIcon(policy.weatherConditions.forecast)}
              <span className="text-sm font-medium">Current Conditions</span>
            </div>
            <div className="grid grid-cols-3 gap-4 text-sm">
              <div className="flex items-center gap-1">
                <Sun className="h-3 w-3 text-orange-500" />
                {policy.weatherConditions.temperature}°C
              </div>
              <div className="flex items-center gap-1">
                <Droplets className="h-3 w-3 text-blue-500" />
                {policy.weatherConditions.humidity}%
              </div>
              <div className="flex items-center gap-1">
                <CloudRain className="h-3 w-3 text-blue-600" />
                {policy.weatherConditions.rainfall}mm
              </div>
            </div>
          </div>
        )}

        {/* Policy Period */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Policy Period</span>
            <span className="font-medium">
              {policy.startDate} - {policy.endDate}
            </span>
          </div>
          {policy.status === "active" && (
            <Progress value={65} className="h-2" />
          )}
        </div>

        {/* Claims Summary */}
        {policy.claims.length > 0 && (
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-900 mb-1">
              Claims: {policy.claims.length}
            </p>
            {policy.claims.map((claim: any) => (
              <div key={claim.id} className="text-xs text-blue-700">
                {claim.id}: {claim.amount} - {claim.status}
              </div>
            ))}
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            View Details
          </Button>
          {policy.status === "active" && (
            <Button size="sm" className="flex-1 bg-gradient-to-r from-agriculture to-agriculture-dark">
              File Claim
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex justify-between items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-foreground mb-2">Insurance Policies</h1>
          <p className="text-muted-foreground">
            Manage your agricultural insurance coverage
          </p>
        </div>
        <Button className="bg-gradient-to-r from-agriculture to-agriculture-dark">
          <Plus className="h-4 w-4 mr-2" />
          New Policy
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Shield className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-900">3</p>
                <p className="text-sm text-green-700">Active Policies</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-900">$160K</p>
                <p className="text-sm text-blue-700">Total Coverage</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <TrendingUp className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-900">$7.5K</p>
                <p className="text-sm text-yellow-700">Annual Premium</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Calendar className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-900">1</p>
                <p className="text-sm text-purple-700">Claims Filed</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Policies Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="active">Active ({activePolicies.filter(p => p.status === "active").length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({activePolicies.filter(p => p.status === "pending").length})</TabsTrigger>
          <TabsTrigger value="expired">Expired ({expiredPolicies.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="active" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activePolicies
              .filter(policy => policy.status === "active")
              .map(policy => (
                <PolicyCard key={policy.id} policy={policy} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="pending" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {activePolicies
              .filter(policy => policy.status === "pending")
              .map(policy => (
                <PolicyCard key={policy.id} policy={policy} />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="expired" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {expiredPolicies.map(policy => (
              <PolicyCard key={policy.id} policy={policy} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default PoliciesPage;
