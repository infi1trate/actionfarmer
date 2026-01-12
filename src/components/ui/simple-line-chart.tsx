import * as React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Area,
  AreaChart,
  ReferenceLine,
} from "recharts";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const simpleLineChartVariants = cva("w-full", {
  variants: {
    size: {
      sm: "h-32",
      default: "h-48",
      lg: "h-64",
      xl: "h-80",
    },
  },
  defaultVariants: {
    size: "default",
  },
});

export interface SimpleLineChartProps
  extends React.HTMLAttributes<HTMLDivElement>,
    VariantProps<typeof simpleLineChartVariants> {
  data: Array<Record<string, any>>;
  dataKey: string;
  xAxisKey?: string;
  variant?: "default" | "brand" | "success" | "warning" | "danger";
  filled?: boolean;
  showGrid?: boolean;
  showXAxis?: boolean;
  showYAxis?: boolean;
  showTooltip?: boolean;
  curved?: boolean;
  referenceValue?: number;
  animate?: boolean;
}

const variantColors: Record<string, { stroke: string; fill: string }> = {
  default: {
    stroke: "hsl(var(--foreground))",
    fill: "hsl(var(--foreground) / 0.1)",
  },
  brand: {
    stroke: "hsl(var(--brand-yellow))",
    fill: "hsl(var(--brand-yellow) / 0.15)",
  },
  success: {
    stroke: "hsl(var(--success))",
    fill: "hsl(var(--success) / 0.15)",
  },
  warning: {
    stroke: "hsl(var(--warning))",
    fill: "hsl(var(--warning) / 0.15)",
  },
  danger: {
    stroke: "hsl(var(--danger))",
    fill: "hsl(var(--danger) / 0.15)",
  },
};

const CustomTooltip = ({ active, payload, label }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="rounded-lg border border-border bg-surface px-3 py-2 shadow-md">
        <p className="text-xs text-muted-foreground mb-1">{label}</p>
        <p className="font-semibold tabular-nums">{payload[0].value}</p>
      </div>
    );
  }
  return null;
};

const SimpleLineChart = React.forwardRef<HTMLDivElement, SimpleLineChartProps>(
  (
    {
      className,
      data,
      dataKey,
      xAxisKey = "name",
      size,
      variant = "brand",
      filled = true,
      showGrid = false,
      showXAxis = true,
      showYAxis = false,
      showTooltip = true,
      curved = true,
      referenceValue,
      animate = true,
      ...props
    },
    ref
  ) => {
    const colors = variantColors[variant];
    const ChartComponent = filled ? AreaChart : LineChart;

    return (
      <div
        ref={ref}
        className={cn(simpleLineChartVariants({ size }), className)}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <ChartComponent
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: showYAxis ? 0 : -20 }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
            )}
            {showXAxis && (
              <XAxis
                dataKey={xAxisKey}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                dy={8}
              />
            )}
            {showYAxis && (
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                dx={-8}
                width={40}
              />
            )}
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            {referenceValue !== undefined && (
              <ReferenceLine
                y={referenceValue}
                stroke="hsl(var(--border-2))"
                strokeDasharray="4 4"
              />
            )}
            {filled ? (
              <Area
                type={curved ? "monotone" : "linear"}
                dataKey={dataKey}
                stroke={colors.stroke}
                strokeWidth={2}
                fill={colors.fill}
                isAnimationActive={animate}
                animationDuration={750}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: colors.stroke,
                  stroke: "hsl(var(--surface))",
                  strokeWidth: 2,
                }}
              />
            ) : (
              <Line
                type={curved ? "monotone" : "linear"}
                dataKey={dataKey}
                stroke={colors.stroke}
                strokeWidth={2}
                isAnimationActive={animate}
                animationDuration={750}
                dot={false}
                activeDot={{
                  r: 4,
                  fill: colors.stroke,
                  stroke: "hsl(var(--surface))",
                  strokeWidth: 2,
                }}
              />
            )}
          </ChartComponent>
        </ResponsiveContainer>
      </div>
    );
  }
);
SimpleLineChart.displayName = "SimpleLineChart";

// Chart container with header
export interface SimpleChartContainerProps
  extends React.HTMLAttributes<HTMLDivElement> {
  title?: string;
  subtitle?: string;
  action?: React.ReactNode;
}

const SimpleChartContainer = React.forwardRef<
  HTMLDivElement,
  SimpleChartContainerProps
>(({ className, title, subtitle, action, children, ...props }, ref) => {
  return (
    <div
      ref={ref}
      className={cn(
        "rounded-xl border border-border bg-card p-4",
        className
      )}
      {...props}
    >
      {(title || subtitle || action) && (
        <div className="flex items-start justify-between mb-4">
          <div>
            {title && (
              <h4 className="font-semibold text-sm">{title}</h4>
            )}
            {subtitle && (
              <p className="text-xs text-muted-foreground mt-0.5">{subtitle}</p>
            )}
          </div>
          {action}
        </div>
      )}
      {children}
    </div>
  );
});
SimpleChartContainer.displayName = "SimpleChartContainer";

// Multi-line chart variant
export interface MultiLineChartProps
  extends Omit<SimpleLineChartProps, "dataKey"> {
  lines: Array<{
    dataKey: string;
    variant?: "default" | "brand" | "success" | "warning" | "danger";
    name?: string;
  }>;
}

const MultiLineChart = React.forwardRef<HTMLDivElement, MultiLineChartProps>(
  (
    {
      className,
      data,
      lines,
      xAxisKey = "name",
      size,
      showGrid = false,
      showXAxis = true,
      showYAxis = false,
      showTooltip = true,
      curved = true,
      animate = true,
      ...props
    },
    ref
  ) => {
    return (
      <div
        ref={ref}
        className={cn(simpleLineChartVariants({ size }), className)}
        {...props}
      >
        <ResponsiveContainer width="100%" height="100%">
          <LineChart
            data={data}
            margin={{ top: 8, right: 8, bottom: 0, left: showYAxis ? 0 : -20 }}
          >
            {showGrid && (
              <CartesianGrid
                strokeDasharray="3 3"
                stroke="hsl(var(--border))"
                vertical={false}
              />
            )}
            {showXAxis && (
              <XAxis
                dataKey={xAxisKey}
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                dy={8}
              />
            )}
            {showYAxis && (
              <YAxis
                axisLine={false}
                tickLine={false}
                tick={{ fontSize: 11, fill: "hsl(var(--muted-foreground))" }}
                dx={-8}
                width={40}
              />
            )}
            {showTooltip && <Tooltip content={<CustomTooltip />} />}
            {lines.map((line) => {
              const colors = variantColors[line.variant || "brand"];
              return (
                <Line
                  key={line.dataKey}
                  type={curved ? "monotone" : "linear"}
                  dataKey={line.dataKey}
                  name={line.name || line.dataKey}
                  stroke={colors.stroke}
                  strokeWidth={2}
                  isAnimationActive={animate}
                  animationDuration={750}
                  dot={false}
                  activeDot={{
                    r: 4,
                    fill: colors.stroke,
                    stroke: "hsl(var(--surface))",
                    strokeWidth: 2,
                  }}
                />
              );
            })}
          </LineChart>
        </ResponsiveContainer>
      </div>
    );
  }
);
MultiLineChart.displayName = "MultiLineChart";

export {
  SimpleLineChart,
  SimpleChartContainer,
  MultiLineChart,
  simpleLineChartVariants,
};
