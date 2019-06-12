$("#form-add").validate({
	rules:{
        title:{
			required:true,
			minlength: 3,
			maxlength: 30,
            remote: {
                url: "/article/checkName",
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
            required: "标题不能为空",
            remote: "标题已存在"
        }
    }
});

var editor;
var mkeditor;
function initWangEditor(cont){
    var E = window.wangEditor;
    editor = new E('#editor')
    // 配置上传服务器端地址
    editor.customConfig.uploadImgServer = '/file/attach'
    // 自定义菜单配置
    editor.customConfig.menus = [
        'head',  // 标题
        'bold',  // 粗体
        'fontSize',  // 字号
        'fontName',  // 字体
        'italic',  // 斜体
        'underline',  // 下划线
        'strikeThrough',  // 删除线
        'foreColor',  // 文字颜色
        'backColor',  // 背景颜色
        'link',  // 插入链接
        'list',  // 列表
        'justify',  // 对齐方式
        'quote',  // 引用
        'emoticon',  // 表情
        'image',  // 插入图片
        'table',  // 表格
        'video',  // 插入视频
        'code',  // 插入代码
        'undo',  // 撤销
        'redo'  // 重复
    ]
    editor.customConfig.uploadFileName = 'file';
    editor.customConfig.uploadImgHooks = {
        fail: function (xhr, editor, result) {
            if(result.errno == -1){
                $.modalAlert("上传失败", "error");
			}
        }
    }
    editor.create();
    editor.txt.html(cont);
}

function initMarkDown(cont) {
    mkeditor = editormd("mkedit", {
        width   : "100%",
        height  : 640,
        syncScrolling : "single",
        path    : "/static/plugins/lib/",
        saveHTMLToTextarea: true,
        imageUpload : true,
        imageFormats : ["jpg", "jpeg", "gif", "png", "bmp", "webp"],
        imageUploadURL : "/file/attach2",
        emoji: true,//emoji表情，默认关闭
        taskList: true,
        tocm: true, // Using [TOCM]
        tex: true,// 开启科学公式TeX语言支持，默认关闭
        placeholder: "开始写作吧...",

        flowChart: true,//开启流程图支持，默认关闭
        sequenceDiagram: true,//开启时序/序列图支持，默认关闭,

        dialogLockScreen : false,//设置弹出层对话框不锁屏，全局通用，默认为true
        dialogShowMask : false,//设置弹出层对话框显示透明遮罩层，全局通用，默认为true
        dialogDraggable : false,//设置弹出层对话框不可拖动，全局通用，默认为true
        dialogMaskOpacity : 0.4, //设置透明遮罩层的透明度，全局通用，默认值为0.1
        dialogMaskBgColor : "#000",//设置透明遮罩层的背景颜色，全局通用，默认为#fff

        codeFold: true,
        appendMarkdown: cont
    });

}

function bindChangeEditor(b) {
    $("#changeEditor").click(function () {
        var t = "";
        if(b == "m"){
            t = "w";
        }else{
            t = "m";
        }
        $.modalConfirm('修改编辑器后将要重新编辑，确定吗？',function () {
            $.get("/article/changeEditor",{type:t},function (res) {
                if(res.code == 200){
                    location.reload();
                }
            });
        });
    })
}

function report() {
    saveOrUpd(1);
}

function draft() {
    saveOrUpd(2);
}

function saveOrUpd(st) {
    var content = '';
    if(mkeditor == undefined){
        content = editor.txt.html();
    }else{
        content = mkeditor.getMarkdown();
    }
    var id = $("#aid").val();
    var title = $("input[name='title']").val();
    if(title == '') return false;
    var summary = $("#summary").val();
    var tags = $("input[name='tags']").val();
    var category = $("input[name='category']").val();
    var keywords = $("input[name='keywords']").val();
    var description = $("input[name='description']").val();
    var commentStatus = $("input[name='commentStatus']").prop("checked") ? 1 : 0;
    var remarks = $("#remarks").html();
    var markdown = $("#markd").val();
    var thumbnail = $("input[name='thumbnail']").val();
    $.ajax({
        type : "POST",
        url : "/article/saveOrUpd",
        async:false,
        data : {
            "id": id,
            "title": title,
            "content": content,
            "summary": summary,
            "tags": tags,
            "category": category,
            "keywords": keywords,
            "description": description,
            "commentStatus":commentStatus,
            "remarks":remarks,
            "markdown":markdown,
            "state": st,
            "thumbnail":thumbnail
        },
        error : function(request) {
            $.modalAlert("系统错误", "error");
        },
        success : function(data) {
            if(data.code == 200){
                location.href = "/article/tolist";
            }else{
                $.modalAlert(data.message, "error");
            }
        }
    });
}


$(function() {
    $(".tags_enter").blur(function() { //焦点失去触发
        var txtvalue=$(this).val().trim();
        if(txtvalue!=''){
            addTag($(this));
        }
    }).keydown(function(event) {
        var key_code = event.keyCode;
        var txtvalue=$(this).val().trim();
        if (key_code == 13&& txtvalue != '') { //enter
            addTag($(this));
        }
        if (key_code == 32 && txtvalue!='') { //space
            addTag($(this));
        }
    });
    showtags();
})
function addTag(obj) {
    var tag = obj.val();
    if (tag != '') {
        tag = tag.replace(/,/g,"");
        var i = 0;
        $(".tag").each(function() {
            if ($.trim($(this).text()) == tag + "×") {
                $(this).addClass("tag-warning");
                setTimeout("removeWarning()", 500);
                i++;
            }
        })
        obj.val('');
        if (i > 0) { //说明有重复
            return false;
        }
        $("#spantags").append("<span class='tag'>" + tag + "<button class='close' type='button'>×</button></span>")
            .find(".close").on("click",function () {
            $(this).parent(".tag").remove();
            gettagvalue();
        }); //添加标签
        gettagvalue();
    }
}
function gettagvalue() {
    var tv = "";
    $("#spantags").find(".tag").each(function () {
        var m = $(this).text();
        m = m.replace("×",",");
        tv += m;
    });
    $("#field-tags").val(tv);
}

function showtags() {
    $.ajax({
        url: "/article/gettags",
        type: "get",
        data: {
            id: $("#aid").val()
        },
        success: function (data) {
            if(data.code == 200 && data.data.length > 0) {
                $(data.data).each(function (i,e) {
                    $(".tags_enter").val(e);
                    $(".tags_enter").blur();
                });
            }
        }
    });
}

function showThumb(path) {
    if(path != undefined && path != ''){
        $("#savethumbnail").val(path);
        $("#delthumb").show();
        $("#upthumb").hide();
        $("#showthumb").find("img").prop('src',path);
        $("#showthumb").show();
    }
}


function removeWarning() {
    $(".tag-warning").removeClass("tag-warning");
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


function addThumb() {
    $("#thumbnailFile").click();
}

function uploadThumb() {
    var formData = new FormData();
    formData.append("file", document.getElementById("thumbnailFile").files[0]);
    $.ajax({
        url: "/file/attach",
        type: "POST",
        data: formData,
        contentType:false,
        processData: false,
        success: function (data) {
            if(data.errno == 0) {
                $("#savethumbnail").val(data.data);
                $("#delthumb").show();
                $("#upthumb").hide();
                $("#showthumb").find("img").prop('src',data.data);
                $("#showthumb").show();
            }
            else
                $.modalAlert('上传异常', "error");
        },
        error: function () {
            $.modalAlert('上传异常', "error");
        }
    });
}

function delThumb() {
    $("#savethumbnail").val("");
    $("#delthumb").hide();
    $("#upthumb").show();
    $("#showthumb").hide();
}