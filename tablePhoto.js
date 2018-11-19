function getEventInfo(){
   //获取信息
   var table=[ //表头  param.cols
        {type:'checkbox'},
		{field: 'nCaseID',align: 'center',  title: '案件编号',sort:true},
		{field: 'strCaseCode',align: 'center',  title: '案件编码'},
		{field: 'strCaseName', align: 'center', title: '案件名称'},
		{field: 'strSqUserName',align: 'center',  title: '申请人名称'},
		{field: 'strBzxUserName',align: 'center',  title: '被执行人名称'},
		{field: 'strCreatorID', align: 'center', title: '创建者ID'},
		{field: 'strCreatorName',align: 'center',  title: '创建者名称'},
		{field: 'strCreateDate', align: 'center', title: '创建日期',sort:true},
		{field: 'strCasePicInfo', align:'center',width:120,height:50, title: '案件信息',templet:function(d){
			if(d.strCasePicInfo&&d.strCasePicInfo!=''){
			 return '<div class="layer-photos-demo"><img style="width:80px;height:30px;" src="'+d.strCasePicInfo+'"</div>';
			}else{
				return '';
			}
		}},
		{field: 'strCaseReason',align: 'center',  title: '案件描述'},
		{fixed: 'right', align: 'center', toolbar: '#barDemo'}
        ];
   var tableParam={//表格数据
	  cols:table,
	  tableId:'vtable',
	  lyname:'event',
	  checkPush:checkPush,
	  detail:detail,
	  page:true,
	  done:function(res, curr, count){
	  	 layer.photos({//点击图片弹出
        photos: '.layer-photos-demo'
        ,anim: 1 //0-6的选择，指定弹出图片动画类型，默认随机（请注意，3.0之前的版本用shift参数）
       });
	  },
	  data:[]
   };
   myInit.table(tableParam);
 }
