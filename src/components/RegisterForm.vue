<template>
  <!-- Registration Form -->
  <div
    v-if="reg_show_alert"
    :class="reg_alert_variant"
    class="text-white text-center font-bold p-5 mb-4"
  >
    {{ reg_alert_msg }}
  </div>
  <vee-form
    :validation-schema="schema"
    :initial-values="userData"
    @submit="register"
  >
    <!-- Name -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.name') }} </label>
      <vee-field
        type="text"
        name="name"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register.entername')"
      />
      <ErrorMessage
        class="text-red-600"
        name="name"
      />
    </div>
    <!-- Email -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.email') }}</label>
      <vee-field
        name="email"
        type="email"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register.enteremail')"
      />
      <ErrorMessage
        class="text-red-600"
        name="email"
      />
    </div>
    <!-- Age -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.age') }}</label>
      <vee-field
        name="age"
        type="number"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
      />
      <ErrorMessage
        class="text-red-600"
        name="age"
      />
    </div>
    <!-- Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.password') }}</label>
      <vee-field
        v-slot="{ field, errors }"
        name="password"
        :bails="false"
      >
        <input
          type="password"
          class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
          :placeholder="$t('register.enterpassword')"
          v-bind="field"
        >
        <div
          v-for="error in errors"
          :key="error"
          class="text-red-600"
        >
          {{ error }}
        </div>
      </vee-field>
      <ErrorMessage
        class="text-red-600"
        name="password"
      />
    </div>
    <!-- Confirm Password -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.confirmpassword') }}</label>
      <vee-field
        name="confirm_password"
        type="password"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
        :placeholder="$t('register.confirmpassword')"
      />
      <ErrorMessage
        class="text-red-600"
        name="confirm_password"
      />
    </div>
    <!-- Country -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.country') }}</label>
      <vee-field
        as="select"
        name="country"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
      >
        <option
          value="USA"
        >
          USA
        </option>
        <option value="Mexico">
          Mexico
        </option>
        <option value="Germany">
          Germany
        </option>
        <option value="Antarctica">
          Antarctica
        </option>
      </vee-field>
      <ErrorMessage
        class="text-red-600"
        name="country"
      />
    </div>
    <!-- Custom select -->
    <div class="mb-3">
      <label class="inline-block mb-2">{{ $t('register.profession') }}</label>
      <vee-field
        as="select"
        name="profession"
        class="block w-full py-1.5 px-3 text-gray-800 border border-gray-300 transition
                  duration-500 focus:outline-none focus:border-black rounded"
      >
        <option
          value="JS"
        >
          JS
        </option>
        <option value="PHP">
          PHP
        </option>
        <option value="C#">
          C#
        </option>
      </vee-field>
      <ErrorMessage
        class="text-red-600"
        name="profession"
      />
    </div>
    <!-- TOS -->
    <div class="mb-3 pl-6">
      <vee-field
        name="tos"
        value="1"
        type="checkbox"
        class="w-4 h-4 float-left -ml-6 mt-1 rounded"
      />
      <i18n-t
        class="inline-block"
        keypath="register.accept"
        tag="label"
      >
        <a href="#"> {{ $t('register.tos') }} </a>
      </i18n-t><br>
      <ErrorMessage
        class="text-red-600"
        name="tos"
      />
    </div>
    <button
      type="submit"
      :disabled="reg_in_submission"
      class="block w-full bg-purple-600 text-white py-1.5 px-3 rounded transition
                hover:bg-purple-700"
    >
      {{ $t('submit') }}
    </button>
  </vee-form>
</template>

<script>

export default {
  name: 'RegisterForm',
  data() {
    return {
      schema: {
        name: 'required|min:3|max:100|alpha_spaces',
        email: 'required|min:3|max:100|email',
        age: 'required|min_value:18|max_value:100',
        password: 'required|min:3|max:100',
        confirm_password: 'passwords_mismatch:@password',
        country: 'required|country_excluded:Antarctica',
        tos: 'tos',
        profession: 'required',
      },
      userData: {
        country: 'USA',
        profession: 'JS',
      },
      reg_in_submission: false,
      reg_show_alert: false,
      reg_alert_variant: 'bg-blue-500',
      reg_alert_msg: 'Pease wait! Your account is being created',
    };
  },
  methods: {
    error(error) {
      this.reg_in_submission = false;
      this.reg_alert_variant = 'bg-red-500';
      this.reg_alert_msg = error.message;
    },
    async register(values) {
      this.reg_show_alert = true;
      this.reg_in_submission = true;
      this.reg_alert_variant = 'bg-blue-500';
      this.reg_alert_msg = 'Pease wait! Your account is being created';

      try {
        await this.$store.dispatch('register', values);
      } catch (error) {
        this.error(error);
        return;
      }

      this.reg_alert_variant = 'bg-green-500';
      this.reg_alert_msg = 'Success! Your account has been created';

      window.location.reload();
    },
  },
};
</script>
