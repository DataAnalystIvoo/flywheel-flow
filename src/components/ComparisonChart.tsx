import { Card } from "@/components/ui/card";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

interface ComparisonChartProps {
  currentAttract: number;
  currentEngage: number;
  currentDelight: number;
  previousAttract: number;
  previousEngage: number;
  previousDelight: number;
}

export const ComparisonChart = ({
  currentAttract,
  currentEngage,
  currentDelight,
  previousAttract,
  previousEngage,
  previousDelight,
}: ComparisonChartProps) => {
  const data = [
    {
      name: "Attract",
      Anterior: previousAttract,
      Actual: currentAttract,
    },
    {
      name: "Engage",
      Anterior: previousEngage,
      Actual: currentEngage,
    },
    {
      name: "Delight",
      Anterior: previousDelight,
      Actual: currentDelight,
    },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Comparación Visual</h3>
      <ResponsiveContainer width="100%" height={350}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="hsl(var(--border))" />
          <XAxis dataKey="name" stroke="hsl(var(--muted-foreground))" />
          <YAxis stroke="hsl(var(--muted-foreground))" />
          <Tooltip
            contentStyle={{
              backgroundColor: "hsl(var(--card))",
              border: "1px solid hsl(var(--border))",
              borderRadius: "8px",
            }}
          />
          <Legend />
          <Bar dataKey="Anterior" fill="hsl(var(--muted))" radius={[8, 8, 0, 0]} />
          <Bar dataKey="Actual" fill="hsl(var(--primary))" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
