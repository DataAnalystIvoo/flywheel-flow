import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, TrendingUp, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type FlywheelAnalysis = Database["public"]["Tables"]["flywheel_analyses"]["Row"];

interface SavedAnalysesProps {
  onLoadAnalysis: (analysis: FlywheelAnalysis) => void;
  refreshTrigger?: number;
}

export const SavedAnalyses = ({ onLoadAnalysis, refreshTrigger }: SavedAnalysesProps) => {
  const [analyses, setAnalyses] = useState<FlywheelAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchAnalyses = async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("flywheel_analyses")
      .select("*")
      .order("created_at", { ascending: false });

    if (error) {
      toast.error("Error al cargar análisis guardados");
      console.error(error);
    } else {
      setAnalyses(data || []);
    }
    setLoading(false);
  };

  useEffect(() => {
    fetchAnalyses();
  }, [refreshTrigger]);

  const handleDelete = async (id: string) => {
    const { error } = await supabase
      .from("flywheel_analyses")
      .delete()
      .eq("id", id);

    if (error) {
      toast.error("Error al eliminar análisis");
      console.error(error);
    } else {
      toast.success("Análisis eliminado");
      fetchAnalyses();
    }
  };

  if (loading) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">Cargando análisis guardados...</p>
      </Card>
    );
  }

  if (analyses.length === 0) {
    return (
      <Card className="p-6">
        <p className="text-muted-foreground text-center">
          No hay análisis guardados. Guarda tu primer análisis para verlo aquí.
        </p>
      </Card>
    );
  }

  return (
    <Card className="p-6">
      <h3 className="text-xl font-semibold mb-4">Análisis Guardados</h3>
      <ScrollArea className="h-[400px] pr-4">
        <div className="space-y-3">
          {analyses.map((analysis) => (
            <Card key={analysis.id} className="p-4 hover:bg-accent/50 transition-colors">
              <div className="flex items-start justify-between gap-4">
                <div className="flex-1">
                  <h4 className="font-semibold text-lg mb-2">{analysis.period_label}</h4>
                  <div className="flex items-center gap-2 text-sm text-muted-foreground mb-3">
                    <Calendar className="w-4 h-4" />
                    <span>
                      {format(new Date(analysis.period_start), "dd MMM yyyy", { locale: es })} -{" "}
                      {format(new Date(analysis.period_end), "dd MMM yyyy", { locale: es })}
                    </span>
                  </div>
                  <div className="grid grid-cols-3 gap-3 text-sm">
                    <div>
                      <span className="text-muted-foreground">Attract:</span>
                      <span className="font-semibold ml-2">{analysis.attract.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Engage:</span>
                      <span className="font-semibold ml-2">{analysis.engage.toLocaleString()}</span>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Delight:</span>
                      <span className="font-semibold ml-2">{analysis.delight.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => onLoadAnalysis(analysis)}
                  >
                    <TrendingUp className="w-4 h-4 mr-1" />
                    Cargar
                  </Button>
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => handleDelete(analysis.id)}
                  >
                    <Trash2 className="w-4 h-4 text-destructive" />
                  </Button>
                </div>
              </div>
            </Card>
          ))}
        </div>
      </ScrollArea>
    </Card>
  );
};
