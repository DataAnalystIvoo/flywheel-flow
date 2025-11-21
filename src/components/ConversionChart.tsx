import { Card } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell } from "recharts";

interface ConversionChartProps {
  attract: number;
  engage: number;
  delight: number;
}

export const ConversionChart = ({ attract, engage, delight }: ConversionChartProps) => {
  const data = [
    { name: "Attract", value: attract, color: "hsl(210 100% 50%)" },
    { name: "Engage", value: engage, color: "hsl(38 92% 50%)" },
    { name: "Delight", value: delight, color: "hsl(142 76% 45%)" },
  ];

  return (
    <Card className="p-6">
      <h3 className="text-lg font-semibold mb-6">Embudo de Conversión</h3>
      <ResponsiveContainer width="100%" height={300}>
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
          <Bar dataKey="value" radius={[8, 8, 0, 0]}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </Card>
  );
};
