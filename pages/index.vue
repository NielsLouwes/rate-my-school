<template>
  <div class="text-4xl font-bold text-center p-10">RATE MY SCHOOL</div>

  <div v-for="school in data" :key="school.uniqueId">
    {{ school.schoolname }}
  </div>
</template>

<script lang="ts" setup>
import { filteredData } from "~/utils/data-clean";
const data = filteredData();
</script>
