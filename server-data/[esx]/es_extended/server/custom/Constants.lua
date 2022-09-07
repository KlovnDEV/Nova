---------------------------------
--   copyright (c) Fill 2020   --
--     fellinirp@gmail.com     --
--     All rights reserved     --
---------------------------------
C = {
    CB_ERROR = 'Callback is nil in function: %s', 
    ARGUMENT_MISSING = 'Argument %s is missing or empty in function: %s', 
    EMPTY_DB_RESPONSE = 'Empty response from database in function: %s',
    INSERT_DB_ERROR = 'Error while inserting/updating row in function: %s',
    REMOVE_DB_ERROR = 'Error while removing row in function: %s',
    NEGATIVE_AMOUNT = 'Amount can not be negative in function: %s'                
}

C.A = {
    NAME = 'name',
    PRICE = 'price',
    LABEL = 'label',
    IDENTIFIER = 'identifier',
    ACCOUNT = 'account',
    AMOUNT = 'amount',
    BUDGET = 'budget',
    GOVERNMENT = 'government',
    DEFAULT_TAX = 'default_tax',
    ROLE = 'role',
    GRADE = 'grade',
    SALARY = 'salary',
    TABLE = 'table',
    CATEGORY = 'category'
}

C.F = {
    LICENSE_GET_BY_NAME = 'ESX.License.GetByName',
    LICENSE_GET_LIST = 'ESX.License.GetList',
    LICENSE_SET = 'ESX.License.Set',
    USER_LICENSE_GET = 'ESX.UserLicense.Get',
    USER_LICENSE_GET_LIST = 'ESX.UserLicense.GetList',
    USER_LICENSE_SET = 'ESX.UserLicense.Set',
    PAYMENT_PAY = 'ESX.Payment.Pay',
    MONEY_GET = 'ESX.Money.Get',
    MONEY_ADD = 'ESX.Money.Add',
    MONEY_REMOVE = 'ESX.Money.Remove',
    MONEY_CHECK = 'ESX.Money.Check',
    SALARY_GET = 'ESX.Salary.Get',
    SALARY_SET = 'ESX.Salary.Set',
    TAX_GET = 'ESX.Tax.Get',
    TAX_SET = 'ESX.Tax.Set',
    ITEM_GET_WEIGHT = 'ESX.Custom.Inventory.Item.GetWeight',
    INVENTORY_GET_WEIGHT = 'ESX.Custom.Inventory.GetWeight',
}

_F = function(str, ...) 
    return string.format(str, ...)
end
