//custom React hook like useRecording() that returns state and handlers (isRecording, start, stop, duration).
import { Alert, StyleSheet, Text, View } from "react-native";
import React, { useState, useEffect, useRef } from "react";
import {
  useAudioRecorder,
  AudioModule,
  RecordingPresets,
  setAudioModeAsync,
  useAudioRecorderState,
} from "expo-audio";

const MAX_RECORDING_DUR = 2 * 60 * 1000; //this is 2minutes

const RecordingLogic = () => {
  //create and manaeg audio recorder instances
  const audioRecorder = useAudioRecorder(RecordingPresets.HIGH_QUALITY);
  //Reactively gets current state of recording
  const recorderState = useAudioRecorderState(audioRecorder);

  //holds timer for tracking rotation
  const intervalRef = useRef<number | null>(null);

  const [currentUri, setCurrentUri] = useState<string | null>(null);

  useEffect(() => {
    (async () => {
      const status = await AudioModule.requestRecordingPermissionsAsync();
      if (!status.granted) {
        Alert.alert("Permission to access microphone was denied");
      }

      setAudioModeAsync({
        playsInSilentMode: true,
        allowsRecording: true,
      });
    })();

    //clean-up function to clear interval if component unmounts
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  const startRecording = async () => {
    try {
      await audioRecorder.prepareToRecordAsync(); // Setup recording
      await audioRecorder.record(); // Start recording

      // Set interval to stop recording automatically after max length
      intervalRef.current = setInterval(() => {
        if (recorderState.durationMillis >= MAX_RECORDING_DUR) {
          stopRecording();
        }
      }, 500);
    } catch (error) {
      Alert.alert("Oops, couldn't start recording: ", (error as Error).message);
    }
  };

  const stopRecording = async () => {
    try {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
        intervalRef.current = null;
      }
      await audioRecorder.stop(); // Stop recording and unloads recoring internally

      setCurrentUri(audioRecorder.uri ?? null);
      // Recorded audio is available at audioRecorder.uri
    } catch (error) {
      Alert.alert("Could not stop recording:", (error as Error).message);
    }
  };

  return {
    isRecording: recorderState.isRecording,
    durationMillis: recorderState.durationMillis,
    currentUri, //from state, this should be updated after stopRecording finishes
    startRecording,
    stopRecording,
  };
};

export default RecordingLogic;
