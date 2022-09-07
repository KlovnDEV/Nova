Sprite3DClass = class()
-- it should be capable to draw at least 1000 sprites per server and 32 sprites on screen without notable lagging

function Sprite3DClass:init(obj)
    assert(obj)

    self.pos = obj.pos or { x = 0, y = 0, z = 0 }
    self.heading = obj.heading or 0.0
    self.scale = obj.scale or { x = 1, y = 1 }
    self.textureDict = obj.textureDict or nil
    self.textureName = obj.textureName or nil
    self.color = obj.color or { r = 255, g = 255, b = 255 }
    self.alpha = obj.alpha or 255

    self.distanceFade = obj.distanceFade or false

    -- extra
    self.drawDistance = obj.drawDistance or 100

    -- internal
    self.actualAlpha = 0
    self._lazy = false
end

function Sprite3DClass:getDistance(coords)
    if not coords then
        return nil
    end

    return #(vector3(coords.x, coords.y, coords.z) - vector3(self.pos.x, self.pos.y, self.pos.z))
end

function Sprite3DClass:alphaDefault(dist, speed)
	if dist < self.drawDistance then
		if (self.actualAlpha+speed) <= self.alpha then
			self.actualAlpha = self.actualAlpha + speed
		elseif (self.actualAlpha-speed) >= self.alpha then
			self.actualAlpha = self.actualAlpha - speed
		else
			self.actualAlpha = self.alpha
		end
	else
		if self.actualAlpha >= speed then
			self.actualAlpha = self.actualAlpha - speed
		else
			self.actualAlpha = 0
		end
	end
	return self.actualAlpha
end

function Sprite3DClass:alphaDistanceFade(dist)
	self.actualAlpha = math.ceil((1-dist/self.drawDistance)*self.alpha)
	return self.actualAlpha
end

function Sprite3DClass:draw(playerCoords)
	assert(playerCoords)

	if self._lazy and self._lazy_skip > 0 then
		self._lazy_skip = self._lazy_skip - 1
		return
	end

	local dist = self:getDistance(playerCoords)

	if self.distanceFade then
		self:alphaDistanceFade(dist)
	else
		self:alphaDefault(dist, 10)
	end

	if self.actualAlpha > 0 then

		if not HasStreamedTextureDictLoaded(self.textureDict) then
			RequestStreamedTextureDict(self.textureDict, true)
			while not HasStreamedTextureDictLoaded(self.textureDict) do
				Citizen.Wait(0)
			end
		end

		local aspect = GetAspectRatio()

		local scalex = self.scale.x/(1+dist)
		local scaley = self.scale.y*aspect/(1+dist)

		if scalex < 0.001 then
			return
		end

--		local onscreen, x, y = GetScreenCoordFromWorldCoord(self.pos.x, self.pos.y, self.pos.z)

--		if not onscreen then
--			return
--		end
		local x, y = 0, 0

-- SetDrawOrigin allows to draw up to 32 sprites at the time
		SetDrawOrigin(self.pos.x, self.pos.y, self.pos.z, 0)

		DrawSprite(
		self.textureDict,
		self.textureName,
		x, -- offsetx
		y, -- offsety
		scalex,
		scaley,
		self.heading,
		self.color.r,
		self.color.g,
		self.color.b,
		math.ceil(self.actualAlpha)
		)

		ClearDrawOrigin()
	else
	        if dist > self.drawDistance then
			self._lazy = true
			self._lazy_skip = 5
		end
	end


end

