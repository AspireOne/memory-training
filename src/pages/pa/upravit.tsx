import { NextPage } from "next";
import { api } from "~/utils/api";
import { Methods } from "~/utils/methods";
import { Button, Textarea } from "@mantine/core";
import { useState } from "react";
import DataFormatter from "~/utils/DataFormatter";
import { showNotification } from "@mantine/notifications";
import Link from "next/link";
import paths from "~/utils/paths";
import { BackButton } from "~/components/BackButton";

const PaEdit: NextPage = () => {
  const [splitter, setSplitter] = useState<string>(DataFormatter.splitter);

  const [value, setValue] = useState<string>("Načítání...");
  const [error, setError] = useState<string | undefined>(undefined);
  const [loading, setLoading] = useState<boolean>(false);
  const updateMutation = api.methods.update.useMutation({
    onSettled: () => {
      setLoading(false);
    },
    onSuccess: () => {
      showNotification({
        title: 'Data uložena',
        message: 'Data byla úspěšně uložena ⭐',
      })
    }
  });
  const {data, isInitialLoading} = api.methods.get.useQuery({method: Methods.PA}, {
    onSuccess: (data) => {
      setValue(data ?? "");
    },
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  });

  function handleSubmit() {
    const valueParsed = DataFormatter.convertSplitter(value, splitter);
    if (!DataFormatter.isDataValid(valueParsed)) {
      setError("Data nejsou ve správném formátu");
      return;
    }
    setLoading(true);
    updateMutation.mutate({method: Methods.PA, value: valueParsed});
  }

  function handleInput(value: string) {
    setValue(value);
    setError(undefined);
  }

  return (
    <div className={"flex flex-col gap-4"}>
      <BackButton href={paths.pa}/>

      <h1 className={"text-4xl text-center font-extrabold tracking-tight text-white sm:text-[5rem]"}>Data k trénování</h1>
      {isInitialLoading && "Načítám..."}
      <Textarea placeholder={": "} title={"Oddělovač"} value={splitter}
                onChange={(e) => setSplitter(e.target.value)}/>
      <Textarea
        error={error}
        value={value}
        onChange={(e) => handleInput(e.currentTarget.value)}
        placeholder={`název${DataFormatter.splitter}hodnota\nnázev${DataFormatter.splitter}hodnota\n...`}
        autosize
        minRows={6}
      />
      <Button variant={"default"} onClick={handleSubmit} loading={loading}>
        Uložit
      </Button>
    </div>
  )
}

export default PaEdit;