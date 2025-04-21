import Head from "next/head";
import Image from "next/image";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// import { Geist, Geist_Mono } from "next/font/google";

// // const geistSans = Geist({
// //   variable: "--font-geist-sans",
// //   subsets: ["latin"],
// // });

export default function Home() {
  const [names, setNames] = useState<string[]>([]);
  const [input, setInput] = useState<string>("");
  const [countNames, setCountNames] = useState<number>(0);
  const [pagina, setPagina] = useState<number>(1);
  const [title, setTitle] = useState<string>("");
  const [nteams, setNteams] = useState<number>(4);

  const handleInput = (e: any) => {
    // console.log(e)
    setInput(e.target.value);

    const newNames: string[] = e.target.value
      .split("\n")
      .filter((name: any) => name.trim() !== "");

    setNames(newNames); // Actualiza los nombres en el estado
    setCountNames(newNames.length);
    console.log(newNames);
    localStorage.setItem("names", JSON.stringify(names));
  };

  // Actualiza el valor del input a medida que el usuario escribe

  const formatDate = (date: Date): string => {
    const day = String(date.getDate()).padStart(2, "0");
    const month = String(date.getMonth() + 1).padStart(2, "0"); // Enero es 0
    const year = date.getFullYear();

    let hours = date.getHours();
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const ampm = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12; // 0 => 12
    const hoursStr = String(hours).padStart(2, "0");

    return `${day}-${month}-${year} ${hoursStr}:${minutes} ${ampm}`;
  };

  const now = new Date();
  const formattedDate = formatDate(now);

  const chunkArray = (arr: string[], chunkSize: number) => {
    const result = [];
    for (let i = 0; i < arr.length; i += chunkSize) {
      result.push(arr.slice(i, i + chunkSize));
    }
    return result;
  };

  const teamChunks = chunkArray(names, nteams);

  const [visibleIndexes, setVisibleIndexes] = useState<number[]>([]);

  useEffect(() => {
    if (pagina === 2 && names.length > 0) {
      let i = -1;
      const interval = setInterval(() => {
        setVisibleIndexes((prev) => [...prev, i]);
        i++;
        if (i >= names.length) clearInterval(interval);
      }, 200);
      return () => clearInterval(interval);
    }
  }, [pagina, names]);

  useEffect(() => {
    if (pagina === 1) {
      setVisibleIndexes([]);
    }
  }, [pagina]);

  useEffect(() => {
    const storedNames = localStorage.getItem("names");
    if (storedNames) {
    
      let array = JSON.parse(storedNames).join("\n");
      setInput(array);
      setCountNames(JSON.parse(storedNames).length);
      setNames(JSON.parse(storedNames));
    }
  }, []);

  return (
    <div className="">
      <Head>
        <title>AppSorteos – Generador de Equipos Aleatorios</title>
      </Head>
      <nav className=" flex py-[16px] w-full cursor-pointer">
        <div className=" max-w-[1292px] mx-auto w-[80%] flex justify-between items-center">
           <picture className="block h-[38px]">
          <Image
            className="w-full h-full object-contain"
            src={"https://app-sorteos.com/img/logo.svg"}
            width={714.219}
            height={167.126}
            alt=""
          ></Image>
        </picture>
            <ul className="flex gap-[2rem] text-[#495057] text-[1.4rem] font-semibold">
              <li className="flex items-center gap-2"><svg xmlns="http://www.w3.org/2000/svg" className="w-[1.4rem]" viewBox="0 0 512 512"><path d="M149.3 56v80c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V56c0-13.3 10.7-24 24-24h101.3c13.3 0 24 10.7 24 24zm181.3 240v-80c0-13.3-10.7-24-24-24H205.3c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24h101.3c13.3 0 24-10.7 24-24zm32-240v80c0 13.3 10.7 24 24 24H488c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H386.7c-13.3 0-24 10.7-24 24zm-32 80V56c0-13.3-10.7-24-24-24H205.3c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24h101.3c13.3 0 24-10.7 24-24zm-205.3 56H24c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24h101.3c13.3 0 24-10.7 24-24v-80c0-13.3-10.7-24-24-24zM0 376v80c0 13.3 10.7 24 24 24h101.3c13.3 0 24-10.7 24-24v-80c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24zm386.7-56H488c13.3 0 24-10.7 24-24v-80c0-13.3-10.7-24-24-24H386.7c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24zm0 160H488c13.3 0 24-10.7 24-24v-80c0-13.3-10.7-24-24-24H386.7c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24zM181.3 376v80c0 13.3 10.7 24 24 24h101.3c13.3 0 24-10.7 24-24v-80c0-13.3-10.7-24-24-24H205.3c-13.3 0-24 10.7-24 24z"/></svg> 
              Aplicaciones <Image src="https://cdn-icons-png.flaticon.com/128/10412/10412566.png"className="w-[1.3rem] h-[1.6rem] rotate-180 mt-1" width={50} height={50} alt="arrow-down" /></li>
              <li>Precios</li>
              <li className="flex items-center gap-2">Ayuda <Image src="https://cdn-icons-png.flaticon.com/128/10412/10412566.png"className="w-[1.3rem] h-[1.6rem] rotate-180 mt-1" width={50} height={50} alt="arrow-down" /></li>
            </ul>
            <ul className="flex gap-[2rem] items-center ">
              <li >Ingresar
              </li>
              <li > <button className="bg-[#d31c92] font-semibold text-white px-7 py-3 rounded-lg hover:bg-[#86197d] cursor-pointer transition-colors">Crear cuenta</button></li>
              <li className="flex gap-2">ES <Image src="https://cdn-icons-png.flaticon.com/128/10412/10412566.png"className="w-[1.3rem] h-[1.6rem] rotate-180 mt-1" width={50} height={50} alt="arrow-down" />
              </li>
            </ul>
        </div>
      </nav>
      <div className="bg-[#f3f3fa] py-[8rem]">
        <div className="max-w-[110rem] mx-auto">
          <h1 className="text-[3rem] font-extrabold">
            Generador de Equipos y Grupos Aleatorios
          </h1>
          <p>
            Crea <b>equipos al azar</b> a partir de una lista de nombres de
            forma automática y gratuita.
          </p>
          {pagina === 1 ? (
            <div className=" w-[110rem] mx-auto bg-white px-[2rem] py-[2rem] my-[3rem] flex gap-[4rem]">
              <div className="w-1/2 ">
                <p className="text-[1.6rem] mb-[1.5rem] font-bold">
                  1. Ingresa los participantes
                </p>
                <div className="relative h-fit">
                  <textarea
                    onChange={handleInput}
                    value={input}
                    name=""
                    id="lista"
                    className="text-[1.4rem] text-[#495057] border-[0.1rem] border-[#d1d1d1] rounded-md w-full h-[25.3rem] px-[1.4rem] py-[1rem] max-h-[25.3rem] overflow-y-auto focus:border-[#d31c92] focus:border-2 focus:outline-0"
                  ></textarea>
                  {countNames !== 0 && (
                    <span className=" absolute px-6 py-1 rounded-full right-6 bottom-10 bg-[#fee1f4] text-[#86197d] z-10">
                      {countNames}
                    </span>
                  )}
                </div>
                <p className="text-[#7e868e] text-[1.4rem] mt-2">
                  Agrega un * para indicar líderes de grupo. *Líder
                </p>
              </div>

              <div className="w-1/2">
                <p className="text-[1.6rem] font-bold">2. Cómo dividir:</p>
                <div className="flex gap-5 my-[2rem]">
                  <label className="flex gap-2">
                    <input
                      className="accent-[#d31c92] w-[2rem] h-[2rem] "
                      type="radio"
                      name="opciones"
                      value="option1"
                      checked={true}
                      onChange={() => {}}
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
                      onChange={() => {}}
                    />
                    Participantes por equipo
                  </label>
                </div>
                <div>
                  <input
                    className="w-full border border-[#d1d1d1] rounded-md text-[#797979] py-5 px-5 focus:border-[#d31c92] focus:border-2 focus:outline-0"
                    type="text"
                    value={"4 equipos  ✓"}
                  />
                </div>
                <p className="text-[1.6rem] font-bold  my-[2rem]">3. Título</p>
                <div>
                  <input
                    placeholder="Copa del mundo Qatar 2022"
                    className="w-full rounded-md border border-[#d1d1d1] text-[#797979] py-5 px-5 focus:border-[#d31c92] focus:border-2 focus:outline-0"
                    type="text"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                  />
                </div>

                <div className="mt-15 flex justify-end gap-15">
                  <button
                    onClick={() => {
                      setInput("");
                      setCountNames(0);
                    }}
                    className="text-[1.6rem] font-bold text-[#d31c92] hover:text-[#86197d] cursor-pointer transition-colors"
                  >
                    Limpiar
                  </button>
                  <button
                    onClick={() => setPagina(2)}
                    className="bg-[#d31c92] text-[1.6rem] font-bold text-white px-10 py-5 rounded-lg hover:bg-[#86197d] cursor-pointer transition-colors"
                  >
                    Generar Equipos
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className=" w-[110rem] mx-auto bg-white px-[3rem] py-[2.5rem] my-[3rem] flex gap-[4rem]">
              <div className="w-full">
                <p className="text-[2.4rem] mb-[1.5rem] font-bold">
                  {title.length === 0 ? "Sorteo de  Equipos" : title}{" "}
                  <span className="text-[1.7rem] text-[#7e868e]">
                    (Editar Titulo)
                  </span>
                </p>
                <p className="px-3 py-2 text-[#7E868E] bg-[#f8f8f8]  text-[1.4rem]">
                  Equipos generados aleatoriamente por app-sorteos.com -{" "}
                  {formattedDate}
                </p>
                <div className="relative h-fit w-full mt-10">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {teamChunks.map((teamMembers, index) => (
                      <div key={index}>
                        <h3 className="text-[1.6rem] px-6 py-4 bg-gray-100 font-semibold mb-2">
                          Equipo {index + 1}
                        </h3>
                        <ul className="px-8 py-4 grid grid-cols-3 gap-7 space-y-2">
                          {teamMembers.map((member, idx) => {
                            const globalIndex = index * 4 + idx;
                            const isVisible =
                              visibleIndexes.includes(globalIndex);

                            return (
                              <motion.li
                                key={idx}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{
                                  opacity: isVisible ? 1 : 0,
                                  y: isVisible ? 0 : 10,
                                }}
                                transition={{ duration: 0.4 }}
                                className="text-gray-800"
                              >
                                <span className="text-[1.23rem] mr-2">
                                  {idx + 1}
                                </span>{" "}
                                {member}
                              </motion.li>
                            );
                          })}
                        </ul>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
