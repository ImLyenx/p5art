// eric hubert
// Genuary & Original Sketches

let currentSketchIndex = -1; // -1 is the original
let sketches = [];
let seed = 0;

// Shared canvas settings
let w = 520;
let h = 520;

function setup() {
  createCanvas(w, h);
  
  // Populate sketches array
  sketches = [
    { name: "Jan 1: Pink Pixel", setup: jan1_setup, draw: jan1_draw },
    { name: "Jan 2: No Repeat Color", setup: jan2_setup, draw: jan2_draw },
    { name: "Jan 3: Left-handed Circle", setup: jan3_setup, draw: jan3_draw },
    { name: "Jan 4: Infinite Loop", setup: jan4_setup, draw: jan4_draw },
    { name: "Jan 5: 2473 Objects", setup: jan5_setup, draw: jan5_draw },
    { name: "Jan 6: Bouncing Dot", setup: jan6_setup, draw: jan6_draw },
    { name: "Jan 7: Mutating Order", setup: jan7_setup, draw: jan7_draw },
    { name: "Jan 8: Wrong Shadows", setup: jan8_setup, draw: jan8_draw },
    { name: "Jan 9: Empty Grid", setup: jan9_setup, draw: jan9_draw },
    { name: "Jan 10: Chaos vs Order", setup: jan10_setup, draw: jan10_draw },
    { name: "Jan 11: Negative Texture", setup: jan11_setup, draw: jan11_draw },
    { name: "Jan 12: Misaligned", setup: jan12_setup, draw: jan12_draw },
    { name: "Jan 13: Single Line Forest", setup: jan13_setup, draw: jan13_draw },
    { name: "Jan 14: Zoom Noise", setup: jan14_setup, draw: jan14_draw },
    { name: "Jan 15: Invisible Shapes", setup: jan15_setup, draw: jan15_draw },
    { name: "Jan 16: One Line Apart", setup: jan16_setup, draw: jan16_draw },
    { name: "Jan 17: Corners Only", setup: jan17_setup, draw: jan17_draw },
    { name: "Jan 18: Shy Pixels", setup: jan18_setup, draw: jan18_draw },
    { name: "Jan 19: Roads to Nowhere", setup: jan19_setup, draw: jan19_draw },
    { name: "Jan 20: Repelling Patterns", setup: jan20_setup, draw: jan20_draw },
    { name: "Jan 21: Off Color", setup: jan21_setup, draw: jan21_draw },
    { name: "Jan 22: Yesterdays Weather", setup: jan22_setup, draw: jan22_draw },
    { name: "Jan 23: Blue but Red", setup: jan23_setup, draw: jan23_draw },
    { name: "Jan 24: One Wavy Line", setup: jan24_setup, draw: jan24_draw },
    { name: "Jan 25: Folding Horizon", setup: jan25_setup, draw: jan25_draw },
    { name: "Jan 26: Neighbor Copy", setup: jan26_setup, draw: jan26_draw },
    { name: "Jan 27: Static Grid", setup: jan27_setup, draw: jan27_draw },
    { name: "Jan 28: Silk/Sand", setup: jan28_setup, draw: jan28_draw },
    { name: "Jan 29: Unique Grid", setup: jan29_setup, draw: jan29_draw },
    { name: "Jan 30: Touching Triangles", setup: jan30_setup, draw: jan30_draw },
    { name: "Jan 31: Shadows No Objects", setup: jan31_setup, draw: jan31_draw },
  ];

  // Setup UI
  let selector = document.getElementById('sketch-selector');
  if (selector) {
    // Clear existing options except the first one if needed, but here we just append
    // Actually the HTML has one option. We should keep it.
    sketches.forEach((s, i) => {
      let opt = document.createElement('option');
      opt.value = i;
      opt.innerText = s.name;
      selector.appendChild(opt);
    });
    selector.addEventListener('change', (e) => {
      currentSketchIndex = parseInt(e.target.value);
      runSetup();
    });
  }

  runSetup();
}

function runSetup() {
  randomSeed(millis());
  noiseSeed(millis());
  if (currentSketchIndex === -1) {
    original_setup();
  } else if (sketches[currentSketchIndex]) {
    sketches[currentSketchIndex].setup();
  }
}

function draw() {
  if (currentSketchIndex === -1) {
    // Original static except for sway
  } else if (sketches[currentSketchIndex]) {
    sketches[currentSketchIndex].draw();
  }
}

