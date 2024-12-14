import "./globals.css";
import { Header } from "./components/Header";
import { Garden } from "./components/Garden";
import { Actions } from "./components/Actions";
import { Time } from "./components/Time";

export const metadata = {
      title: "seed&soil",
      description: "grow your garden",
};

export default function RootLayout({ children }) {
      return (
            <html lang="en">
                  <body>
                        <Header />
                        <Time />
                        <Garden />
                        <Actions />
                        {children}
                  </body>
            </html>
      );
}
