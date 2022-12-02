<script setup>
import confetti from 'canvas-confetti';

const props = defineProps({
  questions: Array,
  dir: 'ltr',
})

const $emits = defineEmits(['restart']);


const currentIndex = ref(0);
const grade = ref(0);
const isSubmitted = ref(false);
const showModal = ref(false);

const results = computed(() => {
  if(isSubmitted.value)
    return props.questions.map(q => !!q.choices[q.userAnswer].isCorrect);
  return [];
});

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
  if (isSubmitted.value)
    return;
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


  if (grade.value == props.questions.length) {
    const callback = () => {
      const interval = Math.random() * 2000 + 200;
      if(showModal.value) {
        confetti({
          particleCount: 200,
          spread: 150
        });
        setTimeout(callback, interval)
      }
    }
    callback();
  }

}

const review = () => {
  showModal.value = false;
  currentIndex.value = 0;
}


const restart = () => $emits('restart');
</script>
<template>

  <div class="flex items-center justify-between mb-2" v-if="isSubmitted">
    <ShareButton text="share-results" :results="results"/>
    <button type="button" class="px-3 py-1 font-semibold text-black rounded bg-slate-50 hover:bg-slate-100 dark:bg-slate-800 dark:text-white dark:hover:bg-slate-700" @click="restart">{{ $t('try-again') }}</button>
  </div>

  <Question :question="questions[currentIndex]" :dir="dir" :index="currentIndex" :showAnswer="isSubmitted"
    @select="select($event)" />

  <div class="flex items-center justify-between my-4">
    <!-- Back -->
    <button type="button" @click="back" :disabled="!canGoBack"
      class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-7 text-white shadow-sm ring-2 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
      <span class="text-indigo-200">
        <Locale>
          &larr;
          <template #ar>
            &rarr;
          </template>
        </Locale>
      </span>
      {{ $t('back') }}
    </button>
    <!-- /Back -->

    <!-- Next -->
    <button v-if="!isLast" type="button" @click="next" :disabled="!canGoNext"
      class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-7 text-white shadow-sm ring-2 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
      {{ $t('next') }}
      <span class="text-indigo-200">
        <Locale>
          &rarr;
          <template #ar>
            &larr;
          </template>
        </Locale>
      </span>
    </button>
    <!-- /Next -->
    <!-- Submit -->
    <button v-if="isLast" type="button" @click="submit" :disabled="!canGoNext || isSubmitted"
      class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-7 text-white shadow-sm ring-2 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed">
      {{ $t('submit') }} 🚀
    </button>
    <!-- /Submit -->
  </div>

  <GradeModal v-model:visible="showModal" :grade="grade" :total="questions.length" :results="results" @review="review"/>

</template>