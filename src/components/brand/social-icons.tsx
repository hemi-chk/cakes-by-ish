import { siFacebook, siInstagram, siWhatsapp, type SimpleIcon } from "simple-icons";

type IconProps = { className?: string };

function BrandIcon({ icon, className }: { icon: SimpleIcon } & IconProps) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" focusable="false" className={className}>
      <path d={icon.path} />
    </svg>
  );
}

export const InstagramIcon = (props: IconProps) => <BrandIcon icon={siInstagram} {...props} />;
export const WhatsAppIcon = (props: IconProps) => <BrandIcon icon={siWhatsapp} {...props} />;
export const FacebookIcon = (props: IconProps) => <BrandIcon icon={siFacebook} {...props} />;
