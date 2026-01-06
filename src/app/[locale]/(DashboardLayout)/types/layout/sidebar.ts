export interface navItemProps {
  item: {
    icon: string;
    href?: string;
    disabled?: boolean;
    title?: string;
    subtitle?: string;
    chip?: string;
    chipColor?: string;
    variant?: string;
    external?: boolean;
    id: number;
  };
}

export interface listItemType {
  component: any;
  href?: string;
  target?: any;
  to?: any;
}
