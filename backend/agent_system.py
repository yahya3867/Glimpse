"""
Sequential Agent System for Video Production
Workflow: One-liner → Creative Director → Scriptwriter → 12-second video concept

Agent 1: Creative Director Agent - Vision setter and planner
Agent 2: Scriptwriter Agent - Narrative and prompt generator
"""

import os
from typing import Dict, Any, Optional
from datetime import datetime
import json
from openai import OpenAI
from prompts import (
    CREATIVE_DIRECTOR_SYSTEM_PROMPT,
    SCRIPTWRITER_SYSTEM_PROMPT,
    CREATIVE_DIRECTOR_USER_PROMPT_TEMPLATE,
    SCRIPTWRITER_USER_PROMPT_TEMPLATE
)


class CreativeDirectorAgent:
    """
    Purpose: Acts as the vision setter and planner.

    Core functions:
    - Takes a one-line product description
    - Interprets it into a clear creative goal for a 12-second video
    - Defines tone, mood, pacing, camera framing, and aesthetic style
    - Produces a Creative Specification Document with visual metaphors
      and key moments for the 12-second format
    """

    def __init__(self, api_key: Optional[str] = None):
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-5.1"
        self.reasoning_effort = "none"

    def process_one_liner(self, product_one_liner: str, verbose: bool = True) -> Dict[str, Any]:
        """
        Process product one-liner and generate creative specification for 12-second video.

        Args:
            product_one_liner: Single sentence describing the product
            verbose: If True, prints backend processing details

        Returns:
            Creative specification document as a dictionary
        """
        if verbose:
            print("\n" + "="*80)
            print("CREATIVE DIRECTOR AGENT - PROCESSING")
            print("="*80)
            print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print(f"Model: {self.model}")
            print(f"Reasoning Effort: {self.reasoning_effort}")
            print(f"Target Duration: 12 seconds")
            print(f"\nProduct One-Liner:\n{product_one_liner}")
            print("\n" + "-"*80)
            print("Analyzing product and generating creative vision...")
            print("-"*80 + "\n")

        # Build user prompt from template
        user_prompt = CREATIVE_DIRECTOR_USER_PROMPT_TEMPLATE.format(
            one_liner=product_one_liner
        )

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": CREATIVE_DIRECTOR_SYSTEM_PROMPT},
                    {"role": "user", "content": user_prompt}
                ],
                reasoning_effort=self.reasoning_effort,
                response_format={"type": "json_object"}
            )

            creative_spec = json.loads(response.choices[0].message.content)

            if verbose:
                print("CREATIVE SPECIFICATION GENERATED:")
                print("-"*80)
                print(json.dumps(creative_spec, indent=2))
                print("-"*80)
                print(f"Tokens Used: {response.usage.total_tokens}")
                print(f"  - Prompt: {response.usage.prompt_tokens}")
                print(f"  - Completion: {response.usage.completion_tokens}")
                print("="*80 + "\n")

            return {
                "status": "success",
                "creative_specification": creative_spec,
                "metadata": {
                    "timestamp": datetime.now().isoformat(),
                    "model": self.model,
                    "tokens_used": response.usage.total_tokens,
                    "input_one_liner": product_one_liner
                }
            }

        except Exception as e:
            if verbose:
                print(f"ERROR in Creative Director Agent: {str(e)}")
                print("="*80 + "\n")
            return {
                "status": "error",
                "error": str(e)
            }


