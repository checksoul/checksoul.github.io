var prefix = "/article"


$(document).ready(function(){
	$('body').layout({ west__size: 185 });
    var state = $("#data_state").val();
    if(state == 0){
        $("#show_data").html("所有数据");
	}else if(state == 1){
        $("#show_data").html("已发布");
	}else if(state == 2){
        $("#show_data").html("草稿");
    }
	queryList();
    $(".choose_item").click(function () {
        var did = $(this).attr("data-id");
        $("#data_state").val(did);
        $("#show_data").html($(this).html());
        $("#choose_data").click();
        $.refreshTable();
    });
});

function queryList() {
	var columns = [{
            checkbox: true
        },
        {
            field: 'title',
            title: '标题',
            formatter: function(value, row, index) {
                if(row.state == 1){
                    return '<a target="_blank" href="/a/'+row.id+'\" title="'+value+'">'+value+'</a>';
                }
                return value;
            }
        },
        {
            field: 'state',
            title: '状态',
            align: 'center',
            formatter: function(value, row, index) {
                if (value == '1') {
                    return '<span class="label label-success">已发布</span>';
                } else if (value == '2') {
                    return '<span class="label label-warning">草稿</span>';
                }
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
        {
            field: 'categoryEntity.title',
            title: '分类',
            formatter: function(value, row, index) {
                return '<a target="_blank" href="/cg/'+row.categoryEntity.id+'\" title="'+value+'">'+value+'</a>';
            }
        },
        {
            field: 'tags',
            title: '标签',
            formatter: function (value,row,index) {
                return value.length > 13 ? "<span title='"+value+"'>"+value.substring(0,13)+"...</span>" : value;
            }
        },
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
                actions.push('<a class="btn btn-primary btn-sm" href="#" title="编辑" onclick="edit(\'' + row.id + '\')"><i class="fa fa-edit"></i></a> ');
                actions.push('<a class="btn btn-warning btn-sm" href="#" title="删除" onclick="remove(\'' + row.id + '\')"><i class="fa fa-remove"></i></a> ');
                if(row.state == 1){
                    actions.push('<a class="btn btn-info btn-sm" href="#" title="草稿" onclick="undo(\'' + row.id + '\')"><i class="fa fa-pencil"></i></a> ');
                }
                return actions.join('');
            }
        }];
	var url = prefix + "/list";
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
	$.modalConfirm("确定要删除选中数据吗？", function() {
		_ajax(prefix + "/"+id+"/remove", "", "post");
    })
}

/*修改*/
function edit(id) {
    location.href=prefix + "/" + id +"/edit";
}

/*修改为草稿*/
function undo(id) {
    _ajax(prefix + "/"+id+"/undo", "", "post");
}


// 批量删除
function batchRemove() {
	var rows = $.getSelections("id");
	if (rows.length == 0) {
		$.modalMsg("请选择要删除的数据", "warning");
		return;
	}
	$.modalConfirm("确认要删除选中的" + rows.length + "条数据吗?", function() {
		var url = prefix + '/batchRemove';
        _ajaxjson(url,{ids:rows});
	});
}
