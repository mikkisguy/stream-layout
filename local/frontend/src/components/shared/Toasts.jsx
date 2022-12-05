import React from "react";
import { ToastContainer, Slide } from "react-toastify";
import { MINUTE, SECOND } from "../../constants";
import infoJson from "../../data/info.json";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import InfoToast from "./InfoToast";
import EventToast from "./EventToast";
import useSound from "use-sound";
import useLatest from "../../hooks/useLatest";
import FollowNotification from "../../assets/sounds/follow.mp3";
import SubNotification from "../../assets/sounds/sub.mp3";

const Toasts = () => {
  const visibleFor = SECOND * 5;
  const [toggleInfo, setToggleInfo] = useState(true);
  const milliseconds = toggleInfo ? SECOND * 6 : visibleFor; // MINUTE * 8

  const { latestSub, latestFollow } = useLatest();
  const [playFollow] = useSound(FollowNotification, {
    volume: 0.6,
    interrupt: false,
  });
  const [playSub] = useSound(SubNotification, {
    volume: 0.5,
    interrupt: false,
  });

  useEffect(() => {
    if (latestSub !== undefined || latestFollow !== undefined) {
      if (latestSub.isNew) {
        toast(<EventToast latest={latestSub} />, {
          autoClose: SECOND * 16,
          onOpen: () => playSub(),
        });
      }
      if (latestFollow.isNew) {
        toast(<EventToast latest={latestFollow} />, {
          autoClose: SECOND * 8,
          onOpen: () => playFollow(),
        });
      }
    }
  }, [latestSub, latestFollow]);

  return (
    <ToastContainer
      closeButton={false}
      position="bottom-left"
      hideProgressBar={false}
      newestOnTop={false}
      closeOnClick
      rtl={false}
      pauseOnFocusLoss={false}
      draggable={false}
      pauseOnHover={false}
      theme="dark"
      limit={6}
      transition={Slide}
    />
  );
};

export default Toasts;
