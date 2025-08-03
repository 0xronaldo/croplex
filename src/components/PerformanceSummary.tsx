import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Separator } from "@/components/ui/separator";
import { DollarSign, TrendingUp, Calendar, Target } from "lucide-react";

const PerformanceSummary = () => {
  const performanceData = {
    totalInvested: "$1,923",
    protectedValue: "$50,000",
    claimsRatio: 0.12,
    avgReturn: "8.5%",
    payoutAccuracy: 94.7,
    seasonPerformance: "Excellent"
  };

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">Investment Performance</h3>
        <p className="text-muted-foreground">
          Your agricultural insurance investment summary for this season
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-br from-card to-primary/10 border-primary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <DollarSign className="h-4 w-4 mr-2 text-primary" />
              Investment Overview
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Premium Paid</p>
              <p className="text-xl font-bold text-foreground">{performanceData.totalInvested}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Protected Value</p>
              <p className="text-lg font-semibold text-primary">{performanceData.protectedValue}</p>
            </div>
            <Badge variant="secondary" className="bg-primary/20 text-primary">
              26x Protection Ratio
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-agriculture/10 border-agriculture/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <TrendingUp className="h-4 w-4 mr-2 text-agriculture" />
              Performance Metrics
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Claims Accuracy</p>
              <div className="flex items-center space-x-2">
                <Progress value={performanceData.payoutAccuracy} className="flex-1" />
                <span className="text-sm font-medium text-agriculture-dark">
                  {performanceData.payoutAccuracy}%
                </span>
              </div>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Claims Ratio</p>
              <p className="text-lg font-semibold text-foreground">
                {(performanceData.claimsRatio * 100).toFixed(1)}%
              </p>
            </div>
            <Badge variant="secondary" className="bg-agriculture/20 text-agriculture-dark">
              Low Risk Portfolio
            </Badge>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-card to-secondary/10 border-secondary/20">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm text-muted-foreground flex items-center">
              <Target className="h-4 w-4 mr-2 text-secondary" />
              Season Outlook
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Current Status</p>
              <p className="text-lg font-semibold text-foreground">{performanceData.seasonPerformance}</p>
            </div>
            <div className="space-y-1">
              <p className="text-xs text-muted-foreground">Expected Return</p>
              <p className="text-lg font-semibold text-agriculture-dark">{performanceData.avgReturn}</p>
            </div>
            <Badge variant="secondary" className="bg-agriculture/20 text-agriculture-dark">
              <Calendar className="h-3 w-3 mr-1" />
              Active Season
            </Badge>
          </CardContent>
        </Card>
      </div>

      <Card className="bg-gradient-to-r from-muted/50 to-agriculture/10 border-muted">
        <CardContent className="pt-6">
          <div className="space-y-4">
            <h4 className="text-lg font-semibold text-foreground">Investment Translation</h4>
            <Separator className="bg-border" />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">What This Means for You:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Your $1,923 premium protects $50,000 in crop value</li>
                  <li>• 94.7% accuracy in claims processing ensures reliable payouts</li>
                  <li>• Low 12% claims ratio indicates stable, well-managed risk</li>
                  <li>• Expected 8.5% return on protected agricultural assets</li>
                </ul>
              </div>
              <div className="space-y-2">
                <h5 className="font-medium text-foreground">Your Security Benefits:</h5>
                <ul className="text-sm text-muted-foreground space-y-1">
                  <li>• Automatic payouts when yield drops below 70%</li>
                  <li>• Real-time monitoring via satellite technology</li>
                  <li>• Transparent, blockchain-recorded transactions</li>
                  <li>• 24/7 crop health and weather tracking</li>
                </ul>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PerformanceSummary;