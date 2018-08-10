// pages/inventory/inventory.js

let http = require('../../utils/requestService.js');
Page({
  
  /**
   * 页面的初始数据
   */
  data: {
    warehouseArray: ['所有仓库', '一号仓', '二号仓', '三号仓'],
    warehouseIndex: 0,
    wxSearch:false,

    inventoryList: [{
      brand: '海尔',
      category:"空调",
      model:"BCD-217STPQ",
      num:2,
      warehouse:"一号仓",
    }, {
        brand: '海尔',
        category: "冰箱",
        model: "BCD-230STPQ",
        num: 5,
        warehouse: "一号仓",
    }]
  
  },
  
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log('onLoad');
    var that = this;
    var wxSearch = require("./../../wxSearch/wxSearch.js");
    console.log(wxSearch);
    var WxSearch =  wxSearch;
    //初始化的时候渲染wxSearchdata 第二个为你的search高度
    WxSearch.init(that, 168, ['冰箱', '空调', '洗衣机', '热水器', '电视机']);
    WxSearch.initMindKeys(['weappdev.com', '微信小程序开发', '微信开发', '微信小程序']);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    this.findInfo();
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    this.findInfo();
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  },

  /**
  * 仓库改变触发事件
  */
  bindWarehouseChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      warehouseIndex: e.detail.value
    })
  },


  wxSearchFn: function (e) {
    var that = this;
    var WxSearch = require("./../../wxSearch/wxSearch.js");
    WxSearch.wxSearchAddHisKey(that);
    that.findInfo();

  },
  wxSearchInput: function (e) {
    var that = this
    var WxSearch = require("./../../wxSearch/wxSearch.js");
    WxSearch.wxSearchInput(e, that);
  },
  wxSerchFocus: function (e) {
    var that = this
    var WxSearch = require("./../../wxSearch/wxSearch.js");
    WxSearch.wxSearchFocus(e, that);
  },
  wxSearchBlur: function (e) {
    var that = this
    var WxSearch = require("./../../wxSearch/wxSearch.js");
    WxSearch.wxSearchBlur(e, that);
  },
  wxSearchKeyTap: function (e) {
    var that = this
    var WxSearch = require("./../../wxSearch/wxSearch.js");
    WxSearch.wxSearchKeyTap(e, that);
  },
  wxSearchDeleteKey: function (e) {
    var that = this
    var WxSearch = require("./../../wxSearch/wxSearch.js");
    WxSearch.wxSearchDeleteKey(e, that);
  },
  wxSearchDeleteAll: function (e) {
    var that = this;
    var WxSearch = require("./../../wxSearch/wxSearch.js");
    WxSearch.wxSearchDeleteAll(that);
  },
  wxSearchTap: function (e) {
    var that = this
    var WxSearch = require("./../../wxSearch/wxSearch.js");
    WxSearch.wxSearchHiddenPancel(that);
  },

  findInfo(){
    var that = this;
    let data = {};
    if (that.data.wxSearchData.value) {
      data = { findInfo: that.data.wxSearchData.value };
    } 
    http.sendRrquest("/api/find", 'POST', data, {})
    .then(function (res) {
      that.setData({
        inventoryList: res.data.message
      });
      console.log(res);
    }, function (error) {
      console.log(error);
    });
    
  },
  clickItem(e){
    var model = e.currentTarget.dataset.model //获取传递的值
    wx.navigateTo({
      //url: 'post-detail/post-detail' //跳转详情页 切记配置app.json文件
      url: 'itemDetails/itemDetails?model=' + model //传递参数
    })
  },
  clickOut(e){
    var that = this;
    console.log("点击了按钮");
    var data = e.currentTarget.dataset.info; //获取传递的值
    console.log(data);
    wx.showActionSheet({
      itemList: ['1', '2', '3', '4', '5'],
      success: function (res) {
        console.log(res.tapIndex);
        data.outNum = res.tapIndex + 1;
        http.sendRrquest("/api/edit", 'POST', data, {})
          .then(function (rel) {
            that.findInfo();
            
          }, function (error) {
            console.log(error);
          });

      },
      fail: function (res) {
        console.log(res.errMsg);
      }
    })
  }
  


})