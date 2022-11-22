<script setup>
import { marked } from 'marked';

const data = ref();
const html = ref('');
const questionsHTMl = ref([]);
const index = ref(0);
const userAnswer = ref(false);
const questions = ref([]);


/**
 * @param {HTMLElement} headerElement <h3> element of the question.
 * @return {String}
 */
const getQuestionTitle = (headerElement) => {
  return headerElement.innerText.match(/[\d]+\.\ ([\w\W]*)/)[1];
}


/**
   * Get the correct answer's number.
   * 
   * @param {HTMLElement} detailsElement <details> element of the question that contains answer content.
   * @return {String}
   */
const getCorrectAnswerNumber = (detailsElement) => {
  const correctAnswerText = detailsElement.querySelector('h4[id^="answer"]').innerText.trim();
  return correctAnswerText;
}


/**
 * Return an array of answers objects.
 * 
 * @param {HTMLElement} choicesListElement <ul> element of the question that contains choices list.
 * @param {String} correctAnswerNumber correct answer's number.
 * @return {Array}
 */
const generateChoices = (choicesListElement, correctAnswerNumber) => {
  const choices = [];

  for (let li of choicesListElement.children) {

    const answerNumber = li.innerHTML.trim()[0];

    choices.push({
      html: li.innerHTML.slice(2),
      isCorrect: answerNumber == correctAnswerNumber,
    });
  }

  return choices;
}


/**
 * @param {HTMLElement} bodyElement <pre> element of the question that contains question body's content.
 * @return {String}
 */
const getQuestionBodyContent = (bodyElement) => {
  return bodyElement.innerHTML;
}


/**
 * @param {HTMLElement} detailsElement <details> element of the question that contains answer content.
 * @return {String[]}
 */
const getAnswerContent = (detailsElement) => {
  const answerElement = document.createElement('div');
  for(let i = 0; i < detailsElement.childElementCount - 3; i++) {
    answerElement.appendChild(detailsElement.children[i + 3].cloneNode(true));
  }
  return answerElement.innerHTML;
}



/**
 * Extract questions content from HTML elements and add it to {questions} array.
 * 
 * @param {HTMLElement} headerElement question header element.
 * @param {HTMLElement} bodyElement question body element.
 * @param {HTMLElement} choicesListElement choices list element.
 * @param {HTMLElement} detailsElement answer details element.
 */
const extractQuestionContent = (headerElement, bodyElement, choicesListElement, detailsElement) => {
  questions.value.push({
    title: getQuestionTitle(headerElement),
    body: bodyElement ? getQuestionBodyContent(bodyElement) : null,
    choices: generateChoices(choicesListElement, getCorrectAnswerNumber(detailsElement)),
    answer: getAnswerContent(detailsElement),
  });
}



onMounted(async () => {
  data.value = await $fetch('https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/README.md');

  html.value = marked(data.value);

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.value;


  // Questions with body
  wrapper.querySelectorAll('h6 + pre + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const bodyElement = choicesListElement.previousElementSibling;
    const headerElement = bodyElement.previousElementSibling;

    extractQuestionContent(headerElement, bodyElement, choicesListElement, detailsElement);
  });

  // Questions without body
  wrapper.querySelectorAll('h6 +ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const headerElement = choicesListElement.previousElementSibling;

    extractQuestionContent(headerElement, null, choicesListElement, detailsElement);
  });
})


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
  <div class="px-2">
    <div class="prose mx-auto">
      <template v-if="questions.length">
        <div v-for="question in questions">
          <div>
            <h2>
              {{ question.title }}
            </h2>
          </div>
          <pre v-if="question.body" v-html="question.body"></pre>
          <ul class="list-none px-0">
            <li v-for="(choice, i) in question.choices" :class="[
              'cursor-pointer p-2 rounded border border-solid hover:bg-blue-200 hover:border-blue-500 flex transition',
              {
                'bg-green-200 border-green-500': userAnswer,
                'bg-red-200 border-red-500': userAnswer,
              }
            ]">
              <div class="w-8 h-8 rounded bg-gray-200 mr-2 font-bold flex items-center justify-center">
                {{ letters[i] }}
              </div>
              <div v-html="choice.html"></div>
            </li>
          </ul>
          <div v-if="userAnswer || true">
            <div v-html="question.answer"></div>
          </div>

          <hr>
          <hr>
          <hr>

        </div>
      </template>
    </div>

  </div>
</template>
