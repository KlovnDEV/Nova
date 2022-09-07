local SecurityPlayer = {}
local Open = false

local pay = {
    ['rich'] = {20, 35},
    ['default'] = {10, 20},
    ['bad'] = {5, 7},
    ['poor'] = {2, 4},
    ['girl'] = {0, 0},
}

local caution = {
    ['limo'] = 100,
    ['bus'] = 100
}

local badguyCount = 0
local MAXBADGUY = 10

local girlCount = 0
local MALUSGIRL = 5
local BONUSGIRL = 5
local BONUSMAX = 15

local guyCount = 0

local TIMER = 600
local lastFight = 0

local societyTotal = 0
local societyRemove = 0
local playerTotal = 0
local girlBonus = 0

local rewardDriving = {
    ['fast'] = math.random( 200, 250 ),
    ['lower'] = math.random( 150, 200 ),
    ['fastFail2'] =  math.random( 80, 130 ),
    ['lowerFail'] = math.random( 80, 130 ),
    ['default'] = math.random( 130, 150 ),
}

local CustomersInClub = {
    {
        spawned = false,
        type,
        id = 01
    },
    {
        spawned = false,
        type,
        id = 02
    },
    {
        spawned = false,
        type,
        id = 03
    },
    {
        spawned = false,
        type,
        id = 04
    },
    {
        spawned = false,
        type,
        id = 05
    },
    {
        spawned = false,
        type,
        id = 06
    },
    {
        spawned = false,
        type,
        id = 07
    },
    {
        spawned = false,
        type,
        id = 08
    },
    {
        spawned = false,
        type,
        id = 09
    },
    {
        spawned = false,
        type,
        id = 10
    },
    {
        spawned = false,
        type,
        id = 11
    },
    {
        spawned = false,
        type,
        id = 12
    },
    {
        spawned = false,
        type,
        id = 13
    },
    {
        spawned = false,
        type,
        id = 14
    },
    {
        spawned = false,
        type,
        id = 15
    },
    {
        spawned = false,
        type,
        id = 16
    },
    {
        spawned = false,
        type,
        id = 17
    },
    {
        spawned = false,
        type,
        id = 18
    },
    {
        spawned = false,
        type,
        id = 19
    },
    {
        spawned = false,
        type,
        id = 20
    },
    {
        spawned = false,
        type,
        id = 21
    },
    {
        spawned = false,
        type,
        id = 22
    },
    {
        spawned = false,
        type,
        id = 23
    },
    {
        spawned = false,
        type,
        id = 24
    },
    {
        spawned = false,
        type,
        id = 25
    },
    {
        spawned = false,
        type,
        id = 26
    },
    {
        spawned = false,
        type,
        id = 27
    },
    {
        spawned = false,
        type,
        id = 28
    },
    {
        spawned = false,
        type,
        id = 29
    },
    {
        spawned = false,
        type,
        id = 30
    },
    {
        spawned = false,
        type,
        id = 31
    },
    {
        spawned = false,
        type,
        id = 32
    },
    {
        spawned = false,
        type,
        id = 33
    },
    {
        spawned = false,
        type,
        id = 34
    },
    {
        spawned = false,
        type,
        id = 35
    },
    {
        spawned = false,
        type,
        id = 36
    },
    {
        spawned = false,
        type,
        id = 37
    },
    {
        spawned = false,
        type,
        id = 38
    },
    {
        spawned = false,
        type,
        id = 39
    },
    {
        spawned = false,
        type,
        id = 40
    },
    {
        spawned = false,
        type,
        id = 41
    },
    {
        spawned = false,
        type,
        id = 42
    },
    {
        spawned = false,
        type,
        id = 43
    },
    {
        spawned = false,
        type,
        id = 44
    },
    {
        spawned = false,
        type,
        id = 45
    }
}
local FightsInClub = {
    {
        spawned = false,
        id = 01
    },
    {
        spawned = false,
        id = 02
    },
    {
        spawned = false,
        id = 03
    },
    {
        spawned = false,
        id = 04
    },
    {
        spawned = false,
        id = 05
    }
}

