import * as React from 'react';
import { Story, Meta } from '@storybook/react';
import { Stack, Button, ButtonProps } from '@utilitywarehouse/web-ui';
import BackgroundStack from './BackgroundStack';

const sizes = ['small', 'medium', 'large'] as const;
const variants = ['primary', 'secondary'] as const;

export default {
  title: 'Components/Button',
  component: Button,
  argTypes: {
    forwardedRef: { table: { disable: true } },
    children: {
      control: {
        type: 'text',
      },
    },
    href: {
      control: {
        type: 'text',
      },
    },
    disabled: {
      control: {
        type: 'boolean',
      },
    },
    variant: {
      control: {
        type: 'radio',
        options: [...variants, 'tertiary'],
      },
    },
    size: {
      control: {
        type: 'radio',
        options: sizes,
      },
    },
    variant: {
      control: {
        type: 'radio',
        options: [...variants, 'tertiary'],
      },
    },
    size: {
      control: {
        type: 'radio',
        options: sizes,
      },
    },
  },
  args: {
    variant: 'primary',
    size: 'medium',
    disabled: false,
    fullWidth: false,
    disableCapitalizeFirstLetter: false,
  },
} as Meta;

export const ButtonKitchenSinkStory: Story<ButtonProps> = () => (
  <BackgroundStack>
    <Stack spacing={4}>
      {variants.map(variant => (
        <Stack key={variant} direction="row" spacing={2} alignItems="center">
          <>
            {sizes.map(size => (
              <Button key={size} size={size} variant={variant}>
                button
              </Button>
            ))}
            {sizes.map(size => (
              <Button key={size} size={size} variant={variant} disabled={true}>
                button
              </Button>
            ))}
          </>
        </Stack>
      ))}
      <Stack direction="row" spacing={2} alignItems="center">
        <Button variant="tertiary">button</Button>
        <Button variant="tertiary" disabled={true}>
          button
        </Button>
      </Stack>
    </Stack>
  </BackgroundStack>
);
ButtonKitchenSinkStory.storyName = 'Kitchen Sink';
ButtonKitchenSinkStory.argTypes = {
  variant: { table: { disable: true } },
  size: { table: { disable: true } },
  disabled: { table: { disable: true } },
  fullWidth: { table: { disable: true } },
  href: { table: { disable: true } },
  classes: { table: { disable: true } },
  sx: { table: { disable: true } },
  children: { table: { disable: true } },
  disableCapitalizeFirstLetter: { table: { disable: true } },
};

export const ButtonCustomStory: Story<ButtonProps> = args => {
  return (
    <BackgroundStack>
      <Button {...args}>
        {args.children ? args.children : `${args.size} ${args.variant} button`}
      </Button>
    </BackgroundStack>
  );
};
ButtonCustomStory.storyName = 'Custom';
ButtonCustomStory.argTypes = {
  classes: { table: { disable: true } },
  sx: { table: { disable: true } },
};
