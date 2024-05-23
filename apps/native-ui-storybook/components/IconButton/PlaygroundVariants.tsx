import { ButtonGroup, Button, IconButton, ButtonText } from '@utilitywarehouse/native-ui';
import React from 'react';
import { ChevronRightMediumIcon } from '@utilitywarehouse/react-native-icons';
import { StoryFn } from '@storybook/react';

const ButtonPlaygroundVariants: StoryFn = ({ colorScheme, isDisabled, size }: any) => {
  return (
    <ButtonGroup flexDirection="column" space="md">
      <IconButton
        icon={ChevronRightMediumIcon}
        variant="solid"
        colorScheme={colorScheme}
        isDisabled={isDisabled}
        size={size}
      />
      <IconButton
        icon={ChevronRightMediumIcon}
        variant="outline"
        colorScheme={colorScheme}
        isDisabled={isDisabled}
        size={size}
      />
      <IconButton
        icon={ChevronRightMediumIcon}
        variant="ghost"
        colorScheme={colorScheme}
        isDisabled={isDisabled}
        size={size}
      />
    </ButtonGroup>
  );
};

ButtonPlaygroundVariants.storyName = 'Playground Variants';

ButtonPlaygroundVariants.argTypes = {
  size: {
    options: ['x-small', 'small', 'large'],
    control: 'select',
    description: 'The size of the button.',
  },
  colorScheme: {
    options: ['cyan', 'red', 'green', 'grey', 'gold'],
    control: 'select',
    description: 'The color scheme of the button.',
  },
  isDisabled: {
    type: 'boolean',
    control: 'boolean',
    description: 'To manually set disable to the button.',
  },
};

ButtonPlaygroundVariants.args = {
  size: 'large',
  colorScheme: 'cyan',
  isDisabled: false,
};

export default ButtonPlaygroundVariants;

export { ButtonText, Button };