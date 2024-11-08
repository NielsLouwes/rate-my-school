<script setup lang="ts">
import { z } from "zod";
import { ref } from "vue";
import { nationalities } from "~/data/nationalities";
import { schoolNames } from "~/utils/data-clean";
import { v4 as uuidv4 } from "uuid";

const schema = z.object({
  uniqueId: z.string().optional(),
  schoolName: z.string().nonempty("School name is required"),
  sex: z.enum(["male", "female", "prefer not to say", ""]).optional(),
  nationality: z.string().nonempty("Nationality is required"),
  currentStudent: z.boolean(),
  yearOfStudy: z.string().optional(),
  nameOfStudy: z.string().optional(),
  qualityOfTeaching: z.number().min(1).max(5).optional(),
  safety: z.number().min(1).max(5).optional(),
  location: z.number().min(1).max(5).optional(),
  socialEvents: z.number().min(1).max(5).optional(),
  facilities: z.number().min(1).max(5).optional(),
  courseContent: z.number().min(1).max(5).optional(),
  housingAndAccommodation: z.number().min(1).max(5).optional(),
  internationalFocus: z.number().min(1).max(5).optional(),
  mentalHealthAndWellnessServices: z.number().min(1).max(5).optional(),
  careerServicesAndInternshipOpportunities: z.number().min(1).max(5).optional(),
  additionalComments: z.string().optional(),
});

type Schema = z.infer<typeof schema>;

const state = ref<Schema>({
  uniqueId: "",
  schoolName: "",
  sex: "",
  nationality: "",
  currentStudent: false,
  yearOfStudy: "",
  nameOfStudy: "",
  qualityOfTeaching: undefined,
  safety: undefined,
  location: undefined,
  socialEvents: undefined,
  facilities: undefined,
  courseContent: undefined,
  housingAndAccommodation: undefined,
  internationalFocus: undefined,
  mentalHealthAndWellnessServices: undefined,
  careerServicesAndInternshipOpportunities: undefined,
  additionalComments: "",
});

const errors = ref<Partial<Record<keyof Schema, string>>>({});

const emit = defineEmits<{
  (event: "formSubmitted", data: Schema): void;
}>();

const onSubmit = (event: Event) => {
  event.preventDefault();

  try {
    // need to inject uniqueID into the date before parsing - replace with UUID library
    const uniqueID = uuidv4();
    state.value.uniqueId = uniqueID;

    const validatedData = schema.parse(state.value);

    emit("formSubmitted", validatedData);
  } catch (error) {
    if (error instanceof z.ZodError) {
      errors.value = error.errors.reduce((acc, curr) => {
        const path = curr.path[0] as keyof Schema;
        acc[path] = curr.message;
        return acc;
      }, {} as typeof errors.value);

      console.error("Validation Errors:", errors.value);
    }
  } finally {
  }
};

const setRating = (field: keyof Schema, value: number) => {
  state.value[field] = value;
};
</script>

