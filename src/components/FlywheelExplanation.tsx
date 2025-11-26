import { motion } from "framer-motion";
import { TrendingUp, Users, Heart, RefreshCw } from "lucide-react";
import { Card } from "@/components/ui/card";

export const FlywheelExplanation = () => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="mb-12"
    >
      <Card className="p-8 bg-gradient-to-br from-card to-card/50 border-2">
        <div className="space-y-6">
          {/* Title and Icon */}
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-full bg-primary/10">
              <RefreshCw className="w-8 h-8 text-primary" />
            </div>
            <div>
              <h2 className="text-2xl font-bold text-foreground">
                ¿Qué es el Flywheel de Marketing?
              </h2>
              <p className="text-muted-foreground">
                Un modelo que transforma tu estrategia de marketing
              </p>
            </div>
          </div>

          {/* Main Description */}
          <div className="prose prose-sm max-w-none">
            <p className="text-foreground leading-relaxed">
              El <strong>Flywheel</strong> (volante de inercia) es un modelo de marketing moderno propuesto por HubSpot que 
              reemplaza el tradicional embudo de ventas. A diferencia del embudo lineal que tiene un inicio y un fin, 
              el Flywheel está en <strong>constante movimiento circular</strong>, representando cómo los clientes satisfechos 
              impulsan el crecimiento de tu negocio de manera continua.
            </p>
          </div>

          {/* Three Stages */}
          <div className="grid md:grid-cols-3 gap-6 mt-8">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[hsl(210,100%,50%)]/10">
                  <TrendingUp className="w-6 h-6" style={{ color: "hsl(210 100% 50%)" }} />
                </div>
                <h3 className="font-semibold text-lg text-foreground">Attract (Atraer)</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Captar la atención de potenciales clientes mediante contenido valioso y estrategias 
                que resuelvan sus necesidades reales.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[hsl(38,92%,50%)]/10">
                  <Users className="w-6 h-6" style={{ color: "hsl(38 92% 50%)" }} />
                </div>
                <h3 className="font-semibold text-lg text-foreground">Engage (Interactuar)</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Facilitar que los clientes encuentren soluciones adaptadas a sus objetivos, 
                construyendo relaciones duraderas y significativas.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="space-y-3"
            >
              <div className="flex items-center gap-3">
                <div className="p-2 rounded-lg bg-[hsl(142,76%,45%)]/10">
                  <Heart className="w-6 h-6" style={{ color: "hsl(142 76% 45%)" }} />
                </div>
                <h3 className="font-semibold text-lg text-foreground">Delight (Deleitar)</h3>
              </div>
              <p className="text-sm text-muted-foreground leading-relaxed">
                Superar las expectativas ofreciendo experiencias excepcionales que conviertan 
                a tus clientes en promotores activos de tu marca.
              </p>
            </motion.div>
          </div>

          {/* Key Benefits */}
          <div className="mt-6 p-4 bg-primary/5 rounded-lg border border-primary/10">
            <p className="text-sm text-foreground">
              <strong>🎯 Beneficio clave:</strong> El Flywheel se enfoca en el <strong>cliente como motor del crecimiento</strong>. 
              Los clientes satisfechos no solo regresan, sino que también recomiendan tu negocio, creando un ciclo 
              de crecimiento sostenible y orgánico que se acelera con cada rotación.
            </p>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};
