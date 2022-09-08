BlipClass = class()

function BlipClass:init(obj)
	assert(obj)

	if obj.pos and obj.width then
		self.id = AddBlipForArea(obj.pos, obj.width, obj.height)
	elseif obj.pos and obj.radius then
		self.id = AddBlipForRadius(obj.pos, obj.radius)
	elseif obj.pos then
		self.id = AddBlipForCoord(obj.pos)
	elseif obj.entity then
		self.id = AddBlipForEntity(obj.entity)
	end

	if DoesBlipExist(self.id) then
		self:update(obj)
	end
end

function BlipClass:exist()
	return DoesBlipExist(self.id)
end

function BlipClass:update(obj)
	assert(obj)

	if not DoesBlipExist(self.id) then
		return false
	end

	if obj.sprite then
		SetBlipSprite(self.id, obj.sprite)
	end

	if obj.pos then
		SetBlipCoords(self.id, obj.pos)
	end

	if obj.alpha then
		SetBlipAlpha(self.id, obj.alpha)
	end

	if obj.friendly ~= nil then
		SetBlipAsFriendly(self.id, obj.friendly)
	end

	if obj.shortRange ~= nil then
		SetBlipAsShortRange(self.id, obj.shortRange)
	end

	if obj.bright ~= nil then
		SetBlipAsShortRange(self.id, obj.bright)
	end

	if obj.category ~= nil then
		SetBlipCategory(self.id, obj.category)
	end

	if obj.display ~= nil then
		SetBlipDisplay(self.id, obj.display)
	end

	if obj.indicator ~= nil then
		SetBlipDisplayIndicatorOnBlip(self.id, obj.indicator)
	end

	if obj.hiddenOnLegend then
		SetBlipHiddenOnLegend(self.id, obj.hiddenOnLegend)
	end

	if obj.rotation then
		SetBlipRotation(self.id, math.ceil(obj.rotation))
	end

	if obj.scale then
		SetBlipScale(self.id, obj.scale)
	end

	if obj.color ~= nil then
		SetBlipColour(self.id, obj.color)
	end

	if obj.showHeading then
		ShowHeadingIndicatorOnBlip(self.id, obj.showHeading)
	end

	if obj.text then
		BeginTextCommandSetBlipName('STRING')
		AddTextComponentSubstringPlayerName(obj.text)
		EndTextCommandSetBlipName(self.id)
	end

	return true
end

function BlipClass:remove()
	if not DoesBlipExist(self.id) then
		return false
	end

	RemoveBlip(self.id)
	return true
end

