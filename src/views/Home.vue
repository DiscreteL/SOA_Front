<template>
  <div class="docList">
    <Navigation></Navigation>
    <div class="pic">
      <el-carousel :interval="4000" height="360px" indicator-position="outside">
        <el-carousel-item v-for="item in imagesBox" :key="item.id">
          <img :src="item.idView" class="image" />
        </el-carousel-item>
      </el-carousel>
    </div>
    <div class="announce">
      <announcement ref="listItem" :dataList="newList"></announcement>
    </div>
    <div class="pa">
      <Patients></Patients>
    </div>
  </div>
</template>

<script>
import Navigation from "@/components/navigation.vue";
import announcement from "@/components/announcement.vue";
import Patients from "@/components/patientKnow.vue";

export default {
  name: "Home",
  components: {
    Navigation,
    announcement,
    Patients,
  },
  data() {
    return {
      newList: [
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
      isFormVisible: false,
      imagesBox: [
        { id: 0, idView: require("@/assets/photo4.png") },
        { id: 1, idView: require("@/assets/photo2.png") },
        { id: 2, idView: require("@/assets/photo3.png") },
        { id: 3, idView: require("@/assets/photo1.png") },
      ],
    };
  },
  created() {
    this.getDataList();
  },
  methods: {
  },
};
</script>

<style scoped>
.docList {
  overflow-y: scroll;
}
.pa {
  position: absolute;
  top: 520px;
  left: 58%;
}

.announce {
  position: absolute;
  top: 520px;
  left: 6%;
}
.button1 {
  position: absolute;
  top: 10px;
  left: 900px;
}
.online {
  position: relative;
  top: 465px;
  left: 260px;
}
.partition {
  position: absolute;
  left: 0%;
  top: 10px;
  font-family: "微软雅黑";
  font-size: 25px;
}
.bu {
  font-size: 18px;
}
.link-top {
  position: absolute;
  left: 0px;
  top: 50px;
  width: 1000px;
  height: 100px;
  border-top: solid #acc0d8 2px;
}
.offline {
  position: relative;
  top: 1080px;
  left: 240px;
}
.select {
  position: absolute;
  left: 17%;
  top: 18%;
}
.card {
  position: absolute;
  left: -55px;
  top: 50px;
}
.card1 {
  position: absolute;
  left: -55px;
  top: 50px;
}
.search {
  position: absolute;
  left: 45%;
  top: 18%;
}
img {
  /*设置图片宽度和浏览器宽度一致*/
  width: 100%;
  height: inherit;
}
.page {
  position: absolute;
  left: 70%;
  top: 100%;
}
.pic {
  position: absolute;
  width: 98%;
  /* height: auto; */
  top: 110px;
  margin-left:1%;
}
</style>