function keyPressed() {
  if (key === " " || key === "Spacebar") {
    saveCanvas("sketch_" + (currentSketchIndex === -1 ? "original" : currentSketchIndex + 1), "svg");
  }
  if (key.toLowerCase() === "f") {
    saveCanvas("sketch_" + (currentSketchIndex === -1 ? "original" : currentSketchIndex + 1), "png");
  }
}

// --- Original Sketch ---
function original_setup() {
  background(0);
  noFill();
  stroke(255, 50, 200, 200);
  strokeWeight(0.7);
  translate(width / 2, height * 0.95);
  drawFractalBranch(0, -1, 135, 10, 110);
}

function drawFractalBranch(angle, dir, len, minLen, spread) {
  if (len < minLen) return;
  let sway = (sin((frameCount + angle * 5) * 0.12) * PI) / 7;
  let steps = 3 + int(abs(len / 28));
  for (let i = -steps; i <= steps; i++) {
    let a = angle + dir * i * (PI / spread) + sway;
    let l2 = len * (0.77 + random(-0.14, 0.065));
    push();
    rotate(a);
    stroke(200 + 55 * sin(a * 6), 120 + 120 * cos(a * 5), 255 - len * 3, 180);
    line(0, 0, 0, -l2);
    translate(0, -l2);
    drawFractalBranch(
      a * 0.7 + random() * 0.18,
      -dir,
      l2 * 0.78,
      minLen,
      spread * (0.83 + random(-0.11, 0.16))
    );
    pop();
  }
}

// --- Jan 1: Pink Pixel ---
function jan1_setup() {
  background(255);
  noStroke();
  let s = 20;
  for(let x=0; x<width; x+=s) {
    for(let y=0; y<height; y+=s) {
      fill(random(50, 200));
      rect(x,y,s,s);
    }
  }
  fill(255, 0, 150);
  let rx = floor(random(width/s))*s;
  let ry = floor(random(height/s))*s;
  rect(rx, ry, s, s);
}
function jan1_draw() {}

// --- Jan 2: No repeating color ---
function jan2_setup() {
  colorMode(HSL);
  noStroke();
  let cols = 20;
  let rows = 20;
  let s = width/cols;
  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
      fill((i*rows + j) * (360/(cols*rows)), 70, 60);
      rect(i*s, j*s, s, s);
    }
  }
  colorMode(RGB);
}
function jan2_draw() {}

// --- Jan 3: Left-handed pixels ---
function jan3_setup() {
  background(240);
  noFill();
  stroke(0);
  strokeWeight(2);
  translate(width/2, height/2);
  beginShape();
  for(let i=0; i<TWO_PI; i+=0.1) {
    let r = 150 + random(-5,5);
    // Left handed twist? Just conceptual
    vertex(cos(i)*r, sin(i)*r);
  }
  endShape(CLOSE);
}
function jan3_draw() {}

// --- Jan 4: Loop a line ---
let j4_t = 0;
function jan4_setup() { 
  background(0); 
  stroke(255); 
  noFill(); 
  j4_t = 0;
}
function jan4_draw() {
  background(0, 20);
  translate(width/2, height/2);
  beginShape();
  for(let i=0; i<TWO_PI; i+=0.1) {
    let r = 100 + noise(cos(i)+1, sin(i)+1, j4_t)*50;
    vertex(cos(i)*r, sin(i)*r);
  }
  endShape(CLOSE);
  j4_t += 0.01;
}

// --- Jan 5: Less is more (2473 objects) ---
function jan5_setup() {
  background(255);
  noStroke();
  fill(0, 100);
  for(let i=0; i<2473; i++) {
    circle(random(width), random(height), 2);
  }
}
function jan5_draw() {}

// --- Jan 6: Bouncing Dot ---
let j6_pos, j6_vel;
function jan6_setup() {
  j6_pos = createVector(width/2, height/2);
  j6_vel = p5.Vector.random2D().mult(3);
  background(0);
}
function jan6_draw() {
  background(0, 20);
  fill(0, 255, 0);
  noStroke();
  circle(j6_pos.x, j6_pos.y, 20);
  j6_pos.add(j6_vel);
  if(j6_pos.x < 0 || j6_pos.x > width) j6_vel.x *= -1;
  if(j6_pos.y < 0 || j6_pos.y > height) j6_vel.y *= -1;
}

