<template>
  <div class="eru-pop-pwd" v-show="payShow">
    <section class="pay-mask">
      <div class="pay">
        <div class="pay-title">请输入交易密码<span @click="closeMask"><i class="ico-exit-gray"></i></span></div>
        <div class="pay-content">
          <div class="ipt-pay" v-for="(item,i) in arrIpt" v-bind:key="i">
            <input type="password" maxlength="1" :value="item" disabled>
          </div>
        </div>
        <div v-if="isShowSet" class="set-paypwd" @click="setPwdClick">如没设置支付密码，点击此处设置</div>
      </div>
      <footer>
        <ul class="pay-btn">
          <li @click="btnPassword($event)">1</li>
          <li @click="btnPassword($event)">2</li>
          <li @click="btnPassword($event)">3</li>
          <li @click="btnPassword($event)">4</li>
          <li @click="btnPassword($event)">5</li>
          <li @click="btnPassword($event)">6</li>
          <li @click="btnPassword($event)">7</li>
          <li @click="btnPassword($event)">8</li>
          <li @click="btnPassword($event)">9</li>
          <li class="b9"></li>
          <li @click="btnPassword($event)">0</li>
          <li class="b9" @click="btnDelete"><i class="ico-num-del"></i></li>
        </ul>
      </footer>
    </section>
  </div>
</template>
<script>
export default {
  data() {
    return {
      index: -1,
      payShow: false,
      arrIpt: ["", "", "", "", "", ""]
    };
  },
  props:{
    isShowSet: {
      type: Boolean,
      default: false
    }
  },
  methods: {
    btnPassword(e) {
      let pwd = "";
      let obj = e.currentTarget;
      if (this.index < 5) {
        this.index++;
        this.$set(this.arrIpt, this.index, obj.innerText);
      }
      if (this.index == 5) {
        pwd = this.arrIpt.join("");
        // this.keyNum = false;
        this.$emit("save-pwd", pwd);
        this.clearData();
      }
    },
    btnDelete() {
      if (this.index >= 0) {
        this.$set(this.arrIpt, this.index, "");
        this.index--;
        let pwd = this.arrIpt.join("");
      }
    },
    clearData:function() {
      this.arrIpt = ["", "", "", "", "", ""];
      this.index = -1;
    },
    openMask() {
      this.payShow = true;
    },
    closeMask() {
      this.payShow = false;
      this.arrIpt=["", "", "", "", "", ""];
    },
    setPwdClick() {
      //TODO 打开设置支付密码页面
      this.$emit("set-pwd-path");
    }
  },
  mounted() {}
};
</script>
<style lang="less" scope>
.eru-pop-pwd {
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 10;
  background-color: rgba(0,0,0,.3);
  .pay-mask{
    width: 100%;
    position: absolute;
    bottom: 0;
    background: #F3F4F6;;
  }

  .pay-title {
    font-size: 32px;
    text-align: center;
    color: #030303;
    height: 112px;
    line-height: 112px;
    span{
      width: 112px;
      height: 112px;
      position: absolute;
      right: 0;
      i{
        width: 32px;
        height: 32px;
        display: inline-block;
      }
    }
  }

  .close {
    position: absolute;
    right: 0.2rem;
    top: 0.2rem;
    width: 0.72rem;
    height: 0.72rem;
  }

  .pay-content {
    width: 608px;
    height: 101px;
    padding: 0;
    margin: 0 auto;
    border-top: 1px solid #ccc;/*no*/
    border-bottom: 1px solid #ccc;/*no*/
    border-right: 1px solid #ccc;/*no*/
    overflow: hidden;
    margin-bottom: 108px;
    margin-top: 2px;
  }
  .set-paypwd{
    margin:20px;
    height:60px;
    line-height: 60px;
    text-align: center;
  }
  .ipt-pay {
    width: 99px;
    height: 100%;
    padding: 0;
    float: left;
    border-left: 1px solid #ccc;/*no*/
  }

  .ipt-pay input {
    display: block;
    border: 0;
    height: 100%;
    width: 100%;
    text-align: center;
    font-size: 48px;
    background: #F3F4F6;;
  }

  footer {
    // position: absolute;
    // bottom: 0;
    width: 100%;
    font-weight: 500;
    // z-index: 999;
  }
  .pay-btn {
    height: auto;
    overflow: hidden;
  }
  .pay-btn li {
    box-sizing: border-box;
    width: 33.3333%;
    float: left;
    height: 108px;
    line-height: 108px;
    text-align: center;
    background: #fff;
    list-style-type: none;
    font-size: 36px;
    border-right: 1px solid #efefef;/*no*/
    border-top: 1px solid #efefef;/*no*/
    &:nth-child(3n) {
      border-right: none;
    }
  }

  .pay-btn li:active {
    background: #c2c2c2;
  }

  .b9:active {
    background: #fff !important;
  }

  .b9 {
    background: #efefef !important;
    i{
      width: 46px;
      height: 46px;
      margin-top: 28px;
    }
  }
}
</style>