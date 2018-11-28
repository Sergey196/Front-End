$(".item").click(function() {
    if($(this).text().length == 0) {
        $(this).append("&#10004;");
    } else {
        $(this).empty();
    }
});

$(".add_button").click(function() {
    if ($(".new_item").val().length != 0) {
        if (window.confirm("Do you want to add item: " + $(".new_item").val())) {
            $(".items").append('<li><div class="item"></div>' + $(".new_item").val() + '</li>');
            $(".new_item").val('');
        }
    } else {
        alert('Write the name');
    }
});



