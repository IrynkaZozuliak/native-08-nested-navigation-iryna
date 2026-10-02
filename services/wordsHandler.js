import { BASE_URL } from "../constants";

export async function getWordInfo(word) {
  try {
    const response = await fetch(
      `${BASE_URL}/${encodeURIComponent(word)}`
    );

    if (!response.ok) {
      return {
        partOfSpeech: "not found",
        meaning: "we couldn't find the definition",
      };
    }

    const data = await response.json();

    if (!Array.isArray(data) || !data[0]) {
      return {
        partOfSpeech: "not found",
        meaning: "we couldn't find the definition",
      };
    }

    const wordData = data[0];

    const phonetics =
      wordData.phonetics?.find(
        (item) => item.text
      )?.text || "";

    const audio =
      wordData.phonetics?.find(
        (item) => item.audio
      )?.audio || "";

    const meaningObject =
      wordData.meanings?.[0];

    return {
      word: wordData.word || word,
      phonetics,
      audio,
      partOfSpeech:
        meaningObject?.partOfSpeech || "",
      meaning:
        meaningObject?.definitions?.[0]?.definition ||
        "",
    };
  } catch (error) {
    console.log(error);

    return {
      partOfSpeech: "not found",
      meaning: "we couldn't find the definition",
    };
  }
}