import * as THREE from './vendor/three.module.min.js';

const BRAIN_MODEL_URL = './assets/brain/BrainUVs.obj';
const BRAIN_XRAY_TEXTURE_URL = './assets/brain/brainXRayLight.png';
const BRAIN_SKY_COLOR = '#f0f0f0';
const BRAIN_FOG_COLOR = '#f0f0f0';
const BRAIN_PARTICLE_COLOR = '#17100b';
const BRAIN_SURFACE_COLOR = '#17100b';
const BRAIN_REGION_LIGHT_BASE = 1.72;
const BRAIN_REGION_LIGHT_VARIANCE = 0.15;
const BRAIN_RIDGE_COLOR = BRAIN_PARTICLE_COLOR;
const BRAIN_RIDGE_OPACITY = 0.62;
const BRAIN_AUTO_ROTATION_SPEED = 0.24;
const BRAIN_MAX_REGION_LIGHTS = 5;
const BRAIN_INTRO_DURATION = 2.4;
const BRAIN_OVERLAY_INTRO_THRESHOLD = 0.98;

const MODE_DETAILS = {
model: {
number: '01',
title: 'Model',
description: 'Before solving, name the inputs, state, rules, limits, and assumptions.',
questions: [
    '"What are the parts?"',
    '"What can change, and what has to stay fixed?"',
    '"What assumption has not been checked?"',
    '"Where does the input come from?"',
    '"What state exists before and after this step?"',
    '"What breaks first when the load doubles?"',
],
region: 'analytic cortex',
color: '#ff453a',
groups: ['analytic'],
point: [-0.2, 0.42, 0.56],
},
create: {
number: '02',
title: 'Create',
description: 'Try options that solve the problem in different ways.',
questions: [
    '"What is the smallest version worth trying?"',
    '"What option wins when speed matters most?"',
    '"What option wins when mistakes are expensive?"',
    '"Can a step be removed instead of improved?"',
    '"What is the ugly but useful option?"',
    '"What would a user do by hand today?"',
],
region: 'semantic association field',
color: '#ff8e0a',
groups: ['semantic_left', 'semantic_right'],
point: [0.26, 0.24, 0.72],
},
diagnose: {
number: '03',
title: 'Diagnose',
description: 'Start with the symptom. Then ask what would prove each cause wrong.',
questions: [
    '"What changed right before the issue started?"',
    '"Which log line proves the failure path?"',
    '"What would prove this theory wrong?"',
    '"Can the issue be reproduced with one small case?"',
    '"Which dependency, cache, or queue is involved?"',
    '"What is the first bad value in the trace?"',
],
region: 'process trace channel',
color: '#2f7cff',
groups: ['process_left'],
point: [-0.46, -0.06, 0.66],
},
verify: {
number: '04',
title: 'Verify',
description: 'Check the claims that matter. If something is a guess, say so.',
questions: [
    '"What source says this, exactly?"',
    '"Can this be checked with a test, log, or doc?"',
    '"What remains untested?"',
    '"Does this pass on the slow path too?"',
    '"What happens with empty, huge, or weird input?"',
    '"Which claim should be marked as uncertain?"',
],
region: 'process checking loop',
color: '#20e6c8',
groups: ['process_right'],
point: [0.45, -0.17, 0.66],
},
evaluate: {
number: '05',
title: 'Evaluate',
description: 'Compare what can go right, what can go wrong, and what each option costs.',
questions: [
    '"What does this cost to build?"',
    '"What does this cost to maintain?"',
    '"Which option helps the user fastest?"',
    '"What risk comes from saying yes?"',
    '"What risk comes from saying no?"',
    '"What evidence would change this score?"',
],
region: 'analytic bridge',
color: '#d06dff',
groups: ['bridge', 'analytic'],
point: [0.02, 0.02, 0.8],
},
decide: {
number: '06',
title: 'Decide',
description: 'Choose a path. Name the cost. Say what would change your mind.',
questions: [
    '"Which choice are we making?"',
    '"What cost are we accepting?"',
    '"What can wait until later?"',
    '"What step cannot be undone?"',
    '"Who needs to know before we move?"',
    '"What would make us change this call?"',
],
region: 'affective gate',
    color: '#ff3e8f',
groups: ['affective', 'amygdala'],
point: [0.22, 0.52, 0.6],
},
taste: {
number: '07',
title: 'Taste',
description: 'Ask if the work feels right for the people who will use it.',
questions: [
    '"What feels off before the reason is clear?"',
    '"Where is the page too loud?"',
    '"Where is the page too quiet?"',
    '"Does the motion match the job?"',
    '"Would this still look good with real content?"',
    '"What detail should be removed first?"',
],
region: 'episodic surface memory',
color: '#ffd23f',
groups: ['episodic_left', 'episodic_right'],
point: [0.36, -0.45, 0.64],
},
synthesize: {
number: '08',
title: 'Synthesize',
description: 'Put the pieces together. Do not make weak parts sound strong.',
questions: [
    '"What is the main line?"',
    '"Which pieces support it?"',
    '"Which parts weaken it?"',
    '"Which distinction still matters?"',
    '"What can be merged or dropped?"',
    '"What shape makes this useful?"',
],
region: 'semantic integration tract',
    color: '#2fd66f',
groups: ['semantic_left'],
point: [-0.3, -0.38, 0.62],
},
};

const EXAMPLE_DETAILS = {
    product: {
        title: 'Product feature',
        description: 'A feature idea usually starts as a vague feeling. Overthink turns it into a user, a promise, a few ways it can fail, and one next build.',
        chain: [
            { mode: 'model', note: 'Name the user, the promise, the limits, and the obvious ways it can fail.' },
            { mode: 'create', note: 'Try a few versions before choosing one.' },
            { mode: 'evaluate', note: 'Ask which one helps fastest without trapping you later.' },
            { mode: 'decide', note: 'Pick the smallest build that still counts.' },
            { mode: 'synthesize', note: 'Leave behind the reason, the cost, and the open questions.' },
        ],
    },
    research: {
        title: 'Research',
        description: 'A confident answer is easy. Check the sources and say what the evidence supports.',
        chain: [
            { mode: 'verify', note: 'Check the source before trusting the claim.' },
            { mode: 'model', note: 'Separate the claim, the evidence, and the gap between them.' },
            { mode: 'evaluate', note: 'Decide what the evidence is strong enough to support.' },
            { mode: 'synthesize', note: 'Answer plainly. Leave the weak spots visible.' },
        ],
    },
    logo: {
        title: 'Logo design',
        description: 'A logo can look good once and still fail in real use. Test it small, cropped, ugly, and next to other logos.',
        chain: [
            { mode: 'create', note: 'Make directions that do not all use the same trick.' },
            { mode: 'taste', note: 'Look for a version that is clear, memorable, and not too loud.' },
            { mode: 'evaluate', note: 'Test it small, cropped, one-color, and next to competitors.' },
            { mode: 'synthesize', note: 'Explain why this mark, not just why it looks nice.' },
        ],
    },
    business: {
        title: 'Business decision',
        description: 'Business decisions are mostly hard choices. Name the cost before making the call.',
        chain: [
            { mode: 'model', note: 'Name the options, limits, costs, and people affected.' },
            { mode: 'evaluate', note: 'Ask what the decision has to protect.' },
            { mode: 'decide', note: 'Commit to the move and the cost.' },
            { mode: 'synthesize', note: 'Leave behind the decision, the reason, and what to watch.' },
        ],
    },
};

