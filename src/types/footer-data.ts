export interface FooterItemWithLink {
  name: string;
  link: string;
}

export interface FooterItemWithIcon {
  name: string;
  icons: {
    icon: string;
    link: string;
  }[];
}

export type FooterItem = FooterItemWithIcon | FooterItemWithLink;

export function isFooterItemWithIcon(
  item: FooterItem
): item is FooterItemWithIcon {
  return "icons" in item;
}

export function isFooterItemWithLink(
  item: FooterItem
): item is FooterItemWithLink {
  return "link" in item;
}

export type FooterData = Record<string, FooterItem[]>;
