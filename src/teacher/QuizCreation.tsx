import { Component, SyntheticEvent } from 'react';
import { RouteComponentProps } from 'react-router-dom';

import { Question } from '../interfaces';
import { postQuiz } from './api';

interface Props extends RouteComponentProps {}

interface State {
  name: string;
  questions: Question[];
}

class QuizCreation extends Component<Props, State> {
  state: State = {
    name: '',
    questions: [
      {
        id: 1,
        title: '',
        possibleAnswers: [
          {
            title: '',
            good: false,
          },
        ],
      },
    ],
  };

  createQuestion() {
    this.setState({
      questions: [
        ...this.state.questions,
        {
          id: this.state.questions.length + 1,
          title: '',
          possibleAnswers: [
            {
              title: '',
              good: false,
            },
          ],
        },
      ],
    });
  }

  createPossibleAnswer(questionId: number) {
    this.setState({
      questions: this.state.questions.map((q) => {
        if (q.id !== questionId) {
          return q;
        }
        return {
          ...q,
          possibleAnswers: [
            ...q.possibleAnswers,
            {
              title: '',
              good: false,
            },
          ],
        };
      }),
    });
  }

  handleSubmit = async (event: SyntheticEvent<HTMLFormElement>) => {
    event.preventDefault();
    await postQuiz(this.state);
    this.props.history.push('/teacher');
  };

  handleChangeName = (event: SyntheticEvent<HTMLInputElement>) => {
    this.setState({
      name: event.currentTarget.value,
    });
  };

  handleChangeQuestionTitle = (questionId: number, title: string) => {
    this.setState({
      questions: this.state.questions.map((q) => {
        if (q.id !== questionId) {
          return q;
        }
        return {
          ...q,
          title,
        };
      }),
    });
  };

  handleChangePossibleAnswerTitle = (
    questionId: number,
    answerIndex: number,
    title: string,
  ) => {
    this.setState({
      questions: this.state.questions.map((q) => {
        if (q.id !== questionId) {
          return q;
        }
        return {
          ...q,
          possibleAnswers: q.possibleAnswers.map((a, i) => {
            if (answerIndex !== i) {
              return a;
            }
            return {
              ...a,
              title,
            };
          }),
        };
      }),
    });
  };

  handleChangePossibleAnswerGood = (
    questionId: number,
    answerIndex: number,
    good: boolean,
  ) => {
    this.setState({
      questions: this.state.questions.map((q) => {
        if (q.id !== questionId) {
          return q;
        }
        return {
          ...q,
          possibleAnswers: q.possibleAnswers.map((a, i) => {
            if (answerIndex !== i) {
              return {
                ...a,
                good: false,
              };
            }
            return {
              ...a,
              good,
            };
          }),
        };
      }),
    });
  };

  render() {
    return (
      <div className="QuizCreation">
        <h2>Create new Quiz</h2>
        <form onSubmit={this.handleSubmit}>
          <div>
            <h3>Quiz Name</h3>
            <input value={this.state.name} onChange={this.handleChangeName} />
          </div>
          {this.state.questions.map((q) => (
            <div key={q.id}>
              <h3>Question {q.id}</h3>
              <div>
                <h4>Question title</h4>
                <input
                  value={q.title}
                  onChange={(event) =>
                    this.handleChangeQuestionTitle(q.id, event.target.value)
                  }
                />
              </div>
              <div>
                <h4>Possible Answers</h4>
                {q.possibleAnswers.map((a, i) => (
                  <div key={i}>
                    Title :{' '}
                    <input
                      type="text"
                      value={a.title}
                      onChange={(event) =>
                        this.handleChangePossibleAnswerTitle(
                          q.id,
                          i,
                          event.target.value,
                        )
                      }
                    />
                    <label>
                      <input
                        type="checkbox"
                        checked={a.good}
                        onChange={(event) =>
                          this.handleChangePossibleAnswerGood(
                            q.id,
                            i,
                            event.target.checked,
                          )
                        }
                      />{' '}
                      Good answer
                    </label>
                  </div>
                ))}
                <button
                  type="button"
                  onClick={() => this.createPossibleAnswer(q.id)}
                >
                  Add possible answer
                </button>
              </div>
            </div>
          ))}
          <div>
            <button type="button" onClick={() => this.createQuestion()}>
              Add question
            </button>
          </div>
          <div>
            <button type="submit">Submit quiz</button>
          </div>
        </form>
      </div>
    );
  }
}

export default QuizCreation;
