import * as React from "react";
import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const tableVariants = cva(
  "w-full caption-bottom text-sm",
  {
    variants: {
      variant: {
        default: "",
        bordered: "[&_th]:border [&_td]:border [&_th]:border-border [&_td]:border-border",
        minimal: "[&_thead]:border-b-0 [&_tr]:border-b-0",
      },
      size: {
        sm: "[&_th]:px-3 [&_th]:py-2 [&_td]:px-3 [&_td]:py-2 [&_th]:text-xs",
        default: "[&_th]:px-4 [&_th]:py-3 [&_td]:px-4 [&_td]:py-3",
        lg: "[&_th]:px-5 [&_th]:py-4 [&_td]:px-5 [&_td]:py-4",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
);

export interface TableProps 
  extends React.HTMLAttributes<HTMLTableElement>,
    VariantProps<typeof tableVariants> {
  zebra?: boolean;
}

const Table = React.forwardRef<HTMLTableElement, TableProps>(
  ({ className, variant, size, zebra, ...props }, ref) => (
    <div className="relative w-full overflow-auto rounded-xl">
      <table 
        ref={ref} 
        className={cn(
          tableVariants({ variant, size }),
          zebra && "[&_tbody_tr:nth-child(odd)]:bg-surface-2/50",
          className
        )} 
        {...props} 
      />
    </div>
  ),
);
Table.displayName = "Table";

const TableHeader = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <thead 
      ref={ref} 
      className={cn("bg-surface-2 [&_tr]:border-b [&_tr]:border-border", className)} 
      {...props} 
    />
  ),
);
TableHeader.displayName = "TableHeader";

const TableBody = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tbody 
      ref={ref} 
      className={cn("[&_tr:last-child]:border-0", className)} 
      {...props} 
    />
  ),
);
TableBody.displayName = "TableBody";

const TableFooter = React.forwardRef<HTMLTableSectionElement, React.HTMLAttributes<HTMLTableSectionElement>>(
  ({ className, ...props }, ref) => (
    <tfoot 
      ref={ref} 
      className={cn(
        "border-t border-border bg-surface-2 font-medium [&>tr]:last:border-b-0", 
        className
      )} 
      {...props} 
    />
  ),
);
TableFooter.displayName = "TableFooter";

interface TableRowProps extends React.HTMLAttributes<HTMLTableRowElement> {
  selected?: boolean;
  clickable?: boolean;
}

const TableRow = React.forwardRef<HTMLTableRowElement, TableRowProps>(
  ({ className, selected, clickable, ...props }, ref) => (
    <tr
      ref={ref}
      className={cn(
        "border-b border-border transition-colors duration-200",
        clickable && "cursor-pointer hover:bg-surface-2",
        selected && "bg-brand-yellow-soft",
        !clickable && !selected && "hover:bg-surface-2/50",
        className
      )}
      {...props}
    />
  ),
);
TableRow.displayName = "TableRow";

const TableHead = React.forwardRef<HTMLTableCellElement, React.ThHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <th
      ref={ref}
      className={cn(
        "text-left align-middle font-semibold text-muted-foreground text-xs uppercase tracking-wider",
        "[&:has([role=checkbox])]:pr-0",
        className,
      )}
      {...props}
    />
  ),
);
TableHead.displayName = "TableHead";

const TableCell = React.forwardRef<HTMLTableCellElement, React.TdHTMLAttributes<HTMLTableCellElement>>(
  ({ className, ...props }, ref) => (
    <td 
      ref={ref} 
      className={cn(
        "align-middle text-foreground",
        "[&:has([role=checkbox])]:pr-0", 
        className
      )} 
      {...props} 
    />
  ),
);
TableCell.displayName = "TableCell";

const TableCaption = React.forwardRef<HTMLTableCaptionElement, React.HTMLAttributes<HTMLTableCaptionElement>>(
  ({ className, ...props }, ref) => (
    <caption 
      ref={ref} 
      className={cn("mt-4 text-sm text-muted-foreground", className)} 
      {...props} 
    />
  ),
);
TableCaption.displayName = "TableCaption";

// Empty state for tables
interface TableEmptyProps {
  message?: string;
  colSpan: number;
}

const TableEmpty = ({ message = "No data available", colSpan }: TableEmptyProps) => (
  <TableRow>
    <TableCell colSpan={colSpan} className="h-32 text-center text-muted-foreground">
      {message}
    </TableCell>
  </TableRow>
);
TableEmpty.displayName = "TableEmpty";

export { 
  Table, 
  TableHeader, 
  TableBody, 
  TableFooter, 
  TableHead, 
  TableRow, 
  TableCell, 
  TableCaption,
  TableEmpty,
  tableVariants 
};
