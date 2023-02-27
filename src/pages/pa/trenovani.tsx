import { NextPage } from "next";
import paths from "~/utils/paths";
import { BackButton } from "~/components/BackButton";
import { api } from "~/utils/api";
import { Methods } from "~/utils/methods";
import { useState } from "react";
import DataFormatter, { Data } from "~/utils/DataFormatter";
import { useRouter } from "next/navigation";
import { Button, Card } from "@mantine/core";
import { AnimatePresence, motion } from "framer-motion";


const PaTraining: NextPage = () => {
  const [data, setData] = useState<Data[] | null>(null);
  const [showValue, setShowValue] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const router = useRouter();

  const [isInitialLoading, setIsInitialLoading] = useState<boolean>(true);

  api.methods.get.useQuery({method: Methods.PA}, {
    onSuccess: (data) => {
      if (!data) return router.push(paths.paEdit);

      const formatter = new DataFormatter();
      formatter.setData(data);
      const parsed = formatter.parse();
      shuffle(parsed);
      setData(parsed);
    },

    onSettled: () => setIsInitialLoading(false)
  });

  function shuffle(data: Data[]): void {
    for (let i = data.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [data[i], data[j]] = [data[j]!, data[i]!];
    }
  }

  function restart() {
    shuffle(data!);
    setIndex(0);
    setShowValue(false);
  }

  function advance() {
    setIndex(index + 1);
    setShowValue(false);
  }

    return (
        <div className={"overflow-hidden"}>
          <BackButton href={paths.pa}/>
            <h1 className="text-4xl text-center font-extrabold tracking-tight text-white sm:text-[5rem]">
                Trénování
            </h1>
          <AnimatePresence>
            <motion.div
              initial={{opacity: 0, x: 100}}
              animate={{opacity: 1, x: 0}}
              exit={{opacity: 0, x: -100}}
              transition={{duration: 0.3}}
            >
              <Card key={data?.[index] ? data[index]!.key : undefined} className={"relative aspect-square flex rounded-xl flex-col gap-4 mt-28 "}>
                <h2 className={`${showValue ? "text-2xl" : "text-4xl"} mt-20 text-center font-bold tracking-tight text-white sm:text-[3rem]`}>
                  {!data?.[0] && (isInitialLoading ? "Načítání..." : "Žádná data")}
                  {data?.[index] && (showValue ? data[index]!.value : data[index]!.key)}
                  {data && index >= data.length && "Konec"}
                </h2>

                <div className={"absolute bottom-0 left-0 right-0 flex flex-row"}>
                  {
                    data && index < data.length &&
                    <GameButtons showButtOnClick={() => setShowValue(true)} nextButtOnClick={() => advance()}/>
                  }
                  {
                    data && index >= data.length &&
                    (<Button variant={"default"} className={"w-full h-14 bg-blue-200/20 rounded-none w-full"} onClick={restart}>
                      Restartovat
                    </Button>)
                  }
                </div>
              </Card>
            </motion.div>
          </AnimatePresence>
        </div>
    );
}

const GameButtons = (props: {showButtOnClick: () => void, nextButtOnClick: () => void},) => {
  return (
    <>
      <Button variant={"default"} className={"h-14 bg-blue-200/5 rounded-none w-full"}
              onClick={props.showButtOnClick}>
        Ukázat
      </Button>
      <Button variant={"default"} className={"h-14 bg-blue-200/20 rounded-none w-full"}
              onClick={props.nextButtOnClick}>
        Další
      </Button>
    </>
  )
}
export default PaTraining;