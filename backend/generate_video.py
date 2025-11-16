"""
Sora Video Generation Script
Generates videos using OpenAI's Sora API from text prompts.
Supports 12-second landscape videos optimized for landing pages and social media.
"""

import os
import sys
import time
import json
import requests
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables from .env file
load_dotenv()

API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    raise SystemExit("❌ OPENAI_API_KEY not found in .env file")

BASE_URL = "https://api.openai.com/v1/videos"
HEADERS = {
    "Authorization": f"Bearer {API_KEY}",
    "Content-Type": "application/json",
}

# Model configurations
MODELS = {
    "1": {
        "name": "sora-2-pro",
        "cost_per_second": 0.30,
        "description": "Pro model - Higher quality (requires verified organization)"
    },
    "2": {
        "name": "sora-2",
        "cost_per_second": 0.10,
        "description": "Standard model - More stable and affordable"
    }
}

DURATION = "12"  # Sora supports up to 12 seconds (must be string: "4", "8", or "12")
SIZE = "1280x720"  # 16:9 landscape format (720 x 1280 portrait, 1280 x 720 landscape)


def load_prompt_from_file(filepath: str) -> str:
    """Load the video prompt from a text file."""
    try:
        with open(filepath, 'r', encoding='utf-8') as f:
            return f.read().strip()
    except Exception as e:
        raise SystemExit(f"❌ Failed to load prompt from {filepath}: {e}")


def generate_video(prompt: str, model: str, cost_per_second: float, duration: str = DURATION, size: str = SIZE) -> str:
    """
    Generate a video using Sora API.

    Args:
        prompt: Text description for video generation
        model: Model name (sora-2 or sora-2-pro)
        cost_per_second: Cost per second for the selected model
        duration: Video duration in seconds (max 12)
        size: Video resolution (default: 1280x720 landscape)

    Returns:
        Path to the saved video file
    """
    print("\n" + "="*80)
    print("SORA VIDEO GENERATION")
    print("="*80)
    print(f"Model: {model}")
    print(f"Duration: {duration} seconds")
    print(f"Resolution: {size}")
    print(f"Estimated cost: ${int(duration) * cost_per_second:.2f}")
    print("="*80)
    print(f"\nPrompt:\n{prompt[:200]}..." if len(prompt) > 200 else f"\nPrompt:\n{prompt}")
    print("="*80 + "\n")

    # Step 1: Submit generation job
    print("⏳ Submitting video generation job...")

    payload = {
        "model": model,
        "prompt": prompt,
        "seconds": duration,
        "size": size,
    }

    try:
        resp = requests.post(BASE_URL, headers=HEADERS, json=payload)

        if resp.status_code != 200:
            print(f"❌ API Error: {resp.status_code}")
            print(f"Response: {resp.text}")
            raise SystemExit("Video generation request failed.")

        job = resp.json()
        video_id = job["id"]
        print(f"✓ Job created successfully")
        print(f"  Job ID: {video_id}")
        print(f"  Status: {job['status']}\n")

    except requests.exceptions.RequestException as e:
        raise SystemExit(f"❌ Network error: {e}")

    # Step 2: Poll for completion
    print("⏳ Generating video (this may take a few minutes)...\n")

    start_time = time.time()
    last_progress = None
    retry_count = 0
    max_retries = 5

    while True:
        try:
            status_resp = requests.get(
                f"{BASE_URL}/{video_id}",
                headers={"Authorization": f"Bearer {API_KEY}"}
            )

            if status_resp.status_code == 403:
                # Handle verification/permission errors with retry
                retry_count += 1
                if retry_count <= max_retries:
                    print(f"  ⚠️  Authorization issue (403), retrying ({retry_count}/{max_retries})...")
                    time.sleep(10)  # Wait longer for verification to propagate
                    continue
                else:
                    print(f"❌ Status check error: {status_resp.status_code}")
                    print(f"Response: {status_resp.text}")
                    print("\n⚠️  The video may still be processing. Check your OpenAI dashboard:")
                    print(f"    https://platform.openai.com/videos/{video_id}")
                    raise SystemExit("Failed to check video status after multiple retries.")

            if status_resp.status_code != 200:
                print(f"❌ Status check error: {status_resp.status_code}")
                print(f"Response: {status_resp.text}")
                raise SystemExit("Failed to check video status.")

            # Reset retry count on successful response
            retry_count = 0

            info = status_resp.json()
            status = info["status"]
            progress = info.get("progress")

            # Only print if progress changed or every 5 seconds
            elapsed = time.time() - start_time
            if progress != last_progress or elapsed % 5 < 3:
                progress_bar = "█" * int((progress or 0) / 10) + "░" * (10 - int((progress or 0) / 10))
                print(f"  Status: {status.upper():12} | Progress: [{progress_bar}] {progress}% | Elapsed: {elapsed:.0f}s")
                last_progress = progress

            # Check if complete
            if status in ("completed", "failed", "canceled"):
                break

            time.sleep(3)

        except requests.exceptions.RequestException as e:
            print(f"❌ Network error during polling: {e}")
            time.sleep(5)
            continue

    print()

    if status != "completed":
        print(f"❌ Video generation failed")
        print(f"Final status: {info}")
        raise SystemExit("Video did not complete successfully.")

    # Step 3: Download the video
    print("⏳ Downloading video...")

    try:
        download_resp = requests.get(
            f"{BASE_URL}/{video_id}/content",
            headers={"Authorization": f"Bearer {API_KEY}"},
            stream=True,
        )

        if download_resp.status_code != 200:
            print(f"❌ Download error: {download_resp.status_code}")
            print(f"Response: {download_resp.text}")
            raise SystemExit("Failed to download video.")

        # Create output filename with timestamp
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        output_path = f"generated_video_{timestamp}_{video_id}.mp4"

        with open(output_path, "wb") as f:
            total_size = 0
            for chunk in download_resp.iter_content(chunk_size=8192):
                if chunk:
                    f.write(chunk)
                    total_size += len(chunk)

        file_size_mb = total_size / (1024 * 1024)

        print(f"✓ Video downloaded successfully\n")
        print("="*80)
        print("SUCCESS - VIDEO GENERATED")
        print("="*80)
        print(f"File: {output_path}")
        print(f"Size: {file_size_mb:.2f} MB")
        print(f"Duration: {duration} seconds")
        print(f"Cost: ${int(duration) * cost_per_second:.2f}")
        print(f"Total time: {time.time() - start_time:.0f}s")
        print("="*80 + "\n")

        return output_path

    except requests.exceptions.RequestException as e:
        raise SystemExit(f"❌ Network error during download: {e}")


