function copyData(data){
   //赋值执行人列表
	var table=[ //表头  param.cols
		{checkbox: true,fixed: true},
		{field: 'strCaseUserName',title: '用户名称'}];
    var tableParam={//表格数据
		  cols:table,
		  id:'addTable',
		  limit:3,
		  tableId:'_userList', 
		  lyname:'uList',
		  checkPush:checkPush,
		  page:{
			layout: [ 'prev', 'page', 'next', 'skip'] //自定义分页布局
			 //,curr: 5 //设定初始在第 5 页
			,groups: 2 //只显示 1 个连续页码
			,first: false //不显示首页
			,last: false //不显示尾页
		  },
		  data:data,
		  done:function(res,cur,count){
		  	   checkCacheList=res.data;//缓存数组
		  	   var k=0;//校验当前分页是否数据全选
		       for(var i=0;i< res.data.length;i++){
                //数据id和要勾选的id相同时checkbox选中
                //res data  id 判断 存在 选中 不存在 取消选中
                for(var j=0;j<nCaseObj.list.length;j++)
                {
                	if(res.data[i].strCaseUserID==nCaseObj.list[j].strZxUserID)
                	{
	                  //这里才是真正的有效勾选
	                  k+=1;
		                res.data[i]["LAY_CHECKED"]=true;
		                //找到对应数据改变勾选样式，呈现出选中效果
		                var index= res.data[i]['LAY_TABLE_INDEX'];
		                $('#addTaskFrom tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
                    $('#addTaskFrom tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
		  	          }
		  	        }
            }
		       if(k==res.data.length){//头部checkbox 选中
		       	 $('#addTaskFrom .layui-table-header th[data-field="0"] input[type="checkbox"]').prop('checked', true);
             $('#addTaskFrom .layui-table-header th[data-field="0"] input[type="checkbox"]').next().addClass('layui-form-checked');
		       }
		  	
		  }
    };
	 myInit.table(tableParam);
  }
  function altTable(data){
  	var table=[ //表头  param.cols
			{type:'checkbox'},
			{field: 'strCaseUserName',title: '用户名称'}];
    var tableParam={//表格数据
		  cols:table,
		  limit:3,
		  tableId:'_altuserList',
		  lyname:'_altuList',
		  checkPush:checkPush,
		  page:{
			layout: [ 'prev', 'page', 'next', 'skip'] //自定义分页布局
			 //,curr: 5 //设定初始在第 5 页
			,groups: 2 //只显示 1 个连续页码
			,first: false //不显示首页
			,last: false //不显示尾页
		  },
		  data:data,
		  done:function(res,cur,count){
		  	   checkCacheList=res.data;//缓存数组
		  	   if(taskInfoList.length>0&&nCaseObj.list.length==taskInfoList[0].taskZxUserList.length)
		  	   {
		  	   var k=0;//校验当前分页是否数据全选
		       for(var i=0;i< res.data.length;i++){
                //数据id和要勾选的id相同时checkbox选中
                //res data  id 判断 存在 选中 不存在 取消选中
                inner:
                for(var j=0;j<nCaseObj.list.length;j++)
                {
                	if(res.data[i].strCaseUserID==nCaseObj.list[j].strZxUserID)
                	{
	                  //这里才是真正的有效勾选
	                  k+=1;
		                res.data[i]["LAY_CHECKED"]=true;
		         
		                 //找到对应数据改变勾选样式，呈现出选中效果
		                 
		                var index= res.data[i]['LAY_TABLE_INDEX'];
		                $('#altTaskFrom tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', true);
                    $('#altTaskFrom tr[data-index=' + index + '] input[type="checkbox"]').next().addClass('layui-form-checked');
                    break inner;
		  	          }
                	else{
                		res.data[i]["LAY_CHECKED"]=false;
		                 //找到对应数据改变勾选样式，呈现出选中效果
		                var index= res.data[i]['LAY_TABLE_INDEX'];
		                $('#altTaskFrom tr[data-index=' + index + '] input[type="checkbox"]').prop('checked', false);
                    $('#altTaskFrom tr[data-index=' + index + '] input[type="checkbox"]').next().removeClass('layui-form-checked');
                	}
		  	        }
          }
		       if(k==res.data.length){//头部checkbox 选中
		       	 $('#altTaskFrom .layui-table-header th[data-field="0"] input[type="checkbox"]').prop('checked', true);
             $('#altTaskFrom .layui-table-header th[data-field="0"] input[type="checkbox"]').next().addClass('layui-form-checked');
		       }	
		       else{
		       	 $('#altTaskFrom .layui-table-header th[data-field="0"] input[type="checkbox"]').prop('checked', false);
             $('#altTaskFrom .layui-table-header th[data-field="0"] input[type="checkbox"]').next().removeClass('layui-form-checked');
		       }
		      }
		  }
    };
	 myInit.table(tableParam);
  }
  function checkPush(data){
     var checkObj=data,
     choseObj=checkObj.chooseObj,
		 checkList=checkObj.ckList;
		 //nCaseObj.list=[];
		 console.log(data);
		 if(choseObj.type=="one")
		 {
		   if(choseObj.checked==false)
		   {
		   	for(var i=0;i<nCaseObj.list.length;i++){
		   		if(nCaseObj.list[i].strZxUserID==choseObj.data.strCaseUserID){
		   			nCaseObj.list.splice(i,1);
		   		}
		   	}
		   }
		   else{
		   	zxObj.strZxUserID=choseObj.data.strCaseUserID;
				zxObj.strZxUserName=choseObj.data.strCaseUserName;
				nCaseObj.list.push(zxObj);
				zxObj={
				strZxUserID:null,
				strZxUserName:null
				};
		   }
	  }
		 else{
		 	//all
		 	 if(choseObj.checked==false)
		   {
		   	for(var i=0;i<nCaseObj.list.length;i++){
		   		for(var j=0;j<checkCacheList.length;j++)
		   		{
			   		if(nCaseObj.list[i].strZxUserID==checkCacheList[j].strCaseUserID){
			   			 nCaseObj.list.splice(i,1);
			   		}
		   		}
		   	}
		   }
		   else{
		   	for(var m=0;m<checkList.length;m++){
		   			zxObj.strZxUserID=checkList[m].strCaseUserID;
						zxObj.strZxUserName=checkList[m].strCaseUserName;
						nCaseObj.list.push(zxObj);
						zxObj={
							strZxUserID:null,
							strZxUserName:null	
				    };
		   	}
		   }
		 }
  }