const normalizeModeIds = (modeInput) => {
    const ids = Array.isArray(modeInput) ? modeInput : [modeInput];
    const seen = new Set();
    const normalized = ids.filter((modeId) => {
        if (!MODE_DETAILS[modeId] || seen.has(modeId)) return false;
        seen.add(modeId);
        return true;
    });

    return normalized.length ? normalized : ['model'];
};

const keepMobileControlVisible = (control) => {
    if (!control) return;
    if (!window.matchMedia('(max-width: 680px)').matches) return;
    control.scrollIntoView({ block: 'nearest', inline: 'center', behavior: 'smooth' });
};

const getColorForModes = (modes, elapsed = 0, reducedMotion = false) => {
    if (!modes.length) return new THREE.Color(BRAIN_PARTICLE_COLOR);

    if (modes.length === 1) {
        return new THREE.Color(modes[0].color);
    }

    if (reducedMotion) {
        const mixed = modes.reduce((color, mode) => color.add(new THREE.Color(mode.color)), new THREE.Color());
        return mixed.multiplyScalar(1 / modes.length);
    }

    const cycle = (elapsed * 0.48) % modes.length;
    const fromIndex = Math.floor(cycle);
    const toIndex = (fromIndex + 1) % modes.length;
    const localProgress = cycle - fromIndex;
    const eased = localProgress * localProgress * (3 - 2 * localProgress);

    return new THREE.Color(modes[fromIndex].color).lerp(new THREE.Color(modes[toIndex].color), eased);
};

const BASE_GROUP_COLORS = {
    brainstem: '#1c2635',
    cerebellum: '#172130',
    bridge: '#101a2a',
    amygdala: '#1c1320',
};

const modeShowcase = document.querySelector('[data-mode-showcase]');
const examplesShowcase = document.querySelector('[data-examples-showcase]');
const sharedBrain = modeShowcase ? createBrainScene(modeShowcase) : null;

if (modeShowcase) {
    initModeShowcase(modeShowcase, sharedBrain);
}

if (examplesShowcase) {
    initExamplesShowcase(examplesShowcase, sharedBrain);
}

if (sharedBrain?.stage) {
    initSharedBrainTravel(sharedBrain);
}

function initModeShowcase(showcase, brain) {
    const controls = Array.from(showcase.querySelectorAll('.mode-list-button[data-mode]'));
    const readout = {
        title: showcase.querySelector('[data-mode-title]'),
        description: showcase.querySelector('[data-mode-description]'),
        questions: showcase.querySelector('[data-mode-questions]'),
    };

    const setActiveMode = (modeId) => {
        const mode = MODE_DETAILS[modeId];
        if (!mode) return;

        showcase.dataset.activeMode = modeId;
        showcase.style.setProperty('--active-mode-color', mode.color);

        controls.forEach((control) => {
            const isActive = control.dataset.mode === modeId;
            control.classList.toggle('is-active', isActive);
            control.setAttribute('aria-pressed', String(isActive));
        });

        readout.title.textContent = mode.title;
        readout.description.textContent = mode.description;

        if (readout.questions && mode.questions) {
            readout.questions.innerHTML = [
                ...mode.questions,
                'then ask why.',
            ].map(q => `<li>${q}</li>`).join('');
        }

        brain?.setActive(modeId);
    };

    const activateMode = (control) => {
        setActiveMode(control.dataset.mode);
        keepMobileControlVisible(control);
    };

    controls.forEach((control) => {
        control.addEventListener('click', () => activateMode(control));
        control.addEventListener('mouseenter', () => activateMode(control));
        control.addEventListener('focus', () => activateMode(control));
    });

    document.addEventListener('brain-slot-change', (event) => {
        if (event.detail?.slot === 'modes') {
            setActiveMode(showcase.dataset.activeMode || 'model');
        }
    });

    setActiveMode('model');
}

function initExamplesShowcase(showcase, brain) {
    const options = Array.from(showcase.querySelectorAll('[data-example-target]'));
    const readout = {
        panel: showcase.querySelector('#example-readout'),
        title: showcase.querySelector('[data-example-title]'),
        description: showcase.querySelector('[data-example-description]'),
        chain: showcase.querySelector('[data-example-chain]'),
    };
    let activeExampleId = '';

    const activateExampleChain = () => {
        const example = EXAMPLE_DETAILS[activeExampleId];
        if (!example) return;

        const modeIds = example.chain.map((step) => step.mode).filter((modeId) => MODE_DETAILS[modeId]);
        if (!modeIds.length) return;

        showcase.dataset.activeMode = modeIds.join(' ');
        showcase.style.setProperty('--active-mode-color', MODE_DETAILS[modeIds[0]].color);
        brain?.setActive(modeIds);

        readout.chain?.querySelectorAll('[data-chain-mode]').forEach((step) => {
            step.classList.add('is-active');
        });
    };

    const renderChain = (example) => {
        if (!readout.chain) return;

        readout.chain.replaceChildren(...example.chain.map((step) => {
            const mode = MODE_DETAILS[step.mode];
            const item = document.createElement('li');
            const button = document.createElement('button');
            const name = document.createElement('span');
            const note = document.createElement('span');

            button.type = 'button';
            button.className = 'example-chain-step';
            button.dataset.chainMode = step.mode;
            button.style.setProperty('--mode-color', mode?.color || '#17100b');
            name.className = 'example-chain-name';
            note.className = 'example-chain-note';
            name.textContent = mode?.title || step.mode;
            note.textContent = step.note;

            button.append(name, note);
            button.addEventListener('pointerenter', activateExampleChain);
            button.addEventListener('focus', activateExampleChain);
            button.addEventListener('click', activateExampleChain);

            item.append(button);
            return item;
        }));
    };

    const activateExample = (id) => {
        const example = EXAMPLE_DETAILS[id];
        if (!example) return;

        activeExampleId = id;

        options.forEach((option) => {
            const isActive = option.dataset.exampleTarget === id;
            option.classList.toggle('is-active', isActive);
            option.setAttribute('aria-selected', String(isActive));
            option.tabIndex = isActive ? 0 : -1;

            if (isActive && readout.panel) {
                readout.panel.setAttribute('aria-labelledby', option.id);
            }
        });

        readout.title.textContent = example.title;
        readout.description.textContent = example.description;
        renderChain(example);
        activateExampleChain();
        keepMobileControlVisible(options.find((option) => option.dataset.exampleTarget === id));
    };

    options.forEach((option) => {
        const id = option.dataset.exampleTarget;
        option.addEventListener('pointerenter', () => activateExample(id));
        option.addEventListener('focus', () => activateExample(id));
        option.addEventListener('click', () => activateExample(id));
        option.addEventListener('keydown', (event) => {
            const currentIndex = options.indexOf(option);
            const direction = event.key === 'ArrowDown' || event.key === 'ArrowRight'
                ? 1
                : event.key === 'ArrowUp' || event.key === 'ArrowLeft'
                    ? -1
                    : 0;

            if (!direction) return;
            event.preventDefault();
            const next = options[(currentIndex + direction + options.length) % options.length];
            next.focus();
        });
    });

    const visibilityObserver = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
            activateExampleChain();
        }
    }, { rootMargin: '-18% 0px -18% 0px', threshold: 0.16 });

    visibilityObserver.observe(showcase);

    document.addEventListener('brain-slot-change', (event) => {
        if (event.detail?.slot === 'examples') {
            activateExampleChain();
        }
    });

    activateExample(options.find((option) => option.classList.contains('is-active'))?.dataset.exampleTarget || options[0]?.dataset.exampleTarget);
}

