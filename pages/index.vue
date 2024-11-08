<script lang="ts" setup>
const showForm = ref(false);

const handleFormSubmitted = (data: any) => {
  showForm.value = false;
};
</script>

<template>
  <div class="text-4xl font-bold text-center p-10">RATE MY SCHOOL</div>
  <div>{{ count }}</div>
  <button
    class="bg-blue-500 text-white p-2 rounded-md"
    @click="showForm = !showForm"
  >
    Rate
  </button>
  <div v-if="showForm">
    <Form @formSubmitted="handleFormSubmitted" />
  </div>
</template>
