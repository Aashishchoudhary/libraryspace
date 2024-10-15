import Footer from "@/components/Footer";
import HeaderPage from "@/components/HeaderPage";


export const metadata = {
  title: "Home",
  description: "",
};

export default function UserLayout({ children }) {

   
  return (
    
      <div >
   <HeaderPage/>
        {children}
     <Footer/>
      </div>
   
  );
}
