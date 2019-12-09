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
            @click="$refs.menu.save(dates)"
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
  props: {
    value: {
      type: Array,
      default: function() {return ['2019-09-10', '2019-09-20']}
    }
  },
  data: () => ({
    dates: ['2019-09-10', '2019-09-20']
  }),
  created () {
    // Init dates from the v-model binding
    this.dates = this.value
  },
  computed: {
    dateRangeText () {
      return this.dates ? this.dates.join(' ~ ') : ''
    },
  },
  watch: {
    dates: function (dates) {
      console.log(new Date(dates[0]))
      
      // Emit event s.t. v-model can be used for a 2-way binding
      this.$emit('input', this.dates)
    }
  }
};
</script>
