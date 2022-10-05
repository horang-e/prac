import React, { useState, useMemo } from 'react';
import { Modal, View, Text, Button, StyleSheet } from 'react-native';


function Gap() {
  return <View style={styles.gap} />;
}

// 원래 그냥 뜨는 모달, 위로 슬라이드 올라오는 모달, 페이드 되는 모달이 있음 애니메이션 타입으로 설정가능 모달 태그 안에 뷰태그로 내용 보이게 가능 비지블 설정으로 보이고 안보이고 설정
//애니메이션 타입 프롭스설정 으로 아래서 사용 가능하게 만들어둠!
function AnimatedModal({ animationType1 }) {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button
        onPress={() => setIsVisible(true)}
        title={`Animation '${animationType1}'`}
      />
      <Modal
        animationType={animationType1}
        onRequestClose={() => setIsVisible(false)}
        visible={isVisible}
      >
        <View style={styles.container}>
          <Text>Modal with "animationType" of "{animationType1}"</Text>
          <Gap />
          <Button onPress={() => setIsVisible(false)} title={'Close Modal'} />
        </View>
      </Modal>
    </>
  );
}

function AnimatedModalStack() {
  return (
    <>
      <AnimatedModal animationType1={'none'} />
      <Gap />
      <AnimatedModal animationType1={'slide'} />
      <Gap />
      <AnimatedModal animationType1={'fade'} />
    </>
  );
}

// 랜덤한 위치에 모달창이 추가로 생성될 수 있도록 해주는 함수
const WIGGLE_ROOM = 128;

function Modalception({ depth = 1 }) {
  const [isVisible, setIsVisible] = useState(false);

  const offset = useMemo(() => {
    return {
      top: Math.random() * WIGGLE_ROOM - WIGGLE_ROOM / 2,
      left: Math.random() * WIGGLE_ROOM - WIGGLE_ROOM / 2
    };
  }, []);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Open modal'} />
      <Modal
        onRequestClose={() => setIsVisible(false)}
        transparent
        visible={isVisible}
      >
        <View style={[styles.containeralt, offset]}>
          <Text>This is in Modal {depth}</Text>
          <Gap />
          {isVisible ? <Modalception depth={depth + 1} /> : null}
          <Gap />
          <Button
            color="red"
            onPress={() => setIsVisible(false)}
            title={'Close'}
          />
        </View>
      </Modal>
    </>
  );
}

function SimpleModal() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Simple modal'} />
      <Modal onRequestClose={() => setIsVisible(false)} visible={isVisible}>
        <View style={styles.container}>
          <Text>Hello, World!</Text>
          <Gap />
          <Button onPress={() => setIsVisible(false)} title={'Close'} />
        </View>
      </Modal>
    </>
  );
}

function TransparentModal() {
  const [isVisible, setIsVisible] = useState(false);

  return (
    <>
      <Button onPress={() => setIsVisible(true)} title={'Transparent modal'} />
      <Modal
        onRequestClose={() => setIsVisible(false)}
        transparent
        visible={isVisible}
      >
        <View style={styles.containeralt}>
          <Text style={{ textAlign: 'center' }}>
            Modal with "transparent" value
          </Text>
          <Gap />
          <Button onPress={() => setIsVisible(false)} title={'Close'} />
        </View>
      </Modal>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center'
  },
  containeralt: {
    alignItems: 'center',
    backgroundColor: 'white',
    borderColor: '#eee',
    borderRadius: 10,
    borderWidth: 1,
    justifyContent: 'center',
    height: 300,
    margin: 'auto',
    padding: 30,
    width: 300
  },
  gap: {
    height: 10
  }
});

export default function ModalPage() {
  return (
    <>
      <Gap />
      <SimpleModal />
      <Gap />
      <TransparentModal />
      <Gap />
      <AnimatedModalStack />
      <Gap />
      <Modalception />
    </>
  );
}
