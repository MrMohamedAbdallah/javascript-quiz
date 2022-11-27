<script setup>
const visible = ref(false);

const openModel = () => {
  visible.value = true;
}
</script>

<template>
  <div class="relative overflow-hidden bg-white dark:bg-slate-900">
    <!-- Circles -->

    <!-- Left -->
    <div class="absolute h-40 rotate-45 bg-blue-200 rounded-full opacity-50 pointer-events-none dark:opacity-20 w-96 dark:bg-blue-900 blur-3xl -top-10 -left-5">
    </div>
    <div class="absolute h-40 rotate-45 bg-green-200 rounded-full opacity-50 pointer-events-none dark:opacity-20 w-96 dark:bg-pink-900 blur-3xl top-1/4 -left-5">
    </div>
    <div class="absolute h-40 rotate-45 bg-indigo-200 rounded-full opacity-50 pointer-events-none dark:opacity-20 w-96 dark:bg-indigo-900 blur-3xl top-1/3 -left-5">
    </div>
    <div class="absolute h-40 rotate-45 bg-red-100 rounded-full opacity-50 pointer-events-none dark:opacity-20 w-96 dark:bg-cyan-900 blur-3xl top-1/3 -left-5">
    </div>

    <!-- Right -->
    <div
      class="absolute hidden h-40 rotate-45 bg-blue-200 rounded-full opacity-50 pointer-events-none sm:block dark:opacity-20 w-96 dark:bg-blue-900 blur-3xl -top-10 -right-5">
    </div>
    <div
      class="absolute hidden h-40 rotate-45 bg-green-200 rounded-full opacity-50 pointer-events-none sm:block dark:opacity-20 w-96 dark:bg-pink-900 blur-3xl top-1/4 -right-5">
    </div>
    <div
      class="absolute hidden h-40 rotate-45 bg-indigo-200 rounded-full opacity-50 pointer-events-none sm:block dark:opacity-20 w-96 dark:bg-indigo-900 blur-3xl top-1/3 -right-5">
    </div>
    <div
      class="absolute hidden h-40 rotate-45 bg-red-100 rounded-full opacity-50 pointer-events-none sm:block dark:opacity-20 w-96 dark:bg-cyan-900 blur-3xl top-1/3 -right-5">
    </div>


    <!-- /Circles -->
    <div class="absolute w-full h-full">
      <svg xmlns="http://www.w3.org/2000/svg" width="100%" height="100%" class=" stroke-[#94a3b8] dark:stroke-gray-600 opacity-5">
        <defs>
          <pattern id="grid1" patternUnits="userSpaceOnUse" width="40" height="1" patternTransform="rotate(90)">
            <line x1="5" y1="0" x2="5" y2="10"/>
          </pattern>
          <pattern id="grid2" patternUnits="userSpaceOnUse" width="40" height="1" patternTransform="rotate(0)">
            <line x1="5" y1="0" x2="5" y2="10" />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid1)" />
        <rect width="100%" height="100%" fill="url(#grid2)" />
      </svg>
    </div>
    <main class="relative z-10 flex items-center justify-center min-h-screen">
      <div class="max-w-6xl px-5 py-10 content">
        <h1 class="text-4xl font-bold tracking-tight text-black sm:text-center sm:text-7xl dark:text-white">
          <Locale>
            <span class="text-javascript">{{ $t('javascript') }}</span> {{ $t('quiz-questions') }}
            <template #ar>
              {{ $t('quiz-questions') }} <span class="text-javascript">{{ $t('javascript') }}</span>
            </template>
          </Locale>
        </h1>
        <p class="mt-6 text-xl leading-8 text-gray-600 dark:text-slate-400 sm:text-center">
          <Locale>
            <span v-html="$t('home-subtitle') + ' '"></span>
            <a href="https://github.com/lydiahallie/javascript-questions" target="_blank"
            class="font-semibold underline decoration-indigo-500">repo</a>.
            <template #ar>
              <div class="flex flex-wrap items-center justify-center">
                <span>تم جمع الاسئلة من</span>&nbsp;
                <a href="https://github.com/lydiahallie/javascript-questions" target="_blank"
                class="font-semibold underline decoration-indigo-500">المستودع</a>&nbsp;
                <strong>الاكثر شهره</strong>&nbsp;
                <span>لاسئلة جافاسكرتب</span>
              </div>
            </template>
          </Locale>
        </p>
        <div class="flex mt-8 gap-x-4 sm:justify-center">
          <a href="#"
            class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-lg font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700"
            @click="openModel"
          >
            {{ $t('start-your-quiz') }}
            <span class="text-indigo-200" aria-hidden="true">
              <Locale>
                &rarr;
                <template #ar>
                  &larr;
                </template>
              </Locale>
            </span>
          </a>
        </div>
      </div>
    </main>

    <LanguagesModal v-model:visible="visible"/>

  </div>
</template>


<style scoped>
line {
  /* stroke: rgba(148, 163, 184, 0.05); */
  stroke-width: 1;
}
</style>