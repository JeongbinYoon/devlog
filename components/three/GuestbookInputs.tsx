import { SubmitButton } from '@/components/three';
import { useAtom } from 'jotai';
import {
  guestbookInputUserNameAtom,
  guestbookInputPasswordAtom,
  guestbookInputContentAtom,
} from '@/app/atoms/appAtoms';
import { Html } from '@react-three/drei';

const GuestbookInputs = ({ direction }: { direction: string }) => {
  const [inputContent, setInputContent] = useAtom(guestbookInputContentAtom);
  const [inputUserName, setInputUserName] = useAtom(guestbookInputUserNameAtom);
  const [inputPassword, setInputPassword] = useAtom(guestbookInputPasswordAtom);

  const commonStyles: React.CSSProperties = {
    border: 'none',
    borderRadius: '4px',
    fontSize: '16px',
    resize: 'none',
  };

  return (
    // 가로 모니터 입력창
    direction === 'row' ? (
      <>
        <Html position={[-0.93, -0.27, 0]} scale={0.25} transform>
          <input
            value={inputUserName}
            placeholder='이름'
            onChange={(e) => setInputUserName(e.target.value)}
            style={{
              width: `135px`,
              height: '42px',
              padding: '10px',
              ...commonStyles,
            }}
          />
        </Html>
        <Html position={[-0.93, -0.57, 0]} scale={0.25} transform>
          <input
            type='password'
            value={inputPassword}
            placeholder='비밀번호'
            onChange={(e) => setInputPassword(e.target.value)}
            style={{
              width: `135px`,
              height: '42px',
              padding: '10px',
              ...commonStyles,
            }}
          />
        </Html>
        <Html position={[0.45, -0.44, 0]} scale={0.25} transform>
          <textarea
            value={inputContent}
            placeholder='방명록을 남겨주세요'
            onChange={(e) => setInputContent(e.target.value)}
            style={{
              width: `295px`,
              height: '90px',
              padding: '10px',
              ...commonStyles,
            }}
          />
        </Html>
        <SubmitButton />
      </>
    ) : (
      // 세로 모니터 입력창
      <Html position={[-1, -0.01, 0]} scale={0.25} transform>
        <textarea
          value={inputContent}
          onChange={(e) => setInputContent(e.target.value)}
          style={{
            width: `240px`,
            height: '110px',
            padding: '8px',
            transform: `rotate(90deg)`,
            ...commonStyles,
          }}
        />
      </Html>
    )
  );
};

export default GuestbookInputs;
