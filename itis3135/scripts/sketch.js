// Interactive Perlin Noise Field sketch
// Based on examples from p5.js website

let particles = [];
const num = 100;

// Particle class
class Particle {
    constructor() {
      this.pos = createVector(random(width), random(height));
      this.vel = createVector(0, 0);
      this.acc = createVector(0, 0);
      this.maxSpeed = 2;
      this.color = color(random(100, 255), random(100, 255), random(100, 255));
    }
    
    update() {
      // Get noise value based on position and time
      let angle = noise(this.pos.x * 0.003, this.pos.y * 0.003, frameCount * 0.005) * TWO_PI * 2;
      
      // Create acceleration from angle
      this.acc.x = cos(angle) * 0.1;
      this.acc.y = sin(angle) * 0.1;
      
      // Apply acceleration to velocity
      this.vel.add(this.acc);
      this.vel.limit(this.maxSpeed);
      
      // Apply velocity to position
      this.pos.add(this.vel);
      
      // Wrap around edges
      if (this.pos.x < 0) this.pos.x = width;
      if (this.pos.x > width) this.pos.x = 0;
      if (this.pos.y < 0) this.pos.y = height;
      if (this.pos.y > height) this.pos.y = 0;
    }
    
    display() {
      // Draw particle
      noStroke();
      fill(this.color);
      
      // Use mouse position to influence size
      let distance = dist(mouseX, mouseY, this.pos.x, this.pos.y);
      let size = map(distance, 0, 200, 8, 2);
      size = constrain(size, 2, 8);
      
      ellipse(this.pos.x, this.pos.y, size, size);
    }
  }
  
// Setup function runs once when the program starts
function setup() {
  // Create canvas inside the container div
  let canvas = createCanvas(720, 400);
  canvas.parent('canvas-container');
  
  // Create particles
  for (let i = 0; i < num; i++) {
    particles.push(new Particle());
  }
  
  // Set background color
  background(51);
}

// Draw function runs continuously
function draw() {
  // Semi-transparent background for trail effect
  background(51, 10);
  
  // Update and display all particles
  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].display();
  }
}


// Add mouse interaction
function mouseMoved() {
  // Add a new particle at mouse position when mouse moves
  if (frameCount % 5 === 0 && mouseX > 0 && mouseX < width && mouseY > 0 && mouseY < height) {
    let p = new Particle();
    p.pos = createVector(mouseX, mouseY);
    particles.push(p);
    
    // Remove oldest particle if we have too many
    if (particles.length > num) {
      particles.splice(0, 1);
    }
  }
}