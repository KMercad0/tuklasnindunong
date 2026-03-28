# Tuklas nin Dunong

A free, volunteer-built research paper archive for a local high school in the Philippines.

## What It Does

Students write research papers every school year. Future students often struggle to find past papers for reference, or accidentally pick topics that have already been done. This site solves that by giving everyone a searchable archive of all past research.

**For students and the public:**
- Browse and search research papers by title, keyword, grade level, school year, or teacher
- Read abstracts and download full PDFs
- Student names are hidden for privacy

**For teachers (authorized access only):**
- Sign in to view student names alongside papers
- Upload new research papers with metadata (title, students, grade, section, etc.)
- Accounts are created by the site admin — no self-registration

## Privacy

Student names are never shown to the public. Only logged-in teachers can see them. The sign-in page is intentionally hidden — there's no link to it anywhere on the site.

All data handling follows the Philippine Data Privacy Act (RA 10173). Papers are only uploaded with signed parental/guardian consent forms. Anyone can request removal of their data at any time.

## Tech Stack

- React + TypeScript frontend, hosted on Vercel
- Supabase for the database and teacher authentication
- Cloudflare R2 for PDF storage
- Tailwind CSS for styling (with dark mode)

## Running Locally

```bash
npm install
npm run dev
```

You'll need a `.env.local` file with your Supabase credentials. See `.env.example` for the required variables.

## About

Tuklas nin Dunong is an independent project. It is not affiliated with, endorsed by, or authorized by any school, the Department of Education (DepEd), or any government institution.

Built by KMercad0.
