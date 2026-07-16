export const temporaryContactConfig = {
  whatsapp: {
    number: "966500000000",
    display: "+966 50 000 0000",
  },
  email: {
    address: "hello@khalidbamarouf.com",
  },
} as const;

export function getWhatsAppHref() {
  return `https://wa.me/${temporaryContactConfig.whatsapp.number}`;
}

export function getMailtoHref(subject?: string) {
  const suffix = subject ? `?subject=${encodeURIComponent(subject)}` : "";

  return `mailto:${temporaryContactConfig.email.address}${suffix}`;
}
