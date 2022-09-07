PedClass = class()

function PedClass:init(v)
    assert(v)
    assert(v.model)
    assert(v.pos)
    assert(v.heading)

    if type(v.pos) ~= 'vector3' then
        if v.pos.x then
                v.pos = vector3(v.pos.x, v.pos.y, v.pos.z)
        else
            assert(#v.pos > 2)
                v.pos = vector3(v.pos[1], v.pos[2], v.pos[3])
        end
    end

    RequestModel(v.model)

    while not HasModelLoaded(v.model) do
        Citizen.Wait(0)
    end

    self.ped = CreatePed(4, v.model, v.pos, v.heading, true, true)
    SetModelAsNoLongerNeeded(v.model)

    if v.static then
        FreezeEntityPosition(self.ped, true)
        SetEntityInvincible(self.ped, true)
        SetBlockingOfNonTemporaryEvents(self.ped, true)
    end

    if v.animation then
        TaskStartScenarioInPlace(self.ped, v.animation, 0, true)
    end


    self.spawned = true
end

function PedClass:getDistance(coords)
    if not coords then
        return nil
    end

    return #(vector3(coords.x, coords.y, coords.z) - self.pos)
end

function PedClass:remove()
    if not self.spawned then
        return false
    end

    FreezeEntityPosition(self.ped, false)
    SetEntityInvincible(self.ped, false)
    SetBlockingOfNonTemporaryEvents(self.ped, false)
    NetworkFadeOutEntity(self.ped, true, false)
    Citizen.Wait(1000)
    DeleteEntity(self.ped)
    self.spawned = false
    return true
end
