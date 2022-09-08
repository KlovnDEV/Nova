local phoneModel = GetHashKey("prop_amb_phone")

local phoneProp = 0
local currentStatus = 'out'
local lastDict = nil
local lastAnim = nil

local ANIMS = {
	['cellphone@'] = {
		['out'] = {
			['text'] = 'cellphone_text_in',
			['call'] = 'cellphone_call_listen_base',
		},
		['text'] = {
			['out'] = 'cellphone_text_out',
			['text'] = 'cellphone_text_in',
			['call'] = 'cellphone_text_to_call',
		},
		['call'] = {
			['out'] = 'cellphone_call_out',
			['text'] = 'cellphone_call_to_text',
			['call'] = 'cellphone_text_to_call',
		}
	},
	['anim@cellphone@in_car@ps'] = {
		['out'] = {
			['text'] = 'cellphone_text_in',
			['call'] = 'cellphone_call_in',
		},
		['text'] = {
			['out'] = 'cellphone_text_out',
			['text'] = 'cellphone_text_in',
			['call'] = 'cellphone_text_to_call',
		},
		['call'] = {
			['out'] = 'cellphone_horizontal_exit',
			['text'] = 'cellphone_call_to_text',
			['call'] = 'cellphone_text_to_call',
		}
	}
}

function newPhoneProp(ped)
	deletePhone()

	RequestModel(phoneModel)

	while not HasModelLoaded(phoneModel) do
		Citizen.Wait(0)
	end

	phoneProp = CreateObject(phoneModel, GetEntityCoords(ped), true, true, false)
	local bone = GetPedBoneIndex(ped, 28422)
	AttachEntityToEntity(phoneProp, ped, bone, 0.0, 0.0, 0.0, 0.0, 0.0, 0.0, 1, 1, 0, 0, 2, 1)
end

function deletePhone ()
	if phoneProp ~= 0 and DoesEntityExist(phoneProp) then
		DeleteEntity(phoneProp)
	end

	phoneProp = 0
end

function PhonePlayAnim (status, freeze, force)
	if currentStatus == status and force ~= true then
		return
	end

	local ped = PlayerPedId()

	local freeze = freeze or false

	local dict = "cellphone@"
	if IsPedInAnyVehicle(ped, false) then
		dict = "anim@cellphone@in_car@ps"
	end

	loadAnimDict(dict)

	local anim = ANIMS[dict][currentStatus][status]
	if currentStatus ~= 'out' then
		StopAnimTask(ped, lastDict, lastAnim, 1.0)
	end

	local flag = 50

	if freeze == true then
		flag = 14
	end

	if status == 'out' then
		flag = 16
	end

	TaskPlayAnim(ped, dict, anim, 3.0, -1, -1, flag, 0, false, false, false)

	if status ~= 'out' and currentStatus == 'out' then
		Citizen.Wait(380)

		if GetEntityAlpha(PlayerPedId()) > 254 then
			newPhoneProp(ped)
		end
	end

	lastDict = dict
	lastAnim = anim
	currentStatus = status

	if status == 'out' then
		Citizen.Wait(600)
		deletePhone()
		StopAnimTask(ped, lastDict, lastAnim, 1.0)
	end

end

function setPhoneAnimState(state)
	PhonePlayAnim(state)
end

function loadAnimDict(dict)
	RequestAnimDict(dict)
	while not HasAnimDictLoaded(dict) do
		Citizen.Wait(1)
	end
end

RegisterNetEvent('react_phone:setAnim')
AddEventHandler('react_phone:setAnim', function(anim)
	PhonePlayAnim(anim)
end)
