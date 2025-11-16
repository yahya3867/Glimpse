# Glimpse

Transform your product one-liner into a cinematic 12-second video story using AI-powered creative direction and scriptwriting.

## Overview

Glimpse is a full-stack application that combines a Next.js landing page with a Python-based AI agent system to generate professional video concepts from simple product descriptions. The system uses OpenAI's GPT-5.1 for creative direction and scriptwriting, and Sora API for video generation.

## Architecture

```
+------------------------------------------------------------------+
|                        GLIMPSE SYSTEM                            |
+------------------------------------------------------------------+

        FRONTEND                       BACKEND
     (Next.js 15)                   (Python Agents)

          |                               |
          |                               v
    Landing Page                   Agent 1: Creative
    - Hero Section                 Director (GPT-5.1)
    - How It Works                 - Vision Setting
    - Use Cases                    - Tone/Mood/Pacing
    - FAQ                                  |
    - CTA/Pricing                          |
                                           v
          |                          Agent 2: Script
          |                          Writer (GPT-5.1)
          v                          - Narrative Flow
    Email Submit                     - Scene Details
    API Route                        - Final Prompt
    (Resend API)                           |
                                           |
                                           v
                                    Video Generation
                                    (Sora API)
                                    - 12-sec videos
                                    - 1280x720 (16:9)
```

## Tech Stack

### Frontend
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Radix UI
- **Animations**: Framer Motion
- **Smooth Scrolling**: Lenis
- **Icons**: Lucide React

### Backend
- **Language**: Python 3.x
- **AI Models**:
  - GPT-5.1 (Creative Director & Scriptwriter agents)
  - Sora-2 / Sora-2-Pro (Video Generation)
- **API Client**: OpenAI Python SDK
- **Environment**: Python virtual environment (.venv)

## Project Structure

```
glimpse/
   frontend/                   # Next.js landing page
      app/                   # App router pages
         api/              # API routes
            submit-email/ # Email submission endpoint
         page.tsx          # Home page
         layout.tsx        # Root layout
      components/           # React components
         hero.tsx
         how-it-works.tsx
         use-cases.tsx
         pricing-teaser.tsx
         faq.tsx
         ...
      public/               # Static assets
      .env.example          # Frontend environment template
      package.json          # Frontend dependencies

   backend/                   # Python AI agent system
       main.py               # CLI entry point
       agent_system.py       # Agent orchestration
       prompts.py            # Agent prompts & templates
       generate_video.py     # Sora API integration
       check_video.py        # Video status checker
       examples/             # Generated videos & prompts
       .env.example          # Backend environment template
       .venv/                # Python virtual environment
```

## Setup Instructions

### Prerequisites
- Node.js 18+ and npm
- Python 3.8+
- OpenAI API key with access to GPT-5.1 and Sora API
- (Optional) Resend API key for email notifications

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Configure environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env.local

   # Edit .env.local and add your Resend API key (optional)
   # RESEND_API_KEY=your_resend_api_key_here
   ```

4. **Run development server**
   ```bash
   npm run dev
   ```

   The frontend will be available at `http://localhost:3000`

5. **Build for production** (optional)
   ```bash
   npm run build
   npm start
   ```

### Backend Setup

1. **Navigate to backend directory**
   ```bash
   cd backend
   ```

2. **Create and activate virtual environment**

   **Windows:**
   ```bash
   python -m venv .venv
   .venv\Scripts\activate
   ```

   **macOS/Linux:**
   ```bash
   python3 -m venv .venv
   source .venv/bin/activate
   ```

3. **Install dependencies**
   ```bash
   pip install openai python-dotenv requests
   ```

4. **Configure environment variables**
   ```bash
   # Copy the example file
   cp .env.example .env

   # Edit .env and add your OpenAI API key
   # OPENAI_API_KEY=your-openai-api-key-here
   ```

## Usage

### Running the Video Production Pipeline

The backend provides a CLI interface for generating video concepts:

1. **Activate virtual environment** (if not already active)
   ```bash
   # Windows
   .venv\Scripts\activate

   # macOS/Linux
   source .venv/bin/activate
   ```

2. **Run the main pipeline**
   ```bash
   cd backend
   python main.py
   ```

3. **Follow the prompts:**
   - Enter your product one-liner (or press Enter for example)
   - Choose verbosity level (y/n)
   - Wait for the AI agents to generate the concept

4. **Output:**
   - Creative specification and final video prompt
   - Saved to `examples/prompt_*.txt`
   - Token usage statistics

### Generating Videos

After creating a video concept, generate the actual video:

```bash
python generate_video.py examples/prompt_your_product_*.txt
```

Options:
- Model selection: Choose between Sora-2 (standard) or Sora-2-Pro (higher quality)
- Output: 12-second, 1280x720 landscape video
- Saved to: `examples/generated_video_*.mp4`

### Checking Video Status

If video generation is in progress:

```bash
python check_video.py <video_id>
```

## Workflow

### AI Video Production Pipeline

1. **User Input**: Provide a single-sentence product description

2. **Creative Director Agent** (GPT-5.1):
   - Interprets product into creative vision
   - Defines tone, mood, pacing, aesthetic
   - Creates 12-second video specification

3. **Scriptwriter Agent** (GPT-5.1):
   - Receives creative specification
   - Crafts narrative flow and scene details
   - Generates final Sora-compatible prompt

4. **Video Generation** (Sora API):
   - Transforms prompt into 12-second video
   - Landscape format (1280x720)
   - Optimized for landing pages & social media

### Landing Page Flow

1. **Visitor** lands on Glimpse homepage
2. **Explore** features, use cases, and examples
3. **Submit email** for early access
4. **Notification** sent to admin via Resend API

## Development Notes

### Frontend Development
- Uses Next.js App Router (not Pages Router)
- TypeScript strict mode enabled
- Tailwind CSS for styling with custom animations
- Components use Radix UI primitives for accessibility

### Backend Development
- Sequential agent workflow (not parallel)
- Each agent has specialized system prompts
- Verbose mode available for debugging
- Output files include metadata and timestamps

## Environment Variables

### Frontend (.env.local)
```env
RESEND_API_KEY=your_resend_api_key_here
```

### Backend (.env)
```env
OPENAI_API_KEY=your-openai-api-key-here
```

## API Costs

- **GPT-5.1**: Variable based on token usage
- **Sora-2**: $0.10 per second (12-second video = $1.20)
- **Sora-2-Pro**: $0.30 per second (12-second video = $3.60)

## Examples

Check the `backend/examples/` directory for:
- Generated video prompts (`.txt` files)
- Generated videos (`.mp4` files)
- Real product examples from various domains

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

## License

All rights reserved.

## Support

For issues or questions, please open an issue on the GitHub repository.

---

**Built with AI-powered creativity** | Transforming one-liners into cinematic stories
