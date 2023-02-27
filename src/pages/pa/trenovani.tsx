import { NextPage } from "next";
import paths from "~/utils/paths";
import { BackButton } from "~/components/BackButton";
import { api } from "~/utils/api";
import { Methods } from "~/utils/methods";
import { useState } from "react";
import DataFormatter, { Data } from "~/utils/DataFormatter";
import { useRouter } from "next/navigation";
import { Button, Card } from "@mantine/core";
import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion"

const PaTraining: NextPage = () => {
  const [data, setData] = useState<Data[] | null>(null);
  const [showValue, setShowValue] = useState<boolean>(false);
  const [index, setIndex] = useState<number>(0);
  const router = useRouter();

  api.methods.get.useQuery({method: Methods.PA}, {
    onSuccess: (data) => {
      if (!data) return router.push(paths.paEdit);

      const parsed = DataFormatter.parse(data);
      // Shuffle it randomly.
      for (let i = parsed.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [parsed[i], parsed[j]] = [parsed[j]!, parsed[i]!];
      }
      setData(parsed);
    }
  });

  function advance() {
    setIndex(index + 1);
    setShowValue(false);
  }

    return (
        <div className={""}>
          <BackButton href={paths.pa}/>
            <h1 className="text-4xl text-center font-extrabold tracking-tight text-white sm:text-[5rem]">
                Trénování
            </h1>
          <Card className={"relative aspect-square flex rounded-lg flex-col gap-4 mt-28"}>
            <h2 className={"text-4xl mt-20 text-center font-bold tracking-tight text-white sm:text-[3rem]"}>
              {!data?.[0] && "Žádná data"}
                {/*{isInitialLoading && "Načítám data..."}*/}
              {data?.[index] && (showValue ? data[index]!.value : data[index]!.key)}
              {data && index >= data.length && "Konec"}
              {/*{data && index >= data.length && "Konec"}*/}
            </h2>

            <div className={"absolute bottom-0 left-0 right-0 flex flex-row"}>
              <Button variant={"default"} className={"h-14 bg-blue-200/20 rounded-none w-full"}
                      onClick={advance}>
                Další
              </Button>
              <Button variant={"default"} className={"h-14 bg-blue-200/5 rounded-none w-full"}
                      onClick={() => setShowValue(true)}>
                Ukázat
              </Button>
            </div>
          </Card>
        </div>
    );
}
export default PaTraining;