ESX = nil

TriggerEvent(
    'esx:getSharedObject',
    function(obj)
        ESX = obj
    end
)

if Config.MaxInService ~= -1 then
    TriggerEvent('esx_service:activateService', 'nightclub', Config.MaxInService)
end

TriggerEvent('esx_society:registerSociety', 'nightclub', 'Nightclub', 'society_nightclub', 'society_nightclub', 'society_nightclub', {type = 'private'})
TriggerEvent('esx_phone:registerNumber', 'nightclub', _U('alert_nightclub'), true, true)

AddEventHandler(
    'onResourceStop',
    function(resource)
        if resource == GetCurrentResourceName() then
            TriggerEvent('esx_phone:removeNumber', 'nightclub')
        end
    end
)

RegisterServerEvent('esx_nightclub:buyItem')
AddEventHandler(
    'esx_nightclub:buyItem',
    function(itemName, price, itemLabel)
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(_source)
        local limit = 100
        local qtty = xPlayer.getInventoryItem(itemName).count
        local societyAccount = nil

        TriggerEvent(
            'esx_addonaccount:getSharedAccount',
            'society_nightclub',
            function(account)
                societyAccount = account
            end
        )

        if societyAccount ~= nil and societyAccount.money >= price then
            if qtty < limit then
                societyAccount.removeMoney(price)
                xPlayer.addInventoryItem(itemName, 1)
                TriggerClientEvent('esx:showNotification', _source, _U('bought') .. itemLabel)
            else
                TriggerClientEvent('esx:showNotification', _source, _U('max_item'))
            end
        else
            TriggerClientEvent('esx:showNotification', _source, _U('not_enough'))
        end
    end
)

