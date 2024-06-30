/**
 * @class
 * @param {...Array} arrays - Arrays containing data for quiz generation.
 */
class QuizGenerator {
  constructor(...arrays) {
    this.selectedDataArray = this.combineAndFilterArrays(...arrays);
    this.progress = 0;
    this.numCorrect = 0;
    this.numIncorrect = 0;
    this.complete = false;
    this.startTime = new Date();
    this.endTime = null;
    this.elapsedTime = null;
  }

  /**
   * @returns {number} - The current progress as an number from 0 to 100 with decimals.
   */
  getProgress() {
    return this.progress;
  }

  endQuiz() {
    this.complete = true;
    this.endTime = new Date();
    this.elapsedTime = (this.endTime - this.startTime) / 1000;
  }

  combineAndFilterArrays(...arrays) {
    const combinedArray = arrays.flat();
    return combinedArray.filter((item) => item.character !== "");
  }

  /**
   * @param {string} correctAnswer - The correct answer for the question.
   * @param {string} answerType - The type of answer ('romaji', 'readings', 'meanings', or defaulting to 'character').
   * @returns {Array} - A shuffled array containing the correct answer and three random choices.
   */
  generateAnswerOptions(correctAnswer, answerType) {
    const choices = [correctAnswer];
    while (choices.length < 4) {
      const randomItem =
        this.selectedDataArray[
          Math.floor(Math.random() * this.selectedDataArray.length)
        ];
      let randomChoice;
      switch (answerType) {
        case "romaji":
          randomChoice = randomItem.romaji;
          break;
        case "readings":
          randomChoice = randomItem.readings;
          break;
        case "meanings":
          randomChoice = randomItem.meanings;
          break;
        default:
          randomChoice = randomItem.character;
      }

      if (randomChoice && !choices.includes(randomChoice)) {
        choices.push(randomChoice);
      }
    }

    for (let i = choices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [choices[i], choices[j]] = [choices[j], choices[i]];
    }

    return choices;
  }

  incrementProgress() {
    this.progress += 6.25;
    if (this.progress >= 100) {
      this.progress = 100;
      this.endQuiz();
    }
  }

  decrementProgress() {
    this.progress -= 3;
    if (this.progress < 0) {
      this.progress = 0;
    }
  }

  incrementNumCorrect() {
    this.numCorrect += 1;
  }

  incrementNumIncorrect() {
    this.numIncorrect += 1;
  }

  /**
   * @returns {Object} - An object containing the calculated score and XP.
   */
  getScoreAndXP() {
    const totalQuestions = this.numCorrect + this.numIncorrect;
    const percentage = Math.round((this.numCorrect / totalQuestions) * 100);

    let score = percentage;
    let xp = Math.round((percentage / 100) * 15);

    if (score === 100) {
      xp = 15;
    }

    return { score, xp };
  }

