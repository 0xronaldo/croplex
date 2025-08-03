import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { 
  BarChart3, 
  TrendingUp, 
  TrendingDown,
  DollarSign,
  Shield,
  Users,
  Calendar,
  MapPin,
  Leaf,
  AlertTriangle,
  CheckCircle,
  Clock
} from "lucide-react";
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  Area,
  AreaChart
} from "recharts";

const AnalyticsPage = () => {
  // Mock data for charts
  const monthlyClaimsData = [
    { month: "Jan", claims: 12, payouts: 45000, policies: 150 },
    { month: "Feb", claims: 8, payouts: 32000, policies: 155 },
    { month: "Mar", claims: 15, payouts: 67000, policies: 162 },
    { month: "Apr", claims: 22, payouts: 89000, policies: 168 },
    { month: "May", claims: 18, payouts: 73000, policies: 175 },
    { month: "Jun", claims: 25, payouts: 105000, policies: 182 },
    { month: "Jul", claims: 30, payouts: 125000, policies: 190 },
    { month: "Aug", claims: 20, payouts: 85000, policies: 195 },
    { month: "Sep", claims: 16, payouts: 68000, policies: 200 },
    { month: "Oct", claims: 14, payouts: 58000, policies: 205 },
    { month: "Nov", claims: 10, payouts: 42000, policies: 210 },
    { month: "Dec", claims: 8, payouts: 35000, policies: 215 }
  ];

  const cropTypeDistribution = [
    { name: "Wheat", value: 35, coverage: 120000, color: "#8B5CF6" },
    { name: "Corn", value: 28, coverage: 98000, color: "#10B981" },
    { name: "Soybeans", value: 20, coverage: 75000, color: "#F59E0B" },
    { name: "Cotton", value: 12, coverage: 45000, color: "#EF4444" },
    { name: "Other", value: 5, coverage: 20000, color: "#6B7280" }
  ];

  const riskAssessmentData = [
    { region: "Midwest", lowRisk: 45, mediumRisk: 30, highRisk: 15 },
    { region: "Great Plains", lowRisk: 35, mediumRisk: 40, highRisk: 25 },
    { region: "Southeast", lowRisk: 50, mediumRisk: 25, highRisk: 20 },
    { region: "Pacific", lowRisk: 40, mediumRisk: 35, highRisk: 25 },
    { region: "Northeast", lowRisk: 55, mediumRisk: 30, highRisk: 15 }
  ];

  const weatherImpactData = [
    { month: "Jan", drought: 5, flood: 2, hail: 1, frost: 8 },
    { month: "Feb", drought: 3, flood: 1, hail: 0, frost: 12 },
    { month: "Mar", drought: 8, flood: 4, hail: 2, frost: 6 },
    { month: "Apr", drought: 12, flood: 6, hail: 8, frost: 3 },
    { month: "May", drought: 15, flood: 8, hail: 15, frost: 1 },
    { month: "Jun", drought: 25, flood: 5, hail: 20, frost: 0 },
    { month: "Jul", drought: 30, flood: 3, hail: 18, frost: 0 },
    { month: "Aug", drought: 22, flood: 4, hail: 12, frost: 0 },
    { month: "Sep", drought: 18, flood: 8, hail: 8, frost: 2 },
    { month: "Oct", drought: 10, flood: 12, hail: 4, frost: 5 },
    { month: "Nov", drought: 6, flood: 8, hail: 2, frost: 8 },
    { month: "Dec", drought: 4, flood: 3, hail: 1, frost: 10 }
  ];

  const performanceMetrics = [
    {
      title: "Claim Settlement Rate",
      value: "96.8%",
      change: "+2.1%",
      trend: "up",
      description: "Claims successfully processed"
    },
    {
      title: "Average Processing Time",
      value: "5.2 days",
      change: "-1.3 days",
      trend: "down",
      description: "Time from claim to payout"
    },
    {
      title: "Customer Satisfaction",
      value: "4.7/5",
      change: "+0.2",
      trend: "up",
      description: "Average customer rating"
    },
    {
      title: "Policy Renewal Rate",
      value: "89.3%",
      change: "+3.5%",
      trend: "up",
      description: "Customers renewing policies"
    }
  ];

  const recentActivity = [
    {
      type: "claim",
      title: "New claim filed",
      description: "Hail damage - Corn crops in Iowa",
      amount: "$8,500",
      time: "2 hours ago",
      status: "processing"
    },
    {
      type: "policy",
      title: "Policy activated",
      description: "Wheat insurance - Kansas farm",
      amount: "$50,000",
      time: "4 hours ago",
      status: "active"
    },
    {
      type: "payout",
      title: "Claim payout completed",
      description: "Drought compensation - Soybeans",
      amount: "$12,000",
      time: "6 hours ago",
      status: "completed"
    },
    {
      type: "alert",
      title: "Weather alert",
      description: "Severe storm warning - Midwest region",
      amount: "15 policies affected",
      time: "8 hours ago",
      status: "warning"
    }
  ];

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "claim": return <Shield className="h-4 w-4 text-blue-600" />;
      case "policy": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "payout": return <DollarSign className="h-4 w-4 text-purple-600" />;
      case "alert": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Clock className="h-4 w-4 text-gray-600" />;
    }
  };

  const getActivityBadgeColor = (status: string) => {
    switch (status) {
      case "active": return "bg-green-100 text-green-700";
      case "processing": return "bg-blue-100 text-blue-700";
      case "completed": return "bg-purple-100 text-purple-700";
      case "warning": return "bg-red-100 text-red-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-foreground mb-2">Analytics Dashboard</h1>
        <p className="text-muted-foreground">
          Comprehensive insights into agricultural insurance data
        </p>
      </div>

      {/* Performance Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {performanceMetrics.map((metric, index) => (
          <Card key={index} className="hover:shadow-lg transition-all duration-300">
            <CardContent className="p-4">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground mt-1">{metric.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{metric.description}</p>
                </div>
                <div className={`flex items-center gap-1 px-2 py-1 rounded-full text-xs font-medium ${
                  metric.trend === "up" 
                    ? "bg-green-100 text-green-700" 
                    : "bg-red-100 text-red-700"
                }`}>
                  {metric.trend === "up" ? (
                    <TrendingUp className="h-3 w-3" />
                  ) : (
                    <TrendingDown className="h-3 w-3" />
                  )}
                  {metric.change}
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        {/* Recent Activity */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Recent Activity
            </CardTitle>
            <CardDescription>Latest system events and updates</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                <div className="p-2 bg-muted rounded-full">
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-start justify-between">
                    <div>
                      <p className="font-medium text-sm">{activity.title}</p>
                      <p className="text-xs text-muted-foreground">{activity.description}</p>
                      <p className="text-xs text-muted-foreground mt-1">{activity.time}</p>
                    </div>
                    <Badge className={getActivityBadgeColor(activity.status)}>
                      {activity.status}
                    </Badge>
                  </div>
                  <p className="text-sm font-semibold text-foreground mt-1">{activity.amount}</p>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Crop Distribution */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Leaf className="h-5 w-5" />
              Crop Type Distribution
            </CardTitle>
            <CardDescription>Coverage distribution across different crop types</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col lg:flex-row items-center gap-6">
              <div className="w-full lg:w-1/2">
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={cropTypeDistribution}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {cropTypeDistribution.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-full lg:w-1/2 space-y-3">
                {cropTypeDistribution.map((crop, index) => (
                  <div key={index} className="flex items-center justify-between p-2 border border-border rounded">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: crop.color }}
                      ></div>
                      <span className="text-sm font-medium">{crop.name}</span>
                    </div>
                    <div className="text-right">
                      <p className="text-sm font-semibold">{crop.value}%</p>
                      <p className="text-xs text-muted-foreground">${crop.coverage.toLocaleString()}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Charts Tabs */}
      <Tabs defaultValue="claims" className="space-y-6">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="claims">Claims Analysis</TabsTrigger>
          <TabsTrigger value="risk">Risk Assessment</TabsTrigger>
          <TabsTrigger value="weather">Weather Impact</TabsTrigger>
          <TabsTrigger value="performance">Performance Trends</TabsTrigger>
        </TabsList>

        <TabsContent value="claims">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Monthly Claims Volume</CardTitle>
                <CardDescription>Number of claims filed per month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <BarChart data={monthlyClaimsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="claims" fill="#10B981" />
                  </BarChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Claims Payouts</CardTitle>
                <CardDescription>Total payout amounts by month</CardDescription>
              </CardHeader>
              <CardContent>
                <ResponsiveContainer width="100%" height={300}>
                  <AreaChart data={monthlyClaimsData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip formatter={(value) => [`$${value.toLocaleString()}`, "Payouts"]} />
                    <Area 
                      type="monotone" 
                      dataKey="payouts" 
                      stroke="#8B5CF6" 
                      fill="#8B5CF6" 
                      fillOpacity={0.3}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="risk">
          <Card>
            <CardHeader>
              <CardTitle>Risk Distribution by Region</CardTitle>
              <CardDescription>Risk assessment breakdown across different regions</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <BarChart data={riskAssessmentData} layout="horizontal">
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis type="number" />
                  <YAxis dataKey="region" type="category" width={100} />
                  <Tooltip />
                  <Bar dataKey="lowRisk" stackId="a" fill="#10B981" name="Low Risk" />
                  <Bar dataKey="mediumRisk" stackId="a" fill="#F59E0B" name="Medium Risk" />
                  <Bar dataKey="highRisk" stackId="a" fill="#EF4444" name="High Risk" />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="weather">
          <Card>
            <CardHeader>
              <CardTitle>Weather-Related Claims</CardTitle>
              <CardDescription>Impact of different weather events on claims</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <LineChart data={weatherImpactData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="drought" stroke="#EF4444" strokeWidth={2} name="Drought" />
                  <Line type="monotone" dataKey="flood" stroke="#3B82F6" strokeWidth={2} name="Flood" />
                  <Line type="monotone" dataKey="hail" stroke="#8B5CF6" strokeWidth={2} name="Hail" />
                  <Line type="monotone" dataKey="frost" stroke="#06B6D4" strokeWidth={2} name="Frost" />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="performance">
          <Card>
            <CardHeader>
              <CardTitle>Policy Growth Trends</CardTitle>
              <CardDescription>Active policies growth over time</CardDescription>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={400}>
                <AreaChart data={monthlyClaimsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Area 
                    type="monotone" 
                    dataKey="policies" 
                    stroke="#10B981" 
                    fill="#10B981" 
                    fillOpacity={0.3}
                    name="Active Policies"
                  />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AnalyticsPage;
