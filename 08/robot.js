Robot = function(x, y, z) {

  // create head, neck, and torso
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'brown');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.root = bones[ 0 ]; // invisible anchor point
  this.root.position.set( x, y, z );

  this.head = bones[ 1 ];
  this.neck = bones[ 2 ];
  this.neck.position.y = -10;
  this.torso = bones[ 3 ];
  this.torso.position.y = -30;

  this.body_mesh = mesh;
  // end of head, neck, torso

  // start of left arm
  var fromhelper = HELPER.cylinderSkeletonMesh( 3, 5, 'blue');
  var geometry = fromhelper[0];
  var material = fromhelper[1];
  var bones = fromhelper[2];

  head_g = new THREE.BoxBufferGeometry( 18, 18, 18);
  var head_texture =  new THREE.TextureLoader().load( 'tc.jpg' );
  head_m = new THREE.MeshStandardMaterial({
  map: head_texture });
  this.cube = new THREE.Mesh( head_g, head_m);
  scene.add(this.cube);

  var mesh = new THREE.SkinnedMesh( geometry, material );
  var skeleton = new THREE.Skeleton( bones );
  mesh.add( bones[0] );
  mesh.bind( skeleton );

  this.neck.add( bones[ 0 ] ); // invisible anchor point
  this.neck.add(this.cube);

  this.left_upperarm = bones[ 1 ];
  this.left_upperarm.position.x = 5;
  this.left_upperarm.position.y = -5;

  this.left_lowerarm = bones[ 2 ];
  this.left_lowerarm.position.x = 5;
  this.left_lowerarm.position.y = -15;

  this.left_hand = bones[ 3 ];
  this.left_hand.position.x = 5;
  this.left_hand.position.y = -5;

  this.leftarm_mesh = mesh;
  //end of left arm

  // right arm, left leg, right leg
  
	var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'blue');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);
	
	  this.neck.add(bones[0]);

    this.right_upperarm = bones[1];
    this.right_upperarm.position.x = -5;
    this.right_upperarm.position.y = -5;

    this.right_lowerarm = bones[2];
    this.right_lowerarm.position.x = -5;
    this.right_lowerarm.position.y = -15;

    this.right_hand = bones[3];
    this.right_hand.position.x = -5;
    this.right_hand.position.y = -5;

    this.rightarm_mesh = mesh;
	

    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'orange');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.torso.add(bones[0]);

    this.left_upperleg = bones[ 1 ];
    this.left_upperleg.position.x = 5;
    this.left_upperleg.position.y = -5;

    this.left_lowerleg = bones[ 2 ];
    this.left_lowerleg.position.x = 5;
    this.left_lowerleg.position.y = -15;

    this.left_feet = bones[3];
    this.left_feet.position.x = 5;
    this.left_feet.position.y = -5;

    this.leftleg_mesh = mesh;

    var fromhelper = HELPER.cylinderSkeletonMesh(3, 5, 'orange');
    var geometry = fromhelper[0];
    var material = fromhelper[1];
    var bones = fromhelper[2];

    var mesh = new THREE.SkinnedMesh(geometry, material);
    var skeleton = new THREE.Skeleton(bones);
    mesh.add(bones[0]);
    mesh.bind(skeleton);

    this.torso.add(bones[0]);

    this.right_upperleg = bones[1];
    this.right_upperleg.position.x = -5;
    this.right_upperleg.position.y = -5;

    this.right_lowerleg = bones[2];
    this.right_lowerleg.position.x = -5;
    this.right_lowerleg.position.y = -15;

    this.right_feet = bones[3];
    this.right_feet.position.x = -5;
    this.right_feet.position.y = -5;

    this.rightleg_mesh = mesh;
  
	this.movement = null;		

};

Robot.prototype.walk = function() {
	this.movement = 'walk' ;
};

