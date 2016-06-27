var animEndEventNames = {
    'WebkitAnimation': 'webkitAnimationEnd',
    'OAnimation': 'oAnimationEnd',
    'msAnimation': 'MSAnimationEnd',
    'animation': 'animationend'
};
animEndEventName = animEndEventNames[Modernizr.prefixed('animation')];
var $map = $('#map-page');
var $info = $('#info-page');
var endCurrPage = false;
var endNextPage = false;
var map = new L.Map('map', {
    center: new L.LatLng(26.33280692289788, 114.78515624999999),
    zoom: 7
});
var tianditu = new L.TileLayer('http://t{s}.tianditu.cn/DataServer?T=vec_w&X={x}&Y={y}&L={z}', {
    subdomains: '01234567'
}).addTo(map);
var marker = L.marker([26.33280692289788, 114.78515624999999]).on('click', function() {
    change($map, $info, 1);
}).addTo(map);
$('#back').click(function() {
    change($info, $map, 2);
});

function init() {
    $map.addClass('pt-page-current');
}

function onEndAnimation($outpage, $inpage) {
    endCurrPage = false;
    endNextPage = false;
    $outpage.attr('class', 'pt-page');
    $inpage.attr('class', 'pt-page pt-page-current');
}

function change($outpage, $inpage, effect) {
    var outclass = '';
    var inclass = '';
    switch (effect) {
        case 1:
            outclass = 'pt-page-rotateCarouselTopOut pt-page-ontop';
            inclass = 'pt-page-rotateCarouselTopIn';
            break;
        default:
            outclass = 'pt-page-rotateCarouselBottomOut pt-page-ontop';
            inclass = 'pt-page-rotateCarouselBottomIn';
            break;
    }
    $inpage.addClass('pt-page-current');
    $outpage.addClass(outclass).on(animEndEventName, function() {
        $outpage.off(animEndEventName);
        endCurrPage = true;
        if (endNextPage) {
            onEndAnimation($outpage, $inpage);
        }
    });
    $inpage.addClass(inclass).on(animEndEventName, function() {
        $inpage.off(animEndEventName);
        endNextPage = true;
        if (endCurrPage) {
            onEndAnimation($outpage, $inpage);
        }
    });
}
init();