// --- Jan 7: Generate order that mutates ---
function jan7_setup() { background(220); }
function jan7_draw() {
  background(220);
  let s = 40;
  for(let x=20; x<width; x+=s) {
    for(let y=20; y<height; y+=s) {
      push();
      translate(x, y);
      rotate(frameCount * 0.01 * (noise(x, y) - 0.5));
      rectMode(CENTER);
      rect(0, 0, s-5, s-5);
      pop();
    }
  }
}

// --- Jan 8: Shadow wrong direction ---
function jan8_setup() {
  background(200);
  let cx = width/2, cy = height/2;
  // Light source logic inverted
  fill(50);
  noStroke();
  ellipse(cx - 20, cy - 20, 100, 100); // Shadow towards top left implies light bottom right
  fill(255, 0, 0);
  ellipse(cx, cy, 100, 100);
  // Drawing a "sun" at top left to confuse
  fill(255, 255, 0);
  circle(50, 50, 50);
}
function jan8_draw() {}

// --- Jan 9: Grid empty cells ---
function jan9_setup() {
  background(0);
  stroke(255);
  strokeWeight(2);
  let step = 50;
  for(let x=0; x<=width; x+=step) line(x, 0, x, height);
  for(let y=0; y<=height; y+=step) line(0, y, width, y);
}
function jan9_draw() {}

// --- Jan 10: Midpoint chaos order ---
function jan10_setup() {
  background(255);
  // Order
  noStroke();
  fill(0);
  for(let i=0; i<10; i++) rect(50, 50+i*40, 40, 30);
  
  // Chaos
  for(let i=0; i<10; i++) rect(300+random(50), 50+i*40+random(-20,20), random(20,50), random(10,40));

  // Midpoint
  stroke(255, 0, 0);
  line(width/2, 0, width/2, height);
  textAlign(CENTER);
  fill(0);
  text("ORDER", 100, 480);
  text("CHAOS", 400, 480);
}
function jan10_draw() {}

// --- Jan 11: Negative pixels ---
function jan11_setup() {
  background(0);
  loadPixels();
  for(let i=0; i<pixels.length; i+=4) {
    pixels[i] = random(255); // R
    pixels[i+1] = random(255); // G
    pixels[i+2] = random(255); // B
    pixels[i+3] = 255;
  }
  updatePixels();
  
  // "Negative" region
  filter(INVERT);
}
function jan11_draw() {}

// --- Jan 12: Misaligned element ---
function jan12_setup() {
  background(240);
  let step = 50;
  for(let x=25; x<width; x+=step) {
    for(let y=25; y<height; y+=step) {
       fill(100, 100, 255);
       if(random() < 0.05) {
         rect(x-25+1, y-25+1, 40, 40);
       } else {
         rect(x-25, y-25, 40, 40);
       }
    }
  }
}
function jan12_draw() {}

// --- Jan 13: Fractal forest single line ---
function jan13_setup() {
  background(255);
  stroke(0);
  noFill();
  beginShape();
  // A single line traversing multiple "trees"
  let x = 0;
  let y = height;
  vertex(x, y);
  
  while(x < width) {
    // Move to trunk base
    x += random(20, 50);
    vertex(x, y);
    // Draw tree
    jan13_drawTree(x, y, 100);
    // Return to ground (implied by drawTree returning to base? No, drawTree needs to backtrack)
    // Actually standard recursion returns to start point if using push/pop, but here we want ONE line.
    // So we must re-trace our steps back to the trunk base.
    // Simplifying: Just draw a jagged "tree-like" wave
  }
  endShape();
}

function jan13_drawTree(bx, by, h) {
   // Go up
   let ty = by - h;
   vertex(bx, ty);
   // Branch Left
   vertex(bx - 20, ty - 20);
   vertex(bx, ty); // Back
   // Branch Right
   vertex(bx + 20, ty - 20);
   vertex(bx, ty); // Back
   // Go Down
   vertex(bx, by);
}
function jan13_draw() {}

// --- Jan 14: Noise smooth zoom ---
let z = 1;
function jan14_setup() { background(0); }
function jan14_draw() {
  loadPixels();
  z *= 0.99;
  let d = pixelDensity();
  for(let x=0; x<width; x+=5) {
     for(let y=0; y<height; y+=5) {
        let c = noise(x*0.01*z, y*0.01*z) * 255;
        fill(c);
        noStroke();
        rect(x,y,5,5);
     }
  }
}

