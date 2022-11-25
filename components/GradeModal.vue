<script setup>
const $emit = defineEmits(['update:visible', 'review']);

const props = defineProps({
  visible: Boolean,
  grade: Number,
  total: Number,
})


const ratio = computed(() => {
  return props.grade / props.total;
})

const close = () => {
  $emit('update:visible', false);
}
</script>
<template>
  <Modal :visible="visible" @close="close" size="sm">
    <h2 class="mx-auto mt-0 mb-8 text-6xl font-bold text-center">
      <span class="text-javascript">{{ grade }}</span> <span class="text-4xl">/{{ total }}</span>
    </h2>
    <p class="mt-4 mb-0 text-2xl font-semibold text-center">
      <span v-if="ratio < .6">Try harder next time 😔</span>
      <span v-else-if="ratio < .7">Was that just a luck? 🙄</span>
      <span v-else-if="ratio < .9">You can get better ✊</span>
      <span v-else-if="ratio < 1">Just a little bit 🤏</span>
      <span v-else>Suuuuuuuuuuuuuuuer 🥳</span>
    </p>

    <div class="flex items-center justify-between mt-8">
      <NuxtLink to="/" class="inline-block rounded-lg text-indigo-600 dark:text-indigo-500 dark:hover:text-white hover:text-white hover:bg-indigo-600 px-4 py-1.5 text-sm font-semibold shadow-sm ring-2 ring-indigo-600 no-underline">
        Go to homepage
      </NuxtLink>
      <button 
        class="rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold text-white shadow-sm ring-2 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="$emit('review')"
      >
        Review your answers &rarr;
      </button>
    </div>
  </Modal>
</template>
