MarkerClass = class()
-- it should be capable to draw at least 1000 markers per server without notable lagging

function MarkerClass:init(obj)
    assert(obj)

    self.type = obj.type or 1
    self.pos = obj.pos or { x = 0, y = 0, z = 0 }
    self.dir = obj.dir or { x = 0, y = 0, z = 0 }
    self.rot = obj.rot or { x = 0, y = 0, z = 0 }
    self.scale = obj.scale or { x = 1, y = 1, z = 1 }
    self.color = obj.color or { r = 255, g = 0, b = 0 }
    self.alpha = obj.alpha or 100
    self.bob = obj.bob or false
    self.faceCamera = obj.faceCamera or true
    self.rotate = obj.rotate or false
    self.textureDict = obj.textureDict or nil
    self.textureName = obj.textureName or nil
    self.drawOnEnts = obj.drawOnEnts or false
    -- extra
    self.drawDistance = obj.drawDistance or 100
    self.triggerDistance = obj.triggerDistance or math.max(self.scale.x, self.scale.y)/2.0
    self.notification = obj.notification or nil
    self.zone = obj.zone or nil -- passes to marker without changes

    -- events
    self.onEnter = obj.onEnter or nil
    self.onExit = obj.onExit or nil
    self.onPress = obj.onPress or nil

    -- private
    self.alreadyEnteredMarker = false
    self.actualAlpha = 0
    self.skipFrames = 0
end

function MarkerClass:getDistance(coords)
    if not coords then
        return nil
    end

    return #(vector3(coords.x, coords.y, coords.z) - vector3(self.pos.x, self.pos.y, self.pos.z))
end

function MarkerClass:getTypeOffsetZ(type)
    local typeOffsets = {
        [1] = -0.96,
        [8] = -0.96,
        [9] = -0.96,
        [23] = -0.96,
        [25] = -0.96,
        [26] = -0.96,
        [27] = -0.96,
        [43] = -0.96,
    }

    return typeOffsets[type] or 0
end

function MarkerClass:draw(playerCoords)

    local dist = self:getDistance(playerCoords)

    if dist ~= nil then

        -- Draw Distance
        if self.drawDistance and dist > self.drawDistance then
            if self.actualAlpha >= 1 then
                self.actualAlpha = self.actualAlpha - 1
            else
                return
            end
        else
            if self.actualAlpha <= self.alpha - 1 then
                self.actualAlpha = self.actualAlpha + 1
            else
                self.actualAlpha = self.alpha
            end
        end

        -- Triggers and notification
        if dist < self.triggerDistance then
            if self.notification then
                AddTextEntry('esxHelpNotification', self.notification)
                DisplayHelpTextThisFrame('esxHelpNotification', false)
            end

            if not self.alreadyEnteredMarker then
                if self.onEnter then
                    TriggerEvent(self.onEnter, self._)
                end
                self.alreadyEnteredMarker = true
            end
        else
            if self.alreadyEnteredMarker then
                if self.onExit then
                    TriggerEvent(self.onExit, self._)
                end
                self.alreadyEnteredMarker = false
            end
        end
        if self.alreadyEnteredMarker and IsControlJustReleased(0, 38) then
            if self.onPress then
                TriggerEvent(self.onPress, self._)
            end
        end
    else
        self.actualAlpha = self.alpha
    end

    -- Incorrect Type check
    if self.type < 0 or self.type > 43 then
        return
    end

    DrawMarker(
        self.type,

        self.pos.x * 1.0,
        self.pos.y * 1.0,
        self.pos.z * 1.0 + self:getTypeOffsetZ(self.type),

        self.dir.x * 1.0,
        self.dir.y * 1.0,
        self.dir.z * 1.0,

        self.rot.x * 1.0,
        self.rot.y * 1.0,
        self.rot.z * 1.0,

        self.scale.x * 1.0,
        self.scale.y * 1.0,
        self.scale.z * 1.0,

        self.color.r,
        self.color.g,
        self.color.b,

        self.actualAlpha,
        self.bob,

        self.faceCamera,
        2, --p19
        self.rotate,

        self.textureDict,
        self.textureName,
        self.drawOnEnts
    )
end

