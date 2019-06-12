var prefix = "/article"


$(document).ready(function(){
	$('body').layout({ west__size: 185 });
	queryUserList();
});

function queryUserList() {
	var columns = [{
            checkbox: true
        },
        {
            field: 'title',
            title: '标题'
        },
        {
            field: 'state',
            title: '状态',
            align: 'center',
            formatter: function(value, row, index) {
                return '<span class="label label-warning-light">已删除</span>';
            }
        },
        {
            field: 'commentStatus',
            title: '评论状态',
            align: 'center',
            formatter: function(value, row, index) {
                if (value == '1') {
                    return '<span class="label label-info">开启</span>';
                } else if (value == '0') {
                    return '<span class="label label-danger">关闭</span>';
                }
            }
        },
        {
            field: 'viewCount',
            title: '阅读人数',
            align: 'center'
        },
        /*{
            title: '分类'
        },
        {
            title: '标签'
        },*/
        {
            field: 'createTime',
            title: '创建时间',
			formatter: function (value,row,index) {
				if(value != undefined){
					return $.formatTimestamp(value);
				}else{
					return "";
				}
            }
        },
        {
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                var actions = [];
                actions.push('<a class="btn btn-primary btn-sm" href="#" title="恢复" onclick="edit(\'' + row.id + '\')"><i class="fa fa-undo"></i></a> ');
                actions.push('<a class="btn btn-warning btn-sm" href="#" title="删除" onclick="remove(\'' + row.id + '\')"><i class="fa fa-remove"></i></a> ');
                return actions.join('');
            }
        }];
	var url = prefix + "/dellist";
	$.initTableParams(columns, url, queryParams);
}

function queryParams(params) {
	return {
		// 传递参数查询参数
        limit:		params.limit,
        offset:		params.offset,
        search:		params.search,
		state:		$("#data_state").val()
	};
}


/*删除*/
function remove(id) {
	$.modalConfirm("确定要完全删除选中数据吗？", function() {
		_ajax(prefix + "/"+id+"/delete", "", "post");
    })
}

/*用户管理-修改*/
function edit(id) {
    $.modalConfirm("确定要恢复选中数据吗？", function() {
        _ajax(prefix + "/"+id+"/undo", "", "post");
    })
}


// 批量删除
function batchRemove() {
	var rows = $.getSelections("id");
	if (rows.length == 0) {
		$.modalMsg("请选择要删除的数据", "warning");
		return;
	}
	$.modalConfirm("确认要完全删除选中的" + rows.length + "条数据吗?", function() {
		var url = prefix + '/batchDelete';
        _ajaxjson(url,{ids:rows});
	});
}
