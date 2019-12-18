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
    selectedThingys: [],
  }),
  computed: mapState({
    
    thingys: state => {
      return state.devices.map(device =>( {text: device.location, value: device.id}))
    },
  }),
  methods: {
    async fetchItem () {
      // return the Promise from the action
      //const token = await this.$auth.getTokenSilently();

      //headers: {
      //    Authorization: 'Bearer ' + token // send the access token through the 'Authorization' header
      //}
      this.$api.thingys.list({
        
      }).then(
        response => {
          if (response.status === 200){
            this.$store.commit('setThingys', response.data);
            this.selectedThingys = [this.$store.getters.devices[0].id]
          } else {
            //console.log("Failed to retrieve thingys")
            this.$store.commit('setThingys',[])
            }

        }).catch(error => {
          //console.log(error);
        })
      
    }
  },
  mounted () {
    this.fetchItem()
  },
  watch: {
    selectedThingys (thingyIds) {
      this.$store.commit('selectDevices', thingyIds)

    }
  }
};
</script>