RegisterServerEvent('esx_nightclub:craftingCoktails')
AddEventHandler(
    'esx_nightclub:craftingCoktails',
    function(itemValue)
        local _source = source
        local _itemValue = itemValue
        TriggerClientEvent('esx:showNotification', _source, _U('assembling_cocktail'))

        if _itemValue == 'jagerbomb' then
            local xPlayer = ESX.GetPlayerFromId(_source)

            local alephQuantity = xPlayer.getInventoryItem('energy').count
            local bethQuantity = xPlayer.getInventoryItem('jager').count

            if alephQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('energy') .. '~w~')
            elseif bethQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('jager') .. '~w~')
            else
                local chanceToMiss = math.random(100)
                if chanceToMiss <= Config.MissCraft then
                    TriggerClientEvent('esx:showNotification', _source, _U('craft_miss'))
                    xPlayer.removeInventoryItem('energy', 2)
                    xPlayer.removeInventoryItem('jager', 2)
                else
                    TriggerClientEvent('esx:showNotification', _source, _U('craft') .. _U('jagerbomb') .. ' ~w~!')
                    xPlayer.removeInventoryItem('energy', 2)
                    xPlayer.removeInventoryItem('jager', 2)
                    xPlayer.addInventoryItem('jagerbomb', 1)
                end
            end
        end

        if _itemValue == 'whiskycoca' then
            local xPlayer = ESX.GetPlayerFromId(_source)

            local alephQuantity = xPlayer.getInventoryItem('soda').count
            local bethQuantity = xPlayer.getInventoryItem('whiskey').count

            if alephQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('soda') .. '~w~')
            elseif bethQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('whisky') .. '~w~')
            else
                local chanceToMiss = math.random(100)
                if chanceToMiss <= Config.MissCraft then
                    TriggerClientEvent('esx:showNotification', _source, _U('craft_miss'))
                    xPlayer.removeInventoryItem('soda', 2)
                    xPlayer.removeInventoryItem('whiskey', 2)
                else
                    TriggerClientEvent('esx:showNotification', _source, _U('craft') .. _U('whiskycoca') .. ' ~w~!')
                    xPlayer.removeInventoryItem('soda', 2)
                    xPlayer.removeInventoryItem('whiskey', 2)
                    xPlayer.addInventoryItem('whiskycoca', 1)
                end
            end
        end

        if _itemValue == 'rhumcoca' then
            local xPlayer = ESX.GetPlayerFromId(_source)

            local alephQuantity = xPlayer.getInventoryItem('soda').count
            local bethQuantity = xPlayer.getInventoryItem('rhum').count

            if alephQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('soda') .. '~w~')
            elseif bethQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('rhum') .. '~w~')
            else
                local chanceToMiss = math.random(100)
                if chanceToMiss <= Config.MissCraft then
                    TriggerClientEvent('esx:showNotification', _source, _U('craft_miss'))
                    xPlayer.removeInventoryItem('soda', 2)
                    xPlayer.removeInventoryItem('rhum', 2)
                else
                    TriggerClientEvent('esx:showNotification', _source, _U('craft') .. _U('rhumcoca') .. ' ~w~!')
                    xPlayer.removeInventoryItem('soda', 2)
                    xPlayer.removeInventoryItem('rhum', 2)
                    xPlayer.addInventoryItem('rhumcoca', 1)
                end
            end
        end

        if _itemValue == 'vodkaenergy' then
            local xPlayer = ESX.GetPlayerFromId(_source)

            local alephQuantity = xPlayer.getInventoryItem('energy').count
            local bethQuantity = xPlayer.getInventoryItem('vodka').count
            local gimelQuantity = xPlayer.getInventoryItem('ice').count

            if alephQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('energy') .. '~w~')
            elseif bethQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('vodka') .. '~w~')
            elseif gimelQuantity < 1 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('ice') .. '~w~')
            else
                local chanceToMiss = math.random(100)
                if chanceToMiss <= Config.MissCraft then
                    TriggerClientEvent('esx:showNotification', _source, _U('craft_miss'))
                    xPlayer.removeInventoryItem('energy', 2)
                    xPlayer.removeInventoryItem('vodka', 2)
                    xPlayer.removeInventoryItem('ice', 1)
                else
                    TriggerClientEvent('esx:showNotification', _source, _U('craft') .. _U('vodkaenergy') .. ' ~w~!')
                    xPlayer.removeInventoryItem('energy', 2)
                    xPlayer.removeInventoryItem('vodka', 2)
                    xPlayer.removeInventoryItem('ice', 1)
                    xPlayer.addInventoryItem('vodkaenergy', 1)
                end
            end
        end

        if _itemValue == 'vodkafruit' then

            local xPlayer = ESX.GetPlayerFromId(_source)
            local alephQuantity = xPlayer.getInventoryItem('juice').count
            local bethQuantity = xPlayer.getInventoryItem('vodka').count
            local gimelQuantity = xPlayer.getInventoryItem('ice').count

            if alephQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('jusfruit') .. '~w~')
            elseif bethQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('vodka') .. '~w~')
            elseif gimelQuantity < 1 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('ice') .. '~w~')
            else
                local chanceToMiss = math.random(100)
                if chanceToMiss <= Config.MissCraft then
                    TriggerClientEvent('esx:showNotification', _source, _U('craft_miss'))
                    xPlayer.removeInventoryItem('juice', 2)
                    xPlayer.removeInventoryItem('vodka', 2)
                    xPlayer.removeInventoryItem('ice', 1)
                else
                    TriggerClientEvent('esx:showNotification', _source, _U('craft') .. _U('vodkafruit') .. ' ~w~!')
                    xPlayer.removeInventoryItem('juice', 2)
                    xPlayer.removeInventoryItem('vodka', 2)
                    xPlayer.removeInventoryItem('ice', 1)
                    xPlayer.addInventoryItem('vodkafruit', 1)
                end
            end
        end

        if _itemValue == 'rhumfruit' then
            local xPlayer = ESX.GetPlayerFromId(_source)

            local alephQuantity = xPlayer.getInventoryItem('juice').count
            local bethQuantity = xPlayer.getInventoryItem('rhum').count
            local gimelQuantity = xPlayer.getInventoryItem('ice').count

            if alephQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('jusfruit') .. '~w~')
            elseif bethQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('rhum') .. '~w~')
            elseif gimelQuantity < 1 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('ice') .. '~w~')
            else
                local chanceToMiss = math.random(100)
                if chanceToMiss <= Config.MissCraft then
                    TriggerClientEvent('esx:showNotification', _source, _U('craft_miss'))
                    xPlayer.removeInventoryItem('juice', 2)
                    xPlayer.removeInventoryItem('rhum', 2)
                    xPlayer.removeInventoryItem('ice', 1)
                else
                    TriggerClientEvent('esx:showNotification', _source, _U('craft') .. _U('rhumfruit') .. ' ~w~!')
                    xPlayer.removeInventoryItem('juice', 2)
                    xPlayer.removeInventoryItem('rhum', 2)
                    xPlayer.removeInventoryItem('ice', 1)
                    xPlayer.addInventoryItem('rhumfruit', 1)
                end
            end
        end

        if _itemValue == 'teqpaf' then
            local xPlayer = ESX.GetPlayerFromId(_source)

            local alephQuantity = xPlayer.getInventoryItem('limonade').count
            local bethQuantity = xPlayer.getInventoryItem('tequila').count

            if alephQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('limonade') .. '~w~')
            elseif bethQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('tequila') .. '~w~')
            else
                local chanceToMiss = math.random(100)
                if chanceToMiss <= Config.MissCraft then
                    TriggerClientEvent('esx:showNotification', _source, _U('craft_miss'))
                    xPlayer.removeInventoryItem('limonade', 2)
                    xPlayer.removeInventoryItem('tequila', 2)
                else
                    TriggerClientEvent('esx:showNotification', _source, _U('craft') .. _U('teqpaf') .. ' ~w~!')
                    xPlayer.removeInventoryItem('limonade', 2)
                    xPlayer.removeInventoryItem('tequila', 2)
                    xPlayer.addInventoryItem('teqpaf', 1)
                end
            end
        end

        if _itemValue == 'mojito' then
            local xPlayer = ESX.GetPlayerFromId(_source)

            local alephQuantity = xPlayer.getInventoryItem('rhum').count
            local bethQuantity = xPlayer.getInventoryItem('limonade').count
            local gimelQuantity = xPlayer.getInventoryItem('menthe').count
            local daletQuantity = xPlayer.getInventoryItem('ice').count

            if alephQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('rhum') .. '~w~')
            elseif bethQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('limonade') .. '~w~')
            elseif gimelQuantity < 2 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('menthe') .. '~w~')
            elseif daletQuantity < 1 then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough') .. _U('ice') .. '~w~')
            else
                local chanceToMiss = math.random(100)
                if chanceToMiss <= Config.MissCraft then
                    TriggerClientEvent('esx:showNotification', _source, _U('craft_miss'))
                    xPlayer.removeInventoryItem('rhum', 2)
                    xPlayer.removeInventoryItem('limonade', 2)
                    xPlayer.removeInventoryItem('menthe', 2)
                    xPlayer.removeInventoryItem('ice', 1)
                else
                    TriggerClientEvent('esx:showNotification', _source, _U('craft') .. _U('mojito') .. ' ~w~!')
                    xPlayer.removeInventoryItem('rhum', 2)
                    xPlayer.removeInventoryItem('limonade', 2)
                    xPlayer.removeInventoryItem('menthe', 2)
                    xPlayer.removeInventoryItem('ice', 1)
                    xPlayer.addInventoryItem('mojito', 1)
                end
            end
        end
    end
)

