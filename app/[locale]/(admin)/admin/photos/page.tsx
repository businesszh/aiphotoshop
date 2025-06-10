import { getPhotos } from "@/models/photo";
import TableClientWrapper from "@/components/dashboard/slots/table/TableClientWrapper";

export default async function Page() {
  const photos = await getPhotos(1, 100);

  return <TableClientWrapper title="All Photos" data={photos} />;
}