Robot.prototype.onStep = function() {

		for (var a in allRobots) {

			a = allRobots[a];

			if (a.root.position.equals(this.root.position)) {
				continue;
			}

			if (a.root.position.distanceTo(this.root.position) < 10) {
				this.root.rotateY(Math.PI/2);	
		}
	}
		if (this.root.position.z > 490 || this.root.position.z < -490) {
			this.root.rotateY(Math.PI/2);
		} else if (this.root.position.x > 490 || this.root.position.x < -490) {
		  this.root.rotateY(Math.PI/2);	
		}
		// bonus 2 : not allowing robots to walk into the mesh
    if (this.root.position.x > 100 && this.root.position.x < 200  && this.root.position.z > -150 && this.root.position.z < -50)
    { 
      this.root.rotateY(Math.PI / 2);
    }

	this.root.translateZ(10);

};


Robot.prototype.show = function(scene) {

  scene.add(this.body_mesh);
  scene.add(this.leftarm_mesh);
  scene.add(this.leftleg_mesh);
  scene.add(this.rightarm_mesh);
  scene.add(this.rightleg_mesh);

};

Robot.prototype.raise_left_arm = function() {

  this.movement = 'raise left arm';

};

Robot.prototype.lower_left_arm = function() {

  this.movement = 'lower left arm';

};

Robot.prototype.kick = function() {

  this.movement = 'kick';

};

Robot.prototype.dance = function() {
  
  this.movement = 'dance';

};

Robot.prototype.onAnimate = function() {

  if (this.movement == 'raise left arm') {

    var T = Math.PI;
    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(Math.sin(-T/2),  // w
                                                              0,               // x
                                                              0,               // y
                                                              Math.cos(-T/2)), // z
                                        0.1 );

  } else  if (this.movement == 'lower left arm') {

    this.left_upperarm.quaternion.slerp( new THREE.Quaternion(0, 0, 0, 1),
                                        0.1 );

  } else if (this.movement == 'walk') {

  	if (this.right_upperleg.quaternion.w < 0.93) {
  		this.movement = 'walk2';
  	}

  	this.left_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.5 );

  	var T = -Math.PI/4;
  	this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T/2 ),
  																0,
  																0,
  																Math.cos( T/2 ) ),
  										   0.5 );
  	this.onStep();

   } else if (this.movement == 'walk2') {

   	if (this.left_upperleg.quaternion.w <0.93) {
  		this.movement = 'walk' ;
  	}

   	this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.5);


   	var T = -Math.PI/4;
   	this.left_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T/2 ),
  																0,
  																0,
  																Math.cos( T/2 ) ),
  										   0.5 );
   	this.onStep();

  } else if (this.movement == 'kick') {
  
    // check if slerp reached almost the end
    if (this.right_upperleg.quaternion.w < 0.72) {
  
      // signal that the kick is done and the leg should move back
      this.movement = 'kick done';
  
    } else {
  
      var T = -Math.PI/2;
      this.right_upperleg.quaternion.slerp( new THREE.Quaternion( Math.sin( T / 2 ),   // x
                                                                  0,                   // y
                                                                  0,                   // z
                                                                  Math.cos( T / 2 ) ), // w
                                            0.1 );
  
    }
  
  } else if (this.movement == 'kick done') {
  
    // reset leg back to identity
    this.right_upperleg.quaternion.slerp( new THREE.Quaternion(0,0,0,1), 0.1 );
  
  } else if (this.movement == 'dance') {
 
    if (typeof this.dancer === 'undefined') {
 
      this.dancer = setInterval(function() {
 
        // 
        //
        //
        var shakehead = 3*Math.random();
        if (Math.random() < .5) {
          shakehead *= -1;
        }
 
        var shakeneck = 3*Math.random();
        if (Math.random() < .5) {
          shakeneck *= -1;
        }
 
        var shaketorso = 3*Math.random();
        if (Math.random() < .5) {
          shaketorso *= -1;
        }
 
        this.head.position.x += shakehead;
 
        this.neck.position.x += shakeneck;
 
        this.torso.position.x += shaketorso;
 
 
        //
        // use actions
        //
        if (Math.random() < .3) {
          this.raise_left_arm();
        }
 
        if (Math.random() < .3) {
          this.lower_left_arm();
        }
 
        if (Math.random() < .3) {
          this.kick();
        }
 
        if (Math.random() < .3) {
          this.movement = 'kick done';
        }
 
      }.bind(this), 500);
 
    }
 
  }

};