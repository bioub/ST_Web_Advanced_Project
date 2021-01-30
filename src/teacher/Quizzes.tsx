import { Component } from "react";
import { Link, Redirect } from "react-router-dom";

import { Quiz, User } from "../interfaces";
import { fetchCurrentUser, fetchQuizzes, postActivate } from "./api";

interface Props {}

interface State {
  user: Partial<User>;
  quizzes: Quiz[];
}

class Quizzes extends Component<Props, State> {
  state: State = {
    user: {},
    quizzes: [],
  };

  async componentDidMount() {
    const resUser = await fetchCurrentUser();
    this.setState({
      user: resUser.data,
    });
    const resQuizzes = await fetchQuizzes();
    this.setState({
      quizzes: resQuizzes.data,
    });
  }

  async handleActivate(quizId: number) {
    await postActivate(quizId);

    this.setState({
      quizzes: this.state.quizzes.map((q) => ({
        ...q,
        active: quizId === q.id,
      })),
    });
  }

  render() {
    if (!localStorage.getItem("token")) {
      return <Redirect to="/teacher/login" />;
    }

    return (
      <div className="Quizzes">
        <h2>Bonjour {this.state.user.username}</h2>
        <Link to="/teacher/create-quizz">Add new quiz</Link>
        <table>
          <thead>
            <tr>
              <th>Quiz</th>
              <th>Actions</th>
            </tr>
            {this.state.quizzes.map((q) => (
              <tr key={q.id}>
                <td>{q.name}</td>
                <td>
                  <button
                    disabled={q.active}
                    onClick={() => this.handleActivate(q.id)}
                  >
                    Activate
                  </button>
                </td>
              </tr>
            ))}
          </thead>
        </table>
      </div>
    );
  }
}

export default Quizzes;
