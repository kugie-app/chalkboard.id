export interface MiniiconsType {
  id: number;
  icon: string;
  tooltip: string;
}

const Miniicons: MiniiconsType[] = [
  {
    id: 1,
    icon: "solar:home-line-duotone",
    tooltip: "Main",
  },
  {
    id: 2,
    icon: "solar:chart-line-duotone",
    tooltip: "Reports",
  },
  {
    id: 3,
    icon: "solar:settings-line-duotone",
    tooltip: "Settings",
  },
];

export default Miniicons;
