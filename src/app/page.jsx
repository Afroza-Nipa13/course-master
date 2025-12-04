import Banner from "@/components/Banner";
import PopularCourses from "@/components/PopularCourses";
import Image from "next/image";

export default function Home() {
  return (
    <div className=" bg-zinc-50 font-sans dark:bg-black">
     <Banner/> 

    <PopularCourses/>
    </div>
  );
}