function initSharedBrainTravel(brain) {
    const stage = brain.stage;
    const modesSlot = document.querySelector('[data-brain-slot="modes"]');
    const examplesSlot = document.querySelector('[data-brain-slot="examples"]');
    const examplesSection = document.querySelector('#examples');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const root = document.documentElement;
    let frame = 0;
    let announcedSlot = '';

    if (!modesSlot || !examplesSlot || !examplesSection) return;

    const clamp = (value, min = 0, max = 1) => Math.min(max, Math.max(min, value));
    const lerp = (start, end, progress) => start + (end - start) * progress;
    const easeInOut = (progress) => progress * progress * (3 - 2 * progress);

    const setHandoffVars = (progress) => {
        const eased = easeInOut(progress);
        const narrow = window.innerWidth <= 680;
        const modeLift = narrow ? 300 : 72;
        const modeFade = narrow ? 1.42 : 0.46;
        root.style.setProperty('--modes-handoff-y', `${Math.round(-modeLift * eased)}px`);
        root.style.setProperty('--modes-handoff-opacity', Math.max(0, 1 - eased * modeFade).toFixed(3));
        root.style.setProperty('--examples-handoff-y', `${Math.round(44 * (1 - eased))}px`);
        root.style.setProperty('--examples-handoff-opacity', (0.68 + eased * 0.32).toFixed(3));
    };

    const resetFixedStage = () => {
        stage.classList.remove('is-scroll-bridging', 'is-travelling');
        stage.style.left = '';
        stage.style.top = '';
        stage.style.width = '';
        stage.style.height = '';
        stage.style.transition = '';
        stage.style.transform = '';
        stage.style.transformOrigin = '';
    };

    const announceSlot = (slotName) => {
        if (announcedSlot === slotName) return;
        announcedSlot = slotName;
        document.dispatchEvent(new CustomEvent('brain-slot-change', {
            detail: { slot: slotName },
        }));
    };

    const placeInSlot = (slot) => {
        resetFixedStage();

        if (stage.parentElement !== slot) {
            slot.append(stage);
        }

        announceSlot(slot.dataset.brainSlot);
    };

    const placeInBridge = (progress) => {
        const from = modesSlot.getBoundingClientRect();
        const to = examplesSlot.getBoundingClientRect();
        const eased = easeInOut(progress);

        if (stage.parentElement !== document.body) {
            document.body.append(stage);
        }

        stage.classList.add('is-scroll-bridging');
        const downwardArc = Math.sin(progress * Math.PI) * (window.innerWidth <= 680 ? 150 : 78);
        stage.style.left = `${lerp(from.left, to.left, eased)}px`;
        stage.style.top = `${lerp(from.top, to.top, eased) + downwardArc}px`;
        stage.style.width = `${lerp(from.width, to.width, eased)}px`;
        stage.style.height = `${lerp(from.height, to.height, eased)}px`;
        stage.style.transition = 'none';
        stage.style.transform = '';
        stage.style.transformOrigin = '';

        announceSlot(progress > 0.52 ? 'examples' : 'modes');
    };

    const updateSlot = () => {
        frame = 0;
        const rect = examplesSection.getBoundingClientRect();
        const start = window.innerHeight * 0.92;
        const end = window.innerHeight * 0.18;
        const progress = clamp((start - rect.top) / Math.max(1, start - end));

        if (reducedMotion.matches) {
            root.style.setProperty('--modes-handoff-y', '0px');
            root.style.setProperty('--modes-handoff-opacity', '1');
            root.style.setProperty('--examples-handoff-y', '0px');
            root.style.setProperty('--examples-handoff-opacity', '1');
            placeInSlot(progress > 0.5 ? examplesSlot : modesSlot);
            return;
        }

        setHandoffVars(progress);

        if (progress <= 0.001) {
            placeInSlot(modesSlot);
            return;
        }

        if (progress >= 0.999) {
            placeInSlot(examplesSlot);
            return;
        }

        placeInBridge(progress);
    };

    const requestUpdate = () => {
        if (frame) return;
        frame = window.requestAnimationFrame(updateSlot);
    };

    window.addEventListener('scroll', requestUpdate, { passive: true });
    window.addEventListener('resize', requestUpdate);
    updateSlot();
}

