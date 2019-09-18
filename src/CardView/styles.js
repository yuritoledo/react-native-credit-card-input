import {
  StyleSheet,
} from 'react-native'


const styles = StyleSheet.create({
  cardContainer: {},
  cardFace: {},
  icon: {
    position: 'absolute',
    top: 15,
    right: 15,
    width: 60,
    height: 40,
  },
  baseText: {
    color: 'rgba(255, 255, 255, 0.8)',
    backgroundColor: 'transparent',
  },
  placeholder: {
    color: 'rgba(255, 255, 255, 0.5)',
  },
  focused: {
    fontWeight: 'bold',
    color: 'rgba(255, 255, 255, 1)',
  },
  number: {
    fontSize: 21,
    position: 'absolute',
    top: 95,
    left: 28,
  },
  name: {
    fontSize: 16,
    position: 'absolute',
    bottom: 20,
    left: 25,
    right: 100,
  },
  expiryLabel: {
    fontSize: 9,
    position: 'absolute',
    bottom: 40,
    left: 218,
  },
  expiry: {
    fontSize: 16,
    position: 'absolute',
    bottom: 20,
    left: 220,
  },
  amexCVC: {
    fontSize: 16,
    position: 'absolute',
    top: 73,
    right: 30,
  },
  cvc: {
    fontSize: 16,
    position: 'absolute',
    top: 80,
    right: 30,
  },
})


export default styles
