import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import BottomBar from '../library/components/BottomBar';
import ScreenConstants from '../library/constants/ScreenConstants';
import DashboardScreen from '../containers/DashboardScreen';
import FeedScreen from '../containers/FeedScreen';
import SearchScreen from '../containers/SearchScreen';
import ContactScreen from '../containers/ContactScreen';

const BottomTab = ({route}: any) => {
  const Tab = createBottomTabNavigator();

  console.log(route, 'BottomTab');

  // const {userInfo} = useSelector((state: RootState) => state.userData);

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
      }}
      tabBar={props => <BottomBar {...props} />}>
      <Tab.Screen
        name={ScreenConstants.DASHBOARD_SCREEN }
        component={DashboardScreen}
      />
      {/* <Tab.Screen name={ScreenConstants.HOME_SCREEN} component={HomeScreen} /> */}
 
        <Tab.Screen
          name={ScreenConstants.FEED_SCREEN}
          component={FeedScreen}
        />
     
      <Tab.Screen
        name={ScreenConstants.SEARCH_SCREEN}
        component={SearchScreen}
      />
      
        <Tab.Screen name={ScreenConstants.CONTACT_SCREEN} component={ContactScreen} />
   
   
    </Tab.Navigator>
  );
};

export default BottomTab;
