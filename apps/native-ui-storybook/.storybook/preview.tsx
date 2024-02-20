import type { Preview, Decorator } from '@storybook/react';
import React from 'react';
import { Center, NativeUIProvider, config } from '@utilitywarehouse/native-ui';
import { PlatformContextProvider } from '../contexts/PlatformContext';
import { useStoryContext, useArgs, useGlobals } from '@storybook/preview-api';
import '../assets/style.css';
import StoryWrap from '../components/StoryWrap';

const lightColour: string = '#fff';
const darkColour: string = '#1d1d1d';

export const decorators: Decorator[] = [
  Story => {
    const [globals] = useGlobals();
    const theme = globals.backgrounds?.value === lightColour ? 'light' : 'dark';
    const [args] = useArgs();
    const { id, viewMode } = useStoryContext();

    return (
      <NativeUIProvider colorMode={theme} config={config}>
        <PlatformContextProvider
          args={args}
          id={id}
          viewMode={viewMode}
          colourMode={theme}
          platform={globals.device}
        >
          <Center>{viewMode === 'story' ? <StoryWrap>{<Story />}</StoryWrap> : <Story />}</Center>
        </PlatformContextProvider>
      </NativeUIProvider>
    );
  },
];

const preview: Preview = {
  globals: {
    device: 'web',
  },
  parameters: {
    options: {
      storySort: {
        order: [
          'Native UI',
          ['Introduction', 'Guides', 'Tokens', 'Layout', 'Typography', 'Components', 'Lab'],
          'Colour System',
          ['Introduction', 'Common', 'Colors'],
        ],
      },
    },
    actions: { argTypesRegex: '^on[A-Z].*' },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/,
      },
    },
    backgrounds: {
      default: 'light',
      values: [
        {
          name: 'light',
          value: lightColour,
        },
        {
          name: 'dark',
          value: darkColour,
        },
      ],
    },
  },
};

export default preview;