RegisterServerEvent('esx_nightclub:StartMissionSecurity')
AddEventHandler(
    'esx_nightclub:StartMissionSecurity',
    function()
        local _source = source
        local timeRemaining = TIMER - (os.time() - lastFight)
        if (lastFight == 0) or (timeRemaining <= 0) then
            SecurityPlayer[_source] = {
                inWork = true,
                player = _source
            }
            TriggerClientEvent('esx_nightclub:StartSecurity', _source)
            if not Open then
                Open = true
                TriggerClientEvent('esx_nightclub:ClubOpen', _source)
            end
        else
            TriggerClientEvent('esx:showNotification', _source, "Personne va venir au club pour le moment... Encore ~y~" .. timeRemaining .. "~w~s")
        end
    end
)

RegisterServerEvent('esx_nightclub:sellEntry')
AddEventHandler(
    'esx_nightclub:sellEntry',
    function(customerType, customerdata)
        local _source = source
        local societyPay = math.random(pay[customerType][1], pay[customerType][2])
        local playerPay = societyPay / 10
        local newSocietyPay
        local newSocietyRemove
        local newPlayerPay

        if customerdata == 'good' then
            checkInCustomer(_source, customerdata)
            if girlBonus() then
                societyTotal = societyTotal + (societyPay * girlBonus)
                playerTotal = playerTotal + (playerPay * girlBonus)
            else
                societyTotal = societyTotal + societyPay
                playerTotal = playerTotal + playerPay
            end
        elseif customerdata == 'famous' then
            checkInCustomer(_source, customerdata)
            if girlBonus() then
                newSocietyPay = (societyPay * math.random(20, 100)) * girlBonus
                newPlayerPay = (newSocietyPay / 10) * girlBonus
                societyTotal = societyTotal + newSocietyPay
                playerTotal = playerTotal + newPlayerPay
            else
                newSocietyPay = societyPay * math.random(20, 100)
                newPlayerPay = newSocietyPay / 10
                societyTotal = societyTotal + (societyPay * math.random(20, 100))
                playerTotal = playerTotal + newPlayerPay
            end
            TriggerClientEvent('esx:showNotification', _source, "Ваш клуб посетил ~y~VIP~w~!")
        elseif customerdata == 'girl' then
            checkInCustomer(_source, customerdata)
            TriggerClientEvent('esx:showNotification', _source, "~p~Девушкам~w~ вход бесплатный.")
        elseif customerdata == 'bad' then
            checkBadGuy(_source)
            newSocietyRemove = societyPay * badguyCount
            societyRemove = societyRemove + newSocietyRemove
            TriggerClientEvent('esx:showNotification', _source, "Вы впустили ~r~дебошира~w~!")
        end
    end
)

