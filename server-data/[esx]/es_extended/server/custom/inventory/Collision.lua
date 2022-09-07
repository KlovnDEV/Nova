ESX.Custom.Inventory.Collision = {}

ESX.Custom.Inventory.Collision.Get = function(inventory)

    local inv = ESX.Custom.Inventory.Get(inventory.category, inventory.identifier)

    local collision = {}
    for x=1,inv.width do
        for y=1,inv.height do
            if not collision[x] then
                collision[x] = {}
            end

            collision[x][y] = nil
        end
    end

    for uid, item in pairs(inv.items) do
        local ix = item.x or 0
        local iy = item.y or 0
        local iw = item.width or 1
        local ih = item.height or 1

	if inv.singleItem then
		iw = 1
		ih = 1
	end

        for x=ix,ix+iw-1 do
            for y=iy,iy+ih-1 do
                if collision[x+1] then
                    collision[x+1][y+1] = item.uid
                else
                    ESX.Error('Collision matrix out of bounds on item '..json.encode(item.uid))
                    print(json.encode(item))
                end
            end
        end
    end

    return collision
end

ESX.Custom.Inventory.Collision.FindFittingArea = function(inventory, item)
	assert(inventory)
	assert(item)

	local w, h = item.width or 1, item.height or 1

	if not inventory.areas or #inventory.areas == 0 then
		return ESX.Custom.Inventory.Collision.FindEmptyArea(inventory, w, h)
	end

	for areaName, area in pairs(inventory.areas) do
		local itemsInArea = ESX.Custom.Inventory.Collision.ItemsInArea(inventory, area.x, area.y, 1, 1)

		if #itemsInArea == 0 then
			if not area.tags then
				return area.x, area.y
			elseif area.tags then
				for _, tag in pairs(area.tags) do
					if item.category == tag or item.name == tag then
						return area.x, area.y
					end
				end
			end
		end
	end

	return nil, nil
end

ESX.Custom.Inventory.Collision.FindEmptyArea = function(inventory, w, h)
    assert(inventory)
    assert(w)
    assert(h)

    if inventory.singleItem then
        w = 1
        h = 1
    end

    for ox=0, inventory.width-w do
        for oy=0, inventory.height-h do

            if inventory.collision[ox+1] and inventory.collision[ox+1][oy+1] == nil then

                local itemsInArea = ESX.Custom.Inventory.Collision.ItemsInArea(inventory, ox, oy, w, h)
                if #itemsInArea == 0 then

                    return ox, oy
                end
            end
        end
    end

    return nil, nil
end

ESX.Custom.Inventory.Collision.ItemsInArea = function(inventory, x, y, w, h)
    assert(inventory)
    assert(x)
    assert(y)

    if inventory.singleItem then
        w = 1
        h = 1
    end

    assert(w)
    assert(h)

    local uids = {}
    for ox=x,x+w-1 do
        for oy=y,y+h-1 do
            if inventory.collision[ox+1] and inventory.collision[ox+1][oy+1] then
                uids[inventory.collision[ox+1][oy+1]] = true
            end
        end
    end

    local arr = {}
    for k,_ in pairs(uids) do
        table.insert(arr, k)
    end

    return arr
end
