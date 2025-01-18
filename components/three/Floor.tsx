import * as THREE from 'three';

const Floor = () => {
  return (
    <lineSegments rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]}>
      <edgesGeometry args={[new THREE.BoxGeometry(15, 15, 0.3)]} />
      <lineBasicMaterial color='gray' />
    </lineSegments>
  );
};

export default Floor;
