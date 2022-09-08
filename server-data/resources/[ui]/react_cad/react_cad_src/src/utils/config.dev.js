export function startDevSession() {
  const event = new CustomEvent('message');
  event.data = {
    showMenu: true,
    homepage: '/government',
  };

  window.dispatchEvent(event);
}

export default startDevSession;
