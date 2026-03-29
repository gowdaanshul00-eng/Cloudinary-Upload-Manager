import { useState, useRef, useCallback } from "react";
import { QueryClient, QueryClientProvider, useQuery, useMutation, useQueryClient } from "@tanstack/react-query";

const queryClient = new QueryClient();

interface ImageRecord {
  id: number;
  label: string;
  cloudinaryUrl: string;
  publicId: string;
  originalFilename: string;
  createdAt: string;
}

function UploadTool() {
  const [files, setFiles] = useState<File[]>([]);
  const [labelPrefix, setLabelPrefix] = useState("image");
  const [startIndex, setStartIndex] = useState(1);
  const [uploading, setUploading] = useState(false);
  const [progress, setProgress] = useState<{ name: string; status: "pending" | "uploading" | "done" | "error"; url?: string; label?: string }[]>([]);
  const [dragging, setDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const qc = useQueryClient();

  const { data: images = [], isLoading } = useQuery<ImageRecord[]>({
    queryKey: ["images"],
    queryFn: async () => {
      const res = await fetch("/api/images");
      return res.json();
    },
  });

  const deleteMutation = useMutation({
    mutationFn: async (id: number) => {
      await fetch(`/api/images/${id}`, { method: "DELETE" });
    },
    onSuccess: () => qc.invalidateQueries({ queryKey: ["images"] }),
  });

  const handleFiles = (incoming: FileList | null) => {
    if (!incoming) return;
    const arr = Array.from(incoming).filter((f) => f.type.startsWith("image/"));
    setFiles((prev) => [...prev, ...arr]);
  };

  const onDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    handleFiles(e.dataTransfer.files);
  }, []);

  const removeFile = (i: number) => setFiles((prev) => prev.filter((_, idx) => idx !== i));

  const handleUpload = async () => {
    if (!files.length) return;
    setUploading(true);
    const initial = files.map((f, i) => ({
      name: f.name,
      status: "pending" as const,
      label: `${labelPrefix}${startIndex + i}`,
    }));
    setProgress(initial);

    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const label = `${labelPrefix}${startIndex + i}`;
      setProgress((prev) =>
        prev.map((p, idx) => (idx === i ? { ...p, status: "uploading" } : p))
      );

      const form = new FormData();
      form.append("file", file);
      form.append("label", label);

      try {
        const res = await fetch("/api/images/upload", { method: "POST", body: form });
        if (!res.ok) throw new Error("Upload failed");
        const data: ImageRecord = await res.json();
        setProgress((prev) =>
          prev.map((p, idx) =>
            idx === i ? { ...p, status: "done", url: data.cloudinaryUrl } : p
          )
        );
      } catch {
        setProgress((prev) =>
          prev.map((p, idx) => (idx === i ? { ...p, status: "error" } : p))
        );
      }
    }

    setUploading(false);
    setFiles([]);
    qc.invalidateQueries({ queryKey: ["images"] });
  };

  const copyJson = () => {
    const json = images.reduce<Record<string, string>>((acc, img) => {
      acc[img.label] = img.cloudinaryUrl;
      return acc;
    }, {});
    navigator.clipboard.writeText(JSON.stringify(json, null, 2));
  };

  return (
    <div style={{ fontFamily: "system-ui, sans-serif", maxWidth: 900, margin: "0 auto", padding: "2rem 1rem" }}>
      <div style={{ marginBottom: "2rem" }}>
        <h1 style={{ fontSize: "1.75rem", fontWeight: 700, color: "#1a1a1a", margin: 0 }}>
          Cloudinary Image Upload
        </h1>
        <p style={{ color: "#666", marginTop: "0.5rem", fontSize: "0.9rem" }}>
          Images are auto-enhanced with quality:auto, fetch_format:auto, and viesus_correct.
        </p>
      </div>

      <div style={{ background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
        <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "1rem", alignItems: "flex-end" }}>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4, color: "#444" }}>Label Prefix</label>
            <input
              value={labelPrefix}
              onChange={(e) => setLabelPrefix(e.target.value)}
              style={{ border: "1px solid #ccc", borderRadius: 6, padding: "6px 10px", fontSize: "0.9rem", width: 120 }}
            />
          </div>
          <div>
            <label style={{ display: "block", fontSize: "0.8rem", fontWeight: 600, marginBottom: 4, color: "#444" }}>Start Number</label>
            <input
              type="number"
              value={startIndex}
              onChange={(e) => setStartIndex(parseInt(e.target.value) || 1)}
              style={{ border: "1px solid #ccc", borderRadius: 6, padding: "6px 10px", fontSize: "0.9rem", width: 90 }}
            />
          </div>
          {files.length > 0 && (
            <div style={{ fontSize: "0.8rem", color: "#555", padding: "6px 0" }}>
              Files will be labeled: <strong>{labelPrefix}{startIndex}</strong> → <strong>{labelPrefix}{startIndex + files.length - 1}</strong>
            </div>
          )}
        </div>

        <div
          onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
          onDragLeave={() => setDragging(false)}
          onDrop={onDrop}
          onClick={() => fileInputRef.current?.click()}
          style={{
            border: `2px dashed ${dragging ? "#2563eb" : "#ccc"}`,
            borderRadius: 10,
            padding: "2.5rem",
            textAlign: "center",
            cursor: "pointer",
            background: dragging ? "#eff6ff" : "#fff",
            transition: "all 0.15s",
            marginBottom: "1rem",
          }}
        >
          <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📤</div>
          <div style={{ fontWeight: 600, color: "#333" }}>Drop images here or click to browse</div>
          <div style={{ fontSize: "0.8rem", color: "#999", marginTop: "0.25rem" }}>Supports PNG, JPG, JPEG, WEBP — bulk select supported</div>
          <input ref={fileInputRef} type="file" multiple accept="image/*" style={{ display: "none" }} onChange={(e) => handleFiles(e.target.files)} />
        </div>

        {files.length > 0 && (
          <div style={{ marginBottom: "1rem" }}>
            <div style={{ fontSize: "0.85rem", fontWeight: 600, marginBottom: "0.5rem", color: "#333" }}>
              {files.length} file{files.length > 1 ? "s" : ""} ready to upload:
            </div>
            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
              {files.map((f, i) => (
                <div key={i} style={{ background: "#fff", border: "1px solid #ddd", borderRadius: 8, padding: "4px 10px", fontSize: "0.8rem", display: "flex", alignItems: "center", gap: 6 }}>
                  <span style={{ color: "#2563eb", fontWeight: 600 }}>{labelPrefix}{startIndex + i}</span>
                  <span style={{ color: "#666" }}>{f.name}</span>
                  <button onClick={(e) => { e.stopPropagation(); removeFile(i); }} style={{ background: "none", border: "none", cursor: "pointer", color: "#999", fontSize: "1rem", lineHeight: 1, padding: 0 }}>×</button>
                </div>
              ))}
            </div>
          </div>
        )}

        <button
          onClick={handleUpload}
          disabled={!files.length || uploading}
          style={{
            background: files.length && !uploading ? "#2563eb" : "#ccc",
            color: "#fff",
            border: "none",
            borderRadius: 8,
            padding: "0.6rem 1.5rem",
            fontWeight: 600,
            fontSize: "0.95rem",
            cursor: files.length && !uploading ? "pointer" : "not-allowed",
          }}
        >
          {uploading ? "Uploading…" : `Upload ${files.length || ""} Image${files.length !== 1 ? "s" : ""}`}
        </button>
      </div>

      {progress.length > 0 && (
        <div style={{ background: "#f0fdf4", border: "1px solid #bbf7d0", borderRadius: 12, padding: "1.5rem", marginBottom: "2rem" }}>
          <div style={{ fontWeight: 600, marginBottom: "0.75rem", color: "#166534" }}>Upload Progress</div>
          {progress.map((p, i) => (
            <div key={i} style={{ display: "flex", alignItems: "center", gap: "0.75rem", marginBottom: "0.5rem", fontSize: "0.85rem" }}>
              <span style={{ width: 20 }}>
                {p.status === "done" ? "✅" : p.status === "error" ? "❌" : p.status === "uploading" ? "⏳" : "⏸"}
              </span>
              <span style={{ fontWeight: 600, color: "#2563eb", width: 120 }}>{p.label}</span>
              <span style={{ color: "#555", flex: 1, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{p.name}</span>
              {p.url && (
                <a href={p.url} target="_blank" rel="noreferrer" style={{ color: "#2563eb", fontSize: "0.75rem", flexShrink: 0 }}>View ↗</a>
              )}
            </div>
          ))}
        </div>
      )}

      <div style={{ background: "#fff", border: "1px solid #e5e5e5", borderRadius: 12, padding: "1.5rem" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: "1rem" }}>
          <h2 style={{ margin: 0, fontSize: "1.1rem", fontWeight: 700 }}>
            Uploaded Images ({images.length})
          </h2>
          <div style={{ display: "flex", gap: "0.5rem" }}>
            <button
              onClick={copyJson}
              style={{ background: "#f3f4f6", border: "1px solid #ddd", borderRadius: 6, padding: "6px 12px", fontSize: "0.8rem", cursor: "pointer", fontWeight: 600 }}
            >
              Copy JSON
            </button>
          </div>
        </div>

        {isLoading ? (
          <div style={{ color: "#999", textAlign: "center", padding: "2rem" }}>Loading…</div>
        ) : images.length === 0 ? (
          <div style={{ color: "#999", textAlign: "center", padding: "2rem", fontSize: "0.9rem" }}>
            No images uploaded yet. Upload some above!
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(200px, 1fr))", gap: "1rem" }}>
            {images.map((img) => (
              <div key={img.id} style={{ border: "1px solid #e5e5e5", borderRadius: 10, overflow: "hidden", background: "#fafafa" }}>
                <img
                  src={img.cloudinaryUrl}
                  alt={img.label}
                  style={{ width: "100%", height: 140, objectFit: "cover", display: "block" }}
                  loading="lazy"
                />
                <div style={{ padding: "0.6rem" }}>
                  <div style={{ fontWeight: 700, color: "#2563eb", fontSize: "0.85rem" }}>{img.label}</div>
                  <div style={{ fontSize: "0.75rem", color: "#888", marginTop: 2, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{img.originalFilename}</div>
                  <div style={{ display: "flex", gap: "0.5rem", marginTop: "0.4rem" }}>
                    <a
                      href={img.cloudinaryUrl}
                      target="_blank"
                      rel="noreferrer"
                      style={{ fontSize: "0.75rem", color: "#2563eb", textDecoration: "none" }}
                      onClick={(e) => { e.stopPropagation(); navigator.clipboard.writeText(img.cloudinaryUrl); }}
                    >
                      Copy URL
                    </a>
                    <button
                      onClick={() => deleteMutation.mutate(img.id)}
                      style={{ fontSize: "0.75rem", color: "#ef4444", background: "none", border: "none", cursor: "pointer", padding: 0 }}
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {images.length > 0 && (
        <details style={{ marginTop: "1.5rem", background: "#f9f9f9", border: "1px solid #e5e5e5", borderRadius: 10, padding: "1rem" }}>
          <summary style={{ cursor: "pointer", fontWeight: 600, fontSize: "0.9rem" }}>View JSON (all image URLs)</summary>
          <pre style={{ marginTop: "0.75rem", fontSize: "0.75rem", overflow: "auto", color: "#333", lineHeight: 1.5 }}>
            {JSON.stringify(
              images.reduce<Record<string, string>>((acc, img) => { acc[img.label] = img.cloudinaryUrl; return acc; }, {}),
              null, 2
            )}
          </pre>
        </details>
      )}
    </div>
  );
}

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <UploadTool />
    </QueryClientProvider>
  );
}
