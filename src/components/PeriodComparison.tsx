import { Card } from "@/components/ui/card";
import { TrendingUp, TrendingDown, Minus } from "lucide-react";
import { motion } from "framer-motion";

interface PeriodComparisonProps {
  currentAttract: number;
  currentEngage: number;
  currentDelight: number;
  previousAttract: number;
  previousEngage: number;
  previousDelight: number;
}

interface MetricComparison {
  name: string;
  current: number;
  previous: number;
  change: number;
  changePercent: number;
  color: string;
}

export const PeriodComparison = ({
  currentAttract,
  currentEngage,
  currentDelight,
  previousAttract,
  previousEngage,
  previousDelight,
}: PeriodComparisonProps) => {
  const calculateChange = (current: number, previous: number) => {
    if (previous === 0) return { change: current, changePercent: current > 0 ? 100 : 0 };
    const change = current - previous;
    const changePercent = (change / previous) * 100;
    return { change, changePercent };
  };

  const metrics: MetricComparison[] = [
    {
      name: "Attract",
      current: currentAttract,
      previous: previousAttract,
      ...calculateChange(currentAttract, previousAttract),
      color: "hsl(210 100% 50%)",
    },
    {
      name: "Engage",
      current: currentEngage,
      previous: previousEngage,
      ...calculateChange(currentEngage, previousEngage),
      color: "hsl(38 92% 50%)",
    },
    {
      name: "Delight",
      current: currentDelight,
      previous: previousDelight,
      ...calculateChange(currentDelight, previousDelight),
      color: "hsl(142 76% 45%)",
    },
  ];

  const getTrendIcon = (change: number) => {
    if (change > 0) return <TrendingUp className="w-5 h-5 text-success" />;
    if (change < 0) return <TrendingDown className="w-5 h-5 text-danger" />;
    return <Minus className="w-5 h-5 text-muted-foreground" />;
  };

  const getTrendColor = (change: number) => {
    if (change > 0) return "text-success";
    if (change < 0) return "text-danger";
    return "text-muted-foreground";
  };

  return (
    <div className="space-y-4">
      <h3 className="text-xl font-semibold">Comparación de Períodos</h3>
      <div className="grid gap-4">
        {metrics.map((metric, index) => (
          <motion.div
            key={metric.name}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <Card className="p-6 hover:shadow-medium transition-shadow">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div
                    className="w-12 h-12 rounded-lg flex items-center justify-center text-white"
                    style={{ backgroundColor: metric.color }}
                  >
                    <span className="text-lg font-bold">
                      {metric.name.charAt(0)}
                    </span>
                  </div>
                  <div>
                    <h4 className="font-semibold text-lg">{metric.name}</h4>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                      <span>Anterior: {metric.previous}</span>
                      <span>→</span>
                      <span>Actual: {metric.current}</span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  {getTrendIcon(metric.change)}
                  <div className="text-right">
                    <div className={`text-2xl font-bold ${getTrendColor(metric.change)}`}>
                      {metric.change > 0 ? "+" : ""}
                      {metric.change}
                    </div>
                    <div className={`text-sm ${getTrendColor(metric.change)}`}>
                      {metric.changePercent > 0 ? "+" : ""}
                      {metric.changePercent.toFixed(1)}%
                    </div>
                  </div>
                </div>
              </div>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Overall Summary */}
      <Card className="p-6 bg-gradient-to-br from-primary/5 to-accent/5 border-primary/20">
        <h4 className="font-semibold mb-4">Resumen General</h4>
        <div className="grid grid-cols-2 gap-4">
          <div>
            <div className="text-sm text-muted-foreground mb-1">Conversión Anterior</div>
            <div className="text-2xl font-bold">
              {previousAttract > 0
                ? ((previousDelight / previousAttract) * 100).toFixed(1)
                : "0.0"}
              %
            </div>
          </div>
          <div>
            <div className="text-sm text-muted-foreground mb-1">Conversión Actual</div>
            <div className="text-2xl font-bold">
              {currentAttract > 0
                ? ((currentDelight / currentAttract) * 100).toFixed(1)
                : "0.0"}
              %
            </div>
          </div>
        </div>
      </Card>
    </div>
  );
};
