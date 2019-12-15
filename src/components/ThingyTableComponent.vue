<template>
  <v-row justify="center">
    <v-data-table
      :headers="headers"
      :items="thingys"
      sort-by="calories"
      class="elevation-1"
    >
      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Devices</v-toolbar-title>
          <v-divider
            class="mx-4"
            inset
            vertical
          />
          <v-spacer />
          <v-dialog
            v-model="dialog"
            max-width="500px"
          >
            <template v-slot:activator="{ on }">
              <v-btn
                color="primary"
                dark
                class="mb-2"
                v-on="on"
              >
                New Item
              </v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">{{ formTitle }}</span>
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
                        v-model="editedItem.name"
                        label="Location name"
                      />
                    </v-col>
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.mac_address"
                        label="MAC Address"
                      />
                    </v-col>
                  </v-row>
                </v-container>
              </v-card-text>

              <v-card-actions>
                <v-spacer />
                <v-btn
                  color="blue darken-1"
                  text
                  @click="close"
                >
                  Cancel
                </v-btn>
                <v-btn
                  color="blue darken-1"
                  text
                  @click="save"
                >
                  Save
                </v-btn>
              </v-card-actions>
            </v-card>
          </v-dialog>
        </v-toolbar>
      </template>
      <template v-slot:item.action="{ item }">
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        >
          mdi-settings
        </v-icon>
        <v-icon
          small
          @click="deleteItem(item)"
        >
          mdi-delete
        </v-icon>
      </template>
      <template v-slot:no-data>
        <v-btn
          color="primary"
          @click="initialize"
        >
          Reset
        </v-btn>
      </template>
    </v-data-table>
  </v-row>
</template>



<script>

import { mapState } from 'vuex'

export default {
  name: "ThingyFormComponent",
  data: () => ({
    dialog: false,
    headers: [
      {
        text: 'Thingy (ID)',
        align: 'left',
        sortable: true,
        value: 'id',
      },
      { text: 'Location', value: 'location' },
      { text: 'MAC Address', value: 'mac_address' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    thingys: [],
    editedIndex: -1,
    editedItem: {
      location: '',
      mac_address: '',
    },
    defaultItem: {
      location: '',
      mac_address: '',
    },
  }),


  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  
  computed: mapState({
    items: state => state.devices,

    formTitle (state) {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  }),
  
  created () {
    this.initialize()
  },
  methods: {

    initialize () {
      this.thingys = this.$store.getters.devices
      console.log(this.thingys)
    },

    editItem (item) {
      this.editedIndex = this.thingys.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.thingys.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.thingys.splice(index, 1)
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },

    save () {
      if (this.editedIndex > -1) {
        
        this.$api.thingys.patch(this.editedItem.id, this.editedItem).then(
          response => {
            Object.assign(this.thingys[this.editedIndex], this.editedItem)
        }).catch(error => {
        console.log(error)                      
        })
        
      } else {
        this.$api.thingys.post(this.editedItem).then(
          response => {
            this.thingys.push(this.editedItem)
        }).catch(error => {
        console.log(error)                      
        })
      }
      this.close()
    }
  },
  
}
</script>
