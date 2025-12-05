import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Plus } from "lucide-react";
import { Friccion, ETAPAS_FLYWHEEL } from "@/types/friccion";
import { analizarFriccion } from "@/utils/analizadorFricciones";

interface FlywheelFriccionesFormProps {
  onAddFriccion: (friccion: Friccion) => void;
}

const FlywheelFriccionesForm = ({ onAddFriccion }: FlywheelFriccionesFormProps) => {
  const [etapa, setEtapa] = useState<Friccion["etapa"] | "">("");
  const [descripcion, setDescripcion] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!etapa || !descripcion.trim()) return;

    const analisis = analizarFriccion(descripcion.trim());
    
    const nuevaFriccion: Friccion = {
      id: crypto.randomUUID(),
      etapa: etapa as Friccion["etapa"],
      descripcion: descripcion.trim(),
      ...analisis
    };

    onAddFriccion(nuevaFriccion);
    setEtapa("");
    setDescripcion("");
  };

  return (
    <Card className="border-border/50">
      <CardHeader>
        <CardTitle className="text-lg">Agregar una fricción</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-5">
          <div className="space-y-2">
            <label className="text-sm font-medium">Etapa del Flywheel</label>
            <Select value={etapa} onValueChange={(value) => setEtapa(value as Friccion["etapa"])}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Selecciona una etapa" />
              </SelectTrigger>
              <SelectContent>
                {ETAPAS_FLYWHEEL.map((etapaItem) => (
                  <SelectItem key={etapaItem.value} value={etapaItem.value}>
                    <span className="font-medium">{etapaItem.label}</span>
                    <span className="text-muted-foreground ml-2 text-xs">— {etapaItem.descripcion}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <p className="text-xs text-muted-foreground">
              Selecciona la etapa donde ocurre el problema.
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Descripción del problema</label>
            <Textarea
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              placeholder="¿Qué está pasando en esta etapa?"
              className="min-h-[100px] resize-none"
            />
            <p className="text-xs text-muted-foreground">
              Describe brevemente qué está pasando. Ejemplo: "Los usuarios llegan pero no dejan sus datos."
            </p>
          </div>

          <Button 
            type="submit" 
            disabled={!etapa || !descripcion.trim()}
            className="w-full"
          >
            <Plus className="w-4 h-4 mr-2" />
            Agregar fricción
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default FlywheelFriccionesForm;
