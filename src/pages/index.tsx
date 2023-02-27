import { type NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import { api } from "~/utils/api";
import paths from "~/utils/paths";

const Home: NextPage = () => {

  return (
    <>
      <Head>
        <title>Cvičení paměťových technik</title>
        <meta name="description" content="Osobní nástroj pro cvičení paměťových technik" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex flex-col items-center justify-center">
        <div className="container flex flex-col items-center justify-center gap-12">
          <h1 className="text-5xl text-center font-extrabold tracking-tight text-white sm:text-[5rem]">
            Paměťové techniky
          </h1>
          <div>
            <Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href={paths.pa}
            >
              <h3 className="text-xl font-bold">PA (Person-Action) systém</h3>
              <div className="text-lg">
                Pamatování čísel: přiřazení dvou písmen ke každému číslu
                od 1 do 100 -{">"} použití jako iniciály -{">"} vymyslení člověka
                a akce, kterou by mohl dělat.
              </div>
            </Link>
            {/*<Link
              className="flex max-w-xs flex-col gap-4 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
              href="https://create.t3.gg/en/introduction"
              target="_blank"
            >
              <h3 className="text-xl font-bold">Documentation →</h3>
              <div className="text-lg">
                Learn more about Create T3 App, the libraries it uses, and how
                to deploy it.
              </div>
            </Link>*/}
          </div>
        </div>
      </main>
    </>
  );
};

export default Home;
