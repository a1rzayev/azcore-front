"use client";

import { useState, useEffect } from "react";

type Post = {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  content: string;
  coverImage: string | null;
  published: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
};

export default function AdminPostsPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [editing, setEditing] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formTitle, setFormTitle] = useState("");
  const [formSlug, setFormSlug] = useState("");
  const [formExcerpt, setFormExcerpt] = useState("");
  const [formContent, setFormContent] = useState("");
  const [formCoverImage, setFormCoverImage] = useState("");
  const [formPublished, setFormPublished] = useState(false);
  const [formOrder, setFormOrder] = useState(0);
  const [uploadingCover, setUploadingCover] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const res = await fetch("/api/posts?drafts=true");
    const data = await res.json();
    setPosts(data);
    setLoading(false);
  }

  function slugFromTitle(title: string) {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "");
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    const res = await fetch("/api/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formTitle,
        slug: formSlug || slugFromTitle(formTitle),
        excerpt: formExcerpt || null,
        content: formContent,
        coverImage: formCoverImage || null,
        published: formPublished,
        order: formOrder,
      }),
    });
    if (res.ok) {
      setShowForm(false);
      resetForm();
      fetchPosts();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to create");
    }
  }

  async function handleUpdate(e: React.FormEvent, id: string) {
    e.preventDefault();
    const res = await fetch(`/api/posts/${id}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        title: formTitle,
        slug: formSlug,
        excerpt: formExcerpt || null,
        content: formContent,
        coverImage: formCoverImage || null,
        published: formPublished,
        order: formOrder,
      }),
    });
    if (res.ok) {
      setEditing(null);
      resetForm();
      fetchPosts();
    } else {
      const data = await res.json();
      alert(data.error || "Failed to update");
    }
  }

  async function handleDelete(id: string) {
    if (!confirm("Delete this post?")) return;
    await fetch(`/api/posts/${id}`, { method: "DELETE" });
    fetchPosts();
  }

  async function handleCoverUpload(file: File) {
    setUploadingCover(true);
    const formData = new FormData();
    formData.append("file", file);
    const res = await fetch("/api/posts/upload-cover", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.path) setFormCoverImage(data.path);
    setUploadingCover(false);
  }

  function resetForm() {
    setFormTitle("");
    setFormSlug("");
    setFormExcerpt("");
    setFormContent("");
    setFormCoverImage("");
    setFormPublished(false);
    setFormOrder(posts.length);
  }

  function startEdit(p: Post) {
    setEditing(p.id);
    setFormTitle(p.title);
    setFormSlug(p.slug);
    setFormExcerpt(p.excerpt || "");
    setFormContent(p.content);
    setFormCoverImage(p.coverImage || "");
    setFormPublished(p.published);
    setFormOrder(p.order);
  }

  const formFields = (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Title
        </label>
        <input
          type="text"
          value={formTitle}
          onChange={(e) => {
            setFormTitle(e.target.value);
            if (!editing && !formSlug) setFormSlug(slugFromTitle(e.target.value));
          }}
          required
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Slug
        </label>
        <input
          type="text"
          value={formSlug}
          onChange={(e) => setFormSlug(e.target.value)}
          placeholder="url-friendly-slug"
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Excerpt
        </label>
        <textarea
          value={formExcerpt}
          onChange={(e) => setFormExcerpt(e.target.value)}
          rows={2}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Content
        </label>
        <textarea
          value={formContent}
          onChange={(e) => setFormContent(e.target.value)}
          required
          rows={10}
          className="w-full px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg bg-white dark:bg-slate-900 text-gray-900 dark:text-white"
        />
      </div>
      <div>
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
          Cover Image
        </label>
        <div className="flex gap-2 items-center">
          <label className="px-4 py-2 border border-gray-300 dark:border-slate-600 rounded-lg cursor-pointer hover:bg-gray-50 dark:hover:bg-slate-700 text-sm">
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={(e) => {
                const f = e.target.files?.[0];
                if (f) handleCoverUpload(f);
                e.target.value = "";
              }}
              disabled={uploadingCover}
            />
            {uploadingCover ? "Uploading..." : "Upload"}
          </label>
          {formCoverImage && (
            <div className="relative w-16 h-16 rounded overflow-hidden">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={formCoverImage} alt="" className="w-full h-full object-cover" />
              <button
                type="button"
                onClick={() => setFormCoverImage("")}
                className="absolute inset-0 bg-black/60 opacity-0 hover:opacity-100 flex items-center justify-center text-white text-xs"
              >
                Remove
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="flex gap-4 items-center">
        <label className="flex items-center gap-2 cursor-pointer">
          <input
            type="checkbox"
            checked={formPublished}
            onChange={(e) => setFormPublished(e.target.checked)}
          />
          <span className="text-sm text-gray-700 dark:text-gray-300">Published</span>
        </label>
        <div className="flex items-center gap-2">
          <label className="text-sm text-gray-700 dark:text-gray-300">Order:</label>
          <input
            type="number"
            value={formOrder}
            onChange={(e) => setFormOrder(parseInt(e.target.value, 10) || 0)}
            className="w-20 px-2 py-1 border border-gray-300 dark:border-slate-600 rounded bg-white dark:bg-slate-900"
          />
        </div>
      </div>
    </div>
  );

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
          Blog Posts
        </h1>
        <button
          onClick={() => {
            setShowForm(true);
            setEditing(null);
            resetForm();
            setFormOrder(posts.length);
          }}
          className="px-4 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
        >
          + Add Post
        </button>
      </div>

      {showForm && !editing && (
        <form
          onSubmit={handleCreate}
          className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700 space-y-4"
        >
          <h2 className="font-semibold text-gray-900 dark:text-white">
            New Post
          </h2>
          {formFields}
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
        {posts.map((post) => (
          <div
            key={post.id}
            className="p-6 bg-white dark:bg-slate-800 rounded-xl border border-gray-200 dark:border-slate-700"
          >
            {editing === post.id ? (
              <form
                onSubmit={(e) => handleUpdate(e, post.id)}
                className="space-y-4"
              >
                <h2 className="font-semibold text-gray-900 dark:text-white">
                  Edit Post
                </h2>
                {formFields}
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
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                        {post.title}
                      </h3>
                      {!post.published && (
                        <span className="px-2 py-0.5 text-xs bg-amber-100 dark:bg-amber-900/30 text-amber-800 dark:text-amber-200 rounded">
                          Draft
                        </span>
                      )}
                    </div>
                    <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
                      /{post.slug}
                    </p>
                    {post.excerpt && (
                      <p className="mt-2 text-gray-600 dark:text-gray-400 line-clamp-2">
                        {post.excerpt}
                      </p>
                    )}
                  </div>
                  {post.coverImage && (
                    <div className="w-20 h-20 rounded-lg overflow-hidden shrink-0 bg-gray-100 dark:bg-slate-700">
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img
                        src={post.coverImage}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}
                  <div className="flex gap-2 shrink-0">
                    <button
                      onClick={() => startEdit(post)}
                      className="px-3 py-1.5 text-sm text-primary-600 dark:text-primary-400 hover:bg-primary-50 dark:hover:bg-slate-700 rounded-lg"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(post.id)}
                      className="px-3 py-1.5 text-sm text-red-600 dark:text-red-400 hover:bg-red-50 dark:hover:bg-slate-700 rounded-lg"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              </>
            )}
          </div>
        ))}
      </div>

      {posts.length === 0 && !showForm && (
        <div className="text-center py-12 text-gray-500 dark:text-gray-400">
          No posts yet. Click &quot;Add Post&quot; to get started.
        </div>
      )}
    </div>
  );
}
