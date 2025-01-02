import {Dimensions, StyleSheet} from 'react-native';
import ColorConstants from '../../constants/ColorConstants';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // backgroundColor: 'red',
  },
  header: {
    color: ColorConstants.BLACK,
    textAlign: 'center',
  },
  dropdown: {
    height: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
  switchIOS: {
    transform: [{scaleX: 0.8}, {scaleY: 0.8}], // Optional: Adjust the size
    shadowColor: 'transparent', // Remove iOS shadow color
    shadowOpacity: 0, // Disable shadow opacity
    shadowRadius: 0, // No blur effect
  },
  switchAndroid: {
    elevation: 0, // Remove Android shadow (elevation)
  },
});

export default styles;
