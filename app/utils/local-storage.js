export function saveQuestions(questions) {
  localStorage.setItem('questions', JSON.stringify(questions));
}

export function getQuestions() {
  return JSON.parse(localStorage.getItem('questions'));
}
