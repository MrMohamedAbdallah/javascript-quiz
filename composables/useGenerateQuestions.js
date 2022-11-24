import { marked } from 'marked';


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
  return {
    title: getQuestionTitle(headerElement),
    body: bodyElement ? getQuestionBodyContent(bodyElement) : null,
    choices: generateChoices(choicesListElement, getCorrectAnswerNumber(detailsElement)),
    answer: getAnswerContent(detailsElement),
  };
}



const transform = (html) => {
  const questions = [];
  const wrapper = document.createElement('div');
  wrapper.innerHTML = marked(html);



  // Questions with body
  wrapper.querySelectorAll('h6 + pre + ul + details, h6 + div + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const bodyElement = choicesListElement.previousElementSibling;
    const headerElement = bodyElement.previousElementSibling;

    questions.push(extractQuestionContent(headerElement, bodyElement, choicesListElement, detailsElement));
  });


  // Question without body
  wrapper.querySelectorAll('h6 + ul + details, div + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const headerElement = choicesListElement.previousElementSibling;

    questions.push(extractQuestionContent(headerElement, null, choicesListElement, detailsElement));
  });


  // Questions with body (list)
  wrapper.querySelectorAll('ol + pre + ul + details, ol + div + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const bodyElement = choicesListElement.previousElementSibling;
    const headerElement = bodyElement.previousElementSibling.firstElementChild;

    questions.push(extractQuestionContent(headerElement, bodyElement, choicesListElement, detailsElement));
  });


  // Questions with body
  wrapper.querySelectorAll('div + pre + ul + details, p + pre + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const bodyElement = choicesListElement.previousElementSibling;
    const headerElement = bodyElement.previousElementSibling;

    questions.push(extractQuestionContent(headerElement, null, choicesListElement, detailsElement));
  });


  // Questions without body
  wrapper.querySelectorAll('ol + ul + details').forEach(detailsElement => {
    const choicesListElement = detailsElement.previousElementSibling;
    const headerElement = choicesListElement.previousElementSibling.firstElementChild;

    questions.push(extractQuestionContent(headerElement, null, choicesListElement, detailsElement));
  });


  return { questions, dir: wrapper.firstElementChild.getAttribute('dir') ?? 'ltr' };
}



export default function (url) {
  const questions = ref([]);
  const dir = ref('ltr');
  const isLoading = ref(false);
  const hasError = ref(false);
  const notFound = ref(false);

  onMounted(async () => {
    isLoading.value = true;
    try {
      const html = await $fetch(`https://raw.githubusercontent.com/lydiahallie/javascript-questions/master/${url}`);
      isLoading.value = false;

      const transformedData = transform(html);

      questions.value = transformedData.questions;
      dir.value = transformedData.dir;
    } catch (e) {
      if (e.status && e.status == 404)
        notFound.value = true;
      hasError.value = true;
    }
    isLoading.value = false;
  })

  return {
    questions,
    dir,
    isLoading,
    hasError,
    notFound,
  }


}