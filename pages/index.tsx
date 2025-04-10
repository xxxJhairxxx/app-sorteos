import Head from "next/head";
import Image from "next/image";
import { useState } from "react";
// import { Geist, Geist_Mono } from "next/font/google";

// // const geistSans = Geist({
// //   variable: "--font-geist-sans",
// //   subsets: ["latin"],
// // });


export default function Home() {

  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState<string>('')
  const [countNames, setCountNames] = useState<number>(0)
  const [pagina, setPagina] = useState<number>(1);

  const handleInput = (e: any) => {
    // console.log(e)
    setInput(e.target.value)

    const newNames: string[] = e.target.value.split("\n").filter((name: any) => name.trim() !== "");
    setNames(newNames); // Actualiza los nombres en el estado
    setCountNames(newNames.length)
    console.log(newNames)
  };

  // Actualiza el valor del input a medida que el usuario escribe


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
          {pagina === 1 ? <div className=" w-[110rem] mx-auto bg-white px-[2rem] py-[2rem] my-[3rem] flex gap-[4rem]">
            <div className="w-1/2 ">
              <p className="text-[1.6rem] mb-[1.5rem] font-bold" >1. Ingresa los participantes</p>
              <div className="relative h-fit">
                <textarea onChange={handleInput} value={input} name="" id="lista" className="border-[0.1rem] border-[#d1d1d1] rounded-md w-full h-[25.3rem] px-[1.4rem] py-[1rem] max-h-[25.3rem] overflow-y-auto focus:border-[#d31c92] focus:border-2 focus:outline-0"></textarea>
                {countNames !== 0 &&
                  <span className=" absolute px-6 py-1 rounded-full right-6 bottom-10 bg-[#fee1f4] text-[#86197d] z-10"> {countNames}</span>}

              </div>
              <p className="text-[#7e868e] text-[1.4rem] mt-2">Agrega un * para indicar líderes de grupo. *Líder</p>
            </div>

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
                    onChange={() => { }}
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
                    onChange={() => { }}
                  />
                  Participantes por equipo

                </label>

              </div>
              <div>
                <input className="w-full border border-[#d1d1d1] text-[#797979] py-5 px-5 focus:border-[#d31c92] focus:border-2 focus:outline-0" type="text" value={"4 equipos  ✓"} />
              </div>
              <p className="text-[1.6rem] font-bold  my-[2rem]" >3. Título</p>
              <div>
                <input className="w-full border border-[#d1d1d1] text-[#797979] py-5 px-5 focus:border-[#d31c92] focus:border-2 focus:outline-0" type="text" value={"CAMOTE CUP"} />
              </div>

              <div className="mt-15 flex justify-end gap-15">
                <button onClick={() => { setInput(''); setCountNames(0) }} className="text-[1.6rem] font-bold text-[#d31c92] hover:text-[#86197d] cursor-pointer transition-colors">Limpiar</button>
                <button onClick={()=> setPagina(2)} className="bg-[#d31c92] text-[1.6rem] font-bold text-white px-10 py-5 rounded-lg hover:bg-[#86197d] cursor-pointer transition-colors">Generar Equipos</button>
              </div>
            </div>


          </div> : <div className=" w-[110rem] mx-auto bg-white px-[2rem] py-[2rem] my-[3rem] flex gap-[4rem]">
            <div className="w-1/2 ">
              <p className="text-[1.6rem] mb-[1.5rem] font-bold" >1. Ingresa los participantes 2025</p>
              <div className="relative h-fit">
                <textarea onChange={handleInput} value={input} name="" id="lista" className="border-[0.1rem] border-[#d1d1d1] rounded-md w-full h-[25.3rem] px-[1.4rem] py-[1rem] max-h-[25.3rem] overflow-y-auto focus:border-[#d31c92] focus:border-2 focus:outline-0"></textarea>
                {countNames !== 0 &&
                  <span className=" absolute px-6 py-1 rounded-full right-6 bottom-10 bg-[#fee1f4] text-[#86197d] z-10"> {countNames}</span>}

              </div>
              <p className="text-[#7e868e] text-[1.4rem] mt-2">Agrega un * para indicar líderes de grupo. *Líder</p>
            </div>

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
                    onChange={() => { }}
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
                    onChange={() => { }}
                  />
                  Participantes por equipo

                </label>

              </div>
              <div>
                <input className="w-full border border-[#d1d1d1] text-[#797979] py-5 px-5 focus:border-[#d31c92] focus:border-2 focus:outline-0" type="text" value={"4 equipos  ✓"} />
              </div>
              <p className="text-[1.6rem] font-bold  my-[2rem]" >3. Título</p>
              <div>
                <input className="w-full border border-[#d1d1d1] text-[#797979] py-5 px-5 focus:border-[#d31c92] focus:border-2 focus:outline-0" type="text" value={"CAMOTE CUP"} />
              </div>

              <div className="mt-15 flex justify-end gap-15">
                <button onClick={() => { setInput(''); setCountNames(0) }} className="text-[1.6rem] font-bold text-[#d31c92] hover:text-[#86197d] cursor-pointer transition-colors">Limpiar</button>
                <button className="bg-[#d31c92] text-[1.6rem] font-bold text-white px-10 py-5 rounded-lg hover:bg-[#86197d] cursor-pointer transition-colors">Generar Equipos</button>
              </div>
            </div>


          </div>}



        </div>
      </div>
    </div>
  );
}
