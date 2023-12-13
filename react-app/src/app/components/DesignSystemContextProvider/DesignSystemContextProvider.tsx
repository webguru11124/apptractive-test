import { Breakpoint, Theme,  } from '@mui/material';
import React, { createContext, ReactNode, useEffect, useState } from 'react';
import { getTheme } from '../../constants/theme';

const useWidth = (theme: Theme) => {
  const [width, setWidth] = useState(window.innerWidth);

  useEffect(() => {
    const handleResize = () => {
      setWidth(window.innerWidth);
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  const keys = [...theme.breakpoints.keys].reverse();

  return (
    keys.reduce((output: string | undefined, key: Breakpoint) => {
      const breakpointWidth = theme.breakpoints.values[key];
      return !output && width >= breakpointWidth ? key : output;
    }, undefined) || 'xs'
  );
};

export type DesignSystemContextType = {
  isMobile: boolean;
  theme: Theme;
  width: string;
};
export const DesignSystemContext = createContext<DesignSystemContextType>({
  isMobile: false,
  theme: getTheme(),
  width: 'xs',
});
export const DesignSystemContextProvider = (props: {
  children: ReactNode;
  theme: Theme;
}) => {
  const width = useWidth(props.theme);
  return (
    <DesignSystemContext.Provider
      value={{
        isMobile: width === 'xs' || width === 'sm',
        theme: props.theme,
        width,
      }}
    >
      {props.children}
    </DesignSystemContext.Provider>
  );
};
