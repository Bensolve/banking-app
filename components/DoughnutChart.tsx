"use client";

import * as React from "react";
import { Label, Pie, PieChart } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

interface DoughnutProps {
  transactions: { type: string; amount: number }[]; // Accept transactions as props
  balance: number; // Accept balance as a prop
}

export function Doughnut({ transactions, balance }: DoughnutProps) {
  // Process chart data dynamically based on props
  const chartData = React.useMemo(() => {
    const credits = transactions
      .filter((txn) => txn.type === "credit")
      .reduce((acc, txn) => acc + txn.amount, 0);

    // For debits, treat them as negative values for proper charting
    const debits = transactions
      .filter((txn) => txn.type === "debit")
      .reduce((acc, txn) => acc + txn.amount, 0) * -1; // Multiply by -1 to make it negative

    return [
      { label: "Credits", value: credits, fill: "hsl(var(--chart-1))" }, // Credit color
      { label: "Debits", value: debits, fill: "hsl(var(--chart-2))" }, // Debit color
      { label: "Balance", value: balance, fill: "hsl(var(--chart-3))" }, // Balance color
    ];
  }, [transactions, balance]);

  const totalValue = React.useMemo(
    () => chartData.reduce((acc, curr) => acc + curr.value, 0),
    [chartData]
  );

  return (
    <Card className="flex flex-col">
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            credits: { label: "Credits", color: "hsl(var(--chart-1))" },
            debits: { label: "Debits", color: "hsl(var(--chart-2))" },
            balance: { label: "Balance", color: "hsl(var(--chart-4))" },
          }}
          className="mx-auto aspect-square max-h-[250px]"
        >
          <PieChart>
            <ChartTooltip cursor={false} content={<ChartTooltipContent hideLabel />} />
            <Pie
              data={chartData}
              dataKey="value"
              nameKey="label"
              innerRadius={60}
              strokeWidth={5}
            >
              <Label
                content={({ viewBox }) => {
                  if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                    return (
                      <text
                        x={viewBox.cx}
                        y={viewBox.cy}
                        textAnchor="middle"
                        dominantBaseline="middle"
                      >
                        <tspan
                          x={viewBox.cx}
                          y={viewBox.cy}
                          className="fill-foreground text-3xl font-bold"
                        >
                          {totalValue.toLocaleString()}
                        </tspan>
                        <tspan
                          x={viewBox.cx}
                          y={(viewBox.cy || 0) + 24}
                          className="fill-muted-foreground"
                        >
                          Total
                        </tspan>
                      </text>
                    );
                  }
                }}
              />
            </Pie>
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
