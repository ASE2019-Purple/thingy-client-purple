<template>
  <form>
    <h4>Add a new plant:</h4>
    <v-container fluid>
      <v-row
        justify="center"
      >
        <v-col
          cols="12"
          sm="6"
        >
          <v-text-field
            v-model="name"
            :error-messages="nameErrors"
            :counter="10"
            label="Name"
            required
            @input="$v.name.$touch()"
            @blur="$v.name.$touch()"
          />
        </v-col>

        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="Number of days (sunny)"
            type="Number"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
        </v-col>

                
                
        <v-col
          cols="6"
          sm="6"
        >
          <v-text-field
            v-model="email"
            :error-messages="emailErrors"
            label="Number of days (rainy)"
            type="Number"
            required
            @input="$v.email.$touch()"
            @blur="$v.email.$touch()"
          />
        </v-col>
                
        <v-col
          cols="12"
          sm="6"
        >
          <v-select
            v-model="select"
            :items="items"
            :error-messages="selectErrors"
            label="Thingy"
            required
            @change="$v.select.$touch()"
            @blur="$v.select.$touch()"
          />
        </v-col>

        <v-col
          cols="12"
          sm="6"
        >
          <v-checkbox
            v-model="checkbox"
            :error-messages="checkboxErrors"
            label="Notify via telegram ?"
            required
            @change="$v.checkbox.$touch()"
            @blur="$v.checkbox.$touch()"
          />
        </v-col>


        <v-col
          cols="12"
          sm="6"
        >
          <v-btn
            class="mr-4"
            @click="submit"
          >
            submit
          </v-btn>
          <v-btn @click="clear">
            clear
          </v-btn>
        </v-col>
      </v-row>
    </v-container>
  </form>
</template>



<script>
  import { validationMixin } from 'vuelidate'
  import { required, maxLength, email } from 'vuelidate/lib/validators'

export default {
    name: "PlantFormComponent",
    mixins: [validationMixin],

    validations: {
      name: { required, maxLength: maxLength(10) },
      email: { required, email },
      select: { required },
      checkbox: {
        checked (val) {
          return val
        },
      },
    },

    data: () => ({
      name: '',
      email: '',
      select: null,
      items: [
        'Item 1',
        'Item 2',
        'Item 3',
        'Item 4',
      ],
      checkbox: false,
    }),

    computed: {
      checkboxErrors () {
        const errors = []
        if (!this.$v.checkbox.$dirty) return errors
        !this.$v.checkbox.checked && errors.push('You must agree to continue!')
        return errors
      },
      selectErrors () {
        const errors = []
        if (!this.$v.select.$dirty) return errors
        !this.$v.select.required && errors.push('Item is required')
        return errors
      },
      nameErrors () {
        const errors = []
        if (!this.$v.name.$dirty) return errors
        !this.$v.name.maxLength && errors.push('Name must be at most 10 characters long')
        !this.$v.name.required && errors.push('Name is required.')
        return errors
      },
      emailErrors () {
        const errors = []
        if (!this.$v.email.$dirty) return errors
        !this.$v.email.email && errors.push('Must be valid e-mail')
        !this.$v.email.required && errors.push('E-mail is required')
        return errors
      },
    },

    methods: {
      submit () {
        this.$v.$touch()
      },
      clear () {
        this.$v.$reset()
        this.name = ''
        this.email = ''
        this.select = null
        this.checkbox = false
      },
    },
  }
</script>
