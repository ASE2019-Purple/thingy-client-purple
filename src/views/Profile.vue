<template>
  
  <v-container fluid>
   
    <v-row justify="space-around">
      <v-sheet
        :width="width"
        :height="height"
        :elevation="elevation"
        :color="color"
        :tile="tile"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">Logged in as</div>
            <v-list-item-title class="headline mb-1">{{ $auth.user.name }}</v-list-item-title>
            <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
          </v-list-item-content>
          
          <v-list-item-avatar tile
                              size="80">
            <img
              :src="$auth.user.picture"
              :alt="$auth.user.name"
            >
          </v-list-item-avatar>

          
          
        </v-list-item>

     <v-form
    ref="form"
    v-model="valid"
    lazy-validation
  >
    <v-text-field
      v-model="name"
      :counter="10"
      :rules="nameRules"
      label="Name"
      required
    ></v-text-field>

    <v-text-field
      v-model="email"
      :rules="emailRules"
      label="E-mail"
      required
    ></v-text-field>

    <v-select
      v-model="select"
      :items="items"
      :rules="[v => !!v || 'Item is required']"
      label="Item"
      required
    ></v-select>

    <v-checkbox
      v-model="checkbox"
      :rules="[v => !!v || 'You must agree to continue!']"
      label="Do you agree?"
      required
    ></v-checkbox>

    <v-btn
      :disabled="!valid"
      color="success"
      class="mr-4"
      @click="validate"
    >
      Validate
    </v-btn>

    <v-btn
      color="error"
      class="mr-4"
      @click="reset"
    >
      Reset Form
    </v-btn>

    <v-btn
      color="warning"
      @click="resetValidation"
    >
      Reset Validation
    </v-btn>
     </v-form>
     
      </v-sheet>
    </v-row>
    
  </v-container>
  
</template>
