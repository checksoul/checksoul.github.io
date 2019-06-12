
$(function() {
    validateRule();
});

$.validator.setDefaults({
    submitHandler: function() {
        login();
    }
});

function login() {
	var username = $("input[name='username']").val().trim();
    var password = $("input[name='password']").val().trim();
    $.ajax({
        type: "POST",
        url: "/admin/login",
        data: {
            "username": username,
            "password": password
        },
        success: function(r) {
            if (r.code == 200) {
                parent.location.href = '/admin/index';
            } else {
                layer.msg(r.message);
            }
        }
    });
}

function validateRule() {
    var icon = "<i class='fa fa-times-circle'></i> ";
    $("#signupForm").validate({
        rules: {
            username: {
                required: true
            },
            password: {
                required: true
            }
        },
        messages: {
            username: {
                required: icon + "请输入您的用户名",
            },
            password: {
                required: icon + "请输入您的密码",
            }
        }
    })
}
