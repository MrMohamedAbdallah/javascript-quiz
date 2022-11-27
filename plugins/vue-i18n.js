import { createI18n } from 'vue-i18n';

export default defineNuxtPlugin(nuxtApp => {
  const i18n = createI18n({
    locale: 'en',
    messages: {
      ar: {
        'home': "Home",
        'home-title': "Quiz Questions",
        'home-subtitle': 'The questions are generate from the most popular JavaScript questions',
        'repo': 'repo',
        'start-your-quiz': 'Start Your Quiz',
        'choose-your-language': 'Choose Your Language',
        'available-questions': 'Available Questions',
        'choose-questions': 'Choose how many questions you want in the quiz.',
        'start': 'Start',
        'all-questions': 'all-questions',
        'back': 'Back',
        'next': 'Next',
        'submit': 'Submit',
        'try-harder': 'Try harder next time',
        'just-luck': 'Was that just a luck?',
        'get-better': 'You can get better',
        'little-bit': 'Just a little bit',
        'go-home': 'Go to homepage',
        'review-answers': 'Review your answers',
      },
      en: {
        'home': "Home",
        'home-title': "Quiz Questions",
        'home-subtitle': 'The questions are generate from the most popular JavaScript questions',
        'repo': 'repo',
        'start-your-quiz': 'Start Your Quiz',
        'choose-your-language': 'Choose Your Language',
        'available-questions': 'Available Questions',
        'choose-questions': 'Choose how many questions you want in the quiz.',
        'start': 'Start',
        'all-questions': 'all-questions',
        'back': 'Back',
        'next': 'Next',
        'submit': 'Submit',
        'try-harder': 'Try harder next time',
        'just-luck': 'Was that just a luck?',
        'get-better': 'You can get better',
        'little-bit': 'Just a little bit',
        'go-home': 'Go to homepage',
        'review-answers': 'Review your answers',
      }
    }
  })

  nuxtApp.vueApp.use(i18n);

  return {
    provide: {
      i18n: i18n,
    }
  }
})
