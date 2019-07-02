export function saveCurrentExamName(name) {
  localStorage.setItem('current_exam', name);
}
export function getCurrentExamName() {
  return localStorage.getItem('current_exam');
}
export function resetExam() {
  localStorage.removeItem('current_exam');
  localStorage.removeItem('exam');
}
export function saveExam(questions) {
  localStorage.setItem('exam', JSON.stringify(questions));
}

export function getExam() {
  return JSON.parse(localStorage.getItem('exam'));
}
