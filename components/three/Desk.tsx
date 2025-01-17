import React from 'react';
import * as THREE from 'three';
import { Vector3 } from '@/app/types/blog';

const Desk = () => {
  const deskTopPosition: Vector3 = [0, 0.4, 0]; // 책상 판 위치
  const FIRST_LEG_HEIGHT = 2.5; // 다리 높이
  const SECOND_LEG_WIDTH = 3; // 다리 받침 길이
  const DESK_WIDTH = 7; // 책상 너비
  const DESK_DEPTH = 3; // 책상 깊이

  // 다리 위치 계산
  let leg1Positions: Vector3[] = [
    [-DESK_WIDTH / 2 + 0.2, -FIRST_LEG_HEIGHT / 2, 0],
    [DESK_WIDTH / 2 - 0.2, -FIRST_LEG_HEIGHT / 2, 0],
  ];
  let leg2Positions: Vector3[] = [
    [-DESK_WIDTH / 2 + 0.2, -FIRST_LEG_HEIGHT, 0],
    [DESK_WIDTH / 2 - 0.2, -FIRST_LEG_HEIGHT, 0],
  ];

  // 책상 판 위치에 따라 다리 위치 계산
  [leg1Positions, leg2Positions] = [leg1Positions, leg2Positions].map(
    (positions) =>
      positions.map(([x, y, z]) => {
        return [
          x + deskTopPosition[0],
          y + deskTopPosition[1],
          z + deskTopPosition[2],
        ];
      })
  );

  return (
    <>
      {/* 책상 판 */}
      <mesh position={deskTopPosition}>
        <boxGeometry args={[DESK_WIDTH, 0.15, DESK_DEPTH]} />
        <meshBasicMaterial color='white' toneMapped={false} />
      </mesh>

      <lineSegments position={deskTopPosition}>
        <edgesGeometry
          args={[new THREE.BoxGeometry(DESK_WIDTH, 0.15, DESK_DEPTH)]}
        />
        <lineBasicMaterial color='black' />
      </lineSegments>

      {/* 책상 다리 */}
      {leg1Positions.map((position, index) => (
        <React.Fragment key={index}>
          <mesh position={position}>
            <boxGeometry args={[0.2, FIRST_LEG_HEIGHT, 0.2]} />
            <meshBasicMaterial color='white' toneMapped={false} />
          </mesh>
          <lineSegments key={index} position={position}>
            <edgesGeometry
              args={[new THREE.BoxGeometry(0.2, FIRST_LEG_HEIGHT, 0.2)]}
            />
            <lineBasicMaterial color='black' />
          </lineSegments>
        </React.Fragment>
      ))}
      {leg2Positions.map((position, index) => (
        <React.Fragment key={index}>
          <mesh position={position} key={index}>
            <boxGeometry args={[0.3, 0.15, SECOND_LEG_WIDTH]} />
            <meshBasicMaterial color='white' toneMapped={false} />
          </mesh>
          <lineSegments position={position}>
            <edgesGeometry
              args={[new THREE.BoxGeometry(0.3, 0.15, SECOND_LEG_WIDTH)]}
            />
            <lineBasicMaterial color='black' />
          </lineSegments>
        </React.Fragment>
      ))}
    </>
  );
};

export default Desk;
