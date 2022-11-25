<script setup>
const $emit = defineEmits(['close'])

const focusMode = ref(false);

const props = defineProps({
  visible: Boolean,
  size: 'lg',
});

const close = () => {
  $emit('close');
}

const handleClickOnOverlay = () => {
  focusMode.value = true;
  setTimeout(() => {
    focusMode.value = false;
  }, 200)
}

</script>

<template>
  <div class="fixed top-0 left-0 z-30 flex items-center justify-center w-screen h-screen overflow-auto" v-if="visible">
    <!-- Overlay -->
    <div class="absolute w-full h-full bg-slate-900 dark:bg-slate-500 !bg-opacity-20" @click="handleClickOnOverlay"></div>

    <div 
      class="relative w-full max-w-5xl p-8 transition-all bg-white rounded-lg shadow dark:text-slate-200 dark:bg-slate-900"
      :class="{
        'scale-105': focusMode,
        'max-w-5xl': size == 'lg',
        'max-w-2xl': size == 'sm',
      }"
    >

      <!-- Close -->
      <button type="button" class="absolute max-h-screen text-xl cursor-pointer top-2 right-4 focus:outline focus:outline-indigo-500" tabindex="0" @click="close">&times;</button>

      <slot />
    </div>
  </div>
</template>