import React, { useEffect, useState } from "react";
import { View, Button, Text, StyleSheet } from "react-native";
import { createAudioPlayer, AudioPlayer } from "expo-audio";

type Props = {
  source: string; // URI of the audio file (local or remote)
};

export default function ReverbAudioPlayer({ source }: Props) {
  const [player, setPlayer] = useState<AudioPlayer | null>(null);
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    let isMounted = true;

    const loadPlayer = async () => {
      if (!source) return;
      const audioPlayer = await createAudioPlayer(source);
      if (isMounted) setPlayer(audioPlayer);
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
      <Button title={isPlaying ? "Pause" : "Play"} onPress={togglePlayback} />
      <Text style={styles.text}>{isPlaying ? "Playing..." : "Paused"}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { alignItems: "center", marginVertical: 20 },
  text: { marginTop: 8, fontSize: 16 },
});
