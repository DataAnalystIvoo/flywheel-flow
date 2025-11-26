import { motion } from "framer-motion";
import { TrendingUp, Users, Heart } from "lucide-react";

interface FlywheelStage {
  name: string;
  value: number;
  color: string;
  icon: React.ReactNode;
}

interface FlywheelVisualizationProps {
  attract: number;
  engage: number;
  delight: number;
}

export const FlywheelVisualization = ({ attract, engage, delight }: FlywheelVisualizationProps) => {
  const stages: FlywheelStage[] = [
    { name: "Attract", value: attract, color: "hsl(210 100% 50%)", icon: <TrendingUp className="w-6 h-6" /> },
    { name: "Engage", value: engage, color: "hsl(38 92% 50%)", icon: <Users className="w-6 h-6" /> },
    { name: "Delight", value: delight, color: "hsl(142 76% 45%)", icon: <Heart className="w-6 h-6" /> },
  ];

  const total = attract + engage + delight;
  const getPercentage = (value: number) => total > 0 ? (value / total) * 100 : 0;

  return (
    <div className="w-full max-w-4xl mx-auto space-y-8">
      {/* Wheel section */}
      <div className="flex justify-center">
        <div className="relative w-80 h-80">
          {/* Central circle */}
          <motion.div
            initial={{ scale: 0, rotate: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ duration: 1.5, ease: "easeOut" }}
            className="absolute inset-0 m-auto w-32 h-32 rounded-full bg-gradient-to-br from-primary to-accent flex items-center justify-center shadow-strong"
          >
            <div className="text-center">
              <div className="text-2xl font-bold text-primary-foreground">{total}</div>
              <div className="text-xs text-primary-foreground/80">Total</div>
            </div>
          </motion.div>

          {/* Rotating arrows */}
          <motion.svg
            className="absolute inset-0 w-full h-full pointer-events-none"
            initial={{ rotate: 0 }}
            animate={{ rotate: 360 }}
            transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          >
            {[0, 120, 240].map((angle, i) => (
              <motion.path
                key={i}
                d={`M ${160 + Math.cos(((angle - 90) * Math.PI) / 180) * 80} ${160 + Math.sin(((angle - 90) * Math.PI) / 180) * 80} 
                    A 80 80 0 0 1 ${160 + Math.cos(((angle + 30) * Math.PI) / 180) * 80} ${160 + Math.sin(((angle + 30) * Math.PI) / 180) * 80}`}
                stroke="hsl(var(--primary))"
                strokeWidth="2"
                fill="none"
                strokeOpacity="0.3"
                markerEnd="url(#arrowhead)"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ delay: 1 + i * 0.2, duration: 0.8 }}
              />
            ))}
            <defs>
              <marker
                id="arrowhead"
                markerWidth="10"
                markerHeight="10"
                refX="9"
                refY="3"
                orient="auto"
              >
                <polygon points="0 0, 10 3, 0 6" fill="hsl(var(--primary))" fillOpacity="0.3" />
              </marker>
            </defs>
          </motion.svg>
        </div>
      </div>

      {/* Stage cards in a row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 px-4">
        {stages.map((stage, index) => (
          <motion.div
            key={stage.name}
            initial={{ scale: 0, opacity: 0, y: 20 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
          >
            <div
              className="bg-card border-2 rounded-xl p-6 shadow-medium hover:shadow-strong transition-all hover-scale"
              style={{ borderColor: stage.color }}
            >
              <div className="flex flex-col items-center gap-3">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-white"
                  style={{ backgroundColor: stage.color }}
                >
                  {stage.icon}
                </div>
                <div className="text-lg font-semibold text-card-foreground">{stage.name}</div>
                <div className="text-3xl font-bold" style={{ color: stage.color }}>
                  {stage.value}
                </div>
                <div className="text-sm text-muted-foreground">
                  {getPercentage(stage.value).toFixed(1)}%
                </div>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
};