function girlBonus()
    local IsBonusEnable = false
    if (girlCount > BONUSGIRL) then
        IsBonusEnable = true
        if girlCount >= BONUSMAX then
            girlBonus = BONUSMAX
        else
            girlBonus = girlCount
        end
        TriggerClientEvent('esx:showNotification', _source,"Bonus Femmes X ~y~" .. girlBonus)
    end
    return IsBonusEnable
end

function checkInCustomer(_source, type)
    local customerType = 0
    if type == 'good' then
        guyCount = guyCount + 1
        customerType = 2
    elseif type == 'famous' then
        guyCount = guyCount + 1
        customerType = 1
    elseif type == 'girl' then
        girlCount = girlCount + 1
        customerType = 5
    end
    if ((customerType < 5) and (guyCount < 15)) or ((customerType == 5) and (girlCount < 30)) then
        for i, v in pairs(CustomersInClub) do
            if not v.spawned then
                v.spawned = true
                v.type = customerType
                TriggerClientEvent('esx_nightclub:SpawnCustomerInClub', _source, customerType, v.id)
                break
            end
        end
    end
end

function checkBadGuy(_source)
    badguyCount = badguyCount + 1
    removeGirl()
    if (badguyCount == 2) or (badguyCount == 4) or (badguyCount == 6) or (badguyCount == 8) or (badguyCount == 10) then
        for i, v in pairs(FightsInClub) do
            if not v.spawned then
                v.spawned = true
                TriggerClientEvent('esx_nightclub:SpawnBadGuy', _source, 4, v.id)
                break
            end
        end
    end
    if badguyCount >= MAXBADGUY then
        lastFight = os.time()
        girlCount = 0
        badguyCount = 0
        guyCount = 0
        StopAllWorking()
        for i, v in pairs(CustomersInClub) do
            v.spawned = false
            v.type = nil
        end
        for i, v in pairs(FightsInClub) do
            v.spawned = false
        end
    end
