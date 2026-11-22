-- Jalankan file ini sekali di Supabase SQL Editor (dashboard proyek yang sama).
-- Aman dijalankan ulang: policy dan seed tidak akan duplikat.

create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  message text not null,
  profile_photo text,
  created_at timestamptz default now()
);

alter table public.comments enable row level security;

-- Berikan hak dasar. RLS tetap mengatur apa yang boleh dilakukan anon.
grant usage on schema public to anon;
grant select, insert on public.comments to anon;

-- Hapus policy lama jika SQL ini dijalankan ulang.
drop policy if exists "Anyone can read comments" on public.comments;
drop policy if exists "Anyone can post comments" on public.comments;

-- anon boleh melihat semua komentar.
create policy "Anyone can read comments"
  on public.comments
  for select
  to anon
  using (true);

-- anon boleh menambah komentar. Tidak ada policy UPDATE/DELETE untuk anon.
create policy "Anyone can post comments"
  on public.comments
  for insert
  to anon
  with check (true);

-- Seed 2 komentar contoh agar tampilan awal tetap sama.
-- created_at dibuat relatif terhadap waktu eksekusi SQL.
insert into public.comments (name, message, created_at)
select v.name, v.message, v.created_at
from (values
  ('Budi Santoso', 'Karya yang luar biasa! Sangat menginspirasi.', now() - interval '2 days'),
  ('Siti Nurhaliza', 'Design dan coding-nya sempurna. Terus berkarya!', now() - interval '1 day')
) as v(name, message, created_at)
where not exists (
  select 1 from public.comments c where c.name = v.name
);
