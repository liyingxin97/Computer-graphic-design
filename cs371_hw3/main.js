var scene = new THREE.Scene();

var camera = new THREE.PerspectiveCamera(75,window.innerWidth/window.innerHeight,0.1,1000)
camera.position.z = 5;

var renderer = new THREE.WebGLRenderer({antialias: true});
renderer.setClearColor("#e5e5e5");
renderer.setSize(window.innerWidth,window.innerHeight);

document.body.appendChild(renderer.domElement);

window.addEventListener('resize', () => {
    renderer.setSize(window.innerWidth,window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;

    camera.updateProjectionMatrix();
})

var raycaster = new THREE.Raycaster();
var mouse = new THREE.Vector2();

var geometry = new THREE.BoxGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0x000080});
var mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

var geometry = new THREE.SphereGeometry(1, 1, 1);
var material = new THREE.MeshLambertMaterial({color: 0xC71585});
var mesh = new THREE.Mesh(geometry, material);
mesh.position.y = 1.5
scene.add(mesh);

var geometry = new THREE.ConeGeometry( 1, 1, 10 );
var material = new THREE.MeshBasicMaterial( {color: 0x006400} );
var cone = new THREE.Mesh( geometry, material );
cone.position.y = 3
scene.add( cone );

var light = new THREE.PointLight(0x000080, 1, 1000)
light.position.set(0,0,0);
scene.add(light);

var light = new THREE.SpotLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,25);
scene.add(light);


var light = new THREE.AmbientLight(0xFFFFFF, 2, 1000)
light.position.set(0,0,20);
scene.add(light);
window.addEventListener('resize',onWindowResize,false);
function onWindowResize(){
    camera.aspect = window.innerWidth/window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth,window.innerHeight);
}
var render = function() {
    requestAnimationFrame(render);

    mesh.rotation.x += 0.05;
    mesh.rotation.y += 0.01;
    //mesh.scale.x -= 0.01;

    renderer.render(scene, camera);
}
render();

var xSpeed = 5.0;
var ySpeed = 5.0;

var quaternion_start = new THREE.Quaternion();
quaternion_start.setFromAxisAngle(new THREE.Vector3(-0.5,0,0.5),Math.PI/2);
var quaternion_end   = new THREE.Quaternion();
quaternion_end.setFromAxisAngle(new THREE.Vector3(0.5,0,-0.5),Math.PI/2);

document.addEventListener("keydown", onDocumentKeyDown, false);
function onDocumentKeyDown(event) {
    var keyCode = event.which;
    if (keyCode == 87) {         //w
        console.log(87)
        mesh.position.y += ySpeed;
    } else if (keyCode == 83) {  //s
        console.log(83)
        mesh.position.y -= ySpeed;
    } else if (keyCode == 65) {  //a
        console.log(65)
        mesh.position.x -= xSpeed;
    } else if (keyCode == 68) {  //d
        console.log(68)
        mesh.position.x += xSpeed;
    } else if (keyCode == 32) {  //space
        console.log(32)
        mesh.position.set(0, 0, 0);
    } else if (keyCode == 81) { //q
        console.log(81)
        mesh.quaternion.slerp(quaternion_end,0.1);
    } else if (keyCode == 69) { //e
        console.log(69)
        mesh.quaternion.slerp(quaternion_start,0.1);
    }
    render();
};



function onMouseMove(event) {
    event.preventDefault();

    mouse.x = ( event.clientX / window.innerWidth ) * 2 - 1;
    mouse.y = - ( event.clientY / window.innerHeight ) * 2 + 1;

    raycaster.setFromCamera(mouse, camera);

    var intersects = raycaster.intersectObjects(scene.children, true);
    for (var i = 0; i < intersects.length; i++) {
        this.tl = new TimelineMax();
        this.tl.to(intersects[i].object.scale, 1, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.scale, .5, {x: .5, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.position, .5, {x: 2, ease: Expo.easeOut})
        this.tl.to(intersects[i].object.rotation, .5, {y: Math.PI*.5, ease: Expo.easeOut}, "=-1.5")
    }
}



window.addEventListener('mousemove', onMouseMove);
render();

