import { Component } from 'react';

import { PossibleAnswer, Quiz } from '../interfaces';
import { fetchActiveQuiz, postAnswer } from './api';
import PossibleAnswers from './PossibleAnswers';

interface State {
  quiz: Quiz | null;
  answers: { [key: number]: PossibleAnswer };
}

class Answer extends Component<{}, State> {
  state: State = {
    quiz: null,
    answers: {},
  };
  async componentDidMount() {
    const res = await fetchActiveQuiz();
    this.setState({
      quiz: res.data,
    });
  }
  async handleAnswer(answer: PossibleAnswer, questionId: number) {
    await postAnswer(answer.title, questionId);
    this.setState({
      answers: {
        ...this.state.answers,
        [questionId]: answer,
      },
    });
  }
  render() {
    const { quiz, answers } = this.state;

    if (!quiz) {
      return <div>Loading...</div>;
    }

    return (
      <div className="Answer">
        <h2>{quiz.name}</h2>
        {quiz.questions.map((q) => (
          <div key={q.id}>
            <p>{q.title}</p>
            <PossibleAnswers
              possibleAnswers={q.possibleAnswers}
              selectedAnswer={answers[q.id]}
              onSelectedAnswer={(answer) => this.handleAnswer(answer, q.id)}
            />
          </div>
        ))}
      </div>
    );
  }
}

export default Answer;
