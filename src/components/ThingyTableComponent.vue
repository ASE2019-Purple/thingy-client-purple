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
        <!-- Unavailable in api
        <v-icon
          small
          class="mr-2"
          @click="editItem(item)"
        > 
          mdi-settings
        </v-icon>
        -->
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
          @click="fetchThingys"
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

    thingys: state => state.devices,

    formTitle (state) {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    },
  }),
  
  mounted () {
    this.fetchThingys()
  },
  methods: {

    async fetchThingys () {
      const token = await this.$auth.getTokenSilently();

      this.$api.thingys.list({
        headers: {
          Authorization: 'Bearer ' + token // send the access token through the 'Authorization' header
        }
      }).then(
        response => {
          if (response.status === 200){
            this.$store.commit('setThingys', response.data);
          } else {
            //console.log("Failed to retrieve thingys")
            this.$store.commit('setThingys',[])
          }

      }).catch(error => {
        //console.log(error);
      })
      
    },
    editItem (item) {
      this.editedIndex = this.thingys.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {
      const index = this.thingys.indexOf(item)
      const thingy = this.thingys[index]
      
      if (confirm('Are you sure you want to delete this item?')) {
        this.$api.thingys.delete(thingy.id).then(response => {
          // Refresh items
          this.fetchThingys()
        }).catch(error => {
          //console.log(error);

        })
      } 
    },

    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    async  save () {
      const token = await this.$auth.getTokenSilently();

      if (this.editedIndex > -1) {
        /* API not implemented 
         * this.$api.thingys.put(this.editedItem.id, this.editedItem, {
         *   headers: {
         *     Authorization: 'Bearer ' + token, 
         *   }
         * }).then(
         *   response => {
         *     this.fetchThingys()
         *   }).catch(error => {
         *     //console.log(error)                      
         *   }) */
        
      } else {
        this.$api.thingys.post(this.editedItem, {
          headers: {
            Authorization: 'Bearer ' + token, // send the access token through the 'Authorization' header
          }
        }).then(
          response => {
            this.fetchThingys()
        }).catch(error => {
          //console.log(error)                      
        })
      }
      this.close()
    }
  },
  
}
</script>
