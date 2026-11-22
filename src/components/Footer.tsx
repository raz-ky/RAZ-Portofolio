import { useEffect, useState } from 'react'
import { supabase } from '../lib/supabase'

interface Comment {
  id: string
  name: string
  message: string
  profilePhoto?: string
  timestamp: string
}

interface CommentRow {
  id: string
  name: string
  message: string
  profile_photo: string | null
  created_at: string
}

const EXAMPLE_COMMENTS: Comment[] = [
  {
    id: '1',
    name: 'Budi Santoso',
    message: 'Karya yang luar biasa! Sangat menginspirasi.',
    timestamp: '2 hari lalu'
  },
  {
    id: '2',
    name: 'Siti Nurhaliza',
    message: 'Design dan coding-nya sempurna. Terus berkarya!',
    timestamp: '1 hari lalu'
  }
]

function formatTimestamp(createdAt: string): string {
  const diffMs = Date.now() - new Date(createdAt).getTime()
  if (!Number.isFinite(diffMs)) return 'Baru saja'

  const minutes = Math.floor(diffMs / 60000)
  if (minutes < 1) return 'Baru saja'
  if (minutes < 60) return `${minutes} menit lalu`

  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} jam lalu`

  const days = Math.floor(hours / 24)
  if (days < 30) return `${days} hari lalu`

  const months = Math.floor(days / 30)
  if (months < 12) return `${months} bulan lalu`

  return `${Math.floor(months / 12)} tahun lalu`
}

function toComment(row: CommentRow): Comment {
  return {
    id: row.id,
    name: row.name,
    message: row.message,
    profilePhoto: row.profile_photo ?? undefined,
    timestamp: formatTimestamp(row.created_at)
  }
}

export default function Footer() {
  const [comments, setComments] = useState<Comment[]>(supabase ? [] : EXAMPLE_COMMENTS)

  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    message: ''
  })

  const [commentForm, setCommentForm] = useState({
    name: '',
    message: '',
    profilePhoto: ''
  })

  const [contactSuccess, setContactSuccess] = useState(false)
  const [commentPage, setCommentPage] = useState(0)

  useEffect(() => {
    if (!supabase) return

    let cancelled = false

    supabase
      .from('comments')
      .select('id, name, message, profile_photo, created_at')
      .order('created_at', { ascending: false })
      .then(({ data, error }) => {
        if (cancelled) return

        if (error) {
          console.error('Gagal memuat komentar:', error)
          setComments(EXAMPLE_COMMENTS)
          return
        }

        setComments((data ?? []).map((row) => toComment(row as CommentRow)))
      })

    return () => {
      cancelled = true
    }
  }, [])

  const commentsPerPage = 2
  const totalPages = Math.max(1, Math.ceil(comments.length / commentsPerPage))
  const visibleComments = comments.slice(commentPage * commentsPerPage, commentPage * commentsPerPage + commentsPerPage)

  useEffect(() => {
    setCommentPage((current) => Math.min(current, Math.max(0, totalPages - 1)))
  }, [totalPages])

  const handleContactSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (contactForm.name && contactForm.email && contactForm.message) {
      console.log('Contact form submitted:', contactForm)
      setContactSuccess(true)
      setContactForm({ name: '', email: '', message: '' })
      setTimeout(() => setContactSuccess(false), 3000)
    }
  }

  const handleCommentSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!commentForm.name || !commentForm.message) return

    const { name, message, profilePhoto } = commentForm

    if (!supabase) {
      const newComment: Comment = {
        id: `local-${Date.now()}`,
        name,
        message,
        profilePhoto: profilePhoto || undefined,
        timestamp: 'Baru saja'
      }
      setComments((prev) => [newComment, ...prev])
      setCommentPage(0)
      setCommentForm({ name: '', message: '', profilePhoto: '' })
      return
    }

    const { data, error } = await supabase
      .from('comments')
      .insert({ name, message, profile_photo: profilePhoto || null })
      .select('id, name, message, profile_photo, created_at')
      .single()

    if (error || !data) {
      console.error('Gagal mengirim komentar:', error)
      alert('Gagal mengirim komentar. Silakan coba lagi.')
      return
    }

    setComments((prev) => [toComment(data as CommentRow), ...prev])
    setCommentPage(0)
    setCommentForm({ name: '', message: '', profilePhoto: '' })
  }

  const handleProfilePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setCommentForm(prev => ({ ...prev, profilePhoto: reader.result as string }))
      }
      reader.readAsDataURL(file)
    }
  }

  return (
    <footer id="contact" className="border-t border-white/15 px-4 py-10 md:px-10 md:py-16 sm:px-6 sm:py-12">
      <div className="mx-auto max-w-7xl">
        {/* Section Title and Description */}
        <div className="mb-12 md:mb-16 sm:mb-14">
          <p className="mb-3 text-[9px] font-bold uppercase tracking-[.35em] text-[#20e8d0] md:mb-4 md:text-[10px]">05 / Contact</p>
          <div className="mb-6 flex flex-col gap-3 md:mb-8 md:flex-row md:items-end md:justify-between md:gap-4 sm:gap-4">
            <div>
              <h1 className="display-font text-3xl text-white md:text-[6vw] md:leading-[.85] sm:text-4xl">
                Hubungi<br />
                <span className="bg-gradient-to-r from-[#8ef7e8] via-[#6bd6ff] to-[#ff2fad] bg-clip-text text-transparent">Saya</span>
              </h1>
            </div>
            <p className="max-w-md text-xs leading-relaxed text-white/55 md:text-right md:text-sm sm:text-sm">
              Saya siap mendengarkan ide, feedback, atau kolaborasi Anda. Hubungi saya melalui form atau media sosial di bawah ini.
            </p>
          </div>
        </div>

        {/* Contact Section */}
        <div className="mb-16 grid gap-6 md:grid-cols-[1fr_1fr] md:gap-12 md:mb-20 sm:gap-8">
          {/* Contact Form */}
          <div>
            <h2 className="mb-6 text-xl font-black text-white md:text-3xl sm:text-2xl">Hubungi</h2>
            <p className="mb-4 text-xs text-white/60 md:mb-6 md:text-sm sm:text-xs">Ada yang ingin didiskusikan? Kirim saya pesan dan mari kita bicara.</p>
            
            <form onSubmit={handleContactSubmit} className="space-y-3 md:space-y-4 sm:space-y-3">
              <input
                type="text"
                placeholder="Nama Anda"
                value={contactForm.name}
                onChange={(e) => setContactForm(prev => ({ ...prev, name: e.target.value }))}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-white/30 focus:bg-white/8 focus:outline-none transition md:px-4 md:py-3 sm:px-3.5 sm:py-2.5"
              />
              
              <input
                type="email"
                placeholder="Email Anda"
                value={contactForm.email}
                onChange={(e) => setContactForm(prev => ({ ...prev, email: e.target.value }))}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-white/30 focus:bg-white/8 focus:outline-none transition md:px-4 md:py-3 sm:px-3.5 sm:py-2.5"
              />
              
              <textarea
                placeholder="Pesan Anda"
                value={contactForm.message}
                onChange={(e) => setContactForm(prev => ({ ...prev, message: e.target.value }))}
                rows={4}
                className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-white/30 focus:bg-white/8 focus:outline-none transition resize-none md:px-4 md:py-3 md:rows-5 sm:px-3.5 sm:py-2.5"
              />
              
              <button
                type="submit"
                className="w-full rounded-lg bg-white px-4 py-2.5 text-sm font-bold text-black transition hover:bg-white/90 md:px-6 md:py-3 sm:px-5 sm:py-2.5"
              >
                ✈ Kirim Pesan
              </button>

              {contactSuccess && (
                <p className="text-center text-xs text-[#20e8d0] md:text-sm sm:text-xs">✓ Pesan berhasil dikirim!</p>
              )}
            </form>

            {/* Social Links */}
            <div className="mt-8 border-t border-white/15 pt-6 md:mt-10 md:pt-8 sm:mt-9">
              <p className="mb-4 text-[0.65rem] font-bold uppercase tracking-[.2em] text-white/60 sm:mb-5 sm:text-xs md:text-xs">Connect With Me</p>
              <div className="grid grid-cols-2 gap-3 sm:gap-4 md:grid-cols-1">
                <a
                  href="https://www.instagram.com/rcky_prjct/"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-xs text-white/60 hover:bg-white/10 hover:text-white/80 transition sm:gap-3 sm:px-4 sm:py-3 sm:text-sm md:px-3 md:py-2.5"
                  aria-label="Instagram"
                >
                  <svg className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.266.069 1.646.069 4.85 0 3.204-.012 3.584-.07 4.85-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.646-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zM5.838 12a6.162 6.162 0 1112.324 0 6.162 6.162 0 01-12.324 0zm4 0a2.162 2.162 0 104.324 0 2.162 2.162 0 00-4.324 0zm8.965-10.322a1.44 1.44 0 110.001 2.881 1.44 1.44 0 01-.001-2.881z"/>
                  </svg>
                  <span className="font-bold">Instagram</span>
                </a>
                <a
                  href="https://www.tiktok.com/@rocky.az"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-xs text-white/60 hover:bg-white/10 hover:text-white/80 transition sm:gap-3 sm:px-4 sm:py-3 sm:text-sm md:px-3 md:py-2.5"
                  aria-label="TikTok"
                >
                  <svg className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-5.66 1.94 2.89 2.89 0 015.66-1.94V9.75a6.32 6.32 0 015.79 12.98 6.31 6.31 0 01-5.79-12.98"/>
                  </svg>
                  <span className="font-bold">TikTok</span>
                </a>
                <a
                  href="https://wa.me/6285750126354"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-xs text-white/60 hover:bg-white/10 hover:text-white/80 transition sm:gap-3 sm:px-4 sm:py-3 sm:text-sm md:px-3 md:py-2.5"
                  aria-label="WhatsApp"
                >
                  <svg className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.67-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.076 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421-7.403h-.004a9.87 9.87 0 00-4.782 1.176l-.313.156-3.56-.93 1.023 3.536-.235.346A9.864 9.864 0 005.031 19.208c2.17 2.171 5.823 3.562 9.306 3.562 2.552 0 4.956-.778 6.998-2.25l.348-.261 3.632.929-1.242-3.753.289-.335A9.874 9.874 0 0021.5 10.171c0-5.745-4.678-10.424-10.427-10.424"/>
                  </svg>
                  <span className="font-bold">WhatsApp</span>
                </a>
                <a
                  href="https://github.com/raz-ky"
                  target="_blank"
                  rel="noreferrer"
                  className="flex items-center gap-2.5 rounded-lg border border-white/15 bg-white/5 px-3 py-2.5 text-xs text-white/60 hover:bg-white/10 hover:text-white/80 transition sm:gap-3 sm:px-4 sm:py-3 sm:text-sm md:px-3 md:py-2.5"
                  aria-label="GitHub"
                >
                  <svg className="h-4 w-4 shrink-0 sm:h-5 sm:w-5" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v 3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
                  </svg>
                  <span className="font-bold">GitHub</span>
                </a>
              </div>
            </div>
          </div>

          {/* Comments Section */}
          <div>
            <div className="mb-6 flex items-center justify-between gap-2">
              <div className="flex items-center gap-2 sm:gap-3">
                <svg className="h-5 w-5 shrink-0 text-white/60 sm:h-6 sm:w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z" />
                </svg>
                <h2 className="text-lg font-bold text-white sm:text-xl">Comments ({comments.length})</h2>
              </div>
            </div>

            {/* Comments List */}
            <div className="mb-4 space-y-3 sm:space-y-4">
              {visibleComments.map((comment) => (
                <div key={comment.id} className="group rounded-lg border border-white/10 bg-white/5 p-3 transition hover:bg-white/8 sm:p-4">
                  <div className="flex items-start gap-2.5 sm:gap-3">
                    {comment.profilePhoto ? (
                      <img
                        src={comment.profilePhoto}
                        alt={comment.name}
                        className="h-9 w-9 shrink-0 rounded-full object-cover sm:h-10 sm:w-10"
                      />
                    ) : (
                      <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs text-white/60 sm:h-10 sm:w-10">
                        {comment.name.charAt(0).toUpperCase()}
                      </div>
                    )}
                    <div className="min-w-0 flex-1">
                      <div className="flex flex-col items-start justify-between gap-1 sm:flex-row sm:items-center">
                        <p className="font-bold text-white text-sm sm:text-base">{comment.name}</p>
                        <p className="text-[0.65rem] text-white/40 sm:text-xs">{comment.timestamp}</p>
                      </div>
                      <p className="mt-1 text-xs leading-relaxed text-white/70 sm:text-sm">{comment.message}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {comments.length > commentsPerPage && (
              <div className="mb-8 flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-white/5 px-3 py-2">
                <button
                  type="button"
                  onClick={() => setCommentPage((current) => (current === 0 ? totalPages - 1 : current - 1))}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 transition hover:bg-white/10"
                >
                  Prev
                </button>

                <div className="flex items-center gap-2">
                  {Array.from({ length: totalPages }).map((_, index) => (
                    <button
                      key={index}
                      type="button"
                      onClick={() => setCommentPage(index)}
                      className={`flex h-7 w-7 items-center justify-center rounded-full text-[10px] font-bold transition ${commentPage === index ? 'bg-white text-black' : 'border border-white/10 bg-transparent text-white/60 hover:bg-white/8'}`}
                    >
                      {index + 1}
                    </button>
                  ))}
                </div>

                <button
                  type="button"
                  onClick={() => setCommentPage((current) => (current + 1) % totalPages)}
                  className="rounded-full border border-white/10 bg-white/5 px-2.5 py-1 text-[10px] font-bold uppercase tracking-[0.22em] text-white/70 transition hover:bg-white/10"
                >
                  Next
                </button>
              </div>
            )}

            {/* Comment Form */}
            <form onSubmit={handleCommentSubmit} className="space-y-3 sm:space-y-4">
              <div>
                <label className="block mb-2 text-xs font-bold uppercase tracking-[.2em] text-white sm:text-sm">
                  Name <span className="text-red-400">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Enter your name"
                  value={commentForm.name}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, name: e.target.value }))}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-white/30 focus:bg-white/8 focus:outline-none transition sm:px-4 sm:py-2.5"
                />
              </div>

              <div>
                <label className="block mb-2 text-xs font-bold uppercase tracking-[.2em] text-white sm:text-sm">
                  Message <span className="text-red-400">*</span>
                </label>
                <textarea
                  placeholder="Write your message here..."
                  value={commentForm.message}
                  onChange={(e) => setCommentForm(prev => ({ ...prev, message: e.target.value }))}
                  rows={3}
                  className="w-full rounded-lg border border-white/15 bg-white/5 px-3 py-2 text-sm text-white placeholder-white/40 focus:border-white/30 focus:bg-white/8 focus:outline-none transition resize-none sm:px-4 sm:py-2.5"
                />
              </div>

              <div>
                <label className="block mb-2 text-xs font-bold uppercase tracking-[.2em] text-white sm:text-sm">
                  Photo <span className="text-white/50 font-normal tracking-normal">(optional)</span>
                </label>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleProfilePhotoChange}
                  className="hidden"
                  id="profile-photo-input"
                />
                <label
                  htmlFor="profile-photo-input"
                  className="flex items-center justify-center rounded-lg border border-white/15 bg-white/5 px-3 py-3 cursor-pointer hover:bg-white/8 transition sm:px-4"
                >
                  <svg className="h-4 w-4 mr-2 text-white/60 shrink-0 sm:h-5 sm:w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-xs text-white/60 sm:text-sm">Choose Profile Photo</span>
                </label>
                <p className="mt-1.5 text-[0.65rem] text-white/40 sm:text-xs">Max: 5MB</p>
              </div>

              <button
                type="submit"
                className="w-full rounded-lg bg-white px-4 py-2.5 font-bold text-black text-sm transition hover:bg-white/90 sm:px-6 sm:py-3"
              >
                ✈ Post Comment
              </button>
            </form>
          </div>
        </div>

        {/* Footer Bottom - Simplified & Elegant */}
        <div className="mt-16 border-t border-white/10 pt-8 md:mt-24 md:pt-12 sm:mt-20">
          <div className="flex flex-col items-center justify-between gap-4 text-center md:flex-row md:text-left md:gap-6">
            <a href="mailto:hello@rocky.project" className="text-xs font-bold text-white/80 hover:text-white transition sm:text-sm">
              @rcky_prjct
            </a>
            <p className="text-xs text-white/40 tracking-[.2em] uppercase">Made with Raz Project</p>
            <div className="text-xs text-white/30">© 2026 Rocky.AZ</div>
          </div>
        </div>
      </div>
    </footer>
  )
}
