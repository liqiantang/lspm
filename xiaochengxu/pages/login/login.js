// pages/login/login.js
let http = require('../../utils/requestService.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    openId:"",
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    
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

  formSubmit:function(e){
    const that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    http.sendRrquest("/api/login", 'POST', e.detail.value, {})
      .then(function (res) {
        console.log(res);
        if (res.data.affextedRows==1){
          wx.switchTab({
            url: '/pages/index/index'
          })
        }else{
          wx.showToast({
            title: res.data.message,
            icon: 'none',
            duration: 2000
          })
        }
      }, function (error) {
        console.log(error);
      });
  }

})