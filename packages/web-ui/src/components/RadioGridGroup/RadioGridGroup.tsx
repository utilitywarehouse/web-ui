import * as React from 'react';

import clsx from 'clsx';

import type { RadioGridGroupProps } from './RadioGridGroup.props';
import { RadioGridGroupRoot } from './RadioGridGroupRoot';

import { FormFieldGroup } from '../FormFieldGroup';

import type { PropsWithSx } from '../../types';
import { withGlobalPrefix } from '../../utils';

const componentName = 'RadioGridGroup';
const componentClassName = withGlobalPrefix(componentName);

/**
 * The `RadioGridGroup` provides an accessible way to group and control a set
 * of `Radio` or `RadioTile` components, displayed in a grid layout, allowing
 * the user to select one option from a set. For displaying radios in a column
 * or row, please use the `RadioGroup` component. The `RadioGridGroup` is
 * responsible for handling the value, helper text, error state, error message,
 * and disabled state, as well as determining the presentation and selection of
 * the items in the list. Follows the [WAI-ARIA Radio Group Pattern](https://www.w3.org/WAI/ARIA/apg/patterns/radio/) for radio groups not contained in a toolbar.
 */
export const RadioGridGroup = React.forwardRef<
  HTMLFieldSetElement,
  React.PropsWithChildren<PropsWithSx<RadioGridGroupProps>>
>(
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
