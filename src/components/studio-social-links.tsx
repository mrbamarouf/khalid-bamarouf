import { contactConfig } from "@/content/contact-config";

type StudioSocialLinksProps = {
  className?: string;
};

function InstagramIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <rect
        fill="none"
        height="15.5"
        rx="4.25"
        stroke="currentColor"
        strokeWidth="1.7"
        width="15.5"
        x="4.25"
        y="4.25"
      />
      <circle cx="12" cy="12" fill="none" r="3.35" stroke="currentColor" strokeWidth="1.7" />
      <circle cx="16.85" cy="7.15" fill="currentColor" r="1.05" />
    </svg>
  );
}

function TikTokIcon() {
  return (
    <svg aria-hidden="true" focusable="false" viewBox="0 0 24 24">
      <path
        d="M13.42 2.25c.06 1.06.42 2.11 1.13 2.92.75.87 1.82 1.43 2.96 1.57v3.12a7.15 7.15 0 0 1-3.93-1.2v5.78c-.02 1.29-.42 2.55-1.22 3.57a5.79 5.79 0 0 1-3.86 2.16 5.73 5.73 0 0 1-4.1-1.13 5.65 5.65 0 0 1-2.13-3.61 5.74 5.74 0 0 1 1.17-4.34 5.72 5.72 0 0 1 5.45-2.02v3.2a2.45 2.45 0 0 0-2.67.73 2.48 2.48 0 0 0-.51 2.42 2.47 2.47 0 0 0 2.13 1.63 2.45 2.45 0 0 0 2.3-1.04c.27-.39.42-.86.43-1.34V2.25h3.35Z"
        fill="currentColor"
      />
    </svg>
  );
}

const socialLinks = [
  {
    icon: <InstagramIcon />,
    key: "instagram",
    ...contactConfig.social.instagram,
  },
  {
    icon: <TikTokIcon />,
    key: "tiktok",
    ...contactConfig.social.tiktok,
  },
];

export function StudioSocialLinks({ className }: StudioSocialLinksProps) {
  return (
    <nav aria-label="BAMAROUF STUDIO social links" className={className}>
      {socialLinks.map((link) => (
        <a
          aria-label={link.label}
          href={link.url}
          key={link.key}
          rel="noopener noreferrer"
          target="_blank"
        >
          {link.icon}
        </a>
      ))}
    </nav>
  );
}
