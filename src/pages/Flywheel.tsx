import { useState } from "react";
import { Friccion } from "@/types/friccion";
import FlywheelFriccionesForm from "@/components/FlywheelFriccionesForm";
import FriccionesList from "@/components/FriccionesList";

const Flywheel = () => {
  const [fricciones, setFricciones] = useState<Friccion[]>([]);

  const handleAddFriccion = (nuevaFriccion: Friccion) => {
    setFricciones((prev) => [...prev, nuevaFriccion]);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="max-w-2xl mx-auto px-4 py-8 sm:py-12">
        {/* Header */}
        <header className="text-center mb-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-foreground mb-3">
            Detección básica de fricciones del Flywheel
          </h1>
          <p className="text-muted-foreground text-sm sm:text-base max-w-lg mx-auto">
            Escribe los problemas que estás viendo en cada etapa del recorrido del cliente. 
            La herramienta te ayudará a analizarlos.
          </p>
        </header>

        {/* Form */}
        <section className="mb-8">
          <FlywheelFriccionesForm onAddFriccion={handleAddFriccion} />
        </section>

        {/* List */}
        <section>
          <FriccionesList fricciones={fricciones} />
        </section>
      </div>
    </div>
  );
};

export default Flywheel;
