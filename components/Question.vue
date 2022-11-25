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
          'cursor-pointer p-2 rounded border border-solid flex transition',
          {
            'hover:bg-blue-200 hover:border-blue-500': !showAnswer,
            'bg-green-200 border-green-500': showAnswer && choice.isCorrect,
            'bg-red-200 border-red-500': showAnswer && !choice.isCorrect && question.userAnswer == i,
            'border-blue-500 bg-blue-200': question.userAnswer == i && !showAnswer,
          }
        ]"
        @click="$emit('select', i)"
      >
        <div class="flex items-center justify-center w-8 h-8 mr-2 font-bold bg-gray-200 rounded">
          {{ letters[i] }}
        </div>
        <div v-html="choice.html"></div>
      </li>
    </ul>
    <div v-if="question.answer && showAnswer">
      <div v-html="question.answer" :dir="dir" class="text-slate-900 dark:text-slate-200"></div>
    </div>
  </div>
</template>