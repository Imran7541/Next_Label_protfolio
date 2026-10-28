import os
import json
import unittest

ROOT_DIR = os.path.abspath(os.path.join(os.path.dirname(__file__), ".."))

class TestPortfolioIntegrity(unittest.TestCase):

    def test_production_media_assets_exist(self):
        """Verify that all 8 portfolio showcase videos and matching 960x424 posters exist."""
        for i in range(1, 9):
            vid_path = os.path.join(ROOT_DIR, f"public/videos/work_0{i}.mp4")
            poster_path = os.path.join(ROOT_DIR, f"public/videos/work_0{i}.jpg")
            self.assertTrue(os.path.exists(vid_path), f"Video work_0{i}.mp4 must exist")
            self.assertTrue(os.path.exists(poster_path), f"Poster work_0{i}.jpg must exist")
            self.assertGreater(os.path.getsize(vid_path), 100000, f"Video work_0{i}.mp4 must have valid size")
            self.assertGreater(os.path.getsize(poster_path), 5000, f"Poster work_0{i}.jpg must have valid size")

        audio_path = os.path.join(ROOT_DIR, "public/music/out_of_flux_blue_race.mp3")
        self.assertTrue(os.path.exists(audio_path), "Soundtrack must exist")

    def test_works_catalog_schema(self):
        """Verify that the works catalog has 8 complete entries with all required keys."""
        works_path = os.path.join(ROOT_DIR, "src/data/works.json")
        self.assertTrue(os.path.exists(works_path))

        with open(works_path, "r", encoding="utf-8") as f:
            works = json.load(f)

        self.assertEqual(len(works), 8, "Works catalog must contain exactly 8 portfolio entries")
        
        required_keys = {"id", "name", "href", "year", "role", "summary", "highlights", "stack"}
        for work in works:
            self.assertTrue(required_keys.issubset(work.keys()), f"Missing keys in work {work.get('name')}")
            self.assertIsInstance(work["highlights"], list)
            self.assertIsInstance(work["stack"], list)
            self.assertGreater(len(work["stack"]), 0)

    def test_site_content_structure(self):
        """Verify that site_content.json has all panels and required metadata."""
        content_path = os.path.join(ROOT_DIR, "src/data/site_content.json")
        self.assertTrue(os.path.exists(content_path))

        with open(content_path, "r", encoding="utf-8") as f:
            content = json.load(f)

        self.assertIn("site", content)
        self.assertIn("concept", content)
        self.assertIn("sections", content)
        sections = content["sections"]
        for key in ["hero", "about", "services", "autumn", "works", "contact", "finale", "secret_earth_easter_egg"]:
            self.assertIn(key, sections)

    def test_shaders_exist(self):
        """Verify extracted GLSL shader files exist and have non-trivial content."""
        shader_files = [
            "src/shaders/postprocessing_finish.frag.glsl",
            "src/shaders/secret_earth_clouds.frag.glsl",
            "src/shaders/ocean_dunes_caustics.frag.glsl",
            "src/shaders/underwater_bubbles.frag.glsl"
        ]
        for rel_path in shader_files:
            full_path = os.path.join(ROOT_DIR, rel_path)
            self.assertTrue(os.path.exists(full_path), f"Shader {rel_path} must exist")
            self.assertGreater(os.path.getsize(full_path), 100, f"Shader {rel_path} must have content")

    def test_documentation_and_spec_files_exist(self):
        """Verify that mandatory documentation files exist."""
        required_docs = [
            "docs/ARCHITECTURE.md",
            "docs/TECH_STACK_BREAKDOWN.md",
            "docs/ASSETS_INVENTORY.md",
            "docs/MOTION_AND_INTERACTIONS.md",
            "docs/DATA_AND_CONTENT_SPEC.md",
            "docs/NETWORK_AND_SECURITY_ANALYSIS.md",
            "docs/01_PRD.md",
            "docs/02_AppFlow.md",
            "docs/03_UI_Spec.md",
            "docs/04_TRD.md",
            "docs/05_Schema.md",
            "docs/06_Plan.md",
            "CLAUDE.md",
            ".cursorrules",
            "specs/next_label_portfolio_architecture.md",
            "config/policies.yaml",
            ".env.example",
            ".env"
        ]
        for rel_doc in required_docs:
            full_path = os.path.join(ROOT_DIR, rel_doc)
            self.assertTrue(os.path.exists(full_path), f"Required file {rel_doc} must exist")
            self.assertGreater(os.path.getsize(full_path), 50, f"File {rel_doc} must not be empty")

if __name__ == "__main__":
    unittest.main()
