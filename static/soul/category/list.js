var prefix = "/category"

window.onload = function() {
	loading();
};

function loading() {
	var columns = [
        {
			title : '分类名称',
			field : 'title'
		},
        {
        	field : 'intro',
			title : '描述'
        },
        {
        	field : 'createTime',
			title : '创建时间',
            formatter: function (row,index) {
        		if(row.createTime != undefined){
                    return $.formatTimestamp(row.createTime);
                }else{
                    return "";
                }
            }
        },
        {
        	field: 'count',
			title : '文章数'
		},
        {
        	title : '操作',
			align : 'center',
			formatter : function(row, index) {
				var actions = [];
				actions.push('<a class="btn btn-primary btn-sm" href="#" title="编辑" mce_href="#" onclick="edit(\'' + row.id + '\')"><i class="fa fa-edit"></i></a> ');
				actions.push('<a class="btn btn-primary btn-sm" href="#" title="新增" mce_href="#" onclick="add(\'' + row.id + '\')"><i class="fa fa-plus"></i></a> ');
				if(row.count == 0){
                    actions.push('<a class="btn btn-warning btn-sm" href="#" title="删除" mce_href="#" onclick="remove(\'' + row.id + '\')"><i class="fa fa-remove"></i></a>');
				}
				return actions.join('');
			}
        }];
	var url = prefix + "/list";
	$.initTreeTable('id', 'parentId', columns, url, false);
}

/*菜单管理-新增*/
function add(id) {
    var url = prefix + '/add/' + id;
    layer_show("新增分类", url,'800','400');
}

/*菜单管理-修改*/
function edit(id) {
    var url = prefix + '/edit/' + id;
    layer_show("修改分类", url,'800','400');
}

/*菜单管理-删除*/
function remove(id) {
	layer.confirm("确定要删除分类吗？",{icon: 3, title:'提示'},function(index){
		$.ajax({
			type : 'get',
			url: prefix + "/remove/" + id,
			success : function(r) {
				if (r.code == 200) {
					layer.msg(r.message, { icon: 1, time: 1000 });
					loading();
				} else {
					layer.alert(r.message, { icon: 2, title: "系统提示" });
				}
			}
		});
	});
}
