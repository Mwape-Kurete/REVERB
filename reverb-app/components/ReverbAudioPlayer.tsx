import React, { useEffect, useRef, useState } from "react";
import { View, Button, Text, StyleSheet, TouchableOpacity } from "react-native";
import { createAudioPlayer, AudioPlayer } from "expo-audio";
import RecordingAnimation from "./RecordingAnimation";

import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
type Props = {
  source: string;
};

export default function ReverbAudioPlayer({ source }: Props) {
  const [player, setPlayer] = useState<AudioPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPlayer = async () => {
      if (!source) return;
      if (player) {
        await player.pause();
        await player.remove();
      }
      const newPlayer = await createAudioPlayer(source);
      if (isMounted) {
        setPlayer(newPlayer);
        setIsPlaying(false);
      }
    };

    loadPlayer();

    return () => {
      isMounted = false;
      if (player) {
        player.pause();
        player.remove();
      }
    };
  }, [source]);

  const togglePlayback = async () => {
    if (!player) return;
    if (isPlaying) {
      await player.pause();
      setIsPlaying(false);
    } else {
      await player.play();
      setIsPlaying(true);
    }
  };

  return (
    <View style={styles.container}>
      <RecordingAnimation isRecording={isPlaying} />

      <View style={styles.controls}>
        {/* You may add rewind and fast-forward later if supported */}
        <TouchableOpacity onPress={togglePlayback} style={styles.controlButton}>
          <MaterialCommunityIcons
            name={isPlaying ? "pause" : "play"}
            size={32}
            color="#030000"
          />
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 20,
  },
  controls: {
    flexDirection: "row",
    justifyContent: "center",
    marginTop: 16,
  },
  controlButton: {
    width: 56,
    height: 56,
    borderRadius: 55,
    backgroundColor: "#FFF",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.15,
    shadowRadius: 6,
    elevation: 5,
    alignItems: "center",
    justifyContent: "center",
  },
});
