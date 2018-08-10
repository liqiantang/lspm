// pages/inventory/itemDetails/itemDetails.js
let http = require('../../../utils/requestService.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0, //预设当前项的值
    info:{},
    list:[
      
    ],
    recordList:[],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.model);
    var that = this;
    http.sendRrquest("/api/find", 'POST', { model: options.model }, {})
      .then(function (res) {
        let infoList = res.data.message;
        let num = 0;
        for (let i = 0; i < infoList.length; i++) {
          num += infoList[i].num;
        }
        infoList[0].num = num;
        that.setData({
          info: infoList[0],
          list: res.data.message
        });
        console.log(that.data.list);
        console.log(res);
      }, function (error) {
        console.log(error);
      });

      /**
       * 查询记录
       */
    http.sendRrquest("/api/findRecord", 'POST', { model: options.model }, {})
      .then(function (res) {
        let recordList = [];
        let recordInfo = res.data.message;
        for (var i = 0; i < recordInfo.length; i++) {
          let str = recordInfo[i].addDate.slice(0,10) + "在" + recordInfo[i].warehouse+"，" + recordInfo[i].operation + recordInfo[i].brand + recordInfo[i].category + recordInfo[i].model;
          recordList.push(str);
        }
        that.setData({
          recordList: recordList,
        })
        
      }, function (error) {
        console.log(error);
      });
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

  // 点击标题切换当前页时改变样式
  swichNav: function (e) {
    var cur = e.target.dataset.current;
    if (this.data.currentTaB == cur) { return false; }
    else {
      this.setData({
        currentTab: cur
      })
    }
  },


})