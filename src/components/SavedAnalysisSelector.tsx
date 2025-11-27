import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Database } from "@/integrations/supabase/types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card } from "@/components/ui/card";
import { Calendar } from "lucide-react";
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
        <Card className="p-4 bg-muted/50">
          <div className="flex items-center gap-2 text-sm text-muted-foreground mb-2">
            <Calendar className="w-4 h-4" />
            <span>
              {format(new Date(selectedAnalysis.period_start), "dd MMM yyyy", { locale: es })} -{" "}
              {format(new Date(selectedAnalysis.period_end), "dd MMM yyyy", { locale: es })}
            </span>
          </div>
          <div className="grid grid-cols-3 gap-3 text-sm">
            <div>
              <span className="text-muted-foreground">Attract:</span>
              <span className="font-semibold ml-2">{selectedAnalysis.attract.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Engage:</span>
              <span className="font-semibold ml-2">{selectedAnalysis.engage.toLocaleString()}</span>
            </div>
            <div>
              <span className="text-muted-foreground">Delight:</span>
              <span className="font-semibold ml-2">{selectedAnalysis.delight.toLocaleString()}</span>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
};