<template>
  <form
    class="space-y-4 p-6 bg-white shadow-md rounded-md h-full w-1/2 bg-blue-100"
    @submit="onSubmit"
  >
    <!-- New fields -->
    <div class="flex flex-col mb-4">
      <label for="schoolName" class="font-semibold">School Name</label>
      <select
        v-model="state.schoolName"
        id="schoolName"
        class="border p-2 rounded-md"
        :class="{ 'border-red-500': errors.schoolName }"
      >
        <option value=""></option>
        <option v-for="school in schoolNames()" :key="school" :value="school">
          {{ school }}
        </option>
      </select>
      <p v-if="errors.schoolName" class="text-sm">
        {{ errors.schoolName }}
      </p>
    </div>

    <div class="flex flex-col mb-4">
      <label for="sex" class="font-semibold">Sex</label>
      <select
        v-model="state.sex"
        id="sex"
        class="border p-2 rounded-md"
        :class="{ 'border-red-500': errors.sex }"
      >
        <option value="male">Male</option>
        <option value="female">Female</option>
        <option value="prefer not to say">Prefer not to say</option>
      </select>
      <p v-if="errors.sex" class="text-sm">
        {{ errors.sex }}
      </p>
    </div>

    <div class="flex flex-col mb-4">
      <label for="nationality" class="font-semibold">Nationality</label>
      <select
        v-model="state.nationality"
        id="nationality"
        class="border p-2 rounded-md"
        :class="{ 'border-red-500': errors.nationality }"
      >
        <option
          v-for="nationality in nationalities"
          :key="nationality"
          :value="nationality"
        >
          {{ nationality }}
        </option>
      </select>
      <p v-if="errors.nationality" class="text-red.DEFAULT text-sm">
        {{ errors.nationality }}
      </p>
    </div>

    <div class="flex flex-col">
      <label for="currentStudent" class="font-semibold"
        >Current Student ?</label
      >
      <input
        type="checkbox"
        v-model="state.currentStudent"
        id="currentStudent"
      />
    </div>

    <div v-if="state.currentStudent" class="flex flex-col mb-4">
      <label for="yearOfStudy" class="font-semibold">Year of Study</label>
      <select
        v-model="state.yearOfStudy"
        id="yearOfStudy"
        class="border p-2 rounded-md"
        :class="{ 'border-red-500': errors.yearOfStudy }"
      >
        <option value="1">1</option>
        <option value="2">2</option>
        <option value="3">3</option>
        <option value="4">4</option>
        <option value="5">5</option>
        <option value="6">6</option>
        <option value="7">7</option>
        <option value="8">8</option>
      </select>
      <p v-if="errors.yearOfStudy" class="text-red-500 text-sm">
        {{ errors.yearOfStudy }}
      </p>

      <label for="nameOfStudy" class="font-semibold">Name of Study</label>
      <input
        v-model="state.nameOfStudy"
        id="nameOfStudy"
        class="border p-2 rounded-md"
        :class="{ 'border-red-500': errors.nameOfStudy }"
      />
      <p v-if="errors.nameOfStudy" class="text-red-500 text-sm">
        {{ errors.nameOfStudy }}
      </p>
    </div>

    <!-- Quality ratings with stars -->
    <div class="flex flex-col mb-4">
      <div class="flex items-center">
        <label for="qualityOfTeaching" class="font-semibold mr-2"
          >Quality of Teaching</label
        >
        <div class="flex">
          <span
            v-for="n in 5"
            :key="n"
            class="cursor-pointer"
            @click="setRating('qualityOfTeaching', n)"
          >
            <i
              :class="{
                'text-yellow-500': n <= (state.qualityOfTeaching ?? 0),
                'text-gray-300': n > (state.qualityOfTeaching ?? 0),
              }"
              >★</i
            >
          </span>
        </div>
      </div>
      <p v-if="errors.qualityOfTeaching" class="text-red-500 text-sm">
        {{ errors.qualityOfTeaching }}
      </p>
    </div>

    <!-- Repeat similar blocks for safety, location, socialEvents, etc. -->
    <div class="flex flex-col mb-4">
      <div class="flex items-center">
        <label for="safety" class="font-semibold mr-2">Safety</label>
        <div class="flex">
          <span
            v-for="n in 5"
            :key="n"
            class="cursor-pointer"
            @click="setRating('safety', n)"
          >
            <i :class="n <= state.safety ? 'text-yellow-500' : 'text-gray-300'"
              >★</i
            >
          </span>
        </div>
      </div>
      <p v-if="errors.safety" class="text-red-500 text-sm">
        {{ errors.safety }}
      </p>
    </div>

    <div class="flex flex-col mb-4">
      <div class="flex items-center">
        <label for="location" class="font-semibold mr-2">Location</label>
        <div class="flex">
          <span
            v-for="n in 5"
            :key="n"
            class="cursor-pointer"
            @click="setRating('location', n)"
          >
            <i
              :class="n <= state.location ? 'text-yellow-500' : 'text-gray-300'"
              >★</i
            >
          </span>
        </div>
      </div>
      <p v-if="errors.location" class="text-red-500 text-sm">
        {{ errors.location }}
      </p>
    </div>

    <div class="flex flex-col mb-4">
      <div class="flex items-center">
        <label for="socialEvents" class="font-semibold mr-2"
          >Social Events</label
        >
        <div class="flex">
          <span
            v-for="n in 5"
            :key="n"
            class="cursor-pointer"
            @click="setRating('socialEvents', n)"
          >
            <i
              :class="
                n <= state.socialEvents ? 'text-yellow-500' : 'text-gray-100'
              "
              >★</i
            >
          </span>
        </div>
      </div>
      <p v-if="errors.socialEvents" class="text-red-500 text-sm">
        {{ errors.socialEvents }}
      </p>
    </div>

    <div class="flex flex-col mb-4">
      <div class="flex items-center">
        <label for="facilities" class="font-semibold mr-2">Facilities</label>
        <div class="flex">
          <span
            v-for="n in 5"
            :key="n"
            class="cursor-pointer"
            @click="setRating('facilities', n)"
          >
            <i
              :class="
                n <= state.facilities ? 'text-yellow-500' : 'text-gray-100'
              "
              >★</i
            >
          </span>
        </div>
      </div>
      <p v-if="errors.facilities" class="text-red-500 text-sm">
        {{ errors.facilities }}
      </p>
    </div>

    <!-- Course Content -->
    <div class="flex flex-col mb-4">
      <div class="flex items-center">
        <label for="courseContent" class="font-semibold mr-2"
          >Course Content</label
        >
        <div class="flex">
          <span
            v-for="n in 5"
            :key="n"
            class="cursor-pointer"
            @click="setRating('courseContent', n)"
          >
            <i
              :class="
                n <= state.courseContent ? 'text-yellow-500' : 'text-gray-100'
              "
              >★</i
            >
          </span>
        </div>
      </div>
      <p v-if="errors.courseContent" class="text-red-500 text-sm">
        {{ errors.courseContent }}
      </p>
    </div>

    <!-- Housing and Accommodation -->
    <div class="flex flex-col mb-4">
      <div class="flex items-center">
        <label for="housingAndAccommodation" class="font-semibold mr-2"
          >Housing and Accommodation</label
        >
        <div class="flex">
          <span
            v-for="n in 5"
            :key="n"
            class="cursor-pointer"
            @click="setRating('housingAndAccommodation', n)"
          >
            <i
              :class="
                n <= state.housingAndAccommodation
                  ? 'text-yellow-500'
                  : 'text-gray-100'
              "
              >★</i
            >
          </span>
        </div>
      </div>
      <p v-if="errors.housingAndAccommodation" class="text-red-500 text-sm">
        {{ errors.housingAndAccommodation }}
      </p>
    </div>

    <!-- International Focus -->
    <div class="flex flex-col mb-4">
      <div class="flex items-center">
        <label for="internationalFocus" class="font-semibold mr-2"
          >International Focus</label
        >
        <div class="flex">
          <span
            v-for="n in 5"
            :key="n"
            class="cursor-pointer"
            @click="setRating('internationalFocus', n)"
          >
            <i
              :class="
                n <= state.internationalFocus
                  ? 'text-yellow-500'
                  : 'text-gray-100'
              "
              >★</i
            >
          </span>
        </div>
      </div>
      <p v-if="errors.internationalFocus" class="text-red-500 text-sm">
        {{ errors.internationalFocus }}
      </p>
    </div>

    <!-- Mental Health and Wellness Services -->
    <div class="flex flex-col mb-4">
      <div class="flex items-center">
        <label for="mentalHealthAndWellnessServices" class="font-semibold mr-2"
          >Mental Health and Wellness Services</label
        >
        <div class="flex">
          <span
            v-for="n in 5"
            :key="n"
            class="cursor-pointer"
            @click="setRating('mentalHealthAndWellnessServices', n)"
          >
            <i
              :class="
                n <= state.mentalHealthAndWellnessServices
                  ? 'text-yellow-500'
                  : 'text-gray-100'
              "
              >★</i
            >
          </span>
        </div>
      </div>
      <p
        v-if="errors.mentalHealthAndWellnessServices"
        class="text-red-500 text-sm"
      >
        {{ errors.mentalHealthAndWellnessServices }}
      </p>
    </div>

    <!-- Career Services and Internship Opportunities -->
    <div class="flex flex-col mb-4">
      <div class="flex items-center">
        <label
          for="careerServicesAndInternshipOpportunities"
          class="font-semibold mr-2"
          >Career Services and Internship Opportunities</label
        >
        <div class="flex">
          <span
            v-for="n in 5"
            :key="n"
            class="cursor-pointer"
            @click="setRating('careerServicesAndInternshipOpportunities', n)"
          >
            <i
              :class="
                n <= state.careerServicesAndInternshipOpportunities
                  ? 'text-yellow-500'
                  : 'text-gray-100'
              "
              >★</i
            >
          </span>
        </div>
      </div>
      <p
        v-if="errors.careerServicesAndInternshipOpportunities"
        class="text-red-500 text-sm"
      >
        {{ errors.careerServicesAndInternshipOpportunities }}
      </p>
    </div>

    <!-- Additional Comments -->
    <div class="flex flex-col mb-4">
      <label for="additionalComments" class="font-semibold"
        >Additional Comments</label
      >
      <textarea
        v-model="state.additionalComments"
        id="additionalComments"
        class="border p-2 rounded-md"
        :class="{ 'border-red-500': errors.additionalComments }"
        placeholder="What do you like most about the university? What do you think could be improved?"
      ></textarea>
      <p v-if="errors.additionalComments" class="text-red-500 text-sm">
        {{ errors.additionalComments }}
      </p>
    </div>

    <button
      type="submit"
      class="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
    >
      Submit
    </button>
  </form>
</template>

<style scoped>
i {
  font-size: 1.5rem;
}
.text-sm {
  color: red;
}
</style>
