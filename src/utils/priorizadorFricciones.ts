import { Friccion } from "@/types/friccion";

interface Priorizacion {
  impacto_estimado: "alto" | "medio" | "bajo";
  dificultad: "alta" | "media" | "baja";
  prioridad: "alta" | "media" | "baja";
}

const REGLAS_PRIORIZACION: Record<string, Priorizacion> = {
  baja_conversion: {
    impacto_estimado: "alto",
    dificultad: "baja",
    prioridad: "alta",
  },
  activacion_baja: {
    impacto_estimado: "alto",
    dificultad: "media",
    prioridad: "alta",
  },
  retencion_baja: {
    impacto_estimado: "medio",
    dificultad: "alta",
    prioridad: "media",
  },
  poca_recomendacion: {
    impacto_estimado: "bajo",
    dificultad: "media",
    prioridad: "baja",
  },
  sin_clasificar: {
    impacto_estimado: "bajo",
    dificultad: "alta",
    prioridad: "baja",
  },
};

export function priorizarFriccion(f: Friccion): Partial<Friccion> {
  const tipo = f.tipo || "sin_clasificar";
  const regla = REGLAS_PRIORIZACION[tipo] || REGLAS_PRIORIZACION.sin_clasificar;

  return {
    prioridad: regla.prioridad,
    metadata: {
      impacto_estimado: regla.impacto_estimado,
      dificultad: regla.dificultad,
    },
  };
}

export function getImpactoLabel(impacto?: string): string {
  const labels: Record<string, string> = {
    alto: "Impacto alto",
    medio: "Impacto medio",
    bajo: "Impacto bajo",
  };
  return labels[impacto || "bajo"] || "Impacto desconocido";
}

export function getDificultadLabel(dificultad?: string): string {
  const labels: Record<string, string> = {
    alta: "Dificultad alta",
    media: "Dificultad media",
    baja: "Dificultad baja",
  };
  return labels[dificultad || "media"] || "Dificultad desconocida";
}
