import style from '../components/page.module.css'

export const metadata = {
  title: "Home",
  description: "",
};

import { ReduxProvider } from '@/store/redux-provider';
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body  className={style.body}>
        <ReduxProvider>
        {children}
        </ReduxProvider>
      </body>
    </html>
  );
}
