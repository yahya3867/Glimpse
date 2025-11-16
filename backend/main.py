"""
Main interface for Video Production Pipeline

Simple workflow:
1. Drop your one-liner
2. AI Agents collaborate on your scene
3. You get a ready-to-ship video concept
"""

from agent_system import VideoProductionPipeline, save_output


def main():
    """
    Main entry point for the video production pipeline.
    """
    print("\n" + "="*80)
    print("AI VIDEO PRODUCTION PIPELINE")
    print("="*80)
    print("\nWorkflow:")
    print("  1. Drop your one-liner → Describe your product in a single sentence")
    print("  2. AI Agents collaborate → Creative Director + Scriptwriter work together")
    print("  3. Get ready-to-ship video → 12-second concept for landing pages & social")
    print("="*80 + "\n")

    # Get user input
    print("Enter your product one-liner:")
    print("(Or press Enter to use example: 'AI that turns meeting recordings into automated task assignments')\n")

    user_input = input("> ").strip()

    if not user_input:
        # Use example
        one_liner = "AI that turns meeting recordings into automated task assignments"
        print(f"\nUsing example: {one_liner}\n")
    else:
        one_liner = user_input

    # Ask about verbosity
    print("\nShow backend processing details?")
    print("  y = Yes, show me everything (RECOMMENDED)")
    print("  n = No, just show final results")

    verbose_choice = input("\nChoice (y/n): ").strip().lower()
    verbose = verbose_choice != 'n'  # Default to verbose

    print("\n" + "="*80)
    print("STARTING PIPELINE...")
    print("="*80)

    # Initialize and run pipeline
    pipeline = VideoProductionPipeline()

    result = pipeline.create_video_concept(
        product_one_liner=one_liner,
        verbose=verbose
    )

    # Handle results
    if result["status"] == "success":
        # Save output
        output_file = save_output(result)

        print("\n" + "="*80)
        print("SUCCESS - VIDEO CONCEPT READY!")
        print("="*80)

        if not verbose:
            # If not verbose, show the final prompt now
            print(f"\nFINAL PROMPT FOR VIDEO GENERATION:")
            print("-"*80)
            print(result["final_prompt_for_video_generation"])
            print("-"*80)

        print(f"\nPipeline Stats:")
        print(f"  Total Tokens: {result['pipeline_metadata']['total_tokens']}")
        print(f"  Agents Used: Creative Director (GPT-5.1) + Scriptwriter (GPT-5.1)")

        print(f"\n✓ Prompt saved to: {output_file}")
        print("\nNext steps:")
        print(f"  → Generate video: python generate_video.py {output_file}")
        print("  → Video will be landscape format (12 seconds)")
        print("="*80 + "\n")

    else:
        print("\n" + "="*80)
        print("ERROR - PIPELINE FAILED")
        print("="*80)
        print(f"\nError: {result.get('error', 'Unknown error')}")
        if 'details' in result:
            print(f"Details: {result['details']}")
        print("\n" + "="*80 + "\n")


if __name__ == "__main__":
    try:
        main()
    except KeyboardInterrupt:
        print("\n\n✗ Pipeline cancelled by user")
    except Exception as e:
        print(f"\n\n✗ Unexpected error: {str(e)}")
