"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, FC } from "react";

import LinkButton from "../buttons/LinkButton";

const navigation = [
  { label: "회사소개", href: "/about" },
  { label: "솔루션", href: "/solutions" },
  { label: "파트너 전략", href: "/partner-strategy" },
  { label: "소식", href: "/news" },
];

const isActive = (pathname: string, href: string) =>
  href !== "#" && (pathname === href || pathname.startsWith(`${href}/`));

type HeaderNavbarProps = {
  /** Page extension: contact pages can keep the light surface at all times. */
  appearance?: "auto" | "light";
  /** Page extension: a future hero can supply its own progress condition. */
  scrolledOverride?: boolean;
};

const HeaderNavbar: FC<HeaderNavbarProps> = ({
  appearance = "auto",
  scrolledOverride,
}: HeaderNavbarProps) => {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const headerRef = useRef<HTMLElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);
  const light = appearance === "light" || (scrolledOverride ?? scrolled);

  useEffect(() => {
    const styles = getComputedStyle(document.documentElement);
    const threshold = parseFloat(
      styles.getPropertyValue("--header-scroll-threshold"),
    );
    const breakpoint = styles
      .getPropertyValue("--header-mobile-breakpoint")
      .trim();
    const desktop = window.matchMedia(`(width > ${breakpoint})`);
    let frame = 0;
    const synchronizeScroll = () => {
      cancelAnimationFrame(frame);
      frame = requestAnimationFrame(() =>
        setScrolled(window.scrollY > threshold),
      );
    };
    const synchronizeViewport = () => {
      if (desktop.matches) setMenuOpen(false);
    };
    synchronizeScroll();
    synchronizeViewport();
    window.addEventListener("scroll", synchronizeScroll, { passive: true });
    window.addEventListener("pageshow", synchronizeScroll);
    window.addEventListener("load", synchronizeScroll);
    desktop.addEventListener("change", synchronizeViewport);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", synchronizeScroll);
      window.removeEventListener("pageshow", synchronizeScroll);
      window.removeEventListener("load", synchronizeScroll);
      desktop.removeEventListener("change", synchronizeViewport);
    };
  }, []);

  useEffect(() => {
    if (!menuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      if (
        event.target instanceof Node &&
        !headerRef.current?.contains(event.target)
      ) {
        setMenuOpen(false);
      }
    };
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setMenuOpen(false);
        buttonRef.current?.focus();
      }
    };
    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);
    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [menuOpen]);

  return (
    <header ref={headerRef} className="site-header" data-light={light}>
      <div className="site-header__bar">
        <Link
          href="/"
          className="site-header__logo"
          aria-label="코런웨이브 홈"
          onClick={() => setMenuOpen(false)}
        >
          <Image
            className="site-header__logo-white"
            src="/images/logos/corunwave-symbol-white.png"
            alt=""
            width={1432}
            height={660}
            priority
          />
          <Image
            className="site-header__logo-color"
            src="/images/logos/corunwave-symbol-color.svg"
            alt=""
            width={1432}
            height={660}
          />
        </Link>
        <nav className="site-header__desktop" aria-label="주 내비게이션">
          <ul>
            {navigation.map(({ label, href }) => (
              <li key={label}>
                <Link
                  href={href}
                  aria-current={isActive(pathname, href) ? "page" : undefined}
                >
                  {label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <Link
          className="site-header__contact site-header__desktop-contact"
          href="#"
        >
          문의하기
        </Link>
        <button
          ref={buttonRef}
          className="site-header__toggle"
          type="button"
          aria-expanded={menuOpen}
          aria-controls="header-mobile-navigation"
          aria-label={menuOpen ? "메뉴 닫기" : "메뉴 열기"}
          onClick={() => setMenuOpen((open) => !open)}
        >
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            aria-hidden="true"
          >
            {menuOpen ? (
              <path d="m6 6 12 12M6 18 18 6" />
            ) : (
              <path d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>
      <nav
        id="header-mobile-navigation"
        className="site-header__panel"
        aria-label="모바일 주 내비게이션"
        hidden={!menuOpen}
      >
        <ul>
          {navigation.map(({ label, href }) => (
            <li key={label}>
              <Link
                href={href}
                aria-current={isActive(pathname, href) ? "page" : undefined}
                onClick={() => setMenuOpen(false)}
              >
                {label}
              </Link>
            </li>
          ))}
          <li>
            <LinkButton
              href={"#"}
              className="site-header__contact"
              onClick={() => setMenuOpen(false)}
            >
              문의하기
            </LinkButton>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default HeaderNavbar;
