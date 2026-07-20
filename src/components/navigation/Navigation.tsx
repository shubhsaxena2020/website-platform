'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';
import { ThemeToggle } from '../ui/ThemeToggle';
import { useSiteConfig } from '../providers';

export interface NavItem {
  label: string;
  href: string;
}

export interface NavigationProps {
  items?: NavItem[];
  cta?: {
    label: string;
    href: string;
  };
}

const defaultNavItems: NavItem[] = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Services', href: '/services' },
  { label: 'Blog', href: '/blog' },
  { label: 'Contact', href: '/contact' },
];

export function Navigation({
  items,
  cta,
}: NavigationProps) {
  const config = useSiteConfig();

  const navItems = items ?? config.content.navigation ?? defaultNavItems;
  const navCta = cta ?? {
    label: config.content.hero.cta.primary,
    href: '/contact',
  };

  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const hamburgerRef = useRef<HTMLButtonElement>(null);
  const menuRef = useRef<HTMLDivElement>(null);

  const closeMenu = useCallback(() => {
    setIsOpen(false);
    hamburgerRef.current?.focus();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Body overflow lock + Escape key handler + focus trap
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';

      // Focus first focusable element in menu
      const timer = setTimeout(() => {
        const firstLink = menuRef.current?.querySelector<HTMLElement>(
          'a, button, [tabindex]:not([tabindex="-1"])'
        );
        firstLink?.focus();
      }, 50);

      const handleKeyDown = (e: KeyboardEvent) => {
        if (e.key === 'Escape') {
          closeMenu();
          return;
        }

        // Focus trap
        if (e.key === 'Tab' && menuRef.current) {
          const focusable = menuRef.current.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])'
          );
          if (focusable.length === 0) return;

          const first = focusable[0];
          const last = focusable[focusable.length - 1];

          if (e.shiftKey) {
            if (document.activeElement === first) {
              e.preventDefault();
              last.focus();
            }
          } else {
            if (document.activeElement === last) {
              e.preventDefault();
              first.focus();
            }
          }
        }
      };

      document.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        document.removeEventListener('keydown', handleKeyDown);
        clearTimeout(timer);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [isOpen, closeMenu]);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-[var(--z-sticky)] transition-all duration-200 ${
        isScrolled
          ? 'bg-background/80 backdrop-blur-lg shadow-sm'
          : 'bg-transparent'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="mx-auto max-w-[var(--container-xl)] px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between lg:h-20">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 text-xl font-semibold text-text-primary hover:text-accent transition-colors"
            aria-label={`Go to ${config.content.company.name} homepage`}
          >
            <span className="text-accent">●</span>
            {config.content.company.name}
          </Link>

          {/* Desktop navigation */}
          <div className="hidden lg:flex lg:items-center lg:gap-8">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-text-secondary hover:text-text-primary transition-colors"
              >
                {item.label}
              </Link>
            ))}
          </div>

          {/* Desktop CTA */}
          <div className="hidden lg:flex lg:items-center lg:gap-3">
            <ThemeToggle />
            <Link
              href={navCta.href}
              className="inline-flex items-center justify-center px-4 py-2 text-sm font-medium rounded-lg bg-accent text-text-inverse hover:bg-accent-hover active:bg-accent-active transition-all duration-200"
            >
              {navCta.label}
            </Link>
          </div>

          {/* Mobile menu button */}
          <button
            ref={hamburgerRef}
            type="button"
            className="lg:hidden inline-flex items-center justify-center p-2 rounded-lg text-text-secondary hover:text-text-primary hover:bg-background-secondary transition-colors"
            onClick={() => setIsOpen(!isOpen)}
            aria-expanded={isOpen}
            aria-controls="mobile-menu"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            {isOpen ? (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                className="h-6 w-6"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth="1.5"
                stroke="currentColor"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5"
                />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div
        ref={menuRef}
        id="mobile-menu"
        className={`lg:hidden ${isOpen ? 'block' : 'hidden'}`}
        role="dialog"
        aria-modal="true"
        aria-label="Mobile navigation"
      >
        <div className="fixed inset-0 top-16 bg-background/95 backdrop-blur-lg">
          <div className="mx-auto max-w-[var(--container-xl)] px-4 py-6">
            <div className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="text-lg font-medium text-text-primary hover:text-accent transition-colors py-2"
                  onClick={() => setIsOpen(false)}
                >
                  {item.label}
                </Link>
              ))}
              <div className="pt-4 border-t border-border flex flex-col gap-3">
                <div className="flex items-center justify-between">
                  <span className="text-sm text-text-secondary">Theme</span>
                  <ThemeToggle />
                </div>
                <Link
                  href={navCta.href}
                  className="inline-flex items-center justify-center w-full px-4 py-2 text-sm font-medium rounded-lg bg-accent text-text-inverse hover:bg-accent-hover active:bg-accent-active transition-all duration-200"
                  onClick={() => setIsOpen(false)}
                >
                  {navCta.label}
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}
