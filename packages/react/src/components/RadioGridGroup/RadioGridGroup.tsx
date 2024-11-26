import * as React from 'react';

import clsx from 'clsx';

import { Root } from '@radix-ui/react-radio-group';
import { withGlobalPrefix } from '../../helpers/with-global-prefix';
import type { ElementRef } from 'react';
import { RadioGridGroupProps, RadioGridGroupRootProps } from './RadioGridGroup.props';
import { Box } from '../Box/Box';
import { withBreakpointStyles } from '../../helpers/with-breakpoint-styles';
import { FormFieldGroup } from '../FormFieldGroup/FormFieldGroup';

const rootComponentName = 'RadioGridGroupRoot';
const rootComponentClassName = withGlobalPrefix(rootComponentName);

type RadioGridGroupRootElement = ElementRef<'div'>;

export const RadioGridGroupRoot = React.forwardRef<
  RadioGridGroupRootElement,
  RadioGridGroupRootProps
>(({ id, disabled, children, width, columns = 2, className, style, ...props }, ref) => {
  const columnsProps = withBreakpointStyles(columns, 'columns');
  console.log({ columns, columnsProps });
  return (
    <Root
      ref={ref}
      asChild
      {...props}
      disabled={disabled}
      id={id}
      className={clsx(rootComponentClassName, className)}
    >
      <Box
        className={clsx('uwp-RadioGridGroupContent', columnsProps?.className)}
        style={{ ...columnsProps?.style, ...style }}
        width={width}
      >
        {children}
      </Box>
    </Root>
  );
});

RadioGridGroupRoot.displayName = rootComponentName;

const componentName = 'RadioGridGroup';
const componentClassName = withGlobalPrefix(componentName);

type RadioGridGroupElement = ElementRef<'fieldset'>;

/**
 * The `RadioGridGroup` provides an accessible way to group and control a set
 * of `Radio` or `RadioTile` components, displayed in a grid layout, allowing
 * the user to select one option from a set. For displaying radios in a column
 * or row, please use the `RadioGroup` component. The `RadioGridGroup` is
 * responsible for handling the value, helper text, error state, error message,
 * and disabled state, as well as determining the presentation and selection of
 * the items in the list. Follows the [WAI-ARIA Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) for radio groups not contained in a toolbar.
 */
export const RadioGridGroup = React.forwardRef<RadioGridGroupElement, RadioGridGroupProps>(
  (
    {
      children,
      contentWidth = 'fit-content',
      className,
      label,
      helperText,
      helperTextPosition,
      showHelperTextIcon,
      error,
      errorMessage,
      showErrorMessageIcon,
      required,
      disabled,
      loop,
      defaultValue,
      value,
      onValueChange,
      name,
      columns,
      ...props
    },
    ref
  ) => {
    const formFieldGroupProps = {
      ...props,
      disabled,
      required,
      label,
      helperText,
      helperTextPosition,
      showHelperTextIcon,
      error,
      errorMessage,
      showErrorMessageIcon,
    };
    const radioGridGroupRootProps = {
      width: contentWidth,
      name,
      required,
      disabled,
      loop,
      defaultValue,
      value,
      onValueChange,
      columns,
    };
    return (
      <FormFieldGroup
        ref={ref}
        className={clsx(componentClassName, className)}
        {...formFieldGroupProps}
      >
        <RadioGridGroupRoot {...radioGridGroupRootProps}>{children}</RadioGridGroupRoot>
      </FormFieldGroup>
    );
  }
);

RadioGridGroup.displayName = componentName;