// @ts-ignore
import { Video } from 'expo-av';
import * as FileSystem from 'expo-file-system';
import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { captureRef } from 'react-native-view-shot';

export default function HomeScreen() {
  const VIDEO_SOURCE = require('../../assets/trafic.mp4');
  const videoRef = useRef(null);
  const viewRef = useRef(null);
  const [videoLayout, setVideoLayout] = useState({ width: 1, height: 1 });
  const [videoNaturalSize, setVideoNaturalSize] = useState({ width: 1, height: 1 });
  const [isVideoReady, setIsVideoReady] = useState(false);
  const [detections, setDetections] = useState([]);
  const [processing, setProcessing] = useState(false);

  const sendFrameToBackend = async (uri: string) => {
    try {
      setProcessing(true);
      const fileInfo = await FileSystem.getInfoAsync(uri);
      if (!fileInfo.exists) return;

      const formData = new FormData();
      formData.append('image', {
        uri: fileInfo.uri,
        name: 'frame.jpg',
        type: 'image/jpeg',
      } as any);

      const response = await fetch(
        'https://b41e-2a02-2f07-d304-2d00-1462-565b-b954-ddf4.ngrok-free.app/api/detect_pedestrians/',
        {
          method: 'POST',
          headers: { 'Content-Type': 'multipart/form-data' },
          body: formData,
        }
      );

      const result = await response.json();
      setDetections(result.detections || []);
    } catch (error) {
      console.error('Upload error:', error);
    } finally {
      setProcessing(false);
    }
  };

  useEffect(() => {
    if (!isVideoReady) return;

    const interval = setInterval(async () => {
      if (!processing && viewRef.current) {
        try {
          const uri = await captureRef(viewRef, { format: 'jpg', quality: 0.8 });
          await sendFrameToBackend(uri);
        } catch (err) {
          console.log('Capture error:', err);
        }
      }
    }, 2000);

    return () => clearInterval(interval);
  }, [isVideoReady, processing]);

  return (
    <View style={styles.container}>
      <View
        ref={viewRef}
        collapsable={false}
        style={styles.videoContainer}
        onLayout={(event) => {
          const { width, height } = event.nativeEvent.layout;
          setVideoLayout({ width, height });
        }}
      >
        <Video
          ref={videoRef}
          source={VIDEO_SOURCE}
          style={styles.video}
          shouldPlay
          isLooping
          useNativeControls
          resizeMode="contain"
          onReadyForDisplay={({ naturalSize }) => {
            setVideoNaturalSize(naturalSize);
            setIsVideoReady(true);
          }}
          onError={(e) => console.log('Video error:', e)}
        />

        {/* Detections shown in top-right overlay */}
        {detections.length > 0 && (
          <View style={styles.detectionOverlay}>
            {detections.map((d, i) => (
              <Text key={i} style={styles.overlayText}>
                {d.class} ({(d.confidence * 100).toFixed(1)}%)
              </Text>
            ))}
          </View>
        )}
      </View>

      <View style={styles.detectionsContainer}>
        <Text style={styles.detectionTitle}>Detected Objects:</Text>
        {detections.length === 0 ? (
          <Text style={styles.detectionText}>No detections yet.</Text>
        ) : (
          detections.map((d, i) => (
            <Text key={i} style={styles.detectionText}>
              {d.class} ({(d.confidence * 100).toFixed(1)}%)
            </Text>
          ))
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#000' },
  videoContainer: { flex: 1, backgroundColor: 'black' },
  video: {
    width: '100%',
    height: '100%',
  },
  detectionsContainer: {
    padding: 10,
    backgroundColor: 'rgba(0,0,0,0.7)',
  },
  detectionTitle: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  detectionText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 2,
  },
  detectionOverlay: {
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    padding: 8,
    borderRadius: 6,
    zIndex: 100,
  },
  overlayText: {
    color: 'white',
    fontSize: 14,
    marginBottom: 2,
  },
});
