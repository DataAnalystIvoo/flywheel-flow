import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertCircle, Lightbulb, Tag, AlertTriangle, TrendingUp, Wrench } from "lucide-react";
import { Friccion, ETAPAS_FLYWHEEL } from "@/types/friccion";
import { getTipoAmigable } from "@/utils/analizadorFricciones";
import { getImpactoLabel, getDificultadLabel } from "@/utils/priorizadorFricciones";

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

const getPrioridadColor = (prioridad?: Friccion["prioridad"]) => {
  const colors: Record<string, string> = {
    alta: "bg-red-500/10 text-red-600 border-red-500/20",
    media: "bg-yellow-500/10 text-yellow-600 border-yellow-500/20",
    baja: "bg-green-500/10 text-green-600 border-green-500/20",
  };
  return colors[prioridad || "media"];
};

const getImpactoColor = (impacto?: string) => {
  const colors: Record<string, string> = {
    alto: "text-green-600",
    medio: "text-yellow-600",
    bajo: "text-muted-foreground",
  };
  return colors[impacto || "bajo"];
};

const getDificultadColor = (dificultad?: string) => {
  const colors: Record<string, string> = {
    baja: "text-green-600",
    media: "text-yellow-600",
    alta: "text-red-600",
  };
  return colors[dificultad || "media"];
};

const getPrioridadLabel = (prioridad?: Friccion["prioridad"]) => {
  const labels: Record<string, string> = {
    alta: "Alta",
    media: "Media",
    baja: "Baja",
  };
  return labels[prioridad || "media"];
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
    <div className="space-y-4">
      <div className="space-y-1">
        <h3 className="text-sm font-medium text-muted-foreground">
          {fricciones.length} fricción{fricciones.length !== 1 ? "es" : ""} detectada{fricciones.length !== 1 ? "s" : ""}
        </h3>
        <p className="text-xs text-muted-foreground/70">
          La herramienta organiza automáticamente las fricciones según el impacto que tendrían en tu negocio y la dificultad de resolverlas.
        </p>
      </div>
      
      <div className="space-y-4">
        {fricciones.map((friccion) => (
          <Card key={friccion.id} className="border-border/50 hover:border-border transition-colors overflow-hidden">
            <CardContent className="p-4 space-y-4">
              {/* Header con etapa y descripción */}
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

              {/* Tipo detectado */}
              {friccion.tipo && (
                <div className="flex items-center gap-1.5 text-xs text-muted-foreground bg-muted/50 px-2 py-1 rounded-md w-fit">
                  <Tag className="w-3 h-3" />
                  <span>{getTipoAmigable(friccion.tipo)}</span>
                </div>
              )}

              {/* Barra de priorización */}
              <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground mb-2">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Priorización automática</span>
                </div>
                <div className="flex flex-wrap items-center gap-3 text-xs">
                  <div className="flex items-center gap-1.5">
                    <TrendingUp className={`w-3.5 h-3.5 ${getImpactoColor(friccion.metadata?.impacto_estimado)}`} />
                    <span className={getImpactoColor(friccion.metadata?.impacto_estimado)}>
                      {getImpactoLabel(friccion.metadata?.impacto_estimado)}
                    </span>
                  </div>
                  <span className="text-muted-foreground/40">•</span>
                  <div className="flex items-center gap-1.5">
                    <Wrench className={`w-3.5 h-3.5 ${getDificultadColor(friccion.metadata?.dificultad)}`} />
                    <span className={getDificultadColor(friccion.metadata?.dificultad)}>
                      {getDificultadLabel(friccion.metadata?.dificultad)}
                    </span>
                  </div>
                  <span className="text-muted-foreground/40">•</span>
                  <Badge variant="outline" className={`${getPrioridadColor(friccion.prioridad)} text-xs`}>
                    Prioridad {getPrioridadLabel(friccion.prioridad)}
                  </Badge>
                </div>
              </div>

              {/* Sugerencias */}
              {friccion.sugerencias && friccion.sugerencias.length > 0 && (
                <div className="bg-muted/30 rounded-lg p-3 space-y-2">
                  <div className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground">
                    <Lightbulb className="w-3.5 h-3.5" />
                    <span>Sugerencias para mejorar</span>
                  </div>
                  <ul className="space-y-1.5">
                    {friccion.sugerencias.map((sugerencia, index) => (
                      <li key={index} className="text-xs text-foreground/80 pl-5 relative before:content-['•'] before:absolute before:left-1.5 before:text-muted-foreground">
                        {sugerencia}
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default FriccionesList;
