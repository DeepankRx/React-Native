import React from 'react';
import { Stack, ActivityIndicator } from '@react-native-material/core';
import Icon from '@expo/vector-icons/MaterialCommunityIcons';

const Loading = () => (
  <Stack fill center spacing={4}>
    <ActivityIndicator size="large" color="#00ff00" />
  </Stack>
);

export default Loading;
