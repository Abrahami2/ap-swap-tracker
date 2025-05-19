# AP Swap Tracker

Mobile-optimized tool for tracking access point swaps at Kohl's stores.

## Features

- Track AP swaps with status updates
- Record old and new AP serial numbers
- Take verification photos directly with mobile camera
- Export data to Excel when project is complete
- Works offline for field use

## Getting Started

1. Install dependencies: `npm install`
2. Start development server: `npm start`
3. Build for production: `npm run build`

## Supabase Setup

1. Create a Supabase project
2. Run the SQL setup script in Supabase SQL Editor
3. Create 'ap-images' storage bucket
4. Update your Supabase credentials in `src/supabase.js`

