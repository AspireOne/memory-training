export type Data = {key: string; value: string};
export default class DataFormatter {
  public static readonly splitter = ": ";
  
  static toString = (map: Map<string, string>): string => {
    let result = "";
    map.forEach((value, key) => result += `${key}${DataFormatter.splitter}${value}\n`);
    return result;
  }

  static isDataValid = (str: string): boolean => {
    const values = str.split("\n");
    for (let i = 0; i < values.length; i++) {
      const splitted = values[i]!.split(this.splitter);
      if (splitted.length != 2 || !splitted[0] || !splitted[1]) return false;
    }
    return true;
  }

  static parse = (str: string): Data[] => {
    const arr: Data[] = [];

    const values = str.split("\n");
    values.forEach((value, index) => {
      const [key, val] = value.split(this.splitter);
      arr.push({key: key!, value: val!});
    });

    return arr;
  }

  static convertSplitter(str: string, splitter: string): string {
    if (splitter === this.splitter) return str;
    // replace the first occurence of "splitter" on each line with ": ".
    const lines = str.split("\n");
    const result = lines.map(line => line.replace(splitter, this.splitter));
    return result.join("\n");
  }

  static toMap = (str: string): Map<string, string> => {
    const map = new Map<string, string>();
    const values = str.split("\n");
    values.forEach(value => {
      const [key, val] = value.split(this.splitter);
      map.set(key!, val!);
    });
    return map;
  }
}