<template>
  <form class="card auth-card" @submit.prevent="submitHendler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="email"
            :class="{invalid: ($v.email.$dirty && !$v.email.required) || $v.email.$dirty && !$v.email.email}"
        >
        <label for="email">Email</label>
        <small 
        class="helper-text invalid"
        v-if="$v.email.$dirty && !$v.email.required"
        >Email required</small>
        <small 
        class="helper-text invalid"
        v-else-if="$v.email.$dirty && !$v.email.email"
        >Email not correct</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="password"
            :class="{invalid: ($v.password.$dirty && !$v.password.required) || $v.password.$dirty && !$v.password.minLength}"
        >
        <label for="password">Пароль</label>
        <small 
        v-if="$v.password.$dirty && !$v.password.required"
        class="helper-text invalid"
        >Your password</small>
        <small 
        v-if="$v.password.$dirty && !$v.password.minLength"
        class="helper-text invalid"
        >Min length {{$v.password.$params.minLength.min}} symbols</small>
      </div>
      <div class="input-field">
        <input
            id="name"
            type="text"
            v-model.trim="name"
            :class="{invalid: $v.name.$dirty && !$v.name.required}"
        >
        <label for="name">Имя</label>
        <small 
        v-if="$v.name.$dirty && !$v.name.required"
        class="helper-text invalid"
        >Your name</small>
      </div>
      <p>
        <label>
          <input type="checkbox" v-model="agree"/>
          <span>С правилами согласен</span>
        </label>
      </p>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Зарегистрироваться
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Уже есть аккаунт?
        <router-link to="/login">Войти!</router-link>
      </p>
    </div>
  </form>
</template>


<script>
/* eslint-disable */
import {email, required, minLength} from 'vuelidate/lib/validators'

export default {
  name: 'register',
  data: () => ({
    email: '',
    password: '',
    name: '',
    agree: false
  }),
  validations: {
    email: {
      email, required
    },
    password: {
      required, minLength: minLength(6)
    },
    name: {
      required
    },
    agree: {
      checked: v => v
    }
  },
  methods: {
    async submitHendler() {
      if(this.$v.$invalid) {
        this.$v.$touch()
        return
      }

      const formData = {
        email: this.email,
        password: this.password,
        name: this.name
      }

      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {

      }
      
    }
  }
}
</script>