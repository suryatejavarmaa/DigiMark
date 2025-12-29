import { ReactNode, useEffect, useState } from 'react';

interface PageTransitionProps {
  children: ReactNode;
  triggerKey?: string;
}

export function PageTransition({ children, triggerKey }: PageTransitionProps) {
  const [isAnimating, setIsAnimating] = useState(true);

  useEffect(() => {
    setIsAnimating(true);
    const timer = setTimeout(() => {
      setIsAnimating(false);
    }, 400);

    return () => clearTimeout(timer);
  }, [triggerKey]);

  return (
    <>
      {children}
      <style>
        {`
          @keyframes slideUpFadeIn {
            from {
              opacity: 0;
              transform: translateY(40px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
        `}
      </style>
    </>
  );
}