end

function removeGirl()
    girlCount = girlCount - MALUSGIRL
    if girlCount <= 0 then
        girlCount = 0
    end
    local count = MALUSGIRL
    for i, v in pairs(CustomersInClub) do
        if v.spawned then
            if (v.type == 5) and (count > 0) then
                v.spawned = false
                v.type = nil
                count = count - 1
                for i, k in pairs(SecurityPlayer) do
                    TriggerClientEvent('esx_nightclub:RemoveGirl', k.player, v.id)
                end
            elseif count == 0 then
                break
            end
        end
    end
end

function StopAllWorking()
    for i, v in pairs(SecurityPlayer) do
        TriggerClientEvent('esx_nightclub:StopSecurity', v.player)
        TriggerClientEvent('esx:showNotification', v.player, "~r~Trop de perturbateurs une bagarre à éclater!~w~ Plus personne ne veut venir au Club!")
        v.inWork = false
    end
end

RegisterServerEvent('esx_nightclub:serviceOFF')
AddEventHandler(
    'esx_nightclub:serviceOFF',
    function()
        local _source = source
        for i, v in pairs(SecurityPlayer) do
            if v.player == _source then
                v.inWork = false
                break
            end
        end
        Open = false
        for i, v in pairs(SecurityPlayer) do
            if v.inWork then
                Open = true
                break
            end
        end
        if not Open then
            for i, v in pairs(SecurityPlayer) do
                TriggerClientEvent('esx_nightclub:ClubClosed', v.player)
            end
        end
    end
)

RegisterServerEvent('esx_nightclub:buyDrug')
AddEventHandler(
    'esx_nightclub:buyDrug',
    function()
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(_source)
        local money = xPlayer.getMoney()
        local drugType = math.random(0, 1)
        local COKEPRICE = 200
        local METHPRICE = 100

        if drugType == 0 then
            if money < COKEPRICE then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough_money'))
            elseif money >= COKEPRICE then
                xPlayer.addInventoryItem('coke_pooch', 1)
                xPlayer.removeMoney(COKEPRICE)
            end
        else
            if money < METHPRICE then
                TriggerClientEvent('esx:showNotification', _source, _U('not_enough_money'))
            elseif money >= METHPRICE then
                xPlayer.addInventoryItem('meth_pooch', 1)
                xPlayer.removeMoney(METHPRICE)
            end
        end
    end
)

RegisterServerEvent('esx_nightclub:takeMoneyCustomer')
AddEventHandler(
    'esx_nightclub:takeMoneyCustomer',
    function(giveMoney)
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(_source)
        xPlayer.addMoney(giveMoney)
    end
)

RegisterServerEvent('esx_nightclub:driverMissionCompleted')
AddEventHandler(
    'esx_nightclub:driverMissionCompleted',
    function(StarType)
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(_source)
        local total = math.random(500, 2000)
        local reward = rewardDriving[StarType]

        xPlayer.addMoney(reward)
        TriggerClientEvent('esx:showNotification', _source, _U('you_win') .. reward .. '~w~$')
        TriggerEvent(
            'esx_addonaccount:getSharedAccount',
            'society_nightclub',
            function(account)
                account.addMoney(total)
            end
        )
        TriggerClientEvent('esx:showNotification', _source, _U('your_comp_earned') .. total .. '~w~$')
    end
)

