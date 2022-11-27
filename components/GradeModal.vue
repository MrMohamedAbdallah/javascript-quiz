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
    <h2 class="mx-auto mt-0 mb-8 text-6xl font-bold text-center rtl:text-center">
      <span class="text-javascript">{{ grade }}</span> <span class="text-4xl dark:text-gray-200">/{{ total }}</span>
    </h2>
    <p class="mt-4 mb-0 text-2xl font-semibold rtl:text-center">
      <span v-if="ratio < .6">{{ $t('try-harder')}} 😔</span>
      <span v-else-if="ratio < .7">{{ $t('just-luck')}} 🙄</span>
      <span v-else-if="ratio < .9">{{ $t('get-better')}} ✊</span>
      <span v-else-if="ratio < 1">{{ $t('little-bit')}} 🤏</span>
      <span v-else>🥳✨🎊🎉🥳✨🎊🎉</span>
    </p>

    <div class="flex items-center justify-between mt-8">
      <NuxtLink to="/" class="rounded-lg text-indigo-600 dark:text-indigo-500 dark:hover:text-white hover:text-white hover:bg-indigo-600 px-4 py-1.5 text-xs sm:text-sm font-semibold shadow-sm ring-2 ring-indigo-600 no-underline">
        {{ $t('go-home')}}
      </NuxtLink>
      <button 
        class="rounded-lg bg-indigo-600 px-4 py-1.5 text-xs sm:text-sm font-semibold text-white shadow-sm ring-2 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
        @click="$emit('review')"
      >
        {{ $t('review-answers')}}
        <Locale>
          &rarr;
          <template #ar>
            &larr;
          </template>
        </Locale>
      </button>
    </div>
  </Modal>
</template>
