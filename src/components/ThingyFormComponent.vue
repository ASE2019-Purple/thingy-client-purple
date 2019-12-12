<template>
  <v-row justify="center">
    <v-dialog
      v-model="dialog"
      persistent
      max-width="600px"
    >
      <template v-slot:activator="{ on }">
        <v-btn
          color="primary"
          dark
          v-on="on"
        >
          <v-icon>mdi-plus</v-icon>
          Add a device
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Thingy Device</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="Location"
                  required
                />
              </v-col>

              <v-col
                cols="12"
                sm="6"
                md="4"
              >
                <v-text-field
                  label="MAC Address"
                  hint="The MAC address of your device"
                  persistent-hint
                  required
                />
              </v-col>
            </v-row>
          </v-container>
          <small>all fields are required</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer />
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            @click="dialog = false"
          >
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>



<script>
export default {
  name: "ThingyFormComponent",
  data: () => ({
    dialog: false,
  }),
  }
</script>
