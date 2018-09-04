<template>
		<el-main style="padding: 0;">
			<div class="certs">
				<el-row :gutter="24">
					<el-col :span="10" style="height: 40px;line-height: 40px;">
						<router-link to="/chapterContent/operation">
							<span style="color: #000000;margin-right: 2%;">作业</span>
						</router-link>
						|
						<span style="color: #FF9800;margin-left: 2%;">批改</span>
					</el-col>
					<el-col :span="14" style="text-align: right;">
						<el-button type="primary" @click="batchCorrection">批量批改</el-button>
					</el-col>
				</el-row>
				
				<div class="table">
					<el-table border stripe :data="tableData" @selection-change="handleSelectionChange">
						<el-table-column type="selection" width="55" align="center"></el-table-column>
						<el-table-column prop="data" label="用户姓名" align="center"></el-table-column>
						<el-table-column prop="time" label="应提交" align="center"></el-table-column>
						<el-table-column prop="status" label="已提交" align="center"></el-table-column>
						<el-table-column prop="endTime" label="未提交" align="center"></el-table-column>
						<el-table-column prop="test" label="提交截止时间" align="center" width="180"></el-table-column>
						<el-table-column label="操作" align="center" width="150">
							<template slot-scope="scope">
								<el-button type="text" v-if="scope.row.show == 1" size="mini" class="buttonText" @click="correction(scope.row.id)">批改</el-button>
								<div v-if="scope.row.show == 2">
									<el-button type="text" class="buttonText" size="mini">已批改</el-button>
									<el-button type="text" class="buttonText" size="mini" @click="reEdit(scope.row.id)">重新批改</el-button>									
								</div>
							</template>
						</el-table-column>
					</el-table>
				</div>
			</div>
		</el-main>
</template>
<script>
	export default {
		data() {
			return {
				tableData:[
					{data:'张宁宁',time:'50',status:'50',endTime:'0',test:'2018-06-04 08:20',id:1,show:1},
					{data:'张宁宁',time:'50',status:'50',endTime:'0',test:'2018-06-04 08:20',id:2,show:2},
					{data:'张宁宁',time:'50',status:'50',endTime:'0',test:'2018-06-04 08:20',id:3,show:1},
					{data:'张宁宁',time:'50',status:'50',endTime:'0',test:'2018-06-04 08:20',id:4,show:2}
				],
				multipleSelection:[]
			}
		},
		methods: {
//			多选框的值
			handleSelectionChange(val){
		        let multiple = val;
				let id = [];
				multiple.forEach(function(item,index){
					let multId = item.id;
					id.push(multId)
				})
				this.multipleSelection = id;
			},
//			批量批改
			batchCorrection(){
				console.log(this.multipleSelection)
			},
//			批改单个
			correction(id){
				console.log(id)
			},
			reEdit(id){
				console.log(id)
			}
		},
		components: {

		}
	}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style>
	h1,
	h2 {
		font-weight: normal;
	}
	
	ul {
		list-style-type: none;
		padding: 0;
	}
	
	.certs {
		padding: 2%; 
		background-color: #fff;
		text-align: left;
	}
	.table {
		margin-top: 2%;
		padding: 0;
	}
</style>