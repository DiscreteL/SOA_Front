<template>
  <div>
    <Navigation></Navigation>
    <el-container  style=" width:70% ; position:absolute;left:15%;top:18%;border: 1px solid #eee" >
      <el-main>
        <!--下面的slice很关键,实现了分页-->
        <el-table ref="multipleTable"
                  :data="docList.slice((currentPage-1)*pageSize,currentPage*pageSize)"
                  tooltip-effect="dark"
                  style="width: 100%">
          <el-table-column  align="center" prop="time" label="日期" width= 300px>
          </el-table-column>
          <el-table-column  align="left"  prop="name" label="新闻公告"  width= 700px>
            <template slot-scope="scope">
              <!--点击进行响应弹出通告具体界面-->
              <span @click="showDialog(),getDetail(scope.row)" style="cursor: pointer;">
                <a class="link">{{scope.row.name}}</a>
              </span>
            </template>
          </el-table-column>
        </el-table>
        <Idialog :dialogVisible="isDialogVisible" @dialogClick="changeDialog" :dialogData="diaData"></Idialog>
        <!--下面进行表格分页操作-->
        <div style="text-align: center;margin-top: 30px;">
          <el-pagination
              background
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-sizes="[8, 12, 16]"
              :page-size="pageSize"
              layout="total, sizes, prev, pager, next,jumper"
              :total="docList.length">

          </el-pagination>
        </div>
      </el-main>
    </el-container>
  </div>
</template>
<script>
import Navigation from '@/components/navigation.vue';
import Idialog from "@/components/dialog.vue";
// import {getNoticeFun} from '@/service/userService.js';

