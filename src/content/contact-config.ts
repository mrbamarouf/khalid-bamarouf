export const contactConfig = {
  whatsapp: {
    number: "966596969687",
    display: "+966596969687",
  },
  email: {
    address: "kbamarouf@gmail.com",
  },
} as const;

export function getWhatsAppHref() {
  return `https://wa.me/${contactConfig.whatsapp.number}`;
}

export function getMailtoHref(subject?: string) {
  const suffix = subject ? `?subject=${encodeURIComponent(subject)}` : "";

  return `mailto:${contactConfig.email.address}${suffix}`;
}
