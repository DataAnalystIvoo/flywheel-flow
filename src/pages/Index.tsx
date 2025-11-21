import { useState } from "react";
import { DateRange } from "react-day-picker";
import { TrendingUp, Users, Heart } from "lucide-react";
import { DateRangeSelector } from "@/components/DateRangeSelector";
import { FlywheelVisualization } from "@/components/FlywheelVisualization";
import { MetricInput } from "@/components/MetricInput";
import { FrictionAnalysis } from "@/components/FrictionAnalysis";
import { ConversionChart } from "@/components/ConversionChart";
import { PeriodComparison } from "@/components/PeriodComparison";
import { ComparisonChart } from "@/components/ComparisonChart";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Index = () => {
  // Current period
  const [currentDateRange, setCurrentDateRange] = useState<DateRange | undefined>();
  const [currentAttract, setCurrentAttract] = useState(0);
  const [currentEngage, setCurrentEngage] = useState(0);
  const [currentDelight, setCurrentDelight] = useState(0);

  // Previous period for comparison
  const [previousDateRange, setPreviousDateRange] = useState<DateRange | undefined>();
  const [previousAttract, setPreviousAttract] = useState(0);
  const [previousEngage, setPreviousEngage] = useState(0);
  const [previousDelight, setPreviousDelight] = useState(0);

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

      <div className="container mx-auto px-6 py-8">
        <Tabs defaultValue="current" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="current">Período Actual</TabsTrigger>
            <TabsTrigger value="comparison">Comparación</TabsTrigger>
          </TabsList>

          {/* Current Period Tab */}
          <TabsContent value="current" className="space-y-8">
            {/* Date Range Selector */}
            <div className="max-w-md">
              <label className="text-sm font-medium mb-2 block">Período Actual</label>
              <DateRangeSelector
                dateRange={currentDateRange}
                onDateRangeChange={setCurrentDateRange}
              />
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
                      value={currentAttract}
                      onChange={setCurrentAttract}
                      icon={<TrendingUp className="w-6 h-6" />}
                      color="hsl(210 100% 50%)"
                      description="Número de visitantes o leads generados"
                    />
                    <MetricInput
                      label="Engage"
                      value={currentEngage}
                      onChange={setCurrentEngage}
                      icon={<Users className="w-6 h-6" />}
                      color="hsl(38 92% 50%)"
                      description="Clientes que interactúan activamente"
                    />
                    <MetricInput
                      label="Delight"
                      value={currentDelight}
                      onChange={setCurrentDelight}
                      icon={<Heart className="w-6 h-6" />}
                      color="hsl(142 76% 45%)"
                      description="Clientes satisfechos y promotores"
                    />
                  </div>
                </div>

                <ConversionChart
                  attract={currentAttract}
                  engage={currentEngage}
                  delight={currentDelight}
                />
              </div>

              {/* Right Column - Visualization */}
              <div className="space-y-8">
                <div>
                  <h2 className="text-2xl font-semibold mb-6 text-center">
                    Visualización del Flywheel
                  </h2>
                  <FlywheelVisualization
                    attract={currentAttract}
                    engage={currentEngage}
                    delight={currentDelight}
                  />
                </div>

                <FrictionAnalysis
                  attract={currentAttract}
                  engage={currentEngage}
                  delight={currentDelight}
                />
              </div>
            </div>
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="space-y-8">
            {/* Date Range Selectors */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Período Anterior</label>
                <DateRangeSelector
                  dateRange={previousDateRange}
                  onDateRangeChange={setPreviousDateRange}
                />
              </div>
              <div>
                <label className="text-sm font-medium mb-2 block">Período Actual</label>
                <DateRangeSelector
                  dateRange={currentDateRange}
                  onDateRangeChange={setCurrentDateRange}
                />
              </div>
            </div>

            {/* Metrics Input Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Previous Period */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Período Anterior</h2>
                <div className="space-y-4">
                  <MetricInput
                    label="Attract Anterior"
                    value={previousAttract}
                    onChange={setPreviousAttract}
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="hsl(210 100% 50%)"
                    description="Visitantes del período anterior"
                  />
                  <MetricInput
                    label="Engage Anterior"
                    value={previousEngage}
                    onChange={setPreviousEngage}
                    icon={<Users className="w-6 h-6" />}
                    color="hsl(38 92% 50%)"
                    description="Engagement del período anterior"
                  />
                  <MetricInput
                    label="Delight Anterior"
                    value={previousDelight}
                    onChange={setPreviousDelight}
                    icon={<Heart className="w-6 h-6" />}
                    color="hsl(142 76% 45%)"
                    description="Satisfacción del período anterior"
                  />
                </div>
              </div>

              {/* Current Period */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Período Actual</h2>
                <div className="space-y-4">
                  <MetricInput
                    label="Attract Actual"
                    value={currentAttract}
                    onChange={setCurrentAttract}
                    icon={<TrendingUp className="w-6 h-6" />}
                    color="hsl(210 100% 50%)"
                    description="Visitantes del período actual"
                  />
                  <MetricInput
                    label="Engage Actual"
                    value={currentEngage}
                    onChange={setCurrentEngage}
                    icon={<Users className="w-6 h-6" />}
                    color="hsl(38 92% 50%)"
                    description="Engagement del período actual"
                  />
                  <MetricInput
                    label="Delight Actual"
                    value={currentDelight}
                    onChange={setCurrentDelight}
                    icon={<Heart className="w-6 h-6" />}
                    color="hsl(142 76% 45%)"
                    description="Satisfacción del período actual"
                  />
                </div>
              </div>
            </div>

            {/* Comparison Results */}
            <div className="grid lg:grid-cols-2 gap-8">
              <PeriodComparison
                currentAttract={currentAttract}
                currentEngage={currentEngage}
                currentDelight={currentDelight}
                previousAttract={previousAttract}
                previousEngage={previousEngage}
                previousDelight={previousDelight}
              />
              <ComparisonChart
                currentAttract={currentAttract}
                currentEngage={currentEngage}
                currentDelight={currentDelight}
                previousAttract={previousAttract}
                previousEngage={previousEngage}
                previousDelight={previousDelight}
              />
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Index;
