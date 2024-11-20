// matrix.js
// Late homework, so more so review

//Translation Matrix
//let mTranslate = (x,y,z, m) => matrixMultiply(m, [1,0,0,0, 0,1,0,0, 0,0,1,0, x,y,z,1]);
function mTranslation(x, y, z, m) {
    return [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        x, y, z, 1 //homogenius coord. for translation?
    ];
}

// let mRotateX = (t, m) => matrixMultiply(m, [1,0,0,0, 0,C(t),S(t),0, 0,-S(t),C(t),0, 0,0,0,1]);
// Notes: t = theta, rotation in radians. m = matrix to multiply
// Snipped from week 5 Homework Example
function mRotationX(t,m) {
    let c = Math.cos(t);
    let s = Math.sin(t);
    return [
        1, 0, 0, 0,
        0, c, -s, 0,
        0, s, c, 0,
        0, 0, 0, 1
    ];
}

// Function to create a rotation matrix around the Y axis
function rotationY(t) {
    let c = Math.cos(t);
    let s = Math.sin(t);
    return [
        c, 0, s, 0,
        0, 1, 0, 0,
        -s, 0, c, 0,
        0, 0, 0, 1
    ];
}

// Function to create a rotation matrix around the Z axis
function rotationZ(t) {
    let c = Math.cos(t);
    let s = Math.sin(t);
    return [
        c, -s, 0, 0,
        s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ];
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

// Function to multiply two matrices
function multiply(a, b) {
    let c = [];
    for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
            c[i * 4 + j] = 0;
            for (let k = 0; k < 4; k++) {
                c[i * 4 + j] += a[i * 4 + k] * b[k * 4 + j];
            }
        }
    }
    return c;
}

// Function to transpose a matrix
function transpose(m) {
    return [
        m[0], m[4], m[8], m[12],
        m[1], m[5], m[9], m[13],
        m[2], m[6], m[10], m[14],
        m[3], m[7], m[11], m[15]
    ];
}

// Function to calculate the inverse of a matrix
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

// Export the functions
export { translation, rotationX, rotationY, rotationZ, scale, multiply, transpose, matrixInverse };

