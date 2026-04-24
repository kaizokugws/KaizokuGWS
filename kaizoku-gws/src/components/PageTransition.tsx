'use client';

import { usePathname } from 'next/navigation';
import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
}

export default function PageTransition({ children }: PageTransitionProps) {
  const pathname = usePathname();
  const [key, setKey] = useState(pathname);

  useEffect(() => {
    if (pathname !== key) {
      const timer = setTimeout(() => setKey(pathname), 200);
      return () => clearTimeout(timer);
    }
  }, [pathname, key]);

  return (
    <div className="transition-opacity duration-200 ease-in-out">
      {key === pathname ? children : null}
    </div>
  );
}