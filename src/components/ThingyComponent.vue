<template>
  <div>
    <v-select
      solo
      v-model="selectedThingys"
      :items="thingys"
      label="Select Devices"
      multiple
      chips
      class="pt-5"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex'

export default {
  name: "ThingyComponent",
  props: {},
  data: () => ({
    thingys: [],
    selectedThingys: []
  }),
  created () {
    this.fetchItem()
  },
  methods: {
    async fetchItem () {
      // return the Promise from the action
      //const token = await this.$auth.getTokenSilently();
      //console.log("Fetch")

      //headers: {
      //    Authorization: 'Bearer ' + token // send the access token through the 'Authorization' header
      //}
      this.$api.thingys.list({
        
      }).then(
        response => {
          if (response.status === 200){
            this.$store.commit('setThingys', response.data);
            this.thingys = this.$store.getters.thingys;
            this.$store.commit('selectDevices', this.thingys);
          } else {
            //console.log("Failed to retrieve thingys")
            this.$store.commit('setThingys',[
            {id:1, location:"Fribourg", mac_address:"123"},
            {id:2, location:"Morat", mac_address:"123"},
            {id:3, location:"Bern", mac_address:"1236"}
          ])
            }

        }).catch(error => {
          console.log(error);
          
        })
      this.$api.plants.list({

              }
      ).then(
              response =>{

              }
      )

    
    }
  },
  mounted () {

    // TODO initialize store with thingys from the api
      
  },
  watch: {
    selectedThingys (thingys) {
      this.$store.commit('selectDevices', thingys)
    }
  }
};
</script>