function createBrainScene(root) {
    const stage = root.querySelector('[data-brain-stage]');
    const canvas = stage?.querySelector('[data-brain-canvas]');
    const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    const compactMobile = window.matchMedia('(max-width: 680px)');
    const activeMode = { id: 'model', ids: ['model'] };

    if (compactMobile.matches) {
        stage?.classList.add('brain-mobile-disabled');
        return {
            stage: null,
            setActive: (modeInput) => {
                activeMode.ids = normalizeModeIds(modeInput);
                activeMode.id = activeMode.ids[0];
            },
        };
    }

    let renderer;

    try {
        renderer = new THREE.WebGLRenderer({
            canvas,
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        });
    } catch (error) {
        stage?.classList.add('brain-unavailable');
        return {
            stage,
            setActive: (modeInput) => {
                activeMode.ids = normalizeModeIds(modeInput);
                activeMode.id = activeMode.ids[0];
            },
        };
    }

    renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;

    renderer.setClearColor(new THREE.Color(BRAIN_SKY_COLOR), 0);

    const scene = new THREE.Scene();
    scene.fog = new THREE.Fog(new THREE.Color(BRAIN_FOG_COLOR), 4.8, 8.2);

    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 100);
    camera.position.set(0, 0.04, 4.62);

    const rig = new THREE.Group();
    scene.add(rig);

    const brain = new THREE.Group();
    brain.rotation.set(-0.08, -0.42, 0.02);
    brain.position.y = 0.06;
    rig.add(brain);

    scene.add(new THREE.HemisphereLight(0xf7fbff, 0x6f7d96, 1.75));

    const keyLight = new THREE.DirectionalLight(0xf8fbff, 1.45);
    keyLight.position.set(2.4, 2.9, 3.6);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(0xc9d8f5, 0.85);
    fillLight.position.set(-3.2, 0.9, 2.4);
    scene.add(fillLight);

    const backLight = new THREE.DirectionalLight(0xf8fbff, 1.8);
    backLight.position.set(-1.4, 1.5, -2.8);
    scene.add(backLight);

    const floor = new THREE.Mesh(
        new THREE.PlaneGeometry(8, 8),
        new THREE.MeshBasicMaterial({
            color: '#17100b',
            transparent: true,
            opacity: 0,
            depthWrite: false,
        })
    );
    floor.position.set(0, -1.28, 0.15);
    floor.rotation.x = -Math.PI / 2;
    scene.add(floor);

    const regionLights = Array.from({ length: BRAIN_MAX_REGION_LIGHTS }, () => {
        const light = new THREE.PointLight(MODE_DETAILS.model.color, 0, 4.2);
        scene.add(light);
        return light;
    });

    let modelController = createEmptyModelController();
    let ridge = null;
    let ridgeMaterial = null;
    let width = 0;
    let height = 0;
    let targetRotationX = 0;
    let targetRotationY = 0;
    let manualRotationX = 0;
    let manualRotationY = 0;
    let autoRotationY = 0;
    let isBrainHovered = false;
    let isBrainDragging = false;
    let activePointerId = null;
    let dragStartX = 0;
    let dragStartY = 0;
    let dragStartRotationX = 0;
    let dragStartRotationY = 0;
    let previousElapsed = 0;
    let modelReadyElapsed = null;
    let modelRenderedOnce = false;
    let introRequested = false;
    let introStartElapsed = null;
    const clock = new THREE.Clock();

    const startIntro = () => {
        introRequested = true;

        if (modelReadyElapsed === null || introStartElapsed !== null) return;

        introStartElapsed = clock.getElapsedTime();
    };

    const isStageInViewport = () => {
        const rect = stage.getBoundingClientRect();
        return rect.bottom > 0 && rect.top < window.innerHeight;
    };

    const resize = () => {
        const rect = stage.getBoundingClientRect();
        width = Math.max(320, Math.floor(rect.width));
        height = Math.max(320, Math.floor(rect.height || rect.width));
        renderer.setSize(width, height, false);
        camera.aspect = width / height;
        camera.updateProjectionMatrix();
    };

    const resizeObserver = new ResizeObserver(resize);
    resizeObserver.observe(stage);
    resize();

    loadBrainModel(BRAIN_MODEL_URL)
        .then((model) => {
            brain.add(model.group);
            modelController = model.controller;
            ridge = model.ridge;
            ridgeMaterial = model.ridgeMaterial;
            ridge.frustumCulled = false;
            brain.add(ridge);
            ridgeMaterial.uniforms.uOpacity.value = 0;
            renderer.initTexture?.(ridgeMaterial.uniforms.lightningTexture.value);
            renderer.compile?.(scene, camera);
            ridge.visible = false;
            modelReadyElapsed = clock.getElapsedTime();
            if (introRequested || isStageInViewport()) {
                startIntro();
            }
            stage.classList.add('brain-ready');
            setActive(activeMode.ids);
        })
        .catch((error) => {
            console.warn('Could not load the realistic brain model.', error);
            buildFallbackBrain(brain);
            modelController = createFallbackModelController();
            modelReadyElapsed = clock.getElapsedTime();
            if (introRequested || isStageInViewport()) {
                startIntro();
            }
            stage.classList.add('brain-unavailable', 'brain-ready');
            setActive(activeMode.ids);
        });

    if ('IntersectionObserver' in window) {
        const introObserver = new IntersectionObserver(([entry]) => {
            if (!entry.isIntersecting) return;

            startIntro();
            introObserver.disconnect();
        }, { rootMargin: '0px 0px -8% 0px', threshold: 0.08 });

        introObserver.observe(stage);
    } else {
        const requestIntroStart = () => {
            if (!isStageInViewport()) return;

            startIntro();
            window.removeEventListener('scroll', requestIntroStart);
            window.removeEventListener('resize', requestIntroStart);
        };

        window.addEventListener('scroll', requestIntroStart, { passive: true });
        window.addEventListener('resize', requestIntroStart);
        requestIntroStart();
    }

    const finishBrainDrag = (event) => {
        if (!isBrainDragging || event.pointerId !== activePointerId) return;

        isBrainDragging = false;
        activePointerId = null;
        stage.classList.remove('is-dragging');

        if (stage.hasPointerCapture?.(event.pointerId)) {
            stage.releasePointerCapture(event.pointerId);
        }

        const rect = stage.getBoundingClientRect();
        const isInsideStage =
            event.clientX >= rect.left &&
            event.clientX <= rect.right &&
            event.clientY >= rect.top &&
            event.clientY <= rect.bottom;

        isBrainHovered = isInsideStage && event.pointerType !== 'touch';
        targetRotationX = 0;
        targetRotationY = 0;
    };

    stage.addEventListener('pointerenter', (event) => {
        if (event.pointerType === 'touch') return;
        isBrainHovered = true;
    });

    stage.addEventListener('pointerdown', (event) => {
        if (event.button !== 0) return;

        isBrainDragging = true;
        isBrainHovered = true;
        activePointerId = event.pointerId;
        dragStartX = event.clientX;
        dragStartY = event.clientY;
        dragStartRotationX = manualRotationX;
        dragStartRotationY = manualRotationY;
        targetRotationX = 0;
        targetRotationY = 0;
        stage.classList.add('is-dragging');
        stage.setPointerCapture(event.pointerId);
        event.preventDefault();
    });

    stage.addEventListener('pointermove', (event) => {
        if (isBrainDragging && event.pointerId === activePointerId) {
            const dx = event.clientX - dragStartX;
            const dy = event.clientY - dragStartY;
            manualRotationY = dragStartRotationY + dx * 0.007;
            manualRotationX = dragStartRotationX + dy * 0.007;
            event.preventDefault();
        }
    });

    stage.addEventListener('pointerleave', () => {
        if (isBrainDragging) return;
        isBrainHovered = false;
        targetRotationX = 0;
        targetRotationY = 0;
    });

    stage.addEventListener('pointerup', finishBrainDrag);
    stage.addEventListener('pointercancel', finishBrainDrag);

    const setActive = (modeInput) => {
        const modeIds = normalizeModeIds(modeInput);
        const mode = MODE_DETAILS[modeIds[0]];
        if (!mode) return;

        activeMode.id = modeIds[0];
        activeMode.ids = modeIds;
        root?.style.setProperty('--active-mode-color', mode.color);

        modelController.setActive(modeIds);
    };

    const render = () => {
        const elapsed = clock.getElapsedTime();
        const delta = Math.min(0.05, Math.max(0, elapsed - previousElapsed));
        const mode = MODE_DETAILS[activeMode.id];
        const idleY = reducedMotion.matches || isBrainHovered || isBrainDragging ? 0 : Math.sin(elapsed * 0.36) * 0.07;
        const idleX = reducedMotion.matches || isBrainHovered || isBrainDragging ? 0 : Math.sin(elapsed * 0.26) * 0.03;

        if (introStartElapsed === null && isStageInViewport()) {
            startIntro();
        }

        const introElapsed = introStartElapsed === null ? 0 : Math.max(0, elapsed - introStartElapsed);
        const introProgress = reducedMotion.matches ? 1 : Math.min(1, introElapsed / BRAIN_INTRO_DURATION);
        previousElapsed = elapsed;

        if (!reducedMotion.matches && !isBrainHovered && !isBrainDragging) {
            autoRotationY += delta * BRAIN_AUTO_ROTATION_SPEED;
        }

        rig.rotation.y += (manualRotationY + autoRotationY + targetRotationY + idleY - rig.rotation.y) * 0.055;
        rig.rotation.x += (manualRotationX + targetRotationX + idleX - rig.rotation.x) * 0.055;
        brain.rotation.z = reducedMotion.matches || isBrainHovered || isBrainDragging ? 0.02 : 0.02 + Math.sin(elapsed * 0.22) * 0.016;

        modelController.update(
            activeMode.ids,
            elapsed,
            reducedMotion.matches,
            introElapsed
        );

        if (ridgeMaterial) {
            const overlayReady = modelRenderedOnce && introProgress >= BRAIN_OVERLAY_INTRO_THRESHOLD;
            const targetOverlayOpacity = overlayReady
                ? (reducedMotion.matches ? BRAIN_RIDGE_OPACITY * 0.72 : BRAIN_RIDGE_OPACITY)
                : 0;
            const overlayStep = overlayReady ? 0.08 : 0.32;

            if (overlayReady) {
                ridge.visible = true;
            }

            if (!reducedMotion.matches) {
                ridgeMaterial.uniforms.uTime.value = elapsed;
                ridgeMaterial.uniforms.offsetY.value = (elapsed * 0.16) % 1;
            } else {
                ridgeMaterial.uniforms.uTime.value = elapsed;
                ridgeMaterial.uniforms.offsetY.value = 0.3;
            }

            ridgeMaterial.uniforms.uOpacity.value += (
                targetOverlayOpacity - ridgeMaterial.uniforms.uOpacity.value
            ) * overlayStep;

            if (!overlayReady && ridgeMaterial.uniforms.uOpacity.value < 0.004) {
                ridge.visible = false;
                ridgeMaterial.uniforms.uOpacity.value = 0;
            }
        }

        regionLights.forEach((light, index) => {
            const modeId = activeMode.ids[index];
            const modeForLight = MODE_DETAILS[modeId];
            const center = modeForLight ? modelController.getModeCenter(modeId) || modeForLight.point : null;
            const targetIntensity = modeForLight
                ? (BRAIN_REGION_LIGHT_BASE / Math.sqrt(activeMode.ids.length)) + (reducedMotion.matches ? 0 : Math.sin(elapsed * 2.4 + index) * BRAIN_REGION_LIGHT_VARIANCE)
                : 0;

            if (modeForLight && center) {
                light.color.lerp(new THREE.Color(modeForLight.color), 0.16);
                light.position.x += (center[0] - light.position.x) * 0.08;
                light.position.y += (center[1] - light.position.y) * 0.08;
                light.position.z += (center[2] + 0.72 - light.position.z) * 0.08;
            }

            light.intensity += (targetIntensity - light.intensity) * 0.1;
        });

        renderer.render(scene, camera);

        if (modelReadyElapsed !== null) {
            modelRenderedOnce = true;
        }

        window.requestAnimationFrame(render);
    };

    setActive('model');
    render();

    return { stage, setActive };
}

