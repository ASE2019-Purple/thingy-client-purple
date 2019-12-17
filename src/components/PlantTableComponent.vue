<template>
  <v-row justify="center">
    <v-data-table
      :headers="headers"
      :items="plants"
      sort-by="calories"
      class="elevation-1"
    >
      <!-- 
           group-by="thing.location"
           show-group-by -->

      <template v-slot:top>
        <v-toolbar flat>
          <v-toolbar-title>Plants</v-toolbar-title>
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
                        v-model="editedItem.nb_sunny_days"
                        type="Number"
                        label="#Sunny Days"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nb_cloudy_days"
                        type="Number"
                        label="#Cloudy Days"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.nb_rainy_days"
                        type="Number"
                        label="#Rainy Days"
                      />
                    </v-col>
                    
                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-text-field
                        v-model="editedItem.watering_interval_days"
                        type="Number"
                        label="Watering Interval"
                      />
                    </v-col>

                    <v-col
                      cols="12"
                      sm="6"
                      md="4"
                    >
                      <v-select
                        :items="thingyItems"
                        v-model="editedItem.thing_id"
                        label="Thingy"
                        required
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
          @click="fetchItems()"
        >
          Load
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
        text: 'ID',
        align: 'left',
        sortable: true,
        value: 'id',
      },
      { text: 'Name', value: 'name' },
      { text: 'Sunny Days', value: 'nb_sunny_days' },
      { text: 'Cloudy Days', value: 'nb_cloudy_days' },
      { text: 'Rainy Days', value: 'nb_rainy_days' },
      { text: 'Thing', value: 'thing.location' },
      { text: 'Actions', value: 'action', sortable: false },
    ],
    plants: [],
    editedIndex: -1,
    editedItem: {
      nb_sunny_days: 3,
      nb_cloudy_days: 5,
      nb_rainy_days: 2,
      watering_interval_days: 0,
      name: '',
      thing_id: 1,
      thing: {}
    },
    defaultItem: {
      nb_sunny_days: 3,
      nb_cloudy_days: 5,
      nb_rainy_days: 3,
      watering_interval_days: 0,
      name: '',
      thing_id: 1,
      thing: {}
    },
  }),

  watch: {
    dialog (val) {
      val || this.close()
    },
  },
  
  computed: mapState({
    thingyItems: state => state.devices.map(device =>( {text: device.location, value: device.id})),

    formTitle (state) {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item';
    },
  }),
  
  created () {
    this.fetchItems()
  },
  methods: {
    async fetchItems () {

      this.$api.plants.list({}).then(
        response => {
          if (response.status === 200) {
            this.$store.commit('setPlants', response.data);
            this.plants = this.$store.getters.plantsWithThings;
            //    this.$store.commit('selectPlants', this.plants);
          } else {
            //console.log("Failed to retrieve Plants");
            this.$store.commit('setPlants', [])
          }
        }
      ).catch(error => {
        //console.log(error);

      })
    },

    editItem (item) {
      this.editedIndex = this.plants.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },

    deleteItem (item) {

      const index = this.plants.indexOf(item)
      const plant = this.plants[index]
      
      if (confirm('Are you sure you want to delete this item?')) {
        this.$api.plants.delete(plant.id).then(response => {
          // Refresh items
          this.fetchItems()
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
        
        this.$api.plants.put(this.editedItem.id, this.editedItem, {
          headers: {
            Authorization: 'Bearer ' + token, 
          }
        }).then(
          response => {
            this.fetchItems()
          }).catch(error => {
            //console.log(error)                      
          })
        
      } else {
        this.$api.plants.post(this.editedItem, {
          headers: {
            Authorization: 'Bearer ' + token, // send the access token through the 'Authorization' header
          }
        }).then(
          response => {
            this.fetchItems()
          }).catch(error => {
            //console.log(error)                      
          })
      }
      this.close()
    }
  },
  
}
</script>
