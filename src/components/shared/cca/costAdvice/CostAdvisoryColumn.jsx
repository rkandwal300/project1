import TooltipHoc from "@/components/ui/Tooltip";

// Utility: Default column sizes
const DEFAULT_SIZE = 150;
const DEFAULT_MIN_SIZE = 150;
const DEFAULT_MAX_SIZE = 200;

// Utility: Numeric cell renderer
const renderNumericCell = ({ getValue }) => {
  const value = getValue();
  return value !== undefined && value !== null ? Number(value).toFixed(2) : "-";
};

// Utility: Plain cell renderer
const renderPlainCell = ({ getValue }) => {
  const value = getValue();
  return value && value.length > 0 ? value : "-";
};

// Column Factory: Numeric
const numericColumn = ({
  id,
  accessorKey,
  header,
  minSize = DEFAULT_MIN_SIZE,
  size = DEFAULT_SIZE,
  maxSize = DEFAULT_MAX_SIZE,
  pin,
}) => ({
  id,
  accessorKey,
  header,
  cell: renderNumericCell,
  minSize,
  size,
  maxSize,
  ...(pin && { pin }),
});

// Column Factory: Plain
const plainColumn = ({
  id,
  accessorKey,
  header,
  minSize = DEFAULT_MIN_SIZE,
  size = DEFAULT_SIZE,
  maxSize = DEFAULT_MAX_SIZE,
  pin,
  cell,
}) => ({
  id,
  accessorKey,
  header,
  minSize,
  size,
  maxSize,
  cell: cell || renderPlainCell,
  ...(pin && { pin }),
});

const tooltipCell = ({ getValue }) => {
  const value = getValue();
  return (
    <TooltipHoc message={value || "-"}>
      <p
        style={{
          whiteSpace: "nowrap",
          overflow: "hidden",
          textOverflow: "ellipsis",
          margin: 0,
          maxWidth: "100%",
          cursor: "pointer",
        }}
      >
        {value && value.length > 0 ? value : "-"}
      </p>
    </TooltipHoc>
  );
};

const currentMetricColumns = [
  plainColumn({
    id: "zone",
    accessorKey: "data.currentPlatform.zone",
    header: "Region"
  }),
  plainColumn({
    id: "instanceType",
    accessorKey: "data.currentPlatform.instanceType",
    header: "Instance Type",
  }),
  numericColumn({
    id: "monthlyCost",
    accessorKey: "data.currentPlatform.monthlyCost",
    header: "Monthly Cost($)",
    pin: "left",
  }),
  numericColumn({
    id: "annualCost",
    accessorKey: "data.currentPlatform.annualCost",
    header: "Annual Cost ($)",
    pin: "left",
  })
];

const currentDetailColumns = [
  plainColumn({
    id: "uuid",
    accessorKey: "id",
    header: "UUID/Instance Name",
    cell: tooltipCell
  }),
  plainColumn({
    id: "cspProvider",
    accessorKey: "data.currentPlatform.cspProvider",
    header: "Cloud"
  }),
  plainColumn({
    id: "numberOfInstances",
    accessorKey: "data.currentPlatform.numberOfInstances",
    header: "Quantity"
  }),
  plainColumn({
    id: "pricingModel",
    accessorKey: "data.currentPlatform.pricingModel",
    header: "Pricing Model"
  }),
  plainColumn({
    id: "vCPU",
    accessorKey: "data.currentPlatform.vCPU",
    header: "vCPU(s)"
  }),
  plainColumn({
    id: "status",
    accessorKey: "data.currentPlatform.status",
    header: "Remark"
  }),
];

const recommendationColumns = (idx, label) => [
  plainColumn({
    id: `${label}_instanceType`,
    accessorKey: `data.recommendations.${idx}.instanceType`,
    header: "Instance Type",
  }),
  plainColumn({
    id: `${label}_vCPU`,
    accessorKey: `data.recommendations.${idx}.vCPU`,
    header: "vCPU(s)",
    size: 120,
  }),
  numericColumn({
    id: `${label}_cost`,
    accessorKey: `data.recommendations.${idx}.monthlyCost`,
    header: "Monthly Cost($)",
  }),
  numericColumn({
    id: `${label}_totalCost`,
    accessorKey: `data.recommendations.${idx}.totalCost`,
    header: "Annual Cost($)",
  }),
  numericColumn({
    id: `${label}_annualSavings`,
    accessorKey: `data.recommendations.${idx}.annualSavings`,
    header: "Annual Savings ($)",
    size: 200,
  }),
  numericColumn({
    id: `${label}_saving`,
    accessorKey: `data.recommendations.${idx}.savingsInPercentage`,
    header: "Savings($)",
  }),
  numericColumn({
    id: `${label}_perf`,
    accessorKey: `data.recommendations.${idx}.perf`,
    header: "Performance Improvement*",
    size: 150,
    maxSize: 210,
  }),
];


export const CostAdvisoryColumn = [
  {
    id: "current1",
    header: "Current",
    columns: currentMetricColumns,
    meta: {
      align: "center",
      colSpan: 4,
    },
  },
  {
    id: "current2",
    header: "",
    columns: currentDetailColumns,
    meta: {
      align: "center",
      colSpan: 6,
    },
  },
  ...["Hourly Cost Optimization", "Modernize", "Modernize & Downsize"].map((label, idx) => ({
    id: label.toLowerCase(),
    header: label,
    columns: recommendationColumns(idx, label),
    meta: {
      align: "center",
    },
  })),
];
