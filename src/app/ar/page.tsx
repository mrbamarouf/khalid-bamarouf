import type { Metadata } from "next";
import { DesktopExperience } from "@/components/desktop-experience";
import { MobileExperience } from "@/components/mobile-experience";

export const metadata: Metadata = {
  title: "Khalid Bamarouf | مهندس أتمتة بالذكاء الاصطناعي وبانٍ للحلول",
  description:
    "تطبيقات وأتمتات ذكاء اصطناعي مخصصة حول مسار عمل العميل الفعلي، وأدواته، وتفضيلاته، ومشكلاته التشغيلية الحالية.",
  openGraph: {
    title: "Khalid Bamarouf | مهندس أتمتة بالذكاء الاصطناعي وبانٍ للحلول",
    description:
      "أتمتة بالذكاء الاصطناعي تحل مشكلات العملاء الحالية وتجعل العمل اليومي يسير بصورة أفضل.",
    url: "https://www.khaledbamarouf.com/ar",
    siteName: "Khalid Bamarouf",
    type: "website",
    locale: "ar",
  },
  twitter: {
    card: "summary_large_image",
    title: "Khalid Bamarouf | مهندس أتمتة بالذكاء الاصطناعي وبانٍ للحلول",
    description:
      "تطبيقات وأتمتات ذكاء اصطناعي مخصصة حول مسارات العمل، والأدوات، والتفضيلات، والمشكلات التشغيلية الحالية.",
  },
  alternates: {
    canonical: "/ar",
    languages: {
      en: "/",
      ar: "/ar",
    },
  },
};

export default function ArabicHome() {
  return (
    <>
      <DesktopExperience locale="ar" />
      <MobileExperience locale="ar" />
    </>
  );
}
