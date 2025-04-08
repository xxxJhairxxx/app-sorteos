import Head from "next/head";
import Image from "next/image";
// import { Geist, Geist_Mono } from "next/font/google";

// // const geistSans = Geist({
// //   variable: "--font-geist-sans",
// //   subsets: ["latin"],
// // });


export default function Home() {
  return (
    <div className="">
      <Head>
        <title>AppSorteos – Generador de Equipos Aleatorios</title>
      </Head>
      <nav className=" max-w-[1292px] mx-auto flex py-[16px] w-full">
        <picture className="block h-[38px]"> <Image className="w-full h-full object-contain" src={"https://app-sorteos.com/img/logo.svg"} width={714.219} height={167.126} alt=""></Image></picture>
      </nav>
      <div className="bg-[#f3f3fa] py-[8rem]">
        <div className="max-w-[110rem] mx-auto">
          <h1 className="text-[3rem] font-extrabold">Generador de Equipos y Grupos Aleatorios</h1>
          <p>Crea  <b>equipos al azar</b> a partir de una lista de nombres de forma automática y gratuita.</p>
          <div className=" w-[110rem] mx-auto bg-white px-[2rem] py-[2rem] my-[3rem] flex gap-[4rem]">
            <div className="w-1/2 ">
              <p className="text-[1.6rem] mb-[1.5rem] font-bold" >1. Ingresa los participantes</p>
              <textarea name="" id="lista" className="border-[0.1rem] border-[#d1d1d1] rounded-md w-full h-[25.3rem] px-[1.4rem] py-[1rem] max-h-[25.3rem] overflow-y-auto focus:border-[#d31c92] focus:border-2 focus:outline-0"></textarea></div>
            <div className="w-1/2">
              <p className="text-[1.6rem] font-bold" >2. Cómo dividir:</p>
              <div className="flex gap-5 my-[2rem]">
                <label className="flex gap-2">
                  <input
                  className="accent-[#d31c92] w-[2rem] h-[2rem] "
                    type="radio"
                    name="opciones"
                    value="option1"
                    checked={true}
                    onChange={()=>{}}
                  />
                  Cantidad de equipos

                </label>
                <label className="flex gap-2">
                  <input
                   className="accent-[#d31c92] w-[2rem] h-[2rem]"
                    type="radio"
                    name="opciones"
                    value="option1"
                    checked={true}
                    onChange={()=>{}}
                  />
                  Participantes por equipo

                </label>
                
              </div>
              <div>
                    <input className="w-full border border-[#d1d1d1] text-[#797979] py-5 px-5" type="text" value={"4 equipos  ✓"} />
                </div>
              <p className="text-[1.6rem] font-bold  my-[2rem]" >3. Título</p>
            </div>


          </div>
        </div>
      </div>
    </div>
  );
}
