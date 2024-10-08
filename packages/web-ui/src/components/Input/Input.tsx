import * as React from 'react';

import clsx from 'clsx';

import { colors } from '@utilitywarehouse/colour-system';

import { InputProps } from './Input.props';

import { styled } from '../../theme';
import { fontWeights, fonts } from '../../tokens';
import { PropsWithSx } from '../../types';
import { px, withGlobalPrefix } from '../../utils';

const componentName = 'Input';
const componentClassName = withGlobalPrefix(componentName);

const StyledElement = styled('div')(() => ({
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  padding: px(16),
  height: px(56),
  borderTopLeftRadius: px(16),
  borderTopRightRadius: px(16),
  borderBottomLeftRadius: 0,
  borderBottomRightRadius: 0,
  borderWidth: px(2),
  borderStyle: 'solid',
  borderColor: colors.grey500,
  ['&:where(:focus-within)']: {
    borderColor: colors.cyan500,
  },
}));

const StyledInput = styled('input')(() => ({
  all: 'unset',
  display: 'flex',
  width: '100%',
  '-webkit-tap-highlight-color': 'transparent',
  cursor: 'text',
  whiteSpace: 'pre-wrap',
  fontSize: px(16),
  lineHeight: 1.5,
  fontFamily: fonts.secondary,
  fontWeight: fontWeights.secondary.regular,
}));

/**
 * TODO: Document the Input component.
 */
export const Input = React.forwardRef<React.ElementRef<'input'>, PropsWithSx<InputProps>>(
  ({ className, sx, ...props }, ref) => {
    return (
      <StyledElement sx={sx}>
        <StyledInput ref={ref} className={clsx(componentClassName, className)} {...props} />
      </StyledElement>
    );
  }
);

Input.displayName = componentName;
