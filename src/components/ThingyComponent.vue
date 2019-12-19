<template>
  <div>
    <v-select
      solo
      v-model="selectedThingy"
      :items="thingys"
      label="Select Devices"
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
    selectedThingy: 0,
  }),
  computed: mapState({
    
    thingys: state => {
      return state.devices.map(device =>( {text: device.location, value: device.id}))
    },
  }),
  methods: {
    async fetchItem () {
      const token = await this.$auth.getTokenSilently();

      this.$api.thingys.list({
        headers: {
          Authorization: 'Bearer ' + token // send the access token through the 'Authorization' header
        }
      }).then(
        response => {
          if (response.status === 200){
            this.$store.commit('setThingys', response.data);
            this.selectedThingy = this.$store.getters.devices[0].id
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
    selectedThingy (thingyId) {
      this.$store.commit('selectDevice', thingyId)

    }
  }
};
</script>
