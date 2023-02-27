export type Data = {key: string; value: string};
export default class DataFormatter {
  public static readonly splitter = ": ";

  static isDataValid = (data: string): boolean => {
    const lines = data.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const [key, value] = lines[i]!.substring(lines[i]!.indexOf(this.splitter));;
      if (!key || !value) return false;
    }
    return true;
  }

  static parse = (data: string): Data[] => {
    const parsed: Data[] = [];

    const lines = data.split("\n");
    console.log("-> lines", lines);
    lines.forEach((line, index) => {
      const [key, ...rest] = line.split(this.splitter);
      const val = rest.join(this.splitter);

      console.log("-> key", key);
      console.log("-> val", val);

      parsed.push({key: key!, value: val!});
    });

    return parsed;
  }

  static convertSplitter(data: string, splitter: string): string {
    if (splitter === this.splitter) return data;
    // replace the first occurence of "splitter" on each line with ": ".
    const lines = data.split("\n");
    const result = lines.map(line => line.replace(splitter, this.splitter));
    return result.join("\n");
  }
}