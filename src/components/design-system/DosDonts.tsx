import * as React from "react";
import { CheckCircle2, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface DosDontsProps {
  dos: string[];
  donts: string[];
  className?: string;
}

export function DosDonts({ dos, donts, className }: DosDontsProps) {
  return (
    <div className={cn("grid md:grid-cols-2 gap-4", className)}>
      <div className="space-y-3 p-4 rounded-xl bg-success-soft border border-success/20">
        <div className="flex items-center gap-2 text-success font-semibold">
          <CheckCircle2 className="h-5 w-5" />
          <span>Do</span>
        </div>
        <ul className="space-y-2">
          {dos.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-success-text">
              <CheckCircle2 className="h-4 w-4 mt-0.5 flex-shrink-0 text-success" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
      <div className="space-y-3 p-4 rounded-xl bg-danger-soft border border-danger/20">
        <div className="flex items-center gap-2 text-danger font-semibold">
          <XCircle className="h-5 w-5" />
          <span>Don't</span>
        </div>
        <ul className="space-y-2">
          {donts.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-danger-text">
              <XCircle className="h-4 w-4 mt-0.5 flex-shrink-0 text-danger" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

interface UsageRuleProps {
  title: string;
  description: string;
  variant?: "info" | "warning" | "success";
  className?: string;
}

export function UsageRule({ title, description, variant = "info", className }: UsageRuleProps) {
  const variantStyles = {
    info: "bg-info-soft border-info/20 text-info-text",
    warning: "bg-warning-soft border-warning/20 text-warning-text",
    success: "bg-success-soft border-success/20 text-success-text",
  };

  return (
    <div className={cn("p-4 rounded-lg border", variantStyles[variant], className)}>
      <h4 className="font-semibold text-sm mb-1">{title}</h4>
      <p className="text-sm opacity-90">{description}</p>
    </div>
  );
}

interface TokenLabelProps {
  token: string;
  value?: string;
  className?: string;
}

export function TokenLabel({ token, value, className }: TokenLabelProps) {
  return (
    <div className={cn("inline-flex items-center gap-2 px-2 py-1 rounded bg-muted text-xs font-mono", className)}>
      <span className="text-muted-foreground">--</span>
      <span className="text-foreground">{token}</span>
      {value && (
        <>
          <span className="text-muted-foreground">:</span>
          <span className="text-info">{value}</span>
        </>
      )}
    </div>
  );
}

interface PreviewCardProps {
  title: string;
  description?: string;
  children: React.ReactNode;
  tokens?: string[];
  className?: string;
}

export function PreviewCard({ title, description, children, tokens, className }: PreviewCardProps) {
  return (
    <div className={cn("rounded-xl border border-border overflow-hidden", className)}>
      <div className="p-6 bg-surface">{children}</div>
      <div className="px-4 py-3 bg-muted/50 border-t border-border">
        <h4 className="font-semibold text-sm">{title}</h4>
        {description && <p className="text-xs text-muted-foreground mt-0.5">{description}</p>}
        {tokens && tokens.length > 0 && (
          <div className="flex flex-wrap gap-1 mt-2">
            {tokens.map((token) => (
              <TokenLabel key={token} token={token} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
