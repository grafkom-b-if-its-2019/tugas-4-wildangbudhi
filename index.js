var gerak2 = [0.0, 0.0, 0.0];
var xAdder = 0.02;
var yAdder = 0.03;
var zAdder = 0.04;

(function(global) {

  glUtils.SL.init({ callback: function() { main(); } });
  var canvas, gl, program, program2;

  function main() {
    canvas = document.getElementById("glcanvas");
    gl = glUtils.checkWebGL(canvas);
  
    // Inisialisasi shaders dan program
    // 1 untuk huruf bercahaya
    var vertexShader = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v1.vertex);
    var fragmentShader = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v1.fragment);
    // 2 untuk kubus tekstur
    var vertexShader2 = glUtils.getShader(gl, gl.VERTEX_SHADER, glUtils.SL.Shaders.v2.vertex);
    var fragmentShader2 = glUtils.getShader(gl, gl.FRAGMENT_SHADER, glUtils.SL.Shaders.v2.fragment);

    program = glUtils.createProgram(gl, vertexShader, fragmentShader);
    program2 = glUtils.createProgram(gl, vertexShader2, fragmentShader2);
  
    var theta = [0.0, 0.0, 0.0];
    var axis = 0;
    var xAxis = 0;
    var yAxis = 1;
    var zAxis = 2;

    function listener(){
      function onKeyPress(event) {
        if (event.keyCode == 88 || event.keyCode == 120) {
          axis = xAxis;
        } else if (event.keyCode == 89 || event.keyCode == 121) {
          axis = yAxis;
        } else if (event.keyCode == 90 || event.keyCode == 122) {
          axis = zAxis;
        }
      }
      document.addEventListener('keypress', onKeyPress);
  
      var lastX, lastY, dragging;
      function onMouseDown(event){
        console.log("mD");
        var x = event.clientX;
        var y = event.clientY;
        var rect = event.target.getBoundingClientRect();
        if (rect.left <= x &&
            rect.right > x &&
            rect.top <= y &&
            rect.bottom > y) {
              lastX = x;
              lastY = y;
              dragging = true;
        }
      }
      function onMouseUp(event) {
        console.log("mU");
        dragging = false;
      }
      function onMouseMove(event) {
        console.log("mM");
        var x = event.clientX;
        var y = event.clientY;
        if (dragging) {
          var factor = 10 / canvas.height;
          var dx = factor * (x-lastX);
          var dy = factor * (y-lastY);
          theta[yAxis] += dx;
          theta[xAxis] += dy;
        }
        lastX = x;
        lastY = y;
      }
      document.addEventListener('mousedown',onMouseDown);
      document.addEventListener('mouseup',onMouseUp);
      document.addEventListener('mousemove',onMouseMove);
    }

    function cube(){
      gl.useProgram(program2);
      var cubeVertices = [
        // x, y, z            u, v         normal
  
        // -0.5,  0.5,  0.5,     0.0, 1.0,  0.0, 0.0, 1.0, // depan, merah, BAD BDC
        // -0.5, -0.5,  0.5,     0.0, 0.0,  0.0, 0.0, 1.0, 
        //  0.5, -0.5,  0.5,     1.0, 0.0,  0.0, 0.0, 1.0, 
        // -0.5,  0.5,  0.5,     0.0, 1.0,  0.0, 0.0, 1.0, 
        //  0.5, -0.5,  0.5,     1.0, 0.0,  0.0, 0.0, 1.0, 
        //  0.5,  0.5,  0.5,     1.0, 1.0,  0.0, 0.0, 1.0, 
  
        0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0, // kanan, hijau, CDH CHG
        0.5, -0.5,  0.5,     0.0, 0.0,  1.0, 0.0, 0.0,
        0.5, -0.5, -0.5,     0.2, 0.0,  1.0, 0.0, 0.0,
        0.5,  0.5,  0.5,     0.0, 1.0,  1.0, 0.0, 0.0,
        0.5, -0.5, -0.5,     0.2, 0.0,  1.0, 0.0, 0.0,
        0.5,  0.5, -0.5,     0.2, 1.0,  1.0, 0.0, 0.0,
 
        0.5, -0.5,  0.5,     0.2, 1.0,  0.0, -1.0, 0.0, // bawah, biru, DAE DEH
       -0.5, -0.5,  0.5,     0.2, 0.0,  0.0, -1.0, 0.0,
       -0.5, -0.5, -0.5,     0.4, 0.0,  0.0, -1.0, 0.0,
        0.5, -0.5,  0.5,     0.2, 1.0,  0.0, -1.0, 0.0,
       -0.5, -0.5, -0.5,     0.4, 0.0,  0.0, -1.0, 0.0,
        0.5, -0.5, -0.5,     0.4, 1.0,  0.0, -1.0, 0.0,
 
       -0.5, -0.5, -0.5,     0.4, 1.0,  0.0, 0.0, -1.0, // belakang, kuning, EFG EGH
       -0.5,  0.5, -0.5,     0.4, 0.0,  0.0, 0.0, -1.0,
        0.5,  0.5, -0.5,     0.6, 0.0,  0.0, 0.0, -1.0,
       -0.5, -0.5, -0.5,     0.4, 1.0,  0.0, 0.0, -1.0,
        0.5,  0.5, -0.5,     0.6, 0.0,  0.0, 0.0, -1.0,
        0.5, -0.5, -0.5,     0.6, 1.0,  0.0, 0.0, -1.0,
 
       -0.5,  0.5, -0.5,     0.6, 1.0,  -1.0, 0.0, 0.0, // kiri, cyan, FEA FAB
       -0.5, -0.5, -0.5,     0.6, 0.0,  -1.0, 0.0, 0.0,
       -0.5, -0.5,  0.5,     0.8, 0.0,  -1.0, 0.0, 0.0,
       -0.5,  0.5, -0.5,     0.6, 1.0,  -1.0, 0.0, 0.0,
       -0.5, -0.5,  0.5,     0.8, 0.0,  -1.0, 0.0, 0.0,
       -0.5,  0.5,  0.5,     0.8, 1.0,  -1.0, 0.0, 0.0,
 
        0.5,  0.5, -0.5,     0.8, 1.0,  0.0, 1.0, 0.0, // atas, magenta, GFB GBC
       -0.5,  0.5, -0.5,     0.8, 0.0,  0.0, 1.0, 0.0,
       -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
        0.5,  0.5, -0.5,     0.8, 1.0,  0.0, 1.0, 0.0,
       -0.5,  0.5,  0.5,     1.0, 0.0,  0.0, 1.0, 0.0,
        0.5,  0.5,  0.5,     1.0, 1.0,  0.0, 1.0, 0.0
      ];
      var cubeVBO = gl.createBuffer();
      gl.bindBuffer(gl.ARRAY_BUFFER, cubeVBO);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cubeVertices), gl.STATIC_DRAW);

      var vPosition = gl.getAttribLocation(program2, 'vPosition');
      var vTexCoord = gl.getAttribLocation(program2, 'vTexCoord');
      var vNormal = gl.getAttribLocation(program2, 'vNormal');
      gl.vertexAttribPointer(
        vPosition,  // variabel yang memegang posisi attribute di shader
        3,          // jumlah elemen per attribute
        gl.FLOAT,   // tipe data atribut
        gl.FALSE,
        8 * Float32Array.BYTES_PER_ELEMENT, // ukuran byte tiap verteks 
        0                                   // offset dari posisi elemen di array
      );
      gl.vertexAttribPointer(vTexCoord, 2, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 3 * Float32Array.BYTES_PER_ELEMENT);
      gl.vertexAttribPointer(vNormal, 3, gl.FLOAT, gl.FALSE, 
        8 * Float32Array.BYTES_PER_ELEMENT, 5 * Float32Array.BYTES_PER_ELEMENT);

      gl.enableVertexAttribArray(vPosition);
      gl.enableVertexAttribArray(vTexCoord);
      gl.enableVertexAttribArray(vNormal);

      // Uniform untuk definisi cahaya
      var lightColorLoc = gl.getUniformLocation(program2, 'lightColor');
      var lightPositionLoc = gl.getUniformLocation(program2, 'lightPosition');
      var ambientColorLoc = gl.getUniformLocation(program2, 'ambientColor');
      var lightColor = [2., 2., 2.];

      var shine = gl.getUniformLocation(program2,'shininess'); //program nyesuain huruf atau kubus
      var s = 0.06; //tingkat shininess

      var lightPosition = [0 + gerak2[0] ,0 + gerak2[1] ,0 + gerak2[2]];
      var ambientColor = glMatrix.vec3.fromValues(0.15, 0.41, 0.84);
      gl.uniform3fv(lightColorLoc, lightColor);
      gl.uniform3fv(lightPositionLoc, lightPosition);
      gl.uniform3fv(ambientColorLoc, ambientColor);
      gl.uniform1f(shine, s);

      var nmLoc = gl.getUniformLocation(program2, 'normalMatrix');

      // Definisi view, model, dan projection
      var vmLoc = gl.getUniformLocation(program2, 'view');
      var pmLoc = gl.getUniformLocation(program2, 'projection');
      var mmLoc = gl.getUniformLocation(program2, 'model');
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();

      glMatrix.mat4.lookAt(vm,
        glMatrix.vec3.fromValues(0.0, 0.0, 1.5),  // posisi kamera
        glMatrix.vec3.fromValues(0.0, 0.0, 0.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
        glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
      );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.1;
      var far = 10.0;
      glMatrix.mat4.perspective(pm,
        fovy,
        aspect,
        near,
        far
      );

      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);

      // theta[axis] += glMatrix.glMatrix.toRadian(0.5);  // dalam derajat
      var mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0, -0.2]);
      glMatrix.mat4.rotateX(mm, mm, theta[xAxis]);
      glMatrix.mat4.rotateY(mm, mm, theta[yAxis]);
      glMatrix.mat4.rotateZ(mm, mm, theta[zAxis]);
      gl.uniformMatrix4fv(mmLoc, false, mm);

      // Perhitungan modelMatrix untuk vektor normal
      var nm = glMatrix.mat3.create();
      glMatrix.mat3.normalFromMat4(nm, mm);
      gl.uniformMatrix3fv(nmLoc, false, nm);

    }

    function triangle(){
      gl.useProgram(program);

      var textCoordinate =	{
        'A' : [-0.3,  0.0,  0.0],
        'B' : [-0.1, -0.3,  0.0],
        'C' : [ 0.0, -0.1,  0.0],
        'D' : [ 0.1, -0.3,  0.0],
        'E' : [ 0.3,  0.0,  0.0],
        'F' : [ 0.2,  0.0,  0.0],
        'G' : [ 0.1, -0.2,  0.0],
        'H' : [ 0.0,  0.0,  0.0],
        'I' : [-0.1, -0.2,  0.0],
        'J' : [-0.2,  0.0,  0.0],
    
        'B-Atas' : [-0.1, -0.3,  0.1],
        'A-Atas' : [-0.3,  0.0,  0.1],
        'C-Atas' : [ 0.0, -0.1,  0.1],
        'D-Atas' : [ 0.1, -0.3,  0.1],
        'E-Atas' : [ 0.3,  0.0,  0.1],
        'F-Atas' : [ 0.2,  0.0,  0.1],
        'G-Atas' : [ 0.1, -0.2,  0.1],
        'H-Atas' : [ 0.0,  0.0,  0.1],
        'I-Atas' : [-0.1, -0.2,  0.1],
        'J-Atas' : [-0.2,  0.0,  0.1]
      };
  
      var triangleVertices = new Float32Array([
                 // W
              textCoordinate['A'],
              textCoordinate['B'],
              textCoordinate['B'],
              textCoordinate['C'],
              textCoordinate['C'],
              textCoordinate['D'],
              textCoordinate['D'],
              textCoordinate['E'],
              textCoordinate['E'],
              textCoordinate['F'],
              textCoordinate['F'],
              textCoordinate['G'],
              textCoordinate['G'],
              textCoordinate['H'],
              textCoordinate['H'],
              textCoordinate['I'],
              textCoordinate['I'],
              textCoordinate['J'],
              textCoordinate['J'],
              textCoordinate['A'],
  
              textCoordinate['A-Atas'],
              textCoordinate['B-Atas'],
              textCoordinate['B-Atas'],
              textCoordinate['C-Atas'],
              textCoordinate['C-Atas'],
              textCoordinate['D-Atas'],
              textCoordinate['D-Atas'],
              textCoordinate['E-Atas'],
              textCoordinate['E-Atas'],
              textCoordinate['F-Atas'],
              textCoordinate['F-Atas'],
              textCoordinate['G-Atas'],
              textCoordinate['G-Atas'],
              textCoordinate['H-Atas'],
              textCoordinate['H-Atas'],
              textCoordinate['I-Atas'],
              textCoordinate['I-Atas'],
              textCoordinate['J-Atas'],
              textCoordinate['J-Atas'],
              textCoordinate['A-Atas'],
  
              textCoordinate['A'],
              textCoordinate['A-Atas'],
              textCoordinate['B'],
              textCoordinate['B-Atas'],
              textCoordinate['C'],
              textCoordinate['C-Atas'],
              textCoordinate['D'],
              textCoordinate['D-Atas'],
              textCoordinate['E'],
              textCoordinate['E-Atas'],
              textCoordinate['F'],
              textCoordinate['F-Atas'],
              textCoordinate['G'],
              textCoordinate['G-Atas'],
              textCoordinate['H'],
              textCoordinate['H-Atas'],
              textCoordinate['I'],
              textCoordinate['I-Atas'],
              textCoordinate['J'],
              textCoordinate['J-Atas']
  
              ].flat());

            // var hurufN = vertices.length / 2;

            var triangleVertexBufferObject = gl.createBuffer();
            gl.bindBuffer(gl.ARRAY_BUFFER, triangleVertexBufferObject);
            gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(triangleVertices), gl.STATIC_DRAW);

            var vPosition = gl.getAttribLocation(program, 'vPosition');
            var vColor = gl.getAttribLocation(program, 'vColor');
            // gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 0);
            gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
            //(vPosition, 2, type, normalized, stride, offset);
            // gl.vertexAttribPointer(vColor, 3, gl.FLOAT, gl.FALSE, 5 * Float32Array.BYTES_PER_ELEMENT, 2 * Float32Array.BYTES_PER_ELEMENT);
            // gl.enableVertexAttribArray(vPosition);

            var gerak = gl.getUniformLocation(program, 'mantul');
            if (gerak2[0]  < -0.5 || gerak2[0] > 0.5) {
                xAdder*=-1;
            }

            gerak2[0] += xAdder;
            var middle_point = -0.3 + gerak2[0];
            var tengah = gl.getUniformLocation(program, 'tengah');
            
            gl.uniform1f(tengah, middle_point);

            // console.log(gerak2[0]);

            if (gerak2[1] < -0.5 || gerak2[1] > 0.5) {
                yAdder*=-1;
            }

            gerak2[1] += yAdder;

            if (gerak2[2] < -0.5 || gerak2[2] > 0.5) {
                zAdder*=-1;
            }

            gerak2[2] += zAdder;
            
            gl.uniform3fv(gerak, gerak2);
            

            if (scale >= 1) membesar = -1;
            else if (scale <= -1) membesar = 1;
            scale = scale + (membesar * 0.0119); 
            gl.uniform1f(scaleLoc, scale);
      
      // Uniform untuk definisi cahaya
      var lightColorLoc = gl.getUniformLocation(program, 'lightColor');
      var lightPositionLoc = gl.getUniformLocation(program, 'lightPosition');
      var ambientColorLoc = gl.getUniformLocation(program, 'ambientColor');
      var lightColor = [2., 2., 2.];
      var lightPosition = [0 + gerak2[0] ,0 + gerak2[1] ,0 + gerak2[2]];

      var shine = gl.getUniformLocation(program,'shininess'); //program nyesuain huruf atau kubus
      var s = 0.06; //tingkat shininess

      // var lightPosition = [0., 0., -1.];
      var ambientColor = glMatrix.vec3.fromValues(0.17, 0.41, 0.19);
      // var ambientColor = glMatrix.vec3.fromValues(0.6, 0.7, 0.2);
      gl.uniform3fv(lightColorLoc, lightColor);
      gl.uniform3fv(lightPositionLoc, lightPosition);
      gl.uniform3fv(ambientColorLoc, ambientColor);
      gl.uniform1f(shine, s);

      // Definisi view dan projection
      var vmLoc = gl.getUniformLocation(program, 'view');
      var pmLoc = gl.getUniformLocation(program, 'projection');
      var vm = glMatrix.mat4.create();
      var pm = glMatrix.mat4.create();

      glMatrix.mat4.lookAt(vm,
      glMatrix.vec3.fromValues(0.0, 0.0, 1.5),    // posisi kamera
      glMatrix.vec3.fromValues(0.0, 0.0, -2.0),  // titik yang dilihat; pusat kubus akan kita pindah ke z=-2
      glMatrix.vec3.fromValues(0.0, 1.0, 0.0)   // arah atas dari kamera
      );

      var fovy = glMatrix.glMatrix.toRadian(90.0);
      var aspect = canvas.width / canvas.height;
      var near = 0.5;
      var far = 10.0;
      glMatrix.mat4.perspective(pm,
      fovy,
      aspect,
      near,
      far
      );

      gl.uniformMatrix4fv(vmLoc, false, vm);
      gl.uniformMatrix4fv(pmLoc, false, pm);

      
      var mmLoc = gl.getUniformLocation(program, 'model');
      // theta[axis] += glMatrix.glMatrix.toRadian(0.5);  // dalam derajat
      var mm = glMatrix.mat4.create();
      glMatrix.mat4.translate(mm, mm, [0.0, 0.0,-0.2]);
      glMatrix.mat4.translate(mm, mm, gerak2);
      glMatrix.mat4.scale(mm, mm, [0.2, 0.2, 0.2]);
      glMatrix.mat4.scale(mm, mm, [scale, 1.0, 1.0]);
      // glMatrix.mat4.rotateX(mm, mm, theta[xAxis]);
      // glMatrix.mat4.rotateY(mm, mm, theta[yAxis]);
      // glMatrix.mat4.rotateZ(mm, mm, theta[zAxis]);
      gl.uniformMatrix4fv(mmLoc, false, mm);
    }

    function texturePack(){      
      // Uniform untuk tekstur
      var sampler0Loc = gl.getUniformLocation(program2, 'sampler0');
      gl.uniform1i(sampler0Loc, 0);
      // Inisialisasi tekstur
      var texture = gl.createTexture();
      if (!texture) {
        reject(new Error('Gagal membuat objek tekstur'));
      }
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, texture);
      // Sementara warnai tekstur dengan sebuah 1x1 piksel biru
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([0, 0, 255, 255]));
      initTexture(function () {
        render();
      });

      // Membuat mekanisme pembacaan gambar jadi tekstur
      function initTexture(callback, args) {
        var imageSource = 'images/foto1.png';
        var promise = new Promise(function(resolve, reject) {
          var image = new Image();
          if (!image) {
            reject(new Error('Gagal membuat objek gambar'));
          }
          image.onload = function() {
            gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, 1);
            gl.bindTexture(gl.TEXTURE_2D, texture);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
            gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
            gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, image);
            resolve('Sukses');
          }
          image.src = imageSource;
        });
        promise.then(function() {
          if (callback) {
            callback(args);
          }
        }, function (error) {
          console.log('Galat pemuatan gambar', error);
        });
      }
    }

    var sudut = 0;
    var scale = 1;
    var membesar = 1;

    // var sudutLoc = gl.getUniformLocation(program, 'theta');
    var scaleLoc = gl.getUniformLocation(program, 'scale');

    function render() {
      gl.clearColor(0.0, 0.0, 0.0, 1.0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      triangle();
      gl.drawArrays(gl.LINES, 0, 90);
      cube();    
      gl.drawArrays(gl.TRIANGLES, 0, 30);
      requestAnimationFrame(render); 
    }
    
    // Bersihkan layar jadi hitam
    gl.clearColor(0.0, 0.0, 0.0, 1.0);
    gl.enable(gl.DEPTH_TEST);
    texturePack();
    listener();
  }
})(window || this);
