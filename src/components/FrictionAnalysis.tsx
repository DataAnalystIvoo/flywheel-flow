import { Card } from "@/components/ui/card";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertTriangle, CheckCircle, TrendingDown } from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface FrictionAnalysisProps {
  attract: number;
  engage: number;
  delight: number;
}

interface FrictionPoint {
  stage: string;
  dropRate: number;
  severity: "low" | "medium" | "high";
  recommendation: string;
}

export const FrictionAnalysis = ({ attract, engage, delight }: FrictionAnalysisProps) => {
  const calculateFrictionPoints = (): FrictionPoint[] => {
    const points: FrictionPoint[] = [];

    // Calculate drop rates
    const attractToEngageRate = attract > 0 ? ((attract - engage) / attract) * 100 : 0;
    const engageToDelightRate = engage > 0 ? ((engage - delight) / engage) * 100 : 0;

    if (attractToEngageRate > 70) {
      points.push({
        stage: "Attract → Engage",
        dropRate: attractToEngageRate,
        severity: "high",
        recommendation: "Pérdida crítica entre atracción y engagement. Revisa la calidad de leads y el onboarding inicial."
      });
    } else if (attractToEngageRate > 40) {
      points.push({
        stage: "Attract → Engage",
        dropRate: attractToEngageRate,
        severity: "medium",
        recommendation: "Fricción moderada en la conversión inicial. Optimiza el proceso de registro y primeros pasos."
      });
    } else if (attractToEngageRate > 20) {
      points.push({
        stage: "Attract → Engage",
        dropRate: attractToEngageRate,
        severity: "low",
        recommendation: "Fricción menor detectada. Continúa monitoreando y haciendo ajustes incrementales."
      });
    }

    if (engageToDelightRate > 70) {
      points.push({
        stage: "Engage → Delight",
        dropRate: engageToDelightRate,
        severity: "high",
        recommendation: "Pérdida crítica entre engagement y satisfacción. Mejora el producto, soporte y experiencia post-venta."
      });
    } else if (engageToDelightRate > 40) {
      points.push({
        stage: "Engage → Delight",
        dropRate: engageToDelightRate,
        severity: "medium",
        recommendation: "Fricción moderada en satisfacción. Implementa programas de feedback y mejora continua."
      });
    } else if (engageToDelightRate > 20) {
      points.push({
        stage: "Engage → Delight",
        dropRate: engageToDelightRate,
        severity: "low",
        recommendation: "Fricción menor en satisfacción. Mantén el enfoque en la experiencia del cliente."
      });
    }

    // Overall health check
    const overallConversion = attract > 0 ? (delight / attract) * 100 : 0;
    if (overallConversion > 60) {
      points.push({
        stage: "General",
        dropRate: 100 - overallConversion,
        severity: "low",
        recommendation: "¡Excelente! Tu flywheel está funcionando bien. Continúa optimizando."
      });
    }

    return points;
  };

  const frictionPoints = calculateFrictionPoints();
  const overallConversion = attract > 0 ? (delight / attract) * 100 : 0;

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case "high":
        return <AlertTriangle className="h-5 w-5" />;
      case "medium":
        return <TrendingDown className="h-5 w-5" />;
      case "low":
        return <CheckCircle className="h-5 w-5" />;
      default:
        return null;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-danger/10 border-danger text-danger-foreground";
      case "medium":
        return "bg-warning/10 border-warning text-warning-foreground";
      case "low":
        return "bg-success/10 border-success text-success-foreground";
      default:
        return "";
    }
  };

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h3 className="text-lg font-semibold mb-4">Conversión General</h3>
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">De Attract a Delight</span>
            <span className="font-semibold">{overallConversion.toFixed(1)}%</span>
          </div>
          <Progress value={overallConversion} className="h-3" />
        </div>
      </Card>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold">Puntos de Fricción Identificados</h3>
        {frictionPoints.length > 0 ? (
          frictionPoints.map((point, index) => (
            <Alert key={index} className={getSeverityColor(point.severity)}>
              <div className="flex items-start gap-3">
                {getSeverityIcon(point.severity)}
                <div className="flex-1">
                  <AlertTitle className="mb-2">
                    {point.stage} - {point.dropRate.toFixed(1)}% de pérdida
                  </AlertTitle>
                  <AlertDescription>{point.recommendation}</AlertDescription>
                </div>
              </div>
            </Alert>
          ))
        ) : (
          <Alert className="bg-muted border-border">
            <CheckCircle className="h-5 w-5" />
            <AlertTitle>Sin datos suficientes</AlertTitle>
            <AlertDescription>
              Ingresa las métricas para cada etapa del flywheel para ver el análisis de fricción.
            </AlertDescription>
          </Alert>
        )}
      </div>
    </div>
  );
};
