import { createI18n } from 'vue-i18n';

export default defineNuxtPlugin(nuxtApp => {
  const i18n = createI18n({
    locale: 'en',
    messages: {
      ar: {
        'home': "الرئيسية",
        'quiz-questions': "اسئلة اختبار",
        'javascript': "جافاسكربت",
        'home-subtitle': 'تم جمع الاسئلة من المستودع الاكثر شهره لاسئلة',
        'repo': 'مستودع',
        'start-your-quiz': 'ابدأ اختبارك',
        'choose-your-language': 'أختر لغتك',
        'available-questions': 'سؤال متوفرة',
        'choose-questions': 'أختر عدد الاسئلة التى تريده فى الاختبار.',
        'start': 'أبدأ',
        'all-questions': '🚀 جميع الاسئلة',
        'back': 'السابق',
        'next': 'التالى',
        'submit': 'إرسال',
        'try-harder': 'حاول بجد في المرة القادمة',
        'just-luck': 'هل كان هذا مجرد حظ؟',
        'get-better': 'تستطيع ان تصبح افضل',
        'little-bit': 'بقى القليل فقط',
        'go-home': 'اذهب للصفحة الرئيسية',
        'review-answers': 'مراجعة الاجابات',
        'share': 'شارك',
        'share-results': 'شارك نتيجتك',
      },
      en: {
        'home': "Home",
        'quiz-questions': "Quiz Questions",
        'javascript': "Javascript",
        'home-subtitle': 'The questions are generate from the most popular JavaScript questions',
        'repo': 'repo',
        'start-your-quiz': 'Start Your Quiz',
        'choose-your-language': 'Choose Your Language',
        'available-questions': 'Available Questions',
        'choose-questions': 'Choose how many questions you want in the quiz.',
        'start': 'Start',
        'all-questions': 'All Questions 🚀',
        'back': 'Back',
        'next': 'Next',
        'submit': 'Submit',
        'try-harder': 'Try harder next time',
        'just-luck': 'Was that just a luck?',
        'get-better': 'You can get better',
        'little-bit': 'Just a little bit',
        'go-home': 'Go to homepage',
        'review-answers': 'Review your answers',
        'share': 'Share',
        'share-results': 'Share Results',
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
