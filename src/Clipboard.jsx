import { Button, Clipboard, StyleSheet, TextInput, View } from 'react-native';
import React from 'react';
import { Appearance } from 'react-native-web';


export default function ClipboardPage() {
  const setString = () => {
    const success = Clipboard.setString(
      '이것은 복사 붙여넣기 클립보드입니다'
    );
    const darkmode = Appearance.getColorScheme('dark')
    console.log(`Clipboard.setString success? ${success}`);
    console.log(`darkmode.setString success? ${darkmode}`);
  };

  return (
    <>
      <View style={styles.buttonBox}>
        <Button onPress={setString} title="Copy to clipboard" />
      </View>
      <TextInput
        multiline={true}
        placeholder={'Try pasting here afterwards'}
        style={styles.textInput}
      />
    </>
  );
}

const styles = StyleSheet.create({
  buttonBox: {
    maxWidth: 300,
    marginTop: '1rem'
  },
  textInput: {
    borderColor: '#AAB8C2',
    borderWidth: 1,
    height: 50,
    marginTop: 20,
    padding: 5
  }
});
