import React, { ComponentProps } from 'react';
import { Pressable, type PressableProps, type TextProps } from 'react-native';
import { createStyleSheet, useStyles } from 'react-native-unistyles';
import AlertText from './AlertText';
import { ChevronRightSmallIcon } from '@utilitywarehouse/react-native-icons';
import { useAlertContext } from './Alert.context';

const AlertLink: React.FC<PressableProps> = ({ children, ...props }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <Pressable {...props} style={[styles.container]}>
      {children}
    </Pressable>
  );
};

export const AlertLinkText: React.FC<TextProps> = ({ children, ...props }) => {
  const { styles } = useStyles(stylesheet);
  return (
    <AlertText {...props} style={[styles.text, props.style]}>
      {children}
    </AlertText>
  );
};

export const AlertLinkChevron: React.FC<ComponentProps<typeof ChevronRightSmallIcon>> = ({
  ...props
}) => {
  const { colorScheme } = useAlertContext();
  const { styles } = useStyles(stylesheet, { colorScheme });
  return <ChevronRightSmallIcon {...props} style={styles.icon} />;
};

AlertLink.displayName = 'AlertLink';
AlertLinkText.displayName = 'AlertLinkText';
AlertLinkChevron.displayName = 'AlertLinkChevron';

const stylesheet = createStyleSheet(({ fontWeights, colors, space }) => ({
  container: {
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'row',
    gap: space[1],
  },
  text: {
    fontWeight: fontWeights.semibold,
  },
  icon: {
    width: 16,
    height: 16,
    alignSelf: 'center',
    variants: {
      colorScheme: {
        cyan: {
          color: colors.cyan700,
        },
        red: {
          color: colors.red700,
        },
        green: {
          color: colors.green700,
        },
        gold: {
          color: colors.gold700,
        },
      },
    },
  },
}));

export default AlertLink;