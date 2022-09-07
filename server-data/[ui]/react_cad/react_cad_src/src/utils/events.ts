interface EventHandlerFunction {
  (data: AnyObject): void;
}

export function EventHandler(func: EventHandlerFunction): void {
  window.addEventListener('message', event => {
    const { data } = event;
    func(data);
  });
}

export default EventHandler;
