import { Button } from "@/components/ui/button";
import { 
  Leaf, 
  Mail, 
  Phone, 
  MapPin, 
  Twitter, 
  Github, 
  Linkedin,
  ArrowRight
} from "lucide-react";

const Footer = () => {
  const footerSections = [
    {
      title: "Producto",
      links: [
        { name: "Características", href: "#features" },
        { name: "Precios", href: "#pricing" },
        { name: "Documentación", href: "#docs" },
        { name: "API", href: "#api" }
      ]
    },
    {
      title: "Empresa",
      links: [
        { name: "Acerca de", href: "#about" },
        { name: "Blog", href: "#blog" },
        { name: "Carreras", href: "#careers" },
        { name: "Prensa", href: "#press" }
      ]
    },
    {
      title: "Soporte",
      links: [
        { name: "Centro de Ayuda", href: "#help" },
        { name: "Comunidad", href: "#community" },
        { name: "Contacto", href: "#contact" },
        { name: "Estado del Sistema", href: "#status" }
      ]
    },
    {
      title: "Legal",
      links: [
        { name: "Términos de Servicio", href: "#terms" },
        { name: "Política de Privacidad", href: "#privacy" },
        { name: "Cookies", href: "#cookies" },
        { name: "Cumplimiento", href: "#compliance" }
      ]
    }
  ];

  const socialLinks = [
    { icon: Twitter, href: "#", label: "Twitter" },
    { icon: Linkedin, href: "#", label: "LinkedIn" },
    { icon: Github, href: "#", label: "GitHub" }
  ];

  return (
    <footer className="bg-gradient-to-b from-background to-sky-light/10 border-t border-sky-medium/20">
      
      {/* Newsletter Section */}
      <div className="border-b border-sky-medium/20">
        <div className="container mx-auto px-4 py-16">
          <div className="max-w-4xl mx-auto text-center">
            <h3 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-to-r from-sky-medium to-agriculture bg-clip-text text-transparent">
              Mantente informado sobre el futuro de la agricultura
            </h3>
            <p className="text-lg text-muted-foreground mb-8">
              Recibe las últimas noticias, actualizaciones de producto y consejos agrícolas directamente en tu bandeja de entrada.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input 
                type="email" 
                placeholder="tu@email.com"
                className="flex-1 px-6 py-4 rounded-full border border-sky-medium/30 bg-white/60 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-sky-medium"
              />
              <Button className="bg-gradient-to-r from-sky-medium to-sky-dark px-8 py-4 rounded-full font-semibold hover:scale-105 transition-transform duration-300">
                Suscribirse
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Footer Content */}
      <div className="container mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">
          
          {/* Brand Section */}
          <div className="lg:col-span-2">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-sky-medium to-sky-dark rounded-xl flex items-center justify-center">
                <Leaf className="h-7 w-7 text-white" />
              </div>
              <div>
                <h2 className="text-2xl font-bold bg-gradient-to-r from-sky-medium to-agriculture bg-clip-text text-transparent">
                  CropLex
                </h2>
                <p className="text-sm text-muted-foreground">Seguros Agrícolas del Futuro</p>
              </div>
            </div>
            
            <p className="text-muted-foreground mb-6 leading-relaxed">
              Revolucionando la industria de seguros agrícolas con tecnología blockchain, 
              inteligencia artificial y monitoreo IoT para proteger el futuro de la agricultura.
            </p>
            
            {/* Contact Info */}
            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-sky-medium" />
                <span className="text-muted-foreground">contacto@croplex.com</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-sky-medium" />
                <span className="text-muted-foreground">+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <MapPin className="h-4 w-4 text-sky-medium" />
                <span className="text-muted-foreground">San José, Costa Rica</span>
              </div>
            </div>

            {/* Social Links */}
            <div className="flex gap-3">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-10 h-10 bg-sky-medium/10 hover:bg-sky-medium/20 rounded-lg flex items-center justify-center transition-colors duration-300 group"
                    aria-label={social.label}
                  >
                    <Icon className="h-5 w-5 text-sky-medium group-hover:text-sky-dark transition-colors duration-300" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* Links Sections */}
          {footerSections.map((section, index) => (
            <div key={index}>
              <h4 className="font-bold text-foreground mb-4">{section.title}</h4>
              <ul className="space-y-3">
                {section.links.map((link, linkIndex) => (
                  <li key={linkIndex}>
                    <a 
                      href={link.href}
                      className="text-muted-foreground hover:text-sky-medium transition-colors duration-300 text-sm"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-sky-medium/20">
        <div className="container mx-auto px-4 py-6">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-sm text-muted-foreground">
              © 2025 CropLex. Todos los derechos reservados.
            </div>
            <div className="flex items-center gap-6 text-sm">
              <span className="text-muted-foreground">🌱 Cultivando el futuro con tecnología</span>
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-agriculture rounded-full animate-pulse"></div>
                <span className="text-muted-foreground">Sistema operativo</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