RegisterServerEvent('esx_nightclub:driverCaution')
AddEventHandler(
    'esx_nightclub:driverCaution',
    function(vehicleType)
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(_source)
        local money = xPlayer.getMoney()
        local price = caution[vehicleType]
        if price <= money then
            xPlayer.removeMoney(price)
            TriggerClientEvent('esx_nightclub:spawnDriverCar', _source, vehicleType)
            TriggerClientEvent('esx:showNotification', _source, 'Верните ~y~транспорт в ~g~хорошем состоянии~w~ чтобы вернуть депозит (~r~-' .. price .. '~w~$)')
        else
            TriggerClientEvent('esx:showNotification', _source, 'Вам не хватает ~r~денег для залога ~w~  (~r~' .. price .. '~w~$)')
        end
    end
)

RegisterServerEvent('esx_nightclub:returnCar')
AddEventHandler(
    'esx_nightclub:returnCar',
    function(vehicleType)
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(_source)
        local price = caution[vehicleType]
        xPlayer.addMoney(price)
        TriggerClientEvent('esx:showNotification', _source, 'Вы вернули транспорт и получили депозит ~g~+' .. price .. '~w~$')
    end
)

RegisterServerEvent('esx_nightclub:confiscatePlayerItem')
AddEventHandler(
    'esx_nightclub:confiscatePlayerItem',
    function(target, itemType, itemName, amount)
        local _source = source
        local sourceXPlayer = ESX.GetPlayerFromId(_source)
        local targetXPlayer = ESX.GetPlayerFromId(target)

        if itemType == 'item_standard' then
            local targetItem = targetXPlayer.getInventoryItem(itemName)
            local sourceItem = sourceXPlayer.getInventoryItem(itemName)

            -- does the target player have enough in their inventory?
            if targetItem.count > 0 and targetItem.count <= amount then
                -- can the player carry the said amount of x item?
                if sourceItem.limit ~= -1 and (sourceItem.count + amount) > sourceItem.limit then
                    TriggerClientEvent('esx:showNotification', _source, _U('quantity_invalid'))
                else
                    targetXPlayer.removeInventoryItem(itemName, amount)
                    sourceXPlayer.addInventoryItem(itemName, amount)
                    TriggerClientEvent('esx:showNotification', _source, _U('you_confiscated', amount, sourceItem.label, targetXPlayer.name))
                    TriggerClientEvent('esx:showNotification', target, _U('got_confiscated', amount, sourceItem.label, sourceXPlayer.name))
                end
            else
                TriggerClientEvent('esx:showNotification', _source, _U('quantity_invalid'))
            end
        elseif itemType == 'item_account' then
            targetXPlayer.removeAccountMoney(itemName, amount)
            sourceXPlayer.addAccountMoney(itemName, amount)

            TriggerClientEvent('esx:showNotification', _source, _U('you_confiscated_account', amount, itemName, targetXPlayer.name))
            TriggerClientEvent('esx:showNotification', target, _U('got_confiscated_account', amount, itemName, sourceXPlayer.name))
        elseif itemType == 'item_weapon' then
            if amount == nil then
                amount = 0
            end
            targetXPlayer.removeWeapon(itemName, amount)
            sourceXPlayer.addWeapon(itemName, amount)

            TriggerClientEvent('esx:showNotification', _source, _U('you_confiscated_weapon', ESX.GetWeaponLabel(itemName), targetXPlayer.name, amount))
            TriggerClientEvent('esx:showNotification', target, _U('got_confiscated_weapon', ESX.GetWeaponLabel(itemName), amount, sourceXPlayer.name))
        end
    end
)