async function loadBrainModel(url) {
    const [response, ridgeTexture] = await Promise.all([
        fetch(url),
        loadTexture(BRAIN_XRAY_TEXTURE_URL).catch(() => createFallbackRidgeTexture()),
    ]);

    if (!response.ok) {
        throw new Error(`Brain model request failed with ${response.status}`);
    }

    const text = await response.text();
    const parsed = parseObjModel(text);
    const model = buildBrainModel(parsed, ridgeTexture);

    if (!model.group.children.length) {
        throw new Error('Brain model contained no renderable mesh groups');
    }

    return model;
}

function loadTexture(url) {
    return new Promise((resolve, reject) => {
        new THREE.TextureLoader().load(url, resolve, undefined, reject);
    });
}

function createFallbackRidgeTexture() {
    const texture = new THREE.DataTexture(new Uint8Array([255, 255, 255, 255]), 1, 1, THREE.RGBAFormat);
    texture.needsUpdate = true;
    return texture;
}

function parseObjModel(text) {
    const positions = [];
    const uvs = [];
    const normals = [];
    const objects = [];
    let currentObject = null;

    text.split(/\r?\n/).forEach((rawLine) => {
        const line = rawLine.trim();
        if (!line || line.startsWith('#')) return;

        if (line.startsWith('v ')) {
            const [, x, y, z] = line.split(/\s+/);
            positions.push([Number(x), Number(y), Number(z)]);
            return;
        }

        if (line.startsWith('vt ')) {
            const [, u, v] = line.split(/\s+/);
            uvs.push([Number(u), Number(v)]);
            return;
        }

        if (line.startsWith('vn ')) {
            const [, x, y, z] = line.split(/\s+/);
            normals.push([Number(x), Number(y), Number(z)]);
            return;
        }

        if (line.startsWith('o ')) {
            currentObject = {
                name: line.slice(2).trim(),
                faces: [],
            };
            objects.push(currentObject);
            return;
        }

        if (line.startsWith('f ')) {
            if (!currentObject) {
                currentObject = { name: 'brain', faces: [] };
                objects.push(currentObject);
            }
            currentObject.faces.push(line.slice(2).trim().split(/\s+/).map(parseFaceToken));
        }
    });

    return { positions, uvs, normals, objects };
}

function parseFaceToken(token) {
    const [positionIndex, uvIndex, normalIndex] = token.split('/');
    return {
        position: parseObjIndex(positionIndex),
        uv: uvIndex ? parseObjIndex(uvIndex) : -1,
        normal: normalIndex ? parseObjIndex(normalIndex) : -1,
    };
}

function parseObjIndex(value) {
    const index = Number(value);
    return index > 0 ? index - 1 : index;
}

