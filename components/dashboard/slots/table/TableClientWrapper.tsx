"use client";
import dynamic from "next/dynamic";
import { Table as TableSlotType } from "@/types/slots/table";

const TableClient = dynamic(() => import("./TableClient"), { ssr: false });

export default function TableClientWrapper(props: TableSlotType) {
  return <TableClient {...props} />;
} 