RegisterServerEvent('esx_nightclub:message')
AddEventHandler(
    'esx_nightclub:message',
    function(target)
        TriggerClientEvent('esx:showNotification', target, '~y~On est en train de vous fouiller.')
    end
)

RegisterServerEvent('esx_nightclub:callData')
AddEventHandler(
    'esx_nightclub:callData',
    function()
        local _source = source
        TriggerClientEvent('esx_nightclub:getData', _source, girlCount, badguyCount, guyCount)
    end
)

RegisterServerEvent('esx_nightclub:getPay')
AddEventHandler(
    'esx_nightclub:getPay',
    function()
        local _source = source
        local xPlayer = ESX.GetPlayerFromId(_source)
        TriggerEvent(
            'esx_addonaccount:getSharedAccount',
            'society_nightclub',
            function(account)
                societyAccount = account
            end
        )
        if societyTotal ~= 0 then
            societyAccount.addMoney(societyTotal)
            xPlayer.addMoney(playerTotal)
            TriggerClientEvent('esx:showNotification', _source, "Доля : ~y~Ваша ~g~+" .. playerTotal .. "~w~$ | ~p~Клуба ~g~+" .. societyTotal .. "~w~$")
        end
        if societyRemove ~= 0 then
            societyAccount.removeMoney(societyRemove)
            TriggerClientEvent('esx:showNotification', _source, "Клуб понес : ~p~убытки~r~-" .. societyRemove .. "~w~$")
        end
        societyTotal = 0
        societyRemove = 0
        playerTotal = 0
    end
)

ESX.RegisterServerCallback(
    'esx_nightclub:isOpen',
    function(source, cb)
        if Open then
            cb(true)
        else
            cb(false)
        end
    end
)

ESX.RegisterServerCallback(
    'esx_nightclub:getOtherPlayerData',
    function(source, cb, target)
        if Config.EnableESXIdentity then
            local xPlayer = ESX.GetPlayerFromId(target)

            local result =
                MySQL.Sync.fetchAll(
                'SELECT firstname, lastname, sex, dateofbirth, height FROM users WHERE identifier = @identifier',
                {
                    ['@identifier'] = xPlayer.identifier
                }
            )

            local firstname = result[1].firstname
            local lastname = result[1].lastname
            local sex = result[1].sex
            local dob = result[1].dateofbirth
            local height = result[1].height

            local data = {
                name = GetPlayerName(target),
                job = xPlayer.job,
                inventory = xPlayer.inventory,
                accounts = xPlayer.accounts,
                weapons = xPlayer.loadout,
                firstname = firstname,
                lastname = lastname,
                sex = sex,
                dob = dob,
                height = height
            }

            TriggerEvent(
                'esx_status:getStatus',
                target,
                'drunk',
                function(status)
                    if status ~= nil then
                        data.drunk = math.floor(status.percent)
                    end
                end
            )

            if Config.EnableLicenses then
                TriggerEvent(
                    'esx_license:getLicenses',
                    target,
                    function(licenses)
                        data.licenses = licenses
                        cb(data)
                    end
                )
            else
                cb(data)
            end
        else
            local xPlayer = ESX.GetPlayerFromId(target)

            local data = {
                name = GetPlayerName(target),
                job = xPlayer.job,
                inventory = xPlayer.inventory,
                accounts = xPlayer.accounts,
                weapons = xPlayer.loadout
            }

            TriggerEvent(
                'esx_status:getStatus',
                target,
                'drunk',
                function(status)
                    if status ~= nil then
                        data.drunk = math.floor(status.percent)
                    end
                end
            )

            TriggerEvent(
                'esx_license:getLicenses',
                target,
                function(licenses)
                    data.licenses = licenses
                end
            )

            cb(data)
        end
    end
)

--[[RegisterCommand("test", function(source, args)
    TriggerClientEvent('esx_nightclub:test', source)
end)]]