export default {
  name:"News",
  components:{
    Idialog,
    Navigation,
  },
  props:{
    dataList:{
      type:Array,
      default:function(){
        return []
      }
    }
  },
  data() {
    return {
      isDialogVisible: false,
      docList: [

         {
          name: "拒绝这些进口器械！北京协和发布重要公告",
          time: "2021-1-1",
          content:
            "国产医疗器械目前处于高速发展期，在部分领域已具备了和国际巨头“拼刺刀”的能力。但基于技术积累以及观念习惯上的原因，医院和相关机构在采购时整体依然偏向进口器械。针对这些问题，国家政策明确提出医院国产医疗器械占比提升要求。《国务院办公厅关于促进医药产业健康发展的指导意见》中曾指出，国产药品和医疗器械能够满足要求的，政府采购项目原则上须采购国产产品，逐步提高公立医疗机构国产设备配置水平。十四五规划出台后，大批医院和科研机构出现设备缺口，在国家政策要求下，采购国产势必是趋势所在。",
        },
        {
          name: "大三甲门诊大扩张！“周末无差别”门诊来了",
          time: "2021-2-2",
          content:
            "最近，公立医疗机构门诊服务延时花样百出，“晨光医疗”、“午间医疗”、“夜间门诊”、“黄昏门诊”、“周六日无差别门诊”等服务纷纷上马。近日有医生在网上发文称，山东大部分医院都实行了“周末无差别”就诊，方便了患者，却苦涩了医生。对医务人员来说，周末变工作日，从年初赶到年尾，没有休息时间。“无假日医院”在中国医疗历史上并不是什么新鲜事。自2011年１月１日起，北京市将双休日门诊推广到全市三级医院。最近，公立医疗机构门诊服务延时、延长花样百出，“晨光医疗”、“午间医疗”、“夜间门诊”、“黄昏门诊”、“周六日无差别门诊”等服务纷纷上马。支持者认为，门诊服务延时、延长盘活了医疗资源，有限的医疗资源得以高效利用。因为一年有50多个周末,加上法定节假日,这在以往,也就意味着医院全年有1/3的时间不开诊，这是医疗资源的巨大浪费。而反对者则认为，“人有多大胆地有多大产”的思维在医疗场景之下并不适用，要留给医生学习和休闲的时间，公立三甲医院门诊服务延时、延长违背分级诊疗初衷，社会办医的生存空间更被加压了。",
        },
        {
          name: "义诊不备案 爱尔眼科被罚款五万！",
          time: "2021-3-1",
          content: "头疼1",
        },
         {
          name: "拒绝这些进口器械！北京协和发布重要公告",
          time: "2021-1-1",
          content:
            "国产医疗器械目前处于高速发展期，在部分领域已具备了和国际巨头“拼刺刀”的能力。但基于技术积累以及观念习惯上的原因，医院和相关机构在采购时整体依然偏向进口器械。针对这些问题，国家政策明确提出医院国产医疗器械占比提升要求。《国务院办公厅关于促进医药产业健康发展的指导意见》中曾指出，国产药品和医疗器械能够满足要求的，政府采购项目原则上须采购国产产品，逐步提高公立医疗机构国产设备配置水平。十四五规划出台后，大批医院和科研机构出现设备缺口，在国家政策要求下，采购国产势必是趋势所在。",
        },
        {
          name: "大三甲门诊大扩张！“周末无差别”门诊来了",
          time: "2021-2-2",
          content:
            "最近，公立医疗机构门诊服务延时花样百出，“晨光医疗”、“午间医疗”、“夜间门诊”、“黄昏门诊”、“周六日无差别门诊”等服务纷纷上马。近日有医生在网上发文称，山东大部分医院都实行了“周末无差别”就诊，方便了患者，却苦涩了医生。对医务人员来说，周末变工作日，从年初赶到年尾，没有休息时间。“无假日医院”在中国医疗历史上并不是什么新鲜事。自2011年１月１日起，北京市将双休日门诊推广到全市三级医院。最近，公立医疗机构门诊服务延时、延长花样百出，“晨光医疗”、“午间医疗”、“夜间门诊”、“黄昏门诊”、“周六日无差别门诊”等服务纷纷上马。支持者认为，门诊服务延时、延长盘活了医疗资源，有限的医疗资源得以高效利用。因为一年有50多个周末,加上法定节假日,这在以往,也就意味着医院全年有1/3的时间不开诊，这是医疗资源的巨大浪费。而反对者则认为，“人有多大胆地有多大产”的思维在医疗场景之下并不适用，要留给医生学习和休闲的时间，公立三甲医院门诊服务延时、延长违背分级诊疗初衷，社会办医的生存空间更被加压了。",
        },
        {
          name: "义诊不备案 爱尔眼科被罚款五万！",
          time: "2021-3-1",
          content: "头疼1",
        },
         {
          name: "拒绝这些进口器械！北京协和发布重要公告",
          time: "2021-1-1",
          content:
            "国产医疗器械目前处于高速发展期，在部分领域已具备了和国际巨头“拼刺刀”的能力。但基于技术积累以及观念习惯上的原因，医院和相关机构在采购时整体依然偏向进口器械。针对这些问题，国家政策明确提出医院国产医疗器械占比提升要求。《国务院办公厅关于促进医药产业健康发展的指导意见》中曾指出，国产药品和医疗器械能够满足要求的，政府采购项目原则上须采购国产产品，逐步提高公立医疗机构国产设备配置水平。十四五规划出台后，大批医院和科研机构出现设备缺口，在国家政策要求下，采购国产势必是趋势所在。",
        },
        {
          name: "大三甲门诊大扩张！“周末无差别”门诊来了",
          time: "2021-2-2",
          content:
            "最近，公立医疗机构门诊服务延时花样百出，“晨光医疗”、“午间医疗”、“夜间门诊”、“黄昏门诊”、“周六日无差别门诊”等服务纷纷上马。近日有医生在网上发文称，山东大部分医院都实行了“周末无差别”就诊，方便了患者，却苦涩了医生。对医务人员来说，周末变工作日，从年初赶到年尾，没有休息时间。“无假日医院”在中国医疗历史上并不是什么新鲜事。自2011年１月１日起，北京市将双休日门诊推广到全市三级医院。最近，公立医疗机构门诊服务延时、延长花样百出，“晨光医疗”、“午间医疗”、“夜间门诊”、“黄昏门诊”、“周六日无差别门诊”等服务纷纷上马。支持者认为，门诊服务延时、延长盘活了医疗资源，有限的医疗资源得以高效利用。因为一年有50多个周末,加上法定节假日,这在以往,也就意味着医院全年有1/3的时间不开诊，这是医疗资源的巨大浪费。而反对者则认为，“人有多大胆地有多大产”的思维在医疗场景之下并不适用，要留给医生学习和休闲的时间，公立三甲医院门诊服务延时、延长违背分级诊疗初衷，社会办医的生存空间更被加压了。",
        },
        {
          name: "义诊不备案 爱尔眼科被罚款五万！",
          time: "2021-3-1",
          content: "头疼1",
        },
      ],
      diaData:{},
      docData: [],
      currentPage: 1, //当前页数 ，默认为1
      pageSize: 10, // 每页显示数量
      pageSizes:[8,12,16],//可以选择每页显示的数据条数
      currentPageData: {},//当前页显示内容
      // tableData: Array(20).fill(item),
    }
  },
  created() {
    this.getDataList();
  },
  methods:{
    getDataList(){
    getNoticeFun(
    ).then(res=>{
      for(let i of res.result){
        this.docList.push({
          name:i.notice_name,
          content:i.content,
          time:i.time,   
        }
        );
      }
      console.log(res);
      //console.log(typeof(res.result.pic));
      console.log("ok");
      this.docData = this.docList;
      //console.log(this.docList)
    }).catch(err=>{
        console.log(err);
    });
  },

    handleSizeChange(val){
      this.pageSize=val;
      this.currentPage=1;   //改变页面大小后，跳转回去第一页
      //console.log实时条数显示在控制台
      console.log('每页${val}条');
    },
    //每次切换当前页面的时候，此方法响应，改变当前页
    handleCurrentChange(val){
      this.currentPage=val;
      console.log('当前页:${val}');
    },

    //展示通告，只调用了alert函数，考虑设计一个组件展示信息
    changeDialog(){
      this.isDialogVisible = false
    },
     handleClose(done) {
        this.$confirm('确认关闭？')
          .then(_ => {
            done();
          })
          .catch(_ => {});
      },

    showDialog(){
      this.isDialogVisible = true;
    },
    changeDialog(){
      this.isDialogVisible = false
    },
    getDetail(mes) {
    let _item={
        '内容：':mes.content,
    }
    this.diaData=_item

    },
  }
};
</script>
<style>
.link:hover{color:#66b3ff;}
</style>
