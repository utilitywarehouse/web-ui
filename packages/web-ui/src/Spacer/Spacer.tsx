import { useTheme } from '@mui/material/styles';
import { px } from '../utils';
import MuiBox from '@mui/material/Box';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { forwardRef } from 'react';
import type { BoxProps as MuiBoxProps } from '@mui/material/Box';
import type { OverrideProps } from '@mui/material/OverridableComponent';
import type { ResponsiveStyleValue } from '@mui/system/styleFunctionSx';

export type DefaultSpacerComponent = 'div';

export interface CustomSpacerProps {
  /**
   * The direction of the Spacer axis
   */
  axis?: 'horizontal' | 'vertical';
  size: ResponsiveStyleValue<number>;
  inline?: boolean;
}

export interface SpacerTypeMap<D extends React.ElementType = DefaultSpacerComponent, P = {}> {
  props: MuiBoxProps<D, P> & CustomSpacerProps;
  defaultComponent: D;
}

export type SpacerProps<
  D extends React.ElementType = DefaultSpacerComponent,
  P = {}
> = OverrideProps<SpacerTypeMap<D, P>, D>;

export const Spacer = forwardRef(function Spacer(
  { axis = 'vertical', size = 1, component, inline = false, sx, ...props },
  ref
) {
  const theme = useTheme();
  const defaultElement = inline ? 'span' : 'div';

  const getSize = () => {
    if (Array.isArray(size)) {
      return size.map(s => theme.spacing(s as number));
    }
    if (typeof size === 'object') {
      return Object.keys(theme.breakpoints.values).reduce(
        (acc: { [key: string]: string }, breakpoint: string) => {
          if (size[breakpoint] !== null) {
            acc[breakpoint] = theme.spacing(size[breakpoint] as number);
          }
          return acc;
        },
        {}
      );
    }
    return theme.spacing(size);
  };

  const width = axis === 'vertical' ? px(1) : getSize();
  const height = axis === 'horizontal' ? px(1) : getSize();

  return (
    <MuiBox
      ref={ref}
      component={component || defaultElement}
      sx={{
        display: inline ? 'inline-block' : 'block',
        width,
        minWidth: width,
        height,
        minHeight: height,
        ...sx,
      }}
      {...props}
    />
  );
}) as OverridableComponent<SpacerTypeMap>;
