let myCube     = Cube();
let myCylinder = Cylinder(20);
let mySphere   = Sphere(20);
    

class Mover {
    constructor(x, y, z, velx, vely, velz, m) {
        let accel = 1;
        accel *= 1 / vel.value;
        
        this.pos = { x: x, y: y, z: z };
        this.vel = { x: velx, y: vely, z: velz };
        this.acc = { x: accel, y: accel, z: accel };
        this.mass = m;
        this.r = Math.sqrt(this.mass) * 2;
    }

    attract(mover) {
        const force = { x: this.pos.x - mover.pos.x, y: this.pos.y - mover.pos.y, z: this.pos.z - mover.pos.z };
        const d = Math.max(2, Math.min(Math.sqrt(force.x * force.x + force.y * force.y + force.z * force.z), 25));
        const G = 10;
        const strength = (G * this.mass * mover.mass) / (d * d);
        const magnitude = Math.sqrt(force.x * force.x + force.y * force.y + force.z * force.z);
        force.x = (force.x / magnitude) * strength;
        force.y = (force.y / magnitude) * strength;
        force.z = (force.z / magnitude) * strength;
        mover.applyForce(force);
    }

    ring() {
        let particleColor = document.getElementById("particleColor").value;
        let thickness = this.mass / 2; // Particle thickness driven by mass
        let polarDiameter = document.getElementById("polarDiameter").value; // Polar coordinate diameter

        if (circleOn) {
            let numCircles = 12; // Number of circles for the polar coordinate
            for (let i = 0; i < numCircles; i++) { // number of circles for recursive effect
                const rad = this.mass * polarDiameter / 10;
                let angleOffset = (i / numCircles) * Math.PI * 2;
                let cx = this.pos.x + rad * Math.cos(angle + angleOffset);
                let cy = this.pos.y + rad * Math.sin(angle + angleOffset);
                let cz = this.pos.z + rad * Math.sin(angle + angleOffset);

                M.S().move(cx,cy,cz).turnX(time).scale(.01).draw(mySphere ,[.2,.2,.2]).R(); //draw sphere
       
                //draw circle with color
            }
        } else {
            let cx = this.pos.x;
            let cy = this.pos.y;
            let cz = this.pos.z;

            M.S().move(cx,cy,cz).turnX(time).scale(.01).draw(myCube ,[.2,.2,.2]).R(); //draw sphere
       
            //draw cube
        }

        angle += 0.01; // Angle speed change
    }

    applyForce(force) {
        const f = { x: force.x / this.mass, y: force.y / this.mass, z: force.z / this.mass };
        this.acc.x += f.x;
        this.acc.y += f.y;
        this.acc.z += f.z;
    }

    update() {
        this.vel.x += this.acc.x;
        this.vel.y += this.acc.y;
        this.vel.z += this.acc.z;
        this.pos.x += this.vel.x;
        this.pos.y += this.vel.y;
        this.pos.z += this.vel.z;
        this.acc.x = 0;
        this.acc.y = 0;
        this.acc.z = 0;
    }

    show() {
        //let particleColor = document.getElementById("particleColor").value;

        M.S().move(this.x,this.y,this.z).turnX(time).scale(.01).draw(mySphere ,[.2,.2,.2]).R(); //draw sphere
       
        /*
        ctx.beginPath();
        ctx.arc(this.pos.x, this.pos.y, this.r*mass.value/15, 0, 2 * Math.PI);
        ctx.fillStyle = particleColor;
        ctx.fill();*/
    }
}