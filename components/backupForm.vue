<template>
  <div></div>
</template>

<script lang="ts" setup></script>

<style></style>

<!-- <script setup lang="ts">
import { z } from "zod";
import type { FormSubmitEvent } from "#ui/types";

const schema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(8, "Must be at least 8 characters"),
});

type Schema = z.output<typeof schema>;

const state = reactive({
  email: "",
  password: "",
});

async function onSubmit(event: FormSubmitEvent<Schema>) {
  // Do something with data
  event.preventDefault();
  console.log(event.data);
}
</script>

<template>
  <form :schema="schema" :state="state" class="space-y-4 border-blue-400">
    <div class="flex flex-col mb-4">
      <label for="email">Email</label>
      <input v-model="state.email" />

      <label for="Password">Password:</label>
      <input v-model="state.password" type="password" />
    </div>

    <button
      v-on:click="onSubmit"
      class="border-2 border-red-500 p-2 rounded-lg"
      type="submit"
    >
      Submit
    </button>
  </form>
</template> -->
