import { Marker } from '@nova/engine-lib/client/Graphics';
import { Log, Random, Vector3 } from '@nova/engine-lib/shared';

const markers = [];

(async () => {
  for (let i = 0; i < 5000; i += 1) {
    const marker = new Marker({
      markerType: 1,
      coords: new Vector3(Random.randint(-20, 20), Random.randint(-20, 20), Random.randint(0, 20)),
      scale: new Vector3(3, 3, 3),
      notificationText: 'Нажми ~INPUT_PICKUP~ чтобы ~y~открыть ~w~меню',
      drawDistance: 200.0,
      onPress: () => {
        Log.info('pushed');
      },
    });

    markers.push(marker);
  }

  Log.info('Markers', markers.length);
})();

setTick(async () => {
  markers.forEach(marker => {
    marker.draw();
  });
});
