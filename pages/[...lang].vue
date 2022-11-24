<script setup>
import { marked } from 'marked';

const data = ref();
const html = ref('');
const questionsHTMl = ref([]);
const index = ref(0);
const userAnswer = ref(false);
const questions = ref([]);
const route = useRoute();
const dir = ref('ltr');

console.log(route.params.lang.join('/'));


/**
 * @param {HTMLElement} headerElement <h3> element of the question.
 * @return {String}
 */
const getQuestionTitle = (headerElement) => {
  let matches = headerElement.innerText.match(/[\d]+\.\ ([\w\W]*)/);
  if (!matches)
    matches = headerElement.innerText.match(/([\w\W]*)/);
  return matches[1];
}


/**
   * Get the correct answer's number.
   * 
   * @param {HTMLElement} detailsElement <details> element of the question that contains answer content.
   * @return {String}
   */
const getCorrectAnswerNumber = (detailsElement) => {
  let correctAnswerElement = detailsElement.querySelector('h4[id^="answer"]');
  if (!correctAnswerElement)
    correctAnswerElement = detailsElement.querySelector('h4');
  if (!correctAnswerElement) {
    correctAnswerElement = detailsElement.querySelector('div') ? detailsElement.querySelector('div').firstChild : null;
    if (correctAnswerElement)
      correctAnswerElement.innerText = correctAnswerElement.textContent
  }
  if (!correctAnswerElement)
    correctAnswerElement = detailsElement.firstChild;

  if (!correctAnswerElement) {
    return '';
  }

  const correctAnswerText = correctAnswerElement.innerText.trim();
  return correctAnswerText[correctAnswerText.length - 1];
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
  for (let i = 0; i < detailsElement.childElementCount - 3; i++) {
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
  // data.value = await $fetch('https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/README.md');
  data.value = await $fetch(`https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/${route.params.lang.join('/')}`);

  html.value = marked(data.value);

  const wrapper = document.createElement('div');
  wrapper.innerHTML = html.value;

  dir.value = wrapper.firstElementChild.getAttribute('dir') ?? 'ltr';


  // Questions with body
  wrapper.querySelectorAll('h6 + pre + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const bodyElement = choicesListElement.previousElementSibling;
    const headerElement = bodyElement.previousElementSibling;

    extractQuestionContent(headerElement, bodyElement, choicesListElement, detailsElement);
  });

  // Questions without body
  wrapper.querySelectorAll('h6 + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const headerElement = choicesListElement.previousElementSibling;

    extractQuestionContent(headerElement, null, choicesListElement, detailsElement);
  });


  // Questions with body
  wrapper.querySelectorAll('h6 + div + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const bodyElement = choicesListElement.previousElementSibling;
    const headerElement = bodyElement.previousElementSibling;

    extractQuestionContent(headerElement, bodyElement, choicesListElement, detailsElement);
  });


  // Questions with body
  wrapper.querySelectorAll('ol + div + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const bodyElement = choicesListElement.previousElementSibling;
    const headerElement = bodyElement.previousElementSibling.firstElementChild;

    extractQuestionContent(headerElement, bodyElement, choicesListElement, detailsElement);
  });


  // Questions with body
  wrapper.querySelectorAll('ol + pre + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const bodyElement = choicesListElement.previousElementSibling;
    const headerElement = bodyElement.previousElementSibling.firstElementChild;

    if (!headerElement)
      console.log(detailsElement)

    extractQuestionContent(headerElement, bodyElement, choicesListElement, detailsElement);
  });


  // Questions without body
  wrapper.querySelectorAll('div + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const headerElement = choicesListElement.previousElementSibling;

    extractQuestionContent(headerElement, null, choicesListElement, detailsElement);
  });


  // Questions with body
  wrapper.querySelectorAll('div + pre + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const bodyElement = choicesListElement.previousElementSibling;
    const headerElement = bodyElement.previousElementSibling;

    extractQuestionContent(headerElement, null, choicesListElement, detailsElement);
  });


  // Questions with body
  wrapper.querySelectorAll('p + pre + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const bodyElement = choicesListElement.previousElementSibling;
    const headerElement = bodyElement.previousElementSibling;

    extractQuestionContent(headerElement, null, choicesListElement, detailsElement);
  });


  // Questions without body
  wrapper.querySelectorAll('ol + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const headerElement = choicesListElement.previousElementSibling.firstElementChild;

    extractQuestionContent(headerElement, null, choicesListElement, detailsElement);
  });

  console.log(wrapper);

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
    <div class="mx-auto prose">
      <template v-if="questions.length">
        {{ questions.length }}
        <div v-for="question in questions">
          <div>
            <h2 :dir="dir">
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
            <div v-html="question.answer" :dir="dir"></div>
          </div>

          <hr>
          <hr>
          <hr>

        </div>
      </template>
    </div>
  </div>
</template>
