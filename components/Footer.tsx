import Duolingo from './Duolingo';

export default async function Footer() {
  const fetchDuolingoData = async () => {
    const res = await fetch(
      `https://www.duolingo.com/2017-06-30/users?username=${process.env.DUOLINGO_ID}`
    );
    const json = await res.json();
    return json?.users?.[0];
  };

  const duolingoUserData = await fetchDuolingoData();
  console.log('duolingoUserData', duolingoUserData);
  return (
    <div className="bg-gray-200 mt-auto px-10 py-7">
      <div className="max-w-3xl mx-auto">
        {duolingoUserData && <Duolingo userData={duolingoUserData} />}
      </div>
    </div>
  );
}
