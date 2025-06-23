import { Alert } from 'react-native';

export const handleApiResponse = (response: any, successMessage = 'Action completed successfully.') => {
  const status = response?.status || response?.HttpStatusCode || null;
  const message = response?.Message || response?.data?.Message || '';

  const numericStatus = typeof status === 'string' ? parseInt(status) : status;

  if (numericStatus >= 200 && numericStatus < 300) {
    Alert.alert('Success', successMessage);
    return;
  }

  if (numericStatus === 400 && message) {
    const formatted = message
      .split('|')
      .map((m: string) => `• ${m.trim()}`)
      .join('\n');

    Alert.alert('Validation Error', formatted);
    return;
  }

  if (numericStatus === 401) {
    Alert.alert('Unauthorized', 'You are not authorized.');
    return;
  }

  Alert.alert('Error', message || 'Something went wrong.');
};
