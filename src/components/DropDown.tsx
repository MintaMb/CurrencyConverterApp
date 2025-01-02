import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  Image,
  ViewStyle,
  TextStyle,
} from 'react-native';
import SelectDropdown from 'react-native-select-dropdown';
import images from '../resources/images';
import {
  deviceDimensions,
  getResponsiveValue,
  fontSizes,
  spacing,
} from '../utils/deviceDimensions';
import AppConstants from '../constants/AppConstants';
import ColorConstants from '../constants/ColorConstants';

interface DropdownItem {
  title: string;
  image: any;
}

interface CommonDropdownProps {
  data: DropdownItem[];
  placeholder?: string;
  selectedValue?: DropdownItem;
  onSelect: (selectedItem: DropdownItem, index: number) => void;
  dropdownStyle?: ViewStyle;
  buttonStyle?: ViewStyle;
  buttonTextStyle?: TextStyle;
  dropdownItemStyle?: ViewStyle;
  dropdownItemTextStyle?: TextStyle;
  label?: string;
}

const DropDown: React.FC<CommonDropdownProps> = ({
  data,
  placeholder = 'Select an option',
  selectedValue,
  onSelect,
  dropdownStyle,
  buttonStyle,
  buttonTextStyle,
  dropdownItemStyle,
  dropdownItemTextStyle,
  label,
}) => {
  return (
    <View>
      {label && <Text style={styles.label}>{label}</Text>}
      <SelectDropdown
        data={data}
        onSelect={onSelect}
        renderButton={(selectedItem, isOpened) => (
          <View style={[styles.dropdownButtonStyle, buttonStyle]}>
            <Text
              style={[styles.dropdownButtonTxtStyle, buttonTextStyle]}
              numberOfLines={1}>
              {(selectedItem && selectedItem.title) || placeholder}
            </Text>
            <Image
              source={isOpened ? images.IC_UP_ARROW : images.IC_DOWN_ARROW}
              style={styles.dropdownButtonArrowStyle}
              accessibilityRole="image"
              accessibilityLabel={isOpened ? 'Close dropdown' : 'Open dropdown'}
            />
          </View>
        )}
        renderItem={(item, index, isSelected) => (
          <View
            style={[
              styles.dropdownItemStyle,
              isSelected && styles.selectedItemStyle,
              dropdownItemStyle,
            ]}>
            <Text
              style={[styles.dropdownItemTxtStyle, dropdownItemTextStyle]}
              numberOfLines={1}>
              {item.title}
            </Text>
          </View>
        )}
        dropdownStyle={[styles.dropdownMenuStyle, dropdownStyle]}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  label: {
    fontFamily: AppConstants.FONT_POPPINS_REGULAR,
    fontSize: fontSizes.small,
    color: ColorConstants.APP_TEXT_LIGHT_COLOR,
  },
  dropdownButtonStyle: {
    // width: getResponsiveValue(350, 458, 588),
    height: getResponsiveValue(45, 50, 55),
    // backgroundColor: ColorConstants.INPUT_FIELD_ACTIVE_BG_COLOR,
    borderRadius: getResponsiveValue(40, 50, 60),
    flexDirection: 'row',
    alignItems: 'center',
    alignSelf: 'center',
    paddingHorizontal: spacing.large,
    marginVertical: spacing.small,
    marginBottom: spacing.large,
    borderWidth: 1,
    borderColor: ColorConstants.INACTIVE_TAB_COLOR,
  },
  dropdownButtonTxtStyle: {
    flex: 1,
    fontSize: fontSizes.large,
    fontFamily: AppConstants.FONT_POPPINS_REGULAR,
    color: '#151E26',
    marginHorizontal: spacing.small,
  },
  dropdownButtonArrowStyle: {
    width: getResponsiveValue(15, 20, 24),
    height: getResponsiveValue(15, 20, 24),
    resizeMode: 'contain',
    tintColor: ColorConstants.APP_TEXT_COLOR,
  },
  dropdownButtonImageStyle: {
    width: getResponsiveValue(30, 36, 40),
    height: getResponsiveValue(30, 36, 40),
    borderRadius: getResponsiveValue(15, 18, 20),
    marginRight: spacing.small,
    resizeMode: 'cover',
  },
  dropdownMenuStyle: {
    backgroundColor: '#E9ECEF',
    borderRadius: getResponsiveValue(8, 10, 12),
    width: deviceDimensions.width * (deviceDimensions.isTablet ? 0.7 : 0.9),
    maxHeight: deviceDimensions.height * 0.4,
  },
  dropdownItemStyle: {
    flexDirection: 'row',
    paddingHorizontal: spacing.medium,
    alignItems: 'center',
    paddingVertical: spacing.medium,
  },
  selectedItemStyle: {
    backgroundColor: ColorConstants.COLOR_YELLOW,
  },
  dropdownItemTxtStyle: {
    flex: 1,
    fontSize: fontSizes.medium,
    fontFamily: AppConstants.FONT_POPPINS_REGULAR,
    color: ColorConstants.APP_TEXT_COLOR,
  },
  dropdownItemImageStyle: {
    width: getResponsiveValue(30, 36, 40),
    height: getResponsiveValue(30, 36, 40),
    borderRadius: getResponsiveValue(15, 18, 20),
    marginRight: spacing.small,
    resizeMode: 'cover',
  },
});

export default DropDown;
