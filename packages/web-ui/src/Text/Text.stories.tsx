import type { Meta, StoryObj } from '@storybook/react';
import Stack from '@mui/material/Stack';
import { Text } from './Text';
import { colors, colorsCommon } from '@utilitywarehouse/colour-system';
import { Box } from '../Box';

const meta: Meta<typeof Text> = {
  title: 'Web UI / Components / Text',
  component: Text,
};

export default meta;
type Story = StoryObj<typeof Text>;

const variants = ['subtitle', 'body', 'legalNote', 'caption'] as const;

export const KitchenSink: Story = {
  parameters: { controls: { hideNoControlsWarning: true } },
  render: () => {
    return (
      <Stack spacing={1}>
        {variants.map(variant => (
          <Text key={variant} variant={variant}>
            Text variant: {variant}
          </Text>
        ))}
      </Stack>
    );
  },
};

export const Workshop: Story = {
  render: ({ color = 'brandMidnight', ...args }) => {
    return (
      <Text
        // @ts-ignore
        color={Object.keys(colorsCommon).includes(color) ? colorsCommon[color] : colors[color]}
        {...args}
      />
    );
  },
  argTypes: {
    children: {
      control: {
        type: 'text',
      },
    },
    component: {
      control: {
        type: 'text',
      },
    },
    variant: {
      options: variants,
      control: {
        type: 'radio',
      },
    },
    color: {
      options: [...Object.keys(colorsCommon), ...Object.keys(colors)],
      control: {
        type: 'select',
      },
    },
    textTransform: {
      options: ['capitalize', 'uppercase', 'lowercase', 'none'],
      control: {
        type: 'radio',
      },
    },
    bold: { control: { type: 'boolean' } },
    align: { control: { type: 'text' } },
    noWrap: { control: { type: 'boolean' } },
  },
  args: {
    children: 'hamburgefons',
    variant: 'body',
    component: 'p',
    color: undefined,
    bold: false,
    textTransform: 'capitalize',
  },
};

export const TextVariants: Story = {
  name: 'Variants',
  render: () => {
    return (
      <Stack spacing={1}>
        <Text variant="subtitle">hamburgefons (subtitle)</Text>
        <Text variant="body">hamburgefons (body)</Text>
        <Text variant="legalNote">hamburgefons (legalNote)</Text>
        <Text variant="caption">hamburgefons (caption)</Text>
      </Stack>
    );
  },
};

export const TextColour: Story = {
  name: 'Contextual Colour',
  render: () => {
    return (
      <Stack>
        <Box padding={2}>
          <Text variant="subtitle">text</Text>
        </Box>
        <Box padding={2} backgroundColor={colorsCommon.brandPrimaryPurple}>
          <Text variant="subtitle">text on brandPrimaryPurple background</Text>
        </Box>
        <Box padding={2} backgroundColor={colorsCommon.brandMidnight}>
          <Text variant="subtitle">text on brandMidnight background</Text>
        </Box>
        <Box padding={2} backgroundColor={colorsCommon.brandMidnight}>
          <Text variant="subtitle" color={colorsCommon.brandPink}>
            text on brandMidnight background with custom color
          </Text>
        </Box>
      </Stack>
    );
  },
};
