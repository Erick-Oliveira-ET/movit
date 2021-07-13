import React, { useContext } from "react";
import { CountdownContext } from "../contexts/CountdownContext";
import {
  CountdownButton,
  CountdownButtonActive,
  CountdownContainer,
} from "../styles/components/Countdown";
import { useTranslation } from "next-i18next";

const Countdown = () => {
  const {
    minutes,
    seconds,
    isActive,
    hasFinished,
    resetCountdown,
    startCountdown,
  } = useContext(CountdownContext);

  const { t } = useTranslation("countdown");

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, "0").split("");
  const [secondLeft, secondRight] = String(seconds).padStart(2, "0").split("");

  const getButton = () => {
    if (isActive) {
      return (
        <CountdownButtonActive onClick={resetCountdown}>
          {t("leaveCycle")}
        </CountdownButtonActive>
      );
    }

    return (
      <CountdownButton onClick={startCountdown}>
        {t("startCycle")}
      </CountdownButton>
    );
  };

  return (
    <div>
      <CountdownContainer>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </CountdownContainer>

      {hasFinished ? (
        <CountdownButton>{t("cycleEnded")}</CountdownButton>
      ) : (
        getButton()
      )}
    </div>
  );
};

export default Countdown;