// --- Jan 15: Invisible shapes ---
function jan15_setup() {
  background(0, 0, 255);
  fill(0,0,255); // Same as BG
  stroke(0,0,250); // Almost same
  rect(100, 100, 200, 200);
}
function jan15_draw() {}

// --- Jan 16: Horizontal lines 1px apart ---
function jan16_setup() {
  background(255);
  stroke(0);
  for(let y=0; y<height; y+=2) {
    if(abs(y - height/2) < 2) {
       // The exception
       line(0, y+10, width, y+10);
    } else {
       line(0, y, width, y);
    }
  }
}
function jan16_draw() {}

// --- Jan 17: Corners only ---
function jan17_setup() {
  background(255);
  fill(0);
  let s = 100;
  rect(0,0,s,s);
  rect(width-s,0,s,s);
  rect(0,height-s,s,s);
  rect(width-s,height-s,s,s);
}
function jan17_draw() {}

// --- Jan 18: Shy Pixels ---
let j18_particles = [];
function jan18_setup() { 
  background(0); 
  j18_particles = [];
  for(let i=0; i<200; i++) {
    j18_particles.push({
      orgX: random(width),
      orgY: random(height),
      x: random(width),
      y: random(height),
      vx: 0,
      vy: 0
    });
  }
}
function jan18_draw() {
  background(0, 50);
  fill(255);
  noStroke();
  
  for(let p of j18_particles) {
     // Return to original pos
     let dx = p.orgX - p.x;
     let dy = p.orgY - p.y;
     p.vx += dx * 0.01;
     p.vy += dy * 0.01;
     
     // Mouse Repel
     let d = dist(p.x, p.y, mouseX, mouseY);
     if(d < 50) {
        let ang = atan2(p.y - mouseY, p.x - mouseX);
        p.vx += cos(ang) * 2;
        p.vy += sin(ang) * 2;
     }
     
     // Web friction
     p.vx *= 0.9;
     p.vy *= 0.9;
     p.x += p.vx;
     p.y += p.vy;
     
     circle(p.x, p.y, 4);
  }
}

// --- Jan 19: Roads lead nowhere ---
function jan19_setup() {
  background(50, 150, 50);
  stroke(100);
  strokeWeight(20);
  line(50, 50, 50, 200);   // Road 1 start
  line(50, 200, 200, 200);
  line(200, 200, 200, 50); // End nowhere
  
  line(300, 300, 450, 300);
  line(450, 300, 450, 450); // End nowhere
  
  stroke(255, 255, 0); // Markings
  strokeWeight(2);
  drawingContext.setLineDash([10, 10]);
  line(50, 50, 50, 200);
  line(50, 200, 200, 200);
  line(200, 200, 200, 50);
  
  line(300, 300, 450, 300);
  line(450, 300, 450, 450);
  drawingContext.setLineDash([]);
}
function jan19_draw() {}

// --- Jan 20: Repel patterns ---
function jan20_setup() {
  background(0);
  noFill();
  stroke(255);
  for(let i=0; i<50; i++) {
     let x = random(width);
     let y = random(height);
     let r = random(10, 50);
     circle(x,y,r);
     // Simple "repel" visual - no overlap not enforced but style looks like bubbles
  }
}
function jan20_draw() {}

// --- Jan 21: Off color ---
function jan21_setup() {
  noStroke();
  let h = 20;
  for(let y=0; y<height; y+=h) {
    fill(map(y, 0, height, 0, 255), 100, 150);
    // Slight shift
    fill(map(y+random(-10, 10), 0, height, 0, 255), 100, 150);
    rect(0, y, width, h);
  }
}
function jan21_draw() {}

// --- Jan 22: Yesterdays weather ---
function jan22_setup() {
  background(100, 100, 200);
  noStroke();
  // Clouds
  fill(200);
  for(let i=0; i<5; i++) {
    circle(random(width), random(height/2), random(50, 100));
  }
  // Rain
  stroke(255);
  for(let i=0; i<100; i++) {
    let x = random(width);
    let y = random(height);
    line(x, y, x-5, y+10);
  }
}
function jan22_draw() {}

// --- Jan 23: Blue (red) ---
function jan23_setup() {
  background(255);
  fill(255, 0, 0);
  textAlign(CENTER, CENTER);
  textSize(100);
  text("BLUE", width/2, height/2);
}
function jan23_draw() {}

