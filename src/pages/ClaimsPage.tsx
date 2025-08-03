import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Progress } from "@/components/ui/progress";
import { 
  FileText, 
  Upload, 
  Camera, 
  MapPin, 
  Calendar, 
  DollarSign,
  CheckCircle,
  Clock,
  AlertTriangle,
  Eye,
  Send,
  Paperclip,
  MessageSquare
} from "lucide-react";

const ClaimsPage = () => {
  const [activeTab, setActiveTab] = useState("new");
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);

  const claims = [
    {
      id: "CLM-001",
      policyId: "POL-002", 
      cropType: "Corn",
      damageType: "Drought",
      location: "Iowa, USA",
      dateReported: "2024-06-15",
      estimatedLoss: "$5,000",
      status: "approved",
      progress: 100,
      description: "Significant crop damage due to extended drought period affecting 30% of corn harvest.",
      evidence: ["field_damage_1.jpg", "weather_report.pdf"],
      adjustor: "John Smith",
      approvalDate: "2024-06-20",
      payoutAmount: "$4,800"
    },
    {
      id: "CLM-002",
      policyId: "POL-001",
      cropType: "Wheat", 
      damageType: "Hail Storm",
      location: "Kansas, USA",
      dateReported: "2024-07-10",
      estimatedLoss: "$8,500",
      status: "processing",
      progress: 65,
      description: "Hail damage to wheat crops following severe storm on July 8th. Approximately 40% of field affected.",
      evidence: ["hail_damage_1.jpg", "hail_damage_2.jpg", "meteorology_report.pdf"],
      adjustor: "Sarah Johnson",
      lastUpdate: "Under review by claims adjustor"
    },
    {
      id: "CLM-003", 
      policyId: "POL-003",
      cropType: "Soybeans",
      damageType: "Flood",
      location: "Illinois, USA", 
      dateReported: "2024-07-25",
      estimatedLoss: "$12,000",
      status: "pending",
      progress: 25,
      description: "Flooding in lower fields affecting soybean plantings. Water levels exceeded normal by 3 feet.",
      evidence: ["flood_aerial.jpg"],
      lastUpdate: "Waiting for additional documentation"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved": return "text-green-600 bg-green-100";
      case "processing": return "text-blue-600 bg-blue-100";
      case "pending": return "text-yellow-600 bg-yellow-100";
      case "rejected": return "text-red-600 bg-red-100";
      default: return "text-gray-600 bg-gray-100";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "approved": return <CheckCircle className="h-4 w-4" />;
      case "processing": return <Clock className="h-4 w-4" />;
      case "pending": return <AlertTriangle className="h-4 w-4" />;
      default: return <FileText className="h-4 w-4" />;
    }
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files) {
      setSelectedFiles(Array.from(event.target.files));
    }
  };

  const ClaimCard = ({ claim }: { claim: any }) => (
    <Card className="hover:shadow-lg transition-all duration-300 border-l-4 border-l-primary">
      <CardHeader className="pb-3">
        <div className="flex justify-between items-start">
          <div>
            <CardTitle className="text-lg flex items-center gap-2">
              <FileText className="h-5 w-5 text-primary" />
              {claim.cropType} - {claim.damageType}
            </CardTitle>
            <CardDescription className="flex items-center gap-1 mt-1">
              <MapPin className="h-3 w-3" />
              {claim.location}
            </CardDescription>
          </div>
          <Badge className={getStatusColor(claim.status)}>
            {getStatusIcon(claim.status)}
            {claim.status.charAt(0).toUpperCase() + claim.status.slice(1)}
          </Badge>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        {/* Claim Details */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Claim ID</p>
            <p className="font-semibold text-foreground font-mono text-sm">{claim.id}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Policy ID</p>
            <p className="font-semibold text-foreground font-mono text-sm">{claim.policyId}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Date Reported</p>
            <p className="font-semibold text-foreground">{claim.dateReported}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Estimated Loss</p>
            <p className="font-semibold text-foreground">{claim.estimatedLoss}</p>
          </div>
        </div>

        {/* Description */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Description</p>
          <p className="text-sm text-foreground bg-muted/30 rounded-lg p-3">
            {claim.description}
          </p>
        </div>

        {/* Progress */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Progress</span>
            <span className="font-medium">{claim.progress}%</span>
          </div>
          <Progress value={claim.progress} className="h-2" />
          <p className="text-xs text-muted-foreground">
            {claim.status === "approved" 
              ? `Approved on ${claim.approvalDate} - Payout: ${claim.payoutAmount}`
              : claim.lastUpdate || "Processing claim..."}
          </p>
        </div>

        {/* Evidence */}
        <div className="space-y-2">
          <p className="text-sm text-muted-foreground">Evidence ({claim.evidence.length} files)</p>
          <div className="flex flex-wrap gap-2">
            {claim.evidence.map((file: string, index: number) => (
              <Badge key={index} variant="outline" className="text-xs">
                <Paperclip className="h-3 w-3 mr-1" />
                {file}
              </Badge>
            ))}
          </div>
        </div>

        {/* Adjustor Info */}
        {claim.adjustor && (
          <div className="bg-blue-50 rounded-lg p-3">
            <p className="text-sm font-medium text-blue-900">
              Claims Adjustor: {claim.adjustor}
            </p>
          </div>
        )}

        {/* Actions */}
        <div className="flex gap-2 pt-2">
          <Button variant="outline" size="sm" className="flex-1">
            <Eye className="h-4 w-4 mr-2" />
            View Details
          </Button>
          {claim.status === "pending" && (
            <Button size="sm" className="flex-1 bg-gradient-to-r from-primary to-primary-glow">
              <MessageSquare className="h-4 w-4 mr-2" />
              Update
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
          <h1 className="text-3xl font-bold text-foreground mb-2">Claims Management</h1>
          <p className="text-muted-foreground">
            File and track your insurance claims
          </p>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        <Card className="bg-gradient-to-br from-green-50 to-green-100 border-green-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <CheckCircle className="h-8 w-8 text-green-600" />
              <div>
                <p className="text-2xl font-bold text-green-900">1</p>
                <p className="text-sm text-green-700">Approved</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <Clock className="h-8 w-8 text-blue-600" />
              <div>
                <p className="text-2xl font-bold text-blue-900">1</p>
                <p className="text-sm text-blue-700">Processing</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-yellow-50 to-yellow-100 border-yellow-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <AlertTriangle className="h-8 w-8 text-yellow-600" />
              <div>
                <p className="text-2xl font-bold text-yellow-900">1</p>
                <p className="text-sm text-yellow-700">Pending</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200">
          <CardContent className="p-4">
            <div className="flex items-center gap-3">
              <DollarSign className="h-8 w-8 text-purple-600" />
              <div>
                <p className="text-2xl font-bold text-purple-900">$4.8K</p>
                <p className="text-sm text-purple-700">Total Payouts</p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Claims Tabs */}
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="new">File New Claim</TabsTrigger>
          <TabsTrigger value="existing">My Claims ({claims.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="new" className="mt-6">
          <Card>
            <CardHeader>
              <CardTitle>File a New Claim</CardTitle>
              <CardDescription>
                Report damage to your crops and submit evidence for review
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="policy-select">Select Policy</Label>
                  <select className="w-full p-2 border border-border rounded-md">
                    <option value="">Choose a policy...</option>
                    <option value="POL-001">POL-001 - Wheat (Kansas)</option>
                    <option value="POL-002">POL-002 - Corn (Iowa)</option>
                    <option value="POL-003">POL-003 - Soybeans (Illinois)</option>
                  </select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="damage-type">Damage Type</Label>
                  <select className="w-full p-2 border border-border rounded-md">
                    <option value="">Select damage type...</option>
                    <option value="drought">Drought</option>
                    <option value="flood">Flood</option>
                    <option value="hail">Hail Storm</option>
                    <option value="frost">Frost</option>
                    <option value="pest">Pest Damage</option>
                    <option value="disease">Plant Disease</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="incident-date">Incident Date</Label>
                  <Input type="date" id="incident-date" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="estimated-loss">Estimated Loss ($)</Label>
                  <Input type="number" id="estimated-loss" placeholder="Enter amount" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Damage Description</Label>
                <Textarea 
                  id="description"
                  placeholder="Provide detailed description of the damage, affected area, and circumstances..."
                  rows={4}
                />
              </div>

              <div className="space-y-4">
                <Label>Upload Evidence</Label>
                <div className="border-2 border-dashed border-border rounded-lg p-6 text-center">
                  <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground mb-4">
                    Drag and drop files here or click to browse
                  </p>
                  <input
                    type="file"
                    multiple
                    accept="image/*,.pdf,.doc,.docx"
                    onChange={handleFileSelect}
                    className="hidden"
                    id="file-upload"
                  />
                  <Button variant="outline" asChild>
                    <label htmlFor="file-upload" className="cursor-pointer">
                      <Camera className="h-4 w-4 mr-2" />
                      Select Files
                    </label>
                  </Button>
                </div>
                
                {selectedFiles.length > 0 && (
                  <div className="space-y-2">
                    <p className="text-sm font-medium">Selected Files:</p>
                    {selectedFiles.map((file, index) => (
                      <div key={index} className="flex items-center gap-2 p-2 bg-muted rounded">
                        <Paperclip className="h-4 w-4" />
                        <span className="text-sm">{file.name}</span>
                        <span className="text-xs text-muted-foreground">
                          ({(file.size / 1024 / 1024).toFixed(2)} MB)
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <Button className="w-full bg-gradient-to-r from-primary to-primary-glow">
                <Send className="h-4 w-4 mr-2" />
                Submit Claim
              </Button>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="existing" className="mt-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {claims.map(claim => (
              <ClaimCard key={claim.id} claim={claim} />
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default ClaimsPage;
