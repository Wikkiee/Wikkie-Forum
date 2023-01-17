const color = Math.floor(Math.random()*16777215).toString(16);
var test = document.querySelector('.profile-button').style.backgroundColor = '#'+color;


function wc_hex_is_light(color) {
    const hex = color.replace('#', '');
    const c_r = parseInt(hex.substring(0, 0 + 2), 16);
    const c_g = parseInt(hex.substring(2, 2 + 2), 16);
    const c_b = parseInt(hex.substring(4, 4 + 2), 16);
    const brightness = ((c_r * 299) + (c_g * 587) + (c_b * 114)) / 1000;
    return brightness > 155;
}
if(wc_hex_is_light(color)){
    document.querySelector('.profile-button i').style.color = 'black'
}else{
    document.querySelector('.profile-button i').style.color = 'white'
}
console.log(wc_hex_is_light(color));
