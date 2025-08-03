import WalletConnect from "./WalletConnect";
import MetricsGrid from "./MetricsGrid";
import InsuranceChart from "./InsuranceChart";
import UserRegistration from "./UserRegistration";
import InsuranceExplanation from "./InsuranceExplanation";
import PerformanceSummary from "./PerformanceSummary";
import CropMonitoring from "./CropMonitoring";
import WeatherInsights from "./WeatherInsights";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";
import { useWallet } from "@/contexts/WalletContext";
import { WalletProvider } from "@/types/wallet";

const Dashboard = () => {
  const { isWalletConnected, walletAddress, walletProvider } = useWallet();
  const [showRegistration, setShowRegistration] = useState(false);
  const [isRegistered, setIsRegistered] = useState(false);

  const handleWalletConnected = (address: string, provider: WalletProvider) => {
    setShowRegistration(true);
  };

  const handleRegistrationComplete = () => {
    setIsRegistered(true);
    setShowRegistration(false);
  };

  return (
    <section className="py-16 px-4">
      <div className="container mx-auto max-w-7xl">
        <div className="mb-8">
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-4">
            CropLex Dashboard
          </h2>
          <p className="text-muted-foreground text-lg">
            Real-time agricultural insurance data and farm management
          </p>
        </div>

        <div className="space-y-8">
          <WalletConnect onWalletConnected={handleWalletConnected} />
          
          {showRegistration && isWalletConnected && (
            <>
              <Separator className="bg-border" />
              <div>
                <h3 className="text-xl font-semibold text-foreground mb-6">User Registration</h3>
                <UserRegistration 
                  walletAddress={walletAddress}
                  onRegistrationComplete={handleRegistrationComplete}
                />
              </div>
            </>
          )}
          
          {(isWalletConnected && isRegistered) && (
            <>
              <Separator className="bg-border" />
              
              <Tabs defaultValue="overview" className="space-y-6">
                <TabsList className="grid w-full grid-cols-4">
                  <TabsTrigger value="overview">Overview</TabsTrigger>
                  <TabsTrigger value="monitoring">Crop Monitoring</TabsTrigger>
                  <TabsTrigger value="weather">Weather Insights</TabsTrigger>
                  <TabsTrigger value="analytics">Analytics</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-6">Investment Performance</h3>
                    <PerformanceSummary />
                  </div>
                  
                  <Separator className="bg-border" />
                  
                  <div>
                    <InsuranceExplanation />
                  </div>
                  
                  <Separator className="bg-border" />
                  
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-6">Key Metrics</h3>
                    <MetricsGrid />
                  </div>
                </TabsContent>

                <TabsContent value="monitoring" className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-6">Field Monitoring</h3>
                    <CropMonitoring />
                  </div>
                </TabsContent>

                <TabsContent value="weather" className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-6">Weather Intelligence</h3>
                    <WeatherInsights />
                  </div>
                </TabsContent>

                <TabsContent value="analytics" className="space-y-8">
                  <div>
                    <h3 className="text-xl font-semibold text-foreground mb-6">Insurance Analytics</h3>
                    <InsuranceChart />
                  </div>
                </TabsContent>
              </Tabs>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Dashboard;