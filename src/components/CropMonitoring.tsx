import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { 
  Thermometer, 
  Droplets, 
  Wind, 
  Eye, 
  MapPin, 
  Calendar,
  TrendingUp,
  TrendingDown,
  AlertTriangle,
  CheckCircle,
  Satellite,
  Activity
} from "lucide-react";

const CropMonitoring = () => {
  const [selectedField, setSelectedField] = useState("field-1");

  const fieldData = [
    {
      id: "field-1",
      name: "North Field - Wheat",
      location: "40.7128°N, 74.0060°W",
      area: "125 hectares",
      plantingDate: "2024-03-15",
      currentStage: "Grain Filling",
      healthScore: 87,
      yieldProjection: "6.2 tons/hectare",
      riskLevel: "Low",
      lastUpdate: "2 hours ago",
      weather: {
        temperature: 24,
        humidity: 68,
        windSpeed: 12,
        soilMoisture: 45
      },
      growth: {
        germination: 100,
        vegetative: 100,
        flowering: 100,
        grainFilling: 65,
        maturity: 0
      },
      sensors: [
        { type: "Soil Moisture", value: 45, unit: "%", status: "normal" },
        { type: "Temperature", value: 24, unit: "°C", status: "normal" },
        { type: "pH Level", value: 6.8, unit: "", status: "good" },
        { type: "Nutrient Level", value: 82, unit: "%", status: "good" }
      ],
      alerts: [
        {
          type: "info",
          message: "Optimal conditions for grain development",
          time: "2 hours ago"
        }
      ]
    },
    {
      id: "field-2", 
      name: "South Field - Corn",
      location: "40.7150°N, 74.0080°W",
      area: "98 hectares",
      plantingDate: "2024-04-20",
      currentStage: "Tasseling",
      healthScore: 92,
      yieldProjection: "11.8 tons/hectare",
      riskLevel: "Low",
      lastUpdate: "1 hour ago",
      weather: {
        temperature: 26,
        humidity: 72,
        windSpeed: 8,
        soilMoisture: 52
      },
      growth: {
        germination: 100,
        vegetative: 100,
        flowering: 85,
        grainFilling: 0,
        maturity: 0
      },
      sensors: [
        { type: "Soil Moisture", value: 52, unit: "%", status: "good" },
        { type: "Temperature", value: 26, unit: "°C", status: "normal" },
        { type: "pH Level", value: 6.5, unit: "", status: "normal" },
        { type: "Nutrient Level", value: 78, unit: "%", status: "normal" }
      ],
      alerts: [
        {
          type: "success",
          message: "Excellent pollination conditions detected",
          time: "1 hour ago"
        }
      ]
    },
    {
      id: "field-3",
      name: "East Field - Soybeans", 
      location: "40.7100°N, 74.0040°W",
      area: "87 hectares",
      plantingDate: "2024-05-10",
      currentStage: "Pod Formation",
      healthScore: 74,
      yieldProjection: "3.1 tons/hectare",
      riskLevel: "Medium",
      lastUpdate: "30 minutes ago",
      weather: {
        temperature: 28,
        humidity: 85,
        windSpeed: 15,
        soilMoisture: 38
      },
      growth: {
        germination: 100,
        vegetative: 100,
        flowering: 90,
        grainFilling: 35,
        maturity: 0
      },
      sensors: [
        { type: "Soil Moisture", value: 38, unit: "%", status: "warning" },
        { type: "Temperature", value: 28, unit: "°C", status: "warning" },
        { type: "pH Level", value: 6.3, unit: "", status: "normal" },
        { type: "Nutrient Level", value: 65, unit: "%", status: "warning" }
      ],
      alerts: [
        {
          type: "warning",
          message: "Low soil moisture detected - irrigation recommended",
          time: "30 minutes ago"
        },
        {
          type: "warning",
          message: "Temperature stress possible - monitor closely",
          time: "1 hour ago"
        }
      ]
    }
  ];

  const currentField = fieldData.find(field => field.id === selectedField) || fieldData[0];

  const getHealthColor = (score: number) => {
    if (score >= 85) return "text-green-600 bg-green-100";
    if (score >= 70) return "text-yellow-600 bg-yellow-100";
    return "text-red-600 bg-red-100";
  };

  const getRiskColor = (risk: string) => {
    switch (risk.toLowerCase()) {
      case "low": return "text-green-600 bg-green-100";
      case "medium": return "text-yellow-600 bg-yellow-100";
      case "high": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getSensorStatusColor = (status: string) => {
    switch (status) {
      case "good": return "text-green-600 bg-green-100";
      case "normal": return "text-blue-600 bg-blue-100";
      case "warning": return "text-yellow-600 bg-yellow-100";
      case "critical": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case "success": return <CheckCircle className="h-4 w-4 text-green-600" />;
      case "warning": return <AlertTriangle className="h-4 w-4 text-yellow-600" />;
      case "error": return <AlertTriangle className="h-4 w-4 text-red-600" />;
      default: return <Activity className="h-4 w-4 text-blue-600" />;
    }
  };

  return (
    <div className="space-y-6">
      {/* Field Selection */}
      <div className="flex flex-wrap gap-2 mb-6">
        {fieldData.map((field) => (
          <Button
            key={field.id}
            variant={selectedField === field.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedField(field.id)}
            className={selectedField === field.id ? "bg-gradient-to-r from-agriculture to-agriculture-dark" : ""}
          >
            {field.name.split(" - ")[0]}
          </Button>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Field Overview */}
        <Card className="lg:col-span-2">
          <CardHeader>
            <div className="flex justify-between items-start">
              <div>
                <CardTitle className="flex items-center gap-2">
                  <Satellite className="h-5 w-5 text-agriculture" />
                  {currentField.name}
                </CardTitle>
                <CardDescription className="flex items-center gap-4 mt-2">
                  <div className="flex items-center gap-1">
                    <MapPin className="h-3 w-3" />
                    {currentField.location}
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="h-3 w-3" />
                    Planted: {currentField.plantingDate}
                  </div>
                </CardDescription>
              </div>
              <div className="flex flex-col gap-2">
                <Badge className={getHealthColor(currentField.healthScore)}>
                  Health: {currentField.healthScore}%
                </Badge>
                <Badge className={getRiskColor(currentField.riskLevel)}>
                  {currentField.riskLevel} Risk
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6">
            {/* Current Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Area</p>
                <p className="font-semibold">{currentField.area}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Growth Stage</p>
                <p className="font-semibold">{currentField.currentStage}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Projected Yield</p>
                <p className="font-semibold">{currentField.yieldProjection}</p>
              </div>
              <div className="space-y-1">
                <p className="text-xs text-muted-foreground">Last Update</p>
                <p className="font-semibold">{currentField.lastUpdate}</p>
              </div>
            </div>

            {/* Weather Conditions */}
            <div className="bg-muted/30 rounded-lg p-4">
              <h4 className="font-medium mb-3">Current Weather</h4>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <div className="flex items-center gap-2">
                  <Thermometer className="h-4 w-4 text-orange-500" />
                  <div>
                    <p className="text-sm font-medium">{currentField.weather.temperature}°C</p>
                    <p className="text-xs text-muted-foreground">Temperature</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-blue-500" />
                  <div>
                    <p className="text-sm font-medium">{currentField.weather.humidity}%</p>
                    <p className="text-xs text-muted-foreground">Humidity</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Wind className="h-4 w-4 text-gray-500" />
                  <div>
                    <p className="text-sm font-medium">{currentField.weather.windSpeed} km/h</p>
                    <p className="text-xs text-muted-foreground">Wind Speed</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <Droplets className="h-4 w-4 text-green-500" />
                  <div>
                    <p className="text-sm font-medium">{currentField.weather.soilMoisture}%</p>
                    <p className="text-xs text-muted-foreground">Soil Moisture</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Growth Progress */}
            <div className="space-y-4">
              <h4 className="font-medium">Growth Progress</h4>
              <div className="space-y-3">
                {Object.entries(currentField.growth).map(([stage, progress]) => (
                  <div key={stage} className="space-y-1">
                    <div className="flex justify-between text-sm">
                      <span className="capitalize">{stage.replace(/([A-Z])/g, ' $1').trim()}</span>
                      <span className="font-medium">{progress}%</span>
                    </div>
                    <Progress value={progress} className="h-2" />
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Sensors & Alerts */}
        <div className="space-y-6">
          {/* Sensor Data */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Sensor Data</CardTitle>
              <CardDescription>Real-time field measurements</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {currentField.sensors.map((sensor, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                  <div>
                    <p className="font-medium text-sm">{sensor.type}</p>
                    <p className="text-lg font-bold">
                      {sensor.value}{sensor.unit}
                    </p>
                  </div>
                  <Badge className={getSensorStatusColor(sensor.status)}>
                    {sensor.status}
                  </Badge>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Alerts */}
          <Card>
            <CardHeader>
              <CardTitle className="text-lg">Field Alerts</CardTitle>
              <CardDescription>Recent notifications and warnings</CardDescription>
            </CardHeader>
            <CardContent className="space-y-3">
              {currentField.alerts.map((alert, index) => (
                <div key={index} className="flex items-start gap-3 p-3 border border-border rounded-lg">
                  {getAlertIcon(alert.type)}
                  <div className="flex-1">
                    <p className="text-sm font-medium">{alert.message}</p>
                    <p className="text-xs text-muted-foreground">{alert.time}</p>
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default CropMonitoring;
