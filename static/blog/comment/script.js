
    $(function () {
        $('.content').flexText();
        var cid = $("#content_id").val();
        $.ajax({
            url: "/comment/list",
            type: "post",
            dataType: "json",
            data: {
                cid: cid,
                page: 1
            },
            success: function (res) {
                if(res.code == 200){
                    if(res.data.total > 0){
                        $(res.data.rows).each(function (i,e) {
                            var clist = '';
                            $(e.list).each(function (n,c) {
                                var ot = '<div class="all-pl-con">' +
                                    '<div class="pl-text hfpl-text clearfix">' +
                                    '<a href="#" class="comment-size-name">'+c.author+' : </a>' +
                                    '<span class="my-pl-con">回复:<a class="atName" href="#'+c.author+'">@'+c.replyer+'</a>: '+ c.content +'</span>' +
                                    '</div>' +
                                    '<div class="date-dz"> ' +
                                    '<span class="date-dz-left pull-left comment-time">'+c.createTimeStr+'</span> ' +
                                    '<div class="date-dz-right pull-right comment-pl-block"> ' +
                                    '<a href="javascript:;" data-id="'+c.parentId+'" data-name="'+c.author+'" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a> ' +
                                    '</div> ' +
                                    '</div>' +
                                    '</div>';
                                clist += ot;
                            });

                            var oHtml = '<div class="comment-show-con clearfix">' +
                                '<div class="comment-show-con-img pull-left">' +
                                '<img src="/static/images/author.jpg" alt="">' +
                                '</div> ' +
                                '<div class="comment-show-con-list pull-left clearfix">' +
                                '<div class="pl-text clearfix"> ' +
                                '<a href="#" class="comment-size-name" name="'+e.author+'">'+e.author+' </a> ' +
                                '<span class="my-pl-con">&nbsp;'+ e.content +'</span> ' +
                                '</div> ' +
                                '<div class="date-dz"> ' +
                                '<span class="date-dz-left pull-left comment-time">'+e.createTimeStr+'</span> ' +
                                '<div class="date-dz-right pull-right comment-pl-block">' +
                                '<a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" data-id="'+e.id+'" data-name="'+e.author+'">回复</a>  ' +
                                '</div> ' +
                                '</div>' +
                                '<div class="hf-list-con">' +clist+
                                '</div>' +
                                '</div> ' +
                                '</div>';
                            $('.comment-show').prepend(oHtml);
                            $('.comment-input').prop('value','').siblings('pre').find('span').text('');
                        });
                        if(res.data.rows.length < res.data.total){
                            $("#more-pl").attr("data-id",2);
                            $("#more-pl").html("点击显示更多...");
                        }else{
                            $("#more-pl").attr("data-id",0);
                            $("#more-pl").html("没有更多数据");
                        }
                    }
                }
            }
        });

        //点击评论创建评论条
        $('.plBtn').on('click',function(){
            var _this = $(this).parent();
            //获取输入内容
            var content = _this.find('.comment-input').val();
            var nick = _this.find('.comment-nick').val();
            var email = _this.find('.comment-email').val();
            //alert(content + " | " + nick + " | " + email)
            if(nick == undefined || nick == ''){
                alert("请填写您的昵称");
                return false;
            }
            if(email == undefined || email == ''){
                alert("请填写您的邮箱");
                return false;
            }
            var reg = /^[a-zA-Z0-9]+([._\\-]*[a-zA-Z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if(!reg.test(email)){
                alert("邮箱好像写的不对，改改在说");
                return false;
            }
            var cid = $("#content_id").val();
            if(cid == ''){
                return false;
            }

            $.ajax({
                url:"/comment/on",
                type: "post",
                dataType: "json",
                data: {
                    nick: nick,
                    email: email,
                    comment: content,
                    cid: cid
                },
                success: function (res) {
                    if(res.code == 200){
                        //动态创建评论模块
                        var oHtml = '<div class="comment-show-con clearfix">' +
                            '<div class="comment-show-con-img pull-left">' +
                            '<img src="/static/images/author.jpg" alt="">' +
                            '</div> ' +
                            '<div class="comment-show-con-list pull-left clearfix">' +
                            '<div class="pl-text clearfix"> ' +
                            '<a href="#" class="comment-size-name" name="'+nick+'">'+nick+' </a> ' +
                            '<span class="my-pl-con">&nbsp;'+ content +'</span> ' +
                            '</div> ' +
                            '<div class="date-dz"> ' +
                            '<span class="date-dz-left pull-left comment-time">'+res.data.createTimeStr+'</span> ' +
                            '<div class="date-dz-right pull-right comment-pl-block">' +
                            '<a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" data-id="'+res.data.id+'" data-name="'+nick+'">回复</a>  ' +
                            '</div> ' +
                            '</div>' +
                            '<div class="hf-list-con">' +
                            '</div>' +
                            '</div> ' +
                            '</div>';
                        if(content.replace(/(^\s*)|(\s*$)/g, "") != ''){
                            $('.comment-show').prepend(oHtml);
                            $('.comment-input').prop('value','').siblings('pre').find('span').text('');
                        }
                        _this.find('.comment-input').val('');
                        _this.find('.comment-nick').val('');
                        _this.find('.comment-email').val('');
                    }else{
                        alert("评论失败");
                    }
                }
            });

        });

        //点击回复动态创建回复块
        $('.comment-show').on('click','.pl-hf',function(){
            //获取回复人的名字
            var fhName = $(this).attr("data-name");
            //回复@
            var fhN = '回复@'+fhName+" : ";
            //var oInput = $(this).parents('.date-dz-right').parents('.date-dz').siblings('.hf-con');
            var fhHtml = '<div class="hf-con pull-left"> <textarea class="content comment-input hf-input" placeholder="" onkeyup="keyUP(this)"></textarea>' +
                '<input class="comment-req comment-nick" placeholder="昵称" type="text" />'+
                '<input class="comment-req comment-email" placeholder="邮箱" type="text"/>'+
                '<a href="javascript:;" data-id="'+$(this).attr("data-id")+'" data-name="'+fhName+'" class="hf-pl">评论</a></div>';
            //显示回复
            if($(this).is('.hf-con-block')){
                $(this).parents('.date-dz-right').parents('.date-dz').append(fhHtml);
                $(this).removeClass('hf-con-block');
                $('.content').flexText();
                $(this).parents('.date-dz-right').siblings('.hf-con').find('.pre').css('padding','6px 15px');
                //console.log($(this).parents('.date-dz-right').siblings('.hf-con').find('.pre'))
                //input框自动聚焦
                $(this).parents('.date-dz-right').siblings('.hf-con').find('.hf-input').val('').focus().val(fhN);
            }else {
                $(this).addClass('hf-con-block');
                $(this).parents('.date-dz-right').siblings('.hf-con').remove();
            }
        });

        //评论回复块创建
        $('.comment-show').on('click','.hf-pl',function(){
            var _this = $(this).parent();
            var oThis = $(this);
            //获取输入内容
            var reply = _this.find('.hf-input').val();
            var snick = $(this).attr("data-name");
            var pid = $(this).attr("data-id");
            var oAllVal = '回复@'+snick+" : ";
            var nick = _this.find(".comment-nick").val();
            var email = _this.find(".comment-email").val();
            var cid = $("#content_id").val();
            if(nick == undefined || nick == ''){
                alert("请填写您的昵称");
                return false;
            }
            if(email == undefined || email == ''){
                alert("请填写您的邮箱");
                return false;
            }
            var reg = /^[a-zA-Z0-9]+([._\\-]*[A-Za-z0-9])*@([a-z0-9]+[-a-z0-9]*[a-z0-9]+.){1,63}[a-z0-9]+$/;
            if(!reg.test(email)){
                alert("邮箱好像写的不对，改改在说");
                return false;
            }
            if(cid == ''){
                return false;
            }
            if(reply.replace(/^ +| +$/g,'') == '' || reply == oAllVal){

            }else {
                $.ajax({
                    url:"/comment/reply",
                    type: "post",
                    dataType: "json",
                    data: {
                        nick: nick,
                        email: email,
                        comment: reply,
                        cid: cid,
                        pid: pid,
                        replyer: snick
                    },
                    success: function (res) {
                        if(res.code == 200){
                            var oHtml = '<div class="all-pl-con">' +
                                '<div class="pl-text hfpl-text clearfix">' +
                                '<a href="#" name="'+nick+'" class="comment-size-name">'+nick+' : </a>' +
                                '<span class="my-pl-con">回复:<a class="atName" href="#'+snick+'">@'+snick+'</a>: '+ res.data.content +'</span>' +
                                '</div>' +
                                '<div class="date-dz"> ' +
                                '<span class="date-dz-left pull-left comment-time">'+res.data.createTimeStr+'</span> ' +
                                '<div class="date-dz-right pull-right comment-pl-block"> ' +
                                '<a href="javascript:;" data-id="'+res.data.parentId+'" data-name="'+nick+'" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a> ' +
                                '</div> ' +
                                '</div>' +
                                '</div>';
                            oThis.parents('.hf-con').parents('.comment-show-con-list').find('.hf-list-con').css('display','block').append(oHtml) && oThis.parents('.hf-con').siblings('.date-dz-right').find('.pl-hf').addClass('hf-con-block') && oThis.parents('.hf-con').remove();
                        }else{
                            alert("回复失败");
                        }
                    }
                });
            }
        });


        $("#more-pl").on("click",function () {
            var page = parseInt($(this).attr("data-id"));
            if(page == 0){
                return false;
            }
            $.ajax({
                url: "/comment/list",
                type: "post",
                dataType: "json",
                data: {
                    cid: cid,
                    page: page
                },
                success: function (res) {
                    if(res.code == 200){
                        if(res.data.total > 0){
                            $(res.data.rows).each(function (i,e) {
                                var clist = '';
                                $(e.list).each(function (n,c) {
                                    var ot = '<div class="all-pl-con">' +
                                        '<div class="pl-text hfpl-text clearfix">' +
                                        '<a href="#" class="comment-size-name">'+c.author+' : </a>' +
                                        '<span class="my-pl-con">回复:<a class="atName" href="#'+c.author+'">@'+c.replyer+'</a>: '+ c.content +'</span>' +
                                        '</div>' +
                                        '<div class="date-dz"> ' +
                                        '<span class="date-dz-left pull-left comment-time">'+c.createTimeStr+'</span> ' +
                                        '<div class="date-dz-right pull-right comment-pl-block"> ' +
                                        '<a href="javascript:;" data-id="'+c.parentId+'" data-name="'+c.author+'" class="date-dz-pl pl-hf hf-con-block pull-left">回复</a> ' +
                                        '</div> ' +
                                        '</div>' +
                                        '</div>';
                                    clist += ot;
                                });

                                var oHtml = '<div class="comment-show-con clearfix">' +
                                    '<div class="comment-show-con-img pull-left">' +
                                    '<img src="/static/images/author.jpg" alt="">' +
                                    '</div> ' +
                                    '<div class="comment-show-con-list pull-left clearfix">' +
                                    '<div class="pl-text clearfix"> ' +
                                    '<a href="#" class="comment-size-name" name="'+e.author+'">'+e.author+' </a> ' +
                                    '<span class="my-pl-con">&nbsp;'+ e.content +'</span> ' +
                                    '</div> ' +
                                    '<div class="date-dz"> ' +
                                    '<span class="date-dz-left pull-left comment-time">'+e.createTimeStr+'</span> ' +
                                    '<div class="date-dz-right pull-right comment-pl-block">' +
                                    '<a href="javascript:;" class="date-dz-pl pl-hf hf-con-block pull-left" data-id="'+e.id+'" data-name="'+e.author+'">回复</a>  ' +
                                    '</div> ' +
                                    '</div>' +
                                    '<div class="hf-list-con">' +clist+
                                    '</div>' +
                                    '</div> ' +
                                    '</div>';
                                $('.comment-show').append(oHtml);
                                $('.comment-input').prop('value','').siblings('pre').find('span').text('');
                            });

                            if((res.data.rows.length + (page - 1) * 10) < res.data.total){
                                $("#more-pl").attr("data-id",page+1);
                                $("#more-pl").html("点击显示更多...");
                            }else{
                                $("#more-pl").attr("data-id",0);
                                $("#more-pl").html("没有更多数据");
                            }
                        }
                    }
                }
            });
        })

    });

    //textarea限制字数
    function keyUP(t){
        var len = $(t).val().length;
        if(len > 279){
            $(t).val($(t).val().substring(0,280));
        }
    }
