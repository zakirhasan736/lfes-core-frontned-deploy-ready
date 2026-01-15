'use client';
import { useEffect, useRef } from 'react';

export function useTerminalSocket<T>(
  onMessage: (data: T) => void,
  isAuthenticated: boolean
) {
  const wsRef = useRef<WebSocket | null>(null);
  const retryRef = useRef(0);
  const pingRef = useRef<number | null>(null);
  const aliveRef = useRef(true);

  const connect = () => {
    if (!aliveRef.current) return;
    if (wsRef.current?.readyState === WebSocket.OPEN) return;

    const wsUrl = 'wss://api.lfes.io/orders/ws';

    wsRef.current = new WebSocket(wsUrl);

    wsRef.current.onopen = () => {
      retryRef.current = 0;

      pingRef.current = window.setInterval(() => {
        if (wsRef.current?.readyState === WebSocket.OPEN) {
          wsRef.current.send(JSON.stringify({ type: 'ping' }));
        }
      }, 8000);
    };

    wsRef.current.onmessage = e => {
      try {
        const data = JSON.parse(e.data) as T;
        onMessage(data);
      } catch (err) {
        console.warn('WS malformed message:', e.data);
      }
    };

    wsRef.current.onclose = () => {
      cleanup();
      retry();
    };

    wsRef.current.onerror = () => {
      wsRef.current?.close();
    };
  };

  const retry = () => {
    if (!aliveRef.current) return;
    const delay = Math.min(8000, 1000 * 2 ** retryRef.current++);
    setTimeout(connect, delay);
  };

  const cleanup = () => {
    if (pingRef.current) {
      clearInterval(pingRef.current);
      pingRef.current = null;
    }
    wsRef.current = null;
  };

useEffect(() => {
  if (!isAuthenticated) return;

  connect();
  return () => {
    aliveRef.current = false;
    cleanup();
  };
}, [isAuthenticated]);
}
