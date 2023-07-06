<script setup>
import { onBeforeMount, ref, watch } from "vue";
import { useRouter, RouterLink } from "vue-router";
import FormValidation from "../../components/Forms/FormValidation.vue";
import Api from "../../api/adminapi";
import countryMobileNumbers from "../../data/coutryMobileNumbers";
const router = useRouter();

onBeforeMount(async () => {
  try {
    const result = await Api.prototype.getadmin();
    if (result.status !== 200)
      router.push({ name: "PageNotFound", replace: true });
  } catch (error) {
    if (error.name == "AxiosError") {
      console.log(error.message);
    }
  }
});

const showError = ref(false);
const formData = {
  fullname: ref(""),
  birthyear: ref(""),
  gender: ref(""),
  contact: ref(""),
  address: ref(""),
  email: ref(""),
  username: ref(""),
  password: ref(""),
  confirm_password: ref(""),
};
const countryCode = ref("");
const passwordComp = ref(formData.password);

//TODO: Make it object
const isFullnameFocus = ref(false);
const isBirthyearFocus = ref(false);
const isGenderFocus = ref(false);
const isContactFocus = ref(false);
const isAddressFocus = ref(false);
const isEmailFocus = ref(false);
const isUsernameFocus = ref(false);
const isPasswordFocus = ref(false);
const isConfirmPasswordFocus = ref(false);

const fieldFocusStates = {
  fullname: isFullnameFocus,
  birthyear: isBirthyearFocus,
  gender: isGenderFocus,
  contact: isContactFocus,
  address: isAddressFocus,
  email: isEmailFocus,
  username: isUsernameFocus,
  password: isPasswordFocus,
  confirm_password: isConfirmPasswordFocus,
};

const handleFocusIn = (e) => {
  const fieldId = e.target.id;
  if (fieldFocusStates[fieldId]) {
    fieldFocusStates[fieldId].value = true;
  }
};

const handleFocusOut = (e) => {
  const fieldId = e.target.id;
  if (fieldFocusStates[fieldId]) {
    fieldFocusStates[fieldId].value = false;
  }
};
const getIndentation = (codeLength) => {
  if (codeLength === 2) {
    return "\u00A0\u00A0\u00A0\u00A0\u00A0";
  } else if (codeLength === 3) {
    return "\u00A0\u00A0\u00A0";
  } else {
    return "";
  }
};

const onSubmit = (e) => {
  e.preventDefault();
  showError.value = true;
  const isEmpty = Object.keys(formData).some((key) => !formData[key].value);

  if (isEmpty) return;

  console.log({
    data: {
      fullname: formData.fullname.value,
      birthyear: formData.birthyear.value,
      gender: formData.gender.value,
      contact: formData.contact.value,
      address: formData.address.value,
      email: formData.email.value,
      username: formData.username.value,
      password: formData.password.value,
      confirm_password: formData.confirm_password.value,
    },
  });
  Object.keys(formData).forEach((key) => {
    formData[key].value = "";
  });
  showError.value = false;
};
</script>

