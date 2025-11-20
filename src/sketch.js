// eric hubert

function keyPressed() {
  if (key === " " || key === "Spacebar") {
    // Save as SVG
    saveCanvas("mon_fractal", "svg");
  }
  if (key.toLowerCase() === "f") {
    saveCanvas("mon_fractal", "png");
  }
  // Show instructions again after saving
  showInstructions = true;
}

function setup() {
  createCanvas(520, 520);
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
