import { NextPage } from "next";
import { Button } from "@mantine/core";
import Link from "next/link";
import paths from "~/utils/paths";

const PaSystem: NextPage = () => {
  return (
    <div>
      <h1 className="text-4xl text-center font-extrabold tracking-tight text-white sm:text-[5rem]">
        PA systém
      </h1>
      
      <div className={"flex flex-row justify-center mt-64"}>
        <Link href={paths.paPractice}>
          <Button variant={"default"} className={"bg-blue-400"}>
            Začít trénovat
          </Button>
        </Link>
        <Link href={paths.paEdit}>
          <Button variant={"subtle"}>
            Upravit data
          </Button>
        </Link>
      </div>
    </div>
  )
}
export default PaSystem;