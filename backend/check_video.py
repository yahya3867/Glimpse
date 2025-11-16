"""
Check the status of a Sora video generation job and download if ready.
Usage: python check_video.py <video_id>
"""

import sys
import os
import requests
from datetime import datetime
from dotenv import load_dotenv

# Load environment variables
load_dotenv()

API_KEY = os.getenv("OPENAI_API_KEY")
if not API_KEY:
    raise SystemExit("❌ OPENAI_API_KEY not found in .env file")

BASE_URL = "https://api.openai.com/v1/videos"


def check_and_download_video(video_id: str):
    """Check status and download video if ready."""

    print(f"\n{'='*80}")
    print(f"CHECKING VIDEO STATUS")
    print(f"{'='*80}")
    print(f"Video ID: {video_id}\n")

    # Check status
    try:
        status_resp = requests.get(
            f"{BASE_URL}/{video_id}",
            headers={"Authorization": f"Bearer {API_KEY}"}
        )

        if status_resp.status_code != 200:
            print(f"❌ Error: {status_resp.status_code}")
            print(f"Response: {status_resp.text}")
            return

        info = status_resp.json()
        status = info.get("status")
        progress = info.get("progress", 0)

        print(f"Status: {status}")
        print(f"Progress: {progress}%")

        if status == "completed":
            print(f"\n✓ Video is ready! Downloading...\n")

            # Download the video
            download_resp = requests.get(
                f"{BASE_URL}/{video_id}/content",
                headers={"Authorization": f"Bearer {API_KEY}"},
                stream=True,
            )

            if download_resp.status_code != 200:
                print(f"❌ Download error: {download_resp.status_code}")
                print(f"Response: {download_resp.text}")
                return

            # Save file
            timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
            output_path = f"generated_video_{timestamp}_{video_id}.mp4"

            with open(output_path, "wb") as f:
                total_size = 0
                for chunk in download_resp.iter_content(chunk_size=8192):
                    if chunk:
                        f.write(chunk)
                        total_size += len(chunk)

            file_size_mb = total_size / (1024 * 1024)

            print(f"{'='*80}")
            print(f"SUCCESS - VIDEO DOWNLOADED")
            print(f"{'='*80}")
            print(f"File: {output_path}")
            print(f"Size: {file_size_mb:.2f} MB")
            print(f"{'='*80}\n")

        elif status == "failed":
            print(f"\n❌ Video generation failed")
            print(f"Details: {info}")

        elif status == "canceled":
            print(f"\n❌ Video generation was canceled")

        else:
            print(f"\n⏳ Video is still processing...")
            print(f"Run this script again in a few minutes to check status.")

    except Exception as e:
        print(f"❌ Error: {e}")


if __name__ == "__main__":
    if len(sys.argv) < 2:
        print("Usage: python check_video.py <video_id>")
        print("\nExample:")
        print("  python check_video.py video_6916e4bc81fc8191a7ca4c7a2a03d4240f303b0a41ea8813")
        sys.exit(1)

    video_id = sys.argv[1]
    check_and_download_video(video_id)
