$("#form-cg-add").validate({
	rules:{
        title:{
			required:true,
			remote: {
                url: "/category/checkName",
                type: "post",
                dataType: "json",
                data: {
                	"title" : function() {
                        return $.trim($("#title").val());
                    }
                },
                dataFilter: function(data, type) {
                    if (data == '0') return true;
                    else return false;
                }
            }
		}
	},
	messages: {
        "title": {
            remote: "分类已经存在"
        }
    },
	submitHandler:function(form){
		add();
	}
});

function add() {
	_ajax_save("/category/savecg", $("#form-cg-add").serialize());
}

function selectCtTree() {
	var id = $("#ct_id").val();
	if(id > 0)
	{
		var url = "/category/name/" + id;
        layer_show("选择分类", url, '380', '380');
	}
	else
	{
        var url = "/category/name/0";
        layer_show("选择分类", url, '380', '380');
    }
}