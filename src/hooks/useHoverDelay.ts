import { useState, useEffect } from 'react';

export function useHoverDelay(delay: number) {
  const [isHovering, setIsHovering] = useState(false);
  const [shouldShow, setShouldShow] = useState(false);
  
  useEffect(() => {
    let timer: number;
    
    if (isHovering) {
      timer = window.setTimeout(() => {
        setShouldShow(true);
      }, delay);
    } else {
      setShouldShow(false);
    }
    
    return () => {
      clearTimeout(timer);
    };
  }, [isHovering, delay]);
  
  return {
    shouldShow,
    handlers: {
      onMouseEnter: () => setIsHovering(true),
      onMouseLeave: () => setIsHovering(false),
    },
  };
}