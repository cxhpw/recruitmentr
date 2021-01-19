function setNavigation(title){
  
  wx.setNavigationBarTitle({
    title: title,
  }); 
  return true;
}

module.exports = {
  setNavigation: setNavigation
}

