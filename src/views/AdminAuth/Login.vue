<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import Api from "../../api/adminapi";

const router = useRouter();
const usernameoremail = ref("");
const password = ref("");
const showError = ref("");
const onSubmit = async () => {
  try {
    const data = {
      usernameoremail: usernameoremail.value,
      password: password.value,
    };
    const result = await Api.prototype.login(data);
    console.log(result)
    if (result.status == 200) {
      localStorage.setItem("auth", JSON.stringify({ token: result.data.token }))
      return router.push({ name: "Dashboard", replace: true });
    }
    throw Error;
  } catch (error) {
    if ((error.name = "AxiosError" && error.response.status == 400)) {
      return showError.value = error.response.data.error;
    }
    console.log(error)
  }
};
</script>

<template>
  <div>
    <div class="flex flex-row h-screen">
      <div class="max-md:basis-full md:basis-1/2 lg:p-12 max-lg:p-6 border border-black">
        <div class="lg:w-3/4">
          <div class="flex flex-row items-center mb-12 max-sm:mb-4 max-md:justify-center">
            <img src="/src/assets/House_Fire_Logo.png" alt="House On Fire" class="max-sm:w-24" />
            <h1 class="ml-3 font-extrabold text-lg max-sm:hidden">RUSHFIRE</h1>
          </div>
          <div class="mb-8 max-md:mb-2 max-md:text-center">
            <p class="text-4xl font-extrabold max-lg:text-lg">
              Login to admin account.
            </p>
          </div>
          <form @submit.prevent="onSubmit" class="max-sm:text-[9px] max-xl:text-sm">
            <div>
              <label for="usernameoremail">Email or Username</label>
              <input type="text" name="usernameoremail" id="usernameoremail" v-model="usernameoremail"
                class="border border-gray-600 rounded" required />
            </div>
            <div>
              <label for="password">Password</label>
              <input type="password" name="password" id="password" v-model="password"
                class="border border-gray-600 rounded" required />
            </div>
            <div v-if="(showError.length !== 0)" class="text-red-500">
              <p>
                {{ showError }}
              </p>
            </div>
            <div class="flex justify-between items-center pt-4 max-xl:text-xs font-semibold">
              <button class="max-sm:w-32 sm:w-40 p-2 rounded-full bg-orange-400 text-white font-extrabold tracking-wider">
                Login
              </button>
              <a class="cursor-pointer text-black font-bold">Forgot your password?</a>
            </div>
          </form>
        </div>
      </div>
      <div class="max-md:hidden md:basis-1/2 overflow-hidden">
        <img src="../../assets/rafael-rex-felisilda-_3FZYcFeWnc-unsplash 1.png" alt="" class="w-full h-full" />
      </div>
    </div>
  </div>
</template>

<style scoped>
form>div {
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
