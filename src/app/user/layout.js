import Footer from "@/components/Footer";
import HeaderPage from "@/components/HeaderPage";


export const metadata = {
  title: "Home",
  description: "",
};

export default function UserLayout({ children }) {

   
  return (  
      <>
   <HeaderPage/>
        {children}
        <Footer/> 
      </>
   
  );
}
