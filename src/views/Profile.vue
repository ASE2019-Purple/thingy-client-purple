<template>
  <v-container fluid>
    <v-row justify="space-around">
      <v-col
        cols="6"
      >
        <ThingyTableComponent />
      </v-col>

      <v-col
        cols="8"
      >
        <v-list-item>
          <PlantTableComponent />
        </v-list-item>
      </v-col>
    </v-row>


    <!-- 
         
         <v-row justify="space-around">
         <v-sheet>
         <v-list-item three-line>
         <v-list-item-content>
         <div class="overline mb-4">
         Logged in as
         </div>
         <v-list-item-title class="headline mb-1">
         {{
         $auth.user.name
         }}
         </v-list-item-title>
         <v-list-item-subtitle>{{ $auth.user.email }}</v-list-item-subtitle>
         </v-list-item-content>

         <v-list-item-avatar
         tile
         size="80"
         >
         <img
         :src="$auth.user.picture"
         :alt="$auth.user.name"
         >
         </v-list-item-avatar>
         </v-list-item>
         </v-sheet>
         </v-row> -->
  </v-container>
</template>



<script>
import axios from "axios"
import ThingyTableComponent from "@/components/ThingyTableComponent.vue";
import PlantTableComponent from "@/components/PlantTableComponent.vue";


export default {
  name: "Profile",
  components: {
    ThingyTableComponent: ThingyTableComponent,
    PlantTableComponent: PlantTableComponent
  },
  methods: {

  },
  data () {
    return {
      info: null,
      url: "",
    }
  },
  mounted () {
    
  }
};
</script>
