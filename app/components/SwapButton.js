import React, {useState} from 'react';
import {StyleSheet} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {PanGestureHandler,GestureHandlerRootView} from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useSharedValue,
  useAnimatedStyle,
  withSpring,
  interpolate,
  interpolateColor,
  runOnJS,
} from 'react-native-reanimated';

import { COLORS, FONTS, SIZES } from '../constants/theme';
import { useTheme } from '@react-navigation/native';

const BUTTON_WIDTH = SIZES.width - 70;
const BUTTON_HEIGHT = 48;
const BUTTON_PADDING = 4;
const SWIPEABLE_DIMENSIONS = BUTTON_HEIGHT - 2 * BUTTON_PADDING;

const H_WAVE_RANGE = SWIPEABLE_DIMENSIONS + 2 * BUTTON_PADDING + 85;
const H_SWIPE_RANGE = BUTTON_WIDTH - 2 * BUTTON_PADDING - 124;
const AnimatedLinearGradient = Animated.createAnimatedComponent(LinearGradient);

const SwapeButton = ({scroll,onToggle,...props}) => {

  const {colors} = useTheme();

  // Animated value for X translation
  const X = useSharedValue(0);
  // Toggled State
  const [toggled, setToggled] = useState(false);

  // Fires when animation ends
  const handleComplete = (isToggled) => {
    if (isToggled !== toggled) {
      setToggled(isToggled);
      onToggle(isToggled);
    }
  };

  const handleScrollDisabled = (isScroll) => {
      scroll(isScroll);
  };
  const handleScrollEnabled = (isScroll) => {
      scroll(isScroll);
  };

  // Gesture Handler Events
  const animatedGestureHandler = useAnimatedGestureHandler({
    onStart: (_, ctx) => {
      ctx.completed = toggled;
      runOnJS(handleScrollDisabled)(false);
    },
    onActive: (e, ctx) => {
      let newValue;
      if (ctx.completed) {
        newValue = H_SWIPE_RANGE + e.translationX;
      } else {
        newValue = e.translationX;
      }

      if (newValue >= 0 && newValue <= H_SWIPE_RANGE) {
        X.value = newValue;
      }
    },
    onEnd: () => {
      if (X.value < BUTTON_WIDTH / 2 - SWIPEABLE_DIMENSIONS / 2) {
        X.value = withSpring(0);
        runOnJS(handleComplete)(false);
      } else {
        X.value = withSpring(H_SWIPE_RANGE);
        runOnJS(handleComplete)(true);
      }
      runOnJS(handleScrollEnabled)(true);
    },
  });

  const InterpolateXInput = [0, H_SWIPE_RANGE];
  const AnimatedStyles = {
    swipeCont: useAnimatedStyle(() => {
      return {};
    }),
    colorWave: useAnimatedStyle(() => {
      return {
        width: H_WAVE_RANGE + X.value,

        opacity: interpolate(X.value, InterpolateXInput, [0, 1]),
      };
    }),
    swipeable: useAnimatedStyle(() => {
      return {
        backgroundColor: interpolateColor(
          X.value,
          [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING - 70],
          [COLORS.primary, '#fff'],
        ),
        transform: [{translateX: X.value}],
      };
    }),
    swipeableText: useAnimatedStyle(() => {
        return {
          color: interpolateColor(
            X.value,
            [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING - 70],
            ['#fff', COLORS.success],
          ),
        };
      }),
      swipeableIcon: useAnimatedStyle(() => {
        return {
          tintColor: interpolateColor(
            X.value,
            [0, BUTTON_WIDTH - SWIPEABLE_DIMENSIONS - BUTTON_PADDING - 70],
            ['#fff', COLORS.success],
          ),
        };
    }),
  };

  return (
      <GestureHandlerRootView>
        <Animated.View style={[styles.swipeCont, AnimatedStyles.swipeCont,{backgroundColor:colors.background}]}>
			<AnimatedLinearGradient
				style={[AnimatedStyles.colorWave, styles.colorWave]}
				colors={[COLORS.success, COLORS.success]}
				start={{x: 0.0, y: 0.5}}
				end={{x: 1, y: 0.5}}
			/>
			<PanGestureHandler onGestureEvent={animatedGestureHandler}>
				<Animated.View style={[styles.swipeable, AnimatedStyles.swipeable]}>
					<Animated.Text style={[AnimatedStyles.swipeableText,{...FONTS.font,...FONTS.fontBold,fontSize:15,marginRight:2}]}>{props.title}</Animated.Text>
					{/* <Animated.Image style={[AnimatedStyles.swipeableIcon,{
						height:20,
						width:20,
					}]} source={right}/> */}
				</Animated.View>
			</PanGestureHandler>
        </Animated.View>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  swipeCont: {
    height: BUTTON_HEIGHT,
    width: BUTTON_WIDTH,
    borderRadius: BUTTON_HEIGHT,
    padding: BUTTON_PADDING,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
  },
  colorWave: {
    position: 'absolute',
    left: 0,
    height: BUTTON_HEIGHT,
    borderRadius: BUTTON_HEIGHT,
  },
  swipeable: {
    position: 'absolute',
    alignItems:'center',
    flexDirection:'row',
    justifyContent:'center',
    left: BUTTON_PADDING,
    height: SWIPEABLE_DIMENSIONS,
    width: 124,
    borderRadius: SWIPEABLE_DIMENSIONS,
    zIndex: 3,
  },
  swipeText: {
    alignSelf: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    zIndex: 2,
    color: '#1b9aaa',
  },
});


export default SwapeButton;