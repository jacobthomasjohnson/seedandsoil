"use client";

import useGameStore from "../store/gameStore";
import { useRef, useState, useEffect } from "react";

export const Notifications = () => {
      const timeOfDayColor = useGameStore((state) => state.timeOfDayColor);
      const notifications = useGameStore((state) => state.notifications);

      useEffect(() => {
            if (notifications.length === 0) {
                  return;
            }
            const notificationMessage = notifications[0];
            const notificationDiv = document.createElement("div");
            notificationDiv.className = "notification";
            notificationDiv.style.backgroundColor = `${timeOfDayColor}`;
            notificationDiv.innerHTML = `${notificationMessage}`;
            document.body.appendChild(notificationDiv);
            setTimeout(() => {
                  notificationDiv.remove();
            }, 3000);
      }, [notifications]);
      return <div></div>;
};

export default Notifications;
