export type Data = {key: string; value: string};
export default class DataFormatter {
  public static readonly splitter = ": ";
  private _data: string = "";
  public get data(): string {
    return this._data;
  }

  public setData(data: string, splitter: string = DataFormatter.splitter) {
    data = this.replaceSplitter(data, splitter);

    if (!DataFormatter.isValid(data, DataFormatter.splitter)) throw new Error("Invalid data format");
    this._data = data;
  }

  private replaceSplitter(data: string, splitter: string): string {
    if (splitter === DataFormatter.splitter) return data;
    // replace the first occurence of "splitter" on each line with ": ".
    const lines = data.split("\n");
    const result = lines.map(line => line.replace(splitter, DataFormatter.splitter));
    return result.join("\n");
  }

  static isValid = (data: string, splitter: string): boolean => {
    const lines = data.split("\n");
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i];
      if (line?.trim()) {
        const [key, ...rest] = line.substring(line.indexOf(splitter));
        const value = rest.join(splitter);

        if (!key || !line.includes(splitter)) return false;
      }
    }

    return true;
  }

  parse = (): Data[] => {
    const parsed: Data[] = [];

    this.data.split("\n").forEach((line, index) => {
      if (line?.trim()) {
        const [key, ...rest] = line.split(DataFormatter.splitter);
        const val = rest.join(DataFormatter.splitter);
        if (val?.trim()) parsed.push({key: key!, value: val!});
      }
    });

    return parsed;
  }
}