function buildBrainModel({ positions, uvs, normals, objects }, ridgeTexture) {
    const bounds = new THREE.Box3();
    positions.forEach(([x, y, z]) => bounds.expandByPoint(new THREE.Vector3(x, y, z)));

    const center = bounds.getCenter(new THREE.Vector3());
    const size = bounds.getSize(new THREE.Vector3());
    const scale = 3.08 / Math.max(size.x, size.y, size.z);
    const group = new THREE.Group();
    const ridge = new THREE.Group();
    const ridgeMaterial = createBrainRidgeMaterial(ridgeTexture);
    const entries = new Map();

    objects.forEach((object) => {
        if (!object.faces.length) return;

        const geometryData = triangulateObject(object, positions, uvs, normals, center, scale);
        if (!geometryData.positions.length) return;

        const geometry = new THREE.BufferGeometry();
        geometry.setAttribute('position', new THREE.Float32BufferAttribute(geometryData.positions, 3));

        if (geometryData.uvs.length === (geometryData.positions.length / 3) * 2) {
            geometry.setAttribute('uv', new THREE.Float32BufferAttribute(geometryData.uvs, 2));
        }

        if (geometryData.normals.length === geometryData.positions.length) {
            geometry.setAttribute('normal', new THREE.Float32BufferAttribute(geometryData.normals, 3));
        } else {
            geometry.computeVertexNormals();
        }

        geometry.computeBoundingSphere();
        geometry.computeBoundingBox();

        const material = new THREE.MeshStandardMaterial({
            color: BASE_GROUP_COLORS[object.name] || '#101a2a',
            emissive: BRAIN_SURFACE_COLOR,
            emissiveIntensity: 0.015,
            roughness: 0.86,
            metalness: 0.01,
            transparent: true,
            opacity: 0,
            blending: THREE.NormalBlending,
            depthWrite: false,
            side: THREE.DoubleSide,
        });

        const mesh = new THREE.Mesh(geometry, material);
        mesh.name = object.name;
        mesh.visible = false;
        mesh.renderOrder = 2;
        group.add(mesh);

        const ridges = new THREE.Mesh(geometry, ridgeMaterial);
        ridges.name = `${object.name}-ridges`;
        ridges.renderOrder = 7;
        ridges.frustumCulled = false;
        ridge.add(ridges);

        const particleMaterial = createBrainParticleMaterial(object.name);
        const particleGeometry = createParticleGeometry(geometryData.positions, geometryData.normals, object.name);
        const particleCloud = new THREE.Points(particleGeometry, particleMaterial);
        particleCloud.name = `${object.name}-particles`;
        particleCloud.renderOrder = 5;
        particleCloud.frustumCulled = false;
        group.add(particleCloud);

        const objectCenter = geometry.boundingBox.getCenter(new THREE.Vector3());
        entries.set(object.name, {
            mesh,
            material,
            particleCloud,
            particleMaterial,
            baseColor: material.color.clone(),
            center: objectCenter,
        });
    });

    group.rotation.set(0, 0.02, 0);
    ridge.rotation.set(0, 0.02, 0);

    return {
        group,
        ridge,
        ridgeMaterial,
        controller: createModelController(entries),
    };
}

function createBrainRidgeMaterial(texture = createFallbackRidgeTexture()) {
    texture.wrapS = THREE.RepeatWrapping;
    texture.wrapT = THREE.RepeatWrapping;

    return new THREE.ShaderMaterial({
        uniforms: {
            c: { value: 0.9 },
            p: { value: 6.7 },
            glowColor: { value: new THREE.Color(BRAIN_RIDGE_COLOR) },
            lightningTexture: { value: texture },
            offsetY: { value: 0.3 },
            uOpacity: { value: BRAIN_RIDGE_OPACITY },
            uTime: { value: 0 },
        },
        vertexShader: `
            uniform float c;
            uniform float p;

            varying float vIntensity;
            varying vec2 vUv;

            void main() {
                vUv = uv;
                vec3 viewNormal = normalize(normalMatrix * normal);
                float rim = max(c - abs(dot(viewNormal, vec3(0.0, 0.0, 1.0))), 0.0);
                vIntensity = pow(rim, p);
                gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
            }
        `,
        fragmentShader: `
            uniform vec3 glowColor;
            uniform sampler2D lightningTexture;
            uniform float offsetY;
            uniform float uOpacity;
            uniform float uTime;

            varying float vIntensity;
            varying vec2 vUv;

            void main() {
                vec2 uv = vUv;
                uv.y += offsetY;

                float textureMask = 1.0 - texture2D(lightningTexture, uv).r;
                float scan = fract(uv.y);
                float leadingBand = smoothstep(0.06, 0.11, scan) * (1.0 - smoothstep(0.21, 0.31, scan));
                float trailingBand = smoothstep(0.37, 0.42, scan) * (1.0 - smoothstep(0.47, 0.57, scan));
                float band = max(leadingBand, trailingBand * 0.42);
                float ridge = clamp((textureMask * 1.35 + vIntensity * 0.95) * band, 0.0, 1.0);
                float pulse = 0.68 + 0.32 * clamp(cos(uTime * 3.0), 0.0, 1.0);
                float alpha = ridge * uOpacity * pulse;

                if (alpha < 0.035) {
                    discard;
                }

                vec3 color = glowColor * (0.9 + ridge * 0.45 + vIntensity * 0.22);
                gl_FragColor = vec4(min(color, vec3(1.0)), alpha);
            }
        `,
        side: THREE.DoubleSide,
        blending: THREE.NormalBlending,
        transparent: true,
        depthWrite: false,
        depthTest: true,
    });
}