  /**
   * @returns {string} - A formatted string representing the elapsed time as mm:ss
   */
  getTime() {
    const minutes = Math.floor(this.elapsedTime / 60);
    const seconds = Math.floor(this.elapsedTime % 60);
    return `${minutes.toString().padStart(1, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  }

  /**
   * @param {Object} randomQuestion - random object from selected data array, contains character, romaji, readings, and/or meanings
   * @param {string} questionType - type of question to generate
   * @returns { Object } - object with questionDirection, questionSubject, answer, and choices
   */
  getQuestion(randomQuestion, questionType) {
    let questionDirection, questionSubject, answer, choices;

    const characterQuestion = "Chọn (các) ký tự đúng cho";
    const oneCharacterQuestion = "Chọn ký tự đúng cho";
    const readingQuestion = "Chọn cách đọc đúng cho";
    const meaningQuestion = "Chọn nghĩa đúng cho";

    switch (questionType) {
      case "RomajiToCharacter":
        questionDirection = characterQuestion;
        questionSubject = randomQuestion.romaji;
        answer = randomQuestion.character;
        choices = this.generateAnswerOptions(answer, "character");
        break;
      case "CharacterToRomaji":
        questionDirection = characterQuestion;
        questionSubject = randomQuestion.character;
        answer = randomQuestion.romaji;
        choices = this.generateAnswerOptions(answer, "romaji");
        break;
      case "CharacterToMeaning":
        questionDirection = meaningQuestion;
        questionSubject = randomQuestion.character;
        answer = randomQuestion.meanings;
        choices = this.generateAnswerOptions(answer, "meanings");
        break;
      case "MeaningToCharacter":
        questionDirection = characterQuestion;
        questionSubject = randomQuestion.meanings;
        answer = randomQuestion.character;
        choices = this.generateAnswerOptions(answer, "character");
        break;
      case "CharacterToReading":
        questionDirection = readingQuestion;
        questionSubject = randomQuestion.character;
        answer = randomQuestion.readings;
        choices = this.generateAnswerOptions(answer, "readings");
        break;
      case "ReadingToCharacter":
        questionDirection = characterQuestion;
        questionSubject = randomQuestion.readings;
        answer = randomQuestion.character;
        choices = this.generateAnswerOptions(answer, "character");
        break;
      case "ReadingToOneCharacter":
        questionDirection = oneCharacterQuestion;
        questionSubject = randomQuestion.readings;
        answer = randomQuestion.character;
        choices = this.generateAnswerOptions(answer, "character");
        break;
      default:
        questionDirection = oneCharacterQuestion;
        questionSubject = randomQuestion.meanings;
        answer = randomQuestion.character;
        choices = this.generateAnswerOptions(answer, "character");
    }
    return { questionDirection, questionSubject, answer, choices };
  }
}

/**
 * @class
 * @extends QuizGenerator
 * @param {string} type - The type of quiz ('hiragana', 'katakana', or 'kanji').
 * @param {...Array} arrays - Arrays containing data for quiz generation.
 */
class HiraKataKanjiQuiz extends QuizGenerator {
  constructor(type, ...arrays) {
    super(...arrays);
    this.quizType = type;
  }

  /**
   * @returns {Object} - The generated question object.
   */
  generateQuestion() {
    const randomQuestion =
      this.selectedDataArray[
        Math.floor(Math.random() * this.selectedDataArray.length)
      ];

    if (this.quizType === "kanji") {
      return this.generateKanjiQuestion(randomQuestion);
    } else if (this.quizType === "hiragana" || this.quizType === "katakana") {
      return this.generateHiraKataQuestion(randomQuestion);
    }
  }

  /**
   * @param {Object} randomQuestion - The randomly selected question object.
   * @returns {Object} - The generated question object.
   */
  generateHiraKataQuestion(randomQuestion) {
    if (Math.random() < 0.5) {
      return this.getQuestion(randomQuestion, "RomajiToCharacter");
    } else {
      return this.getQuestion(randomQuestion, "CharacterToRomaji");
    }
  }

  /**
   * @param {Object} randomQuestion - The randomly selected question object.
   * @returns {Object} - The generated question object.
   */
  generateKanjiQuestion(randomQuestion) {
    if (!randomQuestion.readings) {
      if (Math.random() < 0.5) {
        return this.getQuestion(randomQuestion, "CharacterToMeaning");
      } else {
        return this.getQuestion(randomQuestion, "MeaningToCharacter");
      }
    }

    const randomIndex = Math.floor(Math.random() * 4);

    switch (randomIndex) {
      case 0:
        return this.getQuestion(randomQuestion, "CharacterToReading");
      case 1:
        return this.getQuestion(randomQuestion, "CharacterToMeaning");
      case 2:
        return this.getQuestion(randomQuestion, "ReadingToOneCharacter");
      default:
        return this.getQuestion(randomQuestion, "MeaningToOneCharacter");
    }
  }
}

/**
 * @class
 * @extends QuizGenerator
 * @param {string} type - The type of quiz ('kanji' for kanji-related questions, default for vocabulary).
 * @param {...Array} arrays - Arrays containing data for quiz generation.
 */
class VocabQuiz extends QuizGenerator {
  constructor(type, ...arrays) {
    super(...arrays);
    this.quizType = type;
  }

  /**
   * @returns {Object} - The generated question object.
   */
  generateQuestion() {
    const randomQuestion =
      this.selectedDataArray[
        Math.floor(Math.random() * this.selectedDataArray.length)
      ];

    if (this.quizType === "kanji") {
      if (Math.random() < 0.5) {
        return this.getQuestion(randomQuestion, "CharacterToReading");
      } else {
        return this.getQuestion(randomQuestion, "ReadingToCharacter");
      }
    } else {
      if (Math.random() < 0.5) {
        return this.getQuestion(randomQuestion, "CharacterToMeaning");
      } else {
        return this.getQuestion(randomQuestion, "MeaningToCharacter");
      }
    }
  }
}

export { HiraKataKanjiQuiz, VocabQuiz };
