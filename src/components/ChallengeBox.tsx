import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import { CountdownContext } from "../contexts/CountdownContext";
import { ChallengeBoxContainer } from "../styles/components/ChallengeBox";
import { useTranslation } from "next-i18next";

const ChallengeBox = () => {
  const { activeChallenge, resetChallenge, completeChallenge } =
    useContext(ChallengesContext);

  const { resetCountdown } = useContext(CountdownContext);

  const { t } = useTranslation("challengeBox");

  function handleChallengeComplete() {
    completeChallenge();
    resetCountdown();
  }

  function handleChallengeFail() {
    resetChallenge();
    resetCountdown();
  }

  return (
    <ChallengeBoxContainer active={activeChallenge ? true : false}>
      {activeChallenge ? (
        <div className="challengeActive">
          <header>
            {t("win")} {activeChallenge.amount} xp
          </header>

          <main>
            <img src={`icons/${activeChallenge.type}.svg`} alt="" />
            <strong>{t("newChallenge")}</strong>
            <p>{activeChallenge.description}</p>
          </main>

          <footer>
            <button
              type="button"
              onClick={handleChallengeFail}
              className="challengeFailedButton"
            >
              {t("failed")}
            </button>
            <button
              type="button"
              onClick={handleChallengeComplete}
              className="challengeCompletedButton"
            >
              {t("completed")}
            </button>
          </footer>
        </div>
      ) : (
        <div className="challengeNotActive">
          <strong>{t("defaultMessage")}</strong>
          <p>
            <img src="icons/level-up.svg" alt="Level Up" />
            {t("defaultSubMessage")}
          </p>
        </div>
      )}
    </ChallengeBoxContainer>
  );
};

export default ChallengeBox;
