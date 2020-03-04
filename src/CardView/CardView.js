import React from 'react'
import PropTypes from 'prop-types'
import {
  View,
  ImageBackground,
  Image,
  Text,
  Platform,
} from 'react-native'

import defaultIcons from '../Icons'
import FlipCard from 'react-native-flip-card'
import s from './styles'

const BASE_SIZE = { width: 300, height: 190 }

const propTypes = {
  focused: PropTypes.string,

  brand: PropTypes.string,
  name: PropTypes.string,
  number: PropTypes.string,
  expiry: PropTypes.string,
  cvc: PropTypes.string,
  placeholder: PropTypes.object,

  scale: PropTypes.number,
  fontFamily: PropTypes.string,
  imageFront: PropTypes.number,
  imageBack: PropTypes.number,
  customIcons: PropTypes.object,
}

const defaultProps = {
  name: '',
  placeholder: {
    number: '•••• •••• •••• ••••',
    name: 'NAME',
    expiryTitle: 'MONTH/YEAR',
    expiry: '••/••',
    cvc: '•••',
  },

  scale: 1,
  fontFamily: Platform.select({ ios: 'Courier', android: 'monospace' }),
  imageFront: require('../images/card-front.png'),
  imageBack: require('../images/card-back.png'),
}

const CardView = props => {
  const {
    focused,
    brand,
    name,
    number,
    expiryTitle,
    expiry,
    cvc,
    customIcons,
    placeholder,
    imageFront,
    imageBack,
    scale,
    fontFamily,
    style
  } = props

  const Icons = { ...defaultIcons, ...customIcons }
  const isAmex = brand === 'american-express'
  const shouldFlip = () => !isAmex && focused === 'cvc'

  const containerSize = { ...BASE_SIZE, height: BASE_SIZE.height * scale }
  const transform = {
    transform: [
      { scale },
      { translateY: ((BASE_SIZE.height * (scale - 1) / 2)) },
    ]
  }

  const baseSyle = [s.baseText, { fontFamily }]

  const isFocused = type => focused === type && s.focused

  return (
    <View style={[s.cardContainer, containerSize, style]}>
      <FlipCard
        style={{ borderWidth: 0 }}
        flipHorizontal
        flipVertical={false}
        friction={10}
        perspective={2000}
        clickable={false}
        flip={shouldFlip()}
      >
        <ImageBackground
          style={[BASE_SIZE, s.cardFace, transform]}
          source={imageFront}
        >
          <Image
            style={[s.icon]}
            source={Icons[brand]}
          />
          <Text style={[...baseSyle, s.number, !number && s.placeholder, isFocused('number')]}>
            {!number ? placeholder.number : number}
          </Text>
          <Text
            style={[...baseSyle, s.name, !name && s.placeholder, isFocused('name')]}
            numberOfLines={1}
          >
            {!name ? placeholder.name : name.toUpperCase()}
          </Text>
          <Text style={[s.baseText, { fontFamily }, s.expiryLabel, !expiryTitle && s.placeholder, focused === 'expiry' && s.focused]}>
            {!expiryTitle ? placeholder.expiryTitle : expiryTitle.toUpperCase()}
          </Text>
          <Text style={[...baseSyle, s.expiry, !expiry && s.placeholder, isFocused('expiry')]}>
            {!expiry ? placeholder.expiry : expiry}
          </Text>
          {isAmex && (
            <Text style={[...baseSyle, s.amexCVC, !cvc && s.placeholder, isFocused('cvc')]}>
              {!cvc ? placeholder.cvc : cvc}
            </Text>
          )}
        </ImageBackground>
        <ImageBackground
          style={[BASE_SIZE, s.cardFace, transform]}
          source={imageBack}
        >
          <Text style={[s.baseText, s.cvc, !cvc && s.placeholder, isFocused('cvc')]}>
            {!cvc ? placeholder.cvc : cvc}
          </Text>
        </ImageBackground>
      </FlipCard>
    </View>
  )
}

CardView.defaultProps = defaultProps
CardView.propTypes = propTypes


export default CardView
