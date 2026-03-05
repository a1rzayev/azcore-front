"use client";

import { useState, useEffect } from "react";

type ProjectImage = {
  id: string;
  path: string;
  alt: string | null;
  order: number;
};

type PortfolioProject = {
  id: string;
  title: string;
  description: string;
  order: number;
  images: ProjectImage[];
};

export default function AdminPortfolioPage() {
  const [projects, setProjects] = useState<PortfolioProject[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formDesc, setFormDesc] = useState("");
  const [formOrder, setFormOrder] = useState(0);
  const [uploading, setUploading] = useState<string | null>(null);

  useEffect(() => {
    fetchProjects();
  }, []);

  async function fetchProjects() {
    const res = await fetch("/api/portfolio");
    const data = await res.json();
    setProjects(data);
    setLoading(false);
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/portfolio", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formTitle,
        description: formDesc,
        order: formOrder,
      }),
    });
    if (res.ok) {
      setShowForm(false);
      setFormTitle("");
      setFormDesc("");
      setFormOrder(0);
      fetchProjects();
    }
  }

  async function handleUpdate(e: React.FormEvent, id: string) {
    e.preventDefault();
    const project = projects.find((p) => p.id === id);
    if (!project) return;
    await fetch(`/api/portfolio/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formTitle,
        description: formDesc,
        order: formOrder,
      }),
    });
    setEditing(null);
    setFormTitle("");
    setFormDesc("");
    setFormOrder(0);
    fetchProjects();
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this project and all its images?")) return;
    await fetch(`/api/portfolio/${id}`, { method: "DELETE" });
    fetchProjects();
  }

  async function handleImageUpload(projectId: string, file: File) {
    setUploading(projectId);
    const formData = new FormData();
    formData.append("file", file);
    await fetch(`/api/portfolio/${projectId}/images`, {
      method: "POST",
      body: formData,
    });
    setUploading(null);
    fetchProjects();
  }

  async function handleImageDelete(imageId: string) {
    if (!confirm("Delete this image?")) return;
    await fetch(`/api/portfolio/images/${imageId}`, { method: "DELETE" });
    fetchProjects();
  }

  function startEdit(p: PortfolioProject) {
    setEditing(p.id);
    setFormTitle(p.title);
    setFormDesc(p.description);
    setFormOrder(p.order);
  }

  if (loading) {
    return (
      <div className="flex justify-center py-12">
        <div className="animate-pulse text-gray-500">Loading...</div>
      </div>
    );
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
          Portfolio Projects
        </h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            setFormTitle("");
            setFormDesc("");
            setFormOrder(projects.length);
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          + Add Project
        </button>
      </div>

      {showForm && !editing && (
        <form
          onSubmit={handleCreate}
          className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 space-y-4"
        >
          <h2 className="font-semibold text-gray-900 dark:text-white">
            New Project
          </h2>
          <input
            type="text"
            placeholder="Title"
            value={formTitle}
            onChange={(e) => setFormTitle(e.target.value)}
            required
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
          />
          <textarea
            placeholder="Description"
            value={formDesc}
            onChange={(e) => setFormDesc(e.target.value)}
            required
            rows={3}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
          />
          <input
            type="number"
            placeholder="Order"
            value={formOrder}
            onChange={(e) => setFormOrder(parseInt(e.target.value, 10) || 0)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
          />
          <div className="flex gap-2">
            <button
              type="submit"
              className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
            >
              Create
            </button>
            <button
              type="button"
              onClick={() => setShowForm(false)}
              className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
            >
              Cancel
            </button>
          </div>
        </form>
      )}

      <div className="space-y-4">
        {projects.map((project) => (
          <div
            key={project.id}
            className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700"
          >
            {editing === project.id ? (
              <form
                onSubmit={(e) => handleUpdate(e, project.id)}
                className="space-y-4"
              >
                <input
                  type="text"
                  value={formTitle}
                  onChange={(e) => setFormTitle(e.target.value)}
                  required
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                />
                <textarea
                  value={formDesc}
                  onChange={(e) => setFormDesc(e.target.value)}
                  required
                  rows={3}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                />
                <input
                  type="number"
                  value={formOrder}
                  onChange={(e) => setFormOrder(parseInt(e.target.value, 10) || 0)}
                  className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
                />
                <div className="flex gap-2">
                  <button
                    type="submit"
                    className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700"
                  >
                    Save
                  </button>
                  <button
                    type="button"
                    onClick={() => setEditing(null)}
                    className="px-4 py-2 text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-slate-700 rounded-lg"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            ) : (
              <>
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                      {project.title}
                    </h3>
                    <p className="mt-1 text-gray-600 dark:text-gray-400 line-clamp-2">
                      {project.description}
                    </p>
                    <p className="mt-2 text-sm text-gray-500">
                      {project.images.length} image(s)
                    </p>
                  </div>
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(project)}
                      className="px-3 py-1.5 text-sm text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-700 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(project.id)}
                      className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>

                <div className="mt-4 flex flex-wrap gap-4">
                  {project.images.map((img) => (
                    <div
                      key={img.id}
                      className="relative group w-24 h-24 rounded-lg overflow-hidden bg-gray-100 dark:bg-slate-700"
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={img.path}
                        alt={img.alt || ""}
                        className="w-full h-full object-cover"
                      />
                      <button
                        onClick={() => handleImageDelete(img.id)}
                        className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white text-sm transition-opacity"
                      >
                        Delete
                      </button>
                    </div>
                  ))}
                  <label className="w-24 h-24 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:border-primary-500 transition-colors">
                    <input
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={(e) => {
                        const f = e.target.files?.[0];
                        if (f) handleImageUpload(project.id, f);
                        e.target.value = "";
                      }}
                      disabled={!!uploading}
                    />
                    {uploading === project.id ? (
                      <span className="text-xs text-gray-500">Uploading...</span>
                    ) : (
                      <span className="text-xs text-gray-500">+ Add</span>
                    )}
                  </label>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {projects.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No projects yet. Click &quot;Add Project&quot; to get started.
        </div>
      )}
    </div>
  );
}
