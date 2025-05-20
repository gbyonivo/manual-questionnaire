import Image from "next/image";

interface LogoProps {
  size?: number;
  className?: string;
}

export function Logo({ size = 70, className }: LogoProps) {
  return (
    <Image
      src="/images/logo.png"
      alt="Manual"
      width={size}
      height={size}
      className={className}
    />
  );
}
