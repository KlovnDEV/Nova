ESX = nil
TriggerEvent('esx:getSharedObject', function(obj) ESX = obj end)

function Authorized(identifier, role)
	assert(identifier)
	assert(role)

	local clientRole = ESX.Roles.Get(identifier, role)
	if not clientRole or not clientRole.grade or clientRole.grade < 4 then
		return false
	end

	return true
end

RegisterNetEvent('jobs_menu:setJobSalary')
AddEventHandler('jobs_menu:setJobSalary', function(job, grade, salary)
	assert(job)
	assert(grade ~= nil)
	assert(salary ~= nil)

	local xPlayer = ESX.GetPlayerFromId(source)

	if not Authorized(xPlayer.identifier, job) then
		ESX.Error(string.format('Player "%s" tried to set job salary for role "%s" without having proper access rights!', xPlayer.identifier, tostring(role)), debug.traceback())
		return
	end

	if salary <= 0 then
		return
	end

	local identityResponse = exports['db'].post(0, 'roles/grades/setsalary', json.encode({
		["role"] = job,
		["grade"] = grade,
		["salary"] = salary,
	}))

end)

RegisterNetEvent('jobs_menu:firePlayer')
AddEventHandler('jobs_menu:firePlayer', function(job, identifier)
	local xPlayer = ESX.GetPlayerFromId(source)

	if not Authorized(xPlayer.identifier, job) then
		ESX.Error(string.format('Player "%s" tried to fire player with role "%s" without having proper access rights!', xPlayer.identifier, tostring(job)), debug.traceback())
		return
	end

	ESX.Roles.Remove(identifier, job)
end)


ESX.RegisterServerCallback('jobs_menu:getJobInfo', function(source, cb, role)
	local xPlayer = ESX.GetPlayerFromId(source)

	if not Authorized(xPlayer.identifier, role) then
		ESX.Error(string.format('Player "%s" tried to access JobInfo menu for role "%s" without having proper access rights!', xPlayer.identifier, tostring(role)), debug.traceback())
		return
	end

	local rolelist = ESX.Roles.ListPlayersWithRole(role)
	local gradelist = ESX.Roles.Grades.Get(role)
	local employees = {}
	local grades = {}

	for k,v in pairs(rolelist) do

		local identityResponse = exports['db'].post(0, 'identity/get', json.encode({
			["identifier"] = v.identifier,
		}))

		local charName = "Неизвестный"

		if identityResponse[1] == 200 then
			local identity = json.decode(identityResponse[2])
			charName = identity.firstname .. " " .. identity.lastname
		end

		table.insert(employees, {
			["id"] = v.identifier,
			["name"] = charName,
			["grade"] = v.grade,
		})
	end

	for k,v in pairs(gradelist) do
		table.insert(grades, {
			["id"] = v.grade,
			["name"] = v.label,
			["salary"] = v.salary,
		})
	end

	cb({
		["employees"] = employees,
		["grades"] = grades
	})
end)
