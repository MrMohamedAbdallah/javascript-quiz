<script setup>

const route = useRoute();

const {questions, isLoading, dir, hasError, notFound} = useGenerateQuestions(route.params.lang.join('/'));


const currentQuestion = computed(() => {
  if (questionsHTMl.value.length)
    return questionsHTMl.value[index.value];
  return null;
});
const answers = computed(() => {
  if (currentQuestion.value) {
    let html = [];
    for (let li of currentQuestion.value.answers.children) {
      html.push(li.innerHTML);
    }
    return html;
  }
  return 'null';
});

const increase = () => {
  index.value++;
  if (index.value >= questionsHTMl.length)
    index.value = questionsHTMl.length - 1;
}

const decrease = () => {
  index.value--;
  if (index.value < 0)
    index.value = 0;
}

const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';

</script>

<template>
  <Loading v-if="isLoading"/>
  <div class="px-2">
    <div class="mx-auto prose">
      <template v-if="questions.length">
        {{ questions.length }}
        <div v-for="question in questions">
          <div>
            <h2 :dir="dir" class="text-slate-900 dark:text-slate-200">
              {{ question.title }}
            </h2>
          </div>
          <pre v-if="question.body" v-html="question.body"></pre>
          <ul class="px-0 list-none">
            <li v-for="(choice, i) in question.choices" :class="[
              'cursor-pointer p-2 rounded border border-solid hover:bg-blue-200 hover:border-blue-500 flex transition',
              {
                'bg-green-200 border-green-500': choice.isCorrect,
                'bg-red-200 border-red-500': !choice.isCorrect,
              }
            ]">
              <div class="flex items-center justify-center w-8 h-8 mr-2 font-bold bg-gray-200 rounded">
                {{ letters[i] }}
              </div>
              <div v-html="choice.html"></div>
            </li>
          </ul>
          <h1 class="text-center text-white bg-blue-200">Answer</h1>
          <div v-if="question.answer">
            <div v-html="question.answer" :dir="dir" class="text-slate-900 dark:text-slate-200"></div>
          </div>

          <hr>
          <hr>
          <hr>

        </div>
      </template>
    </div>
  </div>
</template>
