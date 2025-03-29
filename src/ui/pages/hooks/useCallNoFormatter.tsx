import { useLayoutEffect, useState } from "react";

function useCallNoFormatter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [currentFormat, setCurrentFormat] = useState<any>(formats[0]);
  useLayoutEffect(() => {
    window.storedSettings.getFormatIndex().then((value: any) => {
      setCurrentIndex(value);
    });
  }, []);

  const verifyFormat = (callNumber: string): boolean => {
    const regex = new RegExp(currentFormat.regex);
    return regex.test(callNumber);
  };

  const handleChangeFormat = (index: number) => {
    setCurrentIndex(index);
    window.storedSettings.setFormatIndex(index);
  };

  useLayoutEffect(() => {
    setCurrentFormat(formats.find((format) => format.id === currentIndex));
  }, [currentIndex]);

  return {
    verifyFormat,
    currentFormat,
    currentIndex,
    handleChangeFormat,
    formats,
  };
}

export { useCallNoFormatter };

const formats = [
  {
    id: 0,
    name: "Dewey Decimal Classification (DDC)",
    format: "###.## or ###.###",
    regex: "^\\d{3}\\.\\d{2,3}$",
    description:
      "3 digits for subject, a decimal, then 2-3 digits for detail. Example: 123.45.",
  },
  {
    id: 1,
    name: "Library of Congress Classification (LCC)",
    format: "XX ###.### or XX ####.##",
    regex: "^[A-Z]{2} \\d{3,4}\\.\\d{2,3}$",
    description:
      "2 letters for subject, space, 3-4 digits, and a decimal for detail. Example: BL 123.45.",
  },
  {
    id: 2,
    name: "Universal Decimal Classification (UDC)",
    format: "##.## or ###.###",
    regex: "^\\d{2,3}\\.\\d{2,3}$",
    description:
      "Numeric classification with 2-3 digits and a decimal for subcategories.",
  },
  {
    id: 3,
    name: "Colon Classification (CC)",
    format: "A:B.C:D",
    regex: "^[A-Z]:[A-Z0-9]+(?:\\.[A-Z0-9]+)*(?::[A-Z0-9]+(?:\\.[A-Z0-9]+)*)*$",
    description: "Faceted system using colons/periods. Example: A:B.C:D.",
  },
  {
    id: 4,
    name: "Personal Author Call Numbers",
    format: "Author's Last Name, First Name",
    regex: "^[A-Z][a-z]+, [A-Z][a-z]+$",
    description:
      "Author surname, comma, space, then first name. Example: Doe, John.",
  },
  {
    id: 5,
    name: "Book Number / Cutter Classification",
    format: "#... or Cutter's number",
    regex: "^[A-Z]\\d{1,2}$",
    description:
      "Letter followed by 1-2 digits for Cutter numbers. Example: A12.",
  },
  {
    id: 7,
    name: "British Library System",
    format: "##.## or ###.###",
    regex: "^\\d{2,3}\\.\\d{2,3}$",
    description:
      "2-3 digits for main subject, decimal, then sub-subject digits. Example: 123.45.",
  },
  {
    id: 8,
    name: "Melvil Decimal Classification (MDC)",
    format: "###.## or ###.###",
    regex: "^\\d{3}\\.\\d{2,3}$",
    description:
      "Similar to DDC with 3 digits, decimal, and 2-3 sub-digits. Example: 123.45.",
  },
  {
    id: 9,
    name: "NLM Classification",
    format: "WZ",
    regex: "^[A-Z]{2}$",
    description:
      "2 letters, with the first for main subject and the second for detail. Example: WZ.",
  },
  {
    id: 14,
    name: "Any",
    format: "Any",
    regex: "^.*$",
    description: "Accepts any input format without restrictions.",
  },
];
