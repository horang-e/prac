import { CheckBox, StyleSheet, View } from 'react-native';
import React from 'react';

// 디바이더 설정해서 중간에 한줄 띄기 설정 함수로 표현
function Divider() {
  return <View style={styles.divider} />;
}

export default function CheckboxPage() {
  const [checked, setChecked] = React.useState(true);

  // 2.5초에 한번씩 체크여부 변하게 설정 인터벌로
  React.useEffect(() => {
    const interval = setInterval(() => {
      setChecked(!checked);
    }, 2500);
    // useEffect 청소
    return () => {
      clearInterval(interval);
    };
  }, [checked]);

  return (
    <>
      <View style={styles.row}>
        <CheckBox 
         disabled
         style={styles.item} 
         value={false} />
        <Divider />
        <CheckBox 
          disabled 
          style={styles.item}
          value={true} />
        <Divider />
        <CheckBox 
        accessibilityReadOnly 
        style={styles.item} value={true} />
      </View>
      <View style={styles.row}>
        <CheckBox value={false} />
        <Divider />
        <CheckBox value={true} />
      </View>
      <View style={styles.row}>
        <CheckBox color="#1DA1F2" value={true} />
        <Divider />
        <CheckBox color="#17BF63" value={true} />
        <Divider />
        <CheckBox color="#FFAD1F" value={true} />
        <Divider />
        <CheckBox color="#F45D22" value={true} />
        <Divider />
        <CheckBox color="#794BC4" value={true} />
        <Divider />
        <CheckBox color="#E0245E" value={true} />
      </View>
      <View style={styles.row}>
        <CheckBox
          color="#1DA1F2"
          style={{ height: 32, width: 32 }}
          value={checked}
        />
      </View>
      </>
  );
}

const styles = StyleSheet.create({
  row: {
    alignItems: 'center',
    flexDirection: 'row',
    marginVertical: 20
  },
  divider: {
    width: 10
  }
});
