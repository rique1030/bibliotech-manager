import ConverToLetterCase from "./ConvertToLetterCase";

export default function handlekebab(str: string){
   return str
      .split("-")
      .map((x) => ConverToLetterCase(x))
      .join(" ");
};