'use client';
import React, { createContext, useContext, useEffect } from 'react';

import { getRenderId, randomIdGenerator, storeRenderId } from './utils';
import { ABFY_SESSION_STORAGE_KEY } from './utils/constants';

type AbfyProviderProps = {
  children: any;
  backendUrl: string;
};

type ExperimentResultPayload = {
  experimentId: string;
  variantId: string;
  timestamp: string;
  context?: string;
  renderId: string;
};

const ABfyContext = createContext({ backendUrl: '' });
export const AbfyProvider = ({ children, backendUrl }: AbfyProviderProps) => {
  useEffect(() => {
    let storedData = {};
    let sessionData = sessionStorage.getItem(ABFY_SESSION_STORAGE_KEY);
    if (sessionData !== null) {
      storedData = JSON.parse(sessionData);
    }

    if (Object.keys(storedData).length === 0) {
      const renderId = randomIdGenerator('Render');
      storeRenderId(renderId);
    }
  }, []);

  return (
    <ABfyContext.Provider value={{ backendUrl: backendUrl }}>
      {children}
    </ABfyContext.Provider>
  );
};

export const useAbfyContext = () => {
  const context = useContext(ABfyContext);
  if (!context) {
    throw new Error('useAbfyContext must be used within an AbfyProvider');
  }
  return context;
};

export async function publishExperimentResult(
  experimentId: string,
  variantId: string,
  backendUrl: string,
  context: null | string = null,
): Promise<void> {
  const payload: ExperimentResultPayload = {
    experimentId,
    variantId,
    timestamp: new Date().toUTCString(),
    renderId: '',
  };

  let renderId = getRenderId();
  console.log('RenderId received is', renderId);

  if (!renderId) {
    storeRenderId(randomIdGenerator('Render'));
    renderId = getRenderId();
    console.log('RenderId after generation is', renderId);
    if (renderId) payload.renderId = renderId;
  } else {
    payload.renderId = renderId;
  }

  if (context) {
    payload.context = context;
  }

  try {
    const response = await fetch(backendUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload),
    });

    if (!response.ok) {
      throw new Error(
        `Failed to publish experiment result: ${response.statusText}`,
      );
    }

    console.log('Experiment result published successfully.');
  } catch (error) {
    console.error('Error publishing experiment result:', error);
  }
}
