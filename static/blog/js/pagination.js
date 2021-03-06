/**
 * @author: xgc-whj
 * @date: 2017-12-27
 * @version: v1.1
 */
/**
 var options = {
    //可选，每页显示条数下拉框，默认下拉框5条/页(默认)、10条/页、15条/页、20条/页
    pageSizeOpt: [
        {'value': 5, 'text': '5条/页', 'selected': true},
        {'value': 10, 'text': '10条/页'},
        {'value': 15, 'text': '15条/页'},
        {'value': 20, 'text': '20条/页'}
    ],
    //可选，css设置，可设置值：css-1，css-2，css-3，css-4，css-5，默认css-1，可自定义样式
    css: 'css-1',
    //可选，总页数
    totalPage: 100,
    //可选，展示页码数量，默认5个页码数量
    showPageNum: 5,
    //可选，首页按钮展示文本，默认显示文本为首页
    firstPage: '首页',
    //可选，上一页按钮展示文本，默认显示文本为上一页
    previousPage: '上一页',
    //可选，下一页按钮展示文本，默认显示文本为下一页
    nextPage: '下一页',
    //可选，尾页按钮展示文本，默认显示文本为尾页
    lastPage: '尾页',
    //可选，跳至展示文本，默认显示文本为跳至
    skip: '跳至',
    //可选，确认按钮展示文本，默认显示文本为确认
    confirm: '确认',
    //可选，刷新按钮展示文本，默认显示文本为刷新
    refresh: '刷新',
    //可选，共{}页展示文本，默认显示文本为共{}页，其中{}会在js具体转化为数字
    totalPageText: '共{}页',
    //可选，是否展示首页与尾页，默认true
    isShowFL: true,
    //可选，是否展示每页N条下拉框，默认true
    isShowPageSizeOpt: true,
    //可选，是否展示跳到指定页数，默认true
    isShowSkip: true,
    //可选，是否展示刷新，默认true
    isShowRefresh: true,
    //可选，是否展示共{}页，默认true
    isShowTotalPage: true,
    //可选，是否重新设置当前页码及总页数，当请求服务器返回数据时，默认false
    isResetPage: false,
    //必选，回掉函数，返回参数：第一个参数为页码，第二个参数为每页显示N条
    callBack: function (currPage, pageSize) {
        console.log('currPage:' + currPage + '     pageSize:' + pageSize);
    }
 };
 */
