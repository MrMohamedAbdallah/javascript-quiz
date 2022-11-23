<template>
  <div class="bg-white dark:bg-slate-900 relative overflow-hidden">
    <!-- Circles -->

    <!-- Left -->
    <div class="opacity-50 dark:opacity-20 w-96 h-40 rotate-45 rounded-full bg-blue-200 dark:bg-blue-900 blur-3xl absolute -top-10 -left-5 pointer-events-none">
    </div>
    <div class="opacity-50 dark:opacity-20 w-96 h-40 rotate-45 rounded-full bg-green-200 dark:bg-pink-900 blur-3xl absolute top-1/4 -left-5 pointer-events-none">
    </div>
    <div class="opacity-50 dark:opacity-20 w-96 h-40 rotate-45 rounded-full bg-indigo-200 dark:bg-indigo-900 blur-3xl absolute top-1/3 -left-5 pointer-events-none">
    </div>
    <div class="opacity-50 dark:opacity-20 w-96 h-40 rotate-45 rounded-full bg-red-100 dark:bg-cyan-900 blur-3xl absolute top-1/3 -left-5 pointer-events-none">
    </div>

    <!-- Right -->
    <div
      class="hidden sm:block opacity-50 dark:opacity-20 w-96 h-40 rotate-45 rounded-full bg-blue-200 dark:bg-blue-900 blur-3xl absolute -top-10 -right-5 pointer-events-none">
    </div>
    <div
      class="hidden sm:block opacity-50 dark:opacity-20 w-96 h-40 rotate-45 rounded-full bg-green-200 dark:bg-pink-900 blur-3xl absolute top-1/4 -right-5 pointer-events-none">
    </div>
    <div
      class="hidden sm:block opacity-50 dark:opacity-20 w-96 h-40 rotate-45 rounded-full bg-indigo-200 dark:bg-indigo-900 blur-3xl absolute top-1/3 -right-5 pointer-events-none">
    </div>
    <div
      class="hidden sm:block opacity-50 dark:opacity-20 w-96 h-40 rotate-45 rounded-full bg-red-100 dark:bg-cyan-900 blur-3xl absolute top-1/3 -right-5 pointer-events-none">
    </div>

    <nav class="absolute z-20 w-full px-5 py-4">
      <div class="max-w-6xl mx-auto flex items-center justify-between">

        <div class="ml-auto text-gray-800 dark:text-gray-400 flex items-center">
          <ThemeSwitcher class="mr-4" />
          <a href="#" class="ml-auto ">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24">
              <path
                fill="currentColor"
                d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </div>
    </nav>

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
    <main class="min-h-screen flex items-center justify-center relative z-10">
      <div class="content px-5 py-10 max-w-6xl">
        <h1 class="text-4xl font-bold tracking-tight sm:text-center sm:text-7xl text-black dark:text-white">
          <span class="text-[#f0db4f]">JavaScript</span> Quiz Questions
        </h1>
        <p class="mt-6 text-xl leading-8 text-gray-600 dark:text-slate-400 sm:text-center">
          The questions are generate from the <strong>most</strong> popular JavaScript questions
          <a href="https://github.com/lydiahallie/javascript-questions" target="_blank"
            class="font-semibold underline decoration-indigo-500">repo</a>.
        </p>
        <div class="mt-8 flex gap-x-4 sm:justify-center">
          <a href="#"
            class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-lg font-semibold leading-7 text-white shadow-sm ring-1 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700">
            Start Your Quiz
            <span class="text-indigo-200" aria-hidden="true">&rarr;</span>
          </a>
        </div>
      </div>
    </main>
  </div>
</template>


<style scoped>
line {
  /* stroke: rgba(148, 163, 184, 0.05); */
  stroke-width: 1;
}
</style>