<template>
  <!-- 
    Struggling to find form input or the block scope? 
    see the following list and ctrl+f to find, use "$" first to match the commented scope 
    > $fullname
    > $birthyear
    > $gender
    > $contact
    > $address
    > $email
    > $username
    > $password
    > $confirm_password
   -->
  <div class="">
    <div class="flex flex-row h-screen">
      <div class="md:basis-1/2 max-md:basis-full lg:p-12 max-lg:p-6">
        <div class="xl:w-[90%]">
          <div
            class="flex flex-row items-center mb-12 max-sm:mb-4 max-md:justify-center"
          >
            <img
              src="/src/assets/House_Fire_Logo.png"
              alt="House On Fire"
              class="max-sm:w-24"
            />
            <h1 class="ml-3 font-extrabold text-lg max-sm:hidden">RUSHFIRE</h1>
          </div>
          <div class="mb-8 max-md:mb-2 max-md:text-center">
            <p class="text-4xl font-extrabold max-lg:text-lg">
              Create new admin account.
            </p>
          </div>
          <form :onSubmit="onSubmit" class="max-sm:text-[9px] max-xl:text-sm">
            <!--  
              \|/ $fullname \|/ 
            -->
            <div>
              <label for="fullname"
                >Fullname <span class="text-red-600 font-bold">*</span></label
              >
              <input
                type="text"
                name="fullname"
                id="fullname"
                autocomplete="none"
                v-model="formData.fullname.value"
                @focus="handleFocusIn"
                @focusout="handleFocusOut"
                :class="[
                  showError && !formData.fullname.value
                    ? 'border-2 border-red-500 rounded'
                    : 'border border-gray-600 rounded',
                ]"
              />
              <div>
                <FormValidation :isFullnameFocus="isFullnameFocus == true" />
              </div>
            </div>

            <div class="max-xl:block flex flex-row">
              <!--  
                \|/ $birthyear \|/ 
              -->
              <div class="xl:basis-1/4 xl:mr-4">
                <label for="birthyear"
                  >Birthday <span class="text-red-600 font-bold">*</span></label
                >
                <input
                  type="date"
                  name="birthyear"
                  id="birthyear"
                  v-model="formData.birthyear.value"
                  @focus="handleFocusIn"
                  @focusout="handleFocusOut"
                  :class="[
                    showError && !formData.birthyear.value
                      ? 'border-2 border-red-500 rounded'
                      : 'border border-gray-600 rounded',
                  ]"
                />
                <div>
                  <FormValidation :isBirthyearFocus="isBirthyearFocus" />
                </div>
              </div>

              <!--  
                \|/ $gender \|/ 
              -->
              <div class="xl:basis-1/4 xl:mr-4">
                <label for="gender"
                  >Gender <span class="text-red-600 font-bold">*</span></label
                >
                <select
                  name="gender"
                  id="gender"
                  v-model="formData.gender.value"
                  @focus="handleFocusIn"
                  @focusout="handleFocusOut"
                  :class="[
                    'xl:text-sm',
                    showError && !formData.gender.value
                      ? 'border-2 border-red-500 rounded'
                      : 'border border-gray-600 rounded',
                  ]"
                >
                  <option disabled selected value="">Select your gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <div>
                  <FormValidation :isGenderFocus="isGenderFocus" />
                </div>
              </div>

              <!--  
                \|/ $contact \|/ 
              -->
              <div class="xl:basis-1/2">
                <label for="contact"
                  >Contact Number
                  <span class="text-red-600 font-bold">*</span></label
                >
                <div class="flex flex-row">
                  <select
                    :class="[
                      'max-sm:basis-1/5 xl:basis-1/4 basis-1/6 max-2xl:text-xs',
                      showError && !formData.contact.value
                        ? 'border-2 border-red-500 rounded-l'
                        : 'border border-gray-600 rounded-l',
                    ]"
                    v-model="countryCode"
                  >
                    <option disabled selected value="">No.</option>
                    <option disabled value="">
                      Select Country Mobile Number Code
                    </option>
                    <option
                      v-for="country in countryMobileNumbers"
                      :key="country.code"
                      :value="country.code"
                    >
                      {{ country.code }}
                      {{ getIndentation(country.code.length) }}
                      {{ country.country }}
                    </option>
                  </select>
                  <input
                    type="number"
                    name="contact"
                    id="contact"
                    v-model="formData.contact.value"
                    :disabled="!countryCode"
                    @focus="handleFocusIn"
                    @focusout="handleFocusOut"
                    :class="[
                      showError && !formData.contact.value
                        ? 'border-2 border-red-500 rounded-r'
                        : 'border border-gray-600 rounded-r',
                    ]"
                  />
                </div>

                <div>
                  <FormValidation
                    :contact="formData.contact.value"
                    :countryCode="countryCode"
                    :isContactFocus="isContactFocus"
                  />
                </div>
              </div>
            </div>

            <!--  
                \|/ $address \|/ 
            -->
            <div>
              <label for="address"
                >Address <span class="text-red-600 font-bold">*</span></label
              >
              <input
                type="text"
                name="address"
                id="address"
                autocomplete="none"
                v-model="formData.address.value"
                @focus="handleFocusIn"
                @focusout="handleFocusOut"
                :class="[
                  showError && !formData.address.value
                    ? 'border-2 border-red-500 rounded'
                    : 'border border-gray-600 rounded',
                ]"
              />
              <div>
                <FormValidation :isAddressFocus="isAddressFocus" />
              </div>
            </div>

            <!--  
                \|/ $email \|/ 
            -->
            <div>
              <label for="email"
                >Email <span class="text-red-600 font-bold">*</span></label
              >
              <input
                type="email"
                name="email"
                id="email"
                autocomplete="none"
                v-model="formData.email.value"
                @focus="handleFocusIn"
                @focusout="handleFocusOut"
                :class="[
                  showError && !formData.email.value
                    ? 'border-2 border-red-500 rounded'
                    : 'border border-gray-600 rounded',
                ]"
              />
              <div>
                <FormValidation
                  :email="formData.email.value"
                  :isEmailFocus="isEmailFocus"
                />
              </div>
            </div>

            <!--  
                \|/ $username \|/ 
            -->
            <div>
              <label for="username"
                >Username <span class="text-red-600 font-bold">*</span></label
              >
              <input
                type="text"
                name="username"
                id="username"
                autocomplete="none"
                v-model="formData.username.value"
                @focus="handleFocusIn"
                @focusout="handleFocusOut"
                :class="[
                  showError && !formData.username.value
                    ? 'border-2 border-red-500 rounded'
                    : 'border border-gray-600 rounded',
                ]"
              />
              <div>
                <FormValidation
                  :username="formData.username.value"
                  :isUsernameFocus="isUsernameFocus"
                />
              </div>
            </div>

            <!--  
                \|/ $password \|/ 
            -->
            <div>
              <label for="password"
                >Password <span class="text-red-600 font-bold">*</span></label
              >
              <input
                type="password"
                name="password"
                id="password"
                autocomplete="none"
                v-model="formData.password.value"
                @focus="handleFocusIn"
                @focusout="handleFocusOut"
                :class="[
                  showError && !formData.password.value
                    ? 'border-2 border-red-500 rounded'
                    : 'border border-gray-600 rounded',
                ]"
              />
              <div>
                <FormValidation
                  :password="formData.password.value"
                  :isPasswordFocus="isPasswordFocus"
                />
              </div>
            </div>

            <!--  
                \|/ $confirm_password \|/ 
            -->
            <div>
              <label for="confirm-password"
                >Confirm Password
                <span class="text-red-600 font-bold">*</span></label
              >
              <input
                type="password"
                name="confirm-password"
                id="confirm-password"
                autocomplete="none"
                v-model="formData.confirm_password.value"
                @focus="handleFocusIn"
                @focusout="handleFocusOut"
                :class="[
                  showError && !formData.confirm_password.value
                    ? 'border-2 border-red-500 rounded'
                    : 'border border-gray-600 rounded',
                ]"
              />
              <div>
                <FormValidation
                  :passwordComp="passwordComp"
                  :confirm_password="formData.confirm_password.value"
                  :isConfirmPasswordFocus="isConfirmPasswordFocus"
                />
              </div>
            </div>
            <div
              class="flex justify-between items-center pt-4 max-md:pb-4 max-lg:text-sm max-xl:text-sm font-semibold"
            >
              <RouterLink :to="'/'" class="text-gray-400"
                >&lt&lt Back To Home</RouterLink
              >
              <button
                class="max-sm:w-32 lg:w-40 p-2 rounded-full bg-orange-400 text-white"
              >
                Create Account
              </button>
            </div>
          </form>
        </div>
      </div>
      <div class="max-md:hidden md:basis-1/2 overflow-hidden">
        <img
          src="../../assets/rafael-rex-felisilda-_3FZYcFeWnc-unsplash 1.png"
          alt=""
          loading="lazy"
          class="w-full h-full"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
form > div {
  margin-bottom: 0.5rem;
}
label,
input {
  display: block;
}
input,
select {
  width: 100%;
  height: 40px;
}
</style>
