var prefix = "/category"


$(document).ready(function(){
	$('body').layout({ west__size: 185 });
	queryList();
});

function queryList() {
	var columns = [
        {
            field: 'title',
            title: '标签名'
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
            field: 'count',
            title: '文章数'
        },
        {
            title: '操作',
            align: 'center',
            formatter: function(value, row, index) {
                var actions = [];
                if(row.count == 0){
                    actions.push('<a class="btn btn-warning btn-sm" href="#" title="删除" onclick="remove(\'' + row.id + '\')"><i class="fa fa-remove"></i></a> ');
                }
                return actions.join('');
            }
        }];
	var url = prefix + "/taglist";
	$.initTableParams(columns, url, queryParams);
}

function queryParams(params) {
	return {
		// 传递参数查询参数
        limit:		params.limit,
        offset:		params.offset,
        search:		params.search
	};
}


/*删除*/
function remove(id) {
	$.modalConfirm("确定要删除选中数据吗？", function() {
		_ajax(prefix + "/remove/"+id, "", "post");
    })
}
