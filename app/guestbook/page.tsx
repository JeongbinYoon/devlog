import { GuestbookClient } from '@/components';
import { getGuestbookEntries } from './actions';

async function GuestbookPage() {
  const entries = await getGuestbookEntries();
  return <GuestbookClient entries={entries} />;
}
export default GuestbookPage;
