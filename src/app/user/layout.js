import HeaderPage from "@/components/HeaderPage";


export const metadata = {
  title: "Home",
  description: "",
};

export default function UserLayout({ children }) {

   
  return (
    
      < >
   <HeaderPage/>
   <div style={{zIndex:0}}>

        {children}
   </div>
     
      </>
   
  );
}
