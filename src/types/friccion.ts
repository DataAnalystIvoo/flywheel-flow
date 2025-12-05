export interface Friccion {
  id: string;
  etapa: "adquisicion" | "activacion" | "adopcion" | "retencion" | "referidos";
  descripcion: string;
  tipo?: string;
  prioridad?: "alta" | "media" | "baja";
  sugerencias?: string[];
  metadata?: {
    impacto_estimado?: string;
    dificultad?: string;
  };
}

export const ETAPAS_FLYWHEEL = [
  { value: "adquisicion", label: "Adquisición", descripcion: "Cómo atraes nuevos clientes" },
  { value: "activacion", label: "Activación", descripcion: "Primera experiencia del cliente" },
  { value: "adopcion", label: "Adopción", descripcion: "El cliente empieza a usar tu producto" },
  { value: "retencion", label: "Retención", descripcion: "El cliente sigue usando tu producto" },
  { value: "referidos", label: "Referidos", descripcion: "El cliente recomienda tu producto" },
] as const;
