import paths from "~/utils/paths";
import { Button } from "@mantine/core";
import Link from "next/link";

export function BackButton(props: {href: string }) {
  return (
    <Link href={props.href}>
      <Button variant={"light"} className={"absolute top-3 left-0 text-md"}>
        {"<-"} Go back bitch
      </Button>
    </Link>
  );
}