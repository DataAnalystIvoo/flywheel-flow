import { Button } from "@/components/ui/button";
import { Download, Image, FileText } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import { toast } from "@/hooks/use-toast";

interface ExportComparisonProps {
  targetRef: React.RefObject<HTMLDivElement>;
  fileName?: string;
}

export const ExportComparison = ({ targetRef, fileName = "analisis-comparativo" }: ExportComparisonProps) => {
  const exportAsImage = async () => {
    if (!targetRef.current) return;
    
    try {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: "#1a1a2e",
        scale: 2,
      });
      
      const link = document.createElement("a");
      link.download = `${fileName}.png`;
      link.href = canvas.toDataURL("image/png");
      link.click();
      
      toast({
        title: "Imagen exportada",
        description: "El análisis se ha guardado como imagen PNG.",
      });
    } catch (error) {
      toast({
        title: "Error al exportar",
        description: "No se pudo exportar la imagen.",
        variant: "destructive",
      });
    }
  };

  const exportAsPDF = async () => {
    if (!targetRef.current) return;
    
    try {
      const canvas = await html2canvas(targetRef.current, {
        backgroundColor: "#1a1a2e",
        scale: 2,
      });
      
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: canvas.width > canvas.height ? "landscape" : "portrait",
        unit: "px",
        format: [canvas.width, canvas.height],
      });
      
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);
      pdf.save(`${fileName}.pdf`);
      
      toast({
        title: "PDF exportado",
        description: "El análisis se ha guardado como PDF.",
      });
    } catch (error) {
      toast({
        title: "Error al exportar",
        description: "No se pudo exportar el PDF.",
        variant: "destructive",
      });
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="gap-2">
          <Download className="h-4 w-4" />
          Exportar
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuItem onClick={exportAsImage} className="gap-2 cursor-pointer">
          <Image className="h-4 w-4" />
          Exportar como imagen (PNG)
        </DropdownMenuItem>
        <DropdownMenuItem onClick={exportAsPDF} className="gap-2 cursor-pointer">
          <FileText className="h-4 w-4" />
          Exportar como PDF
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
