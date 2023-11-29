<template>
  <q-layout view="lHh Lpr lFf">
    <!-- <q-header elevated> -->
    <!-- <q-toolbar class="bg-grey">
        <q-space />
        <div style="display: flex; flex-direction: column; justify-content: center">
          <img src="../assets/rifle.svg" style="width: 350px" />
          <span
            class="text-white"
            style="text-align: center; font-size: large; font-weight: bold"
            >Riebeck West Benchrest Rifle Range</span
          >
        </div>
        <q-space />
      </q-toolbar> -->
    <!-- </q-header> -->
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- <q-footer>
      <q-toolbar style="background-color: transparant">
        <q-toolbar-title>
          <img src="~assets/OPC-Footer.jpg" style="width: 100%" />
        </q-toolbar-title>
      </q-toolbar>
    </q-footer> -->
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";

export default defineComponent({
  name: "MainLayout",

  components: {},

  setup() {
    return {};
  },
});
</script>
