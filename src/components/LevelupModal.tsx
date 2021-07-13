import React, { useContext } from "react";
import { ChallengesContext } from "../contexts/ChallengeContext";
import {
  LevelUpModalContainer,
  Overlay,
} from "../styles/components/LevelUpModal";
import { useTranslation } from "next-i18next";

const LevelupModal = () => {
  const { t } = useTranslation("levelupModal");

  const { closeLevelupModal, level } = useContext(ChallengesContext);

  return (
    <Overlay>
      <LevelUpModalContainer>
        <header>{level}</header>

        <strong>{t("congratulations")}</strong>
        <p>{t("subtitleMessage")}</p>

        <button type="button" onClick={closeLevelupModal}>
          <img src="/icons/close.svg" alt="Fechar modal" />
        </button>
      </LevelUpModalContainer>
    </Overlay>
  );
};

export default LevelupModal;