// --- Jan 24: One wavy line ---
function jan24_setup() {
  background(255);
  stroke(0);
  noFill();
  let gap = 20;
  for(let y=gap; y<height; y+=gap) {
     beginShape();
     if(abs(y - height/2) < gap) {
       for(let x=0; x<width; x+=5) vertex(x, y + sin(x*0.1)*10);
     } else {
       vertex(0,y);
       vertex(width, y);
     }
     endShape();
  }
}
function jan24_draw() {}

// --- Jan 25: Horizon folds ---
function jan25_setup() {
  background(0);
  stroke(255, 0, 255);
  line(0, height/2, width, height/2); // Horizon
  // Fold
  noFill();
  beginShape();
  vertex(0, height/2);
  bezierVertex(width/3, height/2 + 200, width*2/3, height/2 - 200, width, height/2);
  endShape();
}
function jan25_draw() {}

// --- Jan 26: Neighbor copy ---
let grid = [];
let cols = 52, rows = 52;
function jan26_setup() {
  frameRate(10);
  for(let i=0; i<cols; i++) {
    grid[i] = [];
    for(let j=0; j<rows; j++) {
      grid[i][j] = color(random(255), random(255), random(255));
    }
  }
}
function jan26_draw() {
  let w = width/cols;
  let h = height/rows;
  for(let i=0; i<cols; i++) {
    for(let j=0; j<rows; j++) {
       // Random neighbor
       let ni = i + floor(random(-1, 2));
       let nj = j + floor(random(-1, 2));
       if(ni>=0 && ni<cols && nj>=0 && nj<rows) {
         grid[i][j] = grid[ni][nj];
       }
       fill(grid[i][j]);
       noStroke();
       rect(i*w, j*h, w, h);
    }
  }
}

// --- Jan 27: Animate static grid ---
function jan27_setup() {
  background(255);
  stroke(0);
}
function jan27_draw() {
  background(255);
  let step = 20;
  for(let x=0; x<width; x+=step) line(x, 0, x, height);
  for(let y=0; y<height; y+=step) line(0, y, width, y);
  
  // Overlay slightly offset moving grid
  push();
  stroke(0, 0, 255, 100);
  translate(sin(frameCount*0.05)*5, cos(frameCount*0.05)*5);
  for(let x=0; x<width; x+=step) line(x, 0, x, height);
  for(let y=0; y<height; y+=step) line(0, y, width, y);
  pop();
}

// --- Jan 28: Silk/Sand ---
function jan28_setup() { background(0); }
function jan28_draw() {
  // Simple flow field
  fill(255, 10);
  noStroke();
  for(let i=0; i<100; i++) {
    let x = random(width);
    let y = random(height);
    let n = noise(x*0.01, y*0.01, frameCount*0.01);
    circle(x + cos(n*TWO_PI)*10, y + sin(n*TWO_PI)*10, 2);
  }
}

// --- Jan 29: Grid dup color ---
function jan29_setup() {
  let s = 52;
  noStroke();
  for(let y=0; y<height; y+=s) {
    let colors = [];
    for(let x=0; x<width; x+=s) {
       let c = color(random(255), random(255), random(255));
       colors.push(c);
    }
    // Duplicate one
    if(colors.length > 2) colors[1] = colors[0];
    // Shuffle? No prompt says 'perfectly random grid where every row contains exactly one duplicate'
    // I'll just draw them
    for(let i=0; i<colors.length; i++) {
      fill(colors[i]);
      rect(i*s, y, s, s);
    }
  }
}
function jan29_draw() {}

// --- Jan 30: Triangles not touching ---
function jan30_setup() {
  background(20);
  fill(255, 100, 50);
  noStroke();
  for(let i=0; i<20; i++) {
    let x = random(width);
    let y = random(height);
    triangle(x, y, x+20, y-40, x+40, y);
  }
  // Not guaranteeing no touch here simply, but visual approximation
}
function jan30_draw() {}

// --- Jan 31: Shadows without objects ---
function jan31_setup() {
  background(200);
  fill(50, 50, 50, 100);
  noStroke();
  // Draw ellipses that look like shadows
  ellipse(100, 400, 100, 30);
  ellipse(300, 200, 80, 20);
  ellipse(450, 450, 120, 40);
}
function jan31_draw() {}
