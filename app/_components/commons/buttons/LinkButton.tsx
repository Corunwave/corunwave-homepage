import Link, { LinkProps } from "next/link";
import { FC, ReactNode } from "react";

interface LinkButtonProps extends LinkProps {
  children: ReactNode;
  className?: string;
  target?: string;
  rel?: string;
  download?: boolean | string;
}

const LinkButton: FC<LinkButtonProps> = ({
  href,
  children,
  className = "",
  ...props
}: LinkButtonProps) => {
  return (
    <Link href={href} className={className} {...props}>
      {children}
    </Link>
  );
};

export default LinkButton;
