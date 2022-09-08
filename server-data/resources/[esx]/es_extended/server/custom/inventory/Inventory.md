## Создаём новый инвентарь

```lua
local inv = ESX.Custom.Inventory.Create(category, identifier, false, {
	title = "Шкафчик",
	maxWeight = 60,
	actionGroup = 'container', -- определяет доступные действия над предметами
	width = 30, -- размеры инвентаря
	height = 40,
})
```
Если инвентарь уже существует, его можно получить командой
```lua
local inv = ESX.Custom.Inventory.Get(category, identifier)
```

## Свойства инвентаря

```lua
inv.maxWeight -- максимальный вес инвентаря
inv.weight -- текущий вес инвентаря
inv.items -- все итемы в инвентаре
```

## Выборка определённых итемов из инвентаря

Если нужно выбрать все подходящие итемы:
```lua
ESX.Custom.Inventory.Search(inv, { name = 'wood' })
```
Или только первый найденный итем:
```lua
ESX.Custom.Inventory.SearchFirst(inv, { name = 'wood' })
```

## Удалить определённый итем из инвентаря

Удалим три дерева. Если успешно удалили, выведем сообщение

```lua
local item = ESX.Custom.Inventory.SearchFirst(inv, { name = 'wood' })

if ESX.Custom.Inventory.RemoveItem(inv, item, 3) then
	print('Удалено')
else
	print('Не удалено')
end
```

## Создать итем в инвентаре
Создадим 7 телефонов
```lua
local item = ESX.Custom.Inventory.Item.Create('phone')

if ESX.Custom.Inventory.AddItem(inv, item, 7) then
    print('Создано')
end
```

## Изменить любое свойство итема
```lua
item.uid = 'WEAPON_PISTOL'
item.weight = 2.718281828459045235360
ESX.Custom.Inventory.UpdateItem(inv, item) -- применяем изменения
```