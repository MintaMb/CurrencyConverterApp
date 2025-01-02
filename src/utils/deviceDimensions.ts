import { Dimensions, PixelRatio, Platform } from 'react-native';

const { width, height } = Dimensions.get('window');

const isTablet = () => {
  const aspectRatio = height / width;
  return (
    (Platform.OS === 'ios' && aspectRatio < 1.6) ||
    (Platform.OS === 'android' && aspectRatio < 1.6)
  );
};

const isIPad = () => {
  return Platform.OS === 'ios' && Platform.isPad;
};

type DeviceType = 'phone' | 'tablet' | 'ipad';

const getDeviceType = (): DeviceType => {
  if (isIPad()) return 'ipad';
  if (isTablet()) return 'tablet';
  return 'phone';
};

export const deviceDimensions = {
  width,
  height,
  isSmallDevice: width < 375,
  deviceType: getDeviceType(),
  isTablet: isTablet(),
  isIPad: isIPad(),
};

export const getResponsiveValue = (
  phoneValue: number,
  tabletValue: number,
  iPadValue?: number
): number => {
  switch (deviceDimensions.deviceType) {
    case 'ipad':
      return iPadValue || tabletValue;
    case 'tablet':
      return tabletValue;
    default:
      return phoneValue;
  }
};

export const fontSizes = {
  small: getResponsiveValue(12, 14, 16),
  medium: getResponsiveValue(14, 16, 18),
  large: getResponsiveValue(16, 18, 20),
  extraLarge: getResponsiveValue(18, 20, 24),
};

export const spacing = {
  small: getResponsiveValue(5, 8, 10),
  medium: getResponsiveValue(10, 15, 20),
  large: getResponsiveValue(15, 20, 25),
  extraLarge: getResponsiveValue(20, 25, 30),
};


const baseWidth = 375;
const baseHeight = 667;

const screenWidth = Dimensions.get('screen').width;
const screenHeight = Dimensions.get('screen').height;
const isIOS = Platform.OS === 'ios';

export const scaleSize = (size: number) => {
  const scaledWidth = (screenWidth / baseWidth) * size;
  return scaledWidth < 1 ? scaledWidth : Math.round(scaledWidth);
};

export const scaleSizeWidth = (size: number) =>
  Math.round((screenWidth / baseWidth) * size);

export const scaleSizeHeight = (size: number) =>
  Math.round((screenHeight / baseHeight) * size);

export const scaleFontSize = (size: number) => {
  const scale = screenWidth / baseWidth;
  const newSize = size * scale;
  if (isIOS) {
    return Math.round(PixelRatio.roundToNearestPixel(newSize));
  } else {
    return Math.round(PixelRatio.roundToNearestPixel(newSize)) - 2;
  }
};
