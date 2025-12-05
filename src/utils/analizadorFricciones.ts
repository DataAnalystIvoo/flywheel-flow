import { Friccion } from "@/types/friccion";

interface ReglaHeuristica {
  palabrasClave: string[];
  tipo: string;
  prioridad: "alta" | "media" | "baja";
  sugerencias: string[];
}

const REGLAS: ReglaHeuristica[] = [
  {
    palabrasClave: ["visitas", "tráfico", "poca conversión", "no dejan sus datos", "no se registran", "llegan pero", "no convierten"],
    tipo: "baja_conversion",
    prioridad: "alta",
    sugerencias: [
      "Reduce la cantidad de campos en tu formulario.",
      "Agrega un mensaje más claro o un mejor llamado a la acción.",
      "Incluye prueba social o testimonios."
    ]
  },
  {
    palabrasClave: ["registran", "no avanzan", "no completan", "no siguen", "se quedan", "no terminan"],
    tipo: "activacion_baja",
    prioridad: "alta",
    sugerencias: [
      "Simplifica los primeros pasos del onboarding.",
      "Explica mejor qué debe hacer el usuario después de registrarse.",
      "Agrega un tutorial o guía rápida."
    ]
  },
  {
    palabrasClave: ["no vuelven", "abandonan", "dejan de usar", "solo una vez", "no regresan", "se van"],
    tipo: "retencion_baja",
    prioridad: "media",
    sugerencias: [
      "Envía recordatorios o emails de reactivación.",
      "Destaca características que generan valor continuo.",
      "Identifica qué beneficios faltan después del primer uso."
    ]
  },
  {
    palabrasClave: ["no recomiendan", "no comparten", "no hablan de nosotros", "sin referidos", "no invitan"],
    tipo: "poca_recomendacion",
    prioridad: "baja",
    sugerencias: [
      "Implementa un programa de referidos simple.",
      "Solicita reseñas después de un buen momento del cliente."
    ]
  }
];

const TIPOS_AMIGABLES: Record<string, string> = {
  baja_conversion: "Baja conversión",
  activacion_baja: "Activación baja",
  retencion_baja: "Retención baja",
  poca_recomendacion: "Poca recomendación",
  sin_clasificar: "Sin clasificar"
};

export function getTipoAmigable(tipo: string): string {
  return TIPOS_AMIGABLES[tipo] || tipo;
}

export function analizarFriccion(descripcion: string): Partial<Friccion> {
  const textoNormalizado = descripcion.toLowerCase();

  for (const regla of REGLAS) {
    const coincide = regla.palabrasClave.some(palabra => 
      textoNormalizado.includes(palabra.toLowerCase())
    );

    if (coincide) {
      return {
        tipo: regla.tipo,
        prioridad: regla.prioridad,
        sugerencias: regla.sugerencias
      };
    }
  }

  // Si no coincide ninguna regla
  return {
    tipo: "sin_clasificar",
    prioridad: "media",
    sugerencias: [
      "Proporciona más detalles para entender mejor la fricción."
    ]
  };
}
