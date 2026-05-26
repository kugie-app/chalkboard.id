type PrintHtmlOptions = {
  onAfterPrint?: () => void;
};

const RECEIPT_COLUMNS = 32;
const DEFAULT_THERMAL_PRINTER = "POS-80";

let activePrintPromise: Promise<void> | null = null;

const cleanText = (value: string) => value.replace(/\s+/g, " ").trim();

const center = (value: string) => {
  const text = cleanText(value);
  if (text.length >= RECEIPT_COLUMNS) return text;
  const left = Math.floor((RECEIPT_COLUMNS - text.length) / 2);
  return `${" ".repeat(left)}${text}`;
};

const line = (char = "-") => char.repeat(RECEIPT_COLUMNS);

const itemLine = (leftValue: string, rightValue: string) => {
  const left = cleanText(leftValue);
  const right = cleanText(rightValue);
  const gap = RECEIPT_COLUMNS - left.length - right.length;

  if (gap > 0) {
    return `${left}${" ".repeat(gap)}${right}`;
  }

  return `${left.slice(0, RECEIPT_COLUMNS)}
${right.padStart(RECEIPT_COLUMNS)}`;
};

const elementText = (element: Element | null) => cleanText(element?.textContent ?? "");

const appendParagraphs = (lines: string[], container: Element, centered = false) => {
  Array.from(container.children).forEach((child) => {
    const text = elementText(child);
    if (!text) return;

    if (child.matches(".item-row, .subtotal-row, .total-row")) {
      const parts = Array.from(child.children).map((part) => elementText(part)).filter(Boolean);
      if (parts.length >= 2) {
        lines.push(itemLine(parts[0], parts[parts.length - 1]));
      } else {
        lines.push(text);
      }
      return;
    }

    if (child.tagName === "H1") {
      lines.push(center(text.toUpperCase()));
      return;
    }

    if (child.tagName === "H2" || child.tagName === "H3") {
      lines.push(text.toUpperCase());
      return;
    }

    lines.push(centered ? center(text) : text);
  });
};

const htmlToReceiptText = (html: string) => {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const lines: string[] = [];

  Array.from(doc.body.children).forEach((child) => {
    if (child.classList.contains("header")) {
      appendParagraphs(lines, child, true);
      lines.push(line());
      return;
    }

    if (child.classList.contains("footer")) {
      lines.push(line());
      appendParagraphs(lines, child, true);
      return;
    }

    if (child.classList.contains("section") || child.classList.contains("transaction-info")) {
      if (lines.length && lines[lines.length - 1] !== line()) {
        lines.push("");
      }
      appendParagraphs(lines, child);
      return;
    }

    const text = elementText(child);
    if (text) lines.push(text);
  });

  return lines
    .filter((value, index, all) => value !== "" || all[index - 1] !== "")
    .join("\n");
};

const tryTauriRawPrint = async (html: string) => {
  if (typeof window === "undefined" || !("__TAURI_INTERNALS__" in window)) {
    return false;
  }

  const { invoke } = await import("@tauri-apps/api/core");
  const printerName = window.localStorage.getItem("chalkboard_thermal_printer") || DEFAULT_THERMAL_PRINTER;
  await invoke("print_receipt_raw", {
    receipt: htmlToReceiptText(html),
    printerName,
  });
  return true;
};

const browserPrint = async (html: string, options: PrintHtmlOptions) => {
  await new Promise<void>((resolve, reject) => {
    const printWindow = window.open("", "_blank", "width=360,height=640");

    if (!printWindow) {
      reject(new Error("Print window was blocked"));
      return;
    }

    printWindow.document.open();
    printWindow.document.write(html);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
    options.onAfterPrint?.();
    resolve();
  });
};

export const printHtml = async (
  html: string,
  options: PrintHtmlOptions = {},
): Promise<void> => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  if (activePrintPromise) {
    return activePrintPromise;
  }

  activePrintPromise = (async () => {
    try {
      if (await tryTauriRawPrint(html)) {
        options.onAfterPrint?.();
        return;
      }

      await browserPrint(html, options);
    } finally {
      activePrintPromise = null;
    }
  })();

  return activePrintPromise;
};