(function(a){$.fn.extend({pagination:function(b,j,c){var g=$(this);if(b==="getPage"){return[g.get(0).pageText.currPage,g.get(0).pageText.totalPage]}else{if(b==="setPage"){g.get(0).pageText.currPage=j;g.get(0).pageText.totalPage=c;if(g.get(0).pageText.pageSize!=null){g.get(0).pageText.totalSize=c*g.get(0).pageText.pageSize}}else{if(g.get(0).pageText==null){var m=[{value:5,text:"5条/页",selected:true},{value:10,text:"10条/页"},{value:15,text:"15条/页"},{value:20,text:"20条/页"}];if(b.pageSizeOpt!=null){m=b.pageSizeOpt}var p=m[0].value;for(var t in m){if(m[t].selected){p=m[t].value;break}}var d="whj_jqueryPaginationCss-1";if(b.css!=null){switch(b.css){case"css-2":d="whj_jqueryPaginationCss-2";break;case"css-3":d="whj_jqueryPaginationCss-3";break;case"css-4":d="whj_jqueryPaginationCss-4";break;case"css-5":d="whj_jqueryPaginationCss-5";break;default:d=b.css}}g.get(0).pageText={css:d,pageSizeOpt:m,totalPage:b.totalPage,showPageNum:b.showPageNum!=null?b.showPageNum:5,firstPage:b.firstPage!=null?b.firstPage:"首页",previousPage:b.previousPage!=null?b.previousPage:"上一页",nextPage:b.nextPage!=null?b.nextPage:"下一页",lastPage:b.lastPage!=null?b.lastPage:"尾页",skip:b.skip!=null?b.skip:"跳至",confirm:b.confirm!=null?b.confirm:"确认",refresh:b.refresh!=null?b.refresh:"刷新",totalPageText:b.totalPageText!=null?b.totalPageText:"共{}页",isShowFL:b.isShowFL==false?false:true,isShowPageSizeOpt:b.isShowPageSizeOpt==false?false:true,isShowSkip:b.isShowSkip==false?false:true,isShowRefresh:b.isShowRefresh==false?false:true,isShowTotalPage:b.isShowTotalPage==false?false:true,isResetPage:b.isResetPage==true?true:false,callBack:b.callBack,currPage:1,totalSize:p*(b.totalPage!=null?b.totalPage:0),pageSize:(b.isShowPageSizeOpt==false?false:true)?p:null}}}}if(g.get(0).pageText.totalPage==null||g.get(0).pageText.totalPage<1){g.html("");return}var h=g.get(0).pageText.currPage<2?"whj_hoverDisable":"whj_hover";var e=g.get(0).pageText.currPage>=g.get(0).pageText.totalPage?"whj_hoverDisable":"whj_hover";var o=0;var f=0;var u=parseInt(g.get(0).pageText.showPageNum/2);if(g.get(0).pageText.showPageNum<2){f=g.get(0).pageText.currPage}else{if(g.get(0).pageText.totalPage<=parseInt(g.get(0).pageText.showPageNum)){f=1}else{if(g.get(0).pageText.currPage+u>g.get(0).pageText.totalPage){f=g.get(0).pageText.totalPage-g.get(0).pageText.showPageNum+1}else{if(g.get(0).pageText.currPage-u<1){f=1}else{f=g.get(0).pageText.currPage-u}}}}var q='<div class="'+g.get(0).pageText.css+'">';if(g.get(0).pageText.isShowFL){q+='<div class="whj_border whj_padding whj_bgc '+h+'" name="whj_firstPage">'+g.get(0).pageText.firstPage+"</div>"}q+='<div class="whj_border whj_padding whj_bgc '+h+'" name="whj_previousPage">'+g.get(0).pageText.previousPage+"</div>";if(g.get(0).pageText.showPageNum>0){for(var l=f;l<=g.get(0).pageText.totalPage;l++){o++;var s=g.get(0).pageText.currPage==l?"whj_checked":"whj_hover";q+='<div class="whj_border whj_padding whj_bgc '+s+'" name="whj_page" data-page="'+l+'">'+l+"</div>";if(o>=g.get(0).pageText.showPageNum){break}}}q+='<div class="whj_border whj_padding whj_bgc '+e+'" name="whj_nextPage">'+g.get(0).pageText.nextPage+"</div>";if(g.get(0).pageText.isShowFL){q+='<div class="whj_border whj_padding whj_bgc '+e+'" name="whj_lastPage">'+g.get(0).pageText.lastPage+"</div>"}if(g.get(0).pageText.isShowPageSizeOpt){q+='<select class="whj_border whj_bgc whj_hover" name="whj_pageSize">';for(var t in g.get(0).pageText.pageSizeOpt){var k=g.get(0).pageText.pageSizeOpt[t].selected?"selected":"";q+='<option value="'+g.get(0).pageText.pageSizeOpt[t].value+'" '+k+">"+g.get(0).pageText.pageSizeOpt[t].text+"</option>"}q+="</select>"}if(g.get(0).pageText.isShowSkip){q+='<div class="whj_padding whj_color">'+g.get(0).pageText.skip+'</div><input type="text" class="whj_border whj_color" name="whj_toPage"/><div class="whj_border whj_padding whj_bgc whj_hover" name="whj_confirm">'+g.get(0).pageText.confirm+"</div>"}if(g.get(0).pageText.isShowRefresh){q+='<div class="whj_border whj_padding whj_bgc whj_hover" name="whj_refresh">'+g.get(0).pageText.refresh+"</div>"}if(g.get(0).pageText.isShowTotalPage){var n=g.get(0).pageText.totalPageText.replace("{}",g.get(0).pageText.totalPage);q+='<div class="whj_padding whj_color">'+n+"</div>"}q+="</div>";g.html(q);if(g.get(0).pageText.isShowFL){if(h=="whj_hover"){g.find("div[name='whj_firstPage']").click(function(){g.get(0).pageText.currPage=1;r()})}if(e=="whj_hover"){g.find("div[name='whj_lastPage']").click(function(){g.get(0).pageText.currPage=g.get(0).pageText.totalPage;r()})}}if(h=="whj_hover"){g.find("div[name='whj_previousPage']").click(function(){g.get(0).pageText.currPage=g.get(0).pageText.currPage-1;r()})}if(e=="whj_hover"){g.find("div[name='whj_nextPage']").click(function(){g.get(0).pageText.currPage=g.get(0).pageText.currPage+1;r()})}if(g.find("div[name='whj_page']").length>0){g.find("div[name='whj_page']").click(function(){if(!$(this).hasClass("whj_checked")){g.get(0).pageText.currPage=+$(this).data("page");r()}})}if(g.get(0).pageText.isShowPageSizeOpt){g.find("select[name='whj_pageSize']").change(function(){var x=+$(this).val();var y=parseInt(g.get(0).pageText.totalSize/x);if(y*x<g.get(0).pageText.totalSize){y++}var i=[];var v=g.get(0).pageText.pageSizeOpt;for(var w in v){if(v[w].value==x){i.push({value:v[w].value,text:v[w].text,selected:true})}else{i.push({value:v[w].value,text:v[w].text})}}g.get(0).pageText.currPage=1;g.get(0).pageText.pageSize=x;g.get(0).pageText.totalPage=y;g.get(0).pageText.pageSizeOpt=i;r()})}if(g.get(0).pageText.isShowSkip){g.find("input[name='whj_toPage']").on("input",function(){var i=$(this).val();var v=$(this).val().replace(/\D/g,"");if(i.length!=v.length){$(this).val(v)}});g.find("div[name='whj_confirm']").click(function(){var i=g.find("input[name='whj_toPage']").val();if(i.length>0){i=+i;if(i<1){i=1}else{if(i>g.get(0).pageText.totalPage){i=g.get(0).pageText.totalPage}}g.get(0).pageText.currPage=i;r()}})}if(g.get(0).pageText.isShowRefresh){g.find("div[name='whj_refresh']").click(function(){r()})}function r(){if(g.get(0).pageText.isResetPage==false){g.pagination()}g.get(0).pageText.callBack(g.get(0).pageText.currPage,g.get(0).pageText.pageSize)}}})})(window);