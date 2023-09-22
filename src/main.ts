import "./style.css";

const G = 6.674e-11; // gravitational constant
const halfSpace = 4500e9; // max distance from origin in meters
const density = 5520; // earth density in kg/m3
const dt = 86400; // one day in seconds

interface BodyProps {
  x: number;
  y: number;
  vx: number;
  vy: number;
  mass: number;
}

class Body {
  public x: number;
  public y: number;
  public vx: number;
  public vy: number;
  public mass: number;
  public radius: number;

  public nextX: number = 0;
  public nextY: number = 0;
  public nextVx: number = 0;
  public nextVy: number = 0;

  constructor({x, y, vx, vy, mass}: BodyProps) {
    this.x = x;
    this.y = y;
    this.vx = vx;
    this.vy = vy;
    this.mass = mass;
    this.radius = ((3 * this.mass) / (4 * Math.PI * density))**(1/3); // todo: have distinct densities
  }

  move() {
    this.x = this.nextX;
    this.y = this.nextY;
    this.vx = this.nextVx;
    this.vy = this.nextVy;
  }
}

// coordinates, velocities and masses of solar system objects when all planets are aligned
// (https://en.wikipedia.org/wiki/N-body_simulation#Common_Boilerplate_Code)
const bodies: Body[] = [
  new Body({ x: 0.0, y: 0.0,           vx: 0.0, vy: 0.0,       mass: 1.989e30    }), // a star similar to the sun
  new Body({ x: 57.909e9, y: 0.0,      vx: 0.0, vy: 47.36e3,   mass: 0.33011e24  }), // a planet similar to mercury
  new Body({ x: 108.209e9, y: 0.0,     vx: 0.0, vy: 35.02e3,   mass: 4.8675e24   }), // a planet similar to venus
  new Body({ x: 149.596e9, y: 0.0,     vx: 0.0, vy: 29.78e3,   mass: 5.9724e24   }), // a planet similar to earth
  new Body({ x: 227.923e9, y: 0.0,     vx: 0.0, vy: 24.07e3,   mass: 0.64171e24  }), // a planet similar to mars
  new Body({ x: 778.570e9, y: 0.0,     vx: 0.0, vy: 13e3,      mass: 1898.19e24  }), // a planet similar to jupiter
  new Body({ x: 1433.529e9, y: 0.0,    vx: 0.0, vy: 9.68e3,    mass: 568.34e24   }), // a planet similar to saturn
  new Body({ x: 2872.463e9, y: 0.0,    vx: 0.0, vy: 6.80e3,    mass: 86.813e24   }), // a planet similar to uranus
  new Body({ x: 4495.060e9, y: 0.0,    vx: 0.0, vy: 5.43e3,    mass: 102.413e24  }), // a planet similar to neptune
];

function computeMoves() {
  for (let t = 0, dtt = 10; t < dt; t += dtt) {
    for (let i = 0; i < bodies.length; i++) {
      const b1 = bodies[i];
      const force = [0, 0];

      // sum forces of all other bodies on this object under gravity
      for (let j = 0; j < bodies.length; j++) {
        if (i === j) {
          continue;
        }

        const b2 = bodies[j];
        const mag = (G * b1.mass * b2.mass) / ((b2.x - b1.x)**2 + (b2.y - b1.y)**2)**(3/2);
        force[0] += mag * (b2.x - b1.x);
        force[1] += mag * (b2.y - b1.y);
      }

      // assume force and thus acceleration are constant in this short interval
      const ax = force[0] / b1.mass;
      const ay = force[1] / b1.mass;

      // let new parameters of all bodies be computed before mutating them
      b1.nextX = b1.x + b1.vx * dtt + (0.5 * ax * dtt**2);
      b1.nextY = b1.y + b1.vy * dtt + (0.5 * ay * dtt**2);
      b1.nextVx = b1.vx + ax * dtt;
      b1.nextVy = b1.vy + ay * dtt;
    }

    for (let i = 0; i < bodies.length; i++) {
      bodies[i].move();
    }
  }
}

function draw(ctx: CanvasRenderingContext2D) {
  computeMoves();

  // this shows only moving bodies, without drawing orbits:
  // ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);

  // change of coordinates parameters
  const factor = Math.min(ctx.canvas.width, ctx.canvas.height) / (2 * halfSpace);
  const xOffset = ctx.canvas.width / 2;
  const yOffset = ctx.canvas.height / 2;

  ctx.fillStyle = "white";
  ctx.beginPath();

  for (let i = 0; i < bodies.length; i++) {
    const x = (bodies[i].x * factor) + xOffset;
    const y = (bodies[i].y * factor) + yOffset;
    const radius = Math.max(bodies[i].radius * factor, 0.5);

    ctx.moveTo(x + radius, y);
    ctx.arc(x, y, radius, 0, 2 * Math.PI, false);
  }

  ctx.fill();

  window.requestAnimationFrame(() => draw(ctx));
}

function resizeCanvas(canvas: HTMLCanvasElement) {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
}

function start() {
  const canvas = document.getElementById("canvas") as HTMLCanvasElement;
  const ctx = canvas.getContext("2d")!;

  resizeCanvas(canvas);

  window.addEventListener("resize", () => resizeCanvas(canvas));

  draw(ctx);
}


window.addEventListener("load", start);