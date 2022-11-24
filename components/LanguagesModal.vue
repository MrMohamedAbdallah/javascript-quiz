<script setup>
const $emit = defineEmits(['update:visible'])

const props = defineProps({
  visible: Boolean,
});

const langs = [
  { name: 'العربية', flag: '🇸🇦', to: '/ar-AR/README_AR.md', },
  { name: 'المصرية العامية', flag: '🇪🇬', to: '/ar-EG/README_ar-EG.md', },
  { name: 'English', flag: '🇬🇧', to: '/README.md', },
  { name: 'Bosanski', flag: '🇧🇦', to: '/bs-BS/README-bs_BS.md', },
  { name: 'Deutsch', flag: '🇩🇪', to: '/de-DE/README.md', },
  { name: 'Español', flag: '🇪🇸', to: '/es-ES/README-ES.md', },
  { name: 'Français', flag: '🇫🇷', to: '/fr-FR/README_fr-FR.md', },
  { name: 'Indonesia', flag: '🇮🇩', to: '/id-ID/README.md', },
  { name: 'Italiano', flag: '🇮🇹', to: '/it-IT/README-IT.md', },
  { name: '日本語', flag: '🇯🇵', to: '/ja-JA/README-ja_JA.md', },
  { name: '한국어', flag: '🇰🇷', to: '/ko-KR/README-ko_KR.md', },
  { name: 'Nederlands', flag: '🇳🇱', to: '/nl-NL/README.md', },
  { name: 'Português Brasil', flag: '🇧🇷', to: '/pt-BR/README_pt_BR.md', },
  { name: 'Русский', flag: '🇷🇺', to: '/ru-RU/README.md', },
  { name: 'ไทย', flag: '🇹🇭', to: '/th-TH/README.md', },
  { name: 'Türkçe', flag: '🇹🇷', to: '/tr-TR/README-tr_TR.md', },
  { name: 'Українська мова', flag: '🇺🇦', to: '/uk-UA/README.md', },
  { name: 'Tiếng Việt', flag: '🇻🇳', to: '/vi-VI/README-vi.md', },
  { name: '简体中文', flag: '🇨🇳', to: '/zh-CN/README-zh_CN.md', },
  { name: '繁體中文', flag: '🇹🇼', to: '/zh-TW/README_zh-TW.md', },
];


const close = () => {
  $emit('update:visible', false);
}

</script>

<template>
  <div class="fixed top-0 left-0 z-30 flex items-center justify-center w-screen h-screen overflow-auto" v-if="visible">
    <!-- Overlay -->
    <div class="absolute w-full h-full bg-slate-900 dark:bg-slate-500 !bg-opacity-20"></div>

    <div class="relative w-full max-w-5xl p-8 bg-white rounded-lg shadow dark:text-slate-200 dark:bg-slate-900">

      <!-- Close -->
      <span class="absolute text-xl cursor-pointer top-2 right-4" @click="close">&times;</span>

      <h2 class="mx-auto mb-8 text-2xl font-bold text-center">Choose Your Language</h2>
      <div class="grid grid-cols-3 gap-4 sm:grid-cols-4 md:grid-cols-6 lg:grid-cols-8">
        <NuxtLink v-for="lang in langs" :to="lang.to"
          class="p-2 text-center border rounded cursor-pointer hover:border-indigo-500 dark:hover:bg-indigo-300 dark:hover:bg-opacity-20 hover:bg-opacity-30 hover:bg-indigo-200">
          <span class="text-lg font-emoji">{{ lang.flag }}</span>
          <span class="block text-xs">{{ lang.name }}</span>
        </NuxtLink>
      </div>
    </div>
  </div>
</template>