
import style from '../components/page.module.css'

export const metadata = {
  title: "Home",
  description: "",
};

export default function RootLayout({ children }) {

  console.log('running')
   
  return (
    <html lang="en">
      <body  className={style.body}>
   
        {children}
     
      </body>
    </html>
  );
}
