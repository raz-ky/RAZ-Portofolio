export type Project = {
  id: string
  title: string
  category: string
  year: string
  description: string
  image: string
  link: string
}

export type Certificate = {
  id: string
  title: string
  description: string
  image: string
}

export type StackItem = {
  name: string
  image: string
}

export type Photo = {
  id: string
  location: string
  camera: string
  aperture: string
  image: string
}

export const techStack: StackItem[] = [
  { name: 'HTML5', image: 'https://cdn.simpleicons.org/html5' },
  { name: 'CSS3', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg' },
  { name: 'JavaScript', image: 'https://cdn.simpleicons.org/javascript' },
  { name: 'Tailwind CSS', image: 'https://cdn.simpleicons.org/tailwindcss' },
  { name: 'ReactJS', image: 'https://cdn.simpleicons.org/react' },
  { name: 'Vite', image: 'https://cdn.simpleicons.org/vite' },
  { name: 'Supabase', image: 'https://cdn.simpleicons.org/supabase' },
  { name: 'MySQL', image: 'https://cdn.simpleicons.org/mysql' },
  { name: 'Laravel', image: 'https://cdn.simpleicons.org/laravel' },
  { name: 'Figma', image: 'https://cdn.simpleicons.org/figma' },
  { name: 'SQLite3', image: 'https://cdn.simpleicons.org/sqlite' },
  { name: 'VS Code', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/vscode/vscode-original.svg' },
  { name: 'Ant Design', image: 'https://cdn.simpleicons.org/antdesign' },
  { name: 'GitHub', image: 'https://cdn.simpleicons.org/github' },
  { name: 'Angular', image: 'https://cdn.simpleicons.org/angular' },
  { name: 'Django', image: 'https://cdn.simpleicons.org/django' },
  { name: 'Photoshop', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/photoshop/photoshop-plain.svg' },
  { name: 'Python', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-plain.svg' },
  { name: 'Git', image: 'https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-plain.svg' },
]

export const projects: Project[] = [
  {
    id: 'PRJ-001',
    title: 'PEJUANG TECH',
    category: 'IT SOLUTIONS',
    year: '2026',
    description: 'A digital platform for modern service branding and conversion-focused landing experiences.',
    image: '/images/pejuangtechh.png',
    link: 'https://www.pejuangtech.web.id/',
  },
  {
    id: 'PRJ-002',
    title: 'RAZ PICTURES',
    category: 'VISUAL PRODUCTION',
    year: '2026',
    description: 'A cinematic portfolio concept mixing photography, motion, and storytelling for creative work.',
    image: '/images/razpictures.png',
    link: 'https://www.instagram.com/raz.pictures_/',
  },
  {
    id: 'PRJ-003',
    title: 'KM SEMANGAT BAHAGIA',
    category: 'Sistem Informasi Layanan Tiket Kapal',
    year: '2026',
    description: 'A digital platform for ship services and ticketing.',
    image: '/images/kmsemangatbahagia.png',
    link: 'https://kmsemangatbahagia.vercel.app/',
  },
  {
    id: 'PRJ-004',
    title: 'SKY LAUNDRY',
    category: 'BRAND SYSTEM',
    year: '2026',
    description: 'A clean digital platform for seamless laundry services.',
    image: '/images/skylaunsry.png',
    link: 'https://skylaundry.vercel.app/',
  },
  {
    id: 'PRJ-005',
    title: 'GRAND NIRWANA',
    category: 'MOTION LAB',
    year: '2026',
    description: 'A modern digital platform for seamless hotel booking and guest services.',
    image: '/images/grandnirwana.png',
    link: 'https://grand-nirwana-hotel-sistem.vercel.app/',
  },
  {
    id: 'PRJ-006',
    title: 'PACAK',
    category: 'CREATIVE PLATFORM',
    year: '2026',
    description: 'A creative platform for seamless event planning and management.',
    image: '/images/pacak.png',
    link: 'https://pontianak-carnaval-khatulistiwa.vercel.app/',
  },
  
]

export const certificates: Certificate[] = [
  {
    id: 'CRT-001',
    title: 'Juri',
    description: 'Sertifikat menjadi juri lomba photographer & videographer di suatu event besar se-provinsi kalimantan barat',
    image: '/images/JURI.jpeg',
  },
  {
    id: 'CRT-002',
    title: 'Lensa Academy',
    description: 'Sertifikat partisipasi event Lensa Academy in Pontianak',
    image: '/images/LA.jpeg',
  },
  {
    id: 'CRT-003',
    title: 'Pontianak Fashion Carnaval',
    description: 'Sertifikat Volunteer event Pontianak Fashion Carnaval',
    image: '/images/PFC.jpeg',
  },
  {
    id: 'CRT-004',
    title: 'Pekan Raya Kalbar',
    description: 'Sertifikat Volunteer event Pekan Raya Kalimantan Barat',
    image: '/images/PRK.jpeg',
  },
]

export const photos: Photo[] = [
  {
    id: 'IMG-9012',
    location: 'PONTIANAK',
    camera: 'SONY A7III',
    aperture: 'F1.8',
    image: 'https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'IMG-9013',
    location: 'BORNEO',
    camera: 'SONY A7III',
    aperture: 'F2.8',
    image: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'IMG-9014',
    location: 'CITY / NIGHT',
    camera: 'FUJIFILM X-T5',
    aperture: 'F1.4',
    image: 'https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=1400&q=85',
  },
  {
    id: 'IMG-9015',
    location: 'PORTRAIT',
    camera: 'SONY A7III',
    aperture: 'F1.8',
    image: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=1400&q=85',
  },
]