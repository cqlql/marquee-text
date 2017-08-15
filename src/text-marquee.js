/*
 几乎完全使用css 控制 几点前提：
 1 窗口元素
 2 包裹文字元素，能通过此文字元素能获取文字的总长度
 */
export default function textMarquee(params) {
    var eBox = params.eBox,
        eText = params.eText,
        type = params.type ? 'h' : 'w',// 默认是宽度

        // 每秒滚动的像素
        perSecMove = 120,

        // 2段文字的间距（与后面的重复文字间距）
        interval = 100;

    if (type === 'w') {

        var textW = eText.offsetWidth;

        if (textW > eBox.clientWidth) {
            eText.style.paddingRight = interval + 'px';
            textW = eText.offsetWidth;

            var html = eBox.innerHTML.trim(),
                moveId = 'move' + Date.now();// (Math.random()+'').substr(2)

            eBox.innerHTML = '<div class="' + moveId + '">' + html + html + '</div>';

            // css
            var duration = (textW / perSecMove).toFixed(2);// 每秒滚动像素。计算需要多少秒
            var eStyle = document.createElement('style');
            eStyle.textContent = '.' + moveId + '{\
-webkit-animation:' + moveId + ' ' + duration + 's infinite linear normal;\
animation:' + moveId + ' ' + duration + 's infinite linear normal}\
@keyframes ' + moveId + '{0%{\
transform:translate3d(0,0,0)}100%{\
transform:translate3d(-' + textW + 'px,0,0)}}\
@-webkit-keyframes ' + moveId + '{0%{\
-webkit-transform:translate3d(0,0,0)}100%{\
-webkit-transform:translate3d(-' + textW + 'px,0,0)}}';
            document.body.appendChild(eStyle);

        }
    }
    else {

        var textH = eText.offsetHeight;
        if (textH > eBox.clientHeight) {

            eText.style.paddingBottom = interval + 'px';

            textH = eText.offsetHeight;

            var html = eBox.innerHTML.trim(),
                moveId = 'move' + Date.now();// (Math.random()+'').substr(2)

            eBox.innerHTML = '<div class="' + moveId + '">' + html + html + '</div>';

            // css
            var duration = (textH / perSecMove).toFixed(2);// 每秒滚动像素。计算需要多少秒
            var eStyle = document.createElement('style');
            eStyle.textContent = '.' + moveId + '{\
-webkit-animation:' + moveId + ' ' + duration + 's infinite linear normal;\
animation:' + moveId + ' ' + duration + 's infinite linear normal}\
@keyframes ' + moveId + '{0%{\
transform:translate3d(0,0,0)}100%{\
transform:translate3d(0,-' + textH + 'px,0)}}\
@-webkit-keyframes ' + moveId + '{0%{\
-webkit-transform:translate3d(0,0,0)}100%{\
-webkit-transform:translate3d(0,-' + textH + 'px,0)}}';
            document.body.appendChild(eStyle);

        }
    }


}