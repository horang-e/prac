import React from 'react';
import {
  Button,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

// 데이터 map돌리려고 생성한 아이템 목록
const ITEMS = [...Array(12)].map((_, i) => `아이템 ${i}`);
//맵 돌렸을 때 모양 미리 짜둠
function createItemRow(msg, index) {
  return (
    <TouchableOpacity key={index} style={[styles.item]}>
      <Text style={styles.text}>{msg}</Text>
    </TouchableOpacity>
  );
}

function Divider() {
  return <View style={styles.divider} />;
}

export default function ScrollViewPage() {
  //  스크롤 가능 여부 설정 가능 
  const [scrollEnabled, setEnabled] = React.useState(true);
  const [throttle, setThrottle] = React.useState(16);
  //스크롤 해서 맨위 아래로 혹은 원하는 위치로 이동 가능! 예를 들면 쇼핑몰페이지에서 리뷰보기 누르면 리뷰쪽 스크롤로 한번에 이동 가능한것 처럼 코딩도 가능
  const scrollRef = React.useRef(null);

  return (
    <>
      <View style={styles.container}>
        <View>***맵 모양 나옴***</View>
        <ScrollView
          onScroll={() => {
            console.log('onScroll');
          }}
          ref={scrollRef}
          scrollEnabled={scrollEnabled}
          scrollEventThrottle={throttle}
          style={[styles.scrollView, !scrollEnabled && styles.disabled]}
          //한 개체 넘어갈 때 마다 자동으로 전체 스크롤됨
          pagingEnabled='true'
        >
          {ITEMS.map(createItemRow)}
        </ScrollView>

        <View style={styles.buttons}>
          <Button
            onPress={() => {
              setEnabled((val) => !val);
            }}
            title={scrollEnabled ? 'Disable' : 'Enable'}
          />
          <Divider />
          <Button
            onPress={() => {
              setThrottle((val) => (val !== 16 ? 16 : 1000));
            }}
            title="Throttle"
          />
        </View>
        <View style={styles.buttons}>
          <Button
            onPress={() => {
              scrollRef.current.scrollTo({ y: 0 });
            }}
            title="To start"
          />
          <Divider />
          <Button
            onPress={() => {
              scrollRef.current.scrollTo({ y: 50 });
            }}
            title="To 50px"
          />
          <Divider />
          <Button
            onPress={() => {
              scrollRef.current.scrollToEnd({ animated: true });
            }}
            title="To end"
          />
        </View>
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    alignSelf: 'stretch'
  },
  scrollView: {
    backgroundColor: '#eeeeee',
    maxHeight: 250
  },
  disabled: {
    opacity: 0.5
  },
  item: {
    margin: 5,
    padding: 5,
    backgroundColor: '#cccccc',
    borderRadius: 3,
    minWidth: 96
  },
  text: {
    fontSize: 16,
    fontWeight: 'bold',
    margin: 5
  },
  buttons: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginVertical: '1rem'
  },
  divider: {
    width: '1rem'
  }
});
