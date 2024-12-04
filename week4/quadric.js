// quadric.js

// Define a 4x4 matrix for a sphere
const sphere = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -1
];

// Define a 4x4 matrix for an x-paraboloid
const xParaboloid = [
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    1, 0, 0, 0
];

// Define a 4x4 matrix for a y-paraboloid
const yParaboloid = [
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 1, 0, 0
];

// Define a 4x4 matrix for a z-paraboloid
const zParaboloid = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 1, 0
];

// Define a 4x4 matrix for an x-slab
const xSlab = [
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -1
];

// Define a 4x4 matrix for a y-slab
const ySlab = [
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -1
];

// Define a 4x4 matrix for a z-slab
const zSlab = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -1
];

// Define a 4x4 matrix for an x-cylinder
const xCylinder = [
    0, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -1
];

// Define a 4x4 matrix for a y-cylinder
const yCylinder = [
    1, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 1, 0,
    0, 0, 0, -1
];

// Define a 4x4 matrix for a z-cylinder
const zCylinder = [
    1, 0, 0, 0,
    0, 1, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -1
];

// Define a 4x4 matrix for an everywhere quadric
const everywhere = [
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, 0,
    0, 0, 0, -1
];

// Export the matrices
//export { sphere, xParaboloid, yParaboloid, zParaboloid, xSlab, ySlab, zSlab, xCylinder, yCylinder, zCylinder, everywhere };
