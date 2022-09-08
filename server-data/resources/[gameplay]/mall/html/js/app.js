$(document).ready(function () {
    // Listen for NUI Events
    window.addEventListener('message', function (event) {
        var item = event.data;

        if (item.element == 'sell' && item.display == true) {
            $('.sellContainer').show();
            $("#sellItems").empty();

            if (item.items) {
                let sellSelect = $('#sellItems');

                $.each(JSON.parse(item.items), function (i, val) {
                    var option = $("<option/>", {
                        value: val.key,
                        text: val.value + ' (' + val.count + ')',
                        name: val.type,
                        extra: val.extra,
                        count: val.count,
                        lbl: val.value
                    });
                    sellSelect.append(option);
                });
            }

        }
        else if (item.element == 'sell' && item.display == false) {
            $('.sellContainer').hide();
        }

        // buy logic
        else if (item.element == 'buy' && item.display == true) {
            $('.buyContainer').show();
            //$("#buyItems").empty();

            if (item.items) {
                let buyTable = $('#buyItems');

                $.each(JSON.parse(item.items), function (i, val) {
                    var option = $("<option/>", {
                        value: val.key,
                        text: val.value
                    });
                    buyTable.append(option);
                });
            }
        }
        else if (item.element == 'buy' && item.display == false) {
            $('.buyContainer').hide();
        }

        // searched items
        else if (item.buyGrid == true) {
            $('.content-table').show();

            if (item.gridItems) {
                let rows = "";

                $.each(JSON.parse(item.gridItems), function (i, val) {
                    rows += "<tr>" +
                        "<td class='icon'><i class='fas fa-shopping-cart'></i></td>" +
                        "<td>" + val.itemLabel + "</td>" +
                        "<td>" + val.sellerName + "</td>" +
                        "<td class='right'>" + val.itemQty + "</td>" +
                        "<td class='right'>" + val.itemPrice + "</td>" +
                        "<td class='right'><input type='text' name='buyQty" + val.id + "' /></td>" +
                        "<td class='icon'>" +
                            "<input id='buy" + i + "'" +
                            "itemId='" + val.id + "'" +  
                            "identifier='" + val.identifier + "'" +  
                            "sellerName='" + val.sellerName + "'" +  
                            "itemType='" + val.itemType + "'" +  
                            "itemName='" + val.itemName + "'" +  
                            "itemExtra='" + val.itemExtra+ "'" +  
                            "itemLabel='" + val.itemLabel + "'" +  
                            "itemQty='" + val.itemQty + "'" +  
                            "itemPrice='" + val.itemPrice + "'" +  
                            "name='buy'" + 
                            "type='radio'" + 
                            "class='with-font'" + 
                            "value='buyBox' />" +
                            "<label for='buy" + i + "'></label>" +
                        "</td>" +
                        "</tr>";
                });

                $(rows).appendTo('#gridTable'); 
            }
        }
    });

    $('#buy-search').click(function () {
        $("#buyTable > tbody").empty();
        localValue = $('#buyItems option:selected').val(),

        $.post('http://mall/search', JSON.stringify(
            {
                value: localValue
            }
        ));
    });

    $('#sell-cancel').click(function () {
        $("#sellItems").empty();
        $("input[name='qty']").val('');
        $("input[name='price']").val('');

        $.post('http://mall/close_menu', JSON.stringify('sell'));
    });

    $('#buy-cancel').click(function () {
        $('#buyItems option:not(:first)').remove();
        $("#buyTable > tbody").empty();

        $.post('http://mall/close_menu', JSON.stringify('buy'));
    });

    $('#sell-submit').click(function () {
        let error = '',
            localValue = $('#sellItems option:selected').val(),
            localLabel = $('#sellItems option:selected').attr('lbl'),
            localType = $("#sellItems option:selected").attr('name'),
            localExtra = $("#sellItems option:selected").attr('extra'),
            localCount = $("#sellItems option:selected").attr('count'),
            localQty = $(".user-input input[name=qty]").val(),
            localPrice = $(".user-input input[name=price]").val()

        if (localValue == '') {
            error = 'empty_value'
        } else if (localQty == '') {
            error = 'empty_qty'
        } else if (localPrice == '') {
            error = 'empty_price'
        } else if (isNaN(localQty)) {
            error = 'nan_qty'
        } else if (isNaN(localPrice)) {
            error = 'nan_price'
        } else if (parseInt(localQty) > parseInt(localCount)) {
            error = 'qty_failure'
        }

        //$("#sellItems").empty();
        $("input[name='qty']").val('');
        $("input[name='price']").val('');

        $.post('http://mall/sell_item', JSON.stringify({
            value: localValue,
            label: localLabel,
            type: localType,
            count: localCount,
            qty: localQty,
            price: localPrice,
            extra: localExtra,
            error: error
        }));
    });

    $('#buy-submit').click(function () {
        let error = '',
            itemId = $("input[name='buy']:checked").attr('itemId'),
            identifier = $("input[name='buy']:checked").attr('identifier'),
            sellerName = $("input[name='buy']:checked").attr('sellerName'),
            itemType = $("input[name='buy']:checked").attr('itemType'),
            itemName = $("input[name='buy']:checked").attr('itemName'),
            itemExtra = $("input[name='buy']:checked").attr('itemExtra'),
            itemLabel = $("input[name='buy']:checked").attr('itemLabel'),
            selectedQty = $("input[name='buyQty" + itemId + "']").val(),
            itemQty = $("input[name='buy']:checked").attr('itemQty'),
            itemPrice = $("input[name='buy']:checked").attr('itemPrice'); 

        if (selectedQty == '') {
            error = 'empty_qty'
        } else if (isNaN(selectedQty)) {
            error = 'nan_qty'
        } else if (parseInt(selectedQty) > itemQty) {
            error = 'wrong_qty'
        }    
        if (error == '') {
            $('#buyItems option:not(:first)').remove();
            $("#buyTable > tbody").empty();
        }
        
        $.post('http://mall/buy_item', JSON.stringify({
            itemId: parseInt(itemId),
            identifier: identifier,
            sellerName: sellerName,
            itemType: itemType,
            itemName: itemName,
            itemExtra: itemExtra,
            itemLabel: itemLabel,
            selectedQty: parseInt(selectedQty),
            itemQty: parseInt(itemQty),
            itemPrice: parseInt(itemPrice),
            error: error
        }));
    });
});
