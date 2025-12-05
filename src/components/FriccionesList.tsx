import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle } from "lucide-react";
import { Friccion, ETAPAS_FLYWHEEL } from "@/types/friccion";

interface FriccionesListProps {
  fricciones: Friccion[];
}

const getEtapaColor = (etapa: Friccion["etapa"]) => {
  const colors: Record<Friccion["etapa"], string> = {
    adquisicion: "bg-blue-500/10 text-blue-600 border-blue-500/20",
    activacion: "bg-amber-500/10 text-amber-600 border-amber-500/20",
    adopcion: "bg-purple-500/10 text-purple-600 border-purple-500/20",
    retencion: "bg-green-500/10 text-green-600 border-green-500/20",
    referidos: "bg-pink-500/10 text-pink-600 border-pink-500/20",
  };
  return colors[etapa];
};

const getEtapaLabel = (etapa: Friccion["etapa"]) => {
  return ETAPAS_FLYWHEEL.find((e) => e.value === etapa)?.label || etapa;
};

const FriccionesList = ({ fricciones }: FriccionesListProps) => {
  if (fricciones.length === 0) {
    return (
      <div className="text-center py-12 px-4">
        <AlertCircle className="w-12 h-12 text-muted-foreground/50 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-muted-foreground mb-2">
          No hay fricciones registradas
        </h3>
        <p className="text-sm text-muted-foreground/70">
          Usa el formulario de arriba para agregar los problemas que detectas en tu embudo.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <h3 className="text-sm font-medium text-muted-foreground">
        {fricciones.length} fricción{fricciones.length !== 1 ? "es" : ""} detectada{fricciones.length !== 1 ? "s" : ""}
      </h3>
      <div className="space-y-3">
        {fricciones.map((friccion) => (
          <Card key={friccion.id} className="border-border/50 hover:border-border transition-colors">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Badge 
                  variant="outline" 
                  className={`${getEtapaColor(friccion.etapa)} shrink-0 mt-0.5`}
                >
                  {getEtapaLabel(friccion.etapa)}
                </Badge>
                <p className="text-sm text-foreground/90 leading-relaxed">
                  {friccion.descripcion}
                </p>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FriccionesList;
