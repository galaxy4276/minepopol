"use client";

import { useMemo, useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

type SkillSphereProps = {
  skills: string[];
  selectedSkill: string | null;
  onSelectSkill: (skill: string) => void;
  onHoverSkill: (skill: string | null) => void;
  reducedMotion: boolean;
};

type SkillNode = {
  label: string;
  position: [number, number, number];
  radius: number;
};

const normalize = (value: string) => value.toLowerCase().replace(/\s+/g, "");

const matchSkill = (selected: string | null, current: string) => {
  if (!selected) return false;
  const base = normalize(selected);
  const target = normalize(current);
  return base.includes(target) || target.includes(base);
};

const buildNodes = (skills: string[]): SkillNode[] => {
  const radius = 1.24;
  const count = Math.max(skills.length, 1);

  return skills.map((label, index) => {
    const offset = 2 / count;
    const y = index * offset - 1 + offset / 2;
    const r = Math.sqrt(1 - y * y);
    const phi = index * (Math.PI * (3 - Math.sqrt(5)));
    const x = Math.cos(phi) * r;
    const z = Math.sin(phi) * r;

    return {
      label,
      position: [x * radius, y * radius, z * radius],
      radius: 0.08 + (index % 3) * 0.01,
    };
  });
};

function SphereCloud({
  nodes,
  selectedSkill,
  onSelectSkill,
  onHoverSkill,
  reducedMotion,
}: {
  nodes: SkillNode[];
  selectedSkill: string | null;
  onSelectSkill: (skill: string) => void;
  onHoverSkill: (skill: string | null) => void;
  reducedMotion: boolean;
}) {
  const groupRef = useRef<THREE.Group>(null);

  useFrame((state, delta) => {
    if (!groupRef.current) return;

    const targetY = (reducedMotion ? 0.2 : state.clock.getElapsedTime() * 0.16) + state.mouse.x * 0.26;
    const targetX = (reducedMotion ? 0.12 : state.mouse.y * 0.22);

    groupRef.current.rotation.y = THREE.MathUtils.damp(groupRef.current.rotation.y, targetY, 2.6, delta);
    groupRef.current.rotation.x = THREE.MathUtils.damp(groupRef.current.rotation.x, targetX, 2.6, delta);
  });

  return (
    <group ref={groupRef}>
      <mesh>
        <icosahedronGeometry args={[1.72, 1]} />
        <meshStandardMaterial
          color="#5c84a2"
          transparent
          opacity={0.16}
          wireframe
          roughness={0.3}
          metalness={0.15}
        />
      </mesh>

      <mesh>
        <sphereGeometry args={[1.52, 32, 32]} />
        <meshStandardMaterial color="#102030" transparent opacity={0.1} />
      </mesh>

      {nodes.map((node) => {
        const active = matchSkill(selectedSkill, node.label);

        return (
          <mesh
            key={node.label}
            position={node.position}
            onPointerOver={() => onHoverSkill(node.label)}
            onPointerOut={() => onHoverSkill(null)}
            onClick={() => onSelectSkill(node.label)}
          >
            <sphereGeometry args={[node.radius, 14, 14]} />
            <meshStandardMaterial
              color={active ? "#3dffb6" : "#8bb4cf"}
              emissive={active ? "#123f35" : "#0e2636"}
              roughness={0.26}
              metalness={0.2}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export default function SkillSphere({
  skills,
  selectedSkill,
  onSelectSkill,
  onHoverSkill,
  reducedMotion,
}: SkillSphereProps) {
  const nodes = useMemo(() => buildNodes(skills), [skills]);
  const [fallback] = useState(skills[0] ?? "");

  return (
    <div className="skill-sphere-shell">
      <Canvas className="skill-sphere-canvas" camera={{ position: [0, 0, 4.3], fov: 42 }} dpr={[1, 1.8]}>
        <ambientLight intensity={0.86} />
        <pointLight position={[2.6, 2.2, 3.2]} intensity={1.08} color="#aacfd9" />
        <pointLight position={[-2.4, -1.8, 2.4]} intensity={0.66} color="#6591ae" />
        <SphereCloud
          nodes={nodes}
          selectedSkill={selectedSkill}
          onSelectSkill={onSelectSkill}
          onHoverSkill={onHoverSkill}
          reducedMotion={reducedMotion}
        />
      </Canvas>
      <div className="skill-sphere-center-dot" />
      <div className="skill-sphere-hint">
        {selectedSkill || fallback || "Skill"}
      </div>
    </div>
  );
}
