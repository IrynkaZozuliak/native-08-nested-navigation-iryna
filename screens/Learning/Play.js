import { useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Pressable,
} from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";

import { COLORS } from "../../constants";
import { playSound } from "../../services/soundHandler";
import dummyData from "../../dummyData";

function Play({ words }) {
  const initialWords =
    words !== undefined ? words : dummyData;

  const [learningWords, setLearningWords] = useState(
    () =>
      initialWords
        .filter((item) => item.status < 2)
        .map((item) => ({ ...item }))
  );

  const [currentIndex, setCurrentIndex] = useState(0);
  const [showAnswer, setShowAnswer] = useState(false);

  useEffect(() => {
    const filteredWords =
      initialWords
        .filter((item) => item.status < 2)
        .map((item) => ({ ...item }));

    setLearningWords(filteredWords);
    setCurrentIndex(0);
    setShowAnswer(false);
  }, [words]);

  if (learningWords.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Text style={styles.congrats}>Congrats!</Text>

        <Text style={styles.emptyText}>
          For now you have learned all the words
        </Text>
      </View>
    );
  }

  const currentWord = learningWords[currentIndex];

  function showWordInfo() {
    setShowAnswer(true);
  }

  function nextWord() {
    if (learningWords.length === 1) {
      setCurrentIndex(0);
    } else {
      setCurrentIndex(
        (currentIndex + 1) % learningWords.length
      );
    }

    setShowAnswer(false);
  }

  function didNotKnow() {
    nextWord();
  }

  function knewIt() {
    const updatedWord = {
      ...currentWord,
      status: currentWord.status + 1,
    };

    if (updatedWord.status >= 2) {
      const newWords = learningWords.filter(
        (_, index) => index !== currentIndex
      );

      setLearningWords(newWords);

      if (newWords.length === 0) {
        setCurrentIndex(0);
      } else if (currentIndex >= newWords.length) {
        setCurrentIndex(0);
      }

      setShowAnswer(false);
      return;
    }

    const newWords = [...learningWords];
    newWords[currentIndex] = updatedWord;

    setLearningWords(newWords);

    if (newWords.length > 1) {
      setCurrentIndex(
        (currentIndex + 1) % newWords.length
      );
    }

    setShowAnswer(false);
  }

  return (
    <View style={styles.container}>
      <Pressable
        style={styles.card}
        onPress={showWordInfo}
      >
        <Text style={styles.word}>
          {currentWord.word}
        </Text>

        {showAnswer && (
          <>
            <View style={styles.phoneticsRow}>
              <Text style={styles.phonetics}>
                {currentWord.phonetics}
              </Text>

              {currentWord.audio && (
                <Pressable
                  style={styles.soundButton}
                  onPress={() =>
                    playSound(currentWord.audio)
                  }
                >
                  <Ionicons
                    name="volume-medium-outline"
                    size={28}
                    color={COLORS.primary900}
                  />
                </Pressable>
              )}
            </View>

            <Text style={styles.meaning}>
              {currentWord.meaning}
            </Text>
          </>
        )}
      </Pressable>

      {showAnswer && (
        <View style={styles.buttonsContainer}>
          <Pressable
            style={[
              styles.button,
              styles.notKnowButton,
            ]}
            onPress={didNotKnow}
          >
            <Text style={styles.buttonText}>
              Didn't know it
            </Text>
          </Pressable>

          <Pressable
            style={[
              styles.button,
              styles.knowButton,
            ]}
            onPress={knewIt}
          >
            <Text style={styles.buttonText}>
              Knew it
            </Text>
          </Pressable>
        </View>
      )}
    </View>
  );
}

export default Play;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    padding: 20,
    justifyContent: "center",
  },

  card: {
    minHeight: 260,
    borderRadius: 12,
    backgroundColor: COLORS.fontInverse,
    padding: 20,
    alignItems: "center",
    justifyContent: "center",
    elevation: 5,
  },

  word: {
    fontSize: 42,
    fontWeight: "800",
    color: COLORS.fontMain,
    textAlign: "center",
  },

  phoneticsRow: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: 20,
  },

  phonetics: {
    fontSize: 22,
    color: COLORS.fontMain,
  },

  soundButton: {
    marginLeft: 20,
  },

  meaning: {
    marginTop: 20,
    fontSize: 18,
    lineHeight: 26,
    color: COLORS.fontMain,
    textAlign: "center",
  },

  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 20,
  },

  button: {
    flex: 1,
    minHeight: 48,
    borderRadius: 6,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 8,
  },

  notKnowButton: {
    backgroundColor: COLORS.secondary800,
  },

  knowButton: {
    backgroundColor: COLORS.primary900,
  },

  buttonText: {
    color: COLORS.fontInverse,
    fontSize: 16,
    fontWeight: "700",
  },

  emptyContainer: {
    flex: 1,
    backgroundColor: COLORS.appBackground,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
  },

  congrats: {
    color: COLORS.primary900,
    fontSize: 40,
    fontWeight: "800",
    marginBottom: 20,
  },

  emptyText: {
    color: COLORS.fontMain,
    fontSize: 20,
    textAlign: "center",
  },
});