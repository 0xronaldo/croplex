import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  Wallet, 
  FileText, 
  Satellite, 
  Shield, 
  ArrowRight, 
  CheckCircle,
  Clock,
  Zap
} from "lucide-react";

const HowItWorksSection = () => {
  const steps = [
    {
      step: "01",
      icon: Wallet,
      title: "Conecta tu Wallet",
      description: "Conecta tu wallet de criptomonedas para acceder a la plataforma de manera segura",
      details: [
        "Compatible con MetaMask, Phantom y más",
        "Conexión segura blockchain",
        "Sin registro tradicional"
      ],
      color: "from-sky-medium to-sky-dark",
      delay: "0s"
    },
    {
      step: "02", 
      icon: FileText,
      title: "Configura tu Póliza",
      description: "Selecciona tu tipo de cultivo, área y cobertura deseada para crear tu póliza personalizada",
      details: [
        "Múltiples tipos de cultivos",
        "Cobertura personalizable",
        "Términos transparentes"
      ],
      color: "from-agriculture to-agriculture-dark",
      delay: "0.2s"
    },
    {
      step: "03",
      icon: Satellite,
      title: "Monitoreo Automático", 
      description: "Nuestros sensores IoT y satélites monitorean tus cultivos 24/7 en tiempo real",
      details: [
        "Datos satelitales en tiempo real",
        "Sensores IoT avanzados",
        "Alertas automáticas"
      ],
      color: "from-primary to-sky-dark",
      delay: "0.4s"
    },
    {
      step: "04",
      icon: Zap,
      title: "Pago Automático",
      description: "Si se activa una condición de reclamo, recibes tu pago automáticamente sin intermediarios",
      details: [
        "Pagos en 24-48 horas",
        "Sin papeleos",
        "100% automatizado"
      ],
      color: "from-sky-dark to-agriculture-light",
      delay: "0.6s"
    }
  ];

  const advantages = [
    {
      icon: Clock,
      title: "Rápido",
      description: "Proceso completo en minutos, no semanas"
    },
    {
      icon: Shield,
      title: "Seguro", 
      description: "Contratos inteligentes auditados"
    },
    {
      icon: CheckCircle,
      title: "Transparente",
      description: "Todos los términos en blockchain"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-sky-light/5 via-background to-sky-medium/10">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-sky-medium/10 text-sky-dark border-sky-medium/30">
            ⚡ Proceso Simple
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sky-dark via-agriculture to-primary bg-clip-text text-transparent">
            ¿Cómo funciona CropLex?
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            En solo 4 pasos simples, puedes proteger tus cultivos con la tecnología blockchain más avanzada. 
            Sin complicaciones, sin esperas, sin intermediarios.
          </p>
        </div>

        {/* Steps */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <Card 
                key={index}
                className="relative bg-white/60 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:scale-105 overflow-hidden group"
                style={{ animationDelay: step.delay }}
              >
                {/* Step Number */}
                <div className="absolute top-4 right-4 text-6xl font-bold opacity-10 group-hover:opacity-20 transition-opacity duration-300">
                  {step.step}
                </div>
                
                <CardContent className="p-8 relative z-10">
                  <div className={`w-16 h-16 mx-auto mb-6 rounded-2xl bg-gradient-to-br ${step.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  
                  <h3 className="text-xl font-bold mb-4 text-center">{step.title}</h3>
                  <p className="text-muted-foreground text-center mb-6 leading-relaxed">
                    {step.description}
                  </p>
                  
                  <div className="space-y-2">
                    {step.details.map((detail, idx) => (
                      <div key={idx} className="flex items-center text-sm">
                        <CheckCircle className="h-3 w-3 text-agriculture mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{detail}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>

                {/* Arrow for desktop */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:block absolute -right-4 top-1/2 transform -translate-y-1/2 z-20">
                    <div className="w-8 h-8 bg-white rounded-full shadow-lg flex items-center justify-center">
                      <ArrowRight className="h-4 w-4 text-sky-medium" />
                    </div>
                  </div>
                )}
              </Card>
            );
          })}
        </div>

        {/* Advantages */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {advantages.map((advantage, index) => {
            const Icon = advantage.icon;
            return (
              <div key={index} className="text-center">
                <div className="w-12 h-12 mx-auto mb-4 bg-gradient-to-br from-sky-medium to-sky-dark rounded-xl flex items-center justify-center">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h4 className="text-lg font-bold mb-2">{advantage.title}</h4>
                <p className="text-muted-foreground">{advantage.description}</p>
              </div>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center">
          <div className="bg-gradient-to-r from-agriculture via-sky-medium to-sky-dark rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para comenzar?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Protege tus cultivos en menos de 5 minutos
            </p>
            <Button 
              size="lg"
              className="bg-white text-sky-dark hover:bg-sky-light px-10 py-6 rounded-full font-semibold text-lg transition-all duration-300 hover:scale-105"
            >
              Comenzar Ahora
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
