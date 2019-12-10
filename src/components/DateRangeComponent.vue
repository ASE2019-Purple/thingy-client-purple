<template>
  <div>
    <v-btn
      text
      class="py-2"
    >
      <v-menu
        class="py-2" 
        ref="menu"
        v-model="menu"
        :close-on-content-click="false"
        :return-value.sync="dates"
        transition="scale-transition"
        offset-y
        min-width="290px"
      >
        <template v-slot:activator="{ on }">
          <v-text-field
            v-model="dateRangeText"
            label="Date range"
            prepend-icon="mdi-calendar"
            v-on="on"
            readonly
          />
          <!-- <v-text-field
               v-model="date"
               label="Start Date"
               prepend-icon="magnify"
               readonly
               v-on="on"
               ></v-text-field> -->
        </template>
        <!-- no-title scrollable -->
        <v-date-picker
          v-model="dates"
          scrollable
          no-title
          range
        >
          <v-spacer />
          <v-btn
            text
            color="primary"
            @click="menu = false"
          >
            Cancel
          </v-btn>
          <v-btn
            text
            color="primary"
            @click="$store.commit('setDates', dates ); $refs.menu.save(dates)"
          >
            OK
          </v-btn>
        </v-date-picker>
      </v-menu>
    </v-btn>
  </div>
</template>

<script>


export default {
  name: "DateRangeComponent",
  props: {},
  data: () => ({
    dates: ['2019-09-10', '2019-09-20'],
    menu: false
  }),
  created () {
    // Init dates from the v-model binding
    //this.dates = this.$store.getter.dateRangeISO
    console.log(this.dates)
  },
  computed: {
    dateRangeText () {
      return this.$store.getters.dateRangeText
    }
  },
  watch: {
  }
};
</script>
