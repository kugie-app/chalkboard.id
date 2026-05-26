type PrintHtmlOptions = {
  onAfterPrint?: () => void;
};

export const printHtml = async (
  html: string,
  options: PrintHtmlOptions = {},
): Promise<void> => {
  if (typeof window === "undefined" || typeof document === "undefined") {
    return;
  }

  await new Promise<void>((resolve, reject) => {
    const iframe = document.createElement("iframe");
    iframe.setAttribute("aria-hidden", "true");
    iframe.style.position = "fixed";
    iframe.style.right = "0";
    iframe.style.bottom = "0";
    iframe.style.width = "0";
    iframe.style.height = "0";
    iframe.style.border = "0";
    iframe.style.visibility = "hidden";

    let settled = false;

    const cleanup = () => {
      iframe.onload = null;
      if (iframe.parentNode) {
        iframe.parentNode.removeChild(iframe);
      }
    };

    const finish = (error?: unknown) => {
      if (settled) return;
      settled = true;
      cleanup();

      if (error) {
        reject(error);
        return;
      }

      options.onAfterPrint?.();
      resolve();
    };

    iframe.onload = () => {
      const printWindow = iframe.contentWindow;

      if (!printWindow) {
        finish(new Error("Print frame was not available"));
        return;
      }

      const afterPrint = () => {
        finish();
      };

      printWindow.addEventListener("afterprint", afterPrint, { once: true });

      window.setTimeout(() => {
        try {
          printWindow.focus();
          printWindow.print();

          // Some desktop webviews do not reliably fire afterprint.
          window.setTimeout(() => {
            finish();
          }, 1500);
        } catch (error) {
          finish(error);
        }
      }, 300);
    };

    iframe.srcdoc = html;
    document.body.appendChild(iframe);
  });
};
