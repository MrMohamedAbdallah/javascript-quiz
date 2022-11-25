<script setup>
const props = defineProps({
  questions: Array,
  dir: 'ltr',
})

const select = (questionIndex, answerIndex) => {
  quizQuestions.value[questionIndex].userAnswer = answerIndex;
}
</script>
<template>
  <Question 
    v-for="(question, i) in questions"
    :question="question"
    :dir="dir"
    :index="i"
    @select="select(i, $event)" 
  />
</template>