<script setup>

const route = useRoute();
const quizQuestions = ref([]);
const numberOfQuestions = ref(1);
const started = ref(false);

const {questions, dir, isLoading, isLoaded, hasError, notFound} = useGenerateQuestions(route.params.lang.join('/'));


/**
 * Reorder the "questions" array in a random order.
 * @return {void}
 */
const shuffleQuestions = () => {
  for(let i = 0; i < questions.value.length; i++) {
    let randomIndex = Math.floor(Math.random() * questions.value.length);

    let temp = questions.value[i];
    questions.value[i] = questions.value[randomIndex];
    questions.value[randomIndex] = temp;
  }
}


/**
 * Generate questions array and assign it to "quizQuestions" for the quiz.
 * @return {void}
 */
const generateQuestions = () => {
  
  shuffleQuestions();
  
  quizQuestions.value = [];

  for(let i = 0; i < numberOfQuestions.value; i++)
    quizQuestions.value.push({
      ...questions.value[i],
      userAnswer: null,
    })
}


const handleInputChange = () => {
  if(numberOfQuestions.value < 1)
      numberOfQuestions.value = 1;
  if(numberOfQuestions.value > questions.value.length)
      numberOfQuestions.value = questions.value.length;
}


/**
 * Start quiz process.
 * @return {void}
 */
const start = () => {
  generateQuestions();
  started.value = true;
}


/**
 * Start quiz process with all questions.
 * @return {void}
 */
const all = () => {
  numberOfQuestions.value = questions.value.length;
  start();
}
</script>

<template>
  <Loading v-if="isLoading"/>
  <div class="px-2 py-16">
    
    <div class="max-w-5xl mx-auto text-center" v-if="isLoaded && !started">
      <h3 class="mb-4 font-bold text-8xl text-bold text-javascript">{{ questions.length}}</h3>
      <h3 class="text-4xl font-bold text-bold dark:text-white">Available Questions</h3>

      <div class="max-w-full px-2 mx-auto my-4 text-left w-96">
        <label for="number-of-questions" class="block mb-2">Choose how many questions you want in the quiz.</label>
        <input
          type="number"
          id="number-of-questions"
          min="1" 
          :max="questions.length" 
          v-model="numberOfQuestions"
          @change="handleInputChange"
          class=" 
            [ block w-full px-3 py-1.5 m-0 ] 
            [ text-gray-700 bg-white ] 
            [ border border-solid border-gray-300 rounded ] 
            [ transition ease-in-out ] 
            [ focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none ]
          "
          >
          
          <div class="flex items-center justify-between my-4">
            <button type="button" @click="all" class="inline-block rounded-lg text-indigo-600 dark:text-indigo-500 dark:hover:text-white hover:text-white hover:bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-7 shadow-sm ring-2 ring-indigo-600">
              All Questions 🚀
            </button>
            <button type="button" @click="start" class="inline-block rounded-lg bg-indigo-600 px-4 py-1.5 text-sm font-semibold leading-7 text-white shadow-sm ring-2 ring-indigo-600 hover:bg-indigo-700 hover:ring-indigo-700">
              Start <span class="text-indigo-200">&rarr;</span>
            </button>
          </div>
      </div>
    </div>

    

    
    
    <div class="mx-auto prose" v-if="started">
        <QuizQuestions :questions="quizQuestions" :dir="dir"/>
    </div>
  </div>
</template>
