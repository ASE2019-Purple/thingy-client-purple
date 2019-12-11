<template>
  <div>
    <v-select
      v-model="selectedThingys"
      :items="thingys"
      label="Select"
      multiple
      chips
      hint="Select Devices"
      persistent-hint
    />
  </div>
</template>

<script>


export default {
  name: "ThingyComponent",
  props: {},
  data: () => ({
    thingys: [],
    selectedThingys: []
  }),
  created () {

  },
  mounted () {

    // TODO initialize store with thingys from the api
    this.thingys = this.$store.getters.thingys;
    this.selectedThingys = this.$store.getters.selectedThingys;
      
  },
  computed: {

  },
  watch: {
    selectedThingys (thingys) {
      this.$store.commit('selectDevices', thingys)
    }
  }
};
</script>
