<template>
  <div class="theme-repo-main">
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <span class="title">主题仓库</span>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="12"
        :lg="12"
        :xl="12"
      >
        <el-input
          :placeholder="'搜索 '+themes.length+' 个主题'"
          class="input-with-select"
          style="float: right"
        >
          <el-button
            slot="append"
            icon="el-icon-search"
          ></el-button>
        </el-input>
      </el-col>
    </el-row>
    <el-row :gutter="10">
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        :lg="4"
        :xl="4"
        v-for="(item, index) in themes"
        :key="index"
      >
        <el-card
          class="box-card"
          :body-style="{ padding: '0px' }"
          shadow="hover"
        >
          <div
            slot="header"
            class="clearfix"
          >
            <span>{{ item.name }}</span>
          </div>
          <div class="text item">
            <div class="theme-thumb">
              <img
                :alt="item.name"
                :src="item.screenshot"
              >
            </div>
            <div style="padding: 14px;">
              <div class="bottom clearfix">
                <el-button
                  type="text"
                  class="button"
                  style="float: right"
                  @click="download(item.website)"
                >{{item.isPremium?'购买':'下载'}}</el-button>
              </div>
            </div>
          </div>
        </el-card>
      </el-col>
      <el-col
        :xs="24"
        :sm="12"
        :md="6"
        :lg="4"
        :xl="4"
      >
        <div>
          <AdSense-Theme
            ad-client="ca-pub-5271828906478846"
            ad-slot="6526407062"
            ad-style="display:block"
            ad-format="auto"
          ></AdSense-Theme>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  data() {
    return {
      loading: false,
      themes: [
        {
          id: "caicai_anatole",
          name: "Anatole",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-anatole",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/05/20/5ce17e355e03e99715.png"
        },
        {
          id: "ghost_casper",
          name: "Casper",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-casper",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/05/20/5ce17ebc6e61238122.png"
        },
        {
          id: "xuanhuang_hux",
          name: "Hux",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-hux",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/05/20/5ce17f422c95d16424.png"
        },
        {
          id: "viosey_material",
          name: "Material",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-material",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/05/20/5ce1800051b7999355.png"
        },
        {
          id: "iissnan_next",
          name: "NexT",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-next",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/05/20/5ce1803dc40de33413.png"
        },
        {
          id: "chakhsu_pinghsu",
          name: "Pinghsu",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-pinghsu",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/05/20/5ce180737879276885.png"
        },
        {
          id: "txperl_story",
          name: "Story",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-story",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/05/20/5ce180c428fb310963.png"
        },
        {
          id: "onevcat_vno",
          name: "Vno",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-vno",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/05/20/5ce180f57ca9755802.png"
        },
        {
          id: "imzeuk_zozo",
          name: "Zozo",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-zozo",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/09/19/6TQ3ehzraHUmGwn.png"
        },
        {
          id: "mrdeng_destiny",
          name: "Destiny",
          isPremium: true,
          website: "https://mianbaoduo.com/product/show/mbd-aJqW",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/09/19/OUKw1YMEz2uCSgD.png"
        },
        {
          id: "eryouhao_walker",
          name: "Walker",
          isPremium: true,
          website: "https://mianbaoduo.com/product/show/mbd-Ypealw==",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/09/19/IECcNrytqDQvJwM.png"
        },
        {
          id: "fastbyte01_keepit",
          name: "KeepIt",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-KeepIt",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/09/19/zwf4qTYFn9M2Ugj.png"
        },
        {
          id: "ppoffice_icarus",
          name: "Icarus",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-icarus",
          version: "2.6.0",
          screenshot: "https://i.loli.net/2019/08/24/7K6m3VZApyfhUqF.png"
        },
        {
          id: "SumiMakito_Journal",
          name: "Journal",
          isPremium: false,
          website: "https://github.com/halo-dev/halo-theme-Journal",
          version: "2.0.3",
          screenshot: "https://i.loli.net/2019/09/19/ILcRlGC5oVsEkeO.png"
        },
        {
          id: "imkun_fantastic",
          name: "Fantastic",
          isPremium: false,
          website: "https://github.com/imkundev/halo-theme-fantastic",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/10/07/RzbfGZaJMTxmEiK.png"
        },
        {
          id: "codelunatic_simple",
          name: "Simple BootStrap",
          isPremium: false,
          website: "https://github.com/CodeLunatic/halo-theme-simple-bootstrap",
          version: "1.0",
          screenshot: "https://i.loli.net/2019/10/23/VargFE9tjRlPD4p.png"
        }
      ]
    };
  },
  methods: {
    download(item) {
      window.open(item);
    }
  }
};
</script>
<style lang="less" scoped>
.el-row {
  padding-bottom: 20px;
}
.title {
  font-size: 24px;
}
.theme-repo-main {
  padding: 1.5rem;
  .el-col {
    padding-bottom: 8px;
  }
}
.theme-thumb {
  width: 100%;
  margin: 0 auto;
  position: relative;
  padding-bottom: 56%;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0;
    left: 0;
  }
}
</style>
