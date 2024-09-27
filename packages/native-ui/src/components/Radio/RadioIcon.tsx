import React, { ComponentProps } from 'react';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import { Icon } from '../Icon';
import type { ColorValue, StyleProp, ViewStyle } from 'react-native';
import { CircleIcon } from '../Icons';

const RadioIcon: React.FC<
  ComponentProps<typeof Icon> & {
    disabled?: boolean;
    style?: ComponentProps<typeof Icon>['style'] & { color?: ColorValue };
  }
> = ({ style, ...props }) => {
  const { styles } = useStyles(stylesheet, {
    disabled: props.disabled,
  });

  return (
    <Icon
      as={CircleIcon}
      {...props}
      style={{ ...styles.container, ...(style ? Object(style) : {}) } as StyleProp<ViewStyle>}
    />
  );
};

const stylesheet = createStyleSheet(({ radii, colors, colorMode }) => ({
  container: {
    width: 14,
    height: 14,
    borderRadius: radii.full,
    color: colorMode === 'dark' ? colors.cyan700 : colors.cyan500,
    variants: {
      disabled: {
        true: {
          color: colorMode === 'dark' ? colors.grey400 : colors.grey400,
        },
      },
    },
  },
}));

export default RadioIcon;