// pages/storage/storage.js

let http = require('../../utils/requestService.js');
Page({

  /**
   * 页面的初始数据
   */
  data: {
    warehouseArray: ['请选择', '新屋', '村仓库', '沙尾','三区'],
    warehouseIndex: 0,
    brandArray: ['请选择', '海尔', '美的', '格力','容声','威博','威力','小天鹅','LG'],
    brandIndex:0,
    categoryArray: ['请选择','空调', '冰箱', '洗衣机', '热水器'],
    categoryIndex: 0,
    model:"",
    num:0,
    
    
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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

  /**
   * 仓库改变触发事件
   */
  bindWarehouseChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      warehouseIndex: e.detail.value
    })
  },

  /**
   * 品牌改变触发事件
   */
  bindBrandChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      brandIndex: e.detail.value
    })
  },

  /**
   * 类别改变触发事件
   */
   bindCategoryChange: function (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      categoryIndex: e.detail.value
    })
  },


  /**
   * 提交添加入库
   */
  
  formSubmit: function (e) {
    var that = this;
    console.log('form发生了submit事件，携带数据为：', e.detail.value);
    if (e.detail.value.warehouse == 0 || e.detail.value.brand == 0 || e.detail.value.category == 0 || e.detail.value.model == "" || e.detail.value.num == 0){
      
      wx.showToast({
        title: '请输入完整信息',
        icon: 'none',
        duration: 2000
      })
    }else{
      var that = this;
      let data = {
        warehouse: that.data.warehouseArray[that.data.warehouseIndex],
        brand: that.data.brandArray[that.data.brandIndex],                    //品牌
        category: that.data.categoryArray[that.data.categoryIndex],                      //类别
        model: e.detail.value.model,                     //型号
        num: e.detail.value.num,//数量
      };
      http.sendRrquest("/api/add", 'POST', data, {})
        .then(function (res) {
          console.log(res.data);
          wx.showModal({
            title: '提示',
            content: '录入成功，是否继续录入！',
            success: function (res) {
              if (res.confirm) {
                that.setData({
                  warehouseIndex: 0,
                  brandIndex: 0,
                  model: "",
                  num: 0,
                  categoryIndex: 0,
                })
                console.log('用户点击确定')
              } else if (res.cancel) {
                console.log('用户点击取消');
                wx.switchTab({
                  url: '/pages/inventory/inventory'
                })
              }
            }
          })
        }, function (error) {
          console.log(error);
        });
    }
    
  },
  
  formReset: function () {
    var that = this;
    console.log('form发生了reset事件');
    that.setData({
      warehouseIndex: 0,
      brandIndex: 0,
      model: "",
      num: 0,
      categoryIndex: 0,

    })
  }
  
})