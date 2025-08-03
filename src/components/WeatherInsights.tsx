import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { 
  CloudRain, 
  Sun, 
  AlertTriangle, 
  Thermometer,
  Wind,
  Droplets,
  Eye,
  TrendingUp,
  TrendingDown,
  Calendar,
  MapPin
} from "lucide-react";

const WeatherInsights = () => {
  const currentWeather = {
    location: "Kansas Farm Region",
    temperature: 24,
    condition: "Partly Cloudy",
    humidity: 68,
    windSpeed: 12,
    precipitation: 0,
    uvIndex: 6,
    visibility: 15,
    pressure: 1013,
    dewPoint: 18
  };

  const forecast = [
    {
      day: "Today",
      date: "Aug 2",
      high: 26,
      low: 18,
      condition: "Partly Cloudy",
      precipitation: 10,
      icon: "partly-cloudy"
    },
    {
      day: "Tomorrow", 
      date: "Aug 3",
      high: 28,
      low: 20,
      condition: "Sunny",
      precipitation: 0,
      icon: "sunny"
    },
    {
      day: "Thursday",
      date: "Aug 4", 
      high: 25,
      low: 17,
      condition: "Light Rain",
      precipitation: 70,
      icon: "rainy"
    },
    {
      day: "Friday",
      date: "Aug 5",
      high: 23,
      low: 16,
      condition: "Thunderstorms", 
      precipitation: 85,
      icon: "stormy"
    },
    {
      day: "Saturday",
      date: "Aug 6",
      high: 27,
      low: 19,
      condition: "Partly Cloudy",
      precipitation: 20,
      icon: "partly-cloudy"
    }
  ];

  const alerts = [
    {
      type: "warning",
      title: "Heavy Rain Expected",
      description: "Thunderstorms forecasted for Thursday-Friday. Potential flooding risk for low-lying fields.",
      severity: "Medium",
      validUntil: "Aug 5, 2024",
      recommendations: [
        "Ensure drainage systems are clear",
        "Consider early harvest for ready crops",
        "Protect equipment and livestock"
      ]
    },
    {
      type: "info",
      title: "Optimal Growing Conditions",
      description: "Current temperature and humidity levels are ideal for corn pollination.",
      severity: "Low",
      validUntil: "Aug 3, 2024",
      recommendations: [
        "Monitor tasseling progress",
        "Maintain irrigation schedule"
      ]
    }
  ];

  const riskAssessment = {
    drought: { level: 25, trend: "down", description: "Recent rainfall has reduced drought risk" },
    flood: { level: 70, trend: "up", description: "Increased flood risk due to forecasted storms" },
    frost: { level: 5, trend: "stable", description: "No frost risk in current conditions" },
    hail: { level: 40, trend: "up", description: "Moderate hail risk with upcoming storms" }
  };

  const getWeatherIcon = (condition: string) => {
    switch (condition.toLowerCase()) {
      case "sunny": return <Sun className="h-6 w-6 text-yellow-500" />;
      case "partly-cloudy": return <Sun className="h-6 w-6 text-yellow-400" />;
      case "rainy":
      case "light rain": return <CloudRain className="h-6 w-6 text-blue-500" />;
      case "stormy":
      case "thunderstorms": return <AlertTriangle className="h-6 w-6 text-red-500" />;
      default: return <Sun className="h-6 w-6 text-gray-500" />;
    }
  };

  const getAlertColor = (type: string) => {
    switch (type) {
      case "warning": return "border-l-yellow-500 bg-yellow-50";
      case "danger": return "border-l-red-500 bg-red-50";
      case "info": return "border-l-blue-500 bg-blue-50";
      default: return "border-l-gray-500 bg-gray-50";
    }
  };

  const getRiskColor = (level: number) => {
    if (level >= 70) return "text-red-600 bg-red-100";
    if (level >= 40) return "text-yellow-600 bg-yellow-100";
    return "text-green-600 bg-green-100";
  };

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case "up": return <TrendingUp className="h-3 w-3 text-red-500" />;
      case "down": return <TrendingDown className="h-3 w-3 text-green-500" />;
      default: return <div className="h-3 w-3 bg-gray-400 rounded-full" />;
    }
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Current Weather */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Sun className="h-5 w-5 text-yellow-500" />
              Current Weather
            </CardTitle>
            <CardDescription className="flex items-center gap-1">
              <MapPin className="h-3 w-3" />
              {currentWeather.location}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="text-center">
              <div className="text-4xl font-bold">{currentWeather.temperature}°C</div>
              <p className="text-muted-foreground">{currentWeather.condition}</p>
            </div>
            
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <Droplets className="h-4 w-4 text-blue-500" />
                <div>
                  <p className="font-medium">{currentWeather.humidity}%</p>
                  <p className="text-muted-foreground">Humidity</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Wind className="h-4 w-4 text-gray-500" />
                <div>
                  <p className="font-medium">{currentWeather.windSpeed} km/h</p>
                  <p className="text-muted-foreground">Wind</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Eye className="h-4 w-4 text-purple-500" />
                <div>
                  <p className="font-medium">{currentWeather.visibility} km</p>
                  <p className="text-muted-foreground">Visibility</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Thermometer className="h-4 w-4 text-red-500" />
                <div>
                  <p className="font-medium">{currentWeather.dewPoint}°C</p>
                  <p className="text-muted-foreground">Dew Point</p>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* 5-Day Forecast */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Calendar className="h-5 w-5" />
              5-Day Forecast
            </CardTitle>
            <CardDescription>Weather predictions for your farming area</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {forecast.map((day, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div className="flex items-center gap-4">
                    {getWeatherIcon(day.condition)}
                    <div>
                      <p className="font-medium">{day.day}</p>
                      <p className="text-sm text-muted-foreground">{day.date}</p>
                    </div>
                  </div>
                  
                  <div className="flex items-center gap-6">
                    <div className="text-right">
                      <p className="font-medium">{day.condition}</p>
                      <p className="text-sm text-muted-foreground">
                        {day.high}° / {day.low}°
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <CloudRain className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{day.precipitation}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weather Alerts */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-yellow-500" />
              Weather Alerts
            </CardTitle>
            <CardDescription>Important weather notifications for your area</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {alerts.map((alert, index) => (
              <div key={index} className={`p-4 border-l-4 rounded-lg ${getAlertColor(alert.type)}`}>
                <div className="flex justify-between items-start mb-2">
                  <h4 className="font-medium">{alert.title}</h4>
                  <Badge variant="secondary">{alert.severity}</Badge>
                </div>
                <p className="text-sm text-muted-foreground mb-3">{alert.description}</p>
                <div className="space-y-1 mb-3">
                  <p className="text-xs font-medium">Recommendations:</p>
                  {alert.recommendations.map((rec, recIndex) => (
                    <p key={recIndex} className="text-xs text-muted-foreground">• {rec}</p>
                  ))}
                </div>
                <p className="text-xs text-muted-foreground">Valid until: {alert.validUntil}</p>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Risk Assessment */}
        <Card>
          <CardHeader>
            <CardTitle>Weather Risk Assessment</CardTitle>
            <CardDescription>Current risk levels for weather-related crop damage</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {Object.entries(riskAssessment).map(([risk, data]) => (
              <div key={risk} className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="capitalize font-medium">{risk} Risk</span>
                    {getTrendIcon(data.trend)}
                  </div>
                  <Badge className={getRiskColor(data.level)}>
                    {data.level}%
                  </Badge>
                </div>
                <Progress value={data.level} className="h-2" />
                <p className="text-xs text-muted-foreground">{data.description}</p>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button variant="outline" className="flex-1">
          View Detailed Forecast
        </Button>
        <Button variant="outline" className="flex-1">
          Historical Weather Data
        </Button>
        <Button className="flex-1 bg-gradient-to-r from-agriculture to-agriculture-dark">
          Configure Alerts
        </Button>
      </div>
    </div>
  );
};

export default WeatherInsights;
