"use client";
import TableSlot from "./index";
import { TableColumn } from "@/types/blocks/table";
import moment from "moment";

export default function TableClient(props: { title: string; data: any[] }) {
  // 自动过滤掉 status 为 offline 的数据
  const filteredData = Array.isArray(props.data)
    ? props.data.filter((item) => item.status !== "offline")
    : [];

  const columns: TableColumn[] = [
    { name: "uuid", title: "UUID" },
    { name: "img_description", title: "Description" },
    {
      name: "img_url",
      title: "Image",
      callback: (row) => (
        row.img_url ? <img src={row.img_url} className="w-20 h-12 object-cover rounded" alt="img" /> : null
      ),
    },
    {
      name: "created_at",
      title: "Created At",
      callback: (row) => moment(row.created_at).format("YYYY-MM-DD HH:mm:ss"),
    },
    {
      name: "status",
      title: "Status",
      callback: (row) => (
        <select
          value={row.status}
          onChange={async (e) => {
            const newStatus = e.target.value;
            await fetch("/api/photo/update-status", {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ uuid: row.uuid, status: newStatus }),
            });
            window.location.reload();
          }}
          className="border rounded px-2 py-1"
        >
          <option value="created">created</option>
          <option value="online">online</option>
          <option value="offline">offline</option>
        </select>
      ),
    },
  ];

  return <TableSlot {...props} data={filteredData} columns={columns} />;
} 