def main():
    """Main entry point for video generation."""
    if len(sys.argv) < 2:
        print("Usage:")
        print("  1. From prompt text file:")
        print('     python generate_video.py <path_to_prompt.txt>')
        print()
        print("  2. With custom prompt:")
        print('     python generate_video.py "Your custom prompt here"')
        print()
        print("Example:")
        print('     python generate_video.py prompt_ai_coach_20250114_023958.txt')
        sys.exit(1)

    input_arg = sys.argv[1]

    # Check if input is a text file or a direct prompt
    if input_arg.endswith('.txt') and os.path.exists(input_arg):
        print(f"📄 Loading prompt from: {input_arg}")
        prompt = load_prompt_from_file(input_arg)
        if not prompt:
            raise SystemExit("❌ Prompt file is empty")
    else:
        # Treat as direct prompt
        prompt = input_arg

    # Ask user to select model
    print("\n" + "="*80)
    print("SELECT MODEL")
    print("="*80)
    for key, config in MODELS.items():
        cost = int(DURATION) * config["cost_per_second"]
        print(f"  {key}. {config['name']}")
        print(f"     {config['description']}")
        print(f"     Cost: ${cost:.2f} for {DURATION} seconds\n")

    model_choice = input("Choose model (1 or 2): ").strip()

    if model_choice not in MODELS:
        print("❌ Invalid choice. Using standard model (sora-2).")
        model_choice = "2"

    selected_model = MODELS[model_choice]["name"]
    cost_per_second = MODELS[model_choice]["cost_per_second"]

    print(f"✓ Selected: {selected_model}\n")

    # Generate the video
    try:
        output_file = generate_video(prompt, selected_model, cost_per_second)
        print(f"✅ All done! Your video is ready: {output_file}")
    except KeyboardInterrupt:
        print("\n\n❌ Generation cancelled by user")
        sys.exit(1)
    except Exception as e:
        print(f"\n\n❌ Unexpected error: {e}")
        sys.exit(1)


if __name__ == "__main__":
    main()
