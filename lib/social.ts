export interface StoreSocialLink {
  id: "facebook" | "instagram";
  label: string;
  href: string;
}

export const STORE_SOCIAL_LINKS: StoreSocialLink[] = [
  {
    id: "facebook",
    label: "Facebook",
    href: "https://www.facebook.com/spmotospelotasrs",
  },
  {
    id: "instagram",
    label: "Instagram",
    href: "https://www.instagram.com/spmotospel/",
  },
];
