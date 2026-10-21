import Link, { LinkProps } from "next/link";
import { FC, ReactNode } from "react";

interface BorderedButtonProps extends LinkProps {
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  "aria-label"?: string;
}

const BorderedButton: FC<BorderedButtonProps> = ({
  href,
  children,
  className = "",
  ...props
}: BorderedButtonProps) => {
  const merged = `bordered-button${className ? ` ${className}` : ""}`;
  return (
    <Link href={href} className={merged} {...props}>
      {children}
    </Link>
  );
};

export default BorderedButton;
