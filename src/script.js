let CUR_ZOOM = 1,
    MIN_ZOOM = 1,
    MAX_ZOOM = 5,
    ORIGINAL_WIDTH,
    ORIGINAL_HEIGHT,
    LIMIT_X,
    LIMIT_Y,
    image = document.querySelector("image"),
    x = 10;

////////////

const pointers = document.querySelectorAll(".pointer");

for(const pointer of pointers){
    const refName = pointer.classList[0];
    const ref = document.querySelector(`.${refName}`);
    ref.style.fillOpacity = 0;
    pointer.style.opacity = "0% !important"
    pointer.style.strokeWidth = "0 !important"

    pointer.addEventListener("mouseenter", () => {
        ref.style.fillOpacity = 1;
        ref.style.transform = "translateY(-2px) translateX(1px) rotateX(-2deg)"
    });
    
    pointer.addEventListener("mouseleave", () => {
        ref.style.fillOpacity = 0;
        ref.style.transform = "translateY(0px) translateX(0px)"
    })
}

////////////

image.onload = () => {
    a.pan({x:0, y:0})
}

const init = () => {
    const svg = document.querySelector("svg");
    const svgViewport = document.querySelector(".svg-pan-zoom_viewport");
    const { width, height } = svg.getBBox();
    const [ clientWidth, clientHeight ] = [ window.innerWidth, window.innerHeight ];

    a.zoomAtPoint(1, {x: 0, y: 0})

    ORIGINAL_WIDTH = width;
    ORIGINAL_HEIGHT = height;
    MIN_ZOOM = 2.35;
    CUR_ZOOM = 2.35;

    a.zoomAtPoint(MIN_ZOOM, {x: 0, y: 0});
    LIMIT_X = clientWidth - ORIGINAL_WIDTH * CUR_ZOOM;
    LIMIT_Y = clientHeight - ORIGINAL_HEIGHT * CUR_ZOOM;
    a.setMinZoom(MIN_ZOOM);

    svgViewport.style.transition = "0.6s transform ease-out";
}

var beforePan = function(oldPan, newPan){
    sizes = this.getSizes();

    var sizes = sizes,
        sizes = this.getSizes(),
        leftLimit = LIMIT_X,
        rightLimit = 0,
        topLimit = LIMIT_Y,
        bottomLimit = 0

    customPan = {}
    customPan.x = Math.max(leftLimit, Math.min(rightLimit, newPan.x))
    customPan.y = Math.max(topLimit, Math.min(bottomLimit, newPan.y))

    return customPan
}

window.addEventListener("wheel", e => {
    const oldWidth = ORIGINAL_WIDTH * CUR_ZOOM;
    const oldHeight = ORIGINAL_HEIGHT * CUR_ZOOM;

    CUR_ZOOM = e.deltaY < 0 ? CUR_ZOOM += 0.25 : CUR_ZOOM -= 0.25;
    CUR_ZOOM = CUR_ZOOM < MIN_ZOOM ? MIN_ZOOM : (CUR_ZOOM > MAX_ZOOM ? MAX_ZOOM : CUR_ZOOM);

    const newWidth = ORIGINAL_WIDTH * CUR_ZOOM;
    const newHeight = ORIGINAL_HEIGHT * CUR_ZOOM;
    const dx = newWidth - oldWidth;
    const dy = newHeight - oldHeight;

    LIMIT_X -= dx;
    LIMIT_Y -= dy;
    a.zoom(CUR_ZOOM);
})

const a = svgPanZoom('#pvjs-diagram-1', {
    zoomEnabled: false,
    dblClickZoomEnabled: false,
    minZoom: MIN_ZOOM,
    maxZoom: MAX_ZOOM,
    beforePan: beforePan,
});

init();