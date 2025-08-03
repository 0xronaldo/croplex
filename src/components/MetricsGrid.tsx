import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, TrendingDown, Wheat, Shield, DollarSign, Users } from "lucide-react";

const metricsData = [
  {
    title: "Active Policies",
    value: "1,247",
    change: "+12.5%",
    trend: "up",
    icon: Shield,
    color: "primary"
  },
  {
    title: "Total Coverage",
    value: "$2.4M",
    change: "+8.2%",
    trend: "up",
    icon: DollarSign,
    color: "agriculture"
  },
  {
    title: "Crop Yield Index",
    value: "94.7%",
    change: "-2.1%",
    trend: "down",
    icon: Wheat,
    color: "agriculture"
  },
  {
    title: "Claims Processed",
    value: "89",
    change: "+15.3%",
    trend: "up",
    icon: TrendingUp,
    color: "primary"
  },
  {
    title: "Average Premium",
    value: "$1,923",
    change: "+5.7%",
    trend: "up",
    icon: DollarSign,
    color: "agriculture"
  },
  {
    title: "Active Farmers",
    value: "1,247",
    change: "+18.9%",
    trend: "up",
    icon: Users,
    color: "primary"
  }
];

const MetricsGrid = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {metricsData.map((metric, index) => {
        const Icon = metric.icon;
        const isPositive = metric.trend === "up";
        
        return (
          <Card 
            key={metric.title}
            className={`bg-gradient-to-br from-card to-${metric.color}/10 border-${metric.color}/20 shadow-[var(--shadow-card)] hover:shadow-[var(--shadow-primary)] transition-all duration-300 animate-float`}
            style={{ animationDelay: `${index * 0.5}s` }}
          >
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">
                {metric.title}
              </CardTitle>
              <div className={`p-2 bg-${metric.color}/10 rounded-full`}>
                <Icon className={`h-4 w-4 text-${metric.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-foreground mb-2">
                {metric.value}
              </div>
              <div className="flex items-center space-x-2">
                <Badge 
                  variant="secondary" 
                  className={`${
                    isPositive 
                      ? 'bg-agriculture/20 text-agriculture-dark' 
                      : 'bg-destructive/20 text-destructive'
                  }`}
                >
                  {isPositive ? (
                    <TrendingUp className="h-3 w-3 mr-1" />
                  ) : (
                    <TrendingDown className="h-3 w-3 mr-1" />
                  )}
                  {metric.change}
                </Badge>
                <span className="text-xs text-muted-foreground">vs last month</span>
              </div>
            </CardContent>
          </Card>
        );
      })}
    </div>
  );
};

export default MetricsGrid;