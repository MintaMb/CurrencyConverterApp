import React, {useState, useEffect} from 'react';
import {
  Image,
  TouchableOpacity,
  Dimensions,
  View,
  Keyboard,
  StyleProp,
  ViewStyle,
  StyleSheet,
} from 'react-native';
import images from '../resources/images';
// import ColorConstants from '../constants/ColorConstants';
import DimensionsValue from '../utils/DimensionsValue';
const {width} = Dimensions.get('window');

interface NavigationProp {
  navigate: (screenName: string, params?: object) => void;
}

interface StateProp {
  index: number;
}

interface BottomBarProps {
  state?: StateProp;
  navigation?: NavigationProp;
  isExpanded?: boolean;
  containerStyle?: StyleProp<ViewStyle>;
}

interface FooterItem {
  activeImage?: any;
  screenName?: string;
  customStyle?: StyleProp<ViewStyle>;
}

const data: FooterItem[] = [
  {activeImage: images.IC_HOME, screenName: 'CurrencyConversionScreen'},
  {
    activeImage: images.IC_HISTORY,
    screenName: 'CurrencyConversionHistoryScreen',
    customStyle: {marginEnd: DimensionsValue.VALUE_30},
  },
];

const BottomBar: React.FC<BottomBarProps> = ({
  state,
  navigation,
  isExpanded,
  containerStyle,
}: any) => {
  const [showFooterOptionModal, setShowFooterOptionModal] =
    useState<boolean>(false);
  const [keyboardStatus, setKeyboardStatus] = useState<boolean>(true);

  const tapOnFooterOptionModalButton = (type: string) => {
    setShowFooterOptionModal(false);
    // navigation.navigate(ScreenConstants.CREATE_POST_SCREEN, { type });
  };

  useEffect(() => {
    const showSubscription = Keyboard.addListener('keyboardDidShow', () => {
      setKeyboardStatus(false);
    });
    const hideSubscription = Keyboard.addListener('keyboardDidHide', () => {
      setKeyboardStatus(true);
    });

    return () => {
      showSubscription.remove();
      hideSubscription.remove();
    };
  }, []);

  return keyboardStatus ? (
    <View style={[styles.viewFooter, containerStyle]}>
      <View style={styles.imageBgFooter}>
        {data.map((elem, index) => {
          const isFocused = state.index === index;
          return (
            <TouchableOpacity
              key={index}
              style={[styles.touchContainerItem, elem.customStyle]}
              onPress={() => navigation.navigate(elem.screenName)}>
              <Image
                source={elem.activeImage}
                style={[
                  styles.imageIcon,
                  {
                    tintColor: isFocused ? '#1d1f2a' : '#a3a5a7',
                  },
                ]}
              />
              {isFocused && <View style={styles.viewActiveRedDot} />}
            </TouchableOpacity>
          );
        })}
      </View>
      {/* 
      <TouchableOpacity
        style={[styles.touchAdd, {backgroundColor: 'red'}]}
        onPress={() => setShowFooterOptionModal(true)}
        activeOpacity={1}>
        <Image
          source={images.IC_CALENDAR}
          style={isExpanded ? {transform: [{rotate: '45deg'}]} : undefined}
        />
      </TouchableOpacity> */}
    </View>
  ) : null;
};

export default BottomBar;

const styles = StyleSheet.create({
  containerView: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  touchContainerItem: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  imageIcon: {
    height: DimensionsValue.VALUE_20,
    width: DimensionsValue.VALUE_20,
    resizeMode: 'contain',
  },
  viewFooter: {
    flexDirection: 'row',
    justifyContent: 'center',
  },
  touchAdd: {
    position: 'absolute',
    zIndex: 999,
    height: width / 5.85,
    width: width / 5.85,
    bottom: width / 9.37,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: width / 5.85,
  },
  imageBgFooter: {
    width: '100%',
    alignSelf: 'center',
    flexDirection: 'row',
    height: width / 5.35,
    backgroundColor: '#fff',
  },
  viewActiveRedDot: {
    position: 'absolute',
    height: 5,
    width: 5,
    borderRadius: 5,
    backgroundColor: '#ce001b',
    bottom: DimensionsValue.VALUE_16,
  },
});
