// ==========================================================================
// CLASSIC GORGEOUS 3D RED HEART (VIBRANT VELVET RED, PERFECT CURVES)
// Zero text on heart, realistic lub-dub pumping with "aklu" floating out
// ==========================================================================

document.addEventListener('DOMContentLoaded', () => {
  const container = document.getElementById('webgl-container');
  const akluLayer = document.getElementById('aklu-burst-layer');

  // --- Three.js Scene Setup ---
  const scene = new THREE.Scene();

  const camera = new THREE.PerspectiveCamera(40, window.innerWidth / window.innerHeight, 0.1, 1000);
  camera.position.set(0, 0, 20);

  const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;
  renderer.outputEncoding = THREE.sRGBEncoding;
  container.appendChild(renderer.domElement);

  // OrbitControls for smooth 3D rotation
  const controls = new THREE.OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
  controls.enableZoom = false;
  controls.enablePan = false;
  controls.maxPolarAngle = Math.PI * 0.75;
  controls.minPolarAngle = Math.PI * 0.25;

  // --- Studio HD Environment Mapping for Glossy Reflections ---
  function createStudioEnvironmentMap() {
    const cubeRenderTarget = new THREE.WebGLCubeRenderTarget(256, {
      format: THREE.RGBAFormat,
      generateMipmaps: true,
      minFilter: THREE.LinearMipmapLinearFilter
    });
    const cubeCamera = new THREE.CubeCamera(0.1, 100, cubeRenderTarget);

    const envScene = new THREE.Scene();
    envScene.background = new THREE.Color(0xfff5f6);

    const softbox1 = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffffff })
    );
    softbox1.position.set(-14, 12, 8);
    softbox1.lookAt(0, 0, 0);
    envScene.add(softbox1);

    const softbox2 = new THREE.Mesh(
      new THREE.PlaneGeometry(16, 16),
      new THREE.MeshBasicMaterial({ color: 0xffccd5 })
    );
    softbox2.position.set(14, 8, -6);
    softbox2.lookAt(0, 0, 0);
    envScene.add(softbox2);

    cubeCamera.update(renderer, envScene);
    return cubeRenderTarget.texture;
  }

  const envMap = createStudioEnvironmentMap();
  scene.environment = envMap;

  // --- Lighting Setup for Rich Vibrant Red Highlights ---
  const ambientLight = new THREE.AmbientLight(0xfff0f2, 1.3);
  scene.add(ambientLight);

  // Front Key Light (Sharp Gloss Highlight)
  const keyLight = new THREE.DirectionalLight(0xffffff, 2.6);
  keyLight.position.set(6, 12, 14);
  scene.add(keyLight);

  // Deep Red Fill Light
  const fillLight = new THREE.DirectionalLight(0xff002b, 1.8);
  fillLight.position.set(-10, -6, 6);
  scene.add(fillLight);

  // Backlight for Edges
  const rimLight = new THREE.DirectionalLight(0xff4d6d, 2.2);
  rimLight.position.set(0, 14, -10);
  scene.add(rimLight);

  // Glowing Point Light inside heart
  const heartPointLight = new THREE.PointLight(0xff002b, 3.5, 25);
  heartPointLight.position.set(0, 0, 2);
  scene.add(heartPointLight);

  // ==========================================================================
  // PERFECT CLASSIC 2D HEART SILHOUETTE -> EXTRUDED WITH SMOOTH ROUNDED BEVEL
  // ==========================================================================
  const heartShape = new THREE.Shape();
  
  // Starting from the bottom tip
  heartShape.moveTo(0, -3.2);
  // Bottom tip smoothly curving outward to left bottom curve
  heartShape.bezierCurveTo(-1.8, -1.8, -4.6, 0.4, -4.6, 2.6);
  // Left lobe rounded arch
  heartShape.bezierCurveTo(-4.6, 4.8, -2.6, 5.8, -0.2, 4.3);
  // Dip down into center cleft
  heartShape.bezierCurveTo(0, 4.0, 0, 4.0, 0, 3.7);
  // Dip back up into right lobe
  heartShape.bezierCurveTo(0, 4.0, 0, 4.0, 0.2, 4.3);
  // Right lobe rounded arch
  heartShape.bezierCurveTo(2.6, 5.8, 4.6, 4.8, 4.6, 2.6);
  // Right side curving back down smoothly to the bottom tip
  heartShape.bezierCurveTo(4.6, 0.4, 1.8, -1.8, 0, -3.2);

  const extrudeSettings = {
    depth: 1.6,
    bevelEnabled: true,
    bevelSegments: 24, // Silky smooth bevel curves
    steps: 6,
    bevelSize: 1.35,   // Generous rounded pillow cushion
    bevelThickness: 1.35
  };

  const heartGeo = new THREE.ExtrudeGeometry(heartShape, extrudeSettings);
  heartGeo.center();
  heartGeo.scale(0.88, 0.88, 0.88);

  // --- Vibrant Passion Red Physical Material ---
  const heartRedMaterial = new THREE.MeshPhysicalMaterial({
    color: 0xee0022,        // Pure vibrant red
    emissive: 0x440008,     // Rich velvet glow
    emissiveIntensity: 0.35,
    roughness: 0.12,        // Wet, glossy candy reflection
    metalness: 0.05,
    clearcoat: 1.0,         // Lacquered automotive clear coat
    clearcoatRoughness: 0.06,
    transmission: 0.22,     // Subsurface crystal translucency
    ior: 1.54,
    reflectivity: 0.98,
    envMap: envMap,
    envMapIntensity: 1.4,
    transparent: true,
    opacity: 0.99
  });

  const heartMesh = new THREE.Mesh(heartGeo, heartRedMaterial);

  const heartGroup = new THREE.Group();
  heartGroup.add(heartMesh);
  scene.add(heartGroup);

  // --- Soft Red Contact Ground Shadow ---
  const shadowCanvas = document.createElement('canvas');
  shadowCanvas.width = 256;
  shadowCanvas.height = 256;
  const sCtx = shadowCanvas.getContext('2d');
  const sGrad = sCtx.createRadialGradient(128, 128, 0, 128, 128, 128);
  sGrad.addColorStop(0, 'rgba(238, 0, 34, 0.26)');
  sGrad.addColorStop(0.4, 'rgba(238, 0, 34, 0.09)');
  sGrad.addColorStop(1, 'rgba(255, 255, 255, 0)');
  sCtx.fillStyle = sGrad;
  sCtx.fillRect(0, 0, 256, 256);

  const shadowTex = new THREE.CanvasTexture(shadowCanvas);
  const shadowPlane = new THREE.Mesh(
    new THREE.PlaneGeometry(13, 13),
    new THREE.MeshBasicMaterial({
      map: shadowTex,
      transparent: true,
      depthWrite: false
    })
  );
  shadowPlane.rotation.x = -Math.PI / 2;
  shadowPlane.position.y = -5.8;
  scene.add(shadowPlane);

  // --- Ambient Floating Sparkles ---
  const pCount = 80;
  const pGeo = new THREE.BufferGeometry();
  const pPos = new Float32Array(pCount * 3);
  for (let i = 0; i < pCount * 3; i += 3) {
    pPos[i] = (Math.random() - 0.5) * 32;
    pPos[i + 1] = (Math.random() - 0.5) * 32;
    pPos[i + 2] = (Math.random() - 0.5) * 18;
  }
  pGeo.setAttribute('position', new THREE.BufferAttribute(pPos, 3));
  const pMat = new THREE.PointsMaterial({
    color: 0xff3366,
    size: 0.16,
    transparent: true,
    opacity: 0.55
  });
  scene.add(new THREE.Points(pGeo, pMat));

  // --- Emanating "aklu" on Heartbeat ---
  function spawnAklu() {
    if (!akluLayer) return;

    const count = Math.floor(Math.random() * 2) + 2;
    for (let i = 0; i < count; i++) {
      const el = document.createElement('span');
      el.className = 'emanating-aklu';
      el.textContent = 'aklu';

      const angle = Math.random() * Math.PI * 2;
      const dist = 110 + Math.random() * 150;
      const dx = Math.cos(angle) * dist;
      const dy = Math.sin(angle) * dist - 35;
      const scale = 1.1 + Math.random() * 0.7;
      const fontSize = 1.6 + Math.random() * 1.0;

      el.style.setProperty('--dx', `${dx}px`);
      el.style.setProperty('--dy', `${dy}px`);
      el.style.setProperty('--scale', scale);
      el.style.fontSize = `${fontSize}rem`;

      const rot = (Math.random() - 0.5) * 28;
      el.style.transform = `translate(-50%, -50%) rotate(${rot}deg)`;

      akluLayer.appendChild(el);

      setTimeout(() => {
        el.remove();
      }, 1800);
    }
  }

  // --- Realistic Lub-Dub Heartbeat Animation ---
  let time = 0;
  let lastBeatTime = 0;

  function animate() {
    requestAnimationFrame(animate);

    time += 0.033;

    // Anatomical lub-dub pulse
    const cycle = (time * 1.45) % (Math.PI * 2);
    let pulse = 0;

    if (cycle < 0.6) {
      pulse = Math.sin((cycle / 0.6) * Math.PI) * 0.22; // lub
    } else if (cycle > 0.8 && cycle < 1.4) {
      pulse = Math.sin(((cycle - 0.8) / 0.6) * Math.PI) * 0.14; // dub
    }

    // Trigger floating "aklu" at contraction peak
    if (cycle > 0.15 && cycle < 0.35) {
      const now = Date.now();
      if (now - lastBeatTime > 900) {
        lastBeatTime = now;
        spawnAklu();
      }
    }

    const currentScale = 1 + pulse;
    heartGroup.scale.set(currentScale, currentScale, currentScale);

    // Pulse lights and shadow
    heartPointLight.intensity = 3.0 + pulse * 6.0;
    heartRedMaterial.emissiveIntensity = 0.3 + pulse * 0.5;
    shadowPlane.scale.set(1 + pulse * 0.35, 1 + pulse * 0.35, 1);

    // Smooth continuous 3D rotation
    heartGroup.rotation.y += 0.013;
    heartGroup.rotation.x = Math.sin(time * 0.4) * 0.06;

    controls.update();
    renderer.render(scene, camera);
  }

  animate();

  // Resize handler
  window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
  });

  // Tap anywhere to beat
  window.addEventListener('pointerdown', (e) => {
    if (e.target.closest('#musicPill')) return;
    spawnAklu();
  });

  // --- Music Controller ---
  const bgAudio = document.getElementById('bg-audio');
  const musicPill = document.getElementById('musicPill');
  const playIcon = document.getElementById('playIcon');
  const musicStatus = document.getElementById('musicStatus');
  let isPlaying = false;

  function toggleMusic() {
    if (!isPlaying) {
      bgAudio.volume = 0.55;
      bgAudio.play().then(() => {
        isPlaying = true;
        playIcon.className = 'fa-solid fa-pause';
        musicStatus.textContent = 'Now Playing';
      }).catch(() => {});
    } else {
      bgAudio.pause();
      isPlaying = false;
      playIcon.className = 'fa-solid fa-play';
      musicStatus.textContent = 'Tap to Play';
    }
  }

  musicPill.addEventListener('click', toggleMusic);
});
