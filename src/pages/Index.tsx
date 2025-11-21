import { useState } from "react";
import { DateRange } from "react-day-picker";
import { TrendingUp, Users, Heart } from "lucide-react";
import { DateRangeSelector } from "@/components/DateRangeSelector";
import { FlywheelVisualization } from "@/components/FlywheelVisualization";
import { MetricInput } from "@/components/MetricInput";
import { FrictionAnalysis } from "@/components/FrictionAnalysis";
import { ConversionChart } from "@/components/ConversionChart";

const Index = () => {
  const [dateRange, setDateRange] = useState<DateRange | undefined>();
  const [attract, setAttract] = useState(0);
  const [engage, setEngage] = useState(0);
  const [delight, setDelight] = useState(0);

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-6 py-6">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Análisis de Fricción del Flywheel
          </h1>
          <p className="text-muted-foreground mt-2">
            Identifica y optimiza los puntos críticos de tu embudo de marketing
          </p>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8 space-y-8">
        {/* Date Range Selector */}
        <div className="max-w-md">
          <DateRangeSelector dateRange={dateRange} onDateRangeChange={setDateRange} />
        </div>

        {/* Main Grid */}
        <div className="grid lg:grid-cols-2 gap-8">
          {/* Left Column - Inputs */}
          <div className="space-y-6">
            <div>
              <h2 className="text-2xl font-semibold mb-6">Métricas del Flywheel</h2>
              <div className="space-y-4">
                <MetricInput
                  label="Attract"
                  value={attract}
                  onChange={setAttract}
                  icon={<TrendingUp className="w-6 h-6" />}
                  color="hsl(210 100% 50%)"
                  description="Número de visitantes o leads generados"
                />
                <MetricInput
                  label="Engage"
                  value={engage}
                  onChange={setEngage}
                  icon={<Users className="w-6 h-6" />}
                  color="hsl(38 92% 50%)"
                  description="Clientes que interactúan activamente"
                />
                <MetricInput
                  label="Delight"
                  value={delight}
                  onChange={setDelight}
                  icon={<Heart className="w-6 h-6" />}
                  color="hsl(142 76% 45%)"
                  description="Clientes satisfechos y promotores"
                />
              </div>
            </div>

            <ConversionChart attract={attract} engage={engage} delight={delight} />
          </div>

          {/* Right Column - Visualization */}
          <div className="space-y-8">
            <div>
              <h2 className="text-2xl font-semibold mb-6 text-center">Visualización del Flywheel</h2>
              <FlywheelVisualization attract={attract} engage={engage} delight={delight} />
            </div>

            <FrictionAnalysis attract={attract} engage={engage} delight={delight} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;
