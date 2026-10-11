import { useEffect, useMemo, useRef, useState } from 'react'
import { Canvas, useFrame } from '@react-three/fiber'
import { Billboard } from '@react-three/drei'
import * as THREE from 'three'

const FONT = '700 104px Calibri, "Carlito", "Segoe UI", sans-serif'
const WORD_HEIGHT = 0.56
const base = new THREE.Color('#cdd8ec')
const hot = new THREE.Color('#38bdf8')

/** Renders a word into a canvas texture using the page's own web font. */
function makeWordTexture(word) {
  const canvas = document.createElement('canvas')
  const ctx = canvas.getContext('2d')
  ctx.font = FONT
  const width = Math.ceil(ctx.measureText(word).width) + 32
  const height = 136
  canvas.width = width
  canvas.height = height
  ctx.font = FONT
  ctx.fillStyle = '#ffffff'
  ctx.textAlign = 'center'
  ctx.textBaseline = 'middle'
  ctx.fillText(word, width / 2, height / 2 + 4)
  const texture = new THREE.CanvasTexture(canvas)
  texture.colorSpace = THREE.SRGBColorSpace
  texture.anisotropy = 4
  return { texture, aspect: width / height }
}

function Word({ word, position, onHover }) {
  const mesh = useRef()
  const [hovered, setHovered] = useState(false)
  const { texture, aspect } = useMemo(() => makeWordTexture(word), [word])
  useEffect(() => () => texture.dispose(), [texture])

  useFrame(() => {
    const m = mesh.current
    m.material.color.lerp(hovered ? hot : base, 0.12)
    m.scale.setScalar(THREE.MathUtils.lerp(m.scale.x, hovered ? 1.35 : 1, 0.15))
  })

  return (
    <Billboard position={position}>
      <mesh
        ref={mesh}
        onPointerOver={e => { e.stopPropagation(); setHovered(true); onHover(word) }}
        onPointerOut={() => { setHovered(false); onHover(null) }}
      >
        <planeGeometry args={[WORD_HEIGHT * aspect, WORD_HEIGHT]} />
        <meshBasicMaterial map={texture} transparent depthWrite={false} toneMapped={false} />
      </mesh>
    </Billboard>
  )
}

/** Words spread evenly over a sphere (Fibonacci lattice), slowly spinning and leaning toward the pointer. */
function Cloud({ words, radius, onHover }) {
  const group = useRef()
  const positions = useMemo(() => {
    const golden = Math.PI * (3 - Math.sqrt(5))
    return words.map((_, i) => {
      const y = 1 - (i / (words.length - 1)) * 2
      const r = Math.sqrt(1 - y * y)
      const theta = golden * i
      return new THREE.Vector3(Math.cos(theta) * r, y, Math.sin(theta) * r).multiplyScalar(radius)
    })
  }, [words, radius])

  useFrame((state, dt) => {
    const g = group.current
    g.rotation.y += dt * 0.14 + state.pointer.x * dt * 0.5
    g.rotation.x = THREE.MathUtils.lerp(g.rotation.x, -state.pointer.y * 0.45, 0.04)
  })

  return (
    <group ref={group}>
      {words.map((w, i) => <Word key={w} word={w} position={positions[i]} onHover={onHover} />)}
    </group>
  )
}

export default function SkillSphere({ words, active, onHover }) {
  const [fontReady, setFontReady] = useState(false)

  useEffect(() => {
    let alive = true
    document.fonts.load(FONT).finally(() => alive && setFontReady(true))
    return () => { alive = false }
  }, [])

  const handleHover = word => {
    document.body.style.cursor = word ? 'pointer' : ''
    onHover?.(word)
  }

  return (
    <Canvas camera={{ position: [0, 0, 14], fov: 50 }} dpr={[1, 2]} frameloop={active ? 'always' : 'demand'} gl={{ alpha: true, antialias: true }}>
      <fog attach="fog" args={['#070b14', 11, 20]} />
      {fontReady && <Cloud words={words} radius={4.3} onHover={handleHover} />}
    </Canvas>
  )
}
