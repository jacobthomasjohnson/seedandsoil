"use client";

import useGameStore from "../store/gameStore";
import { useRef, useState, useEffect } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import "react-perfect-scrollbar/dist/css/styles.css";

export const Notifications = ({ maxHeight }) => {
      const notifications = useGameStore((state) => state.notifications);
      const notificationsRef = useRef(null);
      useEffect(() => {
            if (notifications.length === 0) {
                  return;
            }
            const notificationMessage = notifications[notifications.length - 1];
            const notificationDiv = document.createElement("div");
            notificationDiv.className = "notification";
            notificationDiv.innerHTML = `${notificationMessage}`;
            notificationsRef.current.prepend(notificationDiv);
            setTimeout(() => {
                  notificationDiv.remove();
            }, 10000);
      }, [notifications]);
      return (
            <div
                  className={`notifications hide-scrollbar`}
                  style={{
                        maxHeight: `${maxHeight}px`,
                  }}
                  ref={notificationsRef}
            ></div>
      );
};

export default Notifications;
