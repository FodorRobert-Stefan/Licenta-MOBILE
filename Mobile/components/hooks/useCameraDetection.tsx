// src/hooks/useCameraDetection.ts

import { useState } from 'react';
import { Alert } from 'react-native';
import apiClientDjango from '../generic/apiClientDjango';
import { API_PATHS_DJANGO } from '../generic/apiConfigDjango';

export const useCameraDetection = () => {
  const [loading, setLoading] = useState(false);
  const [detections, setDetections] = useState<any[]>([]);

  const sendFrameToBackend = async (uri: string) => {
    setLoading(true);

    const formData = new FormData();
    formData.append('frame', {
      uri,
      name: 'frame.jpg',
      type: 'image/jpeg',
    } as any);

    try {
      const response = await apiClientDjango.post(API_PATHS_DJANGO.detectPedestrians, formData);
      const result = response.data;
      setDetections(result.detections || []);
      return result;
    } catch (error: any) {
      console.error(error);
      Alert.alert('Eroare', 'Nu s-a putut trimite poza către server.');
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    detections,
    sendFrameToBackend,
  };
};
