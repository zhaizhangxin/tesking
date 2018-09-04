<template>
		<el-main style="padding: 0;">
			<div class="certs">
				<el-row :gutter="24">
					<el-col :span="10" style="height: 40px;line-height: 40px;">
						<router-link to="/chapterContent/test">
							<span style="color: #000000;margin-right: 2%;">测验</span>
						</router-link>
						|
						<span style="color: #FF9800;margin-left: 2%;">学生测验成绩</span>
					</el-col>
					<el-col :span="14" style="text-align: right;">
						<span style="font-size: 12px;">测试：今日测试</span>
						<span class="testDeta">不限时</span>
					</el-col>
				</el-row>
				
				<el-row :gutter="24" style="margin-top: 2%;">
					<el-col :span="4" style="line-height: 40px;">
						<p style="font-size: 12px;">人数：{{num}}</p>
					</el-col>
					<el-col :span="20" style="text-align: right;line-height: 40px;">
						<el-button type="primary" style="float: right;">搜索</el-button>
						<el-col :span="6" style="float: right;padding-right: 0;">
							<el-input placeholder="学号/姓名" prefix-icon="el-icon-search" v-model="course_Name"></el-input>
						</el-col>
						
						<el-col :span="6" style="float: right;">
							<el-select v-model="testDeta" placeholder="全部状态">
								<el-option v-for="item in testDete" :key="item.id" :label="item.label" :value="item.id"></el-option>
							</el-select>
						</el-col>
						<el-col :span="6" style="float: right;">
							<el-select v-model="videoValue" placeholder="全部班组">
								<el-option v-for="item in options" :key="item.id" :label="item.label" :value="item.id"></el-option>
							</el-select>
						</el-col>
					</el-col>
				</el-row>
				
				<div class="table">
					<el-table border stripe :data="tableData">
						<el-table-column prop="data" label="学生" align="center"></el-table-column>
						<el-table-column prop="time" label="班组" align="center"></el-table-column>
						<el-table-column prop="status" label="提交状态" align="center"></el-table-column>
						<el-table-column prop="endTime" label="提交时间" align="center"></el-table-column>
						<el-table-column prop="test" label="测验得分" align="center"></el-table-column>
						<el-table-column label="操作" align="center">
							<template slot-scope="scope">
								<el-button type="text" class="buttonText" @click="test_show(scope.row.data,scope.row.id)">查看</el-button>
							</template>
						</el-table-column>
					</el-table>
				</div>
				
				<el-dialog :visible.sync="testShow" width="30%" center>
					<span slot="title">{{username}}-测验成绩</span>
					<div>
						<p>一、单选题</p>
						<div style="display: flex;justify-content: space-around;margin-top: 4%;">
							<div>1.A <i class="el-icon-success" style="font-size: 20px;color: #259b24;"></i></div>
							<div>2.B <i class="el-icon-error" style="font-size: 20px;color: #E51C23;"></i></div>
							<div>3.C <i class="el-icon-success" style="font-size: 20px;color: #259b24;"></i></div>
							<div>4.D <i class="el-icon-success" style="font-size: 20px;color: #259b24;"></i></div>
						</div>
					</div>
					<span slot="footer" class="dialog-footer">
					   <el-button type="primary" @click="testShow = false">确 定</el-button>
					   <el-button type="text" style="color: #999999;" @click="testShow = false">取 消</el-button>
					</span>
				</el-dialog>
				
			</div>

		</el-main>

</template>
<script>


	export default {
		data() {
			return {
				num:'1',
				course_Name:'',
				testDeta:'',
				testShow:false,
				username:'',
				tableData:[
					{data:'张宁宁',time:'默认分组',status:'已提交',endTime:'2018.07.15',test:'89',id:1},
					{data:'郭大宇',time:'默认分组',status:'已提交',endTime:'2018.07.15',test:'89',id:2},
					{data:'权乔妹',time:'默认分组',status:'已提交',endTime:'2018.07.15',test:'89',id:3}
				],
				options:[
					{id:1,label:'全部班组'},
					{id:2,label:'全部组'},
					{id:3,label:'全班组'}
				],
				testDete:[
					{id:1,label:'全部班组'},
					{id:2,label:'全部组'},
					{id:3,label:'全班组'}
				],
				videoValue:'',
				videoNum:'1'
			}
		},
		methods: {
			test_show(name,id){
				this.testShow = true;
				this.username = name;
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
	.testDeta{
		margin-left: 4%;
		padding: 2% 4%;
		border: 1px solid #FF9800;
		color: #FF9800;
		font-size: 12px;
	}
	.table {
		margin-top: 2%;
		padding: 0;
	}
</style>