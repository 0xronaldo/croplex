import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, AreaChart, Area } from "recharts";

const cropData = [
  { month: "Jan", coverage: 2400, claims: 400, yield: 2400 },
  { month: "Feb", coverage: 1398, claims: 300, yield: 2210 },
  { month: "Mar", coverage: 9800, claims: 800, yield: 2290 },
  { month: "Apr", coverage: 3908, claims: 780, yield: 2000 },
  { month: "May", coverage: 4800, claims: 1890, yield: 2181 },
  { month: "Jun", coverage: 3800, claims: 2390, yield: 2500 },
  { month: "Jul", coverage: 4300, claims: 3490, yield: 2100 },
];

const InsuranceChart = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <Card className="bg-gradient-to-br from-card to-accent/10 border-primary/20 shadow-[var(--shadow-card)] animate-stochastic">
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <div className="w-3 h-3 bg-primary rounded-full animate-pulse-glow"></div>
            Coverage Distribution
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={cropData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Area 
                type="monotone" 
                dataKey="coverage" 
                stroke="hsl(var(--primary))" 
                fill="url(#coverageGradient)" 
                strokeWidth={2}
              />
              <defs>
                <linearGradient id="coverageGradient" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="hsl(var(--primary))" stopOpacity={0.3}/>
                  <stop offset="95%" stopColor="hsl(var(--primary))" stopOpacity={0.1}/>
                </linearGradient>
              </defs>
            </AreaChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      <Card className="bg-gradient-to-br from-card to-agriculture/10 border-agriculture/20 shadow-[var(--shadow-card)] animate-stochastic" style={{ animationDelay: '2s' }}>
        <CardHeader>
          <CardTitle className="text-foreground flex items-center gap-2">
            <div className="w-3 h-3 bg-agriculture rounded-full animate-pulse-glow"></div>
            Claims vs Yield
          </CardTitle>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={cropData}>
              <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
              <XAxis dataKey="month" stroke="hsl(var(--muted-foreground))" />
              <YAxis stroke="hsl(var(--muted-foreground))" />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: "hsl(var(--card))", 
                  border: "1px solid hsl(var(--border))",
                  borderRadius: "8px"
                }} 
              />
              <Line 
                type="monotone" 
                dataKey="claims" 
                stroke="hsl(var(--destructive))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--destructive))", strokeWidth: 2, r: 4 }}
              />
              <Line 
                type="monotone" 
                dataKey="yield" 
                stroke="hsl(var(--agriculture))" 
                strokeWidth={3}
                dot={{ fill: "hsl(var(--agriculture))", strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default InsuranceChart;