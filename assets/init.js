function createMaterial(colors) {
  var material = new pc.PhongMaterial();
  for (var param in colors) {
    material[param] = colors[param];
  }
  material.update();
  return material;
}

var canvas = document.getElementById("application-canvas");

// Create the application and start the update loop
var app = new pc.Application(canvas);
app.start();

// Set the canvas to fill the window and automatically change resolution to be the same as the canvas size
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW);
app.setCanvasResolution(pc.RESOLUTION_AUTO);

app.scene.ambientLight = new pc.Color(0.8, 0.8, 0.8);

var entity;

// Create an Entity with a camera component
var cameraEntity = new pc.Entity(app);
cameraEntity.addComponent("camera", {
  clearColor: new pc.Color(0, 0, 0)
});
cameraEntity.rotateLocal(0, 0, 0);
cameraEntity.translateLocal(0, 0.6, 2.4);
app.root.addChild(cameraEntity);


// Load model and animation assets
var model = null;
var runAnim = null;
var idleAnim = null;

app.assets.loadFromUrl("./model/Maria_w_Prop_J_J_Ong.json", "model", function (err, asset) {
  model = asset;
  app.assets.loadFromUrl("./model/standing_melee_attack_horizontal.json", "animation", function (err, asset) {
    var runAnim = asset;
    app.assets.loadFromUrl("./model/standing_melee_attack_horizontal.json", "animation", function (err, asset) {
      var idleAnim = asset;
      entity = new pc.Entity();
      // add model component to entity
      entity.addComponent("model", {
        type: "asset",
        asset: model,
        castShadows: true
      });
      // add animation component to entity
      entity.addComponent("animation", {
        assets: [idleAnim, runAnim],
        speed: 1
      });
      app.root.addChild(entity);

      // Start alternating between run and stop
      setTimeout(function () {
        run();
      }, 1000);
    });
  });
});

// Start running then stop in 1s
function run() {
  entity.animation.play("standing_melee_attack_horizontal.json", 0.2);
  setTimeout(function () {
    stop();
  }, 1000);
};

// Stop running then start running in 1s
function stop() {
  entity.animation.play("standing_melee_attack_horizontal.json", 0.2);
  setTimeout(function () {
    run();
  }, 1000);
}