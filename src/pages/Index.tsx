import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { DateRange } from "react-day-picker";
import { TrendingUp, Users, Heart, Save, LogOut } from "lucide-react";
import { DateRangeSelector } from "@/components/DateRangeSelector";
import { FlywheelVisualization } from "@/components/FlywheelVisualization";
import { FlywheelExplanation } from "@/components/FlywheelExplanation";
import { MetricInput } from "@/components/MetricInput";
import { FrictionAnalysis } from "@/components/FrictionAnalysis";
import { ConversionChart } from "@/components/ConversionChart";
import { PeriodComparison } from "@/components/PeriodComparison";
import { ComparisonChart } from "@/components/ComparisonChart";
import { SavedAnalyses } from "@/components/SavedAnalyses";
import { SavedAnalysisSelector } from "@/components/SavedAnalysisSelector";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { toast } from "sonner";
import { format } from "date-fns";
import type { User } from "@supabase/supabase-js";

type FlywheelAnalysis = Database["public"]["Tables"]["flywheel_analyses"]["Row"];

const Index = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  // Current period
  const [currentDateRange, setCurrentDateRange] = useState<DateRange | undefined>();
  const [currentAttract, setCurrentAttract] = useState(0);
  const [currentEngage, setCurrentEngage] = useState(0);
  const [currentDelight, setCurrentDelight] = useState(0);
  const [currentLabel, setCurrentLabel] = useState("");

  // Previous period for comparison (from saved analysis)
  const [selectedPreviousAnalysisId, setSelectedPreviousAnalysisId] = useState<string | undefined>();
  const [previousAttract, setPreviousAttract] = useState(0);
  const [previousEngage, setPreviousEngage] = useState(0);
  const [previousDelight, setPreviousDelight] = useState(0);

  // Trigger for refreshing saved analyses
  const [refreshAnalyses, setRefreshAnalyses] = useState(0);

  useEffect(() => {
    // Set up auth state listener
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (event, session) => {
        setUser(session?.user ?? null);
        setLoading(false);
      }
    );

    // Check for existing session
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

  useEffect(() => {
    if (!loading && !user) {
      navigate("/auth");
    }
  }, [user, loading, navigate]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Sesión cerrada");
    navigate("/auth");
  };

  const handleSaveAnalysis = async () => {
    if (!user) {
      toast.error("Debes iniciar sesión para guardar análisis");
      return;
    }
    if (!currentDateRange?.from || !currentDateRange?.to) {
      toast.error("Selecciona un rango de fechas");
      return;
    }

    if (!currentLabel.trim()) {
      toast.error("Ingresa un nombre para el análisis");
      return;
    }

    if (currentAttract === 0 && currentEngage === 0 && currentDelight === 0) {
      toast.error("Ingresa al menos una métrica");
      return;
    }

    const { error } = await supabase.from("flywheel_analyses").insert({
      period_label: currentLabel,
      period_start: format(currentDateRange.from, "yyyy-MM-dd"),
      period_end: format(currentDateRange.to, "yyyy-MM-dd"),
      attract: currentAttract,
      engage: currentEngage,
      delight: currentDelight,
      user_id: user.id,
    });

    if (error) {
      toast.error("Error al guardar análisis");
      console.error(error);
    } else {
      toast.success("Análisis guardado exitosamente");
      setCurrentLabel("");
      setRefreshAnalyses((prev) => prev + 1);
    }
  };

  const handleLoadAnalysis = (analysis: FlywheelAnalysis) => {
    setCurrentDateRange({
      from: new Date(analysis.period_start),
      to: new Date(analysis.period_end),
    });
    setCurrentAttract(analysis.attract);
    setCurrentEngage(analysis.engage);
    setCurrentDelight(analysis.delight);
    setCurrentLabel(analysis.period_label);
    toast.success(`Análisis "${analysis.period_label}" cargado`);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <p className="text-muted-foreground">Cargando...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="border-b border-border bg-card shadow-soft">
        <div className="container mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                Análisis de Fricción del Flywheel
              </h1>
              <p className="text-muted-foreground mt-2">
                Identifica y optimiza los puntos críticos de tu embudo de marketing
              </p>
            </div>
            <Button onClick={handleLogout} variant="outline" size="sm">
              <LogOut className="w-4 h-4 mr-2" />
              Cerrar Sesión
            </Button>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-6 py-8">
        {/* Flywheel Explanation */}
        <FlywheelExplanation />

        <Tabs defaultValue="current" className="space-y-8">
          <TabsList className="grid w-full max-w-md grid-cols-2">
            <TabsTrigger value="current">Período Actual</TabsTrigger>
            <TabsTrigger value="comparison">Comparación</TabsTrigger>
          </TabsList>

          {/* Current Period Tab */}
          <TabsContent value="current" className="space-y-8">
            {/* Date Range Selector and Save */}
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="text-sm font-medium mb-2 block">Período Actual</label>
                <DateRangeSelector
                  dateRange={currentDateRange}
                  onDateRangeChange={setCurrentDateRange}
                />
              </div>
              <div className="space-y-4">
                <div>
                  <label className="text-sm font-medium mb-2 block">Nombre del Análisis</label>
                  <Input
                    placeholder="ej: Q1 2024, Enero, Campaña Verano..."
                    value={currentLabel}
                    onChange={(e) => setCurrentLabel(e.target.value)}
                  />
                </div>
                <Button onClick={handleSaveAnalysis} className="w-full">
                  <Save className="w-4 h-4 mr-2" />
                  Guardar Análisis
                </Button>
              </div>
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

            {/* Saved Analyses */}
            <SavedAnalyses
              onLoadAnalysis={handleLoadAnalysis}
              refreshTrigger={refreshAnalyses}
            />
          </TabsContent>

          {/* Comparison Tab */}
          <TabsContent value="comparison" className="space-y-8">
            {/* Selection Grid */}
            <div className="grid lg:grid-cols-2 gap-8">
              {/* Previous Campaign Selector */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Campaña Anterior</h2>
                <SavedAnalysisSelector
                  label="Seleccionar campaña guardada"
                  selectedId={selectedPreviousAnalysisId}
                  onSelect={(analysis) => {
                    if (analysis) {
                      setSelectedPreviousAnalysisId(analysis.id);
                      setPreviousAttract(analysis.attract);
                      setPreviousEngage(analysis.engage);
                      setPreviousDelight(analysis.delight);
                    } else {
                      setSelectedPreviousAnalysisId(undefined);
                      setPreviousAttract(0);
                      setPreviousEngage(0);
                      setPreviousDelight(0);
                    }
                  }}
                />
              </div>

              {/* Current Campaign */}
              <div>
                <h2 className="text-2xl font-semibold mb-6">Campaña Actual</h2>
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
