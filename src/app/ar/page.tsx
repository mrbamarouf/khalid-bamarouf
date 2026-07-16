import { DesktopExperience } from "@/components/desktop-experience";
import { MobileExperience } from "@/components/mobile-experience";

export default function ArabicHome() {
  return (
    <>
      <DesktopExperience locale="ar" />
      <MobileExperience locale="ar" />
    </>
  );
}
