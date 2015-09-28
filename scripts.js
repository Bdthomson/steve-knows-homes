var div = $('#reviews');
setInterval(function(){
    var pos = div.scrollTop();
    div.scrollTop(pos + 1);
}, 50) 