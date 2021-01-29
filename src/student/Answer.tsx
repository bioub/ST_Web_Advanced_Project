import classNames from "classnames";
import { Component } from "react";

import { PossibleAnswer, Quiz } from "../teacher/api";
import styles from './Answer.module.css';
import { fetchActiveQuiz, postAnswer } from "./api";

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
    const { quiz } = this.state;
    return (
      <div className="Answer">
        {quiz && (
          <>
            <h2>{quiz.name}</h2>
            {quiz.questions.map((q) => (
              <div key={q.id}>
                <p>{q.title}</p>
                {q.possibleAnswers.map((a, i) => (
                  <button
                    disabled={Boolean(this.state.answers[q.id])}
                    className={classNames({
                      [styles.good]:
                        this.state.answers[q.id] === a &&
                        this.state.answers[q.id]?.good,
                      [styles.bad]:
                        this.state.answers[q.id] === a &&
                        !this.state.answers[q.id]?.good,
                    })}
                    key={i}
                    onClick={() => this.handleAnswer(a, q.id)}
                  >
                    {a.title}
                  </button>
                ))}
              </div>
            ))}
          </>
        )}
      </div>
    );
  }
}

export default Answer;
