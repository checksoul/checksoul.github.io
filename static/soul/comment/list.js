var prefix = "/comment"


$(document).ready(function(){
	$('body').layout({ west__size: 185 });
	queryList();
});

function queryList() {
	var columns = [{
            checkbox: true
        },
        {
            field: 'author',
            title: '回复人'
        },
        {
            field: 'replyer',
            title: '被回复人',
            formatter: function(value, row, index) {
                if(value == '' || value == null){
                    return '';
                }
                return value;
            }
        },
        {
            field: 'ip',
            title: 'ip地址'
        },
        {
            field: 'content',
            title: '回复内容',
            formatter: function(value, row, index) {
                return value.length > 15 ? "<span title='"+value+"'>"+value.substring(0,15)+"...</span>" : value;
            }
        },
        {
            field: 'withcontent.title',
            title: '文章标题'
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
                actions.push('<a class="btn btn-primary btn-sm" href="#" title="回复" onclick="add(\'' + row.id + '\')"><i class="fa fa-edit"></i></a> ');
                actions.push('<a class="btn btn-warning btn-sm" href="#" title="删除" onclick="remove(\'' + row.id + '\')"><i class="fa fa-remove"></i></a> ');
                return actions.join('');
            }
        }];
	var url = prefix + "/alist";
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

/*用户信息-修改*/
function add(id) {
    var url = prefix + "/toadd/"+id;
    layer_showAuto("回复评论", url);
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
