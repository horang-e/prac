import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  View,
  Text,
  Pressable
} from 'react-native';


export default function PressablePage() {
  // 이벤트 로드로 호버여부 보여주는데 배열형태로 가져와서 맵 돌리는 것 같음
  const [eventLog, updateEventLog] = React.useState([]);
  const [disabled, setDisabled] = React.useState(false);
  const [delay, setDelay] = React.useState(0);

  // 이벤트 핸들링 온블러, 호버, 등의 마우스 이벤트 컨트롤 
  const handleEvent = (eventName) => {
    return () => {
      const limit = 10;
      updateEventLog((state) => {
        const nextState = state.slice(0, limit - 1);
        nextState.unshift(eventName);
        return nextState;
      });
    };
  };

  return (
    <>
      <View style={styles.container}>
        <Pressable
          accessibilityRole="button"
          delayLongPress="750"
          delayPressIn={delay}
          delayPressOut={delay}
          disabled={disabled}
          // 마우스 클릭이 칸을 벗어남
          onBlur={handleEvent('onBlur')}
          // 마우스 클릭이 칸을 클릭함
          onFocus={handleEvent('onFocus')}
          //마우스가 칸 내부에 진입함
          onHoverIn={handleEvent('onHoverIn')}
          //마우스가 칸 내부에서 벗어남
          onHoverOut={handleEvent('onHoverOut')}
          onKeyDown={(e) => {
            console.log(e.key);
          }}
          //길게 클릭 했을 시 발생하는 이벤트임
          onLongPress={handleEvent('onLongPress - 750ms delay')}
          onPress={handleEvent(`onPress - ${delay}ms delay`)}
          onPressIn={handleEvent(`onPressIn - ${delay}ms delay`)}
          onPressOut={handleEvent(`onPressOut - ${delay}ms delay`)}
          // 이벤트 상태에 따른 스테이트 설정 가능
          style={(state) => [
            styles.pressable,
            // disable되지 않았으며 focus인 상태일 때 focused 스타일 적용
            !disabled && state.focused && styles.focused,
            // disable되지 않았으며 hover인 상태일 때 hoverd 스타일 적용
            !disabled && state.hovered && styles.hovered,
            // disable되지 않았으며 press인 상태일 때 pressed 스타일 적용
            !disabled && state.pressed && styles.pressed,
            //  disable상태일 때 disable 스타일 적용
            disabled && styles.disabled
          ]}
        >
          <Text>Pressable</Text>
        </Pressable>

        <View style={styles.buttons}>
          <Button
            onPress={() => setDisabled((state) => !state)}
            title={disabled ? 'Enable' : 'Disable'}
          />
          <View style={{ width: '1rem' }} />
          <Button
          // 딜레이가 0 일때 350 0이외의 문장일때 0으로 변환시켜줌 그에따라 버튼의 이름도 변경 가능 
            onPress={() => setDelay((state) => (state === 0 ? 350 : 0))}
            title={delay === 0 ? 'Add delay' : 'Remove delay'}
          />
        </View>
          
        <ScrollView style={styles.eventLogBox}>
          {eventLog.map((e, i) => (
            <Text key={i}>{e}</Text>
          ))}
        </ScrollView>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    maxWidth: 500,
    padding: '1rem',
    width: '100%'
  },
  pressable: {
    borderRadius: 5,
    padding: 10,
    borderWidth: 1,
    outlineWidth: 0,
    backgroundColor: '#fff'
  },
  hovered: {
    backgroundColor: '#ddd'
  },
  focused: {
    boxShadow: '0px 0px 0px 1px blue'
  },
  pressed: {
    backgroundColor: 'lightblue'
  },
  disabled: {
    opacity: 0.5
  },
  buttons: {
    flexDirection: 'row',
    marginVertical: '1rem'
  },
  eventLogBox: {
    padding: 10,
    height: 120,
    borderWidth: StyleSheet.hairlineWidth,
    borderColor: '#f0f0f0',
    backgroundColor: '#f9f9f9'
  }
});
