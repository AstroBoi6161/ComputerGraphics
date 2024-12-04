let fragmentShader = `
   precision mediump float;

   uniform float uTime;
   uniform vec3  uCursor;
   varying vec3  vPos;
   varying vec2  uResolution;

   const float fl = 3.;
   const float air = 1.0;
   const float diamond = 1.5;


   //  noise function provided by Dr. Perlin  //
   float noise(vec3 point) { float r = 0.; for (int i=0;i<16;i++) {
     vec3 D, p = point + mod(vec3(i,i/4,i/8) , vec3(4.0,2.0,2.0)) +
          1.7*sin(vec3(i,5*i,8*i)), C=floor(p), P=p-C-.5, A=abs(P);
     C += mod(C.x+C.y+C.z,2.) * step(max(A.yzx,A.zxy),A) * sign(P);
     D=34.*sin(987.*float(i)+876.*C+76.*C.yzx+765.*C.zxy);P=p-C-.5;
     r+=sin(6.3*dot(P,fract(D)-.5))*pow(max(0.,1.-2.*dot(P,P)),4.);
   } return .5 * sin(r); }




   void main(void) {
      vec4 S = vec4(uCursor.xy,0.,.5);
      vec3 color = vec3(0.,0.,.1);

      vec3 V = vec3(0.,0.,fl);
      vec3 W = normalize(vec3(vPos.xy,-fl));

      vec3 C = S.xyz;
      float r = S.w;

      vec3 Vp = V - C;

      float b = dot(Vp,W);
      float c = dot(Vp,Vp) - r*r;

      float d = b*b - c;
      if (d > 0.) {
         float t = -b - sqrt(d);
	 vec3 P = V + t * W;
	 vec3 N = (P - C) / r;
         color = vec3(.1 + max(0., dot(N, vec3(.5))));;

	 // EARLIER EXAMPLE: SHIFTING NOISE POSITION OVER TIME

//       color *= .5 + noise(10. * vPos - vec3(uTime,0.,0.));

	 // FIRST CREATE A FRACTAL-LIKE NOISE TEXTURE

	 float v = noise( 1. * vPos) / 1.;
	 v      += noise( 2. * vPos) / 2.;
	 v      += noise( 4. * vPos) / 4.;
	 v      += noise( 8. * vPos) / 8.;
	 v      += noise(16. * vPos) / 16.;
	 v      += noise(32. * vPos) / 32.;

	 // THEN USE THAT TEXTURE TO DISPLACE STRIPES

	 float s = .5 + .5 * sin(30. * vPos.x + 5. * v);

     // FINALLY, ADD COLOR VARIATION

	 color *= vec3(s,s*s,s*s*s);
      }

      gl_FragColor = vec4(sqrt(color), 1.);
   }
`;
