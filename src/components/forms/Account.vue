<template>
    <v-form ref="form" v-model="valid" @submit="submit">
      <!--
      <v-row justify="left">
          <v-avatar color="blue" size="5rem">
            <v-icon size="4rem" dark>mdi-account-circle</v-icon>
          </v-avatar>
          <v-card-text>modifier ma photo</v-card-text>
      </v-row> -->
      <!-- <v-row>
        <v-col cols="12" md="12">
          <v-divider></v-divider>
        </v-col>
      </v-row> -->
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="firstname"
              :rules="[rules.required, rules.low]"
              label="Prénom"
              filled
              required></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="lastname"
              :rules="[rules.required, rules.low]"
              label="Nom de famille"
              filled
              required
            ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
            <v-col cols="12" md="12">
              <v-text-field
                v-model="email"
                :error-messages="errors.email"
                :rules="[rules.required]"
                label="email"
                hint="Verifie bien la saisie de ton email."
                filled
                required
              ></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              :append-icon="showEye ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="pwd"
              :type="showEye ? 'text' : 'password'"
              :rules="[rules.required, rules.min]"
              :counter="25"
              label="Nouveau mot de passe"
              hint="Au moins 8 characteres"
              filled
              :error-messages="errors.password"
              @click:append="showEye = !showEye"
              required></v-text-field>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" md="12">
            <v-text-field
              :append-icon="showEye ? 'mdi-eye' : 'mdi-eye-off'"
              v-model="pwdConfirm"
              :type="showEye ? 'text' : 'password'"
              :rules="[rules.required, rules.min]"
              :counter="25"
              label="Confirmer nouveau mot de passe"
              hint="Au moins 8 characteres"
              filled
              @click:append="showEye = !showEye"
              required></v-text-field>
          </v-col>
        </v-row>


        <v-row justify="end">
            <v-btn rounded color="#f14156" dark @click="submit">Enregistrer</v-btn>
        </v-row>

    </v-form>
</template>

<script>
import { mapActions } from 'vuex'

export default {
  props:["user"],
  data() {
     return {
       pwd:"",
       email:this.user.email,
       pwdConfirm:"",
       firstname:this.user.firstname,
       lastname:this.user.lastname,
       valid:false,
       rememberMe:true,
       showEye:false,
       errors:{},
       rules: {
          required: value => !!value || 'Requis',
          low: v => v.length >= 2 || 'Minimum 2 characteres',
          min: v => v.length >= 8 || 'Minimum 8 characteres'
        },
     }
  },

  methods: {
    ...mapActions({
      updateUser:"update user"
    }),

    getFormData() {
      return {
        firstname:this.firstname,
        lastname:this.lastname,
        email:this.email,
        password:this.pwd,
        password_confirmation:this.pwdConfirm
      }
    },

    updateUser(formData) {
      this.register(formData).then(() => {
        this.$emit("saved", {text:"données enregistrées"})
      }).catch((data) => {
        console.log(data)
        this.errors = data.errors
      })
    },

    submit(evt) {
      evt.preventDefault();
      this.$refs.form.validate();
      this.errors = {}

      if (!this.valid) {
        return;
      }

      const formData = this.getFormData()
      this.updateUser(formData)
    }
  }
}

</script>
