// pages/search/search.js
import request from '../../utils/request'
let isSend = false
Page({

  /**
   * 页面的初始数据
   */
  data: {
    placeholderContent:'',
    hotList:[],
    searchContent:'',
    searchList:[],
    historyList:['清河','情歌'],
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.getInitData()
    this.getSearchHistory()
  },
  //获取初始化数据
  async getInitData(){
    let placeholderData = await request('/search/default')
    let hotListData = await request('/search/hot/detail')
    this.setData({
      placeholderContent:placeholderData.data.showKeyword,
      hotList:hotListData.data
    })
  },
  //获取本地历史记录的函数
  getSearchHistory(){
    let historyList =  wx.getStorageSync('searchHistory')
    if(historyList){
      this.setData({
        historyList
      })
    }
  },
  //表单项内容发生改变
   handleInputChange(event){
    this.setData({
      searchContent:event.detail.value.trim()
    })
    //函数节流
    if(isSend){
      return
    }
    isSend = true
    this.getSearchList()
    setTimeout(()=>{
     isSend = false
    },300)
    
  },
  async getSearchList(){
    if(!this.data.searchContent){
      this.setData({
        searchList:[]
      })
      return
      
    }
    let {searchContent, historyList} = this.data
    let searchListData = await request('/search',{keywords:this.data.searchContent,limit:10})
      this.setData({
      searchList:searchListData.result.songs
    })  

    //将搜索的关键字添加到搜索记录中
    if(historyList.indexOf(searchContent) !== -1){
      historyList.splice(historyList.indexOf(searchContent),1)
    }
    historyList.unshift(searchContent);
    this.setData({
      historyList
    })
    wx.setStorageSync('searchHistory', historyList)
  },
  clearSearchContent(){
    this.setData({
      searchContent:'',
      searchList:[]
    })
  },
  clearSearchHistory(){
    wx.showModal({
      content:'确认删除吗？',
      success:(res)=>{
        if(res.confirm){
          this.setData({
            historyList:[]
          })
          wx.removeStorageSync('searchHistory')
        }
      }
    })
    
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

  }
})