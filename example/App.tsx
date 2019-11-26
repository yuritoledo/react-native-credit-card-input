import React, { useState } from 'react'
import { StyleSheet, View, Switch } from 'react-native'
import { CreditCardInput, LiteCreditCardInput } from 'react-native-input-credit-card'

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
    console.log(formData)
  }

  const onFocus = field => {
    console.log('focusing', field)
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
          inputStyle={s.input}

          validColor='black'
          invalidColor='red'
          placeholderColor='darkgray'

          onFocus={onFocus}
          onChange={onChange}
        />
      ) : (
        <CreditCardInput
          requiresName
          requiresCVC
          labels={{
            name: 'NOME',
            number: 'NÚMERO DO CARTÃO',
            expiry: 'EXPIRA EM HAKUNA MATATA',
            cvc: 'CVC/CCV',
            postalCode: 'POSTAL CODE',
          }}
          placeholders={{
            name: 'NOME COMPLETO',
            number: '1111 2222 3333 4444',
            expiry: 'MM/AA',
            cvc: 'CVC',
            postalCode: '3211',
          }}
          labelStyle={s.label}
          inputStyle={s.input}
          validColor='black'
          invalidColor='red'
          placeholderColor='darkgray'
          allowScroll
          onFocus={onFocus}
          onChange={onChange}
        />
      )}
    </View>
  )
}