function createBrainParticleMaterial(objectName) {
    const isStem = objectName === 'brainstem' || objectName === 'cerebellum';

    return new THREE.ShaderMaterial({
        uniforms: {
            uColor: { value: new THREE.Color(BRAIN_PARTICLE_COLOR) },
            uAccent: { value: new THREE.Color(BRAIN_PARTICLE_COLOR) },
            uAccentMix: { value: 0.08 },
            uOpacity: { value: isStem ? 0.86 : 0.92 },
            uSize: { value: isStem ? 0.018 : 0.016 },
            uTime: { value: 0 },
            uIntroProgress: { value: 0 },
            uFocus: { value: new THREE.Vector3() },
            uSignalStrength: { value: 0 },
            uModeSeed: { value: 0 },
        },
        vertexShader: `
            uniform vec3 uFocus;
            uniform float uIntroProgress;
            uniform float uModeSeed;
            uniform float uSignalStrength;
            uniform float uSize;
            uniform float uTime;

            attribute vec3 aStartPosition;
            attribute float aSeed;
            attribute float aSize;

            varying float vAlpha;
            varying float vRim;
            varying float vSignal;

            float easeInOut(float value) {
                return value * value * (3.0 - 2.0 * value);
            }

            void main() {
                vec3 safeNormal = normalize(normal + vec3(0.0001));
                vec3 focusVector = position - uFocus;
                float focusDistance = length(focusVector);
                vec3 focusDirection = focusVector / max(focusDistance, 0.001);
                vec3 orbitDirection = normalize(cross(safeNormal + vec3(0.001), focusDirection + vec3(0.17, 0.11, 0.07)));
                float signalWave = sin(focusDistance * 9.0 - uTime * 2.9 + aSeed * 5.0 + uModeSeed * 6.2831);
                float signalBand = 1.0 - smoothstep(0.0, 1.75, focusDistance);
                vec3 signalOffset = (safeNormal * signalWave * 0.004 + orbitDirection * cos(signalWave + uTime * 0.45) * 0.006) * uSignalStrength * signalBand;
                vec3 resolvedPosition = position + signalOffset;
                float progress = 1.0;
                vec3 animatedPosition = resolvedPosition;

                if (uIntroProgress < 1.0) {
                    float delayedProgress = clamp((uIntroProgress - aSeed * 0.2) / 0.84, 0.0, 1.0);
                    progress = easeInOut(delayedProgress);
                    vec3 cloudDrift = safeNormal * sin(uTime * 0.72 + aSeed * 6.2831) * (1.0 - progress) * 0.018;
                    animatedPosition = mix(aStartPosition + cloudDrift, resolvedPosition, progress);
                }

                vec4 mvPosition = modelViewMatrix * vec4(animatedPosition, 1.0);
                vec3 viewNormal = normalize(normalMatrix * safeNormal);
                float facing = abs(dot(viewNormal, vec3(0.0, 0.0, 1.0)));
                vRim = pow(1.0 - facing, 1.7);
                vSignal = clamp(uSignalStrength * signalBand, 0.0, 1.0);
                vAlpha = mix(0.42, 1.0, progress) * (0.88 + vSignal * 0.22);

                float cameraScale = 310.0 / max(0.001, -mvPosition.z);
                gl_PointSize = uSize * aSize * cameraScale;
                gl_Position = projectionMatrix * mvPosition;
            }
        `,
        fragmentShader: `
            uniform vec3 uColor;
            uniform vec3 uAccent;
            uniform float uAccentMix;
            uniform float uSignalStrength;
            uniform float uOpacity;

            varying float vAlpha;
            varying float vRim;
            varying float vSignal;

            void main() {
                float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
                float disc = 1.0 - smoothstep(0.3, 0.42, distanceToCenter);
                float core = 1.0 - smoothstep(0.0, 0.2, distanceToCenter);
                float accentDrive = clamp(uAccentMix + vSignal, 0.0, 1.0);
                vec3 color = mix(uColor, uAccent, accentDrive);
                float luminance = dot(color, vec3(0.2126, 0.7152, 0.0722));
                float saturation = mix(1.0, 1.32, accentDrive * uSignalStrength);
                color = mix(vec3(luminance), color, saturation);
                float glow = 1.04 + core * 0.24 + vRim * 0.16 + vSignal * 0.46;
                float alpha = disc * vAlpha * uOpacity * (0.96 + vSignal * 0.45);

                vec3 finalColor = color * glow;

                if (alpha < 0.01) {
                    discard;
                }

                gl_FragColor = vec4(min(finalColor, vec3(1.0)), alpha);
            }
        `,
        transparent: true,
        depthTest: true,
        depthWrite: false,
        blending: THREE.NormalBlending,
    });
}

function addParticleAttributes(geometry, objectName) {
    const positionAttribute = geometry.getAttribute('position');
    const count = positionAttribute.count;
    const starts = new Float32Array(count * 3);
    const seeds = new Float32Array(count);
    const sizes = new Float32Array(count);
    const isStem = objectName === 'brainstem' || objectName === 'cerebellum';
    const cloudRadius = isStem ? 0.74 : 1.34;

    for (let index = 0; index < count; index += 1) {
        const seed = seededUnit(index + objectName.length * 97);
        const azimuth = seededUnit(index * 17 + objectName.length * 31) * Math.PI * 2;
        const elevation = (seededUnit(index * 23 + objectName.length * 43) - 0.5) * Math.PI;
        const radius = 0.32 + Math.pow(seededUnit(index * 29 + objectName.length * 59), 0.48) * cloudRadius;
        const offset = index * 3;
        const spread = Math.cos(elevation);

        starts[offset] = positionAttribute.getX(index) * 0.16 + Math.cos(azimuth) * spread * radius;
        starts[offset + 1] = positionAttribute.getY(index) * 0.12 + Math.sin(elevation) * radius * 0.76;
        starts[offset + 2] = positionAttribute.getZ(index) * 0.14 + Math.sin(azimuth) * spread * radius * 0.92;
        seeds[index] = seed;
        sizes[index] = 0.92 + seededUnit(index * 7 + 13) * 0.28;
    }

    geometry.setAttribute('aStartPosition', new THREE.BufferAttribute(starts, 3));
    geometry.setAttribute('aSeed', new THREE.BufferAttribute(seeds, 1));
    geometry.setAttribute('aSize', new THREE.BufferAttribute(sizes, 1));
}

