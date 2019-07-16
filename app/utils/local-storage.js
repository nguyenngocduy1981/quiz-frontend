export function saveCurrentExamName(name) {
  localStorage.setItem('current_exam', name);
}

export function getCurrentExamName() {
  return localStorage.getItem('current_exam');
}

export function getExamResult() {
  return JSON.parse(localStorage.getItem('exam_result'));
}

export function resetExam() {
  const examRs = localStorage.getItem('exam');
  localStorage.setItem('exam_result', examRs);
  localStorage.removeItem('current_exam');
  localStorage.removeItem('exam');

}

export function saveExam(questions) {
  localStorage.setItem('exam', JSON.stringify(questions));
}

export function getExam() {
  return JSON.parse(localStorage.getItem('exam'));
}
