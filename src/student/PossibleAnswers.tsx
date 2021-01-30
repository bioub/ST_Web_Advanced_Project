import classNames from "classnames";

import { PossibleAnswer } from "../interfaces";
import styles from "./PossibleAnswer.module.css";

interface PossibleAnswersProps {
  possibleAnswers: PossibleAnswer[];
  selectedAnswer: PossibleAnswer;
  onSelectedAnswer: (answer: PossibleAnswer) => void;
}

function PossibleAnswers({
  possibleAnswers,
  selectedAnswer,
  onSelectedAnswer,
}: PossibleAnswersProps) {
  return (
    <div className="PossibleAnswers">
      {possibleAnswers.map((a, i) => (
        <button
          disabled={Boolean(selectedAnswer)}
          className={classNames({
            [styles.good]: selectedAnswer === a && selectedAnswer?.good,
            [styles.bad]: selectedAnswer === a && !selectedAnswer?.good,
          })}
          key={i}
          onClick={() => onSelectedAnswer(a)}
        >
          {a.title}
        </button>
      ))}
    </div>
  );
}

export default PossibleAnswers;
