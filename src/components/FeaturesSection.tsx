import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Smartphone, 
  Cloud, 
  Shield, 
  BarChart3, 
  Zap, 
  Globe, 
  Lock, 
  Users,
  CheckCircle
} from "lucide-react";

const FeaturesSection = () => {
  const features = [
    {
      icon: Smartphone,
      title: "App Móvil Intuitiva",
      description: "Gestiona tus pólizas desde cualquier lugar con nuestra app móvil fácil de usar",
      benefits: ["Notificaciones push", "Acceso offline", "Interface simple"],
      gradient: "from-sky-light to-sky-medium"
    },
    {
      icon: Cloud,
      title: "Datos Meteorológicos",
      description: "Integración con múltiples fuentes de datos climáticos para predicciones precisas",
      benefits: ["Alertas tempranas", "Análisis predictivo", "Cobertura global"],
      gradient: "from-sky-medium to-sky-dark"
    },
    {
      icon: Shield,
      title: "Seguridad Blockchain",
      description: "Contratos inteligentes auditados que garantizan pagos automáticos y seguros",
      benefits: ["Sin intermediarios", "Pagos garantizados", "Transparencia total"],
      gradient: "from-agriculture to-agriculture-dark"
    },
    {
      icon: BarChart3,
      title: "Analytics Avanzado",
      description: "Dashboards detallados con métricas de rendimiento y análisis de riesgo",
      benefits: ["Reportes en tiempo real", "Insights personalizados", "Exportación de datos"],
      gradient: "from-primary to-sky-dark"
    },
    {
      icon: Zap,
      title: "Reclamaciones Rápidas",
      description: "Proceso de reclamación automatizado que reduce el tiempo de espera",
      benefits: ["Verificación automática", "Pago en 24-48h", "Sin papeleo"],
      gradient: "from-sky-dark to-agriculture-light"
    },
    {
      icon: Users,
      title: "Comunidad Global",
      description: "Únete a miles de agricultores que ya confían en CropLex para proteger sus cultivos",
      benefits: ["Soporte 24/7", "Foro de agricultores", "Eventos educativos"],
      gradient: "from-agriculture-light to-sky-medium"
    }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-sky-light/10 via-background to-sky-medium/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-sky-light/20 text-sky-dark border-sky-medium/30">
            🚀 Características Avanzadas
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-sky-medium via-primary to-agriculture bg-clip-text text-transparent">
            Todo lo que necesitas para proteger tus cultivos
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            CropLex combina tecnología de vanguardia con la experiencia agrícola para ofrecerte 
            la plataforma de seguros más completa del mercado.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <Card 
                key={index}
                className="group hover:shadow-2xl transition-all duration-500 hover:scale-105 border-0 bg-white/60 backdrop-blur-md"
              >
                <CardHeader className="text-center pb-4">
                  <div className={`w-16 h-16 mx-auto mb-4 rounded-2xl bg-gradient-to-br ${feature.gradient} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="h-8 w-8 text-white" />
                  </div>
                  <CardTitle className="text-xl font-bold">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <CardDescription className="text-base mb-6 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                  <div className="space-y-2">
                    {feature.benefits.map((benefit, idx) => (
                      <div key={idx} className="flex items-center justify-start text-sm">
                        <CheckCircle className="h-4 w-4 text-agriculture mr-2 flex-shrink-0" />
                        <span className="text-muted-foreground">{benefit}</span>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Call to Action */}
        <div className="text-center mt-16">
          <div className="bg-gradient-to-r from-sky-medium to-sky-dark rounded-3xl p-8 md:p-12 text-white shadow-2xl">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              ¿Listo para proteger tus cultivos?
            </h3>
            <p className="text-xl mb-8 opacity-90">
              Únete a la revolución de los seguros agrícolas descentralizados
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-8 py-4 bg-white text-sky-dark rounded-full font-semibold hover:bg-sky-light transition-colors duration-300">
                Comenzar Gratis
              </button>
              <button className="px-8 py-4 border-2 border-white/30 rounded-full font-semibold hover:bg-white/10 transition-colors duration-300">
                Ver Demo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesSection;
