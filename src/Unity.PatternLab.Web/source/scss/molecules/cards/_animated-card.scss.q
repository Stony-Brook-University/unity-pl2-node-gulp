/* svg animation */
.box {
    width: 300px;
    height: 460px;
    position: relative;
    background: rgba(255,255,255,1);
    display: inline-block;
    margin: 0 10px;
    cursor: pointer;
    color: #2c3e50;
    box-shadow: inset 0 0 0 3px rgba(0, 0, 0, 0.4);
    -webkit-transition: background 0.4s 0.5s;
    transition: background 0.4s 0.5s;
}

.box:hover {
    background: rgba(255,255,255,0);
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
}

.box img {
    padding-top: 25px;
}

.box h3 {
    font-family: Helvetica;
    font-size: 30px;
    line-height: 55px;
    margin: 0;
    font-weight: 400;
    width: 100%;
}

.box span {
    display: block;
    font-weight: 400;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-size: 13px;
    padding: 5px;
}

.box h3,
.box span {
    -webkit-transition: color 0.4s 0.5s;
    transition: color 0.4s 0.5s;
}

.box:hover h3,
.box:hover span {
    color: #fff;
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
}

.box svg {
    position: absolute;
    top: 0;
    left: 0;
}

.box svg line {
    stroke-width: 8;
    stroke: #ecf0f1;
    fill: none;
    -webkit-transition: all .8s ease-in-out;
    transition: all .8s ease-in-out;
}

.box:hover svg line {
    -webkit-transition-delay: 0.1s;
    transition-delay: 0.1s;
}

.box svg line.top,
.box svg line.bottom {
    stroke-dasharray: 330 240; 
}

.box svg line.left,
.box svg line.right {
    stroke-dasharray: 490 400;
}

.box:hover svg line.top {
    -webkit-transform: translateX(-600px);
    transform: translateX(-600px);
}

.box:hover svg line.bottom {
    -webkit-transform: translateX(600px);
    transform: translateX(600px);
}

.box:hover svg line.left {
    -webkit-transform: translateY(920px);
    transform: translateY(920px);
}

.box:hover svg line.right {
    -webkit-transform: translateY(-920px);
    transform: translateY(-920px);
}

.color-1 .box {
    box-shadow: inset 0 0 0 10px #2c3e50;
}

.color-1 .box:hover h3,
.color-1 .box:hover span {
    color: #fe6f83;
}

.color-1 .box svg line {
    stroke-width: 8;
}

.color-1 .box:hover svg line {
    stroke: #fe6f83;
}

/* Frame */
.frame-1 .box {
    background: rgba(0,0,0,0);
    color: #fff;
    box-shadow: none;
    -webkit-transition: background 0.3s;
    transition: background 0.3s;
}

.frame-1 .box:hover {
    background: rgba(0,0,0,0.4);
}

.frame-1 .box h3,
.frame-1 .box span {
    -webkit-transition: none;
    transition: none;
}

.frame-1 .box svg line {
    -webkit-transition: all .5s;
    transition: all .5s;
}

.frame-1 .box:hover svg line {
    stroke-width: 10;
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
}

.frame-1 .box:hover svg line.top {
    -webkit-transform: translateX(-300px);
    transform: translateX(-300px);
}

.frame-1 .box:hover svg line.bottom {
    -webkit-transform: translateX(300px);
    transform: translateX(300px);
}

.frame-1 .box:hover svg line.left {
    -webkit-transform: translateY(460px);
    transform: translateY(460px);
}

.frame-1 .box:hover svg line.right {
    -webkit-transform: translateY(-460px);
    transform: translateY(-460px);
}

/* Spin */
.spin-1 .box {
    box-shadow: none;
    background: rgba(0,0,0,0.4);
    -webkit-transition: none;
    transition: none;
    color: #fff;
}

.spin-1 .box h3,
.spin-1 .box span {
    -webkit-transform: scale(0.9);
    transform: scale(0.9);
    -webkit-backface-visibility: hidden;
    backface-visibility: hidden;
    -webkit-transition: -webkit-transform 0.5s;
    transition: transform 0.5s;
}

.spin-1 .box:hover h3,
.spin-1 .box:hover span {
    -webkit-transform: scale(1);
    transform: scale(1);
}

.spin-1 .box svg line {
    stroke-width: 30;
    -webkit-transition: all .4s;
    transition: all .4s;
}

.spin-1 .box:hover svg line {
    -webkit-transition-delay: 0s;
    transition-delay: 0s;
}

.spin-1 .box:hover svg line {
    stroke-width: 0;
}

.spin-1 .box svg line.top,
.spin-1 .box svg line.bottom {
    stroke-dasharray: 300; 
}

.spin-1 .box svg line.left,
.spin-1 .box svg line.right {
    stroke-dasharray: 460;
}

.spin-1 .box:hover svg line.top {
    -webkit-transform: translateX(-300px);
    transform: translateX(-300px);
}

.spin-1 .box:hover svg line.bottom {
    -webkit-transform: translateX(300px);
    transform: translateX(300px);
}

.spin-1 .box:hover svg line.left {
    -webkit-transform: translateY(460px);
    transform: translateY(460px);
}

.spin-1 .box:hover svg line.right {
    -webkit-transform: translateY(-460px);
    transform: translateY(-460px);
}