function createParticleGeometry(sourcePositions, sourceNormals, objectName) {
    const sourceCount = Math.floor(sourcePositions.length / 3);
    const count = sourceCount;
    const positions = new Float32Array(count * 3);
    const normals = new Float32Array(count * 3);

    for (let index = 0; index < sourceCount; index += 1) {
        const sourceOffset = index * 3;

        positions[sourceOffset] = sourcePositions[sourceOffset];
        positions[sourceOffset + 1] = sourcePositions[sourceOffset + 1];
        positions[sourceOffset + 2] = sourcePositions[sourceOffset + 2];

        if (sourceNormals.length === sourcePositions.length) {
            normals[sourceOffset] = sourceNormals[sourceOffset];
            normals[sourceOffset + 1] = sourceNormals[sourceOffset + 1];
            normals[sourceOffset + 2] = sourceNormals[sourceOffset + 2];
        }
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute('normal', new THREE.BufferAttribute(normals, 3));
    addParticleAttributes(geometry, objectName);
    geometry.computeBoundingSphere();

    return geometry;
}

function seededUnit(value) {
    const raw = Math.sin(value * 12.9898) * 43758.5453;
    return raw - Math.floor(raw);
}

function triangulateObject(object, positions, uvs, normals, center, scale) {
    const objectPositions = [];
    const objectUvs = [];
    const objectNormals = [];
    const transformPosition = (sourcePosition) => [
        (sourcePosition[0] - center.x) * scale,
        (sourcePosition[1] - center.y) * scale,
        (sourcePosition[2] - center.z) * scale,
    ];

    object.faces.forEach((face) => {
        if (face.length < 3) return;

        for (let index = 1; index < face.length - 1; index += 1) {
            const triangle = [face[0], face[index], face[index + 1]];

            triangle.forEach((vertex) => {
                const sourcePosition = positions[vertex.position];
                if (!sourcePosition) return;

                const transformedPosition = transformPosition(sourcePosition);
                objectPositions.push(...transformedPosition);

                const sourceUv = uvs[vertex.uv];
                if (sourceUv) {
                    objectUvs.push(sourceUv[0], sourceUv[1]);
                }

                const sourceNormal = normals[vertex.normal];
                if (sourceNormal) {
                    objectNormals.push(sourceNormal[0], sourceNormal[1], sourceNormal[2]);
                } else {
                    const normal = new THREE.Vector3(...sourcePosition).normalize();
                    objectNormals.push(normal.x, normal.y, normal.z);
                }
            });
        }
    });

    return {
        positions: objectPositions,
        uvs: objectUvs,
        normals: objectNormals,
    };
}

function createModelController(entries) {
    let activeModeIds = ['model'];
    let modeSeed = 0;
    const neutralEmissive = new THREE.Color('#080c13');
    const modeIds = Object.keys(MODE_DETAILS);
    const getFocusVector = (modeId) => {
        const mode = MODE_DETAILS[modeId];
        if (!mode) return new THREE.Vector3();

        const centers = mode.groups
            .map((groupName) => entries.get(groupName)?.center)
            .filter(Boolean);

        if (!centers.length) {
            return new THREE.Vector3(...mode.point);
        }

        const center = centers.reduce((accumulator, point) => accumulator.add(point), new THREE.Vector3());
        center.divideScalar(centers.length);
        return center;
    };
    const getFocusForModes = (modeInput) => {
        const ids = normalizeModeIds(modeInput);
        const center = ids.reduce((accumulator, modeId) => accumulator.add(getFocusVector(modeId)), new THREE.Vector3());
        center.divideScalar(ids.length);
        return center;
    };
    const getModeSeed = (ids) => {
        const total = ids.reduce((sum, modeId) => sum + Math.max(0, modeIds.indexOf(modeId)), 0);
        return total / Math.max(1, ids.length) / Math.max(1, modeIds.length - 1);
    };

    return {
        setActive(modeInput) {
            activeModeIds = normalizeModeIds(modeInput);
            modeSeed = getModeSeed(activeModeIds);
        },
        update(modeInput = activeModeIds, elapsed = 0, reducedMotion = false, introElapsed = elapsed) {
            const ids = normalizeModeIds(modeInput);
            const primaryMode = MODE_DETAILS[ids[0]] || MODE_DETAILS.model;
            const activeGroups = new Map();
            ids.forEach((modeId) => {
                const mode = MODE_DETAILS[modeId];
                mode.groups.forEach((groupName) => {
                    if (!activeGroups.has(groupName)) {
                        activeGroups.set(groupName, []);
                    }
                    activeGroups.get(groupName).push(mode);
                });
            });
            const pulse = reducedMotion ? 0.5 : (Math.sin(elapsed * 3.6) + 1) * 0.5;
            const introProgress = reducedMotion ? 1 : Math.min(1, introElapsed / BRAIN_INTRO_DURATION);
            const focus = getFocusForModes(ids);

            entries.forEach((entry, name) => {
                const activeGroupModes = activeGroups.get(name) || [];
                const isActive = activeGroupModes.length > 0;
                const accent = isActive
                    ? getColorForModes(activeGroupModes, elapsed, reducedMotion)
                    : new THREE.Color(primaryMode.color);
                const targetColor = entry.baseColor;
                const targetEmissive = isActive
                    ? neutralEmissive.clone().lerp(accent, 0.24)
                    : neutralEmissive;
                const overlapBoost = Math.min(0.038, Math.max(0, activeGroupModes.length - 1) * 0.018);
                const targetIntensity = isActive ? 0.075 + pulse * 0.075 + overlapBoost : 0.012;
                const targetOpacity = 0;
                const targetSignalStrength = 1;
                const targetParticleOpacity = isActive ? 1.0 : 0.76;
                const targetParticleSize = isActive
                    ? 0.02 + pulse * 0.0015 + Math.min(0.004, Math.max(0, activeGroupModes.length - 1) * 0.002)
                    : 0.016;
                const targetAccentMix = isActive ? 0.98 : 0;
                const targetAccent = accent;

                entry.material.color.lerp(targetColor, 0.08);
                entry.material.emissive.lerp(targetEmissive, 0.1);
                entry.material.emissiveIntensity += (targetIntensity - entry.material.emissiveIntensity) * 0.08;
                entry.material.opacity += (targetOpacity - entry.material.opacity) * 0.08;

                entry.particleMaterial.uniforms.uTime.value = elapsed;
                entry.particleMaterial.uniforms.uIntroProgress.value = introProgress;
                entry.particleMaterial.uniforms.uFocus.value.lerp(focus, 0.12);
                entry.particleMaterial.uniforms.uModeSeed.value = modeSeed;
                entry.particleMaterial.uniforms.uSignalStrength.value += (
                    targetSignalStrength - entry.particleMaterial.uniforms.uSignalStrength.value
                ) * 0.09;
                entry.particleMaterial.uniforms.uAccent.value.lerp(targetAccent, 0.1);
                entry.particleMaterial.uniforms.uOpacity.value += (
                    targetParticleOpacity - entry.particleMaterial.uniforms.uOpacity.value
                ) * 0.08;
                entry.particleMaterial.uniforms.uSize.value += (
                    targetParticleSize - entry.particleMaterial.uniforms.uSize.value
                ) * 0.08;
                entry.particleMaterial.uniforms.uAccentMix.value += (
                    targetAccentMix - entry.particleMaterial.uniforms.uAccentMix.value
                ) * 0.08;
            });
        },
        getModeCenter(modeInput) {
            const ids = normalizeModeIds(modeInput);
            const center = getFocusForModes(ids);
            return [center.x, center.y, center.z];
        },
    };
}

function createEmptyModelController() {
    return {
        setActive() {},
        update() {},
        getModeCenter() {
            return null;
        },
    };
}

function createFallbackModelController() {
    return {
        setActive() {},
        update() {},
        getModeCenter(modeInput) {
            const ids = normalizeModeIds(modeInput);
            const points = ids.map((modeId) => MODE_DETAILS[modeId]?.point).filter(Boolean);
            if (!points.length) return null;

            return points.reduce((accumulator, point) => [
                accumulator[0] + point[0],
                accumulator[1] + point[1],
                accumulator[2] + point[2],
            ], [0, 0, 0]).map((value) => value / points.length);
        },
    };
}

function buildFallbackBrain(brain) {
    const material = new THREE.MeshStandardMaterial({
        color: '#17202d',
        emissive: '#10151f',
        roughness: 0.82,
        metalness: 0.02,
    });

    const geometry = new THREE.SphereGeometry(0.84, 48, 28);
    const mesh = new THREE.Mesh(geometry, material);
    mesh.scale.set(1.08, 0.82, 0.64);
    brain.add(mesh);
}
