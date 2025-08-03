import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Shield, TrendingUp, Calculator, AlertTriangle } from "lucide-react";

const InsuranceExplanation = () => {
  const evaluationFactors = [
    {
      icon: Shield,
      title: "Risk Assessment",
      description: "Weather patterns, soil quality, and historical crop yields determine your premium rate.",
      impact: "Medium Risk",
      color: "agriculture"
    },
    {
      icon: Calculator,
      title: "Coverage Calculation",
      description: "Your payout is calculated based on actual vs. expected yield using satellite data.",
      impact: "94.7% Accuracy",
      color: "primary"
    },
    {
      icon: TrendingUp,
      title: "Performance Tracking",
      description: "Real-time monitoring of crop health and environmental conditions.",
      impact: "Live Updates",
      color: "agriculture"
    },
    {
      icon: AlertTriangle,
      title: "Claim Triggers",
      description: "Automatic payouts when yield drops below 70% of historical average.",
      impact: "Auto-trigger",
      color: "primary"
    }
  ];

  return (
    <div className="space-y-6">
      <div className="text-center space-y-2">
        <h3 className="text-2xl font-bold text-foreground">How Your Insurance Works</h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Understanding your agricultural investment protection through transparent, data-driven evaluation
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {evaluationFactors.map((factor, index) => {
          const Icon = factor.icon;
          return (
            <Card 
              key={factor.title}
              className="bg-gradient-to-br from-card to-agriculture/5 border-agriculture/20 hover:shadow-[var(--shadow-primary)] transition-all duration-300"
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-3">
                    <div className={`p-2 bg-${factor.color}/10 rounded-full`}>
                      <Icon className={`h-5 w-5 text-${factor.color}`} />
                    </div>
                    <CardTitle className="text-lg text-foreground">{factor.title}</CardTitle>
                  </div>
                  <Badge variant="secondary" className="bg-agriculture/20 text-agriculture-dark">
                    {factor.impact}
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground text-sm leading-relaxed">
                  {factor.description}
                </p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      <Card className="bg-gradient-to-r from-agriculture/10 to-primary/10 border-agriculture/30">
        <CardContent className="pt-6">
          <div className="flex items-start space-x-4">
            <div className="p-3 bg-agriculture/20 rounded-full">
              <Shield className="h-6 w-6 text-agriculture-dark" />
            </div>
            <div className="flex-1">
              <h4 className="text-lg font-semibold text-foreground mb-2">Your Investment Protection</h4>
              <p className="text-muted-foreground text-sm leading-relaxed">
                Your premium of <span className="font-semibold text-agriculture-dark">$1,923</span> protects up to 
                <span className="font-semibold text-primary"> $50,000</span> in potential crop losses. 
                Payouts are triggered automatically when yield drops below established thresholds, 
                ensuring your agricultural investment remains secure regardless of environmental challenges.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceExplanation;