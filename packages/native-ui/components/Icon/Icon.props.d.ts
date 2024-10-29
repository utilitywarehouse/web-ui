import type { ViewStyle, ColorValue as RNColorValue, StyleProp } from 'react-native';
import type { SvgProps } from 'react-native-svg';
import type { ColorValue } from '../../types';
interface IconProps extends SvgProps {
    height?: number | string;
    width?: number | string;
    fill?: string;
    color?: ColorValue;
    size?: number | string;
    stroke?: string;
    as?: React.ElementType;
    style?: StyleProp<ViewStyle & {
        color?: RNColorValue;
    }>;
}
export default IconProps;