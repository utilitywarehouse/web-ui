import * as React from 'react';
import { px, spacing } from '../utils';
import { ElementRef, forwardRef } from 'react';
import { createBox } from '../Box';
import { PropsWithSx } from '../types';
import { SpacerProps } from './Spacer.props';
import { breakpoints } from '../tokens';

export type DefaultSpacerComponent = 'div';

const componentClassName = 'Spacer';
const BaseBox = createBox({ componentClassName });

/**
 * Spacer is a layout primitive, loosely based on [Let's Bring Spacer GIFs Back!](https://www.joshwcomeau.com/react/modern-spacer-gif/)
 * by Josh Comeau.
 * This component, adds an extra node to the DOM, so should be used sparingly, for
 * more significant layout concerns please use Stack or Grid.
 *
 * The `size` prop is responsive, so you can set different values for different breakpoints.
 *
 * > This component does not need to be wrapped in a `ThemeProvider` and can be used standalone with other component libraries.
 */
export const Spacer = forwardRef<ElementRef<'div'>, PropsWithSx<SpacerProps>>(function Spacer(
  { axis = 'vertical', size = 1, inline = false, sx, ...props },
  ref
) {
  const getSize = () => {
    if (Array.isArray(size)) {
      return size.map(s => spacing(s as number));
    }
    if (typeof size === 'object') {
      return Object.keys(breakpoints).reduce(
        (acc: { [key: string]: number }, breakpoint: string) => {
          if (size[breakpoint] !== null) {
            acc[breakpoint] = spacing(size[breakpoint] as number);
          }
          return acc;
        },
        {}
      );
    }
    return spacing(size);
  };

  const width = axis === 'vertical' ? px(1) : getSize();
  const height = axis === 'horizontal' ? px(1) : getSize();

  return (
    <BaseBox
      ref={ref}
      component={inline ? 'span' : 'div'}
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
});
