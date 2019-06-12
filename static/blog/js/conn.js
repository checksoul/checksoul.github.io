/*nav*/
$(function () {
    $(".nav>li").hover(function () {
        $(this).children('ul').stop(true, true).show(400);
    }, function () {
        $(this).children('ul').stop(true, true).hide(400);
    })
});

/*search*/
$(function () {
    $(".search_ico").click(function () {
        $(".search_bar").toggleClass('search_open');
        var keys = $("#keyboard").val();
        if (keys.length > 0) {
            $("#keyboard").val('');
            search(keys);
        } else {
            return false;
        }
    });
    $("#keyboard").keyup(function (event) {
        var e = event;
        if(e.keyCode == 13){
            var keys = $(this).val();
            if (keys.length > 0) {
                $(this).val('');
                search(keys);
            } else {
                location.href = "/index";
                return false;
            }
        }
    });
});

function search(keys) {
    location.href = "/search?search="+keys;
}

/*banner*/
$(function () {
    $('#ban').easyFader();
});

function getUrlParms(name){
    var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");
    var r = window.location.search.substr(1).match(reg);
    if(r!=null)
        return unescape(r[2]);
    return null;
}

