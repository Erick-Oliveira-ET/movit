import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import { CompletedChallengesContainer } from "../styles/components/CompletedChallenges";
import { useTranslation } from "next-i18next";

const CompletedChalenges = () => {
  const { challengesCompleted, level } = useContext(ChallengesContext);

  const { t } = useTranslation("completedChallenges");

  return (
    <CompletedChallengesContainer>
      <div className="row">
        <div>
          <img src="icons/level.svg" alt="" />
          <span>{t("level")}</span>
        </div>
        <span>{level}</span>
      </div>
      <div className="row">
        <span>{t("challengesCompleted")}</span>
        <span>{challengesCompleted}</span>
      </div>
    </CompletedChallengesContainer>
  );
};

export default CompletedChalenges;
