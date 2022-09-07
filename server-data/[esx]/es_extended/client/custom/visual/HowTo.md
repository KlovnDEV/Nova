### Описание функций

1. `ESX.Blips.Create` создать блип на карте

**Config**

```
Config.Blips = {
    {Name = _U('some_name'), title = _U('some_title'), colour = 1, id = 75, x = 1322.60, y = -1651.90, z = 51.20},
    {Name = _U('some_name'), title = _U('some_title'), colour = 1, id = 75, x = 1322.60, y = -1651.90, z = 51.20},
    ...
}
```

**Implementation**
```
Citizen.CreateThread(function()
    ...
    ESX.Blips.Create(Config.Blips)
    ...
end)
```

2. `ESX.Peds.Create` создание педов на карте

**Config**

```
Config.Peds = {
    {model = -1800524916, x = 319.72, y = 180.94, z = 102.59, h = 254.5, animation = "WORLD_HUMAN_COP_IDLES"},
    {model = -1800524916, x = 319.72, y = 180.94, z = 102.59, h = 254.5, animation = "WORLD_HUMAN_COP_IDLES"},
    ...
}
```

**Implementation**
```
Citizen.CreateThread(function()
    ...
    ESX.Peds.Create(Config.Peds)
    ...
end)
```

3. `ESX.Get3DDistance` расчитать дистанцию объектов

**Implementation**
```
local coords = GetEntityCoords(PlayerPedId())

if ESX.Get3DDistance(x,y,z,coords.x,coord.z,coords.y) < 3.0 then 
    ...
```

4. `ESX.Draw3DText` вывод текста 3д

**Implementation**
```
coords = {x = 1, y = 2, z = 0}

ESX.Draw3DText(coords, 'Открыть дверь')
```
Альтернативно третьим параметром можно передать размер