class ScriptwriterAgent:
    """
    Purpose: Turns the Creative Director Agent's vision into a production-ready
    script and shot-ready prompt for a 12-second video.

    Core functions:
    - Writes shot-by-shot breakdown with precise timing
    - Structures narrative (hook → core → closer)
    - Generates the final multimodal prompt for video generation
    - Adds optional text overlays and copy elements
    """

    def __init__(self, api_key: Optional[str] = None):
        self.client = OpenAI(api_key=api_key or os.getenv("OPENAI_API_KEY"))
        self.model = "gpt-5.1"
        self.reasoning_effort = "none"

    def create_script(self, creative_specification: Dict[str, Any],
                     product_one_liner: str,
                     verbose: bool = True) -> Dict[str, Any]:
        """
        Create production-ready script and final multimodal prompt from creative spec.

        Args:
            creative_specification: Output from Creative Director Agent
            product_one_liner: Original product description
            verbose: If True, prints backend processing details

        Returns:
            Script document with narrative breakdown and final prompt
        """
        if verbose:
            print("\n" + "="*80)
            print("SCRIPTWRITER AGENT - PROCESSING")
            print("="*80)
            print(f"Timestamp: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print(f"Model: {self.model}")
            print(f"Reasoning Effort: {self.reasoning_effort}")
            print(f"Target Duration: 12 seconds")
            print(f"Format: landscape")
            print(f"\nProduct: {product_one_liner}")
            print(f"\nReceived Creative Specification:")
            print(json.dumps(creative_specification, indent=2))
            print("\n" + "-"*80)
            print("Generating production-ready script and final prompt...")
            print("-"*80 + "\n")

        # Build user prompt from template
        user_prompt = SCRIPTWRITER_USER_PROMPT_TEMPLATE.format(
            creative_specification=json.dumps(creative_specification, indent=2),
            one_liner=product_one_liner,
            aspect_ratio="16:9 (landscape)"
        )

        try:
            response = self.client.chat.completions.create(
                model=self.model,
                messages=[
                    {"role": "system", "content": SCRIPTWRITER_SYSTEM_PROMPT},
                    {"role": "user", "content": user_prompt}
                ],
                reasoning_effort=self.reasoning_effort,
                response_format={"type": "json_object"}
            )

            script_output = json.loads(response.choices[0].message.content)

            if verbose:
                print("SCRIPT AND FINAL PROMPT GENERATED:")
                print("-"*80)
                print(json.dumps(script_output, indent=2))
                print("-"*80)
                print(f"Tokens Used: {response.usage.total_tokens}")
                print(f"  - Prompt: {response.usage.prompt_tokens}")
                print(f"  - Completion: {response.usage.completion_tokens}")
                print("="*80 + "\n")

            return {
                "status": "success",
                "script": script_output,
                "metadata": {
                    "timestamp": datetime.now().isoformat(),
                    "model": self.model,
                    "tokens_used": response.usage.total_tokens
                }
            }

        except Exception as e:
            if verbose:
                print(f"ERROR in Scriptwriter Agent: {str(e)}")
                print("="*80 + "\n")
            return {
                "status": "error",
                "error": str(e)
            }


class VideoProductionPipeline:
    """
    Orchestrates the sequential execution of Creative Director → Scriptwriter agents.

    Workflow:
    1. User provides one-liner product description
    2. Creative Director Agent creates visual concept and creative specification
    3. Scriptwriter Agent turns it into production-ready script and final prompt
    4. Output: Ready-to-ship 12-second video concept
    """

    def __init__(self, api_key: Optional[str] = None):
        self.creative_director = CreativeDirectorAgent(api_key=api_key)
        self.scriptwriter = ScriptwriterAgent(api_key=api_key)

    def create_video_concept(self, product_one_liner: str,
                           verbose: bool = True) -> Dict[str, Any]:
        """
        Execute the full pipeline: One-liner → Creative Director → Scriptwriter → Video Concept

        Args:
            product_one_liner: Single sentence describing the product
            verbose: If True, shows all backend processing

        Returns:
            Complete video concept with final prompt ready for generation
        """
        if verbose:
            print("\n" + "█"*80)
            print("VIDEO PRODUCTION PIPELINE STARTED")
            print("█"*80)
            print(f"Pipeline Start: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print(f"Product: {product_one_liner}")
            print(f"Target: 12-second landscape video for landing pages, social media, pitch decks")
            print("█"*80 + "\n")

        # Step 1: Creative Director Agent
        if verbose:
            print("STAGE 1/2: Creative Director Agent")
            print("Task: Transform one-liner into visual concept\n")

        creative_result = self.creative_director.process_one_liner(
            product_one_liner=product_one_liner,
            verbose=verbose
        )

        if creative_result["status"] != "success":
            return {
                "status": "error",
                "error": "Creative Director Agent failed",
                "details": creative_result
            }

        # Step 2: Scriptwriter Agent
        if verbose:
            print("STAGE 2/2: Scriptwriter Agent")
            print("Task: Create production-ready script and final prompt\n")

        script_result = self.scriptwriter.create_script(
            creative_specification=creative_result["creative_specification"],
            product_one_liner=product_one_liner,
            verbose=verbose
        )

        if script_result["status"] != "success":
            return {
                "status": "error",
                "error": "Scriptwriter Agent failed",
                "details": script_result
            }

        # Compile final output
        final_output = {
            "status": "success",
            "product": product_one_liner,
            "creative_specification": creative_result["creative_specification"],
            "script": script_result["script"],
            "final_prompt_for_video_generation": script_result["script"]["final_multimodal_prompt"],
            "pipeline_metadata": {
                "completion_time": datetime.now().isoformat(),
                "stages_completed": ["creative_director", "scriptwriter"],
                "agents_used": [
                    {
                        "agent": "creative_director",
                        "model": "gpt-5.1",
                        "tokens": creative_result["metadata"]["tokens_used"]
                    },
                    {
                        "agent": "scriptwriter",
                        "model": "gpt-5.1",
                        "tokens": script_result["metadata"]["tokens_used"]
                    }
                ],
                "total_tokens": (
                    creative_result["metadata"]["tokens_used"] +
                    script_result["metadata"]["tokens_used"]
                )
            }
        }

        if verbose:
            print("\n" + "█"*80)
            print("PIPELINE COMPLETED SUCCESSFULLY")
            print("█"*80)
            print(f"\nFINAL PROMPT FOR VIDEO GENERATION:")
            print("-"*80)
            print(final_output["final_prompt_for_video_generation"])
            print("-"*80)
            print(f"\nTotal Tokens Used: {final_output['pipeline_metadata']['total_tokens']}")
            print(f"Completion Time: {datetime.now().strftime('%Y-%m-%d %H:%M:%S')}")
            print("█"*80 + "\n")
            print("✓ Your 12-second landscape video concept is ready to ship!")
            print("  Use the 'final_prompt_for_video_generation' with Sora generation.\n")

        return final_output


def save_output(output: Dict[str, Any], filename: str = None):
    """
    Save the final video prompt to a text file.

    Args:
        output: The pipeline output dictionary
        filename: Optional filename (default: timestamped)
    """
    if filename is None:
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        # Create safe filename from product name
        product_slug = output.get("product", "video")[:30].replace(" ", "_").lower()
        filename = f"prompt_{product_slug}_{timestamp}.txt"

    # Extract just the final prompt
    final_prompt = output.get("final_prompt_for_video_generation", "")

    with open(filename, 'w', encoding='utf-8') as f:
        f.write(final_prompt)

    print(f"✓ Prompt saved to: {filename}")
    return filename


# Example usage
if __name__ == "__main__":
    from prompts import EXAMPLE_ONE_LINERS

    # Example: Use one of the test one-liners
    one_liner = "AI that turns meeting recordings into automated task assignments"

    # Or use a custom one-liner
    # one_liner = "Your product description here"

    print("="*80)
    print("VIDEO PRODUCTION PIPELINE - EXAMPLE")
    print("="*80)
    print(f"\nProduct: {one_liner}")
    print("\nGenerating 12-second video concept...")
    print("="*80)

    # Initialize pipeline
    pipeline = VideoProductionPipeline()

    # Execute with verbose output to see everything happening in the backend
    result = pipeline.create_video_concept(
        product_one_liner=one_liner,
        verbose=True  # Set to False to hide backend processing
    )

    # Save the output
    if result["status"] == "success":
        output_file = save_output(result)
        print(f"\n✓ Video concept ready!")
        print(f"✓ Check {output_file} for complete output")
    else:
        print(f"\n✗ Pipeline failed: {result.get('error', 'Unknown error')}")
