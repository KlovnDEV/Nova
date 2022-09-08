export * from './NUI';
export * from './Menu';

export function showNotification(text: string) {
  emit('ui:showNotification', {text})
}
