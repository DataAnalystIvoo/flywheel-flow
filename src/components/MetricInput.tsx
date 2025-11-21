import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MetricInputProps {
  label: string;
  value: number;
  onChange: (value: number) => void;
  icon: React.ReactNode;
  color: string;
  description: string;
}

export const MetricInput = ({ label, value, onChange, icon, color, description }: MetricInputProps) => {
  return (
    <Card className="p-6 hover:shadow-medium transition-shadow">
      <div className="flex items-start gap-4">
        <div
          className="w-12 h-12 rounded-lg flex items-center justify-center text-white shrink-0"
          style={{ backgroundColor: color }}
        >
          {icon}
        </div>
        <div className="flex-1 space-y-3">
          <div>
            <Label htmlFor={label} className="text-lg font-semibold">
              {label}
            </Label>
            <p className="text-sm text-muted-foreground mt-1">{description}</p>
          </div>
          <Input
            id={label}
            type="number"
            min="0"
            value={value}
            onChange={(e) => onChange(Number(e.target.value))}
            className="text-lg"
          />
        </div>
      </div>
    </Card>
  );
};
