<script setup>
const props = defineProps({
  questions: Array,
  dir: 'ltr',
})

const currentIndex = ref(0);
const grade = ref(0);
const isSubmitted = ref(false);
const showModal = ref(false);

const next = () => {
  currentIndex.value += 1;
}

const back = () => {
  currentIndex.value -= 1;
}


const canGoNext = computed(() => {
  return props.questions[currentIndex.value].userAnswer != null;
})


const isLast = computed(() => {
  return currentIndex.value == props.questions.length - 1;
})


const canGoBack = computed(() => {
  return currentIndex.value > 0;
})

const select = (answerIndex) => {
  props.questions[currentIndex.value].userAnswer = answerIndex;
}

const getNumberOfRightAnswer = () => {
  return props.questions.filter(q => {
    return q.choices[q.userAnswer].isCorrect
  }).length;
}

const submit = () => {
  grade.value = getNumberOfRightAnswer();
  
  isSubmitted.value = true;
  showModal.value = true;
}

const review = () => {
  showModal.value = false;
  currentIndex.value = 0;
}
</script>
<template>
  
  <Question 
    :question="questions[currentIndex]"
    :dir="dir"
    :index="currentIndex"
    :showAnswer="isSubmitted"
    @select="select($event)" 
  />
  
  <div class="flex items-center justify-between my-4">
    <!-- Back -->
    <button 
      type="button"
      @click="back"
      :disabled="!canGoBack"
      class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-7 text-white shadow-sm ring-2 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      &larr; Back
    </button>
    <!-- /Back -->
    
    <!-- Next -->
    <button
      v-if="!isLast"
      type="button" 
      @click="next" 
      :disabled="!canGoNext"
      class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-7 text-white shadow-sm ring-2 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Next &rarr;
    </button>
    <!-- /Next -->
    <!-- Submit -->
    <button
      v-if="isLast"
      type="button"
      @click="submit" 
      :disabled="!canGoNext || isSubmitted"
      class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-7 text-white shadow-sm ring-2 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed"
    >
      Submit 🚀
    </button>
    <!-- /Submit -->
  </div>

  <GradeModal 
    v-model:visible="showModal" 
    :grade="grade"
    :total="questions.length"
    @review="review"
  />
  
</template>