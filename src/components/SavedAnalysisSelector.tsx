import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Calendar, Magnet, MessageCircle, Heart } from "lucide-react";
import { format } from "date-fns";
import { es } from "date-fns/locale";

type FlywheelAnalysis = Database["public"]["Tables"]["flywheel_analyses"]["Row"];

interface SavedAnalysisSelectorProps {
  onSelect: (analysis: FlywheelAnalysis | null) => void;
  selectedId?: string;
  label?: string;
}

export const SavedAnalysisSelector = ({ onSelect, selectedId, label = "Seleccionar campaña" }: SavedAnalysisSelectorProps) => {
  const [analyses, setAnalyses] = useState<FlywheelAnalysis[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalyses = async () => {
      const { data, error } = await supabase
        .from("flywheel_analyses")
        .select("*")
        .order("created_at", { ascending: false });

      if (!error && data) {
        setAnalyses(data);
      }
      setLoading(false);
    };

    fetchAnalyses();
  }, []);

  const handleSelect = (id: string) => {
    if (id === "none") {
      onSelect(null);
    } else {
      const selected = analyses.find((a) => a.id === id);
      if (selected) {
        onSelect(selected);
      }
    }
  };

  const selectedAnalysis = analyses.find((a) => a.id === selectedId);

  return (
    <div className="space-y-3">
      <label className="text-sm font-medium">{label}</label>
      <Select value={selectedId || "none"} onValueChange={handleSelect} disabled={loading}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder={loading ? "Cargando..." : "Selecciona una campaña guardada"} />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="none">Sin selección</SelectItem>
          {analyses.map((analysis) => (
            <SelectItem key={analysis.id} value={analysis.id}>
              {analysis.period_label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {selectedAnalysis && (
        <Card className="p-5 bg-gradient-to-br from-card to-muted/30 border-border/50 shadow-sm">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-4 pb-3 border-b border-border/50">
            <Calendar className="w-4 h-4 text-primary" />
            <span className="font-medium">
              {format(new Date(selectedAnalysis.period_start), "dd MMM yyyy", { locale: es })} -{" "}
              {format(new Date(selectedAnalysis.period_end), "dd MMM yyyy", { locale: es })}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div className="flex flex-col items-center p-3 rounded-lg bg-[hsl(210_100%_50%/0.1)] border border-[hsl(210_100%_50%/0.2)]">
              <Magnet className="w-5 h-5 text-[hsl(210,100%,50%)] mb-1" />
              <span className="text-xs text-muted-foreground mb-1">Attract</span>
              <span className="text-lg font-bold text-[hsl(210,100%,50%)]">{selectedAnalysis.attract.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-[hsl(38_92%_50%/0.1)] border border-[hsl(38_92%_50%/0.2)]">
              <MessageCircle className="w-5 h-5 text-[hsl(38,92%,50%)] mb-1" />
              <span className="text-xs text-muted-foreground mb-1">Engage</span>
              <span className="text-lg font-bold text-[hsl(38,92%,50%)]">{selectedAnalysis.engage.toLocaleString()}</span>
            </div>
            <div className="flex flex-col items-center p-3 rounded-lg bg-[hsl(142_76%_45%/0.1)] border border-[hsl(142_76%_45%/0.2)]">
              <Heart className="w-5 h-5 text-[hsl(142,76%,45%)] mb-1" />
              <span className="text-xs text-muted-foreground mb-1">Delight</span>
              <span className="text-lg font-bold text-[hsl(142,76%,45%)]">{selectedAnalysis.delight.toLocaleString()}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
