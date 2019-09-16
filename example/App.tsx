import React, { useState } from 'react'
import { StyleSheet, View, Switch, Text } from 'react-native'
import { CreditCardInput, LiteCreditCardInput } from 'react-native-credit-card-input'

const s = StyleSheet.create({
  switch: {
    alignSelf: 'center',
    marginTop: 20,
    marginBottom: 20,
  },
  container: {
    backgroundColor: '#F5F5F5',
    marginTop: 60,
  },
  label: {
    color: 'black',
    fontSize: 12,
  },
  input: {
    fontSize: 16,
    color: 'black',
  },
})
export default function App() {
  const [useLiteVersion, setUseLiteVersion] = useState(true)


  const onChange = formData => {
    console.warn(formData)
  }

  const onFocus = field => {
    console.warn('focusing', field)
  }

  const setUseLiteCreditCardInput = useLiteVersion => {
    setUseLiteVersion(useLiteVersion)
  }

  return (
    <View>
      <Switch
        style={s.switch}
        onValueChange={setUseLiteCreditCardInput}
        value={useLiteVersion}
      />

      {useLiteVersion ? (
        <LiteCreditCardInput
          autoFocus
          inputStyle={s.input}

          validColor='black'
          invalidColor='red'
          placeholderColor='darkgray'

          onFocus={onFocus}
          onChange={onChange}
        />
      ) : (
          <CreditCardInput
            autoFocus

            requiresName
            requiresCVC
            requiresPostalCode

            labelStyle={s.label}
            inputStyle={s.input}
            validColor='black'
            invalidColor='red'
            placeholderColor='darkgray'

            onFocus={onFocus}
            onChange={onChange}
          />
        )}
    </View>
  )
}
