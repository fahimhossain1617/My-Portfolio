import fs from "fs";
import path from "path";

export interface InquiryRecord {
  id: string;
  name: string;
  email: string;
  phone: string;
  description: string;
  submittedAtIso: string;
  submittedAtReadable: string;
  clientIp: string;
  status: "DELIVERED_VIA_EMAIL" | "DELIVERY_PENDING" | "FAILED" | "MOCK_SUCCESS";
  resendId?: string | null;
  errorMessage?: string | null;
}

const DATA_DIR = path.join(process.cwd(), "data");
const INQUIRIES_FILE = path.join(DATA_DIR, "inquiries.json");

// In-memory fallback if file system is read-only in serverless/edge environments
const memoryInquiriesStore: InquiryRecord[] = [];

function ensureDataFile() {
  try {
    if (!fs.existsSync(DATA_DIR)) {
      fs.mkdirSync(DATA_DIR, { recursive: true });
    }
    if (!fs.existsSync(INQUIRIES_FILE)) {
      fs.writeFileSync(INQUIRIES_FILE, JSON.stringify([], null, 2), "utf-8");
    }
  } catch (err) {
    console.warn("Storage directory check notice:", err);
  }
}

export function saveInquiry(record: InquiryRecord): boolean {
  memoryInquiriesStore.unshift(record);

  try {
    ensureDataFile();
    let current: InquiryRecord[] = [];
    if (fs.existsSync(INQUIRIES_FILE)) {
      const content = fs.readFileSync(INQUIRIES_FILE, "utf-8");
      try {
        current = JSON.parse(content) as InquiryRecord[];
      } catch {
        current = [];
      }
    }
    current.unshift(record);
    // Keep last 500 inquiries
    if (current.length > 500) {
      current = current.slice(0, 500);
    }
    fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(current, null, 2), "utf-8");
    return true;
  } catch (err) {
    console.warn("Could not write inquiry to disk, stored in memory cache:", err);
    return false;
  }
}

export function updateInquiryStatus(
  id: string,
  status: InquiryRecord["status"],
  resendId?: string | null,
  errorMessage?: string | null
): void {
  // Update in memory
  const memItem = memoryInquiriesStore.find((i) => i.id === id);
  if (memItem) {
    memItem.status = status;
    if (resendId !== undefined) memItem.resendId = resendId;
    if (errorMessage !== undefined) memItem.errorMessage = errorMessage;
  }

  // Update on disk
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const content = fs.readFileSync(INQUIRIES_FILE, "utf-8");
      const list = JSON.parse(content) as InquiryRecord[];
      const target = list.find((i) => i.id === id);
      if (target) {
        target.status = status;
        if (resendId !== undefined) target.resendId = resendId;
        if (errorMessage !== undefined) target.errorMessage = errorMessage;
        fs.writeFileSync(INQUIRIES_FILE, JSON.stringify(list, null, 2), "utf-8");
      }
    }
  } catch (err) {
    console.warn("Could not update inquiry on disk:", err);
  }
}

export function getInquiriesStats() {
  let count = memoryInquiriesStore.length;
  let lastInquiryAt: string | null = memoryInquiriesStore[0]?.submittedAtIso || null;

  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const content = fs.readFileSync(INQUIRIES_FILE, "utf-8");
      const list = JSON.parse(content) as InquiryRecord[];
      count = Math.max(count, list.length);
      if (list[0]?.submittedAtIso) {
        lastInquiryAt = list[0].submittedAtIso;
      }
    }
  } catch {
    // fallback to memory
  }

  return {
    totalRecorded: count,
    lastInquiryAt,
    storageEngine: "hybrid-disk-memory",
  };
}

export function getAllInquiries(limit = 100): InquiryRecord[] {
  try {
    if (fs.existsSync(INQUIRIES_FILE)) {
      const content = fs.readFileSync(INQUIRIES_FILE, "utf-8");
      const list = JSON.parse(content) as InquiryRecord[];
      if (Array.isArray(list) && list.length > 0) {
        return list.slice(0, limit);
      }
    }
  } catch (err) {
    console.warn("Could not read inquiries from disk, using memory fallback:", err);
  }
  return memoryInquiriesStore.slice(0, limit);
}

