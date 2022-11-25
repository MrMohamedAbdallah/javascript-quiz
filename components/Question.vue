<script setup>
const props = defineProps({
  question: Object,
  dir: 'ltr',
  selected: false,
  showAnswer: false,
  index: Number,
});

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
</script>

<template>
  <div>
    <div>
      <h2 :dir="dir" class="text-slate-900 dark:text-slate-200">
        {{ index + 1 }}. {{ question.title }}
      </h2>
    </div>
    <pre v-if="question.body" v-html="question.body"></pre>
    <ul class="px-0 list-none">
      <li v-for="(choice, i) in question.choices" :class="[
          'p-2 rounded border-2 border-solid flex transition',
          {
            'hover:bg-blue-200 hover:border-blue-500 dark:hover:bg-blue-800 dark:hover:bg-opacity-30 cursor-pointer': !showAnswer,
            'bg-green-200 border-green-500 dark:bg-green-600 dark:bg-opacity-20': showAnswer && choice.isCorrect,
            'bg-red-200 border-red-500 dark:bg-red-600 dark:bg-opacity-20': showAnswer && !choice.isCorrect && question.userAnswer == i,
            'border-blue-500 bg-blue-200 dark:bg-blue-800 dark:bg-opacity-30': question.userAnswer == i && !showAnswer,
          }
        ]"
        @click="$emit('select', i)"
      >
        <div class="flex items-center justify-center w-8 h-8 mr-2 font-bold bg-gray-100 rounded shadow">
          {{ letters[i] }}
        </div>
        <div v-html="choice.html" class="dark:text-gray-200"></div>
      </li>
    </ul>
    <div v-if="question.answer && showAnswer">
      <div v-html="question.answer" :dir="dir" class="text-slate-900 dark:text-slate-200"></div>
    </div>
  </div>
</template>