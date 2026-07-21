export const contactConfig = {
  whatsapp: {
    number: "966596969687",
    display: "+966596969687",
  },
  email: {
    address: "kbamarouf@gmail.com",
  },
  social: {
    instagram: {
      label: "BAMAROUF STUDIO on Instagram",
      url: "https://www.instagram.com/bamaroufstudio?igsh=MWs0dW0ybzZrMmE4Mw==",
    },
    tiktok: {
      label: "BAMAROUF STUDIO on TikTok",
      url: "https://www.tiktok.com/@bamaroufstudio?_r=1&_t=ZS-98DieCp6cKa",
    },
  },
} as const;

export function getWhatsAppHref() {
  return `https://wa.me/${contactConfig.whatsapp.number}`;
}

export function getMailtoHref(subject?: string) {
  const suffix = subject ? `?subject=${encodeURIComponent(subject)}` : "";

  return `mailto:${contactConfig.email.address}${suffix}`;
}
