import React, { Component } from "react";
import PropTypes from "prop-types";
import ReactNative, {
  NativeModules,
  View,
  Text,
  StyleSheet,
  ScrollView,
  Dimensions,
  ViewPropTypes,
  TextInput,
  KeyboardAvoidingView
} from "react-native";

import CreditCard from "./CardView/CardView";
import CCInput from "./CCInput";
import { InjectedProps } from "./connectToState";

const s = StyleSheet.create({
  container: {
    alignItems: "center",
  },
  form: {
    marginHorizontal: 20,
    marginVertical: 20,
  },
  inputContainer: {
    marginLeft: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  inputContainerVertical: {
    marginLeft: 0,
    marginTop: 5,
    marginBottom: 5,
  },
  inputLabel: {
    fontWeight: "bold",
  },
  input: {
    height: 40,
  },
});

const CVC_INPUT_WIDTH = 70;
const EXPIRY_INPUT_WIDTH = CVC_INPUT_WIDTH;
const CARD_NUMBER_INPUT_WIDTH_OFFSET = 40;
const CARD_NUMBER_INPUT_WIDTH = Dimensions.get("window").width * 0.5;
const NAME_INPUT_WIDTH = CARD_NUMBER_INPUT_WIDTH;
const PREVIOUS_FIELD_OFFSET = 40;
const POSTAL_CODE_INPUT_WIDTH = 120;
const VERTICAL_INPUT_DEFAULT_WIDTH = Dimensions.get("window").width * 0.75;

/* eslint react/prop-types: 0 */ // https://github.com/yannickcr/eslint-plugin-react/issues/106
export default class CreditCardInput extends Component {
  static propTypes = {
    ...InjectedProps,
    labels: PropTypes.object,
    placeholders: PropTypes.object,

    labelStyle: Text.propTypes.style,
    // inputStyle: Text.propTypes.style,
    inputStyle: TextInput.propTypes.style,
    inputContainerStyle: ViewPropTypes.style,

    validColor: PropTypes.string,
    invalidColor: PropTypes.string,
    placeholderColor: PropTypes.string,
    values: PropTypes.object,
    cardImageFront: PropTypes.number,
    cardImageBack: PropTypes.number,
    cardScale: PropTypes.number,
    cardFontFamily: PropTypes.string,
    cardBrandIcons: PropTypes.object,

    allowScroll: PropTypes.bool,

    additionalInputsProps: PropTypes.objectOf(PropTypes.shape(TextInput.propTypes)),

    horizontal: PropTypes.bool,
  };

  static defaultProps = {
    cardViewSize: {},
    labels: {
      name: "NAME",
      number: "CARD NUMBER",
      expiry: "EXPIRY",
      cvc: "CVC/CCV",
      postalCode: "POSTAL CODE",
    },
    placeholders: {
      name: "Full name",
      number: "1234 5678 1234 5678",
      expiry: "MM/YY",
      cvc: "CVC",
      postalCode: "34567",
    },
    inputContainerStyle: {
      borderBottomWidth: 1,
      borderBottomColor: "black",
    },
    validColor: "",
    invalidColor: "red",
    placeholderColor: "gray",
    allowScroll: false,
    additionalInputsProps: {},
    horizontal: true,
  };

  componentDidMount = () => this._focus(this.props.focused);

  componentDidUpdate(prevProps) {
    if (prevProps.focused !== this.props.focused) this._focus(this.props.focused);
  }

  _focus = field => {
    if (!field) return;

    const scrollResponder = this.refs.Form.getScrollResponder();
    const nodeHandle = ReactNative.findNodeHandle(this.refs[field]);

    NativeModules.UIManager.measureLayoutRelativeToParent(nodeHandle,
      e => { throw e; },
      x => {
        scrollResponder.scrollTo({ x: Math.max(x - PREVIOUS_FIELD_OFFSET, 0), animated: true });
        this.refs[field].focus();
      });
  }

  _inputProps = field => {
    const {
      inputStyle,
      labelStyle,
      validColor,
      invalidColor,
      placeholderColor,
      placeholders,
      labels,
      values,
      status,
      onFocus,
      onChange,
      onBecomeEmpty,
      onBecomeValid,
      additionalInputsProps,
    } = this.props;

    return {
      inputStyle: [s.input, inputStyle],
      labelStyle: [s.inputLabel, labelStyle],
      validColor, invalidColor, placeholderColor,
      ref: field, field,

      label: labels[field],
      placeholder: placeholders[field],
      value: values[field],
      status: status[field],

      onFocus, onChange, onBecomeEmpty, onBecomeValid,

      additionalInputProps: additionalInputsProps[field],
    };
  };

  render() {
    const {
      cardImageFront,
      cardImageBack,
      inputContainerStyle,
      values: { number, expiry, cvc, name, type },
      focused,
      placeholderCardView,
      allowScroll,
      requiresName,
      requiresCVC,
      requiresPostalCode,
      cardScale,
      cardFontFamily,
      cardBrandIcons,
      horizontal
    } = this.props;

    return (
      <KeyboardAvoidingView style={s.container} behavior="padding" enabled>
        <CreditCard
          focused={focused}
          brand={type}
          scale={cardScale}
          fontFamily={cardFontFamily}
          imageFront={cardImageFront}
          imageBack={cardImageBack}
          customIcons={cardBrandIcons}
          placeholder={placeholderCardView}
          name={requiresName ? name : " "}
          number={number}
          expiry={expiry}
          cvc={cvc}
        />
        <ScrollView
          ref="Form"
          horizontal={horizontal}
          keyboardShouldPersistTaps="always"
          scrollEnabled={allowScroll}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          style={s.form}
        >
          {requiresName && (
              <CCInput
                {...this._inputProps("name")}
                containerStyle={[horizontal ? s.inputContainer : s.inputContainerVertical, inputContainerStyle, { width: horizontal ? NAME_INPUT_WIDTH : VERTICAL_INPUT_DEFAULT_WIDTH }]}
              />
            )}
            <CCInput
              {...this._inputProps("number")}
              keyboardType="numeric"
              containerStyle={[horizontal ? s.inputContainer : s.inputContainerVertical, inputContainerStyle, { width: horizontal ?  CARD_NUMBER_INPUT_WIDTH : VERTICAL_INPUT_DEFAULT_WIDTH }]}
            />
            <CCInput
              {...this._inputProps("expiry")}
              keyboardType="numeric"
              containerStyle={[horizontal ? s.inputContainer : s.inputContainerVertical, inputContainerStyle, {width: horizontal ? EXPIRY_INPUT_WIDTH : VERTICAL_INPUT_DEFAULT_WIDTH}]}
            />
            {requiresCVC && (
              <CCInput
                {...this._inputProps("cvc")}
                keyboardType="numeric"
                containerStyle={[horizontal ? s.inputContainer : s.inputContainerVertical, inputContainerStyle, { width: horizontal ? CVC_INPUT_WIDTH : VERTICAL_INPUT_DEFAULT_WIDTH }]}
              />
            )}
            {requiresPostalCode && (
              <CCInput
                {...this._inputProps("postalCode")}
                keyboardType="numeric"
                containerStyle={[horizontal ? s.inputContainer : s.inputContainerVertical, inputContainerStyle, { width: horizontal ?  POSTAL_CODE_INPUT_WIDTH : VERTICAL_INPUT_DEFAULT_WIDTH }]}
              />
            )}
        </ScrollView>
      </KeyboardAvoidingView>
    );
  }
}
