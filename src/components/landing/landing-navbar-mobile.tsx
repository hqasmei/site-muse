'use client';

import React, { ReactNode, useEffect, useRef } from 'react';

import Link from 'next/link';

import { useAuth, useClerk } from '@clerk/nextjs';
import { motion, useCycle } from 'framer-motion';

const sidebar = {
  open: (height = 1000) => ({
    clipPath: `circle(${height * 2 + 200}px at 100% 0)`,
    transition: {
      type: 'spring',
      stiffness: 20,
      restDelta: 2,
    },
  }),
  closed: {
    clipPath: 'circle(0px at 100% 0)',
    transition: {
      type: 'spring',
      stiffness: 400,
      damping: 40,
    },
  },
};

const LandingNavbarMobile = () => {
  const [isOpen, toggleOpen] = useCycle(false, true);
  const containerRef = useRef(null);
  const { height } = useDimensions(containerRef);

  const { signOut } = useClerk();
  const { isLoaded, userId, sessionId, getToken } = useAuth();

  return (
    <motion.nav
      initial={false}
      animate={isOpen ? 'open' : 'closed'}
      custom={height}
      className={`fixed inset-0 z-50 w-full lg:hidden ${
        isOpen ? '' : 'pointer-events-none'
      }`}
      ref={containerRef}
    >
      <motion.div
        className="absolute inset-0 right-0 w-full bg-white"
        variants={sidebar}
      />
      <motion.ul
        variants={variants}
        className="absolute grid w-full gap-3 px-10 py-16"
      >
        {sessionId ? (
          <>
            <MenuItem key="Dashboard">
              <Link
                href="/dashboard"
                onClick={() => toggleOpen()}
                className="flex w-full font-semibold capitalize"
              >
                Dashboard
              </Link>
            </MenuItem>
            <MenuItem className="my-3 h-px w-full bg-gray-300" />
            {/* <MenuItem key="Discover">
              <Link
                href="/discover"
                onClick={() => toggleOpen()}
                className="flex w-full font-semibold capitalize"
              >
                Discover
              </Link>
            </MenuItem>
            <MenuItem className="my-3 h-px w-full bg-gray-300" />
            <MenuItem key="Contact">
              <Link
                href="/contact"
                onClick={() => toggleOpen()}
                className="flex w-full font-semibold capitalize"
              >
                Contact
              </Link>
            </MenuItem>
            <MenuItem className="my-3 h-px w-full bg-gray-300" /> */}
            <MenuItem key="SignOut">
              <Link
                href="/"
                onClick={() => {
                  signOut();
                  toggleOpen();
                }}
                className="flex w-full font-semibold capitalize"
              >
                Sign Out
              </Link>
            </MenuItem>
          </>
        ) : (
          <>
            <MenuItem key="Login">
              <Link
                href="/sign-in"
                onClick={() => toggleOpen()}
                className="flex w-full font-semibold capitalize"
              >
                Log in
              </Link>
            </MenuItem>
            <MenuItem className="my-3 h-px w-full bg-gray-300" />

            <MenuItem key="Signup">
              <Link
                href="/sign-up"
                onClick={() => toggleOpen()}
                className="flex w-full font-semibold capitalize"
              >
                Sign Up
              </Link>
            </MenuItem>
          </>
        )}
      </motion.ul>
      <MenuToggle toggle={toggleOpen} />
    </motion.nav>
  );
};

export default LandingNavbarMobile;

const MenuToggle = ({ toggle }: { toggle: any }) => (
  <button
    onClick={toggle}
    className="pointer-events-auto absolute right-5 top-5 z-30"
  >
    <svg width="23" height="23" viewBox="0 0 23 23">
      <Path
        variants={{
          closed: { d: 'M 2 2.5 L 20 2.5' },
          open: { d: 'M 3 16.5 L 17 2.5' },
        }}
      />
      <Path
        d="M 2 9.423 L 20 9.423"
        variants={{
          closed: { opacity: 1 },
          open: { opacity: 0 },
        }}
        transition={{ duration: 0.1 }}
      />
      <Path
        variants={{
          closed: { d: 'M 2 16.346 L 20 16.346' },
          open: { d: 'M 3 2.5 L 17 16.346' },
        }}
      />
    </svg>
  </button>
);

const Path = (props: any) => (
  <motion.path
    fill="transparent"
    strokeWidth="2"
    stroke="hsl(0, 0%, 18%)"
    strokeLinecap="round"
    {...props}
  />
);

const MenuItem = ({
  className,
  children,
}: {
  className?: string;
  children?: ReactNode;
}) => {
  return (
    <motion.li variants={MenuItemVariants} className={className}>
      {children}
    </motion.li>
  );
};

const MenuItemVariants = {
  open: {
    y: 0,
    opacity: 1,
    transition: {
      y: { stiffness: 1000, velocity: -100 },
    },
  },
  closed: {
    y: 50,
    opacity: 0,
    transition: {
      y: { stiffness: 1000 },
      duration: 0.02,
    },
  },
};

const variants = {
  open: {
    transition: { staggerChildren: 0.02, delayChildren: 0.15 },
  },
  closed: {
    transition: { staggerChildren: 0.01, staggerDirection: -1 },
  },
};

const useDimensions = (ref: any) => {
  const dimensions = useRef({ width: 0, height: 0 });

  useEffect(() => {
    if (ref.current) {
      dimensions.current.width = ref.current.offsetWidth;
      dimensions.current.height = ref.current.offsetHeight;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [ref]);

  return dimensions.current;
};
