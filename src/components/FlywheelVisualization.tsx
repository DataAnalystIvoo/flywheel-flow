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
    <div className="relative w-full aspect-square max-w-md mx-auto">
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

      {/* Flywheel stages */}
      {stages.map((stage, index) => {
        const angle = (index * 120) - 90; // Start from top
        const radius = 180;
        const x = Math.cos((angle * Math.PI) / 180) * radius;
        const y = Math.sin((angle * Math.PI) / 180) * radius;

        return (
          <motion.div
            key={stage.name}
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3 + index * 0.2, duration: 0.6 }}
            className="absolute top-1/2 left-1/2"
            style={{
              transform: `translate(calc(-50% + ${x}px), calc(-50% + ${y}px))`,
            }}
          >
            <div className="relative">
              {/* Connection line to center */}
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ delay: 0.5 + index * 0.2, duration: 0.4 }}
                className="absolute top-1/2 left-1/2 w-32 h-1 origin-left"
                style={{
                  transform: `translate(-100%, -50%) rotate(${angle + 180}deg)`,
                  background: `linear-gradient(to right, ${stage.color}80, transparent)`,
                }}
              />
              
              {/* Stage card */}
              <div
                className="bg-card border-2 rounded-xl p-4 w-32 shadow-medium hover:shadow-strong transition-shadow"
                style={{ borderColor: stage.color }}
              >
                <div className="flex flex-col items-center gap-2">
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center text-white"
                    style={{ backgroundColor: stage.color }}
                  >
                    {stage.icon}
                  </div>
                  <div className="text-sm font-semibold text-card-foreground">{stage.name}</div>
                  <div className="text-2xl font-bold" style={{ color: stage.color }}>
                    {stage.value}
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {getPercentage(stage.value).toFixed(1)}%
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        );
      })}

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
            d={`M ${200 + Math.cos(((angle - 90) * Math.PI) / 180) * 100} ${200 + Math.sin(((angle - 90) * Math.PI) / 180) * 100} 
                A 100 100 0 0 1 ${200 + Math.cos(((angle + 30) * Math.PI) / 180) * 100} ${200 + Math.sin(((angle + 30) * Math.PI) / 180) * 100}`}
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
  );
};
