<script setup>
import { ref, watch, watchEffect } from "vue";
import {
  checkContactNumer,
  checkEmailValidity,
  checkUsernameValidity,
  checkPasswordValidity,
  checkConfirmPassword,
} from "./inputValidation";

const props = defineProps([
  "isFullnameFocus",
  "isBirthyearFocus",
  "isGenderFocus",
  "contact",
  "countryCode",
  "isContactFocus",
  "isAddressFocus",
  "email",
  "isEmailFocus",
  "username",
  "isUsernameFocus",
  "password",
  "isPasswordFocus",
  "passwordComp",
  "confirm_password",
  "isConfirmPasswordFocus",
]);

const validNumberLength = ref(false);
const validEmail = ref(false);
const whiteSpase = ref(false);
const validLength = ref(false);
const upperCase = ref(false);
const lowerCase = ref(false);
const containsNumber = ref(false);
const containsSymbol = ref(false);
const confirmPassword = ref(false);

//  todo: refactor if can \|/
watchEffect(() => {
  if (props.contact) {
    validNumberLength.value = checkContactNumer(props.contact, props.countryCode);
  }
  if (props.email) {
    validEmail.value = checkEmailValidity(props.email);
  }

  if (props.username) {
    const bool = checkUsernameValidity(props.username);
    whiteSpase.value = bool.hasWhiteSpase;
    validLength.value = bool.notValidLength;
  }
  if (props.password) {
    const bool = checkPasswordValidity(props.password);
    whiteSpase.value = bool.hasWhiteSpase;
    validLength.value = bool.notValidLength;
    upperCase.value = bool.noUpperCase;
    lowerCase.value = bool.noLowerCase;
    containsNumber.value = bool.notContainsNumber;
    containsSymbol.value = bool.notContainsSymbol;
  }
  if (props.confirm_password) {
    confirmPassword.value = checkConfirmPassword(
      props.passwordComp,
      props.confirm_password
    );
  }
});
</script>

<!-- 
  todo: refactor if can \|/
  todo-required: add a ? on every error tha wrap on <span></span> when it click or hover then popup
 -->
<template>
  <div class="text-red-500 text-sm">
    <div v-if="props.isFullnameFocus">
      <p>This field is <span class="font-bold">required</span></p>
    </div>
    <div v-if="props.isBirthyearFocus">
      <p>This field is <span class="font-bold">required</span></p>
    </div>
    <div v-if="props.isGenderFocus">
      <p>This field is <span class="font-bold">required</span></p>
    </div>

    <div>
      <div v-if="props.isContactFocus">
        <p>This field is <span class="font-bold">required</span></p>
      </div>
      <div v-if="props.contact">
        <p v-if="validNumberLength">
          Please use your <span class="font-bold">country mobile number</span>
        </p>
      </div>
    </div>

    <div v-if="props.isAddressFocus">
      <p>This field is <span class="font-bold">required</span></p>
    </div>

    <div>
      <div v-if="isEmailFocus">
        <p>This field is <span class="font-bold">required</span></p>
      </div>
      <div v-if="props.email">
        <p v-if="validEmail">
          Please use a <span class="font-bold">valid email address</span>
        </p>
      </div>
    </div>

    <div>
      <div v-if="isUsernameFocus">
        <p>This field is <span class="font-bold">required</span></p>
      </div>
      <div v-if="props.username">
        <p v-if="whiteSpase">
          Username must not contain <span class="font-bold">Whitespaces</span>.
        </p>
        <p v-if="validLength">
          Username must be 4 to 8
          <span class="font-bold">Characters Long</span>.
        </p>
      </div>
    </div>

    <div>
      <div v-if="isPasswordFocus">
        <p>This field is <span class="font-bold">required</span></p>
      </div>
      <div v-if="props.password">
        <p v-if="whiteSpase">
          Password must not contain <span class="font-bold">Whitespaces</span>.
        </p>
        <p v-if="validLength">
          Password must be 8 to 16
          <span class="font-bold">Characters Long</span>.
        </p>
        <p v-if="upperCase">
          Password must have at least one
          <span class="font-bold">Uppercase Character</span>.
        </p>
        <p v-if="lowerCase">
          Password must have at least one
          <span class="font-bold">Lowercase Character</span>.
        </p>
        <p v-if="containsNumber">
          Password must contain at least one
          <span class="font-bold">Digit</span>.
        </p>
        <p v-if="containsSymbol">
          Password must contain at least on
          <span class="font-bold">Special Symbol</span>.
        </p>
      </div>
    </div>

    <div>
      <div v-if="isConfirmPasswordFocus">
        <p>This field is <span class="font-bold">required</span></p>
      </div>
      <div v-if="props.confirm_password">
        <p v-if="confirmPassword">Password doesn't match</p>
      </div>
    </div>
  </div>
</template>
