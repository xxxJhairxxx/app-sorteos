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
      <nav className=" flex py-[16px] w-full cursor-pointer top-0 left-0 sticky bg-white z-50 shadow-sm/5">
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
            <li className="flex items-center gap-2">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-[1.4rem]"
                viewBox="0 0 512 512"
              >
                <path d="M149.3 56v80c0 13.3-10.7 24-24 24H24c-13.3 0-24-10.7-24-24V56c0-13.3 10.7-24 24-24h101.3c13.3 0 24 10.7 24 24zm181.3 240v-80c0-13.3-10.7-24-24-24H205.3c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24h101.3c13.3 0 24-10.7 24-24zm32-240v80c0 13.3 10.7 24 24 24H488c13.3 0 24-10.7 24-24V56c0-13.3-10.7-24-24-24H386.7c-13.3 0-24 10.7-24 24zm-32 80V56c0-13.3-10.7-24-24-24H205.3c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24h101.3c13.3 0 24-10.7 24-24zm-205.3 56H24c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24h101.3c13.3 0 24-10.7 24-24v-80c0-13.3-10.7-24-24-24zM0 376v80c0 13.3 10.7 24 24 24h101.3c13.3 0 24-10.7 24-24v-80c0-13.3-10.7-24-24-24H24c-13.3 0-24 10.7-24 24zm386.7-56H488c13.3 0 24-10.7 24-24v-80c0-13.3-10.7-24-24-24H386.7c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24zm0 160H488c13.3 0 24-10.7 24-24v-80c0-13.3-10.7-24-24-24H386.7c-13.3 0-24 10.7-24 24v80c0 13.3 10.7 24 24 24zM181.3 376v80c0 13.3 10.7 24 24 24h101.3c13.3 0 24-10.7 24-24v-80c0-13.3-10.7-24-24-24H205.3c-13.3 0-24 10.7-24 24z" />
              </svg>
              Aplicaciones{" "}
              <Image
                src="https://cdn-icons-png.flaticon.com/128/10412/10412566.png"
                className="w-[1.3rem] h-[1.6rem] rotate-180 mt-1"
                width={50}
                height={50}
                alt="arrow-down"
              />
            </li>
            <li>Precios</li>
            <li className="flex items-center gap-2">
              Ayuda{" "}
              <Image
                src="https://cdn-icons-png.flaticon.com/128/10412/10412566.png"
                className="w-[1.3rem] h-[1.6rem] rotate-180 mt-1"
                width={50}
                height={50}
                alt="arrow-down"
              />
            </li>
          </ul>
          <ul className="flex gap-[2rem] items-center ">
            <li>Ingresar</li>
            <li>
              {" "}
              <button className="bg-[#d31c92] font-semibold text-white px-7 py-3 rounded-lg hover:bg-[#86197d] cursor-pointer transition-colors">
                Crear cuenta
              </button>
            </li>
            <li className="flex gap-2">
              ES{" "}
              <Image
                src="https://cdn-icons-png.flaticon.com/128/10412/10412566.png"
                className="w-[1.3rem] h-[1.6rem] rotate-180 mt-1"
                width={50}
                height={50}
                alt="arrow-down"
              />
            </li>
          </ul>
        </div>
      </nav>
      <div className="bg-[#f3f3fa] pt-[8rem] pb-[4rem]">
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
            <>
              <div className=" w-[110rem] mx-auto bg-white px-[3rem] py-[2.5rem] mt-[3rem] flex gap-[4rem]">
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
              <div className="bg-white mb-[3rem] border-t border-gray-200 py-[3.5rem] px-[3.5rem] flex gap-10 font-semibold text-[#c43e82] ">
                <button className="mr-1 hover:text-[#d31c92] cursor-pointer flex items-center gap-2 h-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[1.5rem]"
                    viewBox="0 0 448 512"
                  >
                    <path
                      fill="#c43e82"
                      d="M48 96l0 320c0 8.8 7.2 16 16 16l320 0c8.8 0 16-7.2 16-16l0-245.5c0-4.2-1.7-8.3-4.7-11.3l33.9-33.9c12 12 18.7 28.3 18.7 45.3L448 416c0 35.3-28.7 64-64 64L64 480c-35.3 0-64-28.7-64-64L0 96C0 60.7 28.7 32 64 32l245.5 0c17 0 33.3 6.7 45.3 18.7l74.5 74.5-33.9 33.9L320.8 84.7c-.3-.3-.5-.5-.8-.8L320 184c0 13.3-10.7 24-24 24l-192 0c-13.3 0-24-10.7-24-24L80 80 64 80c-8.8 0-16 7.2-16 16zm80-16l0 80 144 0 0-80L128 80zm32 240a64 64 0 1 1 128 0 64 64 0 1 1 -128 0z"
                    />
                  </svg>
                  Guardar
                </button>
                <button className=" hover:text-[#d31c92] cursor-pointer flex items-center gap-2 h-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-[2rem]"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M17 17H17.01M17.4 14H18C18.9319 14 19.3978 14 19.7654 14.1522C20.2554 14.3552 20.6448 14.7446 20.8478 15.2346C21 15.6022 21 16.0681 21 17C21 17.9319 21 18.3978 20.8478 18.7654C20.6448 19.2554 20.2554 19.6448 19.7654 19.8478C19.3978 20 18.9319 20 18 20H6C5.06812 20 4.60218 20 4.23463 19.8478C3.74458 19.6448 3.35523 19.2554 3.15224 18.7654C3 18.3978 3 17.9319 3 17C3 16.0681 3 15.6022 3.15224 15.2346C3.35523 14.7446 3.74458 14.3552 4.23463 14.1522C4.60218 14 5.06812 14 6 14H6.6M12 15V4M12 15L9 12M12 15L15 12"
                      stroke="#c43e82"
                      stroke-width="1.5"
                      stroke-linecap="round"
                      stroke-linejoin="round"
                    />
                  </svg>
                  Descargar
                </button>
                <button className=" hover:text-[#d31c92] cursor-pointer flex items-center gap-2 h-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                  >
                    <path
                      d="M10.0791 0.505371C10.1499 0.516518 10.2172 0.542975 10.2764 0.58252L10.333 0.627441L10.334 0.628418L15.334 5.12842H15.335C15.4409 5.22344 15.5 5.35698 15.5 5.50049C15.4999 5.63981 15.4406 5.7746 15.334 5.87256L10.3359 10.3706C10.1894 10.5015 9.97942 10.5357 9.79492 10.4546C9.61626 10.376 9.50015 10.198 9.5 10.0005V7.50049H6C4.06761 7.50049 2.5 9.0681 2.5 11.0005C2.5001 11.9724 2.86399 12.6081 3.20605 12.9897L3.34961 13.1382L3.35352 13.1421C3.46904 13.2492 3.49991 13.3412 3.5 13.3843C3.5 13.4472 3.44743 13.5003 3.38477 13.5005C3.37613 13.5005 3.36985 13.499 3.36621 13.4985C2.82367 13.2015 0.500185 11.7503 0.5 8.50049C0.5 5.73913 2.73864 3.50049 5.5 3.50049H9.5V1.00049C9.5 0.829207 9.58991 0.668962 9.73242 0.578613L9.79688 0.544434L9.7998 0.543457C9.88721 0.503955 9.98434 0.490496 10.0791 0.505371Z"
                      stroke="#c43e82"
                      stroke-width="1.5"
                    />
                  </svg>
                  Compartir
                </button>
                <button className=" hover:text-[#d31c92] cursor-pointer flex items-center gap-2 h-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="16"
                    height="14"
                    viewBox="0 0 16 14"
                    fill="none"
                  >
                    <path
                      d="M5 0C4.46957 0 3.96086 0.210714 3.58579 0.585786C3.21071 0.960859 3 1.46957 3 2V3.5L2 4C1.46957 4 0.960859 4.21071 0.585786 4.58579C0.210714 4.96086 0 5.46957 0 6L0 9C0 9.53043 0.210714 10.0391 0.585786 10.4142C0.960859 10.7893 1.46957 11 2 11H3V12C3 12.5304 3.21071 13.0391 3.58579 13.4142C3.96086 13.7893 4.46957 14 5 14H11C11.5304 14 12.0391 13.7893 12.4142 13.4142C12.7893 13.0391 13 12.5304 13 12V11H14C14.5304 11 15.0391 10.7893 15.4142 10.4142C15.7893 10.0391 16 9.53043 16 9V6C16 5.46957 15.7893 4.96086 15.4142 4.58579C15.0391 4.21071 14.5304 4 14 4H13V2C13 1.46957 12.7893 0.960859 12.4142 0.585786C12.0391 0.210714 11.5304 0 11 0H5ZM4 2C4 1.73478 4.10536 1.48043 4.29289 1.29289C4.48043 1.10536 4.73478 1 5 1H11C11.2652 1 11.5196 1.10536 11.7071 1.29289C11.8946 1.48043 12 1.73478 12 2V4H4V2ZM5 7C4.46957 7 3.96086 7.21071 3.58579 7.58579C3.21071 7.96086 3 8.46957 3 9V10H2C1.73478 10 1.48043 9.89464 1.29289 9.70711C1.10536 9.51957 1 9.26522 1 9V6C1 5.73478 1.10536 5.48043 1.29289 5.29289C1.48043 5.10536 1.73478 5 2 5H14C14.2652 5 14.5196 5.10536 14.7071 5.29289C14.8946 5.48043 15 5.73478 15 6V9C15 9.26522 14.8946 9.51957 14.7071 9.70711C14.5196 9.89464 14.2652 10 14 10H13V9C13 8.46957 12.7893 7.96086 12.4142 7.58579C12.0391 7.21071 11.5304 7 11 7H5ZM12 9V12C12 12.2652 11.8946 12.5196 11.7071 12.7071C11.5196 12.8946 11.2652 13 11 13H5C4.73478 13 4.48043 12.8946 4.29289 12.7071C4.10536 12.5196 4 12.2652 4 12V9C4 8.73478 4.10536 8.48043 4.29289 8.29289C4.48043 8.10536 4.73478 8 5 8H11C11.2652 8 11.5196 8.10536 11.7071 8.29289C11.8946 8.48043 12 8.73478 12 9Z"
                      fill="#c43e82"
                      stroke="#c43e82"
                      stroke-width="0.6"
                    />
                  </svg>
                  Imprimir
                </button>
                <button className=" hover:text-[#d31c92] cursor-pointer flex items-center gap-2 h-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    width="18"
                    height="16"
                  >
                    <path
                      d="M280 64l40 0c35.3 0 64 28.7 64 64l0 320c0 35.3-28.7 64-64 64L64 512c-35.3 0-64-28.7-64-64L0 128C0 92.7 28.7 64 64 64l40 0 9.6 0C121 27.5 153.3 0 192 0s71 27.5 78.4 64l9.6 0zM64 112c-8.8 0-16 7.2-16 16l0 320c0 8.8 7.2 16 16 16l256 0c8.8 0 16-7.2 16-16l0-320c0-8.8-7.2-16-16-16l-16 0 0 24c0 13.3-10.7 24-24 24l-88 0-88 0c-13.3 0-24-10.7-24-24l0-24-16 0zm128-8a24 24 0 1 0 0-48 24 24 0 1 0 0 48z"
                      fill="#c43e82"
                    />
                  </svg>
                  Copiar
                </button>
                <button className=" hover:text-[#d31c92] cursor-pointer flex items-center gap-2 h-5">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                    width="18"
                    height="16"
                  >
                    <path
                      d="M48 448L48 64c0-8.8 7.2-16 16-16l160 0 0 80c0 17.7 14.3 32 32 32l80 0 0 288c0 8.8-7.2 16-16 16L64 464c-8.8 0-16-7.2-16-16zM64 0C28.7 0 0 28.7 0 64L0 448c0 35.3 28.7 64 64 64l256 0c35.3 0 64-28.7 64-64l0-293.5c0-17-6.7-33.3-18.7-45.3L274.7 18.7C262.7 6.7 246.5 0 229.5 0L64 0zm90.9 233.3c-8.1-10.5-23.2-12.3-33.7-4.2s-12.3 23.2-4.2 33.7L161.6 320l-44.5 57.3c-8.1 10.5-6.3 25.5 4.2 33.7s25.5 6.3 33.7-4.2L192 359.1l37.1 47.6c8.1 10.5 23.2 12.3 33.7 4.2s12.3-23.2 4.2-33.7L222.4 320l44.5-57.3c8.1-10.5 6.3-25.5-4.2-33.7s-25.5-6.3-33.7 4.2L192 280.9l-37.1-47.6z"
                      fill="#c43e82"
                    />
                  </svg>
                  Copiar para Excel
                </button>
              </div>
            </>
          )}
        </div>
      </div>
      <ul className="border-b border-gray-200 text-[#d31c92] py-[2rem] flex items-center justify-center gap-[8%]">
        <li>
          <a href="#" className="hover:border-b border-[#d31c92] ">
            Ruleta Aleatoria
          </a>
        </li>
        <li>
          <a href="#" className="hover:border-b border-[#d31c92] ">
            Dados Virtuales
          </a>
        </li>
        <li>
          <a href="#" className="hover:border-b border-[#d31c92] ">
            Números Aleatorios
          </a>
        </li>
        <li>
          <a href="#" className="hover:border-b border-[#d31c92] ">
            Lanza una Moneda
          </a>
        </li>
      </ul>

      <section className="w-full py-[7rem]">
        <div className="max-w-[1292px] mx-auto w-[35%] flex flex-col gap-10">
          <h2 className="text-[3.2rem] leading-[3.5rem] font-semibold">
            ¿Cómo funciona el Generador de equipos online?
          </h2>

          <p className="mt-4 mt-lg-5 _fs16 _lh18">
            El Generador de Grupos Aleatorios o Generador de Equipos Aleatorios
            es una <strong>herramienta online y gratuita</strong> que te
            permitirá dividir una lista de participantes en grupos al azar,
            seleccionando la cantidad de equipos o la cantidad de participantes
            por equipo.
          </p>
          <p className="_fs16 _lh18">
            Esta app para generar grupos es una herramienta en línea gratuita
            para hacer equipos al azar a partir de una lista de
            nombres/participantes, asignando de manera 100% aleatoria personas a
            grupos y equipos.
          </p>
          <p className="_fs16 _lh18">
            Comienza a crear equipos o grupos ingresando la lista de nombres en
            el campo de texto y haciendo clic en el botón "Generar equipos".
          </p>
          <p className="_fs16 _lh18">
            La app distribuirá de forma automática a los miembros en los equipos
            seleccionados de manera aleatoria y equitativa.
          </p>
          <p className="_fs16 _lh18">
            Puedes cambiar el número de grupos seleccionando la opción de
            generar por cantidad de equipos o por cantidad de participantes por
            equipo.
          </p>
        </div>
      </section>
    </div>
  );
}
