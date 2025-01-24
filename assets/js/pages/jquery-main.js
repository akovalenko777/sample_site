$(function(){
  $("#lightSlider").lightSlider({
    item: 5,
    autoWidth: false,
    slideMove: 1,
    slideMargin: 10
  })

  $("#tabs").tabs()

  $("#datepicker").datepicker({
    inline: true
  })
})