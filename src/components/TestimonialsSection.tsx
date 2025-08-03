import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Quote } from "lucide-react";

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "María González",
      role: "Agricultora de Maíz",
      location: "Valle Central, Costa Rica",
      rating: 5,
      text: "CropLex me salvó la temporada. Cuando llegó la sequía inesperada, recibí mi compensación en menos de 48 horas. Sin papeleos ni complicaciones.",
      avatar: "👩🏻‍🌾",
      crop: "🌽"
    },
    {
      name: "Carlos Mendoza",
      role: "Productor de Café",
      location: "Antioquia, Colombia",
      rating: 5,
      text: "La tecnología de monitoreo es impresionante. Puedo ver el estado de mis cultivos en tiempo real y las alertas me han ayudado a prevenir pérdidas.",
      avatar: "👨🏽‍🌾",
      crop: "☕"
    },
    {
      name: "Ana Silva",
      role: "Cooperativa Agrícola",
      location: "Región Metropolitana, Chile",
      rating: 5,
      text: "Hemos asegurado más de 500 hectáreas con CropLex. La transparencia de blockchain nos da la confianza que necesitábamos.",
      avatar: "👩🏻‍💼",
      crop: "🍇"
    },
    {
      name: "José Rivera",
      role: "Agricultor de Arroz",
      location: "Guanacaste, Costa Rica",
      rating: 5,
      text: "Después de 30 años cultivando arroz, finalmente encontré un seguro que realmente funciona. Los pagos automáticos son revolucionarios.",
      avatar: "👨🏻‍🌾",
      crop: "🌾"
    }
  ];

  const stats = [
    { number: "98.7%", label: "Satisfacción del Cliente", icon: "😊" },
    { number: "$2.1M", label: "Pagado en Reclamaciones", icon: "💰" },
    { number: "24h", label: "Tiempo Promedio de Pago", icon: "⚡" },
    { number: "1,200+", label: "Agricultores Protegidos", icon: "👥" }
  ];

  return (
    <section className="py-24 bg-gradient-to-b from-background to-sky-light/5">
      <div className="container mx-auto px-4">
        
        {/* Header */}
        <div className="text-center mb-16">
          <Badge className="mb-4 bg-agriculture/10 text-agriculture border-agriculture/30">
            💬 Testimonios Reales
          </Badge>
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-agriculture via-sky-medium to-sky-dark bg-clip-text text-transparent">
            Lo que dicen nuestros agricultores
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
            Miles de agricultores ya confían en CropLex para proteger sus medios de vida. 
            Descubre por qué están eligiendo la agricultura del futuro.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
          {testimonials.map((testimonial, index) => (
            <Card 
              key={index}
              className="bg-white/70 backdrop-blur-md border-0 shadow-xl hover:shadow-2xl transition-all duration-300 hover:scale-105"
            >
              <CardContent className="p-8">
                <div className="flex items-start gap-4 mb-6">
                  <div className="text-4xl">{testimonial.avatar}</div>
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-1">
                      <h4 className="font-bold text-lg">{testimonial.name}</h4>
                      <span className="text-2xl">{testimonial.crop}</span>
                    </div>
                    <p className="text-sm text-muted-foreground">{testimonial.role}</p>
                    <p className="text-xs text-muted-foreground">{testimonial.location}</p>
                    <div className="flex items-center gap-1 mt-2">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <Quote className="h-8 w-8 text-sky-medium/30 mb-2" />
                  <p className="text-foreground leading-relaxed italic">
                    "{testimonial.text}"
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Stats Section */}
        <div className="bg-gradient-to-r from-sky-medium to-sky-dark rounded-3xl p-8 md:p-12 text-white">
          <div className="text-center mb-8">
            <h3 className="text-3xl md:text-4xl font-bold mb-4">
              Números que hablan por sí solos
            </h3>
            <p className="text-sky-light text-lg">
              La confianza de nuestros usuarios se refleja en nuestros resultados
            </p>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-4xl mb-2">{stat.icon}</div>
                <div className="text-3xl md:text-4xl font-bold mb-2">{stat.number}</div>
                <div className="text-sky-light text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
        
        {/* Social Proof */}
        <div className="text-center mt-16">
          <p className="text-muted-foreground mb-6">Respaldado por organizaciones líderes:</p>
          <div className="flex justify-center items-center gap-8 flex-wrap opacity-60">
            <div className="text-2xl font-bold">🏛️ Banco Mundial</div>
            <div className="text-2xl font-bold">🌍 FAO</div>
            <div className="text-2xl font-bold">🤝 IICA</div>
            <div className="text-2xl font-bold">🔬 CIAT</div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
