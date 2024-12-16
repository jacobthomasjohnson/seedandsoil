import "./globals.css";
import { Header } from "./components/Header";
import { Garden } from "./components/Garden";
import { Actions } from "./components/Actions";
import { Time } from "./components/Time";
import { Notifications } from "./components/Notifications";

export const metadata = {
      title: "seed&soil",
      description: "grow your garden",
};

export default function RootLayout({ children }) {
      return (
            <html lang="en">
                  <body>
                        <div className="flex flex-col h-full">
                              <Header />
                              <Time />
                              <Garden />
                              <Actions />
                              <Notifications />
                        </div>
                        {children}
                  </body>
            </html>
      );
}
