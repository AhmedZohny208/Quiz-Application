import {Quiz} from './quiz.js'

export class Settings {
 constructor() {
  this.questions

  this.categoryElement = document.getElementById('category')
  this.difficultyElement = document.getElementsByName('difficulty')
  this.numberOfQuestionsElement = document.getElementById('numberOfQuestions')

  this.startBtn = document.getElementById('startBtn')

  this.startBtn.addEventListener('click', this.startQuiz.bind(this))
 }

 async startQuiz() {
  this.category = this.categoryElement.value
  this.difficulty = Array.from(this.difficultyElement).filter(element => element.checked)[0].value
  this.amount = this.numberOfQuestionsElement.value

  this.questions = await this.fetchUrl(`https://opentdb.com/api.php?amount=${this.amount}&category=${this.category}&difficulty=${this.difficulty}`)
  
  if (this.questions.length > 0) {
   $('#setting').fadeOut(500, function(){
    $('#quiz').fadeIn(500)
   })

   new Quiz(this.questions)
  }
 }

 async fetchUrl(URL) {
  let response = await fetch(URL)
  let result = await response.json()
  return result.results
 }
}