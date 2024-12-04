// matrix.js
// Working on top of the provided materials, late submission

let matrixMultiply = (a, b) => {
    let dst = [];
    for (let n = 0 ; n < 16 ; n++)
       dst.push(a[n&3]*b[n&12] + a[n&3|4]*b[n&12|1] + a[n&3|8]*b[n&12|2] + a[n&3|12]*b[n&12|3]);
    return dst;
}

// Function to multiply two matrices - implemented
function multiply(a, b) {
    let newMatrix = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            newMatrix[i * 4 + j] = 0;
            for (let k = 0; k < 4; k++) {
                newMatrix[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
            }
        }
    }
    return newMatrix;
}

//Translation Matrix
//let mTranslate = (x,y,z, m) => matrixMultiply(m, [1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1]);
function mTranslate(x, y, z, m) {
    return matrixMultiply(m, 
        [
            1, 0, 0, 0,
            0, 1, 0, 0,
            0, 0, 1, 0,
            x, y, z, 1

        ]
    );
}


// let mRotateX = (t, m) => matrixMultiply(m, [1,0,0,0, 0,C(t),S(t),0, 0,-S(t),C(t),0, 0,0,0,1]);
// Notes: t = theta, rotation in radians. m = matrix to multiply
// Snipped from week 7 Homework Example
// expecting t as rotation angle here
function mRotateX(t,m) {
    let c = Math.cos(t);
    let s = Math.sin(t);
    return matrixMultiply(m, 
        [
            1, 0, 0, 0,
            0, c, s, 0,
            0, -s, c, 0,
            0, 0, 0, 1

        ]
    );
}



/*
Multiple Function:
let dst = [];
for (let n = 0 ; n < 16 ; n++)
    dst.push(a[n&3]*b[n&12] + a[n&3|4]*b[n&12|1] + a[n&3|8]*b[n&12|2] + a[n&3|12]*b[n&12|3]);
 return dst;
 */
//let mRotateY = (t, m) =>
    //matrixMultiply(m, [C(t),0,-S(t),0, 0,1,0,0, S(t),0,C(t),0, 0,0,0,1]);
function mRotateY(t,m) {
    let c = Math.cos(t);
    let s = Math.sin(t);
    return matrixMultiply(m, 
        [
            c, 0, s, 0,
            0, 1, 0, 0,
            s, 0, c, 0,
            0, 0, 0, 1
        ]
    );
}

// let mRotateZ = (t, m) => matrixMultiply(m, [C(t),S(t),0,0, -S(t),C(t),0,0, 0,0,1,0, 0,0,0,1]);
function mRotateZ(t,m) {
    let c = Math.cos(t);
    let s = Math.sin(t);
    return matrixMultiply(m, 
        [
            c, s, 0, 0,
            -s, c, 0, 0,
            0, 0, 1, 0,
            0, 0, 0, 1
        ]
    );
}

// Function to create a scaling matrix
function scale(x, y, z) {
    return [
        x, 0, 0, 0,
        0, y, 0, 0,
        0, 0, z, 0,
        0, 0, 0, 1
    ];
}



// Function to transpose 4 x 4 matrix
function transpose(m) {
    return [
        m[0], m[4], m[8], m[12],
        m[1], m[5], m[9], m[13],
        m[2], m[6], m[10], m[14],
        m[3], m[7], m[11], m[15]
    ];
}

// Matrix library from Dr. Perlin's library
function matrixInverse(src) {
    let dst = [], det = 0, cofactor = (c, r) => {
        let s = (i, j) => src[c + i & 3 | (r + j & 3) << 2];
        return (c + r & 1 ? -1 : 1) * ((s(1, 1) * (s(2, 2) * s(3, 3) - s(3, 2) * s(2, 3)))
            - (s(2, 1) * (s(1, 2) * s(3, 3) - s(3, 2) * s(1, 3)))
            + (s(3, 1) * (s(1, 2) * s(2, 3) - s(2, 2) * s(1, 3))));
    }
    for (let n = 0; n < 16; n++) dst.push(cofactor(n >> 2, n & 3));
    for (let n = 0; n < 4; n++) det += src[n] * dst[n << 2];
    for (let n = 0; n < 16; n++) dst[n] /= det;
    return dst;
}

//Also provided by Dr Perlin's sketch
let mIdentity = () => ([1,0,0,0, 0,1,0,0, 0,0,1,0, 0,0,0,1]);
let mPerspective = (fl, m) => matrixMultiply(m, [1,0,0,0, 0,1,0,0, 0,0,1,-1/fl, 0,0,0,1]);
let iMatrix = mIdentity();

export { mTranslate, matrixMultiply, mRotateX, mRotateY, mRotateZ, scale, multiply, transpose, matrixInverse, iMatrix, mPerspective};


// MATRIX OBJECT, BUILT FROM MATRIX FUNXTIONS
//From Dr. Perlin's library
/*
function Matrix() {
   let stack = [mIdentity()], top = 0;
   let set = arg => { stack[top] = arg; return this; }
   let get = () => stack[top];

   this.identity = () => set(mIdentity());
   this.perspective = fl => set(mPerspective(fl, get()));
   this.rotateX = t => set(mRotateX(t, get()));
   this.rotateY = t => set(mRotateY(t, get()));
   this.rotateZ = t => set(mRotateZ(t, get()));
   this.scale = (x,y,z) => set(mScale(x,y,z, get()));
   this.translate = (x,y,z) => set(mTranslate(x,y,z, get()));
   this.get = () => get();
   this.save = () => set(stack[top++].slice());
   this.restore = () => --top;
}
   */