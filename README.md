# Welcome to your Lovable project

## Project info

**URL**: https://lovable.dev/projects/98f902ce-3b7b-4132-bbb0-0072bf4fa56f

## How can I edit this code?

There are several ways of editing your application.

**Use Lovable**

Simply visit the [Lovable Project](https://lovable.dev/projects/98f902ce-3b7b-4132-bbb0-0072bf4fa56f) and start prompting.

Changes made via Lovable will be committed automatically to this repo.

**Use your preferred IDE**

If you want to work locally using your own IDE, you can clone this repo and push changes. Pushed changes will also be reflected in Lovable.

The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)

Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```

**Edit a file directly in GitHub**

- Navigate to the desired file(s).
- Click the "Edit" button (pencil icon) at the top right of the file view.
- Make your changes and commit the changes.

**Use GitHub Codespaces**

- Navigate to the main page of your repository.
- Click on the "Code" button (green button) near the top right.
- Select the "Codespaces" tab.
- Click on "New codespace" to launch a new Codespace environment.
- Edit files directly within the Codespace and commit and push your changes once you're done.

## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## How can I deploy this project?

Simply open [Lovable](https://lovable.dev/projects/98f902ce-3b7b-4132-bbb0-0072bf4fa56f) and click on Share -> Publish.

## Can I connect a custom domain to my Lovable project?

Yes, you can!

To connect a domain, navigate to Project > Settings > Domains and click Connect Domain.

Read more here: [Setting up a custom domain](https://docs.lovable.dev/tips-tricks/custom-domain#step-by-step-guide)

# StreakSpark 🔥

A modern, animated habit-tracking web app with a cohesive design inspired by purples, fuchsias, and blues.

## 🚀 Features

### Core Features
- **Habit Management**: Create, track, and manage daily, weekly, and monthly habits
- **Streak Tracking**: Visual streak counters with animated progress indicators
- **Calendar Integration**: Interactive calendar for habit completion tracking
- **Real-time Updates**: Live synchronization across all devices
- **Responsive Design**: Beautiful UI that works on desktop and mobile

### 🔥 Friend Leaderboard & Friend System
- **Unique User IDs**: Each user gets a public, shareable ID (e.g., `abhi123`)
- **Add Friends**: Send friend requests using unique IDs
- **Friend Requests**: Accept/reject incoming friend requests
- **Leaderboard**: Real-time ranking of friends by streak count
- **Social Motivation**: Compete with friends to maintain habit streaks
- **Profile Stats**: Automatic tracking of total streaks and habit counts

### Social Features
- **Friend Discovery**: Find friends using their unique public IDs
- **Request Management**: Handle incoming and outgoing friend requests
- **Competitive Leaderboards**: See who has the highest streaks
- **Profile Sharing**: Share your unique ID with friends

### Technical Features
- **Firebase Integration**: Real-time database with authentication
- **Framer Motion**: Smooth animations and transitions
- **Tailwind CSS**: Modern, responsive styling
- **TypeScript**: Type-safe development
- **React Query**: Efficient data fetching and caching

## 🛠️ Tech Stack

- **Frontend**: React 18, TypeScript, Vite
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Backend**: Firebase (Firestore, Authentication, Storage)
- **State Management**: React Context + React Query
- **Routing**: React Router v6
- **Build Tool**: Vite

## 🎨 Design System

The app features a cohesive design system with:
- **Color Palette**: Purples, fuchsias, and blues with gradient backgrounds
- **Typography**: Modern, readable fonts with proper hierarchy
- **Animations**: Smooth transitions and micro-interactions
- **Components**: Reusable UI components with consistent styling
- **Responsive**: Mobile-first design approach

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd StreakSpark
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up Firebase**
   - Create a Firebase project
   - Enable Authentication, Firestore, and Storage
   - Copy your Firebase config to `src/firebaseConfig.ts`

4. **Start the development server**
   ```bash
   npm run dev
   ```

5. **Open your browser**
   Navigate to `http://localhost:5173`

## 📱 Usage

### Creating Habits
1. Click "New Habits" button
2. Fill in habit details (title, description, frequency)
3. Save to start tracking

### Adding Friends
1. Share your unique ID with friends
2. Enter their ID in the "Add Friend" section
3. Send friend request
4. Accept incoming requests to connect

### Tracking Progress
- Complete habits daily to build streaks
- View your progress in the dashboard
- Compete with friends on the leaderboard

## 🔧 Configuration

### Firebase Setup
1. Create a new Firebase project
2. Enable Authentication (Email/Password)
3. Create Firestore database
4. Set up Storage bucket
5. Update `src/firebaseConfig.ts` with your config

### Environment Variables
Create a `.env` file with:
```
VITE_FIREBASE_API_KEY=your_api_key
VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
VITE_FIREBASE_PROJECT_ID=your_project_id
```

## 📁 Project Structure

```
src/
├── components/          # React components
│   ├── dashboard/      # Dashboard-specific components
│   ├── ui/            # Reusable UI components
│   └── ...
├── contexts/          # React contexts
├── hooks/             # Custom React hooks
├── lib/              # Utility libraries
├── pages/            # Page components
└── ...
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Built with [React](https://reactjs.org/)
- Styled with [Tailwind CSS](https://tailwindcss.com/)
- Icons from [Lucide React](https://lucide.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Animations powered by [Framer Motion](https://www.framer.com/motion/)
