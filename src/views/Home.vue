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
          name: "打造数字化健康维护组织 微医业务组织升级为“四驾马车”",
          time: "2021-12-25",
          content:
            "数字医疗战略升级正当时。近期，微医、阿里健康、平安、京东健康等国内头部互联网医疗平台，密集地推出相关业务升级、或组织重构的新规划。比如，微医完成“医、药、保、数”四大业务板块的组织升级，阿里健康统筹“医鹿APP+支付宝医疗健康频道”的在线平台，平安则通过并购将北大医疗纳入健康版图……这一系列变革背后无不透露出行业找寻新增长锚点的考量。今年10月，国家卫生健康委发布《互联网诊疗监管细则（征求意见稿）》，厘清了原本模糊、混淆的互联网医疗边界，打破此前“医、药、技”暧昧不清的局面，推动行业回归到“严肃医疗”的本质。同月，国务院深化医改领导小组发布的《关于深入推广福建省三明市经验 深化医药卫生体制改革的实施意见》（国医改发〔2021〕2号）（下简称“2号文”）则为如何开展严肃医疗服务定标，其中“医联体（医疗联合体）”成为出现频率最高的词汇之一。以此为指引，互联网医疗企业正找寻开启下一个新时代的钥匙。",
        },
        {
          name: "央行等：支持保险机构投资成渝地区医疗和健康产业",
          time: "2021-12-24",
          content:
            "12月24日，中国人民银行、银保监会、证监会等部门联合印发《成渝共建西部金融中心规划》（以下称《规划》）。《规划》提出，建立健全成渝地区保险监管协调机制、保险行业自律协调机制，统筹推进成渝两地保险监管协调、行业协作和市场协同。探索建立成渝地区保险理赔通赔通付制度，完善异地出险理赔流程，优化理赔查勘相互委托和结果互认操作。积极引入商业保险机构等社会力量参与基本医保的经办服务。支持保险机构投资成渝地区医疗和健康产业。支持成渝地区开展社商融合型普惠式健康保险试点，加快发展各类意外险和责任险。",
        },
        {
          name: "《2021医药健康资本白皮书》发布 医疗消费、医疗科技等细分赛道蓬勃发展",
          time: "2021-12-22",
          content:
            "12月22日下午，由每日经济新闻主办的“2021中国医药健康资本论坛”顺利举行。在论坛上，每日经济新闻联合头豹研究院发布了《2021医药健康资本白皮书》（以下简称《白皮书》）。《白皮书》研究了中国医疗行业各细分领域，探寻各细分领域市场特点、发展空间和行业价值，并分析中国医疗行业的市场环境，为投资者阐述各细分领域的投资逻辑以及推荐应重点关注的细分赛道。《白皮书》提到，随着消费升级，医疗消费普及度提升，医美、体检、眼科及口腔等部分消费医疗赛道已超过千亿规模，已形成规模效应；医疗科技是一级市场火爆赛道之一，互联网巨头纷纷布局，医疗科技在挂号、诊疗、医药等各环节渗透，为医疗行业发展助力。",
        },
        {
          name: "2021中国医药健康资本论坛成功举办 大咖共议后疫情时代医疗健康新机遇",
          time: "2021-12-22",
          content:
            "12月22日，由每日经济新闻主办的“2021第十届中国上市公司高峰论坛周之行业论坛：2021中国医药健康资本论坛”正式举行。会上，著名流行病学和公共卫生专家曾光、中国工程院院士樊代明、北京大学国家发展研究院博雅特聘教授刘国恩分别以“新冠疫情常态下的经济增长与防控前景”“后新冠疫情时代，论医学的整合与转向”“新冠疫情常态下的经济增长与健康中国”为题贡献远见卓识。在本次论坛上，每日经济新闻还联合头豹研究院发布《2021医药健康资本白皮书》，展现2020年医药行业发展概况。",
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
  created() {},
  methods: {},
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
  margin-left